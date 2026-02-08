import type { CommandCtx, CommandSpec } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdReady } from "./task/ready.js";

export type ReadyParsed = { taskId: string };

export const readySpec: CommandSpec<ReadyParsed> = {
  id: ["ready"],
  group: "Task",
  summary: "Report dependency readiness details for a task.",
  args: [
    {
      name: "task-id",
      required: true,
      valueHint: "<task-id>",
      description: "Existing task id.",
    },
  ],
  examples: [{ cmd: "agentplane ready 202602030608-F1Q8AB", why: "Print readiness details." }],
  parse: (raw) => ({
    taskId: typeof raw.args["task-id"] === "string" ? raw.args["task-id"] : "",
  }),
};

export function makeRunReadyHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: ReadyParsed): Promise<number> => {
    return await cmdReady({
      ctx: await getCtx("ready"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
    });
  };
}
