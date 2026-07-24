import { randomUUID } from "node:crypto";
import { link, unlink } from "node:fs/promises";
import path from "node:path";
import { syncDirectory } from "@agentplaneorg/core/fs";

import { evolveRunnerRunState } from "../artifacts.js";
import { readObservedProcessIdentity } from "../process-supervision/signals.js";
import type { RunnerRunRepository } from "../run-repository.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../stable-file.js";
import type { RunnerInvocation, RunnerRunState } from "../types.js";

import { runnerAdapterCancelledResult } from "./shared.js";

const RUNNER_PRE_SPAWN_DECISION_FILENAME = ".runner-pre-spawn-decision.json";
const RUNNER_CHILD_SPAWN_CLAIM_FILENAME = ".runner-child-spawn-claim.json";
const RUNNER_CANCELLATION_INTENT_FILENAME = ".runner-cancellation-intent.json";
const DEFAULT_START_OWNER_LEASE_MS = 3000;

export type RunnerStartOwnerLease = {
  owner_id: string;
  owner_pid: number;
  owner_command: string | null;
  owner_started_at: string | null;
  heartbeat_at: string;
  lease_expires_at: string;
};

export type RunnerPreSpawnDecision = {
  schema_version: 1;
  run_id: string;
  decision: "start" | "cancel";
  decided_at: string;
  owner_lease?: RunnerStartOwnerLease;
};

export type RunnerCancellationIntent = {
  schema_version: 1;
  run_id: string;
  requested_at: string;
  signal?: "SIGTERM";
};

export type RunnerChildSpawnClaim = {
  schema_version: 1;
  run_id: string;
  start_owner_id: string;
  claimed_at: string;
};

export type PublishedRunnerControlRecord<T> = {
  record: T;
  won: boolean;
  cleanup_error?: {
    code: string;
    message: string;
  };
};

function parseOwnerLease(value: unknown): RunnerStartOwnerLease | null {
  if (!value || typeof value !== "object") return null;
  const lease = value as Partial<RunnerStartOwnerLease>;
  if (
    typeof lease.owner_id !== "string" ||
    lease.owner_id.trim().length === 0 ||
    typeof lease.owner_pid !== "number" ||
    !Number.isInteger(lease.owner_pid) ||
    lease.owner_pid <= 0 ||
    (lease.owner_command !== null && typeof lease.owner_command !== "string") ||
    (lease.owner_started_at !== null && typeof lease.owner_started_at !== "string") ||
    typeof lease.heartbeat_at !== "string" ||
    !Number.isFinite(Date.parse(lease.heartbeat_at)) ||
    typeof lease.lease_expires_at !== "string" ||
    !Number.isFinite(Date.parse(lease.lease_expires_at))
  ) {
    return null;
  }
  return lease as RunnerStartOwnerLease;
}

function parseRunnerPreSpawnDecision(raw: string, expectedRunId: string): RunnerPreSpawnDecision {
  const parsed = JSON.parse(raw) as Partial<RunnerPreSpawnDecision>;
  const ownerLease =
    parsed.owner_lease === undefined ? undefined : parseOwnerLease(parsed.owner_lease);
  if (
    parsed.schema_version !== 1 ||
    parsed.run_id !== expectedRunId ||
    (parsed.decision !== "start" && parsed.decision !== "cancel") ||
    typeof parsed.decided_at !== "string" ||
    !parsed.decided_at.trim() ||
    (parsed.owner_lease !== undefined && ownerLease === null)
  ) {
    throw new Error(`Invalid runner pre-spawn decision for run_id=${expectedRunId}.`);
  }
  return {
    schema_version: 1,
    run_id: expectedRunId,
    decision: parsed.decision,
    decided_at: parsed.decided_at,
    ...(ownerLease ? { owner_lease: ownerLease } : {}),
  };
}

function parseRunnerCancellationIntent(
  raw: string,
  expectedRunId: string,
): RunnerCancellationIntent {
  const parsed = JSON.parse(raw) as Partial<RunnerCancellationIntent>;
  if (
    parsed.schema_version !== 1 ||
    parsed.run_id !== expectedRunId ||
    typeof parsed.requested_at !== "string" ||
    !parsed.requested_at.trim() ||
    (parsed.signal !== undefined && parsed.signal !== "SIGTERM")
  ) {
    throw new Error(`Invalid runner cancellation intent for run_id=${expectedRunId}.`);
  }
  return parsed as RunnerCancellationIntent;
}

function parseRunnerChildSpawnClaim(raw: string, expectedRunId: string): RunnerChildSpawnClaim {
  const parsed = JSON.parse(raw) as Partial<RunnerChildSpawnClaim>;
  if (
    parsed.schema_version !== 1 ||
    parsed.run_id !== expectedRunId ||
    typeof parsed.start_owner_id !== "string" ||
    parsed.start_owner_id.trim().length === 0 ||
    typeof parsed.claimed_at !== "string" ||
    !Number.isFinite(Date.parse(parsed.claimed_at))
  ) {
    throw new Error(`Invalid runner child spawn claim for run_id=${expectedRunId}.`);
  }
  return parsed as RunnerChildSpawnClaim;
}

async function publishImmutableRunnerControlRecord<T>(opts: {
  run_dir: string;
  filename: string;
  label: string;
  record: T;
  parse: (raw: string) => T;
  assert_artifact_boundary?: (phase: string) => Promise<void>;
  cleanup_temporary?: (temporaryPath: string) => Promise<void>;
}): Promise<PublishedRunnerControlRecord<T>> {
  const destinationPath = path.join(opts.run_dir, opts.filename);
  const temporaryPath = path.join(
    opts.run_dir,
    `.${opts.filename}.${process.pid}.${randomUUID()}.tmp`,
  );
  let cleanupError: PublishedRunnerControlRecord<T>["cleanup_error"];
  await opts.assert_artifact_boundary?.(`before publishing ${opts.label}`);
  await writeNewStableRegularFileNoFollow(
    temporaryPath,
    `${JSON.stringify(opts.record)}\n`,
    `${opts.label} temporary file`,
  );
  let won = false;
  try {
    try {
      await link(temporaryPath, destinationPath);
      won = true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
    }
  } finally {
    // Once link(2) has either published our record or observed an existing winner,
    // temporary-file cleanup must not make the immutable control action look failed.
    try {
      await (opts.cleanup_temporary ?? unlink)(temporaryPath);
    } catch (error) {
      cleanupError = {
        code: String((error as NodeJS.ErrnoException | null)?.code ?? "E_IO"),
        message: error instanceof Error ? error.message : String(error),
      };
    }
    await syncDirectory(opts.run_dir);
  }
  const raw = await readStableRegularTextNoFollow(destinationPath, opts.label, {
    max_bytes: 4096,
  });
  const record = opts.parse(raw);
  await opts.assert_artifact_boundary?.(`after publishing ${opts.label}`);
  return { record, won, ...(cleanupError ? { cleanup_error: cleanupError } : {}) };
}

async function defaultStartOwnerLease(opts: {
  heartbeat_at: string;
  lease_ms: number;
}): Promise<RunnerStartOwnerLease> {
  const observed = await readObservedProcessIdentity(process.pid).catch(() => null);
  return {
    owner_id: randomUUID(),
    owner_pid: process.pid,
    owner_command: observed?.command ?? null,
    owner_started_at: observed?.started_at ?? null,
    heartbeat_at: opts.heartbeat_at,
    lease_expires_at: new Date(Date.parse(opts.heartbeat_at) + opts.lease_ms).toISOString(),
  };
}

export async function claimRunnerPreSpawnDecision(opts: {
  invocation: RunnerInvocation;
  decision: RunnerPreSpawnDecision["decision"];
  decided_at?: string;
  start_owner_lease?: RunnerStartOwnerLease;
  start_owner_lease_ms?: number;
  assert_artifact_boundary?: (phase: string) => Promise<void>;
  cleanup_temporary?: (temporaryPath: string) => Promise<void>;
}): Promise<PublishedRunnerControlRecord<RunnerPreSpawnDecision>> {
  const decidedAt = opts.decided_at ?? new Date().toISOString();
  const ownerLease =
    opts.decision === "start"
      ? (opts.start_owner_lease ??
        (await defaultStartOwnerLease({
          heartbeat_at: decidedAt,
          lease_ms: opts.start_owner_lease_ms ?? DEFAULT_START_OWNER_LEASE_MS,
        })))
      : undefined;
  const record: RunnerPreSpawnDecision = {
    schema_version: 1,
    run_id: opts.invocation.run_id,
    decision: opts.decision,
    decided_at: decidedAt,
    ...(ownerLease ? { owner_lease: ownerLease } : {}),
  };
  return await publishImmutableRunnerControlRecord({
    run_dir: opts.invocation.run_dir,
    filename: RUNNER_PRE_SPAWN_DECISION_FILENAME,
    label: "runner pre-spawn decision",
    record,
    parse: (raw) => parseRunnerPreSpawnDecision(raw, opts.invocation.run_id),
    assert_artifact_boundary: opts.assert_artifact_boundary,
    cleanup_temporary: opts.cleanup_temporary,
  });
}

export async function finalizeRunnerPreSpawnCancellation(opts: {
  repository: RunnerRunRepository;
  decision: RunnerPreSpawnDecision;
}): Promise<RunnerRunState> {
  if (opts.decision.decision !== "cancel") {
    throw new Error("Runner pre-spawn cancellation finalizer requires decision=cancel.");
  }
  const current = await opts.repository.readState();
  if (!current) {
    throw new Error(
      "Runner prepared state disappeared after cancellation won pre-spawn authority.",
    );
  }
  if (current.status !== "prepared") return current;
  const result = runnerAdapterCancelledResult({
    reason: "Runner cancellation won immutable pre-spawn authority.",
    summary: "Runner execution was cancelled before child-process spawn.",
    started_at: current.created_at,
    ended_at: opts.decision.decided_at,
    output_paths: [current.bundle_path, current.bootstrap_path].filter(
      (value): value is string => typeof value === "string" && value.trim().length > 0,
    ),
  });
  const next = evolveRunnerRunState({
    state: current,
    status: "cancelled",
    result,
    updated_at: opts.decision.decided_at,
  });
  await opts.repository.writeState(next);
  const observed = await opts.repository.readState();
  if (observed?.status !== "cancelled") {
    throw new Error(
      `Runner pre-spawn cancellation authority observed incompatible state=${observed?.status ?? "missing"}.`,
    );
  }
  if (observed.updated_at === opts.decision.decided_at) {
    await opts.repository.appendEvent({
      at: opts.decision.decided_at,
      type: "runner_cancelled",
      message: "runner cancellation enforced immutable pre-spawn authority",
      data: {
        previous_status: current.status,
        pre_spawn_authority: "cancel",
      },
    });
  }
  return observed;
}

export async function publishRunnerCancellationIntent(opts: {
  invocation: RunnerInvocation;
  requested_at?: string;
  signal?: "SIGTERM";
  assert_artifact_boundary?: (phase: string) => Promise<void>;
}): Promise<PublishedRunnerControlRecord<RunnerCancellationIntent>> {
  const record: RunnerCancellationIntent = {
    schema_version: 1,
    run_id: opts.invocation.run_id,
    requested_at: opts.requested_at ?? new Date().toISOString(),
    ...(opts.signal ? { signal: opts.signal } : {}),
  };
  return await publishImmutableRunnerControlRecord({
    run_dir: opts.invocation.run_dir,
    filename: RUNNER_CANCELLATION_INTENT_FILENAME,
    label: "runner cancellation intent",
    record,
    parse: (raw) => parseRunnerCancellationIntent(raw, opts.invocation.run_id),
    assert_artifact_boundary: opts.assert_artifact_boundary,
  });
}

export async function claimRunnerChildSpawn(opts: {
  invocation: RunnerInvocation;
  start_owner_id: string;
  claimed_at?: string;
  assert_artifact_boundary?: (phase: string) => Promise<void>;
}): Promise<PublishedRunnerControlRecord<RunnerChildSpawnClaim>> {
  const record: RunnerChildSpawnClaim = {
    schema_version: 1,
    run_id: opts.invocation.run_id,
    start_owner_id: opts.start_owner_id,
    claimed_at: opts.claimed_at ?? new Date().toISOString(),
  };
  return await publishImmutableRunnerControlRecord({
    run_dir: opts.invocation.run_dir,
    filename: RUNNER_CHILD_SPAWN_CLAIM_FILENAME,
    label: "runner child spawn claim",
    record,
    parse: (raw) => parseRunnerChildSpawnClaim(raw, opts.invocation.run_id),
    assert_artifact_boundary: opts.assert_artifact_boundary,
  });
}

export async function readRunnerChildSpawnClaim(
  invocation: Pick<RunnerInvocation, "run_dir" | "run_id">,
): Promise<RunnerChildSpawnClaim | null> {
  const claimPath = path.join(invocation.run_dir, RUNNER_CHILD_SPAWN_CLAIM_FILENAME);
  try {
    return parseRunnerChildSpawnClaim(
      await readStableRegularTextNoFollow(claimPath, "runner child spawn claim", {
        max_bytes: 4096,
      }),
      invocation.run_id,
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}

export async function readRunnerCancellationIntent(
  invocation: RunnerInvocation,
): Promise<RunnerCancellationIntent | null> {
  const intentPath = path.join(invocation.run_dir, RUNNER_CANCELLATION_INTENT_FILENAME);
  try {
    return parseRunnerCancellationIntent(
      await readStableRegularTextNoFollow(intentPath, "runner cancellation intent", {
        max_bytes: 4096,
      }),
      invocation.run_id,
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}
