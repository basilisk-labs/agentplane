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
    "Default external-agent path: task new -> task advance --agent-json. The packet exposes one bounded action while Agentplane retains lifecycle authority.",
    "Default managed-agent path: create and approve the task, then use task run to supervise the typed lifecycle.",
    "Direct task route: task new -> task plan set -> task plan approve -> task start-ready -> task verify-show -> verify -> finish.",
    "Use `agentplane task next-action <task-id> --explain` only for full route diagnostics.",
    "Use `agentplane help task plan`, `agentplane help task doc`, and `agentplane help task verify` to inspect task sub-areas.",
    "Verification recording and closure stay top-level lifecycle commands: `agentplane verify ...` and `agentplane finish ...`.",
  ],
  examples: [
    {
      cmd: 'agentplane task new --title "Fix parser edge case" --description "Handle the rejected input" --owner CODER --tag code',
      why: "Create a task without synthesizing or approving semantic work.",
    },
    {
      cmd: "agentplane task advance <task-id> --agent-json",
      why: "Return one compact external-agent action from the shared supervisor state.",
    },
    {
      cmd: "agentplane task run <task-id>",
      why: "Let the managed runner resolve semantic boundaries using the same supervisor state.",
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
      why: "Inspect deterministic recovery context before another agent resumes work.",
    },
    {
      cmd: "agentplane task status <task-id> --route",
      why: "Inspect task state, branch_pr route blockers, and next safe command.",
    },
    {
      cmd: "agentplane task next-action <task-id>",
      why: "Inspect the full diagnostic route projection.",
    },
    {
      cmd: "agentplane task brief <task-id>",
      why: "Print an agent-ready local task brief with route, Verify Steps, and blueprint evidence.",
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
