import { describe, expect, it } from "vitest";

import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  type SupervisorEpisodeRole,
} from "@agentplaneorg/core/schemas";

const fingerprint = (value: string) => `sha256:${value.repeat(64)}`;

function journal() {
  return createSupervisorExecutionEpisodeJournal({
    task_id: "202609120000-MANAGED",
    task_revision: 1,
    state_fingerprint_digest: fingerprint("a"),
    budget: {
      max_episodes: 10,
      max_agent_runs: 8,
      max_input_tokens: 10_000,
      max_output_tokens: 10_000,
      max_total_tokens: 20_000,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
  });
}

describe("roadmap managed accounting", () => {
  it("keeps every managed role and attempt in one journal", () => {
    let current = journal();
    const roles: SupervisorEpisodeRole[] = ["PLANNER", "CURATOR", "EXECUTOR", "EVALUATOR"];
    for (const [index, role] of roles.entries()) {
      const state = fingerprint(index === 0 ? "a" : String(index + 1));
      if (index > 0) {
        current = advanceSupervisorExecutionEpisodeState({
          journal: current,
          state_fingerprint_digest: state,
        });
      }
      const started = startSupervisorExecutionEpisode({
        journal: current,
        role,
        kind: role === "EVALUATOR" ? "evaluator_episode" : "agent_episode",
        operation_identity: { transport: "managed", role, attempt: index + 1 },
        precondition_fingerprint_digest: state,
        work_order_ref: `work-order-${String(index + 1)}`,
        effect_ref: `result-${String(index + 1)}`,
      });
      if (started.status !== "started") throw new Error("managed fixture did not start");
      expect(started.journal.operations.at(-1)?.usage_attribution).toEqual({
        state: "unavailable",
        reason: "provider_result_not_observed",
      });
      current = completeSupervisorExecutionEpisode({
        journal: started.journal,
        operation_key: started.operation_key,
        result: { status: "completed" },
        usage: {
          input_tokens: 10 + index,
          output_tokens: 5,
          total_tokens: 15 + index,
        },
        provider_usage: {
          provider: "codex",
          run_id: `run-${String(index + 1)}`,
          work_order_id: `work-order-${String(index + 1)}`,
          thread_id: `thread-${String(index + 1)}`,
          turn_id: `turn-${String(index + 1)}`,
        },
      });
    }

    expect(current.operations.map(({ role }) => role)).toEqual(roles);
    expect(current.usage).toMatchObject({
      episodes: 4,
      agent_runs: 4,
      input_tokens: 46,
      output_tokens: 20,
      total_tokens: 66,
      token_observed_agent_runs: 4,
    });
    expect(
      current.operations.every((operation) => operation.usage_attribution?.state === "observed"),
    ).toBe(true);
  });

  it("does not count formal CLI operations as provider runs", () => {
    const started = startSupervisorExecutionEpisode({
      journal: journal(),
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: { id: "task.start" },
      precondition_fingerprint_digest: fingerprint("a"),
    });
    if (started.status !== "started") throw new Error("CLI fixture did not start");

    expect(started.journal.usage).toMatchObject({ episodes: 1, agent_runs: 0 });
    expect(started.journal.operations[0]).not.toHaveProperty("usage_attribution");
  });

  it("rejects replay of one provider identity instead of double-counting it", () => {
    const first = startSupervisorExecutionEpisode({
      journal: journal(),
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { attempt: 1 },
      precondition_fingerprint_digest: fingerprint("a"),
    });
    if (first.status !== "started") throw new Error("first fixture did not start");
    const provider = {
      provider: "codex",
      run_id: "run-replayed",
      work_order_id: "work-order-replayed",
      thread_id: "thread-replayed",
      turn_id: "turn-replayed",
    };
    const completed = completeSupervisorExecutionEpisode({
      journal: first.journal,
      operation_key: first.operation_key,
      result: { status: "completed" },
      usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15 },
      provider_usage: provider,
    });
    const ready = advanceSupervisorExecutionEpisodeState({
      journal: completed,
      state_fingerprint_digest: fingerprint("b"),
    });
    const replay = startSupervisorExecutionEpisode({
      journal: ready,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { attempt: 2 },
      precondition_fingerprint_digest: fingerprint("b"),
    });
    if (replay.status !== "started") throw new Error("replay fixture did not start");

    expect(() =>
      completeSupervisorExecutionEpisode({
        journal: replay.journal,
        operation_key: replay.operation_key,
        result: { status: "completed" },
        usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15 },
        provider_usage: provider,
      }),
    ).toThrow("Provider usage is already bound");
  });
});
