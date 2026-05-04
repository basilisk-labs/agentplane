import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { HostedMergeSyncResult, HostedMergeTarget } from "./hosted-merge-sync/model.js";
export type { HostedMergedPr, HostedMergeSyncResult, HostedMergeTarget, LocalBranchPrSyncCandidate, LocalDoneBranchPrDrift, LocalMergedPrMeta, } from "./hosted-merge-sync/model.js";
export { findDoneBranchPrTasksWithOpenPrArtifacts, findLocallyShippedBranchPrTasks, } from "./hosted-merge-sync/local-branch.js";
export { resolveHostedMergedPr, resolveHostedMergeTargetFromEvent, } from "./hosted-merge-sync/github.js";
export { resolveLocalMergedPrMeta } from "./hosted-merge-sync/pr-meta.js";
export declare function syncHostedMergedTask(opts: {
    ctx: CommandContext;
    tasks: TaskData[];
    target: HostedMergeTarget;
    missingTask?: "noop" | "error";
    missingPrMeta?: "noop" | "error";
}): Promise<HostedMergeSyncResult>;
export declare function syncLocallyShippedBranchPrTasks(opts: {
    ctx: CommandContext;
    tasks: TaskData[];
}): Promise<HostedMergeSyncResult>;
export declare function syncHostedMergedTasks(opts: {
    ctx: CommandContext;
    tasks: TaskData[];
}): Promise<HostedMergeSyncResult>;
//# sourceMappingURL=hosted-merge-sync.d.ts.map