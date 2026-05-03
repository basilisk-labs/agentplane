import { readFile } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../../../cli/fs-utils.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { gitRevParse } from "../../shared/git-ops.js";
import { assessPrArtifactFreshness } from "./freshness.js";
import { readPrArtifactFromBranch } from "./pr-paths.js";
import { parsePrMeta, type PrMeta } from "../../shared/pr-meta.js";
import {
  validateArtifactsLanguage,
  validateGithubPrBodyContents,
  validateGithubPrTitleContents,
  validateReviewContents,
} from "./review-template.js";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import {
  findWorktreeForBranch,
  gitListTaskBranches,
  parseTaskIdFromBranch,
} from "@agentplaneorg/core/git";

export function isUnknownRevisionError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /unknown revision or path not in the working tree/i.test(message);
}

export async function resolveArtifactBranch(opts: {
  ctx: CommandContext;
  resolved: { gitRoot: string };
  taskId: string;
}): Promise<string | null> {
  const prefix = opts.ctx.config.branch.task_prefix;
  const branches = await gitListTaskBranches(opts.resolved.gitRoot, prefix);
  const matches = branches.filter(
    (branch) => parseTaskIdFromBranch(prefix, branch) === opts.taskId,
  );
  if (matches.length === 1) return matches[0] ?? null;
  if (matches.length > 1) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Multiple task branches match ${opts.taskId}: ${matches.join(", ")}`,
    });
  }
  return null;
}

export type PrArtifactTexts = {
  metaText: string | null;
  diffstatText: string | null;
  verifyLogText: string | null;
  reviewText: string | null;
  githubTitleText: string | null;
  githubBodyText: string | null;
};

export type PrArtifactSnapshot = {
  source: "local" | "branch";
  texts: PrArtifactTexts;
  meta: PrMeta | null;
  errors: string[];
  freshnessEvaluated: boolean;
  freshnessReviewFresh: boolean;
  freshnessVerifySatisfied: boolean;
  freshnessVerifyFresh: boolean;
  freshnessVerifyLogSha: string | null;
};

export async function readLocalPrArtifactText(
  prDir: string,
  fileName: string,
): Promise<string | null> {
  const localPath = path.join(prDir, fileName);
  if (!(await fileExists(localPath))) return null;
  return await readFile(localPath, "utf8");
}

export function validateSnapshotContents(opts: {
  texts: PrArtifactTexts;
  relPrDir: string;
  relMetaPath: string;
  relDiffstatPath: string;
  relVerifyLogPath: string;
  relReviewPath: string;
  relGithubTitlePath: string;
  relGithubBodyPath: string;
  taskId: string;
  artifactsLanguage: AgentplaneConfig["artifacts_language"];
}): { meta: PrMeta | null; errors: string[] } {
  const errors: string[] = [];
  let meta: PrMeta | null = null;
  if (opts.texts.metaText) {
    try {
      meta = parsePrMeta(opts.texts.metaText, opts.taskId);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(message);
    }
  } else {
    errors.push(`Missing PR directory: ${opts.relPrDir}`, `Missing ${opts.relMetaPath}`);
  }

  if (opts.texts.diffstatText === null) errors.push(`Missing ${opts.relDiffstatPath}`);
  if (opts.texts.verifyLogText === null) errors.push(`Missing ${opts.relVerifyLogPath}`);
  if (opts.texts.reviewText) {
    validateReviewContents(opts.texts.reviewText, errors);
  } else {
    errors.push(`Missing ${opts.relReviewPath}`);
  }
  if (opts.texts.githubTitleText?.trim()) {
    validateGithubPrTitleContents(opts.texts.githubTitleText, opts.taskId, errors);
  } else {
    errors.push(`Missing ${opts.relGithubTitlePath}`);
  }
  if (opts.texts.githubBodyText) {
    validateGithubPrBodyContents(opts.texts.githubBodyText, errors);
  } else {
    errors.push(`Missing ${opts.relGithubBodyPath}`);
  }

  validateArtifactsLanguage({
    texts: {
      reviewText: opts.texts.reviewText,
      githubTitleText: opts.texts.githubTitleText,
      githubBodyText: opts.texts.githubBodyText,
    },
    relReviewPath: opts.relReviewPath,
    relGithubTitlePath: opts.relGithubTitlePath,
    relGithubBodyPath: opts.relGithubBodyPath,
    artifactsLanguage: opts.artifactsLanguage,
    errors,
  });
  return { meta, errors };
}

export async function evaluateSnapshotFreshness(opts: {
  snapshot: PrArtifactSnapshot;
  gitRoot: string;
  workflowDir: string;
  tasksPath?: string;
  taskId: string;
  branchHeadSha: string | null;
  taskVerificationState: unknown;
  requiresVerify: boolean;
}): Promise<void> {
  if (!opts.snapshot.meta || !opts.branchHeadSha) return;
  const freshness = await assessPrArtifactFreshness({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    tasksPath: opts.tasksPath,
    taskId: opts.taskId,
    branchHeadSha: opts.branchHeadSha,
    metaHeadSha: opts.snapshot.meta.head_sha ?? null,
    metaLastVerifiedSha: opts.snapshot.meta.last_verified_sha ?? null,
    metaVerifyStatus: opts.snapshot.meta.verify?.status ?? null,
    taskVerificationState: opts.taskVerificationState,
    verifyLogText: opts.snapshot.texts.verifyLogText,
    requiresVerify: opts.requiresVerify,
  });
  opts.snapshot.freshnessEvaluated = true;
  opts.snapshot.freshnessReviewFresh = freshness.reviewFresh;
  opts.snapshot.freshnessVerifySatisfied = freshness.verifySatisfied;
  opts.snapshot.freshnessVerifyFresh = freshness.verifyFresh;
  opts.snapshot.freshnessVerifyLogSha = freshness.verifyLogSha;
}

export function finalizeSnapshotErrors(opts: {
  snapshot: PrArtifactSnapshot;
  branchHeadSha: string | null;
  requiresVerify: boolean;
}): string[] {
  const errors = [...opts.snapshot.errors];
  const meta = opts.snapshot.meta;
  if (!meta) return errors;
  if (opts.branchHeadSha && opts.snapshot.freshnessEvaluated) {
    if (!opts.snapshot.freshnessReviewFresh) {
      errors.push(
        `PR artifacts stale: head_sha=${meta.head_sha ?? "<missing>"} current_head=${opts.branchHeadSha}`,
      );
    }
    if (opts.requiresVerify && !opts.snapshot.freshnessVerifySatisfied) {
      if (meta.verify?.status !== "pass") {
        errors.push("Verify requirements not satisfied (meta.verify.status != pass)");
      }
      if (
        (!meta.last_verified_sha || !meta.last_verified_at) &&
        !opts.snapshot.freshnessVerifyLogSha
      ) {
        errors.push("Verify metadata missing (last_verified_sha/last_verified_at)");
      }
    }
    if (opts.requiresVerify && meta.last_verified_sha && !opts.snapshot.freshnessVerifyFresh) {
      errors.push(
        `Verify state stale: last_verified_sha=${meta.last_verified_sha} current_head=${opts.branchHeadSha}`,
      );
    }
    return errors;
  }
  if (opts.requiresVerify) {
    if (meta.verify?.status !== "pass") {
      errors.push("Verify requirements not satisfied (meta.verify.status != pass)");
    }
    if (!meta.last_verified_sha || !meta.last_verified_at) {
      errors.push("Verify metadata missing (last_verified_sha/last_verified_at)");
    }
  }
  return errors;
}

export async function resolveBranchHeadSha(opts: {
  gitRoot: string;
  branchForFreshness: string | null;
}): Promise<string | null> {
  if (!opts.branchForFreshness) return null;
  try {
    return await gitRevParse(opts.gitRoot, [opts.branchForFreshness]);
  } catch (err) {
    if (!isUnknownRevisionError(err)) throw err;
    return null;
  }
}

export async function buildBranchSnapshot(opts: {
  resolved: { gitRoot: string };
  prDir: string;
  relPrDir: string;
  relMetaPath: string;
  relDiffstatPath: string;
  relVerifyLogPath: string;
  relReviewPath: string;
  relGithubTitlePath: string;
  relGithubBodyPath: string;
  taskId: string;
  branchForFreshness: string;
  artifactsLanguage: AgentplaneConfig["artifacts_language"];
}): Promise<PrArtifactSnapshot> {
  const worktreePath = await findWorktreeForBranch(opts.resolved.gitRoot, opts.branchForFreshness);
  const texts: PrArtifactTexts = {
    metaText: await readPrArtifactFromBranch({
      resolved: opts.resolved,
      prDir: opts.prDir,
      fileName: "meta.json",
      branch: opts.branchForFreshness,
      worktreePath,
    }),
    diffstatText: await readPrArtifactFromBranch({
      resolved: opts.resolved,
      prDir: opts.prDir,
      fileName: "diffstat.txt",
      branch: opts.branchForFreshness,
      worktreePath,
    }),
    verifyLogText: await readPrArtifactFromBranch({
      resolved: opts.resolved,
      prDir: opts.prDir,
      fileName: "verify.log",
      branch: opts.branchForFreshness,
      worktreePath,
    }),
    reviewText: await readPrArtifactFromBranch({
      resolved: opts.resolved,
      prDir: opts.prDir,
      fileName: "review.md",
      branch: opts.branchForFreshness,
      worktreePath,
    }),
    githubTitleText: await readPrArtifactFromBranch({
      resolved: opts.resolved,
      prDir: opts.prDir,
      fileName: "github-title.txt",
      branch: opts.branchForFreshness,
      worktreePath,
    }),
    githubBodyText: await readPrArtifactFromBranch({
      resolved: opts.resolved,
      prDir: opts.prDir,
      fileName: "github-body.md",
      branch: opts.branchForFreshness,
      worktreePath,
    }),
  };
  const parsed = validateSnapshotContents({
    texts,
    relPrDir: opts.relPrDir,
    relMetaPath: opts.relMetaPath,
    relDiffstatPath: opts.relDiffstatPath,
    relVerifyLogPath: opts.relVerifyLogPath,
    relReviewPath: opts.relReviewPath,
    relGithubTitlePath: opts.relGithubTitlePath,
    relGithubBodyPath: opts.relGithubBodyPath,
    taskId: opts.taskId,
    artifactsLanguage: opts.artifactsLanguage,
  });
  return {
    source: "branch",
    texts,
    meta: parsed.meta,
    errors: parsed.errors,
    freshnessEvaluated: false,
    freshnessReviewFresh: false,
    freshnessVerifySatisfied: false,
    freshnessVerifyFresh: false,
    freshnessVerifyLogSha: null,
  };
}
