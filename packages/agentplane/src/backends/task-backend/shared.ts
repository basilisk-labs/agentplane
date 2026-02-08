import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import {
  canonicalizeJson,
  extractTaskDoc as extractTaskDocCore,
  generateTaskId as generateTaskIdCore,
  mergeTaskDoc as mergeTaskDocCore,
  TASK_ID_ALPHABET,
  type TaskRecord,
} from "@agentplaneorg/core";

import { isRecord } from "../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";

export const TASK_ID_RE = new RegExp(String.raw`^\d{12}-[${TASK_ID_ALPHABET}]{4,}$`);
export const DEFAULT_DOC_UPDATED_BY = "agentplane";
export const DOC_VERSION = 2;

export type PlanApprovalState = "pending" | "approved" | "rejected";
export type PlanApproval = {
  state: PlanApprovalState;
  updated_at: string | null;
  updated_by: string | null;
  note: string | null;
};

export type VerificationState = "pending" | "ok" | "needs_rework";
export type VerificationResult = {
  state: VerificationState;
  updated_at: string | null;
  updated_by: string | null;
  note: string | null;
};

export type TaskEventType = "status" | "comment" | "verify";
export type TaskEvent = {
  type: TaskEventType;
  at: string;
  author: string;
  from?: string;
  to?: string;
  state?: string;
  note?: string;
  body?: string;
};

type ExtractTaskDoc = (body: string) => string;
type MergeTaskDoc = (body: string, doc: string) => string;
type GenerateTaskId = (opts: {
  length: number;
  attempts: number;
  isAvailable?: (taskId: string) => boolean | Promise<boolean>;
  date?: Date;
}) => Promise<string>;

const extractTaskDoc: ExtractTaskDoc = extractTaskDocCore;
const mergeTaskDoc: MergeTaskDoc = mergeTaskDocCore;
export const generateTaskId: GenerateTaskId = generateTaskIdCore;

export function nowIso(): string {
  return new Date().toISOString();
}

export function toStringSafe(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  return "";
}

export function firstNonEmptyString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return "";
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeUpdatedBy(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.toLowerCase() === DEFAULT_DOC_UPDATED_BY.toLowerCase()) return "";
  return trimmed;
}

export type TaskDocMeta = Pick<
  TaskData,
  "doc" | "doc_version" | "doc_updated_at" | "doc_updated_by"
>;

function lastCommentAuthor(comments: unknown): string | null {
  if (!Array.isArray(comments)) return null;
  const entries: unknown[] = comments;
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const entry = entries[i];
    if (!isRecord(entry)) continue;
    const author = entry.author;
    if (typeof author === "string") {
      const trimmed = author.trim();
      if (trimmed) return trimmed;
    }
  }
  return null;
}

export function resolveDocUpdatedByFromFrontmatter(
  frontmatter: Record<string, unknown>,
  updatedBy: string | undefined,
  fallback: string,
): string {
  if (updatedBy !== undefined) {
    const explicit = normalizeUpdatedBy(updatedBy);
    if (explicit) return explicit;
  }
  const author = lastCommentAuthor(frontmatter.comments);
  if (author) return author;
  const existing = normalizeUpdatedBy(frontmatter.doc_updated_by);
  if (existing) return existing;
  const owner = normalizeUpdatedBy(frontmatter.owner);
  if (owner) return owner;
  const fallbackValue = normalizeUpdatedBy(fallback);
  return fallbackValue || fallback;
}

export function resolveDocUpdatedByFromTask(task: TaskData, fallback: string): string {
  const author = lastCommentAuthor(task.comments);
  if (author) return author;
  const existing = normalizeUpdatedBy(task.doc_updated_by);
  if (existing) return existing;
  const owner = normalizeUpdatedBy(task.owner);
  if (owner) return owner;
  const fallbackValue = normalizeUpdatedBy(fallback);
  return fallbackValue || fallback;
}

export function ensureDocMetadata(
  task: TaskDocMeta & Partial<Pick<TaskData, "comments" | "owner">>,
  updatedBy?: string,
): void {
  task.doc_version = DOC_VERSION;
  task.doc_updated_at = nowIso();
  const explicit = normalizeUpdatedBy(updatedBy);
  if (updatedBy !== undefined) {
    task.doc_updated_by =
      explicit || resolveDocUpdatedByFromTask(task as TaskData, DEFAULT_DOC_UPDATED_BY);
    return;
  }
  task.doc_updated_by = resolveDocUpdatedByFromTask(task as TaskData, DEFAULT_DOC_UPDATED_BY);
}

export { extractTaskDoc, mergeTaskDoc };

export function validateTaskId(taskId: string): void {
  if (TASK_ID_RE.test(taskId)) return;
  throw new Error(`Invalid task id: ${taskId} (expected YYYYMMDDHHMM-XXXX)`);
}

export function missingTaskIdMessage(): string {
  return "Missing task id (expected non-empty value)";
}

export function unknownTaskIdMessage(taskId: string): string {
  return `Unknown task id: ${taskId}`;
}

export function invalidLengthMessage(value: number, min: number): string {
  return `Invalid length: ${value} (expected >= ${min})`;
}

export function redmineConfigMissingMessage(detail: string): string {
  return `Missing required Redmine config: ${detail}`;
}

export function redmineIssueIdMissingMessage(): string {
  return "Missing Redmine issue id for task";
}

export type TaskData = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string | number;
  owner: string;
  depends_on: string[];
  tags: string[];
  verify: string[];
  plan_approval?: PlanApproval;
  verification?: VerificationResult;
  commit?: { hash: string; message: string } | null;
  comments?: { author: string; body: string }[];
  events?: TaskEvent[];
  doc?: string;
  doc_version?: number;
  doc_updated_at?: string;
  doc_updated_by?: string;
  dirty?: boolean;
  id_source?: string;
};

export type TaskBackend = {
  id: string;
  listTasks(): Promise<TaskData[]>;
  getTask(taskId: string): Promise<TaskData | null>;
  getTasks?(taskIds: string[]): Promise<(TaskData | null)[]>;
  writeTask(task: TaskData): Promise<void>;
  writeTasks?(tasks: TaskData[]): Promise<void>;
  normalizeTasks?(): Promise<{ scanned: number; changed: number }>;
  exportTasksJson?(outputPath: string): Promise<void>;
  getTaskDoc?(taskId: string): Promise<string>;
  setTaskDoc?(taskId: string, doc: string, updatedBy?: string): Promise<void>;
  touchTaskDocMetadata?(taskId: string, updatedBy?: string): Promise<void>;
  sync?(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }): Promise<void>;
  generateTaskId?(opts: { length: number; attempts: number }): Promise<string>;
};

export class BackendError extends Error {
  code: "E_BACKEND" | "E_NETWORK";
  constructor(message: string, code: "E_BACKEND" | "E_NETWORK") {
    super(message);
    this.code = code;
  }
}

export class RedmineUnavailable extends BackendError {
  constructor(message: string) {
    super(message, "E_NETWORK");
  }
}

export function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const bounded = Math.max(1, Math.floor(limit));
  const out: R[] = [];
  out.length = items.length;
  let nextIndex = 0;

  const worker = async (): Promise<void> => {
    for (;;) {
      const i = nextIndex;
      nextIndex++;
      if (i >= items.length) return;
      out[i] = await fn(items[i], i);
    }
  };

  const workers = Array.from({ length: Math.min(bounded, items.length) }, () => worker());
  await Promise.all(workers);
  return out;
}

export function normalizeDependsOn(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string" && v.trim() !== "[]");
  }
  if (typeof value === "string" && value.trim() === "[]") return [];
  return [];
}

export function normalizePriority(value: unknown): string {
  const raw = toStringSafe(value).trim().toLowerCase();
  if (!raw) return "med";
  if (raw === "low") return "low";
  if (raw === "normal") return "normal";
  if (raw === "medium" || raw === "med") return "med";
  if (raw === "high") return "high";
  if (raw === "urgent" || raw === "immediate") return "high";
  return "med";
}

export function defaultPlanApproval(): PlanApproval {
  return { state: "pending", updated_at: null, updated_by: null, note: null };
}

function normalizePlanApproval(value: unknown): PlanApproval | null {
  if (!isRecord(value)) return null;
  const state = typeof value.state === "string" ? value.state : "";
  if (state !== "pending" && state !== "approved" && state !== "rejected") return null;
  const updatedAt =
    value.updated_at === null || typeof value.updated_at === "string" ? value.updated_at : null;
  const updatedBy =
    value.updated_by === null || typeof value.updated_by === "string" ? value.updated_by : null;
  const note = value.note === null || typeof value.note === "string" ? value.note : null;
  return { state, updated_at: updatedAt, updated_by: updatedBy, note };
}

export function defaultVerificationResult(): VerificationResult {
  return { state: "pending", updated_at: null, updated_by: null, note: null };
}

function normalizeVerificationResult(value: unknown): VerificationResult | null {
  if (!isRecord(value)) return null;
  const state = typeof value.state === "string" ? value.state : "";
  if (state !== "pending" && state !== "ok" && state !== "needs_rework") return null;
  const updatedAt =
    value.updated_at === null || typeof value.updated_at === "string" ? value.updated_at : null;
  const updatedBy =
    value.updated_by === null || typeof value.updated_by === "string" ? value.updated_by : null;
  const note = value.note === null || typeof value.note === "string" ? value.note : null;
  return { state, updated_at: updatedAt, updated_by: updatedBy, note };
}

const TASK_EVENT_TYPES = new Set<TaskEventType>(["status", "comment", "verify"]);

function normalizeEvents(value: unknown): TaskEvent[] {
  if (!Array.isArray(value)) return [];
  const events: TaskEvent[] = [];
  for (const entry of value) {
    if (!isRecord(entry)) continue;
    const type = typeof entry.type === "string" ? entry.type : "";
    if (!TASK_EVENT_TYPES.has(type as TaskEventType)) continue;
    const at = typeof entry.at === "string" ? entry.at : "";
    const author = typeof entry.author === "string" ? entry.author : "";
    if (!at.trim() || !author.trim()) continue;
    events.push({
      type: type as TaskEventType,
      at,
      author,
      from: typeof entry.from === "string" ? entry.from : undefined,
      to: typeof entry.to === "string" ? entry.to : undefined,
      state: typeof entry.state === "string" ? entry.state : undefined,
      note: typeof entry.note === "string" ? entry.note : undefined,
      body: typeof entry.body === "string" ? entry.body : undefined,
    });
  }
  return events;
}

export function taskRecordToData(record: TaskRecord): TaskData {
  const fm = record.frontmatter as unknown as Record<string, unknown>;
  const comments = Array.isArray(fm.comments)
    ? fm.comments
        .filter((item) => isRecord(item))
        .filter(
          (item): item is { author: string; body: string } =>
            typeof item.author === "string" && typeof item.body === "string",
        )
        .map((item) => ({ author: item.author, body: item.body }))
    : [];
  const commit =
    isRecord(fm.commit) &&
    typeof fm.commit.hash === "string" &&
    typeof fm.commit.message === "string"
      ? { hash: fm.commit.hash, message: fm.commit.message }
      : null;
  const events = normalizeEvents(fm.events);
  const planApproval = normalizePlanApproval(fm.plan_approval);
  const verification = normalizeVerificationResult(fm.verification);

  const baseId = typeof fm.id === "string" ? fm.id : typeof record.id === "string" ? record.id : "";
  const task: TaskData = {
    id: baseId.trim(),
    title: typeof fm.title === "string" ? fm.title : "",
    description: typeof fm.description === "string" ? fm.description : "",
    status: typeof fm.status === "string" ? fm.status : "TODO",
    priority: typeof fm.priority === "string" || typeof fm.priority === "number" ? fm.priority : "",
    owner: typeof fm.owner === "string" ? fm.owner : "",
    depends_on: normalizeDependsOn(fm.depends_on),
    tags: toStringArray(fm.tags),
    verify: toStringArray(fm.verify),
    plan_approval: planApproval ?? undefined,
    verification: verification ?? undefined,
    commit,
    comments,
    events,
    doc_version: typeof fm.doc_version === "number" ? fm.doc_version : undefined,
    doc_updated_at: typeof fm.doc_updated_at === "string" ? fm.doc_updated_at : undefined,
    doc_updated_by: typeof fm.doc_updated_by === "string" ? fm.doc_updated_by : undefined,
    dirty: typeof fm.dirty === "boolean" ? fm.dirty : undefined,
    id_source: typeof fm.id_source === "string" ? fm.id_source : undefined,
  };

  const doc = extractTaskDoc(record.body);
  if (doc) task.doc = doc;

  return task;
}

function taskDataToExport(task: TaskData): TaskData & { dirty: boolean; id_source: string } {
  const base = {
    ...task,
    id: task.id,
    title: task.title ?? "",
    description: task.description ?? "",
    status: task.status ?? "",
    priority: typeof task.priority === "number" ? String(task.priority) : (task.priority ?? ""),
    owner: task.owner ?? "",
    depends_on: toStringArray(task.depends_on),
    tags: toStringArray(task.tags),
    verify: toStringArray(task.verify),
    commit: task.commit ?? null,
    comments: Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [],
    doc_version: task.doc_version ?? DOC_VERSION,
    doc_updated_at: task.doc_updated_at ?? "",
    doc_updated_by: resolveDocUpdatedByFromTask(task, DEFAULT_DOC_UPDATED_BY),
    dirty: Boolean(task.dirty),
    id_source: task.id_source ?? "generated",
  };

  const events = Array.isArray(task.events)
    ? task.events.filter(
        (event): event is TaskEvent =>
          !!event &&
          typeof event.type === "string" &&
          typeof event.at === "string" &&
          typeof event.author === "string",
      )
    : [];

  if (events.length > 0) return { ...base, events };
  return base;
}

export function buildTasksExportSnapshotFromTasks(tasks: TaskData[]): {
  tasks: TaskData[];
  meta: { schema_version: 1; managed_by: string; checksum_algo: "sha256"; checksum: string };
} {
  const exportTasks = tasks.map((task) => taskDataToExport(task));
  const sorted = exportTasks.toSorted((a, b) => a.id.localeCompare(b.id));
  const canonical = JSON.stringify(canonicalizeJson({ tasks: sorted }));
  const checksum = createHash("sha256").update(canonical, "utf8").digest("hex");
  return {
    tasks: sorted,
    meta: {
      schema_version: 1,
      managed_by: "agentplane",
      checksum_algo: "sha256",
      checksum,
    },
  };
}

export async function writeTasksExportFromTasks(opts: {
  outputPath: string;
  tasks: TaskData[];
}): Promise<void> {
  const snapshot = buildTasksExportSnapshotFromTasks(opts.tasks);
  await mkdir(path.dirname(opts.outputPath), { recursive: true });
  await writeJsonStableIfChanged(opts.outputPath, snapshot);
}
