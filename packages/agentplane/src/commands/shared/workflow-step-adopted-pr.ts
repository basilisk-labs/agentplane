import { hasCanonicalAdoptedHeadEvidence } from "./canonical-pre-merge-evidence.js";
import { providerUpdateBranchParams } from "./provider-update-branch-route.js";
import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import { cliOperationStep, terminalStep } from "./workflow-step-factory.js";

/** A hosted PR with a retained adoption receipt has no task-owned branch artifacts. */
export function adoptedPrStep(state: WorkflowRouteState): WorkflowStep | null {
  const flow = state.prFlow;
  const adoption = flow?.adoption;
  if (!adoption) return null;
  const observation = flow?.providerObservation;
  if (observation?.state !== "found") {
    return cliOperationStep({
      state,
      operationId: "route.remote.refresh",
      params: { taskId: state.task.id },
      code: "refresh_adopted_pr",
      summary: "refresh the adopted PR from its configured provider",
      selectedBlocker: null,
    });
  }
  const observed = observation.pr;
  if (observed.status === "MERGED") {
    // The canonical controller has moved to the base checkout. Its normal
    // branch_pr close tail must now persist the completed task on the host.
    if (flow.adoptedControllerTransferred === true) return null;
    if (observed.headSha && observed.mergeCommit && observed.mergedAt) {
      return cliOperationStep({
        state,
        operationId: "task.adopted.finish",
        params: {
          taskId: state.task.id,
          prNumber: adoption.pr_number,
          headSha: observed.headSha,
          mergeCommit: observed.mergeCommit,
          mergedAt: observed.mergedAt,
        },
        code: "finish_adopted_pr_task",
        summary:
          "record the provider-proven adopted PR merge and close its task through the native transition",
        selectedBlocker: null,
      });
    }
    return terminalStep({
      state,
      id: "terminal.adopted_pr_merged",
      code: "adopted_pr_merged",
      phase: "adopted_pr_merged",
      checkout: "base_checkout",
      role: "INTEGRATOR",
      outcome: "repair_required",
      summary:
        "provider confirms a merge, but exact merge commit or time is unavailable for task closure",
      selectedBlocker: null,
    });
  }
  if (
    observed.status !== "OPEN" ||
    !observed.headSha ||
    !observed.baseSha ||
    observed.headSha !== (flow?.branch.metaHeadSha ?? adoption.head_sha) ||
    observed.mergeability?.state === "conflicting"
  ) {
    return terminalStep({
      state,
      id: "terminal.adopted_pr_drift",
      code: "adopted_pr_drift",
      phase: "adopted_pr_drift",
      checkout: "base_checkout",
      role: "INTEGRATOR",
      outcome: "repair_required",
      summary:
        "adopted PR head/base or open state changed; reconcile exact provider identity and task evidence before merging",
      evidenceMissing: ["exact_adopted_pr_head"],
      selectedBlocker: null,
    });
  }
  const update = providerUpdateBranchParams(flow);
  if (!update && observed.mergeability?.providerState?.trim().toLowerCase() === "behind") {
    return terminalStep({
      state,
      id: "terminal.adopted_behind_unproven",
      code: "adopted_behind_unproven",
      phase: "adopted_behind_unproven",
      checkout: "task_worktree",
      role: "INTEGRATOR",
      outcome: "repair_required",
      summary: "provider reports a behind PR but its exact update preconditions are not proven",
      evidenceMissing: ["exact_adopted_pr_update_preconditions"],
      selectedBlocker: null,
    });
  }
  if (update) {
    const kernel = state.task.extensions?.task_kernel;
    const aggregate =
      kernel && typeof kernel === "object" && "aggregate" in kernel ? kernel.aggregate : null;
    const items =
      aggregate && typeof aggregate === "object" && "work_items" in aggregate
        ? aggregate.work_items
        : null;
    const workItems = items !== null && typeof items === "object" ? Object.values(items) : [];
    const beforeEvidence =
      state.task.status === "DOING" &&
      aggregate !== null &&
      typeof aggregate === "object" &&
      "state" in aggregate &&
      aggregate.state === "ACTIVE" &&
      workItems.length > 0 &&
      workItems.every(
        (item: unknown) =>
          item !== null &&
          typeof item === "object" &&
          "state" in item &&
          ["PLANNED", "READY", "CLAIMED"].includes(String(item.state)),
      );
    if (!beforeEvidence) {
      return terminalStep({
        state,
        id: "terminal.adopted_update_requires_revalidation",
        code: "adopted_update_requires_revalidation",
        phase: "adopted_update_requires_revalidation",
        checkout: "task_worktree",
        role: "INTEGRATOR",
        outcome: "repair_required",
        summary:
          "provider branch is behind after exact-head work began; replan and repeat TESTER, EVALUATOR and final validation before any update or merge",
        evidenceMissing: ["fresh_exact_head_work_item"],
        selectedBlocker: null,
      });
    }
    return cliOperationStep({
      state,
      operationId: "provider.pr.update_branch",
      params: update,
      code: "update_adopted_pr_before_validation",
      summary:
        "update the adopted PR before exact-head work begins, then verify its new provider head",
      selectedBlocker: null,
    });
  }
  if (!hasCanonicalAdoptedHeadEvidence(state.task, observed.headSha)) {
    return terminalStep({
      state,
      id: "terminal.adopted_kernel_incomplete",
      code: "adopted_kernel_incomplete",
      phase: "adopted_kernel_incomplete",
      checkout: "task_worktree",
      role: "INTEGRATOR",
      outcome: "repair_required",
      summary:
        "canonical Task Kernel final validation and operational projection must complete before adopted PR merge",
      evidenceMissing: ["canonical_final_validation", "canonical_operational_projection"],
      selectedBlocker: null,
    });
  }
  return cliOperationStep({
    state,
    operationId: "integration.adopted_merge",
    params: {
      taskId: state.task.id,
      prNumber: adoption.pr_number,
      headSha: observed.headSha,
      baseSha: observed.baseSha,
    },
    code: "merge_adopted_pr",
    summary: "merge the adopted PR through protected provider checks with a separate USER grant",
    selectedBlocker: null,
  });
}
