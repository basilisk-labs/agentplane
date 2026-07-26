import type { IntegrationQueueEntry } from "./queue-state.js";
import { sameLegacyProtectedConflictAdoption } from "./queue-state-legacy-adoption.js";

export function integrationQueueEntryMatchesSnapshot(
  current: IntegrationQueueEntry | undefined,
  expected: IntegrationQueueEntry,
): current is IntegrationQueueEntry {
  return (
    current?.task_id === expected.task_id &&
    current.status === expected.status &&
    current.branch === expected.branch &&
    current.base === expected.base &&
    current.head_sha === expected.head_sha &&
    current.base_sha === expected.base_sha &&
    current.updated_at === expected.updated_at &&
    current.claimed_by === expected.claimed_by &&
    current.claimed_at === expected.claimed_at &&
    current.lease_expires_at === expected.lease_expires_at &&
    current.claim_token === expected.claim_token &&
    current.active_operation === expected.active_operation &&
    sameLegacyProtectedConflictAdoption(
      current.legacy_protected_conflict_adoption,
      expected.legacy_protected_conflict_adoption,
    )
  );
}
