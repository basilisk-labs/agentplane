import { taskCentricAggregateFromExtensions, WorkItemScheduler } from "@agentplaneorg/core/tasks";

import {
  branchImplementationStep,
  cliOperationStep,
  terminalStep,
} from "./workflow-step-factory.js";
import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";

export function primaryBatchVerificationStep(state: WorkflowRouteState): WorkflowStep | null {
  if (state.batchOwnership.role !== "primary") return null;
  const ownership = state.batchOwnership;
  const pending = ownership.taskStates.find(
    (task) => ownership.includedTaskIds.includes(task.id) && task.verification !== "ok",
  );
  if (!pending) return null;
  return cliOperationStep({
    state,
    operationId: "batch.collect_included",
    params: { taskId: pending.id },
    code: "collect_included_verification",
    summary: "collect verification for included batch tasks before final integration",
    selectedBlocker: {
      code: "included_batch_verification_pending",
      summary: `included batch task ${pending.id} requires verification before primary PR mutation`,
    },
  });
}

/** Existing implementation proof does not complete an unfinished canonical WorkItem. */
export function requiredBranchWorkStep(state: WorkflowRouteState): WorkflowStep | null {
  const aggregate = taskCentricAggregateFromExtensions(state.task.extensions);
  const plan = aggregate?.current_plan;
  if (!aggregate || !plan) return null;
  const remaining = plan.proposal.work_items.work_items.filter(
    (item) => !item.optional && aggregate.work_items[item.id]?.state !== "COMPLETED",
  );
  if (remaining.length === 0) return null;
  // Hosted completion and cleanup must not reopen historical task projections.
  if (state.prFlow?.pr.state === "MERGED" || state.prFlow?.pr.state === "CLOSED") return null;
  if (!state.taskWorktree || ["not_present", "unavailable"].includes(state.taskWorktree.state))
    return null;
  if (
    state.task.status === "DONE" &&
    (state.prFlow?.pr.source !== "lookup" ||
      state.prFlow.providerObservation?.state === "unavailable")
  ) {
    return cliOperationStep({
      state,
      operationId: "route.remote.refresh",
      params: { taskId: state.task.id },
      code: "refresh_remote_route",
      summary: "refresh provider state before resuming required work for the DONE task",
      selectedBlocker: null,
    });
  }
  const approved =
    state.task.plan_approval?.state === "approved" &&
    plan.approval.state === "approved" &&
    plan.approval.approved_digest === plan.digest;
  const inFlight = Object.values(aggregate.work_items).some((item) =>
    [
      "CLAIMED",
      "EXECUTING",
      "RESULT_RECEIVED",
      "INSPECTING",
      "VALIDATING",
      "EFFECT_IN_DOUBT",
    ].includes(item.state),
  );
  if (
    approved &&
    !inFlight &&
    new WorkItemScheduler(1).select({
      graph: plan.proposal.work_items,
      runtime: aggregate.work_items,
      active_leases: [],
    }).length > 0
  ) {
    return branchImplementationStep(state);
  }
  const summary =
    "Required WorkItems remain incomplete but cannot be scheduled: " +
    remaining.map((item) => item.id).join(", ") +
    ". Resolve their approval, input, dependency or active-effect boundary before continuation.";
  return terminalStep({
    state,
    id: "terminal.required_work",
    code: "required_work_blocked",
    phase: "required_work_blocked",
    checkout: "task_worktree",
    role: "CODER",
    outcome: "attention_required",
    summary,
    mustNot: ["do not publish, close, or fabricate completion for unfinished required WorkItems"],
    evidenceMissing: remaining.map((item) => `work_item_completed:${item.id}`),
    selectedBlocker: null,
  });
}
