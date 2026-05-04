import type { CommandContext } from "../../shared/task-backend.js";
export declare function cmdIntegrate(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    branch?: string;
    base?: string;
    mergeStrategy: "squash" | "merge" | "rebase";
    runVerify: boolean;
    dryRun: boolean;
    quiet: boolean;
}): Promise<number>;
//# sourceMappingURL=cmd.d.ts.map