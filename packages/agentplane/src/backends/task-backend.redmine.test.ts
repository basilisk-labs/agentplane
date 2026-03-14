import { readFile, rm } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  BackendError,
  LocalBackend,
  RedmineBackend,
  RedmineUnavailable,
  type TaskData,
} from "./task-backend.js";
import {
  installTaskBackendTestHarness,
  makeIssue,
  makeTempDir,
} from "./task-backend.test-helpers.js";

installTaskBackendTestHarness();

describe("RedmineBackend (mocked)", () => {
  let tempDir = "";
  let originalEnv: NodeJS.ProcessEnv = {};

  beforeEach(async () => {
    tempDir = await makeTempDir();
    originalEnv = { ...process.env };
    delete process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID;
    delete process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE;
    delete process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC;
    delete process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_VERSION;
    delete process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_UPDATED_AT;
    delete process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_UPDATED_BY;
    delete process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_TAGS;
    delete process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_PRIORITY;
    delete process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_OWNER;
    delete process.env.AGENTPLANE_REDMINE_BATCH_SIZE;
    delete process.env.AGENTPLANE_REDMINE_BATCH_PAUSE;
    process.env.AGENTPLANE_REDMINE_URL = "https://redmine.example";
    process.env.AGENTPLANE_REDMINE_API_KEY = "key";
    process.env.AGENTPLANE_REDMINE_PROJECT_ID = "proj";
    process.env.AGENTPLANE_REDMINE_OWNER = "REDMINE";
    process.env.AGENTPLANE_REDMINE_ASSIGNEE_ID = "7";
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
          {
            id: 2,
            value: JSON.stringify({
              revision: 2,
              sections: {
                Summary: "Canonical summary.",
                "Verify Steps": "1. Canonical check.",
              },
              plan_approval: {
                state: "approved",
                updated_at: "2026-03-14T00:00:00Z",
                updated_by: "ORCHESTRATOR",
                note: "approved",
              },
              verification: {
                state: "ok",
                updated_at: "2026-03-14T00:05:00Z",
                updated_by: "CODER",
                note: "verified",
              },
              events: [
                {
                  type: "status",
                  at: "2026-03-14T00:00:00Z",
                  author: "CODER",
                  from: "TODO",
                  to: "DOING",
                },
              ],
            }),
          },
          { id: 3, value: "{bad" },
          { id: 4, value: '{"hash":"h","message":"m"}' },
          { id: 5, value: "plain note" },
          { id: 6, value: "Stale doc" },
          { id: 7, value: "2" },
          { id: 8, value: "2026-01-30T00:00:00Z" },
          { id: 9, value: "tester" },
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
          canonical_state: 2,
          verify: 3,
          commit: 4,
          comments: 5,
          doc: 6,
          doc_version: 7,
          doc_updated_at: 8,
          doc_updated_by: 9,
        },
      },
      { cache },
    );

    const tasksBeforePull = await backend.listTasks();
    expect(tasksBeforePull).toHaveLength(0);

    const taskBeforePull = await backend.getTask("202601300000-ABCD");
    expect(taskBeforePull).toBeNull();

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: false,
    });

    const tasksAfterPull = await backend.listTasks();
    expect(tasksAfterPull).toHaveLength(1);
    expect(tasksAfterPull[0]?.status).toBe("DONE");
    expect(tasksAfterPull[0]?.priority).toBe("high");

    const taskAfterPull = await backend.getTask("202601300000-ABCD");
    expect(taskAfterPull?.title).toBe("Issue");
    expect(taskAfterPull?.revision).toBe(2);
    expect(taskAfterPull?.sections).toMatchObject({
      Summary: "Canonical summary.",
      "Verify Steps": "1. Canonical check.",
    });
    expect(taskAfterPull?.plan_approval).toEqual({
      state: "approved",
      updated_at: "2026-03-14T00:00:00Z",
      updated_by: "ORCHESTRATOR",
      note: "approved",
    });
    expect(taskAfterPull?.verification).toEqual({
      state: "ok",
      updated_at: "2026-03-14T00:05:00Z",
      updated_by: "CODER",
      note: "verified",
    });
    expect(taskAfterPull?.events).toEqual([
      {
        type: "status",
        at: "2026-03-14T00:00:00Z",
        author: "CODER",
        from: "TODO",
        to: "DOING",
      },
    ]);
    expect(taskAfterPull?.doc).toContain("Canonical summary.");
    expect(taskAfterPull?.doc).not.toContain("Stale doc");

    const cached = await cache.listTasks();
    expect(cached).toHaveLength(1);
    expect(cached[0]?.revision).toBe(2);
  });

  it("uses projection-only reads and does not touch network or cache writes for list/get", async () => {
    const issues: Record<string, unknown>[] = [
      {
        id: 101,
        subject: "Issue",
        description: "Desc",
        status: { id: 5, name: "Done" },
        custom_fields: [{ id: 1, value: "202601300000-ABCD" }],
      },
    ];

    const fetchSpy = vi.fn((url: string, init?: RequestInit) => {
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
    vi.stubGlobal("fetch", fetchSpy);

    const cache = new LocalBackend({ dir: tempDir });
    await cache.writeTask({
      id: "202601300000-ABCD",
      title: "Cached issue",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
    });
    const cacheWriteSpy = vi.spyOn(cache, "writeTask");
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { DONE: 5, TODO: 1 },
        custom_fields: { task_id: 1 },
      },
      { cache },
    );

    const tasks = await backend.listTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]?.title).toBe("Cached issue");

    const task = await backend.getTask("202601300000-ABCD");
    expect(task?.id).toBe("202601300000-ABCD");

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(cacheWriteSpy).not.toHaveBeenCalled();
  });

  it("infers DOING and DONE from Redmine status when status_map is missing", async () => {
    const issues: Record<string, unknown>[] = [
      {
        id: 101,
        subject: "In progress issue",
        description: "",
        status: { id: 2, name: "In Progress" },
        custom_fields: [{ id: 1, value: "202601300000-D2GNQ1" }],
      },
      {
        id: 102,
        subject: "Closed issue",
        description: "",
        status: { id: 5, name: "Closed", is_closed: true },
        custom_fields: [{ id: 1, value: "202601300000-D2NEQ1" }],
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
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1 },
      },
      { cache },
    );

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: false,
    });

    const tasks = await backend.listTasks();
    const byId = new Map(tasks.map((task) => [task.id, task.status]));
    expect(byId.get("202601300000-D2GNQ1")).toBe("DOING");
    expect(byId.get("202601300000-D2NEQ1")).toBe("DONE");
  });

  it("falls back to status inference when status_map is partial", async () => {
    const issues: Record<string, unknown>[] = [
      {
        id: 201,
        subject: "Started",
        description: "",
        status: { id: 2, name: "In Progress" },
        custom_fields: [{ id: 1, value: "202601300000-D2GNQ2" }],
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
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1, DONE: 5 },
        custom_fields: { task_id: 1 },
      },
      { cache },
    );

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: false,
    });

    const tasks = await backend.listTasks();
    expect(tasks[0]?.status).toBe("DOING");
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

  it("infers status_id on writeTask when status_map is missing", async () => {
    const issues: Record<string, unknown>[] = [];
    let createdPayload: Record<string, unknown> | null = null;
    let nextId = 300;

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
      if (pathname === "issue_statuses.json" && method === "GET") {
        return Response.json(
          {
            issue_statuses: [
              { id: 1, name: "New", is_default: true, is_closed: false },
              { id: 2, name: "In Progress", is_closed: false },
              { id: 5, name: "Closed", is_closed: true },
            ],
          },
          { status: 200 },
        );
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
        custom_fields: { task_id: 1 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );

    await backend.writeTask({
      id: "202601300000-ABCD",
      title: "New task",
      description: "Desc",
      status: "DOING",
      priority: "med",
      owner: "REDMINE",
      depends_on: [],
      tags: [],
      verify: [],
    });

    expect((createdPayload as { status_id?: number } | null)?.status_id).toBe(2);
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

  it("serializes canonical task state into a structured custom field when configured", () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: { task_id: 1, canonical_state: 9 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      taskToIssuePayload: (
        task: TaskData,
        existingIssue?: Record<string, unknown>,
      ) => Record<string, unknown>;
    };
    const payload = helper.taskToIssuePayload({
      id: "202601300000-ABCD",
      title: "Title",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      revision: 3,
      depends_on: [],
      tags: [],
      verify: [],
      plan_approval: {
        state: "approved",
        updated_at: "2026-03-14T00:00:00Z",
        updated_by: "ORCHESTRATOR",
        note: null,
      },
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      events: [
        { type: "status", at: "2026-03-14T00:00:00Z", author: "CODER", from: "TODO", to: "DOING" },
      ],
      sections: {
        Summary: "Summary text.",
        "Verify Steps": "1. Run focused tests.",
      },
    });
    const customFields = Array.isArray(payload.custom_fields) ? payload.custom_fields : [];
    const canonicalField = customFields.find((entry): entry is { id: number; value?: string } => {
      if (!entry || typeof entry !== "object") return false;
      const candidate = entry as { id?: unknown; value?: unknown };
      return candidate.id === 9;
    }) as { value?: string } | undefined;
    expect(canonicalField?.value).toEqual(
      JSON.stringify({
        revision: 3,
        sections: {
          Summary: "Summary text.",
          "Verify Steps": "1. Run focused tests.",
        },
        plan_approval: {
          state: "approved",
          updated_at: "2026-03-14T00:00:00Z",
          updated_by: "ORCHESTRATOR",
          note: null,
        },
        verification: {
          state: "pending",
          updated_at: null,
          updated_by: null,
          note: null,
        },
        events: [
          {
            type: "status",
            at: "2026-03-14T00:00:00Z",
            author: "CODER",
            from: "TODO",
            to: "DOING",
          },
        ],
      }),
    );
  });

  it("derives canonical sections from legacy doc when structured state is absent", () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: { task_id: 1, doc: 2 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
    };
    const task = helper.issueToTask(
      {
        id: 1,
        subject: "Issue",
        description: "Desc",
        status: { id: 1 },
        custom_fields: [
          { id: 1, value: "202601300000-ABCD" },
          {
            id: 2,
            value: "## Summary\n\nLegacy summary.\n\n## Verify Steps\n\n1. Legacy check.\n",
          },
        ],
      },
      "202601300000-ABCD",
    );
    expect(task?.revision).toBe(1);
    expect(task?.sections).toMatchObject({
      Summary: "Legacy summary.",
      "Verify Steps": "1. Legacy check.",
    });
    expect(task?.doc).toContain("Legacy summary.");
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

  it("applies env overrides for custom field ids and batch tuning", () => {
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID = "11";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE = "12";
    process.env.AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC = "13";
    process.env.AGENTPLANE_REDMINE_BATCH_SIZE = "5";
    process.env.AGENTPLANE_REDMINE_BATCH_PAUSE = "250";
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1, canonical_state: 2, doc: 3 },
        batch_size: 1,
        batch_pause: 10,
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    ) as unknown as {
      customFields: Record<string, unknown>;
      batchSize: number;
      batchPauseMs: number;
    };
    expect(backend.customFields.task_id).toBe(11);
    expect(backend.customFields.canonical_state).toBe(12);
    expect(backend.customFields.doc).toBe(13);
    expect(backend.batchSize).toBe(5);
    expect(backend.batchPauseMs).toBe(250);
  });

  it("reads tags/priority/owner from custom fields when present", () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: { task_id: 1, tags: 2, priority: 3, owner: 4 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
    };
    const task = helper.issueToTask(
      {
        id: 1,
        subject: "Issue",
        description: "",
        status: { id: 1 },
        custom_fields: [
          { id: 1, value: "202601300000-ABCD" },
          { id: 2, value: '["backend","cli"]' },
          { id: 3, value: "urgent" },
          { id: 4, value: "CODER" },
        ],
      },
      "202601300000-ABCD",
    );
    expect(task?.tags).toEqual(["backend", "cli"]);
    expect(task?.priority).toBe("high");
    expect(task?.owner).toBe("CODER");
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

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: false,
      }),
    ).rejects.toBeInstanceOf(BackendError);
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

  it("reads from cache without remote access and keeps write fallbacks when Redmine is unavailable", async () => {
    const cache = new LocalBackend({ dir: tempDir });
    const task: TaskData = {
      id: "202601300000-ABCD",
      title: "Cached",
      description: "",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      revision: 4,
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
        custom_fields: { task_id: 1, canonical_state: 2, doc: 3 },
      },
      { cache },
    );
    const helper = backend as unknown as {
      listTasksRemote: () => Promise<TaskData[]>;
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
    };
    const tasks = await backend.listTasks();
    expect(tasks).toHaveLength(1);

    const cached = await backend.getTask(task.id);
    expect(cached?.id).toBe(task.id);

    helper.findIssueByTaskId = vi.fn(() => {
      throw new RedmineUnavailable("down");
    });
    await backend.setTaskDoc(task.id, "Doc");
    const updated = await cache.getTask(task.id);
    expect(updated?.dirty).toBe(true);
    const readme = await readFile(path.join(tempDir, task.id, "README.md"), "utf8");
    expect(readme).toContain("Doc");

    await backend.touchTaskDocMetadata(task.id, "tester");
    const touched = await cache.getTask(task.id);
    expect(touched?.dirty).toBe(true);

    await expect(
      backend.setTaskDoc(task.id, "Doc again", "tester", { expectedRevision: 3 }),
    ).rejects.toThrow(/Task revision changed concurrently/u);
  });

  it("setTaskDoc writes canonical_state revision and sections when configured", async () => {
    const cache = new LocalBackend({ dir: tempDir });
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: {
          task_id: 1,
          canonical_state: 2,
          doc: 3,
          doc_version: 4,
          doc_updated_at: 5,
          doc_updated_by: 6,
        },
      },
      { cache },
    );
    const helper = backend as unknown as {
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
      requestJson: (...args: unknown[]) => Promise<Record<string, unknown>>;
    };
    const issue = {
      id: 1,
      subject: "Issue",
      description: "Desc",
      status: { id: 1, name: "New" },
      custom_fields: [
        { id: 1, value: "202601300000-ABCD" },
        {
          id: 2,
          value: JSON.stringify({
            revision: 4,
            sections: {
              Summary: "Remote summary.",
              "Verify Steps": "1. Remote check.",
            },
            plan_approval: {
              state: "approved",
              updated_at: "2026-03-14T00:00:00Z",
              updated_by: "ORCHESTRATOR",
              note: "approved",
            },
            verification: {
              state: "ok",
              updated_at: "2026-03-14T00:05:00Z",
              updated_by: "CODER",
              note: "verified",
            },
            events: [
              {
                type: "status",
                at: "2026-03-14T00:00:00Z",
                author: "CODER",
                from: "TODO",
                to: "DOING",
              },
            ],
          }),
        },
        { id: 3, value: "Stale doc" },
        { id: 4, value: "3" },
        { id: 5, value: "2026-03-14T00:00:00Z" },
        { id: 6, value: "REDMINE" },
      ],
    };
    helper.findIssueByTaskId = vi.fn().mockResolvedValue(issue);
    const requestJson = vi.fn().mockResolvedValue({});
    helper.requestJson = requestJson;

    const nextDoc = "## Summary\n\nUpdated summary.\n\n## Verify Steps\n\n1. Updated check.\n";
    await backend.setTaskDoc("202601300000-ABCD", nextDoc, "CODER");

    const firstCall = requestJson.mock.calls[0] as
      | [string, string, { issue?: { custom_fields?: { id?: number; value?: unknown }[] } }]
      | undefined;
    expect(firstCall?.[0]).toBe("PUT");
    expect(firstCall?.[1]).toBe("issues/1.json");
    expect(firstCall?.[2].issue?.custom_fields).toEqual(
      expect.arrayContaining([
        { id: 3, value: nextDoc },
        {
          id: 2,
          value: JSON.stringify({
            revision: 5,
            sections: {
              Summary: "Updated summary.",
              "Verify Steps": "1. Updated check.",
            },
            plan_approval: {
              state: "approved",
              updated_at: "2026-03-14T00:00:00Z",
              updated_by: "ORCHESTRATOR",
              note: "approved",
            },
            verification: {
              state: "ok",
              updated_at: "2026-03-14T00:05:00Z",
              updated_by: "CODER",
              note: "verified",
            },
            events: [
              {
                type: "status",
                at: "2026-03-14T00:00:00Z",
                author: "CODER",
                from: "TODO",
                to: "DOING",
              },
            ],
          }),
        },
      ]),
    );

    const cached = await cache.getTask("202601300000-ABCD");
    expect(cached?.revision).toBe(5);
    expect(cached?.sections).toMatchObject({
      Summary: "Updated summary.",
      "Verify Steps": "1. Updated check.",
    });
    expect(cached?.plan_approval).toEqual({
      state: "approved",
      updated_at: "2026-03-14T00:00:00Z",
      updated_by: "ORCHESTRATOR",
      note: "approved",
    });
    expect(cached?.verification).toEqual({
      state: "ok",
      updated_at: "2026-03-14T00:05:00Z",
      updated_by: "CODER",
      note: "verified",
    });
    expect(cached?.events).toEqual([
      {
        type: "status",
        at: "2026-03-14T00:00:00Z",
        author: "CODER",
        from: "TODO",
        to: "DOING",
      },
    ]);
    expect(cached?.doc).toContain("Updated summary.");
  });

  it("rejects stale expectedRevision writes when canonical_state guarding is configured", async () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        custom_fields: {
          task_id: 1,
          canonical_state: 2,
          doc: 3,
          doc_version: 4,
          doc_updated_at: 5,
          doc_updated_by: 6,
        },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      findIssueByTaskId: (taskId: string) => Promise<Record<string, unknown> | null>;
      requestJson: (...args: unknown[]) => Promise<Record<string, unknown>>;
    };
    helper.findIssueByTaskId = vi.fn().mockResolvedValue({
      id: 1,
      subject: "Issue",
      description: "Desc",
      status: { id: 1, name: "New" },
      custom_fields: [
        { id: 1, value: "202601300000-ABCD" },
        { id: 2, value: JSON.stringify({ revision: 4, sections: { Summary: "Remote summary." } }) },
        { id: 3, value: "## Summary\n\nRemote summary.\n" },
      ],
    });
    const requestJson = vi.fn().mockResolvedValue({});
    helper.requestJson = requestJson;

    await expect(
      backend.writeTask(
        {
          id: "202601300000-ABCD",
          title: "Issue",
          description: "Desc",
          status: "TODO",
          priority: "med",
          owner: "REDMINE",
          revision: 4,
          depends_on: [],
          tags: [],
          verify: [],
          sections: { Summary: "Updated summary." },
        },
        { expectedRevision: 3 },
      ),
    ).rejects.toThrow(/Task revision changed concurrently/u);
    await expect(
      backend.setTaskDoc("202601300000-ABCD", "## Summary\n\nUpdated summary.\n", "CODER", {
        expectedRevision: 3,
      }),
    ).rejects.toThrow(/Task revision changed concurrently/u);
    await expect(
      backend.touchTaskDocMetadata("202601300000-ABCD", "CODER", { expectedRevision: 3 }),
    ).rejects.toThrow(/Task revision changed concurrently/u);
    expect(requestJson).not.toHaveBeenCalled();
  });

  it("rejects guarded writes when canonical_state support is not configured", async () => {
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
    };
    helper.findIssueByTaskId = vi.fn().mockResolvedValue({
      id: 1,
      subject: "Issue",
      description: "Desc",
      status: { id: 1, name: "New" },
      custom_fields: [
        { id: 1, value: "202601300000-ABCD" },
        { id: 2, value: "Doc" },
      ],
    });

    await expect(
      backend.setTaskDoc("202601300000-ABCD", "Doc", "CODER", { expectedRevision: 1 }),
    ).rejects.toThrow(/guarding is unavailable/u);
  });

  it("exports a Redmine projection snapshot from cache without touching the remote source", async () => {
    const cache = new LocalBackend({ dir: tempDir });
    const task: TaskData = {
      id: "202601300111-ABCD",
      title: "Cached snapshot",
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
    };
    helper.listTasksRemote = vi.fn(() => {
      throw new Error("remote should not be called during projection snapshot export");
    });

    const outPath = path.join(tempDir, "tasks-projection.json");
    await backend.exportProjectionSnapshot(outPath);

    const raw = JSON.parse(await readFile(outPath, "utf8")) as { tasks: TaskData[] };
    expect(raw.tasks).toHaveLength(1);
    expect(raw.tasks[0]?.id).toBe(task.id);
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
    await expect(backend.listTasks()).rejects.toBeInstanceOf(BackendError);
    await expect(backend.listTasks()).rejects.toThrow(/projection reads are unavailable/);

    await expect(backend.getTask("202601300000-ABCD")).rejects.toBeInstanceOf(BackendError);
    await expect(backend.getTask("202601300000-ABCD")).rejects.toThrow(
      /projection reads are unavailable/,
    );

    helper.findIssueByTaskId = vi.fn(() => {
      throw new RedmineUnavailable("down");
    });
    await expect(backend.setTaskDoc("202601300000-ABCD", "Doc")).rejects.toBeInstanceOf(
      RedmineUnavailable,
    );
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
