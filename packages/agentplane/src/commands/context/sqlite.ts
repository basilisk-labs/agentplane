import { spawn } from "node:child_process";

export type SqliteProjectionRow = {
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

export type SqliteProjection = {
  metadata: {
    projection_version: number;
    generated_at: string;
    workspace_hash: string;
    include_tasks: boolean;
    include_raw: boolean;
  };
  rows: SqliteProjectionRow[];
};

type SqliteJsonRow = Record<string, unknown>;

function runSqlite(args: string[], input?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn("sqlite3", args, { stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", (err) => {
      reject(
        new Error(
          `sqlite3 CLI is required for AgentPlane context projection. Install sqlite3 or disable context projection before retrying. Cause: ${err.message}`,
        ),
      );
    });
    child.on("close", (code) => {
      if (code === 0) {
        resolve(stdout);
        return;
      }
      reject(new Error(stderr.trim() || `sqlite3 exited with code ${code ?? "unknown"}`));
    });
    child.stdin.end(input ?? "");
  });
}

function sqlString(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

function sqlNumber(value: number): string {
  return Number.isFinite(value) ? String(value) : "0";
}

function refsToJson(refs: string[] | undefined): string {
  return JSON.stringify(Array.isArray(refs) ? refs : []);
}

export async function writeSqliteProjection(
  dbPath: string,
  projection: SqliteProjection,
): Promise<void> {
  const statements: string[] = [
    "PRAGMA journal_mode=WAL;",
    "PRAGMA synchronous=NORMAL;",
    "BEGIN;",
    "DROP TABLE IF EXISTS projection_metadata;",
    "DROP TABLE IF EXISTS projection_rows;",
    "DROP TABLE IF EXISTS projection_fts;",
    "CREATE TABLE projection_metadata (projection_version INTEGER NOT NULL, generated_at TEXT NOT NULL, workspace_hash TEXT NOT NULL, include_tasks INTEGER NOT NULL, include_raw INTEGER NOT NULL);",
    "CREATE TABLE projection_rows (path TEXT PRIMARY KEY, sha256 TEXT NOT NULL, content_type TEXT NOT NULL, projection_version INTEGER NOT NULL, indexed_at TEXT NOT NULL, size_bytes INTEGER NOT NULL, kind TEXT NOT NULL, body TEXT NOT NULL, source_refs TEXT NOT NULL);",
    "CREATE VIRTUAL TABLE projection_fts USING fts5(path, body, content='projection_rows', content_rowid='rowid');",
    [
      "INSERT INTO projection_metadata (projection_version, generated_at, workspace_hash, include_tasks, include_raw) VALUES (",
      sqlNumber(projection.metadata.projection_version),
      ", ",
      sqlString(projection.metadata.generated_at),
      ", ",
      sqlString(projection.metadata.workspace_hash),
      ", ",
      projection.metadata.include_tasks ? "1" : "0",
      ", ",
      projection.metadata.include_raw ? "1" : "0",
      ");",
    ].join(""),
  ];

  for (const row of projection.rows) {
    statements.push(
      [
        "INSERT INTO projection_rows (path, sha256, content_type, projection_version, indexed_at, size_bytes, kind, body, source_refs) VALUES (",
        sqlString(row.path),
        ", ",
        sqlString(row.sha256),
        ", ",
        sqlString(row.content_type),
        ", ",
        sqlNumber(row.projection_version),
        ", ",
        sqlString(row.indexed_at),
        ", ",
        sqlNumber(row.size_bytes),
        ", ",
        sqlString(row.kind),
        ", ",
        sqlString(row.body),
        ", ",
        sqlString(refsToJson(row.source_refs)),
        ");",
      ].join(""),
    );
  }
  statements.push("INSERT INTO projection_fts(projection_fts) VALUES('rebuild');");
  statements.push("COMMIT;");
  await runSqlite([dbPath], `${statements.join("\n")}\n`);
}

function parseJsonArray(raw: string): SqliteJsonRow[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];
  const parsed = JSON.parse(trimmed) as unknown;
  return Array.isArray(parsed) ? (parsed as SqliteJsonRow[]) : [];
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

export async function readSqliteProjection(dbPath: string): Promise<SqliteProjection | null> {
  const metadataRows = parseJsonArray(
    await runSqlite([
      "-json",
      dbPath,
      "SELECT projection_version, generated_at, workspace_hash, include_tasks, include_raw FROM projection_metadata LIMIT 1;",
    ]),
  );
  const metadata = metadataRows[0];
  if (!metadata) return null;
  const rowRows = parseJsonArray(
    await runSqlite([
      "-json",
      dbPath,
      "SELECT path, sha256, content_type, projection_version, indexed_at, size_bytes, kind, body, source_refs FROM projection_rows ORDER BY path;",
    ]),
  );
  return {
    metadata: {
      projection_version: Number(metadata.projection_version ?? 0),
      generated_at: String(metadata.generated_at ?? ""),
      workspace_hash: String(metadata.workspace_hash ?? ""),
      include_tasks: Number(metadata.include_tasks ?? 0) === 1,
      include_raw: Number(metadata.include_raw ?? 0) === 1,
    },
    rows: rowRows.map((row) => ({
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
}

export async function checkSqliteProjection(dbPath: string): Promise<boolean> {
  try {
    const raw = await runSqlite([dbPath, "PRAGMA integrity_check;"]);
    return raw.trim() === "ok";
  } catch {
    return false;
  }
}
