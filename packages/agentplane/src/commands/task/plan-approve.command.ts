import type { CommandCtx, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskPlanApprove } from "./plan.js";

export type TaskPlanApproveParsed = {
  taskId: string;
  by: string;
  note?: string;
};

export const taskPlanApproveSpec: CommandSpec<TaskPlanApproveParsed> = {
  id: ["task", "plan", "approve"],
  group: "Task",
  summary: "Approve the current task plan (enforces Verify Steps gating when configured).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "by",
      valueHint: "<id>",
      required: true,
      description: "Approver id.",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      description: "Optional note (stored in plan_approval.note).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task plan approve 202602030608-F1Q8AB --by USER --note "OK"',
      why: "Approve a plan with a note.",
    },
  ],
  validateRaw: (raw) => {
    const by = raw.opts.by;
    if (typeof by === "string" && by.trim().length === 0) {
      throw usageError({ spec: taskPlanApproveSpec, message: "Invalid value for --by: empty." });
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      by: String(raw.opts.by),
      note: typeof raw.opts.note === "string" ? raw.opts.note : undefined,
    };
  },
};

export function makeRunTaskPlanApproveHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskPlanApproveParsed): Promise<number> => {
    return await cmdTaskPlanApprove({
      ctx: await getCtx("task plan approve"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      by: p.by,
      note: p.note,
    });
  };
}
