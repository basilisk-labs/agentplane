import type { TaskData } from "../../../../backends/task-backend.js";
import { type CommandContext } from "../../../shared/task-backend.js";
import { type PrMeta } from "../../../shared/pr-meta.js";
type PreparedIntegrate = {
    ctx: CommandContext;
    resolved: CommandContext["resolvedProject"];
    loadedConfig: CommandContext["config"];
    task: TaskData;
    baseBranch: string;
    currentBranch: string;
    protectedBaseRequiresPrMerge: boolean;
    prDir: string;
    metaPath: string;
    diffstatPath: string;
    verifyLogPath: string;
    meta: PrMeta | null;
    metaSource: PrMeta;
    branch: string;
    base: string;
    verifyLogText: string;
    branchHeadSha: string;
    changedPaths: string[];
    verifyCommands: string[];
    alreadyVerifiedSha: string | null;
    shouldRunVerify: boolean;
};
export declare function prepareIntegrate(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    branch?: string;
    base?: string;
    runVerify: boolean;
}): Promise<PreparedIntegrate>;
export {};
//# sourceMappingURL=prepare.d.ts.map