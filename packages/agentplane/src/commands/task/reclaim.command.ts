import { readFile } from "node:fs/promises";

import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CliReportEntry } from "../../cli/output.js";

import { buildRecordedTaskHandoff, buildTaskResumeContext } from "./handoff.shared.js";
import { resolveTaskHandoffPaths, writeTaskHandoff } from "../shared/task-handoff.js";
import { isProcessAlive } from "../../runner/process-supervision/signals.js";
import { cancelTaskRunnerExecution } from "../../runner/usecases/task-run-lifecycle.js";

export type TaskReclaimParsed = {
  taskId: string;
  author: string;
  reason: string;
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
    json: raw.opts.json === true,
  }),
};

const emitter = createCliEmitter();

async function cancelStaleRunningRunner(opts: {
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
  runId: string | null;
  statePath: string | null;
}): Promise<void> {
  if (!opts.runId || !opts.statePath) return;
  const state = JSON.parse(await readFile(opts.statePath, "utf8")) as {
    status?: unknown;
    supervision?: { pid?: unknown };
  };
  const pid = state.supervision?.pid;
  if (state.status !== "running" || typeof pid !== "number" || isProcessAlive(pid)) {
    return;
  }
  await cancelTaskRunnerExecution({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.taskId,
    run_id: opts.runId,
  });
}

export const runTaskReclaim = async (ctx: CommandCtx, parsed: TaskReclaimParsed) => {
  const resume = await buildTaskResumeContext({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    task_id: parsed.taskId,
  });
  await cancelStaleRunningRunner({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    taskId: parsed.taskId,
    runId: resume.runner.run_id ?? null,
    statePath: resume.runner.state_path ?? null,
  });
  const built = await buildRecordedTaskHandoff({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    task_id: parsed.taskId,
    from_role: resume.latest_handoff?.to_role ?? resume.latest_handoff?.from_role ?? "UNASSIGNED",
    to_role: parsed.author,
    reason: parsed.reason,
    next_actions: [`Reclaim by ${parsed.author}: continue from the current task state.`],
  });
  const paths = resolveTaskHandoffPaths({
    git_root: built.ctx.resolvedProject.gitRoot,
    workflow_dir: built.ctx.config.paths.workflow_dir,
    task_id: parsed.taskId,
  });
  await writeTaskHandoff({ paths, handoff: built.handoff });
  if (parsed.json) {
    emitter.json(built.handoff);
    return 0;
  }
  const entries: CliReportEntry[] = [
    { label: "author", value: parsed.author },
    { label: "latest", value: paths.latest_path },
  ];
  emitter.report(entries, {
    header: infoMessage(`task reclaimed: ${parsed.taskId}`),
  });
  return 0;
};
