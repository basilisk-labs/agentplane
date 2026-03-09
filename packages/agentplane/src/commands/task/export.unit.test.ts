import path from "node:path";

import { describe, expect, it, vi } from "vitest";

import type { TaskBackend } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdTaskExport } from "./export.js";

function mkCtx(taskBackend: Partial<TaskBackend>): CommandContext {
  return {
    resolvedProject: { gitRoot: "/repo" } as CommandContext["resolvedProject"],
    config: { paths: { tasks_path: ".agentplane/tasks.json" } } as CommandContext["config"],
    taskBackend: taskBackend as CommandContext["taskBackend"],
    backendId: "mock",
    backendConfigPath: path.join("/repo", ".agentplane", "backends", "mock", "backend.json"),
    git: {} as CommandContext["git"],
    memo: {},
    resolved: { gitRoot: "/repo" } as CommandContext["resolved"],
    backend: taskBackend as CommandContext["backend"],
  };
}

describe("cmdTaskExport", () => {
  it("prefers exportProjectionSnapshot when the backend supports it", async () => {
    const exportProjectionSnapshot = vi.fn(() => Promise.resolve());
    const exportTasksJson = vi.fn(() => Promise.resolve());
    const ctx = mkCtx({
      id: "mock",
      capabilities: {
        canonical_source: "remote",
        projection: "cache",
        reads_from_projection_by_default: true,
        may_access_network_on_read: false,
        may_access_network_on_write: false,
        supports_projection_refresh: true,
        supports_push_sync: true,
        supports_snapshot_export: true,
      },
      listTasks: vi.fn(),
      getTask: vi.fn(),
      writeTask: vi.fn(),
      exportProjectionSnapshot,
      exportTasksJson,
    });

    const code = await cmdTaskExport({ ctx, cwd: "/repo" });
    expect(code).toBe(0);
    expect(exportProjectionSnapshot).toHaveBeenCalledWith("/repo/.agentplane/tasks.json");
    expect(exportTasksJson).not.toHaveBeenCalled();
  });

  it("falls back to exportTasksJson when projection snapshot export is unavailable", async () => {
    const exportTasksJson = vi.fn(() => Promise.resolve());
    const ctx = mkCtx({
      id: "mock",
      capabilities: {
        canonical_source: "local",
        projection: "canonical",
        reads_from_projection_by_default: true,
        may_access_network_on_read: false,
        may_access_network_on_write: false,
        supports_projection_refresh: false,
        supports_push_sync: false,
        supports_snapshot_export: true,
      },
      listTasks: vi.fn(),
      getTask: vi.fn(),
      writeTask: vi.fn(),
      exportTasksJson,
    });

    const code = await cmdTaskExport({ ctx, cwd: "/repo" });
    expect(code).toBe(0);
    expect(exportTasksJson).toHaveBeenCalledWith("/repo/.agentplane/tasks.json");
  });
});
