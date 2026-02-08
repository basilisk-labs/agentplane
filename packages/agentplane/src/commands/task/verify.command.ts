import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

export type TaskVerifyParsed = {
  subcommand?: string;
};

export const taskVerifySpec: CommandSpec<TaskVerifyParsed> = {
  id: ["task", "verify"],
  group: "Task",
  summary: "Record verification results (ok/rework).",
  synopsis: [
    "agentplane task verify ok <task-id> --by <id> --note <text> [--details <text> | --file <path>] [--quiet]",
    "agentplane task verify rework <task-id> --by <id> --note <text> [--details <text> | --file <path>] [--quiet]",
  ],
  args: [{ name: "subcommand", required: false, valueHint: "<ok|rework>" }],
  parse: (raw) => ({
    subcommand: typeof raw.args.subcommand === "string" ? raw.args.subcommand : undefined,
  }),
};

export function runTaskVerify(_ctx: CommandCtx, p: TaskVerifyParsed): Promise<number> {
  if (!p.subcommand) {
    throw usageError({ spec: taskVerifySpec, message: "Missing subcommand." });
  }
  throw usageError({ spec: taskVerifySpec, message: `Unknown subcommand: ${p.subcommand}` });
}
