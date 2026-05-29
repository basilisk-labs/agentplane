import { readFile, writeFile } from "node:fs/promises";

import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
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
});
