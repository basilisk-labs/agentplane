import { execFile } from "node:child_process";
import { rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { readTask } from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "./core-imports.js";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  configureGitUser,
  mkGitRepoRootWithBranch,
  pathExists,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

describe("task close-noop README recovery", { timeout: 300_000 }, () => {
  it("recovers the README from the task worktree when base is missing it", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "No-op task without base README",
        "--description",
        "Task closure check",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent([
      "task",
      "plan",
      "approve",
      taskId,
      "--by",
      "USER",
      "--note",
      "OK",
      "--root",
      root,
    ]);
    await runCliSilent([
      "work",
      "start",
      taskId,
      "--agent",
      "CODER",
      "--slug",
      "noop-close-worktree",
      "--worktree",
      "--root",
      root,
    ]);

    const baseReadmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const worktreeReadmePath = path.join(
      root,
      ".agentplane",
      "worktrees",
      `${taskId}-noop-close-worktree`,
      ".agentplane",
      "tasks",
      taskId,
      "README.md",
    );
    expect(await pathExists(worktreeReadmePath)).toBe(true);
    await rm(path.join(root, ".agentplane", "tasks", taskId), { recursive: true, force: true });
    expect(await pathExists(baseReadmePath)).toBe(false);

    const ioClose = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "close-noop",
        taskId,
        "--author",
        "ORCHESTRATOR",
        "--note",
        "stale bookkeeping artifact",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      ioClose.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
    expect(task.frontmatter.result_summary).toBe("No-op closure recorded.");
    expect(await pathExists(baseReadmePath)).toBe(true);
  });
});
