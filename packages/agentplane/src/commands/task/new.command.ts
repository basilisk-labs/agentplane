import type { CommandHandler, CommandCtx } from "../../cli/spec/spec.js";

import type { TaskNewParsed } from "./new.js";
import { runTaskNewParsed } from "./new.js";
import type { CommandContext } from "../shared/task-backend.js";

export { taskNewSpec } from "./new.spec.js";

export function makeRunTaskNewHandler(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandHandler<TaskNewParsed> {
  return async (ctx: CommandCtx, p: TaskNewParsed) => {
    const commandCtx = await getCtx("task new");
    return await runTaskNewParsed({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      parsed: p,
    });
  };
}
