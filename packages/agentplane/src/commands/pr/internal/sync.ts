import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { resolveBaseBranch } from "@agentplaneorg/core/git";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import { mapBackendError } from "../../../cli/error-map.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { fileExists } from "../../../cli/fs-utils.js";
import { workflowModeMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { emitTraceEvent } from "../../../shared/trace-events.js";
import type { TaskData } from "../../../backends/task-backend.js";
import { INCIDENTS_POLICY_PATH } from "../../../runtime/incidents/index.js";
import { parsePrMeta, type PrMeta } from "../../shared/pr-meta.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../../shared/task-backend.js";
import { resolvePrPaths } from "./pr-paths.js";
import { readPrHandoffNotes } from "./note-store.js";
import { validateBranchPrBatchIncludedTasks } from "./batch-validation.js";
import {
  currentBranchMatchesTask,
  resolvePrSyncBranch,
  resolveRenderableBranchHead,
} from "./sync-branch.js";
import type {
  PrOpenOutcome,
  PrRemoteMode,
  PrSyncCommonState,
  PrSyncResolved,
} from "./sync-model.js";
import { runPrOpenSync } from "./sync-open-step.js";
import { nowIso, readTextIfExists, restoreIncidentRegistryIfNeeded } from "./sync-support.js";
import { runPrUpdateSync } from "./sync-update-step.js";

type PrSyncMode = "open" | "update";
export type { PrOpenOutcome, PrRemoteMode } from "./sync-model.js";

async function buildPrSyncCommonState(opts: {
  task: TaskData;
  resolved: PrSyncResolved;
  prDir: string;
  metaPath: string;
  diffstatPath: string;
  notesPath: string;
  verifyLogPath: string;
  reviewPath: string;
  githubTitlePath: string;
  githubBodyPath: string;
  artifactsLanguage: AgentplaneConfig["artifacts_language"];
  existingMeta: PrMeta | null;
  relatedTaskIds?: string[];
  branch: string;
  baseBranch: string | null;
  workflowDir: string;
  tasksPath: string;
}): Promise<PrSyncCommonState> {
  const handoffNotes = await readPrHandoffNotes(opts.notesPath);
  const now = nowIso();
  const createdAt = opts.existingMeta?.created_at ?? now;
  const { headSha, artifactRefresh } = await resolveRenderableBranchHead({
    gitRoot: opts.resolved.gitRoot,
    taskId: opts.task.id,
    branch: opts.branch,
  });
  const preservedRenderUpdatedAt =
    opts.existingMeta &&
    (opts.existingMeta.branch ?? null) === opts.branch &&
    (opts.existingMeta.base ?? null) === (opts.baseBranch ?? null)
      ? opts.existingMeta.updated_at
      : null;
  const renderUpdatedAt = preservedRenderUpdatedAt ?? now;
  return {
    task: opts.task,
    resolved: opts.resolved,
    workflowDir: opts.workflowDir,
    tasksPath: opts.tasksPath,
    prDir: opts.prDir,
    metaPath: opts.metaPath,
    diffstatPath: opts.diffstatPath,
    notesPath: opts.notesPath,
    verifyLogPath: opts.verifyLogPath,
    reviewPath: opts.reviewPath,
    githubTitlePath: opts.githubTitlePath,
    githubBodyPath: opts.githubBodyPath,
    artifactsLanguage: opts.artifactsLanguage,
    existingMeta: opts.existingMeta,
    relatedTaskIds: normalizeRelatedTaskIds(opts.relatedTaskIds, opts.task.id),
    handoffNotes,
    now,
    createdAt,
    branch: opts.branch,
    baseBranch: opts.baseBranch,
    headSha,
    artifactRefresh,
    renderUpdatedAt,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeBranchPrBatchIncludedTaskIds(task: TaskData, primaryTaskId: string): string[] {
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  if (batch?.role !== "primary" || batch.primary_task_id !== primaryTaskId) return [];
  if (!Array.isArray(batch.included_task_ids)) return [];
  return normalizeRelatedTaskIds(
    batch.included_task_ids.filter((entry): entry is string => typeof entry === "string"),
    primaryTaskId,
  );
}

function withBranchPrBatchExtension(opts: {
  task: TaskData;
  role: "primary" | "included";
  primaryTaskId: string;
  includedTaskIds: string[];
  branch: string;
  base: string | null;
  updatedAt: string;
}): TaskData {
  const extensions = isRecord(opts.task.extensions) ? { ...opts.task.extensions } : {};
  extensions.branch_pr_batch = {
    role: opts.role,
    primary_task_id: opts.primaryTaskId,
    included_task_ids: opts.includedTaskIds,
    branch: opts.branch,
    base: opts.base,
    updated_at: opts.updatedAt,
  };
  return { ...opts.task, extensions };
}

function withoutBranchPrBatchExtension(task: TaskData): TaskData {
  if (!isRecord(task.extensions) || !("branch_pr_batch" in task.extensions)) return task;
  const extensions = { ...task.extensions };
  delete extensions.branch_pr_batch;
  return { ...task, extensions };
}

function hasBranchPrBatchPrimary(task: TaskData, primaryTaskId: string): boolean {
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  return batch?.primary_task_id === primaryTaskId;
}

async function recordBranchPrBatchOwnership(opts: {
  ctx: CommandContext;
  primaryTask: TaskData;
  previousIncludedTaskIds: string[];
  includedTaskIds: string[];
  branch: string;
  base: string | null;
  updatedAt: string;
}): Promise<TaskData> {
  const staleTaskIds = opts.previousIncludedTaskIds.filter(
    (taskId) => !opts.includedTaskIds.includes(taskId),
  );
  const nextPrimary =
    opts.includedTaskIds.length > 0
      ? withBranchPrBatchExtension({
          task: opts.primaryTask,
          role: "primary",
          primaryTaskId: opts.primaryTask.id,
          includedTaskIds: opts.includedTaskIds,
          branch: opts.branch,
          base: opts.base,
          updatedAt: opts.updatedAt,
        })
      : withoutBranchPrBatchExtension(opts.primaryTask);

  if (nextPrimary !== opts.primaryTask) {
    await opts.ctx.taskBackend.writeTask(nextPrimary);
  }

  for (const taskId of staleTaskIds) {
    const staleTask = await opts.ctx.taskBackend.getTask(taskId);
    if (!staleTask) continue;
    if (!hasBranchPrBatchPrimary(staleTask, opts.primaryTask.id)) continue;
    await opts.ctx.taskBackend.writeTask(withoutBranchPrBatchExtension(staleTask));
  }

  if (opts.includedTaskIds.length === 0) return nextPrimary;

  await Promise.all(
    opts.includedTaskIds.map(async (taskId) => {
      const includedTask = await opts.ctx.taskBackend.getTask(taskId);
      if (!includedTask) return;
      await opts.ctx.taskBackend.writeTask(
        withBranchPrBatchExtension({
          task: includedTask,
          role: "included",
          primaryTaskId: opts.primaryTask.id,
          includedTaskIds: opts.includedTaskIds,
          branch: opts.branch,
          base: opts.base,
          updatedAt: opts.updatedAt,
        }),
      );
    }),
  );

  return nextPrimary;
}

export async function ensurePrArtifactsSynced(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author?: string;
  branch?: string;
}): Promise<{
  branch: string;
  prDir: string;
  resolved: { gitRoot: string };
} | null> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const { resolved, config, prDir, metaPath } = await resolvePrPaths({ ...opts, ctx });
  if (config.workflow_mode !== "branch_pr") return null;

  const resolvedBranch = await resolvePrSyncBranch({
    gitRoot: resolved.gitRoot,
    metaPath,
    taskId: opts.taskId,
    branch: opts.branch,
  });
  const branch = resolvedBranch.branch?.trim() ?? "";
  if (!branch) return null;
  if (
    resolvedBranch.source === "current" &&
    !currentBranchMatchesTask(config.branch.task_prefix, branch, opts.taskId)
  ) {
    return null;
  }

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: null,
    mode: config.workflow_mode,
  });
  if (resolvedBranch.source === "current" && baseBranch && branch === baseBranch) {
    return null;
  }

  const reviewPath = path.join(prDir, "review.md");
  const artifactsExist = (await fileExists(metaPath)) && (await fileExists(reviewPath));
  if (!artifactsExist) {
    await syncPrArtifacts({
      ...opts,
      ctx,
      mode: "open",
      author: opts.author,
      branch,
      remoteMode: "sync-only",
    });
  }
  const result = await syncPrArtifacts({
    ...opts,
    ctx,
    mode: "update",
    branch,
  });
  return { ...result, branch };
}

export async function syncPrArtifacts(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  mode: PrSyncMode;
  author?: string;
  branch?: string;
  includeTaskIds?: string[];
  remoteMode?: PrRemoteMode;
}): Promise<{
  meta: PrMeta;
  prDir: string;
  resolved: { gitRoot: string };
  openOutcome?: PrOpenOutcome;
}> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    emitTraceEvent({
      component: "pr-sync",
      event: "sync_started",
      details: { task_id: opts.taskId, mode: opts.mode, backend: ctx.backendId },
    });
    const { task } = await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const {
      resolved,
      config,
      prDir,
      metaPath,
      diffstatPath,
      notesPath,
      verifyLogPath,
      reviewPath,
      githubTitlePath,
      githubBodyPath,
    } = await resolvePrPaths({ ...opts, ctx });
    const incidentsTextBefore = await readTextIfExists(
      path.join(resolved.gitRoot, INCIDENTS_POLICY_PATH),
    );

    try {
      if (config.workflow_mode !== "branch_pr") {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: workflowModeMessage(config.workflow_mode, "branch_pr"),
        });
      }

      const resolvedBranch = await resolvePrSyncBranch({
        gitRoot: resolved.gitRoot,
        metaPath,
        taskId: task.id,
        branch: opts.branch,
      });
      const branch = resolvedBranch.branch?.trim() ?? "";
      if (!branch) {
        throw new CliError({
          exitCode: exitCodeForError("E_USAGE"),
          code: "E_USAGE",
          message: "Branch could not be resolved (use --branch).",
        });
      }

      const metaExists = await fileExists(metaPath);
      const reviewExists = await fileExists(reviewPath);
      if (opts.mode === "update" && (!metaExists || !reviewExists)) {
        const missing: string[] = [];
        if (!metaExists) missing.push(path.relative(resolved.gitRoot, metaPath));
        if (!reviewExists) missing.push(path.relative(resolved.gitRoot, reviewPath));
        throw new CliError({
          exitCode: exitCodeForError("E_VALIDATION"),
          code: "E_VALIDATION",
          message: `PR artifacts missing: ${missing.join(", ")} (run \`agentplane pr open\`)`,
        });
      }

      const existingMeta =
        metaExists && (await fileExists(metaPath))
          ? parsePrMeta(await readFile(metaPath, "utf8"), task.id)
          : null;
      const baseBranch = await resolveBaseBranch({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
        cliBaseOpt: null,
        mode: config.workflow_mode,
      });
      const validatedIncludedTaskIds = await validateBranchPrBatchIncludedTasks({
        ctx,
        primaryTaskId: task.id,
        includeTaskIds: opts.includeTaskIds,
        primaryBranch: branch,
      });
      const previousIncludedTaskIds = normalizeRelatedTaskIds(
        [
          ...(existingMeta?.batch?.included_task_ids ?? []),
          ...normalizeBranchPrBatchIncludedTaskIds(task, task.id),
        ],
        task.id,
      );
      const taskWithBatchOwnership = await recordBranchPrBatchOwnership({
        ctx,
        primaryTask: task,
        previousIncludedTaskIds,
        includedTaskIds: validatedIncludedTaskIds,
        branch,
        base: baseBranch,
        updatedAt: nowIso(),
      });

      await mkdir(prDir, { recursive: true });

      const common = await buildPrSyncCommonState({
        task: taskWithBatchOwnership,
        resolved,
        workflowDir: config.paths.workflow_dir,
        tasksPath: config.paths.tasks_path,
        prDir,
        metaPath,
        diffstatPath,
        notesPath,
        verifyLogPath,
        reviewPath,
        githubTitlePath,
        githubBodyPath,
        artifactsLanguage: config.artifacts_language,
        existingMeta,
        relatedTaskIds: validatedIncludedTaskIds,
        branch,
        baseBranch,
      });

      if (opts.mode === "open") {
        const remoteMode = opts.remoteMode ?? "auto";
        const { meta, openOutcome } = await runPrOpenSync(common, {
          author: opts.author,
          remoteMode,
        });
        emitTraceEvent({
          component: "pr-sync",
          event: "sync_completed",
          details: {
            task_id: task.id,
            mode: opts.mode,
            branch,
            action: openOutcome?.action ?? null,
          },
        });
        return { meta, prDir, resolved, openOutcome };
      }
      const { meta } = await runPrUpdateSync(common);
      emitTraceEvent({
        component: "pr-sync",
        event: "sync_completed",
        details: { task_id: task.id, mode: opts.mode, branch, action: "updated" },
      });
      return { meta, prDir, resolved };
    } finally {
      await restoreIncidentRegistryIfNeeded({
        gitRoot: resolved.gitRoot,
        previousText: incidentsTextBefore,
      });
    }
  } catch (err) {
    emitTraceEvent({
      component: "pr-sync",
      event: "sync_failed",
      details: {
        task_id: opts.taskId,
        mode: opts.mode,
        error: err instanceof Error ? err.name : "UnknownError",
      },
    });
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr sync", root: opts.rootOverride ?? null });
  }
}

function normalizeRelatedTaskIds(value: string[] | undefined, primaryTaskId: string): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const raw of value ?? []) {
    const id = raw.trim();
    if (!id || id === primaryTaskId || seen.has(id)) continue;
    seen.add(id);
    result.push(id);
  }
  return result.toSorted();
}
