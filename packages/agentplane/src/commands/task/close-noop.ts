import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { appendTaskEvent, nowIso, requireStructuredComment } from "./shared.js";

export async function cmdTaskCloseNoop(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  note?: string;
  force: boolean;
  yes: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config: ctx.config,
        yes: opts.yes,
        reason: "task close-noop --force",
      });
    }
    const useStore = backendIsLocalFileBackend(ctx);
    const store = useStore ? getTaskStore(ctx) : null;
    const task = useStore
      ? await store!.get(opts.taskId)
      : await ctx.taskBackend.getTask(opts.taskId);
    if (!task) {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message: `Task not found: ${opts.taskId}`,
      });
    }
    if (!opts.force && String(task.status || "TODO").toUpperCase() === "DONE") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Task is already DONE: ${opts.taskId} (use --force to override)`,
      });
    }
    const normalizedNote = opts.note?.trim();
    const baseBody =
      "Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.";
    const body = normalizedNote ? `${baseBody}\n\nNote: ${normalizedNote}` : baseBody;
    const verifiedCfg = ctx.config.tasks.comments.verified;
    requireStructuredComment(body, verifiedCfg.prefix, verifiedCfg.min_chars);
    const at = nowIso();
    const next = {
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
      result_summary: "No-op closure recorded.",
      risk_level: "low" as const,
      breaking: false,
      doc_version: 2,
      doc_updated_at: at,
      doc_updated_by: opts.author,
    };
    await (useStore ? store!.update(opts.taskId, () => next) : ctx.taskBackend.writeTask(next));
    if (!opts.quiet) {
      process.stdout.write(`task.done: ${opts.taskId} (no-op)\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task close-noop", root: opts.rootOverride ?? null });
  }
}
