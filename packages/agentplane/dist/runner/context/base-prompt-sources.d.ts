import type { ResolvedExecutionProfileRuntime } from "../../runtime/execution-profile/index.js";
import type { ResolvedHarnessContract } from "../../runtime/harness/index.js";
import { type PolicyGatewayFlavor } from "../../shared/policy-gateway.js";
import type { RunnerPromptBlock } from "../types.js";
import { type ResolvedPromptSource } from "./prompt-block-shared.js";
export declare function resolveOwnerProfilePromptSource(opts: {
    git_root: string;
    agents_dir: string;
    owner_id: string;
}): Promise<ResolvedPromptSource>;
export declare function loadOwnerProfilePrompt(opts: {
    git_root: string;
    agents_dir: string;
    owner_id: string;
}): Promise<RunnerPromptBlock>;
export declare function resolvePolicyGatewayPromptSource(opts: {
    git_root: string;
    fallback_flavor: PolicyGatewayFlavor;
    harness?: ResolvedHarnessContract;
}): Promise<ResolvedPromptSource>;
export declare function loadPolicyGatewayPrompt(opts: {
    git_root: string;
    fallback_flavor: PolicyGatewayFlavor;
    harness?: ResolvedHarnessContract;
}): Promise<RunnerPromptBlock>;
export declare function loadUserInstructionsPrompt(opts: {
    git_root: string;
}): Promise<RunnerPromptBlock | null>;
export declare function loadExecutionProfilePrompt(opts: {
    execution_profile?: ResolvedExecutionProfileRuntime;
}): RunnerPromptBlock | null;
export { loadFrameworkRunnerPrompt } from "./prompt-block-shared.js";
//# sourceMappingURL=base-prompt-sources.d.ts.map