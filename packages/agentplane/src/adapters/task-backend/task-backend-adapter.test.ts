import { describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../../commands/shared/task-backend.js";
import { TaskBackendAdapter } from "./task-backend-adapter.js";

describe("TaskBackendAdapter", () => {
  it("preserves projection-read capabilities and projection reads at the adapter boundary", async () => {
    const projection = [
      {
        id: "202603310000-ABCD12",
        title: "Projection task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
    ];
    const listProjectionTasks = vi.fn().mockResolvedValue(projection);
    const ctx = {
      taskBackend: {
        id: "redmine",
        capabilities: {
          canonical_source: "remote",
          projection: "cache",
          projection_read_mode: "native",
          reads_from_projection_by_default: true,
          writes_task_readmes: true,
          supports_task_revisions: false,
          supports_revision_guarded_writes: false,
          may_access_network_on_read: false,
          may_access_network_on_write: true,
          supports_projection_refresh: true,
          supports_push_sync: true,
          supports_snapshot_export: false,
        },
        listTasks: vi.fn().mockResolvedValue([]),
        listProjectionTasks,
        getTask: vi.fn().mockResolvedValue(null),
        writeTask: vi.fn().mockResolvedValue(),
      },
    } as unknown as CommandContext;

    const adapter = new TaskBackendAdapter(ctx);

    expect(adapter.capabilities).toEqual({
      canonical_source: "remote",
      projection: "cache",
      projection_read_mode: "native",
      reads_from_projection_by_default: true,
    });
    await expect(adapter.listProjectionTasks?.()).resolves.toEqual(projection);
    expect(listProjectionTasks).toHaveBeenCalledTimes(1);
  });
});
