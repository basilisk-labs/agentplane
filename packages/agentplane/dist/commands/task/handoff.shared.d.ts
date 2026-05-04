import { type CommandContext } from "../shared/task-backend.js";
import { type TaskHandoffArtifact, type TaskHandoffRunnerHint } from "../shared/task-handoff.js";
export type TaskResumeContext = {
    task_id: string;
    task_status: string;
    branch: string | null;
    base_branch: string | null;
    head_sha: string | null;
    workspace_root: string;
    pr_branch: string | null;
    latest_handoff: TaskHandoffArtifact | null;
    runner: TaskHandoffRunnerHint;
};
export declare function buildTaskResumeContext(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    run_id?: string;
}): Promise<TaskResumeContext>;
export declare function buildRecordedTaskHandoff(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
    from_role: string;
    to_role?: string | null;
    reason: string;
    note?: string;
    next_actions?: string[];
    risks?: string[];
    open_questions?: string[];
    evidence_paths?: string[];
    run_id?: string;
}): Promise<{
    ctx: CommandContext;
    handoff: TaskHandoffArtifact;
}>;
//# sourceMappingURL=handoff.shared.d.ts.map