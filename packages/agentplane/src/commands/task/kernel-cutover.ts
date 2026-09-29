import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { CliError } from "../../shared/errors.js";

import { LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION } from "./migration-apply.js";

export type KernelCutoverDisposition =
  | { kind: "canonical" }
  | { kind: "legacy_drain" }
  | {
      kind: "migration_required";
      reason:
        | "legacy_unknown_active"
        | "legacy_projection_invalid"
        | "lifecycle_migration_quarantined";
    };

export function kernelCutoverActivated(tasks: readonly TaskData[]): boolean {
  return tasks.some(
    (task) =>
      Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION) ||
      Object.hasOwn(task.extensions ?? {}, LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION),
  );
}

export function classifyKernelCutover(task: TaskData): KernelCutoverDisposition {
  if (Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION)) return { kind: "canonical" };
  if (Object.hasOwn(task.extensions ?? {}, LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION))
    return { kind: "migration_required", reason: "lifecycle_migration_quarantined" };
  let aggregate;
  try {
    aggregate = taskCentricAggregateFromExtensions(task.extensions);
  } catch {
    return { kind: "migration_required", reason: "legacy_projection_invalid" };
  }
  if (
    aggregate?.current_plan?.approval.state === "approved" ||
    task.plan_approval?.state === "approved"
  )
    return { kind: "legacy_drain" };
  if (task.status === "TODO" || task.status === "DONE") return { kind: "legacy_drain" };
  return {
    kind: "migration_required",
    reason: "legacy_unknown_active",
  };
}

export function requireKernelIssuanceEligibility(task: TaskData): void {
  const disposition = classifyKernelCutover(task);
  if (disposition.kind !== "migration_required") return;
  throw new CliError({
    code: "E_PHASE_POLICY",
    message:
      `Task ${task.id} is an unmigrated legacy record and cannot issue new work after the ` +
      "Task Kernel cutover.",
    context: {
      reason_code: disposition.reason,
      task_id: task.id,
      task_status: task.status,
      next_action: `agentplane task kernel-migrate ${task.id}`,
    },
  });
}
