import type { PromptModule, PromptModuleGraph, PromptModuleLoadCondition } from "./model.js";
import type { PromptModuleBinding, PromptModuleMutationSet, PromptModuleMutationWhen, PromptModuleSelector, PromptModuleValidator, PromptModuleValidatorPhase } from "./mutations.js";
export type PromptModulePolicyGateway = NonNullable<PromptModuleLoadCondition["policy_gateways"]>[number];
export type PromptModuleWorkflowMode = NonNullable<PromptModuleLoadCondition["workflow_modes"]>[number];
export type PromptModuleCompilerContext = {
    workflow_mode?: PromptModuleWorkflowMode;
    policy_gateway?: PromptModulePolicyGateway;
    roles?: string[];
    command?: string;
    commands?: string[];
    task_tags?: string[];
    repo_type?: string;
    repo_types?: string[];
    recipe_ids?: string[];
    available_commands?: string[];
    validator_phases?: PromptModuleValidatorPhase[];
};
export type PromptModuleDiagnosticSeverity = "error" | "warning";
export type PromptModuleDiagnostic = {
    severity: PromptModuleDiagnosticSeverity;
    code: "compiler_context_value_discarded" | "broad_disable_selector" | "duplicate_module" | "implicit_duplicate_selection" | "missing_dependency" | "missing_module" | "ambiguous_selector" | "missing_binding_endpoint" | "mutability_violation" | "validator_failed";
    message: string;
    module_address?: string;
    mutation_id?: string;
    validator_id?: string;
};
export type PromptModuleCompiledGraph = PromptModuleGraph & {
    diagnostics: PromptModuleDiagnostic[];
    validators: PromptModuleValidator[];
    bindings: PromptModuleBinding[];
    ok: boolean;
};
export declare function normalizePromptModuleCompilerContext(context?: PromptModuleCompilerContext, diagnostics?: PromptModuleDiagnostic[]): PromptModuleCompilerContext;
export declare function matchesPromptModuleLoadCondition(condition: PromptModuleLoadCondition | undefined, context: PromptModuleCompilerContext): boolean;
export declare function matchesPromptModuleSelector(module: PromptModule, selector: PromptModuleSelector): boolean;
export declare function matchesPromptModuleMutationWhen(when: PromptModuleMutationWhen | undefined, context: PromptModuleCompilerContext, modules: readonly PromptModule[]): boolean;
export declare function compilePromptModuleGraph(opts: {
    graph: PromptModuleGraph;
    context?: PromptModuleCompilerContext;
    mutation_sets?: PromptModuleMutationSet[];
    validators?: PromptModuleValidator[];
}): PromptModuleCompiledGraph;
//# sourceMappingURL=compiler.d.ts.map