import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdTaskCloseDuplicate } from "./close-duplicate.js";

export type TaskCloseDuplicateParsed = {
  taskId: string;
  duplicateOf: string;
  author: string;
  note?: string;
  force: boolean;
  yes: boolean;
  quiet: boolean;
};

export const taskCloseDuplicateSpec: CommandSpec<TaskCloseDuplicateParsed> = {
  id: ["task", "close-duplicate"],
  group: "Task",
  summary: "Close a task as a duplicate of another task with no-op bookkeeping metadata.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "of",
      valueHint: "<task-id>",
      required: true,
      description: "Canonical task id that this task duplicates.",
    },
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
      description: "Optional short reason appended to the closure comment.",
    },
    { kind: "boolean", name: "force", default: false, description: "Force closure despite gates." },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve force-action approval checks when required.",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Suppress output." },
  ],
  examples: [
    {
      cmd: "agentplane task close-duplicate 202602120845-VKGC27 --of 202602120845-RWJ8K3 --author ORCHESTRATOR",
      why: "Close accidental duplicate task in one command.",
    },
  ],
  validateRaw: (raw) => {
    const taskId = typeof raw.args["task-id"] === "string" ? raw.args["task-id"].trim() : "";
    const of = typeof raw.opts.of === "string" ? raw.opts.of.trim() : "";
    const author = typeof raw.opts.author === "string" ? raw.opts.author.trim() : "";
    const note = raw.opts.note;
    if (!taskId) {
      throw usageError({
        spec: taskCloseDuplicateSpec,
        message: "Invalid value for task-id: empty.",
      });
    }
    if (!of) {
      throw usageError({ spec: taskCloseDuplicateSpec, message: "Invalid value for --of: empty." });
    }
    if (!author) {
      throw usageError({
        spec: taskCloseDuplicateSpec,
        message: "Invalid value for --author: empty.",
      });
    }
    if (typeof note === "string" && note.trim().length === 0) {
      throw usageError({
        spec: taskCloseDuplicateSpec,
        message: "Invalid value for --note: empty.",
      });
    }
    if (taskId === of) {
      throw usageError({
        spec: taskCloseDuplicateSpec,
        message: "Duplicate target must differ from task-id.",
      });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    duplicateOf: String(raw.opts.of),
    author: String(raw.opts.author),
    note: typeof raw.opts.note === "string" ? raw.opts.note : undefined,
    force: raw.opts.force === true,
    yes: raw.opts.yes === true,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunTaskCloseDuplicateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskCloseDuplicateParsed): Promise<number> => {
    return await cmdTaskCloseDuplicate({
      ctx: await getCtx("task close-duplicate"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      duplicateOf: p.duplicateOf,
      author: p.author,
      note: p.note,
      force: p.force,
      yes: p.yes,
      quiet: p.quiet,
    });
  };
}
