import { readFile } from "node:fs/promises";
import path from "node:path";

import { writeJsonStableIfChanged } from "../shared/write-if-changed.js";

import type { TaskData, TaskSummary } from "./task-backend.js";

export const TASK_INDEX_SCHEMA_VERSION = 2;
const TASK_INDEX_FILENAME = "tasks-index.v2.json";

export type TaskIndexReadmeFingerprintEntry = {
  path: string;
  mtimeMs: number;
  size: number;
};

export type TaskIndexReadmeFingerprint = {
  entries: TaskIndexReadmeFingerprintEntry[];
};

export type TaskIndexEntry = {
  task: TaskSummary;
  readmePath: string;
  mtimeMs: number;
  size?: number;
};

export type TaskIndexFileV2 = {
  schema_version: 2;
  readmes?: TaskIndexReadmeFingerprint;
  byId: Record<string, TaskIndexEntry>;
  byPath: Record<string, string>;
};

export type TaskIndexFile = TaskIndexFileV2;

export function resolveTaskIndexPath(tasksDir: string): string {
  const normalized = path.normalize(tasksDir);
  const parts = normalized.split(path.sep);
  const tail = parts.slice(-2).join(path.sep);
  if (tail === path.join(".agentplane", "tasks")) {
    const cacheDir = path.join(path.dirname(tasksDir), "cache");
    return path.join(cacheDir, TASK_INDEX_FILENAME);
  }
  const cacheDir = path.join(tasksDir, ".cache");
  return path.join(cacheDir, TASK_INDEX_FILENAME);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isTaskIndexEntry(value: unknown): value is TaskIndexEntry {
  if (!isRecord(value)) return false;
  if (!isRecord(value.task)) return false;
  if (typeof value.readmePath !== "string") return false;
  if (typeof value.mtimeMs !== "number") return false;
  const task = value.task;
  if (typeof task.id !== "string") return false;
  if (typeof task.title !== "string") return false;
  if (typeof task.description !== "string") return false;
  if (typeof task.status !== "string") return false;
  if (typeof task.owner !== "string") return false;
  if (!Array.isArray(task.depends_on)) return false;
  if (!Array.isArray(task.tags)) return false;
  if (!Array.isArray(task.verify)) return false;
  if (!Array.isArray(task.comments)) return false;
  return true;
}

function isTaskIndexReadmeFingerprintEntry(
  value: unknown,
): value is TaskIndexReadmeFingerprintEntry {
  if (!isRecord(value)) return false;
  if (typeof value.path !== "string") return false;
  if (typeof value.mtimeMs !== "number") return false;
  if (typeof value.size !== "number") return false;
  return true;
}

function isTaskIndexReadmeFingerprint(value: unknown): value is TaskIndexReadmeFingerprint {
  if (!isRecord(value)) return false;
  if (!Array.isArray(value.entries)) return false;
  return value.entries.every((entry) => isTaskIndexReadmeFingerprintEntry(entry));
}

function isTaskIndexFileV2(value: unknown): value is TaskIndexFileV2 {
  if (!isRecord(value)) return false;
  if (value.schema_version !== 2) return false;
  if (!isRecord(value.byId)) return false;
  if (!isRecord(value.byPath)) return false;
  if (value.readmes !== undefined && !isTaskIndexReadmeFingerprint(value.readmes)) return false;

  // Validate entries shallowly; be lenient so cache can still help even if partially corrupt.
  for (const entry of Object.values(value.byId)) {
    if (!isTaskIndexEntry(entry)) return false;
  }
  for (const v of Object.values(value.byPath)) {
    if (typeof v !== "string") return false;
  }
  return true;
}

async function readJsonFile(p: string): Promise<unknown> {
  let raw = "";
  try {
    raw = await readFile(p, "utf8");
  } catch {
    return null;
  }
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export async function loadTaskIndex(indexPath: string): Promise<TaskIndexFile | null> {
  const v2 = await readJsonFile(indexPath);
  if (v2 && isTaskIndexFileV2(v2)) return v2;
  return null;
}

export async function saveTaskIndex(indexPath: string, index: TaskIndexFileV2): Promise<void> {
  await writeJsonStableIfChanged(indexPath, index);
}

export function taskReadmeFingerprintEquals(
  left: TaskIndexReadmeFingerprint | undefined,
  right: TaskIndexReadmeFingerprint,
): boolean {
  if (!left) return false;
  if (left.entries.length !== right.entries.length) return false;
  for (let i = 0; i < right.entries.length; i += 1) {
    const a = left.entries[i];
    const b = right.entries[i];
    if (!a || !b) return false;
    if (a.path !== b.path || a.mtimeMs !== b.mtimeMs || a.size !== b.size) return false;
  }
  return true;
}

export function buildTaskIndexEntry(
  task: TaskData,
  readmePath: string,
  mtimeMs: number,
  size?: number,
): TaskIndexEntry {
  const { doc, sections, events, ...summary } = task;
  void doc;
  void sections;
  void events;

  // Keep the exact TaskSummary projection in the cache; read-heavy queries still need comments.
  const compactTask: TaskSummary = {
    ...summary,
    comments: Array.isArray(task.comments) ? task.comments : [],
  };
  return {
    task: compactTask,
    readmePath,
    mtimeMs,
    ...(size === undefined ? {} : { size }),
  };
}
