import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

describe("runCli task handoff and recovery", () => {
  it("task reclaim records a deterministic handoff for a task awaiting a local agent", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, defaultConfig());

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Handoff without run",
            "--description",
            "Capture reclaim state before another local agent has picked up the task.",
            "--owner",
            "CODER",
            "--tag",
            "workflow",
            "--root",
            root,
          ]),
        ).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move the task into DOING before reclaiming it through the handoff surface.",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "reclaim",
          taskId,
          "--author",
          "CODER",
          "--reason",
          "Original agent disconnected before another local agent picked up the task.",
          "--json",
          "--root",
          root,
        ]),
      ).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_id: string;
        to_role?: string | null;
        runner?: { next_action?: string | null; next_command?: string | null };
      };
      expect(payload.task_id).toBe(taskId);
      expect(payload.to_role).toBe("CODER");
      expect(payload.runner?.next_action).toBe("run");
      expect(payload.runner?.next_command).toBe(`agentplane task run ${taskId}`);
      expect(io.stdout).toBe(`${JSON.stringify(payload, null, 2)}\n`);
    } finally {
      io.restore();
    }
  });

  it("task reclaim cancels a stale running runner before recording handoff", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, defaultConfig());

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Stale runner reclaim",
            "--description",
            "Exercise reclaim recovery after a runner process disappears.",
            "--owner",
            "CODER",
            "--tag",
            "workflow",
            "--root",
            root,
          ]),
        ).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: prepare a task runner artifact before simulating a stale PID.",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "run", taskId, "--dry-run", "--root", root]);

    let statePath = "";
    const statusIo = captureStdIO();
    try {
      expect(await runCli(["task", "run", "status", taskId, "--json", "--root", root])).toBe(0);
      const payload = JSON.parse(statusIo.stdout) as { paths: { state: string } };
      statePath = payload.paths.state;
    } finally {
      statusIo.restore();
    }
    const state = JSON.parse(await readFile(statePath, "utf8")) as Record<string, unknown>;
    await writeFile(
      statePath,
      `${JSON.stringify(
        {
          ...state,
          status: "running",
          supervision: {
            pid: 999_999,
            started_at: "2026-05-29T19:14:00.000Z",
            heartbeat_at: "2026-05-29T19:14:01.000Z",
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const reclaimIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "reclaim",
          taskId,
          "--author",
          "CODER",
          "--reason",
          "stale runner pid is no longer alive",
          "--root",
          root,
        ]),
      ).toBe(0);
      expect(reclaimIo.stdout).toContain("task reclaimed");
    } finally {
      reclaimIo.restore();
    }

    const reclaimedState = JSON.parse(await readFile(statePath, "utf8")) as Record<string, unknown>;
    expect(reclaimedState.status).toBe("cancelled");

    const nextIo = captureStdIO();
    try {
      expect(await runCli(["task", "next-action", taskId, "--json", "--root", root])).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        next_action: { code: string; command: string };
      };
      expect(parsed.next_action.command).not.toContain("task reclaim");
      expect(parsed.next_action).toMatchObject({
        code: "retry",
        command: `agentplane task run ${taskId}`,
      });
    } finally {
      nextIo.restore();
    }
  }, 15_000);

  it("resume-context reads the task branch state and PR metadata before stale base artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await writeFile(path.join(root, "base.txt"), "base\n", "utf8");
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed branch_pr base"], { cwd: root });

    let taskId = "";
    const taskIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          "Resume branch snapshot",
          "--description",
          "Resume context must ignore stale base task artifacts before integration.",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = taskIo.stdout.trim();
    } finally {
      taskIo.restore();
    }
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: persist stale base task"], { cwd: root });

    const branch = `task/${taskId}/resume-snapshot`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const branchReadme = await readFile(readmePath, "utf8");
    await writeFile(
      readmePath,
      branchReadme.replace(/status:\s*["']?TODO["']?/u, 'status: "DONE"'),
      "utf8",
    );
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify({
        schema_version: 1,
        task_id: taskId,
        branch,
        base: "main",
        status: "OPEN",
        pr_number: 321,
        pr_url: "https://github.com/example/repo/pull/321",
        created_at: "2026-07-25T00:00:00.000Z",
        updated_at: "2026-07-25T00:00:00.000Z",
      })}\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: add task branch resume metadata"], {
      cwd: root,
    });
    await execFileAsync("git", ["checkout", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      expect(await runCli(["task", "resume-context", taskId, "--json", "--root", root])).toBe(0);
      const parsed = JSON.parse(io.stdout) as {
        task_status: string;
        base_branch: string | null;
        pr_branch: string | null;
      };
      expect(parsed).toMatchObject({
        task_status: "DONE",
        base_branch: "main",
        pr_branch: branch,
      });
    } finally {
      io.restore();
    }
  });
});
