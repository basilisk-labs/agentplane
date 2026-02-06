import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { loadTaskBackend, type TaskData } from "../../backends/task-backend.js";

export type CommandContext = {
  backend: Awaited<ReturnType<typeof loadTaskBackend>>["backend"];
  backendId: string;
  backendConfigPath: string;
  resolved: Awaited<ReturnType<typeof loadTaskBackend>>["resolved"];
  config: Awaited<ReturnType<typeof loadTaskBackend>>["config"];
};

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
  const verification =
    task.verification ??
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
    verification,
    commit: task.commit ?? null,
    comments: task.comments ?? [],
    doc_version: task.doc_version,
    doc_updated_at: task.doc_updated_at,
    doc_updated_by: task.doc_updated_by,
    description: task.description ?? "",
  };
}

export async function loadCommandContext(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<CommandContext> {
  const { backend, backendId, backendConfigPath, resolved, config } = await loadTaskBackend({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  return { backend, backendId, backendConfigPath, resolved, config };
}

export async function loadTaskFromContext(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<TaskData> {
  const task = await opts.ctx.backend.getTask(opts.taskId);
  if (!task) {
    const tasksDir = path.join(opts.ctx.resolved.gitRoot, opts.ctx.config.paths.workflow_dir);
    const readmePath = path.join(tasksDir, opts.taskId, "README.md");
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `ENOENT: no such file or directory, open '${readmePath}'`,
    });
  }
  return task;
}

export async function loadBackendTask(opts: {
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
}): Promise<{
  backend: CommandContext["backend"];
  backendId: string;
  backendConfigPath: string;
  resolved: CommandContext["resolved"];
  config: CommandContext["config"];
  task: TaskData;
}> {
  const ctx = await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
  return { ...ctx, task };
}
