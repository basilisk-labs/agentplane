import type { PrArtifactLifecycleState, PrArtifactStateKind, PrMeta } from "./model.js";

export function withPrArtifactLifecycleState(
  meta: PrMeta,
  state: PrArtifactLifecycleState,
  at: string,
): PrMeta {
  const kind = lifecycleKind(state);
  const reason = lifecycleReason(state);
  const previousReason = meta.artifact_state_reason ?? undefined;
  const stateUnchanged = meta.artifact_state === kind && previousReason === reason;
  return {
    ...meta,
    artifact_state: kind,
    artifact_state_reason: reason,
    artifact_state_updated_at: stateUnchanged ? (meta.artifact_state_updated_at ?? at) : at,
  };
}

export function derivePrArtifactLifecycleState(meta: PrMeta): PrArtifactLifecycleState {
  const reason =
    typeof meta.artifact_state_reason === "string" && meta.artifact_state_reason.trim().length > 0
      ? meta.artifact_state_reason
      : null;
  if (meta.artifact_state === "remote_staged") {
    return {
      kind: "remote_staged",
      reason: reason ?? "remote PR creation staged",
    };
  }
  if (meta.artifact_state === "remote_failed") {
    return {
      kind: "remote_failed",
      reason: reason ?? "remote PR creation failed",
    };
  }
  if (meta.artifact_state === "handoff") {
    return { kind: "handoff", reason: reason ?? "handoff required" };
  }
  if (meta.artifact_state === "merged" || meta.status === "MERGED") {
    return {
      kind: "merged",
      mergeCommit: meta.merge_commit ?? null,
      mergedAt: meta.merged_at ?? null,
    };
  }
  return { kind: "open", remoteStatus: meta.status ?? null };
}

function lifecycleKind(state: PrArtifactLifecycleState): PrArtifactStateKind {
  return state.kind;
}

function lifecycleReason(state: PrArtifactLifecycleState): string | undefined {
  return state.kind === "handoff" ||
    state.kind === "remote_staged" ||
    state.kind === "remote_failed"
    ? state.reason
    : undefined;
}
