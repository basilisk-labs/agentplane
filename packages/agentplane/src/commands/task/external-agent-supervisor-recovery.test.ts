import { describe, expect, it } from "vitest";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { ExternalAgentExchange } from "./external-agent-exchange.js";
import {
  requiresImplementationRecoveryReplacement,
  requiresPlanningRecoveryReplacement,
} from "./external-agent-supervisor-recovery.js";

describe("external agent recovery authority", () => {
  it("requires replacement when a non-planning result predates an explicit PLANNER reset", () => {
    const stateFingerprint = `sha256:${"a".repeat(64)}`;
    const planningFingerprint = `sha256:${"b".repeat(64)}`;
    expect(
      requiresPlanningRecoveryReplacement({
        decision: {
          workflowStep: {
            kind: "agent_episode",
            episode: { purpose: "planning" },
            preconditionFingerprint: { digest: planningFingerprint },
          },
        } as never,
        exchange: {
          purpose: "implementation",
          state_fingerprint: stateFingerprint,
        } as ExternalAgentExchange,
      }),
    ).toBe(true);
  });

  it.each([
    ["result_received", true, true],
    ["result_received", false, false],
    ["accepted", true, false],
    ["consumed", true, false],
  ])("bounds planning replacement for %s with drift=%s", (status, drift, expected) => {
    const fingerprint = `sha256:${"a".repeat(64)}`;
    expect(
      requiresPlanningRecoveryReplacement({
        decision: {
          workflowStep: {
            kind: "agent_episode",
            episode: { purpose: "planning" },
            preconditionFingerprint: {
              digest: drift ? `sha256:${"b".repeat(64)}` : fingerprint,
            },
          },
        } as never,
        exchange: {
          purpose: "planning",
          status,
          state_fingerprint: fingerprint,
        } as ExternalAgentExchange,
      }),
    ).toBe(expected);
  });

  it("requires replacement when plan approval changes pending implementation authority", () => {
    const taskDigest = `sha256:${"a".repeat(64)}`;
    const backendDigest = `sha256:${"b".repeat(64)}`;
    const authorityDigest = `sha256:${"e".repeat(64)}`;
    const fingerprint = {
      task_id: "202608171106-XFN696",
      task_revision: 16,
      worktree: "/repo/.agentplane/worktrees/task",
      components: {
        task: { digest: taskDigest },
        backend_projection: { digest: backendDigest },
        provider: { digest: `sha256:${"0".repeat(64)}` },
        authority: { digest: authorityDigest },
      },
    };
    const decision = {
      workflowStep: {
        preconditionFingerprint: {
          ...fingerprint,
          task_revision: 19,
          digest: `sha256:${"c".repeat(64)}`,
        },
      },
    } as never;
    const exchange = { purpose: "task_worktree_resolution" } as ExternalAgentExchange;
    const workOrder = { state_fingerprint: fingerprint } as AgentWorkOrderV2;

    expect(
      requiresImplementationRecoveryReplacement({ decision, exchange, work_order: workOrder }),
    ).toBe(true);
    expect(
      requiresImplementationRecoveryReplacement({
        decision,
        exchange: { purpose: "implementation_rework" } as ExternalAgentExchange,
        work_order: workOrder,
      }),
    ).toBe(true);
    expect(
      requiresImplementationRecoveryReplacement({
        decision: {
          workflowStep: {
            preconditionFingerprint: {
              ...fingerprint,
              digest: `sha256:${"d".repeat(64)}`,
            },
          },
        } as never,
        exchange,
        work_order: workOrder,
      }),
    ).toBe(false);
    expect(
      requiresImplementationRecoveryReplacement({
        decision: {
          workflowStep: {
            preconditionFingerprint: {
              ...fingerprint,
              components: {
                ...fingerprint.components,
                authority: { digest: `sha256:${"f".repeat(64)}` },
              },
            },
          },
        } as never,
        exchange,
        work_order: workOrder,
      }),
    ).toBe(true);
  });
});
