import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskCloseNoop(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    author: string;
    note?: string;
    force: boolean;
    yes: boolean;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=close-noop.d.ts.map