import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdStart(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    author: string;
    body: string;
    commitFromComment: boolean;
    commitEmoji?: string;
    commitAllow: string[];
    commitAutoAllow: boolean;
    commitAllowTasks: boolean;
    commitRequireClean: boolean;
    confirmStatusCommit: boolean;
    force: boolean;
    yes?: boolean;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=start.d.ts.map