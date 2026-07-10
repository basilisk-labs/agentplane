import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  installRunCliIntegrationHarness,
  runCliSilent,
  writeAndConfigureRoot,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);
const RELEASE_TASKS_RECONCILE_TIMEOUT_MS = 120_000;

async function addIncludedBatchExtension(opts: {
  root: string;
  taskId: string;
  primaryTaskId: string;
  branch: string;
  base?: string;
}): Promise<void> {
  const taskPath = path.join(opts.root, ".agentplane", "tasks", opts.taskId, "README.md");
  const current = await readFile(taskPath, "utf8");
  const frontmatterEnd = current.indexOf("\n---\n", 4);
  expect(frontmatterEnd).toBeGreaterThan(0);
  const extension = [
    "extensions:",
    "  branch_pr_batch:",
    `    base: "${opts.base ?? "main"}"`,
    `    branch: "${opts.branch}"`,
    "    included_task_ids:",
    `      - "${opts.taskId}"`,
    `    primary_task_id: "${opts.primaryTaskId}"`,
    '    role: "included"',
    '    updated_at: "2026-05-23T00:00:00.000Z"',
  ].join("\n");
  const next = `${current.slice(0, frontmatterEnd)}\n${extension}${current.slice(frontmatterEnd)}`;
  await writeFile(taskPath, next, "utf8");
}

async function writeMergedPrMeta(opts: {
  root: string;
  taskId: string;
  branch: string;
  headSha: string;
  mergeCommit: string;
}): Promise<void> {
  const prDir = path.join(opts.root, ".agentplane", "tasks", opts.taskId, "pr");
  await mkdir(prDir, { recursive: true });
  await writeFile(
    path.join(prDir, "meta.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        task_id: opts.taskId,
        branch: opts.branch,
        base: "main",
        created_at: "2026-05-23T00:00:00.000Z",
        updated_at: "2026-05-23T00:00:00.000Z",
        status: "MERGED",
        merge_strategy: "rebase",
        merged_at: "2026-05-23T00:00:00.000Z",
        merge_commit: opts.mergeCommit,
        head_sha: opts.headSha,
        verify: { status: "pass" },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

async function createDocBackedTask(root: string, title: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      title,
      "--description",
      "Exercise release task reconciliation.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "workflow",
      "--allow-duplicate",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

describe("runCli release tasks reconcile", { timeout: RELEASE_TASKS_RECONCILE_TIMEOUT_MS }, () => {
  it("closes verified included batch tasks from primary landed metadata", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );

    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root, env: cleanGitEnv() });
    await writeFile(path.join(root, "feature.txt"), "included payload\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt", ".agentplane/WORKFLOW.md"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: included payload"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const shippedHash = stdout.trim();

    const primaryTaskId = await createDocBackedTask(root, "Primary batch task");
    const includedTaskId = await createDocBackedTask(root, "Included batch task");
    await runCliSilent([
      "task",
      "set-status",
      primaryTaskId,
      "DONE",
      "--commit",
      shippedHash,
      "--force",
      "--yes",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "set-status", includedTaskId, "DOING", "--root", root]);
    await runCliSilent([
      "verify",
      includedTaskId,
      "--ok",
      "--by",
      "CODER",
      "--note",
      "verified included batch task",
      "--quiet",
      "--root",
      root,
    ]);
    await addIncludedBatchExtension({
      root,
      taskId: includedTaskId,
      primaryTaskId,
      branch: `task/${primaryTaskId}/batch-owner`,
    });

    const ioReconcile = captureStdIO();
    try {
      const code = await runCli([
        "release",
        "tasks",
        "reconcile",
        "--task-id",
        includedTaskId,
        "--root",
        root,
      ]);
      if (code !== 0) {
        throw new Error(ioReconcile.stderr || ioReconcile.stdout);
      }
      expect(code).toBe(0);
      expect(ioReconcile.stdout).toContain("included_batch_tasks=1");
    } finally {
      ioReconcile.restore();
    }

    const ioShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", includedTaskId, "--root", root]);
      expect(code).toBe(0);
      const task = JSON.parse(ioShow.stdout) as {
        status?: string;
        commit?: { hash?: string };
        result_summary?: string | null;
      };
      expect(task.status).toBe("DONE");
      expect(task.commit?.hash).toBe(shippedHash);
      expect(task.result_summary).toContain("Shipped on main");
    } finally {
      ioShow.restore();
    }
  });

  it("prefers the merged PR commit after a rebase rewrites the primary task commit", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );

    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root, env: cleanGitEnv() });
    await writeFile(path.join(root, "README.md"), "rebase reconciliation fixture\n", "utf8");
    await execFileAsync("git", ["add", "README.md", ".agentplane/WORKFLOW.md"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "chore: base fixture"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const branch = "task/primary/rebase-owner";
    await execFileAsync("git", ["checkout", "-b", branch], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await writeFile(path.join(root, "feature.txt"), "rebased included payload\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt", ".agentplane/WORKFLOW.md"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: original task commit"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { stdout: originalStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const originalTaskCommit = originalStdout.trim();

    await execFileAsync("git", ["checkout", "main"], { cwd: root, env: cleanGitEnv() });
    await writeFile(path.join(root, "base.txt"), "advance main before rebase\n", "utf8");
    await execFileAsync("git", ["add", "base.txt", ".agentplane/WORKFLOW.md"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "chore: advance main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["cherry-pick", originalTaskCommit], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { stdout: landedStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const landedCommit = landedStdout.trim();
    expect(landedCommit).not.toBe(originalTaskCommit);

    const primaryTaskId = await createDocBackedTask(root, "Rebased primary batch task");
    const includedTaskId = await createDocBackedTask(root, "Rebased included batch task");
    await runCliSilent([
      "task",
      "set-status",
      primaryTaskId,
      "DONE",
      "--commit",
      originalTaskCommit,
      "--force",
      "--yes",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "set-status", includedTaskId, "DOING", "--root", root]);
    await runCliSilent([
      "verify",
      includedTaskId,
      "--ok",
      "--by",
      "CODER",
      "--note",
      "verified rebased included batch task",
      "--quiet",
      "--root",
      root,
    ]);
    await addIncludedBatchExtension({
      root,
      taskId: includedTaskId,
      primaryTaskId,
      branch,
    });
    await writeMergedPrMeta({
      root,
      taskId: primaryTaskId,
      branch,
      headSha: originalTaskCommit,
      mergeCommit: landedCommit,
    });

    const ioReconcile = captureStdIO();
    try {
      const code = await runCli([
        "release",
        "tasks",
        "reconcile",
        "--task-id",
        includedTaskId,
        "--root",
        root,
      ]);
      if (code !== 0) {
        throw new Error(ioReconcile.stderr || ioReconcile.stdout);
      }
      expect(ioReconcile.stdout).toContain("included_batch_tasks=1");
    } finally {
      ioReconcile.restore();
    }

    const ioPrimary = captureStdIO();
    try {
      const code = await runCli(["task", "show", primaryTaskId, "--root", root]);
      expect(code).toBe(0);
      const primaryTask = JSON.parse(ioPrimary.stdout) as { commit?: { hash?: string } };
      expect(primaryTask.commit?.hash).toBe(originalTaskCommit);
    } finally {
      ioPrimary.restore();
    }

    const ioShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", includedTaskId, "--root", root]);
      expect(code).toBe(0);
      const task = JSON.parse(ioShow.stdout) as {
        status?: string;
        commit?: { hash?: string };
      };
      expect(task.status).toBe("DONE");
      expect(task.commit?.hash).toBe(landedCommit);
    } finally {
      ioShow.restore();
    }
  });

  it("reports unresolved included tasks instead of no-op success", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root, env: cleanGitEnv() });

    const primaryTaskId = await createDocBackedTask(root, "Unresolved primary batch task");
    const includedTaskId = await createDocBackedTask(root, "Unresolved included batch task");
    await runCliSilent(["task", "set-status", includedTaskId, "DOING", "--root", root]);
    await runCliSilent([
      "verify",
      includedTaskId,
      "--ok",
      "--by",
      "CODER",
      "--note",
      "verified included batch task",
      "--quiet",
      "--root",
      root,
    ]);
    await addIncludedBatchExtension({
      root,
      taskId: includedTaskId,
      primaryTaskId,
      branch: `task/${primaryTaskId}/batch-owner`,
    });

    const ioReconcile = captureStdIO();
    try {
      const code = await runCli([
        "release",
        "tasks",
        "reconcile",
        "--task-id",
        includedTaskId,
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(ioReconcile.stderr).toContain("could not close included batch task metadata");
      expect(ioReconcile.stderr).toContain("has no landed commit metadata");
    } finally {
      ioReconcile.restore();
    }
  });
});
