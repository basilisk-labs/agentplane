import type * as NodeFsPromises from "node:fs/promises";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
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
import { TaskStore } from "../commands/shared/task-store.js";
import { CloudBackend, LocalBackend, type TaskData } from "./task-backend.js";

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

function taskStoreContext(root: string, backend: LocalBackend): CommandContext {
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

  it("enforces the same CAS through the CloudBackend cache projection", async () => {
    const root = await makeRoot();
    const tasksDir = path.join(root, ".agentplane", "tasks");
    const cache = new LocalBackend({ dir: tasksDir });
    await cache.writeTask(task());
    const statePath = path.join(root, ".agentplane", "backends", "cloud", "state.json");
    await mkdir(path.dirname(statePath), { recursive: true });
    await writeFile(
      statePath,
      `${JSON.stringify({ last_checked_at: new Date().toISOString() })}\n`,
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

    armPublicationRace();
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
