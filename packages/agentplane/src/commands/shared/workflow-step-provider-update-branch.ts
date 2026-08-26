import { providerUpdateBranchParams } from "./provider-update-branch-route.js";
import { POSTCONDITION } from "./workflow-postconditions.js";
import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import { cliOperationStep, routeBlockerFor } from "./workflow-step-factory.js";

export const PROVIDER_UPDATE_BRANCH_OPERATION_SPEC = {
  type: "provider_update_branch",
  phase: "provider_pr_update_branch_required",
  checkout: "task_worktree",
  role: "INTEGRATOR",
  expectedPostconditions: [
    POSTCONDITION.providerBranchUpdated,
    POSTCONDITION.providerObserved,
    POSTCONDITION.routeRecomputed,
  ],
  mustNot: [
    "do not update a different PR, branch, base, provider identity, or head than the exact approved operation",
    "do not repeat an effect-in-doubt update; reconcile fresh provider ancestry before another mutation",
    "do not merge, rebase, force-push, or edit AgentPlane task state as a substitute for provider update-branch",
  ],
  triggersGitHooks: false,
  verificationCandidate: "agentplane task next-action <task-id> --remote --explain",
  needsVerificationRecord: false,
} as const;

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
