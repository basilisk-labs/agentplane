import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { gitEnv, gitShowFile, toGitPath } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { resolveQualityReviewTargetSha } from "./quality-review-target.js";
import {
  resolveVerificationInputIdentity,
  verificationInputDigest,
  verificationInputInvalidationReason,
  type VerificationEvidenceReference,
  type VerificationInputIdentity,
} from "./task-verification-input.js";
import { parseVerificationCheckDetails } from "./verification-details.js";

export type VerificationRecordTargetContext = {
  gitRoot: string;
  workflowDir: string;
  taskIds?: readonly string[];
  workflowMode?: "direct" | "branch_pr";
  baseRef?: string | null;
  evidenceRef?: string | null;
};

type VerificationRecordAssessmentReason =
  | "verification_current"
  | "verification_reused_equivalent_input"
  | "verification_missing"
  | "verification_invalid_record"
  | "verification_metadata_changed"
  | "verification_implementation_changed"
  | "verification_steps_changed"
  | "verification_context_changed"
  | "verification_environment_changed"
  | "verification_evidence_changed"
  | "verification_input_changed"
  | "verification_legacy_unverifiable";

export type VerificationRecordAssessment = {
  accepted: boolean;
  reason: VerificationRecordAssessmentReason;
  recordPath: string | null;
  recordedInputDigest: string | null;
  currentInputDigest: string | null;
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

function hasValidRecordDigest(record: Record<string, unknown>): boolean {
  const { digest, ...payload } = record;
  return (
    typeof digest === "string" &&
    /^sha256:[a-f0-9]{64}$/u.test(digest) &&
    digest === sha256(JSON.stringify(canonicalizeJson(payload)))
  );
}

function isSha256(value: unknown): value is `sha256:${string}` {
  return typeof value === "string" && /^sha256:[a-f0-9]{64}$/u.test(value);
}

function parseEvidenceReferences(value: unknown): VerificationEvidenceReference[] | null {
  if (!Array.isArray(value)) return null;
  const references = value.filter((item): item is VerificationEvidenceReference => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const reference = item as unknown as Record<string, unknown>;
    return (
      typeof reference.reference === "string" &&
      typeof reference.path === "string" &&
      (reference.fragment === null || typeof reference.fragment === "string") &&
      ["filesystem", "git", "missing", "unsafe"].includes(String(reference.source)) &&
      isSha256(reference.digest)
    );
  });
  return references.length === value.length ? references : null;
}

function parseVerificationInput(value: unknown): VerificationInputIdentity | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const implementation = input.implementation;
  const context = input.context;
  const environment = input.environment;
  const evidence = input.evidence;
  if (
    input.schema_version !== 2 ||
    input.kind !== "task_verification_input" ||
    !implementation ||
    typeof implementation !== "object" ||
    Array.isArray(implementation) ||
    !context ||
    typeof context !== "object" ||
    Array.isArray(context) ||
    !environment ||
    typeof environment !== "object" ||
    Array.isArray(environment) ||
    !evidence ||
    typeof evidence !== "object" ||
    Array.isArray(evidence)
  ) {
    return null;
  }
  const implementationRecord = implementation as Record<string, unknown>;
  const contextRecord = context as Record<string, unknown>;
  const environmentRecord = environment as Record<string, unknown>;
  const evidenceRecord = evidence as Record<string, unknown>;
  const evidenceReferences = parseEvidenceReferences(evidenceRecord.references);
  const runtime = environmentRecord.runtime;
  if (
    (implementationRecord.strategy !== "branch_diff" && implementationRecord.strategy !== "tree") ||
    !isSha256(implementationRecord.digest) ||
    typeof implementationRecord.target_sha !== "string" ||
    !/^[0-9a-f]{40,64}$/u.test(implementationRecord.target_sha) ||
    (implementationRecord.base_sha !== null &&
      (typeof implementationRecord.base_sha !== "string" ||
        !/^[0-9a-f]{40,64}$/u.test(implementationRecord.base_sha))) ||
    !isSha256(input.verify_steps_digest) ||
    !isSha256(contextRecord.digest) ||
    !Array.isArray(contextRecord.paths) ||
    !contextRecord.paths.every((item) => typeof item === "string") ||
    !isSha256(environmentRecord.digest) ||
    !isSha256(evidenceRecord.digest) ||
    !isSha256(evidenceRecord.details_digest) ||
    !evidenceReferences ||
    evidenceRecord.digest !==
      sha256(
        JSON.stringify(
          canonicalizeJson({
            details_digest: evidenceRecord.details_digest,
            references: evidenceReferences.map(
              ({ reference, path: evidencePath, fragment, digest }) => ({
                reference,
                path: evidencePath,
                fragment,
                digest,
              }),
            ),
          }),
        ),
      ) ||
    !runtime ||
    typeof runtime !== "object" ||
    Array.isArray(runtime) ||
    !isSha256(input.digest) ||
    input.digest !==
      verificationInputDigest({
        implementationDigest: String(implementationRecord.digest),
        verifyStepsDigest: String(input.verify_steps_digest),
        contextDigest: String(contextRecord.digest),
        environmentDigest: String(environmentRecord.digest),
        evidenceDigest: String(evidenceRecord.digest),
      })
  ) {
    return null;
  }
  const runtimeRecord = runtime as Record<string, unknown>;
  if (
    typeof runtimeRecord.platform !== "string" ||
    typeof runtimeRecord.architecture !== "string" ||
    typeof runtimeRecord.node_major !== "string" ||
    (runtimeRecord.bun_major !== null && typeof runtimeRecord.bun_major !== "string")
  ) {
    return null;
  }
  return input as unknown as VerificationInputIdentity;
}

function rejectedAssessment(
  reason: VerificationRecordAssessmentReason,
  opts: {
    recordPath?: string | null;
    recordedInputDigest?: string | null;
    currentInputDigest?: string | null;
  } = {},
): VerificationRecordAssessment {
  return {
    accepted: false,
    reason,
    recordPath: opts.recordPath ?? null,
    recordedInputDigest: opts.recordedInputDigest ?? null,
    currentInputDigest: opts.currentInputDigest ?? null,
  };
}

function recordMetadataMatches(
  record: Record<string, unknown>,
  task: TaskData,
  requireConcreteCheckDetails: boolean,
): boolean {
  const verification = task.verification;
  return Boolean(
    verification &&
    record.kind === "task_verification_record" &&
    record.task_id === task.id &&
    record.recorded_at === verification.updated_at &&
    record.result === verification.state &&
    record.verifier === verification.updated_by &&
    record.note === verification.note &&
    hasValidRecordDigest(record) &&
    (!requireConcreteCheckDetails || hasConcreteCheckDetails(record.details)),
  );
}

async function assessCurrentVerification(
  raw: unknown,
  task: TaskData,
  evaluatedSha: string | null,
  targetContext?: VerificationRecordTargetContext,
  requireConcreteCheckDetails = true,
): Promise<VerificationRecordAssessment> {
  const verification = task.verification;
  const scopeDigest = verifyStepsDigest(task);
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || !verification) {
    return rejectedAssessment("verification_invalid_record");
  }
  const record = raw as Record<string, unknown>;
  if (!recordMetadataMatches(record, task, requireConcreteCheckDetails)) {
    return rejectedAssessment("verification_metadata_changed");
  }

  if (record.schema_version === 2) {
    const recordedInput = parseVerificationInput(record.input);
    if (!recordedInput || !targetContext || !evaluatedSha) {
      return rejectedAssessment("verification_invalid_record");
    }
    const currentInput = await resolveVerificationInputIdentity({
      gitRoot: targetContext.gitRoot,
      workflowDir: targetContext.workflowDir,
      taskIds: targetContext.taskIds ?? [task.id],
      targetSha: evaluatedSha,
      verifySteps: task.sections?.["Verify Steps"] ?? "",
      workflowMode: targetContext.workflowMode ?? "direct",
      baseRef: targetContext.baseRef,
      verificationDetails: typeof record.details === "string" ? record.details : null,
      evidenceRef: targetContext.evidenceRef,
    }).catch(() => null);
    if (!currentInput) {
      return rejectedAssessment("verification_invalid_record", {
        recordedInputDigest: recordedInput.digest,
      });
    }
    if (recordedInput.digest === currentInput.digest) {
      return {
        accepted: true,
        reason:
          recordedInput.implementation.target_sha === currentInput.implementation.target_sha
            ? "verification_current"
            : "verification_reused_equivalent_input",
        recordPath: null,
        recordedInputDigest: recordedInput.digest,
        currentInputDigest: currentInput.digest,
      };
    }
    return rejectedAssessment(
      verificationInputInvalidationReason({ recorded: recordedInput, current: currentInput }),
      {
        recordedInputDigest: recordedInput.digest,
        currentInputDigest: currentInput.digest,
      },
    );
  }

  if (record.schema_version !== 1) {
    return rejectedAssessment("verification_invalid_record");
  }
  if (record.scope_digest !== scopeDigest) {
    return rejectedAssessment("verification_metadata_changed");
  }
  if (evaluatedSha === null) {
    return record.implementation_sha === null
      ? {
          accepted: true,
          reason: "verification_current",
          recordPath: null,
          recordedInputDigest: null,
          currentInputDigest: null,
        }
      : rejectedAssessment("verification_legacy_unverifiable");
  }
  const implementationSha =
    typeof record.implementation_sha === "string" ? record.implementation_sha : null;
  const accepted =
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
  return accepted
    ? {
        accepted: true,
        reason: "verification_current",
        recordPath: null,
        recordedInputDigest: null,
        currentInputDigest: null,
      }
    : rejectedAssessment("verification_legacy_unverifiable");
}

async function assessVerificationRecord(
  filePath: string,
  task: TaskData,
  evaluatedSha: string | null,
  targetContext?: VerificationRecordTargetContext,
  requireConcreteCheckDetails = true,
): Promise<VerificationRecordAssessment> {
  try {
    const assessment = await assessCurrentVerification(
      JSON.parse(await readFile(filePath, "utf8")),
      task,
      evaluatedSha,
      targetContext,
      requireConcreteCheckDetails,
    );
    return { ...assessment, recordPath: filePath };
  } catch {
    return rejectedAssessment("verification_invalid_record", { recordPath: filePath });
  }
}

export async function verificationRecordPaths(
  taskRoot: string,
  task: TaskData,
  evaluatedSha: string | null,
  targetContext?: VerificationRecordTargetContext,
  requireConcreteCheckDetails = true,
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
        assessment: await assessVerificationRecord(
          filePath,
          task,
          evaluatedSha,
          targetContext,
          requireConcreteCheckDetails,
        ),
      })),
    );
    return accepted.filter((entry) => entry.assessment.accepted).map((entry) => entry.filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return [];
    throw error;
  }
}

async function verificationRecordsFromGitSnapshot(opts: {
  gitRoot: string;
  taskRoot: string;
  ref: string;
}): Promise<unknown[]> {
  if (!/^[0-9a-f]{40,64}$/u.test(opts.ref)) return [];
  const taskRootRelative = toGitPath(path.relative(opts.gitRoot, opts.taskRoot));
  if (
    !taskRootRelative ||
    taskRootRelative === ".." ||
    taskRootRelative.startsWith("../") ||
    path.isAbsolute(taskRootRelative)
  ) {
    return [];
  }
  const verificationPrefix = `${taskRootRelative}/verification/`;
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["ls-tree", "-r", "--name-only", "-z", opts.ref, "--", verificationPrefix],
      { cwd: opts.gitRoot, env: gitEnv(), encoding: "buffer" },
    );
    const names = (Buffer.isBuffer(stdout) ? stdout.toString("utf8") : String(stdout))
      .split("\0")
      .filter(
        (name) =>
          name.startsWith(verificationPrefix) &&
          name.endsWith(".json") &&
          !name.slice(verificationPrefix.length).includes("/"),
      )
      .toSorted();
    return await Promise.all(
      names.map(
        async (name): Promise<unknown> =>
          JSON.parse(await gitShowFile(opts.gitRoot, opts.ref, name)) as unknown,
      ),
    );
  } catch {
    return [];
  }
}

export async function hasAcceptedVerificationRecord(opts: {
  taskRoot: string;
  task: TaskData;
  evaluatedSha: string | null;
  targetContext?: VerificationRecordTargetContext;
  snapshotRef?: string | null;
  requireConcreteCheckDetails?: boolean;
  onAssessment?: (assessment: VerificationRecordAssessment) => void;
}): Promise<boolean> {
  const localAssessment = await assessLocalVerificationRecords({
    taskRoot: opts.taskRoot,
    task: opts.task,
    evaluatedSha: opts.evaluatedSha,
    targetContext: opts.targetContext,
    requireConcreteCheckDetails: opts.requireConcreteCheckDetails,
  });
  opts.onAssessment?.(localAssessment);
  if (localAssessment.accepted) return true;
  if (!opts.snapshotRef || !opts.targetContext) return false;
  const snapshotRecords = await verificationRecordsFromGitSnapshot({
    gitRoot: opts.targetContext.gitRoot,
    taskRoot: opts.taskRoot,
    ref: opts.snapshotRef,
  });
  const accepted = await Promise.all(
    snapshotRecords.map((record) =>
      assessCurrentVerification(
        record,
        opts.task,
        opts.evaluatedSha,
        { ...opts.targetContext!, evidenceRef: opts.snapshotRef },
        opts.requireConcreteCheckDetails,
      ),
    ),
  );
  const snapshotAssessment = accepted.find((assessment) => assessment.accepted);
  if (snapshotAssessment) {
    opts.onAssessment?.(snapshotAssessment);
    return true;
  }
  return false;
}

export async function assessLocalVerificationRecords(opts: {
  taskRoot: string;
  task: TaskData;
  evaluatedSha: string | null;
  targetContext?: VerificationRecordTargetContext;
  requireConcreteCheckDetails?: boolean;
}): Promise<VerificationRecordAssessment> {
  let entries;
  try {
    const directoryEntries = await readdir(path.join(opts.taskRoot, "verification"), {
      withFileTypes: true,
    });
    entries = directoryEntries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => path.join(opts.taskRoot, "verification", entry.name))
      .toSorted()
      .toReversed();
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
      return rejectedAssessment("verification_missing");
    }
    throw error;
  }
  if (entries.length === 0) return rejectedAssessment("verification_missing");
  const assessments = await Promise.all(
    entries.map((filePath) =>
      assessVerificationRecord(
        filePath,
        opts.task,
        opts.evaluatedSha,
        opts.targetContext,
        opts.requireConcreteCheckDetails,
      ),
    ),
  );
  return (
    assessments.find((assessment) => assessment.accepted) ??
    assessments.find((assessment) => assessment.reason !== "verification_metadata_changed") ??
    assessments[0] ??
    rejectedAssessment("verification_missing")
  );
}
