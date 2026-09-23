import { describe, expect, it } from "vitest";

import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  markSupervisorExecutionEpisodeIntentDispatched,
  recoverSupervisorExecutionEpisodeJournal,
  reopenSupervisorExecutionEpisodeAfterHumanReviewStateChange,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
} from "./supervisor-execution-episode.js";

const FINGERPRINT = `sha256:${"a".repeat(64)}` as const;
const NEXT_FINGERPRINT = `sha256:${"b".repeat(64)}` as const;

function stoppedHumanReview() {
  const journal = createSupervisorExecutionEpisodeJournal({
    task_id: "T-human-review",
    task_revision: 1,
    state_fingerprint_digest: FINGERPRINT,
    budget: {
      max_episodes: 3,
      max_agent_runs: 2,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: 10_000,
      max_changed_files: 4,
      max_diff_lines: 40,
      max_no_progress_episodes: 2,
    },
  });
  const started = startSupervisorExecutionEpisode({
    journal,
    role: "EVALUATOR",
    kind: "evaluator_episode",
    operation_identity: { command: "fixture" },
    precondition_fingerprint_digest: FINGERPRINT,
    authority_ref: "evaluator:fixture",
    authority_digest: FINGERPRINT,
  });
  if (started.status !== "started") throw new Error("expected started episode");
  const completed = completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { verdict: "human_review" },
  });
  return stopSupervisorExecutionEpisode({ journal: completed, reason: "human_review" });
}

describe("human-review supervisor replacement", () => {
  it("requires changed state or a distinct replacement effect", () => {
    const stopped = stoppedHumanReview();
    expect(() =>
      reopenSupervisorExecutionEpisodeAfterHumanReviewStateChange({
        journal: stopped,
        state_fingerprint_digest: FINGERPRINT,
      }),
    ).toThrow(/changed state or a distinct replacement effect/u);
    expect(
      reopenSupervisorExecutionEpisodeAfterHumanReviewStateChange({
        journal: stopped,
        state_fingerprint_digest: FINGERPRINT,
        replacement_effect_ref: "evaluator-work-order:distinct",
      }),
    ).toMatchObject({ status: "running", stop: null, operations: [{ status: "completed" }] });
    expect(
      reopenSupervisorExecutionEpisodeAfterHumanReviewStateChange({
        journal: stopped,
        state_fingerprint_digest: NEXT_FINGERPRINT,
      }),
    ).toMatchObject({ status: "running", state_fingerprint_digest: NEXT_FINGERPRINT });
  });
});

describe("agent dispatch recovery", () => {
  it("keeps an interrupted dispatched intent in doubt instead of authorizing replacement", () => {
    const journal = createSupervisorExecutionEpisodeJournal({
      task_id: "T-dispatch",
      task_revision: 1,
      state_fingerprint_digest: FINGERPRINT,
      budget: {
        max_episodes: 3,
        max_agent_runs: 2,
        max_input_tokens: null,
        max_output_tokens: null,
        max_total_tokens: null,
        max_wall_time_ms: 10_000,
        max_changed_files: 4,
        max_diff_lines: 40,
        max_no_progress_episodes: 2,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { purpose: "implementation_rework" },
      precondition_fingerprint_digest: FINGERPRINT,
      authority_ref: "branch-pr:T-dispatch",
      authority_digest: FINGERPRINT,
    });
    if (started.status !== "started") throw new Error("expected started episode");
    const dispatched = markSupervisorExecutionEpisodeIntentDispatched({
      journal: started.journal,
      operation_key: started.operation_key,
      dispatch_ref: "run-1:work-order-1",
    });

    expect(
      recoverSupervisorExecutionEpisodeJournal({
        journal: dispatched,
        state_fingerprint_digest: FINGERPRINT,
      }),
    ).toMatchObject({
      status: "stopped",
      stop: { reason: "effect_in_doubt", operation_key: started.operation_key },
      operations: [{ status: "intent" }],
    });
  });
});
