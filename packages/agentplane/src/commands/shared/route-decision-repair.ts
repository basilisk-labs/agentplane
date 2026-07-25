import type { RouteAmbiguity, RouteRepairStep, TaskRouteDecision } from "./route-decision-types.js";
import type { WorkflowStep } from "./workflow-step.js";

type DecisionForAmbiguity = Omit<
  TaskRouteDecision,
  "ambiguities" | "repairPlan" | "sourceConfidence"
>;
type DecisionForRepair = Omit<TaskRouteDecision, "repairPlan" | "sourceConfidence">;

function operationMutatesState(step: WorkflowStep): boolean {
  if (step.kind !== "cli_operation") return false;
  return step.operation.type !== "provider_refresh" && step.operation.type !== "task_view";
}

export function deriveRouteAmbiguities(opts: { decision: DecisionForAmbiguity }): RouteAmbiguity[] {
  const ambiguities: RouteAmbiguity[] = [];
  const blockerCodes = new Set(opts.decision.blockers.map((blocker) => blocker.code));
  const step = opts.decision.workflowStep;
  const baseLane =
    step.authoritativeCheckout === "base_checkout" || step.authoritativeCheckout === "provider";
  if (
    opts.decision.workflowMode === "branch_pr" &&
    blockerCodes.has("on_base_checkout") &&
    !baseLane
  ) {
    ambiguities.push({
      code: "base_checkout_owner_scope",
      summary:
        "current checkout is the base branch while branch_pr owner-scoped work normally belongs in the task worktree",
      resolution:
        "use the selected next action only if it is a base-lane action; otherwise run agentplane work resume <task-id>",
    });
  }
  if (step.kind === "approval" && step.request.type === "provider_merge") {
    ambiguities.push({
      code: "approval_without_local_command",
      summary: "the selected next action requires approval but has no safe local command",
      resolution:
        "treat this as a human/provider action and re-run task status --route after the external action completes",
    });
  }
  if (
    blockerCodes.has("close_tail_open") &&
    step.kind === "approval" &&
    step.request.type === "provider_merge"
  ) {
    ambiguities.push({
      code: "close_tail_provider_lane",
      summary: "hosted close-tail is open, so local task mutation is not the next source of truth",
      resolution:
        "wait for stable hosted checks and merge the close-tail PR through the provider, then pull/reconcile base state",
    });
  }
  return ambiguities;
}

export function deriveRouteRepairPlan(decision: DecisionForRepair): RouteRepairStep[] {
  const step = decision.workflowStep;
  if (!step.selectedBlocker && decision.blockers.length === 0) {
    return [
      {
        code: "no_repair_needed",
        command: step.kind === "cli_operation" ? step.compatibility.command : null,
        summary: step.summary,
        mutates: false,
      },
    ];
  }
  return [
    {
      code: step.compatibility.code,
      command: step.kind === "cli_operation" ? step.compatibility.command : null,
      summary: step.summary,
      mutates: operationMutatesState(step),
    },
  ];
}
