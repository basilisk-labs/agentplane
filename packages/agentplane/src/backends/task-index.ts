import { readFile } from "node:fs/promises";
import path from "node:path";

import { writeJsonStableIfChanged } from "../shared/write-if-changed.js";

import type { TaskData } from "./task-backend.js";

export const TASK_INDEX_SCHEMA_VERSION = 1;
const TASK_INDEX_FILENAME = "tasks-index.v1.json";

export type TaskIndexEntry = {
  task: TaskData;
  readmePath: string;
  mtimeMs: number;
};

export type TaskIndexFile = {
  schema_version: 1;
  tasks: TaskIndexEntry[];
};

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
  return true;
}

export async function loadTaskIndex(indexPath: string): Promise<TaskIndexFile | null> {
  let raw = "";
  try {
    raw = await readFile(indexPath, "utf8");
  } catch {
    return null;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
  if (!isRecord(parsed)) return null;
  if (parsed.schema_version !== TASK_INDEX_SCHEMA_VERSION) return null;
  if (!Array.isArray(parsed.tasks)) return null;
  const tasks = parsed.tasks.filter((entry) => isTaskIndexEntry(entry));
  return { schema_version: TASK_INDEX_SCHEMA_VERSION, tasks };
}

export async function saveTaskIndex(indexPath: string, index: TaskIndexFile): Promise<void> {
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
