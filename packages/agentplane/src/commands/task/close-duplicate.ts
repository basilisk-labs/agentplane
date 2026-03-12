import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";
import { recordVerifiedNoopClosure } from "./close-shared.js";

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

    const reason = opts.note?.trim();
    const canonicalTitle = canonical.title?.trim() ? ` (${canonical.title.trim()})` : "";
    const baseBody =
      `Verified: ${sourceId} is a bookkeeping duplicate of ${duplicateOf}${canonicalTitle}; ` +
      "no code/config changes are expected in this task and closure is recorded as no-op.";
    const body = reason ? `${baseBody}\n\nReason: ${reason}` : baseBody;
    await recordVerifiedNoopClosure({
      ctx: opts.ctx,
      task,
      taskId: sourceId,
      author: opts.author,
      body,
      resultSummary: `Closed as duplicate of ${duplicateOf}.`,
      quiet: opts.quiet,
      successMessage: `task.done: ${sourceId} (duplicate of ${duplicateOf})`,
      force: opts.force,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task close-duplicate",
      root: opts.rootOverride ?? null,
    });
  }
}
