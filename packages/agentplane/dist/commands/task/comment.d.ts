import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskComment(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    author: string;
    body: string;
}): Promise<number>;
//# sourceMappingURL=comment.d.ts.map