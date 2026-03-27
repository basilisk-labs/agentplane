import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { directSubcommandNames, throwGroupCommandUsage } from "../../cli/group-command.js";
import { taskDocSetSpec } from "./doc-set.command.js";
import { taskDocShowSpec } from "./doc-show.command.js";

export type TaskDocParsed = {
  subcommand?: string;
};

const TASK_DOC_CHILD_SPECS = [taskDocShowSpec, taskDocSetSpec] as const;

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

export function runTaskDoc(_ctx: CommandCtx, p: TaskDocParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: taskDocSpec,
    cmd: p.subcommand ? [p.subcommand] : [],
    subcommands: directSubcommandNames(["task", "doc"], TASK_DOC_CHILD_SPECS),
  });
}
