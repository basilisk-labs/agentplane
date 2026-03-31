import { isRecord } from "../../shared/guards.js";

import type { LocalBackend } from "./local-backend.js";
import {
  appendCommentNotes as appendCommentNotesImpl,
  normalizeComments as normalizeCommentsImpl,
  type TaskComment,
} from "./redmine/comments.js";
import { requestJson as requestRedmineJson } from "./redmine/client.js";
import {
  appendCustomField as appendRedmineCustomField,
  customFieldValue as redmineCustomFieldValue,
  setIssueCustomFieldValue as setRedmineIssueCustomFieldValue,
} from "./redmine/fields.js";
import {
  doneRatioForStatus,
  issueToTask as issueToTaskImpl,
  startDateFromTaskId,
  taskToIssuePayload as taskToIssuePayloadImpl,
} from "./redmine/mapping.js";
import {
  coerceDocVersion as coerceRedmineDocVersion,
  maybeParseJson as maybeParseRedmineJson,
} from "./redmine/parse.js";
import {
  findIssueByTaskId as findIssueByTaskIdImpl,
  listTasksRemote as listTasksRemoteImpl,
} from "./redmine/remote.js";
import {
  getRedmineTask,
  getRedmineTaskDoc,
  getRedmineTasks,
  listRedmineProjectionTasks,
  listRedmineTasks,
  normalizeRedmineTasks,
  exportRedmineProjectionSnapshot,
  exportRedmineTasksJson,
  setRedmineTaskDoc,
  touchRedmineTaskDocMetadata,
} from "./redmine/backend-cache-doc.js";
import {
  diffRedmineTasks,
  inspectRedmineConfiguration,
  redmineTasksDiffer,
} from "./redmine/backend-report.js";
import {
  generateRedmineTaskId,
  handleRedmineConflict,
  inferRedmineStatusIdForTaskStatus,
  loadRedmineInferredStatusByTaskStatus,
  migrateRedmineCanonicalState,
  selectRedmineInferredStatus,
  syncPullRedmine,
  syncPushRedmine,
  syncRedmine,
  writeRedmineTask,
  writeRedmineTasks,
} from "./redmine/backend-sync.js";
import { readRedmineEnv } from "./redmine/env.js";
import {
  BackendError,
  DEFAULT_DOC_UPDATED_BY,
  DOC_VERSION,
  firstNonEmptyString,
  normalizeDocVersion,
  nowIso,
  redmineConfigMissingEnvMessage,
  toStringSafe,
  type TaskCanonicalStateMigrationResult,
  type TaskBackend,
  type TaskBackendInspectionResult,
  type TaskData,
  type TaskDocMeta,
  type TaskSummary,
  type TaskWriteOptions,
} from "./shared.js";

export type RedmineSettings = {
  url?: string;
  api_key?: string;
  project_id?: string;
  status_map?: Record<string, unknown>;
  custom_fields?: Record<string, unknown>;
  batch_size?: number;
  batch_pause?: number;
  owner_agent?: string;
  cache_dir?: string;
};

export class RedmineBackend implements TaskBackend {
  id = "redmine";
  capabilities: TaskBackend["capabilities"] = {
    canonical_source: "remote",
    projection: "cache",
    projection_read_mode: "native",
    reads_from_projection_by_default: true,
    writes_task_readmes: true,
    supports_task_revisions: false,
    supports_revision_guarded_writes: false,
    may_access_network_on_read: false,
    may_access_network_on_write: true,
    supports_projection_refresh: true,
    supports_push_sync: true,
    supports_snapshot_export: true,
  } as const;
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
  issueCache = new Map<string, Record<string, unknown>>();
  reverseStatus = new Map<number, string>();
  inferredStatusByTaskStatus: Map<string, number> | null = null;

  constructor(settings: RedmineSettings, opts: { cache?: LocalBackend | null }) {
    const env = readRedmineEnv();
    this.baseUrl = firstNonEmptyString(env.url, settings.url).replaceAll(/\/+$/gu, "");
    this.apiKey = firstNonEmptyString(env.apiKey, settings.api_key);
    this.projectId = firstNonEmptyString(env.projectId, settings.project_id);
    this.assigneeId = env.assigneeId ?? null;
    this.statusMap = isRecord(settings.status_map) ? settings.status_map : {};
    this.customFields = {
      ...(isRecord(settings.custom_fields) ? settings.custom_fields : {}),
      ...env.customFields,
    };
    this.batchSize =
      env.batch.size ??
      (typeof settings.batch_size === "number" && Number.isFinite(settings.batch_size)
        ? Math.max(1, Math.trunc(settings.batch_size))
        : 20);
    this.batchPauseMs =
      env.batch.pauseMs ??
      (typeof settings.batch_pause === "number" && Number.isFinite(settings.batch_pause)
        ? settings.batch_pause >= 1
          ? Math.trunc(settings.batch_pause)
          : Math.round(settings.batch_pause * 1000)
        : 500);
    this.ownerAgent = firstNonEmptyString(env.ownerAgent, settings.owner_agent, "REDMINE");
    this.cache = opts.cache ?? null;

    const missingEnvKeys: string[] = [];
    if (!this.baseUrl) missingEnvKeys.push("AGENTPLANE_REDMINE_URL");
    if (!this.apiKey) missingEnvKeys.push("AGENTPLANE_REDMINE_API_KEY");
    if (!this.projectId) missingEnvKeys.push("AGENTPLANE_REDMINE_PROJECT_ID");
    if (missingEnvKeys.length > 0) {
      throw new BackendError(redmineConfigMissingEnvMessage(missingEnvKeys), "E_BACKEND");
    }

    if (!this.customFields?.task_id) {
      throw new BackendError(
        redmineConfigMissingEnvMessage("AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID"),
        "E_BACKEND",
      );
    }

    const supportsStructuredRevisions = Boolean(this.customFields?.canonical_state);
    this.capabilities = {
      ...this.capabilities,
      supports_task_revisions: supportsStructuredRevisions,
      supports_revision_guarded_writes: supportsStructuredRevisions,
    };

    for (const [key, value] of Object.entries(this.statusMap)) {
      if (typeof value === "number") this.reverseStatus.set(value, key);
    }
  }

  private cacheDocContext() {
    return {
      cache: this.cache,
      customFields: this.customFields,
      ownerAgent: this.ownerAgent,
      batchSize: this.batchSize,
      findIssueByTaskId: async (taskId: string) => await this.findIssueByTaskId(taskId),
      issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) =>
        this.issueToTask(issue, taskIdOverride),
      customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) =>
        this.customFieldValue(issue, fieldId),
      appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) =>
        this.appendCustomField(fields, key, value),
      requestJson: async (
        method: string,
        reqPath: string,
        payload?: Record<string, unknown>,
        params?: Record<string, unknown>,
      ) => await this.requestJson(method, reqPath, payload, params),
      assertExpectedRevisionSupported: (taskId: string, opts?: TaskWriteOptions) =>
        this.assertExpectedRevisionSupported(taskId, opts),
      assertExpectedRevision: (
        taskId: string,
        expectedRevision: number | undefined,
        currentRevision: number,
      ) => this.assertExpectedRevision(taskId, expectedRevision, currentRevision),
      cacheTask: async (task: TaskData, dirty: boolean) => await this.cacheTask(task, dirty),
    };
  }

  private reportContext() {
    return {
      projectId: this.projectId,
      customFields: this.customFields,
      requestJson: async (
        method: string,
        reqPath: string,
        payload?: Record<string, unknown>,
        params?: Record<string, unknown>,
      ) => await this.requestJson(method, reqPath, payload, params),
    };
  }

  private syncContext() {
    return {
      cache: this.cache,
      customFields: this.customFields,
      ownerAgent: this.ownerAgent,
      projectId: this.projectId,
      batchSize: this.batchSize,
      batchPauseMs: this.batchPauseMs,
      statusMap: this.statusMap,
      issueCache: this.issueCache,
      inferredStatusByTaskStatus: this.inferredStatusByTaskStatus,
      setInferredStatusByTaskStatus: (next: Map<string, number> | null) => {
        this.inferredStatusByTaskStatus = next;
      },
      listTasksRemote: async () => await this.listTasksRemote(),
      writeTask: async (task: TaskData, opts?: TaskWriteOptions) =>
        await this.writeTask(task, opts),
      writeTasks: async (tasks: TaskData[], opts?: TaskWriteOptions) =>
        await this.writeTasks(tasks, opts),
      findIssueByTaskId: async (taskId: string) => await this.findIssueByTaskId(taskId),
      issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) =>
        this.issueToTask(issue, taskIdOverride),
      taskToIssuePayload: (task: TaskData, existingIssue?: Record<string, unknown>) =>
        this.taskToIssuePayload(task, existingIssue),
      appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) =>
        this.appendCustomField(fields, key, value),
      customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) =>
        this.customFieldValue(issue, fieldId),
      maybeParseJson: (value: unknown) => this.maybeParseJson(value),
      normalizeComments: (value: unknown) => this.normalizeComments(value),
      appendCommentNotes: async (
        issueId: string,
        existingComments: TaskComment[],
        desiredComments: TaskComment[],
      ) => await this.appendCommentNotes(issueId, existingComments, desiredComments),
      cacheTask: async (task: TaskData, dirty: boolean) => await this.cacheTask(task, dirty),
      assertExpectedRevisionSupported: (taskId: string, opts?: TaskWriteOptions) =>
        this.assertExpectedRevisionSupported(taskId, opts),
      assertExpectedRevision: (
        taskId: string,
        expectedRevision: number | undefined,
        currentRevision: number,
      ) => this.assertExpectedRevision(taskId, expectedRevision, currentRevision),
      ensureDocMetadata: (task: TaskDocMeta) => this.ensureDocMetadata(task),
      diffTasks: (localTask: TaskData, remoteTask: TaskData) =>
        this.diffTasks(localTask, remoteTask),
      tasksDiffer: (localTask: TaskData, remoteTask: TaskData) =>
        this.tasksDiffer(localTask, remoteTask),
      taskIdFieldId: () => this.taskIdFieldId(),
      setIssueCustomFieldValue: (
        issue: Record<string, unknown>,
        fieldId: unknown,
        value: unknown,
      ) => this.setIssueCustomFieldValue(issue, fieldId, value),
      requestJson: async (
        method: string,
        reqPath: string,
        payload?: Record<string, unknown>,
        params?: Record<string, unknown>,
        opts?: { attempts?: number; backoff?: number },
      ) => await this.requestJson(method, reqPath, payload, params, opts),
    };
  }

  async generateTaskId(opts: { length: number; attempts: number }): Promise<string> {
    return await generateRedmineTaskId(this.syncContext(), opts);
  }

  async listTasks(): Promise<TaskData[]> {
    return await listRedmineTasks(this.cacheDocContext());
  }

  async listProjectionTasks(): Promise<TaskSummary[]> {
    return await listRedmineProjectionTasks(this.cacheDocContext());
  }

  async exportTasksJson(outputPath: string): Promise<void> {
    await exportRedmineTasksJson(this.cacheDocContext(), outputPath);
  }

  async exportProjectionSnapshot(outputPath: string): Promise<void> {
    await exportRedmineProjectionSnapshot(this.cacheDocContext(), outputPath);
  }

  async refreshProjection(opts: {
    allowNetwork: boolean;
    quiet?: boolean;
    conflict?: "diff" | "prefer-local" | "prefer-remote" | "fail";
  }): Promise<void> {
    if (!opts.allowNetwork) {
      throw new BackendError("Projection refresh requires network access approval", "E_BACKEND");
    }
    await this.syncPull(opts.conflict ?? "prefer-remote", opts.quiet ?? true);
  }

  async normalizeTasks(): Promise<{ scanned: number; changed: number }> {
    return await normalizeRedmineTasks(this.cacheDocContext());
  }

  async migrateCanonicalState(): Promise<TaskCanonicalStateMigrationResult> {
    return await migrateRedmineCanonicalState(this.syncContext());
  }

  async inspectConfiguration(): Promise<TaskBackendInspectionResult> {
    return await inspectRedmineConfiguration(this.reportContext());
  }

  async getTask(taskId: string): Promise<TaskData | null> {
    return await getRedmineTask(this.cacheDocContext(), taskId);
  }

  async getTasks(taskIds: string[]): Promise<(TaskData | null)[]> {
    return await getRedmineTasks(this.cacheDocContext(), taskIds);
  }

  async getTaskDoc(taskId: string): Promise<string> {
    return await getRedmineTaskDoc(this.cacheDocContext(), taskId);
  }

  async setTaskDoc(
    taskId: string,
    doc: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await setRedmineTaskDoc(this.cacheDocContext(), taskId, doc, updatedBy, opts);
  }

  async touchTaskDocMetadata(
    taskId: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await touchRedmineTaskDocMetadata(this.cacheDocContext(), taskId, updatedBy, opts);
  }

  async writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void> {
    await writeRedmineTask(this.syncContext(), task, opts);
  }

  async writeTasks(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void> {
    await writeRedmineTasks(this.syncContext(), tasks, opts);
  }

  async sync(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }): Promise<void> {
    await syncRedmine(this.syncContext(), opts);
  }

  private ensureDocMetadata(task: TaskDocMeta): void {
    if (task.doc === undefined) return;
    task.doc_version = normalizeDocVersion(task.doc_version);
    task.doc_updated_at ??= nowIso();
    task.doc_updated_by ??= DEFAULT_DOC_UPDATED_BY;
  }

  private async syncPush(quiet: boolean, confirm: boolean): Promise<void> {
    await syncPushRedmine(this.syncContext(), quiet, confirm);
  }

  private async syncPull(
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail",
    quiet: boolean,
  ): Promise<void> {
    await syncPullRedmine(this.syncContext(), conflict, quiet);
  }

  private async handleConflict(
    taskId: string,
    localTask: TaskData,
    remoteTask: TaskData,
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail",
  ): Promise<void> {
    await handleRedmineConflict(this.syncContext(), taskId, localTask, remoteTask, conflict);
  }

  private diffTasks(localTask: TaskData, remoteTask: TaskData): string {
    return diffRedmineTasks(localTask, remoteTask);
  }

  private tasksDiffer(localTask: TaskData, remoteTask: TaskData): boolean {
    return redmineTasksDiffer(localTask, remoteTask);
  }

  private async cacheTask(task: TaskData, dirty: boolean): Promise<void> {
    if (!this.cache) return;
    const next = { ...task, dirty };
    await this.cache.writeTask(next);
  }

  private assertExpectedRevisionSupported(taskId: string, opts?: TaskWriteOptions): void {
    if (opts?.expectedRevision === undefined) return;
    if (this.capabilities.supports_revision_guarded_writes) return;
    throw new BackendError(
      `Task revision guarding is unavailable for ${taskId} without AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE`,
      "E_BACKEND",
    );
  }

  private assertExpectedRevision(
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

  private taskIdFieldId(): unknown {
    const fieldId = this.customFields?.task_id;
    if (fieldId) return fieldId;
    throw new BackendError(
      redmineConfigMissingEnvMessage("AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID"),
      "E_BACKEND",
    );
  }

  private setIssueCustomFieldValue(
    issue: Record<string, unknown>,
    fieldId: unknown,
    value: unknown,
  ): void {
    setRedmineIssueCustomFieldValue(issue, fieldId, value);
  }

  private async listTasksRemote(): Promise<TaskData[]> {
    const taskFieldId = this.taskIdFieldId();
    return await listTasksRemoteImpl({
      projectId: this.projectId,
      taskFieldId,
      issueCache: this.issueCache,
      requestJson: async (method, reqPath, payload, params) =>
        await this.requestJson(method, reqPath, payload, params),
      customFieldValue: (issue, fieldId) => this.customFieldValue(issue, fieldId),
      issueToTask: (issue, taskIdOverride) => this.issueToTask(issue, taskIdOverride),
    });
  }

  private issueFromPayload(payload: Record<string, unknown>): Record<string, unknown> | null {
    return isRecord(payload.issue) ? payload.issue : null;
  }

  private async inferStatusIdForTaskStatus(statusRaw: unknown): Promise<number | null> {
    return await inferRedmineStatusIdForTaskStatus(this.syncContext(), statusRaw);
  }

  private async loadInferredStatusByTaskStatus(): Promise<Map<string, number>> {
    return await loadRedmineInferredStatusByTaskStatus(this.syncContext());
  }

  private selectInferredStatus(
    statuses: { id: number; name: string; isClosed: boolean; isDefault: boolean }[],
    target: "TODO" | "DOING" | "DONE",
  ): number | null {
    return selectRedmineInferredStatus(statuses, target);
  }

  private async findIssueByTaskId(taskId: string): Promise<Record<string, unknown> | null> {
    const taskFieldId = this.taskIdFieldId();
    return await findIssueByTaskIdImpl({
      taskId,
      projectId: this.projectId,
      taskFieldId,
      issueCache: this.issueCache,
      requestJson: async (method, reqPath, payload, params) =>
        await this.requestJson(method, reqPath, payload, params),
      customFieldValue: (issue, fieldId) => this.customFieldValue(issue, fieldId),
      refreshList: async () => {
        await this.listTasksRemote();
      },
    });
  }

  private issueToTask(issue: Record<string, unknown>, taskIdOverride?: string): TaskData | null {
    return issueToTaskImpl({
      issue,
      taskIdOverride,
      reverseStatus: this.reverseStatus,
      customFields: this.customFields,
      ownerAgent: this.ownerAgent,
      defaultDocVersion: DOC_VERSION,
    });
  }

  private taskToIssuePayload(
    task: TaskData,
    existingIssue?: Record<string, unknown>,
  ): Record<string, unknown> {
    return taskToIssuePayloadImpl({
      task,
      existingIssue,
      statusMap: this.statusMap,
      assigneeId: this.assigneeId,
      customFields: this.customFields,
      appendCustomField: (fields, key, value) => this.appendCustomField(fields, key, value),
    });
  }

  private appendCustomField(fields: Record<string, unknown>[], key: string, value: unknown): void {
    appendRedmineCustomField({ customFields: this.customFields, fields, key, value });
  }

  private normalizeComments(value: unknown): TaskComment[] {
    return normalizeCommentsImpl(value);
  }

  private async appendCommentNotes(
    issueId: string,
    existingComments: TaskComment[],
    desiredComments: TaskComment[],
  ): Promise<void> {
    await appendCommentNotesImpl({
      issueId,
      existingComments,
      desiredComments,
      requestJson: async (method, reqPath, payload, params) =>
        await this.requestJson(method, reqPath, payload, params),
    });
  }

  private startDateFromTaskId(taskId: string): string | null {
    return startDateFromTaskId(taskId);
  }

  private doneRatioForStatus(status: string): number | null {
    return doneRatioForStatus(status);
  }

  private commentsToPairs(comments: TaskComment[]): [string, string][] {
    const pairs: [string, string][] = [];
    for (const comment of comments) {
      const author = toStringSafe(comment.author).trim();
      const body = toStringSafe(comment.body).trim();
      if (!author && !body) continue;
      pairs.push([author, body]);
    }
    return pairs;
  }

  private formatCommentNote(author = "unknown", body = ""): string {
    const authorText = author;
    const bodyText = body;
    return `[comment] ${authorText}: ${bodyText}`.trim();
  }

  private customFieldValue(issue: Record<string, unknown>, fieldId: unknown): string | null {
    return redmineCustomFieldValue(issue, fieldId);
  }

  private maybeParseJson(value: unknown): unknown {
    return maybeParseRedmineJson(value);
  }

  private coerceDocVersion(value: unknown): 2 | 3 | null {
    return coerceRedmineDocVersion(value);
  }

  private async requestJson(
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
    opts?: { attempts?: number; backoff?: number },
  ): Promise<Record<string, unknown>> {
    return await requestRedmineJson(
      { baseUrl: this.baseUrl, apiKey: this.apiKey },
      method,
      reqPath,
      payload,
      params,
      opts,
    );
  }
}
