import { randomUUID } from "node:crypto";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../shared/errors.js";

import type { ContextIngestRunJournal } from "./ingest-run-journal.js";

const ACTIVE_DIRECTORY = ".agentplane/context/ingest-runs/active";

type ExecutionLease = {
  pid: number;
  run_id: string;
  token: string;
  version: 1;
};

export type ContextIngestRunExecutionClaim = Pick<ExecutionLease, "run_id" | "token">;

export async function claimContextIngestRunExecution(
  root: string,
  run: ContextIngestRunJournal,
): Promise<ContextIngestRunExecutionClaim> {
  const target = executionLeasePath(root, run.run_id);
  await mkdir(path.dirname(target), { recursive: true });
  const claim: ExecutionLease = {
    pid: process.pid,
    run_id: run.run_id,
    token: randomUUID(),
    version: 1,
  };
  try {
    await writeFile(target, `${JSON.stringify(claim, null, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
    });
    return claim;
  } catch (error) {
    if (!isNodeError(error, "EEXIST")) throw error;
  }

  const existing = await readExecutionLease(target);
  if (existing === null) return await claimContextIngestRunExecution(root, run);
  if (processIsAlive(existing.pid)) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message:
        `context ingest run ${run.run_id} is already executing in process ${existing.pid}. ` +
        "Wait for that execution to finish before retrying.",
    });
  }
  await unlink(target).catch((error: unknown) => {
    if (isNodeError(error, "ENOENT")) return;
    throw error;
  });
  return await claimContextIngestRunExecution(root, run);
}

export async function releaseContextIngestRunExecution(
  root: string,
  claim: ContextIngestRunExecutionClaim,
): Promise<void> {
  const target = executionLeasePath(root, claim.run_id);
  const current = await readExecutionLease(target);
  if (current?.token !== claim.token) return;
  await unlink(target).catch((error: unknown) => {
    if (isNodeError(error, "ENOENT")) return;
    throw error;
  });
}

async function readExecutionLease(target: string): Promise<ExecutionLease | null> {
  try {
    const raw = await readFile(target, "utf8");
    const parsed = JSON.parse(raw) as Partial<ExecutionLease>;
    if (
      parsed.version !== 1 ||
      typeof parsed.pid !== "number" ||
      typeof parsed.run_id !== "string" ||
      typeof parsed.token !== "string"
    ) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `context ingest execution lease is malformed: ${target}`,
      });
    }
    return parsed as ExecutionLease;
  } catch (error) {
    if (isNodeError(error, "ENOENT")) return null;
    throw error;
  }
}

function executionLeasePath(root: string, runId: string): string {
  return path.join(root, ACTIVE_DIRECTORY, `${runId}.execution.json`);
}

function processIsAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return isNodeError(error, "EPERM");
  }
}

function isNodeError(error: unknown, code: string): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === code;
}
