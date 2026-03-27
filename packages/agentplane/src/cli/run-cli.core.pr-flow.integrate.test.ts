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

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskReadme,
  validateCommitSubject,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import {
  approveTaskPlan,
  captureStdIO,
  cleanGitEnv,
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
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

const INTEGRATE_REBASE_TIMEOUT_MS = 120_000;
const TEST_WORKFLOW_GITIGNORE = ".agentplane/worktrees\n.agentplane/cache\n";

describe("runCli", () => {
  it("integrate requires a task id", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate rejects invalid merge strategy", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

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

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--merge-strategy", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate rejects unexpected arguments", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", "202601010101-ABCDEF", "extra"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate rejects unknown flags", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", "202601010101-ABCDEF", "--nope"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate requires branch_pr workflow", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

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

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--quiet", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid workflow_mode: direct (expected branch_pr)");
    } finally {
      io.restore();
    }
  });

  it("integrate maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

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
    await execFileAsync("git", ["add", "README.md", ".agentplane/config.json"], { cwd: root });
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
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

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

    const task = await readTask({ cwd: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
    expect(await gitBranchExists(root, branch)).toBe(false);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const metaText = await readFile(metaPath, "utf8");
    expect(metaText).toContain('"status": "MERGED"');
    const meta = JSON.parse(metaText) as Record<string, unknown>;
    expect(meta.base).toBe("main");
    expect(meta).not.toHaveProperty("base_branch");
  }, 120_000);

  it("integrate falls back to a branch-backed task README when base lacks the local task snapshot", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await stageGitignoreIfPresent(root);
    await execFileAsync("git", ["add", "README.md", ".agentplane/config.json"], { cwd: root });
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
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["add", branchReadmePath], { cwd: root });
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    expect(await pathExists(path.join(root, ".agentplane", "tasks", taskId, "README.md"))).toBe(
      false,
    );
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

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
  }, 120_000);

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
    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", "feature.txt", `.agentplane/tasks/${taskId}`], {
      cwd: root,
    });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature and task artifacts`], {
      cwd: root,
    });

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
  }, 120_000);

  it("integrate uses a compliant fallback commit subject when branch subject is invalid (squash)", async () => {
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
        "Integrate subject fallback",
        "--description",
        "Integration should generate a compliant subject when needed",
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

    const branch = `task/${taskId}/integrate-subject`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "wip"], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--branch", branch, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const { stdout: subjectOut } = await execFileAsync("git", ["log", "-2", "--pretty=%s"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const subjects = subjectOut
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const suffix = extractTaskSuffix(taskId);
    expect(subjects[0]?.includes("close:")).toBe(true);
    const mergeSubject = subjects[1] ?? "";
    expect(mergeSubject.startsWith(`🧩 ${suffix} integrate:`)).toBe(true);
    expect(
      validateCommitSubject({
        subject: mergeSubject,
        taskId,
        genericTokens: config.commit.generic_tokens,
      }).ok,
    ).toBe(true);
  }, 120_000);

  it(
    "integrate supports dry-run",
    async () => {
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
          "Dry run integrate",
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

      const branch = `task/${taskId}/dry-run`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

      await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
      await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      const { stdout: headBefore } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });

      const io = captureStdIO();
      try {
        const code = await runCli([
          "integrate",
          taskId,
          "--branch",
          branch,
          "--dry-run",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("dry-run");
      } finally {
        io.restore();
      }

      const { stdout: headAfter } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      expect(headAfter.trim()).toBe(headBefore.trim());
      expect(await gitBranchExists(root, branch)).toBe(true);
    },
    INTEGRATE_REBASE_TIMEOUT_MS,
  );

  it(
    "integrate supports merge strategy",
    async () => {
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
          "Merge strategy integrate",
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

      const branch = `task/${taskId}/merge`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

      await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
      await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "integrate",
          taskId,
          "--branch",
          branch,
          "--merge-strategy",
          "merge",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("✅ integrate");
      } finally {
        io.restore();
      }

      expect(await gitBranchExists(root, branch)).toBe(false);
    },
    INTEGRATE_REBASE_TIMEOUT_MS,
  );

  it(
    "integrate supports rebase strategy",
    async () => {
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
          "Rebase integrate",
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

      const branch = `task/${taskId}/rebase`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

      await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
      await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await writeFile(path.join(root, "base.txt"), "base\n", "utf8");
      await execFileAsync("git", ["add", "base.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "chore base update"], { cwd: root });
      const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-rebase`);
      await execFileAsync("git", ["worktree", "add", worktreePath, branch], {
        cwd: root,
        env: cleanGitEnv(),
      });

      const io = captureStdIO();
      try {
        const code = await runCli([
          "integrate",
          taskId,
          "--branch",
          branch,
          "--merge-strategy",
          "rebase",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("✅ integrate");
      } finally {
        io.restore();
      }

      expect(await gitBranchExists(root, branch)).toBe(false);
      expect(await pathExists(worktreePath)).toBe(false);
    },
    INTEGRATE_REBASE_TIMEOUT_MS,
  );

  it(
    "integrate rebase fails when base changes during verify",
    async () => {
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
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      const verifyCmd = `cd "${root}" && echo bump >> bump.txt && git add bump.txt && git commit -m "chore bump"`;

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Rebase integrate failure",
          "--description",
          "Branch integration",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
          "--verify",
          verifyCmd,
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

      const branch = `task/${taskId}/rebase-fail`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

      await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
      await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await writeFile(path.join(root, "base.txt"), "base\n", "utf8");
      await execFileAsync("git", ["add", "base.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "chore base update"], { cwd: root });

      const worktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-rebase-"));
      await execFileAsync("git", ["worktree", "add", worktreePath, branch], {
        cwd: root,
        env: cleanGitEnv(),
      });

      const io = captureStdIO();
      try {
        const code = await runCli([
          "integrate",
          taskId,
          "--branch",
          branch,
          "--merge-strategy",
          "rebase",
          "--run-verify",
          "--root",
          root,
        ]);
        expect(code).toBe(5);
        expect(io.stderr).toContain("merge --ff-only");
      } finally {
        io.restore();
      }
    },
    INTEGRATE_REBASE_TIMEOUT_MS,
  );

  it(
    "integrate rebase fails when verify command fails",
    async () => {
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
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Rebase verify failure",
          "--description",
          "Branch integration",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
          "--verify",
          "false",
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

      const branch = `task/${taskId}/rebase-verify-fail`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

      await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
      await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      const worktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-rebase-"));
      await execFileAsync("git", ["worktree", "add", worktreePath, branch], {
        cwd: root,
        env: cleanGitEnv(),
      });

      const io = captureStdIO();
      try {
        const code = await runCli([
          "integrate",
          taskId,
          "--branch",
          branch,
          "--merge-strategy",
          "rebase",
          "--run-verify",
          "--root",
          root,
        ]);
        expect(code).toBe(4);
        expect(io.stderr).toContain("Verify command failed");
      } finally {
        io.restore();
      }
    },
    INTEGRATE_REBASE_TIMEOUT_MS,
  );

  it("integrate fails when post-merge hook removes pr dir", async () => {
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
        "Integrate missing PR",
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

    const branch = `task/${taskId}/integrate-missing-pr`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const hookPath = path.join(root, ".git", "hooks", "post-merge");
    const hookBody = `#!/bin/sh\nrm -rf "${prDir}"\n`;
    await writeFile(hookPath, hookBody, "utf8");
    await chmod(hookPath, 0o755);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--merge-strategy",
        "merge",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing PR artifact dir after merge");
    } finally {
      io.restore();
    }
  }, 60_000);

  it("integrate runs verify when requested", async () => {
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
        "Verify integrate",
        "--description",
        "Branch integration",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "echo ok",
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

    const branch = `task/${taskId}/verify`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--base",
        "main",
        "--run-verify",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(await gitBranchExists(root, branch)).toBe(false);
    expect(
      await pathExists(path.join(root, ".agentplane", "worktrees", `_integrate_tmp_${taskId}`)),
    ).toBe(false);

    const verifyLog = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "verify.log"),
      "utf8",
    );
    expect(verifyLog).toContain("verified_sha=");
  }, 60_000);
});
