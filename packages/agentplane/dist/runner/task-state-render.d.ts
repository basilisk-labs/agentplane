import type { TaskData, TaskRunnerHistoryEntry } from "../backends/task-backend.js";
import type { RunnerRunState } from "./types.js";
export type RunnerOutcomeProjection = {
    state: RunnerRunState;
    result: RunnerRunState["result"] | null;
};
export declare function normalizeRunnerOutcomeSection(sectionText: string | null): string;
export declare function replaceRunnerOutcomeSection(sectionText: string | null, entryText: string): string;
export declare function stripRunnerHistory(outcome: NonNullable<TaskData["runner"]> | TaskRunnerHistoryEntry): TaskRunnerHistoryEntry;
export declare function buildTaskRunnerOutcome(opts: {
    projection: RunnerOutcomeProjection;
    previous?: NonNullable<TaskData["runner"]> | null;
}): NonNullable<TaskData["runner"]>;
export declare function renderRunnerOutcomeHistory(opts: {
    task_id: string;
    outcome: NonNullable<TaskData["runner"]>;
    projection: RunnerOutcomeProjection;
}): string;
//# sourceMappingURL=task-state-render.d.ts.map