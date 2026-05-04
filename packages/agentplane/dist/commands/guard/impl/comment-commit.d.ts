import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { type CommandContext } from "../../shared/task-backend.js";
export declare function commitFromComment(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    primaryTag: string;
    executorAgent?: string;
    author?: string;
    statusFrom?: string;
    statusTo?: string;
    commentBody: string;
    formattedComment: string | null;
    emoji: string;
    allow: string[];
    autoAllow: boolean;
    allowTasks: boolean;
    requireClean: boolean;
    quiet: boolean;
    config: AgentplaneConfig;
}): Promise<{
    hash: string;
    message: string;
    staged: string[];
}>;
//# sourceMappingURL=comment-commit.d.ts.map