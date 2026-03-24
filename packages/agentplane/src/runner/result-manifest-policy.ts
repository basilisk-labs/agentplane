import path from "node:path";

import { exitCodeForError } from "../cli/exit-codes.js";
import { CliError } from "../shared/errors.js";

import type { RunnerResultManifest } from "./types.js";

function normalizeRelativePolicyPath(value: string): string | null {
  const trimmed = value.trim();
  if (trimmed.length === 0) return null;

  const slashed = trimmed.replaceAll("\\", "/");
  if (slashed.startsWith("/")) return null;
  if (/^[A-Za-z]:\//u.test(slashed)) return null;

  const normalized = path.posix.normalize(slashed);
  if (!normalized || normalized === "." || normalized === "..") return null;
  if (normalized.startsWith("../")) return null;

  return normalized.replace(/\/+$/u, "");
}

export function normalizeRecipeArtifactPrefixes(raw: string[] | undefined): string[] {
  const invalidPrefixes: string[] = [];
  const normalizedPrefixes = (raw ?? [])
    .map((entry) => {
      const normalized = normalizeRelativePolicyPath(entry);
      if (!normalized) invalidPrefixes.push(entry);
      return normalized;
    })
    .filter(Boolean) as string[];

  if (invalidPrefixes.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message: `Recipe writes_artifacts_to contains invalid relative prefixes: ${invalidPrefixes.join(", ")}.`,
      context: {
        policy_field: "writes_artifacts_to",
        invalid_declared_prefixes: invalidPrefixes,
      },
    });
  }

  return normalizedPrefixes;
}

function isAllowedPath(pathValue: string, allowedPrefixes: string[]): boolean {
  const normalizedPath = normalizeRelativePolicyPath(pathValue);
  if (!normalizedPath) return false;
  return allowedPrefixes.some(
    (prefix) => normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`),
  );
}

export function readRecipeArtifactPrefixesFromRunnerEnv(
  env: Record<string, string> | undefined,
): string[] | undefined {
  const raw = env?.AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO;
  if (!raw) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
  if (!Array.isArray(parsed)) return undefined;
  return normalizeRecipeArtifactPrefixes(
    parsed.filter((entry): entry is string => typeof entry === "string"),
  );
}

export function assertRunnerManifestArtifactPolicy(opts: {
  adapter_id: string;
  allowed_prefixes: string[] | undefined;
  manifest: RunnerResultManifest | null;
}): void {
  if (!opts.manifest) return;
  const allowedPrefixes = normalizeRecipeArtifactPrefixes(opts.allowed_prefixes);
  if (allowedPrefixes.length === 0) return;

  const invalidArtifactPaths = (opts.manifest.artifacts ?? [])
    .map((artifact) => artifact.path)
    .filter((pathValue) => !isAllowedPath(pathValue, allowedPrefixes));
  const invalidEvidencePaths = (opts.manifest.evidence?.evidence_paths ?? []).filter(
    (pathValue) => !isAllowedPath(pathValue, allowedPrefixes),
  );
  if (invalidArtifactPaths.length === 0 && invalidEvidencePaths.length === 0) return;

  const details: string[] = [];
  if (invalidArtifactPaths.length > 0) {
    details.push(`artifacts=${invalidArtifactPaths.join(", ")}`);
  }
  if (invalidEvidencePaths.length > 0) {
    details.push(`evidence_paths=${invalidEvidencePaths.join(", ")}`);
  }

  throw new CliError({
    exitCode: exitCodeForError("E_RUNTIME"),
    code: "E_RUNTIME",
    message:
      `Runner result manifest reported paths outside recipe writes_artifacts_to prefixes ` +
      `(${allowedPrefixes.join(", ")}): ${details.join("; ")}.`,
    context: {
      adapter_id: opts.adapter_id,
      policy_field: "writes_artifacts_to",
      declared_value: allowedPrefixes,
      invalid_artifact_paths: invalidArtifactPaths,
      invalid_evidence_paths: invalidEvidencePaths,
    },
  });
}
