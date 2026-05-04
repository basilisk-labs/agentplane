import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskScaffold(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    title?: string;
    overwrite: boolean;
    force: boolean;
    yes?: boolean;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=scaffold.d.ts.map