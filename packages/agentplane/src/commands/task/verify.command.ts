import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { loadDirectSubcommandNames, throwGroupCommandUsage } from "../../cli/group-command.js";

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

export async function runTaskVerify(_ctx: CommandCtx, p: TaskVerifyParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: taskVerifySpec,
    cmd: p.subcommand ? [p.subcommand] : [],
    subcommands: await loadDirectSubcommandNames(["task", "verify"]),
  });
}
