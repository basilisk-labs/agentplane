import { mkdir, readFile, rm, stat, utimes, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { LocalBackend, toTaskSummary, type TaskData, type TaskSummary } from "./task-backend.js";
import {
  parseTaskProjectionPorcelainPath,
  readFreshSqliteTaskProjection,
  resolveTaskProjectionSqlitePath,
} from "./task-backend/local-task-sqlite-cache.js";
import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

type QuerySummaryView = Pick<
  TaskSummary,
  | "id"
  | "title"
  | "description"
  | "status"
  | "priority"
  | "owner"
  | "depends_on"
  | "tags"
  | "verify"
  | "comments"
  | "commit"
>;

function pickQuerySummary(task: TaskSummary): QuerySummaryView {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    owner: task.owner,
    depends_on: task.depends_on,
    tags: task.tags,
    verify: task.verify,
    comments: task.comments,
    commit: task.commit,
  };
}

describe("LocalBackend", () => {
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

  it("writes and reads tasks with docs and metadata", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300000-ABCD",
      title: "Title",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      origin: { system: "manual" },
      depends_on: [],
      tags: ["tag"],
      verify: ["echo ok"],
      doc: "## Summary\n\nDoc body",
    };
    await backend.writeTask(task);
    const loaded = await backend.getTask(task.id);
    expect(loaded?.doc).toContain("## Summary");
    expect(loaded?.doc_updated_by).toBe("tester");
    expect(loaded?.origin).toEqual({ system: "manual" });
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

  it("uses cached projection entries when the README mtime is unchanged", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300006-ABCD",
      title: "Projection",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["tag"],
      verify: [],
      comments: [{ author: "DOCS", body: "keep comment searchability" }],
      events: [
        { type: "status", at: new Date().toISOString(), author: "DOCS", from: "TODO", to: "DOING" },
      ],
      doc: "## Summary\n\nProjection body",
    };
    await backend.writeTask(task);
    await backend.listTasks();

    const firstProjection = await backend.listProjectionTasks();
    const readmePath = path.join(tempDir, task.id, "README.md");
    const indexPath = path.join(tempDir, ".cache", "tasks-index.v2.json");

    await writeFile(readmePath, "---\nbroken\n", "utf8");
    const brokenStat = await stat(readmePath);
    const cachedIndex = JSON.parse(await readFile(indexPath, "utf8")) as {
      schema_version: number;
      readmes?: { entries: { path: string; mtimeMs: number; size: number }[] };
      byId: Record<string, { task: TaskData; readmePath: string; mtimeMs: number; size?: number }>;
      byPath: Record<string, string>;
    };
    cachedIndex.byId[task.id] = {
      ...cachedIndex.byId[task.id],
      mtimeMs: brokenStat.mtimeMs,
      size: brokenStat.size,
    };
    cachedIndex.readmes = {
      entries: [{ path: readmePath, mtimeMs: brokenStat.mtimeMs, size: brokenStat.size }],
    };
    await writeFile(indexPath, JSON.stringify(cachedIndex, null, 2), "utf8");

    const cachedProjection = await backend.listProjectionTasks();

    expect(firstProjection).toHaveLength(1);
    expect(cachedProjection).toHaveLength(1);
    expect(cachedProjection[0]?.id).toBe(task.id);
    expect(cachedProjection[0]?.comments).toEqual(task.comments);
    expect(cachedProjection[0]).not.toHaveProperty("doc");
    expect(cachedProjection[0]).not.toHaveProperty("sections");
    expect(cachedProjection[0]).not.toHaveProperty("events");
  });

  it("invalidates projection cache when the task README set changes without git dirtiness", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const firstTask: TaskData = {
      id: "202601300010-ABCD",
      title: "First projection task",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["tag"],
      verify: [],
      doc: "## Summary\n\nFirst body",
    };
    const secondTask: TaskData = {
      id: "202601300011-ABCD",
      title: "Second projection task",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["tag"],
      verify: [],
      doc: "## Summary\n\nSecond body",
    };

    await backend.writeTask(firstTask);
    await backend.listTasks();
    expect(await backend.listProjectionTasks()).toHaveLength(1);

    await backend.writeTask(secondTask);
    const projection = await backend.listProjectionTasks();

    expect(projection.map((task) => task.id)).toEqual([firstTask.id, secondTask.id]);
  });

  it("does not rebuild a missing task index cache from projection-only reads", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300009-ABCD",
      title: "Read only projection",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: [],
      verify: [],
      doc: "## Summary\n\nProjection body",
    };
    await backend.writeTask(task);
    const indexPath = path.join(tempDir, ".cache", "tasks-index.v2.json");
    await rm(indexPath, { force: true });

    const projection = await backend.listProjectionTasks();

    expect(projection.map((entry) => entry.id)).toEqual([task.id]);
    await expect(stat(indexPath)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("writes a SQLite projection cache from projection-only reads", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300014-ABCD",
      title: "SQLite projection",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["projection"],
      verify: [],
      comments: [{ author: "TESTER", body: "cached summary" }],
      doc: "## Summary\n\nSQLite body",
    };
    await backend.writeTask(task);

    const projection = await backend.listProjectionTasks();
    const readmePath = path.join(tempDir, task.id, "README.md");
    const readmeStat = await stat(readmePath);
    const sqlitePath = resolveTaskProjectionSqlitePath(tempDir);
    const sqliteProjection = await readFreshSqliteTaskProjection({
      tasksDir: tempDir,
      fingerprintEntries: [
        { path: readmePath, mtimeMs: readmeStat.mtimeMs, size: readmeStat.size },
      ],
    });

    expect(projection.map((entry) => entry.id)).toEqual([task.id]);
    const sqliteStat = await stat(sqlitePath);

    expect(sqliteStat.size).toBeGreaterThan(0);
    expect(sqliteProjection?.map((entry) => pickQuerySummary(entry))).toEqual(
      projection.map((entry) => pickQuerySummary(entry)),
    );
  });

  it("stores repository task projections in the shared context SQLite file", async () => {
    const tasksDir = path.join(tempDir, ".agentplane", "tasks");
    await mkdir(path.join(tempDir, ".git"), { recursive: true });

    expect(resolveTaskProjectionSqlitePath(tasksDir)).toBe(
      path.join(tempDir, ".agentplane", "cache.sqlite"),
    );
  });

  it("parses quoted git porcelain task paths before hashing dirty files", () => {
    expect(parseTaskProjectionPorcelainPath(' M ".agentplane/tasks/T-1/notes with space.md"')).toBe(
      ".agentplane/tasks/T-1/notes with space.md",
    );
    expect(
      parseTaskProjectionPorcelainPath(
        'R  ".agentplane/tasks/T-1/old.md" -> ".agentplane/tasks/T-1/new name.md"',
      ),
    ).toBe(".agentplane/tasks/T-1/new name.md");
    expect(parseTaskProjectionPorcelainPath(" M .agentplane/tasks/T-1/README.md")).toBe(
      ".agentplane/tasks/T-1/README.md",
    );
  });

  it("reparses projection entries after README invalidation", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300007-ABCD",
      title: "Projection",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["tag"],
      verify: [],
      comments: [{ author: "DOCS", body: "before update" }],
      doc: "## Summary\n\nProjection body",
    };
    await backend.writeTask(task);
    await backend.listProjectionTasks();

    const updatedTask: TaskData = {
      ...task,
      title: "Projection updated",
      comments: [
        { author: "DOCS", body: "before update" },
        { author: "CODER", body: "after invalidation" },
      ],
    };
    await backend.writeTask(updatedTask);

    const projection = await backend.listProjectionTasks();

    expect(projection).toHaveLength(1);
    expect(projection[0]?.title).toBe("Projection updated");
    expect(projection[0]?.comments).toEqual(updatedTask.comments);
  });

  it("keeps full task reads canonical after warming the projection cache", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300008-ABCD",
      title: "Full read",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["tag"],
      verify: [],
      comments: [{ author: "DOCS", body: "keep comment searchability" }],
      doc: "## Summary\n\nFull body",
    };
    await backend.writeTask(task);
    await backend.listProjectionTasks();

    const fullTasks = await backend.listTasks();

    expect(fullTasks).toHaveLength(1);
    expect(fullTasks[0]?.id).toBe(task.id);
    expect(fullTasks[0]?.doc).toContain("## Summary");
    expect(fullTasks[0]?.doc).toContain("Full body");
  });

  it("keeps query-visible summary fields consistent with canonical full reads", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const firstTask: TaskData = {
      id: "202601300012-ABCD",
      title: "Projection query fixture",
      description: "Searchable summary body",
      status: "DOING",
      priority: "high",
      owner: "CODER",
      depends_on: ["202601300013-ABCD"],
      tags: ["backend", "projection"],
      verify: ["bunx vitest run task-query"],
      comments: [{ author: "DOCS", body: "comment text remains searchable" }],
      commit: { hash: "abc1234", message: "Implement projection fast path" },
      doc: "## Summary\n\nProjection query body",
    };
    const secondTask: TaskData = {
      id: "202601300013-ABCD",
      title: "Dependency fixture",
      description: "Dependency task",
      status: "DONE",
      priority: "low",
      owner: "TESTER",
      depends_on: [],
      tags: ["backend"],
      verify: [],
      comments: [{ author: "TESTER", body: "dependency note" }],
      commit: { hash: "def5678", message: "Finish dependency" },
      doc: "## Summary\n\nDependency body",
    };
    await backend.writeTask(firstTask);
    await backend.writeTask(secondTask);

    await backend.listProjectionTasks();
    const projection = await backend.listProjectionTasks();
    const fullTasks = await backend.listTasks();

    expect(projection.map((task) => pickQuerySummary(task))).toEqual(
      fullTasks.map((task) => pickQuerySummary(toTaskSummary(task))),
    );
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
      comments: [{ author: "DOCS", body: "keep cache searchability" }],
      events: [
        { type: "status", at: new Date().toISOString(), author: "DOCS", from: "TODO", to: "DOING" },
      ],
      doc: "## Summary\n\nCache body",
    };
    await backend.writeTask(task);
    await backend.listTasks();
    const indexPath = path.join(tempDir, ".cache", "tasks-index.v2.json");
    const parsed = JSON.parse(await readFile(indexPath, "utf8")) as {
      schema_version: number;
      readmes?: { entries: unknown[] };
      byId: Record<string, { task: TaskData }>;
      byPath: Record<string, string>;
    };
    expect(parsed.schema_version).toBe(2);
    expect(parsed.readmes?.entries).toHaveLength(1);
    expect(Object.keys(parsed.byId)).toHaveLength(1);
    expect(parsed.byId[task.id]?.task.id).toBe(task.id);
    expect(parsed.byId[task.id]?.task.comments).toEqual(task.comments);
    expect(parsed.byId[task.id]?.task).not.toHaveProperty("doc");
    expect(parsed.byId[task.id]?.task).not.toHaveProperty("sections");
    expect(parsed.byId[task.id]?.task).not.toHaveProperty("events");
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
    await utimes(indexPath, firstStat.atime, new Date("2020-01-01T00:00:00.000Z"));
    const visibleFirstStat = await stat(indexPath);
    await backend.listTasks();
    const secondStat = await stat(indexPath);
    const secondMtime = secondStat.mtimeMs;

    expect(secondMtime).toBe(visibleFirstStat.mtimeMs);
  });

  it("rebuilds the task index cache after the cache file is deleted", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300004-ABCD",
      title: "Index rebuild",
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
    await rm(indexPath, { force: true });

    const listed = await backend.listTasks();
    const rebuilt = JSON.parse(await readFile(indexPath, "utf8")) as {
      byId: Record<string, { task: TaskData }>;
    };

    expect(listed.map((entry) => entry.id)).toContain(task.id);
    expect(rebuilt.byId[task.id]?.task.id).toBe(task.id);
  });

  it("recovers from a corrupt task index cache by rebuilding it", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202601300005-ABCD",
      title: "Index recover",
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
    await writeFile(indexPath, "{not-json", "utf8");

    const listed = await backend.listTasks();
    const rebuilt = JSON.parse(await readFile(indexPath, "utf8")) as {
      schema_version: number;
      byId: Record<string, { task: TaskData }>;
    };

    expect(listed.map((entry) => entry.id)).toContain(task.id);
    expect(rebuilt.schema_version).toBe(2);
    expect(rebuilt.byId[task.id]?.task.id).toBe(task.id);
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
    const canonicalReadme = renderTaskReadme(
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
      "",
    );
    await writeFile(
      path.join(tempDir, taskId, "README.md"),
      canonicalReadme.replace(/\n## Summary[\s\S]*$/u, "\n## Summary\n\nstale body\n"),
      "utf8",
    );

    await backend.touchTaskDocMetadata(taskId, "touch");
    const repaired = await readFile(path.join(tempDir, taskId, "README.md"), "utf8");
    expect(repaired).toContain('Summary: "Canonical summary"');
    expect(repaired).toContain("## Summary");
    expect(repaired).not.toContain("stale body");
  });

  it("reads canonical doc from frontmatter sections when the README body is stale", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const taskId = "202601300010-CANON";
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
            Plan: "Canonical plan",
            Findings: "",
          },
        },
        "## Summary\n\nstale body\n",
      ),
      "utf8",
    );

    const doc = await backend.getTaskDoc(taskId);

    expect(doc).toContain("Canonical summary");
    expect(doc).toContain("Canonical plan");
    expect(doc).not.toContain("stale body");
  });

  it("repairs projection drift through normalizeTasks", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const taskId = "202601300011-ABCD";
    await mkdir(path.join(tempDir, taskId), { recursive: true });
    const canonicalReadme = renderTaskReadme(
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
      "",
    );
    await writeFile(
      path.join(tempDir, taskId, "README.md"),
      canonicalReadme.replace(/\n## Summary[\s\S]*$/u, "\n## Summary\n\nstale body\n"),
      "utf8",
    );

    const result = await backend.normalizeTasks();
    const repaired = await readFile(path.join(tempDir, taskId, "README.md"), "utf8");
    expect(result).toEqual({ scanned: 1, changed: 1 });
    expect(repaired).toContain('Summary: "Canonical summary"');
    expect(repaired).toContain("## Summary");
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
        doc_version: 3,
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
        "depends_on: []",
        "tags: []",
        "verify: []",
        'plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null }',
        'verification: { state: "pending", updated_at: null, updated_by: null, note: null }',
        "comments: []",
        "doc_version: 3",
        `doc_updated_at: "${new Date().toISOString()}"`,
        'doc_updated_by: "tester"',
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
        plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
        verification: { state: "pending", updated_at: null, updated_by: null, note: null },
        comments: [],
        doc_version: 3,
        doc_updated_at: "2026-01-30T00:00:00Z",
        doc_updated_by: "tester",
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

  it("rejects invalid task README frontmatter in getTask", async () => {
    const backend = new LocalBackend({ dir: tempDir });
    const taskId = "202601300099-ABCD";
    await mkdir(path.join(tempDir, taskId), { recursive: true });
    await writeFile(
      path.join(tempDir, taskId, "README.md"),
      [
        "---",
        `id: "${taskId}"`,
        `title: "Broken"`,
        'status: "TODO"',
        'priority: "med"',
        'owner: "tester"',
        "depends_on: []",
        "tags: []",
        "verify: []",
        'plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null }',
        'verification: { state: "pending", updated_at: null, updated_by: null, note: null }',
        "comments: []",
        "doc_version: 3",
        `doc_updated_at: "${new Date().toISOString()}"`,
        'doc_updated_by: "tester"',
        'description: "Broken"',
        'dirty: "no"',
        "---",
        "## Summary",
      ].join("\n"),
      "utf8",
    );

    await expect(backend.getTask(taskId)).rejects.toThrow(
      /task README frontmatter schema validation failed/u,
    );
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

  it("rejects writeTask when expectedRevision does not match the stored revision", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const taskId = "202601300020-ABCD";
    await backend.writeTask({
      id: taskId,
      title: "Task",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "tester",
      revision: 2,
      depends_on: [],
      tags: [],
      verify: [],
      doc: "## Summary\n\nDoc",
    });

    await expect(
      backend.writeTask(
        {
          id: taskId,
          title: "Task",
          description: "",
          status: "DOING",
          priority: "med",
          owner: "tester",
          depends_on: [],
          tags: [],
          verify: [],
        },
        { expectedRevision: 1 },
      ),
    ).rejects.toThrow(/Task revision changed concurrently/u);
  });

  it("rejects setTaskDoc when expectedRevision does not match the stored revision", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const taskId = "202601300021-ABCD";
    await backend.writeTask({
      id: taskId,
      title: "Task",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "tester",
      revision: 3,
      depends_on: [],
      tags: [],
      verify: [],
      doc: "## Summary\n\nDoc",
    });

    await expect(
      backend.setTaskDoc(taskId, "## Summary\n\nUpdated", "tester", { expectedRevision: 2 }),
    ).rejects.toThrow(/Task revision changed concurrently/u);
  });

  it("rejects setTaskDoc when the expected current doc no longer matches", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const taskId = "202601300022-ABCD";
    await backend.writeTask({
      id: taskId,
      title: "Task",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "tester",
      revision: 3,
      depends_on: [],
      tags: [],
      verify: [],
      doc: ["## Summary", "", "Current", "", "## Plan", "", "Plan", ""].join("\n"),
    });

    await expect(
      backend.setTaskDoc(
        taskId,
        ["## Summary", "", "Updated", "", "## Plan", "", "Plan", ""].join("\n"),
        "tester",
        {
          expectedCurrentDoc: ["## Summary", "", "Stale", "", "## Plan", "", "Plan", ""].join("\n"),
        },
      ),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "task_readme_conflict", task_id: taskId },
    });
  });

  it("rejects setTaskDoc when the expected current section text no longer matches", async () => {
    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const taskId = "202601300023-ABCD";
    await backend.writeTask({
      id: taskId,
      title: "Task",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "tester",
      revision: 3,
      depends_on: [],
      tags: [],
      verify: [],
      doc: ["## Summary", "", "Current", "", "## Plan", "", "Plan", ""].join("\n"),
    });

    await expect(
      backend.setTaskDoc(
        taskId,
        ["## Summary", "", "Updated", "", "## Plan", "", "Plan", ""].join("\n"),
        "tester",
        {
          expectedCurrentText: "Stale",
          expectedSection: "Summary",
        },
      ),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: {
        reason_code: "task_readme_section_conflict",
        task_id: taskId,
        section: "Summary",
      },
    });
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
        doc_version: 3,
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
