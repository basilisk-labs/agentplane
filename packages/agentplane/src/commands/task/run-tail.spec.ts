import type { CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

export type TaskRunTailParsed = { taskId: string; runId?: string; lines: number };

export const taskRunTailSpec: CommandSpec<TaskRunTailParsed> = {
  id: ["task", "run", "tail"],
  group: "Task",
  summary: "Print the last N lines from the raw agent trace artifact for an existing runner run.",
  description:
    "Reads agent-trace.jsonl for an existing runner run and prints the last N lines. When run-id is omitted, the latest run for the task is selected.",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "run-id", required: false, valueHint: "[run-id]" },
  ],
  options: [
    {
      kind: "string",
      name: "lines",
      valueHint: "<n>",
      description: "Optional. Number of trace lines to print from the end (default: 40).",
    },
  ],
  examples: [
    {
      cmd: "agentplane task run tail 202602030608-F1Q8AB",
      why: "Print the last 40 trace lines for the latest task run.",
    },
    {
      cmd: "agentplane task run tail 202602030608-F1Q8AB run_20260323_abc123 --lines 10",
      why: "Print the last 10 trace lines for a specific run.",
    },
  ],
  validateRaw: (raw) => {
    const runId = raw.args["run-id"];
    if (typeof runId === "string" && runId.trim() === "") {
      throw usageError({ spec: taskRunTailSpec, message: "Invalid run-id: empty." });
    }
    const linesRaw = typeof raw.opts.lines === "string" ? raw.opts.lines.trim() : "";
    if (!linesRaw) return;
    if (!/^[1-9]\d*$/u.test(linesRaw)) {
      throw usageError({
        spec: taskRunTailSpec,
        message: `Invalid value for --lines: ${JSON.stringify(raw.opts.lines)}`,
      });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    runId: typeof raw.args["run-id"] === "string" ? raw.args["run-id"] : undefined,
    lines:
      typeof raw.opts.lines === "string" && raw.opts.lines.trim().length > 0
        ? Number(raw.opts.lines)
        : 40,
  }),
};
