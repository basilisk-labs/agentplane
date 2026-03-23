import type { CommandSpec } from "../../cli/spec/spec.js";

export type TaskRunParsed = { taskId: string };

export const taskRunSpec: CommandSpec<TaskRunParsed> = {
  id: ["task", "run"],
  group: "Task",
  summary: "Run a task through the future runner contract (runtime not implemented yet).",
  description:
    "Reserves the task-runner command surface. The execution runtime lands in later tasks; this command currently exists to freeze help, parsing, and routing contracts.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  examples: [
    {
      cmd: "agentplane task run 202602030608-F1Q8AB",
      why: "Inspect the future task-runner command contract.",
    },
  ],
  notes: [
    "This command is a contract placeholder in the current milestone; runner execution is added later.",
  ],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]) }),
};
