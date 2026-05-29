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

describe("CloudBackend regressions", () => {
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

  it("marks failed auto-push mutations and blocks prefer-remote pull overwrites", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const stateDir = path.join(tempDir, ".agentplane", "backends", "cloud");
    await mkdir(stateDir, { recursive: true });
    await writeFile(
      path.join(stateDir, "state.json"),
      `${JSON.stringify(
        {
          last_checked_at: new Date().toISOString(),
          pending_push: null,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = requestUrl(input);
      if (url.endsWith("/sync/push")) {
        return Promise.reject(new TypeError("fetch failed"));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [{ id: "202605051806-C1D2", title: "Remote title", status: "DONE" }],
            last_checked_at: "2026-05-06T00:00:00.000Z",
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
      { root: tempDir, cache, fetchImpl, autoSyncNetworkAllowed: true },
    );

    await expect(
      backend.writeTask(makeTask({ id: "202605051806-C1D2", title: "Local title" })),
    ).rejects.toThrow("Safe command: agentplane backend inspect cloud --yes");

    const markedState = JSON.parse(await readFile(path.join(stateDir, "state.json"), "utf8")) as {
      pending_push?: { failed_at?: string; reason?: string };
    };
    expect(markedState.pending_push?.failed_at).toEqual(expect.any(String));
    expect(markedState.pending_push?.reason).toContain("Cloud backend request failed");

    await expect(
      backend.sync({ direction: "pull", conflict: "prefer-remote", quiet: true, confirm: true }),
    ).rejects.toThrow("unpushed local task mutations");
    await expect(cache.getTask("202605051806-C1D2")).resolves.toMatchObject({
      title: "Local title",
    });
  });

  it("preserves pending auto-push markers across read-only pull refreshes", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const stateDir = path.join(tempDir, ".agentplane", "backends", "cloud");
    await mkdir(stateDir, { recursive: true });
    await cache.writeTask(makeTask({ id: "202605051806-C1D2" }));
    await writeFile(
      path.join(stateDir, "state.json"),
      `${JSON.stringify(
        {
          last_checked_at: "2026-05-05T00:00:00.000Z",
          pending_push: {
            failed_at: "2026-05-05T01:00:00.000Z",
            reason: "Cloud backend request failed",
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          data: {
            tasks: [makeTask({ id: "202605051806-C1D2" })],
            last_checked_at: "2026-05-06T00:00:00.000Z",
          },
        }),
      ),
    );
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    const state = JSON.parse(await readFile(path.join(stateDir, "state.json"), "utf8")) as {
      last_checked_at?: string;
      pending_push?: { failed_at?: string; reason?: string };
    };
    expect(state.last_checked_at).toBe("2026-05-06T00:00:00.000Z");
    expect(state.pending_push).toEqual({
      failed_at: "2026-05-05T01:00:00.000Z",
      reason: "Cloud backend request failed",
    });
  });

  it("pull adds remote-only tasks and removes local-only tasks under prefer-remote", async () => {
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
    await cache.writeTask(makeTask({ id: "202605051806-D3E4" }));
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(
        Response.json({
          data: {
            tasks: [
              { id: "202605051806-E5F6", title: "Remote only", status: "TODO" },
              { id: localTask.id, title: "Updated", status: "TODO" },
            ],
            last_checked_at: "2026-05-06T00:00:00.000Z",
          },
        }),
      ),
    );
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example",
        token: "token",
        project_id: "project-1",
        remote_create_policy: "import",
      },
      { root: tempDir, cache, fetchImpl },
    );

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
    });

    await expect(cache.getTask("202605051806-D3E4")).resolves.toBeNull();
    await expect(cache.getTask(localTask.id)).resolves.toMatchObject({ title: "Updated" });
    await expect(cache.getTask("202605051806-E5F6")).resolves.toMatchObject({
      id: "202605051806-E5F6",
      title: "Remote only",
      status: "TODO",
      owner: "CODER",
    });
  });
});
