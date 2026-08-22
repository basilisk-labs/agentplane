import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { gitEnv, gitShowFile, toGitPath } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import type { TaskData } from "../../backends/task-backend.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { resolveQualityReviewTargetSha } from "./quality-review-target.js";
import {
  resolveVerificationInputIdentity,
  resolveLegacyVerificationInputIdentity,
  verificationInputInvalidationReason,
} from "./task-verification-input.js";
import { parseVerificationCheckDetails } from "./verification-details.js";
import { hasValidRecordDigest, parseVerificationInput } from "./task-verification-record-parser.js";

export type VerificationRecordTargetContext = {
  gitRoot: string;
  workflowDir: string;
  taskIds?: readonly string[];
  workflowMode?: "direct" | "branch_pr";
  baseRef?: string | null;
  execution?: TaskExecutionContext;
  evidenceRef?: string | null;
};

type VerificationRecordAssessmentReason =
  | "verification_current"
  | "verification_reused_equivalent_input"
  | "verification_missing"
  | "verification_invalid_record"
  | "verification_metadata_changed"
  | "verification_details_missing"
  | "verification_contract_evidence_missing"
  | "verification_implementation_changed"
  | "verification_steps_changed"
  | "verification_contract_changed"
  | "verification_context_changed"
  | "verification_environment_changed"
  | "verification_evidence_changed"
  | "verification_input_changed"
  | "verification_legacy_unverifiable"
  | "verification_route_context_changed";

export type VerificationRecordAssessment = {
  accepted: boolean;
  reason: VerificationRecordAssessmentReason;
  recoveryHint: string | null;
  recordPath: string | null;
  recordedInputDigest: string | null;
  currentInputDigest: string | null;
};

function verificationRecoveryHint(reason: VerificationRecordAssessmentReason): string | null {
  switch (reason) {
    case "verification_route_context_changed": {
      return "Recompute the task route and record fresh v4 verification against that execution context.";
    }
    case "verification_implementation_changed": {
      return "Run the required checks against the current implementation and record fresh verification.";
    }
    case "verification_steps_changed": {
      return "Run the current Verify Steps and record their results.";
    }
    case "verification_contract_changed": {
      return "Run the checks selected by the current verification contract and record fresh verification.";
    }
    case "verification_context_changed": {
      return "Refresh the prepared task context, rerun the required checks, and record fresh verification.";
    }
    case "verification_environment_changed": {
      return "Rerun verification in the current environment and record its environment identity.";
    }
    case "verification_evidence_changed": {
      return "Regenerate the referenced evidence and record verification with its current digest.";
    }
    case "verification_contract_evidence_missing": {
      return "Record concrete results for every check required by the verification contract.";
    }
    case "verification_missing": {
      return "Run the task Verify Steps and record a passing verification result.";
    }
    case "verification_current":
    case "verification_reused_equivalent_input": {
      return null;
    }
    default: {
      return "Inspect the verification record diagnostics and record fresh v4 verification.";
    }
  }
}

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

function normalizedCheckIds(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const normalized = value.map((item) => (typeof item === "string" ? item.trim() : ""));
  if (normalized.some((item) => !item)) return null;
  return [...new Set(normalized)].toSorted();
}

export type VerificationContractEvidenceCoverage = {
  requiredChecks: string[];
  satisfiedChecks: string[];
  missingChecks: string[];
  unexpectedChecks: string[];
  accepted: boolean;
};

export function requiredVerificationContractChecks(task: TaskData): string[] {
  if (task.execution_contract?.source === "legacy_compatibility") return [];
  return (task.execution_contract?.verification.contract?.selected_checks ?? [])
    .filter((checkId) => checkId !== "hosted_integration")
    .toSorted();
}

export function verificationContractEvidenceCoverage(
  task: TaskData,
  details: unknown,
): VerificationContractEvidenceCoverage {
  const requiredChecks = requiredVerificationContractChecks(task);
  const normalized = normalizedCheckIds(
    parseVerificationCheckDetails(details)?.map(({ checkId }) => checkId) ?? null,
  );
  const satisfied = normalized ?? [];
  const required = new Set(requiredChecks);
  const supplied = new Set(satisfied);
  const missingChecks = requiredChecks.filter((check) => !supplied.has(check));
  const unexpectedChecks = satisfied.filter((check) => !required.has(check));
  return {
    requiredChecks,
    satisfiedChecks: satisfied,
    missingChecks,
    unexpectedChecks,
    accepted: normalized !== null && missingChecks.length === 0 && unexpectedChecks.length === 0,
  };
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
    recoveryHint: verificationRecoveryHint(reason),
    recordPath: opts.recordPath ?? null,
    recordedInputDigest: opts.recordedInputDigest ?? null,
    currentInputDigest: opts.currentInputDigest ?? null,
  };
}

function recordMetadataMatches(record: Record<string, unknown>, task: TaskData): boolean {
  const verification = task.verification;
  return Boolean(
    verification &&
    record.kind === "task_verification_record" &&
    record.task_id === task.id &&
    record.recorded_at === verification.updated_at &&
    record.result === verification.state &&
    record.verifier === verification.updated_by &&
    record.note === verification.note &&
    hasValidRecordDigest(record),
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
  if (!recordMetadataMatches(record, task)) {
    return rejectedAssessment("verification_metadata_changed");
  }
  if (
    record.result === "ok" &&
    record.schema_version === 1 &&
    !task.execution_contract?.verification.contract
  ) {
    return rejectedAssessment("verification_contract_changed");
  }
  if (requireConcreteCheckDetails && !hasConcreteCheckDetails(record.details)) {
    return rejectedAssessment("verification_details_missing");
  }
  if (record.result === "ok") {
    const coverage = verificationContractEvidenceCoverage(task, record.details);
    if (coverage.requiredChecks.length > 0 && !coverage.accepted) {
      return rejectedAssessment("verification_contract_evidence_missing");
    }
  }

  if (record.schema_version === 2) {
    const recordedInput = parseVerificationInput(record.input);
    if (!recordedInput || !targetContext || !evaluatedSha) {
      return rejectedAssessment("verification_invalid_record");
    }
    if (targetContext.execution && recordedInput.schema_version !== 4) {
      return rejectedAssessment("verification_route_context_changed", {
        recordedInputDigest: recordedInput.digest,
      });
    }
    const identityOptions = {
      gitRoot: targetContext.gitRoot,
      workflowDir: targetContext.workflowDir,
      taskIds: targetContext.taskIds ?? [task.id],
      targetSha: evaluatedSha,
      verifySteps: task.sections?.["Verify Steps"] ?? "",
      verificationContractDigest: task.execution_contract?.verification.contract?.digest ?? null,
      environment: recordedInput.environment.runtime,
      verificationDetails: typeof record.details === "string" ? record.details : null,
      evidenceRef: targetContext.evidenceRef,
    };
    const currentInput = await (
      targetContext.execution
        ? resolveVerificationInputIdentity({
            ...identityOptions,
            execution: targetContext.execution,
          })
        : resolveLegacyVerificationInputIdentity({
            ...identityOptions,
            workflowMode: targetContext.workflowMode ?? "direct",
            baseRef: targetContext.baseRef,
          })
    ).catch(() => null);
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
        recoveryHint: null,
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
  if (targetContext?.execution) {
    return rejectedAssessment("verification_route_context_changed");
  }
  if (record.scope_digest !== scopeDigest) {
    return rejectedAssessment("verification_metadata_changed");
  }
  if (evaluatedSha === null) {
    return record.implementation_sha === null
      ? {
          accepted: true,
          reason: "verification_current",
          recoveryHint: null,
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
        recoveryHint: null,
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
