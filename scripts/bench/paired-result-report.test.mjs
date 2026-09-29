import assert from "node:assert/strict";
import test from "node:test";

import { buildPairedResultReport } from "./paired-result-report.mjs";

const DIGEST = `sha256:${"a".repeat(64)}`;

function attempt({
  id,
  pair,
  arm,
  tokens,
  status = "completed",
  verified = true,
  violations = [],
  transport = "managed",
  outcome = DIGEST,
  usageState = tokens === null ? "unavailable" : "observed",
}) {
  const tokenUsage =
    usageState === "unavailable"
      ? {
          state: "unavailable",
          input_tokens: null,
          cached_input_tokens: null,
          output_tokens: null,
          reasoning_tokens: null,
          total_tokens: null,
          reason: "provider token telemetry unavailable",
        }
      : usageState === "partial"
        ? {
            state: "partial",
            input_tokens: tokens,
            cached_input_tokens: null,
            output_tokens: null,
            reasoning_tokens: null,
            total_tokens: null,
            reason: "provider token telemetry incomplete",
          }
        : {
            state: "observed",
            input_tokens: tokens,
            cached_input_tokens: 0,
            output_tokens: 0,
            reasoning_tokens: 0,
            total_tokens: tokens,
          };
  return {
    id,
    pair_id: pair,
    arm,
    transport,
    token_usage: tokenUsage,
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
      max_candidate_to_previous_token_ratio: 1.05,
      require_candidate_better_than_minimal: true,
    },
  };
}

test("keeps failed-attempt tokens in the numerator and pairs only equivalent successes", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", tokens: 4 }),
      attempt({ id: "p1", pair: "pair-1", arm: "previous_release", tokens: 3 }),
      attempt({ id: "c1", pair: "pair-1", arm: "candidate", tokens: 2 }),
      attempt({
        id: "m2",
        pair: "pair-2",
        arm: "minimal_agent",
        tokens: 5,
        status: "failed",
        verified: false,
      }),
      attempt({ id: "p2", pair: "pair-2", arm: "previous_release", tokens: 3 }),
      attempt({ id: "c2", pair: "pair-2", arm: "candidate", tokens: 2 }),
    ]),
  );

  const managed = report.strata.managed;
  assert.equal(managed.arms.minimal_agent.token_usage.observed_totals.total_tokens, 9);
  assert.equal(managed.arms.minimal_agent.verified_successes, 1);
  assert.equal(managed.arms.minimal_agent.token_usage.tokens_per_verified_success, 9);
  assert.equal(managed.arms.previous_release.token_usage.tokens_per_verified_success, 3);
  assert.equal(managed.arms.candidate.token_usage.tokens_per_verified_success, 2);
  assert.equal(managed.arms.minimal_agent.success_rate, 0.5);
  assert.equal(managed.arms.previous_release.success_rate, 1);
  assert.equal(managed.arms.candidate.violation_rate, 0);
  assert.equal(managed.paired_outcomes.accepted.length, 1);
  assert.equal(managed.paired_outcomes.accepted[0].pair_id, "pair-1");
  assert.deepEqual(managed.paired_outcomes.rejected, [
    { pair_id: "pair-2", reason: "not_all_arms_verified" },
  ]);
  assert.deepEqual(managed.arms.candidate.stages.provider, {
    observations: 2,
    min_ms: 3,
    max_ms: 3,
    mean_ms: 3,
  });
  assert.equal(report.coverage.attempts, 6);
  assert.equal(report.coverage.token_usage_observed, 6);
  assert.equal(report.coverage.token_usage_partial, 0);
  assert.equal(report.coverage.token_usage_unavailable, 0);
  assert.deepEqual(report.coverage.derived_total_token_attempt_ids, []);
  assert.deepEqual(report.coverage.transports, { managed: 6 });
  assert.equal(report.gates.safety.verdict, "pass");
  assert.equal(report.gates.activation.verdict, "not_established");
  assert.equal(report.gates.efficiency.verdict, "pass");
  assert.equal(report.numeric_token_claim_complete, true);
  assert.equal(report.uncertainty.rate_interval, "Wilson score interval, 95%");
  assert.match(report.uncertainty.paired_population, /same oracle outcome/u);
  assert.match(report.uncertainty.subset_accounting, /not added again/u);
});

test("unavailable tokens prevent a complete numeric claim", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", tokens: 4 }),
      attempt({ id: "p1", pair: "pair-1", arm: "previous_release", tokens: null }),
      attempt({ id: "c1", pair: "pair-1", arm: "candidate", tokens: 2 }),
    ]),
  );

  assert.equal(report.numeric_token_claim_complete, false);
  assert.equal(report.strata.managed.arms.previous_release.token_usage.total_tokens, null);
  assert.equal(
    report.strata.managed.arms.previous_release.token_usage.tokens_per_verified_success,
    null,
  );
  assert.equal(report.gates.efficiency.verdict, "not_established");
  assert.match(report.uncertainty.token_usage, /Partial or unavailable/u);
});

test("partial tokens remain visible and prevent a complete numeric claim", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", tokens: 4 }),
      attempt({
        id: "p1",
        pair: "pair-1",
        arm: "previous_release",
        tokens: 3,
        usageState: "partial",
      }),
      attempt({ id: "c1", pair: "pair-1", arm: "candidate", tokens: 2 }),
    ]),
  );

  assert.equal(report.coverage.token_usage_partial, 1);
  assert.deepEqual(report.coverage.incomplete_token_attempt_ids, ["p1"]);
  assert.equal(report.numeric_token_claim_complete, false);
});

test("an all-failed arm has no finite successful-result score", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", tokens: 4 }),
      attempt({ id: "p1", pair: "pair-1", arm: "previous_release", tokens: 3 }),
      attempt({
        id: "c1",
        pair: "pair-1",
        arm: "candidate",
        tokens: 2,
        status: "failed",
        verified: false,
      }),
    ]),
  );

  assert.equal(report.strata.managed.arms.candidate.verified_successes, 0);
  assert.equal(report.strata.managed.arms.candidate.token_usage.tokens_per_verified_success, null);
  assert.equal(report.gates.efficiency.verdict, "not_established");
});

test("rejects token subset double-counting", () => {
  const value = evidence([
    attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", tokens: 4 }),
    attempt({ id: "p1", pair: "pair-1", arm: "previous_release", tokens: 3 }),
    attempt({ id: "c1", pair: "pair-1", arm: "candidate", tokens: 2 }),
  ]);
  value.attempts[0].token_usage.output_tokens = 1;
  value.attempts[0].token_usage.reasoning_tokens = 2;
  assert.throws(() => buildPairedResultReport(value), /reasoning exceeds output/u);
});

test("rejects outcome-mismatched successes from the paired population", () => {
  const report = buildPairedResultReport(
    evidence([
      attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", tokens: 4 }),
      attempt({ id: "p1", pair: "pair-1", arm: "previous_release", tokens: 3 }),
      attempt({
        id: "c1",
        pair: "pair-1",
        arm: "candidate",
        tokens: 2,
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
    attempt({ id: "m1", pair: "pair-1", arm: "minimal_agent", tokens: 4 }),
    attempt({ id: "p1", pair: "pair-1", arm: "previous_release", tokens: 3 }),
    attempt({
      id: "c1",
      pair: "pair-1",
      arm: "candidate",
      tokens: 2,
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
