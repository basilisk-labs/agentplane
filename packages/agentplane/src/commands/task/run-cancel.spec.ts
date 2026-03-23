import type { CommandSpec } from "../../cli/spec/spec.js";

export type TaskRunCancelParsed = { taskId: string; runId: string };

export const taskRunCancelSpec: CommandSpec<TaskRunCancelParsed> = {
  id: ["task", "run", "cancel"],
  group: "Task",
  summary: "Mark an existing runner run as cancelled in persisted runner state.",
  description:
    "Loads an existing runner run from its artifacts, marks the run as cancelled in run-state/events, and leaves the task available for later resume or retry decisions.",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "run-id", required: true, valueHint: "<run-id>" },
  ],
  examples: [
    {
      cmd: "agentplane task run cancel 202602030608-F1Q8AB run_20260323_abc123",
      why: "Persist a cancelled state for an existing runner run.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: String(raw.args["run-id"]),
  }),
};
