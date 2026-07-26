import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildAgentSemanticResultV2ValidFixtures } from "./agent-semantic-result.js";
import {
  AGENT_WORK_ORDER_SEMANTIC_RESULT_SCHEMA,
  AgentWorkOrderPreparationError,
  assertAgentWorkOrderReadyForInvocation,
  listAgentWorkOrderV2SchemaErrors,
  renderAgentWorkOrderV2SchemaJson,
  validateAgentSemanticResultForWorkOrder,
  validateAgentWorkOrderV2,
} from "./agent-work-order.js";
import { AGENT_WORK_ORDER_V2_VALID_FIXTURE } from "./agent-work-order-fixtures.js";
import {
  AGENT_WORK_ORDER_V1_COMPATIBILITY_FIXTURES,
  AgentWorkOrderCasingError,
  buildAgentWorkOrderV1MigrationFixture,
  parseAgentWorkOrderV2,
  readAgentWorkOrderV1CompatibilityView,
  toAgentWorkOrderV2CamelCase,
} from "./agent-work-order-compat.js";
import { buildStateFingerprint } from "./state-fingerprint.js";

function changedFingerprint() {
  return buildStateFingerprint({
    task_id: "task-example-001",
    task_revision: 7,
    git_head: "abcdef0123456789abcdef0123456789abcdef01",
    worktree: "/workspace/agentplane",
    components: {
      task: { state: "present", source: "fixture", value: { revision: 7 } },
      git: { state: "present", source: "fixture", value: { head: "abcdef0123456789" } },
      backend_projection: { state: "present", source: "fixture", value: { revision: 7 } },
      policy: { state: "present", source: "fixture", value: { digest: "policy-v2" } },
      blueprint: { state: "present", source: "fixture", value: { digest: "blueprint-v2" } },
      knowledge: { state: "present", source: "fixture", value: { digest: "knowledge-v1" } },
      provider: { state: "missing", source: "fixture", reason_code: "not_requested" },
      authority: { state: "present", source: "fixture", value: { role: "EXECUTOR" } },
    },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

describe("AgentWorkOrder v2 contract", () => {
  it("accepts the generated public fixture", async () => {
    const fixture = JSON.parse(
      await readFile(
        path.join(process.cwd(), "schemas", "examples", "agent-work-order-v2.valid.json"),
        "utf8",
      ),
    ) as unknown;

    expect(validateAgentWorkOrderV2(fixture)).toEqual(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
  });

  it("renders a strict public schema with canonical v2 fields", () => {
    const schema = JSON.parse(renderAgentWorkOrderV2SchemaJson()) as {
      $id?: string;
      additionalProperties?: boolean;
      properties?: Record<string, unknown>;
    };

    expect(schema.$id).toBe("https://agentplane.org/schemas/agent-work-order-v2.schema.json");
    expect(schema.additionalProperties).toBe(false);
    expect(Object.keys(schema.properties ?? {})).toEqual(
      expect.arrayContaining([
        "state_fingerprint",
        "authority",
        "context_intent",
        "prepared_evidence",
        "verification_intent",
        "semantic_result_schema",
      ]),
    );
  });

  it("migrates representative v1 brief, runner, and Hermes views only with explicit v2 facts", () => {
    for (const source_surface of ["brief", "runner", "hermes"] as const) {
      const compatibility = readAgentWorkOrderV1CompatibilityView({
        source_surface,
        payload: AGENT_WORK_ORDER_V1_COMPATIBILITY_FIXTURES[source_surface],
      });
      const migration = buildAgentWorkOrderV1MigrationFixture(source_surface);

      expect(compatibility.source_version).toBe(1);
      expect(compatibility.task.id).toBe(AGENT_WORK_ORDER_V2_VALID_FIXTURE.task.id);
      expect(compatibility.omissions).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: "authority",
            reason_code: "legacy_v1_field_not_carried",
          }),
          expect.objectContaining({ field: "state_fingerprint" }),
          expect.objectContaining({ field: "prepared_evidence" }),
        ]),
      );
      expect(migration.work_order).toEqual(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
    }
  });

  it("centralizes camelCase parsing and rejects duplicate aliases", () => {
    const camelCase = toAgentWorkOrderV2CamelCase(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
    expect(parseAgentWorkOrderV2(camelCase)).toEqual(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
    expect(isRecord(camelCase)).toBe(true);
    if (!isRecord(camelCase)) return;

    expect(() =>
      parseAgentWorkOrderV2({
        ...camelCase,
        work_order_id: AGENT_WORK_ORDER_V2_VALID_FIXTURE.work_order_id,
      }),
    ).toThrow(AgentWorkOrderCasingError);
  });

  it("rejects stale work orders before agent invocation with a typed diagnostic", () => {
    expect(
      assertAgentWorkOrderReadyForInvocation({
        work_order: AGENT_WORK_ORDER_V2_VALID_FIXTURE,
        current_state_fingerprint: AGENT_WORK_ORDER_V2_VALID_FIXTURE.state_fingerprint,
      }).precondition.status,
    ).toBe("fresh");

    expect(() =>
      assertAgentWorkOrderReadyForInvocation({
        work_order: AGENT_WORK_ORDER_V2_VALID_FIXTURE,
        current_state_fingerprint: changedFingerprint(),
      }),
    ).toThrow(AgentWorkOrderPreparationError);
    try {
      assertAgentWorkOrderReadyForInvocation({
        work_order: AGENT_WORK_ORDER_V2_VALID_FIXTURE,
        current_state_fingerprint: changedFingerprint(),
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AgentWorkOrderPreparationError);
      expect((error as AgentWorkOrderPreparationError).diagnostic.code).toBe(
        "state_fingerprint_stale",
      );
    }
  });

  it("rejects tampered fingerprint and knowledge evidence before launch", () => {
    const tamperedFingerprint = structuredClone(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
    tamperedFingerprint.state_fingerprint.digest = `sha256:${"0".repeat(64)}`;
    expect(listAgentWorkOrderV2SchemaErrors(tamperedFingerprint)).not.toEqual([]);

    const tamperedKnowledge = structuredClone(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
    tamperedKnowledge.knowledge_refs[0].digest = `sha256:${"2".repeat(64)}`;
    expect(listAgentWorkOrderV2SchemaErrors(tamperedKnowledge)).not.toEqual([]);

    const missingRequiredExcerpt = structuredClone(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
    missingRequiredExcerpt.prepared_evidence = [];
    expect(listAgentWorkOrderV2SchemaErrors(missingRequiredExcerpt)).not.toEqual([]);
  });

  it("keeps EXECUTOR evidence and verification intent without lifecycle authority", () => {
    const executor = AGENT_WORK_ORDER_V2_VALID_FIXTURE;
    expect(executor.role).toBe("EXECUTOR");
    expect(executor.prepared_evidence).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          role: "EXECUTOR",
          excerpt: expect.objectContaining({ status: "included" }) as unknown,
        }),
      ]),
    );
    expect(executor.verification_intent.requirements).not.toEqual([]);
    expect(executor.authority.allowed_tool_classes).not.toContain("lifecycle");
    expect(executor.authority.external_side_effects).toEqual([]);
    expect(
      listAgentWorkOrderV2SchemaErrors({
        ...executor,
        authority: {
          ...executor.authority,
          allowed_tool_classes: [...executor.authority.allowed_tool_classes, "lifecycle"],
        },
      }),
    ).not.toEqual([]);
  });

  it("binds semantic results to the prepared work-order id", () => {
    const semanticResult = buildAgentSemanticResultV2ValidFixtures(
      AGENT_WORK_ORDER_V2_VALID_FIXTURE.work_order_id,
    ).completed;
    expect(
      validateAgentSemanticResultForWorkOrder({
        work_order: AGENT_WORK_ORDER_V2_VALID_FIXTURE,
        semantic_result: semanticResult,
      }),
    ).toEqual(semanticResult);
    expect(() =>
      validateAgentSemanticResultForWorkOrder({
        work_order: AGENT_WORK_ORDER_V2_VALID_FIXTURE,
        semantic_result: { ...semanticResult, work_order_id: "different-work-order" },
      }),
    ).toThrow(/work_order_id/u);
    expect(AGENT_WORK_ORDER_SEMANTIC_RESULT_SCHEMA).toBe("agentplane.agent_semantic_result.v2");
  });
});
