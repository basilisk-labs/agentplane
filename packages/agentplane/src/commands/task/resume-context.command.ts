import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";

import { buildTaskResumeContext } from "./handoff.shared.js";

export type TaskResumeContextParsed = {
  taskId: string;
  json: boolean;
};

export const taskResumeContextSpec: CommandSpec<TaskResumeContextParsed> = {
  id: ["task", "resume-context"],
  group: "Task",
  summary: "Print deterministic recovery context for continuing a task after interruption.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable resume context JSON.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
  }),
};

export const runTaskResumeContext = async (ctx: CommandCtx, parsed: TaskResumeContextParsed) => {
  const output = createCliEmitter();
  const resume = await buildTaskResumeContext({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    task_id: parsed.taskId,
  });
  if (parsed.json) {
    output.json(resume);
    return 0;
  }
  output.report(
    [
      { label: "task_status", value: resume.task_status },
      { label: "branch", value: resume.branch ?? "<unknown>" },
      { label: "base_branch", value: resume.base_branch ?? "<unknown>" },
      { label: "head_sha", value: resume.head_sha ?? "<unknown>" },
      ...(resume.pr_branch ? [{ label: "pr_branch", value: resume.pr_branch }] : []),
    ],
    { header: infoMessage(`task resume-context: ${parsed.taskId}`) },
  );
  if (resume.latest_handoff) {
    output.report([
      { label: "handoff_from", value: resume.latest_handoff.from_role },
      { label: "handoff_to", value: resume.latest_handoff.to_role ?? "unassigned" },
      { label: "handoff_reason", value: resume.latest_handoff.reason },
    ]);
  } else {
    output.line("handoff: none");
  }
  return 0;
};
