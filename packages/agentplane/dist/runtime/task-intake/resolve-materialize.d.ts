import type { TaskGraphDraft, TaskGraphDraftTask, TaskMaterializationPlan } from "./types.js";
export declare function materializeTaskGraphDraftPlan(opts: {
    draft: TaskGraphDraft;
    task_ids?: Record<string, string>;
    allocateTaskId?: (task: TaskGraphDraftTask, index: number) => Promise<string>;
    created_at?: string;
}): Promise<TaskMaterializationPlan>;
//# sourceMappingURL=resolve-materialize.d.ts.map