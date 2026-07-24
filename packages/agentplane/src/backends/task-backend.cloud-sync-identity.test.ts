import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { CloudBackend, LocalBackend, type TaskData } from "./task-backend.js";
import type { CloudBackendState } from "./task-backend/cloud-backend-state.js";
import { cloudProjectionIdentitySha256 } from "./task-backend/cloud-projection-identity.js";

const CURRENT_ENDPOINT = "https://cloud.example";
const CURRENT_PROJECT_ID = "project-1";
const CURRENT_PROVIDER = "github-projects";
const CURRENT_IDENTITY = cloudProjectionIdentitySha256({
  endpoint: CURRENT_ENDPOINT,
  projectId: CURRENT_PROJECT_ID,
  provider: CURRENT_PROVIDER,
});
const OLD_IDENTITY = cloudProjectionIdentitySha256({
  endpoint: "https://old.example",
  projectId: "old-project",
  provider: CURRENT_PROVIDER,
});

function makeTask(id: string): TaskData {
  return {
    id,
    title: "Cloud task",
    description: "Sync identity guard",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["cloud"],
    verify: [],
  };
}

describe("CloudBackend sync identity preflight", () => {
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

  it.each([
    ["different", OLD_IDENTITY],
    ["legacy", null],
  ])("blocks direct push from a %s checkpoint before network", async (_label, identity) => {
    const before = await writeState(
      cloudState({
        projection_identity_sha256: identity,
      }),
    );
    const fetchImpl = vi.fn<typeof fetch>((_input, init) =>
      Promise.resolve(acknowledgedPushResponse(init)),
    );
    const { backend } = makeBackend(fetchImpl);

    await expect(
      backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("checkpoint identity does not match the active remote");

    expect(fetchImpl).not.toHaveBeenCalled();
    await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
  });

  it.each(
    ["push", "pull"].flatMap((direction) =>
      [
        ["different", OLD_IDENTITY],
        ["legacy", null],
      ].map(([identityKind, identity]) => ({ direction, identity, identityKind })),
    ),
  )(
    "blocks $direction with a pending push from a $identityKind identity before network",
    async ({ direction, identity }) => {
      const before = await writeState(
        cloudState({
          pending_push: {
            failed_at: "2026-07-24T07:00:00.000Z",
            reason: "Cloud backend request failed",
          },
          projection_identity_sha256: identity,
        }),
      );
      const fetchImpl = vi.fn<typeof fetch>(() =>
        Promise.resolve(Response.json({ data: { tasks: [] } })),
      );
      const { backend } = makeBackend(fetchImpl);

      await expect(
        backend.sync({
          direction: direction as "pull" | "push",
          conflict: direction === "push" ? "fail" : "diff",
          quiet: true,
          confirm: true,
          identityTransition: direction === "push" ? "bootstrap_local" : "adopt_remote",
        }),
      ).rejects.toThrow("identity changed while local task mutations are still pending");

      expect(fetchImpl).not.toHaveBeenCalled();
      await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
    },
  );

  it("blocks automatic pull with a clean cross-identity checkpoint before network", async () => {
    const before = await writeState(
      cloudState({
        projection_identity_sha256: OLD_IDENTITY,
      }),
    );
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(Response.json({ data: { tasks: [] } })),
    );
    const { backend } = makeBackend(fetchImpl, true);

    await expect(backend.listTasks()).rejects.toThrow("requires explicit adoption");

    expect(fetchImpl).not.toHaveBeenCalled();
    await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
  });

  it("keeps a mismatched identity unchanged after a routine read-only diff", async () => {
    const before = await writeState(
      cloudState({
        projection_identity_sha256: OLD_IDENTITY,
      }),
    );
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      const url = requestUrl(input);
      if (url.endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: 0 } }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [],
            last_checked_at: "2026-07-24T08:00:00.000Z",
          },
        }),
      );
    });
    const { backend } = makeBackend(fetchImpl);

    await backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
  });

  it("binds a mismatched identity only after explicit remote adoption", async () => {
    await writeState(
      cloudState({
        projection_identity_sha256: OLD_IDENTITY,
      }),
    );
    const fetchImpl = noChangePullFetch();
    const { backend } = makeBackend(fetchImpl);

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
      identityTransition: "adopt_remote",
    });

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    await expect(readState()).resolves.toMatchObject({
      last_checked_at: "2026-07-24T08:00:00.000Z",
      pending_push: null,
      projection_identity_sha256: CURRENT_IDENTITY,
    });
  });

  it("rejects partial adoption snapshots without deleting local tasks or binding identity", async () => {
    const before = await writeState(
      cloudState({
        projection_identity_sha256: OLD_IDENTITY,
      }),
    );
    const retained = makeTask("202607240800-A0CA11");
    await new LocalBackend({
      dir: path.join(tempDir, ".agentplane", "tasks"),
    }).writeTask(retained);
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      if (requestUrl(input).endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: 0 } }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [],
            last_checked_at: "2026-07-24T08:00:00.000Z",
          },
        }),
      );
    });
    const { backend, cache } = makeBackend(fetchImpl);

    await expect(
      backend.sync({
        direction: "pull",
        conflict: "prefer-remote",
        quiet: true,
        confirm: true,
        identityTransition: "adopt_remote",
      }),
    ).rejects.toThrow("requires a complete task projection");

    await expect(cache.getTask(retained.id)).resolves.toMatchObject({ id: retained.id });
    await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
  });

  it("does not inherit freshness from the old identity when adoption omits a timestamp", async () => {
    await writeState(
      cloudState({
        last_checked_at: "2099-01-01T00:00:00.000Z",
        projection_identity_sha256: OLD_IDENTITY,
      }),
    );
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      if (requestUrl(input).endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: 0 } }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [],
            projection_complete: true,
          },
        }),
      );
    });
    const { backend } = makeBackend(fetchImpl);

    await backend.sync({
      direction: "pull",
      conflict: "prefer-remote",
      quiet: true,
      confirm: true,
      identityTransition: "adopt_remote",
    });

    await expect(readState()).resolves.toMatchObject({
      last_checked_at: null,
      projection_identity_sha256: CURRENT_IDENTITY,
    });
  });

  it("keeps a clean legacy checkpoint unbound after a routine zero-diff pull", async () => {
    const before = await writeState(cloudState({ projection_identity_sha256: null }));
    const fetchImpl = noChangePullFetch();
    const { backend } = makeBackend(fetchImpl);

    await backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
  });

  it("does not bind a legacy checkpoint when the pull diff is non-zero", async () => {
    const before = await writeState(cloudState({ projection_identity_sha256: null }));
    const fetchImpl = vi.fn<typeof fetch>((input) => {
      if (requestUrl(input).endsWith("/sync/state")) {
        return Promise.resolve(Response.json({ data: { open_conflicts: 0 } }));
      }
      return Promise.resolve(
        Response.json({
          data: {
            tasks: [makeTask("202607240800-R3M0T3")],
            last_checked_at: "2026-07-24T08:00:00.000Z",
          },
        }),
      );
    });
    const { backend } = makeBackend(fetchImpl);

    await backend.sync({ direction: "pull", conflict: "diff", quiet: true, confirm: true });

    await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
  });

  it("blocks routine push bootstrap before network", async () => {
    const fetchImpl = vi.fn<typeof fetch>(() =>
      Promise.resolve(Response.json({ data: { no_projection_changes: true } })),
    );
    const { backend } = makeBackend(fetchImpl);

    await expect(
      backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("identity is not established");

    expect(fetchImpl).not.toHaveBeenCalled();
    await expect(readFile(statePath(), "utf8")).rejects.toMatchObject({ code: "ENOENT" });
  });

  it.each(["push", "pull"] as const)(
    "blocks %s when the checkpoint JSON is invalid",
    async (direction) => {
      const before = await writeRawState("{");
      const fetchImpl = vi.fn<typeof fetch>(() =>
        Promise.resolve(Response.json({ data: { no_projection_changes: true } })),
      );
      const { backend } = makeBackend(fetchImpl);

      await expect(
        backend.sync({
          direction,
          conflict: direction === "push" ? "fail" : "diff",
          quiet: true,
          confirm: true,
          identityTransition: direction === "push" ? "bootstrap_local" : "adopt_remote",
        }),
      ).rejects.toThrow("checkpoint is invalid");

      expect(fetchImpl).not.toHaveBeenCalled();
      await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
    },
  );

  it("binds identity after an initial successful push without a freshness timestamp", async () => {
    const fetchImpl = vi.fn<typeof fetch>((_input, init) =>
      Promise.resolve(acknowledgedPushResponse(init)),
    );
    const { backend, cache } = makeBackend(fetchImpl);
    await cache.writeTask(makeTask("202607240800-SYNC"));

    await backend.sync({
      direction: "push",
      conflict: "fail",
      quiet: true,
      confirm: true,
      identityTransition: "bootstrap_local",
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    await expect(readState()).resolves.toEqual({
      last_checked_at: null,
      last_start_ready_pull_at: null,
      pending_projection_apply: null,
      pending_push: null,
      projection_identity_sha256: CURRENT_IDENTITY,
    });
  });

  it.each([
    ["empty object", {}],
    ["array", []],
    ["invalid timestamp", { data: { last_checked_at: "not-a-timestamp" } }],
  ])(
    "keeps local dirty state when a push returns an ambiguous %s acknowledgement",
    async (_label, response) => {
      const before = await writeState(
        cloudState({
          pending_push: {
            failed_at: "2026-07-24T08:30:00.000Z",
            kind: "local_dirty",
            reason: "Local cloud cache mutation is not pushed: write_task",
          },
        }),
      );
      const fetchImpl = vi.fn<typeof fetch>(() => Promise.resolve(Response.json(response)));
      const { backend, cache } = makeBackend(fetchImpl);
      await cache.writeTask(makeTask("202607240830-ACK1"));

      await expect(
        backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
      ).rejects.toThrow(/not a JSON object|did not acknowledge the submitted projection/u);

      expect(fetchImpl).toHaveBeenCalledTimes(1);
      await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
    },
  );

  it("keeps local dirty state when a structured push receipt belongs to another request", async () => {
    const before = await writeState(
      cloudState({
        pending_push: {
          failed_at: "2026-07-24T08:30:00.000Z",
          kind: "local_dirty",
          reason: "Local cloud cache mutation is not pushed: write_task",
        },
      }),
    );
    const fetchImpl = vi.fn<typeof fetch>((_input, init) => {
      if (typeof init?.body !== "string") throw new TypeError("Expected cloud push body");
      const body = JSON.parse(init.body) as {
        projection?: {
          projection_sha256?: string;
          task_count?: number;
          project_id?: string;
          provider?: string | null;
        };
      };
      return Promise.resolve(
        Response.json({
          data: {
            projection_ack: {
              status: "persisted",
              request_id: "push_another-request",
              projection_sha256: body.projection?.projection_sha256,
              task_count: body.projection?.task_count,
              project_id: body.projection?.project_id,
              provider: body.projection?.provider,
            },
          },
        }),
      );
    });
    const { backend, cache } = makeBackend(fetchImpl);
    await cache.writeTask(makeTask("202607240830-ACK2"));

    await expect(
      backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toThrow("did not acknowledge the submitted projection");

    await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
  });

  it("rejects conflicting top-level and data push acknowledgements", async () => {
    const before = await writeState(
      cloudState({
        pending_push: {
          failed_at: "2026-07-24T08:30:00.000Z",
          kind: "local_dirty",
          reason: "Local cloud cache mutation is not pushed: write_task",
        },
      }),
    );
    const fetchImpl = vi.fn<typeof fetch>((_input, init) => {
      if (typeof init?.body !== "string") throw new TypeError("Expected cloud push body");
      const body = JSON.parse(init.body) as {
        projection: Record<string, unknown>;
      };
      const acknowledgement = {
        status: "persisted",
        ...body.projection,
      };
      return Promise.resolve(
        Response.json({
          projection_ack: {
            ...acknowledgement,
            request_id: "push_conflicting-envelope",
          },
          data: { projection_ack: acknowledgement },
        }),
      );
    });
    const { backend, cache } = makeBackend(fetchImpl);
    await cache.writeTask(makeTask("202607240830-ACK3"));

    await expect(
      backend.sync({ direction: "push", conflict: "fail", quiet: true, confirm: true }),
    ).rejects.toMatchObject({
      reasonCode: "cloud_push_ack_invalid",
    });

    await expect(readFile(statePath(), "utf8")).resolves.toBe(before);
  });

  function statePath(): string {
    return path.join(tempDir, ".agentplane", "backends", "cloud", "state.json");
  }

  async function writeState(state: CloudBackendState): Promise<string> {
    const text = `${JSON.stringify(state, null, 2)}\n`;
    return await writeRawState(text);
  }

  async function writeRawState(text: string): Promise<string> {
    await mkdir(path.dirname(statePath()), { recursive: true });
    await writeFile(statePath(), text, "utf8");
    return text;
  }

  async function readState(): Promise<CloudBackendState> {
    return JSON.parse(await readFile(statePath(), "utf8")) as CloudBackendState;
  }

  function makeBackend(
    fetchImpl: typeof fetch,
    autoSyncNetworkAllowed = false,
  ): {
    backend: CloudBackend;
    cache: LocalBackend;
  } {
    const cache = new LocalBackend({ dir: path.join(tempDir, ".agentplane", "tasks") });
    return {
      cache,
      backend: new CloudBackend(
        {
          endpoint: `${CURRENT_ENDPOINT}/`,
          token: "token",
          project_id: CURRENT_PROJECT_ID,
          provider: CURRENT_PROVIDER,
        },
        {
          root: tempDir,
          cache,
          fetchImpl,
          autoSyncNetworkAllowed,
        },
      ),
    };
  }
});

function cloudState(overrides: Partial<CloudBackendState>): CloudBackendState {
  return {
    last_checked_at: "2026-07-24T07:00:00.000Z",
    last_start_ready_pull_at: null,
    pending_projection_apply: null,
    pending_push: null,
    projection_identity_sha256: CURRENT_IDENTITY,
    ...overrides,
  };
}

function noChangePullFetch(): ReturnType<typeof vi.fn<typeof fetch>> {
  return vi.fn<typeof fetch>((input) => {
    if (requestUrl(input).endsWith("/sync/state")) {
      return Promise.resolve(Response.json({ data: { open_conflicts: 0 } }));
    }
    return Promise.resolve(
      Response.json({
        data: {
          tasks: [],
          last_checked_at: "2026-07-24T08:00:00.000Z",
          projection_complete: true,
        },
      }),
    );
  });
}

function acknowledgedPushResponse(init: RequestInit | undefined): Response {
  if (typeof init?.body !== "string") throw new TypeError("Expected cloud push body");
  const body = JSON.parse(init.body) as {
    projection?: {
      request_id?: string;
      projection_sha256?: string;
      task_count?: number;
      project_id?: string;
      provider?: string | null;
    };
  };
  return Response.json({
    data: {
      projection_ack: {
        status: "unchanged",
        request_id: body.projection?.request_id,
        projection_sha256: body.projection?.projection_sha256,
        task_count: body.projection?.task_count,
        project_id: body.projection?.project_id,
        provider: body.projection?.provider,
      },
    },
  });
}

function requestUrl(url: unknown): string {
  if (typeof url === "string") return url;
  if (url instanceof URL) return url.href;
  if (url && typeof url === "object" && "url" in url && typeof url.url === "string") {
    return url.url;
  }
  throw new TypeError("Expected request URL");
}
