import type { TaskData } from "../../backends/task-backend.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";

const EXECUTABLE_EFFECTS = new Set([
  "source_code",
  "tests",
  "public_api",
  "schema",
  "security_boundary",
]);

/** A report-only Plan may have no process checks; its outputs still need independent review. */
export function canonicalNoExecutableChecksAllowed(
  task: Pick<TaskData, "task_kind" | "mutation_scope" | "execution_contract">,
  record: KernelRecord,
): boolean {
  const plan = record.aggregate.current_plan;
  if (plan?.state !== "APPROVED" || task.mutation_scope === "code") return false;
  const selected = task.execution_contract?.verification.contract?.selected_checks ?? [];
  if (selected.some((check) => check !== "hosted_integration" && check !== "task_outcome"))
    return false;
  return plan.work_items
    .filter((item) => !item.optional || record.aggregate.work_items[item.id]?.state === "COMPLETED")
    .every((item) =>
      item.execution_requirements.repository_effects.every(
        (effect) => !EXECUTABLE_EFFECTS.has(effect),
      ),
    );
}
