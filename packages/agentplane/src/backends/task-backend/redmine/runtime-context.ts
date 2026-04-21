import type { LocalBackend } from "../local-backend.js";
import type { TaskBackend, TaskData, TaskDocMeta, TaskWriteOptions } from "../shared.js";
import type { TaskComment } from "./comments.js";

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
