import { describe, expect, it } from "vitest";
import { buildStateFingerprint } from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import type { WorkflowRouteState } from "./workflow-step.js";
import { hasCanonicalPreMergeEvidence } from "./route-decision-blockers.js";
import { reduceRouteState } from "./workflow-step-reducer.js";

function canonicalTask(): TaskData {
  const verificationEvidence = k.kernelDigest("verification");
  const reviewIdentity = k.kernelDigest("review");
  const implementationCommit = "a".repeat(40);
  const aggregate = {
    final_validation: {
      status: "PASSED",
      evidence_digests: [verificationEvidence],
    },
  };
  const recordContents = {
    kind: "canonical_task",
    aggregate,
  };
  const projectionContents = {
    schema_version: 1,
    source: "task_kernel",
    implementation_commit: implementationCommit,
    verification_evidence_digest: verificationEvidence,
    review_identity_digest: reviewIdentity,
    evidence_refs: ["quality-report.json"],
    findings: ["reviewed"],
  };
  return {
    commit: { hash: implementationCommit, message: "canonical implementation" },
    quality_review: {
      state: "pass",
      provenance: "evaluator_supplied",
      evaluated_sha: implementationCommit,
      review_identity_digest: reviewIdentity,
    },
    extensions: {
      task_kernel: { ...recordContents, digest: k.kernelDigest(recordContents) },
      "agentplane.kernel_operational_projection": {
        ...projectionContents,
        digest: k.kernelDigest(projectionContents),
      },
    },
  } as TaskData;
}

describe("canonical pre-merge evidence", () => {
  it("uses passed Kernel final validation plus its immutable operational projection", () => {
    expect(hasCanonicalPreMergeEvidence(canonicalTask())).toBe(true);
  });

  it("keeps canonical evidence current after a task-artifact closure commit", () => {
    const task = canonicalTask() as {
      commit: { hash: string };
      extensions: Record<string, unknown>;
    };
    const implementationCommit = task.commit.hash;
    task.commit.hash = "b".repeat(40);
    task.extensions.implementation_commit = {
      hash: implementationCommit,
      message: "canonical implementation",
    };

    expect(hasCanonicalPreMergeEvidence(task as never)).toBe(true);
  });

  it("accepts final validation evidence independently of the projection digest", () => {
    const task = canonicalTask() as {
      extensions: {
        task_kernel: {
          kind: string;
          digest: string;
          aggregate: { final_validation: { evidence_digests: string[] } };
        };
      };
    };
    const kernel = task.extensions.task_kernel;
    kernel.aggregate.final_validation.evidence_digests = [
      k.kernelDigest("final-validation-receipt"),
    ];
    kernel.digest = k.kernelDigest({ kind: kernel.kind, aggregate: kernel.aggregate });

    expect(hasCanonicalPreMergeEvidence(task as never)).toBe(true);
  });

  it("rejects passed final validation without immutable evidence", () => {
    const task = canonicalTask() as {
      extensions: {
        task_kernel: {
          kind: string;
          digest: string;
          aggregate: { final_validation: { evidence_digests: string[] } };
        };
      };
    };
    const kernel = task.extensions.task_kernel;
    kernel.aggregate.final_validation.evidence_digests = [];
    kernel.digest = k.kernelDigest({ kind: kernel.kind, aggregate: kernel.aggregate });

    expect(hasCanonicalPreMergeEvidence(task as never)).toBe(false);
  });

  it("routes canonical pre-merge evidence before stale compatibility planning state", () => {
    const task = {
      ...canonicalTask(),
      id: "202609210000-CANON1",
      title: "Canonical closeout",
      description: "Route immutable Kernel evidence to branch closeout.",
      status: "DOING",
      priority: "high",
      owner: "CODER",
      depends_on: [],
      tags: [],
      verify: [],
      plan_approval: { state: "pending" },
      verification: { state: "ok" },
      doc: "## Plan\n\nPLANNER semantic plan required. Replace this placeholder.\n",
    };
    const branch = `task/${task.id}/canonical-closeout`;
    const component = {
      state: "present" as const,
      source: "canonical_pre_merge_test",
      value: { task_id: task.id },
    };
    const fingerprint = buildStateFingerprint({
      task_id: task.id,
      task_revision: 1,
      git_head: task.commit.hash,
      worktree: `/repo/.agentplane/worktrees/${task.id}`,
      components: {
        task: component,
        git: component,
        backend_projection: component,
        plan: component,
        policy: component,
        capability: component,
        knowledge: component,
        provider: component,
        authority: component,
      },
    });
    const state = {
      task: task as never,
      resume: {
        task_id: task.id,
        task_status: task.status,
        branch,
        base_branch: "main",
        head_sha: task.commit.hash,
        workspace_root: `/repo/.agentplane/worktrees/${task.id}`,
        pr_branch: branch,
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
      },
      workflowMode: "branch_pr",
      prFlow: {
        task: { id: task.id, status: task.status, verification: "ok" },
        branch: { name: branch, headSha: task.commit.hash, metaHeadSha: null },
        pr: { provider: "github", state: "not_found", source: "metadata" },
        closeTail: { state: "not_applicable", reason: "implementation PR is not linked yet" },
        hostedChecks: { checked: false, reason: "not requested" },
        reviewThreads: { checked: false, reason: "not requested" },
        queue: { present: false },
        handoff: { present: false },
        nextAction: "open PR",
      },
      cleanupProbe: { state: "not_requested" },
      blockers: [{ code: "remote_pr_missing", summary: "task branch is not linked" }],
      batchOwnership: { role: "none" },
      taskWorktree: {
        state: "clean",
        branch,
        worktreePath: `/repo/.agentplane/worktrees/${task.id}`,
        changedPaths: [],
      },
      preconditionFingerprint: fingerprint,
    } as WorkflowRouteState;

    expect(reduceRouteState(state)).toMatchObject({
      kind: "approval",
      phase: "side_effect_authority_required",
      request: { type: "side_effect", operationId: "pr.open" },
    });
  });

  it("fails closed after either projection is changed", () => {
    const task = canonicalTask() as {
      extensions: {
        task_kernel: { aggregate: { final_validation: { status: string } } };
      };
    };
    task.extensions.task_kernel.aggregate.final_validation.status = "FAILED";
    expect(hasCanonicalPreMergeEvidence(task as never)).toBe(false);

    const projectionTampered = canonicalTask() as {
      extensions: { "agentplane.kernel_operational_projection": { findings: string[] } };
    };
    projectionTampered.extensions["agentplane.kernel_operational_projection"].findings = [];
    expect(hasCanonicalPreMergeEvidence(projectionTampered as never)).toBe(false);
  });
});
