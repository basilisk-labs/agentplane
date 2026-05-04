import type { RunnerAdapterCapabilities, RunnerContextBundle, RunnerInvocation, RunnerResult } from "../types.js";
import { type RunnerAdapter } from "./shared.js";
export declare class CodexRunnerAdapter implements RunnerAdapter {
    readonly id: "codex";
    describeCapabilities(_bundle: RunnerContextBundle): RunnerAdapterCapabilities;
    prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation>;
    execute(invocation: RunnerInvocation): Promise<RunnerResult>;
}
//# sourceMappingURL=codex.d.ts.map