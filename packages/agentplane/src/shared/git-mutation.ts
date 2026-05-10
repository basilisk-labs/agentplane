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
