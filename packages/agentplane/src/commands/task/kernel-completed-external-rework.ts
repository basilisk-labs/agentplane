import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { taskKernel } from "@agentplaneorg/core/tasks";
import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

/** Identify task-level repair without manufacturing a legacy task-centric aggregate. */
export async function readCompletedReworkRecord(opts: {
  command: CommandContext;
  task: TaskData;
  work_order: AgentWorkOrderV2;
}) {
  const identity = await resolveLogicalRepositoryIdentity({
    git_root: opts.command.resolvedProject.gitRoot,
    task: opts.task,
  });
  const read = readKernelRecord(opts.task, identity as taskKernel.Sha256Digest);
  if (read.kind === "malformed") {
    throw new CliError({ code: "E_VALIDATION", message: "Canonical rework record is malformed." });
  }
  if (read.kind !== "canonical" || read.record.aggregate.state !== "COMPLETED") return null;
  if (
    opts.task.status !== "DONE" ||
    opts.task.execution_route?.selected_mode !== "branch_pr" ||
    opts.work_order.task.id !== opts.task.id ||
    opts.work_order.task.work_item_id
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Completed canonical rework must remain bound to the branch task, not a WorkItem.",
    });
  }
  return read.record;
}
