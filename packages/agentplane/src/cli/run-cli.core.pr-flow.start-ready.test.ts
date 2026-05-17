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
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  pathExists,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

const WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS = 180_000;

describe("runCli branch_pr start-ready routing", () => {
  it(
    "reports worktree recovery from base when active README moved",
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
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Base start-ready route",
            "--description",
            "Base checkout should report worktree recovery after work start moves README.",
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
          taskId = io.stdout.trim();
        } finally {
          io.restore();
        }
      }
      await approveTaskPlan(root, taskId);

      const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-base-start`);
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "work",
            "start",
            taskId,
            "--agent",
            "CODER",
            "--slug",
            "base-start",
            "--worktree",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          io.restore();
        }
      }

      expect(await pathExists(path.join(root, ".agentplane", "tasks", taskId, "README.md"))).toBe(
        false,
      );
      expect(
        await pathExists(path.join(worktreePath, ".agentplane", "tasks", taskId, "README.md")),
      ).toBe(true);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: attempt from base should report worktree recovery instead of raw IO failure.",
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("branch_pr worktree");
        expect(io.stderr).toContain(`${taskId}-base-start`);
        expect(io.stderr).toContain("next_action: agentplane task start-ready");
        expect(io.stderr).not.toContain("ENOENT");
      } finally {
        io.restore();
      }
    },
    WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
  );
});
