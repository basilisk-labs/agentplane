import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { renderIncidentAdvice } from "../../runtime/incidents/index.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { adviseTaskIncidents } from "../incidents/shared.js";

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
    const result = await cmdStart({
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
      quiet: true,
    });
    if (!opts.quiet) {
      process.stdout.write(`${successMessage("ready", opts.taskId)}\n`);
      const advice = await adviseTaskIncidents({
        ctx,
        taskId: opts.taskId,
        limit: 3,
      });
      if (advice.matches.length > 0) {
        process.stdout.write(`${infoMessage("incident advice for analogous tasks")}\n`);
        process.stdout.write(`${renderIncidentAdvice(advice.matches)}\n`);
      }
    }
    return result;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task start-ready", root: opts.rootOverride ?? null });
  }
}
