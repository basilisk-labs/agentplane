import assert from "node:assert/strict";
import { digest } from "./contract.mjs";
import { subscriptionArms } from "./subscription-analysis.mjs";
export const codingStrata = [
  "direct-fix",
  "branch-change",
  "recoverable-failure",
  "no-match",
  "near-match",
];
const runtimePins = [
  "product",
  "policy",
  "runtime",
  "oracle",
  "recipe_closure",
  "native_authority",
  "current_quota",
];
const permutations = [
  [0, 1, 2],
  [0, 2, 1],
  [1, 0, 2],
  [1, 2, 0],
  [2, 0, 1],
  [2, 1, 0],
];
export function registerSubscriptionPilot(cases, seed = 0x07_13_20_26) {
  assert.deepEqual(cases.map((c) => c.id).toSorted(), [...codingStrata].toSorted());
  assert.equal(new Set(cases.map((c) => c.id)).size, 5);
  assert.ok(Number.isSafeInteger(seed) && seed >= 0 && seed <= 0xff_ff_ff_ff);
  let state = seed;
  const shuffle = (input) => {
    const values = [...input];
    for (let i = values.length - 1; i > 0; i--) {
      state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
      const j = Math.floor((state / 0x1_00_00_00_00) * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values;
  };
  const omitted = {};
  const assignments = shuffle(cases).flatMap((c) => {
    const orders = shuffle(permutations);
    omitted[c.id] = orders[5].map((i) => subscriptionArms[i]);
    return orders.slice(0, 5).flatMap((order, repetition) =>
      order.map((i) => ({
        id: `${c.id}-r${repetition}-${subscriptionArms[i].replaceAll("_", "-")}`,
        task_id: c.id,
        stratum: c.id,
        workflow: c.workflow,
        pair_id: `${c.id}-r${repetition}`,
        repetition,
        arm: subscriptionArms[i],
        transport: "app_server",
        cache: "cold",
        session: "fresh",
      })),
    );
  });
  const registration = {
    schema_version: 4,
    kind: "agentplane.m05_subscription_registration",
    phase: "pilot",
    metric: "tokens_per_verified_success",
    authentication: "chatgpt",
    model: "gpt-6-astra",
    effort: "medium",
    seed,
    concurrency: 1,
    independent_tasks: 5,
    repetitions: 5,
    tasks_per_stratum: Object.fromEntries(codingStrata.map((s) => [s, 1])),
    assignments: assignments.map((a, order) => ({ ...a, order })),
    omitted_permutations: omitted,
    corpus_digest: digest(cases),
    limits: {
      max_calls: 450,
      max_episodes: 375,
      retry_limit: 1,
      turn_timeout_ms: 300_000,
      max_duration_ms: 21_600_000,
      soft_token_ceiling: 6_000_000,
      quota_cutoff_percent: 80,
    },
    token_limit_enforcement: "soft_monitored",
    credit_purchase: false,
    api_fallback: false,
    stopping:
      "Fixed 75 assignments; safety/quota/time stops retain unfinished assignments. No favorable extension or replacement.",
    endpoint:
      "Native deterministic verification and independent EVALUATOR plus isolated behavioral oracle; operator waits retained separately; no external publication endpoint.",
    analysis: {
      phase: "pilot",
      quality_scope: "fixed_corpus",
      metric: "tokens_per_verified_success",
      seed: 0x07_13_20_28,
      resamples: 10_000,
      alpha: 0.05,
      margins: null,
    },
    confirmation: {
      phase: "confirmation",
      independent_tasks: null,
      repetitions: null,
      margins: null,
      seed: 0x07_13_20_27,
      include_pilot_data: false,
      fixed_before_first_turn: true,
    },
    runtime_pins: {
      product: null,
      policy: null,
      runtime: null,
      oracle: null,
      recipe_closure: null,
      native_authority: null,
      current_quota: null,
    },
  };
  return { ...registration, digest: digest(registration) };
}
export function assertSubscriptionLaunchReady(registration, { phase, pilotTaskIds = [] }) {
  const { digest: expected, ...contents } = registration;
  assert.equal(digest(contents), expected, "Registration changed");
  assert.equal(registration.phase, phase);
  for (const name of runtimePins)
    assert.match(
      registration.runtime_pins?.[name] ?? "",
      /^sha256:[a-f0-9]{64}$/u,
      `Unresolved ${name}`,
    );
  assert.equal(registration.authentication, "chatgpt");
  assert.equal(registration.model, "gpt-6-astra");
  assert.equal(registration.effort, "medium");
  assert.ok(["fixed_corpus", "population"].includes(registration.analysis.quality_scope));
  assert.equal(registration.concurrency, 1);
  assert.equal(registration.api_fallback, false);
  assert.equal(registration.credit_purchase, false);
  assert.equal(registration.token_limit_enforcement, "soft_monitored");
  for (const key of [
    "max_calls",
    "max_episodes",
    "turn_timeout_ms",
    "max_duration_ms",
    "soft_token_ceiling",
  ])
    assert.ok(Number.isSafeInteger(registration.limits[key]) && registration.limits[key] > 0);
  assert.ok(
    Number.isSafeInteger(registration.limits.retry_limit) && registration.limits.retry_limit >= 0,
  );
  assert.ok(
    registration.limits.quota_cutoff_percent > 0 && registration.limits.quota_cutoff_percent < 100,
  );
  assert.ok(registration.limits.turn_timeout_ms <= registration.limits.max_duration_ms);
  assert.equal(
    new Set(registration.assignments.map((a) => a.id)).size,
    registration.assignments.length,
  );
  for (const [order, assignment] of registration.assignments.entries())
    assert.equal(assignment.order, order);
  assert.deepEqual(
    Object.keys(registration.tasks_per_stratum).toSorted(),
    [...codingStrata].toSorted(),
  );
  const tasks = Object.values(Object.groupBy(registration.assignments, (a) => a.task_id));
  assert.equal(tasks.length, registration.independent_tasks);
  assert.ok(Number.isSafeInteger(registration.repetitions) && registration.repetitions > 0);
  for (const task of tasks) {
    assert.equal(new Set(task.map((a) => a.stratum)).size, 1);
    assert.equal(task.length, registration.repetitions * 3);
    const pairs = Object.values(Object.groupBy(task, (a) => a.pair_id));
    assert.equal(pairs.length, registration.repetitions);
    assert.deepEqual(
      pairs.map((p) => p[0].repetition).toSorted((a, b) => a - b),
      Array.from({ length: registration.repetitions }, (_, i) => i),
    );
  }
  for (const stratum of codingStrata) {
    assert.ok(
      Number.isSafeInteger(registration.tasks_per_stratum[stratum]) &&
        registration.tasks_per_stratum[stratum] >= (phase === "confirmation" ? 2 : 1),
    );
    assert.equal(
      tasks.filter((t) => t[0].stratum === stratum).length,
      registration.tasks_per_stratum[stratum],
    );
  }
  for (const pair of Object.values(Object.groupBy(registration.assignments, (a) => a.pair_id))) {
    assert.deepEqual(pair.map((a) => a.arm).toSorted(), [...subscriptionArms].toSorted());
    for (const a of pair)
      for (const field of [
        "task_id",
        "stratum",
        "repetition",
        "workflow",
        "cache",
        "session",
        "transport",
      ])
        assert.equal(a[field], pair[0][field]);
  }
  if (phase === "confirmation") {
    assert.ok(
      Number.isSafeInteger(registration.independent_tasks) && registration.independent_tasks >= 10,
    );
    assert.ok(Number.isSafeInteger(registration.repetitions) && registration.repetitions > 0);
    const margins = registration.analysis.margins;
    assert.ok(
      margins &&
        margins.token_ratio > 0 &&
        margins.token_ratio < 1 &&
        Number.isFinite(margins.quality_difference) &&
        margins.quality_difference <= 0 &&
        Number.isFinite(margins.time_ratio) &&
        margins.time_ratio >= 1,
    );
    assert.equal(
      new Set(registration.assignments.map((a) => a.task_id)).size,
      registration.independent_tasks,
    );
    assert.equal(
      registration.assignments.length,
      registration.independent_tasks * registration.repetitions * 3,
    );
    assert.match(registration.power_review_digest ?? "", /^sha256:[a-f0-9]{64}$/u);
    assert.equal(registration.include_pilot_data, false);
    assert.ok(
      registration.assignments.every((a) => !pilotTaskIds.includes(a.task_id)),
      "Pilot data cannot enter confirmation",
    );
  } else assert.equal(registration.assignments.length, 75);
  // This validates frozen data only. It grants no native or provider authority.
  return registration;
}
