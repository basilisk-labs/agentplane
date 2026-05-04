import type { CommandContext } from "../../shared/task-backend.js";
import { type PrMeta } from "../../shared/pr-meta.js";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";
export declare function isUnknownRevisionError(err: unknown): boolean;
export declare function resolveArtifactBranch(opts: {
    ctx: CommandContext;
    resolved: {
        gitRoot: string;
    };
    taskId: string;
}): Promise<string | null>;
export type PrArtifactTexts = {
    metaText: string | null;
    diffstatText: string | null;
    verifyLogText: string | null;
    reviewText: string | null;
    githubTitleText: string | null;
    githubBodyText: string | null;
};
export type PrArtifactSnapshot = {
    source: "local" | "branch";
    texts: PrArtifactTexts;
    meta: PrMeta | null;
    errors: string[];
    freshnessEvaluated: boolean;
    freshnessReviewFresh: boolean;
    freshnessVerifySatisfied: boolean;
    freshnessVerifyFresh: boolean;
    freshnessVerifyLogSha: string | null;
};
export declare function readLocalPrArtifactText(prDir: string, fileName: string): Promise<string | null>;
export declare function validateSnapshotContents(opts: {
    texts: PrArtifactTexts;
    relPrDir: string;
    relMetaPath: string;
    relDiffstatPath: string;
    relVerifyLogPath: string;
    relReviewPath: string;
    relGithubTitlePath: string;
    relGithubBodyPath: string;
    taskId: string;
    artifactsLanguage: AgentplaneConfig["artifacts_language"];
}): {
    meta: PrMeta | null;
    errors: string[];
};
export declare function evaluateSnapshotFreshness(opts: {
    snapshot: PrArtifactSnapshot;
    gitRoot: string;
    workflowDir: string;
    tasksPath?: string;
    taskId: string;
    branchHeadSha: string | null;
    taskVerificationState: unknown;
    requiresVerify: boolean;
}): Promise<void>;
export declare function finalizeSnapshotErrors(opts: {
    snapshot: PrArtifactSnapshot;
    branchHeadSha: string | null;
    requiresVerify: boolean;
}): string[];
export declare function resolveBranchHeadSha(opts: {
    gitRoot: string;
    branchForFreshness: string | null;
}): Promise<string | null>;
export declare function buildBranchSnapshot(opts: {
    resolved: {
        gitRoot: string;
    };
    prDir: string;
    relPrDir: string;
    relMetaPath: string;
    relDiffstatPath: string;
    relVerifyLogPath: string;
    relReviewPath: string;
    relGithubTitlePath: string;
    relGithubBodyPath: string;
    taskId: string;
    branchForFreshness: string;
    artifactsLanguage: AgentplaneConfig["artifacts_language"];
}): Promise<PrArtifactSnapshot>;
//# sourceMappingURL=pr-artifact-snapshot.d.ts.map