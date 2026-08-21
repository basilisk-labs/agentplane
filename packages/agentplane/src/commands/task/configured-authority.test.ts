import { describe, expect, it } from "vitest";

import type { SideEffectAuthorityConfig } from "@agentplaneorg/core/config";
import {
  createExecutionGrant,
  createPlanProposal,
  type TaskExecutionContract,
} from "@agentplaneorg/core/tasks";

import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  isOperationAuthorizedByPolicy,
  isOperationAuthorizedByExecutionGrant,
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
  it("compiles plan authority into provider operations without granting scope expansion", () => {
    const contract = {
      selected_mode: "branch_pr",
      declaration: {
        repository_effects: ["repository_write"],
        external_effects: ["network_read", "external_write"],
      },
      authority: { writable_roots: ["packages/app"] },
    } as TaskExecutionContract;
    const grant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: "TASK-1",
        task_revision: 2,
        plan: "Implement and verify.",
        execution_contract: contract,
      }),
      execution_contract: contract,
      actor: "HOST:codex:USER",
      approval_kind: "host_user_decision",
      issued_at: "2026-08-21T10:00:00.000Z",
    });

    expect(isOperationAuthorizedByExecutionGrant(grant, "pr.open")).toBe(true);
    expect(isOperationAuthorizedByExecutionGrant(grant, "integration.enqueue")).toBe(true);
    expect(isOperationAuthorizedByExecutionGrant(grant, "task.scope.extend")).toBe(false);
  });

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

  it("keeps semantic scope expansion USER-owned even in all mode", () => {
    expect(isOperationAuthorizedByPolicy(authority({ mode: "all" }), "task.scope.extend")).toBe(
      false,
    );
  });

  it("allows autonomous integration enqueue in all mode unless explicitly denied", () => {
    expect(isOperationAuthorizedByPolicy(authority({ mode: "all" }), "integration.enqueue")).toBe(
      true,
    );
  });
});
