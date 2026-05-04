export type ObservedGithubPr = {
    prNumber: number;
    prUrl: string | null;
    status: "OPEN" | "CLOSED" | "MERGED";
    mergedAt: string | null;
    mergeCommit: string | null;
    base: string | null;
    headSha: string | null;
};
export declare function tryLookupExistingGithubPrByBranch(opts: {
    gitRoot: string;
    branch: string;
    baseBranch?: string | null;
}): Promise<ObservedGithubPr | null>;
export declare function formatGithubPrLink(prNumber: number, prUrl: string | null, verb: "linked to" | "created"): string;
export declare function shouldPersistObservedGithubPrMeta(observed: ObservedGithubPr | null): boolean;
export declare function formatUnpublishedRemoteHeadReason(branch: string): string;
export declare function tryCreateGithubPr(opts: {
    gitRoot: string;
    branch: string;
    baseBranch: string | null;
    title: string;
    body: string;
}): Promise<{
    observed: ObservedGithubPr | null;
    stagedReason: string | null;
    artifactState: "remote_staged" | "remote_failed" | null;
}>;
//# sourceMappingURL=sync-github.d.ts.map