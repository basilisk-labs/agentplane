import { execFile } from "node:child_process";
import { chmod, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { readTask } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRootWithBranch,
  pathExists,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

const CLEANUP_MERGED_MUTATION_TIMEOUT_MS = 120_000;
const TEST_WORKFLOW_GITIGNORE =
  ".agentplane/worktrees\n" +
  ".agentplane/cache\n" +
  ".agentplane/cache.sqlite\n" +
  ".agentplane/cache.sqlite-wal\n" +
  ".agentplane/cache.sqlite-shm\n";

describe("runCli cleanup merged remote branch handling", () => {
  it(
    "accepts an already-deleted remote branch without attempting a delete push",
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
      const remoteRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-cleanup-remote-absent-"));
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
      const taskIo = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Cleanup absent remote branch",
            "--description",
            "cleanup candidate whose provider branch was already deleted",
            "--priority",
            "med",
            "--owner",
            "CODER",
            "--tag",
            "nodejs",
            "--root",
            root,
          ]),
        ).toBe(0);
        taskId = taskIo.stdout.trim();
      } finally {
        taskIo.restore();
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

      const branch = `task/${taskId}/cleanup-remote-absent`;
      const worktreePath = path.join(
        root,
        ".agentplane",
        "worktrees",
        `${taskId}-cleanup-remote-absent`,
      );
      await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["push", "-u", "origin", branch], {
        cwd: worktreePath,
        env: cleanGitEnv(),
      });
      await execFileAsync("git", ["update-ref", "-d", `refs/heads/${branch}`], {
        cwd: remoteRoot,
        env: cleanGitEnv(),
      });

      const { stdout: remoteBeforeCleanup } = await execFileAsync(
        "git",
        ["ls-remote", "--heads", "origin", branch],
        { cwd: root, env: cleanGitEnv() },
      );
      expect(remoteBeforeCleanup.trim()).toBe("");

      const { stdout: gitPathRaw } = await execFileAsync("which", ["git"], {
        cwd: root,
        env: cleanGitEnv(),
      });
      const fakeBin = await mkdtemp(path.join(os.tmpdir(), "agentplane-cleanup-git-wrapper-"));
      const wrapperPath = path.join(fakeBin, "git");
      await writeFile(
        wrapperPath,
        [
          "#!/usr/bin/env node",
          'const { spawnSync } = require("node:child_process");',
          "const args = process.argv.slice(2);",
          'if (args[0] === "push" && args[1] === "origin" && args[2] === "--delete") {',
          '  process.stderr.write("unexpected remote delete push\\n");',
          "  process.exit(89);",
          "}",
          `const result = spawnSync(${JSON.stringify(gitPathRaw.trim())}, args, {`,
          '  stdio: "inherit",',
          "  env: process.env,",
          "});",
          'process.exit(typeof result.status === "number" ? result.status : 1);',
          "",
        ].join("\n"),
        "utf8",
      );
      await chmod(wrapperPath, 0o755);

      const oldPath = process.env.PATH;
      process.env.PATH = `${fakeBin}${path.delimiter}${oldPath ?? ""}`;
      const io = captureStdIO();
      try {
        expect(
          await runCli(["cleanup", "merged", "--yes", "--delete-remote-branches", "--root", root]),
        ).toBe(0);
        expect(io.stdout).toContain("remote_deleted=0");
      } finally {
        io.restore();
        process.env.PATH = oldPath;
      }

      expect(await gitBranchExists(root, branch)).toBe(false);
      expect(await pathExists(worktreePath)).toBe(false);
    },
    CLEANUP_MERGED_MUTATION_TIMEOUT_MS,
  );
});
