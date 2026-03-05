export type OrchestrationState = "unclaimed" | "claimed" | "running" | "retry_queued" | "released";

export type OrchestrationEvent =
  | "claim"
  | "start"
  | "queue_retry"
  | "release"
  | "mark_released"
  | "reset";

export type TransitionResult =
  | { ok: true; next: OrchestrationState }
  | {
      ok: false;
      code: "ORCH_INVALID_TRANSITION";
      message: string;
      current: OrchestrationState;
      event: OrchestrationEvent;
    };

const TRANSITIONS: Record<OrchestrationState, Record<OrchestrationEvent, OrchestrationState>> = {
  unclaimed: {
    claim: "claimed",
    start: "unclaimed",
    queue_retry: "unclaimed",
    release: "released",
    mark_released: "released",
    reset: "unclaimed",
  },
  claimed: {
    claim: "claimed",
    start: "running",
    queue_retry: "retry_queued",
    release: "released",
    mark_released: "released",
    reset: "unclaimed",
  },
  running: {
    claim: "running",
    start: "running",
    queue_retry: "retry_queued",
    release: "released",
    mark_released: "released",
    reset: "unclaimed",
  },
  retry_queued: {
    claim: "claimed",
    start: "running",
    queue_retry: "retry_queued",
    release: "released",
    mark_released: "released",
    reset: "unclaimed",
  },
  released: {
    claim: "claimed",
    start: "released",
    queue_retry: "released",
    release: "released",
    mark_released: "released",
    reset: "unclaimed",
  },
};

const STRICT_ALLOWED: Record<OrchestrationState, readonly OrchestrationEvent[]> = {
  unclaimed: ["claim", "mark_released", "reset"],
  claimed: ["start", "queue_retry", "release", "reset"],
  running: ["queue_retry", "release", "reset"],
  retry_queued: ["claim", "start", "release", "reset"],
  released: ["claim", "reset"],
};

export function transitionOrchestrationState(
  current: OrchestrationState,
  event: OrchestrationEvent,
  opts?: { strict?: boolean },
): TransitionResult {
  const strict = opts?.strict ?? true;
  if (strict && !STRICT_ALLOWED[current].includes(event)) {
    return {
      ok: false,
      code: "ORCH_INVALID_TRANSITION",
      message: `Invalid transition: ${current} --${event}--> ?`,
      current,
      event,
    };
  }
  const next = TRANSITIONS[current][event];
  return { ok: true, next };
}

export function assertTransitionOrThrow(
  current: OrchestrationState,
  event: OrchestrationEvent,
): OrchestrationState {
  const result = transitionOrchestrationState(current, event, { strict: true });
  if (!result.ok) {
    throw new Error(`${result.code}: ${result.message}`);
  }
  return result.next;
}
