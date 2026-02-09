import { readFile } from "node:fs/promises";
import path from "node:path";

import { writeJsonStableIfChanged } from "../shared/write-if-changed.js";

import type { TaskData } from "./task-backend.js";

export const TASK_INDEX_SCHEMA_VERSION = 2;
const TASK_INDEX_FILENAME = "tasks-index.v2.json";
const LEGACY_TASK_INDEX_FILENAME = "tasks-index.v1.json";

export type TaskIndexEntry = {
  task: TaskData;
  readmePath: string;
  mtimeMs: number;
};

export type TaskIndexFileV1 = {
  schema_version: 1;
  tasks: TaskIndexEntry[];
};

export type TaskIndexFileV2 = {
  schema_version: 2;
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

function resolveLegacyIndexPath(indexPath: string): string {
  // Best-effort migration path: when upgrading from v1->v2, the v1 file may still exist.
  const dir = path.dirname(indexPath);
  return path.join(dir, LEGACY_TASK_INDEX_FILENAME);
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
  return true;
}

function toV2FromEntries(entries: TaskIndexEntry[]): TaskIndexFileV2 {
  const byId: Record<string, TaskIndexEntry> = {};
  const byPath: Record<string, string> = {};
  for (const entry of entries) {
    const id = entry.task.id;
    if (typeof id !== "string" || !id.trim()) continue;
    byId[id] = entry;
    byPath[entry.readmePath] = id;
  }
  return { schema_version: 2, byId, byPath };
}

function isTaskIndexFileV2(value: unknown): value is TaskIndexFileV2 {
  if (!isRecord(value)) return false;
  if (value.schema_version !== 2) return false;
  if (!isRecord(value.byId)) return false;
  if (!isRecord(value.byPath)) return false;

  // Validate entries shallowly; be lenient so cache can still help even if partially corrupt.
  for (const entry of Object.values(value.byId)) {
    if (!isTaskIndexEntry(entry)) return false;
  }
  for (const v of Object.values(value.byPath)) {
    if (typeof v !== "string") return false;
  }
  return true;
}

function isTaskIndexFileV1(value: unknown): value is TaskIndexFileV1 {
  if (!isRecord(value)) return false;
  if (value.schema_version !== 1) return false;
  if (!Array.isArray(value.tasks)) return false;
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

  const legacyPath = resolveLegacyIndexPath(indexPath);
  const v1 = await readJsonFile(legacyPath);
  if (v1 && isTaskIndexFileV1(v1)) {
    const entries = v1.tasks.filter((entry) => isTaskIndexEntry(entry));
    return toV2FromEntries(entries);
  }
  return null;
}

export async function saveTaskIndex(indexPath: string, index: TaskIndexFileV2): Promise<void> {
  await writeJsonStableIfChanged(indexPath, index);
}

export function buildTaskIndexEntry(
  task: TaskData,
  readmePath: string,
  mtimeMs: number,
): TaskIndexEntry {
  return {
    task,
    readmePath,
    mtimeMs,
  };
}
