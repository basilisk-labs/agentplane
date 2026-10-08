import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { generateKeyPairSync, sign } from "node:crypto";
import { digest } from "./contract.mjs";
import { openSubscriptionLedger } from "./subscription-ledger.mjs";
import { parseSubscriptionTokens } from "./subscription-contract.mjs";
import { buildSubscriptionReport } from "./subscription-report.mjs";
import { subscriptionInference } from "./subscription-analysis.mjs";
import {
  registerSubscriptionPilot,
  assertSubscriptionLaunchReady,
  codingStrata,
} from "./subscription-registration.mjs";
const arms = ["no_recipe", "instantiate", "specialize"];
const analysis = {
  phase: "pilot",
  quality_scope: "fixed_corpus",
  metric: "tokens_per_verified_success",
  registration_digest: digest("registration"),
  seed: 123,
  resamples: 1000,
  alpha: 0.05,
  margins: null,
};
function fixture(
  t,
  {
    fail = null,
    unknown = null,
    extra = false,
    skip = null,
    assignmentMutation = null,
    usageOverride = null,
    analysisOverride = analysis,
  } = {},
) {
  const root = mkdtempSync(path.join(os.tmpdir(), "subscription-report-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const assignments = arms.map((arm, order) => ({
    id: arm.replaceAll("_", "-"),
    arm,
    order,
    task_id: "task",
    stratum: "direct",
    pair_id: "pair",
    workflow: "direct",
    transport: "app_server",
    cache: "cold",
    session: "fresh",
  }));
  if (assignmentMutation) assignmentMutation(assignments);
  const contract = {
    analysis_digest: digest(analysisOverride),
    schema_version: 4,
    kind: "agentplane.m05_subscription_contract",
    authentication: "chatgpt",
    metric: analysis.metric,
    transport: "app_server",
    token_limit_enforcement: "soft_monitored",
    campaign_id: "report",
    model: "fixture",
    effort: "medium",
    sandbox: "landlock",
    network: "deny",
    cache: "cold",
    session: "fresh",
    target_sha: "a".repeat(40),
    ...Object.fromEntries(
      ["product", "oracle", "policy", "runtime", "authority", "corpus", "randomization"].map(
        (k) => [`${k}_digest`, digest(k)],
      ),
    ),
    limits: {
      max_calls: 20,
      max_episodes: 20,
      retry_limit: 1,
      turn_timeout_ms: 100,
      max_duration_ms: 10_000,
      soft_token_ceiling: 10_000,
      quota_cutoff_percent: 80,
    },
    assignments,
  };
  const ledger = openSubscriptionLedger(root, contract);
  let index = 0;
  const add = (a, role, retry = 0) => {
    const id = `call-${index}`,
      now = index++ * 100;
    ledger.intent({
      id,
      assignment_id: a.id,
      episode_id: `${a.id}-${role.toLowerCase()}`,
      role,
      retry,
      accounting_phase: role === "PLANNER" ? "setup" : "steady",
      model: contract.model,
      effort: contract.effort,
      thread_id: id,
      started_ms: now,
      deadline_ms: now + 100,
    });
    ledger.turn(id, id);
    ledger.receipt(id, {
      thread_id: id,
      turn_id: id,
      effect_state: "terminal",
      status: retry === 0 && extra && role === "EXECUTOR" ? "failed" : "completed",
      identity_valid: true,
      observed_model: contract.model,
      observed_effort: contract.effort,
      stop_reason: null,
      finished_ms: now + 50,
      usage: parseSubscriptionTokens(
        a.id === unknown
          ? {}
          : (usageOverride?.(a) ?? {
              inputTokens: 8,
              outputTokens: 2,
              totalTokens: 10,
              cachedInputTokens: 3,
              reasoningOutputTokens: 1,
            }),
      ),
    });
  };
  // Unknown usage must be last: the production ledger forbids further dispatch.
  for (const a of assignments) {
    if (a.id === skip) continue;
    if (extra && a.order === 0) {
      add(a, "PLANNER");
      add(a, "EXECUTOR");
      add(a, "EXECUTOR", 1);
    }
    add(a, "EVALUATOR");
  }
  const state = ledger.read();
  const seal = (payload) => ({
    payload,
    signature: sign(null, Buffer.from(digest(payload)), privateKey).toString("base64"),
  });
  const binding = {
    campaign: digest(contract),
    ledger_digest: digest(state),
    oracle_digest: contract.oracle_digest,
    policy_digest: contract.policy_digest,
  };
  const outcomes = Object.fromEntries(
    assignments.map((a) => [
      a.id,
      seal({
        ...binding,
        kind: "agentplane.m05_subscription_outcome",
        assignment_id: a.id,
        assessment_digest: digest({
          assignment: a,
          calls: Object.values(state.calls).filter((c) => c.reservation.assignment_id === a.id),
        }),
        status: a.id === fail ? "failed" : "completed",
        verified: a.id !== fail,
        accounting_complete: true,
        safety_violations: [],
        active_ms: 100,
        elapsed_ms: 150,
        final_head: "a".repeat(40),
        native_evidence_digest: digest("native"),
      }),
    ]),
  );
  const setup = Object.fromEntries(
    arms.map((arm) => [
      arm,
      seal({
        ...binding,
        kind: "agentplane.m05_subscription_external_setup",
        arm,
        scope: "outside_assignment_calls",
        usage: parseSubscriptionTokens({
          inputTokens: 0,
          outputTokens: 0,
          totalTokens: 0,
          cachedInputTokens: 0,
          reasoningOutputTokens: 0,
        }),
      }),
    ]),
  );
  return {
    input: { contract, ledgerRoot: root, analysis: analysisOverride, outcomes, setup },
    host: { oracleKey: publicKey },
    seal,
    binding,
  };
}
test("subscription report counts every role/retry and failures without currency or subset double counting", (t) => {
  const f = fixture(t, { extra: true, fail: "instantiate" });
  const r = buildSubscriptionReport(f.input, f.host);
  assert.equal(r.arms.no_recipe.setup_inclusive_tokens, 40);
  assert.equal(r.arms.no_recipe.steady_tokens, 30);
  assert.equal(r.assignments[0].subsets.cachedInputTokens, 12);
  assert.equal(r.assignments[0].calls.length, 4);
  assert.equal(r.arms.instantiate.setup_inclusive_tokens, 10);
  assert.equal(r.arms.instantiate.tokens_per_success, null);
  assert.equal(r.matched_successful_pairs.length, 0);
  assert.equal(r.efficiency, "NOT_ESTABLISHED");
  assert.equal(JSON.stringify(r).includes("microunits"), false);
});
test("unknown usage and missing setup remain unknown, while observed steady totals survive", (t) => {
  const f = fixture(t, { unknown: "specialize" });
  delete f.input.setup.no_recipe;
  const r = buildSubscriptionReport(f.input, f.host);
  assert.equal(r.arms.specialize.setup_inclusive_tokens, null);
  assert.equal(r.arms.specialize.known_token_lower_bound, 0);
  assert.equal(r.arms.no_recipe.setup_inclusive_tokens, null);
  assert.equal(r.arms.no_recipe.steady_tokens, 10);
  assert.equal(r.assignments[0].total, null);
  assert.equal(r.external_setup.no_recipe.totalTokens, null);
});
test("missing outcome is retained; forged or misbound outcome never becomes success", (t) => {
  const f = fixture(t);
  delete f.input.outcomes.instantiate;
  const r = buildSubscriptionReport(f.input, f.host);
  assert.equal(r.assignments.length, 3);
  assert.equal(r.assignments[1].outcome, "unobserved");
  assert.equal(r.arms.instantiate.usage_complete, false);
  f.input.outcomes.specialize.payload.verified = false;
  assert.throws(() => buildSubscriptionReport(f.input, f.host), /Unauthenticated/u);
});
test("failed-arm pair mismatch is rejected before successful-pair filtering", (t) => {
  const f = fixture(t, {
    fail: "instantiate",
    assignmentMutation: (a) => {
      a[1].task_id = "different";
    },
  });
  assert.throws(() => buildSubscriptionReport(f.input, f.host), /Pair identity/u);
});
function inferenceRows() {
  return [1, 3, 7].flatMap((repetitions, cluster) =>
    Array.from({ length: repetitions }, (_, repeat) =>
      arms.map((arm) => ({
        id: `${cluster}-${repeat}-${arm}`,
        task_id: `task-${cluster}`,
        stratum: "direct",
        arm,
        success: true,
        complete: true,
        terminal: true,
        known: 100,
        total: arm === "no_recipe" ? 100 : [20, 70, 120][cluster],
        steady: 100,
        active_ms: 100,
      })),
    ).flat(),
  );
}
test("matched cluster inference preserves unequal cluster sizes and all six simultaneous bounds", () => {
  const rows = inferenceRows();
  const result = subscriptionInference(rows, analysis);
  assert.deepEqual(result.clusters_per_stratum, [3]);
  assert.equal(result.per_bound_alpha, 0.05 / 6);
  assert.equal(result.comparisons[0].token_ratio_upper, 1.2);
  assert.equal(result.comparisons[0].quality_difference_lower, -1);
  assert.equal(result.comparisons[0].time_ratio_upper, 1);
  assert.deepEqual(subscriptionInference(rows, analysis), result);
  for (const row of rows) if (row.task_id !== "task-0") row.success = false;
  assert.equal(
    subscriptionInference(rows, analysis).comparisons[0].reason,
    "nonfinite_resample_retained",
  );
});
test("one task per stratum and unknown times cannot create a finite confirmatory interval", () => {
  const rows = inferenceRows().filter((r) => r.task_id === "task-0");
  assert.equal(subscriptionInference(rows, analysis).comparisons[0].token_ratio_upper, null);
  const all = inferenceRows();
  all[0].active_ms = null;
  assert.equal(subscriptionInference(all, analysis).comparisons[0].time_ratio_upper, null);
});
test("pilot freezes 75 assignments and near-balanced orders without claiming launch authority", () => {
  const cases = codingStrata.map((id) => ({ id, workflow: "direct" }));
  const r = registerSubscriptionPilot(cases);
  assert.equal(r.assignments.length, 75);
  assert.deepEqual(r, registerSubscriptionPilot(cases));
  for (const c of cases) {
    const assigned = r.assignments.filter((a) => a.task_id === c.id);
    assert.equal(assigned.length, 15);
    const orders = Array.from({ length: 5 }, (_, i) =>
      assigned
        .filter((a) => a.repetition === i)
        .map((a) => a.arm)
        .join(","),
    );
    assert.equal(new Set(orders).size, 5);
  }
  assert.throws(() => assertSubscriptionLaunchReady(r, { phase: "pilot" }), /Unresolved/u);
  r.assignments.pop();
  assert.throws(
    () => assertSubscriptionLaunchReady(r, { phase: "pilot" }),
    /Registration changed/u,
  );
});

test("cancelled and unstarted assignments stay assigned; partial token components are only a lower bound", (t) => {
  const f = fixture(t, {
    skip: "specialize",
    usageOverride: (a) =>
      a.arm === "instantiate"
        ? { inputTokens: 8 }
        : {
            inputTokens: 8,
            outputTokens: 2,
            totalTokens: 10,
            cachedInputTokens: 3,
            reasoningOutputTokens: 1,
          },
  });
  for (const [id, status] of [
    ["instantiate", "cancelled"],
    ["specialize", "unstarted"],
  ])
    f.input.outcomes[id] = f.seal({
      ...f.input.outcomes[id].payload,
      status,
      verified: false,
      active_ms: null,
      elapsed_ms: null,
    });
  const r = buildSubscriptionReport(f.input, f.host);
  assert.equal(r.arms.instantiate.assigned, 1);
  assert.equal(r.arms.instantiate.known_token_lower_bound, 8);
  assert.equal(r.arms.instantiate.setup_inclusive_tokens, null);
  assert.equal(r.arms.specialize.setup_inclusive_tokens, null);
  assert.equal(r.assignments[2].outcome, "unstarted");
  assert.equal(r.inference.comparisons[0].time_ratio_upper, null);
});
test("external setup is counted once and adverse safety results remain adverse", (t) => {
  const f = fixture(t, { fail: "instantiate" });
  f.input.setup.no_recipe = f.seal({
    ...f.input.setup.no_recipe.payload,
    usage: parseSubscriptionTokens({
      inputTokens: 7,
      outputTokens: 3,
      totalTokens: 10,
      cachedInputTokens: 0,
      reasoningOutputTokens: 0,
    }),
  });
  f.input.outcomes.instantiate = f.seal({
    ...f.input.outcomes.instantiate.payload,
    safety_violations: ["scope"],
  });
  const r = buildSubscriptionReport(f.input, f.host);
  assert.equal(r.arms.no_recipe.setup_inclusive_tokens, 20);
  assert.equal(r.arms.no_recipe.steady_tokens, 10);
  assert.equal(r.disposition, "ADVERSE");
  assert.equal(r.efficiency, "NOT_ESTABLISHED");
});
test("a descriptive token/time tradeoff remains MIXED rather than savings", (t) => {
  const f = fixture(t, {
    analysisOverride: {
      ...analysis,
      margins: { token_ratio: 0.95, quality_difference: 0, time_ratio: 1.05 },
    },
    usageOverride: (a) => ({
      inputTokens: a.arm === "no_recipe" ? 8 : 3,
      outputTokens: 2,
      totalTokens: a.arm === "no_recipe" ? 10 : 5,
      cachedInputTokens: 0,
      reasoningOutputTokens: 0,
    }),
  });
  f.input.outcomes.instantiate = f.seal({
    ...f.input.outcomes.instantiate.payload,
    active_ms: 200,
    elapsed_ms: 250,
  });
  const r = buildSubscriptionReport(f.input, f.host);
  assert.equal(r.disposition, "MIXED");
  assert.equal(r.efficiency, "NOT_ESTABLISHED");
});

test("resampling counts one-time external setup exactly once with unequal task clusters", () => {
  const rows = inferenceRows();
  for (const row of rows) if (row.arm !== "no_recipe") row.total = 0;
  const result = subscriptionInference(rows, analysis, {
    no_recipe: 0,
    instantiate: 110,
    specialize: 110,
  });
  assert.equal(result.comparisons[0].point.token_ratio, 0.1);
  assert.equal(result.comparisons[0].token_ratio_upper, 110 / 300);
  assert.equal(
    subscriptionInference(rows, analysis, { no_recipe: null }).comparisons[0].token_ratio_upper,
    null,
  );
});
function resealRegistration(value) {
  const contents = { ...value };
  delete contents.digest;
  return { ...contents, digest: digest(contents) };
}
test("readiness rejects absent pins and unequal task allocation even with a recomputed digest", () => {
  const r = registerSubscriptionPilot(codingStrata.map((id) => ({ id, workflow: "direct" })));
  r.runtime_pins = {};
  assert.throws(
    () => assertSubscriptionLaunchReady(resealRegistration(r), { phase: "pilot" }),
    /Unresolved/u,
  );
  r.runtime_pins = Object.fromEntries(
    [
      "product",
      "policy",
      "runtime",
      "oracle",
      "recipe_closure",
      "native_authority",
      "current_quota",
    ].map((k) => [k, digest(k)]),
  );
  assert.doesNotThrow(() =>
    assertSubscriptionLaunchReady(resealRegistration(r), { phase: "pilot" }),
  );
  delete r.runtime_pins.oracle;
  assert.throws(
    () => assertSubscriptionLaunchReady(resealRegistration(r), { phase: "pilot" }),
    /Unresolved/u,
  );
  r.runtime_pins.oracle = digest("oracle");
  for (const assignment of r.assignments.filter(
    (a) => a.task_id === "direct-fix" && a.repetition === 4,
  ))
    assignment.task_id = "branch-change";
  assert.throws(() => assertSubscriptionLaunchReady(resealRegistration(r), { phase: "pilot" }));
});
test("confirmation requires independent tasks, fixed per-stratum allocation and power review", () => {
  const pilot = registerSubscriptionPilot(codingStrata.map((id) => ({ id, workflow: "direct" })));
  const r = {
    ...pilot,
    phase: "confirmation",
    include_pilot_data: false,
    independent_tasks: 10,
    repetitions: 1,
    tasks_per_stratum: Object.fromEntries(codingStrata.map((s) => [s, 2])),
    analysis: {
      ...analysis,
      phase: "confirmation",
      margins: { token_ratio: 0.95, quality_difference: 0, time_ratio: 1.05 },
    },
    power_review_digest: digest("review"),
    runtime_pins: Object.fromEntries(Object.keys(pilot.runtime_pins).map((k) => [k, digest(k)])),
    assignments: codingStrata
      .flatMap((stratum) =>
        [0, 1].flatMap((i) =>
          arms.map((arm) => ({
            id: `${stratum}-${i}-${arm}`,
            task_id: `${stratum}-${i}`,
            stratum,
            arm,
            pair_id: `${stratum}-${i}`,
            repetition: 0,
            workflow: "direct",
            cache: "cold",
            session: "fresh",
            transport: "app_server",
          })),
        ),
      )
      .map((a, order) => ({ ...a, order })),
  };
  assert.doesNotThrow(() =>
    assertSubscriptionLaunchReady(resealRegistration(r), {
      phase: "confirmation",
      pilotTaskIds: codingStrata,
    }),
  );
  assert.throws(
    () =>
      assertSubscriptionLaunchReady(resealRegistration(r), {
        phase: "confirmation",
        pilotTaskIds: ["direct-fix-0"],
      }),
    /Pilot/u,
  );
  delete r.power_review_digest;
  assert.throws(() =>
    assertSubscriptionLaunchReady(resealRegistration(r), { phase: "confirmation" }),
  );
});

test("setup-inclusive versus steady-state reversal remains MIXED", (t) => {
  const f = fixture(t, {
    usageOverride: (a) => ({
      inputTokens: a.arm === "no_recipe" ? 8 : 3,
      outputTokens: 2,
      totalTokens: a.arm === "no_recipe" ? 10 : 5,
      cachedInputTokens: 0,
      reasoningOutputTokens: 0,
    }),
  });
  f.input.setup.instantiate = f.seal({
    ...f.input.setup.instantiate.payload,
    usage: parseSubscriptionTokens({
      inputTokens: 100,
      outputTokens: 0,
      totalTokens: 100,
      cachedInputTokens: 0,
      reasoningOutputTokens: 0,
    }),
  });
  const r = buildSubscriptionReport(f.input, f.host);
  assert.equal(r.arms.instantiate.setup_inclusive_tokens, 105);
  assert.equal(r.arms.instantiate.steady_tokens, 5);
  assert.equal(r.disposition, "MIXED");
});

test("analysis parameters and quality scope cannot change after the ledger freeze", (t) => {
  const f = fixture(t);
  f.input.analysis = { ...analysis, seed: analysis.seed + 1 };
  assert.throws(() => buildSubscriptionReport(f.input, f.host), /Analysis changed/u);
  f.input.analysis = { ...analysis, quality_scope: "population" };
  assert.throws(() => buildSubscriptionReport(f.input, f.host), /Analysis changed/u);
});
test("fixed-corpus observed quality is distinct from finite population uncertainty", (t) => {
  const margins = { token_ratio: 0.95, quality_difference: 0, time_ratio: 1.05 };
  const fixed = fixture(t, { analysisOverride: { ...analysis, margins } });
  const report = buildSubscriptionReport(fixed.input, fixed.host);
  assert.equal(report.inference.comparisons[0].gates.quality, true);
  assert.equal(report.inference.comparisons[0].quality_difference_lower, null);
  const population = fixture(t, {
    analysisOverride: { ...analysis, margins, quality_scope: "population" },
  });
  assert.equal(
    buildSubscriptionReport(population.input, population.host).inference.comparisons[0].gates
      .quality,
    false,
  );
});
