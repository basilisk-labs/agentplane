import { readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";

export { verificationRecordPaths } from "../shared/task-verification-records.js";

const RUNTIME_EVIDENCE_PREFIX = ".agentplane/cache/";
const MAX_RUNTIME_EVIDENCE_FILES = 16;

function detailsEvidencePaths(details: unknown): string[] {
  if (typeof details !== "string" || !details.trim()) return [];
  return details
    .trim()
    .split(/\n\s*\n/gu)
    .flatMap((check) =>
      check
        .split("\n")
        .flatMap((line) => {
          const [field, ...value] = line.split(":");
          return field?.trim() === "Evidence" ? value.join(":").split("|") : [];
        })
        .map((value) => value.trim()),
    );
}

function isWithinRoot(root: string, target: string): boolean {
  const value = path.relative(root, target);
  return (
    value !== "" && !value.startsWith(`..${path.sep}`) && value !== ".." && !path.isAbsolute(value)
  );
}

async function verifiedRuntimeEvidencePath(opts: {
  gitRoot: string;
  realGitRoot: string;
  reference: string;
}): Promise<string | null> {
  const reference = opts.reference.replaceAll("\\", "/");
  if (!reference.startsWith(RUNTIME_EVIDENCE_PREFIX) || reference.includes("\0")) return null;
  const candidate = path.resolve(opts.gitRoot, reference);
  if (!isWithinRoot(opts.gitRoot, candidate)) return null;
  try {
    const resolved = await realpath(candidate);
    const metadata = await stat(resolved);
    if (!isWithinRoot(opts.realGitRoot, resolved) || !metadata.isFile()) return null;
    return candidate;
  } catch {
    return null;
  }
}

/**
 * Resolves only regular local runtime artifacts explicitly cited by a current,
 * accepted verification record. The path boundary prevents verification prose
 * from turning into an arbitrary file-read capability for EVALUATOR setup.
 */
export async function verificationRuntimeEvidencePaths(opts: {
  gitRoot: string;
  verificationRecordPaths: readonly string[];
}): Promise<string[]> {
  const realGitRoot = await realpath(opts.gitRoot);
  const paths = new Set<string>();
  for (const recordPath of opts.verificationRecordPaths) {
    let raw: unknown;
    try {
      raw = JSON.parse(await readFile(recordPath, "utf8"));
    } catch {
      continue;
    }
    const details =
      raw && typeof raw === "object" && !Array.isArray(raw)
        ? (raw as Record<string, unknown>).details
        : null;
    for (const reference of detailsEvidencePaths(details)) {
      const resolved = await verifiedRuntimeEvidencePath({
        gitRoot: opts.gitRoot,
        realGitRoot,
        reference,
      });
      if (resolved) paths.add(resolved);
      if (paths.size >= MAX_RUNTIME_EVIDENCE_FILES) return [...paths].toSorted();
    }
  }
  return [...paths].toSorted();
}
