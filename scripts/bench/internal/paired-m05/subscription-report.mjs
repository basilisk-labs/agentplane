import assert from "node:assert/strict";
import { verify } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { digest } from "./contract.mjs";
import {
  validateSubscriptionContract,
  parseSubscriptionTokens,
  tokenFields,
} from "./subscription-contract.mjs";
import { openSubscriptionLedger } from "./subscription-ledger.mjs";
import {
  subscriptionArms,
  subscriptionInference,
  sumTokens,
  tokenTotals,
} from "./subscription-analysis.mjs";

function authenticate(envelope, key, expected) {
  assert.ok(key && envelope, "Independent retained evidence required");
  assert.ok(
    verify(
      null,
      Buffer.from(digest(envelope.payload)),
      key,
      Buffer.from(envelope.signature, "base64"),
    ),
    "Unauthenticated study evidence",
  );
  for (const [field, value] of Object.entries(expected))
    assert.deepEqual(envelope.payload[field], value, `Wrong evidence ${field}`);
  return envelope.payload;
}
function lowerBound(usage) {
  return Math.max(
    usage.totalTokens ?? 0,
    Math.max(usage.inputTokens ?? 0, usage.cachedInputTokens ?? 0) +
      Math.max(usage.outputTokens ?? 0, usage.reasoningOutputTokens ?? 0),
  );
}
export function buildSubscriptionReport(
  { contract: input, ledgerRoot, analysis, outcomes = {}, setup = {} },
  { oracleKey } = {},
) {
  const contract = validateSubscriptionContract(input);
  assert.equal(
    contract.analysis_digest,
    digest(analysis),
    "Analysis changed after campaign freeze",
  );
  assert.ok(["fixed_corpus", "population"].includes(analysis.quality_scope));
  assert.ok(["pilot", "confirmation"].includes(analysis.phase));
  assert.equal(analysis.metric, "tokens_per_verified_success");
  assert.match(analysis.registration_digest, /^sha256:[a-f0-9]{64}$/u);
  assert.ok(existsSync(path.join(ledgerRoot, "0.json")), "Retained ledger required");
  const ledger = openSubscriptionLedger(ledgerRoot, contract).read();
  const binding = {
    campaign: digest(contract),
    ledger_digest: digest(ledger),
    oracle_digest: contract.oracle_digest,
    policy_digest: contract.policy_digest,
  };
  const seen = new Set();
  const rows = contract.assignments.map((a) => {
    assert.ok(typeof a.pair_id === "string" && a.pair_id);
    const pair = `${a.pair_id}/${a.arm}`;
    assert.ok(!seen.has(pair), "Duplicate pair arm");
    seen.add(pair);
    const calls = Object.values(ledger.calls).filter((c) => c.reservation.assignment_id === a.id);
    const proof = outcomes[a.id]
      ? authenticate(outcomes[a.id], oracleKey, {
          ...binding,
          kind: "agentplane.m05_subscription_outcome",
          assignment_id: a.id,
          assessment_digest: digest({ assignment: a, calls }),
        })
      : null;
    if (proof) {
      assert.ok(
        ["completed", "failed", "cancelled", "unstarted", "blocked"].includes(proof.status),
      );
      assert.equal(typeof proof.verified, "boolean");
      assert.equal(typeof proof.accounting_complete, "boolean");
      assert.ok(Array.isArray(proof.safety_violations));
      for (const field of ["active_ms", "elapsed_ms"])
        assert.ok(
          proof[field] === null || (Number.isSafeInteger(proof[field]) && proof[field] >= 0),
        );
      if (proof.active_ms !== null && proof.elapsed_ms !== null)
        assert.ok(proof.elapsed_ms >= proof.active_ms);
      if (proof.verified) {
        assert.equal(proof.status, "completed");
        assert.deepEqual(proof.safety_violations, []);
        assert.match(proof.final_head, /^[a-f0-9]{40}$/u);
        assert.match(proof.native_evidence_digest, /^sha256:[a-f0-9]{64}$/u);
      }
    }
    let known = 0,
      total = 0,
      steady = 0;
    let complete = Boolean(proof?.accounting_complete) && calls.length > 0;
    const subsets = Object.fromEntries(tokenFields.map((f) => [f, calls.length > 0 ? 0 : null]));
    for (const call of calls) {
      const usage = parseSubscriptionTokens(call.receipt?.usage);
      known = sumTokens([known, lowerBound(usage)]);
      if (
        !call.receipt ||
        call.receipt.effect_state !== "terminal" ||
        !call.receipt.identity_valid ||
        usage.state !== "observed"
      )
        complete = false;
      if (usage.state === "observed") {
        total = sumTokens([total, usage.totalTokens]);
        if (call.reservation.accounting_phase === "steady")
          steady = sumTokens([steady, usage.totalTokens]);
      }
      for (const field of tokenFields)
        subsets[field] =
          subsets[field] !== null && usage[field] !== null
            ? sumTokens([subsets[field], usage[field]])
            : null;
    }
    return {
      ...a,
      outcome: proof?.status ?? "unobserved",
      success: Boolean(proof?.verified),
      complete,
      steady_complete: complete,
      known,
      total,
      steady,
      subsets,
      active_ms: proof?.active_ms ?? null,
      elapsed_ms: proof?.elapsed_ms ?? null,
      terminal: Boolean(proof && ["completed", "failed", "cancelled"].includes(proof.status)),
      safety_violations: proof?.safety_violations ?? [],
      evidence_present: Boolean(proof),
      calls: calls.map((c) => ({
        id: c.reservation.id,
        role: c.reservation.role,
        retry: c.reservation.retry,
        episode_id: c.reservation.episode_id,
        phase: c.reservation.accounting_phase,
        requested_model: c.reservation.model,
        requested_effort: c.reservation.effort,
        observed_model: c.receipt?.observed_model ?? null,
        observed_effort: c.receipt?.observed_effort ?? null,
        identity_valid: c.receipt?.identity_valid ?? null,
        stop_reason: c.receipt?.stop_reason ?? null,
        duration_ms: c.receipt ? c.receipt.finished_ms - c.reservation.started_ms : null,
        status: c.receipt?.status ?? "unknown",
        usage: parseSubscriptionTokens(c.receipt?.usage),
      })),
    };
  });
  // Pair/stratum identity is checked even for failed and unstarted assignments.
  const groups = Object.values(Object.groupBy(rows, (r) => r.pair_id));
  for (const group of groups) {
    assert.deepEqual(
      group.map((r) => r.arm).toSorted(),
      [...subscriptionArms].toSorted(),
      "Incomplete assigned pair",
    );
    for (const row of group)
      for (const field of ["task_id", "stratum", "workflow", "transport", "cache", "session"])
        assert.ok(
          typeof row[field] === "string" && row[field] === group[0][field],
          "Pair identity mismatch",
        );
  }
  for (const task of Object.values(Object.groupBy(rows, (r) => r.task_id)))
    assert.equal(new Set(task.map((r) => r.stratum)).size, 1, "Task crosses strata");
  const setupTotals = {};
  for (const arm of subscriptionArms) {
    const proof = setup[arm]
      ? authenticate(setup[arm], oracleKey, {
          ...binding,
          kind: "agentplane.m05_subscription_external_setup",
          arm,
          scope: "outside_assignment_calls",
        })
      : null;
    const usage = parseSubscriptionTokens(proof?.usage);
    setupTotals[arm] = usage;
    const selected = rows.filter((r) => r.arm === arm);
    for (const [index, row] of selected.entries()) {
      row.external_setup_share = 0;
      row.complete &&= usage.state === "observed";
      const knownSetup = lowerBound(usage);
      row.known = sumTokens([
        row.known,
        Math.floor(knownSetup / selected.length) + (index < knownSetup % selected.length ? 1 : 0),
      ]);
      // Frozen order allocates one-time setup exactly once, without fractions.
      if (usage.state === "observed") {
        const share =
          Math.floor(usage.totalTokens / selected.length) +
          (index < usage.totalTokens % selected.length ? 1 : 0);
        row.external_setup_share = share;
        row.total = sumTokens([row.total, share]);
      }
    }
  }
  const arms = Object.fromEntries(
    subscriptionArms.map((arm) => [arm, tokenTotals(rows.filter((r) => r.arm === arm))]),
  );
  const inference = subscriptionInference(
    rows.map((r) => ({ ...r, total: r.total - r.external_setup_share })),
    analysis,
    Object.fromEntries(subscriptionArms.map((arm) => [arm, setupTotals[arm].totalTokens])),
  );
  const supplementary = [];
  if (analysis.supplementary_strata) {
    assert.equal(analysis.primary_estimand, "overall_deployment_policy");
    assert.deepEqual(analysis.supplementary_strata, {
      positive_applicability: ["direct-fix", "branch-change", "recoverable-failure"],
      fallback: ["no-match", "near-match"],
    });
    const registered = Object.values(analysis.supplementary_strata).flat();
    assert.ok(
      rows.every((row) => registered.includes(row.stratum)),
      "Unregistered stratum",
    );
    for (const [name, strata] of Object.entries(analysis.supplementary_strata)) {
      const selected = rows.filter((row) => strata.includes(row.stratum));
      supplementary.push({
        name,
        strata,
        descriptive_only: true,
        setup_scope: "allocated_shares_of_overall_setup_not_standalone_deployment_cost",
        arms: Object.fromEntries(
          subscriptionArms.map((arm) => [
            arm,
            tokenTotals(selected.filter((row) => row.arm === arm)),
          ]),
        ),
      });
    }
  }
  const margins = analysis.margins;
  const ratified =
    margins &&
    ["token_ratio", "quality_difference", "time_ratio"].every((k) => Number.isFinite(margins[k])) &&
    margins.token_ratio > 0 &&
    margins.token_ratio < 1 &&
    margins.quality_difference <= 0 &&
    margins.time_ratio >= 1;
  const comparisons = inference.comparisons.map((c) => ({
    ...c,
    gates: {
      tokens: Boolean(
        ratified && c.token_ratio_upper !== null && c.token_ratio_upper < margins.token_ratio,
      ),
      quality: Boolean(
        ratified &&
        (analysis.quality_scope === "fixed_corpus"
          ? groups.every((group) => {
              const baseline = group.find((r) => r.arm === "no_recipe");
              const candidate = group.find((r) => r.arm === c.arm);
              return (
                baseline.evidence_present &&
                candidate.evidence_present &&
                (!baseline.success || candidate.success)
              );
            })
          : c.quality_difference_lower !== null &&
            c.quality_difference_lower >= margins.quality_difference),
      ),
      time: Boolean(
        ratified && c.time_ratio_upper !== null && c.time_ratio_upper <= margins.time_ratio,
      ),
      safety: rows.every((r) => r.evidence_present && r.safety_violations.length === 0),
    },
  }));
  const adverse =
    rows.some((r) => r.safety_violations.length > 0) ||
    comparisons.some((c) => c.point.quality_difference < 0 && c.point.token_ratio >= 1);
  const setupTradeoff = subscriptionArms.slice(1).some((arm) => {
    const b = arms.no_recipe,
      c = arms[arm];
    const values = [
      b.tokens_per_success,
      c.tokens_per_success,
      b.steady_tokens_per_success,
      c.steady_tokens_per_success,
    ];
    return (
      values.every((v) => v !== null) &&
      (c.tokens_per_success - b.tokens_per_success) *
        (c.steady_tokens_per_success - b.steady_tokens_per_success) <
        0
    );
  });
  const mixed =
    setupTradeoff ||
    comparisons.some(
      (c) =>
        c.point.token_ratio !== null &&
        c.point.token_ratio < 1 &&
        (c.point.quality_difference < 0 || (ratified && c.point.time_ratio > margins.time_ratio)),
    );
  return {
    schema_version: 4,
    kind: "agentplane.m05_subscription_report",
    evidence_scope: "offline_qualification",
    metric: contract.metric,
    campaign: binding.campaign,
    ledger_digest: binding.ledger_digest,
    analysis_digest: digest(analysis),
    analysis,
    efficiency: "NOT_ESTABLISHED",
    disposition: adverse ? "ADVERSE" : mixed ? "MIXED" : "NOT_ESTABLISHED",
    reason:
      "Offline report qualification cannot establish subscription savings or reduced fixed subscription charges. Live confirmation requires separately authenticated frozen campaign evidence and independent review.",
    arms,
    external_setup: setupTotals,
    primary_estimand: "overall_deployment_policy",
    supplementary,
    strata: Object.entries(Object.groupBy(rows, (r) => r.stratum)).map(([stratum, selected]) => ({
      stratum,
      arms: Object.fromEntries(
        subscriptionArms.map((arm) => [arm, tokenTotals(selected.filter((r) => r.arm === arm))]),
      ),
    })),
    inference: { ...inference, comparisons },
    assignments: rows.map((r) => ({
      ...r,
      total: r.complete ? r.total : null,
      steady: r.steady_complete ? r.steady : null,
    })),
    matched_successful_pairs: groups
      .filter((g) => g.every((r) => r.success && r.complete))
      .map((g) => ({
        pair_id: g[0].pair_id,
        secondary_only: true,
        tokens: Object.fromEntries(g.map((r) => [r.arm, r.total])),
      })),
  };
}
