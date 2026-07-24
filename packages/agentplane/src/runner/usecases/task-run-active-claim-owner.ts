import { readObservedProcessIdentity } from "../process-supervision/signals.js";

import type { TaskRunnerActiveClaimOwnerIdentity } from "./task-run-active-claim-record.js";

export async function currentTaskRunnerActiveClaimOwner(): Promise<TaskRunnerActiveClaimOwnerIdentity> {
  const observed = await readObservedProcessIdentity(process.pid).catch(() => null);
  return {
    owner_pid: process.pid,
    owner_command: observed?.command ?? null,
    owner_started_at: observed?.started_at ?? null,
  };
}
