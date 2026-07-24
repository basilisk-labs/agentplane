import { access, mkdir, readFile, rename, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { mkTempDir, silenceStdIO } from "@agentplane/testkit";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CloudBackend, LocalBackend, type TaskData } from "./task-backend.js";
import { applyCloudCacheEffects } from "./task-backend/cloud-cache-effects.js";
import { cloudProjectionIdentitySha256 } from "./task-backend/cloud-projection-identity.js";

const FIRST_TASK_ID = "202607241700-C1D2";
const SECOND_TASK_ID = "202607241700-C1D3";
const LAST_CHECKED_AT = "2026-07-24T16:00:00.000Z";

function makeTask(overrides: Partial<TaskData> & { id: string }): TaskData {
  return {
    id: overrides.id,
    title: "Cloud snapshot task",
    description: "Exercise cache snapshot safety",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["cloud"],
    verify: [],
    ...overrides,
  };
}

function requestUrl(input: unknown): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  if (input && typeof input === "object" && "url" in input) {
    return String(input.url);
  }
  throw new TypeError("Expected request URL");
}

function parseBody<T>(body: unknown): T {
  if (typeof body !== "string") throw new TypeError("Expected JSON request body");
  return JSON.parse(body) as T;
}

function pullFetch(tasks: unknown[]): typeof fetch {
  return vi.fn<typeof fetch>((input) => {
    const url = requestUrl(input);
    if (url.endsWith("/sync/state")) {
      return Promise.resolve(Response.json({ data: { open_conflicts: [] } }));
    }
    return Promise.resolve(
      Response.json({
        data: {
          tasks,
          projection_complete: true,
          last_checked_at: "2026-07-24T17:00:00.000Z",
        },
      }),
    );
  });
}

function acknowledgedPushFetch(): typeof fetch {
  return vi.fn<typeof fetch>((_input, init) => {
    const body = parseBody<{
      projection: Record<string, unknown>;
    }>(init?.body);
    return Promise.resolve(
      Response.json({
        data: {
          projection_ack: {
            status: "persisted",
            ...body.projection,
          },
        },
      }),
    );
  });
}

function injectPushCacheEditAfterList(cache: LocalBackend, listCall: number, title: string): void {
  const originalListTasks = cache.listTasksWithWarnings.bind(cache);
  let calls = 0;
  vi.spyOn(cache, "listTasksWithWarnings").mockImplementation(async () => {
    const result = await originalListTasks();
    calls += 1;
    if (calls === listCall) {
      const task = result.tasks.find((candidate) => candidate.id === FIRST_TASK_ID);
      if (!task) throw new Error("missing submitted task");
      await cache.writeTask({ ...task, title }, { expectedRevision: task.revision });
    }
    return result;
  });
}

describe("CloudBackend cache snapshot safety", () => {
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
    delete process.env.AGENTPLANE_CLOUD_REMOTE_CREATE_POLICY;
    await mkdir(path.join(tempDir, ".git"), { recursive: true });
  });

  afterEach(async () => {
    restoreStdIO?.();
    restoreStdIO = null;
    process.env = originalEnv;
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
  });

  it("keeps pending push state when the cache changes after the submitted receipt", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Submitted" }));
    await writeBoundState({
      pending_push: {
        failed_at: LAST_CHECKED_AT,
        kind: "local_dirty",
        reason: "Local edit is pending",
      },
    });
    const fetchImpl = vi.fn<typeof fetch>(async (_input, init) => {
      const body = parseBody<{
        projection: {
          request_id: string;
          projection_sha256: string;
          task_count: number;
          project_id: string;
          provider: string | null;
        };
      }>(init?.body);
      const current = await cache.getTask(FIRST_TASK_ID);
      if (!current) throw new Error("missing submitted task");
      await cache.writeTask({ ...current, title: "Manual edit during push" });
      return Response.json({
        data: {
          last_checked_at: "2026-07-24T17:00:00.000Z",
          projection_ack: {
            status: "persisted",
            ...body.projection,
          },
        },
      });
    });
    const backend = createBackend(cache, fetchImpl);

    await expect(
      backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toMatchObject({
      reasonCode: "cloud_cache_projection_changed",
    });

    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({
      title: "Manual edit during push",
    });
    const state = await readState();
    expect(state.pending_push).toMatchObject({
      kind: "local_dirty",
      reason: "Local edit is pending",
    });
  });

  it("creates pending push state when an unmarked cache edit follows the submitted snapshot", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Submitted" }));
    await writeBoundState();
    const fetchImpl = vi.fn<typeof fetch>(async (_input, init) => {
      const body = parseBody<{
        projection: Record<string, unknown>;
      }>(init?.body);
      const current = await cache.getTask(FIRST_TASK_ID);
      if (!current) throw new Error("missing submitted task");
      await cache.writeTask({ ...current, title: "Unmarked manual edit during push" });
      return Response.json({
        data: {
          projection_ack: {
            status: "persisted",
            ...body.projection,
          },
        },
      });
    });
    const backend = createBackend(cache, fetchImpl);

    await expect(
      backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toMatchObject({
      reasonCode: "cloud_cache_projection_changed",
    });

    const state = await readState();
    expect(state.pending_push).toMatchObject({
      kind: "local_dirty",
      reason: "Local cloud cache changed after the submitted push snapshot",
    });
  });

  it("rejects a pull response when the cache changes during the network request", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Before pull" }));
    await writeBoundState();
    const fetchImpl = vi.fn<typeof fetch>(async (input) => {
      const url = requestUrl(input);
      if (url.endsWith("/sync/state")) {
        return Response.json({ data: { open_conflicts: [] } });
      }
      const current = await cache.getTask(FIRST_TASK_ID);
      if (!current) throw new Error("missing local task");
      await cache.writeTask({ ...current, title: "Manual edit during pull" });
      return Response.json({
        tasks: [{ id: FIRST_TASK_ID, title: "Remote title", status: "DONE" }],
        projection_complete: true,
        last_checked_at: "2026-07-24T17:00:00.000Z",
      });
    });
    const backend = createBackend(cache, fetchImpl);

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
      }),
    ).rejects.toThrow("cache projection changed during synchronization");

    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({
      title: "Manual edit during pull",
    });
    expect(await readState()).toMatchObject({
      last_checked_at: LAST_CHECKED_AT,
      pending_projection_apply: null,
    });
  });

  it("rejects cache drift during sync-state preflight before issuing the pull", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Before preflight" }));
    await writeBoundState();
    const fetchImpl = vi.fn<typeof fetch>(async (input) => {
      const url = requestUrl(input);
      if (!url.endsWith("/sync/state")) throw new Error(`unexpected pull request: ${url}`);
      const current = await cache.getTask(FIRST_TASK_ID);
      if (!current) throw new Error("missing local task");
      await cache.writeTask({ ...current, title: "Manual edit during preflight" });
      return Response.json({ data: { open_conflicts: [] } });
    });
    const backend = createBackend(cache, fetchImpl);

    await expect(
      backend.sync({ direction: "pull", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("cache projection changed during synchronization");

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({
      title: "Manual edit during preflight",
    });
  });

  it("stops a multi-task pull before overwriting a manual edit to the next task", async () => {
    const cache = createCache();
    await cache.writeTasks([
      makeTask({ id: FIRST_TASK_ID, title: "First local" }),
      makeTask({ id: SECOND_TASK_ID, title: "Second local" }),
    ]);
    await writeBoundState();
    const originalWriteTask = cache.writeTaskWithReceipt.bind(cache);
    const writeTask = vi
      .spyOn(cache, "writeTaskWithReceipt")
      .mockImplementation(async (task, opts, beforePublication) => {
        const receipt = await originalWriteTask(task, opts, beforePublication);
        if (task.id === FIRST_TASK_ID) {
          const second = await cache.getTask(SECOND_TASK_ID);
          if (!second) throw new Error("missing second task");
          await cache.writeTask({ ...second, title: "Manual second edit" });
        }
        return receipt;
      });
    const backend = createBackend(
      cache,
      pullFetch([
        { id: FIRST_TASK_ID, title: "First remote", status: "DOING" },
        { id: SECOND_TASK_ID, title: "Second remote", status: "DONE" },
      ]),
    );

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
      }),
    ).rejects.toThrow("cache projection changed during synchronization");

    expect(writeTask).toHaveBeenCalledTimes(1);
    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({
      title: "First remote",
    });
    await expect(cache.getTask(SECOND_TASK_ID)).resolves.toMatchObject({
      title: "Manual second edit",
    });
    const state = await readState();
    expect(state.pending_projection_apply).toMatchObject({
      kind: "pull_apply",
    });
  });

  it("stops guarded deletions when another local-only task is edited", async () => {
    const cache = createCache();
    await cache.writeTasks([
      makeTask({ id: FIRST_TASK_ID, title: "First local-only" }),
      makeTask({ id: SECOND_TASK_ID, title: "Second local-only" }),
    ]);
    await writeBoundState();
    const originalDeleteTask = cache.deleteTaskWithPublicationGuard.bind(cache);
    const deleteTask = vi
      .spyOn(cache, "deleteTaskWithPublicationGuard")
      .mockImplementation(async (taskId, opts, beforeDeletion) => {
        await originalDeleteTask(taskId, opts, beforeDeletion);
        if (taskId === FIRST_TASK_ID) {
          const second = await cache.getTask(SECOND_TASK_ID);
          if (!second) throw new Error("missing second task");
          await cache.writeTask({ ...second, title: "Manual edit before second delete" });
        }
      });
    const backend = createBackend(cache, pullFetch([]));

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
      }),
    ).rejects.toThrow("cache projection changed during synchronization");

    expect(deleteTask).toHaveBeenCalledTimes(1);
    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toBeNull();
    await expect(cache.getTask(SECOND_TASK_ID)).resolves.toMatchObject({
      title: "Manual edit before second delete",
    });
    const state = await readState();
    expect(state.pending_projection_apply).toMatchObject({
      kind: "pull_apply",
    });
  });

  it("rejects deletion when a concurrent write lands after the delete precheck", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Local-only" }));
    await writeBoundState();
    const originalDeleteTask = cache.deleteTaskWithPublicationGuard.bind(cache);
    const deleteTask = vi
      .spyOn(cache, "deleteTaskWithPublicationGuard")
      .mockImplementation(async (taskId, opts, beforeDeletion) => {
        const current = await cache.getTask(taskId);
        if (!current) throw new Error("missing task before guarded delete");
        await cache.writeTask(
          { ...current, title: "Manual edit before guarded delete" },
          { expectedRevision: current.revision },
        );
        await originalDeleteTask(taskId, opts, beforeDeletion);
      });
    const backend = createBackend(cache, pullFetch([]));

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
      }),
    ).rejects.toThrow("Task revision changed concurrently");

    expect(deleteTask).toHaveBeenCalledWith(
      FIRST_TASK_ID,
      { expectedRevision: 1 },
      expect.any(Function),
    );
    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({
      revision: 2,
      title: "Manual edit before guarded delete",
    });
    const state = await readState();
    expect(state.pending_projection_apply).toMatchObject({
      kind: "pull_apply",
    });
  });

  it("rejects a task-directory symlink swap at the README publication boundary", async () => {
    const outside = await mkTempDir();
    try {
      const cache = createCache();
      await writeBoundState();
      const taskDirectory = path.join(cache.root, FIRST_TASK_ID);
      const displacedDirectory = path.join(cache.root, `${FIRST_TASK_ID}-displaced`);
      const originalWriteTask = cache.writeTaskWithReceipt.bind(cache);
      let swapped = false;
      vi.spyOn(cache, "writeTaskWithReceipt").mockImplementation(
        async (task, opts, beforePublication) => {
          return await originalWriteTask(task, opts, async () => {
            if (!swapped) {
              swapped = true;
              await rename(taskDirectory, displacedDirectory);
              await symlink(outside, taskDirectory, "dir");
            }
            await beforePublication();
          });
        },
      );
      const backend = createBackend(
        cache,
        pullFetch([{ id: FIRST_TASK_ID, title: "Remote import", status: "TODO" }]),
        { remote_create_policy: "import" },
      );

      await expect(
        backend.sync({
          direction: "pull",
          conflict: "prefer-remote",
          quiet: true,
          confirm: true,
        }),
      ).rejects.toThrow("task directory");

      await expect(access(path.join(outside, "README.md"))).rejects.toMatchObject({
        code: "ENOENT",
      });
      const state = await readState();
      expect(state.pending_projection_apply).toMatchObject({
        kind: "pull_apply",
      });
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  });

  it("rejects a pre-existing task README symlink before issuing a cloud request", async () => {
    const outside = await mkTempDir();
    try {
      const outsideCache = new LocalBackend({ dir: path.join(outside, "tasks") });
      await outsideCache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Outside" }));
      const outsideReadme = path.join(outsideCache.root, FIRST_TASK_ID, "README.md");
      const outsideText = await readFile(outsideReadme, "utf8");
      const cache = createCache();
      await mkdir(path.join(cache.root, FIRST_TASK_ID), { recursive: true });
      await symlink(outsideReadme, path.join(cache.root, FIRST_TASK_ID, "README.md"));
      await writeBoundState();
      const fetchImpl = vi.fn<typeof fetch>();
      const backend = createBackend(cache, fetchImpl);

      await expect(
        backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
      ).rejects.toMatchObject({
        reasonCode: "cloud_cache_projection_invalid",
      });

      expect(fetchImpl).not.toHaveBeenCalled();
      await expect(readFile(outsideReadme, "utf8")).resolves.toBe(outsideText);
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  });

  it("rejects a task README symlink introduced after the local scan", async () => {
    const outside = await mkTempDir();
    try {
      const cache = createCache();
      await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Local" }));
      const outsideCache = new LocalBackend({ dir: path.join(outside, "tasks") });
      await outsideCache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Outside" }));
      const localReadme = path.join(cache.root, FIRST_TASK_ID, "README.md");
      const displacedReadme = path.join(cache.root, FIRST_TASK_ID, "README.displaced.md");
      const outsideReadme = path.join(outsideCache.root, FIRST_TASK_ID, "README.md");
      const originalListTasks = cache.listTasksWithWarnings.bind(cache);
      let swapped = false;
      vi.spyOn(cache, "listTasksWithWarnings").mockImplementation(async () => {
        const result = await originalListTasks();
        if (!swapped) {
          swapped = true;
          await rename(localReadme, displacedReadme);
          await symlink(outsideReadme, localReadme);
        }
        return result;
      });
      await writeBoundState();
      const fetchImpl = vi.fn<typeof fetch>();
      const backend = createBackend(cache, fetchImpl);

      await expect(
        backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
      ).rejects.toMatchObject({
        reasonCode: "cloud_cache_projection_invalid",
      });

      expect(fetchImpl).not.toHaveBeenCalled();
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  });

  it("rejects a task README symlink swap at the atomic publication boundary", async () => {
    const outside = await mkTempDir();
    try {
      const cache = createCache();
      await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Local" }));
      const outsideReadme = path.join(outside, "README.md");
      await writeFile(outsideReadme, "outside sentinel\n", "utf8");
      const localReadme = path.join(cache.root, FIRST_TASK_ID, "README.md");
      const displacedReadme = path.join(cache.root, FIRST_TASK_ID, "README.displaced.md");
      const originalWriteTask = cache.writeTaskWithReceipt.bind(cache);
      let swapped = false;
      vi.spyOn(cache, "writeTaskWithReceipt").mockImplementation(
        async (task, opts, beforePublication) =>
          await originalWriteTask(task, opts, async () => {
            if (!swapped) {
              swapped = true;
              await rename(localReadme, displacedReadme);
              await symlink(outsideReadme, localReadme);
            }
            await beforePublication();
          }),
      );
      await writeBoundState();
      const backend = createBackend(
        cache,
        pullFetch([{ id: FIRST_TASK_ID, title: "Remote", status: "DONE" }]),
      );

      await expect(
        backend.sync({
          direction: "pull",
          conflict: "prefer-remote",
          quiet: true,
          confirm: true,
        }),
      ).rejects.toThrow("Refusing symlinked task README");

      await expect(readFile(outsideReadme, "utf8")).resolves.toBe("outside sentinel\n");
      expect(await readState()).toMatchObject({
        pending_projection_apply: { kind: "pull_apply" },
      });
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  });

  it("uses request-scoped scan warnings even when a later scan clears shared warnings", async () => {
    const cache = createCache();
    const malformedTaskDirectory = path.join(cache.root, FIRST_TASK_ID);
    await mkdir(malformedTaskDirectory, { recursive: true });
    await writeFile(path.join(malformedTaskDirectory, "README.md"), "---\n{broken\n---\n", "utf8");
    const originalListTasksWithWarnings = cache.listTasksWithWarnings.bind(cache);
    vi.spyOn(cache, "listTasksWithWarnings").mockImplementation(async () => {
      const captured = await originalListTasksWithWarnings();
      await rm(malformedTaskDirectory, { recursive: true, force: true });
      await originalListTasksWithWarnings();
      return captured;
    });
    await writeBoundState({
      pending_push: {
        failed_at: LAST_CHECKED_AT,
        kind: "local_dirty",
        reason: "Malformed local edit is pending",
      },
    });
    const fetchImpl = vi.fn<typeof fetch>();
    const backend = createBackend(cache, fetchImpl);

    await expect(
      backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toMatchObject({
      reasonCode: "cloud_cache_projection_invalid",
    });

    expect(fetchImpl).not.toHaveBeenCalled();
    const state = await readState();
    expect(state.pending_push).toMatchObject({
      kind: "local_dirty",
      reason: "Malformed local edit is pending",
    });
  });

  it("honors exact create, changed, and no-op revision receipts during cache effects", async () => {
    const cache = createCache();
    const requested = makeTask({ id: FIRST_TASK_ID, revision: 7 });
    const created = await applyCloudCacheEffects({
      cache,
      expectedTasks: [],
      writes: [requested],
      removedIds: [],
      repositoryRoot: tempDir,
    });

    expect(created).toHaveLength(1);
    expect(created[0]).toMatchObject({ id: FIRST_TASK_ID, revision: 7 });

    const normalized = await applyCloudCacheEffects({
      cache,
      expectedTasks: created,
      writes: created,
      removedIds: [],
      repositoryRoot: tempDir,
    });

    expect(normalized[0]).toMatchObject({ id: FIRST_TASK_ID, revision: 8 });

    const unchanged = await applyCloudCacheEffects({
      cache,
      expectedTasks: normalized,
      writes: normalized,
      removedIds: [],
      repositoryRoot: tempDir,
    });

    expect(unchanged).toEqual(normalized);
    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({ revision: 8 });
  });

  it("keeps the apply marker when the written task is edited before its receipt check", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Local" }));
    await writeBoundState();
    const originalWriteTask = cache.writeTaskWithReceipt.bind(cache);
    vi.spyOn(cache, "writeTaskWithReceipt").mockImplementation(
      async (task, opts, beforePublication) => {
        const receipt = await originalWriteTask(task, opts, beforePublication);
        const written = await cache.getTask(task.id);
        if (!written) throw new Error("missing written task");
        await cache.writeTask(
          { ...written, title: "Manual edit after cloud write" },
          { expectedRevision: written.revision },
        );
        return receipt;
      },
    );
    const backend = createBackend(
      cache,
      pullFetch([{ id: FIRST_TASK_ID, title: "Remote", status: "DONE" }]),
    );

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
      }),
    ).rejects.toThrow("cache projection changed during synchronization");

    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({
      title: "Manual edit after cloud write",
      revision: 3,
    });
    const state = await readState();
    expect(state.pending_projection_apply).toMatchObject({
      kind: "pull_apply",
    });
  });

  it("preserves pending push when the stable pre-commit scan observes cache drift", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Submitted" }));
    await writeBoundState({
      pending_push: {
        failed_at: LAST_CHECKED_AT,
        kind: "local_dirty",
        reason: "Local edit is pending",
      },
    });
    injectPushCacheEditAfterList(cache, 3, "Manual edit before state publication");
    const backend = createBackend(cache, acknowledgedPushFetch());

    await expect(
      backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("cache projection changed during synchronization");

    const state = await readState();
    expect(state.pending_push).toMatchObject({
      kind: "local_dirty",
      reason: "Local edit is pending",
    });
  });

  it("restores pending push when cache drift appears after checkpoint publication", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Submitted" }));
    await writeBoundState({
      pending_push: {
        failed_at: LAST_CHECKED_AT,
        kind: "local_dirty",
        reason: "Local edit is pending",
      },
    });
    injectPushCacheEditAfterList(cache, 4, "Manual edit after state publication");
    const backend = createBackend(cache, acknowledgedPushFetch());

    await expect(
      backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("cache projection changed during synchronization");

    const state = await readState();
    expect(state.pending_push).toMatchObject({
      kind: "local_dirty",
      reason: "Local cloud cache changed while the push checkpoint was committed",
    });
  });

  it("merges top-level and nested pull conflicts instead of letting an empty array win", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID }));
    await writeBoundState();
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = requestUrl(input);
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: [] } }));
      }
      return Promise.resolve(
        Response.json({
          conflicts: [],
          data: {
            conflicts: [{ task_id: FIRST_TASK_ID, field: "status", state: "open" }],
            tasks: [{ id: FIRST_TASK_ID, status: "TODO" }],
          },
        }),
      );
    });
    const backend = createBackend(cache, fetchImpl);

    await expect(
      backend.sync({ direction: "pull", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("open conflicts");
  });

  it("merges top-level and nested sync-state conflicts before issuing a pull", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID }));
    await writeBoundState();
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          open_conflicts: [],
          data: {
            conflicts: [{ task_id: FIRST_TASK_ID, field: "status", state: "open" }],
          },
        }),
      ),
    );
    const backend = createBackend(cache, fetchImpl);

    await expect(
      backend.sync({ direction: "pull", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("open conflicts");
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["diff", "remote_create_policy=diff"],
    ["import", "cannot leave importable remote-only tasks unresolved"],
  ] as const)(
    "prefer-local does not advance freshness with unresolved remote-only tasks under %s",
    async (remoteCreatePolicy, expectedError) => {
      const cache = createCache();
      await writeBoundState();
      const backend = createBackend(
        cache,
        pullFetch([{ id: FIRST_TASK_ID, title: "Remote only", status: "TODO" }]),
        { remote_create_policy: remoteCreatePolicy },
      );

      await expect(
        backend.sync({
          direction: "pull",
          conflict: "prefer-local",
          quiet: true,
          confirm: true,
        }),
      ).rejects.toThrow(expectedError);

      expect(await readState()).toMatchObject({
        last_checked_at: LAST_CHECKED_AT,
        pending_projection_apply: null,
      });
      await expect(cache.getTask(FIRST_TASK_ID)).resolves.toBeNull();
    },
  );

  it("requires completeness markers from both identical task envelopes", async () => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Retained" }));
    const tasks = [{ id: FIRST_TASK_ID, title: "Remote", status: "DONE" }];
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = requestUrl(input);
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: [] } }));
      }
      return Promise.resolve(
        Response.json({
          tasks,
          projection_complete: true,
          data: { tasks },
        }),
      );
    });
    const backend = createBackend(cache, fetchImpl);

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
        identityTransition: "adopt_remote",
      }),
    ).rejects.toThrow("complete task projection");

    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({ title: "Retained" });
  });

  it.each([
    [
      "conflicting completeness aliases",
      {
        tasks: [],
        projection_complete: true,
        complete_snapshot: false,
      },
    ],
    [
      "conflicting top-level and nested completeness markers",
      {
        tasks: [],
        projection_complete: true,
        data: { tasks: [], projection_complete: false },
      },
    ],
    [
      "conflicting no-change aliases",
      {
        no_projection_changes: true,
        no_changes: false,
      },
    ],
    [
      "conflicting top-level and nested freshness timestamps",
      {
        tasks: [],
        projection_complete: true,
        last_checked_at: "2026-07-24T17:00:00.000Z",
        data: { last_checked_at: "2026-07-24T17:01:00.000Z" },
      },
    ],
    [
      "a malformed optional scalar",
      {
        tasks: [],
        projection_complete: "true",
      },
    ],
    [
      "tasks combined with a no-change receipt",
      {
        tasks: [],
        no_projection_changes: true,
      },
    ],
    [
      "a no-change receipt combined with a completeness marker",
      {
        no_projection_changes: true,
        projection_complete: true,
      },
    ],
  ])("rejects %s before changing cache or checkpoint state", async (_label, response) => {
    const cache = createCache();
    await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Retained" }));
    await writeBoundState();
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      if (requestUrl(input).endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: [] } }));
      }
      return Promise.resolve(Response.json(response));
    });
    const backend = createBackend(cache, fetchImpl);

    await expect(
      backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true }),
    ).rejects.toMatchObject({
      reasonCode: "cloud_pull_projection_conflict",
    });

    await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({ title: "Retained" });
    expect(await readState()).toMatchObject({
      last_checked_at: LAST_CHECKED_AT,
      pending_projection_apply: null,
    });
  });

  it.each([null, [], 7])(
    "rejects a present non-object pull data envelope (%j)",
    async (invalidData) => {
      const cache = createCache();
      await cache.writeTask(makeTask({ id: FIRST_TASK_ID, title: "Retained" }));
      await writeBoundState();
      const fetchImpl = vi.fn<typeof fetch>((input) => {
        if (requestUrl(input).endsWith("/sync/state")) {
          return Promise.resolve(Response.json({ data: { open_conflicts: [] } }));
        }
        return Promise.resolve(
          Response.json({
            tasks: [],
            projection_complete: true,
            data: invalidData,
          }),
        );
      });
      const backend = createBackend(cache, fetchImpl);

      await expect(
        backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true }),
      ).rejects.toMatchObject({
        reasonCode: "cloud_sync_response_invalid",
      });

      await expect(cache.getTask(FIRST_TASK_ID)).resolves.toMatchObject({ title: "Retained" });
      expect(await readState()).toMatchObject({
        last_checked_at: LAST_CHECKED_AT,
        pending_projection_apply: null,
      });
    },
  );

  function createCache(): LocalBackend {
    return new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
  }

  function createBackend(
    cache: LocalBackend,
    fetchImpl: typeof fetch,
    settings: { remote_create_policy?: "diff" | "ignore" | "import" } = {},
  ): CloudBackend {
    return new CloudBackend(
      {
        endpoint: "https://cloud.example",
        token: "token",
        project_id: "project-1",
        ...settings,
      },
      { root: tempDir, cache, fetchImpl },
    );
  }

  async function writeBoundState(
    overrides: Record<string, unknown> = {},
  ): Promise<Record<string, unknown>> {
    const state = {
      last_checked_at: LAST_CHECKED_AT,
      last_start_ready_pull_at: null,
      pending_projection_apply: null,
      pending_push: null,
      projection_identity_sha256: cloudProjectionIdentitySha256({
        endpoint: "https://cloud.example",
        projectId: "project-1",
        provider: null,
      }),
      ...overrides,
    };
    const statePath = path.join(tempDir, ".agentplane", "backends", "cloud", "state.json");
    await mkdir(path.dirname(statePath), { recursive: true });
    await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
    return state;
  }

  async function readState(): Promise<Record<string, unknown>> {
    return JSON.parse(
      await readFile(path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"), "utf8"),
    ) as Record<string, unknown>;
  }
});
