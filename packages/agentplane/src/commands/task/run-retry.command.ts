import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage } from "../../cli/output.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { retryTaskRunnerExecution } from "../../runner/usecases/task-run-lifecycle.js";

import type { TaskRunRetryParsed } from "./run-retry.spec.js";

export { taskRunRetrySpec } from "./run-retry.spec.js";
export type { TaskRunRetryParsed } from "./run-retry.spec.js";

export const runTaskRunRetry: CommandHandler<TaskRunRetryParsed> = async (
  ctx: CommandCtx,
  parsed: TaskRunRetryParsed,
) => {
  try {
    const commandCtx = await loadCommandContext({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
    });
    const retried = await retryTaskRunnerExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    process.stdout.write(`${infoMessage(`task run retried: ${parsed.taskId}`)}\n`);
    process.stdout.write(`source_run_id: ${retried.source_run_id}\n`);
    process.stdout.write(`previous_status: ${retried.source_status}\n`);
    process.stdout.write(`run_id: ${retried.invocation.run_id}\n`);
    process.stdout.write(`adapter: ${retried.invocation.adapter_id}\n`);
    process.stdout.write(`state: ${retried.invocation.state_path}\n`);
    process.stdout.write(`events: ${retried.invocation.events_path}\n`);
    process.stdout.write(`status: ${retried.result.status}\n`);
    process.stdout.write(`runner_exit_code: ${retried.result.exit_code ?? "null"}\n`);
    if (retried.result.stdout_summary) {
      process.stdout.write(`stdout: ${retried.result.stdout_summary}\n`);
    }
    if (retried.result.stderr_summary) {
      process.stderr.write(`stderr: ${retried.result.stderr_summary}\n`);
    }
    return retried.result.status === "success"
      ? 0
      : (retried.result.exit_code ?? exitCodeForError("E_RUNTIME"));
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task run retry",
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
  }
};
