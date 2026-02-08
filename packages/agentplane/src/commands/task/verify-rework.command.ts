import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskVerifyRework } from "./verify-record.js";

export type TaskVerifyReworkParsed = {
  taskId: string;
  by: string;
  note: string;
  details?: string;
  file?: string;
  quiet: boolean;
};

export const taskVerifyReworkSpec: CommandSpec<TaskVerifyReworkParsed> = {
  id: ["task", "verify", "rework"],
  group: "Task",
  summary:
    "Record verification as needs rework (resets commit, sets status to DOING, updates Verification).",
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
      cmd: 'agentplane task verify rework 202602030608-F1Q8AB --by REVIEWER --note "Needs changes"',
      why: "Record a needs-rework verification.",
    },
  ],
  validateRaw: (raw) => {
    const details = raw.opts.details;
    const file = raw.opts.file;
    if (typeof details === "string" && typeof file === "string") {
      throw usageError({
        spec: taskVerifyReworkSpec,
        message: "Provide at most one of --details or --file.",
      });
    }
    const by = raw.opts.by;
    if (typeof by === "string" && by.trim().length === 0) {
      throw usageError({ spec: taskVerifyReworkSpec, message: "Invalid value for --by: empty." });
    }
    const note = raw.opts.note;
    if (typeof note === "string" && note.trim().length === 0) {
      throw usageError({ spec: taskVerifyReworkSpec, message: "Invalid value for --note: empty." });
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

export function makeRunTaskVerifyReworkHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskVerifyReworkParsed): Promise<number> => {
    return await cmdTaskVerifyRework({
      ctx: await getCtx("task verify rework"),
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
