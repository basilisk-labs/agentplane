/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { extractTaskSuffix, validateCommitSubject } from "@agentplaneorg/core/commit";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { readTask, renderTaskReadme } from "@agentplaneorg/core/tasks";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import {
  approveTaskPlan,
  captureStdIO,
  cleanGitEnv,
  commitPathsIfChanged,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
  recordVerificationOk,
} from "@agentplane/testkit";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

const INTEGRATE_REBASE_TIMEOUT_MS = 180_000;
const INTEGRATE_ROUTE_TIMEOUT_MS = 120_000;
const TEST_WORKFLOW_GITIGNORE = ".agentplane/worktrees\n.agentplane/cache\n";

async function installFakeGhProtection(opts: { scenarioName: string; protectedBranch?: string }) {
  const fakeBin = path.join(
    os.tmpdir(),
    `agentplane-gh-protection-${Date.now()}-${opts.scenarioName}`,
  );
  await mkdir(fakeBin, { recursive: true });
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  const protectedBranch = opts.protectedBranch ?? "main";
  await writeFile(
    scriptPath,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      'if (args[0] !== "api") { console.error("unexpected gh command"); process.exit(90); }',
      `const expected = ${JSON.stringify(`repos/example/repo/branches/${protectedBranch}/protection`)};`,
      'if ((args[1] ?? "") === expected) {',
      "  console.log(JSON.stringify({ required_pull_request_reviews: { required_approving_review_count: 0 } }));",
      "  process.exit(0);",
      "}",
      'console.error("unexpected gh api endpoint");',
      "process.exit(91);",
      "",
    ].join("\n"),
    "utf8",
  );
  if (process.platform === "win32") {
    await writeFile(ghPath, '@echo off\r\nnode "%~dp0\\fake-gh.mjs" %*\r\n', "utf8");
  } else {
    await writeFile(ghPath, '#!/bin/sh\nnode "$(dirname "$0")/fake-gh.mjs" "$@"\n', "utf8");
    await chmod(ghPath, 0o755);
  }
  return { fakeBin, logPath: path.join(fakeBin, "gh.log") };
}

describe("runCli", { timeout: INTEGRATE_ROUTE_TIMEOUT_MS }, () => {
  it("integrate merges branch and marks task done", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await stageGitignoreIfPresent(root);
    await execFileAsync("git", ["add", "README.md", ".agentplane/WORKFLOW.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate task",
        "--description",
        "Branch integration",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/integrate`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    const branchReadmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const branchReadme = await readFile(branchReadmePath, "utf8");
    await writeFile(
      branchReadmePath,
      `${branchReadme}\n\n<!-- branch-backed task snapshot for integrate fallback -->\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", branchReadmePath], { cwd: root });
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await commitPathsIfChanged(root, [".agentplane/tasks"], `${taskId} add pr artifacts`);

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--branch", branch, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
      expect(io.stdout).toContain("plain finish body/result stayed task-local");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
    expect(await gitBranchExists(root, branch)).toBe(false);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const metaText = await readFile(metaPath, "utf8");
    expect(metaText).toContain('"status": "MERGED"');
    const meta = JSON.parse(metaText) as Record<string, unknown>;
    expect(meta.base).toBe("main");
    expect(meta).not.toHaveProperty("base_branch");
  }, 180_000);

  it("integrate resolves the task branch from branch_pr worktree artifacts when base lacks the local task snapshot", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await stageGitignoreIfPresent(root);
    await execFileAsync("git", ["add", "README.md", ".agentplane/WORKFLOW.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate branch-backed task fallback",
        "--description",
        "Base integrate should resolve the task from the task branch when the local README is missing.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    const branch = `task/${taskId}/integrate-branch-fallback`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    const branchReadmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const branchReadme = await readFile(branchReadmePath, "utf8");
    await writeFile(
      branchReadmePath,
      `${branchReadme}\n\n<!-- branch-backed task snapshot for integrate fallback -->\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", branchReadmePath], { cwd: root });
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await commitPathsIfChanged(root, [".agentplane/tasks"], `${taskId} add pr artifacts`);

    const prMetaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    expect(await pathExists(prMetaPath)).toBe(true);

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    expect(await pathExists(path.join(root, ".agentplane", "tasks", taskId, "README.md"))).toBe(
      false,
    );
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
  }, 180_000);

  it("integrate succeeds when branch_pr task artifacts already exist untracked on the base checkout", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await stageGitignoreIfPresent(root);
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate task artifacts collision",
        "--description",
        "Branch integration should tolerate untracked local-backend task artifacts on main.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);

    const branch = `task/${taskId}/integrate-artifacts`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], {
      cwd: root,
    });
    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await commitPathsIfChanged(
      root,
      [`.agentplane/tasks/${taskId}`],
      `${taskId} add task artifacts`,
    );

    const taskReadmeText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    const prMetaText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    const prReviewText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md"),
      "utf8",
    );

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await mkdir(path.join(root, ".agentplane", "tasks", taskId, "pr"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      taskReadmeText,
      "utf8",
    );
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      prMetaText,
      "utf8",
    );
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md"),
      prReviewText,
      "utf8",
    );

    const { stdout: statusBefore } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=all"],
      { cwd: root },
    );
    expect(statusBefore).toContain(`?? .agentplane/tasks/${taskId}/README.md`);
    expect(statusBefore).toContain(`?? .agentplane/tasks/${taskId}/pr/meta.json`);

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--branch", branch, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }

    const { stdout: statusAfter } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=all"],
      {
        cwd: root,
      },
    );
    expect(statusAfter).not.toContain(".agentplane/cache/tasks-index.v2.json");
    expect(statusAfter).not.toContain(`?? .agentplane/tasks/${taskId}/README.md`);
    expect(statusAfter).not.toContain(`?? .agentplane/tasks/${taskId}/pr/meta.json`);
    expect(statusAfter).not.toContain(`.agentplane/tasks/${taskId}/README.md`);
    expect(statusAfter).not.toContain(`.agentplane/tasks/${taskId}/pr/meta.json`);
    expect(statusAfter).not.toContain(`.agentplane/tasks/${taskId}/pr/diffstat.txt`);
    const backupDir = path.join(root, ".agentplane", "tmp", "integrate-backups");
    if (await pathExists(backupDir)) {
      expect(await readdir(backupDir)).toEqual([]);
    }
    expect(await pathExists(path.join(root, "feature.txt"))).toBe(true);
    const task = await readTask({ cwd: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
    const metaText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    expect(metaText).toContain('"status": "MERGED"');
    const { stdout: headSubject } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], {
      cwd: root,
    });
    expect(headSubject.trim()).toContain("close:");
    const { stdout: headFiles } = await execFileAsync("git", ["show", "--name-only", "--format="], {
      cwd: root,
    });
    const changedFiles = headFiles
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    expect(changedFiles).toContain(`.agentplane/tasks/${taskId}/README.md`);
    expect(changedFiles).toContain(`.agentplane/tasks/${taskId}/pr/meta.json`);
    expect(changedFiles).toContain(`.agentplane/tasks/${taskId}/pr/diffstat.txt`);
  }, 180_000);

  it("integrate tolerates forward-compatible branch-only pr/meta variants", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await stageGitignoreIfPresent(root);
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate forward-compatible PR meta",
        "--description",
        "Base integrate should read branch PR artifacts even when branch metadata carries newer enum values.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);
    await recordVerificationOk(root, taskId);

    const branch = `task/${taskId}/integrate-forward-compatible`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });
    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await runCliSilent(["pr", "update", taskId, "--root", root]);
    await commitPathsIfChanged(
      root,
      [`.agentplane/tasks/${taskId}/pr`],
      `${taskId} add task artifacts`,
    );

    const branchMetaText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const baseMetaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    await mkdir(path.dirname(baseMetaPath), { recursive: true });
    const localForwardCompatibleMeta = JSON.parse(branchMetaText) as Record<string, unknown>;
    localForwardCompatibleMeta.status = "FUTURE_OPEN";
    await writeFile(
      baseMetaPath,
      `${JSON.stringify(localForwardCompatibleMeta, null, 2)}\n`,
      "utf8",
    );
    expect(await pathExists(baseMetaPath)).toBe(true);

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--branch", branch, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
    const mergedMetaText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    expect(mergedMetaText).toContain('"status": "MERGED"');
  }, 180_000);

  it("integrate promotes structured external incident candidates into the incident registry", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await stageGitignoreIfPresent(root);
    await execFileAsync("git", ["add", "README.md", ".agentplane/policy/incidents.md"], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate incident promotion",
        "--description",
        "Branch integration should promote reusable external findings.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "release",
        "--tag",
        "github-actions",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await approveTaskPlan(root, taskId);

    for (const [section, text] of [
      ["Verify Steps", "1. Run integrate on the prepared branch_pr task."],
      [
        "Findings",
        [
          "- Observation: hosted release recovery can still stall while waiting on a workflow run for a ref that never existed remotely.",
          "  Impact: branch_pr operators keep repeating the same manual reconciliation steps.",
          "  Resolution: confirm the remote ref exists before waiting on workflow runs, then retry the recovery path only for real refs.",
          "  Fixability: external",
        ].join("\n"),
      ],
    ] as const) {
      await runCliSilent([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        section,
        "--text",
        text,
        "--root",
        root,
      ]);
    }

    await recordVerificationOk(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/incident-promote`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await commitPathsIfChanged(root, [`.agentplane/tasks/${taskId}`], `${taskId} add pr artifacts`);

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--branch", branch, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }

    const incidents = await readFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      "utf8",
    );
    expect(incidents).toContain(`source_task: ${taskId}`);
    expect(incidents).toContain("fixability: external");
    expect(incidents).toContain("state: open");
    expect(incidents).toContain("confirm the remote ref exists before waiting on workflow runs");
  }, 180_000);
});
