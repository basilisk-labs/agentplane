import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { CloudBackend, LocalBackend, type TaskData } from "./task-backend.js";
import {
  CLOUD_PROJECTION_CLOCK_SKEW_TOLERANCE_MS,
  isStale,
} from "./task-backend/cloud-backend-utils.js";
import { cloudProjectionIdentitySha256 } from "./task-backend/cloud-projection-identity.js";

function makeTask(overrides: Partial<TaskData> & { id: string }): TaskData {
  return {
    id: overrides.id,
    title: "Cloud task",
    description: "Sync this task",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["cloud"],
    verify: [],
    ...overrides,
  };
}

describe("CloudBackend pull safety", () => {
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

  async function writeBoundProjectionState(lastCheckedAt: string): Promise<string> {
    const statePath = path.join(tempDir, ".agentplane", "backends", "cloud", "state.json");
    await mkdir(path.dirname(statePath), { recursive: true });
    await writeFile(
      statePath,
      `${JSON.stringify({
        last_checked_at: lastCheckedAt,
        projection_identity_sha256: cloudProjectionIdentitySha256({
          endpoint: "https://cloud.example",
          projectId: "project-1",
          provider: null,
        }),
      })}\n`,
      "utf8",
    );
    return statePath;
  }

  it("does not classify the detached projection cache as a task directory", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, "detached-tasks") });
    await cache.writeTask(makeTask({ id: "202605051806-C1D2" }));

    await expect(cache.listTasksWithWarnings()).resolves.toMatchObject({ warnings: [] });
    await expect(cache.listTasksWithWarnings()).resolves.toMatchObject({ warnings: [] });
    await expect(
      readFile(path.join(cache.root, ".cache", "tasks-index.v2.json"), "utf8"),
    ).resolves.toContain('"schema_version": 2');
  });

  it("conflict=fail refuses to write open service conflicts", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = makeTask({
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
    });
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
    const task: TaskData = makeTask({
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
    });
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

  it("rejects conflicting top-level and data task projections before adoption", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const retained = makeTask({ id: "202605051806-C1D2", title: "Retained" });
    await cache.writeTask(retained);
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: 0 } }));
      }
      return Promise.resolve(
        Response.json({
          tasks: [],
          data: {
            tasks: [{ id: retained.id, title: "Conflicting" }],
            projection_complete: true,
          },
        }),
      );
    });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
        identityTransition: "adopt_remote",
      }),
    ).rejects.toThrow("conflicting task projections");

    await expect(cache.getTask(retained.id)).resolves.toMatchObject({ title: "Retained" });
  });

  it("falls back to pull conflict data when sync state is unavailable", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = makeTask({
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
    });
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
            projection_complete: true,
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
      identityTransition: "adopt_remote",
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
    const task: TaskData = makeTask({
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
    });
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
            projection_complete: true,
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
      identityTransition: "adopt_remote",
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
      backend.writeTask(makeTask({ id: "202605051806-C1D2", description: "Existing task" })),
    ).rejects.toThrow("agentplane backend sync cloud --direction pull --yes");
  });

  it("bounds future projection freshness to the explicit clock-skew tolerance", () => {
    const nowMs = Date.parse("2026-07-24T18:00:00.000Z");
    expect(
      isStale(new Date(nowMs + CLOUD_PROJECTION_CLOCK_SKEW_TOLERANCE_MS).toISOString(), 300, nowMs),
    ).toBe(false);
    expect(
      isStale(
        new Date(nowMs + CLOUD_PROJECTION_CLOCK_SKEW_TOLERANCE_MS + 1).toISOString(),
        300,
        nowMs,
      ),
    ).toBe(true);
  });

  it("rejects local mutation readiness from a far-future matching checkpoint", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    await writeBoundProjectionState("2099-01-01T00:00:00.000Z");
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example",
        token: "token",
        project_id: "project-1",
        stale_after_seconds: 300,
      },
      { root: tempDir, cache },
    );

    await expect(backend.assertLocalMutationReady()).rejects.toThrow("Cloud projection is stale");
  });

  it.each([
    ["unmarked partial tasks", { tasks: [{ id: "202605051806-C1D2", title: "Retained" }] }, false],
    ["exclusive no-change receipt", { no_projection_changes: true }, true],
  ] as const)("advances freshness only for %s", async (_label, pullEnvelope, shouldAdvance) => {
    const task = makeTask({ id: "202605051806-C1D2", title: "Retained" });
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    await cache.writeTask(task);
    const statePath = await writeBoundProjectionState("2026-07-24T16:00:00.000Z");
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: [] } }));
      }
      return Promise.resolve(
        Response.json({
          ...pullEnvelope,
          last_checked_at: "2026-07-24T17:00:00.000Z",
        }),
      );
    });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    const state = JSON.parse(await readFile(statePath, "utf8")) as {
      last_checked_at: string;
    };
    expect(state.last_checked_at).toBe(
      shouldAdvance ? "2026-07-24T17:00:00.000Z" : "2026-07-24T16:00:00.000Z",
    );
  });

  it("keeps an incomplete apply marker when a pull cache write fails", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const task: TaskData = makeTask({
      id: "202605051806-C1D2",
      title: "Local title",
      description: "Existing task",
    });
    await cache.writeTask(task);
    const writeTask = vi
      .spyOn(cache, "writeTaskWithReceipt")
      .mockRejectedValueOnce(new Error("write failed"));
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          tasks: [{ id: task.id, title: "Remote title" }],
          last_checked_at: "2026-05-06T00:00:00.000Z",
          projection_complete: true,
        }),
      ),
    );
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
        identityTransition: "adopt_remote",
      }),
    ).rejects.toThrow("write failed");
    expect(writeTask).toHaveBeenCalledTimes(1);
    const state = JSON.parse(
      await readFile(path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"), "utf8"),
    ) as {
      pending_projection_apply?: {
        kind?: string;
        requires_explicit_adoption?: boolean;
        target_projection_identity_sha256?: string;
      };
      projection_identity_sha256?: string | null;
    };
    expect(state.pending_projection_apply).toMatchObject({
      kind: "pull_apply",
      requires_explicit_adoption: true,
      target_projection_identity_sha256: cloudProjectionIdentitySha256({
        endpoint: "https://cloud.example",
        projectId: "project-1",
        provider: null,
      }),
    });
    expect(state.projection_identity_sha256).toBeNull();

    writeTask.mockRestore();
    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
      identityTransition: "adopt_remote",
    });
    await expect(cache.getTask(task.id)).resolves.toMatchObject({
      title: "Remote title",
    });
    const recoveredState = JSON.parse(
      await readFile(path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"), "utf8"),
    ) as {
      pending_projection_apply?: unknown;
      projection_identity_sha256?: string | null;
    };
    expect(recoveredState.pending_projection_apply).toBeNull();
    expect(recoveredState.projection_identity_sha256).toBe(
      cloudProjectionIdentitySha256({
        endpoint: "https://cloud.example",
        projectId: "project-1",
        provider: null,
      }),
    );
  });
});
