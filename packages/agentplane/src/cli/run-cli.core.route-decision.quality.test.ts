import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { describe } from "vitest";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

const execFileAsync = promisify(execFile);

async function createBranchPrTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Route decision task",
      "--description",
      "Exercise quality gate route decisions.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--allow-duplicate",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return taskIo.stdout.trim();
  } finally {
    taskIo.restore();
  }
}

async function markTaskDoing(root: string, taskId: string): Promise<void> {
  const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
  await writeFile(
    readmePath,
    (await readFile(readmePath, "utf8")).replace('status: "TODO"', 'status: "DOING"'),
    "utf8",
  );
}

async function createVerifiedOpenPrFixture(
  root: string,
  title: string,
): Promise<{
  branch: string;
  implementationHead: string;
  taskId: string;
}> {
  const taskId = await createBranchPrTask(root);
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    title,
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

  const branch = `task/${taskId}/route-decision`;
  await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
  await runCliSilent([
    "task",
    "start-ready",
    taskId,
    "--author",
    "CODER",
    "--body",
    `Start: ${title}`,
    "--root",
    root,
  ]);

  await writeFile(path.join(root, "impl.txt"), "implementation\n");
  await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "feat: implementation"], { cwd: root });
  const { stdout: implementationHead } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
  });
  await runCliSilent([
    "verify",
    taskId,
    "--ok",
    "--by",
    "CODER",
    "--note",
    "Verified: route decision behavior.",
    "--root",
    root,
  ]);
  await markTaskDoing(root, taskId);

  const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
  await mkdir(prDir, { recursive: true });
  await writeFile(
    path.join(prDir, "meta.json"),
    `${JSON.stringify(
      {
        base: "main",
        branch,
        created_at: "2026-01-01T00:00:00.000Z",
        head_sha: implementationHead.trim(),
        pr_number: 123,
        pr_url: "https://github.com/example/repo/pull/123",
        schema_version: 1,
        status: "OPEN",
        task_id: taskId,
        updated_at: "2026-01-01T00:00:00.000Z",
      },
      null,
      2,
    )}\n`,
  );

  return { branch, implementationHead: implementationHead.trim(), taskId };
}

async function setupRoot(): Promise<string> {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  await runCliSilent(["branch", "base", "set", "main", "--root", root]);
  return root;
}

describe("runCli quality route decisions", () => {
  it("records quality review before recommending integration for a verified open PR", async () => {
    const root = await setupRoot();
    const { taskId } = await createVerifiedOpenPrFixture(root, "Exercise quality review routing.");
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: verify artifacts"], { cwd: root });

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string; authoritativeCheckout: string; blocker: { code: string } };
        execution_packet: { recommendedRole: string; evidenceMissing: string[] };
        next_action: { code: string; command: string };
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain("quality_review_missing");
      expect(parsed.route_oracle).toMatchObject({
        phase: "quality_review_needed",
        authoritativeCheckout: "task_worktree",
        blocker: { code: "quality_review_missing" },
      });
      expect(parsed.execution_packet.recommendedRole).toBe("EVALUATOR");
      expect(parsed.execution_packet.evidenceMissing).toContain("evaluator_quality_review");
      expect(parsed.next_action.code).toBe("run_quality_review");
      expect(parsed.next_action.command).toContain(`agentplane evaluator run ${taskId}`);
    } finally {
      nextIo.restore();
    }
  });

  it("records pre-merge closure before integration for a quality-reviewed open PR", async () => {
    const root = await setupRoot();
    const { taskId } = await createVerifiedOpenPrFixture(
      root,
      "Exercise pre-merge closure routing.",
    );
    await runCliSilent([
      "evaluator",
      "run",
      taskId,
      "--verdict",
      "pass",
      "--summary",
      "Quality review passed.",
      "--finding",
      "No route regression found.",
      "--evidence",
      `.agentplane/tasks/${taskId}/README.md`,
      "--root",
      root,
    ]);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "task: quality artifacts"], { cwd: root });

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string; authoritativeCheckout: string; blocker: { code: string } };
        execution_packet: { recommendedRole: string; evidenceMissing: string[] };
        next_action: { code: string; command: string };
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain("pre_merge_closure_missing");
      expect(parsed.route_oracle).toMatchObject({
        phase: "pre_merge_closure_needed",
        authoritativeCheckout: "task_worktree",
        blocker: { code: "pre_merge_closure_missing" },
      });
      expect(parsed.execution_packet.recommendedRole).toBe("CODER");
      expect(parsed.execution_packet.evidenceMissing).toContain("pre_merge_closure");
      expect(parsed.next_action.code).toBe("record_pre_merge_closure");
      expect(parsed.next_action.command).toContain(`agentplane finish ${taskId}`);
      expect(parsed.next_action.command).toContain("--pre-merge-closure");
    } finally {
      nextIo.restore();
    }
  });
});
