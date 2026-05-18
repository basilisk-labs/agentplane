import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { loadDirectSubcommandNames, throwGroupCommandUsage } from "../../cli/group-command.js";

export type TaskHandoffParsed = {
  subcommand?: string;
};

export const taskHandoffSpec: CommandSpec<TaskHandoffParsed> = {
  id: ["task", "handoff"],
  group: "Task",
  summary: "Task handoff commands (record/show).",
  synopsis: [
    "agentplane task handoff record <task-id> --from <role> --reason <text> [--to <role>]",
    "agentplane task handoff show <task-id> [--json]",
  ],
  args: [{ name: "subcommand", required: false, valueHint: "<record|show>" }],
  parse: (raw) => ({
    subcommand: typeof raw.args.subcommand === "string" ? raw.args.subcommand : undefined,
  }),
};

export async function runTaskHandoff(_ctx: CommandCtx, p: TaskHandoffParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: taskHandoffSpec,
    cmd: p.subcommand ? [p.subcommand] : [],
    subcommands: await loadDirectSubcommandNames(["task", "handoff"]),
  });
}
