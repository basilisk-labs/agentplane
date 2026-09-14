import { cliOperationStep, terminalStep } from "./workflow-step-factory.js";
import type { WorkflowOperationSpec, WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import { POSTCONDITION } from "./workflow-postconditions.js";

export type BaseSyncParams = {
  taskId: string;
  branch: string;
  baseBranch: string;
  expectedHeadSha: string;
  expectedBaseSha: string;
};

export const BASE_SYNC_SPEC = {
  type: "task_branch_base_sync",
  phase: "task_branch_base_sync",
  checkout: "task_worktree",
  role: "CODER",
  expectedPostconditions: [POSTCONDITION.taskBranchContainsBase, POSTCONDITION.routeRecomputed],
  mustNot: [
    "do not rebase, force-push, select conflict hunks, or replace the exact plan-bound base SHA",
  ],
  triggersGitHooks: true,
  verificationCandidate: null,
  needsVerificationRecord: false,
} as const satisfies WorkflowOperationSpec;

export function branchBaseSyncStep(state: WorkflowRouteState): WorkflowStep | null {
  const observation = state.branchBaseSync;
  if (!observation || observation.state === "not_requested" || observation.state === "satisfied") {
    return null;
  }
  if (observation.state === "waiting_for_worktree") return null;
  if (observation.state === "invalid" || observation.state === "unavailable") {
    return terminalStep({
      state,
      id: "terminal.task_branch_base_sync",
      code: "task_branch_base_sync_blocked",
      phase: "task_branch_base_sync_blocked",
      checkout: "task_worktree",
      role: "CODER",
      outcome: "repair_required",
      summary: `ready WorkItem ${observation.workItemId} has an unusable branch-base request: ${observation.reason}`,
      evidenceMissing: ["valid_plan_bound_branch_base"],
      selectedBlocker: null,
    });
  }
  return cliOperationStep({
    state,
    operationId: "task.branch.sync_base",
    params: {
      taskId: state.task.id,
      branch: observation.branch,
      baseBranch: observation.baseBranch,
      expectedHeadSha: observation.expectedHeadSha,
      expectedBaseSha: observation.expectedBaseSha,
    },
    code: "sync_task_branch_base",
    summary:
      `merge exact ${observation.baseBranch} ${observation.expectedBaseSha} into the task branch ` +
      `before executing ready WorkItem ${observation.workItemId}`,
    selectedBlocker: null,
  });
}
