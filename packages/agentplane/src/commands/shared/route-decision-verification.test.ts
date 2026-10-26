import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

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
  it("requires every retained hosted job after a timing exception on a merged PR", async () => {
    const fingerprint = k.kernelDigest("implementation");
    const planDigest = k.kernelDigest("plan");
    const failureDigest = k.kernelDigest("failure");
    const validation = {
      status: "FAILED",
      identity: {
        implementation_identity: fingerprint,
        command_digest: k.kernelDigest("commands"),
        environment_digest: k.kernelDigest("environment"),
      },
      evidence_digests: [failureDigest],
    };
    const aggregate = {
      id: "T-1",
      state: "COMPLETED",
      current_plan: { state: "APPROVED", revision: 1, digest: planDigest, work_items: [] },
      work_items: {},
      effects: [],
      final_validation: validation,
      final_timing_exception: {
        schema_version: 1,
        kind: "timing_only",
        task_id: "T-1",
        plan_revision: 1,
        plan_digest: planDigest,
        validation_digest: k.kernelDigest(validation),
        failed_check_id: "full-suite",
        failure_evidence_digest: failureDigest,
        implementation_identity: fingerprint,
        acceptance_fingerprint: fingerprint,
        command_digest: validation.identity.command_digest,
        environment_digest: validation.identity.environment_digest,
        budget_ms: 1_440_000,
        duration_ms: 1_463_240,
        max_overage_ms: 30_000,
        hosted_head_sha: mergedPrHead,
        hosted_required_checks: ["unit", "lint"],
        hosted_evidence_digest: k.kernelDigest("hosted"),
        approval_evidence_digest: k.kernelDigest("manual"),
        approval_mode: "manual_operator",
        approval_actor_id: "USER",
        approved_by: "USER",
        accepted_at: "2026-10-24T00:00:00.000Z",
      },
    };
    const contents = { kind: "canonical_task", aggregate };
    const acceptedTask = {
      ...task,
      verification: { state: "accepted_timing_exception" },
      quality_review: { ...task.quality_review, evaluated_sha: mergedPrHead },
      extensions: { task_kernel: { ...contents, digest: k.kernelDigest(contents) } },
    } as TaskData;
    const flow = mergedFlow();
    flow.hostedChecks = {
      checked: true,
      total: 1,
      passing: 1,
      pending: 0,
      failing: 0,
      missingRequired: [],
      rows: [{ name: "unit", state: "SUCCESS" }],
    };
    await expect(
      hasAcceptedVerificationForCurrentImplementation({
        ctx,
        task: acceptedTask,
        resume,
        prFlow: flow,
        batchOwnership: { role: "none" },
      }),
    ).resolves.toBe(false);
    flow.hostedChecks = {
      checked: true,
      total: 2,
      passing: 2,
      pending: 0,
      failing: 0,
      missingRequired: [],
      rows: [
        { name: "unit", state: "SUCCESS" },
        { name: "lint", state: "SUCCESS" },
      ],
    };
    await expect(
      hasAcceptedVerificationForCurrentImplementation({
        ctx,
        task: acceptedTask,
        resume,
        prFlow: flow,
        batchOwnership: { role: "none" },
      }),
    ).resolves.toBe(true);
    flow.hostedChecks = {
      ...flow.hostedChecks,
      total: 3,
      passing: 3,
      rows: [...flow.hostedChecks.rows, { name: "optional", state: "SKIPPED" }],
    };
    await expect(
      hasAcceptedVerificationForCurrentImplementation({
        ctx,
        task: acceptedTask,
        resume,
        prFlow: flow,
        batchOwnership: { role: "none" },
      }),
    ).resolves.toBe(false);
  });
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

  it("passes a metadata-only null target to verification-record matching", async () => {
    const flow = mergedFlow();
    flow.pr.state = "OPEN";
    flow.branch.headSha = newerBranchHead;
    flow.closeTail = { state: "not_applicable", reason: "implementation PR is open" };
    mocks.resolveQualityReviewTargetSha.mockResolvedValue(null);

    await expect(
      hasAcceptedVerificationForCurrentImplementation({
        ctx,
        task,
        resume,
        prFlow: flow,
        batchOwnership: { role: "none" },
      }),
    ).resolves.toBe(true);

    expect(mocks.hasAcceptedVerificationRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        evaluatedSha: null,
        requireConcreteCheckDetails: true,
        snapshotRef: newerBranchHead,
      }),
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
