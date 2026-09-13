import { describe, expect, it } from "vitest";

import {
  advanceSupervisorExecutionEpisodeState,
  authorizeSupervisorTokenBudgetEpoch,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

const FINGERPRINT = `sha256:${"1".repeat(64)}`;
const AUTHORITY_DIGEST = `sha256:${"2".repeat(64)}`;

function stoppedTelemetryJournal(): SupervisorExecutionEpisodeJournal {
  const initial = createSupervisorExecutionEpisodeJournal({
    task_id: "TASK-1",
    task_revision: 1,
    state_fingerprint_digest: FINGERPRINT,
    budget: {
      max_episodes: 20,
      max_agent_runs: 10,
      max_input_tokens: 100,
      max_output_tokens: 100,
      max_total_tokens: 200,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
    now: "2026-09-13T00:00:00.000Z",
  });
  const started = startSupervisorExecutionEpisode({
    journal: initial,
    role: "PLANNER",
    kind: "agent_episode",
    operation_identity: { task: "TASK-1", turn: 1 },
    precondition_fingerprint_digest: FINGERPRINT,
    now: "2026-09-13T00:00:01.000Z",
  });
  if (started.status !== "started") throw new Error("expected planner intent");
  const completed = completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { status: "completed" },
    usage_attribution: {
      state: "unallocatable",
      reason: "external_host_turn_not_task_attributable",
    },
    now: "2026-09-13T00:00:02.000Z",
  });
  const ready = advanceSupervisorExecutionEpisodeState({
    journal: completed,
    state_fingerprint_digest: FINGERPRINT,
    route_observation: { phase: "implementation" },
    now: "2026-09-13T00:00:03.000Z",
  });
  const stopped = startSupervisorExecutionEpisode({
    journal: ready,
    role: "EXECUTOR",
    kind: "agent_episode",
    operation_identity: { task: "TASK-1", turn: 2 },
    precondition_fingerprint_digest: FINGERPRINT,
    now: "2026-09-13T00:00:04.000Z",
  });
  if (stopped.status !== "stopped") throw new Error("expected telemetry stop");
  return stopped.journal;
}

function stoppedTelemetryJournalAfterFailedOperation(): SupervisorExecutionEpisodeJournal {
  const stopped = stoppedTelemetryJournal();
  const authorized = authorize(stopped);
  const started = startSupervisorExecutionEpisode({
    journal: authorized,
    role: "EXECUTOR",
    kind: "agent_episode",
    operation_identity: { task: "TASK-1", turn: 2 },
    precondition_fingerprint_digest: FINGERPRINT,
    now: "2026-09-13T00:00:06.000Z",
  });
  if (started.status !== "started") throw new Error("expected executor intent");
  const failed = completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { status: "failed" },
    usage_attribution: { state: "unavailable", reason: "provider_result_not_observed" },
    failed: true,
    now: "2026-09-13T00:00:07.000Z",
  });
  const ready = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
    journal: failed,
    state_fingerprint_digest: FINGERPRINT,
    now: "2026-09-13T00:00:08.000Z",
  });
  const next = startSupervisorExecutionEpisode({
    journal: ready,
    role: "EXECUTOR",
    kind: "agent_episode",
    operation_identity: { task: "TASK-1", turn: 3 },
    precondition_fingerprint_digest: FINGERPRINT,
    replacement_of_operation_key: failed.operations.at(-1)?.operation_key,
    now: "2026-09-13T00:00:09.000Z",
  });
  if (next.status !== "stopped") throw new Error("expected telemetry stop");
  return next.journal;
}

function authorize(
  journal: SupervisorExecutionEpisodeJournal,
  overrides: Partial<Parameters<typeof authorizeSupervisorTokenBudgetEpoch>[0]> = {},
) {
  return authorizeSupervisorTokenBudgetEpoch({
    journal,
    expected_journal_digest: journal.digest,
    authorized_state_fingerprint_digest: FINGERPRINT,
    authorized_by: "USER",
    authority_ref: "user:TASK-1:budget-epoch",
    authority_digest: AUTHORITY_DIGEST,
    budget: { max_input_tokens: 10, max_output_tokens: 10, max_total_tokens: 15 },
    now: "2026-09-13T00:00:05.000Z",
    ...overrides,
  });
}

describe("supervisor token budget epoch", () => {
  it("preserves historical unknown usage and admits spend only inside the new epoch", () => {
    const stopped = stoppedTelemetryJournal();
    const authorized = authorize(stopped);

    expect(authorized.status).toBe("running");
    expect(authorized.stop).toBeNull();
    expect(authorized.operations[0]?.usage_attribution?.state).toBe("unallocatable");
    expect(authorized.usage.input_tokens).toBe(0);
    expect(authorized.operations.at(-1)?.recovery?.context).toMatchObject({
      kind: "supervisor_token_budget_epoch",
      prior_journal_digest: stopped.digest,
      stopped_state_fingerprint_digest: FINGERPRINT,
      authorized_state_fingerprint_digest: FINGERPRINT,
      starts_after_operation_sequence: 1,
      baseline_usage: { input_tokens: 0, output_tokens: 0, total_tokens: 0 },
    });

    const started = startSupervisorExecutionEpisode({
      journal: authorized,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { task: "TASK-1", turn: 2 },
      precondition_fingerprint_digest: FINGERPRINT,
      now: "2026-09-13T00:00:06.000Z",
    });
    expect(started.status).toBe("started");
    if (started.status !== "started") return;
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { status: "completed" },
      usage: { input_tokens: 7, output_tokens: 3, total_tokens: 10 },
      provider_usage: {
        provider: "codex",
        run_id: "run-2",
        work_order_id: "work-order-2",
        thread_id: "thread-2",
        turn_id: "turn-2",
      },
      now: "2026-09-13T00:00:07.000Z",
    });
    expect(completed.status).toBe("running");
    expect(completed.usage.total_tokens).toBe(10);
  });

  it("blocks a new paid call when telemetry is unknown inside the authorized epoch", () => {
    const authorized = authorize(stoppedTelemetryJournal());
    const started = startSupervisorExecutionEpisode({
      journal: authorized,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { task: "TASK-1", turn: 2 },
      precondition_fingerprint_digest: FINGERPRINT,
    });
    if (started.status !== "started") throw new Error("expected executor intent");
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { status: "completed" },
      usage_attribution: { state: "unavailable", reason: "provider_identity_unavailable" },
    });
    const ready = advanceSupervisorExecutionEpisodeState({
      journal: completed,
      state_fingerprint_digest: FINGERPRINT,
      route_observation: { phase: "next" },
    });
    const next = startSupervisorExecutionEpisode({
      journal: ready,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { task: "TASK-1", turn: 3 },
      precondition_fingerprint_digest: FINGERPRINT,
    });
    expect(next.status).toBe("stopped");
    if (next.status === "stopped") {
      expect(next.stop.exhausted_dimensions).toEqual([
        "input_tokens_telemetry",
        "output_tokens_telemetry",
        "total_tokens_telemetry",
      ]);
    }
  });

  it("authorizes a new epoch after a durably failed operation with unknown telemetry", () => {
    const stopped = stoppedTelemetryJournalAfterFailedOperation();
    expect(stopped.operations.at(-1)?.status).toBe("failed");

    const authorized = authorize(stopped, { now: "2026-09-13T00:00:10.000Z" });

    expect(authorized.status).toBe("running");
    expect(authorized.stop).toBeNull();
    expect(authorized.operations.at(-1)?.recovery?.context).toMatchObject({
      kind: "supervisor_token_budget_epoch",
      starts_after_operation_sequence: 3,
    });
  });

  it("disables only token caps through an explicit USER epoch", () => {
    const stopped = stoppedTelemetryJournalAfterFailedOperation();
    const authorized = authorize(stopped, {
      budget: { max_input_tokens: null, max_output_tokens: null, max_total_tokens: null },
      now: "2026-09-13T00:00:10.000Z",
    });

    expect(authorized.operations.at(-1)?.recovery?.context).toMatchObject({
      budget: { max_input_tokens: null, max_output_tokens: null, max_total_tokens: null },
    });
    const next = startSupervisorExecutionEpisode({
      journal: authorized,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { task: "TASK-1", turn: 4 },
      precondition_fingerprint_digest: FINGERPRINT,
    });
    expect(next.status).toBe("started");
    expect(next.journal.budget.max_agent_runs).toBe(10);
    expect(next.journal.budget.max_episodes).toBe(20);
  });

  it("is replay-safe and rejects stale or conflicting authorization", () => {
    const stopped = stoppedTelemetryJournal();
    const authorized = authorize(stopped);
    expect(
      authorize(authorized, {
        expected_journal_digest: stopped.digest,
        now: "2026-09-13T00:01:00.000Z",
      }).digest,
    ).toBe(authorized.digest);
    expect(() =>
      authorize(authorized, {
        expected_journal_digest: stopped.digest,
        budget: { max_input_tokens: 11, max_output_tokens: 10, max_total_tokens: 15 },
      }),
    ).toThrow(/stale or conflicts with replay/u);
    expect(() =>
      authorize(stopped, { expected_journal_digest: digestSupervisorEpisodeValue("stale") }),
    ).toThrow(/stale or conflicts with replay/u);
  });

  it("rejects non-USER authority, invalid caps, and human review without mutation", () => {
    const stopped = stoppedTelemetryJournal();
    expect(() => authorize(stopped, { authorized_by: "POLICY" })).toThrow();
    expect(() =>
      authorize(stopped, {
        budget: { max_input_tokens: 0, max_output_tokens: 10, max_total_tokens: 15 },
      }),
    ).toThrow();
    const ready = createSupervisorExecutionEpisodeJournal({
      task_id: "TASK-2",
      task_revision: 1,
      state_fingerprint_digest: FINGERPRINT,
      budget: {
        max_episodes: 20,
        max_agent_runs: 10,
        max_input_tokens: 100,
        max_output_tokens: 100,
        max_total_tokens: 200,
        max_wall_time_ms: null,
        max_changed_files: null,
        max_diff_lines: null,
        max_no_progress_episodes: null,
      },
    });
    const humanReview = stopSupervisorExecutionEpisode({ journal: ready, reason: "human_review" });
    expect(() => authorize(humanReview)).toThrow(/telemetry-only budget stop/u);
    expect(stopped.status).toBe("stopped");
  });
});
