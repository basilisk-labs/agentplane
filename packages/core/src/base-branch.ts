import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { resolveProject } from "./project-root.js";

const execFileAsync = promisify(execFile);

const DEFAULT_BASE_BRANCH = "main";
const GIT_CONFIG_BASE_BRANCH_KEY = "agentplane.baseBranch";

async function gitConfigGet(cwd: string, key: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["config", "--local", "--get", key], { cwd });
    const trimmed = stdout.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return null;
    throw err;
  }
}

async function gitConfigSet(cwd: string, key: string, value: string): Promise<void> {
  await execFileAsync("git", ["config", "--local", key, value], { cwd });
}

export async function getPinnedBaseBranch(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<string | null> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  return await gitConfigGet(resolved.gitRoot, GIT_CONFIG_BASE_BRANCH_KEY);
}

export async function getBaseBranch(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<string> {
  const pinned = await getPinnedBaseBranch(opts);
  return pinned ?? DEFAULT_BASE_BRANCH;
}

export async function setPinnedBaseBranch(opts: {
  cwd: string;
  rootOverride?: string | null;
  value: string;
}): Promise<string> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const trimmed = opts.value.trim();
  if (trimmed.length === 0) throw new Error("base branch must be non-empty");
  await gitConfigSet(resolved.gitRoot, GIT_CONFIG_BASE_BRANCH_KEY, trimmed);
  return trimmed;
}
