import type BetterSqlite3 from "better-sqlite3";

type BetterSqlite3Factory = typeof BetterSqlite3;
type BetterSqlite3Module = { default?: BetterSqlite3Factory } & BetterSqlite3Factory;

export type SqliteDatabase = InstanceType<BetterSqlite3Factory>;

type GlobalWithSqlite = typeof globalThis & {
  __agentplaneBetterSqlite3?: BetterSqlite3Factory;
};

async function loadSqliteFactory(): Promise<BetterSqlite3Factory | null> {
  const cached = (globalThis as GlobalWithSqlite).__agentplaneBetterSqlite3;
  if (cached) return cached;
  try {
    const sqlite = (await import("better-sqlite3")) as unknown as BetterSqlite3Module;
    const factory = sqlite.default ?? sqlite;
    (globalThis as GlobalWithSqlite).__agentplaneBetterSqlite3 = factory;
    return factory;
  } catch {
    return null;
  }
}

export async function openSqliteDatabase(
  dbPath: string,
  opts?: { readonly?: boolean; fileMustExist?: boolean },
): Promise<SqliteDatabase | null> {
  const Database = await loadSqliteFactory();
  if (!Database) return null;
  try {
    return new Database(dbPath, {
      readonly: opts?.readonly === true,
      fileMustExist: opts?.fileMustExist === true || opts?.readonly === true,
    });
  } catch {
    return null;
  }
}
