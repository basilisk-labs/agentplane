import type { CommandContext } from "../../commands/shared/task-backend.js";
import type { RunnerRepositoryContext, RunnerTaskContext } from "../types.js";
export type RunnerTaskContextEnvelope = {
    repository: RunnerRepositoryContext;
    task: RunnerTaskContext;
};
export declare const RUNNER_TASK_CONTEXT_BUDGETS: {
    readonly doc_max_bytes: 24576;
    readonly section_max_bytes: 3072;
    readonly sections_total_max_bytes: 20480;
    readonly comments_max_count: 20;
    readonly comment_body_max_bytes: 1024;
    readonly comments_total_max_bytes: 12288;
    readonly events_max_count: 40;
    readonly event_note_max_bytes: 768;
    readonly events_total_max_bytes: 16384;
};
export declare function assembleRunnerTaskContext(opts: {
    ctx?: CommandContext;
    cwd: string;
    rootOverride?: string | null;
    task_id: string;
}): Promise<RunnerTaskContextEnvelope>;
//# sourceMappingURL=task-context.d.ts.map