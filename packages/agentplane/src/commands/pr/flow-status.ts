import path from "node:path";
import { gitRevParse } from "@agentplaneorg/core/git";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import {
  loadBackendTask,
  resolveTaskBranchFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { taskPreMergeClosureRecordedOnBase } from "../task/close-tail-state.js";
import { parsePrMeta, type PrMeta } from "../shared/pr-meta.js";
import { readTaskHandoffForTask } from "../shared/task-handoff-reader.js";
import {
  readIntegrationQueue,
  type IntegrationQueueEntry,
  type LegacyProtectedConflictAdoptionReceipt,
} from "../pr/integrate/queue-state.js";
import { checkGithubUnresolvedReviewThreads } from "./internal/github-review-threads.js";
import { resolveHostedChecksStatus, type HostedChecksSummary } from "./hosted-checks.js";
import {
  resolvePrHeadPublicationStatus,
  type PrHeadPublicationStatus,
} from "./head-publication.js";

import { readTaskPrArtifact, resolvePrPaths } from "./internal/pr-paths.js";
import {
  observeExistingChangeRequestByBranch,
  observeExistingChangeRequestByNumber,
} from "./internal/change-request-provider.js";
import type { ChangeRequestLookupResult } from "./internal/change-request-model.js";
import { matchesAdoptedPrObservation, type AdoptedPrIdentity } from "./adoption-identity.js";
import { hasExactAdoptedVerificationRecord } from "./adoption-verification.js";
import { createExistingPrAdoptionStore, resolveAdoptionControlRoot } from "./adoption-store.js";
import {
  readKernelRecord,
  TASK_KERNEL_EXTENSION,
} from "../../adapters/task-backend/kernel-record.js";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { loadCommandContext } from "../shared/task-backend.js";
import {
  resolveCloseTailStatus,
  type RemotePrStatus,
  type CloseTailStatus,
} from "./flow-status-close-tail.js";
import * as closeTailHelpers from "./flow-status-close-tail.js";

export { matchesMergedPreMergeClosure } from "./flow-status-close-tail.js";

export type PrFlowStatusReport = {
  adoption?: AdoptedPrIdentity | null;
  adoptedVerificationCurrent?: boolean;
  adoptedControllerTransferred?: boolean;
  task: {
    id: string;
    status: string;
    verification: string | null;
    canonicalProviderReady?: boolean;
  };
  branch: {
    name: string | null;
    headSha: string | null;
    metaHeadSha: string | null;
  };
  pr: RemotePrStatus;
  providerObservation?: ChangeRequestLookupResult;
  publication?: PrHeadPublicationStatus;
  closeTail: CloseTailStatus;
  hostedChecks: HostedChecksSummary;
  reviewThreads: ReviewThreadsStatus;
  queue: QueueStatus;
  handoff: HandoffStatus;
  nextAction: string;
};

type ReviewThreadsStatus =
  { checked: true; unresolved: number } | { checked: false; reason: string };

function canonicalProviderReady(
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"],
): boolean {
  const record = task.extensions?.task_kernel;
  if (!isRecord(record) || !isRecord(record.aggregate)) return false;
  const aggregate = record.aggregate;
  if (
    aggregate.state !== "FINAL_VALIDATION" ||
    !isRecord(aggregate.final_validation) ||
    aggregate.final_validation.status !== "PASSED" ||
    !isRecord(aggregate.work_items)
  ) {
    return false;
  }
  return Object.values(aggregate.work_items).every(
    (item) => isRecord(item) && item.state === "COMPLETED",
  );
}

type QueueStatus =
  | { present: false }
  | {
      present: true;
      status: IntegrationQueueEntry["status"];
      reason: string | null;
      updatedAt: string | null;
      branch?: string | null;
      base?: string | null;
      headSha?: string | null;
      baseSha?: string | null;
      prNumber?: number | null;
      leaseExpiresAt?: string | null;
      legacyProtectedConflictAdoption?: LegacyProtectedConflictAdoptionReceipt | null;
      supersededByTaskId?: string | null;
    };

type HandoffStatus =
  | { present: false }
  | {
      present: true;
      reason: string;
      createdAt?: string | null;
      fromRole?: string | null;
      routeKind: "protected_base_integrate" | null;
      routeStatus: string | null;
      branch?: string | null;
      baseBranch?: string | null;
      headSha?: string | null;
      prBranch?: string | null;
      routePrNumber?: number | null;
      routeProviderBaseSha?: string | null;
      routeProviderBaseShaState?: "present" | "absent" | "invalid";
      nextActions: string[];
    };

function trimmed(value: string | null | undefined): string | null {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
}

function parsePrMetaIfPresent(content: string | null, taskId: string): PrMeta | null {
  try {
    return content === null ? null : parsePrMeta(content, taskId);
  } catch {
    return null;
  }
}

async function resolveBranchHeadSha(
  gitRoot: string,
  branch: string | null,
): Promise<string | null> {
  if (!branch) return null;
  try {
    return await gitRevParse(gitRoot, [branch]);
  } catch {
    return null;
  }
}

function remoteStatusFromLocalEvidence(
  meta: PrMeta | null,
  queueEntry: IntegrationQueueEntry | null,
): RemotePrStatus {
  const prNumber = Number(meta?.pr_number ?? 0);
  const status = meta?.status;
  if (status === "OPEN" || status === "CLOSED" || status === "MERGED") {
    return {
      provider: meta?.provider?.kind ?? "github",
      state: status,
      source: "metadata",
      prNumber: Number.isInteger(prNumber) && prNumber > 0 ? prNumber : null,
      prUrl: meta?.pr_url ?? null,
      base: meta?.base ?? null,
      headSha: meta?.head_sha ?? null,
      mergeCommit: meta?.merge_commit ?? null,
    };
  }
  if (queueEntry?.status === "queued" && queueEntry.pr_number) {
    return {
      provider: meta?.provider?.kind ?? "github",
      state: "OPEN",
      source: "metadata",
      prNumber: queueEntry.pr_number,
      prUrl: queueEntry.pr_url,
      base: queueEntry.base,
      headSha: queueEntry.head_sha,
      mergeCommit: null,
    };
  }
  return { provider: meta?.provider?.kind ?? "github", state: "not_found", source: "metadata" };
}

async function resolveReviewThreadsStatus(opts: {
  gitRoot: string;
  prNumber: number | null;
}): Promise<ReviewThreadsStatus> {
  const result = await checkGithubUnresolvedReviewThreads(opts);
  if (!result.checked) return { checked: false, reason: result.reason };
  return { checked: true, unresolved: result.unresolved.length };
}

async function resolveHandoffStatus(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  baseBranch: string;
}): Promise<HandoffStatus> {
  const handoff = await readTaskHandoffForTask({ ...opts, workflowMode: "branch_pr" });
  if (!handoff) return { present: false };
  const providerBaseSha = trimmed(handoff.route?.provider_base_sha);
  const routeProviderBaseShaState =
    !handoff.route || !Object.hasOwn(handoff.route, "provider_base_sha")
      ? "absent"
      : providerBaseSha
        ? "present"
        : "invalid";
  return {
    present: true,
    reason: handoff.reason,
    createdAt: handoff.created_at ?? null,
    fromRole: handoff.from_role ?? null,
    routeKind: handoff.route?.kind ?? null,
    routeStatus: handoff.route?.status ?? null,
    branch: handoff.branch ?? null,
    baseBranch: handoff.base_branch ?? null,
    headSha: handoff.head_sha ?? null,
    prBranch: handoff.pr_branch ?? null,
    routePrNumber: handoff.route?.pr_number ?? null,
    routeProviderBaseSha: providerBaseSha,
    routeProviderBaseShaState,
    nextActions: handoff.next_actions ?? [],
  };
}

function remoteStatusFromObservation(
  observation: ChangeRequestLookupResult,
  meta: PrMeta | null,
  queueEntry: IntegrationQueueEntry | null,
): RemotePrStatus {
  if (observation.state === "unavailable") {
    return remoteStatusFromLocalEvidence(meta, queueEntry);
  }
  if (observation.state === "not_found") {
    return { provider: meta?.provider?.kind ?? "github", state: "not_found", source: "lookup" };
  }
  const observed = observation.pr;
  return {
    provider: observed.provider,
    state: observed.status,
    source: "lookup",
    prNumber: observed.prNumber,
    prUrl: observed.prUrl,
    base: observed.base,
    headSha: observed.headSha,
    mergeCommit: observed.mergeCommit,
  };
}

function normalizeBaseBranch(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  const branch = trimmed.startsWith("refs/heads/") ? trimmed.slice("refs/heads/".length) : trimmed;
  return branch.startsWith("origin/") ? branch.slice("origin/".length) : branch;
}

function deriveNextAction(report: PrFlowStatusReport): string {
  if (report.queue.present && report.queue.status === "superseded") {
    return `semantic conflict outcome is superseded by ${
      report.queue.supersededByTaskId ?? "a recorded successor"
    }; do not reopen or integrate the closed PR`;
  }
  if (!report.branch.name) return `agentplane pr open ${report.task.id} --author <ROLE>`;
  if (report.pr.state === "not_found")
    return `agentplane pr open ${report.task.id} --author <ROLE>`;
  if (report.pr.state === "OPEN") {
    const target = report.pr.prNumber ? String(report.pr.prNumber) : report.branch.name;
    return `wait hosted checks, then merge remote PR ${target} through the configured provider API`;
  }
  if (report.pr.state === "CLOSED") return "inspect or reopen the remote PR before integrating";
  if (report.task.status === "DONE") return "pull main and run merged branch/worktree cleanup";
  if (report.closeTail.state === "recorded_on_base" || report.closeTail.state === "merged") {
    return "pull main; task close evidence is already recorded upstream";
  }
  if (report.closeTail.state === "open") {
    return `wait hosted checks and merge close-tail PR #${report.closeTail.prNumber ?? "unknown"}`;
  }
  if (report.closeTail.state === "unavailable") {
    return `retry hosted close-tail lookup for ${report.closeTail.branch}`;
  }
  return `wait hosted close, or run agentplane task hosted-close-pr ${report.task.id}`;
}

export async function resolvePrFlowStatus(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  integrationQueueRoot?: string | null;
  taskId: string;
  workflowMode?: "direct" | "branch_pr";
}): Promise<PrFlowStatusReport> {
  const { resolved, config, prDir } = await resolvePrPaths({ ...opts, ctx: opts.ctx });
  const workflowMode = opts.workflowMode ?? config.workflow_mode;
  if (workflowMode !== "branch_pr") {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: `Invalid workflow_mode: ${workflowMode} (expected branch_pr)`,
    });
  }
  const { task } = await loadBackendTask({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    preferBranchSnapshot: true,
  });

  let taskMeta = await readTaskPrArtifact({
    ctx: opts.ctx,
    taskId: task.id,
    prDir,
    fileName: "meta.json",
    preferBranchSnapshot: true,
  });
  // Adoption metadata is control-plane evidence and is never published into
  // the pre-existing hosted branch. Prefer it only when that branch has no
  // task-owned metadata snapshot.
  if (taskMeta.content === null) {
    const local = await readTaskPrArtifact({
      ctx: opts.ctx,
      taskId: task.id,
      prDir,
      fileName: "meta.json",
      preferBranchSnapshot: false,
    });
    const localMeta = parsePrMetaIfPresent(local.content, task.id);
    if ((localMeta as (PrMeta & { adoption?: AdoptedPrIdentity }) | null)?.adoption) {
      taskMeta = local;
    }
  }
  const controlRoot = await resolveAdoptionControlRoot(resolved.gitRoot);
  const controlMeta = await createExistingPrAdoptionStore({
    gitRoot: controlRoot,
    workflowDir: config.paths.workflow_dir,
  }).readMetadata(task.id);
  const branchMeta = parsePrMetaIfPresent(taskMeta.content, task.id);
  if (
    controlMeta?.adoption &&
    taskMeta.content !== null &&
    (!branchMeta ||
      (branchMeta.pr_number && branchMeta.pr_number !== controlMeta.adoption.pr_number))
  ) {
    throw new Error("Adopted PR has conflicting or malformed task-branch metadata");
  }
  const meta = controlMeta?.adoption ? controlMeta : branchMeta;
  const adoption = (meta as (PrMeta & { adoption?: AdoptedPrIdentity }) | null)?.adoption ?? null;
  let adoptedControllerTransferred = false;
  if (adoption) {
    const controlCommand =
      path.resolve(controlRoot) === path.resolve(opts.ctx.resolvedProject.gitRoot)
        ? opts.ctx
        : await loadCommandContext({ cwd: controlRoot, rootOverride: null });
    const controlTask = await controlCommand.taskBackend.getTask(task.id);
    const sourceValue = task.extensions?.[TASK_KERNEL_EXTENSION];
    if (
      controlMeta?.status === "MERGED" &&
      controlTask?.status === "DONE" &&
      isRecord(sourceValue) &&
      typeof sourceValue.repository_identity === "string" &&
      /^sha256:[a-f0-9]{64}$/u.test(sourceValue.repository_identity) &&
      controlTask
    ) {
      const identity = sourceValue.repository_identity as k.Sha256Digest;
      const source = readKernelRecord(task, identity);
      const target = readKernelRecord(controlTask, identity);
      adoptedControllerTransferred =
        source.kind === "canonical" &&
        target.kind === "canonical" &&
        target.record.aggregate.state === "COMPLETED" &&
        source.record.aggregate.controller_transfer?.to_controller ===
          `checkout:${path.resolve(controlRoot)}` &&
        target.record.aggregate.controller_transfer?.to_controller ===
          `checkout:${path.resolve(controlRoot)}` &&
        source.record.events.length <= target.record.events.length &&
        source.record.events.every(
          (event, index) => k.kernelDigest(event) === k.kernelDigest(target.record.events[index]),
        );
    }
  }
  const queue = await readIntegrationQueue(opts.integrationQueueRoot ?? resolved.gitRoot);
  const queueEntry = queue.entries.find((candidate) => candidate.task_id === task.id) ?? null;
  const metaBranch = meta?.branch?.trim() ?? "";
  const inferredTaskBranch =
    metaBranch.length === 0 && !queueEntry
      ? (taskMeta.branch ??
        (await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId: task.id })))
      : null;
  const rawBranch =
    metaBranch.length > 0
      ? metaBranch
      : (queueEntry?.branch.trim() ?? inferredTaskBranch?.trim() ?? "");
  const branch = rawBranch.length > 0 ? rawBranch : null;
  const branchHeadSha = adoption
    ? (meta?.head_sha ?? adoption.head_sha)
    : await resolveBranchHeadSha(resolved.gitRoot, branch);
  const baseHint = normalizeBaseBranch(meta?.base) ?? normalizeBaseBranch(queueEntry?.base);
  const storedPrNumber = Number(meta?.pr_number ?? queueEntry?.pr_number ?? 0);
  const observedByNumber: ChangeRequestLookupResult | null =
    Number.isInteger(storedPrNumber) && storedPrNumber > 0
      ? await observeExistingChangeRequestByNumber({
          gitRoot: resolved.gitRoot,
          prNumber: storedPrNumber,
          branch: branch ?? "",
          baseBranch: baseHint,
          recorded: meta?.provider ?? null,
        })
      : null;
  const unverifiedObservation: ChangeRequestLookupResult =
    observedByNumber?.state === "found" || observedByNumber?.state === "unavailable" || !branch
      ? (observedByNumber ?? {
          state: "unavailable",
          reason: "task branch and recorded hosted change-request number are unavailable",
        })
      : await observeExistingChangeRequestByBranch({
          gitRoot: resolved.gitRoot,
          branch,
          baseBranch: baseHint,
          recorded: meta?.provider ?? null,
        });
  const providerObservation: ChangeRequestLookupResult =
    adoption &&
    unverifiedObservation.state === "found" &&
    !matchesAdoptedPrObservation(adoption, unverifiedObservation.pr)
      ? { state: "unavailable", reason: "Adopted PR provider identity or refs changed" }
      : unverifiedObservation;
  const pr = remoteStatusFromObservation(providerObservation, meta, queueEntry);
  const publication = await resolvePrHeadPublicationStatus({
    gitRoot: resolved.gitRoot,
    branch,
    localHeadSha: adoption ? null : branchHeadSha,
    providerObservation:
      providerObservation.state === "found"
        ? { state: "found", headSha: providerObservation.pr.headSha }
        : providerObservation,
  });
  const baseBranch =
    pr.state === "not_found"
      ? (normalizeBaseBranch(meta?.base) ?? "main")
      : (normalizeBaseBranch(pr.base) ?? normalizeBaseBranch(meta?.base) ?? "main");
  const preMergeClosureRecorded = await closeTailHelpers.matchesMergedPreMergeClosure({
    gitRoot: resolved.gitRoot,
    task,
    meta,
    pr,
    branch,
  });
  const preMergeClosureRecordedOnBase =
    pr.state === "MERGED" && branch && pr.prNumber !== null
      ? await taskPreMergeClosureRecordedOnBase({
          gitRoot: resolved.gitRoot,
          workflowDir: config.paths.workflow_dir,
          taskId: task.id,
          baseBranch,
          branch,
          prNumber: pr.prNumber,
        })
      : false;
  const closeTail = await resolveCloseTailStatus({
    gitRoot: resolved.gitRoot,
    workflowDir: config.paths.workflow_dir,
    taskId: task.id,
    taskClosePrefix: config.branch.task_close_prefix,
    baseBranch,
    remotePr: pr,
    preMergeClosureRecorded,
    preMergeClosureRecordedOnBase,
    meta,
  });
  const prNumber = pr.state === "not_found" ? null : pr.prNumber;
  const [hostedChecks, reviewThreads, handoff] = await Promise.all([
    adoption && providerObservation.state !== "found"
      ? Promise.resolve({
          checked: false as const,
          reason: "Adopted PR has no matching fresh provider identity readback",
        })
      : resolveHostedChecksStatus({
          gitRoot: resolved.gitRoot,
          prNumber,
          branch,
          expectedHeadSha: branchHeadSha,
          recordedProvider: meta?.provider ?? null,
        }),
    pr.provider === "gitlab"
      ? Promise.resolve({ checked: false as const, reason: "GitHub review threads do not apply" })
      : resolveReviewThreadsStatus({ gitRoot: resolved.gitRoot, prNumber }),
    resolveHandoffStatus({
      gitRoot: resolved.gitRoot,
      workflowDir: config.paths.workflow_dir,
      taskId: task.id,
      baseBranch,
    }),
  ]);
  const report: PrFlowStatusReport = {
    task: {
      id: task.id,
      status: task.status,
      verification: task.verification?.state ?? null,
      canonicalProviderReady: canonicalProviderReady(task),
    },
    branch: {
      name: branch,
      headSha: branchHeadSha,
      metaHeadSha: meta?.head_sha ?? null,
    },
    pr,
    adoption,
    adoptedControllerTransferred,
    adoptedVerificationCurrent:
      adoption && providerObservation.state === "found" && providerObservation.pr.headSha
        ? await hasExactAdoptedVerificationRecord({
            ctx: opts.ctx,
            task,
            headSha: providerObservation.pr.headSha,
          }).catch(() => false)
        : false,
    providerObservation,
    publication,
    closeTail,
    hostedChecks,
    reviewThreads,
    queue: queueEntry
      ? {
          present: true,
          status: queueEntry.status,
          reason: queueEntry.reason ?? null,
          updatedAt: queueEntry.updated_at ?? null,
          branch: queueEntry.branch,
          base: queueEntry.base,
          headSha: queueEntry.head_sha,
          baseSha: queueEntry.base_sha,
          prNumber: queueEntry.pr_number,
          leaseExpiresAt: queueEntry.lease_expires_at ?? null,
          legacyProtectedConflictAdoption: queueEntry.legacy_protected_conflict_adoption ?? null,
          supersededByTaskId: queueEntry.superseded_by_task_id ?? null,
        }
      : { present: false },
    handoff,
    nextAction: "",
  };
  report.nextAction = deriveNextAction(report);
  return report;
}
