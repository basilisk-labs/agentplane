import { type TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { type CommandContext } from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";
import { buildTaskStatusTransition, nowIso, requireStructuredComment } from "./shared.js";

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
  const useStore = backendIsLocalFileBackend(opts.ctx);
  const store = useStore ? getTaskStore(opts.ctx) : null;
  await (useStore
    ? store!.mutate(opts.taskId, (current) => {
        if (!opts.force && String(current.status || "TODO").toUpperCase() === "DONE") {
          throw new CliError({
            exitCode: 2,
            code: "E_USAGE",
            message: `Task is already DONE: ${opts.taskId} (use --force to override)`,
          });
        }
        return buildTaskStatusTransition({
          task: current,
          at,
          toStatus: "DONE",
          eventAuthor: opts.author,
          updatedBy: opts.author,
          note: opts.body,
          comment: { author: opts.author, body: opts.body },
          extraFields: {
            result_summary: opts.resultSummary,
            risk_level: "low",
            breaking: false,
          },
        }).intents;
      })
    : opts.ctx.taskBackend.writeTask(
        buildTaskStatusTransition({
          task: opts.task,
          at,
          toStatus: "DONE",
          eventAuthor: opts.author,
          updatedBy: opts.author,
          note: opts.body,
          comment: { author: opts.author, body: opts.body },
          extraFields: {
            result_summary: opts.resultSummary,
            risk_level: "low",
            breaking: false,
          },
        }).nextTask,
      ));

  if (!opts.quiet) {
    process.stdout.write(`${opts.successMessage}\n`);
  }
}
