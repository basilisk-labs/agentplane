import path from "node:path";

import { execFileAsync } from "../process/run-process.js";
import { gitEnv } from "./git-client.js";

export type GitDiffRange = "two-dot" | "three-dot";

export type GitDiffNameStatusEntry = {
  statusCode: string;
  path: string;
};

export type GitDiffNumstatEntry = {
  insertions: number;
  deletions: number;
  path: string;
};

export function toGitPath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

function assertSafeGitPath(relPath: string): void {
  if (!relPath || relPath.includes("\0")) throw new Error("git path must be non-empty");
  if (path.isAbsolute(relPath) || relPath.split(/[\\/]/u).includes("..")) {
    throw new Error(`git path must be repository-relative: ${relPath}`);
  }
}

function assertSafeGitRef(ref: string): void {
  if (ref.length === 0 || ref !== ref.trim()) throw new Error("git ref must be non-empty");
  if (/[\0\r\n\s]/u.test(ref)) throw new Error("git ref contains invalid whitespace");
  if (ref.startsWith("-")) throw new Error("git ref must not start with an option prefix");
  if (
    ref.includes("..") ||
    ref.includes("@{") ||
    /[\\:^~?*]/u.test(ref) ||
    ref.includes("[") ||
    ref.endsWith("/") ||
    ref.endsWith(".") ||
    ref.endsWith(".lock")
  ) {
    throw new Error(`git ref is not safe: ${ref}`);
  }
}

async function resolveDiffBase(
  cwd: string,
  base: string,
  branch: string,
  range: GitDiffRange = "three-dot",
  timeoutMs?: number,
): Promise<string> {
  assertSafeGitRef(base);
  assertSafeGitRef(branch);
  if (range === "two-dot") return base;
  const { stdout } = await execFileAsync("git", ["merge-base", base, branch], {
    cwd,
    env: gitEnv(),
    ...(timeoutMs === undefined ? {} : { timeout: timeoutMs }),
  });
  const mergeBase = String(stdout).trim();
  if (!mergeBase) throw new Error("Failed to resolve git merge-base");
  return mergeBase;
}

export async function gitShowFile(cwd: string, ref: string, relPath: string): Promise<string> {
  assertSafeGitRef(ref);
  assertSafeGitPath(relPath);
  const { stdout: lsTreeOut } = await execFileAsync(
    "git",
    ["ls-tree", "-z", ref, "--", toGitPath(relPath)],
    {
      cwd,
      env: gitEnv(),
      encoding: "buffer",
    },
  );
  const entry = Buffer.isBuffer(lsTreeOut) ? lsTreeOut.toString("utf8") : String(lsTreeOut);
  const match = /\bblob\s+([0-9a-f]{40,64})\t/u.exec(entry);
  const blob = match?.[1];
  if (!blob) throw new Error(`Failed to resolve git blob: ${relPath}`);

  const { stdout } = await execFileAsync("git", ["cat-file", "blob", blob], { cwd, env: gitEnv() });
  return String(stdout);
}

export async function gitDiffNames(
  cwd: string,
  base: string,
  branch: string,
  opts?: { timeoutMs?: number },
): Promise<string[]> {
  const diffBase = await resolveDiffBase(cwd, base, branch, "three-dot", opts?.timeoutMs);
  const { stdout } = await execFileAsync("git", ["diff", "--name-only", diffBase, branch], {
    cwd,
    env: gitEnv(),
    ...(opts?.timeoutMs === undefined ? {} : { timeout: opts.timeoutMs }),
  });
  return String(stdout)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export async function gitDiffNameStatus(
  cwd: string,
  base: string,
  branch: string,
  opts?: { range?: GitDiffRange },
): Promise<GitDiffNameStatusEntry[]> {
  const diffBase = await resolveDiffBase(cwd, base, branch, opts?.range);
  const { stdout } = await execFileAsync("git", ["diff", "--name-status", diffBase, branch], {
    cwd,
    env: gitEnv(),
  });
  return String(stdout)
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [statusCode = "", ...rest] = line.split("\t");
      return {
        statusCode,
        path: rest.at(-1) ?? "unknown",
      };
    });
}

export async function gitDiffNumstat(
  cwd: string,
  base: string,
  branch: string,
  opts?: { range?: GitDiffRange },
): Promise<GitDiffNumstatEntry[]> {
  const diffBase = await resolveDiffBase(cwd, base, branch, opts?.range);
  const { stdout } = await execFileAsync("git", ["diff", "--numstat", diffBase, branch], {
    cwd,
    env: gitEnv(),
  });
  return String(stdout)
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [added, removed, filePath] = line.split("\t");
      return {
        insertions: Number.parseInt(added ?? "0", 10) || 0,
        deletions: Number.parseInt(removed ?? "0", 10) || 0,
        path: filePath ?? "unknown",
      };
    });
}

export async function gitDiffStat(
  cwd: string,
  base: string,
  branch: string,
  opts?: { excludePaths?: string[]; timeoutMs?: number },
): Promise<string> {
  const diffBase = await resolveDiffBase(cwd, base, branch, "three-dot", opts?.timeoutMs);
  const excludePaths = (opts?.excludePaths ?? [])
    .map((relPath) => relPath.trim())
    .filter((relPath) => relPath.length > 0);
  const args = ["diff", "--stat", diffBase, branch];
  if (excludePaths.length > 0) {
    for (const relPath of excludePaths) assertSafeGitPath(relPath);
    const excluded = new Set(excludePaths.map((relPath) => toGitPath(relPath)));
    const changedPaths = await gitDiffNames(cwd, base, branch, { timeoutMs: opts?.timeoutMs });
    const includedPaths = changedPaths
      .map((relPath) => relPath.trim())
      .filter((relPath) => relPath.length > 0)
      .filter((relPath) => {
        assertSafeGitPath(relPath);
        const gitPath = toGitPath(relPath);
        return ![...excluded].some((excludedPath) => {
          return gitPath === excludedPath || gitPath.startsWith(`${excludedPath}/`);
        });
      });
    if (includedPaths.length === 0) return "";
    args.push("--", ...includedPaths.map((relPath) => toGitPath(relPath)));
  }
  const { stdout } = await execFileAsync("git", args, {
    cwd,
    env: gitEnv(),
    ...(opts?.timeoutMs === undefined ? {} : { timeout: opts.timeoutMs }),
  });
  return String(stdout).trimEnd();
}

export async function gitAheadBehind(
  cwd: string,
  base: string,
  branch: string,
): Promise<{ ahead: number; behind: number }> {
  const [{ stdout: aheadOut }, { stdout: behindOut }] = await Promise.all([
    execFileAsync("git", ["rev-list", "--count", branch, "--not", base], { cwd, env: gitEnv() }),
    execFileAsync("git", ["rev-list", "--count", base, "--not", branch], { cwd, env: gitEnv() }),
  ]);
  const ahead = Number.parseInt(String(aheadOut).trim(), 10) || 0;
  const behind = Number.parseInt(String(behindOut).trim(), 10) || 0;
  return { ahead, behind };
}
