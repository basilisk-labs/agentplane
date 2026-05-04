import type { OrchestrationState } from "./state-machine.js";
export type ReconcileRunningEntry = {
    issueId: string;
    issueIdentifier: string;
    state: string;
    orchestrationState: OrchestrationState;
    startedAt: Date;
    lastActivityAt: Date;
};
export type ReconcileObservedIssue = {
    id: string;
    state: string;
    assignedToWorker: boolean;
};
export type ReconcileConfig = {
    activeStates: string[];
    terminalStates: string[];
    stallTimeoutMs: number;
};
export type ReconcileAction = {
    type: "stop_running";
    issueId: string;
    reason: "terminal" | "non_active" | "not_routed";
} | {
    type: "restart_stalled";
    issueId: string;
    elapsedMs: number;
} | {
    type: "keep_running";
    issueId: string;
};
export type ReconcileResult = {
    nextRunning: ReconcileRunningEntry[];
    actions: ReconcileAction[];
};
export declare function reconcileFirst(running: readonly ReconcileRunningEntry[], observed: readonly ReconcileObservedIssue[], config: ReconcileConfig, now: Date): ReconcileResult;
//# sourceMappingURL=reconcile.d.ts.map