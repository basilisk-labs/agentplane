import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { infoMessage } from "../../cli/output.js";

import { loadCommandContext } from "../shared/task-backend.js";
import { readTaskHandoffLatestRequired, resolveTaskHandoffPaths } from "../shared/task-handoff.js";

export type TaskHandoffShowParsed = {
  taskId: string;
  json: boolean;
};

export const taskHandoffShowSpec: CommandSpec<TaskHandoffShowParsed> = {
  id: ["task", "handoff", "show"],
  group: "Task",
  summary: "Show the latest persisted task handoff snapshot.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit machine-readable handoff JSON.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    json: raw.opts.json === true,
  }),
};

export const runTaskHandoffShow = async (ctx: CommandCtx, parsed: TaskHandoffShowParsed) => {
  const commandCtx = await loadCommandContext({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
  });
  const paths = resolveTaskHandoffPaths({
    git_root: commandCtx.resolvedProject.gitRoot,
    workflow_dir: commandCtx.config.paths.workflow_dir,
    task_id: parsed.taskId,
  });
  const handoff = await readTaskHandoffLatestRequired({
    task_id: parsed.taskId,
    paths,
  });
  if (parsed.json) {
    process.stdout.write(`${JSON.stringify(handoff, null, 2)}\n`);
    return 0;
  }
  process.stdout.write(`${infoMessage(`task handoff show: ${parsed.taskId}`)}\n`);
  process.stdout.write(`from: ${handoff.from_role}\n`);
  process.stdout.write(`to: ${handoff.to_role ?? "unassigned"}\n`);
  process.stdout.write(`created_at: ${handoff.created_at}\n`);
  process.stdout.write(`reason: ${handoff.reason}\n`);
  if (handoff.branch) process.stdout.write(`branch: ${handoff.branch}\n`);
  if (handoff.base_branch) process.stdout.write(`base_branch: ${handoff.base_branch}\n`);
  if (handoff.head_sha) process.stdout.write(`head_sha: ${handoff.head_sha}\n`);
  if (handoff.pr_branch) process.stdout.write(`pr_branch: ${handoff.pr_branch}\n`);
  if (handoff.runner?.run_id) {
    process.stdout.write(`run_id: ${handoff.runner.run_id}\n`);
    process.stdout.write(`runner_status: ${handoff.runner.status ?? "unknown"}\n`);
    process.stdout.write(`runner_next_action: ${handoff.runner.next_action ?? "none"}\n`);
    if (handoff.runner.next_command) {
      process.stdout.write(`runner_next_command: ${handoff.runner.next_command}\n`);
    }
  }
  for (const action of handoff.next_actions ?? []) {
    process.stdout.write(`next_action: ${action}\n`);
  }
  for (const risk of handoff.risks ?? []) {
    process.stdout.write(`risk: ${risk}\n`);
  }
  for (const question of handoff.open_questions ?? []) {
    process.stdout.write(`open_question: ${question}\n`);
  }
  for (const evidence of handoff.evidence_paths ?? []) {
    process.stdout.write(`evidence_path: ${evidence}\n`);
  }
  return 0;
};
