import { describe, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";

import type { CommandContext } from "../../shared/task-backend.js";
import { applyTaskStatusTransitionCommand } from "./transition-command.js";

vi.mock("./workflow-transition-service.js", () => {
  return {
    executeTaskStatusTransitionRequest: vi.fn().mockImplementation(({ task }: { task: unknown }) => {
      return {
        intents: {},
        nextTask: { ...(task as Record<string, unknown>), status: "DONE" },
        deferredWarnings: [],
      };
    }),
    readDeferredTaskTransitionWarnings: vi.fn().mockReturnValue([]),
  };
});

function mkCtx(overrides: Partial<CommandContext>): CommandContext {
  const config = defaultConfig();
  config.workflow_mode = "direct";
  config.agents.approvals.require_network = true;
  return {
    resolvedProject: { gitRoot: "/tmp", agentplaneDir: "/tmp/.agentplane" } as unknown as CommandContext["resolvedProject"],
    config,
    taskBackend: {} as unknown as CommandContext["taskBackend"],
    backendId: "cloud",
    backendConfigPath: "/tmp/.agentplane/backends/cloud/backend.json",
    git: {} as unknown as CommandContext["git"],
    memo: {},
    ...overrides,
  } as unknown as CommandContext;
}

describe("applyTaskStatusTransitionCommand", () => {
  it("auto-pushes to cloud backend after status mutation when enabled", async () => {
    const sync = vi.fn().mockResolvedValue(undefined);
    const writeTask = vi.fn().mockResolvedValue(undefined);
    const getTask = vi.fn().mockResolvedValue({
      id: "T-1",
      title: "Title",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      tags: ["code"],
      depends_on: [],
      verify: [],
    });
    const ctx = mkCtx({
      taskBackend: {
        capabilities: {
          canonical_source: "remote",
          projection: "cache",
          projection_read_mode: "native",
          reads_from_projection_by_default: true,
          writes_task_readmes: false,
          supports_task_revisions: false,
          supports_revision_guarded_writes: false,
          may_access_network_on_read: false,
          may_access_network_on_write: true,
          supports_projection_refresh: true,
          supports_push_sync: true,
          supports_snapshot_export: true,
        },
        autoPushOnMutation: true,
        getTask,
        writeTask,
        sync,
      } as unknown as CommandContext["taskBackend"],
    });

    await applyTaskStatusTransitionCommand({
      ctx,
      taskId: "T-1",
      quiet: true,
      build: async () => {
        return {
          action: "set_status",
          status: "DONE",
          comment: null,
          author: null,
          force: true,
        } as unknown;
      },
    });

    expect(writeTask).toHaveBeenCalledTimes(1);
    expect(sync).toHaveBeenCalledWith(
      expect.objectContaining({
        direction: "push",
      }),
    );
  });
});
