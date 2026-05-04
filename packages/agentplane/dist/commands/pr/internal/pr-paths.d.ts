import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { CommandContext } from "../../shared/task-backend.js";
export type ResolvedPrPaths = {
    resolved: {
        gitRoot: string;
        agentplaneDir: string;
    };
    config: AgentplaneConfig;
    prDir: string;
    metaPath: string;
    diffstatPath: string;
    notesPath: string;
    verifyLogPath: string;
    reviewPath: string;
    githubTitlePath: string;
    githubBodyPath: string;
};
export declare function resolvePrPaths(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
}): Promise<ResolvedPrPaths>;
export declare function readPrArtifact(opts: {
    resolved: {
        gitRoot: string;
    };
    prDir: string;
    fileName: string;
    branch: string;
    worktreePath?: string | null;
}): Promise<string | null>;
export declare function readPrArtifactFromBranch(opts: {
    resolved: {
        gitRoot: string;
    };
    prDir: string;
    fileName: string;
    branch: string;
    worktreePath?: string | null;
}): Promise<string | null>;
//# sourceMappingURL=pr-paths.d.ts.map