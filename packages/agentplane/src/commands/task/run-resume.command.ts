import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CliReportEntry } from "../../cli/output.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { resumeTaskRunnerExecution } from "../../runner/usecases/task-run-lifecycle.js";

import type { TaskRunResumeParsed } from "./run-resume.spec.js";

export { taskRunResumeSpec } from "./run-resume.spec.js";
export type { TaskRunResumeParsed } from "./run-resume.spec.js";

const emitter = createCliEmitter();

export const runTaskRunResume: CommandHandler<TaskRunResumeParsed> = async (
  ctx: CommandCtx,
  parsed: TaskRunResumeParsed,
) => {
  try {
    const commandCtx = await loadCommandContext({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
    });
    const resumed = await resumeTaskRunnerExecution({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    const entries: CliReportEntry[] = [
      { label: "run_id", value: parsed.runId },
      { label: "previous_status", value: resumed.previous_status },
      { label: "adapter", value: resumed.invocation.adapter_id },
      { label: "state", value: resumed.invocation.state_path },
      { label: "events", value: resumed.invocation.events_path },
      { label: "status", value: resumed.result.status },
      { label: "runner_exit_code", value: resumed.result.exit_code ?? "null" },
    ];
    if (resumed.result.stdout_summary) {
      entries.push({ label: "stdout", value: resumed.result.stdout_summary });
    }
    emitter.report(entries, {
      header: infoMessage(`task run resumed: ${parsed.taskId}`),
    });
    if (resumed.result.stderr_summary) {
      emitter.report([{ label: "stderr", value: resumed.result.stderr_summary }], {
        stream: "stderr",
      });
    }
    return resumed.result.status === "success"
      ? 0
      : (resumed.result.exit_code ?? exitCodeForError("E_RUNTIME"));
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task run resume",
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
  }
};
