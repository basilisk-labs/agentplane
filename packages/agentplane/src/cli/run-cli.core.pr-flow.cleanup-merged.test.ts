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

function markTaskDoneWithCommit(readmeText: string, hash: string, message: string): string {
  const commitBlock = `commit:\n  hash: "${hash}"\n  message: "${message}"`;
  const withDoneStatus = readmeText.replace('status: "TODO"', 'status: "DONE"');
  if (withDoneStatus.includes("commit: null")) {
    return withDoneStatus.replace("commit: null", commitBlock);
  }
  return withDoneStatus.replace("comments:", `${commitBlock}\ncomments:`);
}

describe("runCli", () => {
  const CLEANUP_MERGED_LIST_TIMEOUT_MS = 120_000;
  const CLEANUP_MERGED_MUTATION_TIMEOUT_MS = 120_000;
  const TEST_WORKFLOW_GITIGNORE = ".agentplane/worktrees\n.agentplane/cache\n";

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
  }, 60_000);

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
  }, 60_000);

  it("cleanup merged accepts --base, --archive, --fetch, and --delete-remote-branches", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await commitAll(root, "chore base");
    const execFileAsync = promisify(execFile);
    const remoteRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-cleanup-fetch-accepts-"));
    await execFileAsync("git", ["init", "--bare"], {
      cwd: remoteRoot,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["remote", "add", "origin", remoteRoot], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["push", "-u", "origin", "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "cleanup",
        "merged",
        "--base",
        "main",
        "--archive",
        "--delete-remote-branches",
        "--fetch",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  }, 60_000);

  it(
    "cleanup merged deletes matching remote task branches when requested",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await writeFile(path.join(root, "README.md"), "base\n", "utf8");
      await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
      await commitAll(root, "chore base");
      const execFileAsync = promisify(execFile);
      const remoteRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-cleanup-remote-"));
      await execFileAsync("git", ["init", "--bare"], {
        cwd: remoteRoot,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["remote", "add", "origin", remoteRoot], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["push", "-u", "origin", "main"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Cleanup remote delete",
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

      const branch = `task/${taskId}/cleanup-remote-delete`;
      const worktreePath = path.join(
        root,
        ".agentplane",
        "worktrees",
        `${taskId}-cleanup-remote-delete`,
      );
      await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["push", "-u", "origin", branch], {
        cwd: worktreePath,
        env: cleanGitEnv(),
      });

      const { stdout: beforeStdout } = await execFileAsync(
        "git",
        ["ls-remote", "--heads", "origin", branch],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      expect(beforeStdout).toContain(branch);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "cleanup",
          "merged",
          "--yes",
          "--delete-remote-branches",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("remote=delete");
        expect(io.stdout).toContain("remote_deleted=1");
      } finally {
        io.restore();
      }

      expect(await gitBranchExists(root, branch)).toBe(false);
      expect(await pathExists(worktreePath)).toBe(false);

      const { stdout: afterStdout } = await execFileAsync(
        "git",
        ["ls-remote", "--heads", "origin", branch],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );
      expect(afterStdout.trim()).toBe("");
    },
    CLEANUP_MERGED_MUTATION_TIMEOUT_MS,
  );

  it(
    "cleanup merged prunes stale origin refs only when --fetch is set",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await writeFile(path.join(root, "README.md"), "base\n", "utf8");
      await commitAll(root, "chore base");
      const execFileAsync = promisify(execFile);
      const remoteRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-cleanup-fetch-"));
      await execFileAsync("git", ["init", "--bare"], {
        cwd: remoteRoot,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["remote", "add", "origin", remoteRoot], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["push", "-u", "origin", "main"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      const staleBranch = "task/stale-cleanup/origin-ref";
      await execFileAsync("git", ["branch", staleBranch, "main"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["push", "origin", staleBranch], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["fetch", "origin"], { cwd: root, env: cleanGitEnv() });
      await execFileAsync("git", ["update-ref", "-d", `refs/heads/${staleBranch}`], {
        cwd: remoteRoot,
        env: cleanGitEnv(),
      });

      const { stdout: beforeDefault } = await execFileAsync(
        "git",
        ["branch", "-r", "--list", `origin/${staleBranch}`],
        { cwd: root, env: cleanGitEnv() },
      );
      expect(beforeDefault).toContain(`origin/${staleBranch}`);

      const ioDefault = captureStdIO();
      try {
        const code = await runCli(["cleanup", "merged", "--quiet", "--root", root]);
        expect(code).toBe(0);
      } finally {
        ioDefault.restore();
      }

      const { stdout: afterDefault } = await execFileAsync(
        "git",
        ["branch", "-r", "--list", `origin/${staleBranch}`],
        { cwd: root, env: cleanGitEnv() },
      );
      expect(afterDefault).toContain(`origin/${staleBranch}`);

      const ioFetch = captureStdIO();
      try {
        const code = await runCli(["cleanup", "merged", "--fetch", "--quiet", "--root", root]);
        expect(code).toBe(0);
      } finally {
        ioFetch.restore();
      }

      const { stdout: afterFetch } = await execFileAsync(
        "git",
        ["branch", "-r", "--list", `origin/${staleBranch}`],
        { cwd: root, env: cleanGitEnv() },
      );
      expect(afterFetch.trim()).toBe("");
    },
    CLEANUP_MERGED_MUTATION_TIMEOUT_MS,
  );

  it(
    "cleanup merged lists candidates without --yes",
    { timeout: CLEANUP_MERGED_LIST_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await writeFile(path.join(root, "README.md"), "base\n", "utf8");
      await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
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
    },
  );

  it(
    "cleanup merged deletes branches/worktrees and archives pr artifacts",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await writeFile(path.join(root, "README.md"), "base\n", "utf8");
      await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
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
    },
    CLEANUP_MERGED_MUTATION_TIMEOUT_MS,
  );

  it(
    "cleanup merged deletes done task branches when the integrated commit is already on base",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await writeFile(path.join(root, "README.md"), "base\n", "utf8");
      await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
      await commitAll(root, "chore base");
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Cleanup integrated tail",
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

      const integratedRev = await promisify(execFile)("git", ["rev-parse", "HEAD"], { cwd: root });
      const integratedHash = integratedRev.stdout.trim();
      const task = await readTask({ cwd: root, taskId });
      const readmeText = await readFile(task.readmePath, "utf8");
      await writeFile(
        task.readmePath,
        markTaskDoneWithCommit(readmeText, integratedHash, "integrated on main"),
        "utf8",
      );
      await commitAll(root, `chore ${taskId} done`);

      const branch = `task/${taskId}/cleanup-integrated-tail`;
      const worktreePath = path.join(
        root,
        ".agentplane",
        "worktrees",
        `${taskId}-cleanup-integrated-tail`,
      );
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const prDir = path.join(worktreePath, ".agentplane", "tasks", taskId, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(path.join(prDir, "review.md"), "stale task tail\n", "utf8");
      await commitAll(worktreePath, `chore ${taskId} stale pr tail`);

      const io = captureStdIO();
      try {
        const code = await runCli(["cleanup", "merged", "--yes", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain(`branch=${branch}`);
      } finally {
        io.restore();
      }

      expect(await gitBranchExists(root, branch)).toBe(false);
      expect(await pathExists(worktreePath)).toBe(false);
    },
    CLEANUP_MERGED_MUTATION_TIMEOUT_MS,
  );

  it(
    "cleanup merged deletes task-close branches for done tasks whose closure commit is already on base",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await writeFile(path.join(root, "README.md"), "base\n", "utf8");
      await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
      await commitAll(root, "chore base");
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Cleanup close branch",
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

      const integratedRev = await promisify(execFile)("git", ["rev-parse", "HEAD"], { cwd: root });
      const integratedHash = integratedRev.stdout.trim();
      const task = await readTask({ cwd: root, taskId });
      const readmeText = await readFile(task.readmePath, "utf8");
      await writeFile(
        task.readmePath,
        markTaskDoneWithCommit(readmeText, integratedHash, "closure recorded on main"),
        "utf8",
      );
      await commitAll(root, `chore ${taskId} done`);

      const branch = `task-close/${taskId}/1234567890ab`;
      const worktreePath = path.join(
        root,
        ".agentplane",
        "worktrees",
        `${taskId}-cleanup-close-branch`,
      );
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const prDir = path.join(worktreePath, ".agentplane", "tasks", taskId, "pr");
      await mkdir(prDir, { recursive: true });
      await writeFile(path.join(prDir, "meta.json"), "{\n}\n", "utf8");
      await commitAll(worktreePath, `chore ${taskId} close branch tail`);

      const io = captureStdIO();
      try {
        const code = await runCli(["cleanup", "merged", "--yes", "--archive", "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain(`branch=${branch}`);
      } finally {
        io.restore();
      }

      expect(await gitBranchExists(root, branch)).toBe(false);
      expect(await pathExists(worktreePath)).toBe(false);
    },
    CLEANUP_MERGED_MUTATION_TIMEOUT_MS,
  );

  it(
    "cleanup merged refuses worktrees outside repo",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);

      await writeFile(path.join(root, "README.md"), "base\n", "utf8");
      await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
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
    },
    CLEANUP_MERGED_MUTATION_TIMEOUT_MS,
  );
});
