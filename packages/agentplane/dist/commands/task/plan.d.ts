import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskPlanSet(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    text?: string;
    file?: string;
    updatedBy?: string;
}): Promise<number>;
export declare function cmdTaskPlanApprove(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    by: string;
    note?: string;
}): Promise<number>;
export declare function cmdTaskPlanReject(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    by: string;
    note: string;
}): Promise<number>;
//# sourceMappingURL=plan.d.ts.map