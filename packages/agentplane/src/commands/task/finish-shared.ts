import { ensureDocSections, normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { emitTraceEvent } from "../../shared/trace-events.js";
import { generateAcr, writeAcrFile } from "../acr/acr.command.js";
import { cmdCommit } from "../guard/impl/commit.js";
import {
  backendUsesLocalTaskStore,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { getTaskStore, mutateTaskStore } from "../shared/task-store.js";

import {
  ensureAgentFilledRequiredDocSections,
  executeTaskStatusTransitionRequest,
  ensureVerificationSatisfiedIfRequired,
  nowIso,
  resolvePrimaryTag,
  toStringArray,
} from "./shared.js";

export type ResolvedCommitInfo = {
  hash: string;
  message: string;
};

export type LoadedFinishTask = {
  taskId: string;
  task: TaskData;
};

function normalizeCommentBody(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function commitInfoMatches(current: TaskData, requested: ResolvedCommitInfo | null): boolean {
  if (!requested) return true;
  const existing = existingCommitInfo(current);
  if (!existing) return false;
  return existing.hash === requested.hash && existing.message === requested.message;
}

function isIdempotentDoneRetry(opts: {
  task: TaskData;
  author: string;
  body: string;
  resultSummary: string;
  metaTaskId: string;
  taskId: string;
  riskLevel?: "low" | "med" | "high";
  breaking: boolean;
  taskCommitInfo: ResolvedCommitInfo | null;
}): boolean {
  if (normalizeTaskStatus(opts.task.status) !== "DONE") return false;
  const lastComment = opts.task.comments?.at(-1) ?? null;
  const lastEvent = opts.task.events?.at(-1) ?? null;
  if (lastComment?.author !== opts.author) return false;
  if (normalizeCommentBody(lastComment.body) !== normalizeCommentBody(opts.body)) return false;
  if (lastEvent?.type !== "status" || lastEvent.author !== opts.author) return false;
  if (String(lastEvent.from ?? "").toUpperCase() !== "DOING") return false;
  if (String(lastEvent.to ?? "").toUpperCase() !== "DONE") return false;
  if (normalizeCommentBody(lastEvent.note) !== normalizeCommentBody(opts.body)) return false;
  if (!commitInfoMatches(opts.task, opts.taskCommitInfo)) return false;
  if (opts.taskId === opts.metaTaskId) {
    if ((opts.task.result_summary ?? "") !== opts.resultSummary) return false;
    if ((opts.task.risk_level ?? undefined) !== opts.riskLevel) return false;
    if (Boolean(opts.task.breaking) !== opts.breaking) return false;
  }
  return true;
}

export function existingCommitInfo(task: TaskData): ResolvedCommitInfo | null {
  const hash = typeof task.commit?.hash === "string" ? task.commit.hash.trim() : "";
  if (!hash) return null;
  const message = typeof task.commit?.message === "string" ? task.commit.message.trim() : "";
  return { hash, message };
}

export function assertTaskCanFinish(opts: {
  task: TaskData;
  config: CommandContext["config"];
  taskCount: number;
  isMetaTask: boolean;
  resultProvided: boolean;
  resultSummary: string;
  force: boolean;
}): void {
  if (!opts.force && normalizeTaskStatus(opts.task.status) === "DONE") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Task is already DONE: ${opts.task.id} (use --force to override)`,
    });
  }

  ensureVerificationSatisfiedIfRequired(opts.task, opts.config);
  const normalizedDoc = ensureDocSections(
    typeof opts.task.doc === "string" ? opts.task.doc : "",
    opts.config.tasks.doc.required_sections,
  );
  ensureAgentFilledRequiredDocSections({
    task: opts.task,
    config: opts.config,
    doc: normalizedDoc,
    action: "finish task",
  });

  if (!opts.isMetaTask) return;

  const tags = Array.isArray(opts.task.tags)
    ? opts.task.tags.filter((t): t is string => typeof t === "string")
    : [];
  const isSpike = tags.includes("spike");
  if (!isSpike && opts.taskCount === 1 && !opts.resultSummary) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Missing required --result for non-spike tasks.",
    });
  }
  if (opts.resultProvided && !opts.resultSummary) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Invalid value for --result: empty.",
    });
  }
}

export async function loadTaskForFinish(opts: {
  ctx: CommandContext;
  store: ReturnType<typeof getTaskStore> | null;
  useStore: boolean;
  taskId: string;
  taskCount: number;
  metaTaskId: string;
  resultProvided: boolean;
  resultSummary: string;
  force: boolean;
  capturePrimaryLifecycleMeta: boolean;
}): Promise<{
  loaded: LoadedFinishTask;
  primaryStatusFrom: string | null;
  primaryTag: string | null;
}> {
  if (opts.useStore) {
    let captured: TaskData | null = null;
    let primaryStatusFrom: string | null = null;
    let primaryTag: string | null = null;
    await mutateTaskStore(opts.store!, opts.taskId, (currentTask) => {
      assertTaskCanFinish({
        task: currentTask,
        config: opts.ctx.config,
        taskCount: opts.taskCount,
        isMetaTask: opts.taskId === opts.metaTaskId,
        resultProvided: opts.resultProvided,
        resultSummary: opts.resultSummary,
        force: opts.force,
      });
      captured = currentTask;
      if (opts.capturePrimaryLifecycleMeta) {
        primaryStatusFrom = normalizeTaskStatus(currentTask.status);
        primaryTag = resolvePrimaryTag(toStringArray(currentTask.tags), opts.ctx).primary;
      }
      return [];
    });
    if (!captured) {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message: `Task not found: ${opts.taskId}`,
      });
    }
    return {
      loaded: { taskId: opts.taskId, task: captured },
      primaryStatusFrom,
      primaryTag,
    };
  }

  const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  assertTaskCanFinish({
    task,
    config: opts.ctx.config,
    taskCount: opts.taskCount,
    isMetaTask: opts.taskId === opts.metaTaskId,
    resultProvided: opts.resultProvided,
    resultSummary: opts.resultSummary,
    force: opts.force,
  });
  return {
    loaded: { taskId: opts.taskId, task },
    primaryStatusFrom: opts.capturePrimaryLifecycleMeta ? normalizeTaskStatus(task.status) : null,
    primaryTag: opts.capturePrimaryLifecycleMeta
      ? resolvePrimaryTag(toStringArray(task.tags), opts.ctx).primary
      : null,
  };
}

export async function writeFinishedTasks(opts: {
  ctx: CommandContext;
  loadedTasks: LoadedFinishTask[];
  metaTaskId: string;
  author: string;
  body: string;
  force: boolean;
  resultProvided: boolean;
  resultSummary: string;
  riskLevel?: "low" | "med" | "high";
  breaking: boolean;
  taskCommitInfo: ResolvedCommitInfo | null;
}): Promise<void> {
  const useStore = backendUsesLocalTaskStore(opts.ctx);
  const store = useStore ? getTaskStore(opts.ctx) : null;
  const taskCount = opts.loadedTasks.length;

  for (const loaded of opts.loadedTasks) {
    const { taskId, task } = loaded;
    const at = nowIso();
    const applyTransition = async (currentTask: TaskData) => {
      assertTaskCanFinish({
        task: currentTask,
        config: opts.ctx.config,
        taskCount,
        isMetaTask: taskId === opts.metaTaskId,
        resultProvided: opts.resultProvided,
        resultSummary: opts.resultSummary,
        force: opts.force,
      });
      if (
        opts.force &&
        isIdempotentDoneRetry({
          task: currentTask,
          author: opts.author,
          body: opts.body,
          resultSummary: opts.resultSummary,
          metaTaskId: opts.metaTaskId,
          taskId,
          riskLevel: opts.riskLevel,
          breaking: opts.breaking,
          taskCommitInfo: opts.taskCommitInfo,
        })
      ) {
        return { intents: [], nextTask: currentTask };
      }
      return await executeTaskStatusTransitionRequest({
        task: currentTask,
        backend: opts.ctx.taskBackend,
        config: opts.ctx.config,
        at,
        toStatus: "DONE",
        eventAuthor: opts.author,
        updatedBy: opts.author,
        note: opts.body,
        comment: { author: opts.author, body: opts.body },
        commit: opts.taskCommitInfo
          ? { hash: opts.taskCommitInfo.hash, message: opts.taskCommitInfo.message }
          : undefined,
        extraFields: {
          ...(taskId === opts.metaTaskId && opts.resultSummary
            ? { result_summary: opts.resultSummary }
            : {}),
          ...(taskId === opts.metaTaskId && opts.riskLevel ? { risk_level: opts.riskLevel } : {}),
          ...(taskId === opts.metaTaskId && opts.breaking ? { breaking: true } : {}),
        },
        force: true,
        dependencyPolicy: { kind: "none" },
      });
    };

    if (useStore) {
      const result = await mutateTaskStore(store!, taskId, async (currentTask) => {
        const execution = await applyTransition(currentTask);
        return execution.intents;
      });
      loaded.task = result.task;
    } else {
      const execution = await applyTransition(task);
      await opts.ctx.taskBackend.writeTask(execution.nextTask);
      loaded.task = execution.nextTask;
    }
  }
}

export async function refreshAcrArtifactsForFinishedTasks(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  loadedTasks: LoadedFinishTask[];
  taskCommitInfo: ResolvedCommitInfo | null;
  author: string;
  noWriteAcr?: boolean;
}): Promise<string[]> {
  if (opts.noWriteAcr === true) return [];
  if (opts.ctx.config.acr.enabled !== true || opts.ctx.config.acr.write_on_finish !== true) {
    return [];
  }

  const writtenPaths: string[] = [];
  for (const { taskId, task } of opts.loadedTasks) {
    const workCommit = opts.taskCommitInfo?.hash ?? existingCommitInfo(task)?.hash;
    if (!workCommit) continue;
    try {
      const generated = await generateAcr({
        ctx: opts.ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId,
        workCommit,
        agent: opts.author,
        agentName: opts.author,
        write: true,
        refresh: true,
      });
      if (!generated.acrPath) continue;
      await writeAcrFile({ acrPath: generated.acrPath, record: generated.record, refresh: true });
      writtenPaths.push(generated.acrPath);
    } catch (err) {
      emitTraceEvent({
        component: "acr",
        event: "acr_finish_refresh_failed",
        details: {
          task_id: taskId,
          error: err instanceof Error ? err.message : String(err),
        },
      });
    }
  }

  if (writtenPaths.length > 0) {
    opts.ctx.git.invalidateStatus();
  }
  return writtenPaths;
}

export async function createTaskCloseCommit(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  baseBranchOverride?: string;
  quiet: boolean;
  closeUnstageOthers?: boolean;
  allowPolicy?: boolean;
  closeRefreshTaskArtifacts?: boolean;
  additionalTaskIds?: string[];
}): Promise<void> {
  const additionalTaskAllow = (opts.additionalTaskIds ?? [])
    .filter((taskId) => taskId && taskId !== opts.taskId)
    .map((taskId) => `${opts.ctx.config.paths.workflow_dir}/${taskId}`);
  await cmdCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    baseBranchOverride: opts.baseBranchOverride ?? null,
    taskId: opts.taskId,
    message: "",
    close: true,
    allow: additionalTaskAllow,
    autoAllow: false,
    allowTasks: true,
    allowBase: opts.ctx.config.workflow_mode === "branch_pr",
    allowPolicy: opts.allowPolicy === true,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: true,
    quiet: opts.quiet,
    closeUnstageOthers: opts.closeUnstageOthers === true,
    closeCheckOnly: false,
    closeStageTaskArtifacts: opts.ctx.config.workflow_mode === "branch_pr",
    closeRefreshTaskArtifacts: opts.closeRefreshTaskArtifacts,
  });
}
