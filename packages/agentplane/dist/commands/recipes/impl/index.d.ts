import type { RecipesIndex } from "@agentplaneorg/recipes";
export declare function loadRecipesRemoteIndex(opts: {
    cwd: string;
    source?: string;
    refresh: boolean;
}): Promise<RecipesIndex>;
export declare function willFetchRemoteRecipesIndex(opts: {
    source: string;
    refresh: boolean;
    cachePathExists: boolean;
}): boolean;
//# sourceMappingURL=index.d.ts.map