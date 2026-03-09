import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { backendNotSupportedMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  exportTaskProjectionSnapshot,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

export async function cmdTaskExport(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const outPath = path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.tasks_path);
    if (!ctx.taskBackend.exportProjectionSnapshot && !ctx.taskBackend.exportTasksJson) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("exportProjectionSnapshot()"),
      });
    }
    await exportTaskProjectionSnapshot({ ctx, outputPath: outPath });
    process.stdout.write(`${path.relative(ctx.resolvedProject.gitRoot, outPath)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task export", root: opts.rootOverride ?? null });
  }
}
