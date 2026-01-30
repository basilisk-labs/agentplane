import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { renderTaskReadme, type TaskRecord } from "@agentplane/core";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  BackendError,
  LocalBackend,
  RedmineBackend,
  buildTasksExportSnapshotFromTasks,
  extractTaskDoc,
  loadTaskBackend,
  mergeTaskDoc,
  taskRecordToData,
  writeTasksExportFromTasks,
  type TaskData,
} from "./task-backend.js";

const TMP_PREFIX = "agentplane-task-backend-";

async function makeTempDir(): Promise<string> {
  return await mkdtemp(path.join(os.tmpdir(), TMP_PREFIX));
}

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

  it("taskRecordToData parses doc, comments, commit, and dirty", () => {
    const record: TaskRecord = {
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
    };
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

  it("generates task ids and enforces minimum length", async () => {
    const backend = new LocalBackend({ dir: tempDir });
    await expect(backend.generateTaskId({ length: 3, attempts: 1 })).rejects.toThrow(
      /length must be >= 4/,
    );
    const id = await backend.generateTaskId({ length: 4, attempts: 1 });
    expect(id).toMatch(/^\d{12}-[0-9A-Z]{4,}$/u);
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
    expect(createdPayload?.custom_fields).toBeDefined();
    expect(createdPayload?.assigned_to_id).toBe(7);
    expect(createdPayload?.done_ratio).toBe(100);
    expect(createdPayload?.start_date).toBe("2026-01-30");
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
});

describe("loadTaskBackend", () => {
  let tempDir = "";
  let originalEnv: NodeJS.ProcessEnv = {};

  beforeEach(async () => {
    tempDir = await makeTempDir();
    originalEnv = { ...process.env };
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
});
