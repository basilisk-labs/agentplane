import { describe, expect, it } from "vitest";

import type { SideEffectAuthorityConfig } from "@agentplaneorg/core/config";

import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  isOperationAuthorizedByPolicy,
  resolveConfiguredAuthority,
} from "./configured-authority.js";

function authority(overrides: Partial<SideEffectAuthorityConfig>): SideEffectAuthorityConfig {
  return {
    mode: "manual",
    actor: "POLICY:repository",
    allow_operations: [],
    deny_operations: [],
    ttl_minutes: 15,
    ...overrides,
  };
}

describe("configured repository authority", () => {
  it("never resolves primary plan approval from repository policy", async () => {
    const result = await resolveConfiguredAuthority({
      command: {} as CommandContext,
      decision: {
        workflowStep: {
          kind: "approval",
          request: { type: "plan_approval" },
        },
      } as TaskRouteDecision,
    });

    expect(result).toEqual({
      state: "not_applicable",
      reason: "semantic approvals remain operator-owned",
    });
  });

  it("keeps manual mode closed", () => {
    expect(isOperationAuthorizedByPolicy(authority({}), "pr.open")).toBe(false);
  });

  it("allows only explicitly listed operations in policy mode", () => {
    const config = authority({ mode: "policy", allow_operations: ["pr.open"] });
    expect(isOperationAuthorizedByPolicy(config, "pr.open")).toBe(true);
    expect(isOperationAuthorizedByPolicy(config, "pr.head.publish")).toBe(false);
  });

  it("lets deny rules override explicit all mode", () => {
    const config = authority({ mode: "all", deny_operations: ["integration.enqueue"] });
    expect(isOperationAuthorizedByPolicy(config, "pr.open")).toBe(true);
    expect(isOperationAuthorizedByPolicy(config, "integration.enqueue")).toBe(false);
  });
});
