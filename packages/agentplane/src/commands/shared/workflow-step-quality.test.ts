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

function taskCentricExtensions(workItemState: "READY" | "REWORK_READY" | "COMPLETED") {
  const digest = `sha256:${"a".repeat(64)}`;
  return {
    "agentplane.task_centric": {
      schema_version: 1,
      id: task.id,
      revision: 4,
      intent: {
        task_id: task.id,
        request: task.description,
        constraints: [],
        acceptance_criteria: [],
        captured_at: "2026-07-25T00:00:00.000Z",
      },
      lifecycle: "ACTIVE",
      current_plan: {
        schema_version: 1,
        task_id: task.id,
        revision: 1,
        digest,
        proposal: {
          work_items: {
            work_items: [{ id: "required-route-fix", optional: false }],
          },
        },
        approval: { state: "approved" },
        created_at: "2026-07-25T00:00:00.000Z",
      },
      work_items: {
        "required-route-fix": {
          id: "required-route-fix",
          state: workItemState,
          revision: 1,
          attempt: workItemState === "READY" ? 0 : 1,
          claim_id: null,
          output_manifests: [],
          validation_result: null,
          last_failure: null,
        },
      },
      final_validation: null,
      event_cursor: 1,
      updated_at: "2026-07-25T00:00:00.000Z",
    },
  };
}

describe("quality evidence refresh route", () => {
  it("returns to required WorkItem execution before downstream closeout", () => {
    const verifiedTask = {
      ...task,
      commit: { hash: resume.head_sha, message: "feat: stale implementation evidence" },
      verification: { state: "ok" as const, updated_at: "2026-07-25T00:10:00.000Z" },
      quality_review: {
        state: "pass" as const,
        reviewed_by: "EVALUATOR",
        reviewed_at: "2026-07-25T00:11:00.000Z",
        summary: "The previously observed implementation passed review.",
        evidence_refs: ["quality-report.json"],
      },
    };
    const incomplete = reduceRouteState(
      routeState({
        task: { ...verifiedTask, extensions: taskCentricExtensions("REWORK_READY") },
        blockers: [{ code: "pre_merge_closure_missing", summary: "closure is pending" }],
      }),
    );
    expect(incomplete).toMatchObject({
      kind: "agent_episode",
      phase: "branch_implementation",
      episode: { purpose: "implementation", role: "CODER" },
    });

    const completed = reduceRouteState(
      routeState({
        task: { ...verifiedTask, extensions: taskCentricExtensions("COMPLETED") },
        blockers: [{ code: "pre_merge_closure_missing", summary: "closure is pending" }],
      }),
    );
    expect(completed).toMatchObject({
      kind: "approval",
      phase: "side_effect_authority_required",
      request: { type: "side_effect" },
    });
  });

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

  it("compares evidence freshness by instant instead of timestamp spelling", () => {
    const step = reduceRouteState(
      routeState({
        task: {
          ...task,
          verification: { state: "ok", updated_at: "2026-07-29T15:00:00.000+02:00" },
          quality_review: {
            ...deterministicEvidenceGapReview(),
            updated_at: "2026-07-29T14:00:00.000Z",
          },
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
    });
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

  it("routes an unclassified semantic EVALUATOR block to implementation rework", () => {
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
          {
            code: "implementation_rework_required",
            summary: "blocked review requires repository rework",
          },
        ],
      }),
    );

    expect(step).toMatchObject({
      kind: "agent_episode",
      phase: "implementation_rework_required",
      episode: { purpose: "implementation_rework", role: "CODER" },
    });
  });

  it("routes a direct blocked review to implementation rework without another evaluator episode", () => {
    const step = reduceRouteState(
      routeState({
        workflowMode: "direct",
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
        blockers: [],
      }),
    );

    expect(step).toMatchObject({
      kind: "agent_episode",
      phase: "implementation_rework_required",
      authoritativeCheckout: "current_checkout",
      execution: { semanticMutationAllowed: true },
      episode: { purpose: "implementation_rework", role: "CODER" },
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
