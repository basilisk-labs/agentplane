/* eslint-disable @typescript-eslint/no-base-to-string */
import { mkdirSync } from "node:fs";
import path from "node:path";

import {
  openSqliteDatabase,
  type SqliteDatabase,
  type SqliteStatement,
} from "../shared/sqlite-driver.js";

type SqliteProjectionRow = {
  /** Origin file retained internally so one source can be updated atomically. */
  source_path?: string;
  path: string;
  sha256: string;
  content_type: string;
  projection_version: number;
  indexed_at: string;
  size_bytes: number;
  kind: string;
  search_text: string;
  preview_text: string;
  source_refs?: string[];
};

type SqliteProjection = {
  metadata: {
    projection_version: number;
    generated_at: string;
    workspace_hash: string;
    include_tasks: boolean;
    include_raw: boolean;
    source_bytes: number;
    search_text_bytes: number;
    preview_text_bytes: number;
    projection_elapsed_ms: number;
  };
  sources?: SqliteProjectionSource[];
  rows: SqliteProjectionRow[];
};

type SqliteProjectionSource = {
  source_path: string;
  sha256: string;
  size_bytes: number;
};

export type SqliteProjectionSearchOptions = {
  query: string;
  scopes: ("wiki" | "facts" | "graph" | "tasks" | "capabilities" | "tasks-acr" | "raw")[];
  limit: number;
  offset: number;
};

export type SqliteProjectionSearchResult = {
  metadata: SqliteProjection["metadata"];
  rows: (Omit<SqliteProjectionRow, "search_text"> & {
    rank: number;
    highlight: string;
  })[];
};

export type SqliteProjectionState = {
  metadata: SqliteProjection["metadata"];
  sourceHashes: Map<string, string>;
  rowCount: number;
};

export type SqliteProjectionDelta = {
  metadata: SqliteProjection["metadata"];
  changed: {
    source_path: string;
    sha256: string;
    size_bytes: number;
    rows: SqliteProjectionRow[];
  }[];
  removed_source_paths: string[];
};

type SqliteProjectionMetadataRow = {
  projection_version?: unknown;
  generated_at?: unknown;
  workspace_hash?: unknown;
  include_tasks?: unknown;
  include_raw?: unknown;
  source_bytes?: unknown;
  search_text_bytes?: unknown;
  preview_text_bytes?: unknown;
  projection_elapsed_ms?: unknown;
};

type SqliteProjectionRowRecord = {
  source_path?: unknown;
  path?: unknown;
  sha256?: unknown;
  content_type?: unknown;
  projection_version?: unknown;
  indexed_at?: unknown;
  size_bytes?: unknown;
  kind?: unknown;
  search_text?: unknown;
  preview_text?: unknown;
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
    throw new Error("node:sqlite is required for AgentPlane SQLite projections.");
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

function ftsTokens(query: string): string[] {
  return query.match(/[\p{L}\p{N}_]+/gu)?.filter(Boolean) ?? [];
}

function toFtsMatchQuery(query: string): string | null {
  const tokens = ftsTokens(query);
  return tokens.length > 0 ? tokens.map((token) => `${token}*`).join(" AND ") : null;
}

function scopeWhereClause(scopes: SqliteProjectionSearchOptions["scopes"]): {
  sql: string;
  params: string[];
} {
  const clauses: string[] = [];
  const params: string[] = [];
  for (const scope of scopes) {
    switch (scope) {
      case "wiki": {
        clauses.push("rows.path LIKE ?");
        params.push("context/wiki/%");
        break;
      }
      case "facts": {
        clauses.push("rows.path LIKE ?");
        params.push(".agentplane/context/derived/facts/%");
        break;
      }
      case "graph": {
        clauses.push("rows.path LIKE ?");
        params.push(".agentplane/context/derived/graph/%");
        break;
      }
      case "tasks": {
        clauses.push("rows.path LIKE ?");
        params.push(".agentplane/tasks/%");
        break;
      }
      case "tasks-acr": {
        clauses.push("(rows.path LIKE ? AND rows.path LIKE ?)");
        params.push(".agentplane/tasks/%", "%/acr.json%");
        break;
      }
      case "capabilities": {
        clauses.push("(rows.path LIKE ? OR rows.path LIKE ?)");
        params.push("context/capabilities/%", ".agentplane/context/derived/capabilities/%");
        break;
      }
      case "raw": {
        clauses.push("(rows.path LIKE ? AND rows.path NOT LIKE ?)");
        params.push("context/raw/%", "context/raw/private/%");
        break;
      }
    }
  }
  return clauses.length > 0
    ? { sql: ` AND (${clauses.join(" OR ")})`, params }
    : { sql: "", params };
}

function resetContextProjectionSchema(db: SqliteDatabase): void {
  db.exec(`
    DROP TRIGGER IF EXISTS projection_rows_ai;
    DROP TRIGGER IF EXISTS projection_rows_ad;
    DROP TRIGGER IF EXISTS projection_rows_au;
    DROP TABLE IF EXISTS projection_metadata;
    DROP TABLE IF EXISTS projection_rows;
    DROP TABLE IF EXISTS projection_sources;
    DROP TABLE IF EXISTS projection_fts;
    CREATE TABLE projection_metadata (
      projection_version INTEGER NOT NULL,
      generated_at TEXT NOT NULL,
      workspace_hash TEXT NOT NULL,
      include_tasks INTEGER NOT NULL,
      include_raw INTEGER NOT NULL,
      source_bytes INTEGER NOT NULL,
      search_text_bytes INTEGER NOT NULL,
      preview_text_bytes INTEGER NOT NULL,
      projection_elapsed_ms INTEGER NOT NULL
    );
    CREATE TABLE projection_sources (
      source_path TEXT PRIMARY KEY,
      sha256 TEXT NOT NULL,
      size_bytes INTEGER NOT NULL
    );
    CREATE TABLE projection_rows (
      source_path TEXT NOT NULL,
      path TEXT PRIMARY KEY,
      sha256 TEXT NOT NULL,
      content_type TEXT NOT NULL,
      projection_version INTEGER NOT NULL,
      indexed_at TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      kind TEXT NOT NULL,
      search_text TEXT NOT NULL,
      preview_text TEXT NOT NULL,
      source_refs TEXT NOT NULL
    );
    CREATE INDEX projection_rows_source_path_idx ON projection_rows(source_path);
    CREATE VIRTUAL TABLE projection_fts USING fts5(
      path,
      search_text,
      content='projection_rows',
      content_rowid='rowid'
    );
    CREATE TRIGGER projection_rows_ai AFTER INSERT ON projection_rows BEGIN
      INSERT INTO projection_fts(rowid, path, search_text)
      VALUES (new.rowid, new.path, new.search_text);
    END;
    CREATE TRIGGER projection_rows_ad AFTER DELETE ON projection_rows BEGIN
      INSERT INTO projection_fts(projection_fts, rowid, path, search_text)
      VALUES ('delete', old.rowid, old.path, old.search_text);
    END;
    CREATE TRIGGER projection_rows_au AFTER UPDATE ON projection_rows BEGIN
      INSERT INTO projection_fts(projection_fts, rowid, path, search_text)
      VALUES ('delete', old.rowid, old.path, old.search_text);
      INSERT INTO projection_fts(rowid, path, search_text)
      VALUES (new.rowid, new.path, new.search_text);
    END;
  `);
}

function sourcePathForRow(row: SqliteProjectionRow): string {
  return row.source_path ?? row.path.split("#", 1)[0] ?? row.path;
}

function metadataFromRow(metadata: SqliteProjectionMetadataRow): SqliteProjection["metadata"] {
  return {
    projection_version: Number(metadata.projection_version ?? 0),
    generated_at: String(metadata.generated_at ?? ""),
    workspace_hash: String(metadata.workspace_hash ?? ""),
    include_tasks: Number(metadata.include_tasks ?? 0) === 1,
    include_raw: Number(metadata.include_raw ?? 0) === 1,
    source_bytes: Number(metadata.source_bytes ?? 0),
    search_text_bytes: Number(metadata.search_text_bytes ?? 0),
    preview_text_bytes: Number(metadata.preview_text_bytes ?? 0),
    projection_elapsed_ms: Number(metadata.projection_elapsed_ms ?? 0),
  };
}

function writeMetadataStatement(db: SqliteDatabase, metadata: SqliteProjection["metadata"]): void {
  db.prepare(
    "INSERT INTO projection_metadata (projection_version, generated_at, workspace_hash, include_tasks, include_raw, source_bytes, search_text_bytes, preview_text_bytes, projection_elapsed_ms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  ).run(
    metadata.projection_version,
    metadata.generated_at,
    metadata.workspace_hash,
    metadata.include_tasks ? 1 : 0,
    metadata.include_raw ? 1 : 0,
    metadata.source_bytes,
    metadata.search_text_bytes,
    metadata.preview_text_bytes,
    metadata.projection_elapsed_ms,
  );
}

function insertProjectionRowStatement(db: SqliteDatabase) {
  return db.prepare(
    "INSERT INTO projection_rows (source_path, path, sha256, content_type, projection_version, indexed_at, size_bytes, kind, search_text, preview_text, source_refs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  );
}

function insertProjectionSourceStatement(db: SqliteDatabase): SqliteStatement {
  return db.prepare(
    "INSERT INTO projection_sources (source_path, sha256, size_bytes) VALUES (?, ?, ?)",
  );
}

function sourcesFromRows(rows: SqliteProjectionRow[]): SqliteProjectionSource[] {
  const sources = new Map<string, Omit<SqliteProjectionSource, "source_path">>();
  for (const row of rows) {
    const sourcePath = sourcePathForRow(row);
    const current = sources.get(sourcePath);
    if (!current || row.path === sourcePath) {
      sources.set(sourcePath, { sha256: row.sha256, size_bytes: row.size_bytes });
    }
  }
  return [...sources].map(([source_path, source]) => ({ source_path, ...source }));
}

function insertProjectionRow(statement: SqliteStatement, row: SqliteProjectionRow): void {
  statement.run(
    sourcePathForRow(row),
    row.path,
    row.sha256,
    row.content_type,
    row.projection_version,
    row.indexed_at,
    row.size_bytes,
    row.kind,
    row.search_text,
    row.preview_text,
    refsToJson(row.source_refs),
  );
}

function projectionTotals(
  db: SqliteDatabase,
): Pick<SqliteProjection["metadata"], "source_bytes" | "search_text_bytes" | "preview_text_bytes"> {
  const totals = db
    .prepare(
      `SELECT
         COALESCE((SELECT SUM(size_bytes) FROM projection_sources), 0) AS source_bytes,
         COALESCE(SUM(length(CAST(search_text AS BLOB))), 0) AS search_text_bytes,
         COALESCE(SUM(length(CAST(preview_text AS BLOB))), 0) AS preview_text_bytes
       FROM projection_rows`,
    )
    .get() as SqliteProjectionMetadataRow | undefined;
  return {
    source_bytes: Number(totals?.source_bytes ?? 0),
    search_text_bytes: Number(totals?.search_text_bytes ?? 0),
    preview_text_bytes: Number(totals?.preview_text_bytes ?? 0),
  };
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
      writeMetadataStatement(db, payload.metadata);
      const insertSource = insertProjectionSourceStatement(db);
      for (const source of payload.sources ?? sourcesFromRows(payload.rows)) {
        insertSource.run(source.source_path, source.sha256, source.size_bytes);
      }
      const insertRow = insertProjectionRowStatement(db);
      for (const row of payload.rows) {
        insertProjectionRow(insertRow, row);
      }
    });
    transaction(projection);
  } finally {
    db.close();
  }
}

export async function readSqliteProjectionState(
  dbPath: string,
): Promise<SqliteProjectionState | null> {
  const db = await openSqliteDatabase(dbPath, { readonly: true, fileMustExist: true });
  if (!db) return null;
  try {
    const metadata = db
      .prepare(
        "SELECT projection_version, generated_at, workspace_hash, include_tasks, include_raw, source_bytes, search_text_bytes, preview_text_bytes, projection_elapsed_ms FROM projection_metadata LIMIT 1",
      )
      .get() as SqliteProjectionMetadataRow | undefined;
    if (!metadata) return null;
    const sourceRows = db
      .prepare("SELECT source_path, sha256 FROM projection_sources ORDER BY source_path")
      .all() as SqliteProjectionRowRecord[];
    const rowCount = db.prepare("SELECT COUNT(*) AS row_count FROM projection_rows").get() as {
      row_count?: unknown;
    };
    return {
      metadata: metadataFromRow(metadata),
      sourceHashes: new Map(
        sourceRows
          .filter(
            (row): row is SqliteProjectionRowRecord & { source_path: string; sha256: string } =>
              typeof row.source_path === "string" && typeof row.sha256 === "string",
          )
          .map((row) => [row.source_path, row.sha256]),
      ),
      rowCount: Number(rowCount.row_count ?? 0),
    };
  } catch {
    return null;
  } finally {
    db.close();
  }
}

export async function applySqliteProjectionDelta(
  dbPath: string,
  delta: SqliteProjectionDelta,
): Promise<SqliteProjection["metadata"]> {
  const db = await openRequiredDatabase(dbPath);
  try {
    db.pragma("journal_mode = WAL");
    db.pragma("synchronous = NORMAL");
    const transaction = db.transaction((payload: SqliteProjectionDelta) => {
      const deleteRows = db.prepare("DELETE FROM projection_rows WHERE source_path = ?");
      const deleteSource = db.prepare("DELETE FROM projection_sources WHERE source_path = ?");
      const insertSource = insertProjectionSourceStatement(db);
      const insertRow = insertProjectionRowStatement(db);
      const replacementPaths = new Set<string>(payload.removed_source_paths);
      for (const change of payload.changed) replacementPaths.add(change.source_path);
      for (const sourcePath of replacementPaths) {
        deleteRows.run(sourcePath);
        deleteSource.run(sourcePath);
      }
      for (const change of payload.changed) {
        insertSource.run(change.source_path, change.sha256, change.size_bytes);
        for (const row of change.rows) {
          insertProjectionRow(insertRow, { ...row, source_path: change.source_path });
        }
      }

      const metadata = { ...payload.metadata, ...projectionTotals(db) };
      db.prepare("DELETE FROM projection_metadata").run();
      writeMetadataStatement(db, metadata);
      return metadata;
    });
    return transaction(delta);
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
        "SELECT projection_version, generated_at, workspace_hash, include_tasks, include_raw, source_bytes, search_text_bytes, preview_text_bytes, projection_elapsed_ms FROM projection_metadata LIMIT 1",
      )
      .get() as SqliteProjectionMetadataRow | undefined;
    if (!metadata) return null;

    const rows = db
      .prepare(
        "SELECT path, sha256, content_type, projection_version, indexed_at, size_bytes, kind, search_text, preview_text, source_refs FROM projection_rows ORDER BY path",
      )
      .all() as SqliteProjectionRowRecord[];

    return {
      metadata: metadataFromRow(metadata),
      rows: rows.map((row) => ({
        path: String(row.path ?? ""),
        sha256: String(row.sha256 ?? ""),
        content_type: String(row.content_type ?? ""),
        projection_version: Number(row.projection_version ?? 0),
        indexed_at: String(row.indexed_at ?? ""),
        size_bytes: Number(row.size_bytes ?? 0),
        kind: String(row.kind ?? ""),
        search_text: String(row.search_text ?? ""),
        preview_text: String(row.preview_text ?? ""),
        source_refs: parseRefs(row.source_refs),
      })),
    };
  } catch {
    return null;
  } finally {
    db.close();
  }
}

export async function searchSqliteProjection(
  dbPath: string,
  opts: SqliteProjectionSearchOptions,
): Promise<SqliteProjectionSearchResult | null> {
  const matchQuery = toFtsMatchQuery(opts.query);
  if (!matchQuery) return null;
  const db = await openSqliteDatabase(dbPath, { readonly: true, fileMustExist: true });
  if (!db) return null;
  try {
    const metadata = db
      .prepare(
        "SELECT projection_version, generated_at, workspace_hash, include_tasks, include_raw, source_bytes, search_text_bytes, preview_text_bytes, projection_elapsed_ms FROM projection_metadata LIMIT 1",
      )
      .get() as SqliteProjectionMetadataRow | undefined;
    if (!metadata) return null;

    const scope = scopeWhereClause(opts.scopes);
    const records = db
      .prepare(
        `SELECT rows.path, rows.sha256, rows.content_type, rows.projection_version, rows.indexed_at, rows.size_bytes, rows.kind, rows.preview_text, rows.source_refs,
                bm25(projection_fts) AS rank,
                snippet(projection_fts, 1, '[', ']', ' … ', 12) AS highlight
           FROM projection_fts
           JOIN projection_rows AS rows ON rows.rowid = projection_fts.rowid
          WHERE projection_fts MATCH ?${scope.sql}
          ORDER BY rank ASC, rows.path ASC
          LIMIT ? OFFSET ?`,
      )
      .all(matchQuery, ...scope.params, opts.limit, opts.offset) as (SqliteProjectionRowRecord & {
      rank?: unknown;
      highlight?: unknown;
    })[];

    return {
      metadata: metadataFromRow(metadata),
      rows: records.map((row) => ({
        path: String(row.path ?? ""),
        sha256: String(row.sha256 ?? ""),
        content_type: String(row.content_type ?? ""),
        projection_version: Number(row.projection_version ?? 0),
        indexed_at: String(row.indexed_at ?? ""),
        size_bytes: Number(row.size_bytes ?? 0),
        kind: String(row.kind ?? ""),
        preview_text: String(row.preview_text ?? ""),
        source_refs: parseRefs(row.source_refs),
        rank: Number(row.rank ?? 0),
        highlight: String(row.highlight ?? ""),
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
