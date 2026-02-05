import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { renderTaskReadme, type TaskRecord } from "@agentplaneorg/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  BackendError,
  LocalBackend,
  RedmineBackend,
  RedmineUnavailable,
  buildTasksExportSnapshotFromTasks,
  extractTaskDoc,
  loadTaskBackend,
  mergeTaskDoc,
  taskRecordToData,
  writeTasksExportFromTasks,
  type TaskData,
} from "./task-backend.js";
import { silenceStdIO } from "../cli/run-cli.test-helpers.js";

const TMP_PREFIX = "agentplane-task-backend-";
let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

async function makeTempDir(): Promise<string> {
  return await mkdtemp(path.join(os.tmpdir(), TMP_PREFIX));
}

const makeIssue = (priorityName?: string): Record<string, unknown> => ({
  id: 1,
  subject: "Subject",
  description: "Desc",
  status: { id: 1 },
  priority: priorityName ? { name: priorityName } : undefined,
  custom_fields: [
    { id: 2, value: '["echo ok"]' },
    { id: 3, value: '{"hash":"h","message":"m"}' },
    { id: 4, value: "note" },
    { id: 5, value: "2" },
  ],
  updated_on: "2026-01-30T00:00:00Z",
});

describe("task-backend helpers", () => {
  it("extractTaskDoc returns the doc section and excludes auto summary", () => {
    const body = [
      "# Title",
      "",
      "## Summary",
      "",
      "Doc line 1",
      "Doc line 2",
      "",
      "## Changes Summary (auto)",
      "- item",
    ].join("\n");
    expect(extractTaskDoc(body)).toBe("## Summary\n\nDoc line 1\nDoc line 2");
  });

  it("extractTaskDoc returns empty when summary is missing", () => {
    expect(extractTaskDoc("No summary here")).toBe("");
  });

  it("extractTaskDoc returns empty for empty body", () => {
    expect(extractTaskDoc("")).toBe("");
  });

  it("extractTaskDoc returns summary when auto summary is absent", () => {
    const body = ["# Header", "", "## Summary", "", "Doc line"].join("\n");
    expect(extractTaskDoc(body)).toBe("## Summary\n\nDoc line");
  });

  it("extractTaskDoc dedupes repeated section blocks", () => {
    const body = [
      "## Summary",
      "",
      "## Scope",
      "",
      "## Risks",
      "",
      "## Summary",
      "",
      "Doc line",
    ].join("\n");
    const doc = extractTaskDoc(body);
    expect((doc.match(/^## Summary$/gm) ?? []).length).toBe(1);
    expect(doc).toContain("Doc line");
  });

  it("extractTaskDoc normalizes concatenated summary heading", () => {
    const body = [
      "# Title",
      "",
      "## Summary## Summary",
      "",
      "Doc line",
      "",
      "## Changes Summary (auto)",
      "- item",
    ].join("\n");
    expect(extractTaskDoc(body)).toBe("## Summary\n\nDoc line");
  });

  it("mergeTaskDoc keeps prefix and auto summary blocks", () => {
    const body = [
      "# Header",
      "",
      "## Summary",
      "Old doc",
      "",
      "## Changes Summary (auto)",
      "- auto",
    ].join("\n");
    const merged = mergeTaskDoc(body, "## Summary\n\nNew doc");
    expect(merged).toContain("# Header");
    expect(merged).toContain("## Summary\n\nNew doc");
    expect(merged).toContain("## Changes Summary (auto)");
  });

  it("mergeTaskDoc returns original body when doc is empty", () => {
    const body = "## Summary\n\nBody\n";
    expect(mergeTaskDoc(body, "")).toBe(body);
  });

  it("mergeTaskDoc treats null doc as empty", () => {
    const body = "## Summary\n\nBody\n";
    expect(mergeTaskDoc(body, null as unknown as string)).toBe(body);
  });

  it("mergeTaskDoc replaces concatenated summary heading", () => {
    const body = [
      "## Summary## Summary",
      "Old doc",
      "",
      "## Changes Summary (auto)",
      "- auto",
    ].join("\n");
    const merged = mergeTaskDoc(body, "## Summary\n\nNew doc");
    expect(merged).not.toContain("## Summary## Summary");
    expect(merged).toContain("## Summary\n\nNew doc");
    expect(merged).toContain("## Changes Summary (auto)");
  });

  it("mergeTaskDoc inserts doc when no prefix or auto summary exists", () => {
    const body = ["## Summary", "", "Old doc"].join("\n");
    const merged = mergeTaskDoc(body, "## Summary\n\nNew doc");
    expect(merged).toBe("## Summary\n\nNew doc\n");
  });

  it("taskRecordToData tolerates missing or invalid frontmatter fields", () => {
    const record = {
      id: "202601300000-ABCD",
      frontmatter: {
        id: 123,
        title: 456,
        description: 789,
        status: 42,
        priority: {},
        owner: 77,
        depends_on: "nope",
        tags: 99,
        verify: null,
        commit: { hash: "abc", message: 123 },
        comments: "bad",
      },
      body: "No summary here",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.commit).toBeNull();
    expect(data.comments).toEqual([]);
    expect(data.doc).toBeUndefined();
    expect(data.title).toBe("");
    expect(data.description).toBe("");
    expect(data.owner).toBe("");
    expect(data.priority).toBe("");
  });

  it("taskRecordToData treats depends_on ['[]'] as empty", () => {
    const record = {
      id: "202601300000-ABCD",
      frontmatter: {
        id: "202601300000-ABCD",
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "tester",
        depends_on: ["[]"],
        tags: [],
        verify: [],
      },
      body: "## Summary\n\nDoc text\n",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.depends_on).toEqual([]);
  });

  it("buildTasksExportSnapshotFromTasks normalizes task fields", () => {
    const snapshot = buildTasksExportSnapshotFromTasks([
      {
        id: "202601300000-ABCD",
        title: "Title",
        description: "Desc",
        status: "TODO",
        priority: 2,
        owner: "CODER",
        depends_on: "nope" as unknown as string[],
        tags: ["ok", 1 as unknown as string],
        verify: null as unknown as string[],
        comments: [
          { author: "a", body: "b" },
          { author: 1 as unknown as string, body: "c" },
        ],
      },
    ]);

    const task = snapshot.tasks[0];
    if (!task) throw new Error("missing task");
    expect(task.priority).toBe("2");
    expect(task.depends_on).toEqual([]);
    expect(task.tags).toEqual(["ok"]);
    expect(task.verify).toEqual([]);
    expect(task.comments).toEqual([{ author: "a", body: "b" }]);
    expect(task.doc_version).toBe(2);
    expect(task.doc_updated_by).toBe("a");
    expect(task.dirty).toBe(false);
    expect(task.id_source).toBe("generated");
  });
  it("taskRecordToData parses doc, comments, commit, and dirty", () => {
    const record = {
      id: "202601300000-ABCD",
      frontmatter: {
        id: "202601300000-ABCD",
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "tester",
        depends_on: [],
        tags: ["a"],
        verify: ["echo ok"],
        commit: { hash: "abc", message: "msg" },
        comments: [{ author: "me", body: "note" }],
        dirty: true,
      },
      body: "## Summary\n\nDoc text\n",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.doc).toBe("## Summary\n\nDoc text");
    expect(data.commit).toEqual({ hash: "abc", message: "msg" });
    expect(data.comments).toEqual([{ author: "me", body: "note" }]);
    expect(data.dirty).toBe(true);
  });

  it("taskRecordToData defaults missing or invalid fields", () => {
    const record = {
      id: 123,
      frontmatter: {
        id: 456,
        title: 1,
        description: null,
        status: 9,
        priority: {},
        owner: false,
        depends_on: "nope",
        tags: 5,
        verify: null,
        commit: { hash: 1, message: true },
        comments: [{ author: "ok", body: 2 }],
        doc_version: "2",
        doc_updated_at: 123,
        doc_updated_by: 456,
        dirty: "yes",
        id_source: 9,
      },
      body: "",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.id).toBe("");
    expect(data.status).toBe("TODO");
    expect(data.priority).toBe("");
    expect(data.commit).toBeNull();
    expect(data.comments).toEqual([]);
  });

  it("taskRecordToData falls back to record.id when frontmatter id is missing", () => {
    const record = {
      id: "202601300000-ABCD",
      frontmatter: {
        id: 123,
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "tester",
      },
      body: "",
    } as unknown as TaskRecord;
    const data = taskRecordToData(record);
    expect(data.id).toBe("202601300000-ABCD");
  });

  it("buildTasksExportSnapshotFromTasks produces checksum and stable order", () => {
    const tasks: TaskData[] = [
      {
        id: "202601300000-BCDE",
        title: "B",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "o",
        depends_on: [],
        tags: [],
        verify: [],
      },
      {
        id: "202601300000-ABCD",
        title: "A",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "o",
        depends_on: [],
        tags: [],
        verify: [],
      },
    ];
    const snapshot = buildTasksExportSnapshotFromTasks(tasks);
    expect(snapshot.tasks[0]?.id).toBe("202601300000-ABCD");
    expect(snapshot.meta.checksum).toHaveLength(64);
  });

  it("writeTasksExportFromTasks writes a stable snapshot", async () => {
    const outDir = await makeTempDir();
    const outPath = path.join(outDir, "tasks.json");
    await writeTasksExportFromTasks({
      outputPath: outPath,
      tasks: [
        {
          id: "202601300000-ABCD",
          title: "Task",
          description: "",
          status: "TODO",
          priority: "med",
          owner: "o",
          depends_on: [],
          tags: [],
          verify: [],
        },
      ],
    });
    const raw = JSON.parse(await readFile(outPath, "utf8")) as {
      tasks: TaskData[];
      meta: { checksum: string };
    };
    expect(raw.tasks).toHaveLength(1);
    expect(raw.meta.checksum).toHaveLength(64);
    await rm(outDir, { recursive: true, force: true });
  });
});

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
    const indexPath = path.join(tempDir, ".cache", "tasks-index.v1.json");
    const parsed = JSON.parse(await readFile(indexPath, "utf8")) as {
      schema_version: number;
      tasks: { task: TaskData }[];
    };
    expect(parsed.schema_version).toBe(1);
    expect(parsed.tasks).toHaveLength(1);
    expect(parsed.tasks[0]?.task.id).toBe(task.id);
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

describe("RedmineBackend (mocked)", () => {
  let tempDir = "";
  let originalEnv: NodeJS.ProcessEnv = {};

  beforeEach(async () => {
    tempDir = await makeTempDir();
    originalEnv = { ...process.env };
    process.env.CODEXSWARM_REDMINE_URL = "https://redmine.example";
    process.env.CODEXSWARM_REDMINE_API_KEY = "key";
    process.env.CODEXSWARM_REDMINE_PROJECT_ID = "proj";
    process.env.CODEXSWARM_REDMINE_OWNER = "REDMINE";
    process.env.CODEXSWARM_REDMINE_ASSIGNEE_ID = "7";
  });

  afterEach(async () => {
    process.env = originalEnv;
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
    vi.restoreAllMocks();
  });

  it("maps issues to tasks and syncs to cache", async () => {
    const issues: Record<string, unknown>[] = [
      {
        id: 101,
        subject: "Issue",
        description: "Desc",
        status: { id: 5, name: "Done" },
        priority: { name: "Urgent" },
        tags: [{ name: "tag1" }],
        custom_fields: [
          { id: 1, value: "202601300000-ABCD" },
          { id: 2, value: "{bad" },
          { id: 3, value: '{"hash":"h","message":"m"}' },
          { id: 4, value: "plain note" },
          { id: 5, value: "Doc" },
          { id: 6, value: "2" },
          { id: 7, value: "2026-01-30T00:00:00Z" },
          { id: 8, value: "tester" },
        ],
        updated_on: "2026-01-30T00:00:00Z",
      },
    ];

    vi.stubGlobal("fetch", (url: string, init?: RequestInit) => {
      const reqUrl = new URL(url);
      const pathname = reqUrl.pathname.replace(/^\//u, "");
      const method = init?.method ?? "GET";
      if (pathname === "issues.json" && method === "GET") {
        return Response.json({ issues, total_count: issues.length }, { status: 200 });
      }
      if (pathname.startsWith("issues/") && method === "GET") {
        const id = Number(pathname.split("/")[1]?.replace(".json", ""));
        const issue = issues.find((item) => item.id === id);
        return Response.json({ issue }, { status: 200 });
      }
      return new Response("not found", { status: 404 });
    });

    const cache = new LocalBackend({ dir: tempDir });
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { DONE: 5, TODO: 1 },
        custom_fields: {
          task_id: 1,
          verify: 2,
          commit: 3,
          comments: 4,
          doc: 5,
          doc_version: 6,
          doc_updated_at: 7,
          doc_updated_by: 8,
        },
      },
      { cache },
    );

    const tasks = await backend.listTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]?.status).toBe("DONE");
    expect(tasks[0]?.priority).toBe("high");

    const task = await backend.getTask("202601300000-ABCD");
    expect(task?.title).toBe("Issue");

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: false,
    });
    const cached = await cache.listTasks();
    expect(cached).toHaveLength(1);
  });

  it("creates issues on writeTask and writes custom fields", async () => {
    const issues: Record<string, unknown>[] = [];
    let createdPayload: Record<string, unknown> | null = null;
    let nextId = 200;

    const parseBody = (init?: RequestInit): { issue?: Record<string, unknown> } | null => {
      const raw = typeof init?.body === "string" ? init.body : "";
      if (!raw) return null;
      return JSON.parse(raw) as { issue?: Record<string, unknown> };
    };

    vi.stubGlobal("fetch", (url: string, init?: RequestInit) => {
      const reqUrl = new URL(url);
      const pathname = reqUrl.pathname.replace(/^\//u, "");
      const method = init?.method ?? "GET";
      const body = parseBody(init);
      if (pathname === "issues.json" && method === "GET") {
        return Response.json({ issues, total_count: issues.length }, { status: 200 });
      }
      if (pathname === "issues.json" && method === "POST") {
        createdPayload = body?.issue ?? null;
        const issue = {
          id: nextId++,
          subject: createdPayload?.subject,
          description: createdPayload?.description,
          status: { id: createdPayload?.status_id ?? 1 },
          priority: { name: "Normal" },
          custom_fields: createdPayload?.custom_fields ?? [],
        };
        issues.push(issue);
        return Response.json({ issue }, { status: 200 });
      }
      if (pathname.startsWith("issues/") && method === "PUT") {
        return Response.json({}, { status: 200 });
      }
      if (pathname.startsWith("issues/") && method === "GET") {
        const id = Number(pathname.split("/")[1]?.replace(".json", ""));
        const issue = issues.find((item) => item.id === id);
        return Response.json({ issue }, { status: 200 });
      }
      return new Response("not found", { status: 404 });
    });

    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: {
          task_id: 1,
          verify: 2,
          commit: 3,
          comments: 4,
          doc: 5,
          doc_version: 6,
          doc_updated_at: 7,
          doc_updated_by: 8,
        },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );

    await backend.writeTask({
      id: "202601300000-ABCD",
      title: "New task",
      description: "Desc",
      status: "DONE",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: ["t"],
      verify: ["echo ok"],
      commit: { hash: "abc", message: "msg" },
      comments: [{ author: "a", body: "b" }],
      doc: "## Summary\n\nDoc",
    });

    expect(issues).toHaveLength(1);
    const created = createdPayload as {
      custom_fields?: unknown;
      assigned_to_id?: number;
      done_ratio?: number;
      start_date?: string;
    } | null;
    expect(created?.custom_fields).toBeDefined();
    expect(created?.assigned_to_id).toBe(7);
    expect(created?.done_ratio).toBe(100);
    expect(created?.start_date).toBe("2026-01-30");
  });

  it("builds payloads with existing assignees and status mapping", () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      taskToIssuePayload: (
        task: TaskData,
        existingIssue?: Record<string, unknown>,
      ) => Record<string, unknown>;
    };
    const payload = helper.taskToIssuePayload(
      {
        id: "202601300000-ABCD",
        title: "Title",
        description: "Desc",
        status: "TODO",
        priority: 2,
        owner: "REDMINE",
        depends_on: [],
        tags: [],
        verify: [],
      },
      { assigned_to: { id: 999 } },
    );
    expect(payload.status_id).toBe(1);
    expect(payload.priority_id).toBe(2);
    expect(payload.assigned_to_id).toBeUndefined();
  });

  it("normalizes priority values when mapping issues", () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: { task_id: 1, verify: 2, commit: 3, comments: 4, doc_version: 5 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
    };

    expect(helper.issueToTask(makeIssue("low"), "202601300000-ABCD")?.priority).toBe("low");
    expect(helper.issueToTask(makeIssue("normal"), "202601300000-ABCD")?.priority).toBe("normal");
    expect(helper.issueToTask(makeIssue("medium"), "202601300000-ABCD")?.priority).toBe("med");
    expect(helper.issueToTask(makeIssue("med"), "202601300000-ABCD")?.priority).toBe("med");
    expect(helper.issueToTask(makeIssue("high"), "202601300000-ABCD")?.priority).toBe("high");
    expect(helper.issueToTask(makeIssue("urgent"), "202601300000-ABCD")?.priority).toBe("high");
    expect(helper.issueToTask(makeIssue("immediate"), "202601300000-ABCD")?.priority).toBe("high");
    expect(helper.issueToTask(makeIssue("weird"), "202601300000-ABCD")?.priority).toBe("med");
    expect(helper.issueToTask(makeIssue(), "202601300000-ABCD")?.priority).toBe("med");
  });

  it("throws when duplicate task_id values exist", async () => {
    const issues: Record<string, unknown>[] = [
      {
        id: 1,
        subject: "One",
        description: "",
        status: { id: 1 },
        custom_fields: [{ id: 1, value: "202601300000-ABCD" }],
      },
      {
        id: 2,
        subject: "Two",
        description: "",
        status: { id: 1 },
        custom_fields: [{ id: 1, value: "202601300000-ABCD" }],
      },
    ];

    vi.stubGlobal("fetch", (url: string, init?: RequestInit) => {
      const reqUrl = new URL(url);
      const pathname = reqUrl.pathname.replace(/^\//u, "");
      const method = init?.method ?? "GET";
      if (pathname === "issues.json" && method === "GET") {
        return Response.json({ issues, total_count: issues.length }, { status: 200 });
      }
      return new Response("not found", { status: 404 });
    });

    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );

    await expect(backend.listTasks()).rejects.toBeInstanceOf(BackendError);
  });

  it("syncPush requires cache and confirmation", async () => {
    const backendNoCache = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache: null },
    );
    await expect(
      backendNoCache.sync({ direction: "push", conflict: "diff", quiet: true, confirm: true }),
    ).rejects.toBeInstanceOf(BackendError);

    const cache = new LocalBackend({ dir: tempDir });
    await cache.writeTask({
      id: "202601300000-ABCD",
      title: "Dirty",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
      dirty: true,
    });
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache },
    );
    await expect(
      backend.sync({ direction: "push", conflict: "diff", quiet: true, confirm: false }),
    ).rejects.toBeInstanceOf(BackendError);
  });

  it("syncPull reports conflicts when local dirty differs", async () => {
    const issues: Record<string, unknown>[] = [
      {
        id: 1,
        subject: "Remote",
        description: "Desc",
        status: { id: 1 },
        custom_fields: [{ id: 1, value: "202601300000-ABCD" }],
      },
    ];

    vi.stubGlobal("fetch", (url: string, init?: RequestInit) => {
      const reqUrl = new URL(url);
      const pathname = reqUrl.pathname.replace(/^\//u, "");
      const method = init?.method ?? "GET";
      if (pathname === "issues.json" && method === "GET") {
        return Response.json({ issues, total_count: issues.length }, { status: 200 });
      }
      return new Response("not found", { status: 404 });
    });

    const cache = new LocalBackend({ dir: tempDir });
    await cache.writeTask({
      id: "202601300000-ABCD",
      title: "Local",
      description: "Local",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
      dirty: true,
    });
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: { task_id: 1 },
      },
      { cache },
    );

    await expect(
      backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: false }),
    ).rejects.toBeInstanceOf(BackendError);
  });

  it("exercises parsing helpers and comment sync rules", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1, DONE: 5 },
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helpers = backend as unknown as {
      maybeParseJson: (value: unknown) => unknown;
      coerceDocVersion: (value: unknown) => number | null;
      normalizeComments: (value: unknown) => { author: string; body: string }[];
      commentsToPairs: (comments: { author: string; body: string }[]) => [string, string][];
      formatCommentNote: (author?: string, body?: string) => string;
      appendCommentNotes: (
        issueId: string,
        existingComments: { author: string; body: string }[],
        desiredComments: { author: string; body: string }[],
      ) => Promise<void>;
      startDateFromTaskId: (taskId: string) => string | null;
      doneRatioForStatus: (status: string) => number | null;
      customFieldValue: (issue: Record<string, unknown>, fieldId: unknown) => string | null;
    };

    expect(helpers.maybeParseJson("[1,2]")).toEqual([1, 2]);
    expect(helpers.maybeParseJson('{"a":1}')).toEqual({ a: 1 });
    expect(helpers.maybeParseJson("{bad")).toBe("{bad");
    expect(helpers.maybeParseJson("  ")).toBeNull();

    expect(helpers.coerceDocVersion(3)).toBe(3);
    expect(helpers.coerceDocVersion("7")).toBe(7);
    expect(helpers.coerceDocVersion("v2")).toBeNull();

    expect(helpers.normalizeComments(" note ")).toEqual([{ author: "redmine", body: "note" }]);
    expect(helpers.normalizeComments({ author: "a", body: "b" })).toEqual([
      { author: "a", body: "b" },
    ]);
    expect(
      helpers.normalizeComments([
        { author: "a", body: "b" },
        { author: "x", body: 1 },
      ]),
    ).toEqual([{ author: "a", body: "b" }]);

    expect(
      helpers.commentsToPairs([
        { author: "", body: "" },
        { author: "a", body: "b" },
      ]),
    ).toEqual([["a", "b"]]);
    expect(helpers.formatCommentNote("a", "b")).toBe("[comment] a: b");

    const calls: string[] = [];
    vi.stubGlobal("fetch", (_url: string, init?: RequestInit) => {
      if (init?.body && typeof init.body === "string") {
        const parsed = JSON.parse(init.body) as { issue?: { notes?: string } };
        if (parsed.issue?.notes) calls.push(parsed.issue.notes);
      }
      return Response.json({}, { status: 200 });
    });

    await helpers.appendCommentNotes("1", [{ author: "a", body: "b" }], []);
    await helpers.appendCommentNotes(
      "1",
      [{ author: "a", body: "b" }],
      [{ author: "a", body: "b" }],
    );
    await helpers.appendCommentNotes(
      "1",
      [{ author: "a", body: "b" }],
      [{ author: "x", body: "y" }],
    );
    await helpers.appendCommentNotes(
      "1",
      [{ author: "a", body: "b" }],
      [
        { author: "a", body: "b" },
        { author: "c", body: "d" },
      ],
    );
    expect(calls).toEqual(["[comment] c: d"]);

    expect(helpers.startDateFromTaskId("202601300000-ABCD")).toBe("2026-01-30");
    expect(helpers.startDateFromTaskId("2026AA30-ABCD")).toBeNull();
    expect(helpers.startDateFromTaskId("2026013-ABCD")).toBeNull();
    expect(helpers.startDateFromTaskId("202601300000ABCD")).toBeNull();

    expect(helpers.doneRatioForStatus("DONE")).toBe(100);
    expect(helpers.doneRatioForStatus("TODO")).toBe(0);
    expect(helpers.doneRatioForStatus("")).toBeNull();

    expect(
      helpers.customFieldValue(
        {
          custom_fields: [
            { id: 1, value: null },
            { id: 2, value: 0 },
          ],
        },
        2,
      ),
    ).toBe("0");
    expect(helpers.customFieldValue({ custom_fields: [{ id: 1, value: null }] }, 1)).toBe("");
    expect(helpers.customFieldValue({ custom_fields: [] }, 3)).toBeNull();
  });

  it("retries requestJson and handles malformed responses", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helpers = backend as unknown as {
      requestJson: (
        method: string,
        path: string,
        payload?: Record<string, unknown>,
        params?: Record<string, unknown>,
        opts?: { attempts?: number; backoff?: number },
      ) => Promise<Record<string, unknown>>;
    };

    let call = 0;
    vi.stubGlobal("fetch", () => {
      call += 1;
      if (call === 1) {
        return new Response("boom", { status: 500 });
      }
      if (call === 2) {
        return new Response("[]", { status: 200 });
      }
      return new Response("not-json", { status: 200 });
    });

    expect(
      await helpers.requestJson("GET", "issues.json", undefined, undefined, {
        attempts: 2,
        backoff: 0,
      }),
    ).toEqual({});
    expect(await helpers.requestJson("GET", "issues.json")).toEqual({});

    let retryCall = 0;
    vi.stubGlobal("fetch", () => {
      retryCall += 1;
      if (retryCall === 1) {
        throw new Error("transient");
      }
      return new Response("{}", { status: 200 });
    });
    expect(
      await helpers.requestJson("GET", "issues.json", undefined, undefined, {
        attempts: 2,
        backoff: 0,
      }),
    ).toEqual({});

    vi.stubGlobal("fetch", () => new Response("", { status: 200 }));
    expect(await helpers.requestJson("GET", "issues.json")).toEqual({});

    vi.stubGlobal("fetch", () => new Response("bad", { status: 400 }));
    await expect(helpers.requestJson("GET", "issues.json")).rejects.toBeInstanceOf(BackendError);

    vi.stubGlobal("fetch", () => {
      throw new Error("offline");
    });
    await expect(
      helpers.requestJson("GET", "issues.json", undefined, undefined, { attempts: 1, backoff: 0 }),
    ).rejects.toBeInstanceOf(RedmineUnavailable);
  });

  it("generates task ids via redmine backend", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      listTasksRemote: () => Promise<TaskData[]>;
    };
    helper.listTasksRemote = vi.fn().mockResolvedValue([]);
    const id = await backend.generateTaskId({ length: 4, attempts: 1 });
    expect(id).toMatch(/^\d{12}-[0-9A-Z]{4}$/u);
  });

  it("finds issues by task id from remote payloads", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
      requestJson: (...args: unknown[]) => Promise<Record<string, unknown>>;
    };
    helper.requestJson = vi.fn().mockResolvedValue({
      issues: [{ id: 1, custom_fields: [{ id: 1, value: "202601300000-ABCD" }] }],
    });

    const issue = await helper.findIssueByTaskId("202601300000-ABCD");
    expect(issue?.id).toBe(1);
  });

  it("covers batch pause, custom field updates, and sync errors", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1, doc: 2 },
        batch_size: 1,
        batch_pause: 0.01,
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      setIssueCustomFieldValue: (
        issue: Record<string, unknown>,
        fieldId: unknown,
        value: unknown,
      ) => void;
      cacheTask: (task: TaskData, dirty: boolean) => Promise<void>;
      writeTask: (task: TaskData) => Promise<void>;
    };
    helper.writeTask = vi.fn(() => Promise.resolve());

    vi.useFakeTimers();
    const task: TaskData = {
      id: "202601300000-ABCD",
      title: "Task",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
    };
    const promise = backend.writeTasks([task]);
    await vi.runAllTimersAsync();
    await promise;
    vi.useRealTimers();

    const issue: Record<string, unknown> = {
      custom_fields: [{ id: 1, value: "old" }],
    };
    helper.setIssueCustomFieldValue(issue, 1, "new");
    helper.setIssueCustomFieldValue(issue, 3, "added");
    expect(issue.custom_fields).toEqual([
      { id: 1, value: "new" },
      { id: 3, value: "added" },
    ]);

    await expect(
      (
        backend as unknown as {
          sync: (opts: {
            direction: string;
            conflict: string;
            quiet: boolean;
            confirm: boolean;
          }) => Promise<void>;
        }
      ).sync({ direction: "nope", conflict: "diff", quiet: true, confirm: false }),
    ).rejects.toBeInstanceOf(BackendError);

    const noCache = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache: null },
    );
    await (
      noCache as unknown as { cacheTask: (task: TaskData, dirty: boolean) => Promise<void> }
    ).cacheTask(task, true);
  });

  it("rejects setTaskDoc when doc custom field is missing", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    await expect(backend.setTaskDoc("202601300000-ABCD", "Doc")).rejects.toBeInstanceOf(
      BackendError,
    );
  });

  it("handles redmine unavailability with cache fallbacks", async () => {
    const cache = new LocalBackend({ dir: tempDir });
    const task: TaskData = {
      id: "202601300000-ABCD",
      title: "Cached",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
    };
    await cache.writeTask(task);

    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1, doc: 2 },
      },
      { cache },
    );
    const helper = backend as unknown as {
      listTasksRemote: () => Promise<TaskData[]>;
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
    };
    helper.listTasksRemote = vi.fn(() => {
      throw new RedmineUnavailable("down");
    });
    const tasks = await backend.listTasks();
    expect(tasks).toHaveLength(1);

    helper.findIssueByTaskId = vi.fn(() => {
      throw new RedmineUnavailable("down");
    });
    const cached = await backend.getTask(task.id);
    expect(cached?.id).toBe(task.id);

    await backend.setTaskDoc(task.id, "Doc");
    const updated = await cache.getTask(task.id);
    expect(updated?.dirty).toBe(true);
    const readme = await readFile(path.join(tempDir, task.id, "README.md"), "utf8");
    expect(readme).toContain("Doc");

    await backend.touchTaskDocMetadata(task.id, "tester");
    const touched = await cache.getTask(task.id);
    expect(touched?.dirty).toBe(true);
  });

  it("surfaces errors when redmine unavailable without cache", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1, doc: 2 },
      },
      { cache: null },
    );
    const helper = backend as unknown as {
      listTasksRemote: () => Promise<TaskData[]>;
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
    };
    helper.listTasksRemote = vi.fn(() => {
      throw new RedmineUnavailable("down");
    });
    await expect(backend.listTasks()).rejects.toBeInstanceOf(RedmineUnavailable);

    helper.findIssueByTaskId = vi.fn(() => {
      throw new RedmineUnavailable("down");
    });
    await expect(backend.getTask("202601300000-ABCD")).rejects.toBeInstanceOf(RedmineUnavailable);
  });

  it("validates task id resolution and generateTaskId errors", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      listTasksRemote: () => Promise<TaskData[]>;
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
    };
    helper.listTasksRemote = vi.fn(() => {
      throw new Error("boom");
    });
    await expect(backend.generateTaskId({ length: 4, attempts: 1 })).rejects.toThrow("boom");

    helper.findIssueByTaskId = vi.fn().mockResolvedValue(null);
    expect(await backend.getTask("202601300000-ABCD")).toBeNull();
  });

  it("uses cache for generateTaskId when redmine is unavailable", async () => {
    const cache = new LocalBackend({ dir: tempDir });
    await cache.writeTask({
      id: "202601300000-ABCD",
      title: "Cached",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
    });
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache },
    );
    const helper = backend as unknown as { listTasksRemote: () => Promise<TaskData[]> };
    helper.listTasksRemote = vi.fn(() => {
      throw new RedmineUnavailable("down");
    });
    const id = await backend.generateTaskId({ length: 4, attempts: 1 });
    expect(id).toMatch(/^\d{12}-[0-9A-Z]{4}$/u);
  });

  it("handles syncPull conflict strategies", async () => {
    const cache = new LocalBackend({ dir: tempDir });
    await cache.writeTask({
      id: "202601300000-ABCD",
      title: "Local",
      description: "Local",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
      dirty: true,
    });
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: { task_id: 1 },
      },
      { cache },
    );
    const helper = backend as unknown as {
      listTasksRemote: () => Promise<TaskData[]>;
      writeTask: (task: TaskData) => Promise<void>;
      cacheTask: (task: TaskData, dirty: boolean) => Promise<void>;
    };
    helper.listTasksRemote = vi.fn().mockResolvedValue([
      {
        id: "202601300000-ABCD",
        title: "Remote",
        description: "Remote",
        status: "TODO",
        priority: "med",
        owner: "REDMINE",
        depends_on: [],
        tags: [],
        verify: [],
      },
    ]);

    helper.writeTask = vi.fn(() => Promise.resolve());
    await backend.sync({
      direction: "pull",
      conflict: "prefer-local",
      quiet: true,
      confirm: false,
    });
    expect(helper.writeTask).toHaveBeenCalled();

    helper.cacheTask = vi.fn(() => Promise.resolve());
    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: false,
    });
    expect(helper.cacheTask).toHaveBeenCalled();

    await expect(
      backend.sync({ direction: "pull", conflict: "fail", quiet: true, confirm: false }),
    ).rejects.toBeInstanceOf(BackendError);
  });

  it("surfaces task doc errors when issues are missing", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1, doc: 2 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
      requestJson: (...args: unknown[]) => Promise<Record<string, unknown>>;
    };

    helper.findIssueByTaskId = vi.fn().mockResolvedValue(null);
    await expect(backend.setTaskDoc("202601300000-ABCD", "Doc")).rejects.toThrow(/Unknown task id/);

    helper.findIssueByTaskId = vi.fn().mockResolvedValue({ id: null });
    await expect(backend.setTaskDoc("202601300000-ABCD", "Doc")).rejects.toThrow(
      /Missing Redmine issue id/,
    );

    helper.findIssueByTaskId = vi.fn().mockResolvedValue(null);
    await expect(backend.touchTaskDocMetadata("202601300000-ABCD")).rejects.toThrow(
      /Unknown task id/,
    );

    helper.findIssueByTaskId = vi.fn().mockResolvedValue({ id: null });
    await expect(backend.touchTaskDocMetadata("202601300000-ABCD")).rejects.toThrow(
      /Missing Redmine issue id/,
    );
  });

  it("allows setTaskDoc and touchTaskDocMetadata when issueToTask returns null", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1, doc: 2, doc_version: 3, doc_updated_at: 4, doc_updated_by: 5 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
      issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
      requestJson: (...args: unknown[]) => Promise<Record<string, unknown>>;
    };
    helper.findIssueByTaskId = vi.fn().mockResolvedValue({ id: 1 });
    helper.issueToTask = vi.fn(() => null);
    helper.requestJson = vi.fn().mockResolvedValue({});

    await backend.setTaskDoc("202601300000-ABCD", null as unknown as string);
    await backend.touchTaskDocMetadata("202601300000-ABCD");
    expect(helper.requestJson).toHaveBeenCalled();
  });

  it("throws when getTaskDoc is missing", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const spy = vi.spyOn(backend, "getTask").mockResolvedValue(null);
    await expect(backend.getTaskDoc("202601300000-ABCD")).rejects.toThrow(/Unknown task id/);
    spy.mockRestore();
  });

  it("skips touchTaskDocMetadata when no doc fields are configured", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
      requestJson: (...args: unknown[]) => Promise<Record<string, unknown>>;
    };
    helper.findIssueByTaskId = vi.fn().mockResolvedValue({ id: 5 });
    helper.requestJson = vi.fn().mockResolvedValue({});
    await backend.touchTaskDocMetadata("202601300000-ABCD");
    expect(helper.requestJson).not.toHaveBeenCalled();
  });

  it("syncPush handles empty and confirmed pushes", async () => {
    const cache = new LocalBackend({ dir: tempDir });
    await cache.writeTask({
      id: "202601300000-ABCD",
      title: "Clean",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
      dirty: false,
    });
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache },
    );
    await backend.sync({ direction: "push", conflict: "diff", quiet: false, confirm: true });

    await cache.writeTask({
      id: "202601300000-BCDE",
      title: "Dirty",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
      dirty: true,
    });
    const helper = backend as unknown as { writeTasks: (tasks: TaskData[]) => Promise<void> };
    helper.writeTasks = vi.fn(() => Promise.resolve());
    await backend.sync({ direction: "push", conflict: "diff", quiet: false, confirm: true });
    expect(helper.writeTasks).toHaveBeenCalled();
  });

  it("marks tasks dirty when writeTask hits redmine unavailability", async () => {
    const cache = new LocalBackend({ dir: tempDir });
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache },
    );
    const helper = backend as unknown as {
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
    };
    helper.findIssueByTaskId = vi.fn(() => {
      throw new RedmineUnavailable("down");
    });
    await backend.writeTask({
      id: "202601300000-ABCD",
      title: "Dirty",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
    });
    const cached = await cache.getTask("202601300000-ABCD");
    expect(cached?.dirty).toBe(true);
  });

  it("paginates listTasksRemote when total_count exceeds page size", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      requestJson: (
        method: string,
        path: string,
        payload?: Record<string, unknown>,
        params?: Record<string, unknown>,
      ) => Promise<Record<string, unknown>>;
      listTasksRemote: () => Promise<TaskData[]>;
    };
    helper.requestJson = vi.fn((_method, _path, _payload, params) => {
      const { offset = 0 } = (params ?? {}) as { offset?: number };
      const offsetValue = Number(offset);
      const taskId = offsetValue === 0 ? "202601300000-ABCD" : "202601300000-ABCE";
      const issue = {
        id: offsetValue === 0 ? 1 : 2,
        subject: "Issue",
        description: "Desc",
        status: { id: 1 },
        priority: { name: "Normal" },
        custom_fields: [{ id: 1, value: taskId }],
      };
      return Promise.resolve({ issues: [issue], total_count: 150 });
    });
    const tasks = await helper.listTasksRemote();
    expect(tasks).toHaveLength(2);
  });
});

describe("loadTaskBackend", () => {
  let tempDir = "";
  let originalEnv: NodeJS.ProcessEnv = {};
  const redmineEnvKeys = [
    "CODEXSWARM_REDMINE_URL",
    "CODEXSWARM_REDMINE_API_KEY",
    "CODEXSWARM_REDMINE_PROJECT_ID",
    "CODEXSWARM_REDMINE_OWNER",
    "CODEXSWARM_REDMINE_EXTRA",
  ] as const;

  beforeEach(async () => {
    tempDir = await makeTempDir();
    originalEnv = { ...process.env };
    for (const key of redmineEnvKeys) {
      delete process.env[key];
    }
    await mkdir(path.join(tempDir, ".git"), { recursive: true });
  });

  afterEach(async () => {
    process.env = originalEnv;
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("defaults to local backend when config is missing", async () => {
    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("local");
    expect(result.backend).toBeInstanceOf(LocalBackend);
  });

  it("loads redmine backend and reads .env without overriding existing vars", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {
          url: "https://redmine.example",
          api_key: "from-config",
          project_id: "proj",
          custom_fields: { task_id: 1 },
        },
      }),
      "utf8",
    );
    await writeFile(
      path.join(tempDir, ".env"),
      ["CODEXSWARM_REDMINE_URL=https://redmine.env", 'CODEXSWARM_REDMINE_API_KEY="env-key"'].join(
        "\n",
      ),
      "utf8",
    );
    process.env.CODEXSWARM_REDMINE_API_KEY = "preserve";

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("redmine");
    expect(result.backend).toBeInstanceOf(RedmineBackend);
    expect(process.env.CODEXSWARM_REDMINE_API_KEY).toBe("preserve");
    expect(process.env.CODEXSWARM_REDMINE_URL).toBe("https://redmine.env");
  });

  it("parses quoted .env values and resolves backend directories", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {
          url: "https://redmine.example",
          api_key: "from-config",
          project_id: "proj",
          custom_fields: { task_id: 1 },
          cache_dir: "cache",
        },
      }),
      "utf8",
    );
    await writeFile(
      path.join(tempDir, ".env"),
      [
        'CODEXSWARM_REDMINE_URL="https://redmine.env/"',
        String.raw`CODEXSWARM_REDMINE_API_KEY="env\nkey"`,
        "CODEXSWARM_REDMINE_PROJECT_ID=proj",
        "CODEXSWARM_REDMINE_OWNER='  owner  '",
        "CODEXSWARM_REDMINE_EXTRA=plain",
        "# ignored line",
        "BADLINE",
      ].join("\n"),
      "utf8",
    );

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("redmine");
    expect(process.env.CODEXSWARM_REDMINE_URL).toBe("https://redmine.env/");
    expect(process.env.CODEXSWARM_REDMINE_API_KEY).toBe("env\nkey");
    expect(process.env.CODEXSWARM_REDMINE_OWNER).toBe("  owner  ");
    expect(process.env.CODEXSWARM_REDMINE_EXTRA).toBe("plain");

    const localBackendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await writeFile(
      localBackendPath,
      JSON.stringify({ id: "local", settings: { dir: "custom-tasks" } }),
      "utf8",
    );
    const localResult = await loadTaskBackend({ cwd: tempDir });
    expect(localResult.backendId).toBe("local");
    const local = localResult.backend as LocalBackend;
    expect(local.root).toBe(path.join(tempDir, "custom-tasks"));
  });

  it("loads redmine backend when .env is missing", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {
          url: "https://redmine.example",
          api_key: "from-config",
          project_id: "proj",
          custom_fields: { task_id: 1 },
        },
      }),
      "utf8",
    );
    await rm(path.join(tempDir, ".env"), { force: true });

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("redmine");
  });

  it("ignores legacy module/class fields in backend config", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "local",
        version: 2,
        module: "legacy.py",
        class: "LegacyBackend",
        settings: { dir: ".agentplane/tasks" },
      }),
      "utf8",
    );

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("local");
    expect(result.backend).toBeInstanceOf(LocalBackend);
  });

  it("fails when .env is not readable", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {
          url: "https://redmine.example",
          api_key: "from-config",
          project_id: "proj",
          custom_fields: { task_id: 1 },
        },
      }),
      "utf8",
    );
    await mkdir(path.join(tempDir, ".env"), { recursive: true });

    await expect(loadTaskBackend({ cwd: tempDir })).rejects.toBeInstanceOf(Error);
  });

  it("exports task snapshots with coerced fields", () => {
    const snapshot = buildTasksExportSnapshotFromTasks([
      {
        id: "202601300000-ABCD",
        title: undefined as unknown as string,
        description: undefined as unknown as string,
        status: undefined as unknown as string,
        priority: 3,
        owner: undefined as unknown as string,
        depends_on: "nope" as unknown as string[],
        tags: ["tag", 2] as unknown as string[],
        verify: ["echo ok", 1] as unknown as string[],
        comments: [
          { author: "a", body: "b" },
          { author: "x", body: 2 },
        ] as unknown as { author: string; body: string }[],
      } as TaskData,
      {
        id: "202601300000-ABCE",
        title: "Empty priority",
        description: "",
        status: "TODO",
        priority: undefined as unknown as string,
        owner: "tester",
        depends_on: [],
        tags: [],
        verify: [],
      } as TaskData,
    ]);
    const task = snapshot.tasks[0];
    expect(task?.priority).toBe("3");
    expect(task?.depends_on).toEqual([]);
    expect(task?.tags).toEqual(["tag"]);
    expect(task?.verify).toEqual(["echo ok"]);
    expect(task?.comments).toEqual([{ author: "a", body: "b" }]);
    expect(snapshot.tasks[1]?.priority).toBe("");
  });

  it("falls back to local backend when backend config is not an object", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(backendPath, JSON.stringify([1, 2, 3]), "utf8");

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("local");
  });

  it("throws when backend config is invalid json", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(backendPath, "{broken", "utf8");

    await expect(loadTaskBackend({ cwd: tempDir })).rejects.toThrow();
  });
});
