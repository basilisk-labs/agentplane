export type ResolvedPrSyncBranch = {
    branch: string | null;
    source: "explicit" | "meta" | "current" | "none";
};
export declare function isUnknownRevisionError(err: unknown): boolean;
export declare function resolveBranchHeadSha(opts: {
    gitRoot: string;
    branch: string;
}): Promise<string | null>;
export declare function resolveRenderableBranchHead(opts: {
    gitRoot: string;
    taskId: string;
    branch: string;
}): Promise<{
    headSha: string | null;
    artifactRefresh: boolean;
}>;
export declare function resolvePrDiffBaseRef(opts: {
    gitRoot: string;
    baseBranch: string;
}): Promise<string>;
export declare function computePrDiffstat(opts: {
    gitRoot: string;
    baseBranch: string;
    branch: string;
    prDir: string;
}): Promise<string>;
export declare function resolvePrSyncBranch(opts: {
    gitRoot: string;
    metaPath: string;
    taskId: string;
    branch?: string;
}): Promise<ResolvedPrSyncBranch>;
export declare function currentBranchMatchesTask(taskPrefix: string, branch: string, taskId: string): boolean;
//# sourceMappingURL=sync-branch.d.ts.map