import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { type CommandContext } from "../shared/task-backend.js";

import { syncPrArtifacts } from "./internal/sync.js";

export async function cmdPrUpdate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const output = createCliEmitter();
    const { prDir, resolved } = await syncPrArtifacts({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      mode: "update",
    });

    output.success("pr update", path.relative(resolved.gitRoot, prDir));
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr update", root: opts.rootOverride ?? null });
  }
}
