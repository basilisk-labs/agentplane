import type { TaskPrMeta } from "@agentplaneorg/core/schemas";
import type { TaskData } from "../../../backends/task-backend.js";
export type HostedMergedPr = {
    number: number;
    title?: string | null;
    url?: string | null;
    mergedAt?: string | null;
    baseRefName?: string | null;
    headRefName?: string | null;
    headRefOid?: string | null;
    mergeCommit?: {
        oid?: string | null;
    } | null;
};
export type HostedMergeTarget = {
    taskId: string;
    branch: string;
    mergedPr: HostedMergedPr;
};
export type HostedMergeSyncResult = {
    tasks: TaskData[];
    synced: number;
};
export type LocalBranchPrSyncCandidate = {
    taskId: string;
    branch: string;
    base: string;
    commitHash: string;
    verificationSource: "task" | "pr" | null;
    metaPath: string | null;
    meta: TaskPrMeta | null;
    taskStatus: string;
};
export type LocalDoneBranchPrDrift = {
    taskId: string;
    branch: string;
    base: string;
    commitHash: string;
};
export type LocalMergedPrMeta = {
    branch: string;
    base?: string | null;
    mergedAt?: string | null;
    mergeCommit: string;
    headSha?: string | null;
};
//# sourceMappingURL=model.d.ts.map