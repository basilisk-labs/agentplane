import { mkdir, readFile, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { mkTempDir } from "@agentplane/testkit";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CloudBackend, LocalBackend } from "./task-backend.js";
import { cloudProjectionIdentitySha256 } from "./task-backend/cloud-projection-identity.js";

describe("CloudBackend projection observation", () => {
  let root = "";
  let originalEnv: NodeJS.ProcessEnv = {};

  beforeEach(async () => {
    root = await mkTempDir();
    originalEnv = { ...process.env };
    delete process.env.AGENTPLANE_CLOUD_ENDPOINT;
    delete process.env.AGENTPLANE_CLOUD_TOKEN;
    delete process.env.AGENTPLANE_CLOUD_PROJECT_ID;
    delete process.env.AGENTPLANE_CLOUD_PROVIDER;
    await mkdir(path.join(root, ".git"), { recursive: true });
  });

  afterEach(async () => {
    process.env = originalEnv;
    if (root) await rm(root, { recursive: true, force: true });
  });

  function backend(opts?: { state_path?: string }) {
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.reject(new Error("Projection observation must not access the network.")),
    );
    return {
      fetchImpl,
      backend: new CloudBackend(
        {
          endpoint: "https://cloud.example/",
          token: "token",
          project_id: "project-1",
          provider: "github-projects",
          stale_after_seconds: 300,
          state_path: opts?.state_path,
        },
        {
          root,
          cache: new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") }),
          fetchImpl,
        },
      ),
    };
  }

  it("observes an identity-bound local checkpoint without exposing errors or using network", async () => {
    const stateDir = path.join(root, ".agentplane", "backends", "cloud");
    const checkedAt = new Date().toISOString();
    const identity = cloudProjectionIdentitySha256({
      endpoint: "https://cloud.example",
      projectId: "project-1",
      provider: "github-projects",
    });
    await mkdir(stateDir, { recursive: true });
    await writeFile(
      path.join(stateDir, "state.json"),
      `${JSON.stringify({
        last_checked_at: checkedAt,
        last_start_ready_pull_at: null,
        pending_push: {
          failed_at: "2026-07-24T00:01:00.000Z",
          reason: "secret-bearing provider error is not projection evidence",
        },
        projection_identity_sha256: identity,
      })}\n`,
      "utf8",
    );
    const fixture = backend();

    await expect(fixture.backend.observeProjection()).resolves.toEqual({
      projection_revision: null,
      projection_freshness: {
        last_checked_at: checkedAt,
        stale_after_seconds: 300,
        pending_push: {
          failed_at: "2026-07-24T00:01:00.000Z",
        },
      },
      remote_projection: {
        provider: "github-projects",
        project_id: "project-1",
        identity_sha256: identity,
        checkpoint_identity_sha256: identity,
      },
    });
    expect(fixture.fetchImpl).not.toHaveBeenCalled();
  });

  it("persists the effective non-secret identity after a successful pull", async () => {
    const checkedAt = "2026-07-24T00:00:00.000Z";
    const identity = cloudProjectionIdentitySha256({
      endpoint: "https://cloud.example",
      projectId: "project-1",
      provider: "github-projects",
    });
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = input instanceof Request ? input.url : input.toString();
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: 0 } }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [],
            last_checked_at: checkedAt,
          },
        }),
      );
    });
    const cloud = new CloudBackend(
      {
        endpoint: "https://cloud.example/",
        token: "token",
        project_id: "project-1",
        provider: "github-projects",
      },
      {
        root,
        cache: new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") }),
        fetchImpl,
      },
    );

    await cloud.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    const state = JSON.parse(
      await readFile(path.join(root, ".agentplane", "backends", "cloud", "state.json"), "utf8"),
    ) as Record<string, unknown>;
    expect(state).toMatchObject({
      last_checked_at: checkedAt,
      projection_identity_sha256: identity,
    });
  });

  it("does not recover a pending push against a different cloud identity", async () => {
    const statePath = path.join(root, ".agentplane", "backends", "cloud", "state.json");
    await mkdir(path.dirname(statePath), { recursive: true });
    await writeFile(
      statePath,
      `${JSON.stringify({
        last_checked_at: new Date().toISOString(),
        last_start_ready_pull_at: null,
        pending_push: {
          failed_at: "2026-07-24T00:01:00.000Z",
          reason: "old project push failed",
        },
        projection_identity_sha256: cloudProjectionIdentitySha256({
          endpoint: "https://old-cloud.example",
          projectId: "old-project",
          provider: "github-projects",
        }),
      })}\n`,
      "utf8",
    );
    const fixture = backend();

    await expect(fixture.backend.assertLocalMutationReady()).rejects.toThrow(
      /identity changed while local task mutations are still pending/u,
    );
    expect(fixture.fetchImpl).not.toHaveBeenCalled();
  });

  it("refuses an escaping state path without network access", async () => {
    const outside = await mkTempDir();
    try {
      const outsideState = path.join(outside, "state.json");
      await writeFile(outsideState, '{"last_checked_at":"2099-01-01T00:00:00.000Z"}\n', "utf8");
      const fixture = backend({ state_path: path.relative(root, outsideState) });

      await expect(fixture.backend.observeProjection()).rejects.toThrow(/outside the repository/u);
      expect(fixture.fetchImpl).not.toHaveBeenCalled();
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  });

  it("refuses a symlinked state without reading its target", async () => {
    const outside = await mkTempDir();
    try {
      const outsideState = path.join(outside, "state.json");
      const statePath = path.join(root, ".agentplane", "backends", "cloud", "state.json");
      await Promise.all([
        mkdir(path.dirname(statePath), { recursive: true }),
        writeFile(outsideState, '{"last_checked_at":"2099-01-01T00:00:00.000Z"}\n', "utf8"),
      ]);
      await symlink(outsideState, statePath);
      const fixture = backend();

      await expect(fixture.backend.observeProjection()).rejects.toThrow(
        /Refusing symlinked cloud backend projection state/u,
      );
      expect(fixture.fetchImpl).not.toHaveBeenCalled();
    } finally {
      await rm(outside, { recursive: true, force: true });
    }
  });
});
