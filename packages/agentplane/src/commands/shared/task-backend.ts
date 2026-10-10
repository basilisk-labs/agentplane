import type { ResolvedProject } from "@agentplaneorg/core/project";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import path from "node:path";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import {
  resolveTaskDocUpdatedBy,
  taskDocToSectionMap,
  taskExecutionBaseFromExtensions,
} from "@agentplaneorg/core/tasks";

import type { ResolvedHarnessContract } from "../../runtime/harness/index.js";
import { CliError } from "../../shared/errors.js";
import { emitTraceEvent } from "../../shared/trace-events.js";
import {
  measurePreparationNode,
  type PreparationTraceRecorder,
} from "../../shared/preparation-trace.js";
import {
  loadTaskBackend,
  LocalBackend,
  type TaskBackendCapabilities,
  type TaskBackend,
  toTaskSummary,
  type TaskData,
  type TaskSummary,
} from "../../backends/task-backend.js";
import {
  GitContext,
  gitConfigGet,
  listWorktrees,
  parseTaskIdFromBranch,
} from "@agentplaneorg/core/git";
import { resolveCommonGitDirectory } from "../../shared/env.js";
import { findRouteWorktreePath } from "./route-decision-workspace.js";
import {
  loadTaskFromBranchSnapshot,
  supplementTaskProjectionFromWorktrees,
  resolveAuthoritativeTaskWorktree,
  resolveTaskBranchFromContext,
  taskBranchHasLocalRef,
} from "./task-backend-branch-snapshot.js";

export {
  loadTaskFromBranchSnapshot,
  resolveTaskBranchFromContext,
} from "./task-backend-branch-snapshot.js";

type CommandMemo = {
  tasks?: Promise<TaskData[]>;
  taskProjection?: Promise<TaskSummary[]>;
  taskBranchInventory?: Promise<{
    localBranches: string[];
    remoteBranches: string[];
  }>;
  taskWorktreeInventory?: Promise<{ path: string; branch: string | null }[]>;
  changedPaths?: Promise<string[]>;
  headCommit?: Promise<string>;
  gitCommonDir?: Promise<string>;
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
  preparationTrace?: PreparationTraceRecorder | null;

  memo: CommandMemo;
};

export function resolveCommandGitCommonDir(ctx: CommandContext): Promise<string> {
  ctx.memo.gitCommonDir ??= resolveCommonGitDirectory(ctx.resolvedProject.gitRoot);
  return ctx.memo.gitCommonDir;
}

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
    task_kind: task.task_kind,
    mutation_scope: task.mutation_scope,
    risk_flags: task.risk_flags,
    verify: task.verify ?? [],
    plan_approval: planApproval,
    verification,
    quality_review: task.quality_review ?? undefined,
    runner: task.runner ?? undefined,
    token_usage: task.token_usage ?? undefined,
    execution_route: task.execution_route ?? undefined,
    execution_contract: task.execution_contract ?? undefined,
    commit: task.commit ?? null,
    comments: task.comments ?? [],
    events: task.events ?? [],
    doc_version: task.doc_version,
    doc_updated_at: task.doc_updated_at,
    doc_updated_by: task.doc_updated_by,
    description: task.description ?? "",
    sections,
    extensions: task.extensions,
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
    supports_snapshot_export: false,
  } satisfies TaskBackendCapabilities;
}

function backendHasLocalCanonicalSource(ctx: CommandContext): boolean {
  return getTaskBackendCapabilities(ctx).canonical_source === "local";
}

function backendWritesTaskReadmes(ctx: CommandContext): boolean {
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
  preparationTrace?: PreparationTraceRecorder | null;
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
    preparationTrace: opts.preparationTrace ?? null,
    memo: {},
  };
}

/**
 * Route repository-level task mutations to the primary checkout. Linked task
 * worktrees own their existing task, but they must not become the storage root
 * for a newly created sibling task.
 */
export async function resolvePrimaryCheckoutCommandContext(
  ctx: CommandContext,
): Promise<CommandContext> {
  const worktrees = await listWorktrees(ctx.resolvedProject.gitRoot);
  const primary = worktrees[0]?.path;
  if (!primary || path.resolve(primary) === path.resolve(ctx.resolvedProject.gitRoot)) {
    return ctx;
  }
  return await loadCommandContext({ cwd: primary, rootOverride: null });
}

/**
 * Route task commands back to the primary checkout when invoked from an old
 * linked worktree that predates the requested task. A task worktree remains
 * authoritative when it already contains the task or owns its task branch.
 */
export async function resolveTaskOwnerCommandContext(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<CommandContext> {
  const backend = opts.ctx.taskBackend;
  // Compact history reads do not give the invocation backend write ownership.
  const compactHistory =
    opts.ctx.backendId === "local" &&
    (await gitConfigGet(opts.ctx.resolvedProject.gitRoot, "agentplane.compactTaskHistory")) ===
      "true";
  const localTask = compactHistory
    ? await new LocalBackend({
        dir: path.join(opts.ctx.resolvedProject.gitRoot, ".agentplane/tasks"),
      }).getTask(opts.taskId)
    : await backend.getTask(opts.taskId);
  const taskBranch = await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  if (taskBranch) {
    const owner = await resolveAuthoritativeTaskWorktree({
      ctx: opts.ctx,
      taskId: opts.taskId,
      branch: taskBranch,
      requireRegistration: await taskBranchHasLocalRef({ ctx: opts.ctx, branch: taskBranch }),
    });
    if (owner) {
      if (path.resolve(owner.path) === path.resolve(opts.ctx.resolvedProject.gitRoot)) {
        await loadTaskFromContext({
          ctx: opts.ctx,
          taskId: opts.taskId,
          preferBranchSnapshot: true,
        });
        return opts.ctx;
      }
      const ownerCtx = await loadCommandContext({ cwd: owner.path, rootOverride: null });
      await loadTaskFromContext({ ctx: ownerCtx, taskId: opts.taskId, preferBranchSnapshot: true });
      return ownerCtx;
    }
  }

  const primaryCtx = await resolvePrimaryCheckoutCommandContext(opts.ctx);
  const primaryTask = await primaryCtx.taskBackend.getTask(opts.taskId);
  if (primaryTask) {
    const base = taskExecutionBaseFromExtensions(primaryTask.extensions);
    if (
      primaryCtx !== opts.ctx &&
      Object.hasOwn(primaryTask.extensions ?? {}, TASK_KERNEL_EXTENSION) &&
      primaryTask.execution_route?.repository_mode === "branch_pr" &&
      base?.source === "explicit"
    ) {
      const baseCheckout = await findRouteWorktreePath(
        opts.ctx.resolvedProject.gitRoot,
        base.base_ref,
      );
      if (
        baseCheckout &&
        path.resolve(baseCheckout) === path.resolve(opts.ctx.resolvedProject.gitRoot)
      ) {
        // Keep canonical storage in the primary checkout while observing the selected base.
        return {
          ...opts.ctx,
          taskBackend: primaryCtx.taskBackend,
          backendId: primaryCtx.backendId,
          backendConfigPath: primaryCtx.backendConfigPath,
        };
      }
    }
    return primaryCtx;
  }
  if (localTask && Object.hasOwn(localTask.extensions ?? {}, TASK_KERNEL_EXTENSION))
    return opts.ctx;
  if (
    primaryCtx !== opts.ctx &&
    opts.ctx.config.workflow_mode !== "branch_pr" &&
    (await opts.ctx.taskBackend.getTask(opts.taskId))
  ) {
    return opts.ctx;
  }
  return primaryCtx;
}

export async function loadTaskFromContext(opts: {
  ctx: CommandContext;
  taskId: string;
  preferBranchSnapshot?: boolean;
  branchSnapshotBranch?: string | null;
  requireBranchWorktree?: boolean;
}): Promise<TaskData> {
  const tasksDir = path.join(opts.ctx.resolvedProject.gitRoot, opts.ctx.config.paths.workflow_dir);
  const readmePath = path.join(tasksDir, opts.taskId, "README.md");
  const branchFallback = () =>
    loadTaskFromBranchSnapshot({
      ctx: opts.ctx,
      taskId: opts.taskId,
      readmePath,
      branch: opts.branchSnapshotBranch ?? null,
      requireWorktree: opts.requireBranchWorktree,
    });
  const primaryCanonical = async () => {
    if (!backendUsesLocalTaskStore(opts.ctx)) return null;
    const primary = await resolvePrimaryCheckoutCommandContext(opts.ctx);
    if (primary === opts.ctx) return null;
    const task = await primary.taskBackend.getTask(opts.taskId);
    return task && Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION) ? task : null;
  };

  const preferredBranchTask = opts.preferBranchSnapshot ? await branchFallback() : null;
  const canonical = (candidate: TaskData | null) =>
    candidate && Object.hasOwn(candidate.extensions ?? {}, TASK_KERNEL_EXTENSION);
  const task = await opts.ctx.taskBackend.getTask(opts.taskId).catch((error: unknown) => {
    if (canonical(preferredBranchTask)) return null;
    throw error;
  });
  const primary = canonical(task)
    ? null
    : await primaryCanonical().catch((error: unknown) => {
        if (canonical(preferredBranchTask)) return null;
        throw error;
      });
  let authoritative = preferredBranchTask;
  if (!authoritative && backendUsesLocalTaskStore(opts.ctx)) {
    opts.ctx.memo.taskWorktreeInventory ??= listWorktrees(opts.ctx.resolvedProject.gitRoot);
    const worktrees = await opts.ctx.memo.taskWorktreeInventory;
    const hasOwner = worktrees.some(
      (entry) =>
        entry.branch &&
        parseTaskIdFromBranch(opts.ctx.config.branch.task_prefix, entry.branch) === opts.taskId,
    );
    if (!task || canonical(task) || primary || hasOwner) authoritative = await branchFallback();
  }
  if (authoritative) {
    if ((canonical(task) || primary) && !canonical(authoritative)) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Authoritative task ${opts.taskId} is missing its known canonical record. Restore the native record before continuing; do not migrate or scaffold this task.`,
        context: { reason_code: "canonical_owner_record_missing", task_id: opts.taskId },
      });
    }
    if (opts.preferBranchSnapshot || !task || canonical(authoritative)) return authoritative;
  }
  if (primary) return primary;
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
  preferBranchSnapshot?: boolean;
  branchSnapshotBranch?: string | null;
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
  const task = await measurePreparationNode({
    recorder: ctx.preparationTrace,
    node: "task_backend_read",
    scope: `task:${opts.taskId}`,
    dependencies: ["command_context"],
    cacheability: "exact",
    cachePolicyReason:
      "Task identity, revision, backend, and complete projection are fingerprinted.",
    operation: async () =>
      await loadTaskFromContext({
        ctx,
        taskId: opts.taskId,
        preferBranchSnapshot: opts.preferBranchSnapshot,
        branchSnapshotBranch: opts.branchSnapshotBranch,
      }),
    fingerprintInputs: (task) => ({
      task_id: opts.taskId,
      backend_id: ctx.backendId,
      backend_config_path: ctx.backendConfigPath,
      task_projection: task,
    }),
    output: (task) => task,
  });
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

export async function listTaskSummariesMemo(
  ctx: CommandContext,
  opts: { projectionStatus?: readonly string[]; fallbackToCanonicalOnEmpty?: boolean } = {},
): Promise<TaskSummary[]> {
  const filterByProjectionStatus = (summaries: TaskSummary[]): TaskSummary[] => {
    if (!opts.projectionStatus || opts.projectionStatus.length === 0) return summaries;
    const statuses = new Set(opts.projectionStatus.map((status) => status.trim().toUpperCase()));
    return summaries.filter((summary) => statuses.has(String(summary.status).trim().toUpperCase()));
  };
  const canonicalSummaries = async (): Promise<TaskSummary[]> => {
    const tasks = await ctx.taskBackend.listTasks();
    return tasks.map((task) => toTaskSummary(task));
  };
  const loadTask = (taskId: string, branch: string) =>
    loadTaskFromContext({
      ctx,
      taskId,
      branchSnapshotBranch: branch,
      preferBranchSnapshot: true,
    });
  if (
    opts.projectionStatus &&
    opts.projectionStatus.length > 0 &&
    ctx.taskBackend.capabilities?.projection_read_mode === "native"
  ) {
    if (!ctx.taskBackend.listProjectionTasks) {
      throw new CliError({
        exitCode: 1,
        code: "E_INTERNAL",
        message: `Backend ${ctx.taskBackend.id} advertises native projection reads but does not implement listProjectionTasks()`,
      });
    }
    const projected = await ctx.taskBackend.listProjectionTasks({ status: opts.projectionStatus });
    const tasks =
      projected.length > 0 || opts.fallbackToCanonicalOnEmpty !== true
        ? projected
        : await canonicalSummaries();
    return filterByProjectionStatus(
      await supplementTaskProjectionFromWorktrees({ ctx, tasks, loadTask }),
    );
  }
  ctx.memo.taskProjection ??= (async () => {
    if (ctx.taskBackend.capabilities?.projection_read_mode === "native") {
      if (!ctx.taskBackend.listProjectionTasks) {
        throw new CliError({
          exitCode: 1,
          code: "E_INTERNAL",
          message: `Backend ${ctx.taskBackend.id} advertises native projection reads but does not implement listProjectionTasks()`,
        });
      }
      return await supplementTaskProjectionFromWorktrees({
        ctx,
        loadTask,
        tasks: await ctx.taskBackend.listProjectionTasks(),
      });
    }
    return await supplementTaskProjectionFromWorktrees({
      ctx,
      tasks: await canonicalSummaries(),
      loadTask,
    });
  })();
  return filterByProjectionStatus(await ctx.memo.taskProjection);
}

export async function listTasksMemo(ctx: CommandContext): Promise<TaskData[]> {
  ctx.memo ??= {};
  ctx.memo.tasks ??= ctx.taskBackend.listTasks();
  return await ctx.memo.tasks;
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
