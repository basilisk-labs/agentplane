import { mapCoreError } from "../../../cli/error-map.js";
import { CliError } from "../../../shared/errors.js";
import { loadCommandContext } from "../../shared/task-backend.js";
import { ensureReconciledBeforeMutation } from "../../shared/reconcile-check.js";
import { guardCommitCheck, type GuardCommitOptions } from "./policy.js";

export async function cmdGuardCommit(opts: GuardCommitOptions): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    await ensureReconciledBeforeMutation({ ctx, command: "guard commit" });
    await guardCommitCheck({ ...opts, ctx });
    if (!opts.quiet) process.stdout.write("OK\n");
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "guard commit", root: opts.rootOverride ?? null });
  }
}
