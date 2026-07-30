import type { AgentWorkOrderV2, StateFingerprint } from "@agentplaneorg/core/schemas";

import type { TaskRouteDecision } from "../../commands/shared/route-decision-types.js";
import type { TaskBlueprintLifecycleSummary } from "../../commands/task/blueprint-summary.js";
import type { TaskKnowledgeRetrievalReceipt } from "./task-knowledge-retrieval.js";

type AgentWorkOrderRemotePolicy = {
  schema_version: 1;
  mode: "local" | "remote";
  requested: boolean;
  observed: boolean;
  note: string;
};

type AgentWorkOrderRouteProjection = {
  schema_version: 1;
  workflow_mode: string;
  workflow_step: {
    id: string;
    kind: string;
    precondition_fingerprint: StateFingerprint;
  };
  next_action: {
    code: string;
    summary: string;
    command: string | null;
    requires_approval: boolean;
  };
  oracle: {
    phase: string;
    authoritative_checkout: string;
    authoritative_checkout_path: string | null;
    mutation_path_hint: string | null;
    next_command: string | null;
    summary: string;
  };
  execution_packet: {
    schema_version: number;
    action_kind: string;
    safe_to_mutate: boolean;
    requires_provider_action: boolean;
    recommended_role: string;
    authoritative_checkout: string;
    authoritative_checkout_path: string | null;
    mutation_path_hint: string | null;
    must_run_from: string | null;
    exact_argv: string[] | null;
    must_not: string[];
    return_control_when: string;
    human_provider_action: string | null;
    stale_state_check: string;
    evidence_missing: string[];
    verification_candidate: string | null;
    stop_reason: string | null;
  };
};

export type AgentWorkOrderSourceManifest = {
  schema_version: 1;
  source_paths: string[];
  policy_modules: string[];
  prompt_modules: {
    id: string;
    source: string | null;
    content_digest: string;
  }[];
  blueprint_context: {
    id: string;
    kind: string;
    source: string | null;
  }[];
  verification_context: {
    task_verify: string[];
    verify_steps: string[];
  };
};

export type AgentWorkOrderPreparationView = {
  schema_version: 2;
  kind: "agent_work_order_preparation";
  work_order_id: string;
  state_fingerprint: StateFingerprint;
  remote_policy: AgentWorkOrderRemotePolicy;
  route: AgentWorkOrderRouteProjection;
  source_manifest: AgentWorkOrderSourceManifest;
  knowledge_retrieval: TaskKnowledgeRetrievalReceipt;
  verification_intent: AgentWorkOrderV2["verification_intent"];
};

/**
 * V1-only fields rendered by `task brief` are captured here with the work
 * order so the renderer cannot issue a second mutable blueprint/snapshot read.
 */
export type AgentWorkOrderLegacyBriefProjection = {
  blueprint: TaskBlueprintLifecycleSummary;
  snapshot: {
    state: "current" | "missing" | "invalid" | "stale";
    path: string;
    digest: string | null;
    current_digest: string;
    route_changed: boolean | null;
    safe_command: string;
  };
};

function remoteObserved(decision: TaskRouteDecision): boolean {
  const flow = decision.prFlow;
  if (!flow) return false;
  return (
    flow.pr.source === "lookup" ||
    "provider" in flow.closeTail ||
    flow.hostedChecks.checked ||
    flow.reviewThreads.checked
  );
}

export function buildAgentWorkOrderRemotePolicy(opts: {
  remote_enabled: boolean;
  decision: TaskRouteDecision;
}): AgentWorkOrderRemotePolicy {
  const observed = remoteObserved(opts.decision);
  return {
    schema_version: 1,
    mode: opts.remote_enabled ? "remote" : "local",
    // This is the resolved policy of the prepared work order, rather than a
    // per-surface CLI flag. All projections must render this one value.
    requested: opts.remote_enabled,
    observed,
    note: opts.remote_enabled
      ? observed
        ? "remote lifecycle evidence was observed during preparation"
        : "remote lifecycle policy was resolved during preparation without provider evidence"
      : "remote lookup is disabled by the canonical AgentWorkOrder preparation policy",
  };
}

export function projectAgentWorkOrderRoute(
  decision: TaskRouteDecision,
): AgentWorkOrderRouteProjection {
  const packet = decision.executionPacket;
  return {
    schema_version: 1,
    workflow_mode: decision.workflowMode,
    workflow_step: {
      id: decision.workflowStep.id,
      kind: decision.workflowStep.kind,
      precondition_fingerprint: structuredClone(decision.workflowStep.preconditionFingerprint),
    },
    next_action: {
      code: decision.nextAction.code,
      summary: decision.nextAction.summary,
      command: decision.nextAction.command,
      requires_approval: decision.nextAction.requiresApproval,
    },
    oracle: {
      phase: decision.oracle.phase,
      authoritative_checkout: decision.oracle.authoritativeCheckout,
      authoritative_checkout_path: decision.oracle.authoritativeCheckoutPath,
      mutation_path_hint: decision.oracle.mutationPathHint,
      next_command: decision.oracle.nextCommand,
      summary: decision.oracle.summary,
    },
    execution_packet: {
      schema_version: packet.schemaVersion,
      action_kind: packet.actionKind,
      safe_to_mutate: packet.safeToMutate,
      requires_provider_action: packet.requiresProviderAction,
      recommended_role: packet.recommendedRole,
      authoritative_checkout: packet.authoritativeCheckout,
      authoritative_checkout_path: packet.authoritativeCheckoutPath,
      mutation_path_hint: packet.mutationPathHint,
      must_run_from: packet.mustRunFrom,
      exact_argv: packet.exactArgv ? [...packet.exactArgv] : null,
      must_not: [...packet.mustNot],
      return_control_when: packet.returnControlWhen,
      human_provider_action: packet.humanProviderAction,
      stale_state_check: packet.staleStateCheck,
      evidence_missing: [...packet.evidenceMissing],
      verification_candidate: packet.verificationCandidate,
      stop_reason: packet.stopReason,
    },
  };
}
