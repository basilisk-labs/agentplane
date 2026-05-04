import type { PrMeta } from "../../../shared/pr-meta.js";
export declare function runSquashMerge(opts: {
    gitRoot: string;
    base: string;
    branch: string;
    headBeforeMerge: string;
    taskId: string;
    taskTitle: string;
    taskTags: string[];
    workflowDir: string;
    changedPaths: string[];
    genericTokens: string[];
}): Promise<string>;
export declare function runMergeCommit(opts: {
    gitRoot: string;
    branch: string;
    taskId: string;
    taskTitle: string;
    taskTags: string[];
    workflowDir: string;
    changedPaths: string[];
}): Promise<string>;
export declare function runRebaseFastForward(opts: {
    gitRoot: string;
    worktreePath: string;
    base: string;
    branch: string;
    headBeforeMerge: string;
    rawVerify: string[];
    metaSource: PrMeta | null;
    verifyLogText: string;
    runVerify: boolean;
    verifyCommands: string[];
    alreadyVerifiedSha: string | null;
    shouldRunVerify: boolean;
    quiet: boolean;
    taskId: string;
    workflowDir: string;
    changedPaths: string[];
}): Promise<{
    mergeHash: string;
    branchHeadSha: string;
    verifyEntries: {
        header: string;
        content: string;
    }[];
    alreadyVerifiedSha: string | null;
    shouldRunVerify: boolean;
}>;
//# sourceMappingURL=merge.d.ts.map