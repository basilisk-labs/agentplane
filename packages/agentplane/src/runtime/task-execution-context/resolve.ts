import path from "node:path";
import { realpath } from "node:fs/promises";

import {
  findWorktreeForBranch,
  gitBranchExists,
  gitCurrentBranch,
  gitRevParse,
  resolveBaseBranch,
} from "@agentplaneorg/core/git";
import type { TaskExecutionRouteMode, TaskExecutionRouteRequest } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  resolveTaskBranchFromContext,
  type CommandContext,
} from "../../commands/shared/task-backend.js";
import { resolveTaskExecutionRoute } from "../task-routing/resolve.js";
import type {
  AuthoritativeTaskSource,
  TaskCommandContext,
  TaskExecutionContext,
  TaskExecutionRequestedMode,
  TaskExecutionRouteSource,
} from "./types.js";

type FrozenBaseIdentity = Readonly<{ base_ref: string; base_sha: string }>;

function repositoryMode(ctx: CommandContext): TaskExecutionRouteMode {
  return ctx.config.workflow_mode === "branch_pr" ? "branch_pr" : "direct";
}

function normalizeRequestedMode(
  mode: TaskExecutionRouteRequest | undefined,
): TaskExecutionRequestedMode {
  return mode === "repository" || mode === undefined ? "auto" : mode;
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function directWorkspaceBranch(taskId: string): string {
  return `agentplane/workspace/${taskId.replaceAll(/[^A-Za-z0-9._-]/gu, "-")}`;
}

function routeSelection(opts: { ctx: CommandContext; task: TaskData }): {
  repository_mode: TaskExecutionRouteMode;
  selected_mode: TaskExecutionRouteMode;
  requested_mode: TaskExecutionRequestedMode;
  route_source: TaskExecutionRouteSource;
  reason_codes: string[];
} {
  const repository_mode = repositoryMode(opts.ctx);
  const persistedRequest = opts.task.execution_route?.requested_mode;
  const requested_mode = normalizeRequestedMode(persistedRequest);
  const legacyMigration = persistedRequest === "repository";
  const selectedByTask =
    opts.task.execution_contract?.selected_mode ?? opts.task.execution_route?.selected_mode;
  const fallback = resolveTaskExecutionRoute({
    config: opts.ctx.config,
    task: opts.task,
    requestedMode: requested_mode,
  });
  const selected_mode =
    repository_mode === "branch_pr" ? "branch_pr" : (selectedByTask ?? fallback.selected_mode);
  const route_source: TaskExecutionRouteSource = legacyMigration
    ? "legacy_migration"
    : opts.task.execution_contract
      ? "execution_contract"
      : opts.task.execution_route
        ? "execution_route"
        : "repository_floor";
  const reasons =
    opts.task.execution_contract?.reason_codes ??
    opts.task.execution_route?.reason_codes ??
    fallback.reason_codes;
  return {
    repository_mode,
    selected_mode,
    requested_mode,
    route_source,
    reason_codes: unique([
      ...reasons,
      ...(legacyMigration ? ["legacy_repository_request_normalized"] : []),
      ...(repository_mode === "branch_pr" && selectedByTask === "direct"
        ? ["repository_branch_pr_floor"]
        : []),
    ]).toSorted(),
  };
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function frozenBaseFromTask(task: TaskData): FrozenBaseIdentity | { base_sha: string } | null {
  const extensions = record(task.extensions);
  const stored = record(extensions?.task_execution_context);
  const storedRef = nonEmptyString(stored?.base_ref);
  const storedSha = nonEmptyString(stored?.base_sha);
  if (storedRef && storedSha) return { base_ref: storedRef, base_sha: storedSha };

  const baseline = record(extensions?.workflow_route_baseline);
  const startSha = nonEmptyString(baseline?.start_head_sha);
  return startSha ? { base_sha: startSha } : null;
}

async function resolveFrozenBaseIdentity(opts: {
  ctx: CommandContext;
  task: TaskData;
  selectedMode: TaskExecutionRouteMode;
  baseRef?: string;
  baseSha?: string;
}): Promise<FrozenBaseIdentity> {
  const explicitRef = nonEmptyString(opts.baseRef);
  const explicitSha = nonEmptyString(opts.baseSha);
  if ((explicitRef && !explicitSha) || (!explicitRef && explicitSha)) {
    throw new Error("Task execution base override requires both base_ref and base_sha.");
  }
  if (explicitRef && explicitSha) return { base_ref: explicitRef, base_sha: explicitSha };

  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const stored = frozenBaseFromTask(opts.task);
  if (stored && "base_ref" in stored) return stored;
  const base_ref =
    (await resolveBaseBranch({ cwd: gitRoot, mode: opts.selectedMode })) ??
    (await gitCurrentBranch(gitRoot));
  return {
    base_ref,
    base_sha:
      stored?.base_sha ?? (await gitRevParse(gitRoot, [base_ref]).catch(() => "0".repeat(40))),
  };
}

function assertBatchCompatible(contexts: readonly TaskExecutionContext[]): void {
  const primary = contexts[0];
  if (!primary) throw new Error("Task execution context requires at least one task.");
  for (const context of contexts.slice(1)) {
    const mismatches = (["selected_mode", "base_ref", "base_sha"] as const).filter(
      (field) => context[field] !== primary[field],
    );
    if (mismatches.length > 0) {
      throw new Error(
        `Tasks ${primary.primary_task_id} and ${context.primary_task_id} cannot share an execution context; mismatched ${mismatches.join(", ")}.`,
      );
    }
  }
}

export async function resolveTaskExecutionContext(opts: {
  ctx: CommandContext;
  tasks: readonly TaskData[];
  primaryTaskId?: string;
  authoritativeTaskSource?: AuthoritativeTaskSource;
  baseRef?: string;
  baseSha?: string;
}): Promise<TaskExecutionContext> {
  if (opts.tasks.length === 0)
    throw new Error("Task execution context requires at least one task.");
  const primaryTaskId = opts.primaryTaskId ?? opts.tasks[0]?.id;
  const primaryTask = opts.tasks.find((task) => task.id === primaryTaskId);
  if (!primaryTask)
    throw new Error(`Primary task ${primaryTaskId} is not present in the task set.`);
  const orderedTasks = [primaryTask, ...opts.tasks.filter((task) => task.id !== primaryTask.id)];
  const taskIds = unique(orderedTasks.map((task) => task.id));
  const contexts: TaskExecutionContext[] = [];
  for (const task of orderedTasks) {
    const selection = routeSelection({ ctx: opts.ctx, task });
    const base = await resolveFrozenBaseIdentity({
      ctx: opts.ctx,
      task,
      selectedMode: selection.selected_mode,
      baseRef: opts.baseRef,
      baseSha: opts.baseSha,
    });
    contexts.push(
      Object.freeze({
        schema_version: 1 as const,
        primary_task_id: task.id,
        task_ids: Object.freeze([...taskIds]),
        ...selection,
        ...base,
        authoritative_task_source: opts.authoritativeTaskSource ?? "backend_projection",
      }),
    );
  }
  assertBatchCompatible(contexts);
  const primary = contexts[0];
  if (!primary) throw new Error("Task execution context requires at least one task.");
  return Object.freeze({ ...primary, primary_task_id: primaryTask.id });
}

export async function loadTaskCommandContext(opts: {
  ctx: CommandContext;
  taskIds: readonly string[];
  primaryTaskId?: string;
  baseRef?: string;
  baseSha?: string;
  workspaceCommandForModes?: readonly TaskExecutionRouteMode[];
  discoverAuthoritativeWorkspace?: boolean;
}): Promise<TaskCommandContext> {
  const taskIds = unique(opts.taskIds.map((taskId) => taskId.trim()).filter(Boolean));
  if (taskIds.length === 0) throw new Error("Task command context requires at least one task id.");
  const preliminary = await Promise.all(
    taskIds.map((taskId) => loadTaskFromContext({ ctx: opts.ctx, taskId })),
  );
  const primaryTaskId = opts.primaryTaskId ?? taskIds[0];
  const preliminaryPrimary = preliminary.find((task) => task.id === primaryTaskId);
  if (!preliminaryPrimary)
    throw new Error(`Primary task ${primaryTaskId} is not present in the task set.`);
  const primarySelection = routeSelection({ ctx: opts.ctx, task: preliminaryPrimary });
  const directBranch = directWorkspaceBranch(primaryTaskId);
  const primaryWorkspaceBranch =
    opts.discoverAuthoritativeWorkspace === false
      ? null
      : primarySelection.selected_mode === "branch_pr"
        ? await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId: primaryTaskId })
        : (await gitBranchExists(opts.ctx.resolvedProject.gitRoot, directBranch))
          ? directBranch
          : null;
  const primaryWorkspace = primaryWorkspaceBranch
    ? await findWorktreeForBranch(opts.ctx.resolvedProject.gitRoot, primaryWorkspaceBranch)
    : null;
  const primaryIsCurrent = primaryWorkspace
    ? (await realpath(primaryWorkspace).catch(() => path.resolve(primaryWorkspace))) ===
      (await realpath(opts.ctx.resolvedProject.gitRoot).catch(() =>
        path.resolve(opts.ctx.resolvedProject.gitRoot),
      ))
    : false;
  const workspaceCommandForModes = opts.workspaceCommandForModes ?? ["direct", "branch_pr"];
  const authoritativeCtx =
    primaryWorkspace &&
    !primaryIsCurrent &&
    workspaceCommandForModes.includes(primarySelection.selected_mode)
      ? await loadCommandContext({ cwd: primaryWorkspace, rootOverride: null })
      : opts.ctx;
  let loadedFromWorkspace = false;
  const tasks = await Promise.all(
    preliminary.map(async (task) => {
      const selection = routeSelection({ ctx: opts.ctx, task });
      if (primaryWorkspace) {
        loadedFromWorkspace = true;
        const taskCtx =
          primaryIsCurrent || workspaceCommandForModes.includes(primarySelection.selected_mode)
            ? authoritativeCtx
            : await loadCommandContext({ cwd: primaryWorkspace, rootOverride: null });
        return await loadTaskFromContext({ ctx: taskCtx, taskId: task.id });
      }
      if (
        opts.discoverAuthoritativeWorkspace !== false &&
        selection.selected_mode === "branch_pr"
      ) {
        loadedFromWorkspace = true;
        return await loadTaskFromContext({
          ctx: opts.ctx,
          taskId: task.id,
          preferBranchSnapshot: true,
        });
      }
      const workspaceBranch = directWorkspaceBranch(task.id);
      if (
        opts.discoverAuthoritativeWorkspace !== false &&
        (await gitBranchExists(opts.ctx.resolvedProject.gitRoot, workspaceBranch))
      ) {
        loadedFromWorkspace = true;
        return await loadTaskFromContext({
          ctx: opts.ctx,
          taskId: task.id,
          preferBranchSnapshot: true,
          branchSnapshotBranch: workspaceBranch,
        });
      }
      return task;
    }),
  );
  const primaryTask = tasks.find((task) => task.id === primaryTaskId);
  if (!primaryTask)
    throw new Error(`Primary task ${primaryTaskId} is not present in the task set.`);
  const source: AuthoritativeTaskSource = loadedFromWorkspace
    ? "task_worktree"
    : opts.ctx.backendId === "local"
      ? "base_checkout"
      : "backend_projection";
  const execution = await resolveTaskExecutionContext({
    ctx: authoritativeCtx,
    tasks,
    primaryTaskId,
    authoritativeTaskSource: source,
    baseRef: opts.baseRef,
    baseSha: opts.baseSha,
  });
  return Object.freeze({
    command: authoritativeCtx,
    execution,
    primary_task: primaryTask,
    tasks: Object.freeze([...tasks]),
  });
}
