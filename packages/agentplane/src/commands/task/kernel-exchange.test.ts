import { describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { isKernelScopeExpansionRecovery } from "./kernel-exchange.js";

const requirements = (scope_roots: string[]) => ({
  scope_roots,
  repository_effects: ["source_code"],
  external_effects: [],
  capabilities: ["repository_write"],
  resources: [],
});

function fixture() {
  const previous = {
    id: "build",
    contract_digest: k.kernelDigest("contract"),
    depends_on: [],
    required_inputs: [],
    expected_outputs: ["source"],
    execution_requirements: requirements(["src"]),
    optional: false,
  } satisfies k.WorkItemDefinition;
  const amended = {
    ...previous,
    execution_requirements: requirements(["src", "shared"]),
  } satisfies k.WorkItemDefinition;
  const source = {
    revision: 1,
    digest: k.kernelDigest({ revision: 1, work_items: [previous] }),
    state: "SUPERSEDED" as const,
    approval_actor_id: "USER",
    approval_evidence_digest: k.kernelDigest("original-approval"),
    work_items: [previous],
  };
  const currentDigest = k.kernelDigest({ revision: 2, work_items: [amended] });
  const current = {
    revision: 2,
    digest: currentDigest,
    state: "APPROVED" as const,
    approval_actor_id: "USER",
    approval_evidence_digest: k.planScopeExpansionApprovalDigest({
      task_id: "T-1",
      current_plan_digest: source.digest,
      amended_plan_digest: currentDigest,
      actor_id: "USER",
    }),
    work_items: [amended],
  };
  const record = {
    aggregate: {
      id: "T-1",
      current_plan: current,
      plan_history: [source],
      work_items: {
        build: {
          definition: amended,
          state: "EXECUTING",
          revision: 4,
          attempt: 2,
          claim_id: k.kernelDigest("claim"),
          result_digest: null,
          output_manifests: [],
          validation: null,
        },
      },
      authority_lineage: [
        {
          authority: {
            scope_roots: ["src", "shared"],
            repository_effects: ["source_code"],
            external_effects: [],
            capabilities: ["repository_write"],
            resources: [],
          },
        },
      ],
    },
  } as unknown as KernelRecord;
  const order = {
    canonical_binding: {
      phase: "implementation",
      task_id: "T-1",
      work_item_id: "build",
      attempt: 2,
      plan_revision: 2,
      plan_digest: currentDigest,
    },
  } as unknown as AgentWorkOrderV2;
  return { order, record };
}

describe("canonical exchange scope recovery", () => {
  it("recognizes only the exact USER-approved additive WorkItem scope amendment", () => {
    const { order, record } = fixture();
    expect(isKernelScopeExpansionRecovery(order, record)).toBe(true);
    record.aggregate.current_plan!.approval_evidence_digest = k.kernelDigest("wrong") as never;
    expect(isKernelScopeExpansionRecovery(order, record)).toBe(false);
  });

  it("does not treat a repeated attempt alone as scope recovery", () => {
    const { order, record } = fixture();
    record.aggregate.plan_history[0]!.work_items[0]!.execution_requirements.scope_roots = [
      "src",
      "shared",
    ] as never;
    expect(isKernelScopeExpansionRecovery(order, record)).toBe(false);
  });
});
