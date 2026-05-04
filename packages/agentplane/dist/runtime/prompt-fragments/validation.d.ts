import type { PromptModuleMutability, PromptModuleSlot } from "../prompt-modules/model.js";
export declare function isPromptFragmentId(value: string): boolean;
export declare function validatePromptFragmentId(value: unknown, field?: string): string;
export declare function validatePromptFragmentSlot(value: unknown, field?: string): PromptModuleSlot;
export declare function validatePromptFragmentMutability(value: unknown, field?: string): PromptModuleMutability;
export declare function generatedPromptFragmentId(prefix: string, index: number): string;
export declare function generatedWholeFileFragmentId(sourceRef: string | undefined): string;
//# sourceMappingURL=validation.d.ts.map