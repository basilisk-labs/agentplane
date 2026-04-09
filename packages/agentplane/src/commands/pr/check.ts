import { readFile } from "node:fs/promises";
import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { fileExists } from "../../cli/fs-utils.js";
import { createCliEmitter, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { parsePrMeta, type PrMeta } from "../shared/pr-meta.js";
import {
  findWorktreeForBranch,
  gitListTaskBranches,
  parseTaskIdFromBranch,
} from "../shared/git-worktree.js";
import { gitRevParse } from "../shared/git-ops.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { readPrArtifactFromBranch, resolvePrPaths } from "./internal/pr-paths.js";
import {
  validateGithubPrBodyContents,
  validateReviewContents,
} from "./internal/review-template.js";
import { assessPrArtifactFreshness } from "./internal/freshness.js";

function isUnknownRevisionError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /unknown revision or path not in the working tree/i.test(message);
}

async function resolveArtifactBranch(opts: {
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

type PrArtifactTexts = {
  metaText: string | null;
  diffstatText: string | null;
  verifyLogText: string | null;
  reviewText: string | null;
  githubTitleText: string | null;
  githubBodyText: string | null;
};

type PrArtifactSnapshot = {
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

async function readLocalPrArtifactText(prDir: string, fileName: string): Promise<string | null> {
  const localPath = path.join(prDir, fileName);
  if (!(await fileExists(localPath))) return null;
  return await readFile(localPath, "utf8");
}

function validateSnapshotContents(opts: {
  texts: PrArtifactTexts;
  relPrDir: string;
  relMetaPath: string;
  relDiffstatPath: string;
  relVerifyLogPath: string;
  relReviewPath: string;
  relGithubTitlePath: string;
  relGithubBodyPath: string;
  taskId: string;
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
  if (!opts.texts.githubTitleText?.trim()) {
    errors.push(`Missing ${opts.relGithubTitlePath}`);
  }
  if (opts.texts.githubBodyText) {
    validateGithubPrBodyContents(opts.texts.githubBodyText, errors);
  } else {
    errors.push(`Missing ${opts.relGithubBodyPath}`);
  }
  return { meta, errors };
}

async function evaluateSnapshotFreshness(opts: {
  snapshot: PrArtifactSnapshot;
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  branchHeadSha: string | null;
  taskVerificationState: unknown;
  requiresVerify: boolean;
}): Promise<void> {
  if (!opts.snapshot.meta || !opts.branchHeadSha) return;
  const freshness = await assessPrArtifactFreshness({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
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

function finalizeSnapshotErrors(opts: {
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
      if ((!meta.last_verified_sha || !meta.last_verified_at) && !opts.snapshot.freshnessVerifyLogSha) {
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

export async function cmdPrCheck(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const output = createCliEmitter();
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const { task } = await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const {
      resolved,
      config,
      prDir,
      metaPath,
      diffstatPath,
      verifyLogPath,
      reviewPath,
      githubTitlePath,
      githubBodyPath,
    } = await resolvePrPaths({ ...opts, ctx });

    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    const errors: string[] = [];
    const relPrDir = path.relative(resolved.gitRoot, prDir);
    const relMetaPath = path.relative(resolved.gitRoot, metaPath);
    const relDiffstatPath = path.relative(resolved.gitRoot, diffstatPath);
    const relVerifyLogPath = path.relative(resolved.gitRoot, verifyLogPath);
    const relReviewPath = path.relative(resolved.gitRoot, reviewPath);
    const relGithubTitlePath = path.relative(resolved.gitRoot, githubTitlePath);
    const relGithubBodyPath = path.relative(resolved.gitRoot, githubBodyPath);
    const branchCache: { value?: string | null } = {};
    const requiresVerify = Boolean(task.verify && task.verify.length > 0);

    const localTexts: PrArtifactTexts = {
      metaText: await readLocalPrArtifactText(prDir, "meta.json"),
      diffstatText: await readLocalPrArtifactText(prDir, "diffstat.txt"),
      verifyLogText: await readLocalPrArtifactText(prDir, "verify.log"),
      reviewText: await readLocalPrArtifactText(prDir, "review.md"),
      githubTitleText: await readLocalPrArtifactText(prDir, "github-title.txt"),
      githubBodyText: await readLocalPrArtifactText(prDir, "github-body.md"),
    };
    const localParsed = validateSnapshotContents({
      texts: localTexts,
      relPrDir,
      relMetaPath,
      relDiffstatPath,
      relVerifyLogPath,
      relReviewPath,
      relGithubTitlePath,
      relGithubBodyPath,
      taskId: task.id,
    });
    const localSnapshot: PrArtifactSnapshot = {
      source: "local",
      texts: localTexts,
      meta: localParsed.meta,
      errors: localParsed.errors,
      freshnessEvaluated: false,
      freshnessReviewFresh: false,
      freshnessVerifySatisfied: false,
      freshnessVerifyFresh: false,
      freshnessVerifyLogSha: null,
    };

    const localBranch = localSnapshot.meta?.branch?.trim() ?? "";
    if (localBranch) {
      branchCache.value = localBranch;
    } else if (branchCache.value === undefined) {
      branchCache.value = await resolveArtifactBranch({
        ctx,
        resolved,
        taskId: task.id,
      });
    }
    const branchForFreshness = branchCache.value ?? null;
    let branchHeadSha: string | null = null;
    if (branchForFreshness) {
      try {
        branchHeadSha = await gitRevParse(resolved.gitRoot, [branchForFreshness]);
      } catch (err) {
        if (!isUnknownRevisionError(err)) throw err;
      }
    }
    await evaluateSnapshotFreshness({
      snapshot: localSnapshot,
      gitRoot: resolved.gitRoot,
      workflowDir: config.paths.workflow_dir,
      taskId: task.id,
      branchHeadSha,
      taskVerificationState: task.verification?.state ?? null,
      requiresVerify,
    });

    let selectedSnapshot = localSnapshot;
    if (
      branchForFreshness &&
      branchHeadSha &&
      (!localSnapshot.meta ||
        !localSnapshot.freshnessReviewFresh ||
        (requiresVerify && !localSnapshot.freshnessVerifySatisfied))
    ) {
      const worktreePath = await findWorktreeForBranch(resolved.gitRoot, branchForFreshness);
      const branchTexts: PrArtifactTexts = {
        metaText: await readPrArtifactFromBranch({
          resolved,
          prDir,
          fileName: "meta.json",
          branch: branchForFreshness,
          worktreePath,
        }),
        diffstatText: await readPrArtifactFromBranch({
          resolved,
          prDir,
          fileName: "diffstat.txt",
          branch: branchForFreshness,
          worktreePath,
        }),
        verifyLogText: await readPrArtifactFromBranch({
          resolved,
          prDir,
          fileName: "verify.log",
          branch: branchForFreshness,
          worktreePath,
        }),
        reviewText: await readPrArtifactFromBranch({
          resolved,
          prDir,
          fileName: "review.md",
          branch: branchForFreshness,
          worktreePath,
        }),
        githubTitleText: await readPrArtifactFromBranch({
          resolved,
          prDir,
          fileName: "github-title.txt",
          branch: branchForFreshness,
          worktreePath,
        }),
        githubBodyText: await readPrArtifactFromBranch({
          resolved,
          prDir,
          fileName: "github-body.md",
          branch: branchForFreshness,
          worktreePath,
        }),
      };
      const branchParsed = validateSnapshotContents({
        texts: branchTexts,
        relPrDir,
        relMetaPath,
        relDiffstatPath,
        relVerifyLogPath,
        relReviewPath,
        relGithubTitlePath,
        relGithubBodyPath,
        taskId: task.id,
      });
      const branchSnapshot: PrArtifactSnapshot = {
        source: "branch",
        texts: branchTexts,
        meta: branchParsed.meta,
        errors: branchParsed.errors,
        freshnessEvaluated: false,
        freshnessReviewFresh: false,
        freshnessVerifySatisfied: false,
        freshnessVerifyFresh: false,
        freshnessVerifyLogSha: null,
      };
      await evaluateSnapshotFreshness({
        snapshot: branchSnapshot,
        gitRoot: resolved.gitRoot,
        workflowDir: config.paths.workflow_dir,
        taskId: task.id,
        branchHeadSha,
        taskVerificationState: task.verification?.state ?? null,
        requiresVerify,
      });
      if (
        branchSnapshot.errors.length === 0 &&
        branchSnapshot.meta &&
        branchSnapshot.freshnessReviewFresh &&
        (!requiresVerify || branchSnapshot.freshnessVerifySatisfied)
      ) {
        selectedSnapshot = branchSnapshot;
      }
    }

    errors.push(
      ...finalizeSnapshotErrors({
        snapshot: selectedSnapshot,
        branchHeadSha,
        requiresVerify,
      }),
    );

    if (errors.length > 0) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: errors.join("\n"),
      });
    }

    output.success("pr check", path.relative(resolved.gitRoot, prDir));
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr check", root: opts.rootOverride ?? null });
  }
}
