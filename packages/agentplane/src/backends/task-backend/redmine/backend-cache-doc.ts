import { taskDocToSectionMap } from "@agentplaneorg/core/tasks";

import {
  BackendError,
  RedmineUnavailable,
  ensureDocMetadata,
  mapLimit,
  redmineConfigMissingEnvMessage,
  redmineIssueIdMissingMessage,
  toStringSafe,
  toTaskSummaries,
  unknownTaskIdMessage,
  writeTasksExportFromTasks,
  type TaskData,
  type TaskDocMeta,
  type TaskSummary,
  type TaskWriteOptions,
} from "../shared.js";
import { buildRedmineCanonicalStateWithOptions, parseRedmineCanonicalState } from "./state.js";

type RedmineCachePort = {
  listTasks: () => Promise<TaskData[]>;
  listProjectionTasks?: () => Promise<TaskSummary[]>;
  normalizeTasks?: () => Promise<{ scanned: number; changed: number }>;
  getTask: (taskId: string) => Promise<TaskData | null>;
  writeTask: (task: TaskData, opts?: TaskWriteOptions) => Promise<void>;
};

type RedmineCacheDocContext = {
  cache: RedmineCachePort | null;
  customFields: Record<string, unknown>;
  ownerAgent: string;
  batchSize: number;
  findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
  issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
  customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
  appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) => void;
  requestJson: (
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>;
  assertExpectedRevisionSupported: (taskId: string, opts?: TaskWriteOptions) => void;
  assertExpectedRevision: (
    taskId: string,
    expectedRevision: number | undefined,
    currentRevision: number,
  ) => void;
  cacheTask: (task: TaskData, dirty: boolean) => Promise<void>;
};

function revisionNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

export async function listRedmineTasks(context: RedmineCacheDocContext): Promise<TaskData[]> {
  if (!context.cache) {
    throw new BackendError(
      "Redmine cache is disabled; projection reads are unavailable",
      "E_BACKEND",
    );
  }
  return await context.cache.listTasks();
}

export async function listRedmineProjectionTasks(
  context: RedmineCacheDocContext,
): Promise<TaskSummary[]> {
  if (!context.cache) {
    throw new BackendError(
      "Redmine cache is disabled; projection reads are unavailable",
      "E_BACKEND",
    );
  }
  return context.cache.listProjectionTasks
    ? await context.cache.listProjectionTasks()
    : toTaskSummaries(await context.cache.listTasks());
}

export async function exportRedmineTasksJson(
  context: RedmineCacheDocContext,
  outputPath: string,
): Promise<void> {
  const tasks = await listRedmineTasks(context);
  await writeTasksExportFromTasks({ outputPath, tasks });
}

export async function exportRedmineProjectionSnapshot(
  context: RedmineCacheDocContext,
  outputPath: string,
): Promise<void> {
  if (!context.cache) {
    throw new BackendError(
      "Redmine cache is disabled; projection snapshot export is unavailable",
      "E_BACKEND",
    );
  }
  const tasks = await context.cache.listTasks();
  await writeTasksExportFromTasks({ outputPath, tasks });
}

export async function normalizeRedmineTasks(
  context: RedmineCacheDocContext,
): Promise<{ scanned: number; changed: number }> {
  if (context.cache?.normalizeTasks) return await context.cache.normalizeTasks();
  return { scanned: 0, changed: 0 };
}

export async function getRedmineTask(
  context: RedmineCacheDocContext,
  taskId: string,
): Promise<TaskData | null> {
  if (!context.cache) {
    throw new BackendError(
      "Redmine cache is disabled; projection reads are unavailable",
      "E_BACKEND",
    );
  }
  return (await context.cache.getTask(taskId)) ?? null;
}

export async function getRedmineTasks(
  context: RedmineCacheDocContext,
  taskIds: string[],
): Promise<(TaskData | null)[]> {
  return await mapLimit(
    taskIds,
    context.batchSize,
    async (taskId) => await getRedmineTask(context, taskId),
  );
}

export async function getRedmineTaskDoc(
  context: RedmineCacheDocContext,
  taskId: string,
): Promise<string> {
  const task = await getRedmineTask(context, taskId);
  if (!task) throw new Error(unknownTaskIdMessage(taskId));
  return toStringSafe(task.doc);
}

export async function setRedmineTaskDoc(
  context: RedmineCacheDocContext,
  taskId: string,
  doc: string,
  updatedBy?: string,
  opts?: TaskWriteOptions,
): Promise<void> {
  if (!context.customFields.doc) {
    throw new BackendError(
      redmineConfigMissingEnvMessage("AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC"),
      "E_BACKEND",
    );
  }
  try {
    const issue = await context.findIssueByTaskId(taskId);
    if (!issue) throw new Error(unknownTaskIdMessage(taskId));
    const issueIdText = toStringSafe(issue.id);
    if (!issueIdText) throw new Error(redmineIssueIdMissingMessage());
    const cachedTask = context.issueToTask(issue, taskId);
    const currentState = parseRedmineCanonicalState(
      context.customFieldValue(issue, context.customFields.canonical_state),
    );
    context.assertExpectedRevisionSupported(taskId, opts);
    context.assertExpectedRevision(taskId, opts?.expectedRevision, currentState?.revision ?? 1);
    const taskDoc: TaskDocMeta = {
      doc: String(doc ?? ""),
      doc_version: cachedTask?.doc_version,
    };
    ensureDocMetadata(taskDoc, updatedBy);
    const nextSections = taskDocToSectionMap(String(taskDoc.doc ?? ""));
    const nextRevision =
      Math.max(revisionNumber(cachedTask?.revision), revisionNumber(currentState?.revision), 0) + 1;
    const customFields: Record<string, unknown>[] = [];
    context.appendCustomField(customFields, "doc", taskDoc.doc);
    const nextCanonicalState = buildRedmineCanonicalStateWithOptions(
      {
        id: taskId,
        title: cachedTask?.title ?? "",
        description: cachedTask?.description ?? "",
        status: cachedTask?.status ?? "TODO",
        priority: cachedTask?.priority ?? "med",
        owner: cachedTask?.owner ?? context.ownerAgent,
        depends_on: cachedTask?.depends_on ?? [],
        tags: cachedTask?.tags ?? [],
        verify: cachedTask?.verify ?? [],
        doc: taskDoc.doc,
        sections: nextSections,
        revision: nextRevision,
        plan_approval: cachedTask?.plan_approval,
        verification: cachedTask?.verification,
        events: cachedTask?.events,
      },
      { base: currentState, revision: nextRevision },
    );
    if (nextCanonicalState) {
      context.appendCustomField(customFields, "canonical_state", nextCanonicalState);
    }
    context.appendCustomField(customFields, "doc_version", taskDoc.doc_version);
    context.appendCustomField(customFields, "doc_updated_at", taskDoc.doc_updated_at);
    context.appendCustomField(customFields, "doc_updated_by", taskDoc.doc_updated_by);
    await context.requestJson("PUT", `issues/${issueIdText}.json`, {
      issue: { custom_fields: customFields },
    });
    if (cachedTask) {
      cachedTask.doc = taskDoc.doc;
      cachedTask.sections = nextSections;
      cachedTask.revision = nextRevision;
      cachedTask.doc_version = taskDoc.doc_version;
      cachedTask.doc_updated_at = taskDoc.doc_updated_at;
      cachedTask.doc_updated_by = taskDoc.doc_updated_by;
      await context.cacheTask(cachedTask, false);
    }
  } catch (err) {
    if (!(err instanceof RedmineUnavailable)) throw err;
    if (!context.cache) throw err;
    const cached = await context.cache.getTask(taskId);
    if (!cached) throw new Error(unknownTaskIdMessage(taskId));
    context.assertExpectedRevisionSupported(taskId, opts);
    context.assertExpectedRevision(taskId, opts?.expectedRevision, cached.revision ?? 1);
    cached.doc = String(doc ?? "");
    cached.sections = taskDocToSectionMap(cached.doc);
    cached.revision = Math.max(revisionNumber(cached.revision), 0) + 1;
    ensureDocMetadata(cached, updatedBy);
    cached.dirty = true;
    await context.cache.writeTask(cached, opts);
  }
}

export async function touchRedmineTaskDocMetadata(
  context: RedmineCacheDocContext,
  taskId: string,
  updatedBy?: string,
  opts?: TaskWriteOptions,
): Promise<void> {
  try {
    const issue = await context.findIssueByTaskId(taskId);
    if (!issue) throw new Error(unknownTaskIdMessage(taskId));
    const issueIdText = toStringSafe(issue.id);
    if (!issueIdText) throw new Error(redmineIssueIdMissingMessage());
    const docValue = context.customFieldValue(issue, context.customFields.doc);
    const cachedTask = context.issueToTask(issue, taskId);
    const currentState = parseRedmineCanonicalState(
      context.customFieldValue(issue, context.customFields.canonical_state),
    );
    context.assertExpectedRevisionSupported(taskId, opts);
    context.assertExpectedRevision(taskId, opts?.expectedRevision, currentState?.revision ?? 1);
    const taskDoc: TaskDocMeta = {
      doc: docValue ?? "",
      doc_version: cachedTask?.doc_version,
    };
    ensureDocMetadata(taskDoc, updatedBy);
    const customFields: Record<string, unknown>[] = [];
    context.appendCustomField(customFields, "doc_version", taskDoc.doc_version);
    context.appendCustomField(customFields, "doc_updated_at", taskDoc.doc_updated_at);
    context.appendCustomField(customFields, "doc_updated_by", taskDoc.doc_updated_by);
    if (customFields.length > 0) {
      await context.requestJson("PUT", `issues/${issueIdText}.json`, {
        issue: { custom_fields: customFields },
      });
      if (cachedTask) {
        cachedTask.doc_version = taskDoc.doc_version;
        cachedTask.doc_updated_at = taskDoc.doc_updated_at;
        cachedTask.doc_updated_by = taskDoc.doc_updated_by;
        await context.cacheTask(cachedTask, false);
      }
    }
  } catch (err) {
    if (!(err instanceof RedmineUnavailable)) throw err;
    if (!context.cache) throw err;
    const cached = await context.cache.getTask(taskId);
    if (!cached) throw new Error(unknownTaskIdMessage(taskId));
    context.assertExpectedRevisionSupported(taskId, opts);
    context.assertExpectedRevision(taskId, opts?.expectedRevision, cached.revision ?? 1);
    ensureDocMetadata(cached, updatedBy);
    cached.dirty = true;
    await context.cache.writeTask(cached, opts);
  }
}
