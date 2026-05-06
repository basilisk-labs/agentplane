import {
  parseTaskReadme,
  taskReadmePath,
  validateTaskDocMetadata,
} from "@agentplaneorg/core/tasks";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { CliError } from "../../shared/errors.js";

import {
  backendSupportsTaskBranchSnapshots,
  loadCommandContext,
  loadTaskFromContext,
  taskDataToFrontmatter,
  type CommandContext,
} from "../shared/task-backend.js";

import { resolveTaskBlueprintLifecycleSummary } from "./blueprint-summary.js";

async function detectLocalTaskMetadataErrors(
  ctx: CommandContext,
  taskId: string,
): Promise<string[] | null> {
  if (!backendSupportsTaskBranchSnapshots(ctx)) return null;
  const readmePath = taskReadmePath(
    path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.workflow_dir),
    taskId,
  );
  try {
    const text = await readFile(readmePath, "utf8");
    const parsed = parseTaskReadme(text);
    const frontmatter = {
      ...parsed.frontmatter,
      id:
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : taskId,
    };
    const metadataErrors = validateTaskDocMetadata(frontmatter);
    return metadataErrors.length > 0 ? metadataErrors : null;
  } catch {
    return null;
  }
}

export async function cmdTaskShow(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  let ctx: CommandContext | null = null;
  try {
    ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
    const frontmatter = taskDataToFrontmatter(task);
    if (backendSupportsTaskBranchSnapshots(ctx)) {
      const metadataErrors = validateTaskDocMetadata(frontmatter);
      if (metadataErrors.length > 0) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Invalid task README metadata: ${metadataErrors.join("; ")}`,
        });
      }
    }
    const blueprint = await resolveTaskBlueprintLifecycleSummary({
      task,
      config: ctx.config,
      projectRoot: ctx.resolvedProject.gitRoot,
    });
    process.stdout.write(`${JSON.stringify({ ...frontmatter, blueprint }, null, 2)}\n`);
    return 0;
  } catch (err) {
    if (!(err instanceof CliError) && ctx) {
      const metadataErrors = await detectLocalTaskMetadataErrors(ctx, opts.taskId);
      if (metadataErrors && metadataErrors.length > 0) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Invalid task README metadata: ${metadataErrors.join("; ")}`,
        });
      }
    }
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, {
      command: "task show",
      root: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
  }
}
