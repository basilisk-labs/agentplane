import type { CommandHandler, CommandCtx } from "../../cli/spec/spec.js";

import type { TaskNewParsed } from "./new.js";
import type { CommandContext } from "../shared/task-backend.js";
import { taskNewUsecase } from "../../usecases/task/task-new-usecase.js";

export { taskNewSpec } from "./new.spec.js";

export function makeRunTaskNewHandler(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandHandler<TaskNewParsed> {
  return async (ctx: CommandCtx, p: TaskNewParsed) => {
    return await taskNewUsecase({ cli: ctx, command: await getCtx("task new"), parsed: p });
  };
}
