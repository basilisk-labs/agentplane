import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskShow } from "./show.js";

export type TaskShowParsed = { taskId: string };

export const taskShowSpec: CommandSpec<TaskShowParsed> = {
  id: ["task", "show"],
  group: "Task",
  summary: "Print task metadata as JSON (frontmatter shape).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  examples: [{ cmd: "agentplane task show 202602030608-F1Q8AB", why: "Show task metadata." }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]) }),
};

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
