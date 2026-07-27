import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
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
  id: "202607250200-PROJ1",
  title: "Workflow step projection routing fixture",
  description: "Exercise routing execution packet projections.",
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
const taskBranch = `task/${task.id}/workflow-step-projection-fixture`;

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

function routeState(overrides: Partial<WorkflowRouteStateInput> = {}) {
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

function executionPacket(state: ReturnType<typeof routeState>) {
  const step = reduceRouteState(state);
  const oracle = projectWorkflowStepOracle({ step, paths: { taskWorktreePath } });
  const packet = projectWorkflowStepExecutionPacket({ task: state.task, step, oracle });
  return { step, oracle, packet };
}

describe("WorkflowStep routing projections", () => {
  it("projects runner wait without a mutation path or executable argv", () => {
    const state = routeState({
      blockers: [{ code: "runner_alive", summary: "runner is active" }],
      resume: {
        ...resume,
        runner: {
          ...resume.runner,
          run_id: "run-1",
          status: "running",
          next_action: "wait",
          next_command: `agentplane task run status ${task.id} --run-id run-1`,
        },
      },
    });
    const { step, oracle, packet } = executionPacket(state);

    expect(step).toMatchObject({
      kind: "wait",
      authoritativeCheckout: "task_worktree",
      condition: { type: "runner_terminal", taskId: task.id, runId: "run-1" },
    });
    expect(oracle.mutationPathHint).toBeNull();
    expect(packet).toMatchObject({
      actionKind: "wait",
      safeToMutate: false,
      mutationPathHint: null,
      exactArgv: null,
      evidenceMissing: ["runner_terminal_state"],
    });
  });

  it("hands an open branch_pr task without an implementation checkpoint to CODER", () => {
    const prFlow = {
      task: { id: task.id, status: "DOING", verification: "pending" },
      branch: {
        name: taskBranch,
        headSha: "1111111111111111111111111111111111111111",
        metaHeadSha: "1111111111111111111111111111111111111111",
      },
      pr: {
        provider: "github",
        state: "OPEN",
        source: "lookup",
        prNumber: 101,
        prUrl: "https://github.com/example/repo/pull/101",
        base: "main",
        headSha: "1111111111111111111111111111111111111111",
        mergeCommit: null,
      },
      closeTail: { state: "not_applicable", reason: "implementation PR is open" },
      hostedChecks: { checked: false, reason: "not requested" },
      reviewThreads: { checked: false, reason: "not requested" },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "",
    } satisfies PrFlowStatusReport;
    const { step, oracle, packet } = executionPacket(routeState({ prFlow }));

    expect(step).toMatchObject({
      kind: "agent_episode",
      id: "agent.branch_implementation",
      authoritativeCheckout: "task_worktree",
      episode: { purpose: "implementation", role: "CODER", taskId: task.id },
      compatibility: { code: "continue_branch_implementation", command: null },
      execution: { semanticMutationAllowed: true },
    });
    expect(oracle.mutationPathHint).toBe(taskWorktreePath);
    expect(packet).toMatchObject({
      actionKind: "stop",
      recommendedRole: "CODER",
      safeToMutate: true,
      mutationPathHint: taskWorktreePath,
      exactArgv: null,
    });
  });
});
