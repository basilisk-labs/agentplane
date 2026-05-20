import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

describe("runCli task guided shortcuts", { timeout: 180_000 }, () => {
  it("task begin creates, plans, approves, and starts a direct task", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const io = captureStdIO();
    let payload: { task_id: string; status: string; next_command: string };
    try {
      const code = await runCli([
        "task",
        "begin",
        "Fix parser edge case",
        "--tag",
        "code",
        "--verify",
        "bun test",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      payload = JSON.parse(io.stdout.trim()) as typeof payload;
    } finally {
      io.restore();
    }

    expect(payload!.status).toBe("started");
    expect(payload!.next_command).toContain("task verify-show");
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", payload!.task_id, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "DOING"');
    expect(readme).toContain('state: "approved"');
    expect(readme).toContain("Fix parser edge case");
    expect(readme).toContain("bun test");
  });

  it("task begin keeps branch_pr on the worktree route instead of starting on base", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const io = captureStdIO();
    let payload: { task_id: string; status: string; next_command: string };
    try {
      const code = await runCli([
        "task",
        "begin",
        "Fix branch route",
        "--tag",
        "code",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      payload = JSON.parse(io.stdout.trim()) as typeof payload;
    } finally {
      io.restore();
    }

    expect(payload!.status).toBe("routed");
    expect(payload!.next_command).toContain(`work start ${payload!.task_id}`);
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", payload!.task_id, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('state: "approved"');
  });

  it("task complete records verification and finishes a direct task", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root });
    await commitAll(root, "seed");

    const ioBegin = captureStdIO();
    let taskId = "";
    try {
      await runCli([
        "task",
        "begin",
        "Complete shortcut",
        "--tag",
        "code",
        "--json",
        "--root",
        root,
      ]);
      taskId = (JSON.parse(ioBegin.stdout.trim()) as { task_id: string }).task_id;
    } finally {
      ioBegin.restore();
    }
    const { stdout: commit } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

    const ioComplete = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "complete",
        taskId,
        "--result",
        "Shortcut finished",
        "--commit",
        commit.trim(),
        "--by",
        "EVALUATOR",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(JSON.parse(ioComplete.stdout.trim())).toMatchObject({
        task_id: taskId,
        status: "finished",
      });
    } finally {
      ioComplete.restore();
    }

    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "DONE"');
    expect(readme).toContain('state: "ok"');
    expect(readme).toContain("Shortcut finished");
  });

  it("task complete validates direct finish commit before recording verification", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const ioBegin = captureStdIO();
    let taskId = "";
    try {
      await runCli([
        "task",
        "begin",
        "Missing commit shortcut",
        "--tag",
        "code",
        "--json",
        "--root",
        root,
      ]);
      taskId = (JSON.parse(ioBegin.stdout.trim()) as { task_id: string }).task_id;
    } finally {
      ioBegin.restore();
    }

    const ioComplete = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "complete",
        taskId,
        "--result",
        "Shortcut should fail before verify",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(ioComplete.stderr).toContain("task complete requires --commit <hash>");
    } finally {
      ioComplete.restore();
    }

    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "DOING"');
    expect(readme).toContain('state: "pending"');
    expect(readme).not.toContain("Shortcut should fail before verify");
  });

  it("task complete records branch_pr verification and prints the PR route", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Branch complete shortcut",
        "--description",
        "verify only",
        "--owner",
        "CODER",
        "--tag",
        "code",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }
    expect(
      await runCli([
        "task",
        "plan",
        "set",
        taskId,
        "--text",
        "1. Verify the route.",
        "--updated-by",
        "ORCHESTRATOR",
        "--root",
        root,
      ]),
    ).toBe(0);
    expect(
      await runCli(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]),
    ).toBe(0);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "complete",
        taskId,
        "--result",
        "Ready for PR",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(JSON.parse(io.stdout.trim())).toMatchObject({
        task_id: taskId,
        status: "verified",
      });
    } finally {
      io.restore();
    }
    const readme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('state: "ok"');
  });
});
