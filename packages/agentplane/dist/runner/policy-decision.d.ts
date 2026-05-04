import type { CliError } from "../shared/errors.js";
import type { RunnerAdapterCapabilities, RunnerPolicyDecision, RunnerRecipeContext } from "./types.js";
export declare function buildRunnerPolicyDecision(opts: {
    adapter_id: string;
    capabilities: RunnerAdapterCapabilities | undefined;
    recipe: RunnerRecipeContext | undefined;
}): RunnerPolicyDecision;
export declare function applyRunnerPolicyRefusal(opts: {
    decision: RunnerPolicyDecision;
    error: CliError;
}): RunnerPolicyDecision;
//# sourceMappingURL=policy-decision.d.ts.map