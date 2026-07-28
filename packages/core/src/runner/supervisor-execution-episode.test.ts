import { describe, expect, it } from "vitest";

import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  advanceSupervisorExecutionEpisodeState,
  recoverSupervisorExecutionEpisodeJournal,
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
    expect(next).toMatchObject({
      status: "stopped",
      stop: { reason: "budget_exhausted", exhausted_dimensions: ["episodes"] },
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
});
