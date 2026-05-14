import type { PrBatchMeta } from "./types.js";

export function nowOrExisting(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim() ?? "";
  return trimmed || fallback;
}

export function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function asOptionalInteger(value: unknown): number | undefined {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : undefined;
}

export function asVerifyStatus(
  value: unknown,
): { status: "pass" | "fail" | "skipped"; command?: string } | undefined {
  if (!value || typeof value !== "object") return undefined;
  const status = asNonEmptyString((value as { status?: unknown }).status);
  if (status !== "pass" && status !== "fail" && status !== "skipped") return undefined;
  const command = asNonEmptyString((value as { command?: unknown }).command);
  return command ? { status, command } : { status };
}

export function normalizeRelatedTaskIds(
  value: unknown,
  primaryTaskId: string,
): string[] | undefined {
  const ids = asStringArray(value);
  if (!ids) return undefined;
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of ids) {
    const id = raw.trim();
    if (!id || id === primaryTaskId || seen.has(id)) continue;
    seen.add(id);
    result.push(id);
  }
  return result.length > 0 ? result.toSorted() : undefined;
}

export function asPrBatchMeta(value: unknown, primaryTaskId: string): PrBatchMeta | undefined {
  if (!value || typeof value !== "object") return undefined;
  const record = value as {
    schema_version?: unknown;
    primary_task_id?: unknown;
    included_task_ids?: unknown;
    closure_policy?: unknown;
  };
  if (record.schema_version !== 1) return undefined;
  if (asNonEmptyString(record.primary_task_id) !== primaryTaskId) return undefined;
  const includedTaskIds = normalizeRelatedTaskIds(record.included_task_ids, primaryTaskId);
  if (!includedTaskIds) return undefined;
  const closurePolicy = asNonEmptyString(record.closure_policy);
  return {
    schema_version: 1,
    primary_task_id: primaryTaskId,
    included_task_ids: includedTaskIds,
    closure_policy: closurePolicy === "all_or_fail" ? closurePolicy : "all_or_fail",
  };
}

export function buildPrBatchMeta(opts: {
  primaryTaskId: string;
  includedTaskIds: string[] | undefined;
  previousBatch: unknown;
}): PrBatchMeta | undefined {
  const includedTaskIds = normalizeRelatedTaskIds(opts.includedTaskIds, opts.primaryTaskId);
  if (!includedTaskIds) return undefined;
  const previous = asPrBatchMeta(opts.previousBatch, opts.primaryTaskId);
  return {
    schema_version: 1,
    primary_task_id: opts.primaryTaskId,
    included_task_ids: includedTaskIds,
    closure_policy: previous?.closure_policy ?? "all_or_fail",
  };
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const values = value.filter((entry): entry is string => typeof entry === "string");
  return values.length > 0 ? values : undefined;
}
