import type { PlanApproval, TaskData, TaskOrigin, TaskSummary, TaskRunnerOutcome, VerificationResult } from "./types.js";
export declare function normalizeDependsOn(value: unknown): string[];
export declare function normalizePriority(value: unknown): string;
export declare function defaultPlanApproval(): PlanApproval;
export declare function defaultVerificationResult(): VerificationResult;
export declare function normalizeTaskOrigin(value: unknown): TaskOrigin | null;
export declare function normalizePlanApproval(value: unknown): PlanApproval | null;
export declare function normalizeVerificationResult(value: unknown): VerificationResult | null;
export declare function normalizeTaskRunnerOutcome(value: unknown): TaskRunnerOutcome | null;
export declare function toTaskSummary(task: TaskData): TaskSummary;
export declare function toTaskSummaries(tasks: TaskData[]): TaskSummary[];
//# sourceMappingURL=normalize.d.ts.map