export type MergedBranchCleanupResult = {
    removedBranch: boolean;
    removedWorktree: boolean;
    worktreePath: string | null;
    skippedReason: "outside_repo" | "current_worktree" | null;
};
export declare function cleanupMergedLocalBranch(opts: {
    gitRoot: string;
    branch: string;
    worktreePathHint?: string | null;
}): Promise<MergedBranchCleanupResult>;
//# sourceMappingURL=merged-branch-cleanup.d.ts.map