import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskShow } from "./show.js";
import type { TaskShowParsed } from "./show.spec.js";

export function makeRunTaskShowHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskShowParsed): Promise<number> => {
    return await cmdTaskShow({
      ctx: await getCtx("task show"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
    });
  };
}
