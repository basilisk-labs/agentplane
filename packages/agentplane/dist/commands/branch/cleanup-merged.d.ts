import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdCleanupMerged(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    base?: string;
    yes: boolean;
    archive: boolean;
    deleteRemoteBranches: boolean;
    fetch: boolean;
    quiet: boolean;
    skipUnsafeWorktrees?: boolean;
}): Promise<number>;
//# sourceMappingURL=cleanup-merged.d.ts.map