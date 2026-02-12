import path from "node:path";
import type { AgentplaneConfig, ResolvedProject } from "@agentplaneorg/core";

import { CliError } from "../../shared/errors.js";
import { loadTaskBackend, type TaskData } from "../../backends/task-backend.js";
import { GitContext } from "./git-context.js";

export type CommandMemo = {
  taskList?: Promise<TaskData[]>;
  changedPaths?: Promise<string[]>;
  headCommit?: Promise<string>;
  agentIds?: Promise<string[]>;
};

export type CommandContext = {
  resolvedProject: Awaited<ReturnType<typeof loadTaskBackend>>["resolved"];
  config: Awaited<ReturnType<typeof loadTaskBackend>>["config"];
  taskBackend: Awaited<ReturnType<typeof loadTaskBackend>>["backend"];
  backendId: string;
  backendConfigPath: string;
  git: GitContext;

  memo: CommandMemo;

  // Back-compat aliases while refactors are in flight.
  resolved: CommandContext["resolvedProject"];
  backend: CommandContext["taskBackend"];
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
    result_summary: task.result_summary,
    risk_level: task.risk_level,
    breaking: task.breaking,
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
    events: task.events ?? [],
    doc_version: task.doc_version,
    doc_updated_at: task.doc_updated_at,
    doc_updated_by: task.doc_updated_by,
    description: task.description ?? "",
    id_source: task.id_source,
    dirty: task.dirty,
  };
}

export async function loadCommandContext(opts: {
  cwd: string;
  rootOverride?: string | null;
  resolvedProject?: ResolvedProject;
  config?: AgentplaneConfig;
}): Promise<CommandContext> {
  const backendLoaded = await loadTaskBackend({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    resolvedProject: opts.resolvedProject,
    config: opts.config,
  });
  const { backend, backendId, backendConfigPath, resolved, config } = backendLoaded;
  return {
    resolvedProject: resolved,
    config,
    taskBackend: backend,
    backendId,
    backendConfigPath,
    git: new GitContext({ gitRoot: resolved.gitRoot }),
    memo: {},
    resolved,
    backend,
  };
}

export async function loadTaskFromContext(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<TaskData> {
  const task = await opts.ctx.taskBackend.getTask(opts.taskId);
  if (!task) {
    const tasksDir = path.join(
      opts.ctx.resolvedProject.gitRoot,
      opts.ctx.config.paths.workflow_dir,
    );
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
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
}): Promise<{
  backend: CommandContext["taskBackend"];
  backendId: string;
  backendConfigPath: string;
  resolved: CommandContext["resolvedProject"];
  config: CommandContext["config"];
  task: TaskData;
}> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
  return {
    backend: ctx.taskBackend,
    backendId: ctx.backendId,
    backendConfigPath: ctx.backendConfigPath,
    resolved: ctx.resolvedProject,
    config: ctx.config,
    task,
  };
}

export async function listTasksMemo(ctx: CommandContext): Promise<TaskData[]> {
  ctx.memo.taskList ??= ctx.taskBackend.listTasks();
  return await ctx.memo.taskList;
}
