import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";
import { appendTaskEvent, nowIso, requireStructuredComment } from "./shared.js";

export async function cmdTaskCloseDuplicate(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  duplicateOf: string;
  author: string;
  note?: string;
  force: boolean;
  yes: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const sourceId = opts.taskId.trim();
    const duplicateOf = opts.duplicateOf.trim();
    if (!sourceId || !duplicateOf) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Both task id and --of must be non-empty.",
      });
    }
    if (sourceId === duplicateOf) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Duplicate target must differ from task id (${sourceId}).`,
      });
    }
    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config: opts.ctx.config,
        yes: opts.yes,
        reason: "task close-duplicate --force",
      });
    }

    const canonical = await loadTaskFromContext({ ctx: opts.ctx, taskId: duplicateOf });
    const useStore = backendIsLocalFileBackend(opts.ctx);
    const store = useStore ? getTaskStore(opts.ctx) : null;
    const task = useStore
      ? await store!.get(sourceId)
      : await loadTaskFromContext({ ctx: opts.ctx, taskId: sourceId });

    if (!opts.force && String(task.status || "TODO").toUpperCase() === "DONE") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Task is already DONE: ${sourceId} (use --force to override)`,
      });
    }

    const reason = opts.note?.trim();
    const canonicalTitle = canonical.title?.trim() ? ` (${canonical.title.trim()})` : "";
    const baseBody =
      `Verified: ${sourceId} is a bookkeeping duplicate of ${duplicateOf}${canonicalTitle}; ` +
      "no code/config changes are expected in this task and closure is recorded as no-op.";
    const body = reason ? `${baseBody}\n\nReason: ${reason}` : baseBody;
    const verifiedCfg = opts.ctx.config.tasks.comments.verified;
    requireStructuredComment(body, verifiedCfg.prefix, verifiedCfg.min_chars);

    const at = nowIso();
    const next: TaskData = {
      ...task,
      status: "DONE",
      comments: [
        ...(Array.isArray(task.comments) ? task.comments : []),
        { author: opts.author, body },
      ],
      events: appendTaskEvent(task, {
        type: "status",
        at,
        author: opts.author,
        from: String(task.status || "TODO").toUpperCase(),
        to: "DONE",
        note: body,
      }),
      result_summary: `Closed as duplicate of ${duplicateOf}.`,
      risk_level: "low",
      breaking: false,
      doc_version: 2,
      doc_updated_at: at,
      doc_updated_by: opts.author,
    };
    await (useStore ? store!.update(sourceId, () => next) : opts.ctx.taskBackend.writeTask(next));

    if (!opts.quiet) {
      process.stdout.write(`task.done: ${sourceId} (duplicate of ${duplicateOf})\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task close-duplicate",
      root: opts.rootOverride ?? null,
    });
  }
}
