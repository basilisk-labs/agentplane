import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CliReportEntry } from "../../cli/output.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { cancelTaskRunnerExecution } from "../../runner/usecases/task-run-lifecycle.js";

import type { TaskRunCancelParsed } from "./run-cancel.spec.js";

export { taskRunCancelSpec } from "./run-cancel.spec.js";
export type { TaskRunCancelParsed } from "./run-cancel.spec.js";

const emitter = createCliEmitter();

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
    const entries: CliReportEntry[] = [
      { label: "run_id", value: parsed.runId },
      { label: "previous_status", value: cancelled.previous_status },
      { label: "state", value: cancelled.invocation.state_path },
      { label: "events", value: cancelled.invocation.events_path },
      { label: "status", value: cancelled.state.status },
    ];
    if (!cancelled.changed) {
      entries.push({ label: "note", value: "run was already cancelled" });
    }
    emitter.report(entries, {
      header: infoMessage(`task run cancelled: ${parsed.taskId}`),
    });
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
