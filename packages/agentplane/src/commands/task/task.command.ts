import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { suggestOne } from "../../cli/spec/suggest.js";

type TaskGroupParsed = { cmd: string[] };

const TASK_SUBCOMMANDS = [
  "add",
  "close-duplicate",
  "close-noop",
  "comment",
  "derive",
  "doc",
  "export",
  "lint",
  "list",
  "migrate",
  "migrate-doc",
  "new",
  "next",
  "normalize",
  "plan",
  "rebuild-index",
  "scrub",
  "search",
  "set-status",
  "show",
  "start-ready",
  "update",
  "verify",
  "verify-show",
] as const;

export const taskSpec: CommandSpec<TaskGroupParsed> = {
  id: ["task"],
  group: "Task",
  summary: "Task lifecycle and task-store commands.",
  synopsis: ["agentplane task <subcommand> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<subcommand>" }],
  notes: [
    "Direct task route: task new -> task plan set -> task plan approve -> task start-ready -> task verify-show -> verify -> finish.",
    "Use `agentplane help task plan`, `agentplane help task doc`, and `agentplane help task verify` to inspect task sub-areas.",
    "Verification recording and closure stay top-level lifecycle commands: `agentplane verify ...` and `agentplane finish ...`.",
  ],
  examples: [
    {
      cmd: 'agentplane task new --title "..." --description "..." --owner CODER --tag code',
      why: "Create a task.",
    },
    {
      cmd: 'agentplane task plan set <task-id> --text "..." --updated-by ORCHESTRATOR',
      why: "Write the execution plan.",
    },
    {
      cmd: 'agentplane task start-ready <task-id> --author CODER --body "Start: ..."',
      why: "Start the task after approval.",
    },
    {
      cmd: "agentplane task verify-show <task-id>",
      why: "Show Verify Steps before running checks.",
    },
  ],
  parse: (raw) => ({ cmd: (raw.args.cmd ?? []) as string[] }),
};

export const runTask: CommandHandler<TaskGroupParsed> = (_ctx: CommandCtx, p) => {
  const input = p.cmd.join(" ");
  const suggestion = suggestOne(input, [...TASK_SUBCOMMANDS]);
  const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
  const message = p.cmd.length === 0 ? "Missing subcommand." : `Unknown subcommand: ${p.cmd[0]}.`;
  throw usageError({
    spec: taskSpec,
    command: "task",
    message: `${message}${suffix}`,
    context: { command: "task" },
  });
};
