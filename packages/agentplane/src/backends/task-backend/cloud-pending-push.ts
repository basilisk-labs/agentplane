import { BackendError } from "./shared.js";
import type { CloudBackendPendingPush } from "./cloud-backend-state.js";

export function pendingCloudPushError(pending: CloudBackendPendingPush): BackendError {
  return new BackendError(
    [
      "Cloud backend has unpushed local task mutations; refusing to overwrite the projection.",
      `Last failed push: ${pending.failed_at}`,
      `Reason: ${pending.reason}`,
      "Fix: run agentplane backend sync cloud --direction push --yes after the cloud service is available.",
      "Safe command: agentplane backend sync cloud --direction push --conflict=fail --yes",
      "Stop condition: stop if push reports open conflicts or cannot clear the pending local mutation.",
    ].join("\n"),
    "E_BACKEND",
  );
}

export function cloudPendingPushReason(error: unknown): string {
  return error instanceof Error ? error.message || error.name : String(error);
}
