import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import { renderTaskReadme } from "@agentplaneorg/core";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { LocalBackend, type TaskData } from "./task-backend.js";
import { installTaskBackendTestHarness, makeTempDir } from "./task-backend.test-helpers.js";

installTaskBackendTestHarness();

describe("LocalBackend", () => {
  let tempDir = "";

  beforeEach(async () => {
    tempDir = await makeTempDir();
  });

  afterEach(async () => {
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("writes and reads tasks with docs and metadata", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300000-ABCD",
      title: "Title",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["tag"],
      verify: ["echo ok"],
      doc: "## Summary\n\nDoc body",
    };
    await backend.writeTask(task);
    const loaded = await backend.getTask(task.id);
    expect(loaded?.doc).toContain("## Summary");
    expect(loaded?.doc_updated_by).toBe("tester");
    const doc = await backend.getTaskDoc(task.id);
    expect(doc).toContain("Doc body");

    await backend.setTaskDoc(task.id, "## Summary\n\nUpdated", "bot");
    const updated = await backend.getTask(task.id);
    expect(updated?.doc).toContain("Updated");
    expect(updated?.doc_updated_by).toBe("bot");

    await backend.touchTaskDocMetadata(task.id, "touch");
    const touched = await backend.getTask(task.id);
    expect(touched?.doc_updated_by).toBe("touch");

    const all = await backend.listTasks();
    expect(all).toHaveLength(1);

    const outPath = path.join(tempDir, "tasks.json");
    await backend.exportTasksJson(outPath);
    const raw = JSON.parse(await readFile(outPath, "utf8")) as { tasks: TaskData[] };
    expect(raw.tasks).toHaveLength(1);

    const projectionOutPath = path.join(tempDir, "projection-tasks.json");
    await backend.exportProjectionSnapshot(projectionOutPath);
    const projectionRaw = JSON.parse(await readFile(projectionOutPath, "utf8")) as {
      tasks: TaskData[];
    };
    expect(projectionRaw.tasks).toHaveLength(1);
  });

  it("writes a task index cache for local tasks", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300002-ABCD",
      title: "Index",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: [],
      verify: [],
    };
    await backend.writeTask(task);
    await backend.listTasks();
    const indexPath = path.join(tempDir, ".cache", "tasks-index.v2.json");
    const parsed = JSON.parse(await readFile(indexPath, "utf8")) as {
      schema_version: number;
      byId: Record<string, { task: TaskData }>;
      byPath: Record<string, string>;
    };
    expect(parsed.schema_version).toBe(2);
    expect(Object.keys(parsed.byId)).toHaveLength(1);
    expect(parsed.byId[task.id]?.task.id).toBe(task.id);
    expect(Object.values(parsed.byPath)).toContain(task.id);
  });

  it("does not rewrite task index cache when nothing changed", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300003-ABCD",
      title: "Index stable",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: [],
      verify: [],
    };
    await backend.writeTask(task);
    await backend.listTasks();
    const indexPath = path.join(tempDir, ".cache", "tasks-index.v2.json");
    const firstStat = await stat(indexPath);
    const firstMtime = firstStat.mtimeMs;

    await new Promise((resolve) => setTimeout(resolve, 15));
    await backend.listTasks();
    const secondStat = await stat(indexPath);
    const secondMtime = secondStat.mtimeMs;

    expect(secondMtime).toBe(firstMtime);
  });

  it("defaults doc_updated_by to last comment author", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "agentplane" });
    const task: TaskData = {
      id: "202601300001-ABCD",
      title: "Title",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["tag"],
      verify: [],
      comments: [{ author: "DOCS", body: "Note" }],
      doc: "## Summary\n\nDoc body",
    };
    await backend.writeTask(task);
    const loaded = await backend.getTask(task.id);
    expect(loaded?.doc_updated_by).toBe("DOCS");

    await backend.setTaskDoc(task.id, "## Summary\n\nUpdated");
    const updated = await backend.getTask(task.id);
    expect(updated?.doc_updated_by).toBe("DOCS");
  });

  it("repairs stale rendered body from canonical sections on metadata-only writes", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const taskId = "202601300010-ABCD";
    await mkdir(path.join(tempDir, taskId), { recursive: true });
    await writeFile(
      path.join(tempDir, taskId, "README.md"),
      renderTaskReadme(
        {
          id: taskId,
          title: "Title",
          description: "Desc",
          status: "TODO",
          priority: "med",
          owner: "tester",
          revision: 1,
          depends_on: [],
          tags: ["tag"],
          verify: [],
          plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
          verification: { state: "pending", updated_at: null, updated_by: null, note: null },
          comments: [],
          doc_version: 3,
          doc_updated_at: "2026-01-30T00:00:00Z",
          doc_updated_by: "tester",
          sections: {
            Summary: "Canonical summary",
            Findings: "",
          },
        },
        "## Summary\n\nstale body\n",
      ),
      "utf8",
    );

    await backend.touchTaskDocMetadata(taskId, "touch");
    const repaired = await readFile(path.join(tempDir, taskId, "README.md"), "utf8");
    expect(repaired).toContain("## Summary\n\nCanonical summary");
    expect(repaired).not.toContain("stale body");
  });

  it("rejects duplicate task ids", async () => {
    const backend = new LocalBackend({ dir: tempDir });
    const readme = renderTaskReadme(
      {
        id: "202601300000-ABCD",
        title: "One",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "tester",
        depends_on: [],
        tags: [],
        verify: [],
        doc_version: 2,
        doc_updated_at: "2026-01-30T00:00:00Z",
        doc_updated_by: "tester",
      },
      "## Summary\n\nDoc",
    );
    await mkdir(path.join(tempDir, "A"), { recursive: true });
    await mkdir(path.join(tempDir, "B"), { recursive: true });
    await writeFile(path.join(tempDir, "A", "README.md"), readme, "utf8");
    await writeFile(path.join(tempDir, "B", "README.md"), readme, "utf8");
    await expect(backend.listTasks()).rejects.toThrow(/Duplicate task id/);
  });

  it("skips malformed task entries when listing tasks", async () => {
    const backend = new LocalBackend({ dir: tempDir });
    await mkdir(tempDir, { recursive: true });
    await writeFile(path.join(tempDir, "note.txt"), "hi", "utf8");

    const noReadme = path.join(tempDir, "NO_README");
    await mkdir(noReadme, { recursive: true });

    const badReadmeDir = path.join(tempDir, "BAD_README");
    await mkdir(badReadmeDir, { recursive: true });
    await writeFile(path.join(badReadmeDir, "README.md"), "---\n- list\n---\n", "utf8");

    const emptyFrontmatterDir = path.join(tempDir, "EMPTY");
    await mkdir(emptyFrontmatterDir, { recursive: true });
    await writeFile(path.join(emptyFrontmatterDir, "README.md"), "---\n---\nBody\n", "utf8");

    const noIdDir = path.join(tempDir, "202601300000-ABCE");
    await mkdir(noIdDir, { recursive: true });
    await writeFile(
      path.join(noIdDir, "README.md"),
      [
        "---",
        'title: "No id"',
        'description: ""',
        'status: "TODO"',
        'priority: "med"',
        'owner: "tester"',
        "---",
        "## Summary",
        "",
        "Doc",
      ].join("\n"),
      "utf8",
    );

    await backend.writeTask({
      id: "202601300000-ABCD",
      title: "Valid",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: [],
      verify: [],
    });

    const tasks = await backend.listTasks();
    expect(tasks).toHaveLength(2);
  });

  it("rejects invalid task ids when listing tasks", async () => {
    const backend = new LocalBackend({ dir: tempDir });
    const readme = renderTaskReadme(
      {
        id: "BAD-ID",
        title: "Bad",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "tester",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\nDoc",
    );
    await mkdir(path.join(tempDir, "BAD"), { recursive: true });
    await writeFile(path.join(tempDir, "BAD", "README.md"), readme, "utf8");
    await expect(backend.listTasks()).rejects.toThrow(/Invalid task id/);
  });

  it("uses default root when no settings are provided", () => {
    const backend = new LocalBackend();
    expect(backend.root.endsWith(path.join(".agentplane", "tasks"))).toBe(true);
  });

  it("returns null when getTask cannot find a task", async () => {
    const backend = new LocalBackend({ dir: tempDir });
    const task = await backend.getTask("202601300000-ABCD");
    expect(task).toBeNull();
  });

  it("throws when getTask cannot read the README", async () => {
    const backend = new LocalBackend({ dir: tempDir });
    const taskId = "202601300000-ABCD";
    const readmeDir = path.join(tempDir, taskId, "README.md");
    await mkdir(readmeDir, { recursive: true });
    await expect(backend.getTask(taskId)).rejects.toBeInstanceOf(Error);
  });

  it("rejects writeTask when id is missing", async () => {
    const backend = new LocalBackend({ dir: tempDir });
    await expect(
      backend.writeTask({
        id: "",
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "tester",
        depends_on: [],
        tags: [],
        verify: [],
      }),
    ).rejects.toThrow(/Missing task id \(expected non-empty value\)/);
  });

  it("generates task ids and enforces minimum length", async () => {
    const backend = new LocalBackend({ dir: tempDir });
    await expect(backend.generateTaskId({ length: 3, attempts: 1 })).rejects.toThrow(
      /Invalid length: 3 \(expected >= 4\)/,
    );
    const id = await backend.generateTaskId({ length: 4, attempts: 1 });
    expect(id).toMatch(/^\d{12}-[0-9A-Z]{4,}$/u);
  });

  it("setTaskDoc keeps metadata when doc is unchanged", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const taskId = "202601300000-ABCD";
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "tester",
        depends_on: [],
        tags: [],
        verify: [],
        doc_version: 2,
        doc_updated_at: "2026-01-30T00:00:00Z",
        doc_updated_by: "tester",
      },
      "## Summary\n\nDoc",
    );
    await mkdir(path.join(tempDir, taskId), { recursive: true });
    await writeFile(path.join(tempDir, taskId, "README.md"), readme, "utf8");

    await backend.setTaskDoc(taskId, "## Summary\n\nDoc", "other");
    const updated = await readFile(path.join(tempDir, taskId, "README.md"), "utf8");
    expect(updated).toContain('doc_updated_by: "tester"');
  });
});
