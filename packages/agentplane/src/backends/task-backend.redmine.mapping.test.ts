/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

function makeIssue(priorityName?: string): Record<string, unknown> {
  return {
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
  };
}

describe("RedmineBackend mapping and projection", () => {
  let tempDir = "";
  let originalEnv: NodeJS.ProcessEnv = {};
  let restoreStdIO: (() => void) | null = null;

  beforeEach(async () => {
    restoreStdIO = silenceStdIO();
    tempDir = await mkTempDir();
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
    restoreStdIO?.();
    restoreStdIO = null;
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
    expect(taskAfterPull?.origin).toEqual({ system: "redmine", issue_id: "101" });
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
      attempts: 0,
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

  it("inspects visible custom fields and reports canonical_state visibility plus configured-name drift", async () => {
    const issues: Record<string, unknown>[] = [
      {
        id: 101,
        subject: "Issue",
        description: "Desc",
        status: { id: 5, name: "Done" },
        custom_fields: [
          { id: 1, name: "task_id", value: "202601300000-ABCD" },
          { id: 2, name: "verify", value: "## Summary\n\nDoc" },
          { id: 3, name: "commit", value: "3" },
          { id: 13, name: "canonical_state", value: '{"revision":2}' },
        ],
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
        custom_fields: { task_id: 1, doc: 2, doc_version: 3 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );

    const result = await backend.inspectConfiguration();
    expect(result.backendId).toBe("redmine");
    expect(result.visibleCustomFields).toEqual([
      { id: 1, name: "task_id", nonEmptyCount: 1 },
      { id: 2, name: "verify", nonEmptyCount: 1 },
      { id: 3, name: "commit", nonEmptyCount: 1 },
      { id: 13, name: "canonical_state", nonEmptyCount: 1 },
    ]);
    expect(result.canonicalState).toEqual({
      configuredFieldId: null,
      visibleFieldId: 13,
    });
    expect(result.configuredFieldNameDrift).toEqual([
      { key: "doc", configuredId: 2, visibleName: "verify" },
      { key: "doc_version", configuredId: 3, visibleName: "commit" },
    ]);
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
});
