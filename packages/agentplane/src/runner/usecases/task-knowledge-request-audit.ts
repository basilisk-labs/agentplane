import { createHash } from "node:crypto";
import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { validateAgentSemanticResult, type AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import {
  isCloudProjectionLockHeldError,
  withCloudProjectionLock,
} from "../../backends/task-backend/cloud-projection-lock.js";
import {
  createTaskKnowledgeRequestResponse,
  validateTaskKnowledgeRequestResponse,
  type TaskKnowledgeRequestAudit,
  type TaskKnowledgeRequestResponse,
} from "./task-knowledge-request.js";
import { requestDigest } from "./task-knowledge-request-codec.js";

export const TASK_KNOWLEDGE_REQUEST_AUDIT_DIRECTORY = "knowledge-requests" as const;
const AUDIT_RESERVATION_RETRY_DELAY_MS = 10;
const AUDIT_RESERVATION_WAIT_MS = 5000;

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

function reservationLockName(opts: {
  invocation: KnowledgeRequestInvocation;
  role: AgentWorkOrderV2["role"];
}): string {
  const binding = JSON.stringify({
    work_order_id: opts.invocation.work_order_id,
    state_fingerprint_digest: opts.invocation.state_fingerprint_digest,
    role: opts.role,
  });
  const suffix = createHash("sha256").update(binding, "utf8").digest("hex").slice(0, 32);
  return `knowledge-request-${suffix}`;
}

/**
 * Keep audit reload, round calculation, and durable persistence in one
 * cross-process critical section. The owned file lock has no age-based expiry:
 * a live holder cannot be removed by a slow request. The lock is keyed to the
 * immutable work order binding, not a physical run id, because a continuation
 * may allocate a later run directory for the same semantic episode.
 */
export async function withTaskKnowledgeRequestAuditReservation<T>(opts: {
  invocation: KnowledgeRequestInvocation;
  repository_root: string;
  role: AgentWorkOrderV2["role"];
  wait_ms?: number;
  work: () => Promise<T>;
}): Promise<{ status: "reserved"; value: T } | { status: "busy" }> {
  const deadline = Date.now() + (opts.wait_ms ?? AUDIT_RESERVATION_WAIT_MS);
  const lockName = reservationLockName(opts);
  while (true) {
    try {
      return {
        status: "reserved",
        value: await withCloudProjectionLock(
          {
            lockName,
            operation: "knowledge-request-audit-reservation",
            repositoryRoot: opts.repository_root,
          },
          opts.work,
        ),
      };
    } catch (error) {
      if (!isCloudProjectionLockHeldError(error)) throw error;
      if (Date.now() >= deadline) {
        return { status: "busy" };
      }
      await sleep(AUDIT_RESERVATION_RETRY_DELAY_MS);
    }
  }
}

/**
 * A contended reservation must return a bounded, typed response rather than
 * leak a storage-level lock failure through the runner lifecycle. Round 0
 * means that this response was not reserved or persisted and did not consume
 * the work order's knowledge-request budget.
 */
export function taskKnowledgeRequestReservationUnavailableResponse(opts: {
  invocation: KnowledgeRequestInvocation;
  semantic_result: unknown;
  work_order: Pick<AgentWorkOrderV2, "role">;
}): TaskKnowledgeRequestResponse {
  let requestDigestValue: string | null = null;
  let blocking = false;
  try {
    const semantic = validateAgentSemanticResult(opts.semantic_result);
    const request = "knowledge_request" in semantic ? semantic.knowledge_request : undefined;
    if (request) {
      requestDigestValue = requestDigest(request);
      blocking = request.blocking;
    }
  } catch {
    // Preserve a typed response if malformed transport data reaches this edge.
  }
  return createTaskKnowledgeRequestResponse({
    invocation: opts.invocation,
    work_order: opts.work_order,
    round: 0,
    request_digest: requestDigestValue,
    outcome: blocking ? "escalated" : "unresolved",
    omissions: [
      {
        code: "reservation_unavailable",
        detail: "Another CLI knowledge response is still reserving this work-order context.",
      },
    ],
    blocker: blocking
      ? {
          summary: "The bounded knowledge response could not reserve its context round in time.",
          recommended_action: "Return control to the parent workflow for a bounded retry.",
        }
      : null,
  });
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
