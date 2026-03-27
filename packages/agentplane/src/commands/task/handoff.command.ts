import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { directSubcommandNames, throwGroupCommandUsage } from "../../cli/group-command.js";

import { taskHandoffRecordSpec } from "./handoff-record.command.js";
import { taskHandoffShowSpec } from "./handoff-show.command.js";

export type TaskHandoffParsed = {
  subcommand?: string;
};

const TASK_HANDOFF_CHILD_SPECS = [taskHandoffRecordSpec, taskHandoffShowSpec] as const;

export const taskHandoffSpec: CommandSpec<TaskHandoffParsed> = {
  id: ["task", "handoff"],
  group: "Task",
  summary: "Task handoff commands (record/show).",
  synopsis: [
    "agentplane task handoff record <task-id> --from <role> --reason <text> [--to <role>] [--run-id <id>]",
    "agentplane task handoff show <task-id> [--json]",
  ],
  args: [{ name: "subcommand", required: false, valueHint: "<record|show>" }],
  parse: (raw) => ({
    subcommand: typeof raw.args.subcommand === "string" ? raw.args.subcommand : undefined,
  }),
};

export function runTaskHandoff(_ctx: CommandCtx, p: TaskHandoffParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: taskHandoffSpec,
    cmd: p.subcommand ? [p.subcommand] : [],
    subcommands: directSubcommandNames(["task", "handoff"], TASK_HANDOFF_CHILD_SPECS),
  });
}
