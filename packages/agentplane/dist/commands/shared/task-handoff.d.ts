import type { TaskHandoff, TaskHandoffRoute, TaskHandoffRunnerNextAction, TaskHandoffRunnerState } from "@agentplaneorg/core/schemas";
import type { CommandContext } from "./task-backend.js";
export type TaskHandoffArtifact = TaskHandoff;
export type TaskHandoffRunnerHint = TaskHandoffRunnerState;
export type TaskHandoffPaths = {
    handoff_dir: string;
    latest_path: string;
    history_path: string;
};
export declare function resolveTaskHandoffPaths(opts: {
    git_root: string;
    workflow_dir: string;
    task_id: string;
}): TaskHandoffPaths;
export declare function readTaskHandoffLatest(paths: TaskHandoffPaths): Promise<TaskHandoffArtifact | null>;
export declare function readTaskHandoffLatestRequired(opts: {
    task_id: string;
    paths: TaskHandoffPaths;
}): Promise<TaskHandoffArtifact>;
export declare function writeTaskHandoff(opts: {
    paths: TaskHandoffPaths;
    handoff: TaskHandoffArtifact;
}): Promise<void>;
export declare function currentGitBranch(gitRoot: string): Promise<string | null>;
export declare function readTaskPrBranch(opts: {
    ctx: CommandContext;
    task_id: string;
}): Promise<string | null>;
export declare function readTaskPrMetaSummary(opts: {
    ctx: CommandContext;
    task_id: string;
}): Promise<{
    branch: string | null;
    base: string | null;
}>;
export declare function buildTaskHandoffArtifact(opts: {
    task_id: string;
    created_at: string;
    from_role: string;
    to_role?: string | null;
    reason: string;
    note?: string;
    branch?: string | null;
    base_branch?: string | null;
    head_sha?: string | null;
    workspace_root?: string | null;
    pr_branch?: string | null;
    runner?: TaskHandoffRunnerHint | undefined;
    route?: TaskHandoffRoute | undefined;
    next_actions?: string[] | undefined;
    risks?: string[] | undefined;
    open_questions?: string[] | undefined;
    evidence_paths?: string[] | undefined;
}): TaskHandoffArtifact;
export declare function buildRunnerHintCommands(opts: {
    task_id: string;
    run_id: string | null;
    status: string | null;
}): {
    next_action: TaskHandoffRunnerNextAction;
    next_command: string | null;
    resume_command: string | null;
    retry_command: string | null;
};
//# sourceMappingURL=task-handoff.d.ts.map