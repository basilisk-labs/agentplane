import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { describe, expect, it } from "vitest";

const fingerprint = `sha256:${"a".repeat(64)}`;
const nextFingerprint = `sha256:${"b".repeat(64)}`;

describe("telemetry coverage and spend admission", () => {
  it("retains a valid verdict but blocks another paid dispatch when finite token coverage is unknown", () => {
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: "202609130000-TEL001",
      task_revision: 1,
      state_fingerprint_digest: fingerprint,
      budget: {
        max_episodes: 3,
        max_agent_runs: 3,
        max_input_tokens: 100,
        max_output_tokens: 100,
        max_total_tokens: 200,
        max_wall_time_ms: null,
        max_changed_files: null,
        max_diff_lines: null,
        max_no_progress_episodes: null,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { work_order_id: "work-order-1" },
      precondition_fingerprint_digest: fingerprint,
    });
    if (started.status !== "started") throw new Error("Expected evaluator episode to start.");
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { verdict: "pass" },
      provider_usage: {
        provider: "codex",
        run_id: "evaluator:work-order-1",
        work_order_id: "work-order-1",
        thread_id: null,
        turn_id: null,
      },
    });
    const applied = advanceSupervisorExecutionEpisodeState({
      journal: completed,
      state_fingerprint_digest: nextFingerprint,
      route_observation: { verdict_applied: "pass" },
    });

    const next = startSupervisorExecutionEpisode({
      journal: applied,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { work_order_id: "work-order-2" },
      precondition_fingerprint_digest: nextFingerprint,
    });

    expect(applied.operations).toHaveLength(1);
    expect(applied.operations[0]?.result_digest).not.toBeNull();
    expect(next).toMatchObject({
      status: "stopped",
      stop: {
        reason: "budget_exhausted",
        exhausted_dimensions: [
          "input_tokens_telemetry",
          "output_tokens_telemetry",
          "total_tokens_telemetry",
        ],
      },
      journal: { operations: [{ status: "completed" }] },
    });
  });
});
