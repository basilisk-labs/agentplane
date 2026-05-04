import type { PromptModule, PromptModuleLoadCondition } from "./model.js";
import { type WorkingPromptModuleNode } from "./compiler.shared.js";
import type { PromptModuleBinding, PromptModuleMutation, PromptModuleMutationWhen, PromptModuleSelector, PromptModuleValidator } from "./mutations.js";
import type { PromptModuleCompilerContext, PromptModuleDiagnostic } from "./compiler.js";
export type PromptModuleLoadMatcher = (condition: PromptModuleLoadCondition | undefined, context: PromptModuleCompilerContext) => boolean;
export type PromptModuleSelectorMatcher = (module: PromptModule, selector: PromptModuleSelector) => boolean;
export type PromptModuleMutationWhenMatcher = (when: PromptModuleMutationWhen | undefined, context: PromptModuleCompilerContext, modules: readonly PromptModule[]) => boolean;
export type ApplyPromptModuleMutationOptions = {
    nodes: WorkingPromptModuleNode[];
    mutation: PromptModuleMutation;
    context: PromptModuleCompilerContext;
    diagnostics: PromptModuleDiagnostic[];
    validators: Map<string, PromptModuleValidator>;
    disabledValidators: Set<string>;
    bindings: PromptModuleBinding[];
    nextSequence: () => number;
    matchesLoadCondition: PromptModuleLoadMatcher;
    matchesMutationWhen: PromptModuleMutationWhenMatcher;
    matchesSelector: PromptModuleSelectorMatcher;
};
export declare function describePromptModuleSelector(selector: PromptModuleSelector): string;
export declare function applyPromptModuleMutation(opts: ApplyPromptModuleMutationOptions): void;
//# sourceMappingURL=mutations-engine.d.ts.map