import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { suggestOne } from "../../cli/spec/suggest.js";

type TaskPlanGroupParsed = { cmd: string[] };

const TASK_PLAN_SUBCOMMANDS = ["set", "approve", "reject"] as const;

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
  parse: (raw) => ({ cmd: (raw.args.cmd ?? []) as string[] }),
};

export const runTaskPlan: CommandHandler<TaskPlanGroupParsed> = (_ctx: CommandCtx, p) => {
  const input = p.cmd.join(" ");
  const suggestion = suggestOne(input, [...TASK_PLAN_SUBCOMMANDS]);
  const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
  const message = p.cmd.length === 0 ? "Missing subcommand." : `Unknown subcommand: ${p.cmd[0]}.`;
  throw usageError({
    spec: taskPlanSpec,
    command: "task plan",
    message: `${message}${suffix}`,
    context: { command: "task plan" },
  });
};
