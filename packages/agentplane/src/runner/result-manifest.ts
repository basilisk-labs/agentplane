import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core";

import type {
  RunnerExecutionMetrics,
  RunnerResult,
  RunnerResultArtifact,
  RunnerResultManifest,
  RunnerResultStatus,
} from "./types.js";

export const RUNNER_RESULT_MANIFEST_SCHEMA_VERSION = 1 as const;

function normalizeStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const entries = value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
  return entries.length > 0 ? entries : undefined;
}

function normalizeArtifacts(value: unknown): RunnerResultArtifact[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const artifacts = value
    .filter((entry): entry is Record<string, unknown> => !!entry && typeof entry === "object")
    .map((entry) => {
      const pathValue = typeof entry.path === "string" ? entry.path.trim() : "";
      const labelValue = typeof entry.label === "string" ? entry.label.trim() : "";
      if (!pathValue) return null;
      return labelValue ? { path: pathValue, label: labelValue } : { path: pathValue };
    })
    .filter((entry): entry is RunnerResultArtifact => entry !== null);
  return artifacts.length > 0 ? artifacts : undefined;
}

function normalizeMetrics(value: unknown): RunnerExecutionMetrics | undefined {
  if (!value || typeof value !== "object") return undefined;
  const candidate = value as Record<string, unknown>;
  const metrics: RunnerExecutionMetrics = {};
  if (typeof candidate.duration_ms === "number" && Number.isFinite(candidate.duration_ms)) {
    metrics.duration_ms = candidate.duration_ms;
  }
  if (typeof candidate.stdout_bytes === "number" && Number.isFinite(candidate.stdout_bytes)) {
    metrics.stdout_bytes = candidate.stdout_bytes;
  }
  if (typeof candidate.stderr_bytes === "number" && Number.isFinite(candidate.stderr_bytes)) {
    metrics.stderr_bytes = candidate.stderr_bytes;
  }
  if (
    candidate.output_last_message_bytes === null ||
    (typeof candidate.output_last_message_bytes === "number" &&
      Number.isFinite(candidate.output_last_message_bytes))
  ) {
    metrics.output_last_message_bytes = candidate.output_last_message_bytes;
  }
  return Object.keys(metrics).length > 0 ? metrics : undefined;
}

function normalizeStatus(value: unknown): RunnerResultStatus | undefined {
  return value === "success" || value === "failed" || value === "cancelled" ? value : undefined;
}

export async function readRunnerResultManifest(
  resultPath: string,
): Promise<RunnerResultManifest | null> {
  try {
    const raw = JSON.parse(await readFile(resultPath, "utf8")) as Record<string, unknown>;
    const manifest: RunnerResultManifest = {
      schema_version: RUNNER_RESULT_MANIFEST_SCHEMA_VERSION,
    };
    const status = normalizeStatus(raw.status);
    if (status) manifest.status = status;
    if (raw.exit_code === null || typeof raw.exit_code === "number") {
      manifest.exit_code = raw.exit_code;
    }
    if (typeof raw.summary === "string" && raw.summary.trim()) {
      manifest.summary = raw.summary.trim();
    }
    if (typeof raw.stdout_summary === "string" && raw.stdout_summary.trim()) {
      manifest.stdout_summary = raw.stdout_summary.trim();
    }
    if (typeof raw.stderr_summary === "string" && raw.stderr_summary.trim()) {
      manifest.stderr_summary = raw.stderr_summary.trim();
    }
    manifest.artifacts = normalizeArtifacts(raw.artifacts);
    manifest.findings = normalizeStringArray(raw.findings);
    manifest.verification_hints = normalizeStringArray(raw.verification_hints);
    manifest.capabilities_used = normalizeStringArray(raw.capabilities_used);
    manifest.metrics = normalizeMetrics(raw.metrics);
    return manifest;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
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
    artifacts: opts.manifest.artifacts ?? opts.base.artifacts,
    findings: opts.manifest.findings ?? opts.base.findings,
    verification_hints: opts.manifest.verification_hints ?? opts.base.verification_hints,
    capabilities_used: opts.manifest.capabilities_used ?? opts.base.capabilities_used,
    metrics: {
      ...opts.base.metrics,
      ...opts.manifest.metrics,
    },
  };
  if (merged.artifacts && merged.artifacts.length > 0) {
    merged.output_paths = merged.artifacts.map((artifact) => artifact.path);
  }
  return merged;
}

export function manifestFromRunnerResult(result: RunnerResult): RunnerResultManifest {
  return {
    schema_version: RUNNER_RESULT_MANIFEST_SCHEMA_VERSION,
    status: result.status,
    exit_code: result.exit_code,
    summary: result.summary,
    stdout_summary: result.stdout_summary,
    stderr_summary: result.stderr_summary,
    artifacts:
      result.artifacts ??
      result.output_paths?.map((outputPath) => ({
        path: outputPath,
      })),
    findings: result.findings,
    verification_hints: result.verification_hints,
    capabilities_used: result.capabilities_used,
    metrics: result.metrics,
  };
}
