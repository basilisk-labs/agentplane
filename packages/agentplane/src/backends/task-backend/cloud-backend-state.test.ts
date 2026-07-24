import { mkdir, mkdtemp, readFile, rename, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  cloudBackendSyncCheckpointToken,
  readCloudBackendState,
  readContainedCloudBackendSyncCheckpoint,
  writeContainedCloudBackendState,
  type CloudBackendState,
} from "./cloud-backend-state.js";

async function writeState(
  repositoryRoot: string,
  statePath: string,
  state: CloudBackendState,
): Promise<void> {
  await writeContainedCloudBackendState({
    expectedCheckpoint: await readContainedCloudBackendSyncCheckpoint({
      repositoryRoot,
      statePath,
    }),
    repositoryRoot,
    state,
    statePath,
  });
}

describe("cloud backend state", () => {
  it("uses a canonical checkpoint token independent of object insertion order", () => {
    const state: CloudBackendState = {
      last_checked_at: "2026-05-14T09:00:00.000Z",
      last_start_ready_pull_at: null,
      pending_projection_apply: null,
      pending_push: null,
      projection_identity_sha256: `sha256:${"a".repeat(64)}`,
    };
    const reordered = {
      projection_identity_sha256: state.projection_identity_sha256,
      pending_push: state.pending_push,
      pending_projection_apply: state.pending_projection_apply,
      last_start_ready_pull_at: state.last_start_ready_pull_at,
      last_checked_at: state.last_checked_at,
    };

    expect(cloudBackendSyncCheckpointToken({ kind: "valid", state })).toBe(
      cloudBackendSyncCheckpointToken({ kind: "valid", state: reordered }),
    );
  });

  it("falls back to stale state when state JSON is malformed", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const statePath = path.join(dir, "state.json");
    await writeFile(statePath, "{", "utf8");

    await expect(readCloudBackendState(statePath)).resolves.toEqual({
      last_checked_at: null,
      last_start_ready_pull_at: null,
      pending_projection_apply: null,
      pending_push: null,
      projection_identity_sha256: null,
    });
  });

  it.each([
    ["malformed JSON", "{", "invalid_json"],
    [
      "invalid identity",
      JSON.stringify({ projection_identity_sha256: "sha256:not-a-digest" }),
      "invalid_shape",
    ],
    [
      "invalid pending push",
      JSON.stringify({ pending_push: { failed_at: 42, reason: "failed" } }),
      "invalid_shape",
    ],
    [
      "invalid freshness timestamp",
      JSON.stringify({ last_checked_at: "not-a-timestamp" }),
      "invalid_shape",
    ],
    [
      "unknown top-level field",
      JSON.stringify({ last_checked_at: null, future_checkpoint_field: "value" }),
      "invalid_shape",
    ],
    [
      "unknown pending push field",
      JSON.stringify({
        pending_push: {
          failed_at: "2026-05-14T09:00:00.000Z",
          kind: "push_failed",
          reason: "failed",
          future_field: true,
        },
      }),
      "invalid_shape",
    ],
    [
      "unknown pending projection field",
      JSON.stringify({
        pending_projection_apply: {
          kind: "pull_apply",
          requires_explicit_adoption: false,
          started_at: "2026-05-14T09:00:00.000Z",
          target_projection_identity_sha256: `sha256:${"d".repeat(64)}`,
          future_field: true,
        },
      }),
      "invalid_shape",
    ],
  ])("rejects %s in the strict sync checkpoint reader", async (_label, raw, reason) => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const statePath = path.join(dir, "state.json");
    await writeFile(statePath, raw, "utf8");

    await expect(
      readContainedCloudBackendSyncCheckpoint({
        repositoryRoot: dir,
        statePath,
      }),
    ).resolves.toEqual({ kind: "invalid", reason });
  });

  it("distinguishes a missing sync checkpoint from a valid legacy checkpoint", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const statePath = path.join(dir, "state.json");

    await expect(
      readContainedCloudBackendSyncCheckpoint({
        repositoryRoot: dir,
        statePath,
      }),
    ).resolves.toEqual({ kind: "missing" });

    await writeFile(statePath, JSON.stringify({ last_checked_at: "2026-05-14T09:00:00.000Z" }));
    await expect(
      readContainedCloudBackendSyncCheckpoint({
        repositoryRoot: dir,
        statePath,
      }),
    ).resolves.toMatchObject({
      kind: "valid",
      state: {
        last_checked_at: "2026-05-14T09:00:00.000Z",
        projection_identity_sha256: null,
      },
    });
  });

  it("writes state JSON through the shared atomic write helper", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const statePath = path.join(dir, "nested", "state.json");

    await writeState(dir, statePath, {
      last_checked_at: "2026-05-14T09:00:00.000Z",
      last_start_ready_pull_at: "2026-05-14T09:02:00.000Z",
      pending_projection_apply: null,
      pending_push: null,
      projection_identity_sha256: `sha256:${"a".repeat(64)}`,
    });

    await expect(readCloudBackendState(statePath)).resolves.toEqual({
      last_checked_at: "2026-05-14T09:00:00.000Z",
      last_start_ready_pull_at: "2026-05-14T09:02:00.000Z",
      pending_projection_apply: null,
      pending_push: null,
      projection_identity_sha256: `sha256:${"a".repeat(64)}`,
    });
    await expect(readFile(statePath, "utf8")).resolves.toContain(
      '"last_checked_at": "2026-05-14T09:00:00.000Z"',
    );
  });

  it("round-trips durable pending push markers", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const statePath = path.join(dir, "state.json");

    await writeState(dir, statePath, {
      last_checked_at: "2026-05-14T09:00:00.000Z",
      last_start_ready_pull_at: null,
      pending_projection_apply: null,
      pending_push: {
        failed_at: "2026-05-14T09:01:00.000Z",
        kind: "push_failed",
        reason: "Cloud request failed",
      },
      projection_identity_sha256: `sha256:${"b".repeat(64)}`,
    });

    await expect(readCloudBackendState(statePath)).resolves.toEqual({
      last_checked_at: "2026-05-14T09:00:00.000Z",
      last_start_ready_pull_at: null,
      pending_projection_apply: null,
      pending_push: {
        failed_at: "2026-05-14T09:01:00.000Z",
        kind: "push_failed",
        reason: "Cloud request failed",
      },
      projection_identity_sha256: `sha256:${"b".repeat(64)}`,
    });
  });

  it("rejects a checkpoint change at the final publication boundary", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const statePath = path.join(dir, "state.json");
    const initial: CloudBackendState = {
      last_checked_at: "2026-05-14T09:00:00.000Z",
      last_start_ready_pull_at: null,
      pending_projection_apply: null,
      pending_push: null,
      projection_identity_sha256: `sha256:${"c".repeat(64)}`,
    };
    await writeState(dir, statePath, initial);
    const expectedCheckpoint = await readContainedCloudBackendSyncCheckpoint({
      repositoryRoot: dir,
      statePath,
    });
    const competing = {
      ...initial,
      last_checked_at: "2026-05-14T09:01:00.000Z",
    };

    await expect(
      writeContainedCloudBackendState({
        beforePublicationCheck: async () => {
          await writeFile(statePath, `${JSON.stringify(competing, null, 2)}\n`, "utf8");
        },
        expectedCheckpoint,
        repositoryRoot: dir,
        state: {
          ...initial,
          last_checked_at: "2026-05-14T09:02:00.000Z",
        },
        statePath,
      }),
    ).rejects.toThrow("checkpoint changed during synchronization");

    await expect(readCloudBackendState(statePath)).resolves.toEqual(competing);
  });

  it("rejects an unknown-field checkpoint change at the final publication boundary", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const statePath = path.join(dir, "state.json");
    const initial: CloudBackendState = {
      last_checked_at: "2026-05-14T09:00:00.000Z",
      last_start_ready_pull_at: null,
      pending_projection_apply: null,
      pending_push: null,
      projection_identity_sha256: `sha256:${"e".repeat(64)}`,
    };
    await writeState(dir, statePath, initial);
    const expectedCheckpoint = await readContainedCloudBackendSyncCheckpoint({
      repositoryRoot: dir,
      statePath,
    });
    const competing = {
      ...initial,
      future_checkpoint_field: { version: 2 },
    };

    await expect(
      writeContainedCloudBackendState({
        beforePublicationCheck: async () => {
          await writeFile(statePath, `${JSON.stringify(competing, null, 2)}\n`, "utf8");
        },
        expectedCheckpoint,
        repositoryRoot: dir,
        state: {
          ...initial,
          last_checked_at: "2026-05-14T09:02:00.000Z",
        },
        statePath,
      }),
    ).rejects.toThrow("checkpoint changed during synchronization");

    await expect(
      readContainedCloudBackendSyncCheckpoint({
        repositoryRoot: dir,
        statePath,
      }),
    ).resolves.toEqual({ kind: "invalid", reason: "invalid_shape" });
    await expect(readFile(statePath, "utf8")).resolves.toBe(
      `${JSON.stringify(competing, null, 2)}\n`,
    );
  });

  it("rejects a state-directory symlink swap before publication", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const outside = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-outside-"));
    const stateDir = path.join(dir, "state");
    const displacedStateDir = path.join(dir, "state-displaced");
    const statePath = path.join(stateDir, "state.json");
    const outsideStatePath = path.join(outside, "state.json");
    await mkdir(stateDir);
    await writeFile(outsideStatePath, "sentinel\n", "utf8");

    await expect(
      writeContainedCloudBackendState({
        beforePublicationCheck: async () => {
          await rename(stateDir, displacedStateDir);
          await symlink(outside, stateDir, "dir");
        },
        expectedCheckpoint: { kind: "missing" },
        repositoryRoot: dir,
        state: {
          last_checked_at: null,
          last_start_ready_pull_at: null,
          pending_projection_apply: null,
          pending_push: null,
          projection_identity_sha256: null,
        },
        statePath,
      }),
    ).rejects.toThrow("ancestor changed");

    await expect(readFile(outsideStatePath, "utf8")).resolves.toBe("sentinel\n");
  });

  it("rejects a pre-existing symlinked state-directory ancestor", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-"));
    const outside = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-state-outside-"));
    const linkedDirectory = path.join(dir, "linked-state");
    const outsideStatePath = path.join(outside, "state.json");
    await writeFile(outsideStatePath, "sentinel\n", "utf8");
    await symlink(outside, linkedDirectory, "dir");

    await expect(
      writeContainedCloudBackendState({
        expectedCheckpoint: { kind: "missing" },
        repositoryRoot: dir,
        state: {
          last_checked_at: null,
          last_start_ready_pull_at: null,
          pending_projection_apply: null,
          pending_push: null,
          projection_identity_sha256: null,
        },
        statePath: path.join(linkedDirectory, "state.json"),
      }),
    ).rejects.toThrow("symlinked or non-directory");

    await expect(readFile(outsideStatePath, "utf8")).resolves.toBe("sentinel\n");
  });
});
