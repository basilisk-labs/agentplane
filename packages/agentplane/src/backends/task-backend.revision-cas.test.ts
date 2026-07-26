import type * as NodeFsPromises from "node:fs/promises";
import { mkdir, mkdtemp, readFile, rename, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { afterEach, describe, expect, it, vi } from "vitest";

const lockRace = vi.hoisted(() => ({
  armed: false,
  attempts: 0,
  secondAttempted: Promise.resolve(),
  releaseSecondAttempt: (() => null) as () => void,
}));

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof NodeFsPromises>();
  return {
    ...actual,
    link: async (source: string, destination: string) => {
      if (!lockRace.armed || !destination.endsWith(".README.md.lock")) {
        return await actual.link(source, destination);
      }
      lockRace.attempts += 1;
      if (lockRace.attempts === 1) {
        await actual.link(source, destination);
        await lockRace.secondAttempted;
        return;
      }
      if (lockRace.attempts === 2) {
        try {
          await actual.link(source, destination);
        } finally {
          lockRace.releaseSecondAttempt();
        }
        return;
      }
      return await actual.link(source, destination);
    },
  };
});

import type { CommandContext } from "../commands/shared/task-backend.js";
import { writeTaskMutation } from "../commands/shared/task-mutation.js";
import { TaskStore } from "../commands/shared/task-store.js";
import { CloudBackend, LocalBackend, type TaskBackend, type TaskData } from "./task-backend.js";
import { applyCloudCacheEffects } from "./task-backend/cloud-cache-effects.js";
import { cloudProjectionIdentitySha256 } from "./task-backend/cloud-projection-identity.js";

const TASK_ID = "202607240700-CAS1";
const tempRoots: string[] = [];

function task(overrides: Partial<TaskData> = {}): TaskData {
  return {
    id: TASK_ID,
    title: "before",
    description: "revision CAS",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    revision: 1,
    depends_on: [],
    tags: ["cas"],
    verify: [],
    doc: "## Summary\n\nbefore\n",
    ...overrides,
  };
}

function armPublicationRace(): void {
  lockRace.armed = true;
  lockRace.attempts = 0;
  lockRace.secondAttempted = new Promise<void>((resolve) => {
    lockRace.releaseSecondAttempt = resolve;
  });
}

function expectSingleCommit(results: PromiseSettledResult<unknown>[]): void {
  expect(results.map((result) => result.status).toSorted()).toEqual(["fulfilled", "rejected"]);
  const rejected = results.find(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );
  expect(String(rejected?.reason)).toContain("Task revision changed concurrently");
}

async function makeRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-revision-cas-"));
  tempRoots.push(root);
  await mkdir(path.join(root, ".git"), { recursive: true });
  return root;
}

function taskStoreContext(root: string, backend: TaskBackend): CommandContext {
  return {
    resolvedProject: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") } as never,
    config: defaultConfig() as never,
    taskBackend: backend,
    backendId: "local",
    backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    git: { gitRoot: root } as never,
    memo: {},
  };
}

afterEach(async () => {
  lockRace.armed = false;
  lockRace.attempts = 0;
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describe("task backend revision CAS", () => {
  it("returns backend-neutral receipts from exact local and cloud write results", async () => {
    const root = await makeRoot();
    const tasksDir = path.join(root, ".agentplane", "tasks");
    const local = new LocalBackend({ dir: tasksDir });
    const localResult = await writeTaskMutation({
      ctx: taskStoreContext(root, local),
      task: task({ id: "202607240700-REC1", title: "local receipt" }),
    });
    const statePath = path.join(root, ".agentplane", "backends", "cloud", "state.json");
    await mkdir(path.dirname(statePath), { recursive: true });
    await writeFile(
      statePath,
      `${JSON.stringify({
        last_checked_at: new Date().toISOString(),
        projection_identity_sha256: cloudProjectionIdentitySha256({
          endpoint: "https://cloud.example",
          projectId: "project-1",
          provider: null,
        }),
      })}\n`,
      "utf8",
    );

    const cloud = new CloudBackend(
      {
        endpoint: "https://cloud.example",
        token: "token",
        project_id: "project-1",
        autosync_enabled: false,
      },
      { root, cache: local },
    );
    const cloudResult = await writeTaskMutation({
      ctx: { ...taskStoreContext(root, cloud), backendId: "cloud" },
      task: task({ id: "202607240700-REC2", title: "cloud receipt" }),
    });

    expect(localResult).toMatchObject({
      task_id: "202607240700-REC1",
      revision: 1,
      backend_id: "local",
      artifact_paths: [".agentplane/tasks/202607240700-REC1/README.md"],
    });
    expect(cloudResult).toMatchObject({
      task_id: "202607240700-REC2",
      revision: 1,
      backend_id: "cloud",
      artifact_paths: [".agentplane/tasks/202607240700-REC2/README.md"],
    });
  });

  it("allows exactly one LocalBackend creator guarded by expected absence", async () => {
    const root = await makeRoot();
    const backend = new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") });

    armPublicationRace();
    const results = await Promise.allSettled([
      backend.writeTask(task({ title: "creator-a" }), { expectedRevision: 0 }),
      backend.writeTask(task({ title: "creator-b" }), { expectedRevision: 0 }),
    ]);

    expectSingleCommit(results);
    const final = await backend.getTask(TASK_ID);
    expect(final?.revision).toBe(1);
    expect(["creator-a", "creator-b"]).toContain(final?.title);
  });

  it("rejects a cloud cache create when a concurrent creator wins expected-absence CAS", async () => {
    const root = await makeRoot();
    const cache = new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") });
    const requested = task({ title: "cloud-create" });
    const concurrent = task({ title: "concurrent-create" });
    const originalWriteTask = cache.writeTaskWithReceipt.bind(cache);
    let injected = false;
    const writeTask = vi
      .spyOn(cache, "writeTaskWithReceipt")
      .mockImplementation(async (candidate, opts, beforePublication) => {
        if (!injected) {
          injected = true;
          await originalWriteTask(concurrent);
        }
        return await originalWriteTask(candidate, opts, beforePublication);
      });

    await expect(
      applyCloudCacheEffects({
        cache,
        expectedTasks: [],
        writes: [requested],
        removedIds: [],
        repositoryRoot: root,
      }),
    ).rejects.toThrow("Task revision changed concurrently");

    expect(writeTask).toHaveBeenCalledWith(
      requested,
      { expectedRevision: 0 },
      expect.any(Function),
    );
    await expect(cache.getTask(TASK_ID)).resolves.toMatchObject({
      revision: 1,
      title: "concurrent-create",
    });
  });

  it("allows exactly one LocalBackend writer from the same observed revision", async () => {
    const root = await makeRoot();
    const backend = new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") });
    await backend.writeTask(task());
    const observed = await backend.getTask(TASK_ID);
    expect(observed?.revision).toBe(1);

    armPublicationRace();
    const results = await Promise.allSettled([
      backend.writeTask({ ...observed!, title: "writer-a" }, { expectedRevision: 1 }),
      backend.writeTask({ ...observed!, title: "writer-b" }, { expectedRevision: 1 }),
    ]);

    expectSingleCommit(results);
    const final = await backend.getTask(TASK_ID);
    expect(final?.revision).toBe(2);
    expect(["writer-a", "writer-b"]).toContain(final?.title);
  });

  it("rejects a guarded deletion after a writer advances the observed revision", async () => {
    const root = await makeRoot();
    const backend = new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") });
    await backend.writeTask(task());
    const observed = await backend.getTask(TASK_ID);
    expect(observed?.revision).toBe(1);

    await backend.writeTask({ ...observed!, title: "writer-won" }, { expectedRevision: 1 });

    await expect(backend.deleteTask(TASK_ID, { expectedRevision: 1 })).rejects.toThrow(
      "Task revision changed concurrently",
    );
    await expect(backend.getTask(TASK_ID)).resolves.toMatchObject({
      revision: 2,
      title: "writer-won",
    });
  });

  it("rejects guarded deletion when the tasks root is replaced by an external symlink", async () => {
    const root = await makeRoot();
    const tasksRoot = path.join(root, ".agentplane", "tasks");
    const displacedTasksRoot = path.join(root, ".agentplane", "tasks-displaced");
    const outsideRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-delete-race-outside-"));
    tempRoots.push(outsideRoot);
    const backend = new LocalBackend({ dir: tasksRoot });
    await backend.writeTask(task());
    const outsideTaskDir = path.join(outsideRoot, TASK_ID);
    const outsideSentinel = path.join(outsideTaskDir, "sentinel.txt");
    await mkdir(outsideTaskDir, { recursive: true });
    await writeFile(outsideSentinel, "must survive\n", "utf8");

    await expect(
      backend.deleteTaskWithPublicationGuard(TASK_ID, { expectedRevision: 1 }, async () => {
        await rename(tasksRoot, displacedTasksRoot);
        await symlink(outsideRoot, tasksRoot, "dir");
      }),
    ).rejects.toThrow();

    await expect(readFile(outsideSentinel, "utf8")).resolves.toBe("must survive\n");
    await expect(
      readFile(path.join(displacedTasksRoot, TASK_ID, "README.md"), "utf8"),
    ).resolves.toContain(TASK_ID);
  });

  it("enforces the same CAS through the CloudBackend cache projection", async () => {
    const root = await makeRoot();
    const tasksDir = path.join(root, ".agentplane", "tasks");
    const cache = new LocalBackend({ dir: tasksDir });
    await cache.writeTask(task());
    const statePath = path.join(root, ".agentplane", "backends", "cloud", "state.json");
    await mkdir(path.dirname(statePath), { recursive: true });
    await writeFile(
      statePath,
      `${JSON.stringify({
        last_checked_at: new Date().toISOString(),
        projection_identity_sha256: cloudProjectionIdentitySha256({
          endpoint: "https://cloud.example",
          projectId: "project-1",
          provider: null,
        }),
      })}\n`,
      "utf8",
    );
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example",
        token: "token",
        project_id: "project-1",
        stale_after_seconds: 300,
      },
      { root, cache },
    );
    const observed = await backend.getTask(TASK_ID);
    expect(observed?.revision).toBe(1);

    const results = await Promise.allSettled([
      backend.writeTask({ ...observed!, title: "cloud-a" }, { expectedRevision: 1 }),
      backend.writeTask({ ...observed!, title: "cloud-b" }, { expectedRevision: 1 }),
    ]);

    expectSingleCommit(results);
    const final = await cache.getTask(TASK_ID);
    expect(final?.revision).toBe(2);
    expect(["cloud-a", "cloud-b"]).toContain(final?.title);
  });

  it("serializes independent TaskStore instances before checking expectedRevision", async () => {
    const root = await makeRoot();
    const backend = new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") });
    await backend.writeTask(task());
    const first = new TaskStore(taskStoreContext(root, backend));
    const second = new TaskStore(taskStoreContext(root, backend));
    await Promise.all([first.get(TASK_ID), second.get(TASK_ID)]);

    armPublicationRace();
    const results = await Promise.allSettled([
      first.update(TASK_ID, (current) => ({ ...current, title: "store-a" }), {
        expectedRevision: 1,
      }),
      second.update(TASK_ID, (current) => ({ ...current, title: "store-b" }), {
        expectedRevision: 1,
      }),
    ]);

    expectSingleCommit(results);
    const final = await backend.getTask(TASK_ID);
    expect(final?.revision).toBe(2);
    expect(["store-a", "store-b"]).toContain(final?.title);
  });

  it("rejects a stale expectedRevision when a cached TaskStore update is a no-op", async () => {
    const root = await makeRoot();
    const backend = new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") });
    await backend.writeTask(task({ title: "A" }));
    const store = new TaskStore(taskStoreContext(root, backend));
    const cached = await store.get(TASK_ID);
    expect(cached).toMatchObject({ title: "A", revision: 1 });

    await backend.writeTask({ ...cached, title: "B" }, { expectedRevision: 1 });

    await expect(
      store.update(TASK_ID, (current) => ({ ...current, title: "A" }), {
        expectedRevision: 1,
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: {
        reason_code: "task_revision_conflict",
        expected_revision: 1,
        current_revision: 2,
      },
    });

    const final = await backend.getTask(TASK_ID);
    expect(final).toMatchObject({ title: "B", revision: 2 });
  });
});
