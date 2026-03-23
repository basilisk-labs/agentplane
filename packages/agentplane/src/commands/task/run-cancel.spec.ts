import type { CommandSpec } from "../../cli/spec/spec.js";

export type TaskRunCancelParsed = { taskId: string; runId: string };

export const taskRunCancelSpec: CommandSpec<TaskRunCancelParsed> = {
  id: ["task", "run", "cancel"],
  group: "Task",
  summary: "Cancel an existing runner run and stop the supervised process when present.",
  description:
    "Loads an existing runner run from its artifacts, sends a termination signal to a live supervised process when one is recorded, and persists the resulting cancelled state for later resume or retry decisions.",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "run-id", required: true, valueHint: "<run-id>" },
  ],
  examples: [
    {
      cmd: "agentplane task run cancel 202602030608-F1Q8AB run_20260323_abc123",
      why: "Cancel a prepared run or send a termination signal to a live supervised run.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: String(raw.args["run-id"]),
  }),
};
