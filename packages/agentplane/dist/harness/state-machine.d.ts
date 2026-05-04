export type OrchestrationState = "unclaimed" | "claimed" | "running" | "retry_queued" | "released";
export type OrchestrationEvent = "claim" | "start" | "queue_retry" | "release" | "mark_released" | "reset";
export type TransitionResult = {
    ok: true;
    next: OrchestrationState;
} | {
    ok: false;
    code: "ORCH_INVALID_TRANSITION";
    message: string;
    current: OrchestrationState;
    event: OrchestrationEvent;
};
export declare function transitionOrchestrationState(current: OrchestrationState, event: OrchestrationEvent, opts?: {
    strict?: boolean;
}): TransitionResult;
export declare function assertTransitionOrThrow(current: OrchestrationState, event: OrchestrationEvent): OrchestrationState;
//# sourceMappingURL=state-machine.d.ts.map