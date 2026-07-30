import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import {
  validateTaskKnowledgeRequestResponse,
  type TaskKnowledgeRequestAudit,
} from "./task-knowledge-request.js";

export const TASK_KNOWLEDGE_REQUEST_AUDIT_DIRECTORY = "knowledge-requests" as const;

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
