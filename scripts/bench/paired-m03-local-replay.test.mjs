import assert from "node:assert/strict";
import test from "node:test";

import {
  assertEqualMandatoryObligations,
  buildM03LocalReplayDisposition,
  extractWorkflowCommandObligations,
} from "./paired-m03-local-replay.mjs";

const CANDIDATE = "c8baf368d85335724e0daf171af9aa2b74196adc";

test("builds a per-workflow M03 local replay disposition without a cost claim", () => {
  const disposition = buildM03LocalReplayDisposition({ candidateRevision: CANDIDATE });

  assert.equal(disposition.comparison.previous_release.version, "0.7.10");
  assert.equal(disposition.comparison.candidate.commit, CANDIDATE);
  assert.equal(disposition.comparison.provider_calls, 0);
  assert.deepEqual(
    disposition.workflow_results.map((result) => result.id),
    ["direct", "branch_pr", "evaluator_rework", "adapter_failure"],
  );
  assert.ok(disposition.workflow_results.every((result) => result.replay_runs === 5));
  assert.ok(disposition.workflow_results.every((result) => result.result === "unchanged"));
  assert.equal(disposition.failed_attempt_accounting.all_assigned_attempts_retained, true);
  assert.equal(
    disposition.failed_attempt_accounting.failed_attempts_remain_in_cost_numerator,
    true,
  );
  assert.equal(disposition.disposition.safety, "pass");
  assert.equal(disposition.disposition.efficiency, "not_established");
  assert.equal(disposition.disposition.performance_claim, null);
  assert.match(disposition.digest, /^sha256:[a-f0-9]{64}$/u);
});

test("extracts role obligations and rejects a mandatory-role mismatch", () => {
  const source = `
  direct: {
    commandSteps: [
      { id: "plan", role: "PLANNER" },
      { id: "execute", role: "CODER" },
    ],
    gatewayCommandOrder: [],
  }`;
  const obligations = extractWorkflowCommandObligations(source, "direct");
  assert.deepEqual(obligations, [
    { step: "plan", role: "PLANNER" },
    { step: "execute", role: "CODER" },
  ]);
  assert.throws(
    () =>
      assertEqualMandatoryObligations(obligations, [{ step: "execute", role: "CODER" }], "direct"),
    /mandatory role obligations changed/u,
  );
});
