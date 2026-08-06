import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
type TaskGroupParsed = GroupCommandParsed;

export const taskSpec: CommandSpec<TaskGroupParsed> = {
  id: ["task"],
  group: "Task",
  summary: "Supervisor-first task commands.",
  synopsis: [
    'agentplane task create "<desired outcome>" [options]',
    "agentplane task new --title <text> --description <text> --owner <id> [options]",
    "agentplane task active [options]",
    "agentplane task advance <task-id> --agent-json [options]",
    "agentplane task run <task-id> [options]",
    "agentplane task brief <task-id> [options]",
    "agentplane help --all  # diagnostics and compatibility commands",
  ],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<subcommand>" }],
  notes: [
    'Default external-agent path: task create "<outcome>" -> task advance --agent-json. Agentplane infers structured intent and an explainable route, then returns one bounded semantic action while retaining lifecycle authority.',
    "Default managed-agent path: create the task, then use task run to supervise the typed lifecycle and stop at any operator boundary.",
    "The generated Plan is an explicit placeholder: task plan approve fails until PLANNER or a human records a task-specific plan.",
    "Use `agentplane task next-action <task-id> --explain` only for full route diagnostics.",
    "Use `agentplane help --all` for diagnostic, recovery, and compatibility commands.",
  ],
  examples: [
    {
      cmd: 'agentplane task create "Fix the parser edge case"',
      why: "Create a task from the desired outcome and show its inferred execution route.",
    },
    {
      cmd: "agentplane task advance <task-id> --agent-json",
      why: "Return one compact external-agent action from the shared supervisor state.",
    },
    {
      cmd: "agentplane task run <task-id>",
      why: "After plan approval, let the managed runner resolve eligible semantic boundaries using the same supervisor state.",
    },
    {
      cmd: "agentplane task brief <task-id>",
      why: "Inspect a human-readable diagnostic brief when the compact action needs explanation.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const runTask: CommandHandler<GroupCommandParsed> = async (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: taskSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["task"]),
    command: "task",
  });
};
