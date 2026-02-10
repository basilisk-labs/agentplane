import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { resolveProject } from "../project/project-root.js";

const execFileAsync = promisify(execFile);

async function gitNullSeparatedPaths(cwd: string, args: string[]): Promise<string[]> {
  const { stdout } = await execFileAsync("git", args, {
    cwd,
    encoding: "buffer",
    maxBuffer: 10 * 1024 * 1024,
  });
  const text = Buffer.isBuffer(stdout) ? stdout.toString("utf8") : String(stdout);
  return text
    .split("\0")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

async function gitStagedPathsIncludingRenames(cwd: string): Promise<string[]> {
  // `--name-only` collapses renames to the destination path only, which allows
  // protected-path deletions via `git mv`. `--name-status -z` includes both
  // sides of renames/copies.
  const parts = await gitNullSeparatedPaths(cwd, ["diff", "--name-status", "--cached", "-z"]);
  const out: string[] = [];
  for (let i = 0; i < parts.length; ) {
    const status = parts[i] ?? "";
    const pathA = parts[i + 1] ?? "";
    if (!status || !pathA) break;
    out.push(pathA);
    i += 2;

    const code = status[0] ?? "";
    if (code === "R" || code === "C") {
      const pathB = parts[i] ?? "";
      if (pathB) out.push(pathB);
      i += 1;
    }
  }
  return [...new Set(out)].toSorted((a, b) => a.localeCompare(b));
}

export async function getStagedFiles(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<string[]> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  return await gitStagedPathsIncludingRenames(resolved.gitRoot);
}

export async function getUnstagedFiles(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<string[]> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const [unstaged, untracked] = await Promise.all([
    gitNullSeparatedPaths(resolved.gitRoot, ["diff", "--name-only", "-z"]),
    gitNullSeparatedPaths(resolved.gitRoot, ["ls-files", "--others", "--exclude-standard", "-z"]),
  ]);
  return [...new Set([...unstaged, ...untracked])].toSorted((a, b) => a.localeCompare(b));
}

// Tracked-only dirty check (ignores untracked files). This matches the repo policy
// definition of "clean" used by guardrails: `git status --short --untracked-files=no`.
export async function getUnstagedTrackedFiles(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<string[]> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  return await gitNullSeparatedPaths(resolved.gitRoot, ["diff", "--name-only", "-z"]);
}
