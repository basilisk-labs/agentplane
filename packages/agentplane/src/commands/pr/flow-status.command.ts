import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { resolvePrFlowStatus } from "./flow-status.js";
import { renderPrFlowStatusRows } from "./flow-status.render.js";

export async function cmdPrFlowStatus(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  json: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const report = await resolvePrFlowStatus({ ...opts, ctx });
    const output = createCliEmitter();
    if (opts.json) {
      output.json(report);
      return 0;
    }
    output.report(renderPrFlowStatusRows(report), { header: "PR flow status" });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr flow status", root: opts.rootOverride ?? null });
  }
}
