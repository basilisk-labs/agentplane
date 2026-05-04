import { type CommandContext } from "../../shared/task-backend.js";
export declare function suggestAllowPrefixes(paths: string[]): string[];
export declare function gitStatusChangedPaths(opts: {
    cwd: string;
    rootOverride?: string;
}): Promise<string[]>;
export declare function ensureGitClean(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
}): Promise<void>;
export declare function stageAllowlist(opts: {
    ctx: CommandContext;
    allow: string[];
    allowTasks: boolean;
    allowPolicy?: boolean;
    allowConfig?: boolean;
    allowHooks?: boolean;
    allowCI?: boolean;
    tasksPath: string;
    workflowDir?: string;
    taskId?: string;
    allowTaskOnly?: boolean;
    emptyAllowMessage?: string;
    noMatchMessage?: string;
}): Promise<string[]>;
//# sourceMappingURL=allow.d.ts.map