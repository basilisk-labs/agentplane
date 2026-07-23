import { readFile } from "node:fs/promises";
import path from "node:path";

import { AGENT_SEMANTIC_RESULT_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import type {
  AgentReportedLegacyClaim,
  LegacyAgentSemanticResult,
  RunnerResultManifest,
  RunnerResultManifestWarning,
} from "./types.js";

export const RUNNER_RESULT_MANIFEST_SCHEMA_VERSION = 2 as const;
const LEGACY_RUNNER_RESULT_MANIFEST_SCHEMA_VERSION = 1 as const;

export {
  applyRunnerResultManifest,
  invalidRunnerResultManifestPath,
  preserveInvalidRunnerResultManifest,
  preserveRunnerResultManifestSource,
  runnerResultRecordFromRunnerResult,
  salvageBlockedRunnerResultManifest,
  writeRunnerResultRecord,
} from "./result-manifest-artifacts.js";

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

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizedOptionalString(
  value: unknown,
  field: string,
  resultPath: string,
  rawContent: string,
): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.trim().length === 0) {
    invalidManifest(resultPath, `${field} must be a non-empty string when present`, rawContent);
  }
  return value.trim();
}

function normalizedOptionalStringArray(
  value: unknown,
  field: string,
  resultPath: string,
  rawContent: string,
): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    invalidManifest(resultPath, `${field} must be an array of non-empty strings`, rawContent);
  }
  const normalized = value.map((entry, index) => {
    if (typeof entry !== "string" || entry.trim().length === 0) {
      invalidManifest(
        resultPath,
        `${field}[${String(index)}] must be a non-empty string`,
        rawContent,
      );
    }
    return entry.trim();
  });
  return normalized;
}

function deriveLegacyWorkOrderId(resultPath: string): string {
  const runDirName = path.basename(path.dirname(resultPath)).trim();
  return runDirName || "legacy-run";
}

function legacySemanticStatus(value: unknown): LegacyAgentSemanticResult["status"] | undefined {
  if (value === "success") return "completed";
  if (value === "failed") return "failed";
  if (value === "blocked") return "blocked";
  return undefined;
}

function flattenLegacyClaim(
  field: string,
  value: unknown,
  claims: AgentReportedLegacyClaim[],
): void {
  if (isJsonObject(value) && Object.keys(value).length > 0) {
    for (const [key, nestedValue] of Object.entries(value)) {
      flattenLegacyClaim(`${field}.${key}`, nestedValue, claims);
    }
    return;
  }
  claims.push({
    field,
    value,
    provenance: "agent_reported",
  });
}

function collectLegacyClaims(raw: Record<string, unknown>): AgentReportedLegacyClaim[] {
  const claims: AgentReportedLegacyClaim[] = [];
  for (const [key, value] of Object.entries(raw)) {
    if (key === "schema_version" || key === "summary" || key === "findings") continue;
    flattenLegacyClaim(key, value, claims);
  }
  return claims;
}

const LEGACY_OBSERVED_DIRECT_FIELDS = new Set([
  "artifacts",
  "capabilities_used",
  "execution_receipt",
  "exit_code",
  "kind",
  "observed_by",
  "status",
  "stderr_summary",
  "stdout_summary",
  "timeout_reason",
]);

const LEGACY_OBSERVED_EXACT_FIELDS = new Set([
  "evidence.changed_paths",
  "evidence.conflict_paths",
  "evidence.evidence_paths",
  "evidence.files_changed_count",
  "evidence.observed_checks",
  "evidence.provenance",
  "evidence.receipt_path",
  "evidence.receipt_sha256",
  "evidence.tests_run",
]);

function isLegacyObservedClaim(field: string): boolean {
  return (
    LEGACY_OBSERVED_DIRECT_FIELDS.has(field) ||
    LEGACY_OBSERVED_EXACT_FIELDS.has(field) ||
    field.startsWith("metrics.")
  );
}

function legacyWarnings(claims: AgentReportedLegacyClaim[]): RunnerResultManifestWarning[] {
  return [
    {
      code: "legacy_manifest_v1",
      message:
        "Runner result schema_version=1 is deprecated; semantic fields were normalized and all other values remain untrusted agent-reported claims.",
    },
    ...claims
      .filter((claim) => isLegacyObservedClaim(claim.field))
      .map(
        (claim): RunnerResultManifestWarning => ({
          code: "legacy_agent_observed_claim",
          field: claim.field,
          message: `Legacy agent claim ${claim.field} was retained as agent_reported and cannot override supervisor observations.`,
        }),
      ),
  ];
}

function legacyBlocker(
  raw: Record<string, unknown>,
  resultPath: string,
  rawContent: string,
): LegacyAgentSemanticResult["blocker"] | undefined {
  if (!isJsonObject(raw.evidence)) return undefined;
  const summary = normalizedOptionalString(
    raw.evidence.blocked_reason,
    "evidence.blocked_reason",
    resultPath,
    rawContent,
  );
  if (!summary) return undefined;
  const recommendedAction = normalizedOptionalString(
    raw.evidence.recommended_parent_action,
    "evidence.recommended_parent_action",
    resultPath,
    rawContent,
  );
  return {
    summary,
    ...(recommendedAction ? { recommended_action: recommendedAction } : {}),
  };
}

function parseLegacyRunnerResultManifest(opts: {
  raw: Record<string, unknown>;
  raw_content: string;
  result_path: string;
}): RunnerResultManifest {
  const summary = normalizedOptionalString(
    opts.raw.summary,
    "summary",
    opts.result_path,
    opts.raw_content,
  );
  const findings = normalizedOptionalStringArray(
    opts.raw.findings,
    "findings",
    opts.result_path,
    opts.raw_content,
  );
  const status = legacySemanticStatus(opts.raw.status);
  const blocker = legacyBlocker(opts.raw, opts.result_path, opts.raw_content);
  const semanticResult: LegacyAgentSemanticResult = {
    schema_version: RUNNER_RESULT_MANIFEST_SCHEMA_VERSION,
    kind: "legacy_agent_semantic_result",
    work_order_id: deriveLegacyWorkOrderId(opts.result_path),
    ...(status ? { status } : {}),
    ...(summary ? { summary } : {}),
    ...(findings ? { findings } : {}),
    ...(blocker ? { blocker } : {}),
  };
  const legacyClaims = collectLegacyClaims(opts.raw);
  return {
    source_schema_version: LEGACY_RUNNER_RESULT_MANIFEST_SCHEMA_VERSION,
    semantic_result: {
      provenance: "agent_reported",
      value: semanticResult,
    },
    legacy_claims: legacyClaims,
    warnings: legacyWarnings(legacyClaims),
  };
}

function formatSemanticSchemaIssues(
  issues: readonly { path: PropertyKey[]; message: string }[],
): string {
  return issues
    .map((issue) => {
      const field = issue.path.length > 0 ? issue.path.map(String).join(".") : "result";
      return `${field}: ${issue.message}`;
    })
    .join("; ");
}

function parseAgentSemanticResultManifest(opts: {
  raw: Record<string, unknown>;
  raw_content: string;
  result_path: string;
}): RunnerResultManifest {
  const parsed = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.safeParse(opts.raw);
  if (!parsed.success) {
    invalidManifest(
      opts.result_path,
      `invalid AgentSemanticResult v2 (${formatSemanticSchemaIssues(parsed.error.issues)})`,
      opts.raw_content,
    );
  }
  return {
    source_schema_version: RUNNER_RESULT_MANIFEST_SCHEMA_VERSION,
    semantic_result: {
      provenance: "agent_reported",
      value: parsed.data,
    },
    legacy_claims: [],
    warnings: [],
  };
}

export async function readRunnerResultManifest(
  resultPath: string,
): Promise<RunnerResultManifest | null> {
  try {
    const rawText = await readFile(resultPath, "utf8");
    return parseRunnerResultManifestText(rawText, resultPath);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export function parseRunnerResultManifestText(
  rawText: string,
  resultPath: string,
): RunnerResultManifest {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    invalidManifest(resultPath, `result.json must contain valid JSON (${message})`, rawText);
  }
  if (!isJsonObject(parsed)) {
    invalidManifest(resultPath, "result.json must contain a JSON object", rawText);
  }
  if (parsed.schema_version === LEGACY_RUNNER_RESULT_MANIFEST_SCHEMA_VERSION) {
    return parseLegacyRunnerResultManifest({
      raw: parsed,
      raw_content: rawText,
      result_path: resultPath,
    });
  }
  if (parsed.schema_version === RUNNER_RESULT_MANIFEST_SCHEMA_VERSION) {
    return parseAgentSemanticResultManifest({
      raw: parsed,
      raw_content: rawText,
      result_path: resultPath,
    });
  }
  invalidManifest(resultPath, "schema_version must be 1 or 2", rawText);
}
