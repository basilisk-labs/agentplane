import type { ResolvedProject } from "@agentplaneorg/core/project";
import path from "node:path";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { resolveTaskDocUpdatedBy, taskDocToSectionMap } from "@agentplaneorg/core/tasks";

import type { ResolvedHarnessContract } from "../../runtime/harness/index.js";
import { CliError } from "../../shared/errors.js";
import { emitTraceEvent } from "../../shared/trace-events.js";
import {
  loadTaskBackend,
  type TaskBackendCapabilities,
  type TaskBackend,
  toTaskSummary,
  type TaskData,
  type TaskSummary,
} from "../../backends/task-backend.js";
import { GitContext } from "@agentplaneorg/core/git";
import { loadTaskFromBranchSnapshot } from "./task-backend-branch-snapshot.js";

export {
  loadTaskFromBranchSnapshot,
  resolveTaskBranchFromContext,
} from "./task-backend-branch-snapshot.js";

export type CommandMemo = {
  taskProjection?: Promise<TaskSummary[]>;
  changedPaths?: Promise<string[]>;
  headCommit?: Promise<string>;
  agentIds?: Promise<string[]>;
  harness?: Promise<ResolvedHarnessContract>;
};

export type CommandContext = {
  resolvedProject: Awaited<ReturnType<typeof loadTaskBackend>>["resolved"];
  config: Awaited<ReturnType<typeof loadTaskBackend>>["config"];
  taskBackend: Awaited<ReturnType<typeof loadTaskBackend>>["backend"];
  backendId: string;
  backendConfigPath: string;
  git: GitContext;

  memo: CommandMemo;
};

function normalizeDocUpdatedBy(value?: string): string {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return "";
  if (trimmed.toLowerCase() === "agentplane") return "";
  return trimmed;
}

export function resolveDocUpdatedBy(task: TaskData, author?: string): string {
  return normalizeDocUpdatedBy(
    resolveTaskDocUpdatedBy(
      {
        comments: task.comments ?? null,
        doc_updated_by: task.doc_updated_by,
        owner: task.owner,
      },
      author,
    ),
  );
}

export function taskDataToFrontmatter(task: TaskData): Record<string, unknown> {
  const planApproval =
    task.plan_approval ??
    ({ state: "pending", updated_at: null, updated_by: null, note: null } as const);
  const verification =
    task.verification ??
    ({ state: "pending", updated_at: null, updated_by: null, note: null } as const);
  const revision =
    Number.isInteger(task.revision) && Number(task.revision) > 0 ? Number(task.revision) : 1;
  const sections =
    task.doc === undefined
      ? task.sections && Object.keys(task.sections).length > 0
        ? task.sections
        : undefined
      : taskDocToSectionMap(task.doc);
  return {
    id: task.id,
    title: task.title,
    result_summary: task.result_summary,
    risk_level: task.risk_level,
    breaking: task.breaking,
    status: task.status,
    priority: task.priority,
    owner: task.owner,
    revision,
    origin: task.origin ?? undefined,
    depends_on: task.depends_on ?? [],
    tags: task.tags ?? [],
    verify: task.verify ?? [],
    plan_approval: planApproval,
    verification,
    runner: task.runner ?? undefined,
    commit: task.commit ?? null,
    comments: task.comments ?? [],
    events: task.events ?? [],
    doc_version: task.doc_version,
    doc_updated_at: task.doc_updated_at,
    doc_updated_by: task.doc_updated_by,
    description: task.description ?? "",
    sections,
    id_source: task.id_source,
    dirty: task.dirty,
  };
}

export function getTaskBackendCapabilities(ctx: CommandContext) {
  const capabilities = ctx.taskBackend?.capabilities;
  if (capabilities) return capabilities;

  const isLocal = ctx.backendId === "local";
  return {
    canonical_source: isLocal ? "local" : "remote",
    projection: isLocal ? "canonical" : "cache",
    projection_read_mode: "native",
    reads_from_projection_by_default: !isLocal,
    writes_task_readmes: isLocal,
    supports_task_revisions: isLocal,
    supports_revision_guarded_writes: isLocal,
    may_access_network_on_read: !isLocal,
    may_access_network_on_write: !isLocal,
    supports_projection_refresh: !isLocal,
    supports_push_sync: !isLocal,
    supports_snapshot_export: true,
  } satisfies TaskBackendCapabilities;
}

export function backendHasLocalCanonicalSource(ctx: CommandContext): boolean {
  return getTaskBackendCapabilities(ctx).canonical_source === "local";
}

export function backendWritesTaskReadmes(ctx: CommandContext): boolean {
  return getTaskBackendCapabilities(ctx).writes_task_readmes === true;
}

export function backendSupportsTaskBranchSnapshots(ctx: CommandContext): boolean {
  return backendHasLocalCanonicalSource(ctx) && backendWritesTaskReadmes(ctx);
}

export function backendUsesLocalTaskStore(ctx: CommandContext): boolean {
  return backendSupportsTaskBranchSnapshots(ctx);
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
  emitTraceEvent({
    component: "backend-ops",
    event: "command_context_loaded",
    details: {
      backend: backendId,
      config_path: path.relative(resolved.gitRoot, backendConfigPath),
      canonical_source: backend.capabilities?.canonical_source ?? null,
    },
  });
  return {
    resolvedProject: resolved,
    config,
    taskBackend: backend,
    backendId,
    backendConfigPath,
    git: new GitContext({ gitRoot: resolved.gitRoot }),
    memo: {},
  };
}

export async function loadTaskFromContext(opts: {
  ctx: CommandContext;
  taskId: string;
  preferBranchSnapshot?: boolean;
  branchSnapshotBranch?: string | null;
}): Promise<TaskData> {
  const tasksDir = path.join(opts.ctx.resolvedProject.gitRoot, opts.ctx.config.paths.workflow_dir);
  const readmePath = path.join(tasksDir, opts.taskId, "README.md");
  const branchFallback = () =>
    loadTaskFromBranchSnapshot({
      ctx: opts.ctx,
      taskId: opts.taskId,
      readmePath,
      branch: opts.branchSnapshotBranch ?? null,
    });

  if (opts.preferBranchSnapshot) {
    const preferredBranchTask = await branchFallback();
    if (preferredBranchTask) return preferredBranchTask;
  }

  const task = await opts.ctx.taskBackend.getTask(opts.taskId);
  if (task) {
    emitTraceEvent({
      component: "backend-ops",
      event: "task_loaded",
      details: { task_id: opts.taskId, backend: opts.ctx.backendId },
    });
    return task;
  }

  const fallbackTask = await branchFallback();
  if (fallbackTask) {
    emitTraceEvent({
      component: "backend-ops",
      event: "task_loaded_from_branch_snapshot",
      details: { task_id: opts.taskId, backend: opts.ctx.backendId },
    });
    return fallbackTask;
  }

  throw new CliError({
    exitCode: 4,
    code: "E_IO",
    message: `ENOENT: no such file or directory, open '${readmePath}'`,
  });
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

export async function writeTasksOrFallback(
  backend: Pick<TaskBackend, "writeTask" | "writeTasks">,
  tasks: readonly TaskData[],
): Promise<void> {
  if (tasks.length === 0) return;
  if (backend.writeTasks) {
    await backend.writeTasks([...tasks]);
    return;
  }
  for (const task of tasks) {
    await backend.writeTask(task);
  }
}

export async function listTaskSummariesMemo(ctx: CommandContext): Promise<TaskSummary[]> {
  ctx.memo.taskProjection ??= (async () => {
    if (ctx.taskBackend.capabilities?.projection_read_mode === "native") {
      if (!ctx.taskBackend.listProjectionTasks) {
        throw new CliError({
          exitCode: 1,
          code: "E_INTERNAL",
          message: `Backend ${ctx.taskBackend.id} advertises native projection reads but does not implement listProjectionTasks()`,
        });
      }
      return await ctx.taskBackend.listProjectionTasks();
    }
    const tasks = await ctx.taskBackend.listTasks();
    return tasks.map((task) => toTaskSummary(task));
  })();
  return await ctx.memo.taskProjection;
}

export async function listTaskProjection(ctx: CommandContext): Promise<TaskSummary[] | null> {
  if (ctx.taskBackend.capabilities?.projection_read_mode === "native") {
    return await listTaskSummariesMemo(ctx);
  }
  if (ctx.taskBackend.capabilities?.reads_from_projection_by_default) {
    return await listTaskSummariesMemo(ctx);
  }
  return null;
}

export async function exportTaskProjectionSnapshot(opts: {
  ctx: CommandContext;
  outputPath: string;
}): Promise<void> {
  if (opts.ctx.taskBackend.exportProjectionSnapshot) {
    await opts.ctx.taskBackend.exportProjectionSnapshot(opts.outputPath);
    return;
  }
  if (opts.ctx.taskBackend.exportTasksJson) {
    await opts.ctx.taskBackend.exportTasksJson(opts.outputPath);
    return;
  }
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: "Configured backend does not support exporting a task snapshot",
  });
}
