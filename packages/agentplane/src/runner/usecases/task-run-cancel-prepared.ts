import { evolveRunnerRunState, readRunnerRunState } from "../artifacts.js";
import type {
  RunnerPreSpawnDecision,
  RunnerStartOwnerLease,
} from "../adapters/execution-control.js";
import { readRunnerChildSpawnClaim } from "../adapters/execution-control.js";
import { runnerAdapterCancelledResult } from "../adapters/shared.js";
import { CliError } from "../../shared/errors.js";
import { isProcessAlive, readObservedProcessIdentity } from "../process-supervision/signals.js";
import type { RunnerRunRepository } from "../run-repository.js";
import type { RunnerInvocation, RunnerRunState } from "../types.js";
import {
  assertTaskRunnerActiveClaimRecoveryLeaseHeld,
  type TaskRunnerActiveClaimRecoveryLease,
} from "./task-run-active-claim-recovery-lease.js";

export type StartOwnerLeaseStatus = "active" | "orphaned" | "unverified";

export async function waitForPreparedRunnerTransition(opts: {
  state_path: string;
  timeout_ms: number;
  poll_ms?: number;
}): Promise<RunnerRunState | null> {
  const startedAt = Date.now();
  const pollMs = opts.poll_ms ?? 50;
  while (Date.now() - startedAt < opts.timeout_ms) {
    const state = await readRunnerRunState(opts.state_path);
    if (state?.status !== "prepared") return state;
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }
  return await readRunnerRunState(opts.state_path);
}

export async function inspectStartOwnerLease(
  lease: RunnerStartOwnerLease | undefined,
): Promise<StartOwnerLeaseStatus> {
  if (!lease || Date.now() < Date.parse(lease.lease_expires_at)) return "active";
  let observed: Awaited<ReturnType<typeof readObservedProcessIdentity>>;
  try {
    observed = await readObservedProcessIdentity(lease.owner_pid);
  } catch {
    return isProcessAlive(lease.owner_pid) ? "unverified" : "orphaned";
  }
  if (!observed) {
    return isProcessAlive(lease.owner_pid) ? "unverified" : "orphaned";
  }
  if (!lease.owner_command || !lease.owner_started_at) return "unverified";
  if (!observed.command || !observed.started_at) return "unverified";
  return observed.command === lease.owner_command && observed.started_at === lease.owner_started_at
    ? "active"
    : "orphaned";
}

export function buildCancelledState(opts: {
  state: RunnerRunState;
  reason: string;
  summary: string;
  updated_at: string;
}): RunnerRunState {
  const result = runnerAdapterCancelledResult({
    reason: opts.reason,
    summary: opts.summary,
    started_at: opts.state.result?.started_at ?? opts.state.created_at,
    ended_at: opts.updated_at,
    output_paths: [opts.state.bundle_path, opts.state.bootstrap_path].filter(
      (value): value is string => typeof value === "string" && value.trim().length > 0,
    ),
  });
  return evolveRunnerRunState({
    state: opts.state,
    status: "cancelled",
    result,
    updated_at: opts.updated_at,
  });
}

export async function finalizeOrphanedPreparedStart(opts: {
  repository: RunnerRunRepository;
  invocation: RunnerInvocation;
  decision: RunnerPreSpawnDecision;
  recovery_lease: TaskRunnerActiveClaimRecoveryLease;
  active_claim_generation: string;
}): Promise<RunnerRunState | null> {
  const leaseStatus =
    opts.decision.decision === "cancel"
      ? "orphaned"
      : await inspectStartOwnerLease(opts.decision.owner_lease);
  if (leaseStatus !== "orphaned") return null;
  const spawnClaim = await readRunnerChildSpawnClaim(opts.invocation);
  if (spawnClaim) {
    const error = new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message:
        `Runner cancellation refused because child-process spawn was authorized but its ` +
        `outcome cannot be confirmed for run_id=${JSON.stringify(opts.invocation.run_id)}.`,
      context: {
        reason: "spawn_authorized_but_unconfirmed",
        run_id: opts.invocation.run_id,
        start_owner_id: opts.decision.owner_lease?.owner_id ?? null,
        spawn_claim_owner_id: spawnClaim.start_owner_id,
        spawn_claimed_at: spawnClaim.claimed_at,
      },
    });
    await opts.repository.appendEvent({
      at: new Date().toISOString(),
      type: "runner_cancel_refused",
      message: error.message,
      data: error.context,
    });
    throw error;
  }
  const current = await opts.repository.readState();
  if (current?.status !== "prepared") return current;
  await assertTaskRunnerActiveClaimRecoveryLeaseHeld({
    lease: opts.recovery_lease,
    target_generation: opts.active_claim_generation,
  });
  const updatedAt = new Date().toISOString();
  const next = buildCancelledState({
    state: current,
    reason:
      "Runner execution start owner lease expired and the immutable start owner is no longer alive.",
    summary: "Runner execution was cancelled after orphaned pre-spawn ownership.",
    updated_at: updatedAt,
  });
  const currentBeforeWrite = await opts.repository.readState();
  if (!currentBeforeWrite || JSON.stringify(currentBeforeWrite) !== JSON.stringify(current)) {
    return currentBeforeWrite;
  }
  await opts.repository.writeState(next);
  const observed = await opts.repository.readState();
  if (!observed || JSON.stringify(observed) !== JSON.stringify(next)) return observed;
  await opts.repository.appendEvent({
    at: updatedAt,
    type: "runner_pre_spawn_owner_orphaned",
    message: "runner prepared state recovered after the immutable start owner lease expired",
    data: {
      owner_id: opts.decision.owner_lease?.owner_id ?? null,
      owner_pid: opts.decision.owner_lease?.owner_pid ?? null,
      owner_heartbeat_at: opts.decision.owner_lease?.heartbeat_at ?? null,
      owner_lease_expires_at: opts.decision.owner_lease?.lease_expires_at ?? null,
      owner_lease_status: leaseStatus,
    },
  });
  await opts.repository.appendEvent({
    at: updatedAt,
    type: "runner_cancelled",
    message: "runner marked cancelled after orphaned pre-spawn ownership",
    data: {
      previous_status: current.status,
      orphaned_start_owner: true,
    },
  });
  return next;
}
