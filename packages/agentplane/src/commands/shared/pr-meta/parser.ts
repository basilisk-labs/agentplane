import { validateTaskPrMeta } from "@agentplaneorg/core/schemas";

import {
  asNonEmptyString,
  asOptionalInteger,
  asPrBatchMeta,
  asVerifyStatus,
  buildPrBatchMeta,
  normalizeRelatedTaskIds,
} from "./helpers.js";
import type { PrMeta } from "./model.js";

export function parsePrMeta(raw: string, taskId: string): PrMeta {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`JSON Parse error: ${message}`);
  }
  const meta = validateTaskPrMeta(parsed);
  if (meta.task_id !== taskId) throw new Error("pr/meta.json task_id mismatch");
  return meta;
}

export function parsePrMetaForwardCompatible(raw: string, taskId: string): PrMeta {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`JSON Parse error: ${message}`);
  }
  try {
    const meta = validateTaskPrMeta(parsed);
    if (meta.task_id !== taskId) throw new Error("pr/meta.json task_id mismatch");
    return meta;
  } catch (err) {
    const compat = buildForwardCompatiblePrMeta(parsed as ForwardCompatiblePrMetaRecord, taskId);
    if (compat) return compat;
    throw err;
  }
}

type ForwardCompatiblePrMetaRecord = {
  schema_version?: unknown;
  task_id?: unknown;
  related_task_ids?: unknown;
  batch?: unknown;
  branch?: unknown;
  pr_number?: unknown;
  pr_url?: unknown;
  created_at?: unknown;
  updated_at?: unknown;
  status?: unknown;
  merge_strategy?: unknown;
  merged_at?: unknown;
  merge_commit?: unknown;
  last_verified_sha?: unknown;
  last_verified_at?: unknown;
  verify?: unknown;
  base?: unknown;
  head_sha?: unknown;
  artifact_state?: unknown;
  artifact_state_reason?: unknown;
  artifact_state_updated_at?: unknown;
};

function buildForwardCompatiblePrMeta(
  parsed: ForwardCompatiblePrMetaRecord,
  taskId: string,
): PrMeta | null {
  if (parsed.schema_version !== 1) return null;
  if (asNonEmptyString(parsed.task_id) !== taskId) return null;
  const branch = asNonEmptyString(parsed.branch);
  const createdAt = asNonEmptyString(parsed.created_at);
  const updatedAt = asNonEmptyString(parsed.updated_at);
  if (!branch || !createdAt || !updatedAt) return null;

  const statusCandidate = asNonEmptyString(parsed.status);
  const status =
    statusCandidate === "OPEN" || statusCandidate === "CLOSED" || statusCandidate === "MERGED"
      ? statusCandidate
      : undefined;

  const artifactStateCandidate = asNonEmptyString(parsed.artifact_state);
  const artifactState =
    artifactStateCandidate === "open" ||
    artifactStateCandidate === "merged" ||
    artifactStateCandidate === "handoff" ||
    artifactStateCandidate === "remote_staged" ||
    artifactStateCandidate === "remote_failed"
      ? artifactStateCandidate
      : undefined;

  return {
    schema_version: 1,
    task_id: taskId,
    related_task_ids: normalizeRelatedTaskIds(parsed.related_task_ids, taskId),
    batch:
      asPrBatchMeta(parsed.batch, taskId) ??
      buildPrBatchMeta({
        primaryTaskId: taskId,
        includedTaskIds: normalizeRelatedTaskIds(parsed.related_task_ids, taskId),
        previousBatch: undefined,
      }),
    branch,
    pr_number: asOptionalInteger(parsed.pr_number),
    pr_url: asNonEmptyString(parsed.pr_url),
    created_at: createdAt,
    updated_at: updatedAt,
    status,
    merge_strategy: asMergeStrategy(parsed.merge_strategy),
    merged_at: asNonEmptyString(parsed.merged_at),
    merge_commit: asNonEmptyString(parsed.merge_commit),
    last_verified_sha: asNonEmptyString(parsed.last_verified_sha),
    last_verified_at: asNonEmptyString(parsed.last_verified_at),
    verify: asVerifyStatus(parsed.verify) ?? { status: "skipped" },
    base: asNonEmptyString(parsed.base),
    head_sha: asNonEmptyString(parsed.head_sha),
    artifact_state: artifactState,
    artifact_state_reason: asNonEmptyString(parsed.artifact_state_reason),
    artifact_state_updated_at: asNonEmptyString(parsed.artifact_state_updated_at),
  };
}

function asMergeStrategy(value: unknown): "squash" | "merge" | "rebase" | undefined {
  const strategy = asNonEmptyString(value);
  return strategy === "squash" || strategy === "merge" || strategy === "rebase"
    ? strategy
    : undefined;
}
