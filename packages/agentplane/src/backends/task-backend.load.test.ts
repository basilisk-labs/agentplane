import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  LocalBackend,
  CloudBackend,
  RedmineBackend,
  buildTasksExportSnapshotFromTasks,
  loadTaskBackend,
  type TaskData,
} from "./task-backend.js";
import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

describe("loadTaskBackend", () => {
  let tempDir = "";
  let originalEnv: NodeJS.ProcessEnv = {};
  let restoreStdIO: (() => void) | null = null;
  const redmineEnvKeys = [
    "AGENTPLANE_REDMINE_URL",
    "AGENTPLANE_REDMINE_API_KEY",
    "AGENTPLANE_REDMINE_PROJECT_ID",
    "AGENTPLANE_REDMINE_ASSIGNEE_ID",
    "AGENTPLANE_REDMINE_OWNER",
    "AGENTPLANE_REDMINE_OWNER_AGENT",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_VERSION",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_UPDATED_AT",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_DOC_UPDATED_BY",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_TAGS",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_PRIORITY",
    "AGENTPLANE_REDMINE_CUSTOM_FIELDS_OWNER",
    "AGENTPLANE_REDMINE_BATCH_SIZE",
    "AGENTPLANE_REDMINE_BATCH_PAUSE",
    "AGENTPLANE_REDMINE_EXTRA",
  ] as const;
  const cloudEnvKeys = [
    "AGENTPLANE_CLOUD_ENDPOINT",
    "AGENTPLANE_CLOUD_TOKEN",
    "AGENTPLANE_CLOUD_PROJECT_ID",
    "AGENTPLANE_CLOUD_PROVIDER",
  ] as const;

  beforeEach(async () => {
    restoreStdIO = silenceStdIO();
    tempDir = await mkTempDir();
    originalEnv = { ...process.env };
    for (const key of redmineEnvKeys) {
      delete process.env[key];
    }
    for (const key of cloudEnvKeys) {
      delete process.env[key];
    }
    await mkdir(path.join(tempDir, ".git"), { recursive: true });
  });

  afterEach(async () => {
    restoreStdIO?.();
    restoreStdIO = null;
    process.env = originalEnv;
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("defaults to local backend when config is missing", async () => {
    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("local");
    expect(result.backend).toBeInstanceOf(LocalBackend);
    expect(result.backend.capabilities.projection_read_mode).toBe("native");
    expect(result.backend.capabilities.supports_task_revisions).toBe(true);
    expect(result.backend.capabilities.supports_revision_guarded_writes).toBe(true);
  });

  it("loads redmine backend and reads .env without overriding existing vars", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {
          custom_fields: { task_id: 1 },
        },
      }),
      "utf8",
    );
    await writeFile(
      path.join(tempDir, ".env"),
      [
        "AGENTPLANE_REDMINE_URL=https://redmine.env",
        'AGENTPLANE_REDMINE_API_KEY="env-key"',
        "AGENTPLANE_REDMINE_PROJECT_ID=proj",
      ].join("\n"),
      "utf8",
    );
    process.env.AGENTPLANE_REDMINE_API_KEY = "preserve";

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("redmine");
    expect(result.backend).toBeInstanceOf(RedmineBackend);
    expect(result.backend.capabilities.projection_read_mode).toBe("native");
    expect(result.backend.capabilities.supports_task_revisions).toBe(false);
    expect(result.backend.capabilities.supports_revision_guarded_writes).toBe(false);
    expect(process.env.AGENTPLANE_REDMINE_API_KEY).toBe("preserve");
    expect(process.env.AGENTPLANE_REDMINE_URL).toBe("https://redmine.env");
  });

  it("reports guarded revision support when canonical_state is configured", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {
          custom_fields: { task_id: 1, canonical_state: 2 },
        },
      }),
      "utf8",
    );
    await writeFile(
      path.join(tempDir, ".env"),
      [
        "AGENTPLANE_REDMINE_URL=https://redmine.env",
        "AGENTPLANE_REDMINE_API_KEY=env-key",
        "AGENTPLANE_REDMINE_PROJECT_ID=proj",
      ].join("\n"),
      "utf8",
    );

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("redmine");
    expect(result.backend).toBeInstanceOf(RedmineBackend);
    expect(result.backend.capabilities.supports_task_revisions).toBe(true);
    expect(result.backend.capabilities.supports_revision_guarded_writes).toBe(true);
  });

  it("loads cloud backend with local cache and .env connection settings", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "cloud",
        settings: {
          cache_dir: "cloud-cache",
          endpoint: "https://configured.example",
          project_id: "configured-project",
          provider: "configured-provider",
          stale_after_seconds: 60,
        },
      }),
      "utf8",
    );
    await writeFile(
      path.join(tempDir, ".env"),
      [
        "AGENTPLANE_CLOUD_ENDPOINT=https://cloud.example/",
        "AGENTPLANE_CLOUD_TOKEN=token",
        "AGENTPLANE_CLOUD_PROJECT_ID=project-1",
        "AGENTPLANE_CLOUD_PROVIDER=github-projects",
      ].join("\n"),
      "utf8",
    );

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      Response.json({
        data: {
          backoff: { degraded: true, reason: "failed_jobs", failed_jobs: 2 },
          jobs: { queued: 0, running: 0, delayed: 0 },
          pull_cursor: "2026-05-08T18:15:41.504Z",
        },
      }),
    );
    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("cloud");
    expect(result.backend).toBeInstanceOf(CloudBackend);
    expect(result.backend.capabilities.canonical_source).toBe("remote");
    expect(result.backend.capabilities.projection).toBe("cache");
    expect(process.env.AGENTPLANE_CLOUD_ENDPOINT).toBe("https://cloud.example/");

    const cloud = result.backend as CloudBackend;
    expect(cloud.endpoint).toBe("https://cloud.example");
    expect(cloud.projectId).toBe("project-1");
    expect(cloud.provider).toBe("github-projects");
    expect(cloud.cache.root).toBe(path.join(tempDir, "cloud-cache"));

    await expect(cloud.inspectConfiguration()).resolves.toMatchObject({
      connection: {
        envOverrides: [
          {
            key: "AGENTPLANE_CLOUD_ENDPOINT",
            configured: "https://configured.example",
            effective: "https://cloud.example",
          },
          {
            key: "AGENTPLANE_CLOUD_PROJECT_ID",
            configured: "configured-project",
            effective: "project-1",
          },
          {
            key: "AGENTPLANE_CLOUD_PROVIDER",
            configured: "configured-provider",
            effective: "github-projects",
          },
        ],
        syncState: {
          degraded: true,
          reason: "failed_jobs",
          failedJobs: 2,
          pullCursor: "2026-05-08T18:15:41.504Z",
        },
      },
    });
    fetchSpy.mockRestore();
  });

  it("loads cloud backend credentials from the shared root .env when running in a worktree", async () => {
    const worktreeRoot = path.join(tempDir, ".agentplane", "worktrees", "task-123");
    await mkdir(path.join(tempDir, ".git", "worktrees", "task-123"), { recursive: true });
    await mkdir(path.join(worktreeRoot, ".agentplane", "backends", "local"), { recursive: true });
    await writeFile(
      path.join(worktreeRoot, ".git"),
      `gitdir: ${path.join(tempDir, ".git", "worktrees", "task-123")}\n`,
      "utf8",
    );
    await writeFile(
      path.join(worktreeRoot, ".agentplane", "backends", "local", "backend.json"),
      JSON.stringify({
        id: "cloud",
        settings: {
          cache_dir: ".agentplane/tasks",
        },
      }),
      "utf8",
    );
    await writeFile(
      path.join(tempDir, ".env"),
      [
        "AGENTPLANE_CLOUD_ENDPOINT=https://cloud.example/",
        "AGENTPLANE_CLOUD_TOKEN=shared-token",
        "AGENTPLANE_CLOUD_PROJECT_ID=shared-project",
      ].join("\n"),
      "utf8",
    );

    const result = await loadTaskBackend({ cwd: worktreeRoot });
    expect(result.backendId).toBe("cloud");
    const cloud = result.backend as CloudBackend;
    expect(cloud.endpoint).toBe("https://cloud.example");
    expect(cloud.token).toBe("shared-token");
    expect(cloud.projectId).toBe("shared-project");
  });

  it("parses quoted .env values and resolves backend directories", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {
          custom_fields: { task_id: 1 },
          cache_dir: "cache",
        },
      }),
      "utf8",
    );
    await writeFile(
      path.join(tempDir, ".env"),
      [
        'AGENTPLANE_REDMINE_URL="https://redmine.env/"',
        String.raw`AGENTPLANE_REDMINE_API_KEY="env\nkey"`,
        "AGENTPLANE_REDMINE_PROJECT_ID=proj",
        "AGENTPLANE_REDMINE_OWNER='  owner  '",
        "AGENTPLANE_REDMINE_EXTRA=plain",
        "# ignored line",
        "BADLINE",
      ].join("\n"),
      "utf8",
    );

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("redmine");
    expect(process.env.AGENTPLANE_REDMINE_URL).toBe("https://redmine.env/");
    expect(process.env.AGENTPLANE_REDMINE_API_KEY).toBe("env\nkey");
    expect(process.env.AGENTPLANE_REDMINE_OWNER).toBe("  owner  ");
    expect(process.env.AGENTPLANE_REDMINE_EXTRA).toBe("plain");

    const localBackendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await writeFile(
      localBackendPath,
      JSON.stringify({ id: "local", settings: { dir: "custom-tasks" } }),
      "utf8",
    );
    const localResult = await loadTaskBackend({ cwd: tempDir });
    expect(localResult.backendId).toBe("local");
    const local = localResult.backend as LocalBackend;
    expect(local.root).toBe(path.join(tempDir, "custom-tasks"));
  });

  it("fails to load redmine backend when required env vars are missing", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {
          custom_fields: { task_id: 1 },
        },
      }),
      "utf8",
    );
    await rm(path.join(tempDir, ".env"), { force: true });

    await expect(loadTaskBackend({ cwd: tempDir })).rejects.toThrow(
      /AGENTPLANE_REDMINE_URL, AGENTPLANE_REDMINE_API_KEY, AGENTPLANE_REDMINE_PROJECT_ID/u,
    );
  });

  it("fails to load redmine backend when task-id custom field env key is missing", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {},
      }),
      "utf8",
    );
    await writeFile(
      path.join(tempDir, ".env"),
      [
        "AGENTPLANE_REDMINE_URL=https://redmine.env",
        "AGENTPLANE_REDMINE_API_KEY=env-key",
        "AGENTPLANE_REDMINE_PROJECT_ID=proj",
      ].join("\n"),
      "utf8",
    );

    await expect(loadTaskBackend({ cwd: tempDir })).rejects.toThrow(
      /AGENTPLANE_REDMINE_CUSTOM_FIELDS_TASK_ID/u,
    );
  });

  it("ignores legacy module/class fields in backend config", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "local",
        version: 2,
        module: "legacy.py",
        class: "LegacyBackend",
        settings: { dir: ".agentplane/tasks" },
      }),
      "utf8",
    );

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("local");
    expect(result.backend).toBeInstanceOf(LocalBackend);
  });

  it("fails when .env is not readable", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(
      backendPath,
      JSON.stringify({
        id: "redmine",
        settings: {
          custom_fields: { task_id: 1 },
        },
      }),
      "utf8",
    );
    await mkdir(path.join(tempDir, ".env"), { recursive: true });

    await expect(loadTaskBackend({ cwd: tempDir })).rejects.toBeInstanceOf(Error);
  });

  it("exports task snapshots with canonicalized fields", () => {
    const snapshot = buildTasksExportSnapshotFromTasks([
      {
        id: "202601300000-ABCD",
        title: undefined as unknown as string,
        description: undefined as unknown as string,
        status: undefined as unknown as string,
        priority: 3,
        owner: undefined as unknown as string,
        depends_on: "nope" as unknown as string[],
        tags: ["tag", 2] as unknown as string[],
        verify: ["echo ok", 1] as unknown as string[],
        comments: [
          { author: "a", body: "b" },
          { author: "x", body: 2 },
        ] as unknown as { author: string; body: string }[],
      } as TaskData,
      {
        id: "202601300000-ABCE",
        title: "Empty priority",
        description: "",
        status: "TODO",
        priority: undefined as unknown as string,
        owner: "tester",
        depends_on: [],
        tags: [],
        verify: [],
      } as TaskData,
    ]);
    const task = snapshot.tasks[0];
    expect(task?.title).toBe("(untitled task)");
    expect(task?.status).toBe("TODO");
    expect(task?.owner).toBe("UNKNOWN");
    expect(task?.priority).toBe("med");
    expect(task?.depends_on).toEqual([]);
    expect(task?.tags).toEqual(["tag"]);
    expect(task?.verify).toEqual(["echo ok"]);
    expect(task?.comments).toEqual([{ author: "a", body: "b" }]);
    expect(snapshot.tasks[1]?.priority).toBe("med");
  });

  it("falls back to local backend when backend config is not an object", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(backendPath, JSON.stringify([1, 2, 3]), "utf8");

    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("local");
  });

  it("throws when backend config is invalid json", async () => {
    const agentplaneDir = path.join(tempDir, ".agentplane");
    const backendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
    await mkdir(path.dirname(backendPath), { recursive: true });
    await writeFile(backendPath, "{broken", "utf8");

    await expect(loadTaskBackend({ cwd: tempDir })).rejects.toThrow();
  });
});
