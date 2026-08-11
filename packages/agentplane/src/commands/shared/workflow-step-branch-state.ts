import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import { cliOperationStep, terminalStep } from "./workflow-step-factory.js";

export function blockedTaskStep(state: WorkflowRouteState): WorkflowStep {
  return terminalStep({
    state,
    id: "terminal.task_blocked",
    code: "task_blocked",
    phase: "task_blocked",
    checkout: "task_worktree",
    role: "CODER",
    outcome: "attention_required",
    summary:
      "the task is blocked by a recorded semantic outcome; resolve the blocker and explicitly resume the task before requesting another implementation episode",
    evidenceMissing: ["blocker_resolution"],
    selectedBlocker: null,
  });
}

export function primaryIncludeTaskIds(state: WorkflowRouteState): readonly string[] {
  return state.batchOwnership.role === "primary" ? [...state.batchOwnership.includedTaskIds] : [];
}

export function preMergeCommit(state: WorkflowRouteState): string | null {
  return state.prFlow?.branch.headSha ?? null;
}

export function missingPrRemoteRefreshStep(state: WorkflowRouteState): WorkflowStep {
  return cliOperationStep({
    state,
    operationId: "route.remote.refresh",
    params: { taskId: state.task.id },
    code: "refresh_remote_route",
    summary:
      "load provider truth before treating a branch_pr task with no local branch or PR record as complete",
    selectedBlocker: null,
  });
}
