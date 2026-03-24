import type { CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

export type TaskRunShowParsed = { taskId: string; runId?: string };

export const taskRunShowSpec: CommandSpec<TaskRunShowParsed> = {
  id: ["task", "run", "show"],
  group: "Task",
  summary: "Inspect persisted runner state and result artifacts for an existing run.",
  description:
    "Loads an existing runner run from its artifacts and prints a structured summary of run-state, result metadata, and event counters. When run-id is omitted, the latest run for the task is selected.",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "run-id", required: false, valueHint: "[run-id]" },
  ],
  examples: [
    {
      cmd: "agentplane task run show 202602030608-F1Q8AB",
      why: "Inspect the latest persisted runner run for a task.",
    },
    {
      cmd: "agentplane task run show 202602030608-F1Q8AB run_20260323_abc123",
      why: "Inspect a specific run by run id.",
    },
  ],
  validateRaw: (raw) => {
    const runId = raw.args["run-id"];
    if (typeof runId === "string" && runId.trim() === "") {
      throw usageError({ spec: taskRunShowSpec, message: "Invalid run-id: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: typeof raw.args["run-id"] === "string" ? raw.args["run-id"] : undefined,
  }),
};
