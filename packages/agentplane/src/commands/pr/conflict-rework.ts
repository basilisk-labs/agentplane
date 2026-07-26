import { createHash } from "node:crypto";

import { gitDiffNames, gitMergeBase } from "@agentplaneorg/core/git";

import { gitRevParse } from "../shared/git-ops.js";
import type { TaskWorktreeCleanliness } from "../shared/task-worktree-cleanliness.js";
import type { PrFlowStatusReport } from "./flow-status.js";
import {
  hasCoherentGithubPrMergeability,
  isSettledGithubPrConflict,
} from "./internal/sync-github.js";
import {
  resolveGithubBasePullRequestProtection,
  type GithubBasePullRequestProtection,
} from "./integrate/internal/github-protection.js";

const MAX_CANDIDATE_CONFLICT_PATHS = 32;
const MAX_HOSTED_CHECK_ROWS = 64;
const MAX_MISSING_REQUIRED_CHECKS = 32;

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
  | "provider_base_protection_mismatch"
  | "provider_base_unprotected"
  | "provider_base_protection_unavailable"
  | "conflict_rework_route_ineligible"
  | "merge_base_unavailable"
  | "candidate_conflict_paths_unavailable"
  | "task_worktree_missing"
  | "task_worktree_dirty"
  | "task_worktree_unavailable";

type ConflictReworkChecks =
  | {
      checked: true;
      total: number;
      passing: number;
      pending: number;
      failing: number;
      missingRequired: {
        names: string[];
        total: number;
        truncated: boolean;
      };
      rows: {
        entries: { name: string; state: string }[];
        total: number;
        truncated: boolean;
      };
    }
  | { checked: false; reason: string };

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

function normalizeChecks(report: PrFlowStatusReport): ConflictReworkChecks {
  if (!report.hostedChecks.checked) {
    return { checked: false, reason: report.hostedChecks.reason };
  }
  const rows = report.hostedChecks.rows
    .map((row) => ({
      name: trimmed(row.name) ?? "<unnamed>",
      state: trimmed(row.state) ?? "UNKNOWN",
    }))
    .toSorted(
      (left, right) => left.name.localeCompare(right.name) || left.state.localeCompare(right.state),
    );
  const missingRequired = [
    ...new Set(report.hostedChecks.missingRequired.map((name) => trimmed(name) ?? "<unnamed>")),
  ].toSorted((left, right) => left.localeCompare(right));
  return {
    checked: true,
    total: report.hostedChecks.total,
    passing: report.hostedChecks.passing,
    pending: report.hostedChecks.pending,
    failing: report.hostedChecks.failing,
    missingRequired: {
      names: missingRequired.slice(0, MAX_MISSING_REQUIRED_CHECKS),
      total: missingRequired.length,
      truncated: missingRequired.length > MAX_MISSING_REQUIRED_CHECKS,
    },
    rows: {
      entries: rows.slice(0, MAX_HOSTED_CHECK_ROWS),
      total: rows.length,
      truncated: rows.length > MAX_HOSTED_CHECK_ROWS,
    },
  };
}

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

type ConflictRouteIdentity = {
  taskBranch: string;
  providerHead: string;
  base: string;
  providerBase: string;
  prNumber: number;
};

function hasCurrentClaimLease(leaseExpiresAt: string | null | undefined, now: Date): boolean {
  const leaseExpiresAtMs = leaseExpiresAt ? Date.parse(leaseExpiresAt) : Number.NaN;
  const nowMs = now.getTime();
  return Number.isFinite(leaseExpiresAtMs) && Number.isFinite(nowMs) && leaseExpiresAtMs > nowMs;
}

function hasEligibleQueueEntry(
  report: PrFlowStatusReport,
  identity: ConflictRouteIdentity,
  now: Date,
): boolean {
  if (!report.queue.present) return false;
  if (
    report.queue.status !== "queued" &&
    report.queue.status !== "claimed" &&
    report.queue.status !== "handoff"
  ) {
    return false;
  }
  if (
    report.queue.status === "claimed" &&
    !hasCurrentClaimLease(report.queue.leaseExpiresAt, now)
  ) {
    return false;
  }
  return (
    report.queue.branch === identity.taskBranch &&
    report.queue.base === identity.base &&
    report.queue.headSha === identity.providerHead &&
    report.queue.baseSha === identity.providerBase &&
    report.queue.prNumber === identity.prNumber
  );
}

function hasEligibleProtectedBaseHandoff(
  report: PrFlowStatusReport,
  identity: ConflictRouteIdentity,
): boolean {
  if (!report.handoff.present) return false;
  return (
    report.handoff.routeKind === "protected_base_integrate" &&
    report.handoff.routeStatus === "awaiting_github_merge" &&
    report.handoff.branch === identity.taskBranch &&
    report.handoff.prBranch === identity.taskBranch &&
    report.handoff.baseBranch === identity.base &&
    report.handoff.headSha === identity.providerHead &&
    report.handoff.routePrNumber === identity.prNumber &&
    report.handoff.routeProviderBaseSha === identity.providerBase
  );
}

function validateConflictRouteEligibility(
  report: PrFlowStatusReport,
  identity: ConflictRouteIdentity,
  now: Date,
): ConflictReworkPreparation | null {
  if (report.task.status.trim().toUpperCase() !== "DONE" || report.task.verification !== "ok") {
    return invalid(
      "conflict_rework_route_ineligible",
      "semantic conflict rework requires a DONE task with a current passing verification record",
    );
  }
  if (
    hasEligibleQueueEntry(report, identity, now) ||
    hasEligibleProtectedBaseHandoff(report, identity)
  ) {
    return null;
  }
  return invalid(
    "conflict_rework_route_ineligible",
    "semantic conflict rework requires a current queued, claimed, or protected-base handoff record that matches the provider PR branch, head, base, base SHA, and PR number",
  );
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
  if (providerHead !== localHead) {
    return invalid(
      "provider_head_mismatch",
      `provider head differs from local task branch: provider=${providerHead} local=${localHead}`,
    );
  }
  const routeEligibility = validateConflictRouteEligibility(
    opts.report,
    {
      taskBranch,
      providerHead,
      base,
      providerBase,
      prNumber,
    },
    opts.now ?? new Date(),
  );
  if (routeEligibility) return routeEligibility;
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

  const localBase = await resolveLocalRef({
    gitRoot: opts.gitRoot,
    gitOps,
    ref: base,
    reasonCode: "provider_base_unavailable",
    label: `base ${base}`,
  });
  if (!localBase.ok) return localBase.preparation;
  if (localBase.value !== providerBase) {
    return invalid(
      "provider_base_mismatch",
      `provider base differs from local ${base}: provider=${providerBase} local=${localBase.value}`,
    );
  }

  let mergeBase: string;
  try {
    mergeBase = await gitOps.mergeBase(opts.gitRoot, providerBase, providerHead);
  } catch (err) {
    return invalid(
      "merge_base_unavailable",
      `merge base cannot be resolved for provider base/head: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  let baseChanged: string[];
  let headChanged: string[];
  try {
    [baseChanged, headChanged] = await Promise.all([
      gitOps.diffNames(opts.gitRoot, mergeBase, providerBase),
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
  const checks = normalizeChecks(opts.report);
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
