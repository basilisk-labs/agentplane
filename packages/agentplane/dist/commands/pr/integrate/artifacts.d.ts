import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { CommandContext } from "../../shared/task-backend.js";
export declare function readAndValidatePrArtifacts(opts: {
    ctx: CommandContext;
    resolved: {
        gitRoot: string;
    };
    prDir: string;
    metaPath: string;
    branch: string;
    artifactsLanguage: AgentplaneConfig["artifacts_language"];
    taskId: string;
}): Promise<{
    verifyLogText: string | null;
}>;
export declare function ensureCommittedPrArtifactsOnBranch(opts: {
    resolved: {
        gitRoot: string;
    };
    prDir: string;
    branch: string;
    artifactsLanguage: AgentplaneConfig["artifacts_language"];
}): Promise<void>;
//# sourceMappingURL=artifacts.d.ts.map