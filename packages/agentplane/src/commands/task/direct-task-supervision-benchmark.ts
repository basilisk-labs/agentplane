/**
 * Comparable CLI-orchestration surface for RF-10a. `tool_calls` means durable
 * CLI/provider operation calls, not provider-internal tool calls: those were
 * not recorded by the frozen 0.6.24 anchor and therefore cannot be compared.
 * `duplicate_executor_context_bytes` counts only context copied by the CLI
 * into a second role prompt. The evaluator receives frozen evidence paths,
 * never an executor bundle, so the golden path injects zero such bytes.
 */
export const DIRECT_TASK_SUPERVISION_GOLDEN_COST = Object.freeze({
  lifecycle_calls: 4,
  tool_calls: 5,
  duplicate_executor_context_bytes: 0,
});

export type DirectTaskSupervisionGoldenCost = typeof DIRECT_TASK_SUPERVISION_GOLDEN_COST;

export type DirectTaskSupervisionBaseline = {
  lifecycle_calls: number;
  tool_calls: number;
  duplicate_executor_context_bytes: number;
};

export type DirectTaskSupervisionQualitySafety = {
  verified_success: boolean;
  executor_lifecycle_event_delta: number;
  committed_scope_enforced: boolean;
};

export function compareDirectTaskSupervisionGoldenPath(opts: {
  baseline: DirectTaskSupervisionBaseline;
  candidate?: DirectTaskSupervisionGoldenCost;
  quality_safety: DirectTaskSupervisionQualitySafety;
}): {
  lifecycle_calls_reduced: boolean;
  tool_calls_reduced: boolean;
  duplicate_executor_context_reduced: boolean;
  verified_success_preserved: boolean;
  lifecycle_ownership_preserved: boolean;
  committed_scope_enforced: boolean;
  passed: boolean;
} {
  const candidate = opts.candidate ?? DIRECT_TASK_SUPERVISION_GOLDEN_COST;
  const lifecycle_calls_reduced = candidate.lifecycle_calls < opts.baseline.lifecycle_calls;
  const tool_calls_reduced = candidate.tool_calls < opts.baseline.tool_calls;
  const duplicate_executor_context_reduced =
    candidate.duplicate_executor_context_bytes < opts.baseline.duplicate_executor_context_bytes;
  const verified_success_preserved = opts.quality_safety.verified_success;
  const lifecycle_ownership_preserved = opts.quality_safety.executor_lifecycle_event_delta === 0;
  const committed_scope_enforced = opts.quality_safety.committed_scope_enforced;
  return {
    lifecycle_calls_reduced,
    tool_calls_reduced,
    duplicate_executor_context_reduced,
    verified_success_preserved,
    lifecycle_ownership_preserved,
    committed_scope_enforced,
    passed:
      lifecycle_calls_reduced &&
      tool_calls_reduced &&
      duplicate_executor_context_reduced &&
      verified_success_preserved &&
      lifecycle_ownership_preserved &&
      committed_scope_enforced,
  };
}
