import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { loadTaskBackend, type TaskData } from "../../backends/task-backend.js";

function normalizeDocUpdatedBy(value?: string): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  if (trimmed.toLowerCase() === "agentplane") return "";
  return trimmed;
}

export function resolveDocUpdatedBy(task: TaskData, author?: string): string {
  const fromAuthor = normalizeDocUpdatedBy(author);
  if (fromAuthor) return fromAuthor;
  const fromTask = normalizeDocUpdatedBy(
    typeof task.doc_updated_by === "string" ? task.doc_updated_by : undefined,
  );
  if (fromTask) return fromTask;
  return normalizeDocUpdatedBy(typeof task.owner === "string" ? task.owner : undefined);
}

export function taskDataToFrontmatter(task: TaskData): Record<string, unknown> {
  const planApproval =
    task.plan_approval ??
    ({ state: "pending", updated_at: null, updated_by: null, note: null } as const);
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    owner: task.owner,
    depends_on: task.depends_on ?? [],
    tags: task.tags ?? [],
    verify: task.verify ?? [],
    plan_approval: planApproval,
    commit: task.commit ?? null,
    comments: task.comments ?? [],
    doc_version: task.doc_version,
    doc_updated_at: task.doc_updated_at,
    doc_updated_by: task.doc_updated_by,
    description: task.description ?? "",
  };
}

export async function loadBackendTask(opts: {
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
}): Promise<{
  backend: Awaited<ReturnType<typeof loadTaskBackend>>["backend"];
  backendId: string;
  resolved: Awaited<ReturnType<typeof loadTaskBackend>>["resolved"];
  config: Awaited<ReturnType<typeof loadTaskBackend>>["config"];
  task: TaskData;
}> {
  const { backend, backendId, resolved, config } = await loadTaskBackend({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const task = await backend.getTask(opts.taskId);
  if (!task) {
    const tasksDir = path.join(resolved.gitRoot, config.paths.workflow_dir);
    const readmePath = path.join(tasksDir, opts.taskId, "README.md");
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `ENOENT: no such file or directory, open '${readmePath}'`,
    });
  }
  return { backend, backendId, resolved, config, task };
}
