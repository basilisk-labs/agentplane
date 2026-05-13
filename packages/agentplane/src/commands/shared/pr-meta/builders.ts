import {
  asNonEmptyString,
  buildPrBatchMeta,
  normalizeRelatedTaskIds,
  nowOrExisting,
} from "./helpers.js";
import { withPrArtifactLifecycleState } from "./lifecycle.js";
import type { ObservedGithubPrState, PrMeta } from "./types.js";

export function buildOpenedPrMeta(opts: {
  taskId: string;
  relatedTaskIds?: string[];
  branch: string;
  at: string;
  previousMeta: PrMeta | null;
  base?: string | null;
  headSha?: string | null;
}): PrMeta {
  const nextBase = opts.base ?? opts.previousMeta?.base;
  const nextHeadSha = opts.headSha ?? opts.previousMeta?.head_sha;
  const relatedTaskIds = normalizeRelatedTaskIds(
    opts.relatedTaskIds ??
      opts.previousMeta?.batch?.included_task_ids ??
      opts.previousMeta?.related_task_ids,
    opts.taskId,
  );
  const changed =
    opts.previousMeta === null ||
    (opts.previousMeta.branch ?? null) !== opts.branch ||
    (opts.previousMeta.base ?? null) !== (nextBase ?? null) ||
    (opts.previousMeta.head_sha ?? null) !== (nextHeadSha ?? null);
  return {
    schema_version: 1,
    task_id: opts.taskId,
    related_task_ids: relatedTaskIds,
    batch: buildPrBatchMeta({
      primaryTaskId: opts.taskId,
      includedTaskIds: relatedTaskIds,
      previousBatch: opts.previousMeta?.batch,
    }),
    branch: opts.branch,
    pr_number: opts.previousMeta?.pr_number,
    pr_url: opts.previousMeta?.pr_url,
    created_at: opts.previousMeta?.created_at ?? opts.at,
    updated_at: changed ? opts.at : (opts.previousMeta?.updated_at ?? opts.at),
    status: opts.previousMeta?.status,
    artifact_state: opts.previousMeta?.artifact_state,
    artifact_state_reason: opts.previousMeta?.artifact_state_reason,
    artifact_state_updated_at: opts.previousMeta?.artifact_state_updated_at,
    merge_strategy: opts.previousMeta?.merge_strategy,
    merged_at: opts.previousMeta?.merged_at,
    merge_commit: opts.previousMeta?.merge_commit,
    last_verified_sha: opts.previousMeta?.last_verified_sha ?? null,
    last_verified_at: opts.previousMeta?.last_verified_at ?? null,
    verify: opts.previousMeta?.verify ?? { status: "skipped" },
    base: nextBase,
    head_sha: nextHeadSha,
  };
}

export function buildUpdatedPrMeta(opts: {
  meta: PrMeta;
  relatedTaskIds?: string[];
  branch: string;
  at: string;
  base?: string | null;
  headSha?: string | null;
}): PrMeta {
  const nextBase = opts.base ?? opts.meta.base;
  const nextHeadSha = opts.headSha ?? opts.meta.head_sha;
  const relatedTaskIds = normalizeRelatedTaskIds(
    opts.relatedTaskIds ?? opts.meta.batch?.included_task_ids ?? opts.meta.related_task_ids,
    opts.meta.task_id,
  );
  const changed =
    (opts.meta.branch ?? null) !== opts.branch ||
    (opts.meta.base ?? null) !== (nextBase ?? null) ||
    (opts.meta.head_sha ?? null) !== (nextHeadSha ?? null);
  return {
    ...opts.meta,
    related_task_ids: relatedTaskIds,
    batch: buildPrBatchMeta({
      primaryTaskId: opts.meta.task_id,
      includedTaskIds: relatedTaskIds,
      previousBatch: opts.meta.batch,
    }),
    branch: opts.branch,
    base: nextBase,
    head_sha: nextHeadSha,
    updated_at: changed ? opts.at : opts.meta.updated_at,
    last_verified_sha: opts.meta.last_verified_sha ?? null,
    last_verified_at: opts.meta.last_verified_at ?? null,
  };
}

export function resolvePrArtifactHeadSha(opts: {
  previousHeadSha?: string | null;
  currentHeadSha?: string | null;
  preservePrevious: boolean;
}): string | undefined {
  const previousHeadSha = asNonEmptyString(opts.previousHeadSha);
  const currentHeadSha = asNonEmptyString(opts.currentHeadSha);
  if (opts.preservePrevious && previousHeadSha) return previousHeadSha;
  return currentHeadSha ?? previousHeadSha;
}

export function buildObservedGithubPrMeta(opts: {
  meta: PrMeta;
  observed: ObservedGithubPrState;
  at: string;
}): PrMeta {
  const nextStatus = opts.observed.status;
  const nextHeadSha = opts.meta.head_sha ?? opts.observed.headSha ?? undefined;
  const nextMeta: PrMeta = {
    ...opts.meta,
    pr_number: opts.observed.prNumber,
    pr_url: opts.observed.prUrl ?? opts.meta.pr_url,
    status: nextStatus,
    base: opts.observed.base ?? opts.meta.base,
    head_sha: nextHeadSha,
    updated_at: opts.meta.updated_at,
  };

  if (nextStatus === "MERGED") {
    nextMeta.merged_at = opts.observed.mergedAt ?? opts.meta.merged_at;
    nextMeta.merge_commit = opts.observed.mergeCommit ?? opts.meta.merge_commit;
  } else {
    delete nextMeta.merged_at;
    delete nextMeta.merge_commit;
    delete nextMeta.merge_strategy;
    if (nextMeta.artifact_state !== "handoff") {
      delete nextMeta.artifact_state;
      delete nextMeta.artifact_state_reason;
      delete nextMeta.artifact_state_updated_at;
    }
  }

  const changed =
    nextMeta.pr_number !== opts.meta.pr_number ||
    (nextMeta.pr_url ?? null) !== (opts.meta.pr_url ?? null) ||
    nextMeta.status !== opts.meta.status ||
    (nextMeta.base ?? null) !== (opts.meta.base ?? null) ||
    (nextMeta.head_sha ?? null) !== (opts.meta.head_sha ?? null) ||
    (nextMeta.merged_at ?? null) !== (opts.meta.merged_at ?? null) ||
    (nextMeta.merge_commit ?? null) !== (opts.meta.merge_commit ?? null) ||
    (nextMeta.artifact_state ?? null) !== (opts.meta.artifact_state ?? null) ||
    (nextMeta.artifact_state_reason ?? null) !== (opts.meta.artifact_state_reason ?? null) ||
    (nextMeta.artifact_state_updated_at ?? null) !== (opts.meta.artifact_state_updated_at ?? null);

  if (changed) {
    nextMeta.updated_at = opts.at;
  }

  if (nextStatus !== "MERGED") return nextMeta;
  return withPrArtifactLifecycleState(
    nextMeta,
    {
      kind: "merged",
      mergeCommit: nextMeta.merge_commit ?? null,
      mergedAt: nextMeta.merged_at ?? null,
    },
    opts.at,
  );
}

export function buildVerifiedPrMeta(opts: {
  meta: PrMeta;
  at: string;
  state: "pass" | "fail";
}): PrMeta {
  const verifiedSha = opts.meta.head_sha ?? null;
  return {
    ...opts.meta,
    updated_at: opts.meta.updated_at,
    last_verified_sha: verifiedSha,
    last_verified_at: opts.at,
    verify: opts.meta.verify ? { ...opts.meta.verify, status: opts.state } : { status: opts.state },
  };
}

export function buildIntegratedPrMeta(opts: {
  meta: PrMeta;
  branch: string;
  base: string;
  mergeStrategy: "squash" | "merge" | "rebase";
  mergeHash: string;
  branchHeadSha: string;
  at: string;
  verifyCommands: string[];
  shouldRunVerify: boolean;
  alreadyVerifiedSha: string | null;
}): PrMeta {
  const nextMeta: PrMeta = {
    ...opts.meta,
    branch: opts.branch,
    base: opts.base,
    merge_strategy: opts.mergeStrategy,
    status: "MERGED",
    merged_at: nowOrExisting(opts.meta.merged_at, opts.at),
    merge_commit: opts.mergeHash,
    head_sha: opts.branchHeadSha,
    updated_at: opts.at,
  };

  if (opts.verifyCommands.length > 0 && (opts.shouldRunVerify || opts.alreadyVerifiedSha)) {
    nextMeta.last_verified_sha = opts.branchHeadSha;
    nextMeta.last_verified_at = opts.at;
    nextMeta.verify = opts.meta.verify
      ? { ...opts.meta.verify, status: "pass" }
      : { status: "pass", command: opts.verifyCommands.join(" && ") };
  }

  return withPrArtifactLifecycleState(
    nextMeta,
    {
      kind: "merged",
      mergeCommit: nextMeta.merge_commit ?? null,
      mergedAt: nextMeta.merged_at ?? null,
    },
    opts.at,
  );
}

export function resolvePrBatchIncludedTaskIds(meta: PrMeta): string[] {
  return (
    normalizeRelatedTaskIds(meta.batch?.included_task_ids ?? meta.related_task_ids, meta.task_id) ??
    []
  );
}
