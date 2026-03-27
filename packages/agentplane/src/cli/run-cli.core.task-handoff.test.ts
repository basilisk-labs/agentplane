import { chmod, mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  writeConfig,
} from "./run-cli.test-helpers.js";

installRunCliIntegrationHarness();

describe("runCli task handoff and recovery", () => {
  it("task reclaim records a deterministic handoff for a task without runner state", async () => {
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
            "Capture reclaim state without any runner artifacts yet.",
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
          "Original agent disconnected before any runner execution started.",
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
    } finally {
      io.restore();
    }
  });

  it("task handoff record/show/resume-context reuse the latest failed runner state", async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = {
      command: ["custom-runner"],
    };
    await writeConfig(root, config);

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Handoff failed run",
            "--description",
            "Capture deterministic recovery hints from the latest failed runner run.",
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
      "Start: move the task into DOING before creating a failed runner run for handoff testing.",
      "--root",
      root,
    ]);

    const fakeBinDir = path.join(root, "bin");
    const fakeRunnerPath = path.join(fakeBinDir, "custom-runner");
    await mkdir(fakeBinDir, { recursive: true });
    await writeFile(
      fakeRunnerPath,
      "#!/bin/sh\ncat >/dev/null\nprintf 'runner failed\\n' 1>&2\nexit 1\n",
      "utf8",
    );
    await chmod(fakeRunnerPath, 0o755);

    const originalPath = process.env.PATH;
    try {
      process.env.PATH = `${fakeBinDir}${path.delimiter}${originalPath ?? ""}`;
      expect(await runCliSilent(["task", "run", taskId, "--root", root])).toBe(1);
    } finally {
      process.env.PATH = originalPath;
    }

    const runsRoot = path.join(root, ".agentplane", "tasks", taskId, "runs");
    const runEntries = await readdir(runsRoot);
    const runIds = runEntries.toSorted();
    const runId = runIds[0] ?? "";
    expect(runId).toBeTruthy();

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "handoff",
            "record",
            taskId,
            "--from",
            "CODER",
            "--to",
            "CODER",
            "--reason",
            "Agent disconnected after a failed run and needs deterministic recovery hints.",
            "--json",
            "--root",
            root,
          ]),
        ).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          task_id: string;
          runner?: {
            run_id?: string | null;
            status?: string | null;
            next_action?: string | null;
            retry_command?: string | null;
          };
        };
        expect(payload.task_id).toBe(taskId);
        expect(payload.runner?.run_id).toBe(runId);
        expect(payload.runner?.status).toBe("failed");
        expect(payload.runner?.next_action).toBe("retry");
        expect(payload.runner?.retry_command).toBe(`agentplane task run retry ${taskId} ${runId}`);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "handoff", "show", taskId, "--json", "--root", root])).toBe(0);
        const payload = JSON.parse(io.stdout) as { runner?: { run_id?: string | null } };
        expect(payload.runner?.run_id).toBe(runId);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "resume-context", taskId, "--json", "--root", root])).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          task_id: string;
          latest_handoff?: { reason?: string } | null;
          runner?: { next_action?: string | null; next_command?: string | null };
        };
        expect(payload.task_id).toBe(taskId);
        expect(payload.latest_handoff?.reason).toContain("Agent disconnected");
        expect(payload.runner?.next_action).toBe("retry");
        expect(payload.runner?.next_command).toBe(`agentplane task run retry ${taskId} ${runId}`);
      } finally {
        io.restore();
      }
    }
  }, 20_000);
});
