import path from "node:path";

import { loadTaskBackend } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { backendNotSupportedMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";

export async function cmdTaskExport(opts: { cwd: string; rootOverride?: string }): Promise<number> {
  try {
    const { backend, resolved, config } = await loadTaskBackend({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const outPath = path.join(resolved.gitRoot, config.paths.tasks_path);
    if (!backend.exportTasksJson) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: backendNotSupportedMessage("exportTasksJson()"),
      });
    }
    await backend.exportTasksJson(outPath);
    process.stdout.write(`${path.relative(resolved.gitRoot, outPath)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task export", root: opts.rootOverride ?? null });
  }
}
