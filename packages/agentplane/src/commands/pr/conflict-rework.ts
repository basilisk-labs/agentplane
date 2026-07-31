import { createHash } from "node:crypto";

import { gitDiffNames, gitMergeBase } from "@agentplaneorg/core/git";

import { gitRevParse } from "../shared/git-ops.js";
import type { TaskWorktreeCleanliness } from "../shared/task-worktree-cleanliness.js";
import {
  normalizeConflictReworkChecks,
  type ConflictReworkChecks,
} from "./conflict-rework-checks.js";
import {
  resolveConflictRouteEligibility,
  type ConflictRouteEvidence,
} from "./conflict-rework-route-eligibility.js";
import type { PrFlowStatusReport } from "./flow-status.js";
import { legacyProtectedConflictAdoptionToken } from "./integrate/queue-state.js";
import type { LegacyProtectedConflictAdoptionEvidence } from "./integrate/queue-state.js";
import {
  isLegacyProtectedConflictRoute,
  legacyProtectedConflictAdoptionEvidence,
  localAncestry,
} from "./conflict-rework-legacy.js";
import {
  resolveConflictReworkBaseContext,
  type ConflictReworkBaseContext,
} from "./conflict-rework-base-context.js";
import {
  hasCoherentGithubPrMergeability,
  isSettledGithubPrConflict,
} from "./internal/sync-github.js";
import {
  resolveGithubBasePullRequestProtection,
  type GithubBasePullRequestProtection,
} from "./integrate/internal/github-protection.js";

const MAX_CANDIDATE_CONFLICT_PATHS = 32;

type ConflictReworkInvalidReasonCode =
  | "provider_pr_not_conflicting"
  | "provider_pr_unavailable"
  | "provider_pr_missing"
  | "provider_pr_incomplete"
  | "provider_mergeability_unknown"
  | "provider_branch_identity_mismatch"
  | "provider_head_mismatch"
  | "provider_base_unavailable"
  | "provider_base_mismatch"
  | "provider_base_not_ancestor"
  | "legacy_queue_base_unavailable"
  | "legacy_queue_base_not_ancestor"
  | "provider_base_protection_mismatch"
  | "provider_base_unprotected"
  | "provider_base_protection_unavailable"
  | "conflict_rework_route_ineligible"
  | "merge_base_unavailable"
  | "candidate_conflict_paths_unavailable"
  | "task_worktree_missing"
  | "task_worktree_dirty"
  | "task_worktree_unavailable";

export type ConflictReworkPacket = {
  schema_version: 1;
  task_id: string;
  provider: {
    name: "github";
    pr_number: number;
    pr_url: string | null;
    state: "OPEN";
    branch: string;
    head_sha: string;
    base: string;
    base_sha: string;
    mergeability: {
      state: "conflicting";
      mergeable: boolean | null;
      provider_state: string | null;
    };
  };
  base_protection: {
    provider: "github";
    base: string;
    state: "protected_pull_request_merge";
  };
  local: {
    branch_head_sha: string;
    base_head_sha: string;
    merge_base_sha: string;
  };
  base_context: ConflictReworkBaseContext;
  route_evidence: ConflictRouteEvidence;
  task_worktree: {
    path: string;
    branch: string;
    state: "clean";
  };
  candidate_conflict_paths: {
    derivation: "paths_modified_on_both_sides_since_merge_base";
    paths: string[];
    total: number;
    truncated: boolean;
    base_changed_count: number;
    head_changed_count: number;
  };
  checks: ConflictReworkChecks;
  freshness: {
    algorithm: "sha256";
    token: string;
  };
  resolution_contract: {
    role: "CODER";
    revalidate_command: string;
    after_resolution: string;
  };
  safety: {
    preparation_mutations: [];
    cli_must_not: string[];
  };
};

export type ConflictReworkPreparation =
  | { state: "not_conflicting"; reason: string }
  | { state: "invalid"; reason_code: ConflictReworkInvalidReasonCode; reason: string }
  | {
      state: "adoption_required";
      reason: string;
      adoption: {
        evidence: LegacyProtectedConflictAdoptionEvidence;
        token: string;
      };
    }
  | {
      state: "publication_required";
      reason: string;
      provider_head_sha: string;
      local_head_sha: string;
    }
  | { state: "ready"; packet: ConflictReworkPacket };

function invalid(
  reason_code: ConflictReworkInvalidReasonCode,
  reason: string,
): ConflictReworkPreparation {
  return { state: "invalid", reason_code, reason };
}

function trimmed(value: string | null | undefined): string | null {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
}

export type ConflictReworkGitOps = {
  resolveRef: typeof gitRevParse;
  mergeBase: typeof gitMergeBase;
  diffNames: typeof gitDiffNames;
};

const DEFAULT_GIT_OPS: ConflictReworkGitOps = {
  resolveRef: gitRevParse,
  mergeBase: gitMergeBase,
  diffNames: gitDiffNames,
};

function tokenFor(value: unknown): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex")}`;
}

function providerConflict(report: PrFlowStatusReport): boolean {
  return (
    report.pr.state === "OPEN" &&
    report.providerObservation?.state === "found" &&
    report.providerObservation.pr.status === "OPEN" &&
    isSettledGithubPrConflict(report.providerObservation.pr.mergeability)
  );
}

export function hasProviderReportedMergeConflict(report: PrFlowStatusReport | null): boolean {
  return report !== null && providerConflict(report);
}

export function needsProviderConflictReworkPreparation(report: PrFlowStatusReport | null): boolean {
  if (
    report?.pr.state !== "OPEN" ||
    report.providerObservation?.state !== "found" ||
    report.providerObservation.pr.status !== "OPEN"
  ) {
    return false;
  }
  const mergeability = report.providerObservation.pr.mergeability;
  return !hasCoherentGithubPrMergeability(mergeability) || isSettledGithubPrConflict(mergeability);
}

async function resolveLocalRef(opts: {
  gitRoot: string;
  gitOps: ConflictReworkGitOps;
  ref: string;
  reasonCode: "provider_base_unavailable" | "merge_base_unavailable";
  label: string;
}): Promise<{ ok: true; value: string } | { ok: false; preparation: ConflictReworkPreparation }> {
  try {
    return { ok: true, value: await opts.gitOps.resolveRef(opts.gitRoot, [opts.ref]) };
  } catch (err) {
    return {
      ok: false,
      preparation: invalid(
        opts.reasonCode,
        `${opts.label} cannot be resolved locally: ${err instanceof Error ? err.message : String(err)}`,
      ),
    };
  }
}

export async function prepareConflictReworkPacket(opts: {
  gitRoot: string;
  taskId: string;
  report: PrFlowStatusReport;
  taskWorktree: TaskWorktreeCleanliness;
  gitOps?: ConflictReworkGitOps;
  baseProtection?: GithubBasePullRequestProtection;
  now?: Date;
}): Promise<ConflictReworkPreparation> {
  const gitOps = opts.gitOps ?? DEFAULT_GIT_OPS;
  if (opts.report.providerObservation?.state === "unavailable") {
    return invalid(
      "provider_pr_unavailable",
      `GitHub PR state is unavailable: ${opts.report.providerObservation.reason}`,
    );
  }
  if (
    opts.report.providerObservation?.state === "not_found" ||
    opts.report.pr.state === "not_found"
  ) {
    return invalid("provider_pr_missing", "GitHub PR is not available for conflict preparation.");
  }
  if (
    opts.report.pr.state === "OPEN" &&
    opts.report.providerObservation?.state === "found" &&
    opts.report.providerObservation.pr.status === "OPEN"
  ) {
    const mergeability = opts.report.providerObservation.pr.mergeability;
    if (!hasCoherentGithubPrMergeability(mergeability)) {
      return invalid(
        "provider_mergeability_unknown",
        `GitHub mergeability is not settled: state=${mergeability?.state ?? "missing"} provider_state=${mergeability?.providerState ?? "missing"}`,
      );
    }
  }
  if (!providerConflict(opts.report)) {
    return {
      state: "not_conflicting",
      reason: "provider does not currently report an OPEN PR with merge conflicts",
    };
  }

  const observation = opts.report.providerObservation;
  if (observation?.state !== "found") {
    return invalid("provider_pr_unavailable", "provider conflict observation is unavailable");
  }
  const observed = observation.pr;
  const taskBranch = trimmed(opts.report.branch.name);
  const localHead = trimmed(opts.report.branch.headSha);
  const providerHead = trimmed(observed.headSha);
  const providerHeadRef = trimmed(observed.headRef);
  const base = trimmed(opts.report.pr.base ?? observed.base);
  const providerBase = trimmed(observed.baseSha);
  const prNumber = opts.report.pr.prNumber ?? observed.prNumber;
  if (
    !taskBranch ||
    !localHead ||
    !providerHead ||
    !providerHeadRef ||
    !base ||
    !providerBase ||
    !prNumber
  ) {
    return invalid(
      "provider_pr_incomplete",
      "provider conflict observation is missing task branch, base/head identity, or PR number",
    );
  }
  if (providerHeadRef !== taskBranch) {
    return invalid(
      "provider_branch_identity_mismatch",
      `provider head branch differs from task branch: provider=${providerHeadRef} task=${taskBranch}`,
    );
  }
  const taskStatus = opts.report.task.status.trim().toUpperCase();
  if (opts.report.task.verification !== "ok") {
    return invalid(
      "conflict_rework_route_ineligible",
      "semantic conflict rework requires a current passing verification record",
    );
  }
  if (taskStatus !== "DOING" && taskStatus !== "DONE") {
    return invalid(
      "conflict_rework_route_ineligible",
      "semantic conflict rework requires a verified DOING or DONE task",
    );
  }
  const baseProtection =
    opts.baseProtection ??
    (await resolveGithubBasePullRequestProtection({ gitRoot: opts.gitRoot, baseBranch: base }));
  if (baseProtection.baseBranch !== base) {
    return invalid(
      "provider_base_protection_mismatch",
      `base protection was observed for ${baseProtection.baseBranch}, not provider base ${base}`,
    );
  }
  if (baseProtection.state === "unavailable") {
    return invalid(
      "provider_base_protection_unavailable",
      `GitHub base protection cannot be confirmed for ${base}: ${baseProtection.reason}`,
    );
  }
  if (baseProtection.state !== "protected") {
    return invalid(
      "provider_base_unprotected",
      `GitHub does not currently confirm ${base} requires the protected pull-request merge path`,
    );
  }
  if (opts.taskWorktree.state === "not_present") {
    return invalid(
      "task_worktree_missing",
      `dedicated task worktree is missing for ${taskBranch}; conflict context cannot grant semantic resolution authority`,
    );
  }
  if (opts.taskWorktree.state === "dirty") {
    return invalid(
      "task_worktree_dirty",
      `task worktree has uncommitted or foreign artifacts: ${opts.taskWorktree.changedPaths.slice(0, 3).join(", ")}${opts.taskWorktree.changedPaths.length > 3 ? ` +${opts.taskWorktree.changedPaths.length - 3} more` : ""}`,
    );
  }
  if (opts.taskWorktree.state === "unavailable") {
    return invalid(
      "task_worktree_unavailable",
      `task worktree cannot be inspected: ${opts.taskWorktree.reason}`,
    );
  }
  if (providerHead !== localHead) {
    const ancestry = await localAncestry({
      gitRoot: opts.gitRoot,
      gitOps,
      ancestor: providerHead,
      descendant: localHead,
    });
    if (!ancestry.ok) {
      return invalid(
        "provider_head_mismatch",
        `provider/local head ancestry cannot be resolved: provider=${providerHead} local=${localHead}: ${ancestry.reason}`,
      );
    }
    if (!ancestry.isAncestor) {
      return invalid(
        "provider_head_mismatch",
        `local task branch is not a fast-forward continuation of the provider head: provider=${providerHead} local=${localHead}`,
      );
    }
    return {
      state: "publication_required",
      reason:
        "the clean local task branch is a strict fast-forward continuation of the conflicting provider head and must be published before conflict context can be frozen",
      provider_head_sha: providerHead,
      local_head_sha: localHead,
    };
  }

  const routeEligibility = resolveConflictRouteEligibility({
    report: opts.report,
    identity: {
      taskId: opts.taskId,
      taskBranch,
      providerHead,
      base,
      providerBase,
      prNumber,
    },
    now: opts.now ?? new Date(),
  });
  if (routeEligibility.state === "ineligible") {
    return invalid("conflict_rework_route_ineligible", routeEligibility.reason);
  }

  const localBase = await resolveLocalRef({
    gitRoot: opts.gitRoot,
    gitOps,
    ref: base,
    reasonCode: "provider_base_unavailable",
    label: `base ${base}`,
  });
  if (!localBase.ok) return localBase.preparation;

  const routeEvidence = routeEligibility.evidence;
  const baseContextResolution = await resolveConflictReworkBaseContext({
    gitRoot: opts.gitRoot,
    gitOps,
    routeEvidence,
    base,
    providerBase,
    localBase: localBase.value,
  });
  if (!baseContextResolution.ok) {
    return invalid(baseContextResolution.reasonCode, baseContextResolution.reason);
  }
  const baseContext = baseContextResolution.context;

  if (isLegacyProtectedConflictRoute(routeEvidence)) {
    const evidence = legacyProtectedConflictAdoptionEvidence({
      taskId: opts.taskId,
      routeEvidence,
      provider: {
        prNumber,
        branch: taskBranch,
        headSha: providerHead,
        base,
        baseSha: providerBase,
      },
      currentBaseSha: localBase.value,
    });
    if (!evidence) {
      return invalid(
        "conflict_rework_route_ineligible",
        "legacy protected-base conflict context no longer has the exact INTEGRATOR handoff identity required for adoption",
      );
    }
    const evidenceToken = legacyProtectedConflictAdoptionToken(evidence);
    if (routeEligibility.state === "adoption_required") {
      return {
        state: "adoption_required",
        reason: routeEligibility.reason,
        adoption: { evidence, token: evidenceToken },
      };
    }
    if (
      routeEvidence.kind !== "legacy_adopted_protected_base_handoff" ||
      routeEvidence.adoption.evidence_token !== evidenceToken
    ) {
      return invalid(
        "conflict_rework_route_ineligible",
        "legacy protected-base adoption receipt is stale or does not match current provider, queue, handoff, and base topology",
      );
    }
  }

  let mergeBase: string;
  try {
    mergeBase = await gitOps.mergeBase(opts.gitRoot, localBase.value, providerHead);
  } catch (err) {
    return invalid(
      "merge_base_unavailable",
      `merge base cannot be resolved for current local base/head: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  let baseChanged: string[];
  let headChanged: string[];
  try {
    [baseChanged, headChanged] = await Promise.all([
      gitOps.diffNames(opts.gitRoot, mergeBase, localBase.value),
      gitOps.diffNames(opts.gitRoot, mergeBase, providerHead),
    ]);
  } catch (err) {
    return invalid(
      "candidate_conflict_paths_unavailable",
      `candidate conflict paths cannot be derived without mutation: ${err instanceof Error ? err.message : String(err)}`,
    );
  }
  const basePaths = [...new Set(baseChanged)].toSorted((left, right) => left.localeCompare(right));
  const headPaths = [...new Set(headChanged)].toSorted((left, right) => left.localeCompare(right));
  const basePathSet = new Set(basePaths);
  const candidatePaths = headPaths.filter((candidate) => basePathSet.has(candidate));
  const checks = normalizeConflictReworkChecks(opts.report);
  const snapshot = {
    schema_version: 1 as const,
    task_id: opts.taskId,
    provider: {
      name: "github" as const,
      pr_number: prNumber,
      pr_url: opts.report.pr.prUrl,
      state: "OPEN" as const,
      branch: taskBranch,
      head_sha: providerHead,
      base,
      base_sha: providerBase,
      mergeability: {
        state: "conflicting" as const,
        mergeable: observed.mergeability?.mergeable ?? null,
        provider_state: observed.mergeability?.providerState ?? null,
      },
    },
    base_protection: {
      provider: "github" as const,
      base,
      state: "protected_pull_request_merge" as const,
    },
    local: {
      branch_head_sha: localHead,
      base_head_sha: localBase.value,
      merge_base_sha: mergeBase,
    },
    base_context: baseContext,
    route_evidence: routeEvidence,
    task_worktree: {
      path: opts.taskWorktree.worktreePath,
      branch: taskBranch,
      state: "clean" as const,
    },
    candidate_conflict_paths: {
      derivation: "paths_modified_on_both_sides_since_merge_base" as const,
      paths: candidatePaths.slice(0, MAX_CANDIDATE_CONFLICT_PATHS),
      total: candidatePaths.length,
      truncated: candidatePaths.length > MAX_CANDIDATE_CONFLICT_PATHS,
      base_changed_count: basePaths.length,
      head_changed_count: headPaths.length,
    },
    checks,
  };
  const token = tokenFor(snapshot);
  return {
    state: "ready",
    packet: {
      ...snapshot,
      freshness: { algorithm: "sha256", token },
      resolution_contract: {
        role: "CODER",
        revalidate_command: `agentplane pr conflict-rework ${opts.taskId} --expect-freshness-token ${token}`,
        after_resolution:
          "after a CODER records a new resolution commit, refresh provider truth, rerun normal verification, then use the ordinary lease-safe PR publication and integration route",
      },
      safety: {
        preparation_mutations: [],
        cli_must_not: [
          "do not choose conflict hunks or semantic resolution",
          "do not auto-rebase, auto-merge, force-push, or rewrite the task branch",
          "do not publish, enqueue, clean up, or merge while this packet is stale",
        ],
      },
    },
  };
}
