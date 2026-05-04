export type BehaviorLayer = "harness" | "extension" | "user" | "builtin";
export type BehaviorCandidate<TValue, TMetadata = Record<string, unknown>> = {
    layer: BehaviorLayer;
    source: string;
    value: TValue;
    order?: number;
    metadata?: TMetadata;
};
export type BehaviorMergeMode = "pick_one" | "stack" | "union";
export type BehaviorResolutionEntry<TMetadata = Record<string, unknown>> = {
    layer: BehaviorLayer;
    source: string;
    order: number;
    selected: boolean;
    metadata?: TMetadata;
};
export type BehaviorResolutionTrace<TMetadata = Record<string, unknown>> = {
    key: string;
    winner: BehaviorResolutionEntry<TMetadata>;
    conflicts: BehaviorResolutionEntry<TMetadata>[];
    trace: BehaviorResolutionEntry<TMetadata>[];
};
export type ResolvedBehavior<TValue, TMetadata = Record<string, unknown>> = BehaviorResolutionTrace<TMetadata> & {
    value: TValue;
};
//# sourceMappingURL=model.d.ts.map