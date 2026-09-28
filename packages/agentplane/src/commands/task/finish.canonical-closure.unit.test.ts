import { defaultConfig } from "@agentplaneorg/core/config";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";

const mocks = vi.hoisted(() => ({
  loadFinishTasks: vi.fn(),
  assertQualityReviewBeforeFinish: vi.fn(),
  writeFinishedTasks: vi.fn(),
}));
vi.mock("./finish-quality-evidence.js", () => ({
  assertNativeTaskIdentityBeforeFinish: vi.fn(),
  assertQualityReviewBeforeFinish: mocks.assertQualityReviewBeforeFinish,
}));
vi.mock("./finish-execute-load.js", () => ({
  loadFinishTasks: mocks.loadFinishTasks,
  collectIncidentsForLoadedTasks: vi.fn().mockResolvedValue({ plans: [], registryPaths: [] }),
}));
vi.mock("./finish-shared.js", () => ({
  existingCommitInfo: vi.fn(() => ({ hash: "a".repeat(40), message: "implementation" })),
  loadTaskForFinish: vi.fn(),
  refreshAcrArtifactsForFinishedTasks: vi.fn(),
  writeFinishedTasks: mocks.writeFinishedTasks,
}));
vi.mock("./finish-close.js", () => ({
  clearDirectWorkLockIfMatches: vi.fn(),
  resolveBranchPrCloseTailState: vi.fn(),
}));
vi.mock("./finish-execute-commit.js", () => ({
  resolveTaskCommitInfo: vi.fn().mockResolvedValue({ hash: "c".repeat(40), message: "evidence" }),
  resolveImplementationCommitInfo: vi
    .fn()
    .mockResolvedValue({ hash: "b".repeat(40), message: "repair" }),
}));
vi.mock("./finish-execute-close.js", () => ({
  assertCloseCommitCanMutateTaskState: vi.fn(),
  finalizeCloseTail: vi.fn(),
}));
vi.mock("./finish-closeout-journal.js", () => ({
  openFinishCloseoutJournal: vi.fn().mockResolvedValue({
    path: "/journal",
    journal: { state: "prepared" },
  }),
  advanceFinishCloseoutJournal: vi.fn(({ state }: { state: string }) => Promise.resolve({ state })),
  markFinishCloseoutRecoveryRequired: vi.fn().mockResolvedValue(undefined),
}));

function fixture() {
  const record = {
    kind: "canonical_task",
    aggregate: {
      state: "COMPLETED",
      final_validation: { status: "PASSED", evidence_digests: [k.kernelDigest("final")] },
    },
  };
  const projection = {
    source: "task_kernel",
    implementation_commit: "a".repeat(40),
    review_identity_digest: k.kernelDigest("original-review"),
    evidence_refs: ["original-quality.json"],
    findings: ["original implementation reviewed"],
  };
  const task = {
    id: "TASK-1",
    status: "DONE",
    plan_approval: { state: "approved" },
    verification: { state: "ok" },
    commit: { hash: "a".repeat(40), message: "implementation" },
    quality_review: {
      state: "pass",
      provenance: "evaluator_supplied",
      evaluated_sha: "b".repeat(40),
      review_identity_digest: k.kernelDigest("current-review"),
    },
    extensions: {
      task_kernel: { ...record, digest: k.kernelDigest(record) },
      "agentplane.kernel_operational_projection": {
        ...projection,
        digest: k.kernelDigest(projection),
      },
    },
  } as TaskData;
  const ctx = { config: { ...defaultConfig(), workflow_mode: "branch_pr" } } as CommandContext;
  const options = {
    taskIds: [task.id],
    author: "CODER",
    quiet: true,
    force: true,
    commit: "c".repeat(40),
    preMergeClosure: true,
  } as FinishOptions;
  const plan = {
    primaryTaskId: task.id,
    metaTaskId: task.id,
    preMergeClosure: true,
    shouldCloseCommit: true,
    closeAdditionalTaskIds: [],
  } as unknown as FinishExecutionPlan;
  mocks.loadFinishTasks.mockResolvedValue({ loadedTasks: [{ taskId: task.id, task }] });
  return { task, ctx, options, plan };
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.assertQualityReviewBeforeFinish.mockReset().mockResolvedValue(undefined);
});

describe("canonical pre-merge closure after qualified repairs", () => {
  it("preserves completed Kernel state after fresh verification and independent review", async () => {
    const f = fixture();
    const { executeFinishPlan } = await import("./finish-execute.js");
    await expect(executeFinishPlan(f)).resolves.toBe(0);
    expect(mocks.writeFinishedTasks).toHaveBeenCalledWith(
      expect.objectContaining({ allowCanonicalProjection: true }),
    );
    expect(mocks.assertQualityReviewBeforeFinish.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.writeFinishedTasks.mock.invocationCallOrder[0]!,
    );
  });

  it("does not write closure when current verification or review is rejected", async () => {
    const f = fixture();
    mocks.assertQualityReviewBeforeFinish.mockRejectedValue(new Error("current evidence missing"));
    const { executeFinishPlan } = await import("./finish-execute.js");
    await expect(executeFinishPlan(f)).rejects.toThrow("current evidence missing");
    expect(mocks.writeFinishedTasks).not.toHaveBeenCalled();
  });

  it("does not authorize a non-pre-merge lifecycle mutation", async () => {
    const f = fixture();
    f.plan.preMergeClosure = false;
    f.plan.shouldCloseCommit = false;
    const { executeFinishPlan } = await import("./finish-execute.js");
    await executeFinishPlan(f);
    expect(mocks.writeFinishedTasks).toHaveBeenCalledWith(
      expect.objectContaining({ allowCanonicalProjection: false }),
    );
  });

  it.each(["ACTIVE", "failed-validation", "missing-evidence", "tampered-digest"])(
    "does not authorize the repair closure for %s",
    async (scenario) => {
      const f = fixture();
      const record = f.task.extensions!.task_kernel as {
        kind: string;
        digest: string;
        aggregate: {
          state: string;
          final_validation: { status: string; evidence_digests: string[] };
        };
      };
      if (scenario === "ACTIVE") record.aggregate.state = "ACTIVE";
      if (scenario === "failed-validation") record.aggregate.final_validation.status = "FAILED";
      if (scenario === "missing-evidence") record.aggregate.final_validation.evidence_digests = [];
      if (scenario === "tampered-digest") {
        record.digest = k.kernelDigest("tampered");
      } else {
        record.digest = k.kernelDigest({ kind: record.kind, aggregate: record.aggregate });
      }
      const { executeFinishPlan } = await import("./finish-execute.js");
      await executeFinishPlan(f);
      expect(mocks.writeFinishedTasks).toHaveBeenCalledWith(
        expect.objectContaining({ allowCanonicalProjection: false }),
      );
    },
  );
});
