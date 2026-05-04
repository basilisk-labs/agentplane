import type { BehaviorCandidate, BehaviorMergeMode, BehaviorResolutionTrace, ResolvedBehavior } from "./model.js";
export declare function resolveBehavior<TValue, TMetadata = Record<string, unknown>>(opts: {
    key: string;
    candidates: readonly BehaviorCandidate<TValue, TMetadata>[];
    merge_mode?: BehaviorMergeMode;
}): ResolvedBehavior<TValue, TMetadata>;
export declare function stripBehaviorValue<TValue, TMetadata>(resolved: ResolvedBehavior<TValue, TMetadata>): BehaviorResolutionTrace<TMetadata>;
//# sourceMappingURL=resolve.d.ts.map