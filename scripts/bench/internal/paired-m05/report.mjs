import assert from "node:assert/strict";
import { verify } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { digest, validateM05Contract } from "./contract.mjs";
import { openM05Ledger } from "./ledger.mjs";

const arms = ["no_recipe", "instantiate", "specialize"];
const sum = (values) => {
  const total = values.reduce((a, b) => a + b, 0);
  assert.ok(Number.isSafeInteger(total), "Cost exceeds exact integer range");
  return total;
};
function totals(rows) {
  const successes = rows.filter((r) => r.success).length;
  const complete = rows.length > 0 && rows.every((r) => r.complete);
  const inclusive = complete ? sum(rows.map((r) => r.inclusive)) : null;
  const steady = complete ? sum(rows.map((r) => r.steady)) : null;
  return {
    assigned: rows.length,
    verified_successes: successes,
    success_rate: rows.length > 0 ? successes / rows.length : null,
    usage_complete: complete,
    known_cost_microunits: sum(rows.map((r) => r.known)),
    setup_inclusive_cost_microunits: inclusive,
    steady_state_cost_microunits: steady,
    setup_inclusive_cost_per_verified_success:
      successes && inclusive !== null ? inclusive / successes : null,
    steady_state_cost_per_verified_success:
      successes && steady !== null ? steady / successes : null,
  };
}

// Resample whole task clusters, never individual repeated attempts. This is a
// descriptive offline percentile interval, not a live confirmation decision.
function uncertainty(rows, minimum) {
  const groups = Object.values(Object.groupBy(rows, (r) => r.task_id));
  const base = {
    method: "task_cluster_percentile_bootstrap",
    confidence: 0.95,
    resamples: 1000,
    task_clusters: groups.length,
    interval: null,
  };
  if (groups.length < minimum || !totals(rows).usage_complete)
    return { ...base, reason: "insufficient_clusters_or_incomplete_usage" };
  let seed = 0x5e_ed;
  const estimates = [];
  for (let i = 0; i < 1000; i++) {
    const sample = [];
    for (let j = 0; j < groups.length; j++) {
      seed = (Math.imul(seed, 1_664_525) + 1_013_904_223) >>> 0;
      sample.push(...groups[seed % groups.length]);
    }
    const value = totals(sample).setup_inclusive_cost_per_verified_success;
    if (value === null) return { ...base, reason: "resample_has_no_verified_success" };
    estimates.push(value);
  }
  estimates.sort((a, b) => a - b);
  return { ...base, interval: [estimates[24], estimates[974]], reason: null };
}

export function buildM05DurableReport(
  { contract: input, ledgerRoot, oracleReceipts = {} },
  { oracleKey } = {},
) {
  const contract = validateM05Contract(input);
  const analysis = contract.analysis;
  assert.ok(["pilot", "confirmation"].includes(analysis?.phase));
  assert.ok(
    Number.isSafeInteger(analysis.minimum_task_clusters) && analysis.minimum_task_clusters >= 3,
  );
  if (analysis.phase === "confirmation")
    assert.match(analysis.preregistration_digest, /^sha256:[a-f0-9]{64}$/u);
  assert.ok(existsSync(path.join(ledgerRoot, "0.json")), "Retained ledger required");
  const ledger = openM05Ledger(ledgerRoot, contract).read();
  const pairs = new Set();
  const rows = contract.assignments.map((a) => {
    for (const field of ["pair_id", "workflow", "transport", "cache"])
      assert.ok(typeof a[field] === "string" && a[field].length > 0, `Missing assignment ${field}`);
    const key = JSON.stringify([a.arm, a.pair_id]);
    assert.ok(!pairs.has(key), "Duplicate arm/pair assignment");
    pairs.add(key);
    const calls = Object.values(ledger.calls).filter((c) => c.reservation.assignment_id === a.id);
    let known = 0,
      inclusive = 0,
      steady = 0;
    let complete = calls.length > 0 && Object.hasOwn(ledger.outcomes, a.id);
    for (const call of calls) {
      assert.ok(
        ["setup", "steady_state"].includes(call.reservation.accounting_phase),
        "Missing call accounting phase",
      );
      const receipt = call.receipt;
      if (!receipt || receipt.effect_state === "unknown" || receipt.usage.state !== "observed")
        complete = false;
      if (receipt?.usage.cost_microunits !== null && receipt?.usage.cost_microunits !== undefined)
        known = sum([known, receipt.usage.cost_microunits]);
      if (receipt?.usage.state === "observed") {
        inclusive = sum([inclusive, receipt.usage.cost_microunits]);
        if (call.reservation.accounting_phase === "steady_state")
          steady = sum([steady, receipt.usage.cost_microunits]);
      }
    }
    const outcome = ledger.outcomes[a.id];
    let success = false;
    if (outcome?.verified) {
      const evidence = oracleReceipts[a.id];
      assert.ok(oracleKey && evidence, "Independent oracle evidence required");
      assert.ok(
        verify(
          null,
          Buffer.from(digest(evidence.payload)),
          oracleKey,
          Buffer.from(evidence.signature, "base64"),
        ),
        "Unauthenticated oracle evidence",
      );
      const proof = evidence.payload;
      assert.equal(proof.kind, "agentplane.m05_offline_oracle_result");
      assert.equal(proof.campaign, digest(contract));
      assert.equal(proof.assignment_id, a.id);
      assert.equal(proof.oracle_digest, contract.oracle_digest);
      assert.equal(proof.policy_digest, contract.policy_digest);
      assert.equal(proof.assessment_digest, digest({ calls, outcome }));
      assert.equal(proof.verified, true);
      success = true;
    }
    return {
      ...a,
      success,
      complete,
      known,
      inclusive,
      steady,
      outcome: outcome?.status ?? "pending",
    };
  });
  // Pair identity is an assignment invariant, including failed and unknown rows.
  for (const assigned of Object.values(Object.groupBy(rows, (row) => row.pair_id))) {
    const first = assigned[0];
    for (const row of assigned) {
      for (const field of ["task_id", "workflow", "transport", "cache"])
        assert.equal(row[field], first[field], "Assigned pair identity mismatch");
    }
  }
  const byArm = Object.fromEntries(
    arms.map((arm) => {
      const selected = rows.filter((r) => r.arm === arm);
      return [
        arm,
        { ...totals(selected), uncertainty: uncertainty(selected, analysis.minimum_task_clusters) },
      ];
    }),
  );
  const strata = Object.entries(
    Object.groupBy(rows, (r) => JSON.stringify([r.workflow, r.transport, r.cache])),
  ).map(([key, values]) => ({
    dimensions: JSON.parse(key),
    arms: Object.fromEntries(arms.map((arm) => [arm, totals(values.filter((r) => r.arm === arm))])),
  }));
  const matched = arms.slice(1).map((arm) => {
    const eligible = rows.filter((r) => r.arm === arm && r.success && r.complete);
    const pairs = eligible.flatMap((r) => {
      const base = rows.find((b) => b.arm === "no_recipe" && b.pair_id === r.pair_id);
      if (!base?.success || !base.complete) return [];
      assert.equal(r.task_id, base.task_id, "Pair task mismatch");
      for (const field of ["workflow", "transport", "cache"])
        assert.equal(r[field], base[field], "Pair stratum mismatch");
      return [
        {
          pair_id: r.pair_id,
          task_id: r.task_id,
          baseline_cost: base.inclusive,
          candidate_cost: r.inclusive,
        },
      ];
    });
    return { arm, secondary_only: true, successful_pairs: pairs };
  });
  const baseline = byArm.no_recipe;
  const mixed = arms.slice(1).some((arm) => {
    const candidate = byArm[arm];
    const b = baseline.setup_inclusive_cost_per_verified_success;
    const c = candidate.setup_inclusive_cost_per_verified_success;
    const bs = baseline.steady_state_cost_per_verified_success;
    const cs = candidate.steady_state_cost_per_verified_success;
    return (
      b !== null &&
      c !== null &&
      ((c < b && candidate.success_rate < baseline.success_rate) ||
        (c > b && candidate.success_rate > baseline.success_rate) ||
        (c - b) * (cs - bs) < 0)
    );
  });
  return {
    schema_version: 3,
    kind: "agentplane.m05_durable_report",
    evidence_scope: "offline_qualification",
    campaign: digest(contract),
    analysis: structuredClone(analysis),
    ledger_digest: digest(ledger),
    efficiency: "NOT_ESTABLISHED",
    disposition: mixed ? "MIXED" : "NOT_ESTABLISHED",
    reason: "Offline host and oracle fixtures cannot establish live economic benefit.",
    arms: byArm,
    strata,
    matched_successful_pairs: matched,
    assignments: rows.map(({ inclusive, steady, ...row }) => ({
      ...row,
      setup_inclusive_cost: row.complete ? inclusive : null,
      steady_state_cost: row.complete ? steady : null,
    })),
  };
}
