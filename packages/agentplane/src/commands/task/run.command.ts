import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { mapBackendError } from "../../cli/error-map.js";
import { loadCommandContext } from "../shared/task-backend.js";
import {
  executeTaskRunnerExecution,
  prepareTaskRunnerExecution,
} from "../../runner/usecases/task-run.js";
import { CliError } from "../../shared/errors.js";

import { renderTaskRunDryRunOutput, renderTaskRunExecutedOutput } from "./run-output.js";
import type { TaskRunParsed } from "./run.spec.js";

export { taskRunSpec } from "./run.spec.js";
export type { TaskRunParsed } from "./run.spec.js";

export const runTaskRun: CommandHandler<TaskRunParsed> = async (
  ctx: CommandCtx,
  parsed: TaskRunParsed,
) => {
  try {
    const commandCtx = await loadCommandContext({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
    });
    if (!parsed.dryRun) {
      const executed = await executeTaskRunnerExecution({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? null,
        task_id: parsed.taskId,
      });
      const output = renderTaskRunExecutedOutput({ taskId: parsed.taskId, executed });
      process.stdout.write(output.stdout);
      if (output.stderr) process.stderr.write(output.stderr);
      return executed.result.status === "success"
        ? 0
        : (executed.result.exit_code ?? exitCodeForError("E_RUNTIME"));
    }

    const prepared = await prepareTaskRunnerExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      mode: "dry_run",
    });
    const output = renderTaskRunDryRunOutput({ taskId: parsed.taskId, prepared });
    process.stdout.write(output.stdout);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task run", task_id: parsed.taskId });
  }
};
