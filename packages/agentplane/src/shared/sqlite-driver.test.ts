import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { openSqliteDatabase, type SqliteDatabase } from "./sqlite-driver.js";

describe("SQLite driver contract", () => {
  let directory: string;
  let databasePath: string;
  const databases = new Set<SqliteDatabase>();

  async function open(readonly = false): Promise<SqliteDatabase> {
    const database = await openSqliteDatabase(databasePath, { readonly });
    if (!database) throw new Error("SQLite database could not be opened");
    databases.add(database);
    return database;
  }

  function close(database: SqliteDatabase): void {
    database.close();
    databases.delete(database);
  }

  beforeEach(async () => {
    directory = await mkdtemp(path.join(os.tmpdir(), "agentplane-sqlite-driver-"));
    databasePath = path.join(directory, "state.sqlite");
  });

  afterEach(async () => {
    for (const database of databases) close(database);
    await rm(directory, { recursive: true, force: true });
  });

  it("persists bound values and exposes query and mutation results after reopening", async () => {
    const database = await open();
    database.exec("CREATE TABLE records (id INTEGER PRIMARY KEY, label TEXT, payload BLOB)");
    const result = database
      .prepare("INSERT INTO records (id, label, payload) VALUES (?, ?, ?)")
      .run(1, "task's state", new Uint8Array([0, 127, 255]));
    expect(Number(result.changes)).toBe(1);
    expect(Number(result.lastInsertRowid)).toBe(1);
    database.prepare("INSERT INTO records (id, label) VALUES (?, ?)").run(2, null);
    close(database);

    const reopened = await open();
    const row = reopened.prepare("SELECT label, payload FROM records WHERE id = ?").get(1) as {
      label: string;
      payload: Uint8Array;
    };
    expect(row.label).toBe("task's state");
    expect([...row.payload]).toEqual([0, 127, 255]);
    expect(reopened.prepare("SELECT label FROM records WHERE id = ?").pluck().get(2)).toBeNull();
    expect(reopened.prepare("SELECT id FROM records ORDER BY id").pluck().all()).toEqual([1, 2]);
    expect(reopened.prepare("SELECT id FROM records WHERE id = ?").pluck().get(3)).toBeUndefined();
  });

  it("commits transactions and forwards their arguments and return value", async () => {
    const database = await open();
    database.exec("CREATE TABLE records (id INTEGER PRIMARY KEY)");
    const insert = database.prepare("INSERT INTO records VALUES (?)");
    const insertPair = database.transaction((first: number, second: number) => {
      insert.run(first);
      insert.run(second);
      return "committed";
    });
    expect(insertPair(1, 2)).toBe("committed");
    close(database);
    const reopened = await open();
    expect(reopened.prepare("SELECT id FROM records ORDER BY id").pluck().all()).toEqual([1, 2]);
  });

  it("rolls back failed transactions and leaves the connection usable", async () => {
    const database = await open();
    database.exec("CREATE TABLE records (id INTEGER PRIMARY KEY)");
    const insert = database.prepare("INSERT INTO records VALUES (?)");
    const failure = new Error("abort transaction");
    const failingInsert = database.transaction(() => {
      insert.run(1);
      throw failure;
    });
    expect(failingInsert).toThrow(failure);
    expect(database.prepare("SELECT id FROM records").all()).toEqual([]);
    database.transaction(() => insert.run(2))();
    expect(database.prepare("SELECT id FROM records").pluck().all()).toEqual([2]);
  });

  it("opens existing databases readonly and rejects writes", async () => {
    const database = await open();
    database.exec("CREATE TABLE records (id INTEGER PRIMARY KEY)");
    database.prepare("INSERT INTO records VALUES (?)").run(1);
    close(database);

    const readonly = await open(true);
    expect(readonly.prepare("SELECT id FROM records").pluck().all()).toEqual([1]);
    expect(() => readonly.prepare("INSERT INTO records VALUES (?)").run(2)).toThrow();
    expect(readonly.prepare("SELECT id FROM records").pluck().all()).toEqual([1]);
  });

  it("returns null when a readonly database does not exist", async () => {
    expect(await openSqliteDatabase(databasePath, { readonly: true })).toBeNull();
  });
});
