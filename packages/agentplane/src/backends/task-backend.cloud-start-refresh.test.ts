import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { CloudBackend, LocalBackend, type TaskData } from "./task-backend.js";

function requestUrl(url: unknown): string {
  if (typeof url === "string") return url;
  if (url instanceof URL) return url.href;
  if (url && typeof url === "object" && "url" in url && typeof url.url === "string") {
    return url.url;
  }
  throw new TypeError("Expected request URL");
}

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

describe("CloudBackend task-start refresh", () => {
  let tempDir = "";
  let restoreStdIO: (() => void) | null = null;
  let savedCloudEnv: Partial<NodeJS.ProcessEnv> = {};

  beforeEach(async () => {
    restoreStdIO = silenceStdIO();
    tempDir = await mkTempDir();
    await mkdir(path.join(tempDir, ".git"), { recursive: true });
    savedCloudEnv = {
      AGENTPLANE_CLOUD_ENDPOINT: process.env.AGENTPLANE_CLOUD_ENDPOINT,
      AGENTPLANE_CLOUD_PROJECT_ID: process.env.AGENTPLANE_CLOUD_PROJECT_ID,
      AGENTPLANE_CLOUD_TOKEN: process.env.AGENTPLANE_CLOUD_TOKEN,
    };
    delete process.env.AGENTPLANE_CLOUD_ENDPOINT;
    delete process.env.AGENTPLANE_CLOUD_PROJECT_ID;
    delete process.env.AGENTPLANE_CLOUD_TOKEN;
  });

  afterEach(async () => {
    for (const key of [
      "AGENTPLANE_CLOUD_ENDPOINT",
      "AGENTPLANE_CLOUD_PROJECT_ID",
      "AGENTPLANE_CLOUD_TOKEN",
    ] as const) {
      const value = savedCloudEnv[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    savedCloudEnv = {};
    restoreStdIO?.();
    restoreStdIO = null;
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
  });

  it("pulls cloud projection once per local day before task start", async () => {
    const stateDir = path.join(tempDir, ".agentplane", "backends", "cloud");
    await mkdir(stateDir, { recursive: true });
    await writeFile(
      path.join(stateDir, "state.json"),
      `${JSON.stringify(
        {
          last_checked_at: new Date().toISOString(),
          last_start_ready_pull_at: "2000-01-01T00:00:00.000Z",
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    const remoteTask = makeTask({ id: "202605191450-ABCDEF", title: "Imported intake" });
    const fetchImpl = vi.fn<typeof fetch>((url) => {
      const href = requestUrl(url);
      if (href.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: 0 }, open_conflicts: [] }));
      }
      if (href.endsWith("/sync/pull")) {
        return Promise.resolve(
          Response.json({
            data: {
              last_checked_at: "2026-05-19T10:00:00.000Z",
              tasks: [remoteTask],
            },
          }),
        );
      }
      return Promise.resolve(Response.json({ error: "unexpected", url: href }, { status: 500 }));
    });
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
        stale_after_seconds: 86_400,
      },
      {
        root: tempDir,
        cache,
        fetchImpl,
        autoSyncNetworkAllowed: true,
      },
    );

    await backend.refreshProjectionBeforeTaskStart();

    await expect(cache.getTask(remoteTask.id)).resolves.toMatchObject({
      id: remoteTask.id,
      title: "Imported intake",
    });
    const state = JSON.parse(await readFile(path.join(stateDir, "state.json"), "utf8")) as Record<
      string,
      unknown
    >;
    expect(Number.isFinite(Date.parse(String(state.last_start_ready_pull_at)))).toBe(true);
    expect(fetchImpl.mock.calls.map(([url]) => requestUrl(url))).toEqual([
      "https://cloud.example/v1/projects/project-1/sync/state",
      "https://cloud.example/v1/projects/project-1/sync/state",
      "https://cloud.example/v1/projects/project-1/sync/pull",
    ]);
  });

  it("skips task-start cloud pull after a same-day start refresh", async () => {
    const stateDir = path.join(tempDir, ".agentplane", "backends", "cloud");
    await mkdir(stateDir, { recursive: true });
    await writeFile(
      path.join(stateDir, "state.json"),
      `${JSON.stringify(
        {
          last_checked_at: new Date().toISOString(),
          last_start_ready_pull_at: new Date().toISOString(),
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(Response.json({ error: "unexpected" }, { status: 500 })),
    );
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
      },
      {
        root: tempDir,
        cache: new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") }),
        fetchImpl,
        autoSyncNetworkAllowed: true,
      },
    );

    await expect(backend.refreshProjectionBeforeTaskStart()).resolves.toBeUndefined();
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
