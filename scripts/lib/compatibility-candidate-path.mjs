import { lstatSync } from "node:fs";
import path from "node:path";

export const DEFAULT_COMPATIBILITY_CANDIDATE_PATH =
  "scripts/baselines/v0.7-compatibility-candidate.json";

export function resolveCompatibilityCandidatePath(repoRoot, relativePath) {
  const selected = relativePath ?? DEFAULT_COMPATIBILITY_CANDIDATE_PATH;
  if (
    typeof selected !== "string" ||
    !/^scripts\/baselines\/[A-Za-z0-9][A-Za-z0-9._-]*-compatibility-candidate\.json$/u.test(
      selected,
    )
  ) {
    throw new Error("Compatibility candidate path must name one candidate in scripts/baselines");
  }
  const scriptsDir = path.join(repoRoot, "scripts");
  const baselinesDir = path.join(scriptsDir, "baselines");
  const candidatePath = path.join(repoRoot, selected);
  for (const directory of [scriptsDir, baselinesDir]) {
    const stat = lstatSync(directory);
    if (stat.isSymbolicLink() || !stat.isDirectory()) {
      throw new Error("Compatibility candidate directory must be a regular repository directory");
    }
  }
  const stat = lstatSync(candidatePath);
  if (stat.isSymbolicLink() || !stat.isFile()) {
    throw new Error("Compatibility candidate must be a regular repository file");
  }
  return candidatePath;
}
