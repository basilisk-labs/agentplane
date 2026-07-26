import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { ConflictReworkPacket } from "../pr/conflict-rework.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { TaskRouteDecision } from "./route-decision-types.js";
import { deriveRouteOperatorGuidance } from "./route-guidance.js";
import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
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
    conflictRework: opts.state.conflictRework ?? null,
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

describe("WorkflowStep conflict rework projections", () => {
  it("routes a fresh provider conflict packet into a CODER semantic episode", () => {
    const packet = {
      schema_version: 1,
      task_id: task.id,
      provider: {
        name: "github",
        pr_number: 4626,
        pr_url: "https://github.example/acme/agentplane/pull/4626",
        state: "OPEN",
        branch: taskBranch,
        head_sha: resume.head_sha,
        base: "main",
        base_sha: "2222222222222222222222222222222222222222",
        mergeability: { state: "conflicting", mergeable: false, provider_state: "dirty" },
      },
      base_protection: {
        provider: "github",
        base: "main",
        state: "protected_pull_request_merge",
      },
      local: {
        branch_head_sha: resume.head_sha,
        base_head_sha: "2222222222222222222222222222222222222222",
        merge_base_sha: "3333333333333333333333333333333333333333",
      },
      task_worktree: { path: taskWorktreePath, branch: taskBranch, state: "clean" },
      candidate_conflict_paths: {
        derivation: "paths_modified_on_both_sides_since_merge_base",
        paths: ["packages/agentplane/src/commands/task/active.ts"],
        total: 1,
        truncated: false,
        base_changed_count: 1,
        head_changed_count: 1,
      },
      checks: {
        checked: true,
        total: 2,
        passing: 2,
        pending: 0,
        failing: 0,
        missingRequired: { names: [], total: 0, truncated: false },
        rows: { entries: [], total: 0, truncated: false },
      },
      freshness: { algorithm: "sha256", token: "sha256:conflict-packet" },
      resolution_contract: {
        role: "CODER",
        revalidate_command: `agentplane pr conflict-rework ${task.id} --expect-freshness-token sha256:conflict-packet`,
        after_resolution: "refresh provider truth and rerun normal verification",
      },
      safety: {
        preparation_mutations: [],
        cli_must_not: ["do not auto-rebase, auto-merge, force-push, or rewrite the task branch"],
      },
    } as const satisfies ConflictReworkPacket;
    const state = routeState({
      blockers: [
        {
          code: "provider_merge_conflict",
          summary: "provider reports a current protected PR merge conflict",
        },
      ],
      conflictRework: { state: "ready", packet },
    });
    const step = reduceRouteState(state);
    const { oracle, packet: execution } = executionPacket({
      state,
      step,
      paths: { taskWorktreePath },
    });

    expect(step).toMatchObject({
      kind: "agent_episode",
      id: "agent.provider_conflict_rework",
      authoritativeCheckout: "task_worktree",
      compatibility: {
        code: "semantic_conflict_rework_required",
        command: `agentplane pr conflict-rework ${task.id} --expect-freshness-token sha256:conflict-packet`,
      },
      episode: { purpose: "implementation_rework", role: "CODER", taskId: task.id },
    });
    expect(oracle.mutationPathHint).toBe(taskWorktreePath);
    expect(execution).toMatchObject({
      actionKind: "stop",
      safeToMutate: true,
      exactArgv: null,
      staleStateCheck: `agentplane task next-action ${task.id} --remote --explain`,
    });
    expect(execution.mustNot.some((rule) => rule.includes("auto-rebase"))).toBe(true);
    expect(execution.mustNot.some((rule) => rule.includes("force-push"))).toBe(true);
    expect(
      deriveRouteOperatorGuidance(routeDecision({ state, step, oracle, packet: execution })),
    ).toMatchObject({
      operatorAction: "stop",
      executorContext: {
        executor: "current_agent",
        currentAgentMustExecute: true,
        instruction: "current_agent_performs_semantic_work",
      },
    });
  });

  it("fails closed when a provider conflict lacks a usable task worktree", () => {
    const state = routeState({
      taskWorktree: {
        state: "not_present",
        branch: taskBranch,
        worktreePath: null,
        changedPaths: [],
      },
      blockers: [
        {
          code: "provider_conflict_context_invalid",
          summary: "provider conflict context lacks a task worktree",
        },
      ],
      conflictRework: {
        state: "invalid",
        reason_code: "task_worktree_missing",
        reason: "dedicated task worktree is missing",
      },
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({
      state,
      step,
      paths: { baseCheckoutPath: "/repo" },
    });

    expect(step).toMatchObject({
      kind: "terminal",
      id: "terminal.provider_conflict_context_invalid",
      compatibility: { command: `agentplane pr conflict-rework ${task.id}` },
    });
    expect(oracle.mutationPathHint).toBeNull();
    expect(packet).toMatchObject({ actionKind: "stop", safeToMutate: false, exactArgv: null });
  });

  it("fails closed when GitHub has not settled mergeability", () => {
    const state = routeState({
      blockers: [
        {
          code: "provider_conflict_context_invalid",
          summary: "provider mergeability is pending",
        },
      ],
      conflictRework: {
        state: "invalid",
        reason_code: "provider_mergeability_unknown",
        reason: "GitHub mergeability is not settled: state=pending provider_state=unknown",
      },
    });
    const step = reduceRouteState(state);
    const { packet } = executionPacket({ state, step, paths: { baseCheckoutPath: "/repo" } });

    expect(step).toMatchObject({
      kind: "terminal",
      id: "terminal.provider_conflict_context_invalid",
      compatibility: { command: `agentplane pr conflict-rework ${task.id}` },
    });
    expect(packet).toMatchObject({ actionKind: "stop", safeToMutate: false, exactArgv: null });
  });

  it("keeps a non-conflicting open PR on the ordinary integration queue route", () => {
    const openPrFlow = {
      task: { id: task.id, status: "DOING", verification: "ok" },
      branch: { name: taskBranch, headSha: resume.head_sha, metaHeadSha: resume.head_sha },
      pr: {
        provider: "github",
        state: "OPEN",
        source: "lookup",
        prNumber: 4626,
        prUrl: "https://github.example/acme/agentplane/pull/4626",
        base: "main",
        headSha: resume.head_sha,
        mergeCommit: null,
      },
      providerObservation: {
        state: "found",
        pr: {
          prNumber: 4626,
          prUrl: "https://github.example/acme/agentplane/pull/4626",
          status: "OPEN",
          mergedAt: null,
          mergeCommit: null,
          base: "main",
          headSha: resume.head_sha,
          mergeability: { state: "not_conflicting", mergeable: true, providerState: "clean" },
        },
      },
      publication: {
        state: "aligned",
        branch: taskBranch,
        localHeadSha: resume.head_sha,
        upstreamHeadSha: resume.head_sha,
      },
      closeTail: { state: "not_applicable", reason: "implementation PR remains open" },
      hostedChecks: {
        checked: true,
        total: 1,
        pending: 1,
        failing: 0,
        passing: 0,
        missingRequired: [],
        rows: [],
      },
      reviewThreads: { checked: true, unresolved: 0 },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "wait hosted checks",
    } satisfies PrFlowStatusReport;
    const state = routeState({ prFlow: openPrFlow, conflictRework: null });
    const step = reduceRouteState(state);

    expect(step).toMatchObject({
      kind: "cli_operation",
      id: "integration.enqueue",
      compatibility: { code: "wait_hosted_checks" },
    });
  });

  it("returns a DONE open PR with current hosted failures to CODER rework instead of enqueue", () => {
    const failedPrFlow = {
      task: { id: task.id, status: "DONE", verification: "ok" },
      branch: { name: taskBranch, headSha: resume.head_sha, metaHeadSha: resume.head_sha },
      pr: {
        provider: "github",
        state: "OPEN",
        source: "lookup",
        prNumber: 4626,
        prUrl: "https://github.example/acme/agentplane/pull/4626",
        base: "main",
        headSha: resume.head_sha,
        mergeCommit: null,
      },
      providerObservation: {
        state: "found",
        pr: {
          prNumber: 4626,
          prUrl: "https://github.example/acme/agentplane/pull/4626",
          status: "OPEN",
          mergedAt: null,
          mergeCommit: null,
          base: "main",
          headSha: resume.head_sha,
          mergeability: { state: "not_conflicting", mergeable: true, providerState: "blocked" },
        },
      },
      publication: {
        state: "aligned",
        branch: taskBranch,
        localHeadSha: resume.head_sha,
        upstreamHeadSha: resume.head_sha,
      },
      closeTail: { state: "not_applicable", reason: "implementation PR remains open" },
      hostedChecks: {
        checked: true,
        total: 1,
        pending: 0,
        failing: 1,
        passing: 0,
        missingRequired: [],
        rows: [{ name: "verify-contract", state: "FAILURE" }],
      },
      reviewThreads: { checked: true, unresolved: 0 },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "hosted checks are failing",
    } satisfies PrFlowStatusReport;
    const state = routeState({
      task: { ...task, status: "DONE", verification: { state: "ok" } },
      resume: { ...resume, task_status: "DONE" },
      prFlow: failedPrFlow,
      conflictRework: null,
      blockers: [
        {
          code: "implementation_rework_required",
          summary: "current hosted checks are failing",
        },
      ],
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({ state, step, paths: { taskWorktreePath } });

    expect(step).toMatchObject({
      kind: "agent_episode",
      id: "agent.implementation_rework",
      compatibility: { code: "implementation_rework_required", command: null },
    });
    expect(step.id).not.toBe("integration.enqueue");
    expect(oracle).toMatchObject({
      phase: "implementation_rework_required",
      authoritativeCheckout: "task_worktree",
      nextCommand: null,
    });
    expect(packet).toMatchObject({
      actionKind: "stop",
      safeToMutate: true,
      recommendedRole: "CODER",
      exactArgv: null,
    });
  });

  it("publishes a newer unpublished head before acting on stale failed hosted checks", () => {
    const providerHeadSha = "2222222222222222222222222222222222222222";
    const staleFailedPrFlow = {
      task: { id: task.id, status: "DONE", verification: "ok" },
      branch: { name: taskBranch, headSha: resume.head_sha, metaHeadSha: resume.head_sha },
      pr: {
        provider: "github",
        state: "OPEN",
        source: "lookup",
        prNumber: 4626,
        prUrl: "https://github.example/acme/agentplane/pull/4626",
        base: "main",
        headSha: providerHeadSha,
        mergeCommit: null,
      },
      providerObservation: {
        state: "found",
        pr: {
          prNumber: 4626,
          prUrl: "https://github.example/acme/agentplane/pull/4626",
          status: "OPEN",
          mergedAt: null,
          mergeCommit: null,
          base: "main",
          headSha: providerHeadSha,
          mergeability: { state: "not_conflicting", mergeable: true, providerState: "blocked" },
        },
      },
      publication: {
        state: "unpublished",
        reason: "upstream_head_mismatch",
        localHeadSha: resume.head_sha,
        upstreamRef: `origin/${taskBranch}`,
        upstreamHeadSha: providerHeadSha,
        hostedHeadSha: providerHeadSha,
      },
      closeTail: { state: "not_applicable", reason: "implementation PR remains open" },
      hostedChecks: {
        checked: true,
        total: 1,
        pending: 0,
        failing: 1,
        passing: 0,
        missingRequired: [],
        rows: [{ name: "verify-contract", state: "FAILURE" }],
      },
      reviewThreads: { checked: true, unresolved: 0 },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "hosted checks are failing on an older published head",
    } satisfies PrFlowStatusReport;
    const state = routeState({
      task: { ...task, status: "DONE", verification: { state: "ok" } },
      resume: { ...resume, task_status: "DONE" },
      prFlow: staleFailedPrFlow,
      conflictRework: null,
      blockers: [
        {
          code: "pr_head_unpublished",
          summary: "local task branch head is not published to its upstream tracking branch",
        },
      ],
    });
    const step = reduceRouteState(state);
    const { oracle, packet } = executionPacket({ state, step, paths: { taskWorktreePath } });

    expect(step).toMatchObject({
      kind: "cli_operation",
      id: "pr.head.publish",
      compatibility: {
        code: "publish_pr_head",
        command: `agentplane pr open ${task.id} --author CODER`,
      },
    });
    expect(step.id).not.toBe("agent.implementation_rework");
    expect(oracle).toMatchObject({
      phase: "pr_head_publication_needed",
      authoritativeCheckout: "task_worktree",
      nextCommand: `agentplane pr open ${task.id} --author CODER`,
    });
    expect(packet).toMatchObject({
      actionKind: "local_command",
      safeToMutate: true,
      exactArgv: ["agentplane", "pr", "open", task.id, "--author", "CODER"],
    });
  });
});
