import {
  integrationQueueEntryMatchesSnapshot,
  markQueueEntry,
  type IntegrationQueueEntry,
  type IntegrationQueueStatus,
  type readIntegrationQueue,
} from "./pr/integrate/queue-state.js";

type IntegrationQueueState = Awaited<ReturnType<typeof readIntegrationQueue>>;

type IntegrationQueueDoctorFinding = {
  task_id: string;
  status: string;
  reason: string;
  repair: string | null;
};

export type IntegrationQueueDoctorRepair = IntegrationQueueDoctorFinding & {
  expected_entry: IntegrationQueueEntry;
};

export function applyIntegrationQueueDoctorRepairs(
  queue: IntegrationQueueState,
  findings: readonly IntegrationQueueDoctorRepair[],
): IntegrationQueueState {
  let nextQueue = queue;
  for (const finding of findings) {
    const status = parseDoctorRepairStatus(finding.repair);
    if (!status) continue;
    const latestEntry = nextQueue.entries.find((entry) => entry.task_id === finding.task_id);
    if (!integrationQueueEntryMatchesSnapshot(latestEntry, finding.expected_entry)) continue;
    nextQueue = markQueueEntry(nextQueue, finding.task_id, status, finding.reason);
  }
  return nextQueue;
}

function parseDoctorRepairStatus(
  repair: string | null,
): Extract<IntegrationQueueStatus, "done" | "rework"> | null {
  if (repair === "mark_done") return "done";
  if (repair === "mark_rework") return "rework";
  return null;
}
