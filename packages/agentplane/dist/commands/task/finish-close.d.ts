import type { CommandContext } from "../shared/task-backend.js";
export declare function clearDirectWorkLockIfMatches(opts: {
    agentplaneDir: string;
    taskIds: string[];
}): Promise<void>;
export declare function ensureFinishRunsOnBaseBranch(opts: {
    ctx: CommandContext;
    cwd: string;
    rootOverride?: string;
    baseBranchOverride?: string;
}): Promise<void>;
export declare function materializeBranchPrCloseTail(opts: {
    ctx: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    baseBranchOverride?: string;
    quiet: boolean;
    closeUnstageOthers?: boolean;
    allowPolicy?: boolean;
}): Promise<string | null>;
//# sourceMappingURL=finish-close.d.ts.map