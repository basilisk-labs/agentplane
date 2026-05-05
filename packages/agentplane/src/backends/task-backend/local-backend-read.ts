import { execFile } from "node:child_process";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
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
  type TaskIndexEntry,
} from "../task-index.js";

import {
  mapLimit,
  taskRecordToData,
  validateTaskId,
  type TaskData,
  type TaskSummary,
} from "./shared.js";
import { type LocalBackendContext } from "./local-backend-state.js";

const execFileAsync = promisify(execFile);

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

function sortedCachedProjection(cachedIndex: {
  byId: Record<string, TaskIndexEntry>;
}): TaskSummary[] {
  return Object.values(cachedIndex.byId)
    .map((entry) => entry.task)
    .toSorted((a, b) => a.id.localeCompare(b.id));
}

async function hasGitTaskReadmeChanges(tasksDir: string): Promise<boolean | null> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["-C", tasksDir, "status", "--porcelain", "--untracked-files=all", "--", tasksDir],
      { encoding: "utf8", maxBuffer: 1024 * 1024 },
    );
    return stdout
      .split("\n")
      .some((line) => line.trim().length > 0 && /(^|[/\\])README\.md"?$/u.test(line.trim()));
  } catch {
    return null;
  }
}

async function readFreshCachedProjection(opts: {
  context: LocalBackendContext;
  cachedIndex: Awaited<ReturnType<typeof loadTaskIndex>>;
}): Promise<TaskSummary[] | null> {
  if (!opts.cachedIndex) return null;

  const hasReadmeChanges = await hasGitTaskReadmeChanges(opts.context.root);
  if (hasReadmeChanges !== false) return null;

  opts.context.setLastListWarnings?.([]);
  return sortedCachedProjection(opts.cachedIndex);
}

export async function listLocalTasks(
  context: LocalBackendContext,
  mode: "full" | "projection",
  opts: { writeIndex?: boolean } = {},
): Promise<TaskData[] | TaskSummary[]> {
  const projectionOnly = mode === "projection";
  const writeIndex = opts.writeIndex ?? true;
  const tasks: (TaskData | TaskSummary)[] = [];
  const warnings: string[] = [];
  const entries = await readdir(context.root, { withFileTypes: true }).catch(() => []);
  const indexPath = resolveTaskIndexPath(context.root);
  const cachedIndex = await loadTaskIndex(indexPath);
  if (projectionOnly) {
    const cachedProjection = await readFreshCachedProjection({ context, cachedIndex });
    if (cachedProjection) return cachedProjection;
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

  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted();

  type ListTaskResult = {
    output: TaskData | TaskSummary;
    index: TaskIndexEntry;
  };

  const results = await mapLimit<string, ListTaskResult | null>(dirs, 32, async (dirName) => {
    const readmePath = path.join(context.root, dirName, "README.md");
    let stats;
    try {
      stats = await stat(readmePath);
    } catch {
      warnings.push(`skip:${dirName}: missing_or_unreadable_readme`);
      return null;
    }
    if (!stats.isFile()) return null;

    const cached = cachedEntryByPath.get(readmePath);
    if (projectionOnly && cached?.mtimeMs === stats.mtimeMs) {
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

    const index = buildTaskIndexEntry(task, readmePath, stats.mtimeMs);
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
      await saveTaskIndex(indexPath, { schema_version: 2, byId: nextById, byPath: nextByPath });
    } catch {
      // Best-effort cache; ignore failures.
    }
  }

  context.setLastListWarnings?.(warnings);
  return tasks;
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
