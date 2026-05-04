import type { TaskData } from "../../../../backends/task-backend.js";
import type { CommandContext } from "../../../shared/task-backend.js";
export declare function finalizeIntegrate(opts: {
    ctx: CommandContext;
    task: TaskData;
    cwd: string;
    rootOverride?: string;
    gitRoot: string;
    prDir: string;
    metaPath: string;
    diffstatPath: string;
    verifyLogPath: string;
    taskId: string;
    branch: string;
    base: string;
    mergeStrategy: "squash" | "merge" | "rebase";
    mergeHash: string;
    branchHeadSha: string;
    baseShaBeforeMerge: string;
    verifyEntries: {
        header: string;
        content: string;
    }[];
    verifyCommands: string[];
    alreadyVerifiedSha: string | null;
    shouldRunVerify: boolean;
    quiet: boolean;
}): Promise<void>;
//# sourceMappingURL=finalize.d.ts.map