import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { CloudBackend, LocalBackend, type TaskData } from "./task-backend.js";

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

  it("push sync sends local tasks and records last check time", async () => {
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
    expect(init?.body).toContain('"direction":"push"');
    const stateText = await readFile(
      path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"),
      "utf8",
    );
    expect(stateText).toContain("2026-05-06T00:00:00.000Z");
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
