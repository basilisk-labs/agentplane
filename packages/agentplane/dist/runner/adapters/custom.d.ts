import type { RunnerCustomConfig } from "@agentplaneorg/core/config";
import type { RunnerAdapterCapabilities, RunnerContextBundle, RunnerInvocation, RunnerResult } from "../types.js";
import { type RunnerAdapter } from "./shared.js";
export declare class CustomRunnerAdapter implements RunnerAdapter {
    private readonly config;
    readonly id: "custom";
    constructor(config: RunnerCustomConfig | undefined);
    describeCapabilities(_bundle: RunnerContextBundle): RunnerAdapterCapabilities;
    prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation>;
    execute(invocation: RunnerInvocation): Promise<RunnerResult>;
}
//# sourceMappingURL=custom.d.ts.map