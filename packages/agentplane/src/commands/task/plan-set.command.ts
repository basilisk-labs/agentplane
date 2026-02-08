import type { CommandCtx, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskPlanSet } from "./plan.js";

export type TaskPlanSetParsed = {
  taskId: string;
  text?: string;
  file?: string;
  updatedBy?: string;
};

export const taskPlanSetSpec: CommandSpec<TaskPlanSetParsed> = {
  id: ["task", "plan", "set"],
  group: "Task",
  summary: "Set a task plan (writes the Plan section and resets plan approval to pending).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "text",
      valueHint: "<text>",
      description: "Plan text to write into the task README Plan section.",
    },
    {
      kind: "string",
      name: "file",
      valueHint: "<path>",
      description: "Read plan text from a file path (relative to cwd).",
    },
    {
      kind: "string",
      name: "updated-by",
      valueHint: "<id>",
      description: "Optional. Sets doc_updated_by when writing the plan.",
    },
  ],
  examples: [
    {
      cmd: String.raw`agentplane task plan set 202602030608-F1Q8AB --text "1) Do X\n2) Verify Y" --updated-by ORCHESTRATOR`,
      why: "Write plan from text and set doc_updated_by.",
    },
    {
      cmd: "agentplane task plan set 202602030608-F1Q8AB --file plan.md",
      why: "Write plan from a file.",
    },
  ],
  validateRaw: (raw) => {
    const hasText = typeof raw.opts.text === "string";
    const hasFile = typeof raw.opts.file === "string";
    if (hasText === hasFile) {
      throw usageError({
        spec: taskPlanSetSpec,
        message: "Provide exactly one of --text or --file.",
      });
    }
    const updatedBy = raw.opts["updated-by"];
    if (typeof updatedBy === "string" && updatedBy.trim().length === 0) {
      throw usageError({
        spec: taskPlanSetSpec,
        message: "Invalid value for --updated-by: empty.",
      });
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      text: typeof raw.opts.text === "string" ? raw.opts.text : undefined,
      file: typeof raw.opts.file === "string" ? raw.opts.file : undefined,
      updatedBy: typeof raw.opts["updated-by"] === "string" ? raw.opts["updated-by"] : undefined,
    };
  },
};

export function makeRunTaskPlanSetHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskPlanSetParsed): Promise<number> => {
    return await cmdTaskPlanSet({
      ctx: await getCtx("task plan set"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      text: p.text,
      file: p.file,
      updatedBy: p.updatedBy,
    });
  };
}
