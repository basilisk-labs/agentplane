export declare function computeVerifyState(opts: {
    rawVerify: unknown;
    metaLastVerifiedSha: unknown;
    verifyLogText: string | null;
    branchHeadSha: string;
    runVerify: boolean;
}): {
    verifyCommands: string[];
    alreadyVerifiedSha: string | null;
    shouldRunVerify: boolean;
};
export declare function runVerifyCommands(opts: {
    commands: string[];
    worktreePath: string;
    branchHeadSha: string;
    quiet: boolean;
    taskId: string;
}): Promise<{
    header: string;
    content: string;
}[]>;
//# sourceMappingURL=verify.d.ts.map