import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import type { TaskRecord } from "@agentplaneorg/core/tasks";
import { parseTaskReadme, taskReadmePath } from "@agentplaneorg/core/tasks";
import {
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
} from "@agentplaneorg/core/schemas";

import { isRecord } from "../../shared/guards.js";
import {
  buildTaskIndexEntry,
  loadTaskIndex,
  resolveTaskIndexPath,
  saveTaskIndex,
  taskReadmeFingerprintEquals,
  type TaskIndexEntry,
  type TaskIndexReadmeFingerprint,
  type TaskIndexReadmeFingerprintEntry,
} from "../task-index.js";

import {
  readFreshSqliteTaskProjection,
  writeSqliteTaskProjection,
} from "./local-task-sqlite-cache.js";
import {
  mapLimit,
  taskRecordToData,
  validateTaskId,
  type TaskData,
  type TaskSummary,
} from "./shared.js";
import { type LocalBackendContext } from "./local-backend-state.js";

function resolveTaskFrontmatterId(
  frontmatter: Record<string, unknown>,
  fallbackTaskId: string,
): string {
  return typeof frontmatter.id === "string" && frontmatter.id.trim().length > 0
    ? frontmatter.id
    : fallbackTaskId;
}

function taskDataFromParsedReadme(opts: {
  taskId: string;
  readmePath: string;
  frontmatter: Record<string, unknown>;
  body: string;
}): TaskData {
  const frontmatter = validateTaskReadmeFrontmatter(
    withTaskReadmeFrontmatterDefaults({
      ...opts.frontmatter,
      id: resolveTaskFrontmatterId(opts.frontmatter, opts.taskId),
    }),
  );
  return taskRecordToData({
    id: opts.taskId,
    frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
    body: opts.body,
    readmePath: opts.readmePath,
  });
}

async function readRequiredTask(context: LocalBackendContext, taskId: string): Promise<TaskData> {
  const readmePath = taskReadmePath(context.root, taskId);
  const text = await readFile(readmePath, "utf8");
  const parsed = parseTaskReadme(text);
  return taskDataFromParsedReadme({
    taskId,
    readmePath,
    frontmatter: parsed.frontmatter,
    body: parsed.body,
  });
}

function sortedCachedProjection(
  cachedIndex: { byId: Record<string, TaskIndexEntry> },
  statuses?: ReadonlySet<string>,
): TaskSummary[] {
  return Object.values(cachedIndex.byId)
    .map((entry) => entry.task)
    .filter((task) => !statuses || statuses.has(String(task.status).trim().toUpperCase()))
    .toSorted((a, b) => a.id.localeCompare(b.id));
}

function normalizeProjectionStatusFilter(statuses?: readonly string[]): Set<string> | undefined {
  const normalized = new Set(
    (statuses ?? [])
      .map((status) => status.trim().toUpperCase())
      .filter((status) => status.length > 0),
  );
  return normalized.size > 0 ? normalized : undefined;
}

type ReadmeStatEntry = {
  dirName: string;
  readmePath: string;
  mtimeMs: number;
  size: number;
};

function buildReadmeFingerprint(entries: ReadmeStatEntry[]): TaskIndexReadmeFingerprint {
  return {
    entries: entries.map(
      (entry): TaskIndexReadmeFingerprintEntry => ({
        path: entry.readmePath,
        mtimeMs: entry.mtimeMs,
        size: entry.size,
      }),
    ),
  };
}

function readFreshCachedProjection(opts: {
  cachedIndex: Awaited<ReturnType<typeof loadTaskIndex>>;
  fingerprint: TaskIndexReadmeFingerprint;
  hasMissingReadmes: boolean;
  statuses?: ReadonlySet<string>;
}): TaskSummary[] | null {
  if (!opts.cachedIndex) return null;
  if (opts.hasMissingReadmes) return null;
  if (!taskReadmeFingerprintEquals(opts.cachedIndex.readmes, opts.fingerprint)) return null;
  return sortedCachedProjection(opts.cachedIndex, opts.statuses);
}

async function isHandoffOnlyTaskDir(root: string, dirName: string): Promise<boolean> {
  try {
    const entries = await readdir(path.join(root, dirName), { withFileTypes: true });
    return (
      entries.length === 1 && entries[0]?.isDirectory() === true && entries[0].name === "handoff"
    );
  } catch {
    return false;
  }
}

export async function listLocalTasks(
  context: LocalBackendContext,
  mode: "full" | "projection",
  opts: { writeIndex?: boolean; status?: readonly string[] } = {},
): Promise<TaskData[] | TaskSummary[]> {
  const projectionOnly = mode === "projection";
  const writeIndex = opts.writeIndex ?? true;
  const projectionStatuses = normalizeProjectionStatusFilter(opts.status);
  if (projectionOnly) {
    const sqliteProjection = await readFreshSqliteTaskProjection({
      tasksDir: context.root,
      status: opts.status,
    });
    if (sqliteProjection) {
      context.setLastListWarnings?.([]);
      return sqliteProjection;
    }
  }

  const tasks: (TaskData | TaskSummary)[] = [];
  const warnings: string[] = [];
  const entries = await readdir(context.root, { withFileTypes: true }).catch(() => []);
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted();

  const readmeStats: ReadmeStatEntry[] = [];
  let hasMissingReadmes = false;
  for (const dirName of dirs) {
    const readmePath = path.join(context.root, dirName, "README.md");
    try {
      const stats = await stat(readmePath);
      if (stats.isFile()) {
        readmeStats.push({
          dirName,
          readmePath,
          mtimeMs: stats.mtimeMs,
          size: stats.size,
        });
      } else {
        if (!(await isHandoffOnlyTaskDir(context.root, dirName))) hasMissingReadmes = true;
      }
    } catch {
      if (!(await isHandoffOnlyTaskDir(context.root, dirName))) hasMissingReadmes = true;
    }
  }
  const readmeStatsByDir = new Map(readmeStats.map((entry) => [entry.dirName, entry]));
  const readmeFingerprint = buildReadmeFingerprint(readmeStats);
  const indexPath = resolveTaskIndexPath(context.root);
  const cachedIndex = await loadTaskIndex(indexPath);
  if (projectionOnly) {
    const cachedProjection = readFreshCachedProjection({
      cachedIndex,
      fingerprint: readmeFingerprint,
      hasMissingReadmes,
      statuses: projectionStatuses,
    });
    if (cachedProjection) {
      if (!projectionStatuses) {
        await writeSqliteTaskProjection({
          tasksDir: context.root,
          tasks: cachedProjection,
          fingerprintEntries: readmeFingerprint.entries,
        });
      }
      context.setLastListWarnings?.([]);
      return cachedProjection;
    }
  }
  const cachedEntryByPath = new Map<string, TaskIndexEntry>();
  if (cachedIndex) {
    for (const [readmePath, taskId] of Object.entries(cachedIndex.byPath)) {
      const entry = cachedIndex.byId[taskId];
      if (entry) cachedEntryByPath.set(readmePath, entry);
    }
  }
  let indexDirty = cachedIndex === null;
  const nextById: Record<string, TaskIndexEntry> = {};
  const nextByPath: Record<string, string> = {};
  const seen = new Set<string>();

  type ListTaskResult = {
    output: TaskData | TaskSummary;
    index: TaskIndexEntry;
  };

  const results = await mapLimit<string, ListTaskResult | null>(dirs, 32, async (dirName) => {
    const readmePath = path.join(context.root, dirName, "README.md");
    const stats = readmeStatsByDir.get(dirName);
    if (!stats) {
      if (await isHandoffOnlyTaskDir(context.root, dirName)) return null;
      warnings.push(`skip:${dirName}: missing_or_unreadable_readme`);
      return null;
    }

    const cached = cachedEntryByPath.get(readmePath);
    if (projectionOnly && cached?.mtimeMs === stats.mtimeMs && cached.size === stats.size) {
      return { output: cached.task, index: cached };
    }
    if (cached?.mtimeMs !== stats.mtimeMs) {
      indexDirty = true;
    }

    let text = "";
    try {
      text = await readFile(readmePath, "utf8");
    } catch {
      warnings.push(`skip:${dirName}: unreadable_readme`);
      return null;
    }

    let parsed;
    try {
      parsed = parseTaskReadme(text);
    } catch {
      warnings.push(`skip:${dirName}: invalid_readme_frontmatter`);
      return null;
    }

    const frontmatter = parsed.frontmatter;
    if (!isRecord(frontmatter) || Object.keys(frontmatter).length === 0) {
      warnings.push(`skip:${dirName}: empty_or_invalid_frontmatter`);
      return null;
    }

    const taskId = resolveTaskFrontmatterId(frontmatter, dirName).trim();
    let task;
    try {
      task = taskDataFromParsedReadme({
        taskId,
        readmePath,
        frontmatter,
        body: parsed.body,
      });
    } catch {
      warnings.push(`skip:${dirName}: invalid_readme_frontmatter`);
      return null;
    }

    const index = buildTaskIndexEntry(task, readmePath, stats.mtimeMs, stats.size);
    return {
      output: projectionOnly ? index.task : task,
      index,
    };
  });

  for (const result of results) {
    if (!result) continue;
    const taskId = result.index.task.id.trim();
    if (taskId) {
      validateTaskId(taskId);
      if (seen.has(taskId)) throw new Error(`Duplicate task id in local backend: ${taskId}`);
      seen.add(taskId);
    }
    tasks.push(result.output);
    if (taskId) {
      nextById[taskId] = result.index;
      nextByPath[result.index.readmePath] = taskId;
    }
  }

  if (cachedIndex && indexDirty === false) {
    const cachedPaths = Object.keys(cachedIndex.byPath);
    const nextPaths = Object.keys(nextByPath);
    if (cachedPaths.length === nextPaths.length) {
      for (const readmePath of nextPaths) {
        if (cachedIndex.byPath[readmePath] === nextByPath[readmePath]) continue;
        indexDirty = true;
        break;
      }
    } else {
      indexDirty = true;
    }
  }

  if (indexDirty && writeIndex) {
    try {
      await saveTaskIndex(indexPath, {
        schema_version: 2,
        readmes: readmeFingerprint,
        byId: nextById,
        byPath: nextByPath,
      });
    } catch {
      // Best-effort cache; ignore failures.
    }
  }

  if (warnings.length === 0) {
    await writeSqliteTaskProjection({
      tasksDir: context.root,
      tasks: Object.values(nextById).map((entry) => entry.task),
      fingerprintEntries: readmeFingerprint.entries,
    });
  }

  context.setLastListWarnings?.(warnings);
  return projectionOnly && projectionStatuses
    ? tasks.filter((task) => projectionStatuses.has(String(task.status).trim().toUpperCase()))
    : tasks;
}

export async function getLocalTask(
  context: LocalBackendContext,
  taskId: string,
): Promise<TaskData | null> {
  const readmePath = taskReadmePath(context.root, taskId);
  let text = "";
  try {
    text = await readFile(readmePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
  const parsed = parseTaskReadme(text);
  return taskDataFromParsedReadme({
    taskId,
    readmePath,
    frontmatter: parsed.frontmatter,
    body: parsed.body,
  });
}

export async function getLocalTasks(
  context: LocalBackendContext,
  taskIds: string[],
): Promise<(TaskData | null)[]> {
  return await mapLimit(taskIds, 8, async (taskId) => await getLocalTask(context, taskId));
}

export async function getLocalTaskDoc(
  context: LocalBackendContext,
  taskId: string,
): Promise<string> {
  const task = await readRequiredTask(context, taskId);
  return task.doc ?? "";
}
