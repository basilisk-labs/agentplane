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
} from "./run-cli.test-helpers.js";
import { approveTaskPlan, recordVerificationOk } from "./run-cli.core.pr-flow.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

const WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS = 60_000;

describe("runCli", () => {
  it("work start requires task id and flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["work", "start", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects missing --slug value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--worktree",
        "--slug",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects missing --agent value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start requires --worktree in branch_pr mode", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--slug",
        "missing-worktree",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--slug",
        "unknown-flag",
        "--worktree",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start supports direct mode without worktree", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Work start direct",
        "--description",
        "Work start in direct mode without worktree",
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "work-start",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ work start");
    } finally {
      io.restore();
    }

    const { stdout } = await execFileAsync("git", ["branch", "--show-current"], { cwd: root });
    expect(stdout.trim()).toBe("main");

    const lockText = await readFile(
      path.join(root, ".agentplane", "cache", "direct-work.json"),
      "utf8",
    );
    const lock = JSON.parse(lockText) as { task_id?: unknown };
    expect(lock.task_id).toBe(taskId);
  });

  it("work start rejects --worktree in direct mode", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Work start direct worktree reject",
        "--description",
        "Direct mode should reject --worktree",
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "work-start",
        "--worktree",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--worktree is only supported");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane work start");
    } finally {
      io.restore();
    }
  });

  it(
    "work start creates a branch and worktree",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Work start task",
          "--description",
          "Work start creates branch and worktree",
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

      const io = captureStdIO();
      let branchName = "";
      let worktreePath = "";
      try {
        const code = await runCli([
          "work",
          "start",
          taskId,
          "--agent",
          "CODER",
          "--slug",
          "work-start",
          "--worktree",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("✅ work start");
        branchName = `task/${taskId}/work-start`;
        worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-work-start`);
      } finally {
        io.restore();
      }

      await expect(
        execFileAsync("git", ["show-ref", "--verify", `refs/heads/${branchName}`], { cwd: root }),
      ).resolves.toBeDefined();

      const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
        cwd: root,
      });
      expect(stdout).toContain(worktreePath);
    },
    WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
  );

  it(
    "work start rejects a base branch that is behind its upstream tracking ref",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await execFileAsync("git", ["remote", "add", "origin", "."], { cwd: root });
      await execFileAsync("git", ["config", "branch.main.remote", "origin"], { cwd: root });
      await execFileAsync("git", ["config", "branch.main.merge", "refs/heads/main"], {
        cwd: root,
      });

      await execFileAsync("git", ["branch", "upstream-main"], { cwd: root });
      await execFileAsync("git", ["checkout", "upstream-main"], { cwd: root });
      await writeFile(path.join(root, "upstream.txt"), "upstream", "utf8");
      await execFileAsync("git", ["add", "upstream.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "upstream"], { cwd: root });
      const { stdout: upstreamShaOut } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await execFileAsync(
        "git",
        ["update-ref", "refs/remotes/origin/main", upstreamShaOut.trim()],
        { cwd: root },
      );

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Stale base work start",
          "--description",
          "Branch_pr work start should reject stale base branches before creating task branches.",
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

      const io = captureStdIO();
      try {
        const code = await runCli([
          "work",
          "start",
          taskId,
          "--agent",
          "CODER",
          "--slug",
          "stale-base",
          "--worktree",
          "--root",
          root,
        ]);
        expect(code).toBe(5);
        expect(io.stderr).toContain(
          "Base branch main is behind its upstream origin/main by 1 commit",
        );
        expect(io.stderr).toContain("Refresh the base branch before `agentplane work start`");
      } finally {
        io.restore();
      }

      expect(
        await pathExists(path.join(root, ".agentplane", "worktrees", `${taskId}-stale-base`)),
      ).toBe(false);
      expect(await gitBranchExists(root, `task/${taskId}/stale-base`)).toBe(false);
    },
    WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
  );

  it(
    "work start seeds local-backend task READMEs into a fresh worktree",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      const createTask = async (title: string, description: string): Promise<string> => {
        const ioTask = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            title,
            "--description",
            description,
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
          return ioTask.stdout.trim();
        } finally {
          ioTask.restore();
        }
      };

      const taskId = await createTask(
        "Seeded worktree task",
        "Fresh branch_pr worktree should inherit local backend task README files.",
      );
      const siblingTaskId = await createTask(
        "Sibling task for worktree snapshot",
        "A sibling task proves the local backend snapshot is broader than the active task.",
      );
      await approveTaskPlan(root, taskId);
      await approveTaskPlan(root, siblingTaskId);

      const worktreeIo = captureStdIO();
      const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-seed-readmes`);
      try {
        const code = await runCli([
          "work",
          "start",
          taskId,
          "--agent",
          "CODER",
          "--slug",
          "seed-readmes",
          "--worktree",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        worktreeIo.restore();
      }

      const taskReadmePath = path.join(worktreePath, ".agentplane", "tasks", taskId, "README.md");
      const siblingReadmePath = path.join(
        worktreePath,
        ".agentplane",
        "tasks",
        siblingTaskId,
        "README.md",
      );
      expect(await pathExists(taskReadmePath)).toBe(true);
      expect(await pathExists(siblingReadmePath)).toBe(true);

      const showIo = captureStdIO();
      try {
        const code = await runCli(["task", "show", siblingTaskId, "--root", worktreePath]);
        expect(code).toBe(0);
        expect(showIo.stdout).toContain(siblingTaskId);
      } finally {
        showIo.restore();
      }

      const startIo = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: bootstrap the fresh worktree from a seeded local-backend snapshot.",
          "--root",
          worktreePath,
        ]);
        expect(code).toBe(0);
        expect(startIo.stdout).toContain("✅ ready");
      } finally {
        startIo.restore();
      }

      const seededReadme = await readFile(taskReadmePath, "utf8");
      const baseReadme = await readFile(
        path.join(root, ".agentplane", "tasks", taskId, "README.md"),
        "utf8",
      );
      expect(seededReadme).toContain('status: "DOING"');
      expect(baseReadme).toContain('status: "TODO"');
    },
    WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
  );
});
