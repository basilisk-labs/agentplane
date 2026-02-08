import type { CommandCtx, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";

export type TaskDocParsed = {
  subcommand?: string;
};

export const taskDocSpec: CommandSpec<TaskDocParsed> = {
  id: ["task", "doc"],
  group: "Task",
  summary: "Task doc commands (show/set).",
  synopsis: [
    "agentplane task doc show <task-id> [--section <name>] [--quiet]",
    "agentplane task doc set <task-id> --section <name> (--text <text> | --file <path>) [--updated-by <id>]",
  ],
  args: [{ name: "subcommand", required: false, valueHint: "<show|set>" }],
  parse: (raw) => {
    return {
      subcommand: typeof raw.args.subcommand === "string" ? raw.args.subcommand : undefined,
    };
  },
};

export function runTaskDoc(_ctx: CommandCtx, p: TaskDocParsed): Promise<number> {
  if (!p.subcommand) {
    throw usageError({ spec: taskDocSpec, message: "Missing subcommand." });
  }
  throw usageError({ spec: taskDocSpec, message: `Unknown subcommand: ${p.subcommand}` });
}
