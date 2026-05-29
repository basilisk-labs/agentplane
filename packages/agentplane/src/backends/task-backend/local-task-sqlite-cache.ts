import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

import { resolveAgentplaneCacheSqlitePath } from "../../shared/cache-paths.js";
import { ensureRuntimeSqliteGitignore } from "../../runtime/shared/runtime-gitignore.js";
import { openSqliteDatabase, type SqliteDatabase } from "../../shared/sqlite-driver.js";
import type { TaskSummary } from "./shared.js";
import {
  buildFingerprintCacheKey,
  buildGitCacheKey,
  buildReadmeFingerprintEntriesFromTasksDir,
  maybeRepoRootFromTasksDir,
  stableCacheKeyJson,
  type TaskProjectionCacheKey,
} from "./local-task-sqlite-cache-key.js";

export { parseTaskProjectionPorcelainPath } from "./local-task-sqlite-cache-key.js";

const TASK_SQLITE_SCHEMA_VERSION = 1;
const TASK_SQLITE_CACHE_OWNER = "local-task-projection";
const TASK_SQLITE_CACHE_FILENAME = "task-projection.sqlite";

type TaskProjectionMetadataRow = {
  owner?: unknown;
  schema_version?: unknown;
  tasks_dir?: unknown;
  cache_key_json?: unknown;
};

type TaskProjectionRow = {
  payload_json?: unknown;
};

export function resolveTaskProjectionSqlitePath(tasksDir: string): string {
  const gitRoot = maybeRepoRootFromTasksDir(tasksDir);
  if (gitRoot) {
    return resolveAgentplaneCacheSqlitePath(gitRoot);
  }
  return path.join(tasksDir, ".cache", TASK_SQLITE_CACHE_FILENAME);
}

function ensureTaskProjectionTables(db: SqliteDatabase): void {
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = NORMAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS agentplane_projection_owners (
      owner TEXT PRIMARY KEY,
      schema_version INTEGER NOT NULL,
      tasks_dir TEXT NOT NULL,
      cache_key_json TEXT NOT NULL,
      generated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS task_projection_summary (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL,
      owner TEXT NOT NULL,
      priority TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      payload_json TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS task_projection_tags (
      task_id TEXT NOT NULL,
      tag TEXT NOT NULL,
      PRIMARY KEY (task_id, tag)
    );
    CREATE TABLE IF NOT EXISTS task_projection_deps (
      task_id TEXT NOT NULL,
      dep_id TEXT NOT NULL,
      PRIMARY KEY (task_id, dep_id)
    );
    CREATE TABLE IF NOT EXISTS task_projection_comments (
      task_id TEXT NOT NULL,
      position INTEGER NOT NULL,
      author TEXT NOT NULL,
      body TEXT NOT NULL,
      PRIMARY KEY (task_id, position)
    );
  `);
}

function metadataMatches(
  row: TaskProjectionMetadataRow | undefined,
  tasksDir: string,
  cacheKey: TaskProjectionCacheKey,
): boolean {
  if (!row) return false;
  if (row.owner !== TASK_SQLITE_CACHE_OWNER) return false;
  if (row.schema_version !== TASK_SQLITE_SCHEMA_VERSION) return false;
  if (row.tasks_dir !== path.resolve(tasksDir)) return false;
  if (row.cache_key_json !== stableCacheKeyJson(cacheKey)) return false;
  return true;
}

function parseTaskSummaryPayload(value: unknown): TaskSummary | null {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    const task = parsed as TaskSummary;
    if (typeof task.id !== "string" || typeof task.title !== "string") return null;
    return task;
  } catch {
    return null;
  }
}

export async function readFreshSqliteTaskProjection(opts: {
  tasksDir: string;
  fingerprintEntries?: readonly { path: string; mtimeMs: number; size: number }[];
  status?: readonly string[];
}): Promise<TaskSummary[] | null> {
  const dbPath = resolveTaskProjectionSqlitePath(opts.tasksDir);
  if (!existsSync(dbPath)) return null;
  const fingerprintEntries =
    opts.fingerprintEntries ?? buildReadmeFingerprintEntriesFromTasksDir(opts.tasksDir);
  const cacheKey = fingerprintEntries ? buildFingerprintCacheKey(fingerprintEntries) : null;
  if (!cacheKey) return null;

  const db = await openSqliteDatabase(dbPath, { readonly: true });
  if (!db) return null;
  try {
    const row = db
      .prepare(
        "SELECT owner, schema_version, tasks_dir, cache_key_json FROM agentplane_projection_owners WHERE owner = ?",
      )
      .get(TASK_SQLITE_CACHE_OWNER) as TaskProjectionMetadataRow | undefined;
    if (!metadataMatches(row, opts.tasksDir, cacheKey)) return null;

    const statuses = [
      ...new Set(
        (opts.status ?? [])
          .map((status) => status.trim().toUpperCase())
          .filter((status) => status.length > 0),
      ),
    ];
    const rows =
      statuses.length > 0
        ? (db
            .prepare(
              `SELECT payload_json FROM task_projection_summary WHERE status IN (${statuses
                .map(() => "?")
                .join(", ")}) ORDER BY id`,
            )
            .all(...statuses) as TaskProjectionRow[])
        : (db
            .prepare("SELECT payload_json FROM task_projection_summary ORDER BY id")
            .all() as TaskProjectionRow[]);
    const tasks: TaskSummary[] = [];
    for (const item of rows) {
      const task = parseTaskSummaryPayload(item.payload_json);
      if (!task) return null;
      tasks.push(task);
    }
    return tasks;
  } catch {
    return null;
  } finally {
    db.close();
  }
}

export async function writeSqliteTaskProjection(opts: {
  tasksDir: string;
  tasks: readonly TaskSummary[];
  fingerprintEntries?: readonly { path: string; mtimeMs: number; size: number }[];
}): Promise<void> {
  const gitRoot = maybeRepoRootFromTasksDir(opts.tasksDir);
  if (gitRoot) await ensureRuntimeSqliteGitignore({ gitRoot }).catch(() => null);

  const dbPath = resolveTaskProjectionSqlitePath(opts.tasksDir);
  const cacheKey = opts.fingerprintEntries
    ? buildFingerprintCacheKey(opts.fingerprintEntries)
    : buildGitCacheKey(opts.tasksDir);
  if (!cacheKey) return;

  mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = await openSqliteDatabase(dbPath);
  if (!db) return;
  try {
    ensureTaskProjectionTables(db);
    const transaction = db.transaction((tasks: readonly TaskSummary[]) => {
      db.prepare("DELETE FROM task_projection_comments").run();
      db.prepare("DELETE FROM task_projection_deps").run();
      db.prepare("DELETE FROM task_projection_tags").run();
      db.prepare("DELETE FROM task_projection_summary").run();

      const insertSummary = db.prepare(
        "INSERT INTO task_projection_summary (id, status, owner, priority, title, description, payload_json) VALUES (?, ?, ?, ?, ?, ?, ?)",
      );
      const insertTag = db.prepare("INSERT INTO task_projection_tags (task_id, tag) VALUES (?, ?)");
      const insertDep = db.prepare(
        "INSERT INTO task_projection_deps (task_id, dep_id) VALUES (?, ?)",
      );
      const insertComment = db.prepare(
        "INSERT INTO task_projection_comments (task_id, position, author, body) VALUES (?, ?, ?, ?)",
      );

      for (const task of tasks) {
        insertSummary.run(
          task.id,
          task.status,
          task.owner,
          String(task.priority),
          task.title,
          task.description,
          JSON.stringify(task),
        );
        for (const tag of task.tags ?? []) {
          insertTag.run(task.id, tag);
        }
        for (const dep of task.depends_on ?? []) {
          insertDep.run(task.id, dep);
        }
        for (const [index, comment] of (task.comments ?? []).entries()) {
          insertComment.run(task.id, index, comment.author, comment.body);
        }
      }

      db.prepare(
        "INSERT INTO agentplane_projection_owners (owner, schema_version, tasks_dir, cache_key_json, generated_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(owner) DO UPDATE SET schema_version = excluded.schema_version, tasks_dir = excluded.tasks_dir, cache_key_json = excluded.cache_key_json, generated_at = excluded.generated_at",
      ).run(
        TASK_SQLITE_CACHE_OWNER,
        TASK_SQLITE_SCHEMA_VERSION,
        path.resolve(opts.tasksDir),
        stableCacheKeyJson(cacheKey),
        new Date().toISOString(),
      );
    });
    transaction(opts.tasks);
  } catch {
    // Best-effort derived cache; canonical README/index reads remain the fallback.
  } finally {
    db.close();
  }
}
