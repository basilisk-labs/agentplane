import type { BigIntStats } from "node:fs";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import type { RunnerRunDirectoryBoundary } from "../run-directory-boundary.js";
import type { RunnerLifecycleStatus } from "../types.js";

export type TaskRunnerActiveClaimOperation = "execute" | "resume" | "retry";

export type TaskRunnerActiveClaimOwnerIdentity = {
  owner_pid: number;
  owner_command: string | null;
  owner_started_at: string | null;
};

export type TaskRunnerActiveClaim = TaskRunnerActiveClaimOwnerIdentity & {
  schema_version: 1;
  claim_id: string;
  generation: string;
  task_id: string;
  run_id: string;
  operation: TaskRunnerActiveClaimOperation;
  claimed_at: string;
  source_run_id?: string;
  source_status?: RunnerLifecycleStatus;
};

export type TaskRunnerActiveClaimFileIdentity = { dev: bigint; ino: bigint };

export type TaskRunnerActiveClaimPathOptions = {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  run_id: string;
};

export type TaskRunnerActiveClaimDirectory = {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  task_dir: string;
  claim_path: string;
  boundary: RunnerRunDirectoryBoundary;
};

export type ObservedTaskRunnerActiveClaim = {
  claim: TaskRunnerActiveClaim;
  identity: TaskRunnerActiveClaimFileIdentity;
};

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

export function parseTaskRunnerActiveClaim(raw: string, claimPath: string): TaskRunnerActiveClaim {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw invalidTaskRunnerActiveClaimError(claimPath, "is not valid JSON");
  }
  if (
    !isRecord(parsed) ||
    parsed.schema_version !== 1 ||
    !isSafeGeneration(parsed.claim_id) ||
    !isSafeGeneration(parsed.generation) ||
    parsed.claim_id !== parsed.generation ||
    typeof parsed.task_id !== "string" ||
    parsed.task_id.length === 0 ||
    typeof parsed.run_id !== "string" ||
    parsed.run_id.length === 0 ||
    (parsed.operation !== "execute" &&
      parsed.operation !== "resume" &&
      parsed.operation !== "retry") ||
    typeof parsed.claimed_at !== "string" ||
    !Number.isFinite(Date.parse(parsed.claimed_at)) ||
    typeof parsed.owner_pid !== "number" ||
    !Number.isInteger(parsed.owner_pid) ||
    parsed.owner_pid <= 0 ||
    (parsed.owner_command !== null && typeof parsed.owner_command !== "string") ||
    (parsed.owner_started_at !== null && typeof parsed.owner_started_at !== "string") ||
    (parsed.source_run_id !== undefined &&
      (typeof parsed.source_run_id !== "string" || parsed.source_run_id.length === 0)) ||
    (parsed.source_status !== undefined && typeof parsed.source_status !== "string")
  ) {
    throw invalidTaskRunnerActiveClaimError(claimPath, "has an invalid supervisor contract");
  }
  return parsed as TaskRunnerActiveClaim;
}

export function invalidTaskRunnerActiveClaimError(claimPath: string, detail: string): CliError {
  return new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message: `Runner active claim ${detail}: ${claimPath}`,
    context: { claim_path: claimPath },
  });
}

export function taskRunnerActiveClaimFileIdentity(stat: BigIntStats): {
  dev: bigint;
  ino: bigint;
} {
  return { dev: BigInt(stat.dev), ino: BigInt(stat.ino) };
}

export function sameTaskRunnerActiveClaimFileIdentity(
  left: { dev: bigint; ino: bigint },
  right: { dev: bigint; ino: bigint },
): boolean {
  return left.dev === right.dev && left.ino === right.ino;
}
