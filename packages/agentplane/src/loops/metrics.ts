import type { LoopMetricAggregate, LoopMetricDefinition, LoopMetricScore } from "./model.js";

export type LoopMetricSignalValue = boolean | number | null | undefined;

export type LoopMetricSignals = Record<string, LoopMetricSignalValue>;

function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function scoreFromSignal(value: LoopMetricSignalValue): number | null {
  if (value === undefined || value === null) return null;
  if (typeof value === "boolean") return value ? 1 : 0;
  return clampScore(value);
}

export function aggregateLoopMetricScores(
  metrics: readonly LoopMetricDefinition[] | undefined,
  signals: LoopMetricSignals = {},
): LoopMetricAggregate {
  const scores: LoopMetricScore[] = [];
  const failedThresholds: string[] = [];
  const missingRequired: string[] = [];
  let total = 0;
  let max = 0;

  for (const metric of metrics ?? []) {
    const weight = metric.weight ?? 1;
    const score = scoreFromSignal(signals[metric.id]);
    const missing = score === null;
    const passed = missing
      ? null
      : metric.threshold === undefined
        ? true
        : score >= metric.threshold;
    if (!missing) total += score * weight;
    max += weight;
    if (passed === false) failedThresholds.push(metric.id);
    if (missing && metric.required === true) missingRequired.push(metric.id);
    scores.push({
      id: metric.id,
      source: metric.source,
      score,
      weight,
      ...(metric.threshold === undefined ? {} : { threshold: metric.threshold }),
      passed,
      missing,
      ...(missing ? { reason: "missing_signal" } : {}),
    });
  }

  return {
    total: Number(total.toFixed(6)),
    max: Number(max.toFixed(6)),
    normalized: max > 0 ? Number((total / max).toFixed(6)) : 0,
    failedThresholds,
    missingRequired,
    scores,
  };
}
