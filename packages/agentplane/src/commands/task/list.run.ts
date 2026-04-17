import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import { cmdTaskList } from "./list.js";
import type { TaskListParsed } from "./list.spec.js";

export function makeRunTaskListHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskListParsed): Promise<number> => {
    const command = await getCtx("task list");
    const execution = await makeReadOnlyExecutionContext(command);
    void execution.policy.evaluate({
      action: "task_list",
      config: execution.config,
      taskId: "",
      git: { stagedPaths: [] },
    });

    return await cmdTaskList({
      ctx: execution.command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      filters: p.filters,
    });
  };
}
