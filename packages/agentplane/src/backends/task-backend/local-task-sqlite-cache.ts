import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

import { resolveAgentplaneCacheSqlitePath } from "../../shared/cache-paths.js";
import { ensureRuntimeSqliteGitignore } from "../../runtime/shared/runtime-gitignore.js";
import { openSqliteDatabase, type SqliteDatabase } from "../../shared/sqlite-driver.js";
import type { TaskSummary } from "./shared.js";

const TASK_SQLITE_SCHEMA_VERSION = 1;
const TASK_SQLITE_CACHE_OWNER = "local-task-projection";
const TASK_SQLITE_CACHE_FILENAME = "task-projection.sqlite";

type TaskProjectionCacheKey =
  | {
      mode: "git";
      gitRoot: string;
      tasksPath: string;
      head: string;
      status: string[];
      dirtyFiles: { path: string; sha256: string | null; size: number | null }[];
    }
  | {
      mode: "fingerprint";
      entries: { path: string; mtimeMs: number; size: number }[];
    };

type TaskProjectionMetadataRow = {
  owner?: unknown;
  schema_version?: unknown;
  tasks_dir?: unknown;
  cache_key_json?: unknown;
};

type TaskProjectionRow = {
  payload_json?: unknown;
};

function toPosix(value: string): string {
  return value.split(path.sep).join("/");
}

function sha256Buffer(value: Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function maybeRepoRootFromTasksDir(tasksDir: string): string | null {
  const resolved = path.resolve(tasksDir);
  if (path.basename(resolved) !== "tasks") return null;
  const agentplaneDir = path.dirname(resolved);
  if (path.basename(agentplaneDir) !== ".agentplane") return null;
  const gitRoot = path.dirname(agentplaneDir);
  if (!existsSync(path.join(gitRoot, ".git"))) return null;
  return gitRoot;
}

export function resolveTaskProjectionSqlitePath(tasksDir: string): string {
  const gitRoot = maybeRepoRootFromTasksDir(tasksDir);
  if (gitRoot) {
    return resolveAgentplaneCacheSqlitePath(gitRoot);
  }
  return path.join(tasksDir, ".cache", TASK_SQLITE_CACHE_FILENAME);
}

function gitOutput(gitRoot: string, args: string[]): string {
  return execFileSync("git", args, {
    cwd: gitRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function gitStatusPorcelainRecords(gitRoot: string, args: string[]): string[] {
  const out = execFileSync("git", args, {
    cwd: gitRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  if (!out) return [];
  const parts = out.split("\0").filter((part) => part.length > 0);
  const records: string[] = [];
  for (let index = 0; index < parts.length; index += 1) {
    const record = parts[index] ?? "";
    records.push(record);
    if (/[RC]/u.test(record.slice(0, 2))) {
      index += 1;
    }
  }
  return records;
}

function walkFilesSync(targetPath: string): string[] {
  const details = statSync(targetPath);
  if (details.isFile()) return [targetPath];
  if (!details.isDirectory()) return [];
  const files: string[] = [];
  const entries = readdirSync(targetPath, { withFileTypes: true }).toSorted((a, b) =>
    a.name.localeCompare(b.name),
  );
  for (const entry of entries) {
    const childPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFilesSync(childPath));
      continue;
    }
    if (entry.isFile()) files.push(childPath);
  }
  return files;
}

export function parseTaskProjectionPorcelainPath(line: string): string | null {
  const statusCode = line.slice(0, 2);
  const raw = line.length > 3 ? line.slice(3).trim() : "";
  if (!raw) return null;
  const renameSeparator = " -> ";
  const pathToken =
    /[RC]/u.test(statusCode) && raw.includes(renameSeparator)
      ? (raw.split(renameSeparator).at(-1) ?? "")
      : raw;
  return unquotePorcelainPath(pathToken);
}

function unquotePorcelainPath(raw: string): string {
  if (!(raw.startsWith('"') && raw.endsWith('"'))) return raw;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed === "string") return parsed;
  } catch {
    // Fall through to a conservative dequote below.
  }
  return raw
    .slice(1, -1)
    .replaceAll(String.raw`\"`, '"')
    .replaceAll(String.raw`\\`, "\\");
}

function dirtyFileEntries(
  gitRoot: string,
  status: string[],
): { path: string; sha256: string | null; size: number | null }[] {
  const seen = new Set<string>();
  const files: { path: string; sha256: string | null; size: number | null }[] = [];
  for (const line of status) {
    const relPath = parseTaskProjectionPorcelainPath(line);
    if (!relPath || seen.has(relPath)) continue;
    seen.add(relPath);
    const absolutePath = path.join(gitRoot, relPath);
    if (!existsSync(absolutePath)) {
      files.push({ path: toPosix(relPath), sha256: null, size: null });
      continue;
    }
    let targetFiles: string[] = [];
    try {
      targetFiles = walkFilesSync(absolutePath);
    } catch {
      files.push({ path: toPosix(relPath), sha256: null, size: null });
      continue;
    }
    for (const targetFile of targetFiles) {
      const relativeFile = toPosix(path.relative(gitRoot, targetFile));
      if (seen.has(relativeFile)) continue;
      seen.add(relativeFile);
      const content = readFileSync(targetFile);
      files.push({
        path: relativeFile,
        sha256: sha256Buffer(content),
        size: content.byteLength,
      });
    }
  }
  return files.toSorted((a, b) => a.path.localeCompare(b.path));
}

function buildGitCacheKey(tasksDir: string): TaskProjectionCacheKey | null {
  const gitRoot = maybeRepoRootFromTasksDir(tasksDir);
  if (!gitRoot) return null;
  const relativeTasksPath = toPosix(path.relative(gitRoot, path.resolve(tasksDir)));
  try {
    const head = gitOutput(gitRoot, ["rev-parse", "HEAD"]);
    const status = gitStatusPorcelainRecords(gitRoot, [
      "status",
      "--porcelain=v1",
      "-z",
      "--untracked-files=all",
      "--",
      relativeTasksPath,
    ]);
    return {
      mode: "git",
      gitRoot,
      tasksPath: relativeTasksPath,
      head,
      status,
      dirtyFiles: dirtyFileEntries(gitRoot, status),
    };
  } catch {
    return null;
  }
}

function buildFingerprintCacheKey(
  entries: readonly { path: string; mtimeMs: number; size: number }[],
): TaskProjectionCacheKey {
  return {
    mode: "fingerprint",
    entries: entries.map((entry) => ({
      path: entry.path,
      mtimeMs: entry.mtimeMs,
      size: entry.size,
    })),
  };
}

function stableCacheKeyJson(key: TaskProjectionCacheKey): string {
  return JSON.stringify(key);
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
}): Promise<TaskSummary[] | null> {
  const dbPath = resolveTaskProjectionSqlitePath(opts.tasksDir);
  if (!existsSync(dbPath)) return null;
  const gitCacheKey = buildGitCacheKey(opts.tasksDir);
  const cacheKey =
    gitCacheKey ??
    (opts.fingerprintEntries ? buildFingerprintCacheKey(opts.fingerprintEntries) : null);
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

    const rows = db
      .prepare("SELECT payload_json FROM task_projection_summary ORDER BY id")
      .all() as TaskProjectionRow[];
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
  if (gitRoot) await ensureRuntimeSqliteGitignore({ gitRoot });

  const dbPath = resolveTaskProjectionSqlitePath(opts.tasksDir);
  const gitCacheKey = buildGitCacheKey(opts.tasksDir);
  const cacheKey =
    gitCacheKey ??
    (opts.fingerprintEntries ? buildFingerprintCacheKey(opts.fingerprintEntries) : null);
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
