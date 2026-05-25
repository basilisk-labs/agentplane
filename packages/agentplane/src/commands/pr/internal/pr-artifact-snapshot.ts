import { readFile } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../../../cli/fs-utils.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { gitRevParse } from "../../shared/git-ops.js";
import {
  assessPrArtifactFreshness,
  digestPrDiffstatText,
  PR_DIFFSTAT_DIGEST_FIELD,
  PR_LAST_VERIFIED_DIFFSTAT_DIGEST_FIELD,
} from "./freshness.js";
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
  gitEnv,
  gitListTaskBranches,
  parseTaskIdFromBranch,
} from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

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
  const branches = await listTaskBranchCandidates(opts.resolved.gitRoot, prefix);
  const matches = branches.filter((branch) => parseCandidateTaskId(prefix, branch) === opts.taskId);
  const uniqueMatches = uniqueTaskBranchMatches(matches);
  if (uniqueMatches.length === 1) return uniqueMatches[0]?.branch ?? null;
  if (uniqueMatches.length > 1) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Multiple task branches match ${opts.taskId}: ${uniqueMatches.map((match) => match.branch).join(", ")}`,
    });
  }
  return null;
}

function stripOriginPrefix(branch: string): string {
  return branch.startsWith("origin/") ? branch.slice("origin/".length) : branch;
}

function parseCandidateTaskId(prefix: string, branch: string): string | null {
  return parseTaskIdFromBranch(prefix, stripOriginPrefix(branch));
}

async function listRemoteTaskBranches(cwd: string, prefix: string): Promise<string[]> {
  const normalized = normalizeBranchPrefix(prefix);
  if (!normalized) return [];
  const { stdout } = await execFileAsync(
    "git",
    [
      "for-each-ref",
      "--format=%(refname:short)",
      `refs/remotes/origin/${normalized}`,
      `refs/remotes/origin/${normalized}/`,
    ],
    {
      cwd,
      env: gitEnv(),
    },
  );
  return String(stdout)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.endsWith("/HEAD"));
}

function normalizeBranchPrefix(prefix: string): string {
  let start = 0;
  let end = prefix.length;
  while (start < end && prefix[start] === "/") start += 1;
  while (end > start && prefix[end - 1] === "/") end -= 1;
  return prefix.slice(start, end);
}

async function listTaskBranchCandidates(cwd: string, prefix: string): Promise<string[]> {
  const localBranches = await gitListTaskBranches(cwd, prefix);
  const remoteBranches = await listRemoteTaskBranches(cwd, prefix);
  return [...localBranches, ...remoteBranches];
}

function uniqueTaskBranchMatches(branches: string[]): { branch: string; key: string }[] {
  const matches: { branch: string; key: string }[] = [];
  const seen = new Set<string>();
  for (const branch of branches) {
    const key = stripOriginPrefix(branch);
    if (seen.has(key)) continue;
    seen.add(key);
    matches.push({ branch, key });
  }
  return matches;
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
  currentDiffstatText: string | null;
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
    metaDiffstatDigest: opts.snapshot.meta[PR_DIFFSTAT_DIGEST_FIELD] ?? null,
    metaLastVerifiedDiffstatDigest:
      opts.snapshot.meta[PR_LAST_VERIFIED_DIFFSTAT_DIGEST_FIELD] ?? null,
    currentDiffstatDigest:
      opts.currentDiffstatText === null ? null : digestPrDiffstatText(opts.currentDiffstatText),
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
        `PR artifacts stale: recorded_head=${meta.head_sha ?? "<live>"} current_head=${opts.branchHeadSha}`,
      );
    }
    if (opts.requiresVerify && !opts.snapshot.freshnessVerifySatisfied) {
      if (meta.verify?.status !== "pass") {
        errors.push("Verify requirements not satisfied (meta.verify.status != pass)");
      }
      if (!meta.last_verified_at && !opts.snapshot.freshnessVerifyLogSha) {
        errors.push("Verify metadata missing (last_verified_at)");
      }
    }
    const lastVerifiedDiffstatDigest = meta[PR_LAST_VERIFIED_DIFFSTAT_DIGEST_FIELD];
    if (
      opts.requiresVerify &&
      (meta.last_verified_sha || lastVerifiedDiffstatDigest) &&
      !opts.snapshot.freshnessVerifyFresh
    ) {
      errors.push(
        `Verify state stale: recorded_verify=${String(meta.last_verified_sha ?? lastVerifiedDiffstatDigest)}`,
      );
    }
    return errors;
  }
  if (opts.requiresVerify) {
    if (meta.verify?.status !== "pass") {
      errors.push("Verify requirements not satisfied (meta.verify.status != pass)");
    }
    if (!meta.last_verified_at) {
      errors.push("Verify metadata missing (last_verified_at)");
    }
  }
  return errors;
}

export async function resolveBranchHeadSha(opts: {
  gitRoot: string;
  branchForFreshness: string | null;
}): Promise<string | null> {
  if (!opts.branchForFreshness) return null;
  const refsToTry = candidateBranchRefs(opts.branchForFreshness);
  for (const ref of refsToTry) {
    try {
      return await gitRevParse(opts.gitRoot, [ref]);
    } catch (err) {
      if (!isUnknownRevisionError(err)) throw err;
    }
  }
  return null;
}

function candidateBranchRefs(branch: string): string[] {
  const trimmed = branch.trim();
  if (!trimmed || trimmed.startsWith("origin/")) return trimmed ? [trimmed] : [];
  return [trimmed, `origin/${trimmed}`];
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
  const worktreePath = opts.branchForFreshness.startsWith("origin/")
    ? null
    : await findWorktreeForBranch(opts.resolved.gitRoot, opts.branchForFreshness);
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
