import { type CommandContext } from "../../shared/task-backend.js";
export declare function cmdCommit(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    baseBranchOverride?: string | null;
    taskId: string;
    message: string;
    close: boolean;
    allow: string[];
    autoAllow: boolean;
    allowTasks: boolean;
    allowBase: boolean;
    allowPolicy: boolean;
    allowConfig: boolean;
    allowHooks: boolean;
    allowCI: boolean;
    requireClean: boolean;
    quiet: boolean;
    closeUnstageOthers: boolean;
    closeCheckOnly: boolean;
    closeStageTaskArtifacts?: boolean;
    closeRefreshTaskArtifacts?: boolean;
}): Promise<number>;
//# sourceMappingURL=commit.d.ts.map