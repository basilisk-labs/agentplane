import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import type { CommandContext } from "../shared/task-backend.js";

import { successMessage } from "../../cli/output.js";

export type TaskRebuildIndexParsed = Record<string, never>;

export const taskRebuildIndexSpec: CommandSpec<TaskRebuildIndexParsed> = {
  id: ["task", "rebuild-index"],
  group: "Task",
  summary: "Rebuild the task index cache for the configured backend (best-effort).",
  examples: [{ cmd: "agentplane task rebuild-index", why: "Rebuild tasks index cache." }],
  parse: () => ({}),
};

export function makeRunTaskRebuildIndexHandler(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandHandler<TaskRebuildIndexParsed> {
  return async (_cliCtx: CommandCtx, _p: TaskRebuildIndexParsed): Promise<number> => {
    const ctx = await getCtx("task rebuild-index");

    // Local backend rebuilds the index as a side-effect of listing tasks.
    // Other backends may ignore the cache.
    await ctx.taskBackend.listTasks();

    console.log(successMessage("rebuild-index", undefined, "OK"));
    return 0;
  };
}
