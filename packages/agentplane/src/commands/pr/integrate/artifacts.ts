import path from "node:path";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import { readPrArtifact, readPrArtifactFromBranch } from "../internal/pr-paths.js";
import { findWorktreeForBranch } from "@agentplaneorg/core/git";

import type { CommandContext } from "../../shared/task-backend.js";

import { validateArtifactsLanguage, validateReviewContents } from "../internal/review-template.js";

type ReadPrArtifactOpts = {
  resolved: { gitRoot: string };
  prDir: string;
  fileName: string;
  branch: string;
  worktreePath?: string | null;
};

export async function readAndValidatePrArtifacts(opts: {
  ctx: CommandContext;
  resolved: { gitRoot: string };
  prDir: string;
  metaPath: string;
  branch: string;
  artifactsLanguage: AgentplaneConfig["artifacts_language"];
  taskId: string;
}): Promise<{
  verifyLogText: string | null;
}> {
  const readPrArtifactTyped = readPrArtifact as (o: ReadPrArtifactOpts) => Promise<string | null>;
  const { prDir } = opts;
  const diffstatPath = path.join(prDir, "diffstat.txt");
  const verifyLogPath = path.join(prDir, "verify.log");
  const reviewPath = path.join(prDir, "review.md");
  const githubTitlePath = path.join(prDir, "github-title.txt");
  const githubBodyPath = path.join(prDir, "github-body.md");
  const worktreePath = await findWorktreeForBranch(opts.resolved.gitRoot, opts.branch);

  const errors: string[] = [];
  const relDiffstat = path.relative(opts.resolved.gitRoot, diffstatPath);
  const relVerifyLog = path.relative(opts.resolved.gitRoot, verifyLogPath);
  const relReview = path.relative(opts.resolved.gitRoot, reviewPath);
  const relGithubTitle = path.relative(opts.resolved.gitRoot, githubTitlePath);
  const relGithubBody = path.relative(opts.resolved.gitRoot, githubBodyPath);

  const diffstatText = await readPrArtifactTyped({
    resolved: opts.resolved,
    prDir,
    fileName: "diffstat.txt",
    branch: opts.branch,
    worktreePath,
  });
  if (diffstatText === null) errors.push(`Missing ${relDiffstat}`);

  const verifyLogText = await readPrArtifactTyped({
    resolved: opts.resolved,
    prDir,
    fileName: "verify.log",
    branch: opts.branch,
    worktreePath,
  });
  if (verifyLogText === null) errors.push(`Missing ${relVerifyLog}`);

  const reviewText = await readPrArtifactTyped({
    resolved: opts.resolved,
    prDir,
    fileName: "review.md",
    branch: opts.branch,
    worktreePath,
  });
  if (reviewText === null) errors.push(`Missing ${relReview}`);
  if (reviewText) validateReviewContents(reviewText, errors);
  const githubTitleText = await readPrArtifactTyped({
    resolved: opts.resolved,
    prDir,
    fileName: "github-title.txt",
    branch: opts.branch,
    worktreePath,
  });
  if (githubTitleText === null) {
    errors.push(`Missing ${relGithubTitle}`);
  }
  const githubBodyText = await readPrArtifactTyped({
    resolved: opts.resolved,
    prDir,
    fileName: "github-body.md",
    branch: opts.branch,
    worktreePath,
  });
  if (githubBodyText === null) {
    errors.push(`Missing ${relGithubBody}`);
  }
  validateArtifactsLanguage({
    texts: {
      reviewText,
      githubTitleText,
      githubBodyText,
    },
    relReviewPath: relReview,
    relGithubTitlePath: relGithubTitle,
    relGithubBodyPath: relGithubBody,
    artifactsLanguage: opts.artifactsLanguage,
    errors,
  });

  if (errors.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: errors.join("\n"),
    });
  }

  return { verifyLogText };
}

export async function ensureCommittedPrArtifactsOnBranch(opts: {
  resolved: { gitRoot: string };
  prDir: string;
  branch: string;
  artifactsLanguage: AgentplaneConfig["artifacts_language"];
}): Promise<void> {
  const readCommittedPrArtifact = readPrArtifactFromBranch as (
    o: ReadPrArtifactOpts,
  ) => Promise<string | null>;
  const { prDir } = opts;
  const diffstatPath = path.join(prDir, "diffstat.txt");
  const verifyLogPath = path.join(prDir, "verify.log");
  const reviewPath = path.join(prDir, "review.md");
  const metaPath = path.join(prDir, "meta.json");
  const githubTitlePath = path.join(prDir, "github-title.txt");
  const githubBodyPath = path.join(prDir, "github-body.md");

  const errors: string[] = [];
  const relMeta = path.relative(opts.resolved.gitRoot, metaPath);
  const relDiffstat = path.relative(opts.resolved.gitRoot, diffstatPath);
  const relVerifyLog = path.relative(opts.resolved.gitRoot, verifyLogPath);
  const relReview = path.relative(opts.resolved.gitRoot, reviewPath);
  const relGithubTitle = path.relative(opts.resolved.gitRoot, githubTitlePath);
  const relGithubBody = path.relative(opts.resolved.gitRoot, githubBodyPath);

  const metaText = await readCommittedPrArtifact({
    resolved: opts.resolved,
    prDir,
    fileName: "meta.json",
    branch: opts.branch,
  });
  if (metaText === null) errors.push(`Missing committed ${relMeta} on branch ${opts.branch}`);

  const diffstatText = await readCommittedPrArtifact({
    resolved: opts.resolved,
    prDir,
    fileName: "diffstat.txt",
    branch: opts.branch,
  });
  if (diffstatText === null) {
    errors.push(`Missing committed ${relDiffstat} on branch ${opts.branch}`);
  }

  const verifyLogText = await readCommittedPrArtifact({
    resolved: opts.resolved,
    prDir,
    fileName: "verify.log",
    branch: opts.branch,
  });
  if (verifyLogText === null) {
    errors.push(`Missing committed ${relVerifyLog} on branch ${opts.branch}`);
  }

  const reviewText = await readCommittedPrArtifact({
    resolved: opts.resolved,
    prDir,
    fileName: "review.md",
    branch: opts.branch,
  });
  if (reviewText === null) {
    errors.push(`Missing committed ${relReview} on branch ${opts.branch}`);
  } else {
    validateReviewContents(reviewText, errors);
  }
  const githubTitleText = await readCommittedPrArtifact({
    resolved: opts.resolved,
    prDir,
    fileName: "github-title.txt",
    branch: opts.branch,
  });
  if (githubTitleText === null) {
    errors.push(`Missing committed ${relGithubTitle} on branch ${opts.branch}`);
  }
  const githubBodyText = await readCommittedPrArtifact({
    resolved: opts.resolved,
    prDir,
    fileName: "github-body.md",
    branch: opts.branch,
  });
  if (githubBodyText === null) {
    errors.push(`Missing committed ${relGithubBody} on branch ${opts.branch}`);
  }
  validateArtifactsLanguage({
    texts: {
      reviewText,
      githubTitleText,
      githubBodyText,
    },
    relReviewPath: relReview,
    relGithubTitlePath: relGithubTitle,
    relGithubBodyPath: relGithubBody,
    artifactsLanguage: opts.artifactsLanguage,
    errors,
  });

  if (errors.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Task branch ${opts.branch} is missing committed PR artifacts required for integrate.\n` +
        `${errors.join("\n")}\n` +
        "Commit the task README/PR artifacts on the task branch (for example via `agentplane pr open` + git add/commit) before rerunning integrate.",
    });
  }
}
