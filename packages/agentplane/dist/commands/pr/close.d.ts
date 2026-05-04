import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdPrClose(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    prNumber: number;
    repo?: string;
    comment?: string;
    deleteRemoteBranch: boolean;
}): Promise<number>;
//# sourceMappingURL=close.d.ts.map