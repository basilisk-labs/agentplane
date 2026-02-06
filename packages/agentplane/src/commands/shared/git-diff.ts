import path from "node:path";

import { execFileAsync, gitEnv } from "./git.js";

export function toGitPath(filePath: string): string {
  return filePath.split(path.sep).join("/");
}

export async function gitShowFile(cwd: string, ref: string, relPath: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["show", `${ref}:${relPath}`], {
    cwd,
    env: gitEnv(),
  });
  return stdout;
}

export async function gitDiffNames(cwd: string, base: string, branch: string): Promise<string[]> {
  const { stdout } = await execFileAsync("git", ["diff", "--name-only", `${base}...${branch}`], {
    cwd,
    env: gitEnv(),
  });
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export async function gitDiffStat(cwd: string, base: string, branch: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["diff", "--stat", `${base}...${branch}`], {
    cwd,
    env: gitEnv(),
  });
  return stdout.trimEnd();
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
  const trimmed = stdout.trim();
  if (!trimmed) return { ahead: 0, behind: 0 };
  const parts = trimmed.split(/\s+/);
  if (parts.length !== 2) return { ahead: 0, behind: 0 };
  const behind = Number.parseInt(parts[0] ?? "0", 10) || 0;
  const ahead = Number.parseInt(parts[1] ?? "0", 10) || 0;
  return { ahead, behind };
}
