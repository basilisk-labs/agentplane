import { mkdir, readFile, rm } from "node:fs/promises";
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
    expect(url).toBe("https://cloud.example/api/agentplane/v1/tasks/sync");
    expect(init?.method).toBe("POST");
    expect(init?.body).toContain('"project_id":"project-1"');
    const stateText = await readFile(
      path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"),
      "utf8",
    );
    expect(stateText).toContain("2026-05-06T00:00:00.000Z");
  });
});
