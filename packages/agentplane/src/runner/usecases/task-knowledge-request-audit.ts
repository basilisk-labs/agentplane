import { createHash, randomUUID } from "node:crypto";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

import { atomicWriteFile } from "@agentplaneorg/core/fs";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import {
  validateTaskKnowledgeRequestResponse,
  type TaskKnowledgeRequestAudit,
} from "./task-knowledge-request.js";

export const TASK_KNOWLEDGE_REQUEST_AUDIT_DIRECTORY = "knowledge-requests" as const;
const AUDIT_RESERVATION_STALE_AFTER_MS = 60_000;
const AUDIT_RESERVATION_RETRY_DELAY_MS = 10;
const AUDIT_RESERVATION_WAIT_MS = 5000;
const AUDIT_RESERVATION_OWNER_FILE = "owner";

type KnowledgeRequestInvocation = {
  run_id: string;
  work_order_id: string;
  state_fingerprint_digest: string;
};

function matchesInvocation(opts: {
  audit: TaskKnowledgeRequestAudit;
  invocation: KnowledgeRequestInvocation;
}): boolean {
  return (
    opts.audit.run.work_order_id === opts.invocation.work_order_id &&
    opts.audit.run.state_fingerprint_digest === opts.invocation.state_fingerprint_digest
  );
}

function reservationLockPath(opts: {
  runs_dir: string;
  invocation: KnowledgeRequestInvocation;
  role: AgentWorkOrderV2["role"];
}): string {
  const binding = JSON.stringify({
    work_order_id: opts.invocation.work_order_id,
    state_fingerprint_digest: opts.invocation.state_fingerprint_digest,
    role: opts.role,
  });
  const suffix = createHash("sha256").update(binding, "utf8").digest("hex").slice(0, 32);
  return path.join(opts.runs_dir, `.knowledge-request-${suffix}.lock`);
}

/**
 * Keep audit reload, round calculation, and durable persistence in one
 * cross-process critical section. The lock is keyed to the immutable work
 * order binding, not a physical run id, because a continuation may allocate a
 * later run directory for the same semantic episode.
 */
export async function withTaskKnowledgeRequestAuditReservation<T>(opts: {
  runs_dir: string;
  invocation: KnowledgeRequestInvocation;
  role: AgentWorkOrderV2["role"];
  work: () => Promise<T>;
}): Promise<T> {
  await mkdir(opts.runs_dir, { recursive: true, mode: 0o700 });
  const lockPath = reservationLockPath(opts);
  const deadline = Date.now() + AUDIT_RESERVATION_WAIT_MS;
  const owner = randomUUID();
  while (true) {
    try {
      await mkdir(lockPath, { mode: 0o700 });
      try {
        await writeFile(path.join(lockPath, AUDIT_RESERVATION_OWNER_FILE), `${owner}\n`, "utf8");
      } catch (error) {
        await rm(lockPath, { recursive: true, force: true });
        throw error;
      }
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
      const age = await stat(lockPath)
        .then((entry) => Date.now() - entry.mtimeMs)
        .catch(() => 0);
      if (age > AUDIT_RESERVATION_STALE_AFTER_MS) {
        await rm(lockPath, { recursive: true, force: true });
        continue;
      }
      if (Date.now() >= deadline) {
        throw new Error(`Timed out reserving task knowledge request audit: ${lockPath}`);
      }
      await sleep(AUDIT_RESERVATION_RETRY_DELAY_MS);
    }
  }
  try {
    return await opts.work();
  } finally {
    const observedOwner = await readFile(
      path.join(lockPath, AUDIT_RESERVATION_OWNER_FILE),
      "utf8",
    ).catch(() => null);
    if (observedOwner?.trim() === owner) {
      await rm(lockPath, { recursive: true, force: true });
    }
  }
}

export async function persistTaskKnowledgeRequestAudit(opts: {
  file_path: string;
  audit: TaskKnowledgeRequestAudit;
}): Promise<void> {
  validateTaskKnowledgeRequestResponse(opts.audit);
  await mkdir(path.dirname(opts.file_path), { recursive: true });
  await atomicWriteFile(opts.file_path, `${JSON.stringify(opts.audit, null, 2)}\n`, "utf8");
}

export function taskKnowledgeRequestAuditPath(opts: {
  run_dir: string;
  audit: Pick<TaskKnowledgeRequestAudit, "round" | "digest">;
}): string {
  const digest = opts.audit.digest.slice("sha256:".length);
  if (!/^[0-9a-f]{64}$/u.test(digest)) {
    throw new Error("Knowledge request audit digest must be a sha256 value.");
  }
  return path.join(
    opts.run_dir,
    TASK_KNOWLEDGE_REQUEST_AUDIT_DIRECTORY,
    `round-${String(opts.audit.round).padStart(2, "0")}-${digest.slice(0, 16)}.json`,
  );
}

/** Reload only digest-valid audits whose immutable binding matches the next round. */
export async function loadTaskKnowledgeRequestAudits(opts: {
  runs_dir: string;
  invocation: KnowledgeRequestInvocation;
  role: AgentWorkOrderV2["role"];
}): Promise<TaskKnowledgeRequestAudit[]> {
  let runEntries;
  try {
    runEntries = await readdir(opts.runs_dir, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return [];
    throw error;
  }
  const audits: TaskKnowledgeRequestAudit[] = [];
  for (const runEntry of runEntries
    .filter((entry) => entry.isDirectory())
    .toSorted((left, right) => left.name.localeCompare(right.name))) {
    const directory = path.join(
      opts.runs_dir,
      runEntry.name,
      TASK_KNOWLEDGE_REQUEST_AUDIT_DIRECTORY,
    );
    let names;
    try {
      names = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") continue;
      throw error;
    }
    for (const entry of names.filter(
      (candidate) => candidate.isFile() && candidate.name.endsWith(".json"),
    )) {
      try {
        const audit = validateTaskKnowledgeRequestResponse(
          JSON.parse(await readFile(path.join(directory, entry.name), "utf8")) as unknown,
        );
        if (
          audit.run.role !== opts.role ||
          !matchesInvocation({ audit, invocation: opts.invocation })
        ) {
          continue;
        }
        audits.push(audit);
      } catch {
        // Stale, malformed, or tampered prior audits cannot influence a new round.
      }
    }
  }
  return audits.toSorted(
    (left, right) => left.round - right.round || left.digest.localeCompare(right.digest),
  );
}
