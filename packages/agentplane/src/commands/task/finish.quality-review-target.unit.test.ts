import { beforeEach, describe, expect, it, vi } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import type { TaskData } from "../../backends/task-backend.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { LoadedFinishTask, ResolvedCommitInfo } from "./finish-shared.js";

const mocks = vi.hoisted(() => ({
  gitRevParse: vi.fn(),
  isTaskLocalOnlyAdvance: vi.fn(),
  isTaskSetLocalOnlyAdvance: vi.fn(),
  readCommitInfo: vi.fn(),
  hasAcceptedVerificationRecord: vi.fn(),
  checkTaskBlueprintSnapshotDrift: vi.fn(),
}));

vi.mock("@agentplaneorg/core/git", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  gitRevParse: mocks.gitRevParse,
}));
vi.mock("../shared/task-local-freshness.js", () => ({
  isTaskLocalOnlyAdvance: mocks.isTaskLocalOnlyAdvance,
  isTaskSetLocalOnlyAdvance: mocks.isTaskSetLocalOnlyAdvance,
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
vi.mock("../shared/task-verification-records.js", () => ({
  hasAcceptedVerificationRecord: mocks.hasAcceptedVerificationRecord,
  requiredVerificationContractChecks: (task: TaskData) =>
    task.execution_contract?.source === "legacy_compatibility"
      ? []
      : (task.execution_contract?.verification.contract?.selected_checks ?? []),
}));
vi.mock("../blueprint/snapshot-artifact.js", () => ({
  checkTaskBlueprintSnapshotDrift: mocks.checkTaskBlueprintSnapshotDrift,
}));

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

function mkExecution(): TaskExecutionContext {
  return {
    schema_version: 1,
    primary_task_id: "T-1",
    task_ids: ["T-1"],
    repository_mode: "branch_pr",
    selected_mode: "branch_pr",
    requested_mode: "branch_pr",
    route_source: "execution_contract",
    reason_codes: ["agent_preferred_branch_pr"],
    base_ref: "main",
    base_sha: "base-sha",
    authoritative_task_source: "task_worktree",
  };
}

describe("finish quality review target selection", () => {
  beforeEach(() => {
    mocks.gitRevParse.mockReset().mockRejectedValue(new Error("no parent"));
    mocks.isTaskLocalOnlyAdvance.mockReset();
    mocks.isTaskSetLocalOnlyAdvance.mockReset();
    mocks.readCommitInfo.mockReset();
    mocks.hasAcceptedVerificationRecord.mockReset().mockResolvedValue(true);
    mocks.checkTaskBlueprintSnapshotDrift.mockReset().mockResolvedValue({
      state: "current",
      path: ".agentplane/tasks/T-1/blueprint/resolved.json",
      previous: { digest: null },
      current: { digest: "d1" },
    });
  });

  it("blocks finish when the persisted Verification Contract lacks accepted evidence", async () => {
    const loaded = mkLoadedTask();
    loaded.task.execution_contract = {
      verification: { contract: { selected_checks: ["task_outcome"] } },
    } as TaskData["execution_contract"];
    mocks.hasAcceptedVerificationRecord.mockResolvedValue(false);
    const { assertQualityReviewBeforeFinish } = await import("./finish-blueprint-evidence.js");

    await expect(
      assertQualityReviewBeforeFinish({
        ctx: mkCtx(),
        loadedTasks: [loaded],
        taskCommitInfo: { hash: "impl-sha", message: "feat: implementation" },
        implementationCommitInfo: null,
        execution: mkExecution(),
      }),
    ).rejects.toThrow("finish requires a current verification record");
    const verificationCall = mocks.hasAcceptedVerificationRecord.mock.calls.at(-1)?.[0] as
      | {
          evaluatedSha?: string | null;
          targetContext?: { execution?: TaskExecutionContext };
        }
      | undefined;
    expect(verificationCall?.evaluatedSha).toBe("impl-sha");
    expect(verificationCall?.targetContext?.execution).toEqual(mkExecution());
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

  it("walks through metadata-only reviewed commits to the implementation SHA", async () => {
    const artifactCommit: ResolvedCommitInfo = {
      hash: "review-artifacts-sha",
      message: "🧪 T-1 task: record evaluator evidence",
    };
    mocks.gitRevParse.mockImplementation((_gitRoot: string, args: string[]) => {
      if (args[0] === "metadata-sha^") return Promise.resolve("impl-sha");
      if (args[0] === "impl-sha^") return Promise.resolve("base-sha");
      return Promise.reject(new Error("unexpected ref"));
    });
    mocks.isTaskLocalOnlyAdvance.mockImplementation(
      ({ fromRef, toRef }: { fromRef: string; toRef: string }) =>
        Promise.resolve(
          (fromRef === "metadata-sha" && toRef === "review-artifacts-sha") ||
            (fromRef === "impl-sha" && toRef === "metadata-sha"),
        ),
    );
    mocks.readCommitInfo.mockResolvedValue({
      hash: "impl-sha",
      message: "feat: implement T-1",
    });
    const { resolveImplementationCommitInfo } = await import("./finish-execute-commit.js");

    const resolved = await resolveImplementationCommitInfo({
      ctx: mkCtx(),
      options: { quiet: true } as never,
      loadedTasks: [mkLoadedTask("metadata-sha")],
      taskCommitInfo: artifactCommit,
    });

    expect(mocks.isTaskLocalOnlyAdvance).toHaveBeenNthCalledWith(1, {
      gitRoot: "/repo",
      workflowDir: ".agentplane/tasks",
      taskId: "T-1",
      tasksPath: ".agentplane/tasks.json",
      fromRef: "metadata-sha",
      toRef: "review-artifacts-sha",
    });
    expect(mocks.isTaskLocalOnlyAdvance).toHaveBeenNthCalledWith(2, {
      gitRoot: "/repo",
      workflowDir: ".agentplane/tasks",
      taskId: "T-1",
      tasksPath: ".agentplane/tasks.json",
      fromRef: "impl-sha",
      toRef: "metadata-sha",
    });
    expect(mocks.isTaskLocalOnlyAdvance).toHaveBeenNthCalledWith(3, {
      gitRoot: "/repo",
      workflowDir: ".agentplane/tasks",
      taskId: "T-1",
      tasksPath: ".agentplane/tasks.json",
      fromRef: "base-sha",
      toRef: "impl-sha",
    });
    expect(resolved).toEqual({
      hash: "impl-sha",
      message: "feat: implement T-1",
    });
  });

  it("auto-resolves quality_review.evaluated_sha when existing task commit is task-artifact-only", async () => {
    const loaded = mkLoadedTask();
    loaded.task.commit = {
      hash: "artifact-sha",
      message: "✅ T-1 close: task artifacts",
    };
    mocks.isTaskLocalOnlyAdvance.mockResolvedValue(true);
    mocks.readCommitInfo.mockResolvedValue({ hash: "impl-sha", message: "feat: implement T-1" });
    const { resolveImplementationCommitInfo } = await import("./finish-execute-commit.js");

    const resolved = await resolveImplementationCommitInfo({
      ctx: mkCtx(),
      options: { quiet: true } as never,
      loadedTasks: [loaded],
      taskCommitInfo: null,
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

  it("auto-resolves quality_review.evaluated_sha across linked batch task artifacts", async () => {
    const loaded = mkLoadedTask();
    loaded.task.extensions = {
      branch_pr_batch: {
        role: "primary",
        primary_task_id: "T-1",
        included_task_ids: ["T-2"],
      },
    };
    mocks.isTaskSetLocalOnlyAdvance.mockResolvedValue(true);
    mocks.readCommitInfo.mockResolvedValue({ hash: "impl-sha", message: "feat: implement T-1" });
    const { resolveImplementationCommitInfo } = await import("./finish-execute-commit.js");

    const resolved = await resolveImplementationCommitInfo({
      ctx: mkCtx(),
      options: { quiet: true } as never,
      loadedTasks: [loaded],
      taskCommitInfo: { hash: "artifact-sha", message: "task: record batch evidence" },
    });

    expect(mocks.isTaskSetLocalOnlyAdvance).toHaveBeenCalledWith({
      gitRoot: "/repo",
      workflowDir: ".agentplane/tasks",
      taskIds: ["T-1", "T-2"],
      tasksPath: ".agentplane/tasks.json",
      fromRef: "impl-sha",
      toRef: "artifact-sha",
    });
    expect(mocks.isTaskLocalOnlyAdvance).not.toHaveBeenCalled();
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
