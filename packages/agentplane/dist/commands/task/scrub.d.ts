import { type CommandContext } from "../shared/task-backend.js";
export declare function cmdTaskScrub(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    find: string;
    replace: string;
    dryRun: boolean;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=scrub.d.ts.map