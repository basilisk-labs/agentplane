import {
  DEFAULT_DOC_UPDATED_BY,
  DOC_VERSION,
  BackendError,
  normalizeDocVersion,
  nowIso,
  redmineConfigMissingEnvMessage,
  toStringSafe,
  type TaskBackend,
  type TaskData,
  type TaskDocMeta,
  type TaskWriteOptions,
} from "../shared.js";
import type { LocalBackend } from "../local-backend.js";
import {
  appendCommentNotes as appendCommentNotesImpl,
  normalizeComments as normalizeCommentsImpl,
  type TaskComment,
} from "./comments.js";
import { requestJson as requestRedmineJson } from "./client.js";
import {
  appendCustomField as appendRedmineCustomField,
  customFieldValue as redmineCustomFieldValue,
  setIssueCustomFieldValue as setRedmineIssueCustomFieldValue,
} from "./fields.js";
import {
  doneRatioForStatus,
  issueToTask as issueToTaskImpl,
  startDateFromTaskId,
  taskToIssuePayload as taskToIssuePayloadImpl,
} from "./mapping.js";
import { maybeParseJson as maybeParseRedmineJson } from "./parse.js";
import {
  findIssueByTaskId as findIssueByTaskIdImpl,
  listTasksRemote as listTasksRemoteImpl,
} from "./remote.js";
import { diffRedmineTasks, redmineTasksDiffer } from "./backend-report.js";

export type RedmineBackendRuntimeHost = {
  baseUrl: string;
  apiKey: string;
  projectId: string;
  assigneeId: number | null;
  ownerAgent: string;
  statusMap: Record<string, unknown>;
  customFields: Record<string, unknown>;
  batchSize: number;
  batchPauseMs: number;
  cache: LocalBackend | null;
  issueCache: Map<string, Record<string, unknown>>;
  reverseStatus: Map<number, string>;
  inferredStatusByTaskStatus: Map<string, number> | null;
  capabilities: TaskBackend["capabilities"];
  setInferredStatusByTaskStatus: (next: Map<string, number> | null) => void;
  ensureDocMetadata: (task: TaskDocMeta) => void;
  cacheTask: (task: TaskData, dirty: boolean) => Promise<void>;
  assertExpectedRevisionSupported: (taskId: string, opts?: TaskWriteOptions) => void;
  assertExpectedRevision: (
    taskId: string,
    expectedRevision: number | undefined,
    currentRevision: number,
  ) => void;
  taskIdFieldId: () => unknown;
  setIssueCustomFieldValue: (
    issue: Record<string, unknown>,
    fieldId: unknown,
    value: unknown,
  ) => void;
  listTasksRemote: () => Promise<TaskData[]>;
  findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
  issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
  taskToIssuePayload: (
    task: TaskData,
    existingIssue?: Record<string, unknown>,
  ) => Record<string, unknown>;
  appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) => void;
  normalizeComments: (value: unknown) => TaskComment[];
  appendCommentNotes: (
    issueId: string,
    existingComments: TaskComment[],
    desiredComments: TaskComment[],
  ) => Promise<void>;
  customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
  maybeParseJson: (value: unknown) => unknown;
  requestJson: (
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
    opts?: { attempts?: number; backoff?: number },
  ) => Promise<Record<string, unknown>>;
  diffTasks: (localTask: TaskData, remoteTask: TaskData) => string;
  tasksDiffer: (localTask: TaskData, remoteTask: TaskData) => boolean;
  writeTask: (task: TaskData, opts?: TaskWriteOptions) => Promise<void>;
  writeTasks: (tasks: TaskData[], opts?: TaskWriteOptions) => Promise<void>;
};

export function createRedmineCacheDocContext(host: RedmineBackendRuntimeHost) {
  return {
    cache: host.cache,
    customFields: host.customFields,
    ownerAgent: host.ownerAgent,
    batchSize: host.batchSize,
    findIssueByTaskId: async (taskId: string) => await host.findIssueByTaskId(taskId),
    issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) =>
      host.issueToTask(issue, taskIdOverride),
    customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) =>
      host.customFieldValue(issue, fieldId),
    appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) =>
      host.appendCustomField(fields, key, value),
    requestJson: async (
      method: string,
      reqPath: string,
      payload?: Record<string, unknown>,
      params?: Record<string, unknown>,
    ) => await host.requestJson(method, reqPath, payload, params),
    assertExpectedRevisionSupported: (taskId: string, opts?: TaskWriteOptions) =>
      host.assertExpectedRevisionSupported(taskId, opts),
    assertExpectedRevision: (
      taskId: string,
      expectedRevision: number | undefined,
      currentRevision: number,
    ) => host.assertExpectedRevision(taskId, expectedRevision, currentRevision),
    cacheTask: async (task: TaskData, dirty: boolean) => await host.cacheTask(task, dirty),
  };
}

export function createRedmineReportContext(host: RedmineBackendRuntimeHost) {
  return {
    projectId: host.projectId,
    customFields: host.customFields,
    requestJson: async (
      method: string,
      reqPath: string,
      payload?: Record<string, unknown>,
      params?: Record<string, unknown>,
    ) => await host.requestJson(method, reqPath, payload, params),
  };
}

export function createRedmineSyncContext(host: RedmineBackendRuntimeHost) {
  return {
    cache: host.cache,
    customFields: host.customFields,
    ownerAgent: host.ownerAgent,
    projectId: host.projectId,
    batchSize: host.batchSize,
    batchPauseMs: host.batchPauseMs,
    statusMap: host.statusMap,
    issueCache: host.issueCache,
    inferredStatusByTaskStatus: host.inferredStatusByTaskStatus,
    setInferredStatusByTaskStatus: host.setInferredStatusByTaskStatus,
    listTasksRemote: async () => await host.listTasksRemote(),
    writeTask: async (task: TaskData, opts?: TaskWriteOptions) => await host.writeTask(task, opts),
    writeTasks: async (tasks: TaskData[], opts?: TaskWriteOptions) =>
      await host.writeTasks(tasks, opts),
    findIssueByTaskId: async (taskId: string) => await host.findIssueByTaskId(taskId),
    issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) =>
      host.issueToTask(issue, taskIdOverride),
    taskToIssuePayload: (task: TaskData, existingIssue?: Record<string, unknown>) =>
      host.taskToIssuePayload(task, existingIssue),
    appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) =>
      host.appendCustomField(fields, key, value),
    customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) =>
      host.customFieldValue(issue, fieldId),
    maybeParseJson: (value: unknown) => host.maybeParseJson(value),
    normalizeComments: (value: unknown) => host.normalizeComments(value),
    appendCommentNotes: async (
      issueId: string,
      existingComments: TaskComment[],
      desiredComments: TaskComment[],
    ) => await host.appendCommentNotes(issueId, existingComments, desiredComments),
    cacheTask: async (task: TaskData, dirty: boolean) => await host.cacheTask(task, dirty),
    assertExpectedRevisionSupported: (taskId: string, opts?: TaskWriteOptions) =>
      host.assertExpectedRevisionSupported(taskId, opts),
    assertExpectedRevision: (
      taskId: string,
      expectedRevision: number | undefined,
      currentRevision: number,
    ) => host.assertExpectedRevision(taskId, expectedRevision, currentRevision),
    ensureDocMetadata: (task: TaskDocMeta) => host.ensureDocMetadata(task),
    diffTasks: (localTask: TaskData, remoteTask: TaskData) => host.diffTasks(localTask, remoteTask),
    tasksDiffer: (localTask: TaskData, remoteTask: TaskData) =>
      host.tasksDiffer(localTask, remoteTask),
    taskIdFieldId: () => host.taskIdFieldId(),
    setIssueCustomFieldValue: (issue: Record<string, unknown>, fieldId: unknown, value: unknown) =>
      host.setIssueCustomFieldValue(issue, fieldId, value),
    requestJson: async (
      method: string,
      reqPath: string,
      payload?: Record<string, unknown>,
      params?: Record<string, unknown>,
      opts?: { attempts?: number; backoff?: number },
    ) => await host.requestJson(method, reqPath, payload, params, opts),
  };
}

export function ensureRedmineDocMetadata(task: TaskDocMeta): void {
  if (task.doc === undefined) return;
  task.doc_version = normalizeDocVersion(task.doc_version);
  task.doc_updated_at ??= nowIso();
  task.doc_updated_by ??= DEFAULT_DOC_UPDATED_BY;
}

export async function cacheRedmineTask(
  host: RedmineBackendRuntimeHost,
  task: TaskData,
  dirty: boolean,
): Promise<void> {
  if (!host.cache) return;
  const next = { ...task, dirty };
  await host.cache.writeTask(next);
}

export function assertRedmineExpectedRevisionSupported(
  host: RedmineBackendRuntimeHost,
  taskId: string,
  opts?: TaskWriteOptions,
): void {
  if (opts?.expectedRevision === undefined) return;
  if (host.capabilities.supports_revision_guarded_writes) return;
  throw new BackendError(
    `Task revision guarding is unavailable for ${taskId} without AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE`,
    "E_BACKEND",
  );
}

export function assertRedmineExpectedRevision(
  taskId: string,
  expectedRevision: number | undefined,
  currentRevision: number,
): void {
  if (expectedRevision === undefined) return;
  const expected = Math.trunc(expectedRevision);
  if (expected <= 0 || expected === currentRevision) return;
  throw new BackendError(
    `Task revision changed concurrently: ${taskId} ` +
      `(expected revision ${expected}, current revision ${currentRevision})`,
    "E_BACKEND",
  );
}

export function redmineTaskIdFieldId(host: RedmineBackendRuntimeHost): unknown {
  const fieldId = host.customFields?.task_id;
  if (fieldId) return fieldId;
  throw new BackendError(
    redmineConfigMissingEnvMessage("AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID"),
    "E_BACKEND",
  );
}

export function setRedmineIssueCustomField(
  issue: Record<string, unknown>,
  fieldId: unknown,
  value: unknown,
): void {
  setRedmineIssueCustomFieldValue(issue, fieldId, value);
}

export async function listRedmineRemoteTasks(host: RedmineBackendRuntimeHost): Promise<TaskData[]> {
  const taskFieldId = redmineTaskIdFieldId(host);
  return await listTasksRemoteImpl({
    projectId: host.projectId,
    taskFieldId,
    issueCache: host.issueCache,
    requestJson: async (method, reqPath, payload, params) =>
      await host.requestJson(method, reqPath, payload, params),
    customFieldValue: (issue, fieldId) => host.customFieldValue(issue, fieldId),
    issueToTask: (issue, taskIdOverride) => host.issueToTask(issue, taskIdOverride),
  });
}

export async function findRedmineIssueByTaskId(
  host: RedmineBackendRuntimeHost,
  taskId: string,
): Promise<Record<string, unknown> | null> {
  const taskFieldId = redmineTaskIdFieldId(host);
  return await findIssueByTaskIdImpl({
    taskId,
    projectId: host.projectId,
    taskFieldId,
    issueCache: host.issueCache,
    requestJson: async (method, reqPath, payload, params) =>
      await host.requestJson(method, reqPath, payload, params),
    customFieldValue: (issue, fieldId) => host.customFieldValue(issue, fieldId),
    refreshList: async () => {
      await host.listTasksRemote();
    },
  });
}

export function redmineIssueToTask(
  host: RedmineBackendRuntimeHost,
  issue: Record<string, unknown>,
  taskIdOverride?: string,
): TaskData | null {
  return issueToTaskImpl({
    issue,
    taskIdOverride,
    reverseStatus: host.reverseStatus,
    customFields: host.customFields,
    ownerAgent: host.ownerAgent,
    defaultDocVersion: DOC_VERSION,
  });
}

export function redmineTaskToIssuePayload(
  host: RedmineBackendRuntimeHost,
  task: TaskData,
  existingIssue?: Record<string, unknown>,
): Record<string, unknown> {
  return taskToIssuePayloadImpl({
    task,
    existingIssue,
    statusMap: host.statusMap,
    assigneeId: host.assigneeId,
    customFields: host.customFields,
    appendCustomField: (fields, key, value) =>
      appendRedmineBackendCustomField(host, fields, key, value),
  });
}

export function appendRedmineBackendCustomField(
  host: RedmineBackendRuntimeHost,
  fields: Record<string, unknown>[],
  key: string,
  value: unknown,
): void {
  appendRedmineCustomField({ customFields: host.customFields, fields, key, value });
}

export function normalizeRedmineBackendComments(value: unknown): TaskComment[] {
  return normalizeCommentsImpl(value);
}

export async function appendRedmineBackendCommentNotes(
  host: RedmineBackendRuntimeHost,
  issueId: string,
  existingComments: TaskComment[],
  desiredComments: TaskComment[],
): Promise<void> {
  await appendCommentNotesImpl({
    issueId,
    existingComments,
    desiredComments,
    requestJson: async (method, reqPath, payload, params) =>
      await requestRedmineBackendJson(host, method, reqPath, payload, params),
  });
}

export function redmineBackendCustomFieldValue(
  issue: Record<string, unknown>,
  fieldId: unknown,
): string | null {
  return redmineCustomFieldValue(issue, fieldId);
}

export function maybeParseRedmineBackendJson(value: unknown): unknown {
  return maybeParseRedmineJson(value);
}

export function coerceRedmineBackendDocVersion(value: unknown): 2 | 3 | null {
  if (value === 2 || value === 3) return value;
  return null;
}

export async function requestRedmineBackendJson(
  host: RedmineBackendRuntimeHost,
  method: string,
  reqPath: string,
  payload?: Record<string, unknown>,
  params?: Record<string, unknown>,
  opts?: { attempts?: number; backoff?: number },
): Promise<Record<string, unknown>> {
  return await requestRedmineJson(
    { baseUrl: host.baseUrl, apiKey: host.apiKey },
    method,
    reqPath,
    payload,
    params,
    opts,
  );
}

export const redmineBackendRuntimeMethods = {
  setInferredStatusByTaskStatus(
    this: RedmineBackendRuntimeHost,
    next: Map<string, number> | null,
  ): void {
    this.inferredStatusByTaskStatus = next;
  },

  ensureDocMetadata(this: RedmineBackendRuntimeHost, task: TaskDocMeta): void {
    ensureRedmineDocMetadata(task);
  },

  async cacheTask(this: RedmineBackendRuntimeHost, task: TaskData, dirty: boolean): Promise<void> {
    await cacheRedmineTask(this, task, dirty);
  },

  assertExpectedRevisionSupported(
    this: RedmineBackendRuntimeHost,
    taskId: string,
    opts?: TaskWriteOptions,
  ): void {
    assertRedmineExpectedRevisionSupported(this, taskId, opts);
  },

  assertExpectedRevision(
    this: RedmineBackendRuntimeHost,
    taskId: string,
    expectedRevision: number | undefined,
    currentRevision: number,
  ): void {
    assertRedmineExpectedRevision(taskId, expectedRevision, currentRevision);
  },

  taskIdFieldId(this: RedmineBackendRuntimeHost): unknown {
    return redmineTaskIdFieldId(this);
  },

  setIssueCustomFieldValue(
    this: RedmineBackendRuntimeHost,
    issue: Record<string, unknown>,
    fieldId: unknown,
    value: unknown,
  ): void {
    setRedmineIssueCustomField(issue, fieldId, value);
  },

  async listTasksRemote(this: RedmineBackendRuntimeHost): Promise<TaskData[]> {
    return await listRedmineRemoteTasks(this);
  },

  async findIssueByTaskId(
    this: RedmineBackendRuntimeHost,
    taskId: string,
  ): Promise<Record<string, unknown> | null> {
    return await findRedmineIssueByTaskId(this, taskId);
  },

  issueToTask(
    this: RedmineBackendRuntimeHost,
    issue: Record<string, unknown>,
    taskIdOverride?: string,
  ): TaskData | null {
    return redmineIssueToTask(this, issue, taskIdOverride);
  },

  taskToIssuePayload(
    this: RedmineBackendRuntimeHost,
    task: TaskData,
    existingIssue?: Record<string, unknown>,
  ): Record<string, unknown> {
    return redmineTaskToIssuePayload(this, task, existingIssue);
  },

  appendCustomField(
    this: RedmineBackendRuntimeHost,
    fields: Record<string, unknown>[],
    key: string,
    value: unknown,
  ): void {
    appendRedmineBackendCustomField(this, fields, key, value);
  },

  normalizeComments(this: RedmineBackendRuntimeHost, value: unknown): TaskComment[] {
    return normalizeRedmineBackendComments(value);
  },

  commentsToPairs(this: RedmineBackendRuntimeHost, comments: TaskComment[]): [string, string][] {
    const pairs: [string, string][] = [];
    for (const comment of comments) {
      const author = toStringSafe(comment.author).trim();
      const body = toStringSafe(comment.body).trim();
      if (!author && !body) continue;
      pairs.push([author, body]);
    }
    return pairs;
  },

  formatCommentNote(this: RedmineBackendRuntimeHost, author = "unknown", body = ""): string {
    return `[comment] ${author}: ${body}`.trim();
  },

  async appendCommentNotes(
    this: RedmineBackendRuntimeHost,
    issueId: string,
    existingComments: TaskComment[],
    desiredComments: TaskComment[],
  ): Promise<void> {
    await appendRedmineBackendCommentNotes(this, issueId, existingComments, desiredComments);
  },

  startDateFromTaskId(this: RedmineBackendRuntimeHost, taskId: string): string | null {
    return startDateFromTaskId(taskId);
  },

  doneRatioForStatus(this: RedmineBackendRuntimeHost, status: string): number | null {
    return doneRatioForStatus(status);
  },

  customFieldValue(
    this: RedmineBackendRuntimeHost,
    issue: Record<string, unknown>,
    fieldId: unknown,
  ): string | null {
    return redmineBackendCustomFieldValue(issue, fieldId);
  },

  maybeParseJson(this: RedmineBackendRuntimeHost, value: unknown): unknown {
    return maybeParseRedmineBackendJson(value);
  },

  coerceDocVersion(this: RedmineBackendRuntimeHost, value: unknown): 2 | 3 | null {
    return coerceRedmineBackendDocVersion(value);
  },

  diffTasks(this: RedmineBackendRuntimeHost, localTask: TaskData, remoteTask: TaskData): string {
    return diffRedmineTasks(localTask, remoteTask);
  },

  tasksDiffer(this: RedmineBackendRuntimeHost, localTask: TaskData, remoteTask: TaskData): boolean {
    return redmineTasksDiffer(localTask, remoteTask);
  },

  async requestJson(
    this: RedmineBackendRuntimeHost,
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
    opts?: { attempts?: number; backoff?: number },
  ): Promise<Record<string, unknown>> {
    return await requestRedmineBackendJson(this, method, reqPath, payload, params, opts);
  },
};
