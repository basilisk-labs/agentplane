import type { CommandCtx, CommandSpec } from "../../cli2/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskDocShow } from "./doc.js";

export type TaskVerifyShowParsed = {
  taskId: string;
  quiet: boolean;
};

export const taskVerifyShowSpec: CommandSpec<TaskVerifyShowParsed> = {
  id: ["task", "verify-show"],
  group: "Task",
  summary:
    'Print the task Verify Steps section (alias for task doc show --section "Verify Steps").',
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress errors when the section is missing.",
    },
  ],
  examples: [
    { cmd: "agentplane task verify-show 202602030608-F1Q8AB", why: "Print Verify Steps." },
    {
      cmd: "agentplane task verify-show 202602030608-F1Q8AB --quiet",
      why: "Print Verify Steps without erroring when missing.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunTaskVerifyShowHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskVerifyShowParsed): Promise<number> => {
    return await cmdTaskDocShow({
      ctx: await getCtx("task verify-show"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      section: "Verify Steps",
      quiet: p.quiet,
    });
  };
}
