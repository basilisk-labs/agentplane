import type { CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

export type TaskRunTraceParsed = { taskId: string; runId?: string };

export const taskRunTraceSpec: CommandSpec<TaskRunTraceParsed> = {
  id: ["task", "run", "trace"],
  group: "Task",
  summary: "Print the raw agent trace artifact for an existing runner run.",
  description:
    "Reads agent-trace.jsonl for an existing runner run and writes it to stdout unchanged. When run-id is omitted, the latest run for the task is selected.",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "run-id", required: false, valueHint: "[run-id]" },
  ],
  examples: [
    {
      cmd: "agentplane task run trace 202602030608-F1Q8AB",
      why: "Print the raw trace for the latest run of a task.",
    },
    {
      cmd: "agentplane task run trace 202602030608-F1Q8AB run_20260323_abc123",
      why: "Print the raw trace for a specific run.",
    },
  ],
  validateRaw: (raw) => {
    const runId = raw.args["run-id"];
    if (typeof runId === "string" && runId.trim() === "") {
      throw usageError({ spec: taskRunTraceSpec, message: "Invalid run-id: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: typeof raw.args["run-id"] === "string" ? raw.args["run-id"] : undefined,
  }),
};
