import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { readTaskRunnerTraceArtifact } from "../../runner/usecases/task-run-inspect.js";

import type { TaskRunTraceParsed } from "./run-trace.spec.js";

export { taskRunTraceSpec } from "./run-trace.spec.js";
export type { TaskRunTraceParsed } from "./run-trace.spec.js";

export const runTaskRunTrace: CommandHandler<TaskRunTraceParsed> = async (
  ctx: CommandCtx,
  parsed: TaskRunTraceParsed,
) => {
  try {
    const traced = await readTaskRunnerTraceArtifact({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
    });
    process.stdout.write(traced.trace_text);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task run trace",
      task_id: parsed.taskId,
      run_id: parsed.runId ?? null,
    });
  }
};
