import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdTaskStartReady } from "./start-ready.js";

type TaskStartReadyParsed = {
  taskId: string;
  author: string;
  body: string;
  force: boolean;
  yes: boolean;
  quiet: boolean;
};

export const taskStartReadySpec: CommandSpec<TaskStartReadyParsed> = {
  id: ["task", "start-ready"],
  group: "Task",
  summary: "Run readiness checks and start a task in one deterministic command.",
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
      description: "Structured Start comment body.",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Override readiness and transition checks.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve force-action checks when required.",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Suppress output." },
  ],
  examples: [
    {
      cmd: 'agentplane task start-ready 202602030608-F1Q8AB --author CODER --body "Start: implement parser hardening"',
      why: "Check readiness and transition to DOING without command chaining.",
    },
  ],
  validateRaw: (raw) => {
    const taskId = typeof raw.args["task-id"] === "string" ? raw.args["task-id"].trim() : "";
    const author = typeof raw.opts.author === "string" ? raw.opts.author.trim() : "";
    const body = typeof raw.opts.body === "string" ? raw.opts.body.trim() : "";
    if (!taskId)
      throw usageError({ spec: taskStartReadySpec, message: "Invalid value for task-id: empty." });
    if (!author)
      throw usageError({ spec: taskStartReadySpec, message: "Invalid value for --author: empty." });
    if (!body)
      throw usageError({ spec: taskStartReadySpec, message: "Invalid value for --body: empty." });
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    author: String(raw.opts.author),
    body: String(raw.opts.body),
    force: raw.opts.force === true,
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunTaskStartReadyHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskStartReadyParsed): Promise<number> => {
    return await cmdTaskStartReady({
      ctx: await getCtx("task start-ready"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      body: p.body,
      force: p.force,
      yes: p.yes,
      quiet: p.quiet,
    });
  };
}
