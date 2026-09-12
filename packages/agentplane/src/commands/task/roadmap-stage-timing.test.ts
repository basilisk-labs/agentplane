import { describe, expect, it } from "vitest";

import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";

import {
  buildMonotonicLifecycleTiming,
  type MonotonicStageObservation,
} from "../shared/lifecycle-stage-timing.js";

const digest = `sha256:${"a".repeat(64)}`;
const span = (
  span_id: string,
  stage: MonotonicStageObservation["stage"],
  category: MonotonicStageObservation["category"],
  started_ms: number,
  ended_ms: number,
): MonotonicStageObservation => ({
  span_id,
  parent_span_id: "lifecycle-1",
  stage,
  category,
  started_ms,
  ended_ms,
});

describe("roadmap lifecycle stage timing", () => {
  it("partitions bounded monotonic stages without overlap double counting", () => {
    const timing = buildMonotonicLifecycleTiming({
      root_span_id: "lifecycle-1",
      started_ms: 0,
      ended_ms: 1000,
      spans: [
        span("prepare", "preparation", "local_work", 0, 100),
        span("dispatch", "semantic_dispatch", "external_wait", 100, 400),
        span("mutation", "first_scoped_mutation", "local_work", 400, 400),
        span("verify", "native_verification", "local_work", 400, 550),
        span("review", "review", "external_wait", 550, 700),
        span("provider", "provider_or_integration", "external_wait", 700, 800),
        span("verified", "verified_state", "local_work", 800, 800),
        span("close", "closure", "local_work", 800, 900),
        span("user", "lifecycle", "user_wait", 900, 950),
        span("external", "lifecycle", "external_wait", 950, 1000),
      ],
    });

    expect(timing.elapsed_ms).toBe(1000);
    expect(timing.partitioned_ms).toEqual({
      local_work: 350,
      user_wait: 50,
      external_wait: 600,
    });
    expect(Object.values(timing.partitioned_ms).reduce((sum, value) => sum + value, 0)).toBe(
      timing.elapsed_ms,
    );
    expect(timing.spans.every((span) => span.elapsed_ms >= 0)).toBe(true);
    expect(timing.spans.slice(1).every((span) => span.parent_span_id === "lifecycle-1")).toBe(true);
  });

  it("uses monotonic samples so a backward wall clock cannot create negative elapsed time", () => {
    const timing = buildMonotonicLifecycleTiming({
      root_span_id: "lifecycle-clock",
      started_ms: 100,
      ended_ms: 90,
    });

    expect(timing.elapsed_ms).toBe(0);
    expect(timing.partitioned_ms).toEqual({
      local_work: 0,
      user_wait: 0,
      external_wait: 0,
    });
  });

  it("persists timing on the existing journal operation instead of a second aggregate", () => {
    const journal = createSupervisorExecutionEpisodeJournal({
      task_id: "202609130000-TIMING",
      task_revision: 1,
      state_fingerprint_digest: digest,
      budget: {
        max_episodes: 5,
        max_agent_runs: 5,
        max_input_tokens: null,
        max_output_tokens: null,
        max_total_tokens: null,
        max_wall_time_ms: null,
        max_changed_files: null,
        max_diff_lines: null,
        max_no_progress_episodes: null,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { attempt: 1 },
      precondition_fingerprint_digest: digest,
    });
    if (started.status !== "started") throw new Error("timing fixture did not start");
    const timing = buildMonotonicLifecycleTiming({
      root_span_id: started.operation_key,
      started_ms: 10,
      ended_ms: 35,
      spans: [
        {
          span_id: `${started.operation_key}:semantic_dispatch`,
          parent_span_id: started.operation_key,
          stage: "semantic_dispatch",
          category: "external_wait",
          started_ms: 10,
          ended_ms: 35,
        },
      ],
    });
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { status: "completed" },
      lifecycle_timing: timing,
    });

    expect(completed.operations).toHaveLength(1);
    expect(completed.operations[0]?.lifecycle_timing).toEqual(timing);
  });
});
