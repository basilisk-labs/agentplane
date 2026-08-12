import {
  CANONICAL_EXECUTION_PROFILE,
  resolveExecutionProfilePreset,
  type AgentplaneConfig,
} from "@agentplaneorg/core/config";

export function buildCanonicalExecutionPolicy(): AgentplaneConfig["execution"] {
  return resolveExecutionProfilePreset(CANONICAL_EXECUTION_PROFILE);
}
