import { realpath } from "node:fs/promises";
import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import {
  GIT_MAX_BUFFER_BYTES,
  GIT_TIMEOUT_MS,
  isExcluded,
  normalizeExcludedRoots,
  normalizeRepositoryRoot,
  observationError,
  sha256,
  sortFingerprints,
  stableJson,
  statusEntryPaths,
  uniqSorted,
} from "./common.js";
import { capturePathFingerprint } from "./path-fingerprint.js";
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

async function captureStatus(repositoryRoot: string): Promise<GitStatusEntry[]> {
  const { stdout } = await execFileAsync(
    "git",
    [
      "status",
      "--porcelain=v1",
      "-z",
      "--untracked-files=all",
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

async function captureIndex(repositoryRoot: string): Promise<GitSnapshot["index_entries"]> {
  const { stdout } = await execFileAsync("git", ["ls-files", "--stage", "-z"], {
    cwd: repositoryRoot,
    env: gitEnv(),
    encoding: "buffer",
    maxBuffer: GIT_MAX_BUFFER_BYTES,
    timeout: GIT_TIMEOUT_MS,
  });
  return parseIndexEntries(stdout);
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

export async function captureGitSnapshot(input: CaptureGitSnapshotInput): Promise<GitSnapshot> {
  let repositoryRoot = "";
  let excludedPaths: string[] = [];
  try {
    repositoryRoot = normalizeRepositoryRoot(input.repository_root);
    excludedPaths = normalizeExcludedRoots(repositoryRoot, input.excluded_roots ?? []);
  } catch (error) {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      errors: [observationError("snapshot_input", error)],
    });
  }

  if (!input.trusted_repository_root) {
    try {
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
    } catch (error) {
      return unavailableSnapshot({
        repositoryRoot,
        excludedPaths,
        errors: [observationError("git_root", error)],
      });
    }
  }

  if (
    typeof input.preobserved_head_commit === "string" &&
    !/^[0-9a-f]{40,64}$/u.test(input.preobserved_head_commit)
  ) {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      errors: [
        observationError("git_head", new Error("preobserved_head_commit is not a commit SHA")),
      ],
    });
  }

  const [headResult, statusResult, indexResult] = await Promise.allSettled([
    Object.hasOwn(input, "preobserved_head_commit")
      ? Promise.resolve(input.preobserved_head_commit ?? null)
      : captureHead(repositoryRoot),
    captureStatus(repositoryRoot),
    captureIndex(repositoryRoot),
  ]);
  const headCommit = headResult.status === "fulfilled" ? headResult.value : null;
  const statusEntries =
    statusResult.status === "fulfilled"
      ? statusResult.value.filter((entry) =>
          statusEntryPaths(entry).some((entryPath) => !isExcluded(entryPath, excludedPaths)),
        )
      : [];
  const indexEntries =
    indexResult.status === "fulfilled"
      ? indexResult.value.filter((entry) => !isExcluded(entry.path, excludedPaths))
      : [];
  const observationErrors = [
    ...(headResult.status === "rejected" ? [observationError("git_head", headResult.reason)] : []),
    ...(statusResult.status === "rejected"
      ? [observationError("git_status", statusResult.reason)]
      : []),
    ...(indexResult.status === "rejected"
      ? [observationError("git_index", indexResult.reason)]
      : []),
  ];
  if (observationErrors.length > 0) {
    return unavailableSnapshot({
      repositoryRoot,
      excludedPaths,
      headCommit,
      statusEntries,
      indexEntries,
      errors: observationErrors,
    });
  }

  const dirtyPaths = uniqSorted(
    statusEntries
      .flatMap((entry) => statusEntryPaths(entry))
      .filter((entryPath) => !isExcluded(entryPath, excludedPaths)),
  );
  const fingerprintPaths = input.fingerprint_tracked_paths
    ? uniqSorted([...dirtyPaths, ...indexEntries.map((entry) => entry.path)])
    : dirtyPaths;
  // Bound open file descriptors when canonical identity includes every tracked path.
  const observed: GitPathFingerprint[] = [];
  for (let offset = 0; offset < fingerprintPaths.length; offset += 32) {
    observed.push(
      ...(await Promise.all(
        fingerprintPaths
          .slice(offset, offset + 32)
          .map((entryPath) => capturePathFingerprint(repositoryRoot, entryPath)),
      )),
    );
  }
  const pathFingerprints = sortFingerprints(observed);
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

export function projectGitSnapshot(
  snapshot: GitSnapshot,
  excludedRoots: readonly string[],
): GitSnapshot {
  const excludedPaths = uniqSorted([
    ...snapshot.excluded_paths,
    ...normalizeExcludedRoots(snapshot.repository_root, excludedRoots),
  ]);
  const statusEntries = snapshot.status_entries.filter((entry) =>
    statusEntryPaths(entry).some((entryPath) => !isExcluded(entryPath, excludedPaths)),
  );
  const indexEntries = snapshot.index_entries.filter(
    (entry) => !isExcluded(entry.path, excludedPaths),
  );
  const pathFingerprints = snapshot.path_fingerprints.filter(
    (entry) => !isExcluded(entry.path, excludedPaths),
  );
  const dirtyPaths = uniqSorted(
    statusEntries
      .flatMap((entry) => statusEntryPaths(entry))
      .filter((entryPath) => !isExcluded(entryPath, excludedPaths)),
  );
  return {
    ...snapshot,
    dirty_paths: dirtyPaths,
    excluded_paths: excludedPaths,
    status_entries: statusEntries,
    index_entries: indexEntries,
    path_fingerprints: pathFingerprints,
    snapshot_sha256:
      snapshot.state === "available"
        ? snapshotDigest({
            head_commit: snapshot.head_commit,
            excluded_paths: excludedPaths,
            status_entries: statusEntries,
            index_entries: indexEntries,
            path_fingerprints: pathFingerprints,
          })
        : null,
  };
}
