import assert from "node:assert/strict";
import test from "node:test";

import { rollupTaskCostFromSupervisorJournal } from "../lib/agent-efficiency-repository-snapshot.mjs";

const operation = ({
  sequence,
  role,
  status = "completed",
  attribution,
  usage = {},
  providerRun,
  kind = role === "EVALUATOR" ? "evaluator_episode" : "agent_episode",
}) => ({
  sequence,
  episode: sequence,
  role,
  kind,
  operation_key: `sha256:${String(sequence).padStart(64, "0")}`,
  status,
  usage_attribution: attribution,
  usage,
  ...(providerRun
    ? {
        provider_usage: {
          provider: "codex",
          run_id: providerRun,
          work_order_id: `work-order-${String(sequence)}`,
          thread_id: null,
          turn_id: null,
        },
      }
    : {}),
});

const journal = (operations) => ({
  schema_version: 1,
  kind: "supervisor_execution_episode",
  task_id: "202609130000-COSTS",
  operations,
});

test("reconciles unique observed, partial, unavailable, and failed semantic attempts", () => {
  const rollup = rollupTaskCostFromSupervisorJournal(
    journal([
      operation({
        sequence: 1,
        role: "PLANNER",
        providerRun: "run-planner",
        attribution: { state: "observed", reason: null },
        usage: {
          input_tokens: 10,
          output_tokens: 5,
          total_tokens: 15,
          cached_input_tokens: 4,
          reasoning_tokens: 2,
        },
      }),
      operation({
        sequence: 2,
        role: "EXECUTOR",
        status: "failed",
        providerRun: "run-executor",
        attribution: { state: "partial", reason: "partial_provider_token_telemetry" },
        usage: { output_tokens: 7, reasoning_tokens: 3 },
      }),
      operation({
        sequence: 3,
        role: "CURATOR",
        attribution: { state: "unallocatable", reason: "shared_host_turn" },
      }),
      operation({
        sequence: 4,
        role: "EVALUATOR",
        status: "intent",
        attribution: { state: "unavailable", reason: "provider_result_not_observed" },
      }),
      operation({ sequence: 5, role: "EXECUTOR", kind: "cli_operation" }),
    ]),
  );

  assert.deepEqual(
    {
      dispatched: rollup.coverage.dispatched,
      observed: rollup.coverage.observed,
      partial: rollup.coverage.partial,
      unavailable: rollup.coverage.unavailable,
      unallocatable: rollup.coverage.unallocatable,
      failed: rollup.coverage.failed,
    },
    { dispatched: 4, observed: 1, partial: 1, unavailable: 1, unallocatable: 1, failed: 1 },
  );
  assert.equal(rollup.coverage.by_role.EXECUTOR.failed, 1);
  assert.equal(rollup.coverage.by_role.EXECUTOR.dispatched, 1);
  assert.deepEqual(
    rollup.coverage.attempts.map(({ attempt, role }) => [role, attempt]),
    [
      ["PLANNER", 1],
      ["EXECUTOR", 1],
      ["CURATOR", 1],
      ["EVALUATOR", 1],
    ],
  );
  assert.deepEqual(rollup.tokens.observed_subtotal, {
    input_tokens: 10,
    output_tokens: 12,
    total_tokens: 15,
  });
  assert.deepEqual(rollup.tokens.cached_input_subset, {
    observed_subtotal: 4,
    observed_attempts: 1,
    complete: false,
  });
  assert.deepEqual(rollup.tokens.reasoning_output_subset, {
    observed_subtotal: 5,
    observed_attempts: 2,
    complete: false,
  });
  assert.equal(rollup.tokens.state, "partial");
  assert.equal(rollup.tokens.complete, false);
});

test("renders complete totals only when every dispatched attempt is observed", () => {
  const rollup = rollupTaskCostFromSupervisorJournal(
    journal([
      operation({
        sequence: 1,
        role: "EXECUTOR",
        providerRun: "run-1",
        attribution: { state: "observed", reason: null },
        usage: {
          input_tokens: 8,
          output_tokens: 4,
          total_tokens: 12,
          cached_input_tokens: 2,
          reasoning_tokens: 1,
        },
      }),
      operation({
        sequence: 2,
        role: "EXECUTOR",
        providerRun: "run-2",
        attribution: { state: "observed", reason: null },
        usage: {
          input_tokens: 6,
          output_tokens: 3,
          total_tokens: 9,
          cached_input_tokens: 1,
          reasoning_tokens: 2,
        },
      }),
    ]),
  );

  assert.equal(rollup.tokens.state, "observed");
  assert.equal(rollup.tokens.complete, true);
  assert.deepEqual(rollup.tokens.observed_subtotal, {
    input_tokens: 14,
    output_tokens: 7,
    total_tokens: 21,
  });
  assert.equal(rollup.tokens.cached_input_subset.complete, true);
  assert.equal(rollup.tokens.reasoning_output_subset.complete, true);
  assert.deepEqual(
    rollup.coverage.attempts.map(({ attempt }) => attempt),
    [1, 2],
  );
});

test("rejects a provider observation bound to more than one operation", () => {
  const duplicate = journal([
    operation({
      sequence: 1,
      role: "EXECUTOR",
      providerRun: "run-replayed",
      attribution: { state: "observed", reason: null },
      usage: { input_tokens: 5, output_tokens: 2, total_tokens: 7 },
    }),
    operation({
      sequence: 2,
      role: "EVALUATOR",
      providerRun: "run-replayed",
      attribution: { state: "observed", reason: null },
      usage: { input_tokens: 5, output_tokens: 2, total_tokens: 7 },
    }),
  ]);

  assert.throws(
    () => rollupTaskCostFromSupervisorJournal(duplicate),
    /provider observation bound more than once/u,
  );
});
