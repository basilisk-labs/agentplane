import { validateAgentSemanticResult } from "@agentplaneorg/core/schemas";

import { isRecord } from "../shared/guards.js";

import type { RunnerResult, RunnerResultStatus } from "./types.js";

const RESULT_STATUSES = new Set<RunnerResultStatus>(["success", "failed", "blocked", "cancelled"]);
const CHECK_STATUSES = new Set(["passed", "failed", "not_run"]);
const RECEIPT_STATES = new Set([
  "observed_success",
  "rejected",
  "unverified",
  "compatibility_unverified",
]);
const SHA256_PATTERN = /^sha256:[0-9a-f]{64}$/u;
const ARTIFACT_KEYS = new Set(["path", "label"]);
const METRICS_KEYS = new Set([
  "duration_ms",
  "stdout_bytes",
  "stderr_bytes",
  "output_last_message_bytes",
  "input_tokens",
  "output_tokens",
  "total_tokens",
]);
const OBSERVED_CHECK_KEYS = new Set(["id", "status"]);
const EVIDENCE_KEYS = new Set([
  "provenance",
  "evidence_paths",
  "changed_paths",
  "conflict_paths",
  "files_changed_count",
  "tests_run",
  "observed_checks",
  "receipt_path",
  "receipt_sha256",
  "verification_candidates",
  "blocked_reason",
  "recommended_parent_action",
]);
const SEMANTIC_WRAPPER_KEYS = new Set(["provenance", "value"]);
const LEGACY_SEMANTIC_KEYS = new Set([
  "schema_version",
  "kind",
  "work_order_id",
  "status",
  "summary",
  "findings",
  "blocker",
]);
const BLOCKER_KEYS = new Set(["summary", "recommended_action"]);
const CLAIM_KEYS = new Set(["field", "value", "provenance"]);
const CONFLICT_KEYS = new Set(["field", "agent_reported", "observed", "resolution"]);
const LEGACY_WARNING_KEYS = new Set(["code", "message"]);
const CLAIM_WARNING_KEYS = new Set(["code", "field", "message"]);
const RECEIPT_KEYS = new Set(["path", "sha256", "verification_state", "observed_by"]);

function hasOnlyKeys(value: Record<string, unknown>, allowed: ReadonlySet<string>): boolean {
  return Object.keys(value).every((key) => allowed.has(key));
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isNonEmptyStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isNonEmptyString);
}

function isOptional<T>(
  value: unknown,
  predicate: (candidate: unknown) => candidate is T,
): value is T | undefined {
  return value === undefined || predicate(value);
}

function isRunnerResultArtifacts(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        isRecord(entry) &&
        hasOnlyKeys(entry, ARTIFACT_KEYS) &&
        isNonEmptyString(entry.path) &&
        (entry.label === undefined || isNonEmptyString(entry.label)),
    )
  );
}

function isRunnerResultMetrics(value: unknown): boolean {
  if (!isRecord(value) || !hasOnlyKeys(value, METRICS_KEYS)) return false;
  return (
    (value.duration_ms === undefined || isNonNegativeInteger(value.duration_ms)) &&
    (value.stdout_bytes === undefined || isNonNegativeInteger(value.stdout_bytes)) &&
    (value.stderr_bytes === undefined || isNonNegativeInteger(value.stderr_bytes)) &&
    (value.output_last_message_bytes === undefined ||
      value.output_last_message_bytes === null ||
      isNonNegativeInteger(value.output_last_message_bytes)) &&
    (value.input_tokens === undefined || isNonNegativeInteger(value.input_tokens)) &&
    (value.output_tokens === undefined || isNonNegativeInteger(value.output_tokens)) &&
    (value.total_tokens === undefined || isNonNegativeInteger(value.total_tokens))
  );
}

function isObservedChecks(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        isRecord(entry) &&
        hasOnlyKeys(entry, OBSERVED_CHECK_KEYS) &&
        isNonEmptyString(entry.id) &&
        CHECK_STATUSES.has(entry.status as string),
    )
  );
}

function isRunnerResultEvidence(value: unknown): boolean {
  if (!isRecord(value) || !hasOnlyKeys(value, EVIDENCE_KEYS)) return false;
  return (
    (value.provenance === undefined || value.provenance === "supervisor_observed") &&
    isOptional(value.evidence_paths, isNonEmptyStringArray) &&
    isOptional(value.changed_paths, isNonEmptyStringArray) &&
    isOptional(value.conflict_paths, isNonEmptyStringArray) &&
    (value.files_changed_count === undefined || isNonNegativeInteger(value.files_changed_count)) &&
    isOptional(value.tests_run, isNonEmptyStringArray) &&
    (value.observed_checks === undefined || isObservedChecks(value.observed_checks)) &&
    (value.receipt_path === undefined || isNonEmptyString(value.receipt_path)) &&
    (value.receipt_sha256 === undefined ||
      (isString(value.receipt_sha256) && SHA256_PATTERN.test(value.receipt_sha256))) &&
    isOptional(value.verification_candidates, isNonEmptyStringArray) &&
    isOptional(value.blocked_reason, isNonEmptyString) &&
    isOptional(value.recommended_parent_action, isNonEmptyString)
  );
}

function isLegacySemanticResult(value: unknown): boolean {
  if (!isRecord(value) || !hasOnlyKeys(value, LEGACY_SEMANTIC_KEYS)) return false;
  const blocker = value.blocker;
  return (
    value.schema_version === 2 &&
    value.kind === "legacy_agent_semantic_result" &&
    isNonEmptyString(value.work_order_id) &&
    (value.status === undefined ||
      value.status === "completed" ||
      value.status === "blocked" ||
      value.status === "failed") &&
    isOptional(value.summary, isString) &&
    isOptional(value.findings, isStringArray) &&
    (blocker === undefined ||
      (isRecord(blocker) &&
        hasOnlyKeys(blocker, BLOCKER_KEYS) &&
        isNonEmptyString(blocker.summary) &&
        isOptional(blocker.recommended_action, isNonEmptyString)))
  );
}

function isAgentReportedSemanticResult(value: unknown): boolean {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, SEMANTIC_WRAPPER_KEYS) ||
    value.provenance !== "agent_reported"
  ) {
    return false;
  }
  try {
    validateAgentSemanticResult(value.value);
    return true;
  } catch {
    return isLegacySemanticResult(value.value);
  }
}

function isAgentReportedClaims(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        isRecord(entry) &&
        hasOnlyKeys(entry, CLAIM_KEYS) &&
        isNonEmptyString(entry.field) &&
        Object.hasOwn(entry, "value") &&
        entry.provenance === "agent_reported",
    )
  );
}

function isClaimConflicts(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        isRecord(entry) &&
        hasOnlyKeys(entry, CONFLICT_KEYS) &&
        isNonEmptyString(entry.field) &&
        Object.hasOwn(entry, "agent_reported") &&
        Object.hasOwn(entry, "observed") &&
        entry.resolution === "observed_wins",
    )
  );
}

function isManifestWarnings(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.every((entry) => {
      if (!isRecord(entry) || !isNonEmptyString(entry.message)) return false;
      if (entry.code === "legacy_manifest_v1") {
        return hasOnlyKeys(entry, LEGACY_WARNING_KEYS);
      }
      return (
        entry.code === "legacy_agent_observed_claim" &&
        hasOnlyKeys(entry, CLAIM_WARNING_KEYS) &&
        isNonEmptyString(entry.field)
      );
    })
  );
}

function isExecutionReceiptReference(value: unknown): boolean {
  return (
    isRecord(value) &&
    hasOnlyKeys(value, RECEIPT_KEYS) &&
    isNonEmptyString(value.path) &&
    isString(value.sha256) &&
    SHA256_PATTERN.test(value.sha256) &&
    RECEIPT_STATES.has(value.verification_state as string) &&
    value.observed_by === "agentplane"
  );
}

export function isRunnerResult(value: unknown): value is RunnerResult {
  if (!isRecord(value)) return false;
  if (
    !RESULT_STATUSES.has(value.status as RunnerResultStatus) ||
    !(value.exit_code === null || isNonNegativeInteger(value.exit_code)) ||
    !isTimestamp(value.started_at) ||
    !isTimestamp(value.ended_at) ||
    Date.parse(value.started_at) > Date.parse(value.ended_at)
  ) {
    return false;
  }
  const fieldsValid =
    isOptional(value.summary, isString) &&
    isOptional(value.stdout_summary, isString) &&
    isOptional(value.stderr_summary, isString) &&
    (value.timeout_reason === undefined ||
      value.timeout_reason === null ||
      value.timeout_reason === "idle" ||
      value.timeout_reason === "wall_clock") &&
    isOptional(value.output_paths, isNonEmptyStringArray) &&
    (value.artifacts === undefined || isRunnerResultArtifacts(value.artifacts)) &&
    isOptional(value.findings, isStringArray) &&
    isOptional(value.verification_hints, isStringArray) &&
    isOptional(value.capabilities_used, isNonEmptyStringArray) &&
    (value.metrics === undefined || isRunnerResultMetrics(value.metrics)) &&
    (value.evidence === undefined || isRunnerResultEvidence(value.evidence)) &&
    (value.semantic_result === undefined || isAgentReportedSemanticResult(value.semantic_result)) &&
    (value.agent_reported_claims === undefined ||
      isAgentReportedClaims(value.agent_reported_claims)) &&
    (value.claim_conflicts === undefined || isClaimConflicts(value.claim_conflicts)) &&
    (value.manifest_warnings === undefined || isManifestWarnings(value.manifest_warnings)) &&
    (value.execution_receipt === undefined || isExecutionReceiptReference(value.execution_receipt));
  if (!fieldsValid) return false;

  const evidence = isRecord(value.evidence) ? value.evidence : null;
  const receipt = isRecord(value.execution_receipt) ? value.execution_receipt : null;
  if (
    receipt?.verification_state === "rejected" &&
    value.status !== "failed" &&
    value.status !== "cancelled"
  ) {
    return false;
  }
  if (evidence && receipt) {
    if (evidence.receipt_path !== undefined && evidence.receipt_path !== receipt.path) {
      return false;
    }
    if (evidence.receipt_sha256 !== undefined && evidence.receipt_sha256 !== receipt.sha256) {
      return false;
    }
  }
  return true;
}
