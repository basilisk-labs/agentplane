export function routeGatePriority(code: string): number {
  if (
    code === "plan_not_approved" ||
    code === "dependency_not_ready" ||
    code === "human_input_required" ||
    code === "missing_pr_branch" ||
    code === "runner_alive" ||
    code === "implementation_rework_required" ||
    code === "legacy_protected_conflict_adoption_required" ||
    code === "provider_merge_conflict" ||
    code === "provider_conflict_context_invalid"
  ) {
    return 0;
  }
  if (code === "task_worktree_dirty" || code === "task_worktree_state_unavailable") return 1;
  if (code === "verification_required") return 2;
  return 3;
}
