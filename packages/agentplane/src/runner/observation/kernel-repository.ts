import { compareText } from "./git-snapshot/common.js";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { captureGitSnapshot, type GitSnapshot } from "./git-snapshot.js";

export type KernelRepositoryObservation = Readonly<{
  schema_version: 1;
  repository_identity: k.Sha256Digest;
  excluded_paths: readonly string[];
  files: readonly Readonly<{
    path: string;
    kind: "file" | "symlink";
    executable: boolean;
    content_digest: k.Sha256Digest;
  }>[];
  fingerprint: k.Sha256Digest;
}>;

function unavailable(reason: string): never {
  throw Object.assign(new Error(`Canonical repository observation unavailable: ${reason}`), {
    reason_code: reason,
    required_action: "request_fresh_repository_observation",
  });
}

/** Content identity excludes native operational paths, never HEAD or index lifecycle state. */
export function projectKernelRepository(
  snapshot: GitSnapshot,
  repositoryIdentity: k.Sha256Digest,
): KernelRepositoryObservation {
  if (snapshot.state !== "available" || snapshot.errors.length > 0)
    unavailable("git_observation_failed");
  if (snapshot.index_entries.some((entry) => entry.stage !== 0)) unavailable("unmerged_index");
  // A gitlink alone cannot prove its checkout contents. Fail closed until observed by a submodule adapter.
  if (snapshot.index_entries.some((entry) => entry.mode === "160000"))
    unavailable("submodule_observation_required");
  const observed = new Set(snapshot.path_fingerprints.map((entry) => entry.path));
  if (snapshot.index_entries.some((entry) => !observed.has(entry.path)))
    unavailable("tracked_content_not_observed");
  const files = snapshot.path_fingerprints
    .filter((entry) => entry.kind !== "missing")
    .map((entry) => {
      if (
        (entry.kind !== "file" && entry.kind !== "symlink") ||
        !entry.sha256 ||
        !/^sha256:[0-9a-f]{64}$/u.test(entry.sha256) ||
        entry.mode === null ||
        entry.error
      )
        unavailable("unsupported_path_observation");
      return {
        path: entry.path,
        kind: entry.kind,
        executable: entry.kind === "file" && (entry.mode & 0o111) !== 0,
        content_digest: entry.sha256 as k.Sha256Digest,
      };
    })
    .toSorted((a, b) => compareText(a.path, b.path));
  const contents = {
    schema_version: 1 as const,
    repository_identity: repositoryIdentity,
    excluded_paths: snapshot.excluded_paths.toSorted(),
    files,
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
