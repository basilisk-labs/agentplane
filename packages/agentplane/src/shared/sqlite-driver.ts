type SqliteRunResult = {
  changes?: number | bigint;
  lastInsertRowid?: number | bigint;
};

type SqliteInputValue = string | number | bigint | boolean | null | Uint8Array;

type NativeSqliteStatementSync = {
  run: (...params: SqliteInputValue[]) => SqliteRunResult;
  get: (...params: SqliteInputValue[]) => unknown;
  all: (...params: SqliteInputValue[]) => unknown[];
};

type NativeSqliteDatabaseSync = {
  exec: (sql: string) => void;
  prepare: (sql: string) => NativeSqliteStatementSync;
  close: () => void;
};

type NodeSqliteModule = {
  DatabaseSync: new (
    path: string,
    opts?: { open?: boolean; readOnly?: boolean; readonly?: boolean },
  ) => NativeSqliteDatabaseSync;
};

type BunSqliteModule = {
  Database: new (
    path: string,
    opts?: { readonly?: boolean; create?: boolean },
  ) => NativeSqliteDatabaseSync;
};

type SqliteModule =
  | { kind: "node"; module: NodeSqliteModule }
  | { kind: "bun"; module: BunSqliteModule };

const NODE_SQLITE_SPECIFIER = "node:sqlite";
const BUN_SQLITE_SPECIFIER = "bun:sqlite";

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
  __agentplaneSqlite?: SqliteModule;
  __agentplaneSqliteLoading?: Promise<SqliteModule | null>;
};

function firstColumn(row: unknown): unknown {
  if (!row || typeof row !== "object") return undefined;
  const values = Object.values(row);
  return values[0];
}

class NodeSqliteStatementAdapter implements SqliteStatement {
  constructor(
    private readonly statement: NativeSqliteStatementSync,
    private readonly pluckFirstColumn = false,
  ) {}

  run(...params: unknown[]): SqliteRunResult {
    return this.statement.run(...(params as SqliteInputValue[]));
  }

  get(...params: unknown[]): unknown {
    const row = this.statement.get(...(params as SqliteInputValue[]));
    return this.pluckFirstColumn ? firstColumn(row) : row;
  }

  all(...params: unknown[]): unknown[] {
    const rows = this.statement.all(...(params as SqliteInputValue[]));
    return this.pluckFirstColumn ? rows.map((row) => firstColumn(row)) : rows;
  }

  pluck(): SqliteStatement {
    return new NodeSqliteStatementAdapter(this.statement, true);
  }
}

class NodeSqliteDatabaseAdapter implements SqliteDatabase {
  constructor(private readonly database: NativeSqliteDatabaseSync) {}

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

async function loadSqlite(): Promise<SqliteModule | null> {
  const globalSqlite = globalThis as GlobalWithSqlite;
  const cached = globalSqlite.__agentplaneSqlite;
  if (cached) return cached;
  if (globalSqlite.__agentplaneSqliteLoading) return globalSqlite.__agentplaneSqliteLoading;
  const loading = loadSqliteUncached();
  globalSqlite.__agentplaneSqliteLoading = loading;
  try {
    return await loading;
  } finally {
    if (globalSqlite.__agentplaneSqliteLoading === loading) {
      delete globalSqlite.__agentplaneSqliteLoading;
    }
  }
}

async function loadSqliteUncached(): Promise<SqliteModule | null> {
  try {
    const originalEmitWarning = process.emitWarning.bind(process);
    const warningShim = ((warning: string | Error, ...args: unknown[]) => {
      const warningName =
        typeof warning === "string"
          ? typeof args[0] === "string"
            ? args[0]
            : typeof (args[0] as { type?: unknown } | undefined)?.type === "string"
              ? String((args[0] as { type?: unknown }).type)
              : ""
          : warning.name;
      const warningMessage = typeof warning === "string" ? warning : warning.message;
      if (
        warningName === "ExperimentalWarning" &&
        warningMessage.includes("SQLite is an experimental feature")
      ) {
        return;
      }
      return originalEmitWarning.call(process, warning as never, ...(args as never[]));
    }) as typeof process.emitWarning;
    process.emitWarning = warningShim;
    let sqlite: NodeSqliteModule;
    try {
      sqlite = (await import(NODE_SQLITE_SPECIFIER)) as NodeSqliteModule;
    } finally {
      if (process.emitWarning === warningShim) {
        process.emitWarning = originalEmitWarning;
      }
    }
    const loaded = { kind: "node" as const, module: sqlite };
    (globalThis as GlobalWithSqlite).__agentplaneSqlite = loaded;
    return loaded;
  } catch {
    // Bun's test/runtime does not expose node:sqlite; use its compatible SQLite driver.
  }
  try {
    const sqlite = (await import(BUN_SQLITE_SPECIFIER)) as BunSqliteModule;
    const loaded = { kind: "bun" as const, module: sqlite };
    (globalThis as GlobalWithSqlite).__agentplaneSqlite = loaded;
    return loaded;
  } catch {
    return null;
  }
}

export async function openSqliteDatabase(
  dbPath: string,
  opts?: { readonly?: boolean; fileMustExist?: boolean },
): Promise<SqliteDatabase | null> {
  const sqlite = await loadSqlite();
  if (!sqlite) return null;
  try {
    const readonly = opts?.readonly === true;
    const database =
      sqlite.kind === "node"
        ? new sqlite.module.DatabaseSync(dbPath, { readOnly: readonly, readonly })
        : new sqlite.module.Database(dbPath, { readonly, create: !readonly });
    return new NodeSqliteDatabaseAdapter(database);
  } catch {
    return null;
  }
}
