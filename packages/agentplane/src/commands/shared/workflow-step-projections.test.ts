import { describe, expect, it } from "vitest";

import { buildStateFingerprint } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { TaskRouteDecision } from "./route-decision-types.js";
import { deriveRouteOperatorGuidance } from "./route-guidance.js";
import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
  evaluateWorkflowOperationAuthority,
  withSideEffectAuthorityState,
} from "./side-effect-authority.js";
import { cliOperationStep } from "./workflow-step-factory.js";
import { stabilizeWorkflowStepAfterFingerprint } from "./route-decision.js";
import {
  WORKFLOW_OPERATION_EFFECTS,
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
  id: "202607250200-PROJ1",
  title: "Workflow step projection fixture",
  description: "Exercise execution packet projections.",
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

function executionPacket(opts: {
  state: WorkflowRouteState;
  step: WorkflowStep;
  paths: Parameters<typeof projectWorkflowStepOracle>[0]["paths"];
}) {
  const oracle = projectWorkflowStepOracle({ step: opts.step, paths: opts.paths });
  const packet = projectWorkflowStepExecutionPacket({
    task: opts.state.task,
    step: opts.step,
    oracle,
  });
  return { oracle, packet };
}

function routeDecision(opts: {
  state: WorkflowRouteState;
  step: WorkflowStep;
  oracle: ReturnType<typeof projectWorkflowStepOracle>;
  packet: ReturnType<typeof projectWorkflowStepExecutionPacket>;
}): TaskRouteDecision {
  return {
    task: {
      id: opts.state.task.id,
      title: opts.state.task.title,
      status: opts.state.task.status,
      owner: opts.state.task.owner,
      planApproval: opts.state.task.plan_approval?.state ?? null,
      verification: opts.state.task.verification?.state ?? null,
      commit: null,
    },
    workflowMode: opts.state.workflowMode,
    workspace: {
      root: "/repo",
      branch: opts.state.resume.branch,
      baseBranch: opts.state.resume.base_branch,
      headSha: opts.state.resume.head_sha,
      prBranch: opts.state.resume.pr_branch,
      checkoutRole: "task_worktree",
      baseCheckoutPath: "/repo",
      taskWorktreePath,
    },
    approval: {
      runtime: { requirePlan: false, requireNetwork: false, requireVerify: false },
      gatewayMutationApprovalRequired: true,
      effectiveMutationApprovalRequired: false,
      routeRequiresApproval: false,
    },
    batchOwnership: opts.state.batchOwnership,
    prFlow: opts.state.prFlow,
    cleanupProbe: opts.state.cleanupProbe,
    cleanupCandidateCount: null,
    blockers: [...opts.state.blockers],
    ambiguities: [],
    workflowStep: opts.step,
    nextAction: opts.step.compatibility,
    oracle: opts.oracle,
    executionPacket: opts.packet,
    repairPlan: [],
    sourceConfidence: {},
  } as TaskRouteDecision;
}

describe("WorkflowStep execution projections", () => {
  it("projects runner wait without a mutation path or executable argv", () => {
    const blocker = { code: "runner_alive" as const, summary: "runner is active" };
    const state = routeState({
      blockers: [blocker],
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
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { taskWorktreePath },
    });

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

  it("keeps an active runner wait ahead of dirty-worktree resolution", () => {
    const state = routeState({
      blockers: [
        { code: "runner_alive", summary: "runner is active" },
        { code: "task_worktree_dirty", summary: "task worktree has pending implementation" },
      ],
      resume: {
        ...resume,
        runner: {
          ...resume.runner,
          run_id: "run-active",
          status: "running",
          next_action: "wait",
          next_command: `agentplane task run status ${task.id} --run-id run-active`,
        },
      },
      taskWorktree: {
        state: "dirty",
        branch: taskBranch,
        worktreePath: taskWorktreePath,
        changedPaths: ["packages/agentplane/src/example.ts"],
      },
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { taskWorktreePath },
    });

    expect(step).toMatchObject({
      kind: "wait",
      id: "wait.runner",
      selectedBlocker: { code: "runner_alive" },
      condition: { type: "runner_terminal", runId: "run-active" },
    });
    expect(oracle.mutationPathHint).toBeNull();
    expect(packet).toMatchObject({
      actionKind: "wait",
      safeToMutate: false,
      exactArgv: null,
    });
    expect(packet.evidenceMissing).toEqual(
      expect.arrayContaining(["runner_terminal_state", "clean_committed_task_worktree"]),
    );
  });

  it("projects verification as a TESTER episode with mutation forbidden", () => {
    const state = routeState({
      blockers: [
        {
          code: "verification_required",
          summary: "the implementation has no verification record",
        },
      ],
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { taskWorktreePath },
    });

    expect(step).toMatchObject({
      kind: "agent_episode",
      authoritativeCheckout: "task_worktree",
      episode: { purpose: "verification", role: "TESTER", taskId: task.id },
    });
    expect(oracle.mutationPathHint).toBeNull();
    expect(packet).toMatchObject({
      actionKind: "stop",
      recommendedRole: "TESTER",
      safeToMutate: false,
      mutationPathHint: null,
      exactArgv: null,
      evidenceMissing: ["verification_record"],
    });
  });

  it("starts an inspectable TODO task before stale PR artifacts or dirty-worktree resolution", () => {
    const blocker = {
      code: "task_worktree_dirty" as const,
      summary: "the task worktree contains uncommitted changes",
    };
    const state = routeState({
      task: { ...task, status: "TODO" },
      blockers: [blocker, { code: "pr_meta_stale", summary: "task PR artifacts are stale" }],
      taskWorktree: {
        state: "dirty",
        branch: taskBranch,
        worktreePath: taskWorktreePath,
        changedPaths: ["packages/agentplane/src/example.ts"],
      },
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { taskWorktreePath },
    });

    expect(step).toMatchObject({
      kind: "cli_operation",
      id: "task.branch.start",
      authoritativeCheckout: "task_worktree",
      operation: {
        id: "task.branch.start",
        params: { taskId: task.id, author: "CODER" },
      },
    });
    expect(oracle.mutationPathHint).toBe(taskWorktreePath);
    expect(packet).toMatchObject({
      actionKind: "local_command",
      recommendedRole: "CODER",
      safeToMutate: true,
      mutationPathHint: taskWorktreePath,
      exactArgv: [
        "agentplane",
        "task",
        "start-ready",
        task.id,
        "--author",
        "CODER",
        "--body",
        "Start: continue branch_pr task in the dedicated task worktree.",
      ],
    });
  });

  it("keeps dirty DOING worktree resolution ahead of stale PR artifacts", () => {
    const blocker = {
      code: "task_worktree_dirty" as const,
      summary: "the task worktree contains uncommitted changes",
    };
    const state = routeState({
      blockers: [blocker, { code: "pr_meta_stale", summary: "task PR artifacts are stale" }],
      taskWorktree: {
        state: "dirty",
        branch: taskBranch,
        worktreePath: taskWorktreePath,
        changedPaths: ["packages/agentplane/src/example.ts"],
      },
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { taskWorktreePath },
    });

    expect(step).toMatchObject({
      kind: "agent_episode",
      authoritativeCheckout: "task_worktree",
      episode: {
        purpose: "task_worktree_resolution",
        role: "CODER",
        taskId: task.id,
      },
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
    expect(packet.evidenceMissing).toEqual(
      expect.arrayContaining(["clean_committed_task_worktree", "fresh_pr_artifacts"]),
    );
    expect(packet.mustNot).toContain(
      "do not mutate task lifecycle or PR state while control belongs to the active semantic agent episode",
    );
    expect(packet.mustNot).not.toContain(
      "do not perform further task mutation for this route state",
    );
    expect(
      deriveRouteOperatorGuidance(routeDecision({ state, step, oracle, packet })).executorContext,
    ).toMatchObject({
      executor: "current_agent",
      currentAgentMustExecute: true,
      instruction: "current_agent_performs_semantic_work",
    });
  });

  it("prepares a missing task worktree before stale PR artifacts", () => {
    const state = routeState({
      blockers: [{ code: "pr_meta_stale", summary: "task PR artifacts are stale" }],
      taskWorktree: {
        state: "not_present",
        branch: taskBranch,
        worktreePath: null,
        changedPaths: [],
      },
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { baseCheckoutPath: "/repo" },
    });

    expect(step).toMatchObject({
      kind: "cli_operation",
      id: "worktree.prepare",
      authoritativeCheckout: "base_checkout",
      operation: { id: "worktree.prepare", params: { taskId: task.id, agent: "CODER" } },
    });
    expect(oracle.mutationPathHint).toBe("/repo");
    expect(packet).toMatchObject({
      actionKind: "local_command",
      safeToMutate: true,
      mutationPathHint: "/repo",
    });
    expect(packet.exactArgv).toEqual([
      "agentplane",
      "work",
      "start",
      task.id,
      "--agent",
      "CODER",
      "--slug",
      "workflow-step-projection-fixture",
      "--worktree",
    ]);
  });

  it("does not grant semantic mutation authority for a dirty DONE task worktree", () => {
    const blocker = {
      code: "task_worktree_dirty" as const,
      summary: "the task worktree contains uncommitted changes",
    };
    const state = routeState({
      task: { ...task, status: "DONE" },
      resume: { ...resume, task_status: "DONE" },
      blockers: [blocker],
      taskWorktree: {
        state: "dirty",
        branch: taskBranch,
        worktreePath: taskWorktreePath,
        changedPaths: ["packages/agentplane/src/example.ts"],
      },
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { taskWorktreePath },
    });

    expect(step).toMatchObject({
      kind: "agent_episode",
      episode: { purpose: "task_worktree_resolution", role: "CODER" },
      execution: { semanticMutationAllowed: false },
    });
    expect(oracle.mutationPathHint).toBeNull();
    expect(packet).toMatchObject({
      safeToMutate: false,
      mutationPathHint: null,
      exactArgv: null,
    });
    expect(
      deriveRouteOperatorGuidance(routeDecision({ state, step, oracle, packet })).executorContext,
    ).toMatchObject({
      currentAgentMustExecute: false,
      instruction: "current_agent_waits_for_provider_or_recompute",
    });
  });

  it("forbids mutation when a TODO task worktree cannot be inspected", () => {
    const blocker = {
      code: "task_worktree_state_unavailable" as const,
      summary: "task worktree state could not be inspected",
    };
    const state = routeState({
      task: { ...task, status: "TODO" },
      blockers: [blocker],
      taskWorktree: {
        state: "unavailable",
        branch: taskBranch,
        worktreePath: taskWorktreePath,
        changedPaths: [],
        reason: "git status failed",
      },
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { taskWorktreePath },
    });

    expect(step).toMatchObject({
      kind: "agent_episode",
      compatibility: { code: "resolve_task_worktree_state", command: null },
      execution: { semanticMutationAllowed: false },
    });
    expect(oracle.mutationPathHint).toBeNull();
    expect(packet).toMatchObject({
      actionKind: "stop",
      recommendedRole: "CODER",
      safeToMutate: false,
      mutationPathHint: null,
      exactArgv: null,
      evidenceMissing: ["confirmed_task_worktree_state"],
    });
    expect(packet.mustNot).toContain("do not perform further task mutation for this route state");
  });

  it.each(["DOING", "DONE"] as const)(
    "keeps unavailable worktree truth ahead of %s implementation rework",
    (status) => {
      const state = routeState({
        task: { ...task, status },
        resume: { ...resume, task_status: status },
        blockers: [
          {
            code: "implementation_rework_required",
            summary: "the evaluator requested implementation rework",
          },
          {
            code: "task_worktree_state_unavailable",
            summary: "task worktree state could not be inspected",
          },
        ],
        taskWorktree: {
          state: "unavailable",
          branch: taskBranch,
          worktreePath: taskWorktreePath,
          changedPaths: [],
          reason: "git status failed",
        },
      });
      const step = reduceRouteState(state);
      const { packet } = executionPacket({
        state,
        step,
        paths: { taskWorktreePath },
      });

      expect(step).toMatchObject({
        kind: "agent_episode",
        episode: { purpose: "task_worktree_resolution" },
        selectedBlocker: { code: "task_worktree_state_unavailable" },
        execution: { semanticMutationAllowed: false },
      });
      expect(packet).toMatchObject({
        safeToMutate: false,
        mutationPathHint: null,
      });
      expect(packet.evidenceMissing).toEqual(
        expect.arrayContaining(["confirmed_task_worktree_state", "verified_implementation_rework"]),
      );
    },
  );

  it("projects stale-runner reclaim to exact argv in the current checkout", () => {
    const reason = "stale runner pid is no longer alive";
    const directResume = {
      ...resume,
      branch: "main",
      pr_branch: null,
      workspace_root: "/repo",
      runner: {
        ...resume.runner,
        run_id: "run-stale",
        status: "running",
        next_action: "cancel_then_resume",
        next_command: `agentplane task reclaim ${task.id} --author CODER --reason '${reason}'`,
      },
    } satisfies TaskResumeContext;
    const state = routeState({
      resume: directResume,
      workflowMode: "direct",
      prFlow: null,
      taskWorktree: undefined,
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { currentCheckoutPath: "/repo" },
    });

    expect(step).toMatchObject({
      kind: "cli_operation",
      authoritativeCheckout: "current_checkout",
      operation: {
        id: "runner.follow",
        params: { mode: "reclaim", taskId: task.id, author: "CODER", reason },
      },
    });
    expect(oracle.mutationPathHint).toBe("/repo");
    expect(packet).toMatchObject({
      actionKind: "local_command",
      recommendedRole: "CODER",
      authoritativeCheckout: "current_checkout",
      safeToMutate: true,
      exactArgv: [
        "agentplane",
        "task",
        "reclaim",
        task.id,
        "--author",
        "CODER",
        "--reason",
        reason,
      ],
    });
  });

  it("gives an active direct semantic implementation episode its checkout mutation authority", () => {
    const directResume = {
      ...resume,
      branch: "main",
      pr_branch: null,
      workspace_root: "/repo",
      runner: {
        ...resume.runner,
        run_id: null,
        status: null,
        next_action: "run",
      },
    } satisfies TaskResumeContext;
    const state = routeState({
      resume: directResume,
      workflowMode: "direct",
      prFlow: null,
      taskWorktree: undefined,
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { currentCheckoutPath: "/repo" },
    });

    expect(step).toMatchObject({
      kind: "agent_episode",
      id: "agent.direct_implementation",
      authoritativeCheckout: "current_checkout",
      episode: { purpose: "implementation", role: "CODER", taskId: task.id },
      compatibility: { code: "continue_direct", command: null },
      execution: { semanticMutationAllowed: true },
    });
    expect(oracle.mutationPathHint).toBe("/repo");
    expect(packet).toMatchObject({
      actionKind: "stop",
      safeToMutate: true,
      mutationPathHint: "/repo",
      exactArgv: null,
    });
  });

  it("requires scoped authority for remote observations while keeping local runner reads executable", () => {
    expect(WORKFLOW_OPERATION_EFFECTS).toMatchObject({
      "task.verify.show": "read_only",
      "batch.follow_primary": "read_only",
      "batch.collect_included": "read_only",
      "provider.pr.refresh": "read_only",
      "route.remote.refresh": "read_only",
      "runner.follow": "mode_dependent",
    });

    const providerState = routeState();
    const providerStep = cliOperationStep({
      state: providerState,
      operationId: "provider.pr.refresh",
      params: { taskId: task.id },
      code: "retry_provider_lookup",
      summary: "refresh provider state",
    });
    const provider = executionPacket({
      state: providerState,
      step: providerStep,
      paths: { baseCheckoutPath: "/repo", taskWorktreePath },
    });
    expect(provider.oracle).toMatchObject({
      authoritativeCheckoutPath: taskWorktreePath,
      mutationPathHint: null,
    });
    expect(provider.packet).toMatchObject({
      actionKind: "provider_action",
      safeToMutate: false,
      mustRunFrom: taskWorktreePath,
      exactArgv: null,
    });
    expect(
      deriveRouteOperatorGuidance(
        routeDecision({
          state: providerState,
          step: providerStep,
          oracle: provider.oracle,
          packet: provider.packet,
        }),
      ),
    ).toMatchObject({
      canExecuteNow: false,
      shouldRunNextCommand: false,
      executorContext: {
        currentAgentMustExecute: false,
        instruction: "current_agent_waits_for_provider_or_recompute",
      },
    });

    const authorizedProviderState = authorizeOperation({
      state: providerState,
      operationId: "provider.pr.refresh",
      params: { taskId: task.id },
    });
    const authorizedProviderStep = cliOperationStep({
      state: authorizedProviderState,
      operationId: "provider.pr.refresh",
      params: { taskId: task.id },
      code: "retry_provider_lookup",
      summary: "refresh provider state",
    });
    const authorizedProvider = executionPacket({
      state: authorizedProviderState,
      step: authorizedProviderStep,
      paths: { baseCheckoutPath: "/repo", taskWorktreePath },
    });
    expect(authorizedProvider.packet).toMatchObject({
      actionKind: "local_command",
      safeToMutate: false,
      mustRunFrom: "/repo",
      exactArgv: ["agentplane", "pr", "flow", "status", task.id],
    });
    expect(authorizedProvider.packet.mustNot).toContain(
      "do not use this read-only command to mutate task, PR, branch, runner, or worktree state",
    );
    expect(
      deriveRouteOperatorGuidance(
        routeDecision({
          state: authorizedProviderState,
          step: authorizedProviderStep,
          oracle: authorizedProvider.oracle,
          packet: authorizedProvider.packet,
        }),
      ),
    ).toMatchObject({
      canExecuteNow: true,
      shouldRunNextCommand: true,
      executorContext: {
        executor: "current_agent",
        currentAgentMustExecute: true,
      },
    });

    const providerWithoutCheckout = executionPacket({
      state: providerState,
      step: providerStep,
      paths: {},
    });
    expect(providerWithoutCheckout.oracle.authoritativeCheckoutPath).toBeNull();
    expect(
      deriveRouteOperatorGuidance(
        routeDecision({
          state: providerState,
          step: providerStep,
          oracle: providerWithoutCheckout.oracle,
          packet: providerWithoutCheckout.packet,
        }),
      ),
    ).toMatchObject({
      canExecuteNow: false,
      shouldRunNextCommand: false,
      executorContext: {
        currentAgentMustExecute: false,
        instruction: "current_agent_waits_for_provider_or_recompute",
      },
    });

    const runnerState = routeState({
      blockers: [{ code: "runner_alive", summary: "runner is active" }],
    });
    const runnerStep = cliOperationStep({
      state: runnerState,
      operationId: "runner.follow",
      params: { mode: "status", taskId: task.id, runId: "run-1" },
      code: "wait_runner",
      summary: "inspect the active runner",
    });
    const runner = executionPacket({
      state: runnerState,
      step: runnerStep,
      paths: { currentCheckoutPath: "/repo" },
    });
    expect(runner.oracle.mutationPathHint).toBeNull();
    expect(runner.packet).toMatchObject({
      safeToMutate: false,
      mustRunFrom: "/repo",
      exactArgv: ["agentplane", "task", "run", "status", task.id, "--run-id", "run-1"],
    });
    expect(
      deriveRouteOperatorGuidance(
        routeDecision({
          state: runnerState,
          step: runnerStep,
          oracle: runner.oracle,
          packet: runner.packet,
        }),
      ),
    ).toMatchObject({
      canExecuteNow: true,
      executorContext: {
        executor: "current_agent",
        currentAgentMustExecute: true,
      },
    });
  });

  it("stabilizes a protected step when the full fingerprint resolves bootstrap approval", async () => {
    const state = routeState();
    const initial = reduceRouteState(state);
    if (initial.kind !== "approval" || initial.request.type !== "side_effect") {
      throw new Error("expected a bootstrap side-effect approval");
    }
    const operation = initial.request.operation;
    const fullFingerprint = buildStateFingerprint({
      task_id: task.id,
      task_revision: task.revision,
      git_head: "f".repeat(40),
      worktree: taskWorktreePath,
      components: {
        task: { state: "present", source: "fixture", value: { fingerprint: "full" } },
        git: { state: "present", source: "fixture", value: { head: "full" } },
        backend_projection: { state: "present", source: "fixture", value: { backend: "full" } },
        policy: { state: "present", source: "fixture", value: { policy: "full" } },
        blueprint: { state: "present", source: "fixture", value: { blueprint: "full" } },
        knowledge: { state: "present", source: "fixture", value: { knowledge: "full" } },
        provider: { state: "present", source: "fixture", value: { provider: "full" } },
        authority: { state: "present", source: "fixture", value: { authority: "full" } },
      },
    });
    const authorized = authorizeOperation({
      state: { ...state, preconditionFingerprint: fullFingerprint },
      operationId: operation.id,
      params: operation.params,
    });
    const grantedState = { ...state, task: authorized.task };
    const draft = reduceRouteState(grantedState);
    expect(draft).toMatchObject({
      kind: "approval",
      request: { type: "side_effect", operationId: operation.id },
    });
    expect(
      evaluateWorkflowOperationAuthority({
        task: grantedState.task,
        operation: {
          id: operation.id,
          type: operation.type,
          params: operation.params,
        },
        fingerprint: fullFingerprint,
      }),
    ).toMatchObject({ state: "allowed" });

    const step = await stabilizeWorkflowStepAfterFingerprint({
      state: grantedState,
      draft,
      capture: () => Promise.resolve(fullFingerprint),
    });
    expect(step).toMatchObject({
      kind: "cli_operation",
      operation: {
        id: operation.id,
        authorityRef: expect.stringContaining("authority:") as unknown as string,
      },
      preconditionFingerprint: { digest: fullFingerprint.digest },
    });
  });

  it("projects integration enqueue to exact INTEGRATOR argv in the base checkout", () => {
    const state = authorizeOperation({
      state: routeState({
        task: { ...task, status: "DONE", verification: { state: "ok" } },
      }),
      operationId: "integration.enqueue",
      params: { taskId: task.id, branch: taskBranch },
    });
    const step = cliOperationStep({
      state,
      operationId: "integration.enqueue",
      params: { taskId: task.id, branch: taskBranch },
      code: "wait_hosted_checks",
      summary: "wait for hosted checks and merge the task PR",
    });
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { baseCheckoutPath: "/repo" },
    });

    expect(oracle).toMatchObject({
      authoritativeCheckout: "base_checkout",
      authoritativeCheckoutPath: "/repo",
      mutationPathHint: "/repo",
    });
    expect(packet).toMatchObject({
      actionKind: "local_command",
      recommendedRole: "INTEGRATOR",
      authoritativeCheckout: "base_checkout",
      safeToMutate: true,
      exactArgv: ["agentplane", "integrate", "queue", "enqueue", task.id, "--branch", taskBranch],
    });
  });

  it("projects legacy protected-conflict adoption as a mutating INTEGRATOR operation", () => {
    const token = "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const state = authorizeOperation({
      state: routeState({
        task: { ...task, status: "DONE", verification: { state: "ok" } },
      }),
      operationId: "integration.adopt_legacy_protected_conflict",
      params: { taskId: task.id, expectedAdoptionToken: token },
    });
    const step = cliOperationStep({
      state,
      operationId: "integration.adopt_legacy_protected_conflict",
      params: { taskId: task.id, expectedAdoptionToken: token },
      code: "adopt_legacy_protected_conflict",
      summary: "record formal legacy conflict recovery evidence",
    });
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { baseCheckoutPath: "/repo" },
    });

    expect(WORKFLOW_OPERATION_EFFECTS).toMatchObject({
      "integration.adopt_legacy_protected_conflict": "mutating",
    });
    expect(oracle).toMatchObject({
      authoritativeCheckout: "base_checkout",
      mutationPathHint: "/repo",
    });
    expect(packet).toMatchObject({
      actionKind: "local_command",
      recommendedRole: "INTEGRATOR",
      safeToMutate: true,
      exactArgv: [
        "agentplane",
        "integrate",
        "queue",
        "adopt-legacy-protected-conflict",
        task.id,
        "--expect-adoption-token",
        token,
      ],
    });
  });
});
