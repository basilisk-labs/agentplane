import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { LocalBackend, type TaskData } from "./task-backend.js";

describe("LocalBackend handoff-only task directories", () => {
  let tempDir = "";
  let restoreStdIO: (() => void) | null = null;

  beforeEach(async () => {
    restoreStdIO = silenceStdIO();
    tempDir = await mkTempDir();
  });

  afterEach(async () => {
    restoreStdIO?.();
    restoreStdIO = null;
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("ignores handoff-only task directories without README warnings", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300015-ABCD",
      title: "Real task",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["tag"],
      verify: [],
      doc: "## Summary\n\nReal body",
    };
    await backend.writeTask(task);
    const handoffDir = path.join(tempDir, "202601300016-EFGH", "handoff");
    await mkdir(handoffDir, { recursive: true });
    await writeFile(path.join(handoffDir, "latest.json"), "{}\n", "utf8");
    await writeFile(path.join(handoffDir, "history.jsonl"), "{}\n", "utf8");

    const tasks = await backend.listTasks();
    const projection = await backend.listProjectionTasks();

    expect(tasks.map((entry) => entry.id)).toEqual([task.id]);
    expect(projection.map((entry) => entry.id)).toEqual([task.id]);
    expect(backend.getLastListWarnings()).toEqual([]);
  });
});
