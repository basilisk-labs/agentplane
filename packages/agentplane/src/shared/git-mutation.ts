import { stat } from "node:fs/promises";
import path from "node:path";

import { gitCurrentBranch, gitRevParse } from "@agentplaneorg/core/git";

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
    gitRevParse(opts.repoRoot, ["--git-dir"]).catch((err: unknown) =>
      err instanceof Error ? `unresolved:${err.message}` : "unresolved",
    ),
    gitCurrentBranch(opts.repoRoot).catch((err: unknown) =>
      err instanceof Error ? `unresolved:${err.message}` : "unresolved",
    ),
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
