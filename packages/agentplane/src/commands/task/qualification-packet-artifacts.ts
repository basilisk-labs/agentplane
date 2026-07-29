import { readFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";

import { CliError } from "../../shared/errors.js";

export function relativeToGitRoot(gitRoot: string, filePath: string): string {
  return path.relative(gitRoot, filePath).replaceAll("\\", "/");
}

export function assertPathWithinGitRoot(gitRoot: string, filePath: string, label: string): void {
  const rel = path.relative(gitRoot, filePath);
  if (!rel || rel === ".." || rel.startsWith(`..${path.sep}`) || path.isAbsolute(rel)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${label} must stay inside the repository root.`,
    });
  }
}

export async function readFileAtGitCommit(opts: {
  gitRoot: string;
  commit: string;
  filePath: string;
  label: string;
  missingMessage?: string;
}): Promise<string> {
  assertPathWithinGitRoot(opts.gitRoot, opts.filePath, opts.label);
  const normalizedPath = relativeToGitRoot(opts.gitRoot, opts.filePath);
  try {
    const { stdout } = await execFileAsync("git", ["show", `${opts.commit}:${normalizedPath}`], {
      cwd: opts.gitRoot,
    });
    return String(stdout);
  } catch {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        opts.missingMessage ?? `${opts.label} is not present at the reviewed implementation SHA.`,
    });
  }
}

export async function readArtifactAtReviewedSha(opts: {
  gitRoot: string;
  reviewedSha: string;
  filePath: string;
  label: string;
}): Promise<{ path: string; raw: string }> {
  assertPathWithinGitRoot(opts.gitRoot, opts.filePath, opts.label);
  const [current, reviewed] = await Promise.all([
    readFile(opts.filePath, "utf8"),
    readFileAtGitCommit({
      gitRoot: opts.gitRoot,
      commit: opts.reviewedSha,
      filePath: opts.filePath,
      label: opts.label,
    }),
  ]);
  if (current !== reviewed) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        `${opts.label} must match the exact blob at the reviewed implementation SHA ` +
        "before it can be included in a qualification packet.",
    });
  }
  return { path: relativeToGitRoot(opts.gitRoot, opts.filePath), raw: reviewed };
}
