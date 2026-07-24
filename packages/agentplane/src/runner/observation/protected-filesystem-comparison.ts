import { createHash } from "node:crypto";
import path from "node:path";

import {
  PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE,
  type CompareProtectedFilesystemSnapshotsInput,
  type ProtectedFilesystemDelta,
  type ProtectedFilesystemDeltaEntry,
  type ProtectedFilesystemObservationError,
  type ProtectedFilesystemObservationOperation,
  type ProtectedFilesystemSnapshot,
} from "./protected-filesystem-types.js";

function compareText(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function stableJson(value: unknown): string {
  return JSON.stringify(value);
}

function sha256(value: string | Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function errorCode(error: unknown): string | number | null {
  const code = (error as { code?: unknown } | null)?.code;
  return typeof code === "string" || typeof code === "number" ? code : null;
}

function observationError(
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

function comparisonError(message: string): ProtectedFilesystemObservationError {
  return observationError("comparison", "comparison_input", null, new Error(message));
}

function carrySnapshotErrors(
  source: "before" | "after",
  errors: readonly ProtectedFilesystemObservationError[],
): ProtectedFilesystemObservationError[] {
  return errors.map((error) => ({ ...error, source }));
}

function unavailableDelta(opts: {
  repositoryRoot: string;
  before: ProtectedFilesystemSnapshot;
  after: ProtectedFilesystemSnapshot;
  protectedPrefixes: string[];
  excludedPaths: string[];
  errors: ProtectedFilesystemObservationError[];
}): ProtectedFilesystemDelta {
  return {
    schema_version: 1,
    provenance: PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE,
    state: "unavailable",
    repository_root: opts.repositoryRoot,
    capture_mode: opts.before.capture_mode,
    protected_prefixes: opts.protectedPrefixes,
    excluded_paths: opts.excludedPaths,
    before_snapshot_sha256: opts.before.snapshot_sha256,
    after_snapshot_sha256: opts.after.snapshot_sha256,
    changed_paths: [],
    entries: [],
    sha256: null,
    errors: opts.errors,
  };
}

export function compareProtectedFilesystemSnapshots(
  input: CompareProtectedFilesystemSnapshotsInput,
): ProtectedFilesystemDelta {
  const repositoryRoot =
    typeof input?.repository_root === "string" && input.repository_root.trim().length > 0
      ? path.resolve(input.repository_root)
      : "";
  const protectedPrefixes = [...input.before.protected_prefixes];
  const excludedPaths = [...input.before.excluded_paths];
  const errors: ProtectedFilesystemObservationError[] = [];

  if (!repositoryRoot) errors.push(comparisonError("repository_root must be a non-empty path"));
  if (path.resolve(input.before.repository_root) !== repositoryRoot) {
    errors.push(comparisonError("before snapshot repository_root does not match comparison root"));
  }
  if (path.resolve(input.after.repository_root) !== repositoryRoot) {
    errors.push(comparisonError("after snapshot repository_root does not match comparison root"));
  }
  if (stableJson(input.after.protected_prefixes) !== stableJson(protectedPrefixes)) {
    errors.push(comparisonError("before and after protected_prefixes do not match"));
  }
  if (input.after.capture_mode !== input.before.capture_mode) {
    errors.push(comparisonError("before and after capture_mode do not match"));
  }
  if (stableJson(input.after.excluded_paths) !== stableJson(excludedPaths)) {
    errors.push(comparisonError("before and after excluded_paths do not match"));
  }
  errors.push(
    ...carrySnapshotErrors("before", input.before.errors),
    ...carrySnapshotErrors("after", input.after.errors),
  );
  if (input.before.state !== "available" || input.after.state !== "available") {
    errors.push(
      observationError(
        "comparison",
        "snapshot_unavailable",
        null,
        new Error("before and after snapshots must both be available"),
      ),
    );
  }
  if (errors.length > 0) {
    return unavailableDelta({
      repositoryRoot,
      before: input.before,
      after: input.after,
      protectedPrefixes,
      excludedPaths,
      errors,
    });
  }

  const beforeByPath = new Map(input.before.entries.map((entry) => [entry.path, entry]));
  const afterByPath = new Map(input.after.entries.map((entry) => [entry.path, entry]));
  const candidatePaths = [...new Set([...beforeByPath.keys(), ...afterByPath.keys()])].toSorted(
    compareText,
  );
  const entries: ProtectedFilesystemDeltaEntry[] = [];
  for (const entryPath of candidatePaths) {
    const before = beforeByPath.get(entryPath) ?? null;
    const after = afterByPath.get(entryPath) ?? null;
    if (stableJson(before) === stableJson(after)) continue;
    entries.push({
      path: entryPath,
      change: before === null ? "added" : after === null ? "deleted" : "modified",
      before,
      after,
    });
  }
  const changedPaths = entries.map((entry) => entry.path);
  const digestInput = {
    schema_version: 1,
    capture_mode: input.before.capture_mode,
    protected_prefixes: protectedPrefixes,
    excluded_paths: excludedPaths,
    before_snapshot_sha256: input.before.snapshot_sha256,
    after_snapshot_sha256: input.after.snapshot_sha256,
    changed_paths: changedPaths,
    entries,
  };
  return {
    schema_version: 1,
    provenance: PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE,
    state: "available",
    repository_root: repositoryRoot,
    capture_mode: input.before.capture_mode,
    protected_prefixes: protectedPrefixes,
    excluded_paths: excludedPaths,
    before_snapshot_sha256: input.before.snapshot_sha256,
    after_snapshot_sha256: input.after.snapshot_sha256,
    changed_paths: changedPaths,
    entries,
    sha256: sha256(stableJson(digestInput)),
    errors: [],
  };
}
