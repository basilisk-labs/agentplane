import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

type DirectWorkLock = {
  task_id: string;
  agent: string;
  slug: string;
  branch: string;
  started_at: string;
};

export function directWorkLockPath(agentplaneDir: string): string {
  // Intentionally under cache/ so it stays out of git by default.
  return path.join(agentplaneDir, "cache", "direct-work.json");
}

export async function readDirectWorkLock(agentplaneDir: string): Promise<DirectWorkLock | null> {
  try {
    const text = await readFile(directWorkLockPath(agentplaneDir), "utf8");
    const parsed = JSON.parse(text) as Partial<DirectWorkLock>;
    if (!parsed || typeof parsed !== "object") return null;
    if (
      typeof parsed.task_id !== "string" ||
      typeof parsed.agent !== "string" ||
      typeof parsed.slug !== "string" ||
      typeof parsed.branch !== "string" ||
      typeof parsed.started_at !== "string"
    ) {
      return null;
    }
    return parsed as DirectWorkLock;
  } catch {
    return null;
  }
}

export async function writeDirectWorkLock(
  agentplaneDir: string,
  lock: DirectWorkLock,
): Promise<void> {
  const dir = path.dirname(directWorkLockPath(agentplaneDir));
  await mkdir(dir, { recursive: true });
  await writeFile(directWorkLockPath(agentplaneDir), JSON.stringify(lock, null, 2) + "\n", "utf8");
}

export async function ensureGitClean(gitRoot: string): Promise<void> {
  const { stdout } = await execFileAsync("git", ["status", "--porcelain"], {
    cwd: gitRoot,
    env: gitEnv(),
  });
  const lines = stdout
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0);
  if (lines.length === 0) return;

  // Allow task workflow artifacts to be dirty. In direct mode we want a single-stream
  // workflow without task branches, but we still expect task docs to change.
  const allowedPrefixes = [
    ".agentplane/tasks/",
    ".agentplane/tasks.json",
    ".agentplane/cache/",
    ".agentplane/cache.sqlite",
    ".agentplane/.upgrade/",
    ".agentplane/upgrade/",
  ];
  const isAllowed = (p: string): boolean => allowedPrefixes.some((prefix) => p.startsWith(prefix));

  const dirty = lines
    .map((line) => {
      // Format: XY <path> (we only need the path-ish tail).
      const rest = line.slice(2).trim();
      if (!rest) return "";
      // Rename/copy format: "old -> new"
      const arrow = rest.lastIndexOf(" -> ");
      if (arrow === -1) return rest;
      return rest.slice(arrow + 4).trim();
    })
    .filter((p) => p.length > 0 && !isAllowed(p));

  if (dirty.length === 0) return;
  throw new CliError({
    exitCode: exitCodeForError("E_GIT"),
    code: "E_GIT",
    message:
      "Working tree has non-task changes. In workflow_mode=direct, agentplane runs tasks in a single stream on the current branch; commit/stash your changes before starting a different task.",
  });
}
