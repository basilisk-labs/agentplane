import path from "node:path";

import { CliError } from "../../../shared/errors.js";

import { readPrArtifact } from "../internal/pr-paths.js";

import type { CommandContext } from "../../shared/task-backend.js";

import { validateReviewContents } from "../internal/review-template.js";

type ReadPrArtifactOpts = {
  resolved: { gitRoot: string };
  prDir: string;
  fileName: string;
  branch: string;
};

export async function readAndValidatePrArtifacts(opts: {
  ctx: CommandContext;
  resolved: { gitRoot: string };
  prDir: string;
  metaPath: string;
  branch: string;
  taskId: string;
}): Promise<{
  verifyLogText: string | null;
}> {
  const readPrArtifactTyped = readPrArtifact as (o: ReadPrArtifactOpts) => Promise<string | null>;
  const { prDir } = opts;
  const diffstatPath = path.join(prDir, "diffstat.txt");
  const verifyLogPath = path.join(prDir, "verify.log");
  const reviewPath = path.join(prDir, "review.md");

  const errors: string[] = [];
  const relDiffstat = path.relative(opts.resolved.gitRoot, diffstatPath);
  const relVerifyLog = path.relative(opts.resolved.gitRoot, verifyLogPath);
  const relReview = path.relative(opts.resolved.gitRoot, reviewPath);

  const diffstatText = await readPrArtifactTyped({
    resolved: opts.resolved,
    prDir,
    fileName: "diffstat.txt",
    branch: opts.branch,
  });
  if (diffstatText === null) errors.push(`Missing ${relDiffstat}`);

  const verifyLogText = await readPrArtifactTyped({
    resolved: opts.resolved,
    prDir,
    fileName: "verify.log",
    branch: opts.branch,
  });
  if (verifyLogText === null) errors.push(`Missing ${relVerifyLog}`);

  const reviewText = await readPrArtifactTyped({
    resolved: opts.resolved,
    prDir,
    fileName: "review.md",
    branch: opts.branch,
  });
  if (reviewText === null) errors.push(`Missing ${relReview}`);
  if (reviewText) validateReviewContents(reviewText, errors);

  if (errors.length > 0) {
    throw new CliError({ exitCode: 3, code: "E_VALIDATION", message: errors.join("\n") });
  }

  return { verifyLogText };
}
