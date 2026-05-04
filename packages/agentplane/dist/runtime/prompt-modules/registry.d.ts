import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import type { PromptModule, PromptModuleGraph } from "./model.js";
export declare function buildFrameworkExecutionProfilePromptModule(runtime: ResolvedExecutionProfileRuntime): PromptModule;
export declare function loadFrameworkPromptModules(opts?: {
    execution_profile?: ResolvedExecutionProfileRuntime;
}): Promise<PromptModule[]>;
export declare function loadFrameworkPromptModuleRegistry(opts?: {
    execution_profile?: ResolvedExecutionProfileRuntime;
}): Promise<PromptModuleGraph>;
//# sourceMappingURL=registry.d.ts.map