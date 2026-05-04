import type { PromptModuleMutability, PromptModuleSlot } from "../prompt-modules/model.js";
import type { ParsedPromptMarkdownFragments } from "./model.js";
export type ParsePromptMarkdownFragmentsOptions = {
    source_ref?: string;
    fallback_id?: string;
    fallback_slot?: PromptModuleSlot;
    fallback_mutability?: PromptModuleMutability;
};
export type RenderPromptMarkdownFragmentsOptions = {
    preserve_markers?: boolean;
};
export declare function parsePromptMarkdownFragments(source: string, opts?: ParsePromptMarkdownFragmentsOptions): ParsedPromptMarkdownFragments;
export declare function renderPromptMarkdownFragments(parsed: ParsedPromptMarkdownFragments, opts?: RenderPromptMarkdownFragmentsOptions): string;
//# sourceMappingURL=markdown.d.ts.map