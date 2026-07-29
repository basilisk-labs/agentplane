import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type EvaluatorEvidenceKind =
  | "task_document"
  | "actual_diff"
  | "observed_checks"
  | "verification_log"
  | "blueprint"
  | "policy_module"
  | "knowledge_ref";

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

/** Includes only a CLI-generated direct evidence artifact for the active task. */
export async function readDirectSupervisionEvidence(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): Promise<Record<string, unknown> | null> {
  const evidencePath = path.join(
    opts.gitRoot,
    opts.workflowDir,
    opts.taskId,
    "supervision",
    "implementation-evidence.json",
  );
  try {
    const value: unknown = JSON.parse(await readFile(evidencePath, "utf8"));
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const record = value as Record<string, unknown>;
    return record.task_id === opts.taskId && record.kind === "direct_task_implementation_evidence"
      ? record
      : null;
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}
