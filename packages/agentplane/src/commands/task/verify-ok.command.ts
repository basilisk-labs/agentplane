import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskVerifyOk } from "./verify-record.js";

export type TaskVerifyOkParsed = {
  taskId: string;
  by: string;
  note: string;
  details?: string;
  file?: string;
  quiet: boolean;
};

export const taskVerifyOkSpec: CommandSpec<TaskVerifyOkParsed> = {
  id: ["task", "verify", "ok"],
  group: "Task",
  summary: "Record verification as OK (updates Verification section and verification frontmatter).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "by", valueHint: "<id>", required: true, description: "Verifier id." },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      required: true,
      description: "Short verification note.",
    },
    {
      kind: "string",
      name: "details",
      valueHint: "<text>",
      description: "Optional details text (mutually exclusive with --file).",
    },
    {
      kind: "string",
      name: "file",
      valueHint: "<path>",
      description: "Optional details file path (mutually exclusive with --details).",
    },
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress normal output (still prints errors).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task verify ok 202602030608-F1Q8AB --by REVIEWER --note "Looks good"',
      why: "Record an OK verification.",
    },
  ],
  validateRaw: (raw) => {
    const details = raw.opts.details;
    const file = raw.opts.file;
    if (typeof details === "string" && typeof file === "string") {
      throw usageError({
        spec: taskVerifyOkSpec,
        message: "Provide at most one of --details or --file.",
      });
    }
    const by = raw.opts.by;
    if (typeof by === "string" && by.trim().length === 0) {
      throw usageError({ spec: taskVerifyOkSpec, message: "Invalid value for --by: empty." });
    }
    const note = raw.opts.note;
    if (typeof note === "string" && note.trim().length === 0) {
      throw usageError({ spec: taskVerifyOkSpec, message: "Invalid value for --note: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    by: String(raw.opts.by),
    note: String(raw.opts.note),
    details: typeof raw.opts.details === "string" ? raw.opts.details : undefined,
    file: typeof raw.opts.file === "string" ? raw.opts.file : undefined,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunTaskVerifyOkHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskVerifyOkParsed): Promise<number> => {
    return await cmdTaskVerifyOk({
      ctx: await getCtx("task verify ok"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      by: p.by,
      note: p.note,
      details: p.details,
      file: p.file,
      quiet: p.quiet,
    });
  };
}
