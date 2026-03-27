import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { infoMessage } from "../../cli/output.js";

import { buildRecordedTaskHandoff } from "./handoff.shared.js";
import { resolveTaskHandoffPaths, writeTaskHandoff } from "../shared/task-handoff.js";

export type TaskHandoffRecordParsed = {
  taskId: string;
  fromRole: string;
  toRole?: string;
  reason: string;
  note?: string;
  runId?: string;
  nextActions: string[];
  risks: string[];
  openQuestions: string[];
  evidencePaths: string[];
  json: boolean;
};

export const taskHandoffRecordSpec: CommandSpec<TaskHandoffRecordParsed> = {
  id: ["task", "handoff", "record"],
  group: "Task",
  summary: "Record a task handoff snapshot with runner recovery hints.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "from",
      valueHint: "<role>",
      description: "Role handing off the task.",
    },
    {
      kind: "string",
      name: "to",
      valueHint: "<role>",
      description: "Optional. Intended receiving role.",
    },
    {
      kind: "string",
      name: "reason",
      valueHint: "<text>",
      description: "Why the handoff is happening.",
    },
    {
      kind: "string",
      name: "note",
      valueHint: "<text>",
      description: "Optional. Free-form handoff note.",
    },
    {
      kind: "string",
      name: "run-id",
      valueHint: "<run-id>",
      description: "Optional. Pin handoff hints to a specific runner run.",
    },
    {
      kind: "string",
      name: "next-action",
      valueHint: "<text>",
      repeatable: true,
      description: "Repeatable. Human next actions for the receiving agent.",
    },
    {
      kind: "string",
      name: "risk",
      valueHint: "<text>",
      repeatable: true,
      description: "Repeatable. Risks or watch-outs that remain open.",
    },
    {
      kind: "string",
      name: "question",
      valueHint: "<text>",
      repeatable: true,
      description: "Repeatable. Open questions for the next agent.",
    },
    {
      kind: "string",
      name: "evidence-path",
      valueHint: "<path>",
      repeatable: true,
      description: "Repeatable. Relevant evidence or artifact paths.",
    },
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit the persisted handoff snapshot as JSON.",
    },
  ],
  validateRaw: (raw) => {
    for (const key of ["from", "reason"] as const) {
      const value = raw.opts[key];
      if (typeof value !== "string" || value.trim() === "") {
        throw usageError({
          spec: taskHandoffRecordSpec,
          message: `Missing required option: --${key}.`,
        });
      }
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    fromRole: String(raw.opts.from),
    toRole: typeof raw.opts.to === "string" ? raw.opts.to : undefined,
    reason: String(raw.opts.reason),
    note: typeof raw.opts.note === "string" ? raw.opts.note : undefined,
    runId: typeof raw.opts["run-id"] === "string" ? raw.opts["run-id"] : undefined,
    nextActions: (raw.opts["next-action"] as string[] | undefined) ?? [],
    risks: (raw.opts.risk as string[] | undefined) ?? [],
    openQuestions: (raw.opts.question as string[] | undefined) ?? [],
    evidencePaths: (raw.opts["evidence-path"] as string[] | undefined) ?? [],
    json: raw.opts.json === true,
  }),
};

export const runTaskHandoffRecord = async (ctx: CommandCtx, parsed: TaskHandoffRecordParsed) => {
  const built = await buildRecordedTaskHandoff({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    task_id: parsed.taskId,
    from_role: parsed.fromRole,
    to_role: parsed.toRole,
    reason: parsed.reason,
    note: parsed.note,
    run_id: parsed.runId,
    next_actions: parsed.nextActions,
    risks: parsed.risks,
    open_questions: parsed.openQuestions,
    evidence_paths: parsed.evidencePaths,
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
  process.stdout.write(`${infoMessage(`task handoff recorded: ${parsed.taskId}`)}\n`);
  process.stdout.write(`from: ${built.handoff.from_role}\n`);
  process.stdout.write(`to: ${built.handoff.to_role ?? "unassigned"}\n`);
  process.stdout.write(`reason: ${built.handoff.reason}\n`);
  if (built.handoff.runner?.run_id) {
    process.stdout.write(`run_id: ${built.handoff.runner.run_id}\n`);
    process.stdout.write(`runner_status: ${built.handoff.runner.status ?? "unknown"}\n`);
    process.stdout.write(`runner_next_action: ${built.handoff.runner.next_action ?? "none"}\n`);
  }
  process.stdout.write(`latest: ${paths.latest_path}\n`);
  return 0;
};
