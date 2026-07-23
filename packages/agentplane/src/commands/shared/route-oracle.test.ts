import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { deriveRouteExecutionPacket, deriveRouteOracle, type RouteOracle } from "./route-oracle.js";

describe("route oracle execution packet", () => {
  it("classifies actionable wait_hosted_checks commands as local commands", () => {
    const task = {
      id: "202605281713-EW6N63",
      title: "Route packet task",
      description: "Exercise execution packet classification.",
      status: "DOING",
      priority: "med",
      owner: "INTEGRATOR",
      depends_on: [],
      tags: ["code"],
      verify: [],
      plan_approval: {
        state: "approved",
        approved_by: "ORCHESTRATOR",
        approved_at: "2026-05-28T00:00:00.000Z",
      },
      verification: {
        state: "ok",
        verified_by: "EVALUATOR",
        verified_at: "2026-05-28T00:00:00.000Z",
        note: "ok",
      },
    } satisfies TaskData;
    const oracle: RouteOracle = {
      phase: "pr_open_integration_lane",
      authoritativeCheckout: "base_checkout",
      authoritativeCheckoutPath: "/repo",
      mutationPathHint: "/repo",
      blocker: null,
      nextCommand:
        "agentplane integrate queue enqueue 202605281713-EW6N63 --branch task/202605281713-EW6N63/route-packet-task",
      summary: "enqueue the verified branch after hosted checks are stable",
    };

    const packet = deriveRouteExecutionPacket({
      task,
      blockers: [],
      oracle,
      nextAction: {
        code: "wait_hosted_checks",
        command: oracle.nextCommand,
        summary: oracle.summary,
        requiresApproval: false,
      },
    });

    expect(packet).toMatchObject({
      actionKind: "local_command",
      safeToMutate: true,
      recommendedRole: "INTEGRATOR",
      stopReason: null,
      mutationPathHint: "/repo",
      mustRunFrom: "/repo",
      exactArgv: [
        "agentplane",
        "integrate",
        "queue",
        "enqueue",
        "202605281713-EW6N63",
        "--branch",
        "task/202605281713-EW6N63/route-packet-task",
      ],
      returnControlWhen:
        "after the exact command exits; recompute task next-action before any further step",
      staleStateCheck: "agentplane task next-action 202605281713-EW6N63 --explain",
    });
    expect(packet.mustNot).toContain(
      "do not merge/rebase/squash the task branch manually; integrate queue/integrate own the serialized merge lane",
    );
    expect(packet.mustNot).toContain(
      "do not amend only to align quality_review.evaluated_sha; rerun evaluator on current HEAD, then recompute the route",
    );
  });

  it("classifies no-command wait actions as wait instead of terminal stop", () => {
    const task = {
      id: "202605281713-WAIT01",
      title: "Route packet wait task",
      description: "Exercise wait classification.",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["code"],
      verify: [],
      plan_approval: {
        state: "approved",
        approved_by: "ORCHESTRATOR",
        approved_at: "2026-05-28T00:00:00.000Z",
      },
    } satisfies TaskData;
    const oracle: RouteOracle = {
      phase: "runner_wait",
      authoritativeCheckout: "task_worktree",
      authoritativeCheckoutPath: "/repo/.agentplane/worktrees/task",
      mutationPathHint: null,
      blocker: { code: "runner_alive", summary: "runner is still active" },
      nextCommand: null,
      summary: "wait for the active runner or reclaim with explicit force if it is orphaned",
    };

    const packet = deriveRouteExecutionPacket({
      task,
      blockers: [{ code: "runner_alive", summary: "runner is still active" }],
      oracle,
      nextAction: {
        code: "wait_runner",
        command: null,
        summary: oracle.summary,
        requiresApproval: false,
      },
    });

    expect(packet).toMatchObject({
      actionKind: "wait",
      safeToMutate: false,
      exactArgv: null,
      returnControlWhen:
        "after the waited condition changes or the parent supervisor grants reclaim/escalation",
      stopReason: oracle.summary,
    });
    expect(packet.mustNot).toContain(
      "do not reclaim or force progress without explicit parent approval",
    );
  });

  it("hands pending verification to TESTER without exposing enqueue argv", () => {
    const task = {
      id: "202605281713-VERIFY",
      title: "Verify task",
      description: "Require evidence before integration.",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["code"],
      verify: ["bun test"],
      plan_approval: {
        state: "approved",
        approved_by: "ORCHESTRATOR",
        approved_at: "2026-05-28T00:00:00.000Z",
      },
      verification: { state: "pending" },
    } satisfies TaskData;
    const blocker = {
      code: "verification_required" as const,
      summary: "the committed implementation has no passing verification record",
    };
    const nextAction = {
      code: "verification_required",
      command: null,
      summary: "hand the committed implementation to TESTER",
      requiresApproval: false,
    };
    const oracle = deriveRouteOracle({
      task,
      workflowMode: "branch_pr",
      nextAction,
      blockers: [blocker],
      batchOwnership: { role: "none" },
      paths: {
        baseCheckoutPath: "/repo",
        taskWorktreePath: "/repo/.agentplane/worktrees/task",
        currentCheckoutPath: "/repo",
      },
    });
    const packet = deriveRouteExecutionPacket({
      task,
      blockers: [blocker],
      nextAction,
      oracle,
    });

    expect(oracle).toMatchObject({
      phase: "verification_required",
      authoritativeCheckout: "task_worktree",
      authoritativeCheckoutPath: "/repo/.agentplane/worktrees/task",
      mutationPathHint: null,
      nextCommand: null,
    });
    expect(packet).toMatchObject({
      actionKind: "stop",
      safeToMutate: false,
      recommendedRole: "TESTER",
      exactArgv: null,
      evidenceMissing: ["verification_record"],
      verificationCandidate: "agentplane task verify-show <task-id>",
    });
  });

  it("keeps hybrid verify_or_update_pr packets on the CODER rail", () => {
    const task = {
      id: "202606042157-020DWK",
      title: "Route packet hybrid task",
      description: "Exercise hybrid PR update and verification guidance.",
      status: "DOING",
      priority: "high",
      owner: "CODER",
      depends_on: [],
      tags: ["code"],
      verify: [],
      plan_approval: {
        state: "approved",
        approved_by: "ORCHESTRATOR",
        approved_at: "2026-06-04T00:00:00.000Z",
      },
    } satisfies TaskData;
    const oracle: RouteOracle = {
      phase: "verify_or_pr_update",
      authoritativeCheckout: "task_worktree",
      authoritativeCheckoutPath: "/repo/.agentplane/worktrees/task",
      mutationPathHint: "/repo/.agentplane/worktrees/task",
      blocker: null,
      nextCommand: "agentplane pr update 202606042157-020DWK",
      summary: "refresh PR artifacts, verify, then queue integration",
    };

    const packet = deriveRouteExecutionPacket({
      task,
      blockers: [],
      oracle,
      nextAction: {
        code: "verify_or_update_pr",
        command: oracle.nextCommand,
        summary: oracle.summary,
        requiresApproval: false,
      },
    });

    expect(packet).toMatchObject({
      actionKind: "local_command",
      recommendedRole: "CODER",
      exactArgv: ["agentplane", "pr", "update", "202606042157-020DWK"],
      verificationCandidate: "agentplane pr check <task-id>",
      evidenceMissing: ["verification_record"],
    });
    expect(packet.mustNot).toContain(
      "do not repair stale PR artifacts with manual edits or amend commits; agentplane pr update/pr check own PR artifact freshness",
    );
    expect(packet.mustNot).toContain(
      "do not amend only to align quality_review.evaluated_sha; rerun evaluator on current HEAD, then recompute the route",
    );
  });

  it("keeps quoted command arguments intact in exact argv packets", () => {
    const task = {
      id: "202605281713-QUOTE1",
      title: "Route packet quoted task",
      description: "Exercise exact argv quoting.",
      status: "DOING",
      priority: "med",
      owner: "CODER",
      depends_on: [],
      tags: ["code"],
      verify: [],
      plan_approval: {
        state: "approved",
        approved_by: "ORCHESTRATOR",
        approved_at: "2026-05-28T00:00:00.000Z",
      },
    } satisfies TaskData;
    const oracle: RouteOracle = {
      phase: "stale_runner",
      authoritativeCheckout: "task_worktree",
      authoritativeCheckoutPath: "/repo/.agentplane/worktrees/task",
      mutationPathHint: "/repo/.agentplane/worktrees/task",
      blocker: null,
      nextCommand:
        'agentplane task reclaim 202605281713-QUOTE1 --author CODER --reason "stale runner pid is no longer alive"',
      summary: "reclaim stale runner",
    };

    const packet = deriveRouteExecutionPacket({
      task,
      blockers: [],
      oracle,
      nextAction: {
        code: "cancel_then_resume",
        command: oracle.nextCommand,
        summary: oracle.summary,
        requiresApproval: false,
      },
    });

    expect(packet.exactArgv).toEqual([
      "agentplane",
      "task",
      "reclaim",
      "202605281713-QUOTE1",
      "--author",
      "CODER",
      "--reason",
      "stale runner pid is no longer alive",
    ]);
  });

  it("stops shell-chain commands until the route is split into argv-safe steps", () => {
    const task = {
      id: "202605281713-SHELL1",
      title: "Route packet shell task",
      description: "Exercise unsafe shell command classification.",
      status: "DOING",
      priority: "med",
      owner: "INTEGRATOR",
      depends_on: [],
      tags: ["code"],
      verify: [],
      plan_approval: {
        state: "approved",
        approved_by: "ORCHESTRATOR",
        approved_at: "2026-05-28T00:00:00.000Z",
      },
    } satisfies TaskData;
    const oracle: RouteOracle = {
      phase: "hosted_close_recorded_upstream",
      authoritativeCheckout: "base_checkout",
      authoritativeCheckoutPath: "/repo",
      mutationPathHint: "/repo",
      blocker: null,
      nextCommand: "git fetch origin main && git merge --ff-only origin/main",
      summary: "sync hosted close back to base",
    };

    const packet = deriveRouteExecutionPacket({
      task,
      blockers: [],
      oracle,
      nextAction: {
        code: "sync_hosted_close",
        command: oracle.nextCommand,
        summary: oracle.summary,
        requiresApproval: false,
      },
    });

    expect(packet).toMatchObject({
      actionKind: "stop",
      safeToMutate: false,
      exactArgv: null,
      stopReason:
        "next command is not argv-safe; route must be split before an external agent can execute it",
    });
    expect(packet.returnControlWhen).toContain("split into argv-safe steps");
    expect(packet.mustNot).toContain(
      "do not recreate close-tail evidence after hosted close landed; sync base truth, then run AgentPlane cleanup",
    );
  });
});
