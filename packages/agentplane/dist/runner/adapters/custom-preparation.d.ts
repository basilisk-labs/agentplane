import type { RunnerCustomConfig } from "@agentplaneorg/core/config";
import type { RunnerAdapterCapabilities, RunnerContextBundle, RunnerInvocation } from "../types.js";
export declare function buildCustomCapabilities(config: RunnerCustomConfig | undefined): RunnerAdapterCapabilities;
export declare function buildCustomInvocation(opts: {
    adapterId: "custom";
    config: RunnerCustomConfig | undefined;
    bundle: RunnerContextBundle;
}): RunnerInvocation;
//# sourceMappingURL=custom-preparation.d.ts.map