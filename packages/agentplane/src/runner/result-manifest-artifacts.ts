import { constants } from "node:fs";
import { mkdir, open } from "node:fs/promises";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";

import { atomicWriteFile } from "@agentplaneorg/core/fs";

import type { InvalidRunnerResultManifestError } from "./result-manifest.js";
import { readStableRegularFileNoFollow } from "./stable-file.js";
import type {
  AgentReportedClaimConflict,
  AgentReportedSemanticResult,
  LegacyAgentSemanticResult,
  RunnerResult,
  RunnerResultManifest,
  RunnerResultManifestWarning,
  RunnerResultRecord,
} from "./types.js";

const INVALID_RESULT_MANIFEST_SUFFIX = ".invalid.json";
const SOURCE_RESULT_MANIFEST_SUFFIX = ".source.json";
const NO_FOLLOW = constants.O_NOFOLLOW ?? 0;

export function invalidRunnerResultManifestPath(resultPath: string): string {
  const dir = path.dirname(resultPath);
  const base = path.basename(resultPath, ".json");
  return path.join(dir, `${base}${INVALID_RESULT_MANIFEST_SUFFIX}`);
}

function sourceRunnerResultManifestPath(resultPath: string): string {
  const dir = path.dirname(resultPath);
  const base = path.basename(resultPath, ".json");
  return path.join(dir, `${base}${SOURCE_RESULT_MANIFEST_SUFFIX}`);
}

async function writeOrCompareSourceSnapshot(
  sourcePath: string,
  resultContent: Buffer,
): Promise<void> {
  let handle;
  try {
    handle = await open(
      sourcePath,
      constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | NO_FOLLOW,
      0o600,
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
    const sourceContent = await readStableRegularFileNoFollow(
      sourcePath,
      "runner result source snapshot",
    );
    if (!sourceContent.equals(resultContent)) {
      throw new Error(
        `Existing runner result source snapshot does not match the current agent manifest: ${sourcePath}`,
      );
    }
    return;
  }
  try {
    const initial = await handle.stat({ bigint: true });
    if (!initial.isFile()) {
      throw new Error(`Refusing non-regular runner result source snapshot: ${sourcePath}`);
    }
    await handle.writeFile(resultContent);
    await handle.sync();
    const persisted = await handle.stat({ bigint: true });
    if (!persisted.isFile() || persisted.size !== BigInt(resultContent.byteLength)) {
      throw new Error(`Runner result source snapshot write was incomplete: ${sourcePath}`);
    }
  } finally {
    await handle.close();
  }
  const sourceContent = await readStableRegularFileNoFollow(
    sourcePath,
    "runner result source snapshot",
  );
  if (!sourceContent.equals(resultContent)) {
    throw new Error(`Runner result source snapshot changed after creation: ${sourcePath}`);
  }
}

export async function preserveInvalidRunnerResultManifest(opts: {
  result_path: string;
  error: InvalidRunnerResultManifestError;
}): Promise<string> {
  const invalidPath = invalidRunnerResultManifestPath(opts.result_path);
  await mkdir(path.dirname(invalidPath), { recursive: true });
  await atomicWriteFile(invalidPath, opts.error.raw_content, "utf8");
  return invalidPath;
}

export async function preserveRunnerResultManifestSource(
  resultPath: string,
): Promise<string | null> {
  const sourcePath = sourceRunnerResultManifestPath(resultPath);
  let resultContent: Buffer;
  try {
    resultContent = await readStableRegularFileNoFollow(resultPath, "runner result manifest");
  } catch (err) {
    if ((err as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw err;
  }
  await mkdir(path.dirname(sourcePath), { recursive: true });
  await writeOrCompareSourceSnapshot(sourcePath, resultContent);
  return sourcePath;
}

function observedValueForClaim(result: RunnerResult, field: string): unknown {
  if (field === "status") return result.status;
  if (field === "exit_code") return result.exit_code;
  if (field === "stdout_summary") return result.stdout_summary;
  if (field === "stderr_summary") return result.stderr_summary;
  if (field === "timeout_reason") return result.timeout_reason;
  if (field === "artifacts") return result.artifacts;
  if (field === "capabilities_used") return result.capabilities_used;
  if (field === "execution_receipt") return result.execution_receipt;
  if (field === "kind") return "runner_result_record";
  if (field === "observed_by") return "agentplane";
  if (field.startsWith("metrics.")) {
    return result.metrics?.[
      field.slice("metrics.".length) as keyof NonNullable<RunnerResult["metrics"]>
    ];
  }
  if (field.startsWith("evidence.")) {
    return result.evidence?.[
      field.slice("evidence.".length) as keyof NonNullable<RunnerResult["evidence"]>
    ];
  }
  return undefined;
}

function claimHasObservedCounterpart(field: string): boolean {
  return (
    field === "status" ||
    field === "exit_code" ||
    field === "stdout_summary" ||
    field === "stderr_summary" ||
    field === "timeout_reason" ||
    field === "artifacts" ||
    field === "capabilities_used" ||
    field === "execution_receipt" ||
    field === "kind" ||
    field === "observed_by" ||
    field.startsWith("metrics.") ||
    field === "evidence.evidence_paths" ||
    field === "evidence.changed_paths" ||
    field === "evidence.conflict_paths" ||
    field === "evidence.files_changed_count" ||
    field === "evidence.observed_checks" ||
    field === "evidence.provenance" ||
    field === "evidence.receipt_path" ||
    field === "evidence.receipt_sha256" ||
    field === "evidence.tests_run"
  );
}

function auditLegacyClaimConflicts(
  base: RunnerResult,
  manifest: RunnerResultManifest,
): AgentReportedClaimConflict[] {
  return manifest.legacy_claims.flatMap((claim) => {
    if (!claimHasObservedCounterpart(claim.field)) return [];
    const observed = observedValueForClaim(base, claim.field);
    if (isDeepStrictEqual(claim.value, observed)) return [];
    return [
      {
        field: claim.field,
        agent_reported: claim.value,
        observed,
        resolution: "observed_wins" as const,
      },
    ];
  });
}

function semanticSummary(semanticResult: AgentReportedSemanticResult): string | undefined {
  return semanticResult.value.summary;
}

function semanticFindings(semanticResult: AgentReportedSemanticResult): string[] | undefined {
  return semanticResult.value.findings;
}

export function applyRunnerResultManifest(opts: {
  base: RunnerResult;
  manifest: RunnerResultManifest | null;
}): RunnerResult {
  if (!opts.manifest) return opts.base;
  const conflicts = auditLegacyClaimConflicts(opts.base, opts.manifest);
  const summary = semanticSummary(opts.manifest.semantic_result);
  const findings = semanticFindings(opts.manifest.semantic_result);
  const applied: RunnerResult = {
    ...opts.base,
    semantic_result: opts.manifest.semantic_result,
  };
  if (summary) applied.summary = summary;
  if (findings) applied.findings = findings;
  if (opts.manifest.legacy_claims.length > 0) {
    applied.agent_reported_claims = opts.manifest.legacy_claims;
  }
  if (conflicts.length > 0) applied.claim_conflicts = conflicts;
  if (opts.manifest.warnings.length > 0) {
    applied.manifest_warnings = opts.manifest.warnings;
  }
  return applied;
}

export function runnerResultRecordFromRunnerResult(result: RunnerResult): RunnerResultRecord {
  return {
    schema_version: 1,
    kind: "runner_result_record",
    observed_by: "agentplane",
    ...result,
  };
}

export async function writeRunnerResultRecord(opts: {
  result_path: string;
  record: RunnerResultRecord;
}): Promise<void> {
  await mkdir(path.dirname(opts.result_path), { recursive: true });
  await atomicWriteFile(opts.result_path, `${JSON.stringify(opts.record, null, 2)}\n`, "utf8");
}

function softNonEmptyString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function softStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const strings = value
    .filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
    .map((entry) => entry.trim());
  return strings.length > 0 ? strings : undefined;
}

function softLegacyStatus(value: unknown): LegacyAgentSemanticResult["status"] | undefined {
  if (value === "success") return "completed";
  if (value === "failed") return "failed";
  if (value === "blocked") return "blocked";
  return undefined;
}

export function salvageBlockedRunnerResultManifest(
  rawContent: string,
  resultPath = "legacy-run/result.json",
): {
  semantic_result: AgentReportedSemanticResult;
  manifest_warnings: RunnerResultManifestWarning[];
} | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawContent);
  } catch {
    return null;
  }
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    Array.isArray(parsed) ||
    (parsed as Record<string, unknown>).schema_version !== 1
  ) {
    return null;
  }
  const raw = parsed as Record<string, unknown>;
  const evidence =
    typeof raw.evidence === "object" && raw.evidence !== null && !Array.isArray(raw.evidence)
      ? (raw.evidence as Record<string, unknown>)
      : null;
  const summary = softNonEmptyString(raw.summary);
  const findings = softStringArray(raw.findings);
  const status = softLegacyStatus(raw.status);
  const blockedSummary = softNonEmptyString(evidence?.blocked_reason);
  const recommendedAction = softNonEmptyString(evidence?.recommended_parent_action);
  if (!summary && !findings && !status && !blockedSummary) return null;
  const value: LegacyAgentSemanticResult = {
    schema_version: 2,
    kind: "legacy_agent_semantic_result",
    work_order_id: path.basename(path.dirname(resultPath)) || "legacy-run",
    ...(status ? { status } : {}),
    ...(summary ? { summary } : {}),
    ...(findings ? { findings } : {}),
    ...(blockedSummary
      ? {
          blocker: {
            summary: blockedSummary,
            ...(recommendedAction ? { recommended_action: recommendedAction } : {}),
          },
        }
      : {}),
  };
  return {
    semantic_result: {
      provenance: "agent_reported",
      value,
    },
    manifest_warnings: [
      {
        code: "legacy_manifest_v1",
        message:
          "Invalid legacy runner manifest retained semantic guidance only; supervisor observations remain authoritative.",
      },
    ],
  };
}
