import type { CommandContext } from "../shared/task-backend.js";
export declare function refreshBranchPrArtifactsAfterTaskCommit(opts: {
    ctx: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    quiet: boolean;
}): Promise<void>;
//# sourceMappingURL=post-commit-pr-artifacts.d.ts.map