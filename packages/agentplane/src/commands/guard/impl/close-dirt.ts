import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { CommandContext } from "../../shared/task-backend.js";
import { loadTaskFromContext } from "../../shared/task-backend.js";

function normalizeGitPath(value: string): string {
  return value.replaceAll("\\", "/").replace(/\/+$/, "");
}

function otherTaskIdForReadmePath(opts: {
  relPath: string;
  workflowDir: string;
  taskId: string;
}): string | null {
  const relPath = normalizeGitPath(opts.relPath);
  const workflowDir = normalizeGitPath(opts.workflowDir);
  const prefix = `${workflowDir}/`;
  if (!relPath.startsWith(prefix) || !relPath.endsWith("/README.md")) {
    return null;
  }
  const remainder = relPath.slice(prefix.length);
  const parts = remainder.split("/");
  if (parts.length !== 2 || parts[1] !== "README.md") {
    return null;
  }
  const candidateTaskId = parts[0]?.trim() ?? "";
  if (!candidateTaskId || candidateTaskId === opts.taskId) {
    return null;
  }
  return candidateTaskId;
}

function isActiveTaskStatus(status: unknown): boolean {
  return normalizeTaskStatus(status) !== "DONE";
}

const IGNORED_CLOSE_RUNTIME_PATHS = new Set([
  ".agentplane/cache.sqlite",
  ".agentplane/cache.sqlite-shm",
  ".agentplane/cache.sqlite-wal",
]);

export async function resolveIgnoredDirectCloseDirtyPaths(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<string[]> {
  const unstagedTrackedPaths = await opts.ctx.git.statusUnstagedTrackedPaths();
  const ignored = new Set<string>(
    unstagedTrackedPaths.filter((relPath) => IGNORED_CLOSE_RUNTIME_PATHS.has(relPath)),
  );
  if (opts.ctx.config.workflow_mode !== "direct") {
    return [...ignored].toSorted((a, b) => a.localeCompare(b));
  }
  if (opts.ctx.config.close_commit.direct_dirty_policy !== "allow_other_task_readmes") {
    return [...ignored].toSorted((a, b) => a.localeCompare(b));
  }

  for (const relPath of unstagedTrackedPaths) {
    const otherTaskId = otherTaskIdForReadmePath({
      relPath,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      taskId: opts.taskId,
    });
    if (!otherTaskId) continue;

    try {
      const otherTask = await loadTaskFromContext({ ctx: opts.ctx, taskId: otherTaskId });
      if (isActiveTaskStatus(otherTask.status)) {
        ignored.add(relPath);
      }
    } catch {
      // Missing or unreadable tasks stay blocking; close-tail should only ignore
      // dirt that is both structurally recognized and backed by an active task.
    }
  }
  return [...ignored].toSorted((a, b) => a.localeCompare(b));
}
