import { lstat, realpath } from "node:fs/promises";
import path from "node:path";

import { readStableRegularTextNoFollow, type StableFileIdentity } from "./stable-file.js";

type PathIdentity = StableFileIdentity & {
  path: string;
  ctime_ns: bigint;
  mtime_ns: bigint;
};

type ContainedRealpaths = {
  repository_root: string;
  file_path: string;
};

export type ContainedPathChainIdentity = {
  repository_root: string;
  file_path: string;
  target_exists: boolean;
  identities: PathIdentity[];
};

function unsafeObservation(message: string): NodeJS.ErrnoException {
  const error = new Error(message) as NodeJS.ErrnoException;
  error.code = "ELOOP";
  return error;
}

function relativeDescendant(root: string, target: string, label: string): string {
  const relative = path.relative(root, target);
  if (
    relative === "" ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw unsafeObservation(`Refusing ${label} outside the repository: ${target}`);
  }
  return relative;
}

async function capturePathChain(
  repositoryRoot: string,
  target: string,
  label: string,
  allowMissingTarget = false,
): Promise<{ identities: PathIdentity[]; targetExists: boolean }> {
  const parts = relativeDescendant(repositoryRoot, target, label).split(path.sep);
  const rootStats = await lstat(repositoryRoot, { bigint: true });
  if (rootStats.isSymbolicLink() || !rootStats.isDirectory()) {
    throw unsafeObservation(`Refusing non-directory repository root: ${repositoryRoot}`);
  }
  const identities: PathIdentity[] = [
    {
      path: repositoryRoot,
      dev: BigInt(rootStats.dev),
      ino: BigInt(rootStats.ino),
      ctime_ns: BigInt(rootStats.ctimeNs),
      mtime_ns: BigInt(rootStats.mtimeNs),
    },
  ];
  let current = repositoryRoot;
  for (const [index, part] of parts.entries()) {
    current = path.join(current, part);
    let stats;
    try {
      stats = await lstat(current, { bigint: true });
    } catch (error) {
      if (
        allowMissingTarget &&
        index === parts.length - 1 &&
        (error as NodeJS.ErrnoException | null)?.code === "ENOENT"
      ) {
        return { identities, targetExists: false };
      }
      throw error;
    }
    if (stats.isSymbolicLink()) {
      throw unsafeObservation(`Refusing symlinked ${label} path: ${current}`);
    }
    if (index < parts.length - 1 && !stats.isDirectory()) {
      throw unsafeObservation(`Refusing non-directory ${label} ancestor: ${current}`);
    }
    if (index === parts.length - 1 && !stats.isFile()) {
      throw unsafeObservation(`Refusing non-regular ${label}: ${current}`);
    }
    identities.push({
      path: current,
      dev: BigInt(stats.dev),
      ino: BigInt(stats.ino),
      ctime_ns: BigInt(stats.ctimeNs),
      mtime_ns: BigInt(stats.mtimeNs),
    });
  }
  return { identities, targetExists: true };
}

async function resolveContainedRealpaths(
  repositoryRoot: string,
  target: string,
  label: string,
): Promise<ContainedRealpaths> {
  const [realRoot, realTarget] = await Promise.all([realpath(repositoryRoot), realpath(target)]);
  relativeDescendant(realRoot, realTarget, label);
  return {
    repository_root: realRoot,
    file_path: realTarget,
  };
}

function samePathChain(left: readonly PathIdentity[], right: readonly PathIdentity[]): boolean {
  return (
    left.length === right.length &&
    left.every(
      (entry, index) =>
        entry.path === right[index]?.path &&
        entry.dev === right[index]?.dev &&
        entry.ino === right[index]?.ino &&
        entry.ctime_ns === right[index]?.ctime_ns &&
        entry.mtime_ns === right[index]?.mtime_ns,
    )
  );
}

function samePathChainIdentity(
  left: readonly PathIdentity[],
  right: readonly PathIdentity[],
): boolean {
  return (
    left.length === right.length &&
    left.every(
      (entry, index) =>
        entry.path === right[index]?.path &&
        entry.dev === right[index]?.dev &&
        entry.ino === right[index]?.ino,
    )
  );
}

function convertDisappearedPath(error: unknown, filePath: string, label: string): never {
  if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
    throw unsafeObservation(`Refusing changed ${label} path: ${filePath}`);
  }
  throw error;
}

export async function captureContainedPathChainIdentity(opts: {
  repository_root: string;
  file_path: string;
  label: string;
}): Promise<ContainedPathChainIdentity> {
  const repositoryRootInput = path.resolve(opts.repository_root);
  const filePathInput = path.resolve(opts.file_path);
  const relativePath = relativeDescendant(repositoryRootInput, filePathInput, opts.label);
  const repositoryRoot = await realpath(repositoryRootInput);
  const filePath = path.join(repositoryRoot, relativePath);
  const captured = await capturePathChain(repositoryRoot, filePath, opts.label, true);
  return {
    repository_root: repositoryRoot,
    file_path: filePath,
    target_exists: captured.targetExists,
    identities: captured.identities,
  };
}

export async function assertContainedPathChainIdentityUnchanged(
  expected: ContainedPathChainIdentity,
  label: string,
): Promise<void> {
  try {
    const observed = await capturePathChain(
      expected.repository_root,
      expected.file_path,
      label,
      true,
    );
    if (
      observed.targetExists !== expected.target_exists ||
      !samePathChainIdentity(expected.identities, observed.identities)
    ) {
      throw unsafeObservation(`Refusing changed ${label} path: ${expected.file_path}`);
    }
  } catch (error) {
    convertDisappearedPath(error, expected.file_path, label);
  }
}

export async function readContainedStableTextNoFollow(opts: {
  repository_root: string;
  file_path: string;
  label: string;
  max_bytes: number;
  expected_identity?: StableFileIdentity;
  /** @internal Deterministic race injection for security regression tests. */
  after_containment_check?: () => Promise<void>;
}): Promise<string> {
  const repositoryRootInput = path.resolve(opts.repository_root);
  const filePathInput = path.resolve(opts.file_path);
  const relativePath = relativeDescendant(repositoryRootInput, filePathInput, opts.label);
  const repositoryRoot = await realpath(repositoryRootInput);
  const filePath = path.join(repositoryRoot, relativePath);
  const beforeCapture = await capturePathChain(repositoryRoot, filePath, opts.label);
  const beforeChain = beforeCapture.identities;
  const expectedIdentity = beforeChain.at(-1);
  if (!expectedIdentity) {
    throw unsafeObservation(`Refusing invalid ${opts.label} path: ${filePath}`);
  }
  if (
    opts.expected_identity &&
    (opts.expected_identity.dev !== expectedIdentity.dev ||
      opts.expected_identity.ino !== expectedIdentity.ino)
  ) {
    throw unsafeObservation(`${opts.label} path changed before it could be read: ${filePath}`);
  }

  try {
    const beforeRealpaths = await resolveContainedRealpaths(repositoryRoot, filePath, opts.label);
    await opts.after_containment_check?.();
    const contents = await readStableRegularTextNoFollow(filePath, opts.label, {
      max_bytes: opts.max_bytes,
      expected_identity: expectedIdentity,
    });
    const afterCapture = await capturePathChain(repositoryRoot, filePath, opts.label);
    const afterChain = afterCapture.identities;
    const afterRealpaths = await resolveContainedRealpaths(repositoryRoot, filePath, opts.label);
    if (
      beforeRealpaths.repository_root !== afterRealpaths.repository_root ||
      beforeRealpaths.file_path !== afterRealpaths.file_path ||
      !samePathChain(beforeChain, afterChain)
    ) {
      throw unsafeObservation(`Refusing changed ${opts.label} path: ${filePath}`);
    }
    return contents;
  } catch (error) {
    convertDisappearedPath(error, filePath, opts.label);
  }
}
