import { createHash } from "node:crypto";
import { readdir, readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { resolveQualityReviewTargetSha } from "../shared/quality-review-target.js";
import { parseVerificationCheckDetails } from "../shared/verification-details.js";

const RUNTIME_EVIDENCE_PREFIX = ".agentplane/cache/";
const MAX_RUNTIME_EVIDENCE_FILES = 16;

type VerificationRecordTargetContext = {
  gitRoot: string;
  workflowDir: string;
  taskIds?: readonly string[];
  workflowMode?: "direct" | "branch_pr";
};

function sha256(value: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function verifyStepsDigest(task: TaskData): `sha256:${string}` | null {
  const verifySteps = task.sections?.["Verify Steps"];
  return typeof verifySteps === "string" && verifySteps.trim() ? sha256(verifySteps.trim()) : null;
}

function hasConcreteCheckDetails(details: unknown): boolean {
  return parseVerificationCheckDetails(details) !== null;
}

function detailsEvidencePaths(details: unknown): string[] {
  if (typeof details !== "string" || !details.trim()) return [];
  return details
    .trim()
    .split(/\n\s*\n/gu)
    .flatMap((check) =>
      check
        .split("\n")
        .flatMap((line) => {
          const [field, ...value] = line.split(":");
          return field?.trim() === "Evidence" ? value.join(":").split("|") : [];
        })
        .map((value) => value.trim()),
    );
}

function isWithinRoot(root: string, target: string): boolean {
  const value = path.relative(root, target);
  return (
    value !== "" && !value.startsWith(`..${path.sep}`) && value !== ".." && !path.isAbsolute(value)
  );
}

async function verifiedRuntimeEvidencePath(opts: {
  gitRoot: string;
  realGitRoot: string;
  reference: string;
}): Promise<string | null> {
  const reference = opts.reference.replaceAll("\\", "/");
  if (!reference.startsWith(RUNTIME_EVIDENCE_PREFIX) || reference.includes("\0")) return null;
  const candidate = path.resolve(opts.gitRoot, reference);
  if (!isWithinRoot(opts.gitRoot, candidate)) return null;
  try {
    const resolved = await realpath(candidate);
    const metadata = await stat(resolved);
    if (!isWithinRoot(opts.realGitRoot, resolved) || !metadata.isFile()) return null;
    return candidate;
  } catch {
    return null;
  }
}

function hasValidRecordDigest(record: Record<string, unknown>): boolean {
  const { digest, ...payload } = record;
  return (
    typeof digest === "string" &&
    /^sha256:[a-f0-9]{64}$/u.test(digest) &&
    digest === sha256(JSON.stringify(canonicalizeJson(payload)))
  );
}

async function matchesCurrentVerification(
  raw: unknown,
  task: TaskData,
  evaluatedSha: string | null,
  targetContext?: VerificationRecordTargetContext,
): Promise<boolean> {
  const verification = task.verification;
  const scopeDigest = verifyStepsDigest(task);
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || !verification || !evaluatedSha) {
    return false;
  }
  const record = raw as Record<string, unknown>;
  const implementationSha =
    typeof record.implementation_sha === "string" ? record.implementation_sha : null;
  const matchesEvaluatedTarget =
    implementationSha === evaluatedSha ||
    (implementationSha !== null &&
      targetContext !== undefined &&
      (await resolveQualityReviewTargetSha({
        gitRoot: targetContext.gitRoot,
        workflowDir: targetContext.workflowDir,
        taskId: task.id,
        taskIds: targetContext.taskIds,
        headSha: implementationSha,
        previousEvaluatedSha: evaluatedSha,
        workflowMode: targetContext.workflowMode,
      })) === evaluatedSha);
  return (
    record.schema_version === 1 &&
    record.kind === "task_verification_record" &&
    record.task_id === task.id &&
    record.recorded_at === verification.updated_at &&
    record.result === verification.state &&
    record.verifier === verification.updated_by &&
    record.note === verification.note &&
    matchesEvaluatedTarget &&
    record.scope_digest === scopeDigest &&
    hasValidRecordDigest(record) &&
    hasConcreteCheckDetails(record.details)
  );
}

async function isAcceptedVerificationRecord(
  filePath: string,
  task: TaskData,
  evaluatedSha: string | null,
  targetContext?: VerificationRecordTargetContext,
): Promise<boolean> {
  try {
    return await matchesCurrentVerification(
      JSON.parse(await readFile(filePath, "utf8")),
      task,
      evaluatedSha,
      targetContext,
    );
  } catch {
    return false;
  }
}

export async function verificationRecordPaths(
  taskRoot: string,
  task: TaskData,
  evaluatedSha: string | null,
  targetContext?: VerificationRecordTargetContext,
): Promise<string[]> {
  try {
    const entries = await readdir(path.join(taskRoot, "verification"), { withFileTypes: true });
    const candidates = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => path.join(taskRoot, "verification", entry.name))
      .toSorted();
    const accepted = await Promise.all(
      candidates.map(async (filePath) => ({
        filePath,
        accepted: await isAcceptedVerificationRecord(filePath, task, evaluatedSha, targetContext),
      })),
    );
    return accepted.filter((entry) => entry.accepted).map((entry) => entry.filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return [];
    throw error;
  }
}

/**
 * Resolves only regular local runtime artifacts explicitly cited by a current,
 * accepted verification record. The path boundary prevents verification prose
 * from turning into an arbitrary file-read capability for EVALUATOR setup.
 */
export async function verificationRuntimeEvidencePaths(opts: {
  gitRoot: string;
  verificationRecordPaths: readonly string[];
}): Promise<string[]> {
  const realGitRoot = await realpath(opts.gitRoot);
  const paths = new Set<string>();
  for (const recordPath of opts.verificationRecordPaths) {
    let raw: unknown;
    try {
      raw = JSON.parse(await readFile(recordPath, "utf8"));
    } catch {
      continue;
    }
    const details =
      raw && typeof raw === "object" && !Array.isArray(raw)
        ? (raw as Record<string, unknown>).details
        : null;
    for (const reference of detailsEvidencePaths(details)) {
      const resolved = await verifiedRuntimeEvidencePath({
        gitRoot: opts.gitRoot,
        realGitRoot,
        reference,
      });
      if (resolved) paths.add(resolved);
      if (paths.size >= MAX_RUNTIME_EVIDENCE_FILES) return [...paths].toSorted();
    }
  }
  return [...paths].toSorted();
}
