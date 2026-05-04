import type { TaskPrMeta } from "@agentplaneorg/core/schemas";
import type { TaskData } from "../../../backends/task-backend.js";
import type { HostedMergedPr, LocalBranchPrSyncCandidate, LocalMergedPrMeta } from "./model.js";
export declare function buildSyncedPrMeta(opts: {
    meta: TaskPrMeta;
    mergedPr: HostedMergedPr;
    branch: string;
}): TaskPrMeta;
export declare function buildSyncedTask(opts: {
    task: TaskData;
    mergedPr: HostedMergedPr;
}): TaskData;
export declare function needsHostedMergeSyncFromLocalMeta(opts: {
    task: TaskData;
    meta: LocalMergedPrMeta;
}): boolean;
export declare function buildLocallyMergedSyncedTask(opts: {
    task: TaskData;
    meta: LocalMergedPrMeta;
}): TaskData;
export declare function buildLocallySyncedTask(opts: {
    task: TaskData;
    candidate: LocalBranchPrSyncCandidate;
}): TaskData;
export declare function buildLocallySyncedPrMeta(opts: {
    meta: TaskPrMeta;
    candidate: LocalBranchPrSyncCandidate;
}): TaskPrMeta;
export declare function needsHostedMergeSync(opts: {
    task: TaskData;
    meta: TaskPrMeta;
    mergedPr: HostedMergedPr;
    branch: string;
}): boolean;
//# sourceMappingURL=builders.d.ts.map