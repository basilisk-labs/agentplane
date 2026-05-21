import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdTaskList } from "./list.js";
import type { TaskListParsed } from "./list.spec.js";

export function makeRunTaskListHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskListParsed): Promise<number> => {
    const command = await getCtx("task list");
    return await cmdTaskList({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      filters: p.filters,
    });
  };
}
