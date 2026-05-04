type IntegrateWorktree = {
    worktreePath: string | null;
    tempWorktreePath: string | null;
    createdTempWorktree: boolean;
};
export declare function resolveWorktreeForIntegrate(opts: {
    gitRoot: string;
    worktreesDirRel: string;
    branch: string;
    taskId: string;
    mergeStrategy: "squash" | "merge" | "rebase";
    shouldRunVerify: boolean;
}): Promise<IntegrateWorktree>;
export {};
//# sourceMappingURL=worktree.d.ts.map