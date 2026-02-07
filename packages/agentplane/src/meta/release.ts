import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getVersion } from "./version.js";

let cachedReleaseDate: string | null | undefined;

function findGitRootSync(startDir: string): string | null {
  let dir = path.resolve(startDir);
  for (;;) {
    if (existsSync(path.join(dir, ".git"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

function resolveGitRootForReleaseLookup(): string | null {
  // Prefer the caller's CWD, but fall back to the package location when invoked
  // outside of the repository.
  const fromCwd = findGitRootSync(process.cwd());
  if (fromCwd) return fromCwd;

  const here = path.dirname(fileURLToPath(import.meta.url));
  const pkgRoot = path.resolve(here, "../../..");
  return findGitRootSync(pkgRoot);
}

export function getReleaseCommitDate(): string | null {
  if (cachedReleaseDate !== undefined) return cachedReleaseDate;

  const version = getVersion();
  const tag = `v${version}`;
  const gitRoot = resolveGitRootForReleaseLookup();
  if (!gitRoot) {
    cachedReleaseDate = null;
    return cachedReleaseDate;
  }

  try {
    const out = execFileSync("git", ["-C", gitRoot, "show", "-s", "--format=%cs", tag], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    cachedReleaseDate = out || null;
    return cachedReleaseDate;
  } catch {
    cachedReleaseDate = null;
    return cachedReleaseDate;
  }
}
