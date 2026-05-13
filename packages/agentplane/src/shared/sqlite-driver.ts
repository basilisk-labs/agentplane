import type { DatabaseSync, SQLInputValue } from "node:sqlite";

type SqliteRunResult = {
  changes?: number | bigint;
  lastInsertRowid?: number | bigint;
};

type NodeSqliteDatabaseSync = InstanceType<typeof DatabaseSync>;
type NodeSqliteStatementSync = ReturnType<NodeSqliteDatabaseSync["prepare"]>;

type NodeSqliteModule = {
  DatabaseSync: new (
    path: string,
    opts?: { open?: boolean; readOnly?: boolean; readonly?: boolean },
  ) => NodeSqliteDatabaseSync;
};

export type SqliteStatement = {
  run: (...params: unknown[]) => SqliteRunResult;
  get: (...params: unknown[]) => unknown;
  all: (...params: unknown[]) => unknown[];
  pluck: () => SqliteStatement;
};

export type SqliteDatabase = {
  exec: (sql: string) => void;
  prepare: (sql: string) => SqliteStatement;
  pragma: (sql: string) => void;
  transaction: <Args extends unknown[], Result>(
    fn: (...args: Args) => Result,
  ) => (...args: Args) => Result;
  close: () => void;
};

type GlobalWithSqlite = typeof globalThis & {
  __agentplaneNodeSqlite?: NodeSqliteModule;
};

function firstColumn(row: unknown): unknown {
  if (!row || typeof row !== "object") return undefined;
  const values = Object.values(row);
  return values[0];
}

class NodeSqliteStatementAdapter implements SqliteStatement {
  constructor(
    private readonly statement: NodeSqliteStatementSync,
    private readonly pluckFirstColumn = false,
  ) {}

  run(...params: unknown[]): SqliteRunResult {
    return this.statement.run(...(params as SQLInputValue[]));
  }

  get(...params: unknown[]): unknown {
    const row = this.statement.get(...(params as SQLInputValue[]));
    return this.pluckFirstColumn ? firstColumn(row) : row;
  }

  all(...params: unknown[]): unknown[] {
    const rows = this.statement.all(...(params as SQLInputValue[]));
    return this.pluckFirstColumn ? rows.map((row) => firstColumn(row)) : rows;
  }

  pluck(): SqliteStatement {
    return new NodeSqliteStatementAdapter(this.statement, true);
  }
}

class NodeSqliteDatabaseAdapter implements SqliteDatabase {
  constructor(private readonly database: NodeSqliteDatabaseSync) {}

  exec(sql: string): void {
    this.database.exec(sql);
  }

  prepare(sql: string): SqliteStatement {
    return new NodeSqliteStatementAdapter(this.database.prepare(sql));
  }

  pragma(sql: string): void {
    this.database.exec(`PRAGMA ${sql}`);
  }

  transaction<Args extends unknown[], Result>(
    fn: (...args: Args) => Result,
  ): (...args: Args) => Result {
    return (...args: Args) => {
      this.database.exec("BEGIN");
      try {
        const result = fn(...args);
        this.database.exec("COMMIT");
        return result;
      } catch (error) {
        try {
          this.database.exec("ROLLBACK");
        } catch {
          // Preserve the original transaction failure.
        }
        throw error;
      }
    };
  }

  close(): void {
    this.database.close();
  }
}

async function loadNodeSqlite(): Promise<NodeSqliteModule | null> {
  const cached = (globalThis as GlobalWithSqlite).__agentplaneNodeSqlite;
  if (cached) return cached;
  try {
    const sqlite = (await import("node:sqlite")) as NodeSqliteModule;
    (globalThis as GlobalWithSqlite).__agentplaneNodeSqlite = sqlite;
    return sqlite;
  } catch {
    return null;
  }
}

export async function openSqliteDatabase(
  dbPath: string,
  opts?: { readonly?: boolean; fileMustExist?: boolean },
): Promise<SqliteDatabase | null> {
  const sqlite = await loadNodeSqlite();
  if (!sqlite) return null;
  try {
    const database = new sqlite.DatabaseSync(dbPath, {
      readOnly: opts?.readonly === true,
      readonly: opts?.readonly === true,
    });
    return new NodeSqliteDatabaseAdapter(database);
  } catch {
    return null;
  }
}
