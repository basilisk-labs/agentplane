import type { WorkflowOperation, WorkflowOperationId } from "./workflow-step.js";

type WorkflowOperationEffect = "mutating" | "read_only" | "mode_dependent";

/**
 * Explicit authority classification for every formal CLI operation. `mode_dependent`
 * is reserved for runner.follow, whose reclaim/run variants mutate durable state
 * while status/verify are observational.
 */
export const WORKFLOW_OPERATION_EFFECTS = {
  "task.artifacts.commit": "mutating",
  "task.start": "mutating",
  "task.branch.start": "mutating",
  "task.verify.show": "read_only",
  "runner.follow": "mode_dependent",
  "batch.follow_primary": "read_only",
  "batch.collect_included": "read_only",
  "batch.reconcile_included": "mutating",
  "integration.adopt_legacy_protected_conflict": "mutating",
  "worktree.prepare": "mutating",
  "pr.artifacts.update": "mutating",
  "pr.open": "mutating",
  "pr.head.publish": "mutating",
  "provider.pr.refresh": "read_only",
  "route.remote.refresh": "read_only",
  "task.pre_merge_close": "mutating",
  "integration.enqueue": "mutating",
  "task.hosted_close.open": "mutating",
  "task.hosted_close.finalize": "mutating",
  "task.worktree.cleanup": "mutating",
  "pr.sync_or_verify": "mutating",
} as const satisfies Record<WorkflowOperationId, WorkflowOperationEffect>;

function workflowOperationEffect(operation: WorkflowOperation): "mutating" | "read_only" {
  if (operation.id === "runner.follow") {
    return operation.params.mode === "reclaim" || operation.params.mode === "run"
      ? "mutating"
      : "read_only";
  }
  return WORKFLOW_OPERATION_EFFECTS[operation.id] === "mutating" ? "mutating" : "read_only";
}

export function workflowOperationMutatesState(operation: WorkflowOperation): boolean {
  return workflowOperationEffect(operation) === "mutating";
}
