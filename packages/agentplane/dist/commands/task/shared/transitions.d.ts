import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { TaskData } from "../../../backends/task-backend.js";
import type { CommandContext } from "../../shared/task-backend.js";
export declare function ensurePlanApprovedIfRequired(task: TaskData, config: AgentplaneConfig): void;
export declare function ensureVerificationSatisfiedIfRequired(task: TaskData, config: AgentplaneConfig): void;
export declare function ensureCommentCommitAllowed(opts: {
    enabled: boolean;
    config: AgentplaneConfig;
    action: string;
    confirmed: boolean;
    quiet: boolean;
    statusFrom: string;
    statusTo: string;
}): void;
export declare function emitTransitionWarnings(warnings: readonly string[], quiet: boolean): void;
export declare function requireStructuredComment(body: string, prefix: string, minChars: number): void;
export declare function prepareTaskTransitionComment(opts: {
    body?: string;
    enabled: boolean;
    config: AgentplaneConfig;
}): {
    formattedComment: string | null;
    commentBody: string | undefined;
};
export declare function resolveTaskTransitionExecutorAgent(opts: {
    ctx: Pick<CommandContext, "config" | "resolvedProject">;
    taskId: string;
    author?: string;
}): Promise<string | undefined>;
export declare function runTaskTransitionCommentCommit(opts: {
    ctx: CommandContext;
    cwd: string;
    rootOverride?: string;
    taskId: string;
    primaryTag: string;
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
    progressMessage?: string;
    resolveExecutorAgent?: boolean;
}): Promise<{
    hash: string;
    message: string;
    staged: string[];
}>;
export declare function readHeadCommit(cwd: string): Promise<{
    hash: string;
    message: string;
}>;
export declare function enforceStatusCommitPolicy(opts: {
    policy: AgentplaneConfig["status_commit_policy"];
    action: string;
    confirmed: boolean;
    quiet: boolean;
    statusFrom: string;
    statusTo: string;
}): void;
export declare function readCommitInfo(cwd: string, rev: string): Promise<{
    hash: string;
    message: string;
}>;
export declare function defaultCommitEmojiForStatus(status: string): string;
//# sourceMappingURL=transitions.d.ts.map