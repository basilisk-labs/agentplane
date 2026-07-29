import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { WorkflowRouteState } from "./workflow-step.js";
import { reduceRouteState } from "./workflow-step-reducer.js";
import {
  withBootstrapWorkflowFingerprint,
  type WorkflowRouteStateInput,
} from "./workflow-step-fingerprint.js";

const task = {
  id: "202607250100-QUALITY",
  title: "Quality route fixture",
  description: "Exercise quality evidence refresh.",
  status: "DOING",
  priority: "high",
  owner: "CODER",
  revision: 7,
  depends_on: [],
  tags: ["code"],
  verify: ["bun test"],
  plan_approval: {
    state: "approved",
    approved_by: "ORCHESTRATOR",
    approved_at: "2026-07-25T00:00:00.000Z",
  },
  verification: { state: "pending" },
} satisfies TaskData;

const resume = {
  task_id: task.id,
  task_status: task.status,
  branch: `task/${task.id}/quality-route-fixture`,
  base_branch: "main",
  head_sha: "1111111111111111111111111111111111111111",
  workspace_root: `/repo/.agentplane/worktrees/${task.id}`,
  pr_branch: `task/${task.id}/quality-route-fixture`,
  latest_handoff: null,
  runner: {
    run_id: null,
    status: null,
    heartbeat_at: null,
    state_path: null,
    trace_path: null,
    next_action: "run",
    next_command: `agentplane task run ${task.id}`,
    resume_command: `agentplane task run ${task.id}`,
    retry_command: null,
  },
} satisfies TaskResumeContext;

function openPrFlow(): PrFlowStatusReport {
  return {
    task: { id: task.id, status: task.status, verification: "pending" },
    branch: { name: resume.pr_branch, headSha: resume.head_sha, metaHeadSha: resume.head_sha },
    pr: {
      provider: "github",
      state: "OPEN",
      source: "lookup",
      prNumber: 4612,
      prUrl: "https://github.com/basilisk-labs/agentplane/pull/4612",
      base: "main",
      headSha: resume.head_sha,
      mergeCommit: null,
    },
    closeTail: { state: "not_applicable", reason: "implementation PR is not merged" },
    hostedChecks: { checked: false, reason: "not requested" },
    reviewThreads: { checked: false, reason: "not requested" },
    queue: { present: false },
    handoff: { present: false },
    nextAction: "",
  };
}

function routeState(overrides: Partial<WorkflowRouteState> = {}): WorkflowRouteState {
  const base: WorkflowRouteStateInput = {
    task,
    resume,
    workflowMode: "branch_pr",
    prFlow: openPrFlow(),
    cleanupProbe: { state: "not_requested" },
    blockers: [],
    batchOwnership: { role: "none" },
    taskWorktree: {
      state: "clean",
      branch: resume.pr_branch ?? "",
      worktreePath: resume.workspace_root,
      changedPaths: [],
    },
  };
  const { preconditionFingerprint, ...stateOverrides } = overrides;
  return {
    ...withBootstrapWorkflowFingerprint({ ...base, ...stateOverrides }),
    ...(preconditionFingerprint ? { preconditionFingerprint } : {}),
  };
}

function deterministicEvidenceGapReview(evaluatedSha = resume.head_sha) {
  return {
    state: "blocked",
    provenance: "evaluator_supplied",
    updated_at: "2026-07-29T14:40:56.727Z",
    updated_by: "EVALUATOR",
    note: "Frozen verification evidence is missing.",
    evaluated_sha: evaluatedSha,
    blueprint_digest: "fixture-blueprint",
    evidence_refs: [".agentplane/tasks/T-1/quality/current/quality-report.json"],
    findings: ["Frozen deterministic verification evidence is missing."],
    recovery_reason: "deterministic_evidence_gap",
  } satisfies NonNullable<TaskData["quality_review"]>;
}

describe("quality evidence refresh route", () => {
  it("refreshes deterministic evidence after a current EVALUATOR block without changing implementation", () => {
    const step = reduceRouteState(
      routeState({
        task: {
          ...task,
          verification: { state: "ok", updated_at: "2026-07-29T14:40:00.000Z" },
          quality_review: deterministicEvidenceGapReview(),
        },
        qualityReviewTargetSha: resume.head_sha,
        blockers: [
          { code: "quality_review_stale", summary: "quality review requires frozen evidence" },
        ],
      }),
    );

    expect(step).toMatchObject({
      kind: "agent_episode",
      phase: "quality_evidence_refresh_needed",
      episode: { purpose: "verification", role: "TESTER" },
      selectedBlocker: { code: "quality_review_stale" },
      execution: {
        semanticMutationAllowed: false,
        evidenceMissing: ["fresh_verification_record", "fresh_evaluator_quality_review"],
      },
    });
    expect(step.compatibility.command).toBeNull();
  });

  it("refreshes deterministic evidence when later commits contain only task artifacts", () => {
    const semanticSha = "2222222222222222222222222222222222222222";
    const artifactSha = "3333333333333333333333333333333333333333";
    const openPr = openPrFlow();
    const step = reduceRouteState(
      routeState({
        task: {
          ...task,
          verification: { state: "ok", updated_at: "2026-07-29T14:40:00.000Z" },
          quality_review: deterministicEvidenceGapReview(semanticSha),
        },
        resume: { ...resume, head_sha: artifactSha },
        prFlow: { ...openPr, branch: { ...openPr.branch, headSha: artifactSha } },
        qualityReviewTargetSha: semanticSha,
        blockers: [
          { code: "quality_review_stale", summary: "quality review requires frozen evidence" },
        ],
      }),
    );

    expect(step).toMatchObject({
      kind: "agent_episode",
      phase: "quality_evidence_refresh_needed",
      episode: { purpose: "verification", role: "TESTER" },
    });
  });

  it("does not refresh an unclassified semantic EVALUATOR block even when its evidence is current", () => {
    const step = reduceRouteState(
      routeState({
        task: {
          ...task,
          verification: { state: "ok", updated_at: "2026-07-29T14:40:00.000Z" },
          quality_review: {
            ...deterministicEvidenceGapReview(),
            note: "The implementation violates the task invariant.",
            findings: ["The implementation violates the task invariant."],
            recovery_reason: undefined,
          },
        },
        blockers: [
          { code: "quality_review_stale", summary: "quality review requires frozen evidence" },
        ],
      }),
    );

    expect(step).toMatchObject({
      kind: "agent_episode",
      phase: "quality_review_needed",
      episode: { purpose: "quality_review", role: "EVALUATOR" },
    });
  });

  it("returns a deterministic evidence block to EVALUATOR after TESTER refreshes verification", () => {
    const step = reduceRouteState(
      routeState({
        task: {
          ...task,
          verification: { state: "ok", updated_at: "2026-07-29T14:41:00.000Z" },
          quality_review: deterministicEvidenceGapReview(),
        },
        blockers: [
          { code: "quality_review_stale", summary: "quality review requires frozen evidence" },
        ],
      }),
    );

    expect(step).toMatchObject({
      kind: "agent_episode",
      phase: "quality_review_needed",
      episode: { purpose: "quality_review", role: "EVALUATOR" },
    });
  });
});
