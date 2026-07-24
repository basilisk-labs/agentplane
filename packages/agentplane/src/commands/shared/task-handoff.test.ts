import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildRunnerHintCommands,
  buildTaskHandoffArtifact,
  readTaskHandoffLatest,
  resolveTaskHandoffPaths,
} from "./task-handoff.js";

describe("task handoff runner hints", () => {
  it("routes blocked runner states to recovery instead of verification", () => {
    expect(
      buildRunnerHintCommands({
        task_id: "202606041738-A531FX",
        run_id: "run-blocked",
        status: "blocked",
      }),
    ).toEqual({
      next_action: "retry",
      next_command: "agentplane task run 202606041738-A531FX",
      resume_command: "agentplane task run status 202606041738-A531FX --run-id run-blocked",
      retry_command: "agentplane task run 202606041738-A531FX",
    });
  });

  it("persists stable runner references without clone-dependent paths", () => {
    const taskId = "202606041738-A531FX";
    const runId = "run-blocked";
    const receiptLocator = `agentplane-run://tasks/${taskId}/${runId}/execution-receipt.json`;
    const handoff = buildTaskHandoffArtifact({
      task_id: taskId,
      created_at: "2026-07-24T00:00:00.000Z",
      from_role: "CODER",
      reason: "Runner requires a durable recovery handoff.",
      runner: {
        run_id: runId,
        status: "blocked",
        next_action: "retry",
        next_command: `agentplane task run ${taskId}`,
        resume_command: `agentplane task run status ${taskId} --run-id ${runId}`,
        retry_command: `agentplane task run ${taskId}`,
        state_path: `/Users/alice/project/.git/agentplane/runner/tasks/${taskId}/runs/${runId}/run-state.json`,
        trace_path: `/Users/alice/project/.git/agentplane/runner/tasks/${taskId}/runs/${runId}/agent-trace.jsonl`,
      },
      evidence_paths: [
        `/Users/alice/project/.git/agentplane/runner/tasks/${taskId}/runs/${runId}/agent-trace.jsonl`,
        `.agentplane/tasks/${taskId}/runs/${runId}/agent-trace.jsonl`,
        "docs/verification.md",
        receiptLocator,
      ],
    });

    expect(handoff.runner).not.toHaveProperty("state_path");
    expect(handoff.runner).not.toHaveProperty("trace_path");
    expect(handoff.runner).toMatchObject({
      run_id: runId,
      status: "blocked",
      resume_command: `agentplane task run status ${taskId} --run-id ${runId}`,
    });
    expect(handoff.evidence_paths).toEqual(["docs/verification.md", receiptLocator]);
  });

  it("continues reading legacy handoffs that contain local runner paths", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-legacy-handoff-"));
    try {
      const taskId = "202606041738-A531FX";
      const paths = resolveTaskHandoffPaths({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
      });
      const legacy = buildTaskHandoffArtifact({
        task_id: taskId,
        created_at: "2026-07-24T00:00:00.000Z",
        from_role: "CODER",
        reason: "Legacy handoff compatibility fixture.",
        runner: {
          run_id: "legacy-run",
          status: "failed",
          next_action: "retry",
          next_command: `agentplane task run ${taskId}`,
          resume_command: `agentplane task run status ${taskId} --run-id legacy-run`,
          retry_command: `agentplane task run ${taskId}`,
        },
      });
      const legacyStatePath = `${root}/.git/agentplane/runner/tasks/${taskId}/runs/legacy-run/run-state.json`;
      const legacyTracePath = `${root}/.git/agentplane/runner/tasks/${taskId}/runs/legacy-run/agent-trace.jsonl`;
      legacy.runner = {
        ...legacy.runner,
        state_path: legacyStatePath,
        trace_path: legacyTracePath,
      };
      await mkdir(paths.handoff_dir, { recursive: true });
      await writeFile(paths.latest_path, `${JSON.stringify(legacy, null, 2)}\n`, "utf8");

      const loaded = await readTaskHandoffLatest(paths);

      expect(loaded?.runner?.state_path).toBe(legacyStatePath);
      expect(loaded?.runner?.trace_path).toBe(legacyTracePath);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
