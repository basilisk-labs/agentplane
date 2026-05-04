export { gitBranchExists, gitBranchUpstream, gitCurrentBranch, gitIsAncestor, gitListBranches, gitRevParse, gitAddPaths, gitCommit, gitInitRepo, gitStagedPaths, resolveInitBaseBranch, } from "@agentplaneorg/core/git";
export declare function promptInitBaseBranch(opts: {
    gitRoot: string;
    fallback: string;
}): Promise<string>;
export declare function ensureInitCommit(opts: {
    gitRoot: string;
    baseBranch: string;
    installPaths: string[];
    version: string;
    skipHooks: boolean;
}): Promise<void>;
//# sourceMappingURL=git-ops.d.ts.map