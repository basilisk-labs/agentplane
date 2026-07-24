import type { BigIntStats } from "node:fs";
import { readdir, readlink } from "node:fs/promises";
import path from "node:path";

import {
  CaptureBudget,
  ProtectedFilesystemObservationFailure,
  assertSameIdentity,
  assertStableMetadata,
  childPath,
  compareText,
  entryMode,
  errorCode,
  isExcluded,
  isObservationFailure,
  lstatBigInt,
  type NormalizedCaptureInput,
  normalizeCaptureInput,
  observationError,
  repositoryPath,
  sha256,
  sha256RegularFile,
  stableMetadataSha256,
  stableJson,
  unavailableSnapshot,
} from "./protected-filesystem-capture-support.js";
import {
  PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE,
  type CaptureProtectedFilesystemSnapshotInput,
  type ProtectedFilesystemEntry,
  type ProtectedFilesystemObservationError,
  type ProtectedFilesystemSnapshot,
} from "./protected-filesystem-types.js";

async function captureEntry(opts: {
  repositoryRoot: string;
  entryPath: string;
  excludedPaths: readonly string[];
  entries: ProtectedFilesystemEntry[];
  errors: ProtectedFilesystemObservationError[];
  missingAllowed: boolean;
  budget: CaptureBudget;
  captureMode: NormalizedCaptureInput["captureMode"];
}): Promise<void> {
  if (isExcluded(opts.entryPath, opts.excludedPaths)) return;
  opts.budget.checkTime(opts.entryPath);

  const absolutePath = repositoryPath(opts.repositoryRoot, opts.entryPath);
  let stats: BigIntStats;
  try {
    stats = await lstatBigInt(absolutePath);
  } catch (error) {
    if (opts.missingAllowed && errorCode(error) === "ENOENT") return;
    opts.errors.push(observationError("capture", "lstat", opts.entryPath, error));
    return;
  }

  opts.budget.consumeEntry(opts.entryPath);
  if (stats.isFile()) {
    try {
      const observed =
        opts.captureMode === "content_hash"
          ? await sha256RegularFile({
              absolutePath,
              entryPath: opts.entryPath,
              initialStats: stats,
              budget: opts.budget,
            })
          : await (async () => {
              const finalStats = await lstatBigInt(absolutePath);
              assertStableMetadata(
                stats,
                finalStats,
                opts.entryPath,
                "during metadata-only observation",
              );
              return { sha256: null, stats: finalStats };
            })();
      opts.entries.push({
        path: opts.entryPath,
        kind: "file",
        mode: entryMode(observed.stats),
        size_bytes: Number(observed.stats.size),
        metadata_sha256:
          opts.captureMode === "metadata_only" ? stableMetadataSha256(observed.stats) : null,
        sha256: observed.sha256,
        symlink_target: null,
      });
    } catch (error) {
      if (isObservationFailure(error) && error.code.startsWith("AP_PROTECTED_FS_MAX_")) {
        throw error;
      }
      if (isObservationFailure(error) && error.code === "AP_PROTECTED_FS_TIMEOUT") {
        throw error;
      }
      opts.errors.push(observationError("capture", "read_file", opts.entryPath, error));
    }
    return;
  }

  if (stats.isSymbolicLink()) {
    try {
      const target = opts.captureMode === "content_hash" ? await readlink(absolutePath) : null;
      const finalStats = await lstatBigInt(absolutePath);
      assertStableMetadata(stats, finalStats, opts.entryPath, "while reading the symbolic link");
      opts.entries.push({
        path: opts.entryPath,
        kind: "symlink",
        mode: entryMode(finalStats),
        size_bytes: Number(finalStats.size),
        metadata_sha256:
          opts.captureMode === "metadata_only" ? stableMetadataSha256(finalStats) : null,
        sha256: target === null ? null : sha256(target),
        symlink_target: target,
      });
    } catch (error) {
      if (isObservationFailure(error) && error.code === "AP_PROTECTED_FS_TIMEOUT") {
        throw error;
      }
      opts.errors.push(observationError("capture", "read_symlink", opts.entryPath, error));
    }
    return;
  }

  if (!stats.isDirectory()) {
    opts.errors.push(
      observationError(
        "capture",
        "unsupported_entry",
        opts.entryPath,
        new Error("protected filesystem entry is not a regular file, symlink, or directory"),
      ),
    );
    return;
  }

  let children: string[];
  let stableDirectoryStats: BigIntStats;
  try {
    opts.budget.checkTime(opts.entryPath);
    const observedChildren = await readdir(absolutePath);
    stableDirectoryStats = await lstatBigInt(absolutePath);
    if (!stableDirectoryStats.isDirectory()) {
      throw new ProtectedFilesystemObservationFailure(
        "AP_PROTECTED_FS_NOT_DIRECTORY",
        `protected filesystem entry stopped being a directory during readdir: ${opts.entryPath}`,
      );
    }
    assertStableMetadata(
      stats,
      stableDirectoryStats,
      opts.entryPath,
      "while reading the directory",
    );
    children = observedChildren.toSorted(compareText);
  } catch (error) {
    if (isObservationFailure(error) && error.code === "AP_PROTECTED_FS_TIMEOUT") {
      throw error;
    }
    opts.errors.push(observationError("capture", "read_directory", opts.entryPath, error));
    return;
  }

  opts.entries.push({
    path: opts.entryPath,
    kind: "directory",
    mode: entryMode(stableDirectoryStats),
    size_bytes: null,
    metadata_sha256:
      opts.captureMode === "metadata_only" ? stableMetadataSha256(stableDirectoryStats) : null,
    sha256: null,
    symlink_target: null,
  });

  for (const child of children) {
    await captureEntry({
      ...opts,
      entryPath: childPath(opts.entryPath, child),
      missingAllowed: false,
    });
  }

  try {
    opts.budget.checkTime(opts.entryPath);
    const finalStats = await lstatBigInt(absolutePath);
    if (!finalStats.isDirectory()) {
      throw new ProtectedFilesystemObservationFailure(
        "AP_PROTECTED_FS_NOT_DIRECTORY",
        `protected filesystem entry stopped being a directory during traversal: ${opts.entryPath}`,
      );
    }
    assertSameIdentity(
      stableDirectoryStats,
      finalStats,
      opts.entryPath,
      "while traversing the directory",
    );
    assertStableMetadata(
      stableDirectoryStats,
      finalStats,
      opts.entryPath,
      "while traversing the directory",
    );
  } catch (error) {
    if (isObservationFailure(error) && error.code === "AP_PROTECTED_FS_TIMEOUT") {
      throw error;
    }
    opts.errors.push(observationError("capture", "read_directory", opts.entryPath, error));
  }
}

export async function captureProtectedFilesystemSnapshot(
  input: CaptureProtectedFilesystemSnapshotInput,
): Promise<ProtectedFilesystemSnapshot> {
  let normalized: NormalizedCaptureInput;
  try {
    normalized = normalizeCaptureInput(input);
  } catch (error) {
    const repositoryRoot =
      typeof input?.repository_root === "string" && input.repository_root.trim().length > 0
        ? path.resolve(input.repository_root)
        : "";
    return unavailableSnapshot({
      repositoryRoot,
      captureMode: input?.capture_mode === "metadata_only" ? "metadata_only" : "content_hash",
      protectedPrefixes: [],
      excludedPaths: [],
      errors: [observationError("capture", "input", null, error)],
    });
  }

  const budget = new CaptureBudget(normalized.limits);
  let rootStats: BigIntStats;
  try {
    budget.checkTime(null);
    rootStats = await lstatBigInt(normalized.repositoryRoot);
    if (!rootStats.isDirectory()) {
      throw new Error("repository_root is not a directory");
    }
  } catch (error) {
    return unavailableSnapshot({
      repositoryRoot: normalized.repositoryRoot,
      captureMode: normalized.captureMode,
      protectedPrefixes: normalized.protectedPrefixes,
      excludedPaths: normalized.excludedPaths,
      errors: [
        observationError(
          "capture",
          isObservationFailure(error) ? "budget" : "repository_root",
          null,
          error,
        ),
      ],
    });
  }

  const entries: ProtectedFilesystemEntry[] = [];
  const errors: ProtectedFilesystemObservationError[] = [];
  try {
    for (const prefix of normalized.protectedPrefixes) {
      await captureEntry({
        repositoryRoot: normalized.repositoryRoot,
        entryPath: prefix,
        excludedPaths: normalized.excludedPaths,
        entries,
        errors,
        missingAllowed: true,
        budget,
        captureMode: normalized.captureMode,
      });
    }
    budget.checkTime(null);
    const finalRootStats = await lstatBigInt(normalized.repositoryRoot);
    if (!finalRootStats.isDirectory()) {
      throw new ProtectedFilesystemObservationFailure(
        "AP_PROTECTED_FS_REPOSITORY_ROOT_CHANGED",
        "repository_root stopped being a directory during observation",
      );
    }
    assertSameIdentity(
      rootStats,
      finalRootStats,
      normalized.repositoryRoot,
      "during protected filesystem observation",
    );
  } catch (error) {
    errors.push(
      observationError(
        "capture",
        isObservationFailure(error) &&
          (error.code.startsWith("AP_PROTECTED_FS_MAX_") ||
            error.code === "AP_PROTECTED_FS_TIMEOUT")
          ? "budget"
          : "snapshot_unavailable",
        null,
        error,
      ),
    );
  }
  const sortedEntries = entries.toSorted((left, right) => compareText(left.path, right.path));
  if (errors.length > 0) {
    return unavailableSnapshot({
      repositoryRoot: normalized.repositoryRoot,
      captureMode: normalized.captureMode,
      protectedPrefixes: normalized.protectedPrefixes,
      excludedPaths: normalized.excludedPaths,
      entries: sortedEntries,
      errors,
    });
  }

  return {
    schema_version: 1,
    provenance: PROTECTED_FILESYSTEM_OBSERVATION_PROVENANCE,
    state: "available",
    repository_root: normalized.repositoryRoot,
    capture_mode: normalized.captureMode,
    protected_prefixes: normalized.protectedPrefixes,
    excluded_paths: normalized.excludedPaths,
    entries: sortedEntries,
    snapshot_sha256: sha256(
      stableJson({
        schema_version: 1,
        capture_mode: normalized.captureMode,
        protected_prefixes: normalized.protectedPrefixes,
        excluded_paths: normalized.excludedPaths,
        entries: sortedEntries,
      }),
    ),
    errors: [],
  };
}
