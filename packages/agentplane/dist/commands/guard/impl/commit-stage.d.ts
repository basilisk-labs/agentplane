import { type CommandContext } from "../../shared/task-backend.js";
export declare function hasExplicitCommitScope(opts: {
    allow: string[];
    allowTasks: boolean;
    allowPolicy: boolean;
    allowConfig: boolean;
    allowHooks: boolean;
    allowCI: boolean;
}): boolean;
export declare function stageActiveTaskArtifactsFromAllowTasks(opts: {
    ctx: CommandContext;
    taskId: string;
    allowTasks: boolean;
}): Promise<string[]>;
export declare function stageCloseCommitPaths(opts: {
    ctx: CommandContext;
    readmeRel: string;
    taskId: string;
    allowPolicy: boolean;
}): Promise<void>;
//# sourceMappingURL=commit-stage.d.ts.map