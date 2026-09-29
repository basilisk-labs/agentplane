import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import type { ExternalAgentExchange } from "./external-agent-exchange.js";

export function usesExternalImplementationAuthority(
  purpose: ExternalAgentExchange["purpose"],
  sandbox: AgentWorkOrderV2["authority"]["sandbox"] = "workspace-write",
): boolean {
  if (purpose === "task_worktree_resolution" && sandbox === "read-only") return false;
  return (
    purpose === "implementation" ||
    purpose === "implementation_rework" ||
    purpose === "task_worktree_resolution"
  );
}

export function recoversRecordedImplementationCommit(
  purpose: ExternalAgentExchange["purpose"],
): boolean {
  return purpose === "implementation";
}

export function semanticPurpose(
  decision: TaskRouteDecision,
): ExternalAgentExchange["purpose"] | null {
  const step = decision.workflowStep;
  if (step.kind === "agent_episode") return step.episode.purpose;
  if (
    step.kind === "cli_operation" &&
    step.operation.id === "runner.follow" &&
    step.operation.params.mode === "run"
  ) {
    return "implementation";
  }
  return null;
}
