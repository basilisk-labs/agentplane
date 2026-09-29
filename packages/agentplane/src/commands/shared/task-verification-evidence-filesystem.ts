import { constants as fsConstants, type BigIntStats } from "node:fs";
import { open, readdir, readlink, realpath, stat } from "node:fs/promises";
import path from "node:path";

import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import { verificationInputSha256 as sha256 } from "./task-verification-input-digests.js";

export function isPathWithinRoot(root: string, candidate: string): boolean {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function isSameEntry(left: BigIntStats, right: BigIntStats): boolean {
  return left.dev === right.dev && left.ino === right.ino;
}

function isStableEntry(left: BigIntStats, right: BigIntStats): boolean {
  return (
    isSameEntry(left, right) &&
    left.size === right.size &&
    left.mtimeNs === right.mtimeNs &&
    left.ctimeNs === right.ctimeNs
  );
}

async function pathStillNamesOpenedEntry(opts: {
  canonicalRoot: string;
  resolvedPath: string;
  openedStat: BigIntStats;
}): Promise<boolean> {
  const currentPath = await realpath(opts.resolvedPath).catch(() => null);
  if (!currentPath || !isPathWithinRoot(opts.canonicalRoot, currentPath)) return false;
  const currentStat = await stat(currentPath, { bigint: true }).catch(() => null);
  return currentStat !== null && isSameEntry(opts.openedStat, currentStat);
}

export async function hashVerificationEvidenceFilesystemEntry(opts: {
  gitRoot: string;
  absolutePath: string;
  ancestors?: ReadonlySet<string>;
  canonicalRoot?: string;
}): Promise<`sha256:${string}` | null> {
  const canonicalRoot =
    opts.canonicalRoot ?? (await realpath(opts.gitRoot).catch(() => path.resolve(opts.gitRoot)));
  const resolvedPath = await realpath(opts.absolutePath).catch(() => null);
  if (!resolvedPath || !isPathWithinRoot(canonicalRoot, resolvedPath)) return null;

  const entryKey = path.resolve(opts.absolutePath);
  if (opts.ancestors?.has(entryKey)) return sha256(`cycle\0${entryKey}`);
  const ancestors = new Set(opts.ancestors);
  ancestors.add(entryKey);
  const link = await readlink(opts.absolutePath).catch(() => null);
  if (link !== null) {
    const confirmedTarget = await realpath(opts.absolutePath).catch(() => null);
    if (confirmedTarget !== resolvedPath) return null;
    const targetDigest = await hashVerificationEvidenceFilesystemEntry({
      gitRoot: opts.gitRoot,
      absolutePath: resolvedPath,
      ancestors,
      canonicalRoot,
    });
    return targetDigest ? sha256(`symlink\0${link}\0${targetDigest}`) : null;
  }

  const handle = await open(resolvedPath, fsConstants.O_RDONLY | fsConstants.O_NOFOLLOW).catch(
    () => null,
  );
  if (!handle) return null;
  try {
    const before = await handle.stat({ bigint: true });
    if (!(await pathStillNamesOpenedEntry({ canonicalRoot, resolvedPath, openedStat: before }))) {
      return null;
    }
    if (before.isFile()) {
      const contents = await handle.readFile();
      const after = await handle.stat({ bigint: true });
      if (!isStableEntry(before, after)) return null;
      return sha256(contents);
    }
    if (!before.isDirectory()) return sha256(`unsupported\0${String(before.mode)}`);

    const entries = await readdir(resolvedPath, { withFileTypes: true });
    const identities = await Promise.all(
      entries
        .toSorted((left, right) => left.name.localeCompare(right.name))
        .map(async (entry) => ({
          name: entry.name,
          digest: await hashVerificationEvidenceFilesystemEntry({
            gitRoot: opts.gitRoot,
            absolutePath: path.join(resolvedPath, entry.name),
            ancestors,
            canonicalRoot,
          }),
        })),
    );
    const after = await handle.stat({ bigint: true });
    if (
      !isStableEntry(before, after) ||
      !(await pathStillNamesOpenedEntry({ canonicalRoot, resolvedPath, openedStat: before }))
    ) {
      return null;
    }
    return sha256(JSON.stringify(canonicalizeJson(identities)));
  } finally {
    await handle.close();
  }
}
