import type { CommandSpec } from "../../cli/spec/spec.js";

export type TaskRunRetryParsed = { taskId: string; runId: string };

export const taskRunRetrySpec: CommandSpec<TaskRunRetryParsed> = {
  id: ["task", "run", "retry"],
  group: "Task",
  summary: "Retry an existing execute-mode runner run into a new run id.",
  description:
    "Loads an existing runner run, snapshots its bundle into a new run id, and executes the configured adapter against the new run directory while retaining the source run for traceability.",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "run-id", required: true, valueHint: "<run-id>" },
  ],
  examples: [
    {
      cmd: "agentplane task run retry 202602030608-F1Q8AB run_20260323_abc123",
      why: "Create a new run from a failed/cancelled run snapshot and execute it.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: String(raw.args["run-id"]),
  }),
};
