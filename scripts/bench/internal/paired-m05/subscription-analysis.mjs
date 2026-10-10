import assert from "node:assert/strict";
export const subscriptionArms = ["no_recipe", "instantiate", "specialize"];
export function sumTokens(values) {
  const total = values.reduce((a, b) => a + b, 0);
  assert.ok(Number.isSafeInteger(total) && total >= 0, "Accounting overflow");
  return total;
}
export function tokenTotals(rows) {
  const successes = rows.filter((r) => r.success).length;
  const complete = rows.length > 0 && rows.every((r) => r.complete);
  const total = complete ? sumTokens(rows.map((r) => r.total)) : null;
  const steady =
    rows.length > 0 && rows.every((r) => r.steady_complete ?? r.complete)
      ? sumTokens(rows.map((r) => r.steady))
      : null;
  const time =
    rows.length > 0 && rows.every((r) => r.active_ms !== null && r.terminal)
      ? sumTokens(rows.map((r) => r.active_ms))
      : null;
  return {
    assigned: rows.length,
    verified_successes: successes,
    success_rate: rows.length > 0 ? successes / rows.length : null,
    usage_complete: complete,
    known_token_lower_bound: sumTokens(rows.map((r) => r.known)),
    setup_inclusive_tokens: total,
    steady_tokens: steady,
    tokens_per_success: successes && total !== null ? total / successes : null,
    steady_tokens_per_success: successes && steady !== null ? steady / successes : null,
    active_ms_per_success: successes && time !== null ? time / successes : null,
    unknown_assignments: rows.filter((r) => !r.complete).map((r) => r.id),
  };
}
const ratio = (candidate, baseline) =>
  candidate !== null && baseline > 0 ? candidate / baseline : null;
const withSetup = (total, value) =>
  total.usage_complete && total.verified_successes > 0 && value !== null
    ? sumTokens([total.setup_inclusive_tokens, value]) / total.verified_successes
    : null;
function contrasts(rows, arm, setup) {
  const b = tokenTotals(rows.filter((r) => r.arm === "no_recipe"));
  const c = tokenTotals(rows.filter((r) => r.arm === arm));
  return {
    token_ratio: ratio(
      withSetup(c, Object.hasOwn(setup, arm) ? setup[arm] : 0),
      withSetup(b, Object.hasOwn(setup, "no_recipe") ? setup.no_recipe : 0),
    ),
    quality_difference:
      c.success_rate !== null && b.success_rate !== null ? c.success_rate - b.success_rate : null,
    time_ratio: ratio(c.active_ms_per_success, b.active_ms_per_success),
  };
}
// Resample task clusters within each registered stratum. Carry every repetition
// and arm together. Never remove a zero-success or otherwise nonfinite sample.
export function subscriptionInference(rows, analysis, setup = {}) {
  assert.ok(
    Number.isSafeInteger(analysis.seed) && analysis.seed >= 0 && analysis.seed <= 0xff_ff_ff_ff,
  );
  assert.ok(
    Number.isSafeInteger(analysis.resamples) &&
      analysis.resamples >= 1000 &&
      analysis.resamples <= 100_000,
  );
  assert.ok(Number.isFinite(analysis.alpha) && analysis.alpha > 0 && analysis.alpha <= 0.05);
  const strata = Object.values(Object.groupBy(rows, (r) => r.stratum));
  const clusters = strata.map((s) => Object.values(Object.groupBy(s, (r) => r.task_id)));
  const base = {
    method: "stratified_matched_task_cluster_percentile",
    quality_method: "weighted_bounded_task_cluster_hoeffding",
    quality_assumption:
      "Independent registered task clusters with fixed allocation weights; not universal quality equivalence.",
    family_size: 6,
    alpha: analysis.alpha,
    per_bound_alpha: analysis.alpha / 6,
    seed: analysis.seed,
    resamples: analysis.resamples,
    clusters_per_stratum: clusters.map((g) => g.length),
  };
  const clusterWeights = clusters
    .flat()
    .map(
      (group) =>
        group.filter((r) => r.arm === "no_recipe").length /
        rows.filter((r) => r.arm === "no_recipe").length,
    );
  const qualityRadius = Math.sqrt(
    2 *
      Math.log(1 / base.per_bound_alpha) *
      clusterWeights.reduce((sum, weight) => sum + weight ** 2, 0),
  );
  const estimates = Object.fromEntries(subscriptionArms.slice(1).map((a) => [a, []]));
  let seed = analysis.seed;
  const enough =
    clusters.length > 0 &&
    clusters.every((g) => g.length >= 2) &&
    rows.every((r) => r.complete && r.terminal && r.active_ms !== null);
  if (enough)
    for (let i = 0; i < analysis.resamples; i++) {
      const sample = clusters.flatMap((group) =>
        group.flatMap(() => {
          seed = (Math.imul(seed, 1_664_525) + 1_013_904_223) >>> 0;
          return group[Math.floor((seed / 0x1_00_00_00_00) * group.length)];
        }),
      );
      for (const arm of subscriptionArms.slice(1))
        estimates[arm].push(contrasts(sample, arm, setup));
    }
  return {
    ...base,
    comparisons: subscriptionArms.slice(1).map((arm) => {
      const point = contrasts(rows, arm, setup);
      const finite =
        enough &&
        estimates[arm].every((r) =>
          Object.values(r).every((v) => v !== null && Number.isFinite(v)),
        );
      const quantile = (field, probability) => {
        if (!finite) return null;
        const values = estimates[arm].map((e) => e[field]).toSorted((a, b) => a - b);
        return values[Math.max(0, Math.ceil(probability * values.length) - 1)];
      };
      return {
        arm,
        point,
        token_ratio_upper: quantile("token_ratio", 1 - base.per_bound_alpha),
        quality_difference_lower: finite
          ? Math.max(-1, point.quality_difference - qualityRadius)
          : null,
        time_ratio_upper: quantile("time_ratio", 1 - base.per_bound_alpha),
        reason: finite
          ? null
          : enough
            ? "nonfinite_resample_retained"
            : "insufficient_clusters_or_incomplete_evidence",
      };
    }),
  };
}
