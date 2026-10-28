import { describe, expect, it } from "vitest";
import { taskKernel } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import { withBootstrapWorkflowFingerprint } from "./workflow-step-fingerprint.js";
import { reduceRouteState } from "./workflow-step-reducer.js";
import { withNativeIdentity } from "./workflow-step.testkit.js";
import {
  createSideEffectAuthorityRecord,
  withSideEffectAuthorityState,
} from "./side-effect-authority.js";

const head = "a".repeat(40);
const base = "b".repeat(40);
const ordinaryTask = withNativeIdentity(
  {
    id: "202610270555-MY0JZE",
    title: "Adopt a hosted PR",
    description: "Use an existing hosted PR",
    status: "DOING",
    priority: "high",
    owner: "CODER",
    revision: 3,
    depends_on: [],
    tags: ["code"],
    verify: ["bun test"],
    plan_approval: { state: "approved", approved_by: "USER", approved_at: "2026-10-27T00:00:00Z" },
    verification: { state: "ok" },
    quality_review: {
      state: "pass",
      updated_by: "EVALUATOR",
      provenance: "evaluator_supplied",
      evaluated_sha: head,
      findings: ["Exact PR reviewed"],
      evidence_refs: [".agentplane/tasks/202610270555-MY0JZE/quality-report.json"],
    },
  } as TaskData,
  "COMPLETED",
);
const hostedDigest = `sha256:${"9".repeat(64)}`;
const reviewIdentity = `sha256:${"8".repeat(64)}`;
const canonical = {
  kind: "canonical_task",
  aggregate: {
    state: "COMPLETED",
    work_items: {
      W1: {
        state: "COMPLETED",
        validation: {
          status: "PASSED",
          identity: { hosted_head_evidence_digest: hostedDigest },
        },
      },
    },
    final_validation: {
      status: "PASSED",
      identity: { hosted_head_evidence_digest: hostedDigest },
      evidence_digests: [hostedDigest],
    },
  },
};
const projection = {
  source: "task_kernel",
  implementation_commit: head,
  implementation_tree: "7".repeat(40),
  review_identity_digest: reviewIdentity,
  evidence_refs: ["exact-head-native-validation"],
  findings: ["Reviewed exact hosted head"],
};
const task = {
  ...ordinaryTask,
  commit: { hash: head, message: "Provider-owned implementation" },
  quality_review: { ...ordinaryTask.quality_review!, review_identity_digest: reviewIdentity },
  extensions: {
    ...ordinaryTask.extensions,
    task_kernel: { ...canonical, digest: taskKernel.kernelDigest(canonical) },
    "agentplane.kernel_operational_projection": {
      ...projection,
      digest: taskKernel.kernelDigest(projection),
    },
  },
} as TaskData;
const resume = {
  task_id: task.id,
  task_status: "DOING",
  branch: "task/local-evidence",
  base_branch: "main",
  head_sha: "c".repeat(40),
  workspace_root: "/repo/.agentplane/worktrees/task",
  pr_branch: "automation/upgrade",
  latest_handoff: null,
  runner: {
    run_id: null,
    status: null,
    heartbeat_at: null,
    state_path: null,
    trace_path: null,
    next_action: "run",
    next_command: "agentplane task run",
    resume_command: "agentplane task run",
    retry_command: null,
  },
} as TaskResumeContext;
const adoption = {
  schema_version: 1 as const,
  task_id: task.id,
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  source_project: "example/project",
  target_project: "example/project",
  pr_number: 42,
  head_ref: "automation/upgrade",
  base_ref: "main",
  head_sha: head,
  base_sha: base,
  observed_at: "2026-10-27T00:00:00Z",
  readback_digest: `sha256:${"d".repeat(64)}`,
  authority_digest: `sha256:${"e".repeat(64)}`,
};
const prFlow = {
  adoption,
  adoptedVerificationCurrent: true,
  task: { id: task.id, status: "DOING", verification: "ok" },
  branch: { name: adoption.head_ref, headSha: head, metaHeadSha: head },
  pr: {
    provider: "github",
    state: "OPEN",
    source: "lookup",
    prNumber: 42,
    prUrl: "https://github.com/example/project/pull/42",
    base: "main",
    headSha: head,
    mergeCommit: null,
  },
  providerObservation: {
    state: "found",
    pr: {
      provider: "github",
      identity: {
        provider: "github",
        hostname: "github.com",
        remote: "origin",
        sourceProject: "example/project",
        targetProject: "example/project",
        sourceUrl: "https://github.com/example/project.git",
        targetUrl: "https://github.com/example/project.git",
      },
      prNumber: 42,
      prUrl: "https://github.com/example/project/pull/42",
      status: "OPEN",
      mergedAt: null,
      mergeCommit: null,
      base: "main",
      baseSha: base,
      headRef: adoption.head_ref,
      headSha: head,
    },
  },
  closeTail: { state: "not_applicable", reason: "not merged" },
  hostedChecks: { checked: false, reason: "not requested" },
  reviewThreads: { checked: false, reason: "not requested" },
  queue: { present: false },
  handoff: { present: false },
  nextAction: "",
} satisfies PrFlowStatusReport;

function state(taskOverride: TaskData = task, flowOverride: PrFlowStatusReport = prFlow) {
  return withBootstrapWorkflowFingerprint({
    task: taskOverride,
    resume,
    workflowMode: "branch_pr",
    prFlow: flowOverride,
    cleanupProbe: { state: "not_requested" },
    blockers: [],
    batchOwnership: { role: "none" },
    taskWorktree: {
      state: "clean",
      branch: "task/local-evidence",
      worktreePath: "/repo/.agentplane/worktrees/task",
      changedPaths: [],
    },
  });
}

describe("adopted hosted PR route", () => {
  it("requests a distinct provider update before exact-head work begins", () => {
    const before = {
      ...task,
      extensions: {
        ...task.extensions,
        task_kernel: {
          kind: "canonical_task",
          aggregate: { state: "ACTIVE", work_items: { W1: { state: "READY" } } },
        },
      },
    } as TaskData;
    const behind: PrFlowStatusReport = {
      ...prFlow,
      providerObservation: {
        state: "found",
        pr: {
          ...prFlow.providerObservation.pr,
          mergeability: { state: "not_conflicting", mergeable: true, providerState: "behind" },
        },
      },
    };
    expect(reduceRouteState(state(before, behind))).toMatchObject({
      kind: "approval",
      request: { type: "side_effect", operationId: "provider.pr.update_branch" },
    });
    const late = reduceRouteState(state(task, behind));
    expect(late).toMatchObject({
      id: "terminal.adopted_update_requires_revalidation",
      kind: "terminal",
      outcome: { type: "repair_required" },
    });
    expect(late.summary).toContain("repeat TESTER, EVALUATOR and final validation");
  });

  it("emits a separate exact-head protected merge operation after native verification and review", () => {
    const pending = reduceRouteState(state());
    expect(pending).toMatchObject({
      kind: "approval",
      request: { type: "side_effect", operationId: "integration.adopted_merge" },
    });
    const current = state();
    const operation = {
      id: "integration.adopted_merge" as const,
      type: "integration_adopted_merge" as const,
      params: { taskId: task.id, prNumber: 42, headSha: head, baseSha: base },
    };
    const grant = createSideEffectAuthorityRecord({
      actor: "USER",
      operation,
      fingerprint: current.preconditionFingerprint,
      issuedAt: "2026-10-27T00:00:00Z",
      expiresAt: "9999-12-31T23:59:59Z",
    });
    const authorized = {
      ...current,
      task: {
        ...current.task,
        extensions: withSideEffectAuthorityState(current.task, {
          schemaVersion: 1,
          grants: [grant],
          audit: [],
        }),
      },
    };
    expect(reduceRouteState(authorized)).toMatchObject({
      kind: "cli_operation",
      operation: {
        id: "integration.adopted_merge",
        params: { taskId: task.id, prNumber: 42, headSha: head, baseSha: base },
      },
    });
  });
  it("fails closed without canonical exact-head evidence instead of issuing compatibility episodes", () => {
    expect(reduceRouteState(state(ordinaryTask))).toMatchObject({
      kind: "terminal",
      outcome: { type: "repair_required" },
    });
    expect(
      reduceRouteState(
        state({
          ...task,
          quality_review: { ...task.quality_review!, evaluated_sha: "f".repeat(40) },
        } as TaskData),
      ),
    ).toMatchObject({
      kind: "terminal",
      outcome: { type: "repair_required" },
    });
    const mismatched = {
      ...canonical,
      aggregate: {
        ...canonical.aggregate,
        work_items: {
          W1: {
            state: "COMPLETED",
            validation: {
              status: "PASSED",
              identity: { hosted_head_evidence_digest: `sha256:${"0".repeat(64)}` },
            },
          },
        },
      },
    };
    expect(
      reduceRouteState(
        state({
          ...task,
          extensions: {
            ...task.extensions,
            task_kernel: { ...mismatched, digest: taskKernel.kernelDigest(mismatched) },
          },
        } as TaskData),
      ),
    ).toMatchObject({
      kind: "terminal",
      outcome: { type: "repair_required" },
    });
  });

  it("routes a provider-proven merge to native task closure", () => {
    const mergeCommit = "f".repeat(40);
    const mergedAt = "2026-10-27T03:00:00Z";
    const merged: PrFlowStatusReport = {
      ...prFlow,
      pr: { ...prFlow.pr, state: "MERGED", mergeCommit },
      providerObservation: {
        state: "found",
        pr: {
          ...prFlow.providerObservation.pr,
          status: "MERGED",
          mergeCommit,
          mergedAt,
        },
      },
    };
    expect(reduceRouteState(state(task, merged))).toMatchObject({
      kind: "cli_operation",
      operation: {
        id: "task.adopted.finish",
        params: { taskId: task.id, prNumber: 42, headSha: head, mergeCommit, mergedAt },
      },
    });
    const sourceDone = { ...task, status: "DONE" } as TaskData;
    expect(reduceRouteState(state(sourceDone, merged))).toMatchObject({
      kind: "cli_operation",
      operation: { id: "task.adopted.finish" },
    });
    const transferred = {
      ...merged,
      adoptedControllerTransferred: true,
      closeTail: {
        state: "not_found",
        provider: "github",
        branch: "task/close",
        prNumber: null,
        prUrl: null,
      },
    } satisfies PrFlowStatusReport;
    expect(reduceRouteState(state(sourceDone, transferred))).toMatchObject({
      kind: "approval",
      request: { type: "side_effect", operationId: "task.hosted_close.open" },
    });
  });

  it("keeps OPEN source-DONE tasks on the adopted exact-head merge route", () => {
    const sourceDone = { ...task, status: "DONE" } as TaskData;
    expect(reduceRouteState(state(sourceDone))).toMatchObject({
      kind: "approval",
      request: { type: "side_effect", operationId: "integration.adopted_merge" },
    });
  });
});
