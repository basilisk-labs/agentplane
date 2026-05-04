import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskSetStatus(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    status: string;
    author?: string;
    body?: string;
    commit?: string;
    force: boolean;
    yes: boolean;
    commitFromComment: boolean;
    commitEmoji?: string;
    commitAllow: string[];
    commitAutoAllow: boolean;
    commitAllowTasks: boolean;
    commitRequireClean: boolean;
    confirmStatusCommit: boolean;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=set-status.d.ts.map