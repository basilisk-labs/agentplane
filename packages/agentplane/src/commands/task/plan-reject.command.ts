import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskPlanReject } from "./plan.js";

export type TaskPlanRejectParsed = {
  taskId: string;
  by: string;
  note: string;
};

export const taskPlanRejectSpec: CommandSpec<TaskPlanRejectParsed> = {
  id: ["task", "plan", "reject"],
  group: "Task",
  summary: "Reject the current task plan (requires a note).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "by",
      valueHint: "<id>",
      required: true,
      description: "Reviewer id.",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      required: true,
      description: "Required note explaining what needs to change.",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task plan reject 202602030608-F1Q8AB --by USER --note "Need clarification"',
      why: "Reject a plan with a note.",
    },
  ],
  validateRaw: (raw) => {
    const by = raw.opts.by;
    if (typeof by === "string" && by.trim().length === 0) {
      throw usageError({ spec: taskPlanRejectSpec, message: "Invalid value for --by: empty." });
    }
    const note = raw.opts.note;
    if (typeof note === "string" && note.trim().length === 0) {
      throw usageError({ spec: taskPlanRejectSpec, message: "Invalid value for --note: empty." });
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      by: String(raw.opts.by),
      note: String(raw.opts.note),
    };
  },
};

export function makeRunTaskPlanRejectHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskPlanRejectParsed): Promise<number> => {
    return await cmdTaskPlanReject({
      ctx: await getCtx("task plan reject"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      by: p.by,
      note: p.note,
    });
  };
}
