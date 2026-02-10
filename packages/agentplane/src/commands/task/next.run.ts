import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskNext } from "./next.js";
import type { TaskNextParsed } from "./next.spec.js";

export function makeRunTaskNextHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskNextParsed): Promise<number> => {
    return await cmdTaskNext({
      ctx: await getCtx("task next"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      filters: p.filters,
    });
  };
}
