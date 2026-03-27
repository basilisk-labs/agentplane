import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { infoMessage } from "../../cli/output.js";

import { buildTaskResumeContext } from "./handoff.shared.js";

export type TaskResumeContextParsed = {
  taskId: string;
  runId?: string;
  json: boolean;
};

export const taskResumeContextSpec: CommandSpec<TaskResumeContextParsed> = {
  id: ["task", "resume-context"],
  group: "Task",
  summary: "Print deterministic recovery context for continuing a task after interruption.",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "run-id", required: false, valueHint: "[run-id]" },
  ],
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
    runId: typeof raw.args["run-id"] === "string" ? raw.args["run-id"] : undefined,
    json: raw.opts.json === true,
  }),
};

export const runTaskResumeContext = async (ctx: CommandCtx, parsed: TaskResumeContextParsed) => {
  const resume = await buildTaskResumeContext({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    task_id: parsed.taskId,
    run_id: parsed.runId,
  });
  if (parsed.json) {
    process.stdout.write(`${JSON.stringify(resume, null, 2)}\n`);
    return 0;
  }
  process.stdout.write(`${infoMessage(`task resume-context: ${parsed.taskId}`)}\n`);
  process.stdout.write(`task_status: ${resume.task_status}\n`);
  process.stdout.write(`branch: ${resume.branch ?? "<unknown>"}\n`);
  process.stdout.write(`base_branch: ${resume.base_branch ?? "<unknown>"}\n`);
  process.stdout.write(`head_sha: ${resume.head_sha ?? "<unknown>"}\n`);
  if (resume.pr_branch) process.stdout.write(`pr_branch: ${resume.pr_branch}\n`);
  process.stdout.write(`runner_status: ${resume.runner.status ?? "none"}\n`);
  process.stdout.write(`runner_next_action: ${resume.runner.next_action ?? "none"}\n`);
  if (resume.runner.next_command)
    process.stdout.write(`runner_next_command: ${resume.runner.next_command}\n`);
  if (resume.runner.resume_command)
    process.stdout.write(`runner_resume_command: ${resume.runner.resume_command}\n`);
  if (resume.runner.retry_command)
    process.stdout.write(`runner_retry_command: ${resume.runner.retry_command}\n`);
  if (resume.latest_handoff) {
    process.stdout.write(`handoff_from: ${resume.latest_handoff.from_role}\n`);
    process.stdout.write(`handoff_to: ${resume.latest_handoff.to_role ?? "unassigned"}\n`);
    process.stdout.write(`handoff_reason: ${resume.latest_handoff.reason}\n`);
  } else {
    process.stdout.write("handoff: none\n");
  }
  return 0;
};
