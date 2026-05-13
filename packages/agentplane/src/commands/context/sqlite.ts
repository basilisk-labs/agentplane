/* eslint-disable @typescript-eslint/no-base-to-string */
import { mkdirSync } from "node:fs";
import path from "node:path";

import { openSqliteDatabase, type SqliteDatabase } from "../../shared/sqlite-driver.js";

type SqliteProjectionRow = {
  path: string;
  sha256: string;
  content_type: string;
  projection_version: number;
  indexed_at: string;
  size_bytes: number;
  kind: string;
  body: string;
  source_refs?: string[];
};

type SqliteProjection = {
  metadata: {
    projection_version: number;
    generated_at: string;
    workspace_hash: string;
    include_tasks: boolean;
    include_raw: boolean;
  };
  rows: SqliteProjectionRow[];
};

type SqliteProjectionMetadataRow = {
  projection_version?: unknown;
  generated_at?: unknown;
  workspace_hash?: unknown;
  include_tasks?: unknown;
  include_raw?: unknown;
};

type SqliteProjectionRowRecord = {
  path?: unknown;
  sha256?: unknown;
  content_type?: unknown;
  projection_version?: unknown;
  indexed_at?: unknown;
  size_bytes?: unknown;
  kind?: unknown;
  body?: unknown;
  source_refs?: unknown;
};

async function openRequiredDatabase(
  dbPath: string,
  opts?: { readonly?: boolean },
): Promise<SqliteDatabase> {
  const db = await openSqliteDatabase(dbPath, {
    readonly: opts?.readonly === true,
    fileMustExist: opts?.readonly === true,
  });
  if (!db) {
    throw new Error("better-sqlite3 driver is required for AgentPlane SQLite projections.");
  }
  return db;
}

function refsToJson(refs: string[] | undefined): string {
  return JSON.stringify(Array.isArray(refs) ? refs : []);
}

function parseRefs(raw: unknown): string[] {
  if (typeof raw !== "string" || raw.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

function resetContextProjectionSchema(db: SqliteDatabase): void {
  db.exec(`
    DROP TABLE IF EXISTS projection_metadata;
    DROP TABLE IF EXISTS projection_rows;
    DROP TABLE IF EXISTS projection_fts;
    CREATE TABLE projection_metadata (
      projection_version INTEGER NOT NULL,
      generated_at TEXT NOT NULL,
      workspace_hash TEXT NOT NULL,
      include_tasks INTEGER NOT NULL,
      include_raw INTEGER NOT NULL
    );
    CREATE TABLE projection_rows (
      path TEXT PRIMARY KEY,
      sha256 TEXT NOT NULL,
      content_type TEXT NOT NULL,
      projection_version INTEGER NOT NULL,
      indexed_at TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      kind TEXT NOT NULL,
      body TEXT NOT NULL,
      source_refs TEXT NOT NULL
    );
    CREATE VIRTUAL TABLE projection_fts USING fts5(
      path,
      body,
      content='projection_rows',
      content_rowid='rowid'
    );
  `);
}

export async function writeSqliteProjection(
  dbPath: string,
  projection: SqliteProjection,
): Promise<void> {
  mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = await openRequiredDatabase(dbPath);
  try {
    db.pragma("journal_mode = WAL");
    db.pragma("synchronous = NORMAL");
    const transaction = db.transaction((payload: SqliteProjection) => {
      resetContextProjectionSchema(db);
      db.prepare(
        "INSERT INTO projection_metadata (projection_version, generated_at, workspace_hash, include_tasks, include_raw) VALUES (?, ?, ?, ?, ?)",
      ).run(
        payload.metadata.projection_version,
        payload.metadata.generated_at,
        payload.metadata.workspace_hash,
        payload.metadata.include_tasks ? 1 : 0,
        payload.metadata.include_raw ? 1 : 0,
      );

      const insertRow = db.prepare(
        "INSERT INTO projection_rows (path, sha256, content_type, projection_version, indexed_at, size_bytes, kind, body, source_refs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      );
      for (const row of payload.rows) {
        insertRow.run(
          row.path,
          row.sha256,
          row.content_type,
          row.projection_version,
          row.indexed_at,
          row.size_bytes,
          row.kind,
          row.body,
          refsToJson(row.source_refs),
        );
      }
      db.prepare("INSERT INTO projection_fts(projection_fts) VALUES('rebuild')").run();
    });
    transaction(projection);
  } finally {
    db.close();
  }
}

export async function readSqliteProjection(dbPath: string): Promise<SqliteProjection | null> {
  const db = await openSqliteDatabase(dbPath, { readonly: true });
  if (!db) return null;
  try {
    const metadata = db
      .prepare(
        "SELECT projection_version, generated_at, workspace_hash, include_tasks, include_raw FROM projection_metadata LIMIT 1",
      )
      .get() as SqliteProjectionMetadataRow | undefined;
    if (!metadata) return null;

    const rows = db
      .prepare(
        "SELECT path, sha256, content_type, projection_version, indexed_at, size_bytes, kind, body, source_refs FROM projection_rows ORDER BY path",
      )
      .all() as SqliteProjectionRowRecord[];

    return {
      metadata: {
        projection_version: Number(metadata.projection_version ?? 0),
        generated_at: String(metadata.generated_at ?? ""),
        workspace_hash: String(metadata.workspace_hash ?? ""),
        include_tasks: Number(metadata.include_tasks ?? 0) === 1,
        include_raw: Number(metadata.include_raw ?? 0) === 1,
      },
      rows: rows.map((row) => ({
        path: String(row.path ?? ""),
        sha256: String(row.sha256 ?? ""),
        content_type: String(row.content_type ?? ""),
        projection_version: Number(row.projection_version ?? 0),
        indexed_at: String(row.indexed_at ?? ""),
        size_bytes: Number(row.size_bytes ?? 0),
        kind: String(row.kind ?? ""),
        body: String(row.body ?? ""),
        source_refs: parseRefs(row.source_refs),
      })),
    };
  } catch {
    return null;
  } finally {
    db.close();
  }
}

export async function checkSqliteProjection(dbPath: string): Promise<boolean> {
  const db = await openSqliteDatabase(dbPath, { readonly: true });
  if (!db) return false;
  try {
    const raw = db.prepare("PRAGMA integrity_check").pluck().get();
    return raw === "ok";
  } catch {
    return false;
  } finally {
    db.close();
  }
}
