import type { TaskData } from "../../backends/task-backend.js";
import { type PrMeta } from "../shared/pr-meta.js";
import type { HostedMergeTarget } from "./hosted-merge-sync.js";
export declare function resolveHostedTaskCommitInfo(opts: {
    gitRoot: string;
    mergedPr: {
        number: number;
        title?: string | null;
        baseRefName?: string | null;
        mergeCommit?: {
            oid?: string | null;
        } | null;
    };
}): Promise<{
    hash: string;
    message: string;
}>;
export declare function hasTaskArtifactChanges(opts: {
    gitRoot: string;
    taskDirRelative: string;
}): Promise<boolean>;
export declare function isMissingTaskReadmeError(err: unknown, readmePath: string): boolean;
export declare function buildHostedTaskFromTrackedPrArtifacts(opts: {
    gitRoot: string;
    taskDirRelative: string;
    taskId: string;
    mergedPr: HostedMergeTarget["mergedPr"];
}): Promise<TaskData | null>;
export declare function readHostedPrMetaOrFallback(opts: {
    gitRoot: string;
    taskDirRelative: string;
    target: HostedMergeTarget;
}): Promise<{
    metaPath: string;
    meta: PrMeta;
}>;
//# sourceMappingURL=hosted-close-recovery.d.ts.map