import { describe, expect, it } from "vitest";

import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "./supervisor-execution-episode.js";

const digest = `sha256:${"a".repeat(64)}`;

function completeWithTiming(spans: Record<string, unknown>[]): void {
  const journal = createSupervisorExecutionEpisodeJournal({
    task_id: "T-TIMING",
    task_revision: 1,
    state_fingerprint_digest: digest,
    budget: {
      max_episodes: 2,
      max_agent_runs: 2,
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
    operation_identity: { test: "timing" },
    precondition_fingerprint_digest: digest,
    authority_ref: null,
    authority_digest: null,
    work_order_ref: null,
    effect_ref: null,
  });
  if (started.status !== "started") throw new Error("fixture did not start");
  completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { ok: true },
    lifecycle_timing: {
      schema_version: 1,
      clock: "monotonic",
      root_span_id: "root",
      elapsed_ms: 10,
      partitioned_ms: { local_work: 10, user_wait: 0, external_wait: 0 },
      spans,
    } as never,
  });
}

const root = {
  span_id: "root",
  parent_span_id: null,
  stage: "lifecycle",
  category: "local_work",
  offset_ms: 0,
  elapsed_ms: 10,
};

describe("supervisor lifecycle timing validation", () => {
  it.each([
    [
      "overlapping siblings",
      [
        root,
        { ...root, span_id: "a", parent_span_id: "root", stage: "preparation", elapsed_ms: 8 },
        {
          ...root,
          span_id: "b",
          parent_span_id: "root",
          stage: "review",
          offset_ms: 2,
          elapsed_ms: 8,
        },
      ],
    ],
    ["partial root coverage", [{ ...root, elapsed_ms: 9 }]],
    [
      "a parent cycle",
      [
        root,
        { ...root, span_id: "a", parent_span_id: "b", elapsed_ms: 5 },
        { ...root, span_id: "b", parent_span_id: "a", elapsed_ms: 5 },
      ],
    ],
    [
      "a child outside its parent",
      [
        root,
        { ...root, span_id: "parent", parent_span_id: "root", elapsed_ms: 5 },
        { ...root, span_id: "child", parent_span_id: "parent", offset_ms: 4, elapsed_ms: 2 },
      ],
    ],
  ])("rejects %s", (_label, spans) => {
    expect(() => completeWithTiming(spans)).toThrow(/Lifecycle timing/u);
  });
});
