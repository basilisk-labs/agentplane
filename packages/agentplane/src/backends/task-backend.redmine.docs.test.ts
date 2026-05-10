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

describe("RedmineBackend canonical docs and migration", () => {
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
              attempts: 0,
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
              attempts: 0,
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
      attempts: 0,
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

  it("migrateCanonicalState backfills structured state for legacy doc-backed issues", async () => {
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
        },
      },
      { cache },
    );
    const helper = backend as unknown as {
      requestJson: (...args: unknown[]) => Promise<Record<string, unknown>>;
    };
    const issue = {
      id: 101,
      subject: "Legacy issue",
      description: "Legacy description",
      status: { id: 1, name: "New" },
      custom_fields: [
        { id: 1, value: "202603140729-W4D9ZT" },
        {
          id: 3,
          value:
            "## Summary\n\nLegacy summary.\n\n## Scope\n\n- In scope: migrate.\n\n## Verify Steps\n\n1. Migrate.\n",
        },
      ],
      updated_on: "2026-03-14T00:00:00Z",
    };
    const requestJson = vi.fn(
      (
        method: string,
        reqPath: string,
        payload?: Record<string, unknown>,
        _params?: Record<string, unknown>,
      ) => {
        if (method === "GET" && reqPath === "issues.json") {
          return Promise.resolve({ issues: [issue], total_count: 1 });
        }
        if (method === "PUT" && reqPath === "issues/101.json") {
          return Promise.resolve({
            issue: { ...issue, ...(payload?.issue as Record<string, unknown> | undefined) },
          });
        }
        throw new Error(`unexpected ${method} ${reqPath}`);
      },
    );
    helper.requestJson = requestJson;

    const result = await backend.migrateCanonicalState();

    expect(result).toEqual({
      scanned: 1,
      migrated: ["202603140729-W4D9ZT"],
      skippedStructured: [],
      skippedNoDoc: [],
      failed: [],
    });
    const putPayload = requestJson.mock.calls.find(
      ([method, reqPath]) => method === "PUT" && reqPath === "issues/101.json",
    )?.[2] as { issue?: { custom_fields?: { id?: unknown; value?: unknown }[] } } | undefined;
    const canonicalField = putPayload?.issue?.custom_fields?.find((field) => field.id === 2);
    expect(canonicalField).toBeTruthy();
    const parsed = JSON.parse(String(canonicalField?.value)) as {
      revision?: number;
      sections?: Record<string, string>;
    };
    expect(parsed.revision).toBe(1);
    expect(parsed.sections).toMatchObject({
      Summary: "Legacy summary.",
      Scope: "- In scope: migrate.",
      "Verify Steps": "1. Migrate.",
    });

    const cached = await cache.getTask("202603140729-W4D9ZT");
    expect(cached?.revision).toBe(1);
    expect(cached?.sections).toMatchObject({
      Summary: "Legacy summary.",
      "Verify Steps": "1. Migrate.",
    });
  });

  it("migrateCanonicalState skips issues that already store canonical_state", async () => {
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
        },
      },
      { cache },
    );
    const helper = backend as unknown as {
      requestJson: (...args: unknown[]) => Promise<Record<string, unknown>>;
    };
    const issue = {
      id: 101,
      subject: "Structured issue",
      description: "Structured description",
      status: { id: 1, name: "New" },
      custom_fields: [
        { id: 1, value: "202603140730-R37DPX" },
        {
          id: 2,
          value: JSON.stringify({
            revision: 4,
            sections: {
              Summary: "Already structured.",
            },
          }),
        },
        { id: 3, value: "## Summary\n\nLegacy summary.\n" },
      ],
      updated_on: "2026-03-14T00:00:00Z",
    };
    const requestJson = vi.fn(
      (method: string, reqPath: string, _payload?: Record<string, unknown>) => {
        if (method === "GET" && reqPath === "issues.json") {
          return Promise.resolve({ issues: [issue], total_count: 1 });
        }
        throw new Error(`unexpected ${method} ${reqPath}`);
      },
    );
    helper.requestJson = requestJson;

    const result = await backend.migrateCanonicalState();

    expect(result).toEqual({
      scanned: 1,
      migrated: [],
      skippedStructured: ["202603140730-R37DPX"],
      skippedNoDoc: [],
      failed: [],
    });
    expect(
      requestJson.mock.calls.some(
        ([method, reqPath]) => method === "PUT" && reqPath === "issues/101.json",
      ),
    ).toBe(false);
  });
});
