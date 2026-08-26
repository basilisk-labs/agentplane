import { providerUpdateBranchParams } from "./provider-update-branch-route.js";
import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import { cliOperationStep, routeBlockerFor } from "./workflow-step-factory.js";

export function providerUpdateBranchStep(state: WorkflowRouteState): WorkflowStep | null {
  if (!state.blockers.some((blocker) => blocker.code === "provider_pr_update_branch_required")) {
    return null;
  }
  const params = providerUpdateBranchParams(state.prFlow);
  if (params?.taskId !== state.task.id) return null;
  return cliOperationStep({
    state,
    operationId: "provider.pr.update_branch",
    params,
    code: "update_provider_pr_branch",
    summary:
      "update the exact behind provider PR head from its observed base before classifying hosted failures as semantic rework",
    selectedBlocker: routeBlockerFor(state, "provider_pr_update_branch_required"),
  });
}
