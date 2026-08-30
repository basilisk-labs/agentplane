import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { readTask } from "@agentplaneorg/core/tasks";

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
    "starts only the owning worktree from base when active README moved",
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
            "Base checkout should route to the owning worktree after work start moves README.",
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

      const { stdout: baseHeadBefore } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const before = await readTask({ cwd: worktreePath, rootOverride: worktreePath, taskId });
      expect(before.frontmatter.status).toBe("TODO");
      const startBody = "Start: route from base to the task-owned worktree.";
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          startBody,
          "--root",
          root,
        ]);
        expect(code, io.stderr).toBe(0);
        expect(io.stderr).not.toContain("ENOENT");
      } finally {
        io.restore();
      }
      const after = await readTask({ cwd: worktreePath, rootOverride: worktreePath, taskId });
      expect(after.frontmatter.status).toBe("DOING");
      expect(
        await readFile(
          path.join(worktreePath, ".agentplane", "tasks", taskId, "README.md"),
          "utf8",
        ),
      ).toContain(startBody);
      expect(await pathExists(path.join(root, ".agentplane", "tasks", taskId, "README.md"))).toBe(
        false,
      );
      const { stdout: baseHeadAfter } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      expect(baseHeadAfter.trim()).toBe(baseHeadBefore.trim());
    },
    WORK_START_BRANCH_AND_WORKTREE_TIMEOUT_MS,
  );
});
