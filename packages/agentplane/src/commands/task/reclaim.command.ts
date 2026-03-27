import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { infoMessage } from "../../cli/output.js";

import { buildRecordedTaskHandoff, buildTaskResumeContext } from "./handoff.shared.js";
import { resolveTaskHandoffPaths, writeTaskHandoff } from "../shared/task-handoff.js";

export type TaskReclaimParsed = {
  taskId: string;
  author: string;
  reason: string;
  force: boolean;
  json: boolean;
};

export const taskReclaimSpec: CommandSpec<TaskReclaimParsed> = {
  id: ["task", "reclaim"],
  group: "Task",
  summary: "Claim an interrupted task and persist a recovery handoff snapshot.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "author",
      valueHint: "<role>",
      description: "Role reclaiming the task.",
    },
    {
      kind: "string",
      name: "reason",
      valueHint: "<text>",
      description: "Why the task is being reclaimed.",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Allow reclaim even when the latest run still appears alive.",
    },
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit the persisted reclaim handoff as JSON.",
    },
  ],
  validateRaw: (raw) => {
    for (const key of ["author", "reason"] as const) {
      const value = raw.opts[key];
      if (typeof value !== "string" || value.trim() === "") {
        throw usageError({
          spec: taskReclaimSpec,
          message: `Missing required option: --${key}.`,
        });
      }
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    author: String(raw.opts.author),
    reason: String(raw.opts.reason),
    force: raw.opts.force === true,
    json: raw.opts.json === true,
  }),
};

export const runTaskReclaim = async (ctx: CommandCtx, parsed: TaskReclaimParsed) => {
  const resume = await buildTaskResumeContext({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    task_id: parsed.taskId,
  });
  if (resume.runner.next_action === "wait" && !parsed.force) {
    throw usageError({
      spec: taskReclaimSpec,
      message:
        `Refusing to reclaim ${parsed.taskId}: the latest runner still appears alive. ` +
        `Use --force only if the handoff really is orphaned.`,
    });
  }
  const built = await buildRecordedTaskHandoff({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    task_id: parsed.taskId,
    from_role: resume.latest_handoff?.to_role ?? resume.latest_handoff?.from_role ?? "UNASSIGNED",
    to_role: parsed.author,
    reason: parsed.reason,
    next_actions: [
      `Reclaim by ${parsed.author}: follow runner_next_action=${resume.runner.next_action ?? "none"}.`,
    ],
  });
  const paths = resolveTaskHandoffPaths({
    git_root: built.ctx.resolvedProject.gitRoot,
    workflow_dir: built.ctx.config.paths.workflow_dir,
    task_id: parsed.taskId,
  });
  await writeTaskHandoff({ paths, handoff: built.handoff });
  if (parsed.json) {
    process.stdout.write(`${JSON.stringify(built.handoff, null, 2)}\n`);
    return 0;
  }
  process.stdout.write(`${infoMessage(`task reclaimed: ${parsed.taskId}`)}\n`);
  process.stdout.write(`author: ${parsed.author}\n`);
  process.stdout.write(`runner_next_action: ${built.handoff.runner?.next_action ?? "none"}\n`);
  if (built.handoff.runner?.next_command) {
    process.stdout.write(`runner_next_command: ${built.handoff.runner.next_command}\n`);
  }
  process.stdout.write(`latest: ${paths.latest_path}\n`);
  return 0;
};
