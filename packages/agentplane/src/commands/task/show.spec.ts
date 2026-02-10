import type { CommandSpec } from "../../cli/spec/spec.js";

export type TaskShowParsed = { taskId: string };

export const taskShowSpec: CommandSpec<TaskShowParsed> = {
  id: ["task", "show"],
  group: "Task",
  summary: "Print task metadata as JSON (frontmatter shape).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  examples: [{ cmd: "agentplane task show 202602030608-F1Q8AB", why: "Show task metadata." }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]) }),
};
