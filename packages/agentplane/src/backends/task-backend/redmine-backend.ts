import { canonicalizeJson } from "@agentplaneorg/core";

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
import { readRedmineEnv } from "./redmine/env.js";
import {
  BackendError,
  DEFAULT_DOC_UPDATED_BY,
  DOC_VERSION,
  RedmineUnavailable,
  ensureDocMetadata,
  firstNonEmptyString,
  generateTaskId,
  mapLimit,
  missingTaskIdMessage,
  nowIso,
  redmineConfigMissingEnvMessage,
  redmineIssueIdMissingMessage,
  sleep,
  toStringSafe,
  unknownTaskIdMessage,
  validateTaskId,
  writeTasksExportFromTasks,
  type TaskBackend,
  type TaskData,
  type TaskDocMeta,
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

    for (const [key, value] of Object.entries(this.statusMap)) {
      if (typeof value === "number") this.reverseStatus.set(value, key);
    }
  }

  async generateTaskId(opts: { length: number; attempts: number }): Promise<string> {
    const length = opts.length;
    const attempts = opts.attempts;
    let existingIds = new Set<string>();
    try {
      const tasks = await this.listTasksRemote();
      existingIds = new Set(tasks.map((task) => toStringSafe(task.id)).filter(Boolean));
    } catch (err) {
      if (!(err instanceof RedmineUnavailable)) throw err;
      if (!this.cache) throw err;
      const cached = await this.cache.listTasks();
      existingIds = new Set(cached.map((task) => toStringSafe(task.id)).filter(Boolean));
    }
    return await generateTaskId({
      length,
      attempts,
      isAvailable: (taskId) => !existingIds.has(taskId),
    });
  }

  async listTasks(): Promise<TaskData[]> {
    try {
      const tasks = await this.listTasksRemote();
      for (const task of tasks) {
        await this.cacheTask(task, false);
      }
      return tasks;
    } catch (err) {
      if (err instanceof RedmineUnavailable) {
        if (!this.cache) throw err;
        return await this.cache.listTasks();
      }
      throw err;
    }
  }

  async exportTasksJson(outputPath: string): Promise<void> {
    const tasks = await this.listTasks();
    await writeTasksExportFromTasks({ outputPath, tasks });
  }

  async normalizeTasks(): Promise<{ scanned: number; changed: number }> {
    // Remote backends should avoid expensive downloads; best-effort normalize the local cache if present.
    if (this.cache?.normalizeTasks) return await this.cache.normalizeTasks();
    return { scanned: 0, changed: 0 };
  }

  async getTask(taskId: string): Promise<TaskData | null> {
    try {
      const issue = await this.findIssueByTaskId(taskId);
      if (!issue) return null;
      const task = this.issueToTask(issue, taskId);
      if (task) await this.cacheTask(task, false);
      return task;
    } catch (err) {
      if (err instanceof RedmineUnavailable) {
        if (!this.cache) throw err;
        const cached = await this.cache.getTask(taskId);
        return cached ?? null;
      }
      throw err;
    }
  }

  async getTasks(taskIds: string[]): Promise<(TaskData | null)[]> {
    // Use limited parallelism to avoid hammering the Redmine API.
    return await mapLimit(taskIds, this.batchSize, async (taskId) => await this.getTask(taskId));
  }

  async getTaskDoc(taskId: string): Promise<string> {
    const task = await this.getTask(taskId);
    if (!task) throw new Error(unknownTaskIdMessage(taskId));
    return toStringSafe(task.doc);
  }

  async setTaskDoc(taskId: string, doc: string, updatedBy?: string): Promise<void> {
    if (!this.customFields.doc) {
      throw new BackendError(
        redmineConfigMissingEnvMessage("AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC"),
        "E_BACKEND",
      );
    }
    try {
      const issue = await this.findIssueByTaskId(taskId);
      if (!issue) throw new Error(unknownTaskIdMessage(taskId));
      const issueIdText = toStringSafe(issue.id);
      if (!issueIdText) throw new Error(redmineIssueIdMissingMessage());
      const taskDoc: TaskDocMeta = { doc: String(doc ?? "") };
      ensureDocMetadata(taskDoc, updatedBy);
      const customFields: Record<string, unknown>[] = [];
      this.appendCustomField(customFields, "doc", taskDoc.doc);
      this.appendCustomField(customFields, "doc_version", taskDoc.doc_version);
      this.appendCustomField(customFields, "doc_updated_at", taskDoc.doc_updated_at);
      this.appendCustomField(customFields, "doc_updated_by", taskDoc.doc_updated_by);
      await this.requestJson("PUT", `issues/${issueIdText}.json`, {
        issue: { custom_fields: customFields },
      });
      const task = this.issueToTask(issue, taskId);
      if (task) {
        task.doc = taskDoc.doc;
        task.doc_version = taskDoc.doc_version;
        task.doc_updated_at = taskDoc.doc_updated_at;
        task.doc_updated_by = taskDoc.doc_updated_by;
        await this.cacheTask(task, false);
      }
    } catch (err) {
      if (err instanceof RedmineUnavailable) {
        if (!this.cache) throw err;
        const cached = await this.cache.getTask(taskId);
        if (!cached) throw new Error(unknownTaskIdMessage(taskId));
        cached.doc = String(doc ?? "");
        ensureDocMetadata(cached, updatedBy);
        cached.dirty = true;
        await this.cache.writeTask(cached);
        return;
      }
      throw err;
    }
  }

  async touchTaskDocMetadata(taskId: string, updatedBy?: string): Promise<void> {
    try {
      const issue = await this.findIssueByTaskId(taskId);
      if (!issue) throw new Error(unknownTaskIdMessage(taskId));
      const issueIdText = toStringSafe(issue.id);
      if (!issueIdText) throw new Error(redmineIssueIdMissingMessage());
      const docValue = this.customFieldValue(issue, this.customFields.doc);
      const taskDoc: TaskDocMeta = { doc: docValue ?? "" };
      ensureDocMetadata(taskDoc, updatedBy);
      const customFields: Record<string, unknown>[] = [];
      this.appendCustomField(customFields, "doc_version", taskDoc.doc_version);
      this.appendCustomField(customFields, "doc_updated_at", taskDoc.doc_updated_at);
      this.appendCustomField(customFields, "doc_updated_by", taskDoc.doc_updated_by);
      if (customFields.length > 0) {
        await this.requestJson("PUT", `issues/${issueIdText}.json`, {
          issue: { custom_fields: customFields },
        });
        const task = this.issueToTask(issue, taskId);
        if (task) {
          task.doc_version = taskDoc.doc_version;
          task.doc_updated_at = taskDoc.doc_updated_at;
          task.doc_updated_by = taskDoc.doc_updated_by;
          await this.cacheTask(task, false);
        }
      }
    } catch (err) {
      if (err instanceof RedmineUnavailable) {
        if (!this.cache) throw err;
        const cached = await this.cache.getTask(taskId);
        if (!cached) throw new Error(unknownTaskIdMessage(taskId));
        ensureDocMetadata(cached, updatedBy);
        cached.dirty = true;
        await this.cache.writeTask(cached);
        return;
      }
      throw err;
    }
  }

  async writeTask(task: TaskData): Promise<void> {
    const taskId = toStringSafe(task.id).trim();
    if (!taskId) throw new Error(missingTaskIdMessage());
    validateTaskId(taskId);

    try {
      this.ensureDocMetadata(task);
      let issue = await this.findIssueByTaskId(taskId);
      let issueId = issue?.id;
      let issueIdText = issueId ? toStringSafe(issueId) : "";
      let existingIssue = issue ?? null;
      if (issueIdText && !existingIssue) {
        const payload = await this.requestJson("GET", `issues/${issueIdText}.json`);
        existingIssue = this.issueFromPayload(payload);
      }
      const payload = this.taskToIssuePayload(task, existingIssue ?? undefined);
      if (issueIdText) {
        await this.requestJson("PUT", `issues/${issueIdText}.json`, { issue: payload });
      } else {
        const createPayload = { ...payload, project_id: this.projectId };
        const created = await this.requestJson("POST", "issues.json", { issue: createPayload });
        const createdIssue = this.issueFromPayload(created);
        issueId = createdIssue?.id;
        issueIdText = issueId ? toStringSafe(issueId) : "";
        if (issueIdText) {
          const updatePayload = { ...payload };
          delete updatePayload.project_id;
          await this.requestJson("PUT", `issues/${issueIdText}.json`, { issue: updatePayload });
          const refreshed = await this.requestJson("GET", `issues/${issueIdText}.json`);
          existingIssue = this.issueFromPayload(refreshed);
        }
      }
      if (issueIdText) {
        const existingComments =
          existingIssue && this.customFields.comments
            ? this.normalizeComments(
                this.maybeParseJson(
                  this.customFieldValue(existingIssue, this.customFields.comments),
                ),
              )
            : [];
        const desiredComments = this.normalizeComments(task.comments);
        await this.appendCommentNotes(issueIdText, existingComments, desiredComments);
      }
      task.dirty = false;
      await this.cacheTask(task, false);
      this.issueCache.clear();
    } catch (err) {
      if (err instanceof RedmineUnavailable) {
        if (!this.cache) throw err;
        task.dirty = true;
        await this.cacheTask(task, true);
        return;
      }
      throw err;
    }
  }

  async writeTasks(tasks: TaskData[]): Promise<void> {
    for (const [index, task] of tasks.entries()) {
      await this.writeTask(task);
      if (this.batchPauseMs > 0 && this.batchSize > 0 && (index + 1) % this.batchSize === 0) {
        await sleep(this.batchPauseMs);
      }
    }
  }

  async sync(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }): Promise<void> {
    if (opts.direction === "push") {
      await this.syncPush(opts.quiet, opts.confirm);
      return;
    }
    if (opts.direction === "pull") {
      await this.syncPull(opts.conflict, opts.quiet);
      return;
    }
    throw new BackendError("Invalid sync direction (expected push|pull)", "E_BACKEND");
  }

  private ensureDocMetadata(task: TaskDocMeta): void {
    if (task.doc === undefined) return;
    if (task.doc_version !== DOC_VERSION) task.doc_version = DOC_VERSION;
    task.doc_updated_at ??= nowIso();
    task.doc_updated_by ??= DEFAULT_DOC_UPDATED_BY;
  }

  private async syncPush(quiet: boolean, confirm: boolean): Promise<void> {
    if (!this.cache) {
      throw new BackendError("Redmine cache is disabled; sync push is unavailable", "E_BACKEND");
    }
    const tasks = await this.cache.listTasks();
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
    await this.writeTasks(dirty);
    if (!quiet) process.stdout.write(`✅ pushed ${dirty.length} task(s) (dirty)\n`);
  }

  private async syncPull(
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail",
    quiet: boolean,
  ): Promise<void> {
    if (!this.cache) {
      throw new BackendError("Redmine cache is disabled; sync pull is unavailable", "E_BACKEND");
    }
    const remoteTasks = await this.listTasksRemote();
    const remoteById = new Map<string, TaskData>();
    for (const task of remoteTasks) {
      const taskId = toStringSafe(task.id);
      if (taskId) remoteById.set(taskId, task);
    }
    const localTasks = await this.cache.listTasks();
    const localById = new Map<string, TaskData>();
    for (const task of localTasks) {
      const taskId = toStringSafe(task.id);
      if (taskId) localById.set(taskId, task);
    }

    for (const [taskId, remoteTask] of remoteById.entries()) {
      const localTask = localById.get(taskId);
      if (localTask?.dirty) {
        if (this.tasksDiffer(localTask, remoteTask)) {
          await this.handleConflict(taskId, localTask, remoteTask, conflict);
          continue;
        }
        localTask.dirty = false;
        await this.cacheTask(localTask, false);
        continue;
      }
      await this.cacheTask(remoteTask, false);
    }
    if (!quiet) process.stdout.write(`✅ pulled ${remoteById.size} task(s) (remote)\n`);
  }

  private async handleConflict(
    taskId: string,
    localTask: TaskData,
    remoteTask: TaskData,
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail",
  ): Promise<void> {
    if (conflict === "prefer-local") {
      await this.writeTask(localTask);
      return;
    }
    if (conflict === "prefer-remote") {
      await this.cacheTask(remoteTask, false);
      return;
    }
    if (conflict === "diff") {
      const diff = this.diffTasks(localTask, remoteTask);
      process.stdout.write(`${diff}\n`);
      throw new BackendError(`Conflict detected for ${taskId}`, "E_BACKEND");
    }
    throw new BackendError(`Conflict detected for ${taskId}`, "E_BACKEND");
  }

  private diffTasks(localTask: TaskData, remoteTask: TaskData): string {
    const localText = JSON.stringify(canonicalizeJson(localTask), null, 2).split("\n");
    const remoteText = JSON.stringify(canonicalizeJson(remoteTask), null, 2).split("\n");
    const diff = ["--- remote", "+++ local"];
    const max = Math.max(localText.length, remoteText.length);
    for (let i = 0; i < max; i++) {
      const l = localText[i];
      const r = remoteText[i];
      if (l === r) continue;
      if (r !== undefined) diff.push(`- ${r}`);
      if (l !== undefined) diff.push(`+ ${l}`);
    }
    return diff.join("\n");
  }

  private tasksDiffer(localTask: TaskData, remoteTask: TaskData): boolean {
    const localText = JSON.stringify(canonicalizeJson(localTask));
    const remoteText = JSON.stringify(canonicalizeJson(remoteTask));
    return localText !== remoteText;
  }

  private async cacheTask(task: TaskData, dirty: boolean): Promise<void> {
    if (!this.cache) return;
    const next = { ...task, dirty };
    await this.cache.writeTask(next);
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

  private coerceDocVersion(value: unknown): number | null {
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
