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
): Promise<PathIdentity[]> {
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
    const stats = await lstat(current, { bigint: true });
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
  return identities;
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

function convertDisappearedPath(error: unknown, filePath: string, label: string): never {
  if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
    throw unsafeObservation(`Refusing changed ${label} path: ${filePath}`);
  }
  throw error;
}

export async function readContainedStableTextNoFollow(opts: {
  repository_root: string;
  file_path: string;
  label: string;
  max_bytes: number;
  /** @internal Deterministic race injection for security regression tests. */
  after_containment_check?: () => Promise<void>;
}): Promise<string> {
  const repositoryRootInput = path.resolve(opts.repository_root);
  const filePathInput = path.resolve(opts.file_path);
  const relativePath = relativeDescendant(repositoryRootInput, filePathInput, opts.label);
  const repositoryRoot = await realpath(repositoryRootInput);
  const filePath = path.join(repositoryRoot, relativePath);
  const beforeChain = await capturePathChain(repositoryRoot, filePath, opts.label);
  const expectedIdentity = beforeChain.at(-1);
  if (!expectedIdentity) {
    throw unsafeObservation(`Refusing invalid ${opts.label} path: ${filePath}`);
  }

  try {
    const beforeRealpaths = await resolveContainedRealpaths(repositoryRoot, filePath, opts.label);
    await opts.after_containment_check?.();
    const contents = await readStableRegularTextNoFollow(filePath, opts.label, {
      max_bytes: opts.max_bytes,
      expected_identity: expectedIdentity,
    });
    const afterChain = await capturePathChain(repositoryRoot, filePath, opts.label);
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
