import { describe, expect, it } from "vitest";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import { projectTaskTokenUsage } from "./task-token-usage.js";

const fingerprintA = `sha256:${"a".repeat(64)}`;
const fingerprintB = `sha256:${"b".repeat(64)}`;

function journal(): SupervisorExecutionEpisodeJournal {
  return createSupervisorExecutionEpisodeJournal({
    task_id: "202608030000-TOKENS",
    task_revision: 1,
    state_fingerprint_digest: fingerprintA,
    budget: {
      max_episodes: 10,
      max_agent_runs: 10,
      max_input_tokens: 1_000_000,
      max_output_tokens: 1_000_000,
      max_total_tokens: 2_000_000,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
    now: "2026-08-03T00:00:00.000Z",
  });
}

function completeAgent(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  role: "EXECUTOR" | "EVALUATOR";
  fingerprint: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
    visible_output_tokens?: number;
    reasoning_tokens?: number;
    total_tokens: number;
  };
}): SupervisorExecutionEpisodeJournal {
  const started = startSupervisorExecutionEpisode({
    journal: opts.journal,
    role: opts.role,
    kind: opts.role === "EVALUATOR" ? "evaluator_episode" : "agent_episode",
    operation_identity: { role: opts.role },
    precondition_fingerprint_digest: opts.fingerprint,
    now: "2026-08-03T00:00:01.000Z",
  });
  if (started.status !== "started") throw new Error("fixture episode did not start");
  return completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { status: "completed" },
    usage: opts.usage,
    now: "2026-08-03T00:00:02.000Z",
  });
}

describe("completed task token usage projection", () => {
  it("aggregates executor and evaluator provider telemetry exactly once", () => {
    const executor = completeAgent({
      journal: journal(),
      role: "EXECUTOR",
      fingerprint: fingerprintA,
      usage: {
        input_tokens: 10,
        output_tokens: 7,
        visible_output_tokens: 4,
        reasoning_tokens: 3,
        total_tokens: 17,
      },
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: executor,
      state_fingerprint_digest: fingerprintB,
      route_observation: { state: "evaluator" },
      now: "2026-08-03T00:00:03.000Z",
    });
    const evaluator = completeAgent({
      journal: advanced,
      role: "EVALUATOR",
      fingerprint: fingerprintB,
      usage: {
        input_tokens: 5,
        output_tokens: 6,
        visible_output_tokens: 2,
        reasoning_tokens: 4,
        total_tokens: 11,
      },
    });

    expect(
      projectTaskTokenUsage({
        journal: evaluator,
        updated_at: "2026-08-03T00:00:04.000Z",
      }),
    ).toEqual({
      schema_version: 1,
      state: "observed",
      input_tokens: 15,
      output_tokens: 6,
      reasoning_tokens: 7,
      total_tokens: 28,
      agent_runs: 2,
      observed_agent_runs: 2,
      source: "supervisor_journal",
      observed_by: "agentplane",
      journal_digest: evaluator.digest,
      unavailable_reason: null,
      updated_at: "2026-08-03T00:00:04.000Z",
    });
  });

  it("marks mixed observed and external episodes partial", () => {
    const observed = completeAgent({
      journal: journal(),
      role: "EXECUTOR",
      fingerprint: fingerprintA,
      usage: {
        input_tokens: 10,
        output_tokens: 7,
        visible_output_tokens: 4,
        reasoning_tokens: 3,
        total_tokens: 17,
      },
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: observed,
      state_fingerprint_digest: fingerprintB,
      route_observation: { state: "external" },
    });
    const mixed = completeAgent({
      journal: advanced,
      role: "EVALUATOR",
      fingerprint: fingerprintB,
    });

    expect(projectTaskTokenUsage({ journal: mixed })).toMatchObject({
      state: "partial",
      input_tokens: 10,
      output_tokens: null,
      reasoning_tokens: null,
      total_tokens: 17,
      agent_runs: 2,
      observed_agent_runs: 1,
      unavailable_reason: "some_agent_runs_lack_provider_token_telemetry",
    });
  });

  it("marks primary telemetry without an observed output breakdown partial", () => {
    const primaryOnly = completeAgent({
      journal: journal(),
      role: "EXECUTOR",
      fingerprint: fingerprintA,
      usage: {
        input_tokens: 10,
        output_tokens: 7,
        total_tokens: 17,
      },
    });

    expect(projectTaskTokenUsage({ journal: primaryOnly })).toMatchObject({
      state: "partial",
      input_tokens: 10,
      output_tokens: null,
      reasoning_tokens: null,
      total_tokens: 17,
      agent_runs: 1,
      observed_agent_runs: 1,
      unavailable_reason: "some_agent_runs_lack_output_reasoning_breakdown",
    });
  });

  it("does not fabricate breakdown totals when an evaluator receipt omits them", () => {
    const executor = completeAgent({
      journal: journal(),
      role: "EXECUTOR",
      fingerprint: fingerprintA,
      usage: {
        input_tokens: 10,
        output_tokens: 7,
        visible_output_tokens: 4,
        reasoning_tokens: 3,
        total_tokens: 17,
      },
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: executor,
      state_fingerprint_digest: fingerprintB,
      route_observation: { state: "evaluator" },
    });
    const mixedBreakdown = completeAgent({
      journal: advanced,
      role: "EVALUATOR",
      fingerprint: fingerprintB,
      usage: {
        input_tokens: 5,
        output_tokens: 6,
        total_tokens: 11,
      },
    });

    expect(projectTaskTokenUsage({ journal: mixedBreakdown })).toMatchObject({
      state: "partial",
      input_tokens: 15,
      output_tokens: null,
      reasoning_tokens: null,
      total_tokens: 28,
      agent_runs: 2,
      observed_agent_runs: 2,
      unavailable_reason: "some_agent_runs_lack_output_reasoning_breakdown",
    });
  });

  it("never turns an unobserved external episode into zero token usage", () => {
    const external = completeAgent({
      journal: journal(),
      role: "EXECUTOR",
      fingerprint: fingerprintA,
    });

    expect(projectTaskTokenUsage({ journal: external })).toMatchObject({
      state: "unavailable",
      input_tokens: null,
      output_tokens: null,
      reasoning_tokens: null,
      total_tokens: null,
      agent_runs: 1,
      observed_agent_runs: 0,
      unavailable_reason: "provider_token_telemetry_unavailable",
    });
  });
});
