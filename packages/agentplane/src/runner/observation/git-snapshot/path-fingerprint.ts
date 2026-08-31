import { lstat, readlink, realpath } from "node:fs/promises";
import path from "node:path";
import { observationError, repositoryPath, sha256, sha256File } from "./common.js";
import type { GitPathFingerprint } from "./model.js";

export async function capturePathFingerprint(
  repositoryRoot: string,
  gitPath: string,
): Promise<GitPathFingerprint> {
  const absolutePath = repositoryPath(repositoryRoot, gitPath);
  let stats;
  try {
    // A tracked parent can be replaced by a symlink. Never follow it outside the checkout.
    const [root, parent] = await Promise.all([
      realpath(repositoryRoot),
      realpath(path.dirname(absolutePath)),
    ]);
    const relative = path.relative(root, parent);
    if (relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative))
      throw new Error("Git path parent escapes repository root");
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
