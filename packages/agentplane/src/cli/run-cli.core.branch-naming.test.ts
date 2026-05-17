import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";

import { runCli } from "./run-cli.js";
import {
  approveTaskPlan,
  captureStdIO,
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  pathExists,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

const WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS = 180_000;

describe("runCli branch naming", { timeout: WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS }, () => {
  it(
    "work start uses the configured task branch prefix",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      config.branch.task_prefix = "agents/task";
      await writeConfig(root, config);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      await commitAll(root, "seed");
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Configured branch prefix task",
          "--description",
          "Work start creates branch under configured namespace",
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

      const code = await runCli([
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "configured-prefix",
        "--worktree",
        "--root",
        root,
      ]);
      expect(code).toBe(0);

      const branchName = `agents/task/${taskId}/configured-prefix`;
      const execFileAsync = promisify(execFile);
      await expect(
        execFileAsync("git", ["show-ref", "--verify", `refs/heads/${branchName}`], { cwd: root }),
      ).resolves.toBeDefined();
      expect(
        await pathExists(
          path.join(root, ".agentplane", "worktrees", `${taskId}-configured-prefix`),
        ),
      ).toBe(true);
    },
    WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
  );
});
