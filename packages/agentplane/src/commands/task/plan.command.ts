import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
type TaskPlanGroupParsed = GroupCommandParsed;

export const taskPlanSpec: CommandSpec<TaskPlanGroupParsed> = {
  id: ["task", "plan"],
  group: "Task",
  summary: "Task plan commands (set/approve/reject).",
  synopsis: ["agentplane task plan <set|approve|reject> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<subcommand>" }],
  examples: [
    {
      cmd: 'agentplane task plan set <task-id> --text "..." --updated-by ORCHESTRATOR',
      why: "Write or replace the task plan.",
    },
    {
      cmd: "agentplane task plan approve <task-id> --by ORCHESTRATOR",
      why: "Approve the current task plan.",
    },
    {
      cmd: 'agentplane task plan reject <task-id> --by ORCHESTRATOR --note "..."',
      why: "Reject the current task plan with a note.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const runTaskPlan: CommandHandler<GroupCommandParsed> = async (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: taskPlanSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["task", "plan"]),
    command: "task plan",
  });
};
