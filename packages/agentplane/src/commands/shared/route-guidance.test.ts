import { describe, expect, it } from "vitest";

import type { TaskRouteDecision } from "./route-decision-types.js";
import { deriveRouteOperatorGuidance } from "./route-guidance.js";

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

    expect(deriveRouteOperatorGuidance(decision)).toMatchObject({
      canExecuteNow: true,
      shouldRunNextCommand: true,
      operatorAction: "run_exact_argv",
      safeCommand: "agentplane pr update 202606041604-E3EJG8",
      diagnosticCommand: "agentplane pr check 202606041604-E3EJG8",
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
  });
});
