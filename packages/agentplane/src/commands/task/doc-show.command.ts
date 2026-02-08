import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskDocShow } from "./doc.js";

export type TaskDocShowParsed = {
  taskId: string;
  section?: string;
  quiet: boolean;
};

export const taskDocShowSpec: CommandSpec<TaskDocShowParsed> = {
  id: ["task", "doc", "show"],
  group: "Task",
  summary: "Print task README content (entire doc or one section).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "section",
      valueHint: "<name>",
      description: "Optional. Print a single section.",
    },
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress informational output when doc/section content is missing.",
    },
  ],
  examples: [
    { cmd: "agentplane task doc show 202602030608-F1Q8AB", why: "Print the full doc." },
    {
      cmd: "agentplane task doc show 202602030608-F1Q8AB --section Summary",
      why: "Print a single section.",
    },
  ],
  validateRaw: (raw) => {
    const section = raw.opts.section;
    if (typeof section === "string" && section.trim() === "") {
      throw usageError({ spec: taskDocShowSpec, message: "Invalid value for --section: empty." });
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      section: typeof raw.opts.section === "string" ? raw.opts.section : undefined,
      quiet: raw.opts.quiet === true,
    };
  },
};

export function makeRunTaskDocShowHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskDocShowParsed): Promise<number> => {
    return await cmdTaskDocShow({
      ctx: await getCtx("task doc show"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      section: p.section,
      quiet: p.quiet,
    });
  };
}
