import { describe, expect, it } from "vitest";

import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "./supervisor-execution-episode.js";

const digest = `sha256:${"a".repeat(64)}`;

describe("supervisor telemetry admission", () => {
  it("blocks another paid dispatch after unallocatable usage without provider identity", () => {
    const journal = createSupervisorExecutionEpisodeJournal({
      task_id: "T-UNKNOWN-USAGE",
      task_revision: 1,
      state_fingerprint_digest: digest,
      budget: {
        max_episodes: 10,
        max_agent_runs: 10,
        max_input_tokens: 100,
        max_output_tokens: 100,
        max_total_tokens: 200,
        max_wall_time_ms: 1000,
        max_changed_files: 10,
        max_diff_lines: null,
        max_no_progress_episodes: 2,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { transport: "external" },
      precondition_fingerprint_digest: digest,
    });
    if (started.status !== "started") throw new Error("fixture did not start");
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { status: "completed" },
      usage_attribution: {
        state: "unallocatable",
        reason: "external_host_turn_unallocatable",
      },
    });
    const ready = advanceSupervisorExecutionEpisodeState({
      journal: completed,
      state_fingerprint_digest: digest,
      route_observation: { next: "evaluator" },
    });

    const next = startSupervisorExecutionEpisode({
      journal: ready,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { evaluator: "recovery-context" },
      precondition_fingerprint_digest: digest,
    });

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
    });
    expect(next.journal.operations).toHaveLength(1);
  });
});
