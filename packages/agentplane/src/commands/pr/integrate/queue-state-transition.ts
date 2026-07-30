import type { IntegrationQueueEntry, IntegrationQueueStatus, QueueClock } from "./queue-state.js";

export function markQueueEntryStatus(
  entry: IntegrationQueueEntry,
  status: IntegrationQueueStatus,
  reason: string | undefined,
  clock: QueueClock,
): IntegrationQueueEntry {
  const {
    active_operation,
    legacy_protected_conflict_adoption,
    superseded_by_task_id,
    ...entryWithoutActiveOperation
  } = entry;
  void active_operation;
  void legacy_protected_conflict_adoption;
  void superseded_by_task_id;
  const next = {
    ...entryWithoutActiveOperation,
    status,
    updated_at: clock.now().toISOString(),
    reason,
  };
  if (status === "claimed" || status === "handoff") return next;
  const { claimed_by, claimed_at, lease_expires_at, claim_token, ...released } = next;
  void claimed_by;
  void claimed_at;
  void lease_expires_at;
  void claim_token;
  return released;
}
