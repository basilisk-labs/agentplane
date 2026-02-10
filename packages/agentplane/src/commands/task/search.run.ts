import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskSearch } from "./search.js";
import type { TaskSearchParsed } from "./search.spec.js";

export function makeRunTaskSearchHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskSearchParsed): Promise<number> => {
    return await cmdTaskSearch({
      ctx: await getCtx("task search"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      query: p.query,
      regex: p.regex,
      filters: p.filters,
    });
  };
}
