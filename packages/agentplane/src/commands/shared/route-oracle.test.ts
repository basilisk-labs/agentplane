import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { deriveRouteExecutionPacket, type RouteOracle } from "./route-oracle.js";

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
    });
  });
});
