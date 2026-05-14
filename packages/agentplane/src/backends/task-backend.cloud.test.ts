import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { captureStdIO, mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { CloudBackend, LocalBackend, type TaskData } from "./task-backend.js";

function parseRequestBody<T>(body: unknown): T {
  if (typeof body !== "string") {
    throw new TypeError("Expected string request body");
  }
  return JSON.parse(body) as T;
}

function requestUrl(url: unknown): string {
  if (typeof url === "string") return url;
  if (url instanceof URL) return url.href;
  if (url && typeof url === "object" && "url" in url && typeof url.url === "string") {
    return url.url;
  }
  throw new TypeError("Expected request URL");
}

function expectAbortSignal(input: unknown): asserts input is AbortSignal {
  expect(input).toBeInstanceOf(AbortSignal);
}

describe("CloudBackend", () => {
  let tempDir = "";
  let restoreStdIO: (() => void) | null = null;
  let originalEnv: NodeJS.ProcessEnv = {};

  beforeEach(async () => {
    restoreStdIO = silenceStdIO();
    tempDir = await mkTempDir();
    originalEnv = { ...process.env };
    delete process.env.AGENTPLANE_CLOUD_ENDPOINT;
    delete process.env.AGENTPLANE_CLOUD_TOKEN;
    delete process.env.AGENTPLANE_CLOUD_PROJECT_ID;
    delete process.env.AGENTPLANE_CLOUD_PROVIDER;
    await mkdir(path.join(tempDir, ".git"), { recursive: true });
  });

  afterEach(async () => {
    restoreStdIO?.();
    restoreStdIO = null;
    process.env = originalEnv;
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
  });

  it("inspects connection and freshness state without requiring configuration", async () => {
    const backend = new CloudBackend(
      { cache_dir: ".agentplane/tasks", stale_after_seconds: 1 },
      {
        root: tempDir,
        cache: new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") }),
      },
    );

    const result = await backend.inspectConfiguration();
    expect(result.connection).toMatchObject({
      endpoint: null,
      projectId: null,
      connected: false,
      missing: [
        "AGENTPLANE_CLOUD_ENDPOINT",
        "AGENTPLANE_CLOUD_TOKEN",
        "AGENTPLANE_CLOUD_PROJECT_ID",
      ],
    });
    expect(result.freshness?.lastCheckedAt).toBeNull();
    expect(result.freshness?.stale).toBe(false);
  });

  it("rejects local mutations before cache writes when the cloud projection is stale", async () => {
    const stateDir = path.join(tempDir, ".agentplane", "backends", "cloud");
    await mkdir(stateDir, { recursive: true });
    await writeFile(
      path.join(stateDir, "state.json"),
      `${JSON.stringify({ last_checked_at: "2026-05-05T00:00:00.000Z" }, null, 2)}\n`,
      "utf8",
    );
    const fetchImpl = vi.fn<typeof fetch>(() => Promise.resolve(Response.json({})));
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
        stale_after_seconds: 1,
      },
      {
        root: tempDir,
        cache: new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") }),
        fetchImpl,
      },
    );

    await expect(backend.assertLocalMutationReady()).rejects.toThrow(
      "Safe command: agentplane backend sync cloud --direction pull",
    );
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("push sync sends local tasks and records last check time", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const upstreamTask: TaskData = {
      id: "202605051806-A1B2",
      title: "Cloud prerequisite",
      description: "Sync this prerequisite first",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Cloud task",
      description: "Sync this task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [upstreamTask.id],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(upstreamTask);
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(Response.json({ last_checked_at: "2026-05-06T00:00:00.000Z" })),
    );
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
      },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "push", conflict: "diff", quiet: true, confirm: true });

    const firstCall = fetchImpl.mock.calls[0];
    if (!firstCall) throw new Error("Expected cloud backend to call fetch");
    const [url, init] = firstCall;
    expect(url).toBe("https://cloud.example/v1/projects/project-1/sync/push");
    expect(init?.method).toBe("POST");
    expectAbortSignal(init?.signal);
    expect(init?.body).toContain('"direction":"push"');
    const body = parseRequestBody<{ tasks: Array<{ id: string; depends_on?: string[] }> }>(
      init?.body,
    );
    expect(body.tasks.find((entry) => entry.id === task.id)?.depends_on).toEqual([
      upstreamTask.id,
    ]);
    const stateText = await readFile(
      path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"),
      "utf8",
    );
    expect(stateText).toContain("2026-05-06T00:00:00.000Z");
  });

  it("push sync preserves previous freshness when response omits last check time", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    await cache.writeTask({
      id: "202605051806-C1D2",
      title: "Cloud task",
      description: "Sync this task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    });
    const stateDir = path.join(tempDir, ".agentplane", "backends", "cloud");
    await mkdir(stateDir, { recursive: true });
    await writeFile(
      path.join(stateDir, "state.json"),
      `${JSON.stringify({ last_checked_at: "2026-05-05T00:00:00.000Z" }, null, 2)}\n`,
      "utf8",
    );
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(Response.json({ data: { no_projection_changes: true } })),
    );
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
      },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "push", conflict: "diff", quiet: true, confirm: true });

    const stateText = await readFile(path.join(stateDir, "state.json"), "utf8");
    expect(stateText).toContain("2026-05-05T00:00:00.000Z");
    expect(stateText).not.toContain("2026-05-06T00:00:00.000Z");
  });

  it("wraps aborted cloud requests with backend remediation", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    await cache.writeTask({
      id: "202605051806-C1D2",
      title: "Cloud task",
      description: "Sync this task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    });
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.reject(new DOMException("The operation was aborted due to timeout", "TimeoutError")),
    );
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
      },
      { root: tempDir, cache, fetchImpl },
    );

    await expect(
      backend.sync({ direction: "push", conflict: "diff", quiet: true, confirm: true }),
    ).rejects.toThrow("Safe command: agentplane backend inspect cloud --yes");
  });

  it("wraps aborted cloud response bodies with backend remediation", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    await cache.writeTask({
      id: "202605051806-C1D2",
      title: "Cloud task",
      description: "Sync this task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    });
    const response = new Response(null);
    vi.spyOn(response, "json").mockRejectedValue(
      new DOMException("The operation was aborted due to timeout", "TimeoutError"),
    );
    const fetchImpl = vi.fn<typeof fetch>(() => Promise.resolve(response));
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
      },
      { root: tempDir, cache, fetchImpl },
    );

    await expect(
      backend.sync({ direction: "push", conflict: "diff", quiet: true, confirm: true }),
    ).rejects.toThrow("Safe command: agentplane backend inspect cloud --yes");
  });

  it("push sync uploads oversized projections in finalized batches", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const largeText = "x".repeat(400_000);
    for (const suffix of ["C1D2", "C1D3"]) {
      await cache.writeTask({
        id: `202605051806-${suffix}`,
        title: `Cloud task ${suffix}`,
        description: largeText,
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["cloud"],
        verify: [],
      });
    }
    const fetchImpl = vi.fn<typeof fetch>((_url, init) => {
      const body = parseRequestBody<{
        batch?: { finalize?: boolean };
      }>(init?.body);
      return Promise.resolve(
        Response.json({
          data: {
            last_checked_at: "2026-05-06T00:00:00.000Z",
            batch: { finalized: body.batch?.finalize === true },
            no_projection_changes: body.batch?.finalize !== true,
          },
        }),
      );
    });
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
      },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "push", conflict: "diff", quiet: true, confirm: true });

    const calls = fetchImpl.mock.calls.map(([url, init]) => ({
      url: requestUrl(url),
      body: parseRequestBody<{
        batch?: {
          total_batches: number;
          chunk_index: number;
          finalize: boolean;
        };
        tasks?: unknown[];
      }>(init?.body),
    }));
    expect(calls.map((call) => call.url)).toEqual([
      "https://cloud.example/v1/projects/project-1/sync/push-batch",
      "https://cloud.example/v1/projects/project-1/sync/push-batch",
    ]);
    expect(calls[0]?.body.batch).toMatchObject({
      total_batches: 2,
      chunk_index: 0,
      finalize: false,
    });
    expect(calls[1]?.body.batch).toMatchObject({
      total_batches: 2,
      chunk_index: 1,
      finalize: true,
    });
    expect(calls[0]?.body.tasks).toHaveLength(1);
    expect(calls[1]?.body.tasks).toHaveLength(1);
  });

  it("retries transient network failures for oversized push batches", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const largeText = "x".repeat(400_000);
    for (const suffix of ["C1D2", "C1D3"]) {
      await cache.writeTask({
        id: `202605051806-${suffix}`,
        title: `Cloud task ${suffix}`,
        description: largeText,
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["cloud"],
        verify: [],
      });
    }
    const fetchImpl = vi.fn<typeof fetch>((_url, init) => {
      const body = parseRequestBody<{
        batch?: { chunk_index?: number; finalize?: boolean };
      }>(init?.body);
      if (body.batch?.chunk_index === 1 && fetchImpl.mock.calls.length === 2) {
        return Promise.reject(new TypeError("fetch failed"));
      }
      return Promise.resolve(
        Response.json({
          data: {
            last_checked_at: "2026-05-06T00:00:00.000Z",
            batch: { finalized: body.batch?.finalize === true },
            no_projection_changes: body.batch?.finalize !== true,
          },
        }),
      );
    });
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
      },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "push", conflict: "diff", quiet: true, confirm: true });

    const calls = fetchImpl.mock.calls.map(([_url, init]) => {
      const body = parseRequestBody<{
        batch?: { chunk_index?: number; finalize?: boolean };
      }>(init?.body);
      return body.batch;
    });
    expect(calls).toEqual([
      expect.objectContaining({ chunk_index: 0, finalize: false }),
      expect.objectContaining({ chunk_index: 1, finalize: true }),
      expect.objectContaining({ chunk_index: 1, finalize: true }),
    ]);
  });

  it("retries transient HTTP failures for oversized push batches", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const largeText = "x".repeat(400_000);
    for (const suffix of ["C1D2", "C1D3"]) {
      await cache.writeTask({
        id: `202605051806-${suffix}`,
        title: `Cloud task ${suffix}`,
        description: largeText,
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["cloud"],
        verify: [],
      });
    }
    const fetchImpl = vi.fn<typeof fetch>((_url, init) => {
      expectAbortSignal(init?.signal);
      const body = parseRequestBody<{
        batch?: { chunk_index?: number; finalize?: boolean };
      }>(init?.body);
      if (body.batch?.chunk_index === 1 && fetchImpl.mock.calls.length === 2) {
        return Promise.resolve(Response.json({ error: "temporary" }, { status: 503 }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            last_checked_at: "2026-05-06T00:00:00.000Z",
            batch: { finalized: body.batch?.finalize === true },
            no_projection_changes: body.batch?.finalize !== true,
          },
        }),
      );
    });
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
      },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "push", conflict: "diff", quiet: true, confirm: true });

    const calls = fetchImpl.mock.calls.map(([_url, init]) => {
      const body = parseRequestBody<{
        batch?: { chunk_index?: number; finalize?: boolean };
      }>(init?.body);
      return body.batch;
    });
    expect(calls).toEqual([
      expect.objectContaining({ chunk_index: 0, finalize: false }),
      expect.objectContaining({ chunk_index: 1, finalize: true }),
      expect.objectContaining({ chunk_index: 1, finalize: true }),
    ]);
  });

  it("pull sync does not rewrite identical local projection tasks", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Cloud task",
      description: "Sync this task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const localTasks = await cache.listTasks();
    const taskPath = path.join(tempDir, ".agentplane", "tasks", task.id, "README.md");
    const before = await readFile(taskPath, "utf8");
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          data: {
            tasks: localTasks,
            last_checked_at: "2026-05-06T00:00:00.000Z",
          },
        }),
      ),
    );
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
      },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    await expect(readFile(taskPath, "utf8")).resolves.toBe(before);
  });

  it("bidirectional pull applies only operational fields to known local tasks", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Keep local description",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: ["upstream"],
      tags: ["cloud"],
      verify: ["local verify"],
      plan_approval: {
        state: "approved",
        updated_at: "2026-05-06T00:00:00.000Z",
        updated_by: "ORCHESTRATOR",
        note: "Approved locally",
      },
      verification: {
        state: "pending",
        updated_at: null,
        updated_by: null,
        note: null,
      },
      comments: [{ author: "CODER", body: "Keep this comment" }],
    };
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          tasks: [
            {
              id: task.id,
              title: "Remote title",
              description: "Remote must not replace this",
              status: "DOING",
              priority: "high",
              owner: "DOCS",
              tags: ["cloud", "remote"],
              depends_on: [],
              verify: [],
              comments: [],
            },
          ],
          last_checked_at: "2026-05-06T00:00:00.000Z",
        }),
      ),
    );
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
    });

    const updated = await cache.getTask(task.id);
    expect(updated).toMatchObject({
      id: task.id,
      title: "Remote title",
      description: "Keep local description",
      status: "DOING",
      priority: "high",
      owner: "DOCS",
      depends_on: ["upstream"],
      tags: ["cloud", "remote"],
      verify: ["local verify"],
      plan_approval: task.plan_approval,
      verification: task.verification,
      comments: task.comments,
    });
  });

  it("pull ignores remote-only tasks without a creation policy", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const localTask: TaskData = {
      id: "202605051806-C1D2",
      title: "Cloud task",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(localTask);
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          data: {
            tasks: [
              { id: "202605051806-REMOTE", title: "Remote only", status: "TODO" },
              { id: localTask.id, title: "Updated", status: "TODO" },
            ],
            last_checked_at: "2026-05-06T00:00:00.000Z",
          },
        }),
      ),
    );
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
    });

    await expect(cache.getTask("202605051806-REMOTE")).resolves.toBeNull();
    await expect(cache.getTask(localTask.id)).resolves.toMatchObject({ title: "Updated" });
  });

  it("conflict=diff does not write pull changes", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          tasks: [{ id: task.id, title: "Remote title", status: "DONE" }],
          last_checked_at: "2026-05-06T00:00:00.000Z",
        }),
      ),
    );
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    await expect(cache.getTask(task.id)).resolves.toMatchObject({
      title: "Local title",
      status: "TODO",
    });
  });

  it("conflict=diff reports a read-only cloud pull summary without advancing stale state", async () => {
    restoreStdIO?.();
    restoreStdIO = null;
    const io = captureStdIO();
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { openConflicts: [] } }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [
              { id: task.id, title: "Remote title", status: "DONE" },
              { id: "202605051806-REMOTE", title: "Remote only", status: "TODO" },
            ],
            last_checked_at: "2026-05-06T00:00:00.000Z",
          },
        }),
      );
    });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    try {
      await backend.sync({ direction: "pull", conflict: "diff", quiet: false, confirm: true });

      expect(io.stdout).toContain("cloud pull diff changed=1 ignored_remote_only=1 conflicts=0");
      expect(io.stdout).toContain(`changed ${task.id}: title,status`);
      expect(io.stdout).toContain("ignored remote-only 202605051806-REMOTE");
      await expect(cache.getTask(task.id)).resolves.toMatchObject({
        title: "Local title",
        status: "TODO",
      });
      await expect(
        readFile(path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"), "utf8"),
      ).rejects.toMatchObject({ code: "ENOENT" });
    } finally {
      io.restore();
      restoreStdIO = silenceStdIO();
    }
  });

  it("preserves the service freshness timestamp after a no-op cloud pull", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { openConflicts: [] } }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [task],
            last_checked_at: "2000-01-01T00:00:00.000Z",
          },
        }),
      );
    });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    const stateText = await readFile(
      path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"),
      "utf8",
    );
    const state = JSON.parse(stateText) as { last_checked_at: string };
    expect(state.last_checked_at).toBe("2000-01-01T00:00:00.000Z");
  });

  it("uses a local freshness fallback after a no-op pull only when the service omits a timestamp", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { openConflicts: [] } }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [task],
          },
        }),
      );
    });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    const stateText = await readFile(
      path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"),
      "utf8",
    );
    const state = JSON.parse(stateText) as { last_checked_at: string };
    expect(Number.isFinite(Date.parse(state.last_checked_at))).toBe(true);
  });

  it("conflict=fail refuses to write open service conflicts", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          data: {
            tasks: [{ id: task.id, title: "Remote title", status: "DONE" }],
            conflicts: [{ task_id: task.id, field: "status", state: "open" }],
            safe_command: "agentplane backend sync cloud --direction pull --conflict=diff",
          },
        }),
      ),
    );
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await expect(
      backend.sync({ direction: "pull", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("open conflicts");
    await expect(cache.getTask(task.id)).resolves.toMatchObject({ title: "Local title" });
  });

  it("conflict=fail refuses open conflicts reported by sync state before pull", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>(() => {
      return Promise.resolve(
        Response.json({
          data: {
            openConflicts: [{ task_id: task.id, field: "status", state: "open" }],
            safe_command: "agentplane backend sync cloud --direction pull --conflict=diff",
          },
        }),
      );
    });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await expect(
      backend.sync({ direction: "pull", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("open conflicts");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl.mock.calls[0]?.[0]).toBe(
      "https://cloud.example/v1/projects/project-1/sync/state",
    );
    await expect(cache.getTask(task.id)).resolves.toMatchObject({ title: "Local title" });
  });

  it("conflict=fail refuses numeric open conflict counts reported by sync state", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const fetchImpl = vi.fn<typeof fetch>(() => {
      return Promise.resolve(
        Response.json({
          data: {
            openConflicts: 2,
            safe_command: "agentplane backend sync cloud --direction pull --conflict=diff",
          },
        }),
      );
    });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await expect(
      backend.sync({ direction: "pull", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("open conflicts");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("falls back to pull conflict data when sync state is unavailable", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ error: "not found" }, { status: 404 }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [{ id: task.id, title: "Remote title", status: "DONE" }],
            last_checked_at: "2026-05-06T00:00:00.000Z",
          },
        }),
      );
    });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
    });

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(fetchImpl.mock.calls[0]?.[0]).toBe(
      "https://cloud.example/v1/projects/project-1/sync/state",
    );
    expect(fetchImpl.mock.calls[1]?.[0]).toBe(
      "https://cloud.example/v1/projects/project-1/sync/pull",
    );
    await expect(cache.getTask(task.id)).resolves.toMatchObject({
      title: "Remote title",
      status: "DONE",
    });
  });

  it("falls back to pull conflict data when sync state body parsing fails", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(new Response("{", { status: 200 }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [{ id: task.id, title: "Remote title", status: "DONE" }],
            last_checked_at: "2026-05-06T00:00:00.000Z",
          },
        }),
      );
    });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
    });

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    await expect(cache.getTask(task.id)).resolves.toMatchObject({
      title: "Remote title",
      status: "DONE",
    });
  });

  it("service remediation payload is included in HTTP errors", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json(
          {
            error: {
              code: "cloud_direction_not_supported",
              why: "publish_only projects cannot pull remote edits",
              fix: "switch the project to bidirectional access",
              safe_command: "agentplane backend inspect cloud --yes",
              when_to_stop: "stop until the service project access level changes",
            },
          },
          { status: 409 },
        ),
      ),
    );
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await expect(
      backend.sync({ direction: "pull", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("cloud_direction_not_supported");
  });

  it("stale projection blocks local task mutation and prints pull command", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const statePath = path.join(tempDir, ".agentplane", "backends", "cloud", "state.json");
    await mkdir(path.dirname(statePath), { recursive: true });
    await writeFile(statePath, '{ "last_checked_at": "2000-01-01T00:00:00.000Z" }', "utf8");
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example",
        token: "token",
        project_id: "project-1",
        stale_after_seconds: 1,
      },
      { root: tempDir, cache },
    );

    await expect(
      backend.writeTask({
        id: "202605051806-C1D2",
        title: "Cloud task",
        description: "Existing task",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["cloud"],
        verify: [],
      }),
    ).rejects.toThrow("agentplane backend sync cloud --direction pull");
  });

  it("does not advance cloud state when pull cache write fails", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = {
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["cloud"],
      verify: [],
    };
    await cache.writeTask(task);
    const writeTasks = vi
      .spyOn(cache, "writeTasks")
      .mockRejectedValueOnce(new Error("write failed"));
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          tasks: [{ id: task.id, title: "Remote title" }],
          last_checked_at: "2026-05-06T00:00:00.000Z",
        }),
      ),
    );
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await expect(
      backend.sync({ direction: "pull", conflict: "prefer-remote", quiet: true, confirm: true }),
    ).rejects.toThrow("write failed");
    expect(writeTasks).toHaveBeenCalledTimes(1);
    await expect(
      readFile(path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });
});
