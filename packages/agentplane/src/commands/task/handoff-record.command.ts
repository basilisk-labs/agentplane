import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { CliReportEntry } from "../../cli/output.js";

import { buildRecordedTaskHandoff } from "./handoff.shared.js";
import { resolveTaskHandoffPaths, writeTaskHandoff } from "../shared/task-handoff.js";

export type TaskHandoffRecordParsed = {
  taskId: string;
  fromRole: string;
  toRole?: string;
  reason: string;
  note?: string;
  nextActions: string[];
  risks: string[];
  openQuestions: string[];
  evidencePaths: string[];
  json: boolean;
};

export const taskHandoffRecordSpec: CommandSpec<TaskHandoffRecordParsed> = {
  id: ["task", "handoff", "record"],
  group: "Task",
  summary: "Record a task handoff snapshot for the next local agent.",
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
    nextActions: (raw.opts["next-action"] as string[] | undefined) ?? [],
    risks: (raw.opts.risk as string[] | undefined) ?? [],
    openQuestions: (raw.opts.question as string[] | undefined) ?? [],
    evidencePaths: (raw.opts["evidence-path"] as string[] | undefined) ?? [],
    json: raw.opts.json === true,
  }),
};

const emitter = createCliEmitter();

export const runTaskHandoffRecord = async (ctx: CommandCtx, parsed: TaskHandoffRecordParsed) => {
  const built = await buildRecordedTaskHandoff({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    task_id: parsed.taskId,
    from_role: parsed.fromRole,
    to_role: parsed.toRole,
    reason: parsed.reason,
    note: parsed.note,
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
    emitter.json(built.handoff);
    return 0;
  }
  const entries: CliReportEntry[] = [
    { label: "from", value: built.handoff.from_role },
    { label: "to", value: built.handoff.to_role ?? "unassigned" },
    { label: "reason", value: built.handoff.reason },
    { label: "latest", value: paths.latest_path },
  ];
  emitter.report(entries, {
    header: infoMessage(`task handoff recorded: ${parsed.taskId}`),
  });
  return 0;
};
