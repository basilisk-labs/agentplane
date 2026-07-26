import type { ConflictRouteEvidence } from "./conflict-rework-route-eligibility.js";
import type { LegacyProtectedConflictAdoptionEvidence } from "./integrate/queue-state.js";

export type LegacyProtectedConflictRouteEvidence = Extract<
  ConflictRouteEvidence,
  {
    kind: "legacy_unadopted_protected_base_handoff" | "legacy_adopted_protected_base_handoff";
  }
>;

type MergeBaseGitOps = {
  mergeBase: (gitRoot: string, left: string, right: string) => Promise<string>;
};

export function isLegacyProtectedConflictRoute(
  routeEvidence: ConflictRouteEvidence,
): routeEvidence is LegacyProtectedConflictRouteEvidence {
  return (
    routeEvidence.kind === "legacy_unadopted_protected_base_handoff" ||
    routeEvidence.kind === "legacy_adopted_protected_base_handoff"
  );
}

export async function localAncestry(opts: {
  gitRoot: string;
  gitOps: MergeBaseGitOps;
  ancestor: string;
  descendant: string;
}): Promise<{ ok: true; isAncestor: boolean } | { ok: false; reason: string }> {
  try {
    const mergeBase = await opts.gitOps.mergeBase(opts.gitRoot, opts.ancestor, opts.descendant);
    return { ok: true, isAncestor: mergeBase === opts.ancestor };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : String(err),
    };
  }
}

export function legacyProtectedConflictAdoptionEvidence(opts: {
  taskId: string;
  routeEvidence: LegacyProtectedConflictRouteEvidence;
  provider: {
    prNumber: number;
    branch: string;
    headSha: string;
    base: string;
    baseSha: string;
  };
  currentBaseSha: string;
}): LegacyProtectedConflictAdoptionEvidence | null {
  const { handoff, queue } = opts.routeEvidence;
  if (
    handoff.created_at === null ||
    handoff.from_role !== "INTEGRATOR" ||
    handoff.provider_base_sha_state !== "absent"
  ) {
    return null;
  }
  return {
    schema_version: 1,
    kind: "legacy_protected_conflict_adoption",
    task_id: opts.taskId,
    source_handoff: {
      created_at: handoff.created_at,
      from_role: "INTEGRATOR",
      route_kind: "protected_base_integrate",
      route_status: "awaiting_github_merge",
      provider_base_sha_state: "absent",
      branch: handoff.branch,
      base: handoff.base,
      head_sha: handoff.head_sha,
      pr_branch: handoff.pr_branch,
      pr_number: handoff.pr_number,
    },
    provider: {
      pr_number: opts.provider.prNumber,
      branch: opts.provider.branch,
      head_sha: opts.provider.headSha,
      base: opts.provider.base,
      base_sha: opts.provider.baseSha,
    },
    queue: {
      branch: queue.branch,
      base: queue.base,
      head_sha: queue.head_sha,
      base_sha: queue.base_sha,
      pr_number: queue.pr_number,
      updated_at: queue.updated_at,
    },
    topology: {
      provider_base_sha: opts.provider.baseSha,
      queue_base_sha: queue.base_sha,
      observed_current_base_sha: opts.currentBaseSha,
      provider_to_queue: "ancestor_or_equal",
      queue_to_current: "ancestor_or_equal",
      provider_to_current: "strict_ancestor",
    },
  };
}
