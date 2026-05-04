import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskMigrate(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    source?: string;
    quiet: boolean;
    force: boolean;
    yes?: boolean;
}): Promise<number>;
//# sourceMappingURL=migrate.d.ts.map