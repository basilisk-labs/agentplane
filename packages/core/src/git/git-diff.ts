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

function gitDiffRange(base: string, branch: string, range: GitDiffRange = "three-dot"): string {
  return range === "two-dot" ? `${base}..${branch}` : `${base}...${branch}`;
}

export async function gitShowFile(cwd: string, ref: string, relPath: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["show", `${ref}:${relPath}`], {
    cwd,
    env: gitEnv(),
  });
  return String(stdout);
}

export async function gitDiffNames(cwd: string, base: string, branch: string): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["diff", "--name-only", gitDiffRange(base, branch)],
    {
      cwd,
      env: gitEnv(),
    },
  );
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
  const { stdout } = await execFileAsync(
    "git",
    ["diff", "--name-status", gitDiffRange(base, branch, opts?.range)],
    {
      cwd,
      env: gitEnv(),
    },
  );
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
  const { stdout } = await execFileAsync(
    "git",
    ["diff", "--numstat", gitDiffRange(base, branch, opts?.range)],
    {
      cwd,
      env: gitEnv(),
    },
  );
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
  opts?: { excludePaths?: string[] },
): Promise<string> {
  const args = ["diff", "--stat", gitDiffRange(base, branch)];
  const excludePaths = (opts?.excludePaths ?? [])
    .map((relPath) => relPath.trim())
    .filter((relPath) => relPath.length > 0)
    .map((relPath) => `:(exclude)${toGitPath(relPath)}`);
  if (excludePaths.length > 0) {
    args.push("--", ".", ...excludePaths);
  }
  const { stdout } = await execFileAsync("git", args, {
    cwd,
    env: gitEnv(),
  });
  return String(stdout).trimEnd();
}

export async function gitAheadBehind(
  cwd: string,
  base: string,
  branch: string,
): Promise<{ ahead: number; behind: number }> {
  const { stdout } = await execFileAsync(
    "git",
    ["rev-list", "--left-right", "--count", `${base}...${branch}`],
    { cwd, env: gitEnv() },
  );
  const trimmed = String(stdout).trim();
  if (!trimmed) return { ahead: 0, behind: 0 };
  const parts = trimmed.split(/\s+/);
  if (parts.length !== 2) return { ahead: 0, behind: 0 };
  const behind = Number.parseInt(parts[0] ?? "0", 10) || 0;
  const ahead = Number.parseInt(parts[1] ?? "0", 10) || 0;
  return { ahead, behind };
}
