import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage } from "../../cli/output.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { cancelTaskRunnerExecution } from "../../runner/usecases/task-run-lifecycle.js";

import type { TaskRunCancelParsed } from "./run-cancel.spec.js";

export { taskRunCancelSpec } from "./run-cancel.spec.js";
export type { TaskRunCancelParsed } from "./run-cancel.spec.js";

export const runTaskRunCancel: CommandHandler<TaskRunCancelParsed> = async (
  ctx: CommandCtx,
  parsed: TaskRunCancelParsed,
) => {
  try {
    const commandCtx = await loadCommandContext({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
    });
    const cancelled = await cancelTaskRunnerExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    process.stdout.write(`${infoMessage(`task run cancelled: ${parsed.taskId}`)}\n`);
    process.stdout.write(`run_id: ${parsed.runId}\n`);
    process.stdout.write(`previous_status: ${cancelled.previous_status}\n`);
    process.stdout.write(`state: ${cancelled.invocation.state_path}\n`);
    process.stdout.write(`events: ${cancelled.invocation.events_path}\n`);
    process.stdout.write(`status: ${cancelled.state.status}\n`);
    if (!cancelled.changed) {
      process.stdout.write("note: run was already cancelled\n");
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task run cancel",
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
  }
};
