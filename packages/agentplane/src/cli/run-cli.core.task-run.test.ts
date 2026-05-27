import { describe, expect, it } from "vitest";

import { readFile } from "node:fs/promises";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  writeDefaultConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

describe("runCli task run", () => {
  it("prepares a codex /goal bootstrap in dry-run mode", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Run task through Codex goal",
            "--description",
            "Exercise the public task runner dry-run path.",
            "--priority",
            "med",
            "--owner",
            "CODER",
            "--tag",
            "code",
            "--verify",
            "bun test packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts",
            "--root",
            root,
          ]),
        ).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Run the task through the Codex runner dry-run path.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move task into DOING so the runner can prepare execution artifacts.",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      expect(await runCli(["task", "run", taskId, "--dry-run", "--json", "--root", root])).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_id: string;
        mode: string;
        adapter_id: string;
        run_id: string;
        bootstrap_path: string;
        result_path: string;
      };
      expect(payload.task_id).toBe(taskId);
      expect(payload.mode).toBe("dry_run");
      expect(payload.adapter_id).toBe("codex");
      expect(payload.result_path).toContain(`/runs/`);

      const bootstrap = await readFile(payload.bootstrap_path, "utf8");
      expect(bootstrap.split("\n")[0]).toBe(
        `/goal Execute AgentPlane task ${taskId}: Run task through Codex goal`,
      );
      expect(bootstrap).toContain("Use bundle.json as the complete runner input.");
      expect(bootstrap).toContain("Execute-mode runs must write a valid JSON result manifest");
    } finally {
      io.restore();
    }

    {
      const io = captureStdIO();
      try {
        expect(await runCli(["task", "run", "status", taskId, "--json", "--root", root])).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          task_id: string;
          status: string;
          pid_alive: boolean | null;
          paths: { events: string; trace: string; state: string };
        };
        expect(payload.task_id).toBe(taskId);
        expect(payload.status).toBe("prepared");
        expect(payload.pid_alive).toBe(null);
        expect(payload.paths.events).toContain(`/runs/`);
        expect(payload.paths.state).toContain("state.json");
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "run",
            "inspect",
            taskId,
            "--events",
            "1",
            "--json",
            "--root",
            root,
          ]),
        ).toBe(0);
        const payload = JSON.parse(io.stdout) as {
          recent_events: { type: string }[];
          prepared_metadata: { prompt_count: number };
        };
        expect(payload.recent_events).toHaveLength(1);
        expect(payload.recent_events[0]?.type).toBe("runner_prepared");
        expect(payload.prepared_metadata.prompt_count).toBeGreaterThan(0);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "run",
            "logs",
            taskId,
            "--stream",
            "events",
            "--tail",
            "1",
            "--root",
            root,
          ]),
        ).toBe(0);
        expect(io.stdout).toContain("runner_prepared");
      } finally {
        io.restore();
      }
    }
  });
});
