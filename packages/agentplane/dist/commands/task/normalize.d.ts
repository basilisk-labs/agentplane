import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskNormalize(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    quiet: boolean;
    force: boolean;
    yes?: boolean;
    syncHostedMerges?: boolean;
    syncBranchPrState?: boolean;
    taskIds?: string[];
}): Promise<number>;
//# sourceMappingURL=normalize.d.ts.map