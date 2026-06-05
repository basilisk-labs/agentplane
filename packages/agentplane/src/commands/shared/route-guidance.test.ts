import { describe, expect, it } from "vitest";

import type { TaskRouteDecision } from "./route-decision-types.js";
import { deriveRouteOperatorGuidance, routeRunnerContextIsRelevant } from "./route-guidance.js";

describe("route operator guidance", () => {
  it("surfaces PR artifact freshness loops separately from executable route commands", () => {
    const decision = {
      task: {
        id: "202606041604-E3EJG8",
        title: "Clarify route diagnostics",
        status: "DOING",
        owner: "CODER",
        planApproval: "approved",
        verification: "ok",
        commit: "abc123",
      },
      nextAction: {
        code: "update_pr_artifacts",
        command: "agentplane pr update 202606041604-E3EJG8",
        summary: "refresh stale PR artifacts",
        requiresApproval: false,
      },
      oracle: {
        phase: "pr_artifacts_stale",
        authoritativeCheckout: "task_worktree",
        authoritativeCheckoutPath: "/repo/.agentplane/worktrees/task",
        mutationPathHint: "/repo/.agentplane/worktrees/task",
        blocker: { code: "pr_meta_stale", summary: "PR metadata is stale" },
        nextCommand: "agentplane pr update 202606041604-E3EJG8",
        summary: "refresh stale PR artifacts",
      },
      executionPacket: {
        actionKind: "local_command",
        safeToMutate: true,
        exactArgv: ["agentplane", "pr", "update", "202606041604-E3EJG8"],
        stopReason: null,
        returnControlWhen:
          "after the exact command exits; recompute task next-action before any further step",
        staleStateCheck: "agentplane task next-action 202606041604-E3EJG8 --explain",
        verificationCandidate: "agentplane pr check <task-id>",
      },
    } as TaskRouteDecision;

    const guidance = deriveRouteOperatorGuidance(decision);
    expect(guidance).toMatchObject({
      canExecuteNow: true,
      shouldRunNextCommand: true,
      operatorAction: "run_exact_argv",
      safeCommand: "agentplane pr update 202606041604-E3EJG8",
      diagnosticCommand: "agentplane pr check 202606041604-E3EJG8",
      sourceOfTruth: {
        route: "task_next_action",
        state: "local_task_backend",
        remote: "not_checked",
        diagnostic: "pr_check",
      },
      repeatPolicy: {
        allowed: false,
        maxAttemptsBeforeRecompute: 1,
        recomputeCommand: "agentplane task next-action 202606041604-E3EJG8 --explain",
      },
      fallback: {
        allowed: true,
        command: "agentplane doctor",
      },
      runnerContext: {
        runnerIsRequired: false,
        runnerIsAllowedNow: false,
        localWorkAllowedIfRunnerFails: true,
        runnerFailureMeans: "not_runner_route",
      },
      risks: [
        {
          code: "pr_artifact_freshness_loop",
          mitigationCommand: "agentplane pr check 202606041604-E3EJG8",
        },
        {
          code: "git_hook_side_effect",
          mitigationCommand: "agentplane doctor",
        },
      ],
    });
    expect(routeRunnerContextIsRelevant(guidance)).toBe(false);
  });

  it("points hybrid PR update route diagnostics at PR check", () => {
    const decision = {
      task: {
        id: "202606042157-020DWK",
        title: "Reduce route ambiguity",
        status: "DOING",
        owner: "CODER",
        planApproval: "approved",
        verification: "pending",
        commit: null,
      },
      nextAction: {
        code: "verify_or_update_pr",
        command: "agentplane pr update 202606042157-020DWK",
        summary: "refresh PR artifacts, verify, then queue integration",
        requiresApproval: false,
      },
      oracle: {
        phase: "verify_or_pr_update",
        authoritativeCheckout: "task_worktree",
        authoritativeCheckoutPath: "/repo/.agentplane/worktrees/task",
        mutationPathHint: "/repo/.agentplane/worktrees/task",
        blocker: null,
        nextCommand: "agentplane pr update 202606042157-020DWK",
        summary: "refresh PR artifacts, verify, then queue integration",
      },
      executionPacket: {
        actionKind: "local_command",
        safeToMutate: true,
        exactArgv: ["agentplane", "pr", "update", "202606042157-020DWK"],
        stopReason: null,
        returnControlWhen:
          "after the exact command exits; recompute task next-action before any further step",
        staleStateCheck: "agentplane task next-action 202606042157-020DWK --explain",
        verificationCandidate: "agentplane pr check <task-id>",
      },
    } as TaskRouteDecision;

    expect(deriveRouteOperatorGuidance(decision)).toMatchObject({
      canExecuteNow: true,
      safeCommand: "agentplane pr update 202606042157-020DWK",
      diagnosticCommand: "agentplane pr check 202606042157-020DWK",
      sourceOfTruth: {
        diagnostic: "pr_check",
      },
      repeatPolicy: {
        allowed: false,
      },
    });
  });

  it("keeps runner context visible only for an active runner route", () => {
    const decision = {
      task: {
        id: "202606050513-RUNNER",
        title: "Wait for runner",
        status: "DOING",
        owner: "CODER",
        planApproval: "approved",
        verification: "pending",
        commit: null,
      },
      nextAction: {
        code: "wait_runner",
        command: null,
        summary: "wait for the active runner or reclaim with explicit force if it is orphaned",
        requiresApproval: false,
      },
      oracle: {
        phase: "runner_wait",
        authoritativeCheckout: "task_worktree",
        authoritativeCheckoutPath: "/repo/.agentplane/worktrees/task",
        mutationPathHint: null,
        blocker: { code: "runner_alive", summary: "latest runner still appears alive" },
        nextCommand: null,
        summary: "wait for the active runner or reclaim with explicit force if it is orphaned",
      },
      blockers: [{ code: "runner_alive", summary: "latest runner still appears alive" }],
      executionPacket: {
        actionKind: "wait",
        safeToMutate: false,
        exactArgv: null,
        stopReason: "wait for the active runner or reclaim with explicit force if it is orphaned",
        returnControlWhen:
          "after the waited condition changes or the parent supervisor grants reclaim/escalation",
        staleStateCheck: "agentplane task next-action 202606050513-RUNNER --explain",
        verificationCandidate: null,
      },
    } as TaskRouteDecision;

    const guidance = deriveRouteOperatorGuidance(decision);

    expect(guidance.runnerContext).toMatchObject({
      runnerIsRequired: true,
      runnerIsAllowedNow: false,
      runnerFailureMeans: "inspect_runner_artifacts",
    });
    expect(routeRunnerContextIsRelevant(guidance)).toBe(true);
  });
});
