import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
  withSideEffectAuthorityState,
} from "./side-effect-authority.js";
import { cliOperationStep } from "./workflow-step-factory.js";
import {
  WORKFLOW_OPERATION_REGISTRY,
  type WorkflowOperation,
  type WorkflowOperationId,
  type WorkflowRouteState,
  type WorkflowStep,
} from "./workflow-step.js";
import {
  projectWorkflowStepExecutionPacket,
  projectWorkflowStepOracle,
} from "./workflow-step-projections.js";
import { reduceRouteState } from "./workflow-step-reducer.js";
import {
  withBootstrapWorkflowFingerprint,
  type WorkflowRouteStateInput,
} from "./workflow-step-fingerprint.js";

const task = {
  id: "202607250201-PROJ2",
  title: "Workflow integration projection fixture",
  description: "Exercise integration execution projections.",
  status: "DOING",
  priority: "high",
  owner: "CODER",
  revision: 3,
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

const taskWorktreePath = `/repo/.agentplane/worktrees/${task.id}`;
const taskBranch = `task/${task.id}/workflow-step-integration-projection-fixture`;

const resume = {
  task_id: task.id,
  task_status: task.status,
  branch: taskBranch,
  base_branch: "main",
  head_sha: "1111111111111111111111111111111111111111",
  workspace_root: taskWorktreePath,
  pr_branch: taskBranch,
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

function routeState(overrides: Partial<WorkflowRouteStateInput> = {}): WorkflowRouteState {
  return withBootstrapWorkflowFingerprint({
    task,
    resume,
    workflowMode: "branch_pr",
    prFlow: null,
    cleanupProbe: { state: "not_requested" },
    blockers: [],
    batchOwnership: { role: "none" },
    taskWorktree: {
      state: "clean",
      branch: taskBranch,
      worktreePath: taskWorktreePath,
      changedPaths: [],
    },
    ...overrides,
  });
}

function authorizeOperation<Id extends WorkflowOperationId>(opts: {
  state: WorkflowRouteState;
  operationId: Id;
  params: WorkflowOperation["params"];
}): WorkflowRouteState {
  const operation = {
    id: opts.operationId,
    type: WORKFLOW_OPERATION_REGISTRY[opts.operationId].type,
    params: opts.params,
  } as Pick<WorkflowOperation, "id" | "type" | "params">;
  const issuedAt = "1970-01-01T00:00:00.000Z";
  const grant = createSideEffectAuthorityRecord({
    id: `authority-${opts.operationId}`,
    actor: "USER",
    operation,
    fingerprint: opts.state.preconditionFingerprint,
    issuedAt,
    expiresAt: "9999-12-31T23:59:59.999Z",
  });
  const authorityState = appendSideEffectAuthorityAudit({
    state: { schemaVersion: 1, grants: [grant], audit: [] },
    at: issuedAt,
    actor: "USER",
    operation,
    fingerprint: opts.state.preconditionFingerprint,
    authority: grant,
    outcome: "approved",
  });
  return {
    ...opts.state,
    task: {
      ...opts.state.task,
      extensions: withSideEffectAuthorityState(opts.state.task, authorityState),
    },
  };
}

function executionPacket(opts: { state: WorkflowRouteState; step: WorkflowStep }) {
  const oracle = projectWorkflowStepOracle({
    step: opts.step,
    paths: { baseCheckoutPath: "/repo", taskWorktreePath },
  });
  return projectWorkflowStepExecutionPacket({ task: opts.state.task, step: opts.step, oracle });
}

describe("WorkflowStep integration projections", () => {
  it("derives integration enqueue from a verified DONE task with an open PR", () => {
    const openPr = {
      task: { id: task.id, status: "DONE", verification: "ok" },
      branch: { name: taskBranch, headSha: resume.head_sha, metaHeadSha: resume.head_sha },
      pr: {
        provider: "github",
        state: "OPEN",
        source: "lookup",
        prNumber: 4618,
        prUrl: "https://github.com/basilisk-labs/agentplane/pull/4618",
        base: "main",
        headSha: resume.head_sha,
        mergeCommit: null,
      },
      providerObservation: {
        state: "found",
        pr: {
          prNumber: 4618,
          prUrl: "https://github.com/basilisk-labs/agentplane/pull/4618",
          status: "OPEN",
          mergedAt: null,
          mergeCommit: null,
          base: "main",
          headSha: resume.head_sha,
        },
      },
      closeTail: { state: "not_applicable", reason: "implementation PR is not merged" },
      hostedChecks: { checked: false, reason: "not requested" },
      reviewThreads: { checked: false, reason: "not requested" },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "",
    } satisfies PrFlowStatusReport;
    const state = routeState({
      task: { ...task, status: "DONE", verification: { state: "ok" } },
      resume: { ...resume, task_status: "DONE" },
      prFlow: openPr,
    });
    const authorized = authorizeOperation({
      state,
      operationId: "integration.enqueue",
      params: { taskId: task.id, branch: taskBranch },
    });
    const step = reduceRouteState(authorized);
    const packet = executionPacket({ state: authorized, step });

    expect(step).toMatchObject({
      kind: "cli_operation",
      operation: { id: "integration.enqueue", params: { taskId: task.id, branch: taskBranch } },
    });
    expect(packet).toMatchObject({
      recommendedRole: "INTEGRATOR",
      authoritativeCheckout: "base_checkout",
      exactArgv: ["agentplane", "integrate", "queue", "enqueue", task.id, "--branch", taskBranch],
    });
  });

  it("recomputes provider refresh routes with live remote truth", () => {
    for (const operation of [
      { id: "provider.pr.refresh" as const, params: { taskId: task.id } },
      { id: "route.remote.refresh" as const, params: { taskId: task.id } },
    ]) {
      const state = authorizeOperation({
        state: routeState(),
        operationId: operation.id,
        params: operation.params,
      });
      const step = cliOperationStep({
        state,
        operationId: operation.id,
        params: operation.params,
        code: "refresh_remote_route",
        summary: "refresh live provider truth",
      });
      const packet = executionPacket({ state, step });

      expect(packet.staleStateCheck, operation.id).toBe(
        `agentplane task next-action ${task.id} --remote --explain`,
      );
      expect(packet.returnControlWhen, operation.id).toContain(packet.staleStateCheck);
      if (operation.id === "route.remote.refresh") {
        expect(packet).toMatchObject({ authoritativeCheckout: "task_worktree" });
      }
    }
  });
});
