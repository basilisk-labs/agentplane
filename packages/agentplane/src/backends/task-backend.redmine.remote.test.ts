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

describe("RedmineBackend remote helpers and sync errors", () => {
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
    expect(helpers.coerceDocVersion("7")).toBeNull();
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
});
