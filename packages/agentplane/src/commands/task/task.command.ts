import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  directSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { taskAddSpec } from "./add.command.js";
import { taskCloseDuplicateSpec } from "./close-duplicate.command.js";
import { taskCloseNoopSpec } from "./close-noop.command.js";
import { taskCommentSpec } from "./comment.command.js";
import { taskDeriveSpec } from "./derive.command.js";
import { taskDocSpec } from "./doc.command.js";
import { taskExportSpec } from "./export.command.js";
import { taskLintSpec } from "./lint.command.js";
import { taskListSpec } from "./list.spec.js";
import { taskMigrateDocSpec } from "./migrate-doc.command.js";
import { taskMigrateSpec } from "./migrate.command.js";
import { taskNewSpec } from "./new.spec.js";
import { taskNextSpec } from "./next.spec.js";
import { taskNormalizeSpec } from "./normalize.command.js";
import { taskPlanSpec } from "./plan.command.js";
import { taskRebuildIndexSpec } from "./rebuild-index.command.js";
import { taskRunSpec } from "./run.spec.js";
import { taskScrubSpec } from "./scrub.command.js";
import { taskSearchSpec } from "./search.spec.js";
import { taskSetStatusSpec } from "./set-status.command.js";
import { taskShowSpec } from "./show.spec.js";
import { taskStartReadySpec } from "./start-ready.command.js";
import { taskUpdateSpec } from "./update.command.js";
import { taskVerifySpec } from "./verify.command.js";
import { taskVerifyShowSpec } from "./verify-show.command.js";

const TASK_CHILD_SPECS = [
  taskAddSpec,
  taskCloseDuplicateSpec,
  taskCloseNoopSpec,
  taskCommentSpec,
  taskDeriveSpec,
  taskDocSpec,
  taskExportSpec,
  taskLintSpec,
  taskListSpec,
  taskMigrateSpec,
  taskMigrateDocSpec,
  taskNewSpec,
  taskNextSpec,
  taskNormalizeSpec,
  taskPlanSpec,
  taskRebuildIndexSpec,
  taskRunSpec,
  taskScrubSpec,
  taskSearchSpec,
  taskSetStatusSpec,
  taskShowSpec,
  taskStartReadySpec,
  taskUpdateSpec,
  taskVerifySpec,
  taskVerifyShowSpec,
] as const;
type TaskGroupParsed = GroupCommandParsed;

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
    {
      cmd: "agentplane task run <task-id>",
      why: "Run an existing task through the shared runner flow.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const runTask: CommandHandler<GroupCommandParsed> = (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: taskSpec,
    cmd: p.cmd,
    subcommands: directSubcommandNames(["task"], TASK_CHILD_SPECS),
    command: "task",
  });
};
