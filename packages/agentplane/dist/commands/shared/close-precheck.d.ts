export type CloseRemoteBranchAction = "deleted" | "already-absent";
export declare function ensureNonEmptyCloseFlag(name: string, value: string): string;
export declare function ensureBranchPrCloseWorkflowMode(workflowMode: string): void;
export declare function resolveCloseGithubRepo(opts: {
    gitRoot: string;
    repoOverride: string | null;
}): Promise<string>;
export declare function resolveCloseGithubOwner(repo: string): string;
export declare function deleteCloseRemoteHeadBranch(opts: {
    cwd: string;
    repo: string;
    branch: string;
}): Promise<CloseRemoteBranchAction>;
//# sourceMappingURL=close-precheck.d.ts.map