import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import {
  AGENT_WORK_ORDER_V2_VALID_FIXTURE,
  validateAgentWorkOrderV2,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import { createRepositorySnapshot, taskCentricDigest } from "@agentplaneorg/core/tasks";
import { makeRunnerContextBundle, setRunnerBundleRunDir } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import { writePreparedRunnerArtifacts } from "../artifacts.js";
import { readRunnerResultManifest } from "../result-manifest.js";
import { createRunnerAdapter } from "./index.js";
import {
  createCodexResultEventCollector,
  materializeCodexResultTransport,
  renderCodexResultOutputSchemaJson,
} from "./codex-result-transport.js";

const tempRoots: string[] = [];
const digest = `sha256:${"a".repeat(64)}`;

afterEach(async () => {
  await Promise.all(
    tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true, force: true })),
  );
});

function buildWorkOrder(
  role: AgentWorkOrderV2["role"],
  phase?: "planning" | "implementation" | "inspection",
): AgentWorkOrderV2 {
  const order = structuredClone(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
  order.work_order_id = `managed-${role.toLowerCase()}-${phase ?? "ordinary"}`;
  order.role = role;
  order.prepared_evidence = order.prepared_evidence.map((prepared) => ({ ...prepared, role }));
  if (role === "PLANNER") {
    const repositorySnapshot = createRepositorySnapshot({
      git: { kind: "commit", sha: "1".repeat(40), ref: "refs/heads/main" },
      dirty_paths: [],
      policy_digest: digest,
      config_digest: digest,
      context_digest: digest,
      task_history_cursor: null,
      captured_at: "2026-09-13T00:00:00.000Z",
    });
    const planningContext = {
      schema_version: 1 as const,
      repository_snapshot: repositorySnapshot,
      retrievals: [],
    };
    order.planning_context = {
      ...planningContext,
      digest: taskCentricDigest(planningContext),
    };
  }
  if (phase) {
    const common = {
      phase,
      task_id: order.task.id,
      repository_identity: digest,
      repository_fingerprint: digest,
      plan_revision: 1,
      plan_digest: digest,
    } as const;
    if (phase === "planning") {
      order.canonical_binding = common;
    } else {
      order.task.work_item_id = "build";
      order.canonical_binding = {
        ...common,
        work_item_id: "build",
        attempt: 1,
        claim_id: "claim-1",
        contract_digest: digest,
        authority_digest: digest,
        ...(phase === "inspection" ? { result_digest: digest } : {}),
      };
    }
  }
  if (phase === "inspection") {
    order.authority = {
      ...order.authority,
      mutation_scope: "none",
      writable_roots: [],
    };
  }
  return validateAgentWorkOrderV2(order);
}

const basePayload = {
  status: "completed",
  summary: "Managed semantic transport preserved the typed payload.",
  findings: ["Typed payload reached the acceptance boundary."],
  uncertainty: [],
  claimed_checks: [
    { check: "transport", claimed_status: "passed", details: "Agent-reported only." },
  ],
} as const;

const compactPlan = {
  schema_version: 2,
  criteria: [
    { id: "criterion", description: "Preserve the payload.", required: true, check_ids: ["check"] },
  ],
  checks: [{ id: "check", kind: "deterministic", required: true, capability: "run_checks" }],
  work_items: [
    {
      id: "build",
      objective: "Preserve the payload.",
      depends_on: [],
      required_inputs: [],
      expected_outputs: ["source"],
      scope_roots: ["packages/agentplane"],
      context: { required_sources: [], optional_sources: [], symbol_hints: [], max_bytes: 4096 },
      risk: "low",
      capabilities: ["repository_write"],
      resource_claims: [],
      optional: false,
      priority: 1,
    },
  ],
  assumptions: [],
  unresolved_questions: [],
} as const;

const canonicalPlan = {
  work_items: [
    {
      id: "build",
      depends_on: [],
      required_inputs: [],
      expected_outputs: ["source"],
      execution_requirements: {
        scope_roots: ["packages/agentplane"],
        repository_effects: ["source_code"],
        external_effects: [],
        capabilities: ["repository_write"],
        resources: [],
      },
      optional: false,
      contract: {
        objective: "Preserve the payload.",
        acceptance_criteria: ["The typed payload is retained."],
        verification_commands: ["bun run typecheck"],
        role: "EXECUTOR",
      },
    },
  ],
} as const;

const cases = [
  {
    label: "ordinary PLANNER",
    workOrder: buildWorkOrder("PLANNER"),
    roleField: "task_plan_proposal",
    payload: {
      ...basePayload,
      task_intent: {
        task_kind: "code",
        mutation_scope: "code",
        risk_flags: ["security"],
        tags: ["transport"],
        blueprint_request: "code.direct",
        execution: {
          schema_version: 2,
          preferred_mode: "direct",
          scope_roots: ["packages/agentplane"],
          repository_effects: ["source_code", "tests"],
          external_effects: [],
          reversibility: "reversible",
          rationale: ["The change is locally verifiable."],
          requirements_uncertainty: "bounded",
          implementation_uncertainty: "bounded",
        },
      },
      task_plan_proposal: compactPlan,
    },
  },
  {
    label: "ordinary EXECUTOR",
    workOrder: buildWorkOrder("EXECUTOR"),
    roleField: "plan_refinement",
    payload: {
      ...basePayload,
      plan_refinement: {
        description: "Add the missing transport regression.",
        scope_roots_added: [],
        outputs_added: ["transport regression"],
        acceptance_changed: false,
        risk_changed: false,
        external_effects_added: [],
        dependencies_changed: false,
        architecture_constraints_changed: false,
        operations: ["add_test"],
      },
    },
  },
  {
    label: "blocked EXECUTOR",
    workOrder: buildWorkOrder("EXECUTOR"),
    roleField: "blocker",
    payload: {
      ...basePayload,
      status: "blocked",
      summary: "Managed execution stopped at a semantic blocker.",
      blocker: {
        summary: "The required input is unavailable.",
        recommended_action: "Supply the missing bounded input.",
      },
    },
  },
  {
    label: "failed EXECUTOR",
    workOrder: buildWorkOrder("EXECUTOR"),
    roleField: "claimed_checks",
    payload: {
      ...basePayload,
      status: "failed",
      summary: "Managed execution reported a semantic failure.",
      findings: ["The typed failure reached the acceptance boundary."],
    },
  },
  {
    label: "ordinary EVALUATOR",
    workOrder: buildWorkOrder("EVALUATOR"),
    roleField: "review",
    payload: {
      ...basePayload,
      review: {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    },
  },
  {
    label: "context CURATOR",
    workOrder: buildWorkOrder("CURATOR"),
    roleField: "knowledge_request",
    payload: {
      ...basePayload,
      status: "needs_context",
      blocker: {
        summary: "A source is missing.",
        recommended_action: "Retrieve the bounded source.",
        scope_extension_request: {
          schema_version: 1,
          scope_roots: ["context/wiki"],
          repository_effects: [],
          rationale: "The source is required by the WorkOrder.",
        },
      },
      knowledge_request: {
        schema_version: 1,
        kind: "knowledge_request",
        query: "Find the required contract.",
        reason: "The current context does not contain it.",
        desired_kind: "source",
        scope: "task_context",
        blocking: true,
      },
    },
  },
  {
    label: "canonical PLANNER",
    workOrder: buildWorkOrder("PLANNER", "planning"),
    roleField: "canonical_plan",
    payload: { ...basePayload, canonical_plan: canonicalPlan },
  },
  {
    label: "canonical EXECUTOR",
    workOrder: buildWorkOrder("EXECUTOR", "implementation"),
    roleField: "canonical_outputs",
    payload: {
      ...basePayload,
      canonical_outputs: [{ id: "source", kind: "source", digest }],
    },
  },
  {
    label: "canonical EVALUATOR",
    workOrder: buildWorkOrder("EVALUATOR", "inspection"),
    roleField: "review",
    payload: {
      ...basePayload,
      review: {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    },
  },
] as const;

describe("roadmap managed semantic output parity", () => {
  it.each(cases)(
    "preserves every typed field for $label",
    async ({ workOrder, roleField, payload }) => {
      const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-roadmap-output-parity-"));
      tempRoots.push(root);
      const bundle = makeRunnerContextBundle({ gitRoot: root, mode: "execute" });
      bundle.work_order = workOrder;
      setRunnerBundleRunDir(bundle, path.join(root, "runs", workOrder.work_order_id));
      const invocation = await createRunnerAdapter(defaultConfig()).prepare(bundle);
      await writePreparedRunnerArtifacts({
        bundle,
        bootstrap_markdown: "Return the typed semantic payload.\n",
        invocation,
      });

      const schemaText = await readFile(invocation.output_schema_path!, "utf8");
      expect(schemaText).toBe(renderCodexResultOutputSchemaJson(workOrder));
      const schema = JSON.parse(schemaText) as { properties?: Record<string, unknown> };
      expect(schema.properties).toHaveProperty(roleField);
      expect(schema.properties).not.toHaveProperty("canonical_binding");
      expect(schema.properties).not.toHaveProperty("schema_version");
      expect(schema.properties).not.toHaveProperty("kind");
      expect(schema.properties).not.toHaveProperty("work_order_id");

      const collector = createCodexResultEventCollector();
      collector.observeStdoutLine(
        JSON.stringify({
          type: "item.completed",
          item: { type: "agent_message", text: JSON.stringify(payload) },
        }),
      );
      collector.observeStdoutLine(JSON.stringify({ type: "turn.completed" }));
      const normalized = await materializeCodexResultTransport({
        raw_text: collector.readLastAgentMessage(),
        result_path: invocation.result_path,
        work_order_id: invocation.work_order_id,
        work_order: workOrder,
      });

      const { task_plan_proposal: compactProposal, ...unchangedPayload } = payload as Record<
        string,
        unknown
      >;
      expect(normalized).toMatchObject(unchangedPayload);
      if (compactProposal) {
        expect(normalized.task_plan_proposal).toMatchObject({
          schema_version: 1,
          task_id: workOrder.task.id,
          assumptions: [],
          unresolved_questions: [],
          work_items: {
            schema_version: 1,
            work_items: [
              expect.objectContaining({
                id: "build",
                objective: "Preserve the payload.",
                acceptance_criteria: [expect.objectContaining({ id: "criterion" })],
                validation: expect.objectContaining({
                  checks: [expect.objectContaining({ id: "check" })],
                }),
              }),
            ],
          },
        });
      }
      expect(normalized).toMatchObject({
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: workOrder.work_order_id,
        ...(workOrder.canonical_binding ? { canonical_binding: workOrder.canonical_binding } : {}),
      });
      expect(
        (await readRunnerResultManifest(invocation.result_path))?.semantic_result.value,
      ).toEqual(normalized);
    },
  );

  it("rejects cross-role, lifecycle-injection, and wrong-work-order payloads", async () => {
    const resultPath = path.join(
      await mkdtemp(path.join(os.tmpdir(), "agentplane-roadmap-output-negative-")),
      "result.json",
    );
    tempRoots.push(path.dirname(resultPath));
    const workOrder = buildWorkOrder("EXECUTOR", "implementation");
    const materialize = async (payload: Record<string, unknown>) =>
      await materializeCodexResultTransport({
        raw_text: JSON.stringify(payload),
        result_path: resultPath,
        work_order_id: workOrder.work_order_id,
        work_order: workOrder,
      });

    await expect(
      materialize({
        ...basePayload,
        canonical_outputs: [{ id: "source", kind: "source", digest }],
        review: { verdict: "pass", missing_tests: [], hidden_assumptions: [], residual_risks: [] },
      }),
    ).rejects.toThrow();
    await expect(
      materialize({
        ...basePayload,
        canonical_outputs: [{ id: "source", kind: "source", digest }],
        approval: { approved_by: "USER" },
      }),
    ).rejects.toThrow();
    await expect(
      materialize({
        ...basePayload,
        work_order_id: "stale-or-foreign-work-order",
        canonical_outputs: [{ id: "source", kind: "source", digest }],
      }),
    ).rejects.toThrow(/work_order_id/u);
  });
});
