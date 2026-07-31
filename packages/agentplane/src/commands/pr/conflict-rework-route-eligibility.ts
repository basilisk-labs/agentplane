import type { LegacyProtectedConflictAdoptionReceipt } from "./integrate/queue-state.js";
import type { PrFlowStatusReport } from "./flow-status.js";

type ConflictRouteIdentity = {
  taskId: string;
  taskBranch: string;
  providerHead: string;
  base: string;
  providerBase: string;
  prNumber: number;
};

type ConflictRouteEvidenceQueue = {
  status: "queued" | "claimed" | "handoff" | "rework";
  updated_at: string;
  branch: string;
  base: string;
  head_sha: string;
  base_sha: string;
  pr_number: number;
};

type ConflictRouteEvidenceHandoff = {
  created_at: string | null;
  from_role: string | null;
  route_kind: "protected_base_integrate";
  route_status: "awaiting_github_merge";
  branch: string;
  base: string;
  head_sha: string;
  pr_branch: string;
  pr_number: number;
  provider_base_sha: string | null;
  provider_base_sha_state: "present" | "absent" | "invalid";
};

type LegacyUnadoptedConflictRouteEvidence = {
  kind: "legacy_unadopted_protected_base_handoff";
  queue: ConflictRouteEvidenceQueue;
  handoff: ConflictRouteEvidenceHandoff;
};

type LegacyAdoptedConflictRouteEvidence = {
  kind: "legacy_adopted_protected_base_handoff";
  queue: ConflictRouteEvidenceQueue;
  handoff: ConflictRouteEvidenceHandoff;
  adoption: LegacyProtectedConflictAdoptionReceipt;
};

type CurrentProtectedBaseReworkRouteEvidence = {
  kind: "current_protected_base_rework";
  queue: ConflictRouteEvidenceQueue;
  handoff: ConflictRouteEvidenceHandoff;
};

type CurrentVerifiedOpenPrReworkEvidence = {
  kind: "current_verified_open_pr_rework";
  queue: null;
  handoff: null;
};

export type ConflictRouteEvidence =
  | {
      kind: "current_queue";
      queue: ConflictRouteEvidenceQueue;
      handoff: null;
    }
  | {
      kind: "current_protected_base_handoff";
      queue: null;
      handoff: ConflictRouteEvidenceHandoff;
    }
  | CurrentProtectedBaseReworkRouteEvidence
  | CurrentVerifiedOpenPrReworkEvidence
  | LegacyAdoptedConflictRouteEvidence
  | LegacyUnadoptedConflictRouteEvidence;

export type ConflictRouteEligibility =
  | {
      state: "eligible";
      evidence: Exclude<ConflictRouteEvidence, LegacyUnadoptedConflictRouteEvidence>;
    }
  | {
      state: "adoption_required";
      evidence: LegacyUnadoptedConflictRouteEvidence;
      reason: string;
    }
  | { state: "ineligible"; reason: string };

function trimmed(value: string | null | undefined): string | null {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
}

function hasCurrentClaimLease(leaseExpiresAt: string | null | undefined, now: Date): boolean {
  const leaseExpiresAtMs = leaseExpiresAt ? Date.parse(leaseExpiresAt) : Number.NaN;
  const nowMs = now.getTime();
  return Number.isFinite(leaseExpiresAtMs) && Number.isFinite(nowMs) && leaseExpiresAtMs > nowMs;
}

function matchingQueue(
  report: PrFlowStatusReport,
  identity: ConflictRouteIdentity,
): Extract<PrFlowStatusReport["queue"], { present: true }> | null {
  if (!report.queue.present) return null;
  if (
    report.queue.branch !== identity.taskBranch ||
    report.queue.base !== identity.base ||
    report.queue.headSha !== identity.providerHead ||
    report.queue.prNumber !== identity.prNumber
  ) {
    return null;
  }
  return report.queue;
}

function queueEvidence(opts: {
  queue: Extract<PrFlowStatusReport["queue"], { present: true }>;
  status: ConflictRouteEvidenceQueue["status"];
}): ConflictRouteEvidenceQueue | null {
  const branch = trimmed(opts.queue.branch);
  const base = trimmed(opts.queue.base);
  const headSha = trimmed(opts.queue.headSha);
  const baseSha = trimmed(opts.queue.baseSha);
  const updatedAt = trimmed(opts.queue.updatedAt);
  const prNumber = opts.queue.prNumber;
  if (!branch || !base || !headSha || !baseSha || !updatedAt || !prNumber) return null;
  return {
    status: opts.status,
    updated_at: updatedAt,
    branch,
    base,
    head_sha: headSha,
    base_sha: baseSha,
    pr_number: prNumber,
  };
}

function matchingProtectedBaseHandoff(
  report: PrFlowStatusReport,
  identity: ConflictRouteIdentity,
): Extract<PrFlowStatusReport["handoff"], { present: true }> | null {
  if (!report.handoff.present) return null;
  if (
    report.handoff.routeKind !== "protected_base_integrate" ||
    report.handoff.routeStatus !== "awaiting_github_merge" ||
    report.handoff.branch !== identity.taskBranch ||
    report.handoff.prBranch !== identity.taskBranch ||
    report.handoff.baseBranch !== identity.base ||
    report.handoff.headSha !== identity.providerHead ||
    report.handoff.routePrNumber !== identity.prNumber
  ) {
    return null;
  }
  return report.handoff;
}

function handoffEvidence(
  handoff: Extract<PrFlowStatusReport["handoff"], { present: true }>,
): ConflictRouteEvidenceHandoff | null {
  const branch = trimmed(handoff.branch);
  const base = trimmed(handoff.baseBranch);
  const headSha = trimmed(handoff.headSha);
  const prBranch = trimmed(handoff.prBranch);
  const prNumber = handoff.routePrNumber;
  const providerBase = trimmed(handoff.routeProviderBaseSha);
  const providerBaseState =
    handoff.routeProviderBaseShaState ?? (providerBase ? "present" : "invalid");
  if (!branch || !base || !headSha || !prBranch || !prNumber) return null;
  return {
    created_at: trimmed(handoff.createdAt),
    from_role: trimmed(handoff.fromRole),
    route_kind: "protected_base_integrate",
    route_status: "awaiting_github_merge",
    branch,
    base,
    head_sha: headSha,
    pr_branch: prBranch,
    pr_number: prNumber,
    provider_base_sha: providerBase,
    provider_base_sha_state: providerBaseState,
  };
}

function receiptMatchesLegacyRoute(opts: {
  receipt: LegacyProtectedConflictAdoptionReceipt | null | undefined;
  queue: ConflictRouteEvidenceQueue;
  handoff: ConflictRouteEvidenceHandoff;
  identity: ConflictRouteIdentity;
}): opts is {
  receipt: LegacyProtectedConflictAdoptionReceipt;
  queue: ConflictRouteEvidenceQueue;
  handoff: ConflictRouteEvidenceHandoff;
  identity: ConflictRouteIdentity;
} {
  const receipt = opts.receipt;
  if (!receipt || opts.handoff.created_at === null || opts.handoff.from_role !== "INTEGRATOR") {
    return false;
  }
  return (
    receipt.task_id === opts.identity.taskId &&
    receipt.source_handoff.created_at === opts.handoff.created_at &&
    receipt.source_handoff.from_role === "INTEGRATOR" &&
    receipt.source_handoff.route_kind === opts.handoff.route_kind &&
    receipt.source_handoff.route_status === opts.handoff.route_status &&
    receipt.source_handoff.provider_base_sha_state === "absent" &&
    receipt.source_handoff.branch === opts.handoff.branch &&
    receipt.source_handoff.base === opts.handoff.base &&
    receipt.source_handoff.head_sha === opts.handoff.head_sha &&
    receipt.source_handoff.pr_branch === opts.handoff.pr_branch &&
    receipt.source_handoff.pr_number === opts.handoff.pr_number &&
    receipt.provider.pr_number === opts.identity.prNumber &&
    receipt.provider.branch === opts.identity.taskBranch &&
    receipt.provider.head_sha === opts.identity.providerHead &&
    receipt.provider.base === opts.identity.base &&
    receipt.provider.base_sha === opts.identity.providerBase &&
    receipt.queue.branch === opts.queue.branch &&
    receipt.queue.base === opts.queue.base &&
    receipt.queue.head_sha === opts.queue.head_sha &&
    receipt.queue.base_sha === opts.queue.base_sha &&
    receipt.queue.pr_number === opts.queue.pr_number &&
    receipt.queue.updated_at === opts.queue.updated_at &&
    receipt.topology.provider_base_sha === opts.identity.providerBase &&
    receipt.topology.queue_base_sha === opts.queue.base_sha
  );
}

export function resolveConflictRouteEligibility(opts: {
  report: PrFlowStatusReport;
  identity: ConflictRouteIdentity;
  now: Date;
}): ConflictRouteEligibility {
  const taskStatus = opts.report.task.status.trim().toUpperCase();
  if (opts.report.task.verification !== "ok") {
    return {
      state: "ineligible",
      reason: "semantic conflict rework requires a current passing verification record",
    };
  }
  if (taskStatus === "DOING") {
    if (!opts.report.queue.present && !opts.report.handoff.present) {
      return {
        state: "eligible",
        evidence: {
          kind: "current_verified_open_pr_rework",
          queue: null,
          handoff: null,
        },
      };
    }
    return {
      state: "ineligible",
      reason:
        "a verified DOING task may enter semantic conflict rework only from its current open PR before any integration queue or protected-base handoff exists",
    };
  }
  if (taskStatus !== "DONE") {
    return {
      state: "ineligible",
      reason: "semantic conflict rework requires a verified DOING or DONE task",
    };
  }

  const queue = matchingQueue(opts.report, opts.identity);
  if (
    queue &&
    (queue.status === "queued" || queue.status === "claimed" || queue.status === "handoff") &&
    !(queue.status === "claimed" && !hasCurrentClaimLease(queue.leaseExpiresAt, opts.now)) &&
    queue.baseSha === opts.identity.providerBase
  ) {
    const evidence = queueEvidence({ queue, status: queue.status });
    if (evidence) {
      return {
        state: "eligible",
        evidence: { kind: "current_queue", queue: evidence, handoff: null },
      };
    }
  }

  const handoff = matchingProtectedBaseHandoff(opts.report, opts.identity);
  const handoffEvidenceValue = handoff ? handoffEvidence(handoff) : null;
  if (
    queue?.status === "rework" &&
    handoffEvidenceValue?.provider_base_sha_state === "present" &&
    handoffEvidenceValue.provider_base_sha === opts.identity.providerBase &&
    handoffEvidenceValue.created_at !== null &&
    handoffEvidenceValue.from_role === "INTEGRATOR"
  ) {
    const evidence = queueEvidence({ queue, status: "rework" });
    if (evidence) {
      return {
        state: "eligible",
        evidence: {
          kind: "current_protected_base_rework",
          queue: evidence,
          handoff: handoffEvidenceValue,
        },
      };
    }
  }
  if (
    handoffEvidenceValue?.provider_base_sha_state === "present" &&
    handoffEvidenceValue.provider_base_sha === opts.identity.providerBase
  ) {
    return {
      state: "eligible",
      evidence: {
        kind: "current_protected_base_handoff",
        queue: null,
        handoff: handoffEvidenceValue,
      },
    };
  }

  if (
    queue?.status === "rework" &&
    handoffEvidenceValue?.provider_base_sha_state === "absent" &&
    handoffEvidenceValue.created_at !== null &&
    handoffEvidenceValue.from_role === "INTEGRATOR"
  ) {
    const evidence = queueEvidence({ queue, status: "rework" });
    if (evidence) {
      const receipt = queue.legacyProtectedConflictAdoption;
      if (
        receipt &&
        receiptMatchesLegacyRoute({
          receipt,
          queue: evidence,
          handoff: handoffEvidenceValue,
          identity: opts.identity,
        })
      ) {
        return {
          state: "eligible",
          evidence: {
            kind: "legacy_adopted_protected_base_handoff",
            queue: evidence,
            handoff: handoffEvidenceValue,
            adoption: receipt,
          },
        };
      }
      if (!receipt) {
        return {
          state: "adoption_required",
          evidence: {
            kind: "legacy_unadopted_protected_base_handoff",
            queue: evidence,
            handoff: handoffEvidenceValue,
          },
          reason:
            "legacy protected-base conflict context requires an explicit INTEGRATOR adoption receipt; queue audit reason is not admission evidence",
        };
      }
    }
  }

  return {
    state: "ineligible",
    reason:
      "semantic conflict rework requires a current queued, claimed, or protected-base handoff record that matches the provider PR branch, head, base, base SHA, and PR number; a legacy route additionally requires a matching structured INTEGRATOR adoption receipt tied to an absent provider base field",
  };
}
