import { toStringSafe, type TaskData, type TaskDocMeta, type TaskWriteOptions } from "../shared.js";
import { doneRatioForStatus, startDateFromTaskId } from "./mapping.js";
import type { TaskComment } from "./comments.js";
import {
  appendRedmineBackendCommentNotes,
  appendRedmineBackendCustomField,
  diffRedmineBackendTasks,
  findRedmineIssueByTaskId,
  listRedmineRemoteTasks,
  maybeParseRedmineBackendJson,
  normalizeRedmineBackendComments,
  redmineBackendCustomFieldValue,
  redmineBackendTasksDiffer,
  redmineIssueToTask,
  redmineTaskToIssuePayload,
  requestRedmineBackendJson,
} from "./runtime-operations.js";
import {
  assertRedmineExpectedRevision,
  assertRedmineExpectedRevisionSupported,
  cacheRedmineTask,
  coerceRedmineBackendDocVersion,
  ensureRedmineDocMetadata,
  redmineTaskIdFieldId,
  setRedmineIssueCustomField,
} from "./runtime-state.js";
import type { RedmineBackendRuntimeHost } from "./runtime-context.js";

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
    return diffRedmineBackendTasks(localTask, remoteTask);
  },

  tasksDiffer(this: RedmineBackendRuntimeHost, localTask: TaskData, remoteTask: TaskData): boolean {
    return redmineBackendTasksDiffer(localTask, remoteTask);
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
