import { createHash } from "node:crypto";
import { constants, type BigIntStats } from "node:fs";
import { lstat, open } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";

import {
  gitPathIsUnderPrefix,
  gitPathPrefixIsUnderPrefix,
  normalizeGitPathCandidate,
  normalizeGitPathPrefix,
} from "../../shared/git-path.js";
import {
  DEFAULT_PROTECTED_FILESYSTEM_OBSERVATION_LIMITS,
  PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE,
  type CaptureProtectedFilesystemSnapshotInput,
  type ProtectedFilesystemCaptureMode,
  type ProtectedFilesystemEntry,
  type ProtectedFilesystemObservationError,
  type ProtectedFilesystemObservationLimits,
  type ProtectedFilesystemObservationOperation,
  type ProtectedFilesystemSnapshot,
} from "./protected-filesystem-types.js";

export type NormalizedCaptureInput = {
  repositoryRoot: string;
  captureMode: ProtectedFilesystemCaptureMode;
  protectedPrefixes: string[];
  excludedPaths: string[];
  limits: ProtectedFilesystemObservationLimits;
};

export class ProtectedFilesystemObservationFailure extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "ProtectedFilesystemObservationFailure";
    this.code = code;
  }
}

export class CaptureBudget {
  readonly #limits: ProtectedFilesystemObservationLimits;
  readonly #startedAt = performance.now();
  #entries = 0;
  #bytes = 0;

  constructor(limits: ProtectedFilesystemObservationLimits) {
    this.#limits = limits;
  }

  checkTime(entryPath: string | null): void {
    const elapsedMs = performance.now() - this.#startedAt;
    if (elapsedMs < this.#limits.timeout_ms) return;
    throw new ProtectedFilesystemObservationFailure(
      "AP_PROTECTED_FS_TIMEOUT",
      `protected filesystem observation exceeded timeout_ms=${this.#limits.timeout_ms}` +
        (entryPath ? ` at ${entryPath}` : ""),
    );
  }

  consumeEntry(entryPath: string): void {
    this.checkTime(entryPath);
    if (this.#entries >= this.#limits.max_entries) {
      throw new ProtectedFilesystemObservationFailure(
        "AP_PROTECTED_FS_MAX_ENTRIES",
        `protected filesystem observation exceeded max_entries=${this.#limits.max_entries} at ${entryPath}`,
      );
    }
    this.#entries += 1;
  }

  assertFileFits(size: bigint, entryPath: string): void {
    this.checkTime(entryPath);
    const remaining = BigInt(this.#limits.max_bytes - this.#bytes);
    if (size <= remaining) return;
    throw new ProtectedFilesystemObservationFailure(
      "AP_PROTECTED_FS_MAX_BYTES",
      `protected filesystem observation exceeded max_bytes=${this.#limits.max_bytes} at ${entryPath}`,
    );
  }

  consumeBytes(bytes: number, entryPath: string): void {
    this.checkTime(entryPath);
    if (bytes > this.#limits.max_bytes - this.#bytes) {
      throw new ProtectedFilesystemObservationFailure(
        "AP_PROTECTED_FS_MAX_BYTES",
        `protected filesystem observation exceeded max_bytes=${this.#limits.max_bytes} at ${entryPath}`,
      );
    }
    this.#bytes += bytes;
  }
}

export function compareText(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

export function stableJson(value: unknown): string {
  return JSON.stringify(value);
}

export function sha256(value: string | Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export function stableMetadataSha256(stats: BigIntStats): string {
  return sha256(
    stableJson({
      dev: stats.dev.toString(10),
      ino: stats.ino.toString(10),
      mode: stats.mode.toString(10),
      nlink: stats.nlink.toString(10),
      uid: stats.uid.toString(10),
      gid: stats.gid.toString(10),
      rdev: stats.rdev.toString(10),
      size: stats.size.toString(10),
      mtime_ns: stats.mtimeNs.toString(10),
      ctime_ns: stats.ctimeNs.toString(10),
    }),
  );
}

export function isObservationFailure(
  error: unknown,
): error is ProtectedFilesystemObservationFailure {
  return error instanceof ProtectedFilesystemObservationFailure;
}

export function entryMode(stats: BigIntStats): number {
  return Number(stats.mode & 0o7777n);
}

function sameIdentity(left: BigIntStats, right: BigIntStats): boolean {
  return left.dev === right.dev && left.ino === right.ino;
}

function sameStableMetadata(left: BigIntStats, right: BigIntStats): boolean {
  return (
    sameIdentity(left, right) &&
    left.mode === right.mode &&
    left.nlink === right.nlink &&
    left.uid === right.uid &&
    left.gid === right.gid &&
    left.rdev === right.rdev &&
    left.size === right.size &&
    left.mtimeNs === right.mtimeNs &&
    left.ctimeNs === right.ctimeNs
  );
}

export function assertSameIdentity(
  expected: BigIntStats,
  observed: BigIntStats,
  entryPath: string,
  phase: string,
): void {
  if (sameIdentity(expected, observed)) return;
  throw new ProtectedFilesystemObservationFailure(
    "AP_PROTECTED_FS_IDENTITY_CHANGED",
    `protected filesystem entry identity changed ${phase}: ${entryPath}`,
  );
}

export function assertStableMetadata(
  expected: BigIntStats,
  observed: BigIntStats,
  entryPath: string,
  phase: string,
): void {
  if (sameStableMetadata(expected, observed)) return;
  throw new ProtectedFilesystemObservationFailure(
    "AP_PROTECTED_FS_ENTRY_CHANGED",
    `protected filesystem entry changed ${phase}: ${entryPath}`,
  );
}

export async function lstatBigInt(filePath: string): Promise<BigIntStats> {
  return lstat(filePath, { bigint: true });
}

export async function sha256RegularFile(opts: {
  absolutePath: string;
  entryPath: string;
  initialStats: BigIntStats;
  budget: CaptureBudget;
}): Promise<{ sha256: string; stats: BigIntStats }> {
  opts.budget.assertFileFits(opts.initialStats.size, opts.entryPath);
  if (typeof constants.O_NOFOLLOW !== "number" || typeof constants.O_NONBLOCK !== "number") {
    throw new ProtectedFilesystemObservationFailure(
      "AP_PROTECTED_FS_SAFE_OPEN_UNAVAILABLE",
      "platform does not expose O_NOFOLLOW and O_NONBLOCK",
    );
  }

  const handle = await open(
    opts.absolutePath,
    constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK,
  );
  try {
    opts.budget.checkTime(opts.entryPath);
    const openedStats = await handle.stat({ bigint: true });
    if (!openedStats.isFile()) {
      throw new ProtectedFilesystemObservationFailure(
        "AP_PROTECTED_FS_NOT_REGULAR_FILE",
        `protected filesystem entry stopped being a regular file before hashing: ${opts.entryPath}`,
      );
    }
    assertStableMetadata(opts.initialStats, openedStats, opts.entryPath, "between lstat and open");

    const hash = createHash("sha256");
    const buffer = Buffer.allocUnsafe(64 * 1024);
    let totalBytes = 0;
    while (true) {
      opts.budget.checkTime(opts.entryPath);
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, null);
      if (bytesRead === 0) break;
      opts.budget.consumeBytes(bytesRead, opts.entryPath);
      totalBytes += bytesRead;
      hash.update(buffer.subarray(0, bytesRead));
    }

    const finalDescriptorStats = await handle.stat({ bigint: true });
    assertStableMetadata(openedStats, finalDescriptorStats, opts.entryPath, "while hashing");
    if (BigInt(totalBytes) !== finalDescriptorStats.size) {
      throw new ProtectedFilesystemObservationFailure(
        "AP_PROTECTED_FS_FILE_SIZE_CHANGED",
        `protected filesystem file size did not match bytes read: ${opts.entryPath}`,
      );
    }

    const finalPathStats = await lstatBigInt(opts.absolutePath);
    assertStableMetadata(
      finalDescriptorStats,
      finalPathStats,
      opts.entryPath,
      "between descriptor read and path revalidation",
    );
    return {
      sha256: `sha256:${hash.digest("hex")}`,
      stats: finalDescriptorStats,
    };
  } finally {
    await handle.close();
  }
}

export function errorCode(error: unknown): string | number | null {
  const code = (error as { code?: unknown } | null)?.code;
  return typeof code === "string" || typeof code === "number" ? code : null;
}

export function observationError(
  source: ProtectedFilesystemObservationError["source"],
  operation: ProtectedFilesystemObservationOperation,
  entryPath: string | null,
  error: unknown,
): ProtectedFilesystemObservationError {
  return {
    source,
    operation,
    path: entryPath,
    message: error instanceof Error ? error.message : String(error),
    code: errorCode(error),
  };
}

function portablePath(raw: string): string {
  return raw.replaceAll("\\", "/");
}

function assertSafeRelativePath(raw: string, field: string): string {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    throw new Error(`${field} must contain non-empty repository-relative paths`);
  }
  const trimmed = raw.trim();
  if (trimmed.includes("\0") || path.isAbsolute(trimmed) || path.win32.isAbsolute(trimmed)) {
    throw new Error(`${field} must contain repository-relative paths: ${JSON.stringify(raw)}`);
  }
  const portable = portablePath(trimmed);
  if (portable.split("/").includes("..")) {
    throw new Error(`${field} must not escape repository_root: ${JSON.stringify(raw)}`);
  }
  const normalized = normalizeGitPathPrefix(portable);
  if (!normalized) {
    throw new Error(`${field} contains an empty repository-relative path`);
  }
  return normalized;
}

function assertInsideRepository(
  repositoryRoot: string,
  absolutePath: string,
  field: string,
): string {
  const relative = path.relative(repositoryRoot, absolutePath);
  if (relative === "") {
    throw new Error(`${field} must not contain repository_root`);
  }
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`${field} must stay inside repository_root: ${absolutePath}`);
  }
  return assertSafeRelativePath(relative, field);
}

function compactPrefixes(prefixes: readonly string[]): string[] {
  const compact: string[] = [];
  for (const prefix of [...new Set(prefixes)].toSorted(compareText)) {
    if (compact.some((existing) => gitPathPrefixIsUnderPrefix(prefix, existing))) continue;
    compact.push(prefix);
  }
  return compact;
}

function normalizeExcludedRoots(repositoryRoot: string, roots: readonly string[]): string[] {
  return compactPrefixes(
    roots.map((root) => {
      if (typeof root !== "string" || root.trim().length === 0) {
        throw new Error("excluded_roots must contain non-empty paths");
      }
      const trimmed = root.trim();
      if (path.win32.isAbsolute(trimmed) && !path.isAbsolute(trimmed)) {
        throw new Error(`excluded_roots contains a foreign absolute path: ${trimmed}`);
      }
      if (path.isAbsolute(trimmed)) {
        return assertInsideRepository(repositoryRoot, path.resolve(trimmed), "excluded_roots");
      }
      const relative = assertSafeRelativePath(trimmed, "excluded_roots");
      if (relative === ".") {
        throw new Error("excluded_roots must not contain repository_root");
      }
      return relative;
    }),
  );
}

function normalizeLimit(
  raw: number | undefined,
  field: keyof ProtectedFilesystemObservationLimits,
): number {
  const fallback = DEFAULT_PROTECTED_FILESYSTEM_OBSERVATION_LIMITS[field];
  if (raw === undefined) return fallback;
  if (!Number.isSafeInteger(raw) || raw < 0) {
    throw new Error(`limits.${field} must be a non-negative safe integer`);
  }
  return raw;
}

function normalizeLimits(
  limits: Partial<ProtectedFilesystemObservationLimits> | undefined,
): ProtectedFilesystemObservationLimits {
  return {
    max_entries: normalizeLimit(limits?.max_entries, "max_entries"),
    max_bytes: normalizeLimit(limits?.max_bytes, "max_bytes"),
    timeout_ms: normalizeLimit(limits?.timeout_ms, "timeout_ms"),
  };
}

function normalizeCaptureMode(
  captureMode: ProtectedFilesystemCaptureMode | undefined,
): ProtectedFilesystemCaptureMode {
  if (captureMode === undefined) return "content_hash";
  if (captureMode === "content_hash" || captureMode === "metadata_only") return captureMode;
  throw new Error("capture_mode must be content_hash or metadata_only");
}

export function normalizeCaptureInput(
  input: CaptureProtectedFilesystemSnapshotInput,
): NormalizedCaptureInput {
  if (typeof input.repository_root !== "string" || input.repository_root.trim().length === 0) {
    throw new Error("repository_root must be a non-empty path");
  }
  const protectedPrefixes = input.protected_prefixes;
  if (!protectedPrefixes || protectedPrefixes.length === 0) {
    throw new Error("protected_prefixes must contain at least one repository-relative path");
  }
  const repositoryRoot = path.resolve(input.repository_root);
  return {
    repositoryRoot,
    captureMode: normalizeCaptureMode(input.capture_mode),
    protectedPrefixes: compactPrefixes(
      protectedPrefixes.map((prefix) => assertSafeRelativePath(prefix, "protected_prefixes")),
    ),
    excludedPaths: normalizeExcludedRoots(repositoryRoot, input.excluded_roots ?? []),
    limits: normalizeLimits(input.limits),
  };
}

export function repositoryPath(repositoryRoot: string, entryPath: string): string {
  if (entryPath === ".") return repositoryRoot;
  const raw = entryPath.trim();
  if (
    !raw ||
    raw.includes("\0") ||
    path.isAbsolute(raw) ||
    path.win32.isAbsolute(raw) ||
    raw.split("/").includes("..")
  ) {
    throw new Error(`entry_path must stay inside repository_root: ${JSON.stringify(entryPath)}`);
  }
  const normalized = normalizeGitPathCandidate(raw);
  const absolute = path.resolve(repositoryRoot, ...normalized.split("/"));
  const relative = path.relative(repositoryRoot, absolute);
  if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`entry_path escapes repository_root: ${entryPath}`);
  }
  return absolute;
}

export function isExcluded(entryPath: string, excludedPaths: readonly string[]): boolean {
  return excludedPaths.some((excluded) => gitPathIsUnderPrefix(entryPath, excluded));
}

export function childPath(parent: string, child: string): string {
  return normalizeGitPathCandidate(parent === "." ? child : `${parent}/${child}`);
}

export function unavailableSnapshot(opts: {
  repositoryRoot: string;
  captureMode: ProtectedFilesystemCaptureMode;
  protectedPrefixes: string[];
  excludedPaths: string[];
  entries?: ProtectedFilesystemEntry[];
  errors: ProtectedFilesystemObservationError[];
}): ProtectedFilesystemSnapshot {
  return {
    schema_version: 1,
    provenance: PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE,
    state: "unavailable",
    repository_root: opts.repositoryRoot,
    capture_mode: opts.captureMode,
    protected_prefixes: opts.protectedPrefixes,
    excluded_paths: opts.excludedPaths,
    entries: opts.entries ?? [],
    snapshot_sha256: null,
    errors: opts.errors,
  };
}
