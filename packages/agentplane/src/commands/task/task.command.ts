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
  summary: "Task lifecycle and task-store commands.",
  synopsis: ["agentplane task <subcommand> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<subcommand>" }],
  notes: [
    "Default guided path: task begin -> task verify-show -> task complete. The low-level primitives remain available for explicit audit gates.",
    "Direct task route: task new -> task plan set -> task plan approve -> task start-ready -> task verify-show -> verify -> finish.",
    "Before manually chaining low-level diagnostics, use `agentplane task status <task-id> --route` or `agentplane task next-action <task-id>` for a route decision.",
    "Use `agentplane help task plan`, `agentplane help task doc`, and `agentplane help task verify` to inspect task sub-areas.",
    "Verification recording and closure stay top-level lifecycle commands: `agentplane verify ...` and `agentplane finish ...`.",
  ],
  examples: [
    {
      cmd: 'agentplane task begin "Fix parser edge case" --tag code --verify "bun run test:fast"',
      why: "Create, plan, approve, and start or route a normal task.",
    },
    {
      cmd: 'agentplane task complete <task-id> --result "Parser edge case fixed" --commit <hash>',
      why: "Record OK verification and finish when the active workflow route allows it.",
    },
    {
      cmd: 'agentplane task new --title "..." --description "..." --owner CODER --tag code',
      why: "Create a task with the explicit primitive command.",
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
    {
      cmd: "agentplane task run <task-id>",
      why: "Run an existing task through the shared runner flow.",
    },
    {
      cmd: 'agentplane task handoff record <task-id> --from CODER --reason "Paused for handoff"',
      why: "Persist a first-class handoff snapshot.",
    },
    {
      cmd: 'agentplane task hosted-close --event-json "$GITHUB_EVENT_PATH"',
      why: "Apply deterministic task closure from a merged hosted PR event on an automation branch.",
    },
    {
      cmd: "agentplane task hosted-close-pr 202604091218-JREJ4K",
      why: "Open the hosted closure PR after a manual handoff comment leaves only the remote task-close branch.",
    },
    {
      cmd: "agentplane task resume-context <task-id>",
      why: "Inspect deterministic recovery context before resuming or retrying a run.",
    },
    {
      cmd: "agentplane task status <task-id> --route",
      why: "Inspect task state, branch_pr route blockers, and next safe command.",
    },
    {
      cmd: "agentplane task next-action <task-id>",
      why: "Print the single safest next command for the task route.",
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
