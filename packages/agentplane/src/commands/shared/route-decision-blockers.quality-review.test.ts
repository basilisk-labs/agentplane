import { describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchOwnership } from "./route-batch-ownership.js";
import type { CommandContext } from "./task-backend.js";

const mocks = vi.hoisted(() => ({
  readFile: vi.fn(),
  parsePrMeta: vi.fn(),
  assessPreMergeClosureFreshness: vi.fn(),
  resolveQualityReviewTargetSha: vi.fn(),
}));

vi.mock("node:fs/promises", () => ({ readFile: mocks.readFile }));
vi.mock("./pr-meta.js", () => ({
  parsePrMeta: mocks.parsePrMeta,
}));
vi.mock("../task/hosted-close-premerge.js", () => ({
  assessPreMergeClosureFreshness: mocks.assessPreMergeClosureFreshness,
}));
vi.mock("./quality-review-target.js", () => ({
  resolveQualityReviewTargetSha: mocks.resolveQualityReviewTargetSha,
}));

import { deriveBlockers } from "./route-decision-blockers.js";

const reviewedSha = "a".repeat(40);
const headSha = "b".repeat(40);

function reviewedTask(): TaskData {
  return {
    id: "T-1",
    title: "Metadata gate",
    description: "Metadata-only qualification gate",
    status: "DONE",
    priority: "high",
    owner: "TESTER",
    depends_on: [],
    tags: ["quality"],
    verify: [],
    verification: { state: "ok" },
    quality_review: {
      state: "pass",
      updated_at: "2026-07-24T00:00:00.000Z",
      updated_by: "EVALUATOR",
      provenance: "evaluator_supplied",
      note: "Reviewed metadata work unit",
      evaluated_sha: reviewedSha,
      blueprint_digest: null,
      evidence_refs: [".agentplane/tasks/T-1/quality/run/quality-report.json"],
      findings: ["The metadata work unit satisfies the qualification contract."],
    },
  };
}

function openPrFlow(): PrFlowStatusReport {
  return {
    task: { id: "T-1", status: "DONE", verification: "ok" },
    branch: {
      name: "task/T-1/metadata-gate",
      headSha,
      metaHeadSha: headSha,
    },
    pr: {
      provider: "github",
      state: "OPEN",
      source: "lookup",
      prNumber: 101,
      prUrl: "https://github.com/example/repo/pull/101",
      base: "main",
      headSha,
      mergeCommit: null,
    },
    providerObservation: {
      state: "found",
      pr: {
        prNumber: 101,
        prUrl: "https://github.com/example/repo/pull/101",
        status: "OPEN",
        mergedAt: null,
        mergeCommit: null,
        base: "main",
        headSha,
      },
    },
    closeTail: { state: "not_applicable", reason: "implementation PR is open" },
    hostedChecks: { checked: false, reason: "not needed" },
    reviewThreads: { checked: false, reason: "not needed" },
    queue: { present: false },
    handoff: { present: false },
    nextAction: "",
  };
}

const resume = {
  task_id: "T-1",
  task_status: "DONE",
  branch: "task/T-1/metadata-gate",
  base_branch: "main",
  head_sha: headSha,
  workspace_root: "/repo",
  pr_branch: "task/T-1/metadata-gate",
  latest_handoff: null,
  runner: {},
} as TaskResumeContext;

const ctx = {
  resolvedProject: { gitRoot: "/repo" },
  config: {
    paths: {
      workflow_dir: ".agentplane/tasks",
      tasks_path: ".agentplane/tasks.json",
    },
  },
  git: {
    statusStagedPaths: vi.fn().mockResolvedValue([]),
    statusUnstagedTrackedPaths: vi.fn().mockResolvedValue([]),
  },
} as unknown as CommandContext;

async function blockersFor(
  targetSha: string | null,
  batchOwnership?: RouteBatchOwnership,
  prFlow: PrFlowStatusReport = openPrFlow(),
  task: TaskData = reviewedTask(),
) {
  mocks.readFile.mockResolvedValue("{}");
  mocks.parsePrMeta.mockReturnValue({});
  mocks.assessPreMergeClosureFreshness.mockResolvedValue({
    fresh: true,
    basisCommit: headSha,
  });
  mocks.resolveQualityReviewTargetSha.mockResolvedValue(targetSha);

  return deriveBlockers({
    ctx,
    task,
    resume,
    workflowMode: "branch_pr",
    prFlow,
    batchOwnership: batchOwnership ?? { role: "none" },
    cleanupProbe: { state: "not_requested" },
    taskWorktreeCleanliness: {
      state: "clean",
      branch: "task/T-1/metadata-gate",
      worktreePath: "/repo/.agentplane/worktrees/T-1",
      changedPaths: [],
    },
  });
}

function reworkTask(verificationUpdatedAt: string): TaskData {
  const task = reviewedTask();
  task.status = "DOING";
  task.verification = {
    state: "ok",
    updated_at: verificationUpdatedAt,
    updated_by: "TESTER",
    note: "Rework verification",
  };
  task.quality_review = {
    ...task.quality_review!,
    state: "rework",
    updated_at: "2026-07-24T00:00:00.000Z",
    note: "Evidence rework required",
  };
  return task;
}

function verificationReworkTask(withNewImplementation: boolean): TaskData {
  const task = reviewedTask();
  task.status = "DOING";
  task.verification = {
    state: "needs_rework",
    updated_at: "2026-07-24T00:00:00.000Z",
    updated_by: "SUPERVISOR",
    note: "Declared verification failed.",
  };
  task.quality_review = undefined;
  if (withNewImplementation) {
    task.commit = { hash: headSha, message: "fix: address verification rework" };
    task.events = [
      {
        type: "status",
        at: "2026-07-24T00:00:01.000Z",
        author: "SUPERVISOR",
        commit: headSha,
        from: "DOING",
        to: "DOING",
        note: "Implementation committed after verification rework.",
      },
    ];
  }
  return task;
}

describe("DOING route quality rework", () => {
  it("keeps fresh evaluator rework blocking until a newer verification exists", async () => {
    const blockers = await blockersFor(
      reviewedSha,
      undefined,
      openPrFlow(),
      reworkTask("2026-07-23T23:59:59.000Z"),
    );

    expect(blockers).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "implementation_rework_required" })]),
    );
  });

  it("refreshes newer verification evidence before returning to the quality-review gate", async () => {
    const blockers = await blockersFor(
      reviewedSha,
      undefined,
      openPrFlow(),
      reworkTask("2026-07-24T00:00:01.000Z"),
    );

    expect(blockers).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "implementation_rework_required" })]),
    );
    expect(blockers).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "verification_required" })]),
    );
    expect(blockers).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "quality_review_stale" })]),
    );
  });
});

describe("DOING route verification rework", () => {
  it("keeps rework semantic while no newer implementation is recorded", async () => {
    const blockers = await blockersFor(
      headSha,
      undefined,
      openPrFlow(),
      verificationReworkTask(false),
    );

    expect(blockers).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "implementation_rework_required" })]),
    );
  });

  it("ignores an unrelated later DOING event for the failed implementation commit", async () => {
    const task = verificationReworkTask(false);
    task.commit = { hash: headSha, message: "fix: failed implementation" };
    task.events = [
      {
        type: "status",
        at: "2026-07-24T00:00:01.000Z",
        author: "SUPERVISOR",
        from: "DOING",
        to: "DOING",
        note: "Unrelated task-state refresh.",
      },
    ];

    const blockers = await blockersFor(headSha, undefined, openPrFlow(), task);

    expect(blockers).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "implementation_rework_required" })]),
    );
  });

  it("moves a newer implementation to deterministic verification", async () => {
    const blockers = await blockersFor(
      headSha,
      undefined,
      openPrFlow(),
      verificationReworkTask(true),
    );

    expect(blockers).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "implementation_rework_required" })]),
    );
    expect(blockers).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "verification_required" })]),
    );
  });
});

describe("DONE route quality-review target", () => {
  it("keeps a reviewed metadata target fresh across managed closure artifacts", async () => {
    await expect(blockersFor(reviewedSha)).resolves.not.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "quality_review_stale" })]),
    );
  });

  it("blocks enqueue when the shared resolver selects a newer work unit", async () => {
    await expect(blockersFor(headSha)).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "quality_review_stale" })]),
    );
  });

  it("fails closed when the shared resolver finds no current-task target", async () => {
    await expect(blockersFor(null)).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "quality_review_stale" })]),
    );
  });

  it("uses the same task-set resolver contract for primary batches", async () => {
    const batchOwnership: RouteBatchOwnership = {
      role: "primary",
      primaryTaskId: "T-1",
      includedTaskIds: ["T-2"],
      allTaskIds: ["T-1", "T-2"],
      branch: "task/T-1/metadata-gate",
      taskStates: [],
      nextOwnerAction: {
        code: "continue_primary_batch",
        command: null,
        summary: "continue primary batch",
        requiresApproval: false,
      },
    };

    await expect(blockersFor(headSha, batchOwnership)).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "quality_review_stale" })]),
    );
    expect(mocks.resolveQualityReviewTargetSha).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        taskIds: ["T-1", "T-2"],
      }),
    );
  });

  it("routes current hosted check failures on a DONE open PR back to implementation rework", async () => {
    const failingPrFlow = openPrFlow();
    failingPrFlow.publication = {
      state: "aligned",
      localHeadSha: headSha,
      upstreamRef: "origin/task/T-1/metadata-gate",
      upstreamHeadSha: headSha,
      hostedHeadSha: headSha,
    };
    failingPrFlow.hostedChecks = {
      checked: true,
      total: 2,
      pending: 0,
      failing: 1,
      passing: 1,
      missingRequired: [],
      rows: [{ name: "verify-contract", state: "FAILURE" }],
    };

    await expect(blockersFor(reviewedSha, undefined, failingPrFlow)).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "implementation_rework_required" })]),
    );
  });

  it("keeps a newer unpublished head publishable despite stale failed hosted checks", async () => {
    const providerHeadSha = "c".repeat(40);
    const staleFailingPrFlow = openPrFlow();
    staleFailingPrFlow.pr.headSha = providerHeadSha;
    staleFailingPrFlow.publication = {
      state: "unpublished",
      reason: "upstream_head_mismatch",
      localHeadSha: headSha,
      upstreamRef: "origin/task/T-1/metadata-gate",
      upstreamHeadSha: providerHeadSha,
      hostedHeadSha: providerHeadSha,
    };
    staleFailingPrFlow.hostedChecks = {
      checked: true,
      total: 1,
      pending: 0,
      failing: 1,
      passing: 0,
      missingRequired: [],
      rows: [{ name: "verify-contract", state: "FAILURE" }],
    };

    const blockers = await blockersFor(reviewedSha, undefined, staleFailingPrFlow);

    expect(blockers).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "pr_head_unpublished" })]),
    );
    expect(blockers).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "implementation_rework_required" })]),
    );
  });
});
