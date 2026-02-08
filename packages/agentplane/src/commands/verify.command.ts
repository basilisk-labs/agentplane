import type { CommandCtx, CommandSpec } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdVerifyParsed } from "./task/verify-record.js";

type VerifyState = "ok" | "needs_rework";

export type VerifyParsed = {
  taskId: string;
  state: VerifyState;
  by: string;
  note: string;
  details?: string;
  file?: string;
  quiet: boolean;
};

export const verifySpec: CommandSpec<VerifyParsed> = {
  id: ["verify"],
  group: "Lifecycle",
  summary: "Record a verification outcome for a task (record-only; does not execute commands).",
  args: [
    {
      name: "task-id",
      required: true,
      valueHint: "<task-id>",
      description: "Existing task id.",
    },
  ],
  options: [
    {
      kind: "boolean",
      name: "ok",
      default: false,
      description: "Record an OK verification outcome.",
    },
    {
      kind: "boolean",
      name: "rework",
      default: false,
      description: "Record a needs-rework verification outcome.",
    },
    {
      kind: "string",
      name: "by",
      valueHint: "<id>",
      required: true,
      description: "Verifier id (e.g. REVIEWER).",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      required: true,
      description: "Short note describing the verification outcome.",
    },
    {
      kind: "string",
      name: "details",
      valueHint: "<text>",
      description: "Optional free-form details (mutually exclusive with --file).",
    },
    {
      kind: "string",
      name: "file",
      valueHint: "<path>",
      description: "Read details from a file path (mutually exclusive with --details).",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Suppress output." },
  ],
  examples: [
    {
      cmd: 'agentplane verify 202602030608-F1Q8AB --ok --by REVIEWER --note "Looks good" --quiet',
      why: "Record an OK verification outcome.",
    },
    {
      cmd: 'agentplane verify 202602030608-F1Q8AB --rework --by REVIEWER --note "Needs changes" --details "Missing tests"',
      why: "Record a needs-rework outcome with details.",
    },
  ],
  validateRaw: (raw) => {
    const ok = raw.opts.ok === true;
    const rework = raw.opts.rework === true;
    if (ok === rework) {
      throw usageError({
        spec: verifySpec,
        command: "verify",
        message: "Exactly one of --ok or --rework must be provided.",
      });
    }
    if (typeof raw.opts.details === "string" && typeof raw.opts.file === "string") {
      throw usageError({
        spec: verifySpec,
        command: "verify",
        message: "Options --details and --file are mutually exclusive.",
      });
    }
  },
  parse: (raw) => {
    const ok = raw.opts.ok === true;
    const state: VerifyState = ok ? "ok" : "needs_rework";
    return {
      taskId: typeof raw.args["task-id"] === "string" ? raw.args["task-id"] : "",
      state,
      by: raw.opts.by as string,
      note: raw.opts.note as string,
      details: raw.opts.details as string | undefined,
      file: raw.opts.file as string | undefined,
      quiet: raw.opts.quiet === true,
    };
  },
};

export function makeRunVerifyHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: VerifyParsed): Promise<number> => {
    return await cmdVerifyParsed({
      ctx: await getCtx("verify"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      state: p.state,
      by: p.by,
      note: p.note,
      details: p.details,
      file: p.file,
      quiet: p.quiet,
    });
  };
}
