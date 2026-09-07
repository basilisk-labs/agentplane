import { lstat, readdir, realpath } from "node:fs/promises";
import path from "node:path";
import { compareText, repositoryPath } from "./git-snapshot/common.js";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { captureGitSnapshot, type GitSnapshot } from "./git-snapshot.js";
import type { GitIndexEntry, GitPathFingerprint } from "./git-snapshot/model.js";

type KernelSubmoduleObservation = Readonly<{
  path: string;
  kind: "submodule";
  expected_gitlink_sha: string;
  actual_head_sha: string | null;
  initialized: boolean;
  tracked_dirty: boolean | null;
  untracked_dirty: boolean | null;
  working_state: KernelRepositoryObservation | null;
}>;

export type KernelRepositoryObservation = Readonly<{
  schema_version: 1;
  repository_identity: k.Sha256Digest;
  excluded_paths: readonly string[];
  files: readonly (
    | Readonly<{
        path: string;
        kind: "file" | "symlink";
        executable: boolean;
        content_digest: k.Sha256Digest;
      }>
    | KernelSubmoduleObservation
  )[];
  fingerprint: k.Sha256Digest;
}>;

function unavailable(reason: string): never {
  throw Object.assign(new Error(`Canonical repository observation unavailable: ${reason}`), {
    reason_code: reason,
    required_action: "request_fresh_repository_observation",
  });
}

async function observeSubmodule(
  snapshot: GitSnapshot,
  gitlink: GitIndexEntry,
  entry: GitPathFingerprint,
  repositoryIdentity: k.Sha256Digest,
  ancestors: ReadonlySet<string>,
): Promise<KernelSubmoduleObservation> {
  const base = {
    path: gitlink.path,
    kind: "submodule" as const,
    expected_gitlink_sha: gitlink.object_id,
  };
  const uninitialized = (): KernelSubmoduleObservation => ({
    ...base,
    actual_head_sha: null,
    initialized: false,
    tracked_dirty: null,
    untracked_dirty: null,
    working_state: null,
  });
  if (entry.kind === "missing") return uninitialized();
  if (entry.kind !== "directory" || entry.error) unavailable("invalid_submodule_checkout");
  const root = repositoryPath(snapshot.repository_root, gitlink.path);
  const canonicalRoot = await realpath(root);
  const relativeRoot = path.relative(await realpath(snapshot.repository_root), canonicalRoot);
  if (
    !relativeRoot ||
    relativeRoot === ".." ||
    relativeRoot.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativeRoot)
  )
    unavailable("submodule_checkout_escapes_repository");
  if (ancestors.has(canonicalRoot)) unavailable("recursive_submodule_checkout");
  const marker = await lstat(path.join(root, ".git")).catch((error: unknown) => {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") return null;
    throw error;
  });
  if (marker === null) {
    const entries = await readdir(root);
    if (entries.length === 0) return uninitialized();
    unavailable("uninitialized_submodule_has_content");
  }
  if (!marker.isFile() && !marker.isDirectory()) unavailable("invalid_submodule_git_directory");
  const prefix = `${gitlink.path}/`;
  const child = await captureGitSnapshot({
    repository_root: canonicalRoot,
    excluded_roots: snapshot.excluded_paths
      .filter((excluded) => excluded.startsWith(prefix))
      .map((excluded) => excluded.slice(prefix.length)),
    fingerprint_tracked_paths: true,
  });
  const workingState = await projectKernelRepository(
    child,
    repositoryIdentity,
    new Set([...ancestors, canonicalRoot]),
  );
  if (!child.head_commit) unavailable("submodule_head_unavailable");
  return {
    ...base,
    actual_head_sha: child.head_commit,
    initialized: true,
    tracked_dirty: child.status_entries.some((status) => status.index_status !== "?"),
    untracked_dirty: child.status_entries.some((status) => status.index_status === "?"),
    working_state: workingState,
  };
}

/** Native lifecycle commits do not change file identity. A gitlink also binds its checkout HEAD. */
async function projectKernelRepository(
  snapshot: GitSnapshot,
  repositoryIdentity: k.Sha256Digest,
  ancestors: ReadonlySet<string>,
): Promise<KernelRepositoryObservation> {
  if (snapshot.state !== "available" || snapshot.errors.length > 0)
    unavailable("git_observation_failed");
  if (snapshot.index_entries.some((entry) => entry.stage !== 0)) unavailable("unmerged_index");
  const gitlinks = new Map(
    snapshot.index_entries
      .filter((entry) => entry.mode === "160000")
      .map((entry) => [entry.path, entry]),
  );
  const observed = new Set(snapshot.path_fingerprints.map((entry) => entry.path));
  if (snapshot.index_entries.some((entry) => !observed.has(entry.path)))
    unavailable("tracked_content_not_observed");
  const files: KernelRepositoryObservation["files"][number][] = [];
  for (const entry of snapshot.path_fingerprints) {
    const gitlink = gitlinks.get(entry.path);
    if (gitlink) {
      files.push(await observeSubmodule(snapshot, gitlink, entry, repositoryIdentity, ancestors));
      continue;
    }
    if (entry.kind === "missing") continue;
    if (
      (entry.kind !== "file" && entry.kind !== "symlink") ||
      !entry.sha256 ||
      !/^sha256:[0-9a-f]{64}$/u.test(entry.sha256) ||
      entry.mode === null ||
      entry.error
    )
      unavailable("unsupported_path_observation");
    files.push({
      path: entry.path,
      kind: entry.kind,
      executable: entry.kind === "file" && (entry.mode & 0o111) !== 0,
      content_digest: entry.sha256 as k.Sha256Digest,
    });
  }
  const contents = {
    schema_version: 1 as const,
    repository_identity: repositoryIdentity,
    excluded_paths: snapshot.excluded_paths.toSorted(),
    files: files.toSorted((a, b) => compareText(a.path, b.path)),
  };
  return { ...contents, fingerprint: k.kernelDigest(contents) };
}

export async function observeKernelRepository(opts: {
  repository_root: string;
  repository_identity: k.Sha256Digest;
  /** Native runtime configuration only. Never take exclusions from a semantic result. */
  operational_paths: readonly string[];
}): Promise<KernelRepositoryObservation> {
  const capture = async () =>
    projectKernelRepository(
      await captureGitSnapshot({
        repository_root: opts.repository_root,
        excluded_roots: opts.operational_paths,
        fingerprint_tracked_paths: true,
      }),
      opts.repository_identity,
      new Set([await realpath(opts.repository_root)]),
    );
  const before = await capture();
  const after = await capture();
  if (before.fingerprint !== after.fingerprint)
    unavailable("repository_changed_during_observation");
  return after;
}

export function kernelRepositoryChangedPaths(
  before: KernelRepositoryObservation,
  after: KernelRepositoryObservation,
): string[] {
  if (
    before.repository_identity !== after.repository_identity ||
    k.kernelDigest(before.excluded_paths) !== k.kernelDigest(after.excluded_paths)
  )
    unavailable("repository_observation_identity_changed");
  const oldFiles = new Map(before.files.map((entry) => [entry.path, entry]));
  const newFiles = new Map(after.files.map((entry) => [entry.path, entry]));
  return [...new Set([...oldFiles.keys(), ...newFiles.keys()])]
    .toSorted()
    .filter(
      (entry) =>
        k.kernelDigest(oldFiles.get(entry) ?? null) !== k.kernelDigest(newFiles.get(entry) ?? null),
    );
}
