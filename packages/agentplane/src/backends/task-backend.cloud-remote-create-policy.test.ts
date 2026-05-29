import { mkdir, readFile, rm } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkTempDir } from "@agentplane/testkit";

import { CloudBackend, LocalBackend } from "./task-backend.js";

describe("CloudBackend remote_create_policy", () => {
  let tempDir = "";
  let originalEnv: NodeJS.ProcessEnv = {};

  beforeEach(async () => {
    tempDir = await mkTempDir();
    originalEnv = { ...process.env };
    delete process.env.AGENTPLANE_CLOUD_REMOTE_CREATE_POLICY;
    await mkdir(path.join(tempDir, ".git"), { recursive: true });
  });

  afterEach(async () => {
    process.env = originalEnv;
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
  });

  it("does not materialize remote-only tasks under the default diff policy", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const backend = new CloudBackend(
      { endpoint: "https://cloud.example", token: "token", project_id: "project-1" },
      { root: tempDir, cache, fetchImpl: remoteOnlyFetch("linear") },
    );

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
      }),
    ).rejects.toThrow("remote_create_policy=diff");
    await expect(cache.getTask("202605051806-RMT1")).resolves.toBeNull();
    await expect(
      readFile(path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("advances freshness without writing remote-only tasks under ignore", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example",
        token: "token",
        project_id: "project-1",
        remote_create_policy: "ignore",
      },
      { root: tempDir, cache, fetchImpl: remoteOnlyFetch("asana") },
    );

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
    });

    await expect(cache.getTask("202605051806-RMT1")).resolves.toBeNull();
    const stateText = await readFile(
      path.join(tempDir, ".agentplane", "backends", "cloud", "state.json"),
      "utf8",
    );
    expect(stateText).toContain("2026-05-06T00:00:00.000Z");
  });

  it("materializes remote-only tasks with a sync envelope under import", async () => {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    const backend = new CloudBackend(
      {
        endpoint: "https://cloud.example",
        token: "token",
        project_id: "project-1",
        remote_create_policy: "import",
      },
      { root: tempDir, cache, fetchImpl: remoteOnlyFetch("trello") },
    );

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
    });

    const imported = await cache.getTask("202605051806-RMT1");
    expect(imported).toMatchObject({
      title: "Remote only",
      status: "TODO",
      priority: "high",
      owner: "DOCS",
      origin: {
        system: "cloud",
        provider: "trello",
        issue_id: "trello-remote-1",
        url: "https://example.test/trello/remote-1",
      },
      sync: {
        version: 1,
        external_refs: [
          {
            provider: "trello",
            connector_kind: "cloud",
            remote_id: "trello-remote-1",
            remote_url: "https://example.test/trello/remote-1",
            remote_revision: "rev-1",
          },
        ],
      },
    });
    const readme = await readFile(
      path.join(tempDir, ".agentplane", "tasks", "202605051806-RMT1", "README.md"),
      "utf8",
    );
    expect(readme).toContain("sync:");
    expect(readme).not.toContain("Raw verification log");
  });
});

function remoteOnlyFetch(provider: string): typeof fetch {
  return vi.fn<typeof fetch>((input) => {
    const url = input instanceof Request ? input.url : input.toString();
    if (url.endsWith("/sync/state")) {
      return Promise.resolve(Response.json({ data: { openConflicts: [] } }));
    }
    return Promise.resolve(
      Response.json({
        data: {
          tasks: [
            {
              id: "202605051806-RMT1",
              remote_id: `${provider}-remote-1`,
              remote_url: `https://example.test/${provider}/remote-1`,
              remote_revision: "rev-1",
              provider,
              title: "Remote only",
              status: "TODO",
              priority: "high",
              owner: "DOCS",
              tags: ["remote"],
            },
          ],
          last_checked_at: "2026-05-06T00:00:00.000Z",
        },
      }),
    );
  });
}
