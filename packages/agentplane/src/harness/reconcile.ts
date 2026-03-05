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

export type ReconcileAction =
  | { type: "stop_running"; issueId: string; reason: "terminal" | "non_active" | "not_routed" }
  | { type: "restart_stalled"; issueId: string; elapsedMs: number }
  | { type: "keep_running"; issueId: string };

export type ReconcileResult = {
  nextRunning: ReconcileRunningEntry[];
  actions: ReconcileAction[];
};

function normalizeState(value: string): string {
  return value.trim().toLowerCase();
}

function isStateInSet(value: string, set: readonly string[]): boolean {
  const normalized = normalizeState(value);
  return set.some((item) => normalizeState(item) === normalized);
}

export function reconcileFirst(
  running: readonly ReconcileRunningEntry[],
  observed: readonly ReconcileObservedIssue[],
  config: ReconcileConfig,
  now: Date,
): ReconcileResult {
  const observedById = new Map(observed.map((issue) => [issue.id, issue]));
  const nextRunning: ReconcileRunningEntry[] = [];
  const actions: ReconcileAction[] = [];

  for (const entry of running) {
    const observedIssue = observedById.get(entry.issueId);

    if (!observedIssue) {
      actions.push({ type: "stop_running", issueId: entry.issueId, reason: "non_active" });
      continue;
    }

    if (isStateInSet(observedIssue.state, config.terminalStates)) {
      actions.push({ type: "stop_running", issueId: entry.issueId, reason: "terminal" });
      continue;
    }

    if (!observedIssue.assignedToWorker) {
      actions.push({ type: "stop_running", issueId: entry.issueId, reason: "not_routed" });
      continue;
    }

    if (!isStateInSet(observedIssue.state, config.activeStates)) {
      actions.push({ type: "stop_running", issueId: entry.issueId, reason: "non_active" });
      continue;
    }

    const elapsedMs = Math.max(0, now.getTime() - entry.lastActivityAt.getTime());
    if (config.stallTimeoutMs > 0 && elapsedMs > config.stallTimeoutMs) {
      actions.push({ type: "restart_stalled", issueId: entry.issueId, elapsedMs });
      continue;
    }

    actions.push({ type: "keep_running", issueId: entry.issueId });
    nextRunning.push({ ...entry, state: observedIssue.state });
  }

  return {
    nextRunning,
    actions,
  };
}
