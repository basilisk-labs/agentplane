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

describe("RedmineBackend writes and custom fields", () => {
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
      origin: { system: "recipe", recipe_id: "viewer", scenario_id: "demo" },
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
        origin: {
          system: "recipe",
          recipe_id: "viewer",
          scenario_id: "demo",
        },
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
          attempts: 0,
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

  it("derives redmine origin metadata when canonical origin is absent", () => {
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
      issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
    };
    const task = helper.issueToTask(
      {
        id: 42,
        subject: "Issue",
        description: "Desc",
        status: { id: 1 },
        custom_fields: [{ id: 1, value: "202601300000-ABCD" }],
      },
      "202601300000-ABCD",
    );

    expect(task?.origin).toEqual({ system: "redmine", issue_id: "42" });
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
    expect(task?.doc_version).toBe(3);
    expect(task?.sections).toMatchObject({
      Summary: "Legacy summary.",
      "Verify Steps": "1. Legacy check.",
    });
    expect(task?.origin).toEqual({ system: "redmine", issue_id: "1" });
    expect(task?.doc).toContain("Legacy summary.");
  });

  it("prefers canonical_state origin over inferred redmine origin", () => {
    const backend = new RedmineBackend(
      {
        url: "https://redmine.example",
        api_key: "key",
        project_id: "proj",
        status_map: { TODO: 1 },
        custom_fields: { task_id: 1, canonical_state: 2 },
      },
      { cache: new LocalBackend({ dir: tempDir }) },
    );
    const helper = backend as unknown as {
      issueToTask: (issue: Record<string, unknown>, taskIdOverride?: string) => TaskData | null;
    };

    const task = helper.issueToTask(
      {
        id: 7,
        subject: "Issue",
        description: "Desc",
        status: { id: 1 },
        url: "https://redmine.example/issues/7",
        custom_fields: [
          { id: 1, value: "202601300000-ABCD" },
          {
            id: 2,
            value: JSON.stringify({
              revision: 3,
              origin: {
                system: "recipe",
                recipe_id: "viewer",
                scenario_id: "demo",
                run_id: "run-42",
              },
            }),
          },
        ],
      },
      "202601300000-ABCD",
    );

    expect(task?.origin).toEqual({
      system: "recipe",
      recipe_id: "viewer",
      scenario_id: "demo",
      run_id: "run-42",
    });
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
});
