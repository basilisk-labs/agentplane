import {
  AGENT_WORK_ORDER_V2_VALID_FIXTURE,
  buildAgentSemanticResultV2ValidFixtures,
  validateAgentWorkOrderV2,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import { describe, expect, it } from "vitest";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { admitSemanticResult } from "../shared/semantic-result-admission.js";
import { semanticPurpose } from "./external-agent-purpose.js";

const DIGEST = `sha256:${"a".repeat(64)}`;

function canonicalOrder(): AgentWorkOrderV2 {
  const order = structuredClone(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
  order.task.work_item_id = "build";
  order.canonical_binding = {
    phase: "implementation",
    task_id: order.task.id,
    repository_identity: DIGEST,
    repository_fingerprint: DIGEST,
    plan_revision: 1,
    plan_digest: DIGEST,
    work_item_id: "build",
    attempt: 2,
    claim_id: "claim-2",
    contract_digest: DIGEST,
    authority_digest: DIGEST,
  };
  return validateAgentWorkOrderV2(order);
}

function canonicalResult(order: AgentWorkOrderV2) {
  return {
    ...buildAgentSemanticResultV2ValidFixtures(order.work_order_id).completed,
    canonical_binding: order.canonical_binding,
    canonical_outputs: [{ id: "source", kind: "report", digest: DIGEST }],
  };
}

function owner(order: AgentWorkOrderV2) {
  return {
    task_id: order.task.id,
    work_order_id: order.work_order_id,
    role: order.role,
  };
}

describe("LC-05 shared semantic admission", () => {
  it("normalizes managed and compact external results through one issued contract", () => {
    const order = canonicalOrder();
    const result = canonicalResult(order);
    const {
      schema_version: _schemaVersion,
      kind: _kind,
      canonical_binding: _binding,
      ...compact
    } = result;

    const managed = admitSemanticResult({ owner: owner(order), work_order: order, result });
    const external = admitSemanticResult({
      owner: owner(order),
      work_order: order,
      result: compact,
      format: "semantic_payload_v1",
    });

    expect(external).toEqual(managed);
    expect(managed.application_id).toBe(`result:${order.work_order_id}`);
    expect(admitSemanticResult({ owner: owner(order), work_order: order, result })).toEqual(
      managed,
    );
  });

  it("rejects foreign task, role, WorkOrder, attempt, and model-supplied owner fields", () => {
    const order = canonicalOrder();
    const result = canonicalResult(order);
    for (const issuedOwner of [
      { ...owner(order), task_id: "foreign-task" },
      { ...owner(order), work_order_id: "foreign-order" },
      { ...owner(order), role: "EVALUATOR" as const },
    ]) {
      expect(() => admitSemanticResult({ owner: issuedOwner, work_order: order, result })).toThrow(
        /owner/u,
      );
    }
    expect(() =>
      admitSemanticResult({
        owner: owner(order),
        work_order: order,
        result: {
          ...result,
          canonical_binding: { ...result.canonical_binding!, attempt: 3 },
        },
      }),
    ).toThrow(/canonical_binding/u);
    const {
      schema_version: _schemaVersion,
      kind: _kind,
      canonical_binding: _binding,
      ...compact
    } = result;
    for (const injected of [
      { ...compact, canonical_binding: result.canonical_binding },
      { ...compact, approval: { actor: "model" } },
    ]) {
      expect(() =>
        admitSemanticResult({
          owner: owner(order),
          work_order: order,
          result: injected,
          format: "semantic_payload_v1",
        }),
      ).toThrow();
    }
  });

  it("dispatches only explicit semantic route steps", () => {
    expect(
      semanticPurpose({ workflowStep: { kind: "wait" } } as unknown as TaskRouteDecision),
    ).toBeNull();
    expect(
      semanticPurpose({
        workflowStep: { kind: "agent_episode", episode: { purpose: "implementation" } },
      } as unknown as TaskRouteDecision),
    ).toBe("implementation");
  });
});
