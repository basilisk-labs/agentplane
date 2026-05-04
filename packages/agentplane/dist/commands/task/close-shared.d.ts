import { type CommandContext } from "../shared/task-backend.js";
export declare function recordVerifiedNoopClosure(opts: {
    ctx: CommandContext;
    taskId: string;
    author: string;
    body: string;
    resultSummary: string;
    quiet: boolean;
    successMessage: string;
    force: boolean;
}): Promise<void>;
//# sourceMappingURL=close-shared.d.ts.map