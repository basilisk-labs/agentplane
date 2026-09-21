import type { AgentWorkOrderRole } from "@agentplaneorg/core/schemas";

/** Preserve the public role names while mapping legacy execution aliases to EXECUTOR. */
export function semanticRole(value: string | undefined): AgentWorkOrderRole | undefined {
  const normalized = value?.trim().toUpperCase();
  if (normalized === "PLANNER" || normalized === "CURATOR" || normalized === "EVALUATOR") {
    return normalized;
  }
  return normalized ? "EXECUTOR" : undefined;
}
