import { describe, expect, it } from "vitest";

import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
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
    max_input_tokens: null,
    max_output_tokens: null,
    max_total_tokens: null,
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

describe("legacy supervisor execution episode compatibility", () => {
  it("cold-reads persisted budget stops without retaining spend enforcement", () => {
    let current = journal({ max_episodes: 1, max_agent_runs: 1 });
    const started = startSupervisorExecutionEpisode({
      journal: current,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { id: "quality-review" },
      precondition_fingerprint_digest: FINGERPRINT,
      now: NOW,
    });
    if (started.status !== "started") throw new Error("expected started episode");
    current = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { verdict: "pass" },
      now: NOW,
    });
    current = stopSupervisorExecutionEpisode({
      journal: current,
      reason: "budget_exhausted",
      exhausted_dimensions: ["episodes"],
      now: NOW,
    });

    expect(
      migrateSupervisorExecutionEpisodeJournal({
        input: current,
        create: {
          task_id: current.task_id,
          task_revision: current.task_revision,
          state_fingerprint_digest: NEXT_FINGERPRINT,
          budget: budget(),
        },
      }),
    ).toMatchObject({
      source: "legacy_budget_v1",
      migrated: true,
      journal: {
        status: "running",
        stop: null,
        budget: { max_episodes: 1 },
        usage: { episodes: 1 },
        cursor: { phase: "ready", operation_key: null },
        previous_digest: current.digest,
      },
    });
  });

  it("cold-reads a legacy token-budget epoch without exposing renewal behavior", () => {
    const original = journal();
    const authorization = {
      schema_version: 1 as const,
      kind: "supervisor_token_budget_epoch" as const,
      prior_journal_digest: original.digest,
      stopped_state_fingerprint_digest: FINGERPRINT,
      authorized_state_fingerprint_digest: NEXT_FINGERPRINT,
      authorized_by: "USER" as const,
      authority_ref: "user:T-episode:legacy-token-budget-epoch",
      authority_digest: FINGERPRINT,
      budget: { max_input_tokens: 100, max_output_tokens: 100, max_total_tokens: 200 },
    };
    const epoch = {
      ...authorization,
      starts_after_operation_sequence: 0,
      baseline_usage: { input_tokens: 0, output_tokens: 0, total_tokens: 0 },
      authorized_at: NOW,
    };
    const recovery = { operation_identity: authorization, context: epoch };
    const operationKey = digestSupervisorEpisodeValue({
      task_id: original.task_id,
      episode: 1,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: authorization,
      precondition_fingerprint_digest: FINGERPRINT,
      authority_ref: authorization.authority_ref,
      authority_digest: authorization.authority_digest,
      work_order_ref: null,
      effect_ref: null,
      recovery,
    });
    const { digest: _digest, ...base } = original;
    const payload = {
      ...base,
      state_fingerprint_digest: NEXT_FINGERPRINT,
      usage: { ...original.usage, episodes: 1 },
      cursor: { episode: 1, phase: "ready" as const, operation_key: null },
      operations: [
        {
          sequence: 1,
          episode: 1,
          role: "EXECUTOR" as const,
          kind: "cli_operation" as const,
          operation_key: operationKey,
          precondition_fingerprint_digest: FINGERPRINT,
          authority_ref: authorization.authority_ref,
          authority_digest: authorization.authority_digest,
          work_order_ref: null,
          effect_ref: null,
          recovery,
          status: "completed" as const,
          usage: {},
          result_digest: digestSupervisorEpisodeValue(epoch),
          postcondition_fingerprint_digest: NEXT_FINGERPRINT,
          feedback_digest: null,
          progress_digest: null,
          started_at: NOW,
          completed_at: NOW,
        },
      ],
      updated_at: NOW,
      previous_digest: original.digest,
    };
    const legacy = { ...payload, digest: digestSupervisorEpisodeValue(payload) };

    expect(validateSupervisorExecutionEpisodeJournal(legacy)).toEqual(legacy);
    expect(
      migrateSupervisorExecutionEpisodeJournal({
        input: legacy,
        create: {
          task_id: original.task_id,
          task_revision: original.task_revision,
          state_fingerprint_digest: NEXT_FINGERPRINT,
          budget: budget(),
        },
      }),
    ).toEqual({ journal: legacy, source: "current", migrated: false });
  });

  it("records usage without using legacy limits for admission", () => {
    const first = startSupervisorExecutionEpisode({
      journal: journal({ max_episodes: 1, max_agent_runs: 1 }),
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { attempt: 1 },
      precondition_fingerprint_digest: FINGERPRINT,
      now: NOW,
    });
    if (first.status !== "started") throw new Error("expected started episode");
    const completed = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { status: "ok" },
      usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15, wall_time_ms: 20 },
      now: NOW,
    });
    const next = startSupervisorExecutionEpisode({
      journal: completed,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { attempt: 2 },
      precondition_fingerprint_digest: FINGERPRINT,
      now: NOW,
    });

    expect(completed.usage).toMatchObject({ episodes: 1, agent_runs: 1, total_tokens: 15 });
    expect(next.status).toBe("started");
  });
});
