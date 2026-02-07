import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import {
  atomicWriteFile as atomicWriteFileCore,
  canonicalizeJson,
  docChanged,
  extractTaskDoc as extractTaskDocCore,
  generateTaskId as generateTaskIdCore,
  loadConfig,
  mergeTaskDoc as mergeTaskDocCore,
  parseTaskReadme,
  renderTaskReadme,
  resolveProject,
  TASK_ID_ALPHABET,
  taskReadmePath,
  type AgentplaneConfig,
  type ResolvedProject,
  type TaskRecord,
} from "@agentplaneorg/core";

import { loadDotEnv } from "../shared/env.js";
import { isRecord } from "../shared/guards.js";
import {
  buildTaskIndexEntry,
  loadTaskIndex,
  resolveTaskIndexPath,
  saveTaskIndex,
  type TaskIndexEntry,
} from "./task-index.js";

const TASK_ID_RE = new RegExp(String.raw`^\d{12}-[${TASK_ID_ALPHABET}]{4,}$`);
const DEFAULT_DOC_UPDATED_BY = "agentplane";
const DOC_VERSION = 2;

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

type AtomicWriteFile = (
  filePath: string,
  contents: string | Buffer,
  encoding?: BufferEncoding,
) => Promise<void>;
type ExtractTaskDoc = (body: string) => string;
type MergeTaskDoc = (body: string, doc: string) => string;
type GenerateTaskId = (opts: {
  length: number;
  attempts: number;
  isAvailable?: (taskId: string) => boolean | Promise<boolean>;
  date?: Date;
}) => Promise<string>;

const atomicWriteFile: AtomicWriteFile = atomicWriteFileCore;
const extractTaskDoc: ExtractTaskDoc = extractTaskDocCore;
const mergeTaskDoc: MergeTaskDoc = mergeTaskDocCore;
const generateTaskId: GenerateTaskId = generateTaskIdCore;

function nowIso(): string {
  return new Date().toISOString();
}

function toStringSafe(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }
  return "";
}

function firstNonEmptyString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return "";
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeUpdatedBy(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.toLowerCase() === DEFAULT_DOC_UPDATED_BY.toLowerCase()) return "";
  return trimmed;
}

function ensureDocMetadata(
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

function resolveDocUpdatedByFromFrontmatter(
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

function resolveDocUpdatedByFromTask(task: TaskData, fallback: string): string {
  const author = lastCommentAuthor(task.comments);
  if (author) return author;
  const existing = normalizeUpdatedBy(task.doc_updated_by);
  if (existing) return existing;
  const owner = normalizeUpdatedBy(task.owner);
  if (owner) return owner;
  const fallbackValue = normalizeUpdatedBy(fallback);
  return fallbackValue || fallback;
}

export { extractTaskDoc, mergeTaskDoc };

function validateTaskId(taskId: string): void {
  if (TASK_ID_RE.test(taskId)) return;
  throw new Error(`Invalid task id: ${taskId} (expected YYYYMMDDHHMM-XXXX)`);
}

function missingTaskIdMessage(): string {
  return "Missing task id (expected non-empty value)";
}

function unknownTaskIdMessage(taskId: string): string {
  return `Unknown task id: ${taskId}`;
}

function invalidLengthMessage(value: number, min: number): string {
  return `Invalid length: ${value} (expected >= ${min})`;
}

function redmineConfigMissingMessage(detail: string): string {
  return `Missing required Redmine config: ${detail}`;
}

function redmineIssueIdMissingMessage(): string {
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

type TaskDocMeta = Pick<TaskData, "doc" | "doc_version" | "doc_updated_at" | "doc_updated_by">;

export type TaskBackend = {
  id: string;
  listTasks(): Promise<TaskData[]>;
  getTask(taskId: string): Promise<TaskData | null>;
  writeTask(task: TaskData): Promise<void>;
  writeTasks?(tasks: TaskData[]): Promise<void>;
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

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function normalizeDependsOn(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string" && v.trim() !== "[]");
  }
  if (typeof value === "string" && value.trim() === "[]") return [];
  return [];
}

function normalizePriority(value: unknown): string {
  const raw = toStringSafe(value).trim().toLowerCase();
  if (!raw) return "med";
  if (raw === "low") return "low";
  if (raw === "normal") return "normal";
  if (raw === "medium" || raw === "med") return "med";
  if (raw === "high") return "high";
  if (raw === "urgent" || raw === "immediate") return "high";
  return "med";
}

function defaultPlanApproval(): PlanApproval {
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

function defaultVerificationResult(): VerificationResult {
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
  await atomicWriteFile(opts.outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
}

export class LocalBackend implements TaskBackend {
  id = "local";
  root: string;
  updatedBy: string;

  constructor(settings?: { dir?: string; updatedBy?: string }) {
    this.root = path.resolve(settings?.dir ?? ".agentplane/tasks");
    this.updatedBy = settings?.updatedBy ?? DEFAULT_DOC_UPDATED_BY;
  }

  async generateTaskId(opts: { length: number; attempts: number }): Promise<string> {
    const length = opts.length;
    if (length < 4) throw new Error(invalidLengthMessage(length, 4));
    const attempts = Math.max(1, opts.attempts);
    return await generateTaskId({
      length,
      attempts,
      isAvailable: async (taskId) => {
        const readmePath = taskReadmePath(this.root, taskId);
        try {
          await readFile(readmePath, "utf8");
          return false;
        } catch (err) {
          const code = (err as { code?: string } | null)?.code;
          if (code === "ENOENT") return true;
          throw err;
        }
      },
    });
  }

  async listTasks(): Promise<TaskData[]> {
    const tasks: TaskData[] = [];
    const entries = await readdir(this.root, { withFileTypes: true }).catch(() => []);
    const indexPath = resolveTaskIndexPath(this.root);
    const cachedIndex = await loadTaskIndex(indexPath);
    const cachedByPath = new Map<string, TaskIndexEntry>();
    if (cachedIndex) {
      for (const entry of cachedIndex.tasks) {
        cachedByPath.set(entry.readmePath, entry);
      }
    }
    const nextIndex: TaskIndexEntry[] = [];
    const seen = new Set<string>();
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const readme = path.join(this.root, entry.name, "README.md");
      let stats;
      try {
        stats = await stat(readme);
      } catch {
        continue;
      }
      if (!stats.isFile()) continue;
      const cached = cachedByPath.get(readme);
      if (cached?.mtimeMs === stats.mtimeMs) {
        const taskId = cached.task.id.trim();
        if (taskId) {
          validateTaskId(taskId);
          if (seen.has(taskId)) {
            throw new Error(`Duplicate task id in local backend: ${taskId}`);
          }
          seen.add(taskId);
        }
        tasks.push(cached.task);
        nextIndex.push(cached);
        continue;
      }
      let text = "";
      try {
        text = await readFile(readme, "utf8");
      } catch {
        continue;
      }
      let parsed;
      try {
        parsed = parseTaskReadme(text);
      } catch {
        continue;
      }
      const fm = parsed.frontmatter;
      if (!isRecord(fm) || Object.keys(fm).length === 0) continue;
      const taskId = (typeof fm.id === "string" ? fm.id : entry.name).trim();
      if (taskId) {
        validateTaskId(taskId);
        if (seen.has(taskId)) {
          throw new Error(`Duplicate task id in local backend: ${taskId}`);
        }
        seen.add(taskId);
      }
      const task = taskRecordToData({
        id: taskId,
        frontmatter: fm as unknown as TaskRecord["frontmatter"],
        body: parsed.body,
        readmePath: readme,
      });
      tasks.push(task);
      nextIndex.push(buildTaskIndexEntry(task, readme, stats.mtimeMs));
    }
    try {
      await saveTaskIndex(indexPath, { schema_version: 1, tasks: nextIndex });
    } catch {
      // Best-effort cache; ignore failures.
    }
    return tasks;
  }

  async getTask(taskId: string): Promise<TaskData | null> {
    const readme = taskReadmePath(this.root, taskId);
    let text = "";
    try {
      text = await readFile(readme, "utf8");
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code === "ENOENT") return null;
      throw err;
    }
    const parsed = parseTaskReadme(text);
    const task = taskRecordToData({
      id: taskId,
      frontmatter: parsed.frontmatter as unknown as TaskRecord["frontmatter"],
      body: parsed.body,
      readmePath: readme,
    });
    return task;
  }

  async getTaskDoc(taskId: string): Promise<string> {
    const readme = taskReadmePath(this.root, taskId);
    const text = await readFile(readme, "utf8");
    const parsed = parseTaskReadme(text);
    return extractTaskDoc(parsed.body);
  }

  async writeTask(task: TaskData): Promise<void> {
    const taskId = task.id.trim();
    if (!taskId) throw new Error(missingTaskIdMessage());
    validateTaskId(taskId);

    const readme = taskReadmePath(this.root, taskId);
    let body = "";
    let existingDoc = "";
    let existingFrontmatter: Record<string, unknown> = {};

    try {
      const text = await readFile(readme, "utf8");
      const parsed = parseTaskReadme(text);
      body = parsed.body;
      existingDoc = extractTaskDoc(parsed.body);
      existingFrontmatter = parsed.frontmatter;
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code !== "ENOENT") throw err;
    }

    const payload: Record<string, unknown> = { ...task };
    delete payload.doc;

    for (const [key, value] of Object.entries(payload)) {
      if (value === undefined) delete payload[key];
    }

    for (const key of ["doc_version", "doc_updated_at", "doc_updated_by"]) {
      if (payload[key] === undefined && existingFrontmatter[key] !== undefined) {
        payload[key] = existingFrontmatter[key];
      }
    }

    if (payload.plan_approval === undefined && existingFrontmatter.plan_approval !== undefined) {
      payload.plan_approval = existingFrontmatter.plan_approval;
    }
    if (payload.plan_approval === undefined) {
      payload.plan_approval = defaultPlanApproval();
    }

    if (payload.verification === undefined && existingFrontmatter.verification !== undefined) {
      payload.verification = existingFrontmatter.verification;
    }
    if (payload.verification === undefined) {
      payload.verification = defaultVerificationResult();
    }

    if (task.doc !== undefined) {
      const docText = String(task.doc ?? "");
      body = mergeTaskDoc(body, docText);
      if (docChanged(existingDoc, docText)) {
        payload.doc_version = DOC_VERSION;
        payload.doc_updated_at = nowIso();
        payload.doc_updated_by = resolveDocUpdatedByFromTask(task, this.updatedBy);
      }
    }

    if (payload.doc_version !== DOC_VERSION) {
      payload.doc_version = DOC_VERSION;
    }
    if (payload.doc_updated_at === undefined || payload.doc_updated_at === "") {
      payload.doc_updated_at = nowIso();
    }
    if (payload.doc_updated_by === undefined || payload.doc_updated_by === "") {
      payload.doc_updated_by = resolveDocUpdatedByFromTask(task, this.updatedBy);
    }

    await mkdir(path.dirname(readme), { recursive: true });
    const text = renderTaskReadme(payload, body || "");
    await atomicWriteFile(readme, text.endsWith("\n") ? text : `${text}\n`);
  }

  async setTaskDoc(taskId: string, doc: string, updatedBy?: string): Promise<void> {
    const readme = taskReadmePath(this.root, taskId);
    const text = await readFile(readme, "utf8");
    const parsed = parseTaskReadme(text);
    const docText = String(doc ?? "");
    const body = mergeTaskDoc(parsed.body, docText);
    const frontmatter = { ...parsed.frontmatter } as Record<string, unknown>;
    if (docChanged(extractTaskDoc(parsed.body), docText) || !frontmatter.doc_updated_at) {
      frontmatter.doc_version = DOC_VERSION;
      frontmatter.doc_updated_at = nowIso();
      frontmatter.doc_updated_by = resolveDocUpdatedByFromFrontmatter(
        frontmatter,
        updatedBy,
        this.updatedBy,
      );
    }
    if (frontmatter.doc_version !== DOC_VERSION) {
      frontmatter.doc_version = DOC_VERSION;
    }
    const next = renderTaskReadme(frontmatter, body);
    await atomicWriteFile(readme, next.endsWith("\n") ? next : `${next}\n`);
  }

  async touchTaskDocMetadata(taskId: string, updatedBy?: string): Promise<void> {
    const readme = taskReadmePath(this.root, taskId);
    const text = await readFile(readme, "utf8");
    const parsed = parseTaskReadme(text);
    const frontmatter = { ...parsed.frontmatter } as Record<string, unknown>;
    frontmatter.doc_version = DOC_VERSION;
    frontmatter.doc_updated_at = nowIso();
    frontmatter.doc_updated_by = resolveDocUpdatedByFromFrontmatter(
      frontmatter,
      updatedBy,
      this.updatedBy,
    );
    const next = renderTaskReadme(frontmatter, parsed.body || "");
    await atomicWriteFile(readme, next.endsWith("\n") ? next : `${next}\n`);
  }

  async writeTasks(tasks: TaskData[]): Promise<void> {
    for (const task of tasks) {
      await this.writeTask(task);
    }
  }

  async exportTasksJson(outputPath: string): Promise<void> {
    const tasks = await this.listTasks();
    await writeTasksExportFromTasks({ outputPath, tasks });
  }
}

type RedmineSettings = {
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

type BackendConfig = {
  id?: string;
  version?: number;
  module?: string;
  class?: string;
  settings?: Record<string, unknown>;
};

async function loadBackendConfig(configPath: string): Promise<BackendConfig | null> {
  try {
    const raw = JSON.parse(await readFile(configPath, "utf8")) as unknown;
    return isRecord(raw) ? (raw as BackendConfig) : null;
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

function resolveMaybeRelative(root: string, input: unknown): string | null {
  if (!input) return null;
  const raw = toStringSafe(input).trim();
  if (!raw) return null;
  return path.isAbsolute(raw) ? raw : path.join(root, raw);
}

function normalizeBackendConfig(raw: unknown): {
  id: string;
  version: number;
  settings: Record<string, unknown>;
} {
  if (!isRecord(raw)) {
    return { id: "local", version: 1, settings: {} };
  }
  const id = toStringSafe(raw.id).trim() || "local";
  const version = typeof raw.version === "number" ? raw.version : 1;
  const settings = isRecord(raw.settings) ? raw.settings : {};
  return { id, version, settings };
}

export async function loadTaskBackend(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<{
  backend: TaskBackend;
  backendId: string;
  resolved: ResolvedProject;
  config: AgentplaneConfig;
  backendConfigPath: string;
}> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const backendConfigPath = path.join(resolved.gitRoot, loaded.config.tasks_backend.config_path);
  const backendConfig = await loadBackendConfig(backendConfigPath);
  const normalized = normalizeBackendConfig(backendConfig);
  const backendId = normalized.id;
  const settings = normalized.settings;

  if (backendId === "redmine") {
    await loadDotEnv(resolved.gitRoot);
    const cacheDirRaw = resolveMaybeRelative(resolved.gitRoot, settings.cache_dir);
    const cacheDir = cacheDirRaw ?? path.join(resolved.gitRoot, loaded.config.paths.workflow_dir);
    const cache = cacheDir ? new LocalBackend({ dir: cacheDir }) : null;
    const redmine = new RedmineBackend(settings as RedmineSettings, { cache });
    return { backend: redmine, backendId, resolved, config: loaded.config, backendConfigPath };
  }

  const localDir =
    resolveMaybeRelative(resolved.gitRoot, settings.dir) ??
    path.join(resolved.gitRoot, loaded.config.paths.workflow_dir);
  const local = new LocalBackend({ dir: localDir });
  return { backend: local, backendId: "local", resolved, config: loaded.config, backendConfigPath };
}
