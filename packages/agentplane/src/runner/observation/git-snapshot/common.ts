import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import type {
  GitCommitPathChange,
  GitIndexEntry,
  GitObservationError,
  GitPathFingerprint,
  GitSnapshot,
  GitSnapshotDelta,
  GitSnapshotDeltaChange,
  GitSnapshotDeltaEntry,
  GitSnapshotPathState,
  GitSnapshotSummary,
  GitStatusEntry,
} from "./model.js";
import { GIT_OBSERVATION_PROVENANCE } from "./model.js";

export const GIT_MAX_BUFFER_BYTES = 64 * 1024 * 1024;
export const GIT_TIMEOUT_MS = 30_000;

export function compareText(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

export function uniqSorted(values: Iterable<string>): string[] {
  return [...new Set(values)].toSorted(compareText);
}

export function stableJson(value: unknown): string {
  return JSON.stringify(value);
}

export function sha256(value: string | Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export async function sha256File(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) {
    hash.update(chunk as Buffer);
  }
  return `sha256:${hash.digest("hex")}`;
}

function errorText(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (Buffer.isBuffer(value)) return value.toString("utf8");
  return null;
}

export function observationError(operation: string, error: unknown): GitObservationError {
  const record =
    error && typeof error === "object"
      ? (error as { code?: unknown; stderr?: unknown; message?: unknown })
      : null;
  const code =
    typeof record?.code === "string" || typeof record?.code === "number" ? record.code : null;
  const message =
    error instanceof Error
      ? error.message
      : typeof record?.message === "string"
        ? record.message
        : String(error);
  const stderr = errorText(record?.stderr);
  return {
    operation,
    message,
    code,
    stderr: stderr && stderr.length > 0 ? stderr : null,
  };
}

export function normalizeRepositoryRoot(repositoryRoot: string): string {
  if (typeof repositoryRoot !== "string" || repositoryRoot.trim().length === 0) {
    throw new Error("repository_root must be a non-empty path");
  }
  return path.resolve(repositoryRoot);
}

function toGitPath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

export function assertGitPath(gitPath: string): string {
  if (
    gitPath.length === 0 ||
    gitPath.includes("\0") ||
    path.posix.isAbsolute(gitPath) ||
    gitPath.split("/").includes("..")
  ) {
    throw new Error(`unsafe repository-relative Git path: ${JSON.stringify(gitPath)}`);
  }
  return gitPath;
}

export function normalizeExcludedRoots(repositoryRoot: string, roots: readonly string[]): string[] {
  const normalized: string[] = [];
  for (const root of roots) {
    if (typeof root !== "string" || root.trim().length === 0) continue;
    const absolute = path.isAbsolute(root)
      ? path.resolve(root)
      : path.resolve(repositoryRoot, root);
    const relative = path.relative(repositoryRoot, absolute);
    if (relative === "") {
      throw new Error("excluded_roots must not contain repository_root");
    }
    if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      continue;
    }
    normalized.push(assertGitPath(toGitPath(relative)));
  }
  return uniqSorted(normalized);
}

export function isExcluded(gitPath: string, excludedPaths: readonly string[]): boolean {
  return excludedPaths.some(
    (excluded) => gitPath === excluded || gitPath.startsWith(`${excluded}/`),
  );
}

export function repositoryPath(repositoryRoot: string, gitPath: string): string {
  const safePath = assertGitPath(gitPath);
  const absolute = path.resolve(repositoryRoot, ...safePath.split("/"));
  const relative = path.relative(repositoryRoot, absolute);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Git path escapes repository_root: ${gitPath}`);
  }
  return absolute;
}

export function statusEntryPaths(entry: GitStatusEntry): string[] {
  return entry.original_path ? [entry.path, entry.original_path] : [entry.path];
}

export function snapshotSummary(snapshot: GitSnapshot): GitSnapshotSummary {
  return {
    head_commit: snapshot.head_commit,
    snapshot_sha256: snapshot.snapshot_sha256,
    dirty_paths: [...snapshot.dirty_paths],
  };
}

export function prefixErrors(
  prefix: string,
  errors: readonly GitObservationError[],
): GitObservationError[] {
  return errors.map((error) => ({ ...error, operation: `${prefix}.${error.operation}` }));
}

export function sortStatusEntries(entries: readonly GitStatusEntry[]): GitStatusEntry[] {
  return [...entries].toSorted((left, right) => {
    const pathOrder = compareText(left.path, right.path);
    if (pathOrder !== 0) return pathOrder;
    const originalOrder = compareText(left.original_path ?? "", right.original_path ?? "");
    if (originalOrder !== 0) return originalOrder;
    const indexOrder = compareText(left.index_status, right.index_status);
    return indexOrder === 0 ? compareText(left.worktree_status, right.worktree_status) : indexOrder;
  });
}

export function sortIndexEntries(entries: readonly GitIndexEntry[]): GitIndexEntry[] {
  return [...entries].toSorted((left, right) => {
    const pathOrder = compareText(left.path, right.path);
    if (pathOrder !== 0) return pathOrder;
    if (left.stage !== right.stage) return left.stage - right.stage;
    const modeOrder = compareText(left.mode, right.mode);
    return modeOrder === 0 ? compareText(left.object_id, right.object_id) : modeOrder;
  });
}

export function sortFingerprints(entries: readonly GitPathFingerprint[]): GitPathFingerprint[] {
  return [...entries].toSorted((left, right) => compareText(left.path, right.path));
}

async function gitBlobSha256(
  repositoryRoot: string,
  objectId: string,
  cache: Map<string, string>,
): Promise<string> {
  const cached = cache.get(objectId);
  if (cached) return cached;
  if (!/^[0-9a-f]{40,64}$/u.test(objectId)) {
    throw new Error(`unsafe Git object id: ${objectId}`);
  }
  const { stdout } = await execFileAsync("git", ["cat-file", "blob", objectId], {
    cwd: repositoryRoot,
    env: gitEnv(),
    encoding: "buffer",
    maxBuffer: GIT_MAX_BUFFER_BYTES,
    timeout: GIT_TIMEOUT_MS,
  });
  const digest = sha256(stdout);
  cache.set(objectId, digest);
  return digest;
}

export function unavailableDelta(opts: {
  repositoryRoot: string;
  before: GitSnapshot;
  after: GitSnapshot;
  excludedPaths: string[];
  errors: GitObservationError[];
}): GitSnapshotDelta {
  return {
    schema_version: 1,
    provenance: GIT_OBSERVATION_PROVENANCE,
    state: "unavailable",
    repository_root: opts.repositoryRoot,
    before: snapshotSummary(opts.before),
    after: snapshotSummary(opts.after),
    head_changed: opts.before.head_commit !== opts.after.head_commit,
    changed_paths: [],
    entries: [],
    head_changes: [],
    sha256: null,
    excluded_paths: opts.excludedPaths,
    errors: opts.errors,
  };
}

export function buildStatusMap(
  snapshot: GitSnapshot,
  excludedPaths: readonly string[],
): Map<string, GitStatusEntry[]> {
  const result = new Map<string, GitStatusEntry[]>();
  for (const entry of snapshot.status_entries) {
    for (const entryPath of statusEntryPaths(entry)) {
      if (isExcluded(entryPath, excludedPaths)) continue;
      result.set(entryPath, sortStatusEntries([...(result.get(entryPath) ?? []), entry]));
    }
  }
  return result;
}

export function buildIndexMap(
  snapshot: GitSnapshot,
  excludedPaths: readonly string[],
): Map<string, GitIndexEntry[]> {
  const result = new Map<string, GitIndexEntry[]>();
  for (const entry of snapshot.index_entries) {
    if (isExcluded(entry.path, excludedPaths)) continue;
    result.set(entry.path, sortIndexEntries([...(result.get(entry.path) ?? []), entry]));
  }
  return result;
}

export function buildFingerprintMap(
  snapshot: GitSnapshot,
  excludedPaths: readonly string[],
): Map<string, GitPathFingerprint> {
  return new Map(
    snapshot.path_fingerprints
      .filter((entry) => !isExcluded(entry.path, excludedPaths))
      .map((entry) => [entry.path, entry]),
  );
}

export function pathState(opts: {
  path: string;
  statuses: Map<string, GitStatusEntry[]>;
  indexes: Map<string, GitIndexEntry[]>;
  fingerprints: Map<string, GitPathFingerprint>;
}): GitSnapshotPathState {
  return {
    path: opts.path,
    status_entries: opts.statuses.get(opts.path) ?? [],
    index_entries: opts.indexes.get(opts.path) ?? [],
    fingerprint: opts.fingerprints.get(opts.path) ?? null,
  };
}

export function headChangeMap(
  changes: readonly GitCommitPathChange[],
): Map<string, GitCommitPathChange[]> {
  const result = new Map<string, GitCommitPathChange[]>();
  for (const change of changes) {
    const paths = change.original_path ? [change.path, change.original_path] : [change.path];
    for (const entryPath of paths) {
      result.set(entryPath, [...(result.get(entryPath) ?? []), change]);
    }
  }
  return result;
}

function pathExists(state: GitSnapshotPathState): boolean | null {
  if (state.fingerprint) {
    if (state.fingerprint.kind === "missing") return false;
    if (state.fingerprint.kind === "unavailable") return null;
    return true;
  }
  return state.index_entries.some((entry) => entry.stage === 0);
}

export async function pathContentSha256(
  repositoryRoot: string,
  state: GitSnapshotPathState,
  cache: Map<string, string>,
): Promise<string | null> {
  if (state.fingerprint) return state.fingerprint.sha256;
  const indexEntry = state.index_entries.find((entry) => entry.stage === 0);
  if (!indexEntry || indexEntry.mode === "160000") return null;
  return await gitBlobSha256(repositoryRoot, indexEntry.object_id, cache);
}

export function changedKinds(opts: {
  before: GitSnapshotPathState;
  after: GitSnapshotPathState;
  beforeSha256: string | null;
  afterSha256: string | null;
  headChanges: readonly GitCommitPathChange[];
}): ("content" | "status" | "index" | "head")[] {
  const kinds: ("content" | "status" | "index" | "head")[] = [];
  if (
    opts.beforeSha256 !== opts.afterSha256 ||
    pathExists(opts.before) !== pathExists(opts.after)
  ) {
    kinds.push("content");
  }
  if (stableJson(opts.before.status_entries) !== stableJson(opts.after.status_entries)) {
    kinds.push("status");
  }
  if (stableJson(opts.before.index_entries) !== stableJson(opts.after.index_entries)) {
    kinds.push("index");
  }
  if (opts.headChanges.length > 0) kinds.push("head");
  return kinds;
}

export function classifyPathChange(opts: {
  before: GitSnapshotPathState;
  after: GitSnapshotPathState;
  beforeSha256: string | null;
  afterSha256: string | null;
  changeKinds: readonly string[];
}): Exclude<GitSnapshotDeltaChange, "renamed"> {
  const beforeExists = pathExists(opts.before);
  const afterExists = pathExists(opts.after);
  if (beforeExists === false && afterExists === true) return "added";
  if (beforeExists === true && afterExists === false) return "deleted";
  if (
    opts.beforeSha256 === opts.afterSha256 &&
    opts.changeKinds.includes("index") &&
    !opts.changeKinds.includes("content")
  ) {
    return "index";
  }
  if (
    opts.changeKinds.length === 1 &&
    opts.changeKinds[0] === "head" &&
    opts.beforeSha256 === opts.afterSha256
  ) {
    return "head";
  }
  return "modified";
}

export function deltaDigest(opts: {
  before: GitSnapshotSummary;
  after: GitSnapshotSummary;
  headChanged: boolean;
  changedPaths: string[];
  entries: GitSnapshotDeltaEntry[];
  headChanges: GitCommitPathChange[];
  excludedPaths: string[];
}): string {
  return sha256(
    stableJson({
      schema_version: 1,
      before: opts.before,
      after: opts.after,
      head_changed: opts.headChanged,
      changed_paths: opts.changedPaths,
      entries: opts.entries,
      head_changes: opts.headChanges,
      excluded_paths: opts.excludedPaths,
    }),
  );
}
