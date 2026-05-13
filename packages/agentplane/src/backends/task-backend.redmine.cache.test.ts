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

describe("RedmineBackend cache export and unavailable paths", () => {
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
    expect(backend.capabilities.supports_snapshot_export).toBe(false);
    const rows = await backend.listProjectionTasks();
    expect(rows).toHaveLength(1);
    expect(rows[0]?.id).toBe(task.id);
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

  it("treats revision-only divergence as a syncPull conflict for dirty local tasks", async () => {
    const cache = new LocalBackend({ dir: tempDir });
    await cache.writeTask({
      id: "202603140730-R37DPX",
      title: "Same task",
      description: "Same task",
      status: "TODO",
      priority: "med",
      owner: "REDMINE",
      revision: 3,
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
        custom_fields: { task_id: 1, canonical_state: 2 },
      },
      { cache },
    );
    const helper = backend as unknown as {
      listTasksRemote: () => Promise<TaskData[]>;
    };
    helper.listTasksRemote = vi.fn().mockResolvedValue([
      {
        id: "202603140730-R37DPX",
        title: "Same task",
        description: "Same task",
        status: "TODO",
        priority: "med",
        owner: "REDMINE",
        revision: 4,
        depends_on: [],
        tags: [],
        verify: [],
      },
    ]);

    await expect(
      backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: false }),
    ).rejects.toThrow(/Conflict detected for 202603140730-R37DPX/u);
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
