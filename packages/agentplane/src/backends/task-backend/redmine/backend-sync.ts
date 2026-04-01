import { taskDocToSectionMap } from "@agentplaneorg/core";

import {
  BackendError,
  RedmineUnavailable,
  generateTaskId,
  missingTaskIdMessage,
  redmineConfigMissingEnvMessage,
  redmineIssueIdMissingMessage,
  sleep,
  toStringSafe,
  validateTaskId,
  type TaskCanonicalStateMigrationResult,
  type TaskData,
  type TaskDocMeta,
  type TaskWriteOptions,
} from "../shared.js";
import { buildRedmineCanonicalStateWithOptions, parseRedmineCanonicalState } from "./state.js";
import { type TaskComment } from "./comments.js";

type RedmineCachePort = {
  listTasks: () => Promise<TaskData[]>;
  writeTask: (task: TaskData, opts?: TaskWriteOptions) => Promise<void>;
};

export type RedmineSyncContext = {
  cache: RedmineCachePort | null;
  customFields: Record<string, unknown>;
  ownerAgent: string;
  projectId: string;
  batchSize: number;
  batchPauseMs: number;
  statusMap: Record<string, unknown>;
  issueCache: Map<string, Record<string, unknown>>;
  inferredStatusByTaskStatus: Map<string, number> | null;
  setInferredStatusByTaskStatus: (next: Map<string, number> | null) => void;
  listTasksRemote: () => Promise<TaskData[]>;
  writeTask: (task: TaskData, opts?: TaskWriteOptions) => Promise<void>;
  writeTasks: (tasks: TaskData[], opts?: TaskWriteOptions) => Promise<void>;
  findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
  issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
  taskToIssuePayload: (
    task: TaskData,
    existingIssue?: Record<string, unknown>,
  ) => Record<string, unknown>;
  appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) => void;
  customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
  maybeParseJson: (value: unknown) => unknown;
  normalizeComments: (value: unknown) => TaskComment[];
  appendCommentNotes: (
    issueId: string,
    existingComments: TaskComment[],
    desiredComments: TaskComment[],
  ) => Promise<void>;
  cacheTask: (task: TaskData, dirty: boolean) => Promise<void>;
  assertExpectedRevisionSupported: (taskId: string, opts?: TaskWriteOptions) => void;
  assertExpectedRevision: (
    taskId: string,
    expectedRevision: number | undefined,
    currentRevision: number,
  ) => void;
  ensureDocMetadata: (task: TaskDocMeta) => void;
  diffTasks: (localTask: TaskData, remoteTask: TaskData) => string;
  tasksDiffer: (localTask: TaskData, remoteTask: TaskData) => boolean;
  taskIdFieldId: () => unknown;
  setIssueCustomFieldValue: (
    issue: Record<string, unknown>,
    fieldId: unknown,
    value: unknown,
  ) => void;
  requestJson: (
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
    opts?: { attempts?: number; backoff?: number },
  ) => Promise<Record<string, unknown>>;
};

function revisionNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function issueFromPayload(payload: Record<string, unknown>): Record<string, unknown> | null {
  return payload.issue && typeof payload.issue === "object" && !Array.isArray(payload.issue)
    ? (payload.issue as Record<string, unknown>)
    : null;
}

export async function generateRedmineTaskId(
  context: RedmineSyncContext,
  opts: { length: number; attempts: number },
): Promise<string> {
  let existingIds = new Set<string>();
  try {
    const tasks = await context.listTasksRemote();
    existingIds = new Set(tasks.map((task) => toStringSafe(task.id)).filter(Boolean));
  } catch (err) {
    if (!(err instanceof RedmineUnavailable)) throw err;
    if (!context.cache) throw err;
    const cached = await context.cache.listTasks();
    existingIds = new Set(cached.map((task) => toStringSafe(task.id)).filter(Boolean));
  }
  return await generateTaskId({
    length: opts.length,
    attempts: opts.attempts,
    isAvailable: (taskId) => !existingIds.has(taskId),
  });
}

export async function migrateRedmineCanonicalState(
  context: RedmineSyncContext,
): Promise<TaskCanonicalStateMigrationResult> {
  if (!context.customFields.canonical_state) {
    throw new BackendError(
      redmineConfigMissingEnvMessage("AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE"),
      "E_BACKEND",
    );
  }

  const tasks = await context.listTasksRemote();
  const result: TaskCanonicalStateMigrationResult = {
    scanned: tasks.length,
    migrated: [],
    skippedStructured: [],
    skippedNoDoc: [],
    failed: [],
  };

  for (const [index, task] of tasks.entries()) {
    const taskId = toStringSafe(task.id).trim();
    if (!taskId) continue;
    const issue = context.issueCache.get(taskId);

    if (!issue) {
      result.failed.push({
        taskId,
        reason: "Redmine issue payload was not cached during remote list refresh",
      });
      continue;
    }

    const currentState = parseRedmineCanonicalState(
      context.customFieldValue(issue, context.customFields.canonical_state),
    );
    if (currentState) {
      result.skippedStructured.push(taskId);
      continue;
    }

    const sections =
      task.sections && Object.keys(task.sections).length > 0
        ? task.sections
        : task.doc
          ? taskDocToSectionMap(task.doc)
          : undefined;
    if (!sections || Object.keys(sections).length === 0) {
      result.skippedNoDoc.push(taskId);
      continue;
    }

    const issueIdText = toStringSafe(issue.id);
    if (!issueIdText) {
      result.failed.push({ taskId, reason: redmineIssueIdMissingMessage() });
      continue;
    }

    const nextRevision = Math.max(revisionNumber(task.revision), 0, 1);
    const nextCanonicalState = buildRedmineCanonicalStateWithOptions(
      {
        ...task,
        sections,
        revision: nextRevision,
      },
      { base: currentState, revision: nextRevision },
    );
    if (!nextCanonicalState) {
      result.skippedNoDoc.push(taskId);
      continue;
    }

    const customFields: Record<string, unknown>[] = [];
    context.appendCustomField(customFields, "canonical_state", nextCanonicalState);
    try {
      await context.requestJson("PUT", `issues/${issueIdText}.json`, {
        issue: { custom_fields: customFields },
      });
      context.setIssueCustomFieldValue(
        issue,
        context.customFields.canonical_state,
        nextCanonicalState,
      );
      context.issueCache.set(taskId, issue);
      await context.cacheTask(
        {
          ...task,
          sections,
          revision: nextRevision,
          dirty: false,
        },
        false,
      );
      result.migrated.push(taskId);
    } catch (err) {
      result.failed.push({
        taskId,
        reason:
          err instanceof Error ? err.message : "Unknown Redmine canonical_state migration failure",
      });
    }

    if (
      context.batchPauseMs > 0 &&
      context.batchSize > 0 &&
      (index + 1) % context.batchSize === 0
    ) {
      await sleep(context.batchPauseMs);
    }
  }

  return result;
}

export async function writeRedmineTask(
  context: RedmineSyncContext,
  task: TaskData,
  opts?: TaskWriteOptions,
): Promise<void> {
  const taskId = toStringSafe(task.id).trim();
  if (!taskId) throw new Error(missingTaskIdMessage());
  validateTaskId(taskId);

  try {
    context.ensureDocMetadata(task);
    let issue = await context.findIssueByTaskId(taskId);
    let issueId = issue?.id;
    let issueIdText = issueId ? toStringSafe(issueId) : "";
    let existingIssue = issue ?? null;
    if (issueIdText && !existingIssue) {
      const payload = await context.requestJson("GET", `issues/${issueIdText}.json`);
      existingIssue = issueFromPayload(payload);
    }
    const currentState =
      existingIssue && context.customFields.canonical_state
        ? parseRedmineCanonicalState(
            context.customFieldValue(existingIssue, context.customFields.canonical_state),
          )
        : null;
    context.assertExpectedRevisionSupported(taskId, opts);
    context.assertExpectedRevision(taskId, opts?.expectedRevision, currentState?.revision ?? 0);
    const nextRevision = issueIdText
      ? Math.max(revisionNumber(task.revision), revisionNumber(currentState?.revision), 0) + 1
      : Math.max(revisionNumber(task.revision), revisionNumber(currentState?.revision), 1);
    const taskForWrite: TaskData = {
      ...task,
      revision: nextRevision,
      sections:
        task.sections && Object.keys(task.sections).length > 0
          ? task.sections
          : task.doc
            ? taskDocToSectionMap(task.doc)
            : undefined,
    };
    const payload = context.taskToIssuePayload(taskForWrite, existingIssue ?? undefined);
    if (payload.status_id === undefined) {
      const inferredStatusId = await inferRedmineStatusIdForTaskStatus(
        context,
        taskForWrite.status,
      );
      if (inferredStatusId !== null) payload.status_id = inferredStatusId;
    }
    if (issueIdText) {
      await context.requestJson("PUT", `issues/${issueIdText}.json`, { issue: payload });
    } else {
      const createPayload = { ...payload, project_id: context.projectId };
      const created = await context.requestJson("POST", "issues.json", { issue: createPayload });
      const createdIssue = issueFromPayload(created);
      issueId = createdIssue?.id;
      issueIdText = issueId ? toStringSafe(issueId) : "";
      if (issueIdText) {
        const updatePayload = { ...payload };
        delete updatePayload.project_id;
        await context.requestJson("PUT", `issues/${issueIdText}.json`, { issue: updatePayload });
        const refreshed = await context.requestJson("GET", `issues/${issueIdText}.json`);
        existingIssue = issueFromPayload(refreshed);
      }
    }
    if (issueIdText) {
      const existingComments =
        existingIssue && context.customFields.comments
          ? context.normalizeComments(
              context.maybeParseJson(
                context.customFieldValue(existingIssue, context.customFields.comments),
              ),
            )
          : [];
      const desiredComments = context.normalizeComments(taskForWrite.comments);
      await context.appendCommentNotes(issueIdText, existingComments, desiredComments);
    }
    taskForWrite.dirty = false;
    await context.cacheTask(taskForWrite, false);
    context.issueCache.clear();
  } catch (err) {
    if (!(err instanceof RedmineUnavailable)) throw err;
    if (!context.cache) throw err;
    context.assertExpectedRevisionSupported(taskId, opts);
    const taskForCache: TaskData = {
      ...task,
      revision: Math.max(revisionNumber(task.revision), 1),
      sections:
        task.sections && Object.keys(task.sections).length > 0
          ? task.sections
          : task.doc
            ? taskDocToSectionMap(task.doc)
            : undefined,
      dirty: true,
    };
    await context.cache.writeTask(taskForCache, opts);
  }
}

export async function writeRedmineTasks(
  context: RedmineSyncContext,
  tasks: TaskData[],
  opts?: TaskWriteOptions,
): Promise<void> {
  for (const [index, task] of tasks.entries()) {
    await context.writeTask(task, opts);
    if (
      context.batchPauseMs > 0 &&
      context.batchSize > 0 &&
      (index + 1) % context.batchSize === 0
    ) {
      await sleep(context.batchPauseMs);
    }
  }
}

export async function syncRedmine(
  context: RedmineSyncContext,
  opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  },
): Promise<void> {
  if (opts.direction === "push") {
    await syncPushRedmine(context, opts.quiet, opts.confirm);
    return;
  }
  if (opts.direction === "pull") {
    await syncPullRedmine(context, opts.conflict, opts.quiet);
    return;
  }
  throw new BackendError("Invalid sync direction (expected push|pull)", "E_BACKEND");
}

export async function syncPushRedmine(
  context: RedmineSyncContext,
  quiet: boolean,
  confirm: boolean,
): Promise<void> {
  if (!context.cache) {
    throw new BackendError("Redmine cache is disabled; sync push is unavailable", "E_BACKEND");
  }
  const tasks = await context.cache.listTasks();
  const dirty = tasks.filter((task) => task.dirty);
  if (dirty.length === 0) {
    if (!quiet) process.stdout.write("ℹ️ no local task changes to push\n");
    return;
  }
  if (!confirm) {
    for (const task of dirty) {
      process.stdout.write(`- pending push: ${task.id}\n`);
    }
    throw new BackendError("Refusing to push without --yes (preview above)", "E_BACKEND");
  }
  await context.writeTasks(dirty);
  if (!quiet) process.stdout.write(`✅ pushed ${dirty.length} task(s) (dirty)\n`);
}

export async function syncPullRedmine(
  context: RedmineSyncContext,
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail",
  quiet: boolean,
): Promise<void> {
  if (!context.cache) {
    throw new BackendError("Redmine cache is disabled; sync pull is unavailable", "E_BACKEND");
  }
  const remoteTasks = await context.listTasksRemote();
  const remoteById = new Map<string, TaskData>();
  for (const task of remoteTasks) {
    const taskId = toStringSafe(task.id);
    if (taskId) remoteById.set(taskId, task);
  }
  const localTasks = await context.cache.listTasks();
  const localById = new Map<string, TaskData>();
  for (const task of localTasks) {
    const taskId = toStringSafe(task.id);
    if (taskId) localById.set(taskId, task);
  }

  for (const [taskId, remoteTask] of remoteById.entries()) {
    const localTask = localById.get(taskId);
    if (localTask?.dirty) {
      if (context.tasksDiffer(localTask, remoteTask)) {
        await handleRedmineConflict(context, taskId, localTask, remoteTask, conflict);
        continue;
      }
      localTask.dirty = false;
      await context.cacheTask(localTask, false);
      continue;
    }
    await context.cacheTask(remoteTask, false);
  }
  if (!quiet) process.stdout.write(`✅ pulled ${remoteById.size} task(s) (remote)\n`);
}

export async function handleRedmineConflict(
  context: RedmineSyncContext,
  taskId: string,
  localTask: TaskData,
  remoteTask: TaskData,
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail",
): Promise<void> {
  if (conflict === "prefer-local") {
    await context.writeTask(localTask);
    return;
  }
  if (conflict === "prefer-remote") {
    await context.cacheTask(remoteTask, false);
    return;
  }
  if (conflict === "diff") {
    process.stdout.write(`${context.diffTasks(localTask, remoteTask)}\n`);
    throw new BackendError(`Conflict detected for ${taskId}`, "E_BACKEND");
  }
  throw new BackendError(`Conflict detected for ${taskId}`, "E_BACKEND");
}

export async function inferRedmineStatusIdForTaskStatus(
  context: RedmineSyncContext,
  statusRaw: unknown,
): Promise<number | null> {
  const status = toStringSafe(statusRaw).trim().toUpperCase();
  if (!status) return null;

  const explicit = context.statusMap?.[status];
  if (typeof explicit === "number" && Number.isFinite(explicit)) return explicit;

  const inferred = await loadRedmineInferredStatusByTaskStatus(context);
  return inferred.get(status) ?? null;
}

export async function loadRedmineInferredStatusByTaskStatus(
  context: RedmineSyncContext,
): Promise<Map<string, number>> {
  if (context.inferredStatusByTaskStatus) return context.inferredStatusByTaskStatus;
  const map = new Map<string, number>();
  context.setInferredStatusByTaskStatus(map);

  try {
    const payload = await context.requestJson("GET", "issue_statuses.json");
    const statuses = Array.isArray(payload.issue_statuses) ? payload.issue_statuses : [];
    const parsed: {
      id: number;
      name: string;
      isClosed: boolean;
      isDefault: boolean;
    }[] = [];

    for (const item of statuses) {
      if (!item || typeof item !== "object" || Array.isArray(item)) continue;
      const status = item as Record<string, unknown>;
      const id = typeof status.id === "number" ? status.id : null;
      if (!id || !Number.isFinite(id)) continue;
      parsed.push({
        id,
        name: toStringSafe(status.name).trim().toLowerCase(),
        isClosed: status.is_closed === true,
        isDefault: status.is_default === true,
      });
    }

    const done = selectRedmineInferredStatus(parsed, "DONE");
    const doing = selectRedmineInferredStatus(parsed, "DOING");
    const todo = selectRedmineInferredStatus(parsed, "TODO");
    if (done !== null) map.set("DONE", done);
    if (doing !== null) map.set("DOING", doing);
    if (todo !== null) map.set("TODO", todo);
  } catch {
    // Best effort: keep previous behavior when status discovery is unavailable.
  }

  return map;
}

export function selectRedmineInferredStatus(
  statuses: { id: number; name: string; isClosed: boolean; isDefault: boolean }[],
  target: "TODO" | "DOING" | "DONE",
): number | null {
  if (statuses.length === 0) return null;
  if (target === "DOING") {
    const byId = statuses.find((item) => item.id === 2);
    if (byId) return byId.id;
    const byName = statuses.find(
      (item) => item.name.includes("progress") || item.name.includes("doing"),
    );
    return byName?.id ?? null;
  }
  if (target === "DONE") {
    const closed = statuses.find((item) => item.isClosed);
    if (closed) return closed.id;
    const byId = statuses.find((item) => item.id === 5 || item.id === 3 || item.id === 6);
    if (byId) return byId.id;
    const byName = statuses.find(
      (item) =>
        item.name.includes("done") ||
        item.name.includes("closed") ||
        item.name.includes("resolved") ||
        item.name.includes("complete"),
    );
    return byName?.id ?? null;
  }

  const byDefault = statuses.find((item) => item.isDefault);
  if (byDefault) return byDefault.id;
  const byId = statuses.find((item) => item.id === 1);
  return byId?.id ?? statuses[0]?.id ?? null;
}
