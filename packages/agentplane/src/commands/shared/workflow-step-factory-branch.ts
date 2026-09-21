import {
  requiredWorkItemsComplete,
  selectSchedulableWorkItems,
  taskCentricAggregateFromExtensions,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";
import type { RouteBlocker } from "./route-oracle.js";
import { cliOperationStep } from "./workflow-step-authority.js";
import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";

export type RequiredWorkItemRoute =
  | Readonly<{ state: "unavailable" | "complete" | "blocked"; work_item_id: null }>
  | Readonly<{ state: "ready"; work_item_id: string }>;

export function requiredWorkItemRoute(task: TaskData): RequiredWorkItemRoute {
  const aggregate = taskCentricAggregateFromExtensions(task.extensions);
  const plan = aggregate?.current_plan;
  if (
    !aggregate ||
    plan?.approval.state !== "approved" ||
    plan.approval.approved_digest !== plan.digest
  ) {
    return { state: "unavailable", work_item_id: null };
  }
  if (requiredWorkItemsComplete(aggregate)) return { state: "complete", work_item_id: null };
  const requiredItems = plan.proposal.work_items.work_items.filter((item) => !item.optional);
  const activeClaims = plan.proposal.work_items.work_items.flatMap((item) => {
    const runtime = aggregate.work_items[item.id];
    return runtime?.claim_id && !["COMPLETED", "CANCELLED"].includes(runtime.state)
      ? (item.resource_claims ?? [])
      : [];
  });
  const selected = selectSchedulableWorkItems({
    candidates: requiredItems.map((item) => ({
      id: item.id,
      priority: item.priority ?? 0,
      ready: ["READY", "REWORK_READY"].includes(aggregate.work_items[item.id]?.state ?? ""),
      resource_claims: item.resource_claims ?? [],
      value: item,
    })),
    open_slots: 1,
    active_resource_claims: activeClaims,
  })[0];
  return selected
    ? { state: "ready", work_item_id: selected.id }
    : { state: "blocked", work_item_id: null };
}

export function verifiedIncludedClosureCandidate(task: TaskData): boolean {
  if (task.verification?.state !== "ok") return false;
  if (String(task.status).toUpperCase() !== "DOING") return false;
  if (task.commit?.hash) return false;
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  if (batch?.role !== "included") return false;
  const primaryTaskId =
    typeof batch.primary_task_id === "string" ? batch.primary_task_id.trim() : "";
  const branch = typeof batch.branch === "string" ? batch.branch.trim() : "";
  const base = typeof batch.base === "string" ? batch.base.trim() : "";
  return Boolean(primaryTaskId && branch && base);
}

export function taskWorktreeBlocker(state: WorkflowRouteState): RouteBlocker | null {
  if (state.workflowMode !== "branch_pr") return null;
  return (
    state.blockers.find(
      (blocker) =>
        blocker.code === "task_worktree_dirty" ||
        blocker.code === "task_worktree_state_unavailable",
    ) ?? null
  );
}

export function foreignTaskReadmeReplicaRepairStep(
  state: WorkflowRouteState,
  blocker: RouteBlocker,
): WorkflowStep | null {
  if (
    blocker.code !== "task_worktree_dirty" ||
    state.foreignTaskReadmeReplicaRepair?.state !== "eligible"
  ) {
    return null;
  }
  return cliOperationStep({
    state,
    operationId: "flow.repair.foreign_task_readme",
    params: { taskId: state.task.id },
    code: "repair_foreign_task_readme_replica",
    summary:
      "remove the single proven foreign task README replica through the guarded flow repair command",
    selectedBlocker: blocker,
  });
}
