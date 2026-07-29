import { describe, expect, it } from "vitest";

import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  advanceSupervisorExecutionEpisodeState,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  recoverSupervisorExecutionEpisodeJournal,
  reopenCompletedSupervisorExecutionEpisodeAfterStaleState,
  retryFailedSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
  type SupervisorExecutionBudget,
} from "./supervisor-execution-episode.js";
import { migrateSupervisorExecutionEpisodeJournal } from "./supervisor-execution-episode-migration.js";

const FINGERPRINT = `sha256:${"a".repeat(64)}`;
const NEXT_FINGERPRINT = `sha256:${"b".repeat(64)}`;
const NOW = "2026-07-28T00:00:00.000Z";

function budget(overrides: Partial<SupervisorExecutionBudget> = {}): SupervisorExecutionBudget {
  return {
    max_episodes: 3,
    max_agent_runs: 2,
    max_input_tokens: 100,
    max_output_tokens: 100,
    max_total_tokens: 200,
    max_wall_time_ms: 10_000,
    max_changed_files: 4,
    max_diff_lines: 40,
    max_no_progress_episodes: 2,
    ...overrides,
  };
}

function journal(overrides: Partial<SupervisorExecutionBudget> = {}) {
  return createSupervisorExecutionEpisodeJournal({
    task_id: "T-episode",
    task_revision: 7,
    state_fingerprint_digest: FINGERPRINT,
    budget: budget(overrides),
    now: NOW,
  });
}

function start(opts: {
  journal: ReturnType<typeof journal>;
  kind?: "agent_episode" | "cli_operation" | "evaluator_episode" | "side_effect";
  now?: string;
}) {
  return startSupervisorExecutionEpisode({
    journal: opts.journal,
    role: opts.kind === "evaluator_episode" ? "EVALUATOR" : "EXECUTOR",
    kind: opts.kind ?? "agent_episode",
    operation_identity: { command: "fixture", attempt: opts.journal.usage.episodes + 1 },
    precondition_fingerprint_digest: FINGERPRINT,
    authority_ref: "work-order:fixture",
    authority_digest: FINGERPRINT,
    work_order_ref: "work-order:fixture",
    now: opts.now ?? NOW,
  });
}

describe("SupervisorExecutionEpisodeJournal", () => {
  it("is canonical and binds the task state to its digest", () => {
    const first = journal();
    const second = journal();

    expect(second).toEqual(first);
    expect(first.digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(validateSupervisorExecutionEpisodeJournal(first)).toEqual(first);
    expect(() => validateSupervisorExecutionEpisodeJournal({ ...first, task_id: "other" })).toThrow(
      "digest mismatch",
    );
  });

  it("rejects an impossible agent-run budget before it can enter a journal", () => {
    expect(() => journal({ max_episodes: 1, max_agent_runs: 2 })).toThrow(
      "max_agent_runs cannot exceed max_episodes",
    );
  });

  it("migrates absent and legacy empty journals idempotently", () => {
    const create = {
      task_id: "T-episode",
      task_revision: 7,
      state_fingerprint_digest: FINGERPRINT,
      budget: budget(),
      now: NOW,
    };
    const absent = migrateSupervisorExecutionEpisodeJournal({ input: null, create });
    const legacy = migrateSupervisorExecutionEpisodeJournal({
      input: {
        schema_version: 0,
        kind: "supervisor_execution_episode",
        task_id: "T-episode",
        task_revision: 7,
        state_fingerprint_digest: FINGERPRINT,
        budget: { ignored_by_v0: true },
        started_at: NOW,
      },
      create,
    });
    const repeated = migrateSupervisorExecutionEpisodeJournal({ input: legacy.journal, create });

    expect(absent).toMatchObject({ source: "absent", migrated: true });
    expect(legacy).toMatchObject({ source: "legacy_v0", migrated: true });
    expect(repeated).toEqual({ journal: legacy.journal, source: "current", migrated: false });
  });

  it("reserves the episode and agent-run budget before a provider launch", () => {
    const prepared = start({ journal: journal({ max_episodes: 1, max_agent_runs: 1 }) });
    expect(prepared.status).toBe("started");
    if (prepared.status !== "started") throw new Error("expected started episode");

    const completed = completeSupervisorExecutionEpisode({
      journal: prepared.journal,
      operation_key: prepared.operation_key,
      result: { status: "ok" },
      usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15, wall_time_ms: 20 },
      progress: { head: "one" },
      now: "2026-07-28T00:00:01.000Z",
    });
    const next = start({ journal: completed, now: "2026-07-28T00:00:02.000Z" });

    expect(completed.usage).toMatchObject({ episodes: 1, agent_runs: 1, total_tokens: 15 });
    expect(prepared.journal.operations[0]).not.toHaveProperty("replacement_of_operation_key");
    expect(next).toMatchObject({
      status: "stopped",
      stop: { reason: "budget_exhausted", exhausted_dimensions: ["episodes"] },
    });
  });

  it("charges wall-time budget only from observed execution, not inactive journal age", () => {
    const first = start({ journal: journal({ max_wall_time_ms: 10 }) });
    if (first.status !== "started") throw new Error("expected first agent episode");

    const firstCompleted = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { status: "ok" },
      usage: { wall_time_ms: 9 },
      now: "2026-07-28T00:00:01.000Z",
    });
    const resumedAfterExternalWait = advanceSupervisorExecutionEpisodeState({
      journal: firstCompleted,
      state_fingerprint_digest: FINGERPRINT,
      route_observation: { step: "external-wait-complete" },
      now: "2026-07-29T00:00:00.000Z",
    });
    const second = start({
      journal: resumedAfterExternalWait,
      now: "2026-07-29T00:00:01.000Z",
    });
    if (second.status !== "started")
      throw new Error("expected second agent episode after external wait");

    const exhausted = completeSupervisorExecutionEpisode({
      journal: second.journal,
      operation_key: second.operation_key,
      result: { status: "ok" },
      usage: { wall_time_ms: 1 },
      now: "2026-07-29T00:00:02.000Z",
    });

    expect(exhausted).toMatchObject({
      status: "stopped",
      usage: { wall_time_ms: 10 },
      stop: { reason: "budget_exhausted", exhausted_dimensions: ["wall_time_ms"] },
    });
  });

  it("fails closed after a persisted operation intent instead of replaying an agent", () => {
    const prepared = start({ journal: journal() });
    expect(prepared.status).toBe("started");
    if (prepared.status !== "started") throw new Error("expected started episode");

    const recovered = recoverSupervisorExecutionEpisodeJournal({
      journal: prepared.journal,
      state_fingerprint_digest: FINGERPRINT,
      now: "2026-07-28T00:00:01.000Z",
    });

    expect(recovered).toMatchObject({
      status: "stopped",
      cursor: { phase: "stopped" },
      stop: { reason: "effect_in_doubt", operation_key: prepared.operation_key },
    });
  });

  it("records successful completion as a terminal journal that cannot start another operation", () => {
    const terminal = stopSupervisorExecutionEpisode({
      journal: journal(),
      reason: "completed",
      now: "2026-07-28T00:00:01.000Z",
    });
    const next = start({ journal: terminal, now: "2026-07-28T00:00:02.000Z" });

    expect(terminal).toMatchObject({
      status: "stopped",
      cursor: { phase: "stopped", operation_key: null },
      stop: { reason: "completed", exhausted_dimensions: [] },
    });
    expect(next).toMatchObject({ status: "stopped", stop: { reason: "completed" } });
  });

  it("retries only a durably failed CLI operation without resetting shared usage", () => {
    const first = start({ journal: journal(), kind: "cli_operation" });
    if (first.status !== "started") throw new Error("expected started CLI operation");
    const failed = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { code: "lint_failed" },
      failed: true,
      now: "2026-07-28T00:00:01.000Z",
    });
    const retried = retryFailedSupervisorExecutionEpisode({
      journal: failed,
      state_fingerprint_digest: FINGERPRINT,
      next_kind: "cli_operation",
      now: "2026-07-28T00:00:02.000Z",
    });
    const second = start({
      journal: retried,
      kind: "cli_operation",
      now: "2026-07-28T00:00:03.000Z",
    });

    expect(failed.stop).toMatchObject({ reason: "operation_failed" });
    expect(retried).toMatchObject({
      status: "running",
      stop: null,
      cursor: { phase: "ready", operation_key: null },
      usage: { episodes: 1, agent_runs: 0 },
    });
    expect(second.status).toBe("started");
    if (second.status === "started") expect(second.journal.usage.episodes).toBe(2);
  });

  it("preserves a completed outcome for a later postcondition refresh", () => {
    const first = start({ journal: journal() });
    if (first.status !== "started") throw new Error("expected started episode");
    const completed = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { status: "ok" },
      now: "2026-07-28T00:00:01.000Z",
    });

    const recovered = recoverSupervisorExecutionEpisodeJournal({
      journal: completed,
      state_fingerprint_digest: NEXT_FINGERPRINT,
      now: "2026-07-28T00:00:02.000Z",
    });

    expect(recovered).toMatchObject({
      status: "running",
      cursor: { phase: "completed", operation_key: first.operation_key },
      stop: null,
    });
  });

  it("accepts the supervisor-observed route refresh before the next operation", () => {
    const first = start({ journal: journal() });
    if (first.status !== "started") throw new Error("expected started episode");
    const completed = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { status: "ok" },
      now: "2026-07-28T00:00:01.000Z",
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: completed,
      state_fingerprint_digest: NEXT_FINGERPRINT,
      route_observation: { phase: "next" },
      now: "2026-07-28T00:00:02.000Z",
    });
    const next = startSupervisorExecutionEpisode({
      journal: advanced,
      role: "CURATOR",
      kind: "agent_episode",
      operation_identity: { command: "next" },
      precondition_fingerprint_digest: NEXT_FINGERPRINT,
      now: "2026-07-28T00:00:03.000Z",
    });

    expect(advanced).toMatchObject({
      cursor: { phase: "ready", operation_key: null },
      state_fingerprint_digest: NEXT_FINGERPRINT,
      operations: [{ postcondition_fingerprint_digest: NEXT_FINGERPRINT }],
    });
    expect(next.status).toBe("started");
  });

  it("stops recovery on a changed StateFingerprint before a new operation", () => {
    const recovered = recoverSupervisorExecutionEpisodeJournal({
      journal: journal(),
      state_fingerprint_digest: NEXT_FINGERPRINT,
      now: "2026-07-28T00:00:01.000Z",
    });

    expect(recovered.stop).toMatchObject({ reason: "stale_state" });
    expect(start({ journal: recovered })).toMatchObject({
      status: "stopped",
      stop: { reason: "stale_state" },
    });
  });

  it("reopens only a completed stale-state journal with its bounded usage intact", () => {
    const first = start({ journal: journal() });
    if (first.status !== "started") throw new Error("expected started episode");
    const completed = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { status: "ok" },
      usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15 },
      now: "2026-07-28T00:00:01.000Z",
    });
    const ready = advanceSupervisorExecutionEpisodeState({
      journal: completed,
      state_fingerprint_digest: FINGERPRINT,
      route_observation: { phase: "applied" },
      now: "2026-07-28T00:00:02.000Z",
    });
    const stale = startSupervisorExecutionEpisode({
      journal: ready,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { command: "next" },
      precondition_fingerprint_digest: NEXT_FINGERPRINT,
      now: "2026-07-28T00:00:03.000Z",
    });
    if (stale.status !== "stopped") throw new Error("expected stale-state stop");

    const reopened = reopenCompletedSupervisorExecutionEpisodeAfterStaleState({
      journal: stale.journal,
      state_fingerprint_digest: NEXT_FINGERPRINT,
      now: "2026-07-28T00:00:04.000Z",
    });

    expect(reopened).toMatchObject({
      status: "running",
      stop: null,
      state_fingerprint_digest: NEXT_FINGERPRINT,
      cursor: { phase: "ready", operation_key: null },
      usage: { episodes: 1, agent_runs: 1, total_tokens: 15 },
      operations: [{ status: "completed" }],
    });
  });

  it("does not reopen failed or effect-in-doubt journals as stale state", () => {
    const prepared = start({ journal: journal() });
    if (prepared.status !== "started") throw new Error("expected started episode");
    const effectInDoubt = recoverSupervisorExecutionEpisodeJournal({
      journal: prepared.journal,
      state_fingerprint_digest: FINGERPRINT,
      now: "2026-07-28T00:00:01.000Z",
    });
    const failed = completeSupervisorExecutionEpisode({
      journal: prepared.journal,
      operation_key: prepared.operation_key,
      result: { status: "failed" },
      failed: true,
      now: "2026-07-28T00:00:01.000Z",
    });

    for (const stopped of [effectInDoubt, failed]) {
      expect(() =>
        reopenCompletedSupervisorExecutionEpisodeAfterStaleState({
          journal: stopped,
          state_fingerprint_digest: NEXT_FINGERPRINT,
          now: "2026-07-28T00:00:02.000Z",
        }),
      ).toThrow("requires a stopped journal with a completed latest operation");
    }
  });

  it("opens an explicit replacement after a known failure without changing its history", () => {
    const first = start({ journal: journal(), kind: "evaluator_episode" });
    if (first.status !== "started") throw new Error("expected started episode");
    const failed = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { classification: "provider_failed_before_typed_result" },
      failed: true,
      now: "2026-07-28T00:00:01.000Z",
    });
    const failedOperation = failed.operations[0];
    if (!failedOperation) throw new Error("expected failed operation");

    const replacement = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
      journal: failed,
      state_fingerprint_digest: NEXT_FINGERPRINT,
      now: "2026-07-28T00:00:02.000Z",
    });
    const startReplacement = (
      opts: {
        replacement_of_operation_key?: string;
        role?: "EVALUATOR" | "EXECUTOR";
        kind?: "evaluator_episode" | "agent_episode";
      } = {},
    ) =>
      startSupervisorExecutionEpisode({
        journal: replacement,
        role: opts.role ?? "EVALUATOR",
        kind: opts.kind ?? "evaluator_episode",
        operation_identity: {
          replacement_of_operation_key: opts.replacement_of_operation_key ?? null,
        },
        precondition_fingerprint_digest: NEXT_FINGERPRINT,
        ...(opts.replacement_of_operation_key
          ? { replacement_of_operation_key: opts.replacement_of_operation_key }
          : {}),
        now: "2026-07-28T00:00:03.000Z",
      });
    expect(() => startReplacement()).toThrow("requires the exact pending failed operation");
    expect(() => startReplacement({ replacement_of_operation_key: NEXT_FINGERPRINT })).toThrow(
      "requires the exact pending failed operation",
    );
    expect(() =>
      startReplacement({
        replacement_of_operation_key: failedOperation.operation_key,
        role: "EXECUTOR",
        kind: "agent_episode",
      }),
    ).toThrow("requires the exact pending failed operation");
    const next = startSupervisorExecutionEpisode({
      journal: replacement,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { replacement_of_operation_key: failedOperation.operation_key },
      precondition_fingerprint_digest: NEXT_FINGERPRINT,
      replacement_of_operation_key: failedOperation.operation_key,
      now: "2026-07-28T00:00:03.000Z",
    });
    if (next.status !== "started") throw new Error("expected replacement operation");

    expect(replacement).toMatchObject({
      status: "running",
      stop: null,
      cursor: {
        phase: "ready",
        operation_key: null,
        replacement_of_operation_key: failedOperation.operation_key,
      },
      state_fingerprint_digest: NEXT_FINGERPRINT,
      usage: { episodes: 1, agent_runs: 1 },
      operations: [failedOperation],
    });
    expect(next.journal).toMatchObject({
      usage: { episodes: 2, agent_runs: 2 },
      operations: [
        failedOperation,
        {
          status: "intent",
          replacement_of_operation_key: failedOperation.operation_key,
        },
      ],
    });
    expect(() =>
      startSupervisorExecutionEpisode({
        journal: journal(),
        role: "EVALUATOR",
        kind: "evaluator_episode",
        operation_identity: { replacement_of_operation_key: failedOperation.operation_key },
        precondition_fingerprint_digest: FINGERPRINT,
        replacement_of_operation_key: failedOperation.operation_key,
      }),
    ).toThrow("requires a pending terminal operation_failed authorization");
  });

  it("rejects replacement for effect-in-doubt or an exhausted known failure", () => {
    const first = start({ journal: journal() });
    if (first.status !== "started") throw new Error("expected started episode");
    const effectInDoubt = recoverSupervisorExecutionEpisodeJournal({
      journal: first.journal,
      state_fingerprint_digest: FINGERPRINT,
      now: "2026-07-28T00:00:01.000Z",
    });
    const limited = start({ journal: journal({ max_episodes: 1, max_agent_runs: 1 }) });
    if (limited.status !== "started") throw new Error("expected limited episode");
    const exhaustedFailure = completeSupervisorExecutionEpisode({
      journal: limited.journal,
      operation_key: limited.operation_key,
      result: { classification: "provider_failed_before_typed_result" },
      failed: true,
      now: "2026-07-28T00:00:01.000Z",
    });

    expect(() =>
      prepareReplacementSupervisorExecutionEpisodeAfterFailure({
        journal: effectInDoubt,
        state_fingerprint_digest: NEXT_FINGERPRINT,
      }),
    ).toThrow("requires a stopped operation_failed journal");
    expect(() =>
      prepareReplacementSupervisorExecutionEpisodeAfterFailure({
        journal: exhaustedFailure,
        state_fingerprint_digest: NEXT_FINGERPRINT,
      }),
    ).toThrow("requires remaining budget");
  });

  it("accounts for bounded feedback without storing its raw semantic content", () => {
    const first = start({ journal: journal() });
    if (first.status !== "started") throw new Error("expected started episode");
    const completed = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { summary: "provider output is never copied into the journal" },
      bounded_feedback: { delta: "small focused change" },
      progress: { changed_paths: ["a.ts"] },
      now: "2026-07-28T00:00:01.000Z",
    });
    const operation = completed.operations[0];

    expect(operation?.feedback_digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(JSON.stringify(completed)).not.toContain("small focused change");
    expect(JSON.stringify(completed)).not.toContain("provider output is never copied");
  });

  it("stops a repeated no-progress agent cycle before a third work order", () => {
    const first = start({ journal: journal({ max_no_progress_episodes: 1 }) });
    if (first.status !== "started") throw new Error("expected first agent episode");
    const firstCompleted = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { status: "ok" },
      progress: { observed_state: "unchanged" },
      now: "2026-07-28T00:00:01.000Z",
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: firstCompleted,
      state_fingerprint_digest: FINGERPRINT,
      route_observation: { step: "second" },
      now: "2026-07-28T00:00:02.000Z",
    });
    const second = start({ journal: advanced, now: "2026-07-28T00:00:03.000Z" });
    if (second.status !== "started") throw new Error("expected second agent episode");
    const stopped = completeSupervisorExecutionEpisode({
      journal: second.journal,
      operation_key: second.operation_key,
      result: { status: "ok" },
      progress: { observed_state: "unchanged" },
      now: "2026-07-28T00:00:04.000Z",
    });

    expect(stopped).toMatchObject({
      status: "stopped",
      usage: { no_progress_episodes: 1 },
      stop: { reason: "budget_exhausted", exhausted_dimensions: ["no_progress_episodes"] },
    });
  });
});
