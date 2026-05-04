import { type TaskBackend, type TaskData, type TaskSummary } from "../../../backends/task-backend.js";
export type DependencyState = {
    dependsOn: string[];
    missing: string[];
    incomplete: string[];
};
export declare function ensureTaskDependsOnGraphIsAcyclic(opts: {
    backend: Pick<TaskBackend, "listTasks" | "listProjectionTasks">;
    taskId: string;
    dependsOn: string[];
}): Promise<void>;
export declare function resolveTaskDependencyState(task: TaskData, backend: Pick<TaskBackend, "getTask" | "getTasks">): Promise<DependencyState>;
export declare function dependencyWarningMessages(dep: DependencyState): string[];
export declare function buildDependencyState(tasks: TaskSummary[]): Map<string, DependencyState>;
export declare function formatTaskLine(task: TaskSummary, depState?: DependencyState): string;
//# sourceMappingURL=dependencies.d.ts.map