import { DOC_VERSION, type TaskData } from "../shared.js";
import {
  appendCommentNotes as appendCommentNotesImpl,
  normalizeComments as normalizeCommentsImpl,
  type TaskComment,
} from "./comments.js";
import { requestJson as requestRedmineJson } from "./client.js";
import {
  appendCustomField as appendRedmineCustomField,
  customFieldValue as redmineCustomFieldValue,
} from "./fields.js";
import {
  issueToTask as issueToTaskImpl,
  taskToIssuePayload as taskToIssuePayloadImpl,
} from "./mapping.js";
import { maybeParseJson as maybeParseRedmineJson } from "./parse.js";
import {
  findIssueByTaskId as findIssueByTaskIdImpl,
  listTasksRemote as listTasksRemoteImpl,
} from "./remote.js";
import { diffRedmineTasks, redmineTasksDiffer } from "./backend-report.js";
import type { RedmineBackendRuntimeHost } from "./runtime-context.js";
import { redmineTaskIdFieldId } from "./runtime-state.js";

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

export function diffRedmineBackendTasks(localTask: TaskData, remoteTask: TaskData): string {
  return diffRedmineTasks(localTask, remoteTask);
}

export function redmineBackendTasksDiffer(localTask: TaskData, remoteTask: TaskData): boolean {
  return redmineTasksDiffer(localTask, remoteTask);
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
