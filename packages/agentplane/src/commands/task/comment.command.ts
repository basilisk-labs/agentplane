import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskComment } from "./comment.js";

export type TaskCommentParsed = {
  taskId: string;
  author: string;
  body: string;
};

export const taskCommentSpec: CommandSpec<TaskCommentParsed> = {
  id: ["task", "comment"],
  group: "Task",
  summary: "Append a comment to a task.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      required: true,
      description: "Comment author id (e.g. CODER).",
    },
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      required: true,
      description: "Comment body text.",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task comment 202602030608-F1Q8AB --author CODER --body "Investigated root cause."',
      why: "Add a comment and bump doc metadata.",
    },
  ],
  validateRaw: (raw) => {
    for (const k of ["author", "body"] as const) {
      const v = raw.opts[k];
      if (typeof v === "string" && v.trim() === "") {
        throw usageError({ spec: taskCommentSpec, message: `Invalid value for --${k}: empty.` });
      }
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      author: String(raw.opts.author),
      body: String(raw.opts.body),
    };
  },
};

export function makeRunTaskCommentHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskCommentParsed): Promise<number> => {
    return await cmdTaskComment({
      ctx: await getCtx("task comment"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      body: p.body,
    });
  };
}
