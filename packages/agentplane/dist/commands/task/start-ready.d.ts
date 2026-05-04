import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskStartReady(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    author: string;
    body: string;
    force: boolean;
    yes: boolean;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=start-ready.d.ts.map