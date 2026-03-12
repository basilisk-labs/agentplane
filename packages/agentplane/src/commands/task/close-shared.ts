import { type TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { type CommandContext } from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";
import {
  appendTaskEvent,
  normalizeTaskDocVersion,
  nowIso,
  requireStructuredComment,
} from "./shared.js";

export async function recordVerifiedNoopClosure(opts: {
  ctx: CommandContext;
  task: TaskData;
  taskId: string;
  author: string;
  body: string;
  resultSummary: string;
  quiet: boolean;
  successMessage: string;
  force: boolean;
}): Promise<void> {
  if (!opts.force && String(opts.task.status || "TODO").toUpperCase() === "DONE") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Task is already DONE: ${opts.taskId} (use --force to override)`,
    });
  }

  const verifiedCfg = opts.ctx.config.tasks.comments.verified;
  requireStructuredComment(opts.body, verifiedCfg.prefix, verifiedCfg.min_chars);

  const at = nowIso();
  const next: TaskData = {
    ...opts.task,
    status: "DONE",
    comments: [
      ...(Array.isArray(opts.task.comments) ? opts.task.comments : []),
      { author: opts.author, body: opts.body },
    ],
    events: appendTaskEvent(opts.task, {
      type: "status",
      at,
      author: opts.author,
      from: String(opts.task.status || "TODO").toUpperCase(),
      to: "DONE",
      note: opts.body,
    }),
    result_summary: opts.resultSummary,
    risk_level: "low",
    breaking: false,
    doc_version: normalizeTaskDocVersion(opts.task.doc_version),
    doc_updated_at: at,
    doc_updated_by: opts.author,
  };

  const useStore = backendIsLocalFileBackend(opts.ctx);
  const store = useStore ? getTaskStore(opts.ctx) : null;
  await (useStore ? store!.update(opts.taskId, () => next) : opts.ctx.taskBackend.writeTask(next));

  if (!opts.quiet) {
    process.stdout.write(`${opts.successMessage}\n`);
  }
}
