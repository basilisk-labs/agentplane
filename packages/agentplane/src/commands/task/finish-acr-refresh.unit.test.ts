import { defaultConfig } from "@agentplaneorg/core/config";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { refreshAcrArtifactsForFinishedTasks } from "./finish-shared.js";

const mocks = vi.hoisted(() => ({
  generateAcr: vi.fn(),
  writeAcrFile: vi.fn(),
}));

vi.mock("../acr/acr.command.js", () => ({
  generateAcr: mocks.generateAcr,
  writeAcrFile: mocks.writeAcrFile,
}));

function mkCtx(): { ctx: CommandContext; invalidateStatus: ReturnType<typeof vi.fn> } {
  const config = defaultConfig();
  config.acr.enabled = false;
  config.acr.write_on_finish = true;
  const invalidateStatus = vi.fn();
  const ctx = {
    config,
    resolvedProject: { gitRoot: "/repo", agentplaneDir: "/repo/.agentplane" },
    git: { invalidateStatus },
  } as unknown as CommandContext;
  return { ctx, invalidateStatus };
}

describe("refreshAcrArtifactsForFinishedTasks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.generateAcr.mockResolvedValue({
      acrPath: "/repo/.agentplane/tasks/T-CTX/acr.json",
      record: { record_id: "acr_T-CTX" },
    });
    mocks.writeAcrFile.mockResolvedValue(null);
  });

  it("writes ACRs for context tasks even when optional ACR recording is disabled", async () => {
    const { ctx, invalidateStatus } = mkCtx();

    await refreshAcrArtifactsForFinishedTasks({
      ctx,
      cwd: "/repo",
      loadedTasks: [
        {
          taskId: "T-CTX",
          task: {
            id: "T-CTX",
            task_kind: "context",
            commit: { hash: "context-hash", message: "context" },
          },
        },
      ] as Parameters<typeof refreshAcrArtifactsForFinishedTasks>[0]["loadedTasks"],
      taskCommitInfo: null,
      author: "CURATOR",
    });

    expect(mocks.generateAcr).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-CTX",
        workCommit: "context-hash",
        write: true,
        refresh: true,
      }),
    );
    expect(mocks.writeAcrFile).toHaveBeenCalledWith(
      expect.objectContaining({
        acrPath: "/repo/.agentplane/tasks/T-CTX/acr.json",
        refresh: true,
      }),
    );
    expect(invalidateStatus).toHaveBeenCalled();
  });

  it("does not write ACRs for non-context tasks when optional ACR recording is disabled", async () => {
    const { ctx, invalidateStatus } = mkCtx();

    await refreshAcrArtifactsForFinishedTasks({
      ctx,
      cwd: "/repo",
      loadedTasks: [
        {
          taskId: "T-CTX",
          task: {
            id: "T-CTX",
            task_kind: "context",
            commit: { hash: "context-hash", message: "context" },
          },
        },
        {
          taskId: "T-CODE",
          task: {
            id: "T-CODE",
            task_kind: "standard",
            commit: { hash: "code-hash", message: "code" },
          },
        },
      ] as Parameters<typeof refreshAcrArtifactsForFinishedTasks>[0]["loadedTasks"],
      taskCommitInfo: null,
      author: "CURATOR",
    });

    expect(mocks.generateAcr).toHaveBeenCalledTimes(1);
    expect(mocks.generateAcr).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-CTX",
        workCommit: "context-hash",
      }),
    );
    expect(mocks.generateAcr).not.toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-CODE",
      }),
    );
    expect(mocks.writeAcrFile).toHaveBeenCalledTimes(1);
    expect(invalidateStatus).toHaveBeenCalled();
  });
});
