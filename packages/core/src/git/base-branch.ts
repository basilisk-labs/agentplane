import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { resolveProject } from "../project/project-root.js";
import type { WorkflowMode } from "../config/config.js";

const execFileAsync = promisify(execFile);

const DEFAULT_BASE_BRANCH = "main";
const GIT_CONFIG_BASE_BRANCH_KEY = "agentplane.baseBranch";
const LEGACY_DEFAULT_BASE_BRANCH = "master";

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

async function gitConfigUnset(cwd: string, key: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["config", "--local", "--unset", key], { cwd });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1 || code === 5) return false;
    throw err;
  }
}

async function gitLocalBranchExists(cwd: string, branch: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["show-ref", "--verify", "--quiet", `refs/heads/${branch}`], {
      cwd,
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    throw err;
  }
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

export async function clearPinnedBaseBranch(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<boolean> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  return await gitConfigUnset(resolved.gitRoot, GIT_CONFIG_BASE_BRANCH_KEY);
}

export async function resolveBaseBranch(opts: {
  cwd: string;
  rootOverride?: string | null;
  cliBaseOpt?: string | null;
  mode: WorkflowMode;
}): Promise<string | null> {
  const explicit = (opts.cliBaseOpt ?? "").trim();
  if (explicit.length > 0) return explicit;
  const pinned = await getPinnedBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  if (pinned) return pinned;
  if (opts.mode === "branch_pr") {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (await gitLocalBranchExists(resolved.gitRoot, DEFAULT_BASE_BRANCH))
      return DEFAULT_BASE_BRANCH;
    if (await gitLocalBranchExists(resolved.gitRoot, LEGACY_DEFAULT_BASE_BRANCH))
      return LEGACY_DEFAULT_BASE_BRANCH;
    // No safe default: require pinning to avoid silently treating feature branches as base.
    return null;
  }
  return null;
}
