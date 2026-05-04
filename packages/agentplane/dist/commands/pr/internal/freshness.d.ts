export type PrArtifactFreshness = {
    reviewFresh: boolean;
    verifyFresh: boolean;
    verifySatisfied: boolean;
    verifyLogSha: string | null;
    effectiveVerifiedSha: string | null;
};
export declare function assessPrArtifactFreshness(opts: {
    gitRoot: string;
    workflowDir: string;
    tasksPath?: string;
    taskId: string;
    branchHeadSha: string;
    metaHeadSha: unknown;
    metaLastVerifiedSha: unknown;
    metaVerifyStatus: unknown;
    taskVerificationState: unknown;
    verifyLogText: string | null;
    requiresVerify: boolean;
}): Promise<PrArtifactFreshness>;
//# sourceMappingURL=freshness.d.ts.map