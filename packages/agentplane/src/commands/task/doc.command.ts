import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { loadDirectSubcommandNames, throwGroupCommandUsage } from "../../cli/group-command.js";

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
    "agentplane task doc set <task-id> --full-doc (--text <text> | --file <path>) [--updated-by <id>]",
  ],
  args: [{ name: "subcommand", required: false, valueHint: "<show|set>" }],
  parse: (raw) => {
    return {
      subcommand: typeof raw.args.subcommand === "string" ? raw.args.subcommand : undefined,
    };
  },
};

export async function runTaskDoc(_ctx: CommandCtx, p: TaskDocParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: taskDocSpec,
    cmd: p.subcommand ? [p.subcommand] : [],
    subcommands: await loadDirectSubcommandNames(["task", "doc"]),
  });
}
