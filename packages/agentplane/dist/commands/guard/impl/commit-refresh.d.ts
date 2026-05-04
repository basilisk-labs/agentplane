import { type CommandContext } from "../../shared/task-backend.js";
type CommitRef = {
    hash: string;
    subject: string;
} | null;
export declare function resetRebuildableTaskIndexCache(ctx: CommandContext): Promise<void>;
export declare function formatCommitRef(commit: CommitRef): string;
export declare function commitRefreshedTaskArtifacts(opts: {
    ctx: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    sourceMessage: string;
    quiet: boolean;
}): Promise<CommitRef>;
export declare function refreshBranchPrArtifactsForCloseCommit(opts: {
    ctx: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    quiet: boolean;
    refreshTaskArtifacts: boolean;
}): Promise<void>;
export {};
//# sourceMappingURL=commit-refresh.d.ts.map