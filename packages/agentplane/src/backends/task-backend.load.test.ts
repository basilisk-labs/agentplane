import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  LocalBackend,
  RedmineBackend,
  buildTasksExportSnapshotFromTasks,
  loadTaskBackend,
  type TaskData,
} from "./task-backend.js";
import { installTaskBackendTestHarness, makeTempDir } from "./task-backend.test-helpers.js";

installTaskBackendTestHarness();

describe("loadTaskBackend", () => {
  let tempDir = "";
  let originalEnv: NodeJS.ProcessEnv = {};
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

  beforeEach(async () => {
    tempDir = await makeTempDir();
    originalEnv = { ...process.env };
    for (const key of redmineEnvKeys) {
      delete process.env[key];
    }
    await mkdir(path.join(tempDir, ".git"), { recursive: true });
  });

  afterEach(async () => {
    process.env = originalEnv;
    if (tempDir) {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("defaults to local backend when config is missing", async () => {
    const result = await loadTaskBackend({ cwd: tempDir });
    expect(result.backendId).toBe("local");
    expect(result.backend).toBeInstanceOf(LocalBackend);
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
    expect(result.backend.capabilities.supports_task_revisions).toBe(false);
    expect(result.backend.capabilities.supports_revision_guarded_writes).toBe(false);
    expect(process.env.AGENTPLANE_REDMINE_API_KEY).toBe("preserve");
    expect(process.env.AGENTPLANE_REDMINE_URL).toBe("https://redmine.env");
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

  it("exports task snapshots with coerced fields", () => {
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
    expect(task?.priority).toBe("3");
    expect(task?.depends_on).toEqual([]);
    expect(task?.tags).toEqual(["tag"]);
    expect(task?.verify).toEqual(["echo ok"]);
    expect(task?.comments).toEqual([{ author: "a", body: "b" }]);
    expect(snapshot.tasks[1]?.priority).toBe("");
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
