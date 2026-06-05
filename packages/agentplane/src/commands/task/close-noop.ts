import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { ensureLocalTaskReadmeHydrated, recordVerifiedNoopClosure } from "./close-shared.js";

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
    const normalizedNote = opts.note?.trim();
    const baseBody =
      "Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.";
    const body = normalizedNote ? `${baseBody}\n\nNote: ${normalizedNote}` : baseBody;
    await ensureLocalTaskReadmeHydrated({ ctx, taskId: opts.taskId });
    await recordVerifiedNoopClosure({
      ctx,
      taskId: opts.taskId,
      author: opts.author,
      body,
      resultSummary: "No-op closure recorded.",
      quiet: opts.quiet,
      successMessage: `task.done: ${opts.taskId} (no-op)`,
      force: opts.force,
    });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task close-noop", root: opts.rootOverride ?? null });
  }
}
