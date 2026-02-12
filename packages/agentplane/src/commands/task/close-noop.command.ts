import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdTaskCloseNoop } from "./close-noop.js";

type TaskCloseNoopParsed = {
  taskId: string;
  author: string;
  note?: string;
  force: boolean;
  yes: boolean;
  quiet: boolean;
};

export const taskCloseNoopSpec: CommandSpec<TaskCloseNoopParsed> = {
  id: ["task", "close-noop"],
  group: "Task",
  summary: "Close a task as a verified no-op in one command.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      required: true,
      description: "Comment author id (e.g. ORCHESTRATOR).",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      description: "Optional closure note.",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Override status/verification gates.",
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
      cmd: 'agentplane task close-noop 202602030608-F1Q8AB --author ORCHESTRATOR --note "Duplicate tracking artifact"',
      why: "Close bookkeeping-only tasks without manual verify+finish choreography.",
    },
  ],
  validateRaw: (raw) => {
    const taskId = typeof raw.args["task-id"] === "string" ? raw.args["task-id"].trim() : "";
    const author = typeof raw.opts.author === "string" ? raw.opts.author.trim() : "";
    const note = raw.opts.note;
    if (!taskId)
      throw usageError({ spec: taskCloseNoopSpec, message: "Invalid value for task-id: empty." });
    if (!author)
      throw usageError({ spec: taskCloseNoopSpec, message: "Invalid value for --author: empty." });
    if (typeof note === "string" && note.trim().length === 0) {
      throw usageError({ spec: taskCloseNoopSpec, message: "Invalid value for --note: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    author: String(raw.opts.author),
    note: typeof raw.opts.note === "string" ? raw.opts.note : undefined,
    force: raw.opts.force === true,
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunTaskCloseNoopHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskCloseNoopParsed): Promise<number> => {
    return await cmdTaskCloseNoop({
      ctx: await getCtx("task close-noop"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      note: p.note,
      force: p.force,
      yes: p.yes,
      quiet: p.quiet,
    });
  };
}
