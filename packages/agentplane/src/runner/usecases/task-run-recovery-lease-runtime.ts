import { CliError } from "../../shared/errors.js";

import {
  releaseTaskRunnerActiveClaimRecoveryLease,
  type TaskRunnerActiveClaimRecoveryLease,
} from "./task-run-active-claim-recovery-lease.js";
import type { LoadedRunnerExecution } from "./task-run-lifecycle-shared.js";

export function createTaskRunnerRecoveryAuthorityError(opts: {
  loaded: LoadedRunnerExecution;
  authority: string;
  reason: string;
  context?: Record<string, unknown>;
}): CliError {
  return new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `Runner could not establish exclusive ${opts.authority} for ` +
      `${opts.loaded.invocation.run_id}.`,
    context: {
      reason: opts.reason,
      run_id: opts.loaded.invocation.run_id,
      ...(opts.context ?? {}),
    },
  });
}

function attachSuppressedLeaseRelease(primary: unknown, release: unknown, operation: string): void {
  if (
    (typeof primary !== "object" && typeof primary !== "function") ||
    primary === null ||
    !Object.isExtensible(primary)
  ) {
    return;
  }
  const diagnostic = {
    operation,
    message: release instanceof Error ? release.message : String(release),
  };
  const existing = (primary as { agentplane_suppressed?: unknown }).agentplane_suppressed;
  if (Array.isArray(existing)) {
    existing.push(diagnostic);
    return;
  }
  Object.defineProperty(primary, "agentplane_suppressed", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: [diagnostic],
  });
}

export async function runTaskRunnerRecoveryLeaseAction<T>(opts: {
  lease: TaskRunnerActiveClaimRecoveryLease;
  release_failure_operation: string;
  action: () => Promise<T>;
}): Promise<T> {
  let result: T;
  try {
    result = await opts.action();
  } catch (primaryError) {
    try {
      await releaseTaskRunnerActiveClaimRecoveryLease({
        lease: opts.lease,
        succeeded: false,
      });
    } catch (releaseError) {
      attachSuppressedLeaseRelease(primaryError, releaseError, opts.release_failure_operation);
    }
    throw primaryError;
  }
  await releaseTaskRunnerActiveClaimRecoveryLease({
    lease: opts.lease,
    succeeded: true,
  });
  return result;
}
