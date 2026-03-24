import type {
  AgentplaneConfig,
  RunnerAdapterId,
  RunnerTimeoutConfig,
  RunnerTraceConfig,
} from "@agentplaneorg/core";

export const KNOWN_RUNNER_ADAPTER_IDS: RunnerAdapterId[] = ["codex", "custom"];

export function resolveRunnerAdapterId(config: Pick<AgentplaneConfig, "runner">): RunnerAdapterId {
  return config.runner.default_adapter;
}

export function resolveRunnerTracePolicy(
  config: Pick<AgentplaneConfig, "runner">,
): RunnerTraceConfig {
  return config.runner.trace;
}

export function resolveRunnerTimeoutPolicy(
  config: Pick<AgentplaneConfig, "runner">,
): RunnerTimeoutConfig {
  return config.runner.timeouts;
}
