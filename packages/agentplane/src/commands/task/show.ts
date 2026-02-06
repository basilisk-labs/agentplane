import { validateTaskDocMetadata } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";

import { loadBackendTask, taskDataToFrontmatter } from "../shared/task-backend.js";

export async function cmdTaskShow(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const { task, backendId } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const frontmatter = taskDataToFrontmatter(task);
    if (backendId === "local") {
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
