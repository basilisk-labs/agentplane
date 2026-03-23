import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";

export { taskRunSpec, type TaskRunParsed } from "./run.spec.js";

export const runTaskRun: CommandHandler<TaskRunParsed> = (
  _ctx: CommandCtx,
  _parsed: TaskRunParsed,
) => {
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      "Task runner runtime is not implemented yet. This command currently reserves the task run contract only.",
    context: { command: "task run" },
  });
};
