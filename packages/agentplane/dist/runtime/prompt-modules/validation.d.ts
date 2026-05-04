import type { PromptModule } from "./model.js";
import type { PromptModuleCompiledGraph } from "./compiler.js";
import type { PromptModuleMutation, PromptModuleMutationSet } from "./mutations.js";
export declare function validatePromptModule(raw: unknown, field?: string): PromptModule;
export declare function validatePromptModuleMutationSet(raw: unknown, field?: string): PromptModuleMutationSet;
export declare function validatePromptModuleCompiledGraph(raw: unknown, field?: string): PromptModuleCompiledGraph;
export type ValidatedPromptModuleMutation = PromptModuleMutation;
//# sourceMappingURL=validation.d.ts.map