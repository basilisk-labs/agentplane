import { createHash } from "node:crypto";

import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { userApprovalReceiptRequestForStep } from "./user-approval-receipt.js";

// The packet stays compact, but must fit a normal exchange envelope plus a typed
// execution declaration after context refs have been removed.
export const MAX_AGENT_ACTION_PACKET_BYTES = 8192;

type AgentActionKind =
  | "agent_episode"
  | "approval_required"
  | "human_input_required"
  | "external_wait"
  | "framework_transition"
  | "terminal";

type AgentContextRef = {
  kind: "task_record" | "task_document" | "policy_module" | "knowledge_ref" | "source_artifact";
  ref: string;
  digest?: string;
};

export type AgentActionPacket = {
  schema_version: 1;
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  action: {
    kind: AgentActionKind;
    instruction: string;
  };
  authority: {
    role: AgentWorkOrderV2["role"];
    mutation: "read_only" | "scoped_write";
    network: AgentWorkOrderV2["authority"]["network"];
    required: boolean;
    reference: string | null;
  };
  context_refs: AgentContextRef[];
  operator_action?: {
    kind: "approve_plan" | "grant_side_effect_authority" | "approve_provider_merge";
    required_role: "USER";
    cwd: string | null;
    argv: string[] | null;
    authority_reference: string;
    approval_receipt: {
      schema_version: 1;
      format: "base64url-json+ed25519";
      request: {
        approval_type: "plan_approval" | "side_effect" | "provider_merge";
        task_id: string;
        authority_reference: string;
        state_fingerprint: string;
        operation_id: string | null;
        operation_digest: string | null;
        state_scope_digest: string | null;
      };
    };
  };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_schema_ref: string;
    result_ref: string;
    return_invocation: string;
    result_path: string;
    resume_argv: string[];
  };
  recovery?: {
    reason:
      | "effect_in_doubt"
      | "budget_exhausted"
      | "concurrent_execution"
      | "completed_operation"
      | "stale_state"
      | "control_plane_stop";
    evidence_digest: string;
  };
  stop: {
    reason:
      | "semantic_boundary"
      | "authority_boundary"
      | "human_boundary"
      | "external_boundary"
      | "control_plane_boundary"
      | "terminal";
    resume: "request_fresh_packet" | "none";
  };
};

const CHOREOGRAPHY_PATTERN =
  /(?:\bgit\s|\bgh\s|worktree|pr open|\bverify\b|\bfinish\b|\bintegrate\b|\bcleanup\b)/iu;

function semanticInstruction(
  purpose: Extract<
    TaskRouteDecision["workflowStep"],
    { kind: "agent_episode" }
  >["episode"]["purpose"],
): string {
  switch (purpose) {
    case "planning": {
      return "Prepare a task-specific semantic plan and, when intent is unknown, return result.task_intent with result.task_intent.execution. Select direct or branch_pr semantically and declare scope roots, repository effects, external effects, requirements uncertainty, implementation uncertainty, reversibility, and rationale; do not infer them from title keywords.";
    }
    case "implementation": {
      return "Perform the scoped implementation from the prepared context and report a semantic outcome.";
    }
    case "implementation_rework": {
      return "Address the scoped evaluator findings from the prepared context and report a semantic outcome.";
    }
    case "quality_review": {
      return "Assess the scoped result against the prepared acceptance evidence and report a verdict.";
    }
    case "task_worktree_resolution": {
      return "Resolve the scoped task workspace conflict described by the prepared context and report the outcome.";
    }
    case "verification": {
      return "Assess the scoped result against the prepared checks and report an evidence-backed outcome.";
    }
  }
}

function operatorActionFor(opts: {
  decision: TaskRouteDecision;
  remote: boolean;
}): AgentActionPacket["operator_action"] {
  const step = opts.decision.workflowStep;
  if (step.kind !== "approval") return undefined;
  const cwd = opts.decision.oracle?.authoritativeCheckoutPath ?? null;
  const receiptRequest = userApprovalReceiptRequestForStep(step);
  const approvalReceipt = () => ({
    schema_version: 1 as const,
    format: "base64url-json+ed25519" as const,
    request: {
      approval_type: receiptRequest.approvalType,
      task_id: receiptRequest.taskId,
      authority_reference: receiptRequest.authorityReference,
      state_fingerprint: receiptRequest.stateFingerprint,
      operation_id: receiptRequest.operationId ?? null,
      operation_digest: receiptRequest.operationDigest ?? null,
      state_scope_digest: receiptRequest.stateScopeDigest ?? null,
    },
  });
  if (step.request.type === "plan_approval") {
    const argv = [
      "agentplane",
      "task",
      "plan",
      "approve",
      step.request.taskId,
      "--approval-receipt",
      "<base64url-receipt>",
    ];
    return {
      kind: "approve_plan",
      required_role: "USER",
      cwd,
      argv,
      authority_reference: step.request.authorityRef,
      approval_receipt: approvalReceipt(),
    };
  }
  if (step.request.type === "side_effect") {
    const argv = [
      "agentplane",
      "task",
      "authority",
      "grant",
      step.request.taskId,
      ...(opts.remote ? ["--remote"] : []),
      "--operation",
      step.request.operationId,
      "--operation-digest",
      step.request.operationDigest,
      "--state-fingerprint",
      step.request.stateFingerprintDigest,
      "--state-scope-digest",
      step.request.stateScopeDigest,
      "--approval-receipt",
      "<base64url-receipt>",
    ];
    return {
      kind: "grant_side_effect_authority",
      required_role: "USER",
      cwd,
      argv,
      authority_reference: step.request.authorityRef,
      approval_receipt: approvalReceipt(),
    };
  }
  return {
    kind: "approve_provider_merge",
    required_role: "USER",
    cwd,
    argv: null,
    authority_reference: step.request.authorityRef,
    approval_receipt: approvalReceipt(),
  };
}

function actionFor(decision: TaskRouteDecision): Pick<AgentActionPacket, "action" | "stop"> {
  const step = decision.workflowStep;
  if (step.kind === "agent_episode") {
    return {
      action: { kind: "agent_episode", instruction: semanticInstruction(step.episode.purpose) },
      stop: { reason: "semantic_boundary", resume: "request_fresh_packet" },
    };
  }
  if (
    step.kind === "cli_operation" &&
    step.operation.id === "runner.follow" &&
    step.operation.params.mode === "run"
  ) {
    return {
      action: {
        kind: "agent_episode",
        instruction:
          "Perform the scoped semantic task from the prepared context and report the outcome.",
      },
      stop: { reason: "semantic_boundary", resume: "request_fresh_packet" },
    };
  }
  if (step.kind === "approval") {
    return {
      action: {
        kind: "approval_required",
        instruction:
          step.request.type === "plan_approval"
            ? "Obtain an explicit decision on the prepared semantic plan, then request a fresh packet."
            : "Obtain explicit authority for the pending protected effect, then request a fresh packet.",
      },
      stop: { reason: "authority_boundary", resume: "request_fresh_packet" },
    };
  }
  if (step.kind === "human_input") {
    return {
      action: {
        kind: "human_input_required",
        instruction:
          "Collect the outstanding human answer recorded on the task, then request a fresh packet.",
      },
      stop: { reason: "human_boundary", resume: "request_fresh_packet" },
    };
  }
  if (step.kind === "wait") {
    return {
      action: {
        kind: "external_wait",
        instruction:
          "Pause until the recorded external condition changes, then request a fresh packet.",
      },
      stop: { reason: "external_boundary", resume: "request_fresh_packet" },
    };
  }
  if (step.kind === "terminal") {
    return {
      action: {
        kind: "terminal",
        instruction:
          step.outcome.type === "done" || step.outcome.type === "superseded"
            ? "No further action is required."
            : "Return control for operator attention recorded on the task.",
      },
      stop: { reason: "terminal", resume: "none" },
    };
  }
  return {
    action: {
      kind: "framework_transition",
      instruction: decision.executionPacket.safeToMutate
        ? "Return control so Agentplane can perform the pending deterministic transition."
        : "Return control for recovery of the recorded control-plane path, then request a fresh packet.",
    },
    stop: { reason: "control_plane_boundary", resume: "request_fresh_packet" },
  };
}

function compactContextRefs(workOrder: AgentWorkOrderV2): AgentContextRef[] {
  const refs: AgentContextRef[] = [];
  for (const input of workOrder.required_inputs) {
    const ref = input.path?.trim();
    if (!ref || ref.length > 240 || CHOREOGRAPHY_PATTERN.test(ref)) continue;
    if (
      input.kind !== "task_record" &&
      input.kind !== "task_document" &&
      input.kind !== "policy_module" &&
      input.kind !== "knowledge_ref" &&
      input.kind !== "source_artifact"
    ) {
      continue;
    }
    refs.push({
      kind: input.kind,
      ref,
      ...(input.digest ? { digest: input.digest } : {}),
    });
    if (refs.length === 6) break;
  }
  return refs;
}

function packetBytes(packet: AgentActionPacket): number {
  // --agent-json is rendered as indented JSON; enforce the public wire-size
  // contract against those actual bytes rather than a smaller internal form.
  return Buffer.byteLength(JSON.stringify(packet, null, 2), "utf8");
}

export function agentTransitionId(
  stepId: string,
  stateFingerprint?: string,
  issuanceIdentity?: string,
): string {
  const identity = [stepId, stateFingerprint, issuanceIdentity].filter(Boolean).join("\u0000");
  return `tr_${createHash("sha256").update(identity).digest("hex").slice(0, 32)}`;
}

export function buildAgentActionPacket(opts: {
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
  exchange?: AgentActionPacket["exchange"];
  transition_id?: string;
  recovery?: AgentActionPacket["recovery"];
  remote?: boolean;
}): AgentActionPacket {
  const projected = opts.recovery
    ? {
        action: {
          kind: "framework_transition" as const,
          instruction:
            "Return control for recovery of the recorded control-plane state, then request a fresh packet.",
        },
        stop: {
          reason: "control_plane_boundary" as const,
          resume: "request_fresh_packet" as const,
        },
      }
    : actionFor(opts.decision);
  const operatorAction = operatorActionFor({
    decision: opts.decision,
    remote: opts.remote === true,
  });
  const packet: AgentActionPacket = {
    schema_version: 1,
    task_id: opts.decision.task.id,
    transition_id: opts.transition_id ?? agentTransitionId(opts.decision.workflowStep.id),
    state_fingerprint: opts.decision.workflowStep.preconditionFingerprint.digest,
    ...projected,
    authority: {
      role: opts.work_order.role,
      mutation: opts.work_order.authority.sandbox === "read-only" ? "read_only" : "scoped_write",
      network: opts.work_order.authority.network,
      required: projected.action.kind === "approval_required",
      reference:
        opts.decision.workflowStep.kind === "approval"
          ? opts.decision.workflowStep.request.authorityRef
          : null,
    },
    context_refs: compactContextRefs(opts.work_order),
    ...(operatorAction ? { operator_action: operatorAction } : {}),
    ...(projected.action.kind === "agent_episode" && opts.exchange
      ? { exchange: opts.exchange }
      : {}),
    ...(opts.recovery ? { recovery: opts.recovery } : {}),
  };

  while (packet.context_refs.length > 0 && packetBytes(packet) > MAX_AGENT_ACTION_PACKET_BYTES) {
    packet.context_refs.pop();
  }
  if (packetBytes(packet) > MAX_AGENT_ACTION_PACKET_BYTES) {
    throw new Error(
      `Agent action packet exceeds ${MAX_AGENT_ACTION_PACKET_BYTES} bytes after context compaction.`,
    );
  }
  return packet;
}

export function assertAgentActionPacketHasNoChoreography(packet: AgentActionPacket): void {
  const agentVisibleSemanticSurface = [
    packet.action.instruction,
    ...packet.context_refs.map((input) => input.ref),
  ].join("\n");
  if (CHOREOGRAPHY_PATTERN.test(agentVisibleSemanticSurface)) {
    throw new Error("Agent action packet leaked formal lifecycle choreography.");
  }
}
