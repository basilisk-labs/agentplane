import type { TaskData } from "../../backends/task-backend.js";
import { reconcileTaskExecutionContract } from "../../runtime/task-routing/index.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";

export async function recordObservedTaskExecutionContract(opts: {
  command: CommandContext;
  task: TaskData;
  changed_paths: readonly string[];
  preserved_commit: string;
}): Promise<{ task: TaskData; escalated: boolean }> {
  const current = opts.task.execution_contract;
  if (!current) return { task: opts.task, escalated: false };

  const reconciled = reconcileTaskExecutionContract({
    contract: current,
    changed_paths: opts.changed_paths,
    preserved_commit: opts.preserved_commit,
  });
  if (JSON.stringify(reconciled.contract) === JSON.stringify(current)) {
    return { task: opts.task, escalated: reconciled.escalated };
  }
  const blueprintRequest =
    reconciled.escalated && opts.task.blueprint_request === "code.direct"
      ? "code.branch_pr"
      : opts.task.blueprint_request;

  await opts.command.taskBackend.writeTask(
    {
      ...opts.task,
      blueprint_request: blueprintRequest,
      execution_contract: reconciled.contract,
      execution_route: opts.task.execution_route
        ? {
            ...opts.task.execution_route,
            selected_mode: reconciled.contract.selected_mode,
            reason_codes: [...reconciled.contract.reason_codes],
          }
        : undefined,
    },
    opts.task.revision ? { expectedRevision: opts.task.revision } : undefined,
  );
  return {
    task: await loadTaskFromContext({ ctx: opts.command, taskId: opts.task.id }),
    escalated: reconciled.escalated,
  };
}
