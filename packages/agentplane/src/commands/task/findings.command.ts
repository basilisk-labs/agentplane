import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { loadDirectSubcommandNames, throwGroupCommandUsage } from "../../cli/group-command.js";

export type TaskFindingsParsed = {
  subcommand?: string;
};

export const taskFindingsSpec: CommandSpec<TaskFindingsParsed> = {
  id: ["task", "findings"],
  group: "Task",
  summary: "Structured Findings/Notes commands; incident promotion is explicit opt-in.",
  synopsis: [
    "agentplane task findings add <task-id> --observation <text> --impact <text> --resolution <text> [--promote] [--external|--repo-fixable] [--incident-scope <text>] [--incident-tag <tag>] [--incident-match <term>] [--incident-advice <text>] [--incident-rule <text>] [--updated-by <id>]",
  ],
  args: [{ name: "subcommand", required: false, valueHint: "<add>" }],
  parse: (raw) => ({
    subcommand: typeof raw.args.subcommand === "string" ? raw.args.subcommand : undefined,
  }),
};

export async function runTaskFindings(_ctx: CommandCtx, p: TaskFindingsParsed): Promise<number> {
  throwGroupCommandUsage({
    spec: taskFindingsSpec,
    cmd: p.subcommand ? [p.subcommand] : [],
    subcommands: await loadDirectSubcommandNames(["task", "findings"]),
  });
}
