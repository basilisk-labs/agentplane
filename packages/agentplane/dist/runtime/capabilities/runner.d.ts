import type { RunnerAdapterCapabilities } from "../../runner/types.js";
import type { AgentplaneCapabilityRegistry } from "./model.js";
export declare function resolveRunnerAdapterCapabilityRegistry(opts: {
    adapter_id: string;
    capabilities: RunnerAdapterCapabilities | undefined;
    requested?: Record<string, unknown>;
}): AgentplaneCapabilityRegistry;
//# sourceMappingURL=runner.d.ts.map