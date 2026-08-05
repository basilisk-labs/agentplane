import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { CommandContext } from "./task-backend.js";

const mocks = vi.hoisted(() => ({
  hasAcceptedVerificationRecord: vi.fn(),
  resolveQualityReviewTargetSha: vi.fn(),
}));

vi.mock("./task-verification-records.js", () => ({
  hasAcceptedVerificationRecord: mocks.hasAcceptedVerificationRecord,
}));
vi.mock("./quality-review-target.js", () => ({
  resolveQualityReviewTargetSha: mocks.resolveQualityReviewTargetSha,
}));

import { hasAcceptedVerificationForCurrentImplementation } from "./route-decision-verification.js";

const reviewedSha = "a".repeat(40);
const mergedPrHead = "b".repeat(40);
const rewrittenBaseHead = "c".repeat(40);
const newerBranchHead = "d".repeat(40);

const task = {
  id: "T-1",
  title: "Merged task",
  description: "Merged verification fixture",
  status: "DONE",
  priority: "high",
  owner: "CODER",
  depends_on: [],
  tags: ["code"],
  verify: ["bun test"],
  verification: { state: "ok" as const },
  quality_review: {
    state: "pass" as const,
    updated_at: "2026-08-02T00:00:00.000Z",
    updated_by: "EVALUATOR",
    provenance: "evaluator_supplied" as const,
    note: "Reviewed pre-merge implementation",
    evaluated_sha: reviewedSha,
    blueprint_digest: null,
    evidence_refs: [".agentplane/tasks/T-1/quality/run/quality-report.json"],
    findings: ["The implementation passed review."],
  },
} satisfies TaskData;

const ctx = {
  resolvedProject: { gitRoot: "/repo" },
  config: { paths: { workflow_dir: ".agentplane/tasks" } },
} as CommandContext;

const resume = {
  task_id: "T-1",
  task_status: "DONE",
  branch: "main",
  base_branch: "main",
  head_sha: rewrittenBaseHead,
  workspace_root: "/repo",
  pr_branch: "task/T-1/merged-task",
  latest_handoff: null,
  runner: {},
} as TaskResumeContext;

function mergedFlow(): PrFlowStatusReport {
  return {
    task: { id: "T-1", status: "DONE", verification: "ok" },
    branch: { name: "task/T-1/merged-task", headSha: null, metaHeadSha: mergedPrHead },
    pr: {
      provider: "github",
      state: "MERGED",
      source: "metadata",
      prNumber: 1,
      prUrl: "https://github.com/example/repo/pull/1",
      base: "main",
      headSha: mergedPrHead,
      mergeCommit: rewrittenBaseHead,
    },
    closeTail: { state: "recorded_on_base", base: "main" },
    hostedChecks: { checked: false, reason: "remote lookup skipped" },
    reviewThreads: { checked: false, reason: "remote lookup skipped" },
    queue: { present: false },
    handoff: { present: false },
    nextAction: "task is complete",
  };
}

beforeEach(() => {
  vi.resetAllMocks();
  mocks.hasAcceptedVerificationRecord.mockResolvedValue(true);
});

describe("route verification target selection", () => {
  it("uses the reviewed pre-rebase target after hosted close rewrites the base history", async () => {
    await expect(
      hasAcceptedVerificationForCurrentImplementation({
        ctx,
        task,
        resume,
        prFlow: mergedFlow(),
        batchOwnership: { role: "none" },
      }),
    ).resolves.toBe(true);

    expect(mocks.resolveQualityReviewTargetSha).not.toHaveBeenCalled();
    expect(mocks.hasAcceptedVerificationRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        evaluatedSha: reviewedSha,
        requireConcreteCheckDetails: true,
        snapshotRef: mergedPrHead,
      }),
    );
  });

  it("keeps the live task-branch head authoritative before merge", async () => {
    const branchHead = newerBranchHead;
    const flow = mergedFlow();
    flow.pr.state = "OPEN";
    flow.branch.headSha = branchHead;
    flow.closeTail = { state: "not_applicable", reason: "implementation PR is open" };
    mocks.resolveQualityReviewTargetSha.mockResolvedValue(branchHead);

    await hasAcceptedVerificationForCurrentImplementation({
      ctx,
      task: { ...task, status: "DOING" },
      resume: { ...resume, task_status: "DOING", head_sha: branchHead },
      prFlow: flow,
      batchOwnership: { role: "none" },
    });

    expect(mocks.resolveQualityReviewTargetSha).toHaveBeenCalledWith(
      expect.objectContaining({ headSha: branchHead }),
    );
    expect(mocks.hasAcceptedVerificationRecord).toHaveBeenCalledWith(
      expect.objectContaining({ requireConcreteCheckDetails: false }),
    );
  });

  it("keeps a surviving task-branch head authoritative after merge", async () => {
    const flow = mergedFlow();
    flow.branch.headSha = newerBranchHead;
    mocks.resolveQualityReviewTargetSha.mockResolvedValue(newerBranchHead);

    await hasAcceptedVerificationForCurrentImplementation({
      ctx,
      task,
      resume,
      prFlow: flow,
      batchOwnership: { role: "none" },
    });

    expect(mocks.resolveQualityReviewTargetSha).toHaveBeenCalledWith(
      expect.objectContaining({ headSha: newerBranchHead }),
    );
    expect(mocks.hasAcceptedVerificationRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        evaluatedSha: newerBranchHead,
        snapshotRef: newerBranchHead,
      }),
    );
  });
});
