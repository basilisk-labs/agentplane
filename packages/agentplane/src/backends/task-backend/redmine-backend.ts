import { canonicalizeJson } from "@agentplaneorg/core";

import { isRecord } from "../../shared/guards.js";

import type { LocalBackend } from "./local-backend.js";
import {
  BackendError,
  DEFAULT_DOC_UPDATED_BY,
  DOC_VERSION,
  RedmineUnavailable,
  TASK_ID_RE,
  ensureDocMetadata,
  firstNonEmptyString,
  generateTaskId,
  mapLimit,
  missingTaskIdMessage,
  normalizePriority,
  nowIso,
  redmineConfigMissingMessage,
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
  batchPause: number;
  cache: LocalBackend | null;
  issueCache = new Map<string, Record<string, unknown>>();
  reverseStatus = new Map<number, string>();

  constructor(settings: RedmineSettings, opts: { cache?: LocalBackend | null }) {
    const envUrl = firstNonEmptyString(process.env.AGENTPLANE_REDMINE_URL);
    const envApiKey = firstNonEmptyString(process.env.AGENTPLANE_REDMINE_API_KEY);
    const envProjectId = firstNonEmptyString(process.env.AGENTPLANE_REDMINE_PROJECT_ID);
    const envAssignee = (process.env.AGENTPLANE_REDMINE_ASSIGNEE_ID ?? "").trim();
    const envOwner = firstNonEmptyString(
      process.env.AGENTPLANE_REDMINE_OWNER,
      process.env.AGENTPLANE_REDMINE_OWNER_AGENT,
    );

    this.baseUrl = firstNonEmptyString(envUrl, settings.url).replaceAll(/\/+$/gu, "");
    this.apiKey = firstNonEmptyString(envApiKey, settings.api_key);
    this.projectId = firstNonEmptyString(envProjectId, settings.project_id);
    this.assigneeId = envAssignee && /^\d+$/u.test(envAssignee) ? Number(envAssignee) : null;
    this.statusMap = isRecord(settings.status_map) ? settings.status_map : {};
    this.customFields = isRecord(settings.custom_fields) ? settings.custom_fields : {};
    this.batchSize = typeof settings.batch_size === "number" ? settings.batch_size : 20;
    this.batchPause = typeof settings.batch_pause === "number" ? settings.batch_pause : 0.5;
    this.ownerAgent = firstNonEmptyString(envOwner, settings.owner_agent, "REDMINE");
    this.cache = opts.cache ?? null;

    if (!this.baseUrl || !this.apiKey || !this.projectId) {
      throw new BackendError(redmineConfigMissingMessage("url, api_key, project_id"), "E_BACKEND");
    }

    if (!this.customFields?.task_id) {
      throw new BackendError(redmineConfigMissingMessage("custom_fields.task_id"), "E_BACKEND");
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
      throw new BackendError(redmineConfigMissingMessage("custom_fields.doc"), "E_BACKEND");
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
      if (this.batchPause && this.batchSize > 0 && (index + 1) % this.batchSize === 0) {
        await sleep(this.batchPause * 1000);
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
    throw new BackendError(redmineConfigMissingMessage("custom_fields.task_id"), "E_BACKEND");
  }

  private setIssueCustomFieldValue(
    issue: Record<string, unknown>,
    fieldId: unknown,
    value: unknown,
  ): void {
    const fields: unknown[] = Array.isArray(issue.custom_fields) ? issue.custom_fields : [];
    let found = false;
    const updated = fields.map((field) => {
      if (isRecord(field) && field.id === fieldId) {
        found = true;
        return { ...field, value };
      }
      return field;
    });
    if (!found) updated.push({ id: fieldId, value });
    issue.custom_fields = updated;
  }

  private async listTasksRemote(): Promise<TaskData[]> {
    const tasks: TaskData[] = [];
    const allIssues: Record<string, unknown>[] = [];
    let offset = 0;
    const limit = 100;
    const taskField = this.taskIdFieldId();
    this.issueCache.clear();

    while (true) {
      const payload = await this.requestJson("GET", "issues.json", undefined, {
        project_id: this.projectId,
        limit,
        offset,
        status_id: "*",
      });
      const issues = Array.isArray(payload.issues) ? payload.issues : [];
      const pageIssues = issues.filter((issue): issue is Record<string, unknown> =>
        isRecord(issue),
      );
      allIssues.push(...pageIssues);
      const total = Number(payload.total_count ?? 0);
      if (total === 0 || offset + limit >= total) break;
      offset += limit;
    }

    const existingIds = new Set<string>();
    const duplicates = new Set<string>();
    for (const issue of allIssues) {
      const taskId = this.customFieldValue(issue, taskField);
      if (!taskId) continue;
      const taskIdStr = toStringSafe(taskId);
      if (!TASK_ID_RE.test(taskIdStr)) continue;
      if (existingIds.has(taskIdStr)) duplicates.add(taskIdStr);
      existingIds.add(taskIdStr);
    }
    if (duplicates.size > 0) {
      const sample = [...duplicates].toSorted().slice(0, 5).join(", ");
      throw new BackendError(`Duplicate task_id values found in Redmine: ${sample}`, "E_BACKEND");
    }

    for (const issue of allIssues) {
      const taskId = this.customFieldValue(issue, taskField);
      const taskIdText = toStringSafe(taskId);
      if (!taskIdText || !TASK_ID_RE.test(taskIdText)) continue;
      const task = this.issueToTask(issue, taskIdText);
      if (task) {
        const idText = toStringSafe(task.id);
        if (idText) this.issueCache.set(idText, issue);
        tasks.push(task);
      }
    }

    return tasks;
  }

  private issueFromPayload(payload: Record<string, unknown>): Record<string, unknown> | null {
    return isRecord(payload.issue) ? payload.issue : null;
  }

  private async findIssueByTaskId(taskId: string): Promise<Record<string, unknown> | null> {
    const id = toStringSafe(taskId).trim();
    if (!id) return null;
    const cached = this.issueCache.get(id);
    if (cached) return cached;

    const taskField = this.taskIdFieldId();
    const payload = await this.requestJson("GET", "issues.json", undefined, {
      project_id: this.projectId,
      status_id: "*",
      [`cf_${String(taskField)}`]: id,
      limit: 100,
    });
    const candidates = Array.isArray(payload.issues) ? payload.issues : [];
    for (const candidate of candidates) {
      if (!isRecord(candidate)) continue;
      const val = this.customFieldValue(candidate, taskField);
      if (val && String(val) === id) {
        this.issueCache.set(id, candidate);
        return candidate;
      }
    }

    await this.listTasksRemote();
    const refreshed = this.issueCache.get(id);
    return refreshed ?? null;
  }

  private issueToTask(issue: Record<string, unknown>, taskIdOverride?: string): TaskData | null {
    const taskId = taskIdOverride ?? this.customFieldValue(issue, this.customFields.task_id);
    if (!taskId) return null;
    const statusVal = isRecord(issue.status) ? issue.status : null;
    const statusId = statusVal && typeof statusVal.id === "number" ? statusVal.id : null;
    const status =
      statusId !== null && this.reverseStatus.has(statusId)
        ? this.reverseStatus.get(statusId)
        : "TODO";

    const verifyVal = this.customFieldValue(issue, this.customFields.verify);
    const commitVal = this.customFieldValue(issue, this.customFields.commit);
    const docVal = this.customFieldValue(issue, this.customFields.doc);
    const commentsVal = this.customFieldValue(issue, this.customFields.comments);
    const docVersionVal = this.customFieldValue(issue, this.customFields.doc_version);
    const docUpdatedAtVal = this.customFieldValue(issue, this.customFields.doc_updated_at);
    const docUpdatedByVal = this.customFieldValue(issue, this.customFields.doc_updated_by);
    const updatedOn =
      typeof issue.updated_on === "string"
        ? issue.updated_on
        : typeof issue.created_on === "string"
          ? issue.created_on
          : null;

    const priorityVal = isRecord(issue.priority) ? issue.priority : null;
    const priorityName = normalizePriority(priorityVal?.name);

    const tags: string[] = [];
    if (Array.isArray(issue.tags)) {
      for (const tag of issue.tags) {
        if (isRecord(tag) && tag.name) tags.push(toStringSafe(tag.name));
      }
    }

    const task: TaskData = {
      id: toStringSafe(taskId),
      title: toStringSafe(issue.subject),
      description: toStringSafe(issue.description),
      status: status ?? "TODO",
      priority: priorityName,
      owner: this.ownerAgent,
      tags,
      depends_on: [],
      verify: this.maybeParseJson(verifyVal) as string[],
      commit: this.maybeParseJson(commitVal) as TaskData["commit"],
      comments: this.normalizeComments(this.maybeParseJson(commentsVal)),
      id_source: "custom",
    };

    if (docVal) task.doc = toStringSafe(docVal);
    const docVersion = this.coerceDocVersion(docVersionVal);
    task.doc_version = docVersion ?? DOC_VERSION;
    task.doc_updated_at = docUpdatedAtVal ? toStringSafe(docUpdatedAtVal) : (updatedOn ?? nowIso());
    task.doc_updated_by = docUpdatedByVal ? toStringSafe(docUpdatedByVal) : this.ownerAgent;

    return task;
  }

  private taskToIssuePayload(
    task: TaskData,
    existingIssue?: Record<string, unknown>,
  ): Record<string, unknown> {
    const status = toStringSafe(task.status).trim().toUpperCase();
    const payload: Record<string, unknown> = {
      subject: toStringSafe(task.title),
      description: toStringSafe(task.description),
    };

    if (status && this.statusMap && status in this.statusMap) {
      payload.status_id = this.statusMap[status];
    }

    if (typeof task.priority === "number") payload.priority_id = task.priority;

    let existingAssignee: unknown = null;
    if (existingIssue && isRecord(existingIssue.assigned_to)) {
      existingAssignee = existingIssue.assigned_to.id;
    }
    if (this.assigneeId && !existingAssignee) payload.assigned_to_id = this.assigneeId;

    const startDate = this.startDateFromTaskId(toStringSafe(task.id));
    if (startDate) payload.start_date = startDate;

    const doneRatio = this.doneRatioForStatus(status);
    if (doneRatio !== null) payload.done_ratio = doneRatio;

    const customFields: Record<string, unknown>[] = [];
    this.ensureDocMetadata(task);
    this.appendCustomField(customFields, "task_id", task.id);
    this.appendCustomField(customFields, "verify", task.verify);
    this.appendCustomField(customFields, "commit", task.commit);
    this.appendCustomField(customFields, "comments", task.comments);
    this.appendCustomField(customFields, "doc", task.doc);
    this.appendCustomField(customFields, "doc_version", task.doc_version);
    this.appendCustomField(customFields, "doc_updated_at", task.doc_updated_at);
    this.appendCustomField(customFields, "doc_updated_by", task.doc_updated_by);

    if (customFields.length > 0) payload.custom_fields = customFields;
    return payload;
  }

  private appendCustomField(fields: Record<string, unknown>[], key: string, value: unknown): void {
    const fieldId = this.customFields?.[key];
    if (!fieldId) return;
    let payloadValue: unknown = value;
    if (Array.isArray(value) || isRecord(value)) {
      payloadValue = JSON.stringify(value);
    }
    fields.push({ id: fieldId, value: payloadValue });
  }

  private normalizeComments(value: unknown): { author: string; body: string }[] {
    if (Array.isArray(value)) {
      return value.filter((item): item is { author: string; body: string } =>
        isRecord(item) ? typeof item.author === "string" && typeof item.body === "string" : false,
      );
    }
    if (isRecord(value)) return [value as { author: string; body: string }];
    if (typeof value === "string" && value.trim()) {
      return [{ author: "redmine", body: value.trim() }];
    }
    return [];
  }

  private commentsToPairs(comments: { author: string; body: string }[]): [string, string][] {
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

  private async appendCommentNotes(
    issueId: string,
    existingComments: { author: string; body: string }[],
    desiredComments: { author: string; body: string }[],
  ): Promise<void> {
    const issueIdText = toStringSafe(issueId);
    if (!issueIdText) return;
    const existingPairs = this.commentsToPairs(existingComments);
    const desiredPairs = this.commentsToPairs(desiredComments);
    if (desiredPairs.length === 0) return;
    if (desiredPairs.length < existingPairs.length) return;
    if (existingPairs.length > 0) {
      const prefix = desiredPairs.slice(0, existingPairs.length);
      const matches =
        prefix.length === existingPairs.length &&
        prefix.every(
          (pair, idx) => pair[0] === existingPairs[idx]?.[0] && pair[1] === existingPairs[idx]?.[1],
        );
      if (!matches) return;
    }
    const newPairs = desiredPairs.slice(existingPairs.length);
    for (const [author, body] of newPairs) {
      const note = this.formatCommentNote(author, body);
      if (note) {
        await this.requestJson("PUT", `issues/${issueIdText}.json`, { issue: { notes: note } });
      }
    }
  }

  private startDateFromTaskId(taskId: string): string | null {
    if (!taskId.includes("-")) return null;
    const prefix = taskId.split("-", 1)[0] ?? "";
    if (prefix.length < 8) return null;
    const year = prefix.slice(0, 4);
    const month = prefix.slice(4, 6);
    const day = prefix.slice(6, 8);
    if (!/^\d{8}$/u.test(`${year}${month}${day}`)) return null;
    return `${year}-${month}-${day}`;
  }

  private doneRatioForStatus(status: string): number | null {
    if (!status) return null;
    if (status === "DONE") return 100;
    return 0;
  }

  private customFieldValue(issue: Record<string, unknown>, fieldId: unknown): string | null {
    if (!fieldId) return null;
    const fields = Array.isArray(issue.custom_fields) ? issue.custom_fields : [];
    for (const field of fields) {
      if (isRecord(field) && field.id === fieldId) {
        const value = field.value;
        return value !== undefined && value !== null ? toStringSafe(value) : "";
      }
    }
    return null;
  }

  private maybeParseJson(value: unknown): unknown {
    if (value === null || value === undefined) return null;
    const raw = toStringSafe(value).trim();
    if (!raw) return null;
    if (raw.startsWith("{") || raw.startsWith("[")) {
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    }
    return raw;
  }

  private coerceDocVersion(value: unknown): number | null {
    if (value === null || value === undefined) return null;
    if (typeof value === "number") return value;
    const raw = toStringSafe(value).trim();
    if (/^\d+$/u.test(raw)) return Number(raw);
    return null;
  }

  private async requestJson(
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
    opts?: { attempts?: number; backoff?: number },
  ): Promise<Record<string, unknown>> {
    let url = `${this.baseUrl}/${reqPath.replace(/^\//u, "")}`;
    if (params) {
      const search = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        search.append(key, toStringSafe(value));
      }
      const qs = search.toString();
      if (qs) url += `?${qs}`;
    }

    const attempts = Math.max(1, opts?.attempts ?? 3);
    const backoff = opts?.backoff ?? 0.5;
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        const resp = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "X-Redmine-API-Key": this.apiKey,
          },
          body: payload ? JSON.stringify(payload) : undefined,
        });
        const text = await resp.text();
        if (!resp.ok) {
          if ((resp.status === 429 || resp.status >= 500) && attempt < attempts) {
            await sleep(backoff * attempt * 1000);
            continue;
          }
          throw new BackendError(`Redmine API error: ${resp.status} ${text}`, "E_BACKEND");
        }
        if (!text) return {};
        try {
          const parsed = JSON.parse(text) as unknown;
          if (isRecord(parsed)) return parsed;
          return {};
        } catch {
          return {};
        }
      } catch (err) {
        lastError = err;
        if (err instanceof BackendError) throw err;
        if (attempt >= attempts) {
          throw new RedmineUnavailable("Redmine unavailable");
        }
        await sleep(backoff * attempt * 1000);
      }
    }

    throw lastError instanceof Error ? lastError : new RedmineUnavailable("Redmine unavailable");
  }
}
