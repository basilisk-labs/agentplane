/**
 * `tool_calls` counts durable CLI/provider operations. Provider-internal tool
 * calls were not recorded by the frozen 0.6.24 anchor and stay uncomparable.
 */
export type DirectTaskSupervisionGoldenCost = {
  lifecycle_calls: number;
  tool_calls: number;
  duplicate_executor_context_bytes: number | null;
};

export type DirectTaskSupervisionBaseline = {
  lifecycle_calls: number;
  tool_calls: number;
  duplicate_executor_context_bytes: number;
};

/**
 * Frozen direct-path cost control from the pre-v0.7 replay anchor. The
 * compatibility release and the efficiency anchor intentionally differ; see
 * docs/internal/v0.7-agent-efficiency-baseline.md for their provenance.
 */
export const DIRECT_TASK_SUPERVISION_PRE_V07_BASELINE: DirectTaskSupervisionBaseline = {
  lifecycle_calls: 7,
  tool_calls: 7,
  duplicate_executor_context_bytes: 20_562,
};

export const DIRECT_TASK_SUPERVISION_PRE_V07_BASELINE_PROVENANCE = {
  compatibility_release: "0.6.24",
  efficiency_anchor_commit: "1a702e160ba9f0efe7067f2a22fc008defc89ffb",
  source:
    "scripts/baselines/agent-efficiency-pre-v0.7-replay.json#diagnostics.scenarios[id=direct]",
} as const;

export type DirectTaskSupervisionQualitySafety = {
  verified_success: boolean;
  executor_lifecycle_event_delta: number | null;
  committed_scope_enforced: boolean;
};

export function compareDirectTaskSupervisionGoldenPath(opts: {
  baseline: DirectTaskSupervisionBaseline;
  candidate: DirectTaskSupervisionGoldenCost;
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
  const candidate = opts.candidate;
  const lifecycle_calls_reduced = candidate.lifecycle_calls < opts.baseline.lifecycle_calls;
  const tool_calls_reduced = candidate.tool_calls < opts.baseline.tool_calls;
  const duplicate_executor_context_reduced =
    candidate.duplicate_executor_context_bytes !== null &&
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
