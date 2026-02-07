import { validateTaskDocMetadata } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";

import {
  loadCommandContext,
  loadTaskFromContext,
  taskDataToFrontmatter,
  type CommandContext,
} from "../shared/task-backend.js";

export async function cmdTaskShow(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
    const frontmatter = taskDataToFrontmatter(task);
    if (ctx.backendId === "local") {
      const metadataErrors = validateTaskDocMetadata(frontmatter);
      if (metadataErrors.length > 0) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Invalid task README metadata: ${metadataErrors.join("; ")}`,
        });
      }
    }
    process.stdout.write(`${JSON.stringify(frontmatter, null, 2)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task show",
      root: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
  }
}
