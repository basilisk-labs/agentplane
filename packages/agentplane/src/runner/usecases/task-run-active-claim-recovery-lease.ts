import { randomUUID } from "node:crypto";
import type { BigIntStats } from "node:fs";
import { link, lstat, unlink } from "node:fs/promises";
import path from "node:path";
import { syncDirectory } from "@agentplaneorg/core/fs";

import { CliError } from "../../shared/errors.js";
import { readObservedProcessIdentity } from "../process-supervision/signals.js";
import {
  captureRunnerArtifactDirectoryBoundary,
  ensureStableRunnerArtifactDirectoryChain,
  type RunnerRunDirectoryBoundary,
} from "../run-directory-boundary.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../stable-file.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";

import { inspectTaskRunnerOwnerIdentity } from "./task-run-active-claim-authority.js";

const MAX_RECOVERY_LEASE_BYTES = 4096;

type FileIdentity = { dev: bigint; ino: bigint };

type RecoveryLeaseRecord = {
  schema_version: 1;
  target_generation: string;
  lease_generation: string;
  owner_pid: number;
  owner_command: string | null;
  owner_started_at: string | null;
  claimed_at: string;
};

type RecoveryLeaseDirectory = {
  task_dir: string;
  marker_path: string;
  target_generation: string;
  boundary: RunnerRunDirectoryBoundary;
};

type ObservedRecoveryLease = {
  record: RecoveryLeaseRecord;
  identity: FileIdentity;
};

export type TaskRunnerActiveClaimRecoveryLease = {
  directory: RecoveryLeaseDirectory;
  record: RecoveryLeaseRecord;
  identity: FileIdentity;
  release_started: boolean;
  claim_retirement_started: boolean;
};

export type TaskRunnerActiveClaimRecoveryLeaseAcquisition =
  | { status: "acquired"; lease: TaskRunnerActiveClaimRecoveryLease }
  | { status: "busy"; owner_status: "active" | "stale" | "unverified" };

export type TaskRunnerActiveClaimRecoveryLeaseInspection =
  | {
      status: "absent";
      path: string;
      owner_status: null;
    }
  | {
      status: "held";
      path: string;
      owner_status: "active" | "stale" | "unverified";
      target_generation: string;
      lease_generation: string;
      owner_pid: number;
      claimed_at: string;
    }
  | {
      status: "invalid";
      path: string;
      owner_status: null;
      error: string;
    };

export async function assertTaskRunnerActiveClaimRecoveryLeaseHeld(opts: {
  lease: TaskRunnerActiveClaimRecoveryLease;
  task_dir?: string;
  target_generation: string;
}): Promise<void> {
  if (
    (opts.task_dir !== undefined && opts.lease.directory.task_dir !== opts.task_dir) ||
    opts.lease.record.target_generation !== opts.target_generation
  ) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner active-claim recovery lease does not authorize this claim retirement.",
      context: {
        expected_task_dir: opts.task_dir ?? null,
        recovery_task_dir: opts.lease.directory.task_dir,
        expected_generation: opts.target_generation,
        recovery_target_generation: opts.lease.record.target_generation,
      },
    });
  }
  const current = await readRecoveryLease(opts.lease.directory);
  const currentMatches =
    current?.record.lease_generation === opts.lease.record.lease_generation &&
    sameIdentity(current.identity, opts.lease.identity);
  if (!currentMatches) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner active-claim recovery lease is no longer held.",
      context: {
        target_generation: opts.target_generation,
        lease_generation: opts.lease.record.lease_generation,
        observed_lease_generation: current?.record.lease_generation ?? null,
      },
    });
  }
}

export async function beginTaskRunnerActiveClaimRetirement(opts: {
  lease: TaskRunnerActiveClaimRecoveryLease;
  task_dir: string;
  target_generation: string;
}): Promise<void> {
  if (opts.lease.claim_retirement_started) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner active-claim retirement was already started under this recovery lease.",
      context: {
        target_generation: opts.target_generation,
        lease_generation: opts.lease.record.lease_generation,
      },
    });
  }
  await assertTaskRunnerActiveClaimRecoveryLeaseHeld(opts);
  opts.lease.claim_retirement_started = true;
}

function identity(stat: BigIntStats): FileIdentity {
  return { dev: BigInt(stat.dev), ino: BigInt(stat.ino) };
}

function sameIdentity(left: FileIdentity, right: FileIdentity): boolean {
  return left.dev === right.dev && left.ino === right.ino;
}

function isSafeGeneration(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= 128 &&
    path.basename(value) === value &&
    !value.includes("/") &&
    !value.includes("\\") &&
    !value.includes("\0")
  );
}

function parseRecoveryLease(
  raw: string,
  filePath: string,
  targetGeneration: string,
): RecoveryLeaseRecord {
  let parsed: Partial<RecoveryLeaseRecord>;
  try {
    parsed = JSON.parse(raw) as Partial<RecoveryLeaseRecord>;
  } catch {
    throw invalidRecoveryLease(filePath);
  }
  if (
    parsed.schema_version !== 1 ||
    !isSafeGeneration(parsed.target_generation) ||
    parsed.target_generation !== targetGeneration ||
    !isSafeGeneration(parsed.lease_generation) ||
    typeof parsed.owner_pid !== "number" ||
    !Number.isInteger(parsed.owner_pid) ||
    parsed.owner_pid <= 0 ||
    (parsed.owner_command !== null && typeof parsed.owner_command !== "string") ||
    (parsed.owner_started_at !== null && typeof parsed.owner_started_at !== "string") ||
    typeof parsed.claimed_at !== "string" ||
    !Number.isFinite(Date.parse(parsed.claimed_at))
  ) {
    throw invalidRecoveryLease(filePath);
  }
  return parsed as RecoveryLeaseRecord;
}

function invalidRecoveryLease(filePath: string): CliError {
  return new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message: `Runner active-claim recovery lease is invalid: ${filePath}`,
    context: { recovery_lease_path: filePath },
  });
}

async function resolveRecoveryLeaseDirectory(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  target_generation: string;
}): Promise<RecoveryLeaseDirectory> {
  if (!isSafeGeneration(opts.target_generation)) {
    throw invalidRecoveryLease(
      `active-run-claim recovery lease target generation ${JSON.stringify(opts.target_generation)}`,
    );
  }
  const paths = await resolveSupervisorTaskRunnerPaths({
    ...opts,
    run_id: "active-claim-recovery-lease-probe",
  });
  await ensureStableRunnerArtifactDirectoryChain(paths.artifact_root, paths.task_dir);
  const markerPath = path.join(
    paths.task_dir,
    `.active-run-claim.${opts.target_generation}.recovery-lease.json`,
  );
  const boundary = await captureRunnerArtifactDirectoryBoundary({
    run_dir: paths.task_dir,
    artifact_root: paths.artifact_root,
    artifact_paths: [markerPath],
  });
  return {
    task_dir: paths.task_dir,
    marker_path: markerPath,
    target_generation: opts.target_generation,
    boundary,
  };
}

async function readRecoveryLease(
  directory: RecoveryLeaseDirectory,
): Promise<ObservedRecoveryLease | null> {
  await directory.boundary.assertStable("before reading active-claim recovery lease");
  try {
    const before = await lstat(directory.marker_path, { bigint: true });
    const raw = await readStableRegularTextNoFollow(
      directory.marker_path,
      "runner active-claim recovery lease",
      { max_bytes: MAX_RECOVERY_LEASE_BYTES },
    );
    const after = await lstat(directory.marker_path, { bigint: true });
    if (
      !before.isFile() ||
      before.isSymbolicLink() ||
      !after.isFile() ||
      after.isSymbolicLink() ||
      !sameIdentity(identity(before), identity(after))
    ) {
      throw invalidRecoveryLease(directory.marker_path);
    }
    return {
      record: parseRecoveryLease(raw, directory.marker_path, directory.target_generation),
      identity: identity(after),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
    return null;
  } finally {
    await directory.boundary.assertStable("after reading active-claim recovery lease");
  }
}

export async function inspectTaskRunnerActiveClaimRecoveryLease(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  target_generation: string;
}): Promise<TaskRunnerActiveClaimRecoveryLeaseInspection> {
  const directory = await resolveRecoveryLeaseDirectory(opts);
  let observed: ObservedRecoveryLease | null;
  try {
    observed = await readRecoveryLease(directory);
  } catch (error) {
    if (
      error instanceof CliError &&
      error.code === "E_RUNTIME" &&
      typeof error.context?.recovery_lease_path === "string"
    ) {
      return {
        status: "invalid",
        path: directory.marker_path,
        owner_status: null,
        error: error.message,
      };
    }
    throw error;
  }
  if (!observed) {
    return {
      status: "absent",
      path: directory.marker_path,
      owner_status: null,
    };
  }
  return {
    status: "held",
    path: directory.marker_path,
    owner_status: await inspectTaskRunnerOwnerIdentity(observed.record),
    target_generation: observed.record.target_generation,
    lease_generation: observed.record.lease_generation,
    owner_pid: observed.record.owner_pid,
    claimed_at: observed.record.claimed_at,
  };
}

async function retireRecoveryLease(opts: {
  lease: TaskRunnerActiveClaimRecoveryLease;
  disposition: "completed" | "failed";
}): Promise<boolean> {
  if (opts.lease.release_started) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner active-claim recovery lease release was already started.",
      context: {
        target_generation: opts.lease.record.target_generation,
        lease_generation: opts.lease.record.lease_generation,
      },
    });
  }
  opts.lease.release_started = true;
  const current = await readRecoveryLease(opts.lease.directory);
  if (!current) return false;
  if (
    current.record.lease_generation !== opts.lease.record.lease_generation ||
    !sameIdentity(current.identity, opts.lease.identity)
  ) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner active-claim recovery lease ownership changed before release.",
      context: {
        target_generation: opts.lease.record.target_generation,
        lease_generation: opts.lease.record.lease_generation,
        observed_lease_generation: current.record.lease_generation,
      },
    });
  }
  const archivePath = path.join(
    opts.lease.directory.task_dir,
    `.active-run-claim.${opts.lease.record.target_generation}.recovery-${opts.disposition}.` +
      `${opts.lease.record.lease_generation}.${randomUUID()}.json`,
  );
  await opts.lease.directory.boundary.assertStable("before archiving active-claim recovery lease");
  await link(opts.lease.directory.marker_path, archivePath);
  await opts.lease.directory.boundary.assertStable("after archiving active-claim recovery lease");
  const before = await lstat(archivePath, { bigint: true });
  const archived = parseRecoveryLease(
    await readStableRegularTextNoFollow(archivePath, "retired active-claim recovery lease", {
      max_bytes: MAX_RECOVERY_LEASE_BYTES,
    }),
    archivePath,
    opts.lease.record.target_generation,
  );
  const after = await lstat(archivePath, { bigint: true });
  if (
    archived.lease_generation !== opts.lease.record.lease_generation ||
    !before.isFile() ||
    before.isSymbolicLink() ||
    !after.isFile() ||
    after.isSymbolicLink() ||
    !sameIdentity(identity(before), identity(after)) ||
    !sameIdentity(identity(after), opts.lease.identity)
  ) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner active-claim recovery lease ownership changed before retirement.",
      context: {
        target_generation: opts.lease.record.target_generation,
        lease_generation: opts.lease.record.lease_generation,
        observed_lease_generation: archived.lease_generation,
        quarantine_path: archivePath,
      },
    });
  }
  const beforeUnlink = await readRecoveryLease(opts.lease.directory);
  const beforeUnlinkMatches =
    beforeUnlink?.record.lease_generation === opts.lease.record.lease_generation &&
    sameIdentity(beforeUnlink.identity, opts.lease.identity);
  if (!beforeUnlinkMatches) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner active-claim recovery lease changed after archival.",
      context: {
        target_generation: opts.lease.record.target_generation,
        lease_generation: opts.lease.record.lease_generation,
        observed_lease_generation: beforeUnlink?.record.lease_generation ?? null,
        quarantine_path: archivePath,
      },
    });
  }
  await unlink(opts.lease.directory.marker_path);
  await syncDirectory(opts.lease.directory.task_dir);
  await opts.lease.directory.boundary.assertStable("after retiring active-claim recovery lease");
  return true;
}

export async function acquireTaskRunnerActiveClaimRecoveryLease(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  target_generation: string;
}): Promise<TaskRunnerActiveClaimRecoveryLeaseAcquisition> {
  const directory = await resolveRecoveryLeaseDirectory(opts);
  const owner = await readObservedProcessIdentity(process.pid).catch(() => null);
  const record: RecoveryLeaseRecord = {
    schema_version: 1,
    target_generation: opts.target_generation,
    lease_generation: randomUUID(),
    owner_pid: process.pid,
    owner_command: owner?.command ?? null,
    owner_started_at: owner?.started_at ?? null,
    claimed_at: new Date().toISOString(),
  };
  const candidatePath = path.join(
    directory.task_dir,
    `.active-run-claim.${opts.target_generation}.recovery-candidate.` +
      `${record.lease_generation}.json`,
  );
  await directory.boundary.assertStable(
    "before writing runner active-claim recovery lease candidate",
  );
  await writeNewStableRegularFileNoFollow(
    candidatePath,
    `${JSON.stringify(record)}\n`,
    "runner active-claim recovery lease candidate",
  );
  await directory.boundary.assertStable(
    "after writing runner active-claim recovery lease candidate",
  );
  try {
    for (;;) {
      await directory.boundary.assertStable("before publishing runner active-claim recovery lease");
      try {
        await link(candidatePath, directory.marker_path);
        await syncDirectory(directory.task_dir);
        const observed = await readRecoveryLease(directory);
        if (observed?.record.lease_generation !== record.lease_generation) {
          throw invalidRecoveryLease(directory.marker_path);
        }
        return {
          status: "acquired",
          lease: {
            directory,
            record,
            identity: observed.identity,
            release_started: false,
            claim_retirement_started: false,
          },
        };
      } catch (error) {
        if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
        const competing = await readRecoveryLease(directory);
        if (!competing) continue;
        const ownerStatus = await inspectTaskRunnerOwnerIdentity(competing.record);
        return { status: "busy", owner_status: ownerStatus };
      }
    }
  } finally {
    await unlink(candidatePath).catch(() => null);
    await directory.boundary.assertStable(
      "after abandoning runner active-claim recovery lease candidate",
    );
  }
}

export async function releaseTaskRunnerActiveClaimRecoveryLease(opts: {
  lease: TaskRunnerActiveClaimRecoveryLease;
  succeeded: boolean;
}): Promise<void> {
  const retired = await retireRecoveryLease({
    lease: opts.lease,
    disposition: opts.succeeded ? "completed" : "failed",
  });
  if (!retired) {
    throw new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "Runner active-claim recovery lease disappeared before release.",
      context: {
        target_generation: opts.lease.record.target_generation,
        lease_generation: opts.lease.record.lease_generation,
      },
    });
  }
}
