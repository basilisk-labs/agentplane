import { randomUUID } from "node:crypto";
import { link, lstat, unlink } from "node:fs/promises";
import path from "node:path";
import { syncDirectory } from "@agentplaneorg/core/fs";

import { CliError } from "../../shared/errors.js";
import {
  captureRunnerArtifactDirectoryBoundary,
  ensureStableRunnerArtifactDirectoryChain,
} from "../run-directory-boundary.js";
import { readObservedProcessIdentity } from "../process-supervision/signals.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../stable-file.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import type { RunnerLifecycleStatus } from "../types.js";

import {
  inspectTaskRunnerActiveClaimOwner,
  inspectTaskRunnerClaimedRunAuthority,
  isExplicitlyRecoverableClaimedRun,
  type TaskRunnerActiveClaimOwnerStatus,
  type TaskRunnerClaimedRunAuthority,
} from "./task-run-active-claim-authority.js";
import {
  acquireTaskRunnerActiveClaimRecoveryLease,
  beginTaskRunnerActiveClaimRetirement,
  releaseTaskRunnerActiveClaimRecoveryLease,
  type TaskRunnerActiveClaimRecoveryLease,
} from "./task-run-active-claim-recovery-lease.js";
import {
  invalidTaskRunnerActiveClaimError,
  parseTaskRunnerActiveClaim,
  sameTaskRunnerActiveClaimFileIdentity,
  taskRunnerActiveClaimFileIdentity,
  type ObservedTaskRunnerActiveClaim,
  type TaskRunnerActiveClaim,
  type TaskRunnerActiveClaimDirectory,
  type TaskRunnerActiveClaimFileIdentity,
  type TaskRunnerActiveClaimOperation,
  type TaskRunnerActiveClaimOwnerIdentity,
  type TaskRunnerActiveClaimPathOptions,
} from "./task-run-active-claim-record.js";

const ACTIVE_RUN_CLAIM_FILENAME = "active-run-claim.json";
const ACTIVE_RUN_CLAIM_MAX_BYTES = 16 * 1024;

export type {
  TaskRunnerActiveClaim,
  TaskRunnerActiveClaimOperation,
  TaskRunnerActiveClaimOwnerIdentity,
} from "./task-run-active-claim-record.js";

export type TaskRunnerActiveClaimLease = {
  claim: TaskRunnerActiveClaim;
  claim_path: string;
  identity: TaskRunnerActiveClaimFileIdentity;
  directory: TaskRunnerActiveClaimDirectory;
  release_started: boolean;
};

export type TaskRunnerActiveClaimRecoveryResult =
  | { status: "absent" }
  | { status: "recovered"; claim: TaskRunnerActiveClaim; archive_path: string }
  | {
      status: "refused";
      reason:
        | "run_mismatch"
        | "run_nonterminal"
        | `run_not_recoverable:${TaskRunnerClaimedRunAuthority}`
        | "generation_mismatch"
        | "owner_identity_mismatch"
        | "owner_active"
        | "owner_unverified";
      claim: TaskRunnerActiveClaim;
    };

export type TaskRunnerActiveClaimRecoveryToken = {
  claim: TaskRunnerActiveClaim;
  identity: TaskRunnerActiveClaimFileIdentity;
  directory: TaskRunnerActiveClaimDirectory;
  recovery_lease: TaskRunnerActiveClaimRecoveryLease;
};

export type TaskRunnerActiveClaimRecoveryPreparation =
  | { status: "absent" }
  | { status: "ready"; token: TaskRunnerActiveClaimRecoveryToken }
  | Extract<TaskRunnerActiveClaimRecoveryResult, { status: "refused" }>;

async function resolveClaimDirectory(
  opts: TaskRunnerActiveClaimPathOptions,
): Promise<TaskRunnerActiveClaimDirectory> {
  const paths = await resolveSupervisorTaskRunnerPaths(opts);
  // Portable Node has no openat/linkat/renameat; reject symlink ancestors and identity changes.
  // This cannot prevent a same-user swap in the syscall-sized check/use gap.
  await ensureStableRunnerArtifactDirectoryChain(paths.artifact_root, paths.task_dir);
  const claimPath = path.join(paths.task_dir, ACTIVE_RUN_CLAIM_FILENAME);
  const boundary = await captureRunnerArtifactDirectoryBoundary({
    run_dir: paths.task_dir,
    artifact_root: paths.artifact_root,
    artifact_paths: [claimPath],
  });
  await boundary.assertStable("after capturing runner active claim task directory");
  return {
    git_root: opts.git_root,
    workflow_dir: opts.workflow_dir,
    task_id: opts.task_id,
    task_dir: paths.task_dir,
    claim_path: claimPath,
    boundary,
  };
}

async function readObservedClaim(
  directory: TaskRunnerActiveClaimDirectory,
): Promise<ObservedTaskRunnerActiveClaim | null> {
  await directory.boundary.assertStable("before reading runner active claim");
  try {
    const before = await lstat(directory.claim_path, { bigint: true });
    if (!before.isFile() || before.isSymbolicLink()) {
      throw invalidTaskRunnerActiveClaimError(
        directory.claim_path,
        "must be a regular non-symlink file",
      );
    }
    const raw = await readStableRegularTextNoFollow(directory.claim_path, "runner active claim", {
      max_bytes: ACTIVE_RUN_CLAIM_MAX_BYTES,
    });
    const after = await lstat(directory.claim_path, { bigint: true });
    if (
      !sameTaskRunnerActiveClaimFileIdentity(
        taskRunnerActiveClaimFileIdentity(before),
        taskRunnerActiveClaimFileIdentity(after),
      )
    ) {
      throw invalidTaskRunnerActiveClaimError(
        directory.claim_path,
        "changed while it was being observed",
      );
    }
    const claim = parseTaskRunnerActiveClaim(raw, directory.claim_path);
    if (claim.task_id !== directory.task_id) {
      throw invalidTaskRunnerActiveClaimError(
        directory.claim_path,
        `declares task_id=${JSON.stringify(claim.task_id)} outside its task directory`,
      );
    }
    return { claim, identity: taskRunnerActiveClaimFileIdentity(after) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
    return null;
  } finally {
    await directory.boundary.assertStable("after reading runner active claim");
  }
}

export async function readTaskRunnerActiveClaim(
  opts: TaskRunnerActiveClaimPathOptions,
): Promise<TaskRunnerActiveClaim | null> {
  const directory = await resolveClaimDirectory(opts);
  const observed = await readObservedClaim(directory);
  return observed?.claim ?? null;
}

function ownerIdentityMatches(
  claim: TaskRunnerActiveClaim,
  expected: TaskRunnerActiveClaimOwnerIdentity,
): boolean {
  return (
    claim.owner_pid === expected.owner_pid &&
    claim.owner_command === expected.owner_command &&
    claim.owner_started_at === expected.owner_started_at
  );
}

function ownershipError(opts: {
  expected: ObservedTaskRunnerActiveClaim;
  observed?: TaskRunnerActiveClaim | null;
  archive_path?: string;
  restored?: boolean;
  detail: string;
}): CliError {
  return new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `Runner active claim ownership violation for ` +
      `${opts.expected.claim.task_id}:${opts.expected.claim.run_id}: ${opts.detail}`,
    context: {
      task_id: opts.expected.claim.task_id,
      run_id: opts.expected.claim.run_id,
      claim_id: opts.expected.claim.claim_id,
      generation: opts.expected.claim.generation,
      observed_claim_id: opts.observed?.claim_id ?? null,
      observed_generation: opts.observed?.generation ?? null,
      ...(opts.archive_path ? { quarantine_path: opts.archive_path } : {}),
      ...(typeof opts.restored === "boolean" ? { quarantined_claim_restored: opts.restored } : {}),
    },
  });
}

async function retireObservedClaim(opts: {
  directory: TaskRunnerActiveClaimDirectory;
  expected: ObservedTaskRunnerActiveClaim;
  disposition: "released" | "stale";
}): Promise<string | null> {
  const archivePath = path.join(
    opts.directory.task_dir,
    `.active-run-claim.${opts.expected.claim.generation}.${opts.disposition}.${randomUUID()}.json`,
  );
  await opts.directory.boundary.assertStable(`before archiving ${opts.disposition} active claim`);
  try {
    await link(opts.directory.claim_path, archivePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
  await opts.directory.boundary.assertStable(`after archiving ${opts.disposition} active claim`);

  let archived: ObservedTaskRunnerActiveClaim | null = null;
  let observationError: unknown;
  try {
    const stat = await lstat(archivePath, { bigint: true });
    if (!stat.isFile() || stat.isSymbolicLink()) {
      throw invalidTaskRunnerActiveClaimError(archivePath, "must be a regular non-symlink file");
    }
    const raw = await readStableRegularTextNoFollow(archivePath, "retired runner active claim", {
      max_bytes: ACTIVE_RUN_CLAIM_MAX_BYTES,
    });
    const after = await lstat(archivePath, { bigint: true });
    if (
      !sameTaskRunnerActiveClaimFileIdentity(
        taskRunnerActiveClaimFileIdentity(stat),
        taskRunnerActiveClaimFileIdentity(after),
      )
    ) {
      throw invalidTaskRunnerActiveClaimError(archivePath, "changed while it was being observed");
    }
    archived = {
      claim: parseTaskRunnerActiveClaim(raw, archivePath),
      identity: taskRunnerActiveClaimFileIdentity(after),
    };
  } catch (error) {
    observationError = error;
  }
  if (
    observationError ||
    archived?.claim.generation !== opts.expected.claim.generation ||
    (archived
      ? !sameTaskRunnerActiveClaimFileIdentity(archived.identity, opts.expected.identity)
      : false)
  ) {
    throw ownershipError({
      expected: opts.expected,
      observed: archived?.claim,
      archive_path: archivePath,
      detail: observationError
        ? `archived claim could not be verified (${
            observationError instanceof Error
              ? observationError.message
              : "unknown observation failure"
          })`
        : "the shared claim path did not reference the expected claim during archival",
    });
  }
  const current = await readObservedClaim(opts.directory);
  const currentMatches =
    current?.claim.generation === opts.expected.claim.generation &&
    sameTaskRunnerActiveClaimFileIdentity(current.identity, opts.expected.identity);
  if (!currentMatches) {
    throw ownershipError({
      expected: opts.expected,
      observed: current?.claim,
      archive_path: archivePath,
      detail: "the shared claim path changed after archival",
    });
  }
  await unlink(opts.directory.claim_path);
  await syncDirectory(opts.directory.task_dir);
  await opts.directory.boundary.assertStable(`after retiring ${opts.disposition} active claim`);
  return archivePath;
}

function competingClaimError(
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

async function currentOwnerIdentity(): Promise<TaskRunnerActiveClaimOwnerIdentity> {
  const observed = await readObservedProcessIdentity(process.pid).catch(() => null);
  return {
    owner_pid: process.pid,
    owner_command: observed?.command ?? null,
    owner_started_at: observed?.started_at ?? null,
  };
}

export async function acquireTaskRunnerActiveClaim(
  opts: TaskRunnerActiveClaimPathOptions & {
    operation: TaskRunnerActiveClaimOperation;
    source_run_id?: string;
    source_status?: RunnerLifecycleStatus;
    reconcile_terminal_claim?: (claim: TaskRunnerActiveClaim) => Promise<void>;
  },
): Promise<TaskRunnerActiveClaimLease> {
  const directory = await resolveClaimDirectory(opts);
  const generation = randomUUID();
  const claim: TaskRunnerActiveClaim = {
    schema_version: 1,
    claim_id: generation,
    generation,
    task_id: opts.task_id,
    run_id: opts.run_id,
    operation: opts.operation,
    claimed_at: new Date().toISOString(),
    ...(await currentOwnerIdentity()),
    ...(opts.source_run_id ? { source_run_id: opts.source_run_id } : {}),
    ...(opts.source_status ? { source_status: opts.source_status } : {}),
  };
  const candidatePath = path.join(
    directory.task_dir,
    `.active-run-claim.${generation}.candidate.json`,
  );
  await directory.boundary.assertStable("before writing runner active claim candidate");
  await writeNewStableRegularFileNoFollow(
    candidatePath,
    `${JSON.stringify(claim, null, 2)}\n`,
    "runner active claim candidate",
  );
  await directory.boundary.assertStable("after writing runner active claim candidate");

  let acquired = false;
  try {
    for (;;) {
      await directory.boundary.assertStable("before publishing runner active claim");
      try {
        await link(candidatePath, directory.claim_path);
        await syncDirectory(directory.task_dir);
        acquired = true;
        const observed = await readObservedClaim(directory);
        if (observed?.claim.generation !== generation) {
          throw ownershipError({
            expected: {
              claim,
              identity: observed?.identity ?? { dev: -1n, ino: -1n },
            },
            observed: observed?.claim,
            detail: "the newly published generation could not be observed",
          });
        }
        return {
          claim,
          claim_path: directory.claim_path,
          identity: observed.identity,
          directory,
          release_started: false,
        };
      } catch (error) {
        if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
        const competing = await readObservedClaim(directory);
        if (!competing) continue;
        const ownerStatus = await inspectTaskRunnerActiveClaimOwner(competing.claim);
        if (ownerStatus !== "stale") {
          throw competingClaimError(claim, competing.claim, ownerStatus);
        }
        const runAuthority = await inspectTaskRunnerClaimedRunAuthority(directory, competing.claim);
        if (runAuthority === "terminal" && opts.reconcile_terminal_claim) {
          await opts.reconcile_terminal_claim(competing.claim);
          const reconciled = await readObservedClaim(directory);
          if (!reconciled) continue;
          if (
            reconciled.claim.generation !== competing.claim.generation ||
            !sameTaskRunnerActiveClaimFileIdentity(reconciled.identity, competing.identity)
          ) {
            throw ownershipError({
              expected: competing,
              observed: reconciled.claim,
              detail: "the claim generation changed during terminal reconciliation",
            });
          }
          if (
            (await inspectTaskRunnerClaimedRunAuthority(directory, reconciled.claim)) !== "terminal"
          ) {
            throw competingClaimError(claim, reconciled.claim, ownerStatus, runAuthority);
          }
          throw competingClaimError(claim, reconciled.claim, ownerStatus, runAuthority);
        }
        if (runAuthority !== "absent" && runAuthority !== "incomplete_pre_provider") {
          throw competingClaimError(claim, competing.claim, ownerStatus, runAuthority);
        }
        const recovered = await recoverTaskRunnerActiveClaim({
          git_root: opts.git_root,
          workflow_dir: opts.workflow_dir,
          task_id: opts.task_id,
          run_id: competing.claim.run_id,
          expected_generation: competing.claim.generation,
          expected_owner: competing.claim,
        });
        if (recovered.status === "recovered" || recovered.status === "absent") continue;
        throw competingClaimError(claim, recovered.claim, ownerStatus, runAuthority);
      }
    }
  } finally {
    await unlink(candidatePath).catch(() => null);
    if (!acquired) {
      await directory.boundary.assertStable("after abandoning runner active claim candidate");
    }
  }
}

export async function prepareTaskRunnerActiveClaimRecovery(
  opts: TaskRunnerActiveClaimPathOptions & {
    expected_owner: TaskRunnerActiveClaimOwnerIdentity;
    expected_generation: string;
    recovery_lease: TaskRunnerActiveClaimRecoveryLease;
  },
): Promise<TaskRunnerActiveClaimRecoveryPreparation> {
  const directory = await resolveClaimDirectory(opts);
  const observed = await readObservedClaim(directory);
  if (!observed) return { status: "absent" };
  if (observed.claim.run_id !== opts.run_id) {
    return { status: "refused", reason: "run_mismatch", claim: observed.claim };
  }
  if (observed.claim.generation !== opts.expected_generation) {
    return { status: "refused", reason: "generation_mismatch", claim: observed.claim };
  }
  if (!ownerIdentityMatches(observed.claim, opts.expected_owner)) {
    return { status: "refused", reason: "owner_identity_mismatch", claim: observed.claim };
  }
  const runAuthority = await inspectTaskRunnerClaimedRunAuthority(directory, observed.claim);
  if (!isExplicitlyRecoverableClaimedRun(runAuthority)) {
    return {
      status: "refused",
      reason: `run_not_recoverable:${runAuthority}`,
      claim: observed.claim,
    };
  }
  const ownerStatus = await inspectTaskRunnerActiveClaimOwner(observed.claim);
  if (ownerStatus !== "stale") {
    return {
      status: "refused",
      reason: ownerStatus === "active" ? "owner_active" : "owner_unverified",
      claim: observed.claim,
    };
  }
  return {
    status: "ready",
    token: {
      claim: observed.claim,
      identity: observed.identity,
      directory,
      recovery_lease: opts.recovery_lease,
    },
  };
}

export async function completeTaskRunnerActiveClaimRecovery(
  token: TaskRunnerActiveClaimRecoveryToken,
): Promise<TaskRunnerActiveClaimRecoveryResult> {
  const observed = await readObservedClaim(token.directory);
  if (!observed) return { status: "absent" };
  if (observed.claim.generation !== token.claim.generation) {
    return { status: "refused", reason: "generation_mismatch", claim: observed.claim };
  }
  if (!sameTaskRunnerActiveClaimFileIdentity(observed.identity, token.identity)) {
    throw ownershipError({
      expected: {
        claim: token.claim,
        identity: token.identity,
      },
      observed: observed.claim,
      detail: "the claim inode changed during recovery",
    });
  }
  const runAuthority = await inspectTaskRunnerClaimedRunAuthority(token.directory, observed.claim);
  if (!isExplicitlyRecoverableClaimedRun(runAuthority)) {
    return {
      status: "refused",
      reason: `run_not_recoverable:${runAuthority}`,
      claim: observed.claim,
    };
  }
  await beginTaskRunnerActiveClaimRetirement({
    lease: token.recovery_lease,
    task_dir: token.directory.task_dir,
    target_generation: token.claim.generation,
  });
  const archivePath = await retireObservedClaim({
    directory: token.directory,
    expected: observed,
    disposition: "stale",
  });
  return archivePath
    ? { status: "recovered", claim: observed.claim, archive_path: archivePath }
    : { status: "absent" };
}

export async function recoverTaskRunnerActiveClaim(
  opts: TaskRunnerActiveClaimPathOptions & {
    expected_owner: TaskRunnerActiveClaimOwnerIdentity;
    expected_generation: string;
  },
): Promise<TaskRunnerActiveClaimRecoveryResult> {
  const acquisition = await acquireTaskRunnerActiveClaimRecoveryLease({
    git_root: opts.git_root,
    workflow_dir: opts.workflow_dir,
    task_id: opts.task_id,
    target_generation: opts.expected_generation,
  });
  if (acquisition.status === "busy") {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner active-claim recovery authority is already held.",
      context: {
        task_id: opts.task_id,
        run_id: opts.run_id,
        generation: opts.expected_generation,
        recovery_lease_owner_status: acquisition.owner_status,
      },
    });
  }
  let succeeded = false;
  try {
    const prepared = await prepareTaskRunnerActiveClaimRecovery({
      ...opts,
      recovery_lease: acquisition.lease,
    });
    const result =
      prepared.status === "ready"
        ? await completeTaskRunnerActiveClaimRecovery(prepared.token)
        : prepared;
    succeeded = result.status === "absent" || result.status === "recovered";
    return result;
  } finally {
    await releaseTaskRunnerActiveClaimRecoveryLease({
      lease: acquisition.lease,
      succeeded,
    });
  }
}

export async function releaseTaskRunnerActiveClaim(
  lease: TaskRunnerActiveClaimLease,
): Promise<string> {
  if (lease.release_started) {
    throw ownershipError({
      expected: { claim: lease.claim, identity: lease.identity },
      detail: "claim release was already started",
    });
  }
  lease.release_started = true;
  const archivePath = await retireObservedClaim({
    directory: lease.directory,
    expected: { claim: lease.claim, identity: lease.identity },
    disposition: "released",
  });
  if (!archivePath) {
    throw ownershipError({
      expected: { claim: lease.claim, identity: lease.identity },
      detail: "the shared claim path disappeared before release",
    });
  }
  return archivePath;
}
