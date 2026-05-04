import type { ResolvedExecutionProfileRuntime } from "../../runtime/execution-profile/index.js";
import type { ResolvedHarnessContract } from "../../runtime/harness/index.js";
import type { RunnerPromptBlock, RunnerRecipeContext, RunnerTaskContext } from "../types.js";
import type { PolicyGatewayFlavor } from "../../shared/policy-gateway.js";
export { resolveOwnerProfilePromptSource, resolvePolicyGatewayPromptSource, } from "./base-prompt-sources.js";
export { compileRunnerPromptBlocksThroughModules, compileRunnerPromptModuleGraph, runnerPromptBlocksToModuleGraph, runnerPromptBlockToModule, } from "./prompt-module-bridge.js";
export declare function collectRunnerBasePrompts(opts: {
    git_root: string;
    owner_id: string;
    agents_dir?: string;
    fallback_policy_gateway_flavor?: PolicyGatewayFlavor;
    task?: RunnerTaskContext;
    command?: string;
    recipe?: RunnerRecipeContext;
    harness?: ResolvedHarnessContract;
    execution_profile?: ResolvedExecutionProfileRuntime;
}): Promise<RunnerPromptBlock[]>;
//# sourceMappingURL=base-prompts.d.ts.map