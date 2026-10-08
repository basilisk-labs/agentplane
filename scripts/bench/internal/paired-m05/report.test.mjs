import assert from "node:assert/strict";
import { generateKeyPairSync, sign } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { digest } from "./contract.mjs";
import { openM05Ledger } from "./ledger.mjs";
import { buildM05DurableReport } from "../../paired-result-report.mjs";

function fixture(
  t,
  { tasks = 3, phase = "pilot", change = () => {}, mapAssignment = (a) => a } = {},
) {
  const root = mkdtempSync(path.join(os.tmpdir(), "m05-report-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const keys = generateKeyPairSync("ed25519");
  const contract = {
    schema_version: 3,
    kind: "agentplane.m05_live_contract",
    campaign_id: "report-fixture",
    objective: "Offline reporting qualification",
    adapter: "injected-test",
    model: "test-model",
    effort: "high",
    sandbox: "isolated",
    network: "deny",
    cache: "cold",
    session: "fresh",
    rate_basis: "test-units",
    ...Object.fromEntries(
      [
        "product_digest",
        "oracle_digest",
        "policy_digest",
        "runtime_digest",
        "authority_digest",
        "corpus_digest",
        "randomization_digest",
      ].map((k) => [k, digest(k)]),
    ),
    target_sha: "b".repeat(40),
    transport: "external",
    limits: { max_tokens: 100_000, max_cost_microunits: 100_000, max_calls: 100, retry_limit: 0 },
    analysis: {
      phase,
      minimum_task_clusters: 3,
      preregistration_digest: phase === "confirmation" ? digest("preregistered") : null,
    },
    assignments: Array.from({ length: tasks }, (_, i) =>
      ["no_recipe", "instantiate"].map((arm) => ({
        id: `task-${i}-${arm.replaceAll("_", "-")}`,
        order: 0,
        arm,
        task_id: `task-${i}`,
        stratum: "direct",
        pair_id: `pair-${i}`,
        workflow: "direct",
        transport: "external",
        cache: "cold",
      })),
    )
      .flat()
      .map((a, order) => ({ ...a, order })),
  };
  contract.assignments = contract.assignments.map((assignment) => mapAssignment(assignment));
  const ledgerRoot = path.join(root, "ledger");
  const ledger = openM05Ledger(ledgerRoot, contract);
  const oracleReceipts = {};
  const signed = (payload) => ({
    payload,
    signature: sign(null, Buffer.from(digest(payload)), keys.privateKey).toString("base64"),
  });
  for (const a of contract.assignments) {
    const settings = {
      status: "completed",
      verified: true,
      setup: 10,
      steady: a.arm === "no_recipe" ? 90 : 40,
      unknown: false,
    };
    change(settings, a);
    for (const accounting_phase of ["setup", "steady_state"]) {
      const reservation = {
        id: `${a.id}-${accounting_phase.replaceAll("_", "-")}`,
        assignment_id: a.id,
        episode_id: accounting_phase.replaceAll("_", "-"),
        role: accounting_phase === "setup" ? "PLANNER" : "EXECUTOR",
        retry: 0,
        model: contract.model,
        effort: contract.effort,
        max_tokens: 100,
        max_cost_microunits: 1000,
        accounting_phase,
      };
      ledger.dispatch(reservation);
      const receipt = {
        status: settings.status,
        effect_state: "terminal",
        verified: false,
        evidence_digest: digest("fixture-provider-evidence"),
        observed_model: contract.model,
        observed_effort: contract.effort,
        usage: settings.partial
          ? {
              state: "partial",
              input_tokens: 10,
              output_tokens: 10,
              cached_input_tokens: null,
              reasoning_tokens: null,
              total_tokens: 20,
              cost_microunits: 7,
            }
          : settings.unknown
            ? {
                state: "unavailable",
                input_tokens: null,
                output_tokens: null,
                cached_input_tokens: null,
                reasoning_tokens: null,
                total_tokens: null,
                cost_microunits: null,
              }
            : {
                state: "observed",
                input_tokens: 10,
                output_tokens: 10,
                cached_input_tokens: 5,
                reasoning_tokens: 5,
                total_tokens: 20,
                cost_microunits: accounting_phase === "setup" ? settings.setup : settings.steady,
              },
        spans: [{ stage: "provider", start_ms: 0, end_ms: 2 }],
      };
      if (settings.mutateReceipt) settings.mutateReceipt(receipt);
      ledger.receipt(reservation.id, receipt);
    }
    const outcome = {
      status: settings.status,
      verified: settings.verified,
      evidence_digest: digest(a.id),
    };
    ledger.outcome(a.id, outcome);
    const calls = Object.values(ledger.read().calls).filter(
      (c) => c.reservation.assignment_id === a.id,
    );
    oracleReceipts[a.id] = signed({
      kind: "agentplane.m05_offline_oracle_result",
      campaign: digest(contract),
      assignment_id: a.id,
      oracle_digest: contract.oracle_digest,
      policy_digest: contract.policy_digest,
      assessment_digest: digest({ calls, outcome }),
      verified: true,
    });
  }
  const options = { contract, ledgerRoot, oracleReceipts };
  return {
    options,
    host: { oracleKey: keys.publicKey },
    signed,
    ledger,
    report: () => buildM05DurableReport(options, { oracleKey: keys.publicKey }),
  };
}

test("M05 versioned report separates setup totals, retains assignments and clusters uncertainty", (t) => {
  const f = fixture(t);
  const report = f.report();
  assert.equal(report.schema_version, 3);
  assert.equal(report.efficiency, "NOT_ESTABLISHED");
  assert.equal(report.arms.no_recipe.setup_inclusive_cost_microunits, 300);
  assert.equal(report.arms.no_recipe.steady_state_cost_microunits, 270);
  assert.equal(report.arms.instantiate.setup_inclusive_cost_per_verified_success, 50);
  assert.equal(report.arms.no_recipe.uncertainty.task_clusters, 3);
  assert.deepEqual(report.arms.no_recipe.uncertainty.interval, [100, 100]);
  assert.equal(report.matched_successful_pairs[0].successful_pairs.length, 3);
  assert.equal(report.strata[0].arms.no_recipe.assigned, 3);
  assert.equal(report.assignments.length, 6);
});

test("M05 failed and cancelled assignments remain in primary cost and success denominators", (t) => {
  const f = fixture(t, {
    change(s, a) {
      if (a.arm === "instantiate" && a.task_id !== "task-0") {
        s.verified = false;
        s.status = a.task_id === "task-1" ? "failed" : "cancelled";
      }
    },
  });
  const report = f.report();
  assert.equal(report.arms.instantiate.assigned, 3);
  assert.equal(report.arms.instantiate.verified_successes, 1);
  assert.equal(report.arms.instantiate.success_rate, 1 / 3);
  assert.equal(report.arms.instantiate.setup_inclusive_cost_per_verified_success, 150);
  assert.equal(report.matched_successful_pairs[0].successful_pairs.length, 1);
});

test("M05 zero success and incomplete usage never become finite free-success estimates", (t) => {
  const none = fixture(t, {
    change(s) {
      s.status = "failed";
      s.verified = false;
    },
  }).report();
  assert.equal(none.arms.no_recipe.setup_inclusive_cost_per_verified_success, null);
  assert.equal(none.arms.no_recipe.uncertainty.interval, null);
  const unknown = fixture(t, {
    change(s, a) {
      if (a.task_id === "task-1") s.unknown = true;
    },
  }).report();
  assert.equal(unknown.arms.no_recipe.setup_inclusive_cost_microunits, null);
  assert.equal(unknown.arms.no_recipe.setup_inclusive_cost_per_verified_success, null);
  assert.equal(unknown.arms.no_recipe.known_cost_microunits, 200);
  assert.equal(unknown.arms.no_recipe.uncertainty.interval, null);
  assert.equal(unknown.disposition, "NOT_ESTABLISHED");
});

test("M05 rejects forged oracle evidence and exact policy, oracle or assessment mismatches", (t) => {
  for (const field of ["policy_digest", "oracle_digest", "assessment_digest", "campaign"]) {
    const f = fixture(t, { tasks: 1 });
    const id = f.options.contract.assignments[0].id;
    const payload = { ...f.options.oracleReceipts[id].payload, [field]: digest("wrong") };
    f.options.oracleReceipts[id] = f.signed(payload);
    assert.throws(f.report);
  }
  const f = fixture(t, { tasks: 1 });
  assert.throws(
    () => buildM05DurableReport(f.options, { oracleKey: generateKeyPairSync("ed25519").publicKey }),
    /Unauthenticated/,
  );
  delete f.options.oracleReceipts[f.options.contract.assignments[0].id];
  assert.throws(f.report, /Independent oracle/);
});

test("M05 small task clusters and pilot evidence cannot substitute for confirmation", (t) => {
  const pilot = fixture(t, { tasks: 1 }).report();
  assert.equal(pilot.arms.no_recipe.uncertainty.interval, null);
  assert.equal(pilot.analysis.phase, "pilot");
  const confirmation = fixture(t, { phase: "confirmation" }).report();
  assert.equal(confirmation.analysis.phase, "confirmation");
  assert.equal(confirmation.efficiency, "NOT_ESTABLISHED");
});

test("M05 reports setup versus steady-state tradeoffs as MIXED without an efficiency claim", (t) => {
  const report = fixture(t, {
    change(s, a) {
      if (a.arm === "instantiate") s.setup = 200;
    },
  }).report();
  assert.equal(report.disposition, "MIXED");
  assert.equal(report.efficiency, "NOT_ESTABLISHED");
  assert.equal(report.arms.instantiate.setup_inclusive_cost_per_verified_success, 240);
  assert.equal(report.arms.instantiate.steady_state_cost_per_verified_success, 40);
});

test("M05 validates failed and unknown assignment pair identities before filtering", (t) => {
  for (const field of ["task_id", "workflow", "transport", "cache"]) {
    for (const unknown of [false, true]) {
      const f = fixture(t, {
        tasks: 1,
        mapAssignment: (a) => (a.arm === "instantiate" ? { ...a, [field]: "mismatched" } : a),
        change(s, a) {
          if (a.arm === "instantiate") {
            s.verified = false;
            s.status = "failed";
            s.unknown = unknown;
          }
        },
      });
      assert.throws(f.report, /Assigned pair identity mismatch/);
    }
  }
});

test("M05 partial cost remains a known lower bound, never a complete estimate", (t) => {
  const report = fixture(t, {
    tasks: 1,
    change(s) {
      s.partial = true;
    },
  }).report();
  assert.equal(report.arms.no_recipe.known_cost_microunits, 14);
  assert.equal(report.arms.no_recipe.setup_inclusive_cost_microunits, null);
  assert.equal(report.arms.no_recipe.setup_inclusive_cost_per_verified_success, null);
});

test("M05 uncertainty resamples unequal task clusters with all repetitions together", (t) => {
  const report = fixture(t, {
    tasks: 6,
    mapAssignment(a) {
      const i = Number(a.task_id.slice(5));
      return { ...a, task_id: i < 3 ? "cluster-a" : i < 5 ? "cluster-b" : "cluster-c" };
    },
    change(s, a) {
      s.setup = 0;
      s.steady = a.task_id === "cluster-a" ? 10 : a.task_id === "cluster-b" ? 100 : 1000;
    },
  }).report();
  const u = report.arms.no_recipe.uncertainty;
  assert.equal(u.task_clusters, 3);
  // With 3 clusters sampled 3 times, the all-low and all-high draws each have
  // probability 1/27 > 2.5%. Attempt-level sampling does not have these tails.
  assert.deepEqual(u.interval, [10, 1000]);
  assert.equal(report.arms.no_recipe.assigned, 6);
});

test("M05 reporting fixtures reject overlapping spans and token subset contradictions at durable admission", (t) => {
  for (const mutateReceipt of [
    (r) => {
      r.spans.push({ stage: "checks", start_ms: 1, end_ms: 3 });
    },
    (r) => {
      r.usage.cached_input_tokens = 11;
    },
    (r) => {
      r.usage.reasoning_tokens = 11;
    },
    (r) => {
      r.usage.total_tokens = 0;
    },
    (r) => {
      r.usage.state = "unattributable";
    },
  ])
    assert.throws(() =>
      fixture(t, {
        tasks: 1,
        change(s) {
          s.mutateReceipt = mutateReceipt;
        },
      }),
    );
});
