import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveTextPayload, validateTextPayloadSource } from "../shared/text-payload.js";

import { cmdTaskComment } from "./comment.js";

export type TaskCommentParsed = {
  taskId: string;
  author: string;
  body?: string;
  bodyFile?: string;
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
      description: "Comment body text. Use --body-file for Markdown or shell-sensitive text.",
    },
    {
      kind: "string",
      name: "body-file",
      valueHint: "<path>",
      description: "Read the comment body from a file path (mutually exclusive with --body).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task comment 202602030608-F1Q8AB --author CODER --body "Investigated root cause."',
      why: "Add a comment and bump doc metadata.",
    },
  ],
  validateRaw: (raw) => {
    const author = raw.opts.author;
    if (typeof author === "string" && author.trim() === "") {
      throw usageError({ spec: taskCommentSpec, message: "Invalid value for --author: empty." });
    }
    validateTextPayloadSource(
      raw,
      taskCommentSpec,
      { inline: "body", file: "body-file", label: "comment body" },
      { required: true },
    );
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      author: String(raw.opts.author),
      body: typeof raw.opts.body === "string" ? raw.opts.body : undefined,
      bodyFile: typeof raw.opts["body-file"] === "string" ? raw.opts["body-file"] : undefined,
    };
  },
};

export function makeRunTaskCommentHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskCommentParsed): Promise<number> => {
    const body = await resolveTextPayload({
      cwd: ctx.cwd,
      inline: p.body,
      file: p.bodyFile,
      label: "task comment body",
    });
    return await cmdTaskComment({
      ctx: await getCtx("task comment"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      body,
    });
  };
}
