import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { readTaskRunnerTraceTail } from "../../runner/usecases/task-run-inspect.js";

import type { TaskRunTailParsed } from "./run-tail.spec.js";

export { taskRunTailSpec } from "./run-tail.spec.js";
export type { TaskRunTailParsed } from "./run-tail.spec.js";

export const runTaskRunTail: CommandHandler<TaskRunTailParsed> = async (
  ctx: CommandCtx,
  parsed: TaskRunTailParsed,
) => {
  try {
    const tailed = await readTaskRunnerTraceTail({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      task_id: parsed.taskId,
      run_id: parsed.runId,
      lines: parsed.lines,
    });
    process.stdout.write(tailed.tail_text);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task run tail",
      task_id: parsed.taskId,
      run_id: parsed.runId ?? null,
    });
  }
};
