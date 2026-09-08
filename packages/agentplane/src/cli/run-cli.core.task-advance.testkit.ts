import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AgentSemanticResultTaskIntent, AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { TaskPlanProposal } from "@agentplaneorg/core/tasks";
import { expect } from "vitest";

import { captureStdIO } from "@agentplane/testkit";

import { runCli } from "./run-cli.js";

export async function readRouteFingerprint(root: string, taskId: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    const payload = JSON.parse(io.stdout) as {
      workflow_step: { preconditionFingerprint: { digest: string } };
    };
    return payload.workflow_step.preconditionFingerprint.digest;
  } finally {
    io.restore();
  }
}

export async function readRoute(
  root: string,
  taskId: string,
): Promise<{
  workflow_step: {
    kind: string;
    preconditionFingerprint: { digest: string };
    request?: {
      type: string;
      operationId: string;
      operationDigest: string;
      stateFingerprintDigest: string;
      stateScopeDigest: string;
    };
  };
  route_oracle: { phase: string; authoritativeCheckout: string };
}> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    return JSON.parse(io.stdout) as {
      workflow_step: {
        kind: string;
        preconditionFingerprint: { digest: string };
        request?: {
          type: string;
          operationId: string;
          operationDigest: string;
          stateFingerprintDigest: string;
          stateScopeDigest: string;
        };
      };
      route_oracle: { phase: string; authoritativeCheckout: string };
    };
  } finally {
    io.restore();
  }
}

export type AgentPacket = {
  schema_version: number;
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string; instruction: string };
  authority: {
    role: string;
    mutation: string;
    network: string;
    required: boolean;
    reference: string | null;
  };
  context_refs: { kind: string; ref: string; digest?: string }[];
  operator_action?: {
    kind: string;
    required_role: string;
    cwd: string | null;
    argv: string[] | null;
    authority_reference: string;
  };
  exchange?: {
    result_format?: "semantic_payload_v1";
    directory: string;
    work_order_ref: string;
    result_schema_ref: string;
    result_ref: string;
    return_invocation: string;
    result_path: string;
    resume_argv: string[];
  };
  recovery?: { reason: string; evidence_digest: string };
  stop: { reason: string; resume: string };
};

export async function writeCompletedResult(
  packet: AgentPacket,
  summary: string,
  review?: {
    verdict: "pass" | "rework" | "blocked" | "human_review";
    missing_tests: string[];
    hidden_assumptions: string[];
    residual_risks: string[];
  },
  taskIntent?: AgentSemanticResultTaskIntent,
  structuredPlan = false,
): Promise<string> {
  if (!packet.exchange) throw new Error("expected an external-agent exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrderV2;
  const routeCriterion = {
    id: "route-converges",
    description: "The requested external-agent route converges through its expected boundary.",
    required: true,
    check_ids: ["task-check"],
  } as const;
  const routeValidation = {
    schema_version: 1,
    criteria: [routeCriterion],
    checks: [
      { id: "task-check", kind: "deterministic", required: true, capability: "task.verify" },
    ],
    evidence_fingerprint: "sha256:0000000000000000000000000000000000000000000000000000000000000000",
  } as const;
  const taskPlanProposal: TaskPlanProposal | undefined = structuredPlan
    ? {
        schema_version: 1,
        task_id: packet.task_id,
        planning_baseline: workOrder.planning_context!.repository_snapshot,
        work_items: {
          schema_version: 1,
          work_items: [
            {
              id: "exercise-external-agent-route",
              objective: "Exercise the compact external-agent route under the approved test plan.",
              depends_on: [],
              required_inputs: [],
              expected_outputs: ["external-agent-route-result"],
              scope_roots: ["."],
              acceptance_criteria: [routeCriterion],
              validation: routeValidation,
              context: {
                required_sources: [],
                optional_sources: [],
                symbol_hints: [],
                max_bytes: 65_536,
              },
              risk: "low",
              capabilities: ["task.verify"],
              resource_claims: [{ kind: "workspace", resource: ".", mode: "write" }],
              optional: false,
              priority: 1,
            },
          ],
        },
        assumptions: [],
        unresolved_questions: [],
        top_level_validation: routeValidation,
      }
    : undefined;
  const resultPath = path.join(packet.exchange.directory, packet.exchange.result_ref);
  await writeFile(
    resultPath,
    `${JSON.stringify(
      {
        schema_version: 1,
        kind: "agent_action_result",
        task_id: packet.task_id,
        transition_id: packet.transition_id,
        state_fingerprint: packet.state_fingerprint,
        role: workOrder.role,
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: workOrder.work_order_id,
          status: "completed",
          summary,
          findings: review ? ["The frozen diff satisfies the approved task intent."] : [],
          uncertainty: [],
          ...(taskIntent ? { task_intent: taskIntent } : {}),
          ...(taskPlanProposal ? { task_plan_proposal: taskPlanProposal } : {}),
          ...(review ? { review } : {}),
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return resultPath;
}

export type RecoveryPacket = {
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string };
  exchange: { directory: string; result_path: string; resume_argv: string[] };
};

export async function readRecoveryWorkOrder(p: RecoveryPacket): Promise<AgentWorkOrderV2> {
  expect(p.exchange, JSON.stringify(p)).toBeDefined();
  return JSON.parse(
    await readFile(path.join(p.exchange.directory, "work-order.json"), "utf8"),
  ) as AgentWorkOrderV2;
}
export async function writeRecoveryReport(
  p: RecoveryPacket,
  summary: string,
  extra: Record<string, unknown> = {},
) {
  const wo = await readRecoveryWorkOrder(p);
  const result = {
    schema_version: 1,
    kind: "agent_action_result",
    task_id: wo.task.id,
    transition_id: p.transition_id,
    state_fingerprint: p.state_fingerprint,
    role: wo.role,
    result: {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: wo.work_order_id,
      status: "completed",
      summary,
      findings: [summary],
      uncertainty: [],
      ...extra,
    },
  };
  await writeFile(p.exchange.result_path, JSON.stringify(result));
  return result;
}
