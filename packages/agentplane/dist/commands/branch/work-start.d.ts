import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdWorkStart(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    agent: string;
    slug: string;
    worktree: boolean;
}): Promise<number>;
//# sourceMappingURL=work-start.d.ts.map