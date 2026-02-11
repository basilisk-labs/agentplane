import { isRecord } from "../../../shared/guards.js";

import {
  ensureDocMetadata,
  normalizePriority,
  nowIso,
  toStringSafe,
  type TaskData,
} from "../shared.js";

import { customFieldValue } from "./fields.js";
import { coerceDocVersion, maybeParseJson } from "./parse.js";
import { normalizeComments } from "./comments.js";

export function startDateFromTaskId(taskId: string): string | null {
  if (!taskId.includes("-")) return null;
  const prefix = taskId.split("-", 1)[0] ?? "";
  if (prefix.length < 8) return null;
  const year = prefix.slice(0, 4);
  const month = prefix.slice(4, 6);
  const day = prefix.slice(6, 8);
  if (!/^\d{8}$/u.test(`${year}${month}${day}`)) return null;
  return `${year}-${month}-${day}`;
}

export function doneRatioForStatus(status: string): number | null {
  if (!status) return null;
  if (status === "DONE") return 100;
  return 0;
}

export function issueToTask(opts: {
  issue: Record<string, unknown>;
  taskIdOverride?: string;
  reverseStatus: Map<number, string>;
  customFields: Record<string, unknown>;
  ownerAgent: string;
  defaultDocVersion: number;
}): TaskData | null {
  const taskId = opts.taskIdOverride ?? customFieldValue(opts.issue, opts.customFields.task_id);
  if (!taskId) return null;
  const statusVal = isRecord(opts.issue.status) ? opts.issue.status : null;
  const statusId = statusVal && typeof statusVal.id === "number" ? statusVal.id : null;
  const status =
    statusId !== null && opts.reverseStatus.has(statusId)
      ? opts.reverseStatus.get(statusId)
      : "TODO";

  const verifyVal = customFieldValue(opts.issue, opts.customFields.verify);
  const commitVal = customFieldValue(opts.issue, opts.customFields.commit);
  const docVal = customFieldValue(opts.issue, opts.customFields.doc);
  const commentsVal = customFieldValue(opts.issue, opts.customFields.comments);
  const tagsVal = customFieldValue(opts.issue, opts.customFields.tags);
  const priorityFieldVal = customFieldValue(opts.issue, opts.customFields.priority);
  const ownerFieldVal = customFieldValue(opts.issue, opts.customFields.owner);
  const docVersionVal = customFieldValue(opts.issue, opts.customFields.doc_version);
  const docUpdatedAtVal = customFieldValue(opts.issue, opts.customFields.doc_updated_at);
  const docUpdatedByVal = customFieldValue(opts.issue, opts.customFields.doc_updated_by);
  const updatedOn =
    typeof opts.issue.updated_on === "string"
      ? opts.issue.updated_on
      : typeof opts.issue.created_on === "string"
        ? opts.issue.created_on
        : null;

  const priorityVal = isRecord(opts.issue.priority) ? opts.issue.priority : null;
  const priorityName = normalizePriority(priorityVal?.name ?? priorityFieldVal);

  const tags: string[] = [];
  if (Array.isArray(opts.issue.tags)) {
    for (const tag of opts.issue.tags) {
      if (isRecord(tag) && tag.name) tags.push(toStringSafe(tag.name));
    }
  }
  const tagsFromField = maybeParseJson(tagsVal);
  if (Array.isArray(tagsFromField)) {
    for (const tag of tagsFromField) {
      const text = toStringSafe(tag).trim();
      if (text) tags.push(text);
    }
  } else if (typeof tagsFromField === "string") {
    for (const tag of tagsFromField.split(",")) {
      const text = tag.trim();
      if (text) tags.push(text);
    }
  }
  const mergedTags = [...new Set(tags)];

  const task: TaskData = {
    id: toStringSafe(taskId),
    title: toStringSafe(opts.issue.subject),
    description: toStringSafe(opts.issue.description),
    status: status ?? "TODO",
    priority: priorityName,
    owner: toStringSafe(ownerFieldVal ?? opts.ownerAgent),
    tags: mergedTags,
    depends_on: [],
    verify: maybeParseJson(verifyVal) as string[],
    commit: maybeParseJson(commitVal) as TaskData["commit"],
    comments: normalizeComments(maybeParseJson(commentsVal)),
    id_source: "custom",
  };

  if (docVal) task.doc = toStringSafe(docVal);
  const docVersion = coerceDocVersion(docVersionVal);
  task.doc_version = docVersion ?? opts.defaultDocVersion;
  task.doc_updated_at = docUpdatedAtVal ? toStringSafe(docUpdatedAtVal) : (updatedOn ?? nowIso());
  task.doc_updated_by = docUpdatedByVal ? toStringSafe(docUpdatedByVal) : opts.ownerAgent;

  return task;
}

export function taskToIssuePayload(opts: {
  task: TaskData;
  existingIssue?: Record<string, unknown>;
  statusMap: Record<string, unknown>;
  assigneeId: number | null;
  customFields: Record<string, unknown>;
  appendCustomField: (fields: Record<string, unknown>[], key: string, value: unknown) => void;
}): Record<string, unknown> {
  const status = toStringSafe(opts.task.status).trim().toUpperCase();
  const payload: Record<string, unknown> = {
    subject: toStringSafe(opts.task.title),
    description: toStringSafe(opts.task.description),
  };

  if (status && opts.statusMap && status in opts.statusMap) {
    payload.status_id = opts.statusMap[status];
  }

  if (typeof opts.task.priority === "number") payload.priority_id = opts.task.priority;

  let existingAssignee: unknown = null;
  if (opts.existingIssue && isRecord(opts.existingIssue.assigned_to)) {
    existingAssignee = opts.existingIssue.assigned_to.id;
  }
  if (opts.assigneeId && !existingAssignee) payload.assigned_to_id = opts.assigneeId;

  const startDate = startDateFromTaskId(toStringSafe(opts.task.id));
  if (startDate) payload.start_date = startDate;

  const doneRatio = doneRatioForStatus(status);
  if (doneRatio !== null) payload.done_ratio = doneRatio;

  const customFields: Record<string, unknown>[] = [];
  ensureDocMetadata(opts.task);
  opts.appendCustomField(customFields, "task_id", opts.task.id);
  opts.appendCustomField(customFields, "verify", opts.task.verify);
  opts.appendCustomField(customFields, "commit", opts.task.commit);
  opts.appendCustomField(customFields, "comments", opts.task.comments);
  opts.appendCustomField(customFields, "doc", opts.task.doc);
  opts.appendCustomField(customFields, "doc_version", opts.task.doc_version);
  opts.appendCustomField(customFields, "doc_updated_at", opts.task.doc_updated_at);
  opts.appendCustomField(customFields, "doc_updated_by", opts.task.doc_updated_by);
  opts.appendCustomField(customFields, "tags", opts.task.tags);
  opts.appendCustomField(customFields, "priority", opts.task.priority);
  opts.appendCustomField(customFields, "owner", opts.task.owner);

  if (customFields.length > 0) payload.custom_fields = customFields;
  return payload;
}
