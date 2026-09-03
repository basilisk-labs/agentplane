import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import { cliOperationStep, routeBlockerFor, terminalStep } from "./workflow-step-factory.js";
import { parseTaskScopeExtensionRequestState } from "./task-scope-extension-request.js";

export function blockedTaskStep(state: WorkflowRouteState): WorkflowStep {
  const pending = parseTaskScopeExtensionRequestState(state.task);
  if (pending?.status === "pending") {
    return cliOperationStep({
      state,
      operationId: "task.scope.extend",
      params: {
        taskId: state.task.id,
        requestDigest: pending.request_digest,
        scopeRoots: pending.request.scope_roots,
        repositoryEffects: pending.request.repository_effects,
      },
      code: "approve_scope_extension",
      summary:
        "apply the exact pending repository scope extension after explicit USER authority, then issue a freshly scoped executor episode",
      selectedBlocker: null,
    });
  }
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

export function branchHeadRepairStep(state: WorkflowRouteState): WorkflowStep {
  return terminalStep({
    state,
    id: "terminal.branch_head_repair",
    code: "repair_branch_head",
    phase: "branch_head_missing",
    checkout: "base_checkout",
    role: "CODER",
    outcome: "repair_required",
    summary:
      "the structured task branch exists but its local head is unavailable; recover or fetch that branch before PR, closure, or integration operations",
    evidenceMissing: ["task_branch_head"],
    selectedBlocker: routeBlockerFor(state, "branch_head_missing"),
  });
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
