import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { taskListUsecase } from "../../usecases/task/task-list-usecase.js";
import type { TaskListParsed } from "./list.spec.js";

export function makeRunTaskListHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskListParsed): Promise<number> => {
    return await taskListUsecase({
      cli: ctx,
      command: await getCtx("task list"),
      filters: p.filters,
    });
  };
}
