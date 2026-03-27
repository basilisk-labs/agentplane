import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { directSubcommandNames, throwGroupCommandUsage } from "../../cli/group-command.js";
import { taskVerifyOkSpec } from "./verify-ok.command.js";
import { taskVerifyReworkSpec } from "./verify-rework.command.js";

export type TaskVerifyParsed = {
  subcommand?: string;
};

const TASK_VERIFY_CHILD_SPECS = [taskVerifyOkSpec, taskVerifyReworkSpec] as const;

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
  throwGroupCommandUsage({
    spec: taskVerifySpec,
    cmd: p.subcommand ? [p.subcommand] : [],
    subcommands: directSubcommandNames(["task", "verify"], TASK_VERIFY_CHILD_SPECS),
  });
}
