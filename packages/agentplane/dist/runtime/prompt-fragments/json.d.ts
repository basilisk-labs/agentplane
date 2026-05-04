import type { PromptModuleMutability, PromptModuleSlot } from "../prompt-modules/model.js";
import type { PromptJsonTextFragment } from "./model.js";
export type NormalizePromptFragmentListOptions = {
    id_prefix: string;
    slot: PromptModuleSlot;
    source_ref?: string;
    default_mutability?: PromptModuleMutability;
};
export declare function normalizePromptFragmentList(items: unknown, opts: NormalizePromptFragmentListOptions): PromptJsonTextFragment[];
//# sourceMappingURL=json.d.ts.map