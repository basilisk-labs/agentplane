import { describe, expect, it } from "vitest";

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
  return buildAgentActionPacket({ decision: decision(workflowStep), work_order: workOrder() });
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
});
