import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import {
  GIT_MAX_BUFFER_BYTES,
  GIT_TIMEOUT_MS,
  buildFingerprintMap,
  buildIndexMap,
  buildStatusMap,
  changedKinds,
  classifyPathChange,
  compareText,
  deltaDigest,
  headChangeMap,
  isExcluded,
  normalizeExcludedRoots,
  normalizeRepositoryRoot,
  observationError,
  pathContentSha256,
  pathState,
  prefixErrors,
  snapshotSummary,
  stableJson,
  unavailableDelta,
  uniqSorted,
} from "./common.js";
import { isRenameStatus, parseNameStatus } from "./parse.js";
import {
  GIT_OBSERVATION_PROVENANCE,
  type CompareGitSnapshotsInput,
  type GitCommitPathChange,
  type GitObservationError,
  type GitSnapshotDelta,
  type GitSnapshotDeltaEntry,
} from "./model.js";

async function resolveHeadChanges(opts: {
  repositoryRoot: string;
  beforeHead: string | null;
  afterHead: string | null;
  excludedPaths: readonly string[];
}): Promise<GitCommitPathChange[]> {
  if (opts.beforeHead === opts.afterHead || opts.afterHead === null) return [];
  const args =
    opts.beforeHead === null
      ? [
          "diff-tree",
          "--root",
          "--no-commit-id",
          "--name-status",
          "-z",
          "-r",
          "--find-renames",
          opts.afterHead,
          "--",
        ]
      : [
          "diff",
          "--name-status",
          "-z",
          "--find-renames",
          "--no-ext-diff",
          opts.beforeHead,
          opts.afterHead,
          "--",
        ];
  const { stdout } = await execFileAsync("git", args, {
    cwd: opts.repositoryRoot,
    env: gitEnv(),
    encoding: "buffer",
    maxBuffer: GIT_MAX_BUFFER_BYTES,
    timeout: GIT_TIMEOUT_MS,
  });
  return parseNameStatus(stdout).filter((entry) =>
    (entry.original_path ? [entry.path, entry.original_path] : [entry.path]).some(
      (entryPath) => !isExcluded(entryPath, opts.excludedPaths),
    ),
  );
}

export async function compareGitSnapshots(
  input: CompareGitSnapshotsInput,
): Promise<GitSnapshotDelta> {
  let repositoryRoot = "";
  let excludedPaths: string[] = [];
  try {
    repositoryRoot = normalizeRepositoryRoot(input.repository_root);
    excludedPaths = normalizeExcludedRoots(
      repositoryRoot,
      input.excluded_roots ?? input.before.excluded_paths,
    );
  } catch (error) {
    return unavailableDelta({
      repositoryRoot,
      before: input.before,
      after: input.after,
      excludedPaths,
      errors: [observationError("comparison_input", error)],
    });
  }

  const inputErrors: GitObservationError[] = [];
  if (path.resolve(input.before.repository_root) !== repositoryRoot) {
    inputErrors.push(
      observationError(
        "comparison_before_root",
        new Error("before snapshot repository_root does not match comparison repository_root"),
      ),
    );
  }
  if (path.resolve(input.after.repository_root) !== repositoryRoot) {
    inputErrors.push(
      observationError(
        "comparison_after_root",
        new Error("after snapshot repository_root does not match comparison repository_root"),
      ),
    );
  }
  if (stableJson(input.before.excluded_paths) !== stableJson(excludedPaths)) {
    inputErrors.push(
      observationError(
        "comparison_before_exclusions",
        new Error("before snapshot excluded_paths do not match comparison excluded_roots"),
      ),
    );
  }
  if (stableJson(input.after.excluded_paths) !== stableJson(excludedPaths)) {
    inputErrors.push(
      observationError(
        "comparison_after_exclusions",
        new Error("after snapshot excluded_paths do not match comparison excluded_roots"),
      ),
    );
  }
  inputErrors.push(
    ...prefixErrors("before", input.before.errors),
    ...prefixErrors("after", input.after.errors),
  );
  if (
    input.before.state !== "available" ||
    input.after.state !== "available" ||
    inputErrors.length > 0
  ) {
    if (inputErrors.length === 0) {
      inputErrors.push(
        observationError(
          "comparison_snapshots",
          new Error("before and after snapshots must both be available"),
        ),
      );
    }
    return unavailableDelta({
      repositoryRoot,
      before: input.before,
      after: input.after,
      excludedPaths,
      errors: inputErrors,
    });
  }

  let headChanges: GitCommitPathChange[];
  try {
    headChanges = await resolveHeadChanges({
      repositoryRoot,
      beforeHead: input.before.head_commit,
      afterHead: input.after.head_commit,
      excludedPaths,
    });
  } catch (error) {
    return unavailableDelta({
      repositoryRoot,
      before: input.before,
      after: input.after,
      excludedPaths,
      errors: [observationError("git_head_diff", error)],
    });
  }

  const beforeStatuses = buildStatusMap(input.before, excludedPaths);
  const afterStatuses = buildStatusMap(input.after, excludedPaths);
  const beforeIndexes = buildIndexMap(input.before, excludedPaths);
  const afterIndexes = buildIndexMap(input.after, excludedPaths);
  const beforeFingerprints = buildFingerprintMap(input.before, excludedPaths);
  const afterFingerprints = buildFingerprintMap(input.after, excludedPaths);
  const headChangesByPath = headChangeMap(headChanges);
  const candidatePaths = new Set<string>([
    ...beforeStatuses.keys(),
    ...afterStatuses.keys(),
    ...beforeFingerprints.keys(),
    ...afterFingerprints.keys(),
    ...headChangesByPath.keys(),
  ]);
  for (const entryPath of new Set([...beforeIndexes.keys(), ...afterIndexes.keys()])) {
    if (
      stableJson(beforeIndexes.get(entryPath) ?? []) !==
      stableJson(afterIndexes.get(entryPath) ?? [])
    ) {
      candidatePaths.add(entryPath);
    }
  }

  const beforeRenameIdentities = new Set(
    input.before.status_entries
      .filter((entry) => isRenameStatus(entry))
      .map((entry) => stableJson(entry)),
  );
  const renamePairs = new Map<
    string,
    {
      originalPath: string;
      path: string;
      statusObserved: boolean;
      headChanges: GitCommitPathChange[];
    }
  >();
  for (const entry of input.after.status_entries.filter((candidate) => isRenameStatus(candidate))) {
    if (
      !entry.original_path ||
      beforeRenameIdentities.has(stableJson(entry)) ||
      isExcluded(entry.path, excludedPaths) ||
      isExcluded(entry.original_path, excludedPaths)
    ) {
      continue;
    }
    renamePairs.set(`${entry.original_path}\0${entry.path}`, {
      originalPath: entry.original_path,
      path: entry.path,
      statusObserved: true,
      headChanges: [],
    });
  }
  for (const entry of headChanges) {
    if (
      !entry.original_path ||
      (!entry.status_code.startsWith("R") && !entry.status_code.startsWith("C")) ||
      isExcluded(entry.path, excludedPaths) ||
      isExcluded(entry.original_path, excludedPaths)
    ) {
      continue;
    }
    const key = `${entry.original_path}\0${entry.path}`;
    const current = renamePairs.get(key);
    renamePairs.set(key, {
      originalPath: entry.original_path,
      path: entry.path,
      statusObserved: current?.statusObserved ?? false,
      headChanges: [...(current?.headChanges ?? []), entry],
    });
  }

  const consumedPaths = new Set<string>();
  const entries: GitSnapshotDeltaEntry[] = [];
  const blobHashCache = new Map<string, string>();
  try {
    for (const pair of [...renamePairs.values()].toSorted((left, right) =>
      compareText(left.path, right.path),
    )) {
      const before = pathState({
        path: pair.originalPath,
        statuses: beforeStatuses,
        indexes: beforeIndexes,
        fingerprints: beforeFingerprints,
      });
      const after = pathState({
        path: pair.path,
        statuses: afterStatuses,
        indexes: afterIndexes,
        fingerprints: afterFingerprints,
      });
      const beforeSha256 = await pathContentSha256(repositoryRoot, before, blobHashCache);
      const afterSha256 = await pathContentSha256(repositoryRoot, after, blobHashCache);
      const changeKinds = changedKinds({
        before,
        after,
        beforeSha256,
        afterSha256,
        headChanges: pair.headChanges,
      });
      if (pair.statusObserved && !changeKinds.includes("status")) changeKinds.push("status");
      if (pair.headChanges.length > 0 && !changeKinds.includes("head")) changeKinds.push("head");
      entries.push({
        path: pair.path,
        original_path: pair.originalPath,
        change: "renamed",
        change_kinds: changeKinds,
        before_sha256: beforeSha256,
        after_sha256: afterSha256,
        before,
        after,
        head_changes: pair.headChanges,
      });
      consumedPaths.add(pair.originalPath);
      consumedPaths.add(pair.path);
    }

    for (const entryPath of [...candidatePaths].toSorted(compareText)) {
      if (consumedPaths.has(entryPath) || isExcluded(entryPath, excludedPaths)) continue;
      const before = pathState({
        path: entryPath,
        statuses: beforeStatuses,
        indexes: beforeIndexes,
        fingerprints: beforeFingerprints,
      });
      const after = pathState({
        path: entryPath,
        statuses: afterStatuses,
        indexes: afterIndexes,
        fingerprints: afterFingerprints,
      });
      const entryHeadChanges = headChangesByPath.get(entryPath) ?? [];
      if (stableJson(before) === stableJson(after) && entryHeadChanges.length === 0) continue;
      const beforeSha256 = await pathContentSha256(repositoryRoot, before, blobHashCache);
      const afterSha256 = await pathContentSha256(repositoryRoot, after, blobHashCache);
      const changeKinds = changedKinds({
        before,
        after,
        beforeSha256,
        afterSha256,
        headChanges: entryHeadChanges,
      });
      entries.push({
        path: entryPath,
        original_path: null,
        change: classifyPathChange({
          before,
          after,
          beforeSha256,
          afterSha256,
          changeKinds,
        }),
        change_kinds: changeKinds,
        before_sha256: beforeSha256,
        after_sha256: afterSha256,
        before,
        after,
        head_changes: entryHeadChanges,
      });
    }
  } catch (error) {
    return unavailableDelta({
      repositoryRoot,
      before: input.before,
      after: input.after,
      excludedPaths,
      errors: [observationError("git_content_hash", error)],
    });
  }

  const sortedEntries = entries.toSorted((left, right) => {
    const pathOrder = compareText(left.path, right.path);
    return pathOrder === 0
      ? compareText(left.original_path ?? "", right.original_path ?? "")
      : pathOrder;
  });
  const changedPaths = uniqSorted(
    sortedEntries.flatMap((entry) =>
      entry.original_path ? [entry.original_path, entry.path] : [entry.path],
    ),
  );
  const beforeSummary = snapshotSummary(input.before);
  const afterSummary = snapshotSummary(input.after);
  const headChanged = input.before.head_commit !== input.after.head_commit;
  return {
    schema_version: 1,
    provenance: GIT_OBSERVATION_PROVENANCE,
    state: "available",
    repository_root: repositoryRoot,
    before: beforeSummary,
    after: afterSummary,
    head_changed: headChanged,
    changed_paths: changedPaths,
    entries: sortedEntries,
    head_changes: headChanges,
    sha256: deltaDigest({
      before: beforeSummary,
      after: afterSummary,
      headChanged,
      changedPaths,
      entries: sortedEntries,
      headChanges,
      excludedPaths,
    }),
    excluded_paths: excludedPaths,
    errors: [],
  };
}
