import type { CommandSpec } from "../../cli/spec/spec.js";

export type TaskRunResumeParsed = { taskId: string; runId: string };

export const taskRunResumeSpec: CommandSpec<TaskRunResumeParsed> = {
  id: ["task", "run", "resume"],
  group: "Task",
  summary: "Resume an existing execute-mode runner run in place.",
  description:
    "Loads an existing execute-mode runner run from its artifacts and re-executes the configured adapter against the same bundle and run directory.",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "run-id", required: true, valueHint: "<run-id>" },
  ],
  examples: [
    {
      cmd: "agentplane task run resume 202602030608-F1Q8AB run_20260323_abc123",
      why: "Resume or re-execute a prepared/failed/cancelled run in place.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: String(raw.args["run-id"]),
  }),
};
