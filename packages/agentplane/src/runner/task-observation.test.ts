import { defaultConfig } from "@agentplaneorg/core/config";
import { describe, expect, it, vi } from "vitest";

import type { TaskData } from "../backends/task-backend.js";
import type { CommandContext } from "../commands/shared/task-backend.js";
import { observeRunnerTaskProjection, runnerTaskProjectionReader } from "./task-observation.js";

const TASK_ID = "202607241000-OBSERVE";

function task(): TaskData {
  return {
    id: TASK_ID,
    title: "Observe cached task",
    description: "Observe cached task",
    status: "DOING",
    priority: "med",
    owner: "CODER",
    revision: 7,
    depends_on: [],
    tags: ["runner"],
    verify: [],
  };
}

function cloudContext(opts: { cachedTask?: TaskData | null; includeCache?: boolean }): {
  ctx: CommandContext;
  remoteGetTask: ReturnType<typeof vi.fn>;
  cacheGetTask: ReturnType<typeof vi.fn>;
} {
  const remoteGetTask = vi.fn(() =>
    Promise.reject(new Error("Remote/autopull read must not run during observation.")),
  );
  const cacheGetTask = vi.fn(() => Promise.resolve(opts.cachedTask ?? null));
  const backend = {
    id: "cloud",
    capabilities: {
      canonical_source: "remote",
      projection: "cache",
      projection_read_mode: "native",
      reads_from_projection_by_default: true,
      supports_task_revisions: true,
      supports_revision_guarded_writes: true,
      may_access_network_on_read: true,
      may_access_network_on_write: true,
      supports_projection_refresh: true,
      supports_push_sync: true,
      supports_snapshot_export: false,
    },
    getTask: remoteGetTask,
    writeTask: vi.fn(() => Promise.resolve()),
    ...(opts.includeCache === false
      ? {}
      : {
          cache: {
            getTask: cacheGetTask,
          },
        }),
  };
  return {
    ctx: {
      resolvedProject: { gitRoot: "/repo", agentplaneDir: "/repo/.agentplane" },
      config: defaultConfig(),
      backendId: "cloud",
      backendConfigPath: "/repo/.agentplane/backends/local/backend.json",
      taskBackend: backend,
      git: {},
      memo: {},
    } as unknown as CommandContext,
    remoteGetTask,
    cacheGetTask,
  };
}

describe("runner task projection observation", () => {
  it("reads the local cache without invoking the remote/autopull task port", async () => {
    const fixture = cloudContext({ cachedTask: task() });

    await expect(observeRunnerTaskProjection(fixture.ctx, TASK_ID)).resolves.toMatchObject({
      id: TASK_ID,
      revision: 7,
    });
    expect(fixture.cacheGetTask).toHaveBeenCalledWith(TASK_ID);
    expect(fixture.remoteGetTask).not.toHaveBeenCalled();
  });

  it("fails closed when a network-capable projection exposes no cache reader", async () => {
    const fixture = cloudContext({ includeCache: false });

    await expect(runnerTaskProjectionReader(fixture.ctx).getTask(TASK_ID)).resolves.toBeNull();
    expect(fixture.cacheGetTask).not.toHaveBeenCalled();
    expect(fixture.remoteGetTask).not.toHaveBeenCalled();
  });
});
