import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { TaskData, TaskEvent } from "../../../backends/task-backend.js";
export declare function appendTaskEvent(task: TaskData, event: TaskEvent): TaskEvent[];
export declare function isTransitionAllowed(current: string, next: string): boolean;
export declare function ensureStatusTransitionAllowed(opts: {
    currentStatus: string;
    nextStatus: string;
    force: boolean;
}): void;
export declare function resolveCommentCommitWarning(opts: {
    enabled: boolean;
    config: AgentplaneConfig;
    action: string;
    confirmed: boolean;
    quiet: boolean;
    statusFrom: string;
    statusTo: string;
}): string | null;
export declare function resolveStatusCommitPolicyWarning(opts: {
    policy: AgentplaneConfig["status_commit_policy"];
    action: string;
    confirmed: boolean;
    quiet: boolean;
    statusFrom: string;
    statusTo: string;
}): string | null;
export declare function isMajorStatusCommitTransition(statusFrom: string, statusTo: string): boolean;
//# sourceMappingURL=transition-rules.d.ts.map