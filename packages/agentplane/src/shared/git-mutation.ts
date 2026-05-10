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
  mutationKind?: GitMutationKind;
  taskId?: string;
  allowPrefixes?: string[];
  changedPaths?: string[];
  stagedPaths?: string[];
}): Record<string, unknown> {
  return {
    command: opts.command,
    ...(opts.mutationKind ? { mutation_kind: opts.mutationKind } : {}),
    ...(opts.taskId ? { task_id: opts.taskId } : {}),
    ...(opts.allowPrefixes ? { allow_prefixes: opts.allowPrefixes } : {}),
    ...(opts.changedPaths ? { changed_paths: opts.changedPaths } : {}),
    ...(opts.stagedPaths ? { staged_paths: opts.stagedPaths } : {}),
  };
}
