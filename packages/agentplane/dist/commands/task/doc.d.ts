import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskDocSet(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    section?: string;
    text?: string;
    file?: string;
    updatedBy?: string;
    fullDoc: boolean;
}): Promise<number>;
export declare function cmdTaskDocShow(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    section?: string;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=doc.d.ts.map