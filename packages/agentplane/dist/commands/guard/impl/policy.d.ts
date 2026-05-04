import { type CommandContext } from "../../shared/task-backend.js";
export type GuardCommitOptions = {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    baseBranchOverride?: string | null;
    taskId: string;
    message: string;
    allow: string[];
    allowBase: boolean;
    allowTasks: boolean;
    allowPolicy: boolean;
    allowConfig: boolean;
    allowHooks: boolean;
    allowCI: boolean;
    requireClean: boolean;
    ignoredUnstagedTrackedPaths?: string[];
    quiet: boolean;
};
export declare function guardCommitCheck(opts: GuardCommitOptions): Promise<void>;
//# sourceMappingURL=policy.d.ts.map