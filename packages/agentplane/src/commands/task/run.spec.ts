import type { CommandSpec } from "../../cli/spec/spec.js";

export type TaskRunParsed = { taskId: string; dryRun: boolean };

export const taskRunSpec: CommandSpec<TaskRunParsed> = {
  id: ["task", "run"],
  group: "Task",
  summary: "Prepare or run a task through the shared runner contract.",
  description:
    "Materializes runner bundle artifacts for a task and can execute the configured runner adapter against that prepared bundle.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description:
        "Prepare runner artifacts and print invocation metadata without executing a runner.",
    },
  ],
  examples: [
    {
      cmd: "agentplane task run 202602030608-F1Q8AB --dry-run",
      why: "Materialize bundle/run artifacts and inspect the prepared runner invocation.",
    },
    {
      cmd: "agentplane task run 202602030608-F1Q8AB",
      why: "Prepare bundle artifacts and execute the configured runner adapter for the task.",
    },
  ],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]), dryRun: raw.opts["dry-run"] === true }),
};
