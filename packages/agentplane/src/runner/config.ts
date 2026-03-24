import type { AgentplaneConfig, RunnerAdapterId, RunnerTraceConfig } from "@agentplaneorg/core";

export const KNOWN_RUNNER_ADAPTER_IDS: RunnerAdapterId[] = ["codex", "custom"];

export function resolveRunnerAdapterId(config: Pick<AgentplaneConfig, "runner">): RunnerAdapterId {
  return config.runner.default_adapter;
}

export function resolveRunnerTracePolicy(
  config: Pick<AgentplaneConfig, "runner">,
): RunnerTraceConfig {
  return config.runner.trace;
}
