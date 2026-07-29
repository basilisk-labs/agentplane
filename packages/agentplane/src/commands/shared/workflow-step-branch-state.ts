import type { WorkflowRouteState } from "./workflow-step.js";

export function primaryIncludeTaskIds(state: WorkflowRouteState): readonly string[] {
  return state.batchOwnership.role === "primary" ? [...state.batchOwnership.includedTaskIds] : [];
}

export function preMergeCommit(state: WorkflowRouteState): string | null {
  return state.prFlow?.branch.headSha ?? null;
}
