import { CliError } from "../../shared/errors.js";

import type {
  TaskRunnerActiveClaimOwnerStatus,
  TaskRunnerClaimedRunAuthority,
} from "./task-run-active-claim-authority.js";
import type { TaskRunnerActiveClaim } from "./task-run-active-claim-record.js";

export function competingTaskRunnerActiveClaimError(
  requested: TaskRunnerActiveClaim,
  competing: TaskRunnerActiveClaim,
  ownerStatus: TaskRunnerActiveClaimOwnerStatus,
  runAuthority?: TaskRunnerClaimedRunAuthority,
): CliError {
  return new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message:
      `runner ${requested.operation} refuses to start while supervisor-owned active claim ` +
      `${competing.task_id}:${competing.run_id} is held by ${competing.operation}.`,
    context: {
      task_id: requested.task_id,
      run_id: requested.run_id,
      runner_operation: requested.operation,
      active_run_authority: "supervisor_active_run_claim",
      competing_run_id: competing.run_id,
      competing_operation: competing.operation,
      competing_claimed_at: competing.claimed_at,
      competing_owner_status: ownerStatus,
      competing_owner_pid: competing.owner_pid,
      ...(runAuthority ? { competing_run_authority: runAuthority } : {}),
      ...(competing.source_run_id ? { competing_source_run_id: competing.source_run_id } : {}),
    },
  });
}
