import { mkdir, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import type { TaskPrMeta } from "@agentplaneorg/core/schemas";
import { validateTaskPrMeta } from "@agentplaneorg/core/schemas";

import { execFileAsync } from "@agentplaneorg/core/process";

export type PrMeta = TaskPrMeta;
export type PrBatchMeta = NonNullable<PrMeta["batch"]>;
export type ObservedGithubPrState = {
  prNumber: number;
  prUrl: string | null;
  status: "OPEN" | "CLOSED" | "MERGED";
  mergedAt?: string | null;
  mergeCommit?: string | null;
  base?: string | null;
  headSha?: string | null;
};
type PrArtifactStateKind = "open" | "merged" | "handoff" | "remote_staged" | "remote_failed";
type PrArtifactLifecycleState =
  | { kind: "open"; remoteStatus?: ObservedGithubPrState["status"] | null }
  | { kind: "merged"; mergeCommit?: string | null; mergedAt?: string | null }
  | { kind: "handoff"; reason: string }
  | { kind: "remote_staged"; reason: string }
  | { kind: "remote_failed"; reason: string };
export type PrArtifactTextState = {
  diffstatText: string | null;
  verifyLogText: string | null;
  reviewText: string | null;
};

export type PrArtifactState = PrArtifactTextState & {
  meta: PrMeta;
  lifecycle: PrArtifactLifecycleState;
};

function nowOrExisting(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim() ?? "";
  return trimmed || fallback;
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

export type ShellInvocation = {
  command: string;
  args: string[];
};

export function resolveShellInvocation(command: string): ShellInvocation {
  if (os.platform() === "win32") {
    const rawComspec = process.env.ComSpec ?? process.env.COMSPEC;
    const shellCommand =
      rawComspec && rawComspec !== "undefined" && rawComspec !== "null" ? rawComspec : "cmd.exe";
    return { command: shellCommand, args: ["/d", "/s", "/c", command] };
  }
  return { command: "sh", args: ["-lc", command] };
}

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

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function asOptionalInteger(value: unknown): number | undefined {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : undefined;
}

function asVerifyStatus(
  value: unknown,
): { status: "pass" | "fail" | "skipped"; command?: string } | undefined {
  if (!value || typeof value !== "object") return undefined;
  const status = asNonEmptyString((value as { status?: unknown }).status);
  if (status !== "pass" && status !== "fail" && status !== "skipped") return undefined;
  const command = asNonEmptyString((value as { command?: unknown }).command);
  return command ? { status, command } : { status };
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const values = value.filter((entry): entry is string => typeof entry === "string");
  return values.length > 0 ? values : undefined;
}

function normalizeRelatedTaskIds(value: unknown, primaryTaskId: string): string[] | undefined {
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

function asPrBatchMeta(value: unknown, primaryTaskId: string): PrBatchMeta | undefined {
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

function buildPrBatchMeta(opts: {
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

export function resolvePrBatchIncludedTaskIds(meta: PrMeta): string[] {
  return (
    normalizeRelatedTaskIds(meta.batch?.included_task_ids ?? meta.related_task_ids, meta.task_id) ??
    []
  );
}

function asMergeStrategy(value: unknown): "squash" | "merge" | "rebase" | undefined {
  const strategy = asNonEmptyString(value);
  return strategy === "squash" || strategy === "merge" || strategy === "rebase"
    ? strategy
    : undefined;
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

export function extractLastVerifiedSha(logText: string): string | null {
  const regex = /verified_sha=([0-9a-f]{7,40})/gi;
  let match: RegExpExecArray | null = null;
  let last: string | null = null;
  while ((match = regex.exec(logText))) {
    last = match[1] ?? null;
  }
  return last;
}

export async function appendVerifyLog(
  logPath: string,
  header: string,
  content: string,
): Promise<void> {
  await mkdir(path.dirname(logPath), { recursive: true });
  const lines = [header.trimEnd()];
  if (content) lines.push(content.trimEnd());
  lines.push("");
  await writeFile(logPath, `${lines.join("\n")}\n`, { flag: "a" });
}

export async function runShellCommand(
  command: string,
  cwd: string,
): Promise<{
  code: number;
  output: string;
}> {
  const invocation = resolveShellInvocation(command);
  try {
    const { stdout, stderr } = await execFileAsync(invocation.command, invocation.args, {
      cwd,
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
    });
    let output = "";
    if (stdout) output += stdout;
    if (stderr) output += (output && !output.endsWith("\n") ? "\n" : "") + stderr;
    return { code: 0, output };
  } catch (err) {
    const error = err as { code?: number | string; stdout?: string; stderr?: string };
    let output = "";
    if (error.stdout) output += String(error.stdout);
    if (error.stderr)
      output += (output && !output.endsWith("\n") ? "\n" : "") + String(error.stderr);
    const code = typeof error.code === "number" ? error.code : 1;
    return { code, output };
  }
}
