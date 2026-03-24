import { exitCodeForError } from "../cli/exit-codes.js";
import { CliError } from "../shared/errors.js";

import type { RunnerResultManifest } from "./types.js";

function normalizeAllowedPrefixes(raw: string[] | undefined): string[] {
  return (raw ?? []).map((entry) => entry.trim()).filter((entry) => entry.length > 0);
}

function isAllowedPath(pathValue: string, allowedPrefixes: string[]): boolean {
  return allowedPrefixes.some((prefix) => pathValue === prefix || pathValue.startsWith(prefix));
}

export function readRecipeArtifactPrefixesFromRunnerEnv(
  env: Record<string, string> | undefined,
): string[] | undefined {
  const raw = env?.AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO;
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return undefined;
    return normalizeAllowedPrefixes(
      parsed.filter((entry): entry is string => typeof entry === "string"),
    );
  } catch {
    return undefined;
  }
}

export function assertRunnerManifestArtifactPolicy(opts: {
  adapter_id: string;
  allowed_prefixes: string[] | undefined;
  manifest: RunnerResultManifest | null;
}): void {
  if (!opts.manifest) return;
  const allowedPrefixes = normalizeAllowedPrefixes(opts.allowed_prefixes);
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
