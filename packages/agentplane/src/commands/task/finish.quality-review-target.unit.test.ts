import { beforeEach, describe, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { LoadedFinishTask, ResolvedCommitInfo } from "./finish-shared.js";

const mocks = vi.hoisted(() => ({
  isTaskLocalOnlyAdvance: vi.fn(),
  readCommitInfo: vi.fn(),
}));

vi.mock("../shared/task-local-freshness.js", () => ({
  isTaskLocalOnlyAdvance: mocks.isTaskLocalOnlyAdvance,
}));
vi.mock("./shared.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return {
    ...actual,
    readCommitInfo: mocks.readCommitInfo,
  };
});

function mkCtx(): CommandContext {
  const config = defaultConfig();
  config.paths.workflow_dir = ".agentplane/tasks";
  return {
    resolvedProject: { gitRoot: "/repo" },
    config,
  } as unknown as CommandContext;
}

function mkLoadedTask(reviewedSha = "impl-sha"): LoadedFinishTask {
  return {
    taskId: "T-1",
    task: {
      id: "T-1",
      quality_review: {
        state: "pass",
        updated_at: "2026-02-09T00:00:00.000Z",
        updated_by: "EVALUATOR",
        note: "Quality gate passed",
        evaluated_sha: reviewedSha,
        blueprint_digest: "d1",
        evidence_refs: [".agentplane/tasks/T-1/quality/run/quality-report.json"],
        findings: ["Reviewed implementation evidence."],
      },
    } as TaskData,
  };
}

describe("finish quality review target selection", () => {
  beforeEach(() => {
    mocks.isTaskLocalOnlyAdvance.mockReset();
    mocks.readCommitInfo.mockReset();
  });

  it("prefers explicit --implementation-commit over artifact --commit", async () => {
    mocks.readCommitInfo.mockResolvedValue({ hash: "impl-sha", message: "feat: implement T-1" });
    const { resolveImplementationCommitInfo } = await import("./finish-execute-commit.js");

    const resolved = await resolveImplementationCommitInfo({
      ctx: mkCtx(),
      options: { implementationCommit: "impl-sha" } as never,
      loadedTasks: [mkLoadedTask()],
      taskCommitInfo: { hash: "artifact-sha", message: "✅ T-1 close: task artifacts" },
    });

    expect(resolved).toEqual({ hash: "impl-sha", message: "feat: implement T-1" });
    expect(mocks.isTaskLocalOnlyAdvance).not.toHaveBeenCalled();
  });

  it("auto-resolves quality_review.evaluated_sha when --commit is task-artifact-only", async () => {
    const artifactCommit: ResolvedCommitInfo = {
      hash: "artifact-sha",
      message: "✅ T-1 close: task artifacts",
    };
    mocks.isTaskLocalOnlyAdvance.mockResolvedValue(true);
    mocks.readCommitInfo.mockResolvedValue({ hash: "impl-sha", message: "feat: implement T-1" });
    const { resolveImplementationCommitInfo } = await import("./finish-execute-commit.js");

    const resolved = await resolveImplementationCommitInfo({
      ctx: mkCtx(),
      options: { quiet: true } as never,
      loadedTasks: [mkLoadedTask()],
      taskCommitInfo: artifactCommit,
    });

    expect(mocks.isTaskLocalOnlyAdvance).toHaveBeenCalledWith({
      gitRoot: "/repo",
      workflowDir: ".agentplane/tasks",
      taskId: "T-1",
      tasksPath: ".agentplane/tasks.json",
      fromRef: "impl-sha",
      toRef: "artifact-sha",
    });
    expect(resolved).toEqual({ hash: "impl-sha", message: "feat: implement T-1" });
  });

  it("keeps stale-review validation when --commit is not task-local", async () => {
    mocks.isTaskLocalOnlyAdvance.mockResolvedValue(false);
    const { resolveImplementationCommitInfo } = await import("./finish-execute-commit.js");

    const resolved = await resolveImplementationCommitInfo({
      ctx: mkCtx(),
      options: { quiet: true } as never,
      loadedTasks: [mkLoadedTask()],
      taskCommitInfo: { hash: "other-sha", message: "feat: other change" },
    });

    expect(resolved).toBeNull();
    expect(mocks.readCommitInfo).not.toHaveBeenCalled();
  });
});
