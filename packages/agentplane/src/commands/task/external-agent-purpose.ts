import type { ExternalAgentExchange } from "./external-agent-exchange.js";

export function usesExternalImplementationAuthority(
  purpose: ExternalAgentExchange["purpose"],
): boolean {
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
