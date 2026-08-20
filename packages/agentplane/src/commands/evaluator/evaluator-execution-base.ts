import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { parsePrMeta } from "../shared/pr-meta.js";
import type { CommandContext } from "../shared/task-backend.js";

function hasFrozenTaskBase(task: TaskData): boolean {
  const stored = task.extensions?.task_execution_context;
  return (
    typeof stored === "object" &&
    stored !== null &&
    "base_ref" in stored &&
    typeof stored.base_ref === "string" &&
    stored.base_ref.trim().length > 0 &&
    "base_sha" in stored &&
    typeof stored.base_sha === "string" &&
    stored.base_sha.trim().length > 0
  );
}

export async function applyLegacyPrBase(opts: {
  ctx: CommandContext;
  task: TaskData;
  execution: TaskExecutionContext;
}): Promise<TaskExecutionContext> {
  if (hasFrozenTaskBase(opts.task)) return opts.execution;

  const metaPath = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.task.id,
    "pr",
    "meta.json",
  );
  try {
    const meta = parsePrMeta(await readFile(metaPath, "utf8"), opts.task.id);
    const baseSha = meta.base?.trim();
    return baseSha ? Object.freeze({ ...opts.execution, base_sha: baseSha }) : opts.execution;
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return opts.execution;
    if (opts.execution.selected_mode === "direct") return opts.execution;
    throw error;
  }
}
