import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdPrOpen(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    author: string;
    branch?: string;
    includeTaskIds?: string[];
    syncOnly?: boolean;
}): Promise<number>;
//# sourceMappingURL=open.d.ts.map