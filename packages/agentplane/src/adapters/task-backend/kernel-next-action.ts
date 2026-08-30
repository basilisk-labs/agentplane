import { taskKernel } from "@agentplaneorg/core/tasks";
import type { KernelRead } from "./kernel-record.js";

export type KernelNextAction = Readonly<{
  reason_code: string;
  task_id: string | null;
  work_item_id: string | null;
  effect_id: string | null;
  grants_authority: false;
}>;

/** Read projection only. The supervisor must obtain fresh command authority before any effect. */
export function readKernelNextAction(
  read: KernelRead,
  repositoryFingerprint: taskKernel.Sha256Digest,
): KernelNextAction {
  const taskId = "task" in read ? read.task.id : null;
  const action = (
    reason_code: string,
    work_item_id: string | null = null,
    effect_id: string | null = null,
  ): KernelNextAction => ({
    reason_code,
    task_id: taskId,
    work_item_id,
    effect_id,
    grants_authority: false,
  });
  if (read.kind === "missing") return action("kernel_task_missing");
  if (read.kind === "malformed") return action("kernel_record_invalid");
  if (read.kind === "legacy_unmigrated") return action("kernel_migration_required");
  if (read.kind === "archived") return action("kernel_task_archived");
  const aggregate = read.record.aggregate;
  if (aggregate.state === "COMPLETED") return action("kernel_task_completed");
  if (aggregate.state === "CANCELLED") return action("kernel_task_cancelled");
  if (aggregate.state === "HUMAN_REQUIRED") return action("kernel_human_required");
  if (aggregate.state === "BLOCKED") return action("kernel_task_blocked");
  const effects = [...aggregate.effects].toSorted(
    (a, b) => Number(a.id > b.id) - Number(a.id < b.id),
  );
  const uncertain = effects.find(
    (effect) => effect.state === "IN_DOUBT" || effect.state === "PENDING",
  );
  if (uncertain) return action("kernel_effect_observation_required", null, uncertain.id);
  if (aggregate.state === "EFFECT_IN_DOUBT") return action("kernel_effect_reconciliation_required");
  if (aggregate.state === "CAPTURED" || aggregate.state === "PLANNING")
    return action("kernel_plan_required");
  if (aggregate.state === "AWAITING_PLAN_APPROVAL") return action("kernel_plan_approval_required");
  if (aggregate.current_plan?.state !== "APPROVED") return action("kernel_approved_plan_missing");
  const prepared = effects.find((effect) => effect.state === "PREPARED");
  if (prepared) return action("kernel_effect_dispatch_required", null, prepared.id);
  if (aggregate.state === "FINAL_VALIDATION")
    return action(
      taskKernel.isTaskCompletionEligible(aggregate, repositoryFingerprint)
        ? "kernel_task_completion_required"
        : "kernel_final_validation_required",
    );
  const definitions = [...aggregate.current_plan.work_items].toSorted(
    (a, b) => Number(a.id > b.id) - Number(a.id < b.id),
  );
  if (definitions.some((definition) => !aggregate.work_items[definition.id]))
    return action("kernel_work_item_materialization_required");
  const items = definitions.map((definition) => aggregate.work_items[definition.id]!);
  const requiredComplete = items.every(
    (item) => item.definition.optional || item.state === "COMPLETED",
  );
  const unresolvedClaim = items.some(
    (item) => item.claim_id !== null && item.state !== "COMPLETED" && item.state !== "CANCELLED",
  );
  if (requiredComplete && !unresolvedClaim) return action("kernel_final_validation_required");
  // Existing claims and uncertain outcomes precede new claims. This projection never grants a lease.
  for (const state of [
    "EFFECT_IN_DOUBT",
    "EXECUTING",
    "RESULT_RECEIVED",
    "INSPECTING",
    "VALIDATING",
    "CLAIMED",
    "REWORK_READY",
    "READY",
    "BLOCKED",
  ] as const) {
    const item = items.find(
      (candidate) =>
        candidate.state === state &&
        (!(state === "READY" || state === "REWORK_READY") ||
          taskKernel.workItemResourceConflicts(candidate, items).length === 0),
    );
    if (!item) continue;
    const reasons: Record<typeof state, string> = {
      EFFECT_IN_DOUBT: "kernel_work_item_reconciliation_required",
      EXECUTING: "kernel_work_item_result_required",
      RESULT_RECEIVED: "kernel_work_item_inspection_required",
      INSPECTING: "kernel_work_item_validation_required",
      VALIDATING: "kernel_work_item_validation_resolution_required",
      CLAIMED: "kernel_work_item_execution_required",
      BLOCKED: "kernel_work_item_blocked",
      REWORK_READY: "kernel_work_item_rework_claim_required",
      READY: "kernel_work_item_claim_required",
    };
    return action(reasons[state], item.definition.id);
  }
  if (items.some((item) => !item.definition.optional && item.state !== "COMPLETED"))
    return action("kernel_work_item_dependencies_blocked");
  return action("kernel_final_validation_required");
}
