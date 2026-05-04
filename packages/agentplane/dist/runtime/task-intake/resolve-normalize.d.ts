import type { ClarificationQuestion, TaskGraphDependency, TaskGraphDraftTask, TaskIntakeInput } from "./types.js";
export declare function dedupeTrimmed(values: readonly string[]): string[];
export declare function normalizeOutcome(value: string): string;
export declare function normalizeSourceDetail(value: string): string;
export declare function normalizeInputs(inputs: readonly TaskIntakeInput[]): TaskIntakeInput[];
export declare function normalizeQuestions(questions: readonly ClarificationQuestion[]): ClarificationQuestion[];
export declare function normalizeDraftTasks(tasks: readonly TaskGraphDraftTask[]): TaskGraphDraftTask[];
export declare function normalizeDependencies(tasks: readonly TaskGraphDraftTask[], dependencies: readonly TaskGraphDependency[]): TaskGraphDependency[];
//# sourceMappingURL=resolve-normalize.d.ts.map