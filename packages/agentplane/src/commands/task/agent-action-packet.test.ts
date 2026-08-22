import { describe, expect, it } from "vitest";

import { computePlanDigest } from "@agentplaneorg/core/tasks";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { WorkflowStep } from "../shared/workflow-step.js";

import {
  assertAgentActionPacketHasNoChoreography,
  agentTransitionId,
  buildAgentActionPacket,
  MAX_AGENT_ACTION_PACKET_BYTES,
} from "./agent-action-packet.js";

const TASK_ID = "202608021231-PACKET";
const FINGERPRINT = `sha256:${"a".repeat(64)}`;

function step(value: Partial<WorkflowStep> & Pick<WorkflowStep, "kind">): WorkflowStep {
  return {
    schemaVersion: 1,
    id: "route.test",
    phase: "test",
    authoritativeCheckout: "current_checkout",
    summary: "test route",
    blockers: [],
    selectedBlocker: null,
    compatibility: {
      code: "test",
      command: null,
      summary: "test route",
      requiresApproval: false,
    },
    preconditionFingerprint: { digest: FINGERPRINT } as never,
    execution: {
      actionKind: "stop",
      recommendedRole: "CODER",
      semanticMutationAllowed: false,
      mustNot: [],
      returnControlWhen: "after the bounded action",
      verificationCandidate: null,
      evidenceMissing: [],
      needsVerificationRecord: false,
    },
    ...value,
  } as WorkflowStep;
}

function decision(workflowStep: WorkflowStep): TaskRouteDecision {
  return {
    task: { id: TASK_ID },
    workflowStep,
    executionPacket: { safeToMutate: true },
  } as TaskRouteDecision;
}

function workOrder() {
  return {
    role: "EXECUTOR",
    authority: { sandbox: "workspace-write", network: "deny" },
    required_inputs: [
      {
        id: "task-document",
        kind: "task_document",
        description: "Task document",
        path: `.agentplane/tasks/${TASK_ID}/README.md`,
        required: true,
      },
      {
        id: "policy",
        kind: "policy_module",
        description: "Policy",
        path: ".agentplane/policy/dod.code.md",
        required: true,
      },
      {
        id: "filtered",
        kind: "source_artifact",
        description: "Internal lifecycle artifact",
        path: ".agentplane/worktrees/internal.json",
        required: false,
      },
    ],
  } as never;
}

function packetFor(workflowStep: WorkflowStep) {
  return buildAgentActionPacket({
    decision: decision(workflowStep),
    work_order: workOrder(),
    plan_digest: computePlanDigest("Approved plan"),
  });
}

describe("compact agent action packet", () => {
  it.each([
    [
      "planned approval",
      step({
        kind: "approval",
        request: { type: "plan_approval", taskId: TASK_ID, authorityRef: "plan" },
      }),
      "approval_required",
      "authority_boundary",
    ],
    [
      "implementation",
      step({
        kind: "agent_episode",
        episode: {
          purpose: "implementation",
          role: "CODER",
          taskId: TASK_ID,
          objective: "Implement the task",
        },
      }),
      "agent_episode",
      "semantic_boundary",
    ],
    [
      "evaluator rework",
      step({
        kind: "agent_episode",
        episode: {
          purpose: "implementation_rework",
          role: "CODER",
          taskId: TASK_ID,
          objective: "Address findings",
        },
      }),
      "agent_episode",
      "semantic_boundary",
    ],
    [
      "human input",
      step({
        kind: "human_input",
        request: {
          type: "open_question",
          taskId: TASK_ID,
          questionId: "q-1",
          question: "Choose the product behavior",
        },
      }),
      "human_input_required",
      "human_boundary",
    ],
    [
      "hosted wait",
      step({
        kind: "wait",
        condition: { type: "integration_queue_terminal", taskId: TASK_ID, queueStatus: "queued" },
      }),
      "external_wait",
      "external_boundary",
    ],
    [
      "done",
      step({ kind: "terminal", outcome: { type: "done", taskId: TASK_ID } }),
      "terminal",
      "terminal",
    ],
    [
      "blocked or effect in doubt",
      step({ kind: "terminal", outcome: { type: "attention_required", taskId: TASK_ID } }),
      "terminal",
      "terminal",
    ],
  ])("projects %s through one stable action", (_label, workflowStep, kind, stopReason) => {
    const packet = packetFor(workflowStep);
    expect(packet.action.kind).toBe(kind);
    expect(packet.stop.reason).toBe(stopReason);
    expect(packet.transition_id).toBe(agentTransitionId(workflowStep.id));
    expect(packet.state_fingerprint).toBe(FINGERPRINT);
    expect(packet.context_refs).toEqual([
      { kind: "task_document", ref: `.agentplane/tasks/${TASK_ID}/README.md` },
      { kind: "policy_module", ref: ".agentplane/policy/dod.code.md" },
    ]);
    expect(Buffer.byteLength(JSON.stringify(packet), "utf8")).toBeLessThanOrEqual(
      MAX_AGENT_ACTION_PACKET_BYTES,
    );
    expect(() => assertAgentActionPacketHasNoChoreography(packet)).not.toThrow();
    if (workflowStep.kind === "approval" && workflowStep.request.type === "plan_approval") {
      expect(packet.operator_action).toEqual({
        kind: "approve_plan",
        required_role: "USER",
        transport: "host_user_decision",
        cwd: null,
        argv: [
          "agentplane",
          "task",
          "plan",
          "approve",
          TASK_ID,
          "--host-user-decision",
          "<base64url-host-user-decision>",
        ],
        authority_reference: "plan",
        host_user_decision: {
          schema_version: 1,
          format: "base64url-json",
          request: {
            kind: "agentplane.host_user_decision",
            origin: "user",
            task_id: TASK_ID,
            plan_digest: computePlanDigest("Approved plan"),
            state_fingerprint: FINGERPRINT,
            decision: "approved",
          },
        },
      });
    }
    if (workflowStep.kind === "human_input") {
      expect(packet.human_decision_ticket).toMatchObject({
        schema_version: 1,
        kind: "semantic",
        question: "Choose the product behavior",
        required_authority: "USER",
        state_fingerprint: FINGERPRINT,
        expires_at: null,
        alternatives: [{ id: "provide_answer" }],
      });
      expect(packet.human_decision_ticket?.resume_token).toMatch(/^sha256:[0-9a-f]{64}$/u);
    }
  });

  it("projects the direct runner operation as the external semantic boundary", () => {
    const packet = packetFor(
      step({
        kind: "cli_operation",
        operation: {
          id: "runner.follow",
          type: "runner_follow",
          params: { mode: "run", taskId: TASK_ID },
        } as never,
      }),
    );
    expect(packet.action.kind).toBe("agent_episode");
    expect(packet.stop.reason).toBe("semantic_boundary");
  });

  it("returns exact typed authority argv at a protected side-effect boundary", () => {
    const operationDigest = `sha256:${"b".repeat(64)}`;
    const stateScopeDigest = `sha256:${"c".repeat(64)}`;
    const packet = buildAgentActionPacket({
      decision: decision(
        step({
          kind: "approval",
          request: {
            type: "side_effect",
            taskId: TASK_ID,
            authorityRef: "route:test",
            operationId: "pr.open",
            operation: {
              id: "pr.open",
              type: "pr_sync",
              params: { taskId: TASK_ID, author: "CODER", includeTaskIds: [] },
            },
            operationDigest,
            stateFingerprintDigest: FINGERPRINT,
            stateScopeDigest,
            policyRule: "workflow.external_reversible",
          },
        }),
      ),
      work_order: workOrder(),
      remote: true,
    });

    expect(packet.operator_action).toEqual({
      kind: "grant_side_effect_authority",
      required_role: "USER",
      transport: "signed_user_receipt",
      cwd: null,
      argv: [
        "agentplane",
        "task",
        "authority",
        "grant",
        TASK_ID,
        "--remote",
        "--operation",
        "pr.open",
        "--operation-digest",
        operationDigest,
        "--state-fingerprint",
        FINGERPRINT,
        "--state-scope-digest",
        stateScopeDigest,
        "--approval-receipt",
        "<base64url-receipt>",
      ],
      authority_reference: "route:test",
      approval_receipt: {
        schema_version: 1,
        format: "base64url-json+ed25519",
        request: {
          approval_type: "side_effect",
          task_id: TASK_ID,
          authority_reference: "route:test",
          state_fingerprint: FINGERPRINT,
          operation_id: "pr.open",
          operation_digest: operationDigest,
          state_scope_digest: stateScopeDigest,
        },
      },
    });
    expect(Buffer.byteLength(JSON.stringify(packet, null, 2), "utf8")).toBeLessThanOrEqual(
      MAX_AGENT_ACTION_PACKET_BYTES,
    );
  });

  it("keeps provider merge operator-owned while exposing a signed receipt request", () => {
    const packet = packetFor(
      step({
        kind: "approval",
        request: {
          type: "provider_merge",
          taskId: TASK_ID,
          authorityRef: "provider:merge",
        },
      }),
    );

    expect(packet.operator_action).toEqual({
      kind: "approve_provider_merge",
      required_role: "USER",
      transport: "signed_user_receipt",
      cwd: null,
      argv: null,
      authority_reference: "provider:merge",
      approval_receipt: {
        schema_version: 1,
        format: "base64url-json+ed25519",
        request: {
          approval_type: "provider_merge",
          task_id: TASK_ID,
          authority_reference: "provider:merge",
          state_fingerprint: FINGERPRINT,
          operation_id: null,
          operation_digest: null,
          state_scope_digest: null,
        },
      },
    });
  });

  it("keeps formal operations inside the control-plane boundary", () => {
    const packet = packetFor(
      step({
        kind: "cli_operation",
        operation: {
          id: "task.start",
          type: "task_start",
          params: { taskId: TASK_ID },
        } as never,
      }),
    );
    expect(packet.action.kind).toBe("framework_transition");
    expect(packet.stop.reason).toBe("control_plane_boundary");
    expect(() => assertAgentActionPacketHasNoChoreography(packet)).not.toThrow();
  });

  it("returns typed recovery evidence without leaking lifecycle choreography", () => {
    const workflowStep = step({
      kind: "cli_operation",
      operation: {
        id: "task.start",
        type: "task_start",
        params: { taskId: TASK_ID },
      } as never,
    });
    const packet = buildAgentActionPacket({
      decision: decision(workflowStep),
      work_order: workOrder(),
      recovery: {
        reason: "effect_in_doubt",
        evidence_digest: `sha256:${"b".repeat(64)}`,
      },
    });
    expect(packet).toMatchObject({
      transition_id: agentTransitionId(workflowStep.id),
      action: { kind: "framework_transition" },
      recovery: { reason: "effect_in_doubt" },
      stop: { reason: "control_plane_boundary" },
    });
    expect(() => assertAgentActionPacketHasNoChoreography(packet)).not.toThrow();
  });

  it("does not mistake mechanical exchange paths inside a Git worktree for agent choreography", () => {
    const workflowStep = step({
      kind: "agent_episode",
      episode: {
        purpose: "implementation",
        role: "CODER",
        taskId: TASK_ID,
        objective: "Implement the task",
      },
    });
    const packet = buildAgentActionPacket({
      decision: decision(workflowStep),
      work_order: workOrder(),
      exchange: {
        directory: `/repo/.agentplane/worktrees/${TASK_ID}/.git/agentplane/exchanges/current`,
        work_order_ref: "work-order.json",
        result_schema_ref: "result-schema.json",
        result_ref: "result.json",
        return_invocation:
          "agentplane task advance <task_id> --result <exchange_directory>/<result_ref> --agent-json",
        result_path: `/repo/.agentplane/worktrees/${TASK_ID}/.git/agentplane/exchanges/current/result.json`,
        resume_argv: [
          "agentplane",
          "task",
          "advance",
          TASK_ID,
          "--result",
          `/repo/.agentplane/worktrees/${TASK_ID}/.git/agentplane/exchanges/current/result.json`,
          "--agent-json",
        ],
      },
    });

    expect(packet.exchange?.return_invocation).toBe(
      "agentplane task advance <task_id> --result <exchange_directory>/<result_ref> --agent-json",
    );
    expect(packet.exchange?.result_path).toContain("/result.json");
    expect(packet.exchange?.resume_argv).toEqual([
      "agentplane",
      "task",
      "advance",
      TASK_ID,
      "--result",
      packet.exchange?.result_path,
      "--agent-json",
    ]);
    expect(() => assertAgentActionPacketHasNoChoreography(packet)).not.toThrow();
  });

  it("still rejects lifecycle choreography in the semantic instruction", () => {
    const packet = packetFor(
      step({
        kind: "agent_episode",
        episode: {
          purpose: "implementation",
          role: "CODER",
          taskId: TASK_ID,
          objective: "Implement the task",
        },
      }),
    );
    packet.action.instruction = "Run git status and finish the task.";

    expect(() => assertAgentActionPacketHasNoChoreography(packet)).toThrow(
      "Agent action packet leaked formal lifecycle choreography.",
    );
  });
});
