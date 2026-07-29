import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { isRecord } from "../../shared/guards.js";

export type EvaluatorEvidenceKind =
  | "task_document"
  | "actual_diff"
  | "observed_checks"
  | "verification_log"
  | "blueprint"
  | "policy_module"
  | "knowledge_ref"
  | "runtime_evidence"
  | "qualification_packet";

export type FrozenEvaluatorEvidence = {
  id: string;
  kind: EvaluatorEvidenceKind;
  path: string;
  sha256: `sha256:${string}`;
  required: boolean;
};

function sha256(value: string | Buffer): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function relative(gitRoot: string, target: string): string {
  return path.relative(gitRoot, target).replaceAll("\\", "/");
}

export function evaluatorQualityDir(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  evaluatorId: string;
  timestamp: string;
  safePathSegment: (value: string) => string;
  timestampPathSegment: (value: string) => string;
}): string {
  return path.join(
    opts.gitRoot,
    opts.workflowDir,
    opts.taskId,
    "quality",
    `${opts.timestampPathSegment(opts.timestamp)}-${opts.safePathSegment(opts.evaluatorId) || "evaluator"}`,
  );
}

export async function freezeEvaluatorFile(opts: {
  gitRoot: string;
  id: string;
  kind: EvaluatorEvidenceKind;
  filePath: string;
  required: boolean;
}): Promise<FrozenEvaluatorEvidence> {
  return {
    id: opts.id,
    kind: opts.kind,
    path: relative(opts.gitRoot, opts.filePath),
    sha256: sha256(await readFile(opts.filePath)),
    required: opts.required,
  };
}

export async function readEvaluatorFileDigest(filePath: string): Promise<`sha256:${string}`> {
  return sha256(await readFile(filePath));
}

export async function writeEvaluatorArtifact(opts: {
  filePath: string;
  contents: string;
}): Promise<void> {
  await mkdir(path.dirname(opts.filePath), { recursive: true });
  await writeFile(opts.filePath, opts.contents, "utf8");
}

async function readJsonRecord(filePath: string): Promise<Record<string, unknown> | null> {
  try {
    const value: unknown = JSON.parse(await readFile(filePath, "utf8"));
    return isRecord(value) ? value : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}

/** Includes a CLI-generated direct evidence artifact from the active task or accepted runtime proof. */
export async function readDirectSupervisionEvidence(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  verifiedRuntimeEvidencePaths?: readonly string[];
}): Promise<Record<string, unknown> | null> {
  const evidencePath = path.join(
    opts.gitRoot,
    opts.workflowDir,
    opts.taskId,
    "supervision",
    "implementation-evidence.json",
  );
  const candidates = [
    { path: evidencePath, activeTask: true },
    ...(opts.verifiedRuntimeEvidencePaths ?? [])
      .filter((filePath) => filePath.endsWith("/supervision/implementation-evidence.json"))
      .map((filePath) => ({ path: filePath, activeTask: false })),
  ];
  for (const candidate of candidates) {
    const record = await readJsonRecord(candidate.path);
    if (
      record?.kind !== "direct_task_implementation_evidence" ||
      typeof record.task_id !== "string" ||
      (candidate.activeTask && record.task_id !== opts.taskId)
    ) {
      continue;
    }
    return {
      ...record,
      source: candidate.activeTask ? "active_task" : "verified_runtime_evidence",
      source_path: relative(opts.gitRoot, candidate.path),
    };
  }
  return null;
}

/** Summarizes only accepted supervisor journals; raw journals remain frozen evidence. */
export async function readVerifiedSupervisorJournalHistory(opts: {
  gitRoot: string;
  verifiedRuntimeEvidencePaths: readonly string[];
}): Promise<Record<string, unknown>[]> {
  const journals = opts.verifiedRuntimeEvidencePaths.filter(
    (filePath) =>
      filePath.includes("/.git/agentplane/supervisor/episodes/") &&
      filePath.endsWith("/journal.json"),
  );
  const summaries: Record<string, unknown>[] = [];
  for (const journalPath of journals) {
    const record = await readJsonRecord(journalPath);
    if (!record || typeof record.task_id !== "string" || typeof record.status !== "string")
      continue;
    summaries.push({
      source: "verified_runtime_evidence",
      path: relative(opts.gitRoot, journalPath),
      task_id: record.task_id,
      status: record.status,
      cursor: record.cursor ?? null,
      usage: record.usage ?? null,
      digest: record.digest ?? null,
    });
  }
  return summaries;
}
