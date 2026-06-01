import type {
  AgentplaneConfig,
  RunnerAdapterId,
  RunnerTimeoutConfig,
  RunnerTraceConfig,
} from "@agentplaneorg/core/config";

export const KNOWN_RUNNER_ADAPTER_IDS: RunnerAdapterId[] = ["codex", "custom", "hermes"];

export function resolveRunnerAdapterId(config: Pick<AgentplaneConfig, "runner">): RunnerAdapterId {
  return config.runner.default_adapter;
}

export function resolveRunnerTracePolicy(
  config: Pick<AgentplaneConfig, "runner">,
): RunnerTraceConfig {
  return {
    ...config.runner.trace,
    retention: config.runner.trace.retention ?? "keep",
    compression: config.runner.trace.compression ?? "none",
    redact_patterns: config.runner.trace.redact_patterns ?? [],
  };
}

export function resolveRunnerTimeoutPolicy(
  config: Pick<AgentplaneConfig, "runner">,
): RunnerTimeoutConfig {
  return config.runner.timeouts;
}
