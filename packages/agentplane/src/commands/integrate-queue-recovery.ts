import type { PrFlowStatusReport } from "./pr/flow-status.js";
import type { IntegrationQueueEntry, IntegrationQueueStatus } from "./pr/integrate/queue-state.js";

export type IntegrationQueueRecoveryDecision =
  | {
      action: "keep";
      reason: string;
    }
  | {
      action: "mark";
      status: Extract<IntegrationQueueStatus, "done" | "rework">;
      reason: string;
    };

export function decideIntegrationQueueRecovery(opts: {
  entry: IntegrationQueueEntry;
  report: PrFlowStatusReport;
}): IntegrationQueueRecoveryDecision {
  const { report } = opts;
  if (opts.entry.status === "claimed") {
    return {
      action: "keep",
      reason: "integration claim is still active; waiting for claim owner or lease expiry",
    };
  }
  if (report.pr.state === "OPEN") {
    return {
      action: "keep",
      reason: "remote PR is still open; keeping live integration lane occupied",
    };
  }
  if (report.pr.state === "not_found") {
    return {
      action: "mark",
      status: "rework",
      reason: "remote PR is missing; stale queue lane needs operator recovery",
    };
  }
  if (report.pr.state === "CLOSED") {
    return {
      action: "mark",
      status: "rework",
      reason: "remote PR is closed without merge; stale queue lane needs operator recovery",
    };
  }
  if (report.closeTail.state === "recorded_on_base" || report.closeTail.state === "merged") {
    return {
      action: "mark",
      status: "done",
      reason: "remote PR merged and close-tail evidence is already recorded",
    };
  }
  return {
    action: "keep",
    reason: `remote PR merged but close-tail is not complete; ${report.nextAction}`,
  };
}
