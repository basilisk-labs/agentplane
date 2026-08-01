import { lstat, readlink, realpath } from "node:fs/promises";
import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import {
  GIT_MAX_BUFFER_BYTES,
  GIT_TIMEOUT_MS,
  assertGitPath,
  isExcluded,
  normalizeExcludedRoots,
  normalizeRepositoryRoot,
  observationError,
  repositoryPath,
  sha256,
  sha256File,
  sortFingerprints,
  sortStatusEntries,
  stableJson,
  statusEntryPaths,
  uniqSorted,
} from "./common.js";
import { parseIndexEntries, parsePorcelainStatus } from "./parse.js";
import {
  GIT_OBSERVATION_PROVENANCE,
  type CaptureGitSnapshotInput,
  type GitObservationError,
  type GitPathFingerprint,
  type GitSnapshot,
  type GitStatusEntry,
} from "./model.js";

async function captureHead(repositoryRoot: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["rev-parse", "--verify", "--quiet", "HEAD^{commit}"],
      { cwd: repositoryRoot, env: gitEnv(), timeout: GIT_TIMEOUT_MS },
    );
    const head = String(stdout).trim();
    return head.length > 0 ? head : null;
  } catch (error) {
    const code = (error as { code?: unknown } | null)?.code;
    if (code === 1) return null;
    throw error;
  }
}

async function validateRepositoryRoot(repositoryRoot: string): Promise<void> {
  const { stdout } = await execFileAsync("git", ["rev-parse", "--show-toplevel"], {
    cwd: repositoryRoot,
    env: gitEnv(),
    timeout: GIT_TIMEOUT_MS,
  });
  const observedRoot = path.resolve(String(stdout).trim());
  const [canonicalObservedRoot, canonicalRepositoryRoot] = await Promise.all([
    realpath(observedRoot),
    realpath(repositoryRoot),
  ]);
  if (canonicalObservedRoot !== canonicalRepositoryRoot) {
    throw new Error(
      `repository_root mismatch: expected ${repositoryRoot}, Git resolved ${observedRoot}`,
    );
  }
}

async function captureTrackedStatusEntries(repositoryRoot: string): Promise<GitStatusEntry[]> {
  const { stdout } = await execFileAsync(
    "git",
    [
      "status",
      "--porcelain=v1",
      "-z",
      "--untracked-files=no",
      "--renames",
      "--ignore-submodules=none",
    ],
    {
      cwd: repositoryRoot,
      env: gitEnv(),
      encoding: "buffer",
      maxBuffer: GIT_MAX_BUFFER_BYTES,
      timeout: GIT_TIMEOUT_MS,
    },
  );
  return parsePorcelainStatus(stdout);
}

async function captureUntrackedStatusEntries(repositoryRoot: string): Promise<GitStatusEntry[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["ls-files", "--others", "--exclude-standard", "-z"],
    {
      cwd: repositoryRoot,
      env: gitEnv(),
      encoding: "buffer",
      maxBuffer: GIT_MAX_BUFFER_BYTES,
      timeout: GIT_TIMEOUT_MS,
    },
  );
  return stdout
    .toString("utf8")
    .split("\0")
    .filter((entryPath) => entryPath.length > 0)
    .map((entryPath) => ({
      index_status: "?",
      worktree_status: "?",
      path: assertGitPath(entryPath),
      original_path: null,
    }));
}

async function captureIndexEntries(repositoryRoot: string): Promise<GitSnapshot["index_entries"]> {
  const { stdout } = await execFileAsync("git", ["ls-files", "--stage", "-z"], {
    cwd: repositoryRoot,
    env: gitEnv(),
    encoding: "buffer",
    maxBuffer: GIT_MAX_BUFFER_BYTES,
    timeout: GIT_TIMEOUT_MS,
  });
  return parseIndexEntries(stdout);
}

async function capturePathFingerprint(
  repositoryRoot: string,
  gitPath: string,
): Promise<GitPathFingerprint> {
  const absolutePath = repositoryPath(repositoryRoot, gitPath);
  let stats;
  try {
    stats = await lstat(absolutePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
      return {
        path: gitPath,
        kind: "missing",
        mode: null,
        size_bytes: null,
        sha256: null,
        symlink_target: null,
        error: null,
      };
    }
    const observedError = observationError(`fingerprint:${gitPath}`, error);
    return {
      path: gitPath,
      kind: "unavailable",
      mode: null,
      size_bytes: null,
      sha256: null,
      symlink_target: null,
      error: observedError,
    };
  }

  if (stats.isFile()) {
    try {
      return {
        path: gitPath,
        kind: "file",
        mode: stats.mode,
        size_bytes: stats.size,
        sha256: await sha256File(absolutePath),
        symlink_target: null,
        error: null,
      };
    } catch (error) {
      const observedError = observationError(`fingerprint:${gitPath}`, error);
      return {
        path: gitPath,
        kind: "unavailable",
        mode: stats.mode,
        size_bytes: stats.size,
        sha256: null,
        symlink_target: null,
        error: observedError,
      };
    }
  }

  if (stats.isSymbolicLink()) {
    try {
      const target = await readlink(absolutePath);
      return {
        path: gitPath,
        kind: "symlink",
        mode: stats.mode,
        size_bytes: stats.size,
        sha256: sha256(target),
        symlink_target: target,
        error: null,
      };
    } catch (error) {
      const observedError = observationError(`fingerprint:${gitPath}`, error);
      return {
        path: gitPath,
        kind: "unavailable",
        mode: stats.mode,
        size_bytes: stats.size,
        sha256: null,
        symlink_target: null,
        error: observedError,
      };
    }
  }

  return {
    path: gitPath,
    kind: stats.isDirectory() ? "directory" : "other",
    mode: stats.mode,
    size_bytes: stats.isDirectory() ? null : stats.size,
    sha256: null,
    symlink_target: null,
    error: null,
  };
}

function snapshotDigest(input: {
  head_commit: string | null;
  excluded_paths: string[];
  status_entries: GitStatusEntry[];
  index_entries: GitSnapshot["index_entries"];
  path_fingerprints: GitPathFingerprint[];
}): string {
  return sha256(
    stableJson({
      schema_version: 1,
      head_commit: input.head_commit,
      excluded_paths: input.excluded_paths,
      status_entries: input.status_entries,
      index_entries: input.index_entries,
      path_fingerprints: input.path_fingerprints,
    }),
  );
}

function unavailableSnapshot(opts: {
  repositoryRoot: string;
  excludedPaths: string[];
  errors: GitObservationError[];
  headCommit?: string | null;
  statusEntries?: GitStatusEntry[];
  indexEntries?: GitSnapshot["index_entries"];
  pathFingerprints?: GitPathFingerprint[];
}): GitSnapshot {
  const statusEntries = opts.statusEntries ?? [];
  return {
    schema_version: 1,
    provenance: GIT_OBSERVATION_PROVENANCE,
    state: "unavailable",
    repository_root: opts.repositoryRoot,
    captured_at: new Date().toISOString(),
    head_commit: opts.headCommit ?? null,
    snapshot_sha256: null,
    dirty_paths: uniqSorted(statusEntries.flatMap((entry) => statusEntryPaths(entry))),
    excluded_paths: opts.excludedPaths,
    status_entries: statusEntries,
    index_entries: opts.indexEntries ?? [],
    path_fingerprints: opts.pathFingerprints ?? [],
    errors: opts.errors,
  };
}

type GitSnapshotObservation =
  | {
      state: "invalid";
      repository_root: string;
      error: unknown;
    }
  | {
      state: "observed";
      repository_root: string;
      root_result: PromiseSettledResult<void>;
      head_result: PromiseSettledResult<string | null>;
      tracked_status_result: PromiseSettledResult<GitStatusEntry[]>;
      untracked_status_result: PromiseSettledResult<GitStatusEntry[]>;
      index_result: PromiseSettledResult<GitSnapshot["index_entries"]>;
    };

export async function captureGitSnapshotObservation(
  repositoryRootInput: string,
): Promise<GitSnapshotObservation> {
  let repositoryRoot = "";
  try {
    repositoryRoot = normalizeRepositoryRoot(repositoryRootInput);
  } catch (error) {
    return { state: "invalid", repository_root: repositoryRoot, error };
  }

  const [rootResult, headResult, trackedStatusResult, untrackedStatusResult, indexResult] =
    await Promise.allSettled([
      validateRepositoryRoot(repositoryRoot),
      captureHead(repositoryRoot),
      captureTrackedStatusEntries(repositoryRoot),
      captureUntrackedStatusEntries(repositoryRoot),
      captureIndexEntries(repositoryRoot),
    ]);

  return {
    state: "observed",
    repository_root: repositoryRoot,
    root_result: rootResult,
    head_result: headResult,
    tracked_status_result: trackedStatusResult,
    untracked_status_result: untrackedStatusResult,
    index_result: indexResult,
  };
}

export async function materializeGitSnapshot(
  observation: GitSnapshotObservation,
  excludedRoots: readonly string[] = [],
): Promise<GitSnapshot> {
  const repositoryRoot = observation.repository_root;
  if (observation.state === "invalid") {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths: [],
      errors: [observationError("snapshot_input", observation.error)],
    });
  }

  let excludedPaths: string[] = [];
  try {
    excludedPaths = normalizeExcludedRoots(repositoryRoot, excludedRoots);
  } catch (error) {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      errors: [observationError("snapshot_input", error)],
    });
  }

  const {
    root_result: rootResult,
    head_result: headResult,
    tracked_status_result: trackedStatusResult,
    untracked_status_result: untrackedStatusResult,
    index_result: indexResult,
  } = observation;

  if (rootResult.status === "rejected") {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      errors: [observationError("git_root", rootResult.reason)],
    });
  }

  if (headResult.status === "rejected") {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      errors: [observationError("git_head", headResult.reason)],
    });
  }
  const headCommit = headResult.value;

  if (trackedStatusResult.status === "rejected") {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      headCommit,
      errors: [observationError("git_status", trackedStatusResult.reason)],
    });
  }
  if (untrackedStatusResult.status === "rejected") {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      headCommit,
      statusEntries: trackedStatusResult.value,
      errors: [observationError("git_status", untrackedStatusResult.reason)],
    });
  }
  const statusEntries = sortStatusEntries(
    [...trackedStatusResult.value, ...untrackedStatusResult.value].filter((entry) =>
      statusEntryPaths(entry).some((entryPath) => !isExcluded(entryPath, excludedPaths)),
    ),
  );

  if (indexResult.status === "rejected") {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      headCommit,
      statusEntries,
      errors: [observationError("git_index", indexResult.reason)],
    });
  }
  const indexEntries = indexResult.value.filter((entry) => !isExcluded(entry.path, excludedPaths));

  const dirtyPaths = uniqSorted(
    statusEntries
      .flatMap((entry) => statusEntryPaths(entry))
      .filter((entryPath) => !isExcluded(entryPath, excludedPaths)),
  );
  const pathFingerprints = sortFingerprints(
    await Promise.all(
      dirtyPaths.map((entryPath) => capturePathFingerprint(repositoryRoot, entryPath)),
    ),
  );
  const errors = pathFingerprints.flatMap((entry) => (entry.error ? [entry.error] : []));
  if (errors.length > 0) {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      headCommit,
      statusEntries,
      indexEntries,
      pathFingerprints,
      errors,
    });
  }

  return {
    schema_version: 1,
    provenance: GIT_OBSERVATION_PROVENANCE,
    state: "available",
    repository_root: repositoryRoot,
    captured_at: new Date().toISOString(),
    head_commit: headCommit,
    snapshot_sha256: snapshotDigest({
      head_commit: headCommit,
      excluded_paths: excludedPaths,
      status_entries: statusEntries,
      index_entries: indexEntries,
      path_fingerprints: pathFingerprints,
    }),
    dirty_paths: dirtyPaths,
    excluded_paths: excludedPaths,
    status_entries: statusEntries,
    index_entries: indexEntries,
    path_fingerprints: pathFingerprints,
    errors: [],
  };
}

export async function captureGitSnapshot(input: CaptureGitSnapshotInput): Promise<GitSnapshot> {
  return await materializeGitSnapshot(
    await captureGitSnapshotObservation(input.repository_root),
    input.excluded_roots,
  );
}
