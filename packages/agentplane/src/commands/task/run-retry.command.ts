import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CliReportEntry } from "../../cli/output.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { retryTaskRunnerExecution } from "../../runner/usecases/task-run-lifecycle.js";

import type { TaskRunRetryParsed } from "./run-retry.spec.js";

export { taskRunRetrySpec } from "./run-retry.spec.js";
export type { TaskRunRetryParsed } from "./run-retry.spec.js";

const emitter = createCliEmitter();

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
    const entries: CliReportEntry[] = [
      { label: "source_run_id", value: retried.source_run_id },
      { label: "previous_status", value: retried.source_status },
      { label: "run_id", value: retried.invocation.run_id },
      { label: "adapter", value: retried.invocation.adapter_id },
      { label: "state", value: retried.invocation.state_path },
      { label: "events", value: retried.invocation.events_path },
      { label: "status", value: retried.result.status },
      { label: "runner_exit_code", value: retried.result.exit_code ?? "null" },
    ];
    if (retried.result.stdout_summary) {
      entries.push({ label: "stdout", value: retried.result.stdout_summary });
    }
    emitter.report(entries, {
      header: infoMessage(`task run retried: ${parsed.taskId}`),
    });
    if (retried.result.stderr_summary) {
      emitter.report([{ label: "stderr", value: retried.result.stderr_summary }], {
        stream: "stderr",
      });
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
