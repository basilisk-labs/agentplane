import { createHash } from "node:crypto";
import { hostname } from "node:os";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { gitCurrentBranch, gitRevParse } from "@agentplaneorg/core/git";

import { CliError } from "./errors.js";

export const GIT_MUTATION_KINDS = [
  "implementation_commit",
  "lifecycle_commit",
  "pr_artifact_update",
  "close_tail",
  "integration",
  "hook_check",
] as const;

export type GitMutationKind = (typeof GIT_MUTATION_KINDS)[number];

export function gitMutationDiagnosticContext(opts: {
  command: string;
  cwd?: string;
  repoRoot?: string;
  gitDir?: string;
  branch?: string;
  workflowMode?: string;
  mutationKind?: GitMutationKind;
  taskId?: string;
  allowPrefixes?: string[];
  changedPaths?: string[];
  stagedPaths?: string[];
  deniedPaths?: string[];
  indexLockPath?: string;
  indexLockAgeMs?: number;
  remediation?: string;
}): Record<string, unknown> {
  return {
    command: opts.command,
    ...(opts.cwd ? { cwd: opts.cwd } : {}),
    ...(opts.repoRoot ? { git_repo_root: opts.repoRoot } : {}),
    ...(opts.gitDir ? { git_dir: opts.gitDir } : {}),
    ...(opts.branch ? { git_branch: opts.branch } : {}),
    ...(opts.workflowMode ? { workflow_mode: opts.workflowMode } : {}),
    ...(opts.mutationKind ? { mutation_kind: opts.mutationKind } : {}),
    ...(opts.taskId ? { task_id: opts.taskId } : {}),
    ...(opts.allowPrefixes ? { allow_prefixes: opts.allowPrefixes } : {}),
    ...(opts.changedPaths ? { changed_paths: opts.changedPaths } : {}),
    ...(opts.stagedPaths ? { staged_paths: opts.stagedPaths } : {}),
    ...(opts.deniedPaths ? { denied_paths: opts.deniedPaths } : {}),
    ...(opts.indexLockPath ? { git_index_lock_path: opts.indexLockPath } : {}),
    ...(opts.indexLockAgeMs === undefined ? {} : { git_index_lock_age_ms: opts.indexLockAgeMs }),
    ...(opts.remediation ? { remediation: opts.remediation } : {}),
  };
}

export async function resolveGitMutationDiagnosticContext(opts: {
  command: string;
  cwd: string;
  repoRoot: string;
  workflowMode?: string;
  mutationKind?: GitMutationKind;
  taskId?: string;
  allowPrefixes?: string[];
  changedPaths?: string[];
  stagedPaths?: string[];
}): Promise<Record<string, unknown>> {
  const [gitDir, branch] = await Promise.all([
    (async () => {
      try {
        return await gitRevParse(opts.repoRoot, ["--git-dir"]);
      } catch (err: unknown) {
        return err instanceof Error ? `unresolved:${err.message}` : "unresolved";
      }
    })(),
    (async () => {
      try {
        return await gitCurrentBranch(opts.repoRoot);
      } catch (err: unknown) {
        return err instanceof Error ? `unresolved:${err.message}` : "unresolved";
      }
    })(),
  ]);

  return gitMutationDiagnosticContext({
    ...opts,
    gitDir,
    branch,
  });
}

export async function resolveGitIndexLockInfo(opts: {
  repoRoot: string;
}): Promise<{ gitDir: string; lockPath: string; ageMs: number } | null> {
  const rawGitDir = await gitRevParse(opts.repoRoot, ["--git-dir"]);
  const gitDir = path.isAbsolute(rawGitDir) ? rawGitDir : path.resolve(opts.repoRoot, rawGitDir);
  const lockPath = path.join(gitDir, "index.lock");

  try {
    const info = await stat(lockPath);
    return {
      gitDir,
      lockPath,
      ageMs: Math.max(0, Date.now() - info.mtimeMs),
    };
  } catch (err) {
    const code = (err as { code?: unknown } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export type GitMutationMutexContext = {
  repoRoot: string;
  gitDir: string;
  gitCommonDir: string;
  locksDir: string;
  lockPath: string;
  worktreeId: string;
  operation: string;
};

function resolveGitPath(repoRoot: string, rawPath: string): string {
  return path.isAbsolute(rawPath) ? rawPath : path.resolve(repoRoot, rawPath);
}

function sanitizeLockOperation(operation: string): string {
  const normalized = operation.trim().replaceAll(/[^A-Za-z0-9_.-]/g, "-");
  return normalized.length > 0 ? normalized : "git-write";
}

export async function resolveGitMutationMutexContext(opts: {
  repoRoot: string;
  operation: string;
}): Promise<GitMutationMutexContext> {
  const rawGitDir = await gitRevParse(opts.repoRoot, ["--git-dir"]);
  let rawCommonDir: string;
  try {
    rawCommonDir = await gitRevParse(opts.repoRoot, ["--git-common-dir"]);
  } catch {
    rawCommonDir = rawGitDir;
  }
  const gitDir = resolveGitPath(opts.repoRoot, rawGitDir);
  const gitCommonDir = resolveGitPath(opts.repoRoot, rawCommonDir);
  const operation = sanitizeLockOperation(opts.operation);
  const worktreeIdentity = `${gitCommonDir}\0${gitDir}`;
  const worktreeId = createHash("sha256").update(worktreeIdentity).digest("hex").slice(0, 16);
  const locksDir = path.join(opts.repoRoot, ".agentplane", "cache", "locks");

  return {
    repoRoot: opts.repoRoot,
    gitDir,
    gitCommonDir,
    locksDir,
    lockPath: path.join(locksDir, `${worktreeId}.${operation}.lock`),
    worktreeId,
    operation,
  };
}

async function readMutexOwner(lockPath: string): Promise<unknown> {
  try {
    return JSON.parse(await readFile(path.join(lockPath, "owner.json"), "utf8"));
  } catch {
    return null;
  }
}

export async function withGitMutationMutex<T>(
  opts: {
    repoRoot: string;
    operation: string;
    workflowMode?: string;
    mutationKind?: GitMutationKind;
    taskId?: string;
  },
  run: (ctx: GitMutationMutexContext) => Promise<T>,
): Promise<T> {
  const mutex = await resolveGitMutationMutexContext({
    repoRoot: opts.repoRoot,
    operation: opts.operation,
  });
  await mkdir(mutex.locksDir, { recursive: true });

  try {
    await mkdir(mutex.lockPath);
  } catch (err) {
    const code = (err as { code?: unknown } | null)?.code;
    if (code !== "EEXIST") throw err;

    const owner = await readMutexOwner(mutex.lockPath);
    throw new CliError({
      code: "E_GIT_RACE",
      message: `Git mutation mutex is already held for this worktree: ${mutex.lockPath}`,
      context: {
        ...gitMutationDiagnosticContext({
          command: "agentplane git mutation mutex",
          cwd: opts.repoRoot,
          repoRoot: opts.repoRoot,
          gitDir: mutex.gitDir,
          workflowMode: opts.workflowMode,
          mutationKind: opts.mutationKind,
          taskId: opts.taskId,
          remediation:
            "Wait for the active AgentPlane Git mutation in this worktree to finish, then retry. Different worktrees use independent mutex keys.",
        }),
        git_common_dir: mutex.gitCommonDir,
        git_worktree_id: mutex.worktreeId,
        git_mutation_lock_path: mutex.lockPath,
        git_mutation_lock_owner: owner,
      },
    });
  }

  await writeFile(
    path.join(mutex.lockPath, "owner.json"),
    JSON.stringify(
      {
        pid: process.pid,
        host: hostname(),
        acquired_at: new Date().toISOString(),
        uid: typeof process.getuid === "function" ? process.getuid() : null,
        repo_root: mutex.repoRoot,
        git_dir: mutex.gitDir,
        git_common_dir: mutex.gitCommonDir,
        worktree_id: mutex.worktreeId,
        operation: mutex.operation,
        workflow_mode: opts.workflowMode ?? null,
        mutation_kind: opts.mutationKind ?? null,
        task_id: opts.taskId ?? null,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  try {
    return await run(mutex);
  } finally {
    await rm(mutex.lockPath, { recursive: true, force: true });
  }
}
