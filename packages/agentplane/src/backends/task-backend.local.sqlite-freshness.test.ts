import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { LocalBackend, type TaskData } from "./task-backend.js";
import { readFreshSqliteTaskProjection } from "./task-backend/local-task-sqlite-cache.js";

describe("LocalBackend SQLite projection freshness", () => {
  let tempDir = "";
  let restoreStdIO: (() => void) | null = null;

  beforeEach(async () => {
    restoreStdIO = silenceStdIO();
    tempDir = await mkTempDir();
  });

  afterEach(async () => {
    restoreStdIO?.();
    restoreStdIO = null;
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
  });

  it("serves a fresh SQLite projection when a task directory has no README", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300015-ABCE",
      title: "SQLite projection with orphan directory",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: [],
      verify: [],
      comments: [],
      doc: "## Summary\n\nbody",
    };
    await backend.writeTask(task);
    // An empty task directory is an ignorable orphan for listing; it must not disable the cache.
    await mkdir(path.join(tempDir, "202601300016-ORPHAN"));

    const projection = await backend.listProjectionTasks();
    const cached = await readFreshSqliteTaskProjection({ tasksDir: tempDir });

    expect(projection.map((entry) => entry.id)).toEqual([task.id]);
    expect(cached?.map((entry) => entry.id)).toEqual([task.id]);

    await writeFile(
      path.join(tempDir, task.id, "README.md"),
      `${await readFile(path.join(tempDir, task.id, "README.md"), "utf8")}\nchanged\n`,
    );
    expect(await readFreshSqliteTaskProjection({ tasksDir: tempDir })).toBeNull();
  });
});
