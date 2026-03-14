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

describe("runCli", () => {
  it("cleanup merged requires branch_pr workflow", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid workflow_mode: direct (expected branch_pr)");
    } finally {
      io.restore();
    }
  }, 25_000);

  it("cleanup merged requires running on base branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await commitAll(root, "chore config");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "feature"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("cleanup merged must run on base branch");
    } finally {
      io.restore();
    }
  }, 60_000);

  it("cleanup merged maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects blank base branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await commitAll(root, "chore config");

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--base", " ", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane cleanup merged");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects unknown base branch", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await commitAll(root, "chore config");

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--base", "nope", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Unknown base branch");
    } finally {
      io.restore();
    }
  }, 60_000);

  it("cleanup merged rejects unknown subcommands", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane cleanup <merged>");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects missing --base value", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--base", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane cleanup merged");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects unknown flags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane cleanup merged");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged rejects unexpected arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane cleanup merged");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged reports no candidates", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("no candidates");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged --quiet suppresses output", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--quiet", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("cleanup merged accepts --base and --archive", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await commitAll(root, "chore base");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "cleanup",
        "merged",
        "--base",
        "main",
        "--archive",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("cleanup merged lists candidates without --yes", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Cleanup dry run",
        "--description",
        "cleanup candidate",
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
    await commitAll(root, `chore ${taskId} scaffold`);

    const task = await readTask({ cwd: root, taskId });
    const readmeText = await readFile(task.readmePath, "utf8");
    await writeFile(
      task.readmePath,
      readmeText.replace('status: "TODO"', 'status: "DONE"'),
      "utf8",
    );
    await commitAll(root, `chore ${taskId} done`);

    const branch = `task/${taskId}/cleanup`;
    const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-cleanup`);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const resolvedWorktreePath = await realpath(worktreePath);

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`branch=${branch}`);
      expect(io.stdout).toContain(`worktree=${resolvedWorktreePath}`);
      expect(io.stdout).toContain("Re-run with --yes");
    } finally {
      io.restore();
    }

    expect(await gitBranchExists(root, branch)).toBe(true);
    expect(await pathExists(worktreePath)).toBe(true);
  }, 60_000);

  it("cleanup merged deletes branches/worktrees and archives pr artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Cleanup delete",
        "--description",
        "cleanup candidate",
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
    await commitAll(root, `chore ${taskId} scaffold`);

    const task = await readTask({ cwd: root, taskId });
    const readmeText = await readFile(task.readmePath, "utf8");
    await writeFile(
      task.readmePath,
      readmeText.replace('status: "TODO"', 'status: "DONE"'),
      "utf8",
    );
    await commitAll(root, `chore ${taskId} done`);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(path.join(prDir, "meta.json"), "{\n}\n", "utf8");
    await commitAll(root, `chore ${taskId} pr artifacts`);

    const branch = `task/${taskId}/cleanup-delete`;
    const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-cleanup-delete`);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--yes", "--archive", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ cleanup merged");
    } finally {
      io.restore();
    }

    expect(await gitBranchExists(root, branch)).toBe(false);
    expect(await pathExists(worktreePath)).toBe(false);

    const archiveRoot = path.join(root, ".agentplane", "tasks", taskId, "pr-archive");
    const entries = await readdir(archiveRoot);
    expect(entries.length).toBe(1);
    expect(await pathExists(path.join(archiveRoot, entries[0]))).toBe(true);
    expect(await pathExists(prDir)).toBe(false);
  }, 60_000);

  it("cleanup merged refuses worktrees outside repo", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Cleanup outside worktree",
        "--description",
        "cleanup candidate",
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
    await commitAll(root, `chore ${taskId} scaffold`);

    const task = await readTask({ cwd: root, taskId });
    const readmeText = await readFile(task.readmePath, "utf8");
    await writeFile(
      task.readmePath,
      readmeText.replace('status: "TODO"', 'status: "DONE"'),
      "utf8",
    );
    await commitAll(root, `chore ${taskId} done`);

    const branch = `task/${taskId}/cleanup-outside`;
    const worktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-"));
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["cleanup", "merged", "--yes", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Refusing to remove worktree outside repo");
    } finally {
      io.restore();
    }

    await execFileAsync("git", ["worktree", "remove", "--force", worktreePath], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["branch", "-D", branch], { cwd: root, env: cleanGitEnv() });
  }, 60_000);
});
