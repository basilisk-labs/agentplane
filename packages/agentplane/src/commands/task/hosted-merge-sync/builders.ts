import { normalizeTaskDocVersion, type TaskPrMeta } from "@agentplaneorg/core";

import type { TaskData } from "../../../backends/task-backend.js";
import { appendTaskEvent } from "../shared.js";
import type { HostedMergedPr, LocalBranchPrSyncCandidate, LocalMergedPrMeta } from "./model.js";

export function buildSyncedPrMeta(opts: {
  meta: TaskPrMeta;
  mergedPr: HostedMergedPr;
  branch: string;
}): TaskPrMeta {
  const at = opts.mergedPr.mergedAt ?? new Date().toISOString();
  return {
    ...opts.meta,
    branch: opts.branch,
    status: "MERGED",
    base: opts.mergedPr.baseRefName ?? opts.meta.base,
    merge_strategy: opts.meta.merge_strategy,
    merged_at: opts.meta.merged_at ?? at,
    merge_commit: opts.mergedPr.mergeCommit?.oid ?? opts.meta.merge_commit,
    head_sha: opts.mergedPr.headRefOid ?? opts.meta.head_sha,
    updated_at: at,
  };
}

export function buildSyncedTask(opts: { task: TaskData; mergedPr: HostedMergedPr }): TaskData {
  const at = opts.mergedPr.mergedAt ?? new Date().toISOString();
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  const note =
    `Hosted PR #${opts.mergedPr.number} merged on GitHub main; ` +
    "task projection reconciled from hosted PR artifacts.";
  const mergeHash = opts.mergedPr.mergeCommit?.oid ?? "";
  const mergeMessage = opts.mergedPr.title?.trim();
  return {
    ...opts.task,
    status: "DONE",
    result_summary: opts.task.result_summary ?? `Merged via PR #${opts.mergedPr.number}.`,
    commit: opts.task.commit?.hash?.trim()
      ? opts.task.commit
      : mergeHash
        ? {
            hash: mergeHash,
            message:
              (mergeMessage && mergeMessage.length > 0 ? mergeMessage : null) ??
              `Hosted PR #${opts.mergedPr.number} merged on GitHub main`,
          }
        : null,
    events: appendTaskEvent(opts.task, {
      type: "status",
      at,
      author: "INTEGRATOR",
      from: currentStatus,
      to: "DONE",
      note,
    }),
    doc_version: normalizeTaskDocVersion(opts.task.doc_version),
    doc_updated_at: at,
    doc_updated_by: "INTEGRATOR",
  };
}

export function needsHostedMergeSyncFromLocalMeta(opts: {
  task: TaskData;
  meta: LocalMergedPrMeta;
}): boolean {
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  if (currentStatus !== "DONE") return true;
  if ((opts.task.commit?.hash ?? "") !== opts.meta.mergeCommit) return true;
  return false;
}

export function buildLocallyMergedSyncedTask(opts: {
  task: TaskData;
  meta: LocalMergedPrMeta;
}): TaskData {
  const at = opts.meta.mergedAt ?? new Date().toISOString();
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  const note =
    "Local PR metadata already marks the task branch as MERGED; " +
    "task projection reconciled without an additional GitHub lookup.";
  return {
    ...opts.task,
    status: "DONE",
    result_summary: opts.task.result_summary ?? "Merged and reconciled from local PR metadata.",
    commit: opts.task.commit?.hash?.trim()
      ? opts.task.commit
      : {
          hash: opts.meta.mergeCommit,
          message: "Merged branch_pr task reconciled from local PR metadata",
        },
    events: appendTaskEvent(opts.task, {
      type: "status",
      at,
      author: "INTEGRATOR",
      from: currentStatus,
      to: "DONE",
      note,
    }),
    doc_version: normalizeTaskDocVersion(opts.task.doc_version),
    doc_updated_at: at,
    doc_updated_by: "INTEGRATOR",
  };
}

export function buildLocallySyncedTask(opts: {
  task: TaskData;
  candidate: LocalBranchPrSyncCandidate;
}): TaskData {
  const at = new Date().toISOString();
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  const note =
    `Local branch_pr reconciliation detected task commit ${opts.candidate.commitHash.slice(0, 12)} ` +
    `on base ${opts.candidate.base}; canonical task state normalized after shipment.`;
  return {
    ...opts.task,
    status: "DONE",
    result_summary:
      opts.task.result_summary ??
      `Shipped on ${opts.candidate.base} and reconciled from local branch_pr state.`,
    commit: opts.task.commit?.hash?.trim()
      ? opts.task.commit
      : {
          hash: opts.candidate.commitHash,
          message: `Shipped on ${opts.candidate.base} before canonical task closure`,
        },
    events: appendTaskEvent(opts.task, {
      type: "status",
      at,
      author: "INTEGRATOR",
      from: currentStatus,
      to: "DONE",
      note,
    }),
    doc_version: normalizeTaskDocVersion(opts.task.doc_version),
    doc_updated_at: at,
    doc_updated_by: "INTEGRATOR",
  };
}

export function buildLocallySyncedPrMeta(opts: {
  meta: TaskPrMeta;
  candidate: LocalBranchPrSyncCandidate;
}): TaskPrMeta {
  const at = new Date().toISOString();
  return {
    ...opts.meta,
    branch: opts.candidate.branch,
    base: opts.candidate.base,
    status: "MERGED",
    merged_at: opts.meta.merged_at ?? at,
    merge_commit: opts.meta.merge_commit ?? opts.candidate.commitHash,
    head_sha: opts.meta.head_sha ?? opts.candidate.commitHash,
    updated_at: at,
  };
}

export function needsHostedMergeSync(opts: {
  task: TaskData;
  meta: TaskPrMeta;
  mergedPr: HostedMergedPr;
  branch: string;
}): boolean {
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  const expectedCommit = opts.mergedPr.mergeCommit?.oid ?? "";
  const expectedBase = opts.mergedPr.baseRefName ?? opts.meta.base ?? "";
  const expectedHeadSha = opts.mergedPr.headRefOid ?? opts.meta.head_sha ?? "";
  if (currentStatus !== "DONE") return true;
  if ((opts.task.commit?.hash ?? "") !== expectedCommit) return true;
  if (opts.meta.status !== "MERGED") return true;
  if ((opts.meta.merge_commit ?? "") !== expectedCommit) return true;
  if ((opts.meta.branch ?? "") !== opts.branch) return true;
  if ((opts.meta.base ?? "") !== expectedBase) return true;
  if (opts.meta.head_sha?.trim() !== expectedHeadSha) return true;
  return false;
}
