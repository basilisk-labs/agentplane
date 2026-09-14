import { describe, expect, it } from "vitest";

import {
  AGENT_WORK_ORDER_V2_VALID_FIXTURE,
  buildAgentSemanticResultV2ValidFixtures,
} from "@agentplaneorg/core/schemas";

import {
  externalAgentUsageAccounting,
  validateExternalAgentResultEnvelope,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";

function exchange(): ExternalAgentExchange {
  const order = AGENT_WORK_ORDER_V2_VALID_FIXTURE;
  return {
    schema_version: 1,
    kind: "external_agent_exchange",
    status: "issued",
    issue_digest_version: 2,
    result_format: "semantic_payload_v1",
    task_id: order.task.id,
    transition_id: `tr_${"b".repeat(32)}`,
    state_fingerprint: order.state_fingerprint.digest,
    role: order.role,
    purpose: "implementation",
    checkout: "/repo",
    work_order_id: order.work_order_id,
    work_order_ref: "/repo/work-order.json",
    result_schema_ref: "/repo/result-schema.json",
    result_ref: "/repo/result.json",
    evaluator_work_order_ref: null,
    baseline: { head: null, changed_paths: [] },
    result_digest: null,
    result: null,
    postcondition_fingerprint: null,
    created_at: "2026-09-12T00:00:00.000Z",
    updated_at: "2026-09-12T00:00:00.000Z",
  };
}

describe("roadmap external accounting", () => {
  it("keeps a shared host turn explicitly unallocatable", () => {
    const current = exchange();
    current.host_usage = {
      schema_version: 1,
      observed_by: "host_transport",
      state: "unallocatable",
      reason: "external_host_turn_not_task_attributable",
      provider_usage: null,
      usage: null,
    };

    expect(externalAgentUsageAccounting({ exchange: current })).toEqual({
      usage: {},
      usage_attribution: {
        state: "unallocatable",
        reason: "external_host_turn_not_task_attributable",
      },
    });
  });

  it("accepts identity-bound host observations and rejects cross-work-order attribution", () => {
    const current = exchange();
    current.host_usage = {
      schema_version: 1,
      observed_by: "host_transport",
      state: "observed",
      reason: null,
      provider_usage: {
        provider: "codex",
        run_id: "run-host",
        work_order_id: current.work_order_id,
        thread_id: "thread-host",
        turn_id: "turn-host",
      },
      usage: { input_tokens: 20, output_tokens: 5, total_tokens: 25 },
    };

    expect(externalAgentUsageAccounting({ exchange: current })).toMatchObject({
      usage: { input_tokens: 20, output_tokens: 5, total_tokens: 25 },
      provider_usage: {
        provider: "codex",
        run_id: "run-host",
        work_order_id: current.work_order_id,
      },
      usage_attribution: { state: "observed", reason: null },
    });
    current.host_usage.provider_usage!.work_order_id = "foreign-work-order";
    expect(() => externalAgentUsageAccounting({ exchange: current })).toThrow(
      "does not match the exchange",
    );
  });

  it("does not accept model-supplied token claims as observed usage", () => {
    const order = AGENT_WORK_ORDER_V2_VALID_FIXTURE;
    const current = exchange();
    const result = buildAgentSemanticResultV2ValidFixtures(order.work_order_id).completed;
    const { schema_version: _version, kind: _kind, ...payload } = result;

    expect(() =>
      validateExternalAgentResultEnvelope({
        raw: { ...payload, usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 } },
        exchange: current,
        work_order: order,
      }),
    ).toThrow("Invalid external-agent semantic result");
    expect(externalAgentUsageAccounting({ exchange: current })).toMatchObject({
      usage: {},
      usage_attribution: {
        state: "unavailable",
        reason: "legacy_external_host_usage_unavailable",
      },
    });
  });
});
