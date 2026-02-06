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

export async function getStagedFiles(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<string[]> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  return await gitNullSeparatedPaths(resolved.gitRoot, ["diff", "--name-only", "--cached", "-z"]);
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
