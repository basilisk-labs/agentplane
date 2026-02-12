import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { cmdReady } from "./ready.js";
import { cmdStart } from "./start.js";

export async function cmdTaskStartReady(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
  force: boolean;
  yes: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const readyCode = await cmdReady({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    if (readyCode !== 0 && !opts.force) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Task is not ready: ${opts.taskId} (resolve dependencies or use --force)`,
      });
    }
    return await cmdStart({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      author: opts.author,
      body: opts.body,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      confirmStatusCommit: false,
      force: opts.force,
      yes: opts.yes,
      quiet: opts.quiet,
    });
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task start-ready", root: opts.rootOverride ?? null });
  }
}
