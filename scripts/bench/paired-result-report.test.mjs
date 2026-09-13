import assert from "node:assert/strict";
import test from "node:test";

import { buildPairedResultReport } from "./paired-result-report.mjs";

const DIGEST = `sha256:${"a".repeat(64)}`;

function attempt({
  id,
  pair,
  arm,
  cost,
  status = "completed",
  verified = true,
  violations = [],
  transport = "managed",
  outcome = DIGEST,
  currency = "USD",
  basis = DIGEST,
}) {
  return {
    id,
    pair_id: pair,
    arm,
    transport,
    raw_cost:
      cost === null
        ? {
            state: "unknown",
            amount: null,
            currency,
            basis_digest: basis,
            reason: "provider charge unavailable",
          }
        : { state: "observed", amount: cost, currency, basis_digest: basis },
    agent: {
      status,
      result_digest: DIGEST,
      violations,
      stages: [
        { id: "prepare", duration_ms: 2 },
        { id: "provider", duration_ms: 3 },
      ],
    },
    oracle: {
      verified,
      outcome_digest: outcome,
      verifier_digest: DIGEST,
      duration_ms: 1,
    },
  };
}

function evidence(attempts) {
  return {
    schema_version: 1,
    kind: "agentplane.paired_production_campaign_evidence",
    campaign_id: "paired-report-test",
    digest: DIGEST,
    attempts,
    claim_policy: {
      minimum_paired_successes: 1,
      max_candidate_to_previous_cost_ratio: 1.05,
      require_candidate_better_than_minimal: true,
    },
  };
}

test("keeps failed-attempt cost in the numerator and pairs only equivalent successes", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", cost: 4 }),
      attempt({ id: "p1", pair: "pair-1", arm: "previous_release", cost: 3 }),
      attempt({ id: "c1", pair: "pair-1", arm: "candidate", cost: 2 }),
      attempt({
        id: "m2",
        pair: "pair-2",
        arm: "minimal_agent",
        cost: 5,
        status: "failed",
        verified: false,
      }),
      attempt({ id: "p2", pair: "pair-2", arm: "previous_release", cost: 3 }),
      attempt({ id: "c2", pair: "pair-2", arm: "candidate", cost: 2 }),
    ]),
  );

  const managed = report.strata.managed;
  assert.equal(managed.arms.minimal_agent.raw_cost.observed_subtotal, 9);
  assert.equal(managed.arms.minimal_agent.verified_successes, 1);
  assert.equal(managed.arms.minimal_agent.raw_cost.cost_per_verified_success, 9);
  assert.equal(managed.arms.previous_release.raw_cost.cost_per_verified_success, 3);
  assert.equal(managed.arms.candidate.raw_cost.cost_per_verified_success, 2);
  assert.equal(managed.paired_outcomes.accepted.length, 1);
  assert.equal(managed.paired_outcomes.accepted[0].pair_id, "pair-1");
  assert.deepEqual(managed.paired_outcomes.rejected, [
    { pair_id: "pair-2", reason: "not_all_arms_verified" },
  ]);
  assert.equal(managed.arms.candidate.stages.provider.observations, 2);
  assert.equal(report.gates.safety.verdict, "pass");
  assert.equal(report.gates.activation.verdict, "not_established");
  assert.equal(report.gates.efficiency.verdict, "pass");
  assert.equal(report.numeric_cost_claim_complete, true);
});

test("unknown charge prevents a complete numeric claim", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", cost: 4 }),
      attempt({ id: "p1", pair: "pair-1", arm: "previous_release", cost: null }),
      attempt({ id: "c1", pair: "pair-1", arm: "candidate", cost: 2 }),
    ]),
  );

  assert.equal(report.numeric_cost_claim_complete, false);
  assert.equal(report.strata.managed.arms.previous_release.raw_cost.total, null);
  assert.equal(
    report.strata.managed.arms.previous_release.raw_cost.cost_per_verified_success,
    null,
  );
  assert.equal(report.gates.efficiency.verdict, "not_established");
  assert.match(report.uncertainty.raw_cost, /Unknown raw cost/u);
});

test("an all-failed arm has no finite successful-result score", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", cost: 4 }),
      attempt({ id: "p1", pair: "pair-1", arm: "previous_release", cost: 3 }),
      attempt({
        id: "c1",
        pair: "pair-1",
        arm: "candidate",
        cost: 2,
        status: "failed",
        verified: false,
      }),
    ]),
  );

  assert.equal(report.strata.managed.arms.candidate.verified_successes, 0);
  assert.equal(report.strata.managed.arms.candidate.raw_cost.cost_per_verified_success, null);
  assert.equal(report.gates.efficiency.verdict, "not_established");
});

test("mismatched raw cost identity prevents numeric and efficiency claims", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", cost: 4 }),
      attempt({ id: "p1", pair: "pair-1", arm: "previous_release", cost: 3 }),
      attempt({ id: "c1", pair: "pair-1", arm: "candidate", cost: 2, currency: "EUR" }),
    ]),
  );

  assert.equal(report.coverage.raw_cost_identity.consistent, false);
  assert.equal(report.numeric_cost_claim_complete, false);
  assert.equal(report.gates.efficiency.verdict, "not_established");
  assert.deepEqual(report.gates.efficiency.reasons, ["raw_cost_identity_mismatch"]);
  assert.match(report.uncertainty.raw_cost, /Inconsistent raw cost/u);
});

test("rejects outcome-mismatched successes from the paired population", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", cost: 4 }),
      attempt({ id: "p1", pair: "pair-1", arm: "previous_release", cost: 3 }),
      attempt({
        id: "c1",
        pair: "pair-1",
        arm: "candidate",
        cost: 2,
        outcome: `sha256:${"b".repeat(64)}`,
      }),
    ]),
  );

  assert.equal(report.strata.managed.paired_outcomes.accepted.length, 0);
  assert.deepEqual(report.strata.managed.paired_outcomes.rejected, [
    { pair_id: "pair-1", reason: "outcome_digest_mismatch" },
  ]);
  assert.equal(report.gates.efficiency.verdict, "not_established");
});

test("keeps safety, activation, and efficiency gates independent", () => {
  const value = evidence([
    attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", cost: 4 }),
    attempt({ id: "p1", pair: "pair-1", arm: "previous_release", cost: 3 }),
    attempt({
      id: "c1",
      pair: "pair-1",
      arm: "candidate",
      cost: 2,
      violations: ["authority_violation"],
    }),
  ]);
  value.activation_evidence = {
    qualified: true,
    independently_reviewed: true,
    class_digest: DIGEST,
    oracle_digest: DIGEST,
  };
  const report = buildPairedResultReport(value);

  assert.equal(report.gates.safety.verdict, "fail");
  assert.equal(report.gates.activation.verdict, "pass");
  assert.equal(report.gates.efficiency.verdict, "fail");
});
