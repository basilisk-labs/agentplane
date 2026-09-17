import { constants as fsConstants } from "node:fs";
import { open, readdir, readlink, realpath } from "node:fs/promises";
import path from "node:path";

import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import { verificationInputSha256 as sha256 } from "./task-verification-input-digests.js";

export function isPathWithinRoot(root: string, candidate: string): boolean {
  const relative = path.relative(path.resolve(root), path.resolve(candidate));
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

export async function hashVerificationEvidenceFilesystemEntry(opts: {
  gitRoot: string;
  absolutePath: string;
  ancestors?: ReadonlySet<string>;
}): Promise<`sha256:${string}` | null> {
  const entryKey = path.resolve(opts.absolutePath);
  if (opts.ancestors?.has(entryKey)) return sha256(`cycle\0${entryKey}`);
  const ancestors = new Set(opts.ancestors);
  ancestors.add(entryKey);
  const link = await readlink(opts.absolutePath).catch(() => null);
  if (link !== null) {
    const resolved = await realpath(opts.absolutePath).catch(() => null);
    if (!resolved || !isPathWithinRoot(opts.gitRoot, resolved)) return null;
    const targetDigest = await hashVerificationEvidenceFilesystemEntry({
      gitRoot: opts.gitRoot,
      absolutePath: resolved,
      ancestors,
    });
    return targetDigest ? sha256(`symlink\0${link}\0${targetDigest}`) : null;
  }

  const handle = await open(opts.absolutePath, fsConstants.O_RDONLY | fsConstants.O_NOFOLLOW).catch(
    () => null,
  );
  if (!handle) return null;
  let isDirectory = false;
  try {
    const before = await handle.stat({ bigint: true });
    if (before.isFile()) {
      const contents = await handle.readFile();
      const after = await handle.stat({ bigint: true });
      if (
        before.dev !== after.dev ||
        before.ino !== after.ino ||
        before.size !== after.size ||
        before.mtimeNs !== after.mtimeNs ||
        before.ctimeNs !== after.ctimeNs
      ) {
        return null;
      }
      return sha256(contents);
    }
    isDirectory = before.isDirectory();
    if (!isDirectory) return sha256(`unsupported\0${String(before.mode)}`);
  } finally {
    await handle.close();
  }

  const entries = await readdir(opts.absolutePath, { withFileTypes: true });
  const identities = await Promise.all(
    entries
      .toSorted((left, right) => left.name.localeCompare(right.name))
      .map(async (entry) => ({
        name: entry.name,
        digest: await hashVerificationEvidenceFilesystemEntry({
          gitRoot: opts.gitRoot,
          absolutePath: path.join(opts.absolutePath, entry.name),
          ancestors,
        }),
      })),
  );
  return sha256(JSON.stringify(canonicalizeJson(identities)));
}
