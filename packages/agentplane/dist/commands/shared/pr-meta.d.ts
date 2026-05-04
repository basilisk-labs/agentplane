import type { TaskPrMeta } from "@agentplaneorg/core/schemas";
export type PrMeta = TaskPrMeta;
export type PrBatchMeta = NonNullable<PrMeta["batch"]>;
export type ObservedGithubPrState = {
    prNumber: number;
    prUrl: string | null;
    status: "OPEN" | "CLOSED" | "MERGED";
    mergedAt?: string | null;
    mergeCommit?: string | null;
    base?: string | null;
    headSha?: string | null;
};
type PrArtifactLifecycleState = {
    kind: "open";
    remoteStatus?: ObservedGithubPrState["status"] | null;
} | {
    kind: "merged";
    mergeCommit?: string | null;
    mergedAt?: string | null;
} | {
    kind: "handoff";
    reason: string;
} | {
    kind: "remote_staged";
    reason: string;
} | {
    kind: "remote_failed";
    reason: string;
};
export type PrArtifactTextState = {
    diffstatText: string | null;
    verifyLogText: string | null;
    reviewText: string | null;
};
export type PrArtifactState = PrArtifactTextState & {
    meta: PrMeta;
    lifecycle: PrArtifactLifecycleState;
};
export declare function withPrArtifactLifecycleState(meta: PrMeta, state: PrArtifactLifecycleState, at: string): PrMeta;
export declare function derivePrArtifactLifecycleState(meta: PrMeta): PrArtifactLifecycleState;
export declare function buildOpenedPrMeta(opts: {
    taskId: string;
    relatedTaskIds?: string[];
    branch: string;
    at: string;
    previousMeta: PrMeta | null;
    base?: string | null;
    headSha?: string | null;
}): PrMeta;
export declare function buildUpdatedPrMeta(opts: {
    meta: PrMeta;
    relatedTaskIds?: string[];
    branch: string;
    at: string;
    base?: string | null;
    headSha?: string | null;
}): PrMeta;
export declare function resolvePrArtifactHeadSha(opts: {
    previousHeadSha?: string | null;
    currentHeadSha?: string | null;
    preservePrevious: boolean;
}): string | undefined;
export declare function buildObservedGithubPrMeta(opts: {
    meta: PrMeta;
    observed: ObservedGithubPrState;
    at: string;
}): PrMeta;
export declare function buildVerifiedPrMeta(opts: {
    meta: PrMeta;
    at: string;
    state: "pass" | "fail";
}): PrMeta;
export declare function buildIntegratedPrMeta(opts: {
    meta: PrMeta;
    branch: string;
    base: string;
    mergeStrategy: "squash" | "merge" | "rebase";
    mergeHash: string;
    branchHeadSha: string;
    at: string;
    verifyCommands: string[];
    shouldRunVerify: boolean;
    alreadyVerifiedSha: string | null;
}): PrMeta;
export type ShellInvocation = {
    command: string;
    args: string[];
};
export declare function resolveShellInvocation(command: string): ShellInvocation;
export declare function parsePrMeta(raw: string, taskId: string): PrMeta;
export declare function resolvePrBatchIncludedTaskIds(meta: PrMeta): string[];
export declare function parsePrMetaForwardCompatible(raw: string, taskId: string): PrMeta;
export declare function extractLastVerifiedSha(logText: string): string | null;
export declare function appendVerifyLog(logPath: string, header: string, content: string): Promise<void>;
export declare function runShellCommand(command: string, cwd: string): Promise<{
    code: number;
    output: string;
}>;
export {};
//# sourceMappingURL=pr-meta.d.ts.map