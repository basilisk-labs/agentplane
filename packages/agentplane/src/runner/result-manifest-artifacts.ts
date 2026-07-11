import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { isRecord } from "../shared/guards.js";
import type { RunnerResult, RunnerResultManifest } from "./types.js";
import type { InvalidRunnerResultManifestError } from "./result-manifest.js";

const INVALID_RESULT_MANIFEST_SUFFIX = ".invalid.json";
const SOURCE_RESULT_MANIFEST_SUFFIX = ".source.json";
function normalizeStringArraySoft(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const out = value
    .filter((item): item is string => typeof item === "string" && item.trim() !== "")
    .map((item) => item.trim());
  return out.length > 0 ? out : undefined;
}
function normalizeTrimmedStringSoft(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function invalidRunnerResultManifestPath(resultPath: string): string {
  const dir = path.dirname(resultPath);
  const base = path.basename(resultPath, ".json");
  return path.join(dir, `${base}${INVALID_RESULT_MANIFEST_SUFFIX}`);
}

export function sourceRunnerResultManifestPath(resultPath: string): string {
  const dir = path.dirname(resultPath);
  const base = path.basename(resultPath, ".json");
  return path.join(dir, `${base}${SOURCE_RESULT_MANIFEST_SUFFIX}`);
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
  try {
    const rawContent = await readFile(resultPath, "utf8");
    const sourcePath = sourceRunnerResultManifestPath(resultPath);
    await mkdir(path.dirname(sourcePath), { recursive: true });
    await atomicWriteFile(sourcePath, rawContent, "utf8");
    return sourcePath;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export function salvageBlockedRunnerResultManifest(
  rawContent: string,
): Pick<RunnerResultManifest, "summary" | "evidence"> | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawContent);
  } catch {
    return null;
  }
  if (!isRecord(parsed) || !isRecord(parsed.evidence)) return null;
  const conflict_paths = normalizeStringArraySoft(parsed.evidence.conflict_paths);
  const blocked_reason = normalizeTrimmedStringSoft(parsed.evidence.blocked_reason);
  const recommended_parent_action = normalizeTrimmedStringSoft(
    parsed.evidence.recommended_parent_action,
  );
  if (!conflict_paths || !blocked_reason || !recommended_parent_action) {
    return null;
  }
  const summary = normalizeTrimmedStringSoft(parsed.summary);
  return {
    ...(summary ? { summary } : {}),
    evidence: {
      conflict_paths,
      blocked_reason,
      recommended_parent_action,
    },
  };
}

export async function writeRunnerResultManifest(opts: {
  result_path: string;
  manifest: RunnerResultManifest;
}): Promise<void> {
  await mkdir(path.dirname(opts.result_path), { recursive: true });
  await atomicWriteFile(opts.result_path, `${JSON.stringify(opts.manifest, null, 2)}\n`, "utf8");
}

export function applyRunnerResultManifest(opts: {
  base: RunnerResult;
  manifest: RunnerResultManifest | null;
}): RunnerResult {
  if (!opts.manifest) return opts.base;
  const merged: RunnerResult = {
    ...opts.base,
    status:
      opts.base.status === "cancelled" ? "cancelled" : (opts.manifest.status ?? opts.base.status),
    exit_code:
      opts.base.status === "cancelled"
        ? opts.base.exit_code
        : (opts.manifest.exit_code ?? opts.base.exit_code),
    summary: opts.manifest.summary ?? opts.base.summary,
    stdout_summary: opts.manifest.stdout_summary ?? opts.base.stdout_summary,
    stderr_summary: opts.manifest.stderr_summary ?? opts.base.stderr_summary,
    timeout_reason: opts.manifest.timeout_reason ?? opts.base.timeout_reason,
    artifacts: opts.manifest.artifacts ?? opts.base.artifacts,
    findings: opts.manifest.findings ?? opts.base.findings,
    verification_hints: opts.manifest.verification_hints ?? opts.base.verification_hints,
    capabilities_used: opts.manifest.capabilities_used ?? opts.base.capabilities_used,
    metrics: {
      ...opts.base.metrics,
      ...opts.manifest.metrics,
    },
    evidence: opts.manifest.evidence ?? opts.base.evidence,
  };
  if (merged.artifacts && merged.artifacts.length > 0) {
    merged.output_paths = merged.artifacts.map((artifact) => artifact.path);
  }
  return merged;
}

export function manifestFromRunnerResult(result: RunnerResult): RunnerResultManifest {
  return {
    schema_version: 1,
    status: result.status,
    exit_code: result.exit_code,
    summary: result.summary,
    stdout_summary: result.stdout_summary,
    stderr_summary: result.stderr_summary,
    timeout_reason: result.timeout_reason,
    artifacts:
      result.artifacts ??
      result.output_paths?.map((outputPath) => ({
        path: outputPath,
      })),
    findings: result.findings,
    verification_hints: result.verification_hints,
    capabilities_used: result.capabilities_used,
    metrics: result.metrics,
    evidence: result.evidence,
  };
}
