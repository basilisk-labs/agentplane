import type { AgentplaneConfig, RunnerAdapterId, RunnerTimeoutConfig, RunnerTraceConfig } from "@agentplaneorg/core/config";
export declare const KNOWN_RUNNER_ADAPTER_IDS: RunnerAdapterId[];
export declare function resolveRunnerAdapterId(config: Pick<AgentplaneConfig, "runner">): RunnerAdapterId;
export declare function resolveRunnerTracePolicy(config: Pick<AgentplaneConfig, "runner">): RunnerTraceConfig;
export declare function resolveRunnerTimeoutPolicy(config: Pick<AgentplaneConfig, "runner">): RunnerTimeoutConfig;
//# sourceMappingURL=config.d.ts.map