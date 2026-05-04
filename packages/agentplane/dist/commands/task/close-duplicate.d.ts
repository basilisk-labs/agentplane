import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskCloseDuplicate(opts: {
    ctx: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    duplicateOf: string;
    author: string;
    note?: string;
    force: boolean;
    yes: boolean;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=close-duplicate.d.ts.map