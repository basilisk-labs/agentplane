export type SchedulerIssue = {
    id: string;
    state: string;
    priority?: number | null;
    createdAt?: string | null;
};
export type SchedulerEntry = {
    issue: SchedulerIssue;
    workerId: string;
};
export type SchedulerLimits = {
    maxConcurrent: number;
    maxConcurrentByState?: Record<string, number>;
};
export declare function sortIssuesForDispatch(issues: readonly SchedulerIssue[]): SchedulerIssue[];
export declare function canDispatchIssue(issue: SchedulerIssue, running: readonly SchedulerEntry[], limits: SchedulerLimits): boolean;
export declare function planDispatch(candidates: readonly SchedulerIssue[], running: readonly SchedulerEntry[], limits: SchedulerLimits): SchedulerIssue[];
//# sourceMappingURL=scheduler.d.ts.map