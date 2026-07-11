import { readFile } from "node:fs/promises";

import { isRecord } from "../shared/guards.js";
import type {
  RunnerResultEvidence,
  RunnerExecutionMetrics,
  RunnerResultArtifact,
  RunnerResultManifest,
  RunnerResultStatus,
  RunnerTimeoutReason,
} from "./types.js";

export const RUNNER_RESULT_MANIFEST_SCHEMA_VERSION = 1 as const;
export {
  applyRunnerResultManifest,
  invalidRunnerResultManifestPath,
  manifestFromRunnerResult,
  preserveInvalidRunnerResultManifest,
  preserveRunnerResultManifestSource,
  salvageBlockedRunnerResultManifest,
  writeRunnerResultManifest,
} from "./result-manifest-artifacts.js";
import { sourceRunnerResultManifestPath as resolveSourceRunnerResultManifestPath } from "./result-manifest-artifacts.js";

export function sourceRunnerResultManifestPath(resultPath: string): string {
  return resolveSourceRunnerResultManifestPath(resultPath);
}

export class InvalidRunnerResultManifestError extends Error {
  readonly result_path: string;
  readonly reason: string;
  readonly raw_content: string;

  constructor(opts: { result_path: string; reason: string; raw_content: string }) {
    super(`Invalid runner result manifest at ${opts.result_path}: ${opts.reason}`);
    this.name = "InvalidRunnerResultManifestError";
    this.result_path = opts.result_path;
    this.reason = opts.reason;
    this.raw_content = opts.raw_content;
  }
}

function invalidManifest(resultPath: string, reason: string, rawContent: string): never {
  throw new InvalidRunnerResultManifestError({
    result_path: resultPath,
    reason,
    raw_content: rawContent,
  });
}

const MACHINE_IDENTIFIER_RE = /^[a-z0-9]+(?:[._:-][a-z0-9]+)*$/;
const MACHINE_IDENTIFIER_MAX_LENGTH = 64;

function normalizeStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const entries = value.map((entry) => {
    if (typeof entry !== "string") {
      throw new Error("entries must be strings");
    }
    const normalized = entry.trim();
    if (!normalized) {
      throw new Error("entries must be non-empty strings");
    }
    return normalized;
  });
  return entries.length > 0 ? entries : undefined;
}

function normalizeMachineIdentifier(value: unknown, field: string): string {
  if (typeof value !== "string") {
    throw new Error(`${field} must be a non-empty string`);
  }
  const normalized = value.trim();
  if (!normalized) {
    throw new Error(`${field} must be a non-empty string`);
  }
  if (normalized.length > MACHINE_IDENTIFIER_MAX_LENGTH) {
    throw new Error(`${field} must be at most ${String(MACHINE_IDENTIFIER_MAX_LENGTH)} characters`);
  }
  if (!MACHINE_IDENTIFIER_RE.test(normalized)) {
    throw new Error(
      `${field} must match ${String(MACHINE_IDENTIFIER_RE)} and contain only lower-case machine-safe identifier tokens`,
    );
  }
  return normalized;
}

function normalizeMachineIdentifierArray(value: unknown, field: string): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const entries = value.map((entry, index) =>
    normalizeMachineIdentifier(entry, `${field}[${String(index)}]`),
  );
  return entries.length > 0 ? entries : undefined;
}

function normalizeArtifacts(value: unknown): RunnerResultArtifact[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const artifacts = value.map((entry) => {
    if (!isRecord(entry)) {
      throw new Error("artifacts entries must be objects");
    }
    const pathValue = typeof entry.path === "string" ? entry.path.trim() : "";
    if (!pathValue) {
      throw new Error("artifacts[].path must be a non-empty string");
    }
    if (entry.label === undefined) return { path: pathValue };
    return {
      path: pathValue,
      label: normalizeMachineIdentifier(entry.label, "artifacts[].label"),
    };
  });
  return artifacts.length > 0 ? artifacts : undefined;
}

function normalizeMetrics(value: unknown): RunnerExecutionMetrics | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const candidate = value as Record<string, unknown>;
  const metrics: RunnerExecutionMetrics = {};
  if (candidate.duration_ms !== undefined) {
    const duration = candidate.duration_ms;
    if (typeof duration !== "number" || !Number.isInteger(duration) || duration < 0) {
      throw new Error("metrics.duration_ms must be a non-negative integer");
    }
    metrics.duration_ms = duration;
  }
  if (candidate.stdout_bytes !== undefined) {
    const stdoutBytes = candidate.stdout_bytes;
    if (typeof stdoutBytes !== "number" || !Number.isInteger(stdoutBytes) || stdoutBytes < 0) {
      throw new Error("metrics.stdout_bytes must be a non-negative integer");
    }
    metrics.stdout_bytes = stdoutBytes;
  }
  if (candidate.stderr_bytes !== undefined) {
    const stderrBytes = candidate.stderr_bytes;
    if (typeof stderrBytes !== "number" || !Number.isInteger(stderrBytes) || stderrBytes < 0) {
      throw new Error("metrics.stderr_bytes must be a non-negative integer");
    }
    metrics.stderr_bytes = stderrBytes;
  }
  if (candidate.output_last_message_bytes !== undefined) {
    const outputLastMessageBytes = candidate.output_last_message_bytes;
    if (
      outputLastMessageBytes !== null &&
      (typeof outputLastMessageBytes !== "number" ||
        !Number.isInteger(outputLastMessageBytes) ||
        outputLastMessageBytes < 0)
    ) {
      throw new Error("metrics.output_last_message_bytes must be null or a non-negative integer");
    }
    metrics.output_last_message_bytes = outputLastMessageBytes;
  }
  return Object.keys(metrics).length > 0 ? metrics : undefined;
}

function normalizeEvidence(value: unknown): RunnerResultEvidence | undefined {
  if (!isRecord(value)) return undefined;
  const evidence: RunnerResultEvidence = {};
  const evidencePaths = normalizeStringArray(value.evidence_paths);
  if (evidencePaths) evidence.evidence_paths = evidencePaths;
  const changedPaths = normalizeStringArray(value.changed_paths);
  if (changedPaths) evidence.changed_paths = changedPaths;
  const conflictPaths = normalizeStringArray(value.conflict_paths);
  if (conflictPaths) evidence.conflict_paths = conflictPaths;
  const testsRun = normalizeStringArray(value.tests_run);
  if (testsRun) evidence.tests_run = testsRun;
  const verificationCandidates = normalizeStringArray(value.verification_candidates);
  if (verificationCandidates) evidence.verification_candidates = verificationCandidates;
  if (value.blocked_reason !== undefined) {
    if (typeof value.blocked_reason !== "string" || !value.blocked_reason.trim()) {
      throw new Error("evidence.blocked_reason must be a non-empty string when present");
    }
    evidence.blocked_reason = value.blocked_reason.trim();
  }
  if (value.recommended_parent_action !== undefined) {
    if (
      typeof value.recommended_parent_action !== "string" ||
      !value.recommended_parent_action.trim()
    ) {
      throw new Error("evidence.recommended_parent_action must be a non-empty string when present");
    }
    evidence.recommended_parent_action = value.recommended_parent_action.trim();
  }
  if (value.files_changed_count !== undefined) {
    if (
      typeof value.files_changed_count !== "number" ||
      !Number.isInteger(value.files_changed_count) ||
      value.files_changed_count < 0
    ) {
      throw new Error("evidence.files_changed_count must be a non-negative integer");
    }
    evidence.files_changed_count = value.files_changed_count;
  }
  return Object.keys(evidence).length > 0 ? evidence : undefined;
}

function assertRunnerManifestQuality(manifest: RunnerResultManifest, resultPath: string): void {
  const rawContent = JSON.stringify(manifest, null, 2);
  if (manifest.status === "success") {
    const evidence = manifest.evidence;
    const hasEvidence =
      (evidence?.evidence_paths?.length ?? 0) > 0 ||
      (evidence?.tests_run?.length ?? 0) > 0 ||
      (evidence?.verification_candidates?.length ?? 0) > 0 ||
      (manifest.artifacts?.length ?? 0) > 0;
    if (!hasEvidence) {
      invalidManifest(
        resultPath,
        "successful manifests must include evidence paths, tests, verification candidates, or artifacts",
        rawContent,
      );
    }
  }
  if ((manifest.evidence?.conflict_paths?.length ?? 0) > 0) {
    if (!manifest.evidence?.blocked_reason) {
      invalidManifest(
        resultPath,
        "evidence.conflict_paths requires evidence.blocked_reason",
        rawContent,
      );
    }
    if (!manifest.evidence?.recommended_parent_action) {
      invalidManifest(
        resultPath,
        "evidence.conflict_paths requires evidence.recommended_parent_action",
        rawContent,
      );
    }
  }
}

function normalizeStatus(value: unknown): RunnerResultStatus | undefined {
  return value === "success" || value === "failed" || value === "blocked" || value === "cancelled"
    ? value
    : undefined;
}

function normalizeTimeoutReason(value: unknown): RunnerTimeoutReason | undefined {
  return value === "idle" || value === "wall_clock" ? value : undefined;
}

export async function readRunnerResultManifest(
  resultPath: string,
): Promise<RunnerResultManifest | null> {
  try {
    const rawText = await readFile(resultPath, "utf8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawText);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      invalidManifest(resultPath, `result.json must contain valid JSON (${message})`, rawText);
    }
    if (!isRecord(parsed)) {
      invalidManifest(resultPath, "result.json must contain a JSON object", rawText);
    }
    const raw = parsed;
    if (raw.schema_version !== RUNNER_RESULT_MANIFEST_SCHEMA_VERSION) {
      invalidManifest(
        resultPath,
        `schema_version must be ${RUNNER_RESULT_MANIFEST_SCHEMA_VERSION}`,
        rawText,
      );
    }
    const manifest: RunnerResultManifest = {
      schema_version: RUNNER_RESULT_MANIFEST_SCHEMA_VERSION,
    };
    if (raw.status !== undefined) {
      const status = normalizeStatus(raw.status);
      if (!status) {
        invalidManifest(
          resultPath,
          "status must be success, failed, blocked, or cancelled",
          rawText,
        );
      }
      manifest.status = status;
    }
    if (raw.exit_code !== undefined) {
      const exitCode = raw.exit_code;
      if (
        exitCode !== null &&
        (typeof exitCode !== "number" || !Number.isInteger(exitCode) || exitCode < 0)
      ) {
        invalidManifest(resultPath, "exit_code must be null or a non-negative integer", rawText);
      }
      manifest.exit_code = exitCode;
    }
    if (raw.summary !== undefined) {
      if (typeof raw.summary !== "string" || !raw.summary.trim()) {
        invalidManifest(resultPath, "summary must be a non-empty string when present", rawText);
      }
      manifest.summary = raw.summary.trim();
    }
    if (raw.stdout_summary !== undefined) {
      if (typeof raw.stdout_summary !== "string" || !raw.stdout_summary.trim()) {
        invalidManifest(
          resultPath,
          "stdout_summary must be a non-empty string when present",
          rawText,
        );
      }
      manifest.stdout_summary = raw.stdout_summary.trim();
    }
    if (raw.stderr_summary !== undefined) {
      if (typeof raw.stderr_summary !== "string" || !raw.stderr_summary.trim()) {
        invalidManifest(
          resultPath,
          "stderr_summary must be a non-empty string when present",
          rawText,
        );
      }
      manifest.stderr_summary = raw.stderr_summary.trim();
    }
    if (raw.timeout_reason !== undefined) {
      const timeoutReason = normalizeTimeoutReason(raw.timeout_reason);
      if (!timeoutReason) {
        invalidManifest(
          resultPath,
          "timeout_reason must be idle or wall_clock when present",
          rawText,
        );
      }
      manifest.timeout_reason = timeoutReason;
    }
    try {
      manifest.artifacts = normalizeArtifacts(raw.artifacts);
      manifest.findings = normalizeStringArray(raw.findings);
      manifest.verification_hints = normalizeStringArray(raw.verification_hints);
      manifest.capabilities_used = normalizeMachineIdentifierArray(
        raw.capabilities_used,
        "capabilities_used",
      );
      manifest.metrics = normalizeMetrics(raw.metrics);
      manifest.evidence = normalizeEvidence(raw.evidence);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      invalidManifest(resultPath, message, rawText);
    }
    assertRunnerManifestQuality(manifest, resultPath);
    return manifest;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}
