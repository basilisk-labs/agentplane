import { readFile } from "node:fs/promises";
import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { fileExists } from "../../cli/fs-utils.js";
import { createCliEmitter, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { parsePrMeta, type PrMeta } from "../shared/pr-meta.js";
import { gitListTaskBranches, parseTaskIdFromBranch } from "../shared/git-worktree.js";
import { gitRevParse } from "../shared/git-ops.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { readPrArtifact, resolvePrPaths } from "./internal/pr-paths.js";
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

async function readPrArtifactWithOptionalBranch(opts: {
  ctx: CommandContext;
  resolved: { gitRoot: string };
  prDir: string;
  fileName: string;
  taskId: string;
  branchCache: { value?: string | null };
}): Promise<string | null> {
  const localPath = path.join(opts.prDir, opts.fileName);
  if (await fileExists(localPath)) {
    return await readFile(localPath, "utf8");
  }
  if (opts.branchCache.value === undefined) {
    opts.branchCache.value = await resolveArtifactBranch({
      ctx: opts.ctx,
      resolved: opts.resolved,
      taskId: opts.taskId,
    });
  }
  if (!opts.branchCache.value) return null;
  return await readPrArtifact({
    resolved: opts.resolved,
    prDir: opts.prDir,
    fileName: opts.fileName,
    branch: opts.branchCache.value,
  });
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

    let meta: PrMeta | null = null;
    const metaText = await readPrArtifactWithOptionalBranch({
      ctx,
      resolved,
      prDir,
      fileName: "meta.json",
      taskId: task.id,
      branchCache,
    });
    if (metaText) {
      try {
        meta = parsePrMeta(metaText, task.id);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push(message);
      }
    } else {
      errors.push(`Missing PR directory: ${relPrDir}`, `Missing ${relMetaPath}`);
    }

    const diffstatText = await readPrArtifactWithOptionalBranch({
      ctx,
      resolved,
      prDir,
      fileName: "diffstat.txt",
      taskId: task.id,
      branchCache,
    });
    if (diffstatText === null) {
      errors.push(`Missing ${relDiffstatPath}`);
    }

    const verifyLogText = await readPrArtifactWithOptionalBranch({
      ctx,
      resolved,
      prDir,
      fileName: "verify.log",
      taskId: task.id,
      branchCache,
    });
    if (verifyLogText === null) {
      errors.push(`Missing ${relVerifyLogPath}`);
    }

    const reviewText = await readPrArtifactWithOptionalBranch({
      ctx,
      resolved,
      prDir,
      fileName: "review.md",
      taskId: task.id,
      branchCache,
    });
    if (reviewText) {
      validateReviewContents(reviewText, errors);
    } else {
      errors.push(`Missing ${relReviewPath}`);
    }

    const githubTitleText = await readPrArtifactWithOptionalBranch({
      ctx,
      resolved,
      prDir,
      fileName: "github-title.txt",
      taskId: task.id,
      branchCache,
    });
    if (!githubTitleText?.trim()) {
      errors.push(`Missing ${relGithubTitlePath}`);
    }

    const githubBodyText = await readPrArtifactWithOptionalBranch({
      ctx,
      resolved,
      prDir,
      fileName: "github-body.md",
      taskId: task.id,
      branchCache,
    });
    if (githubBodyText) {
      validateGithubPrBodyContents(githubBodyText, errors);
    } else {
      errors.push(`Missing ${relGithubBodyPath}`);
    }

    const branchForFreshness =
      branchCache.value ?? (typeof meta?.branch === "string" ? meta.branch.trim() : null);
    let evaluatedVerifyFreshness = false;
    if (meta && branchForFreshness) {
      let branchHeadSha: string | null = null;
      try {
        branchHeadSha = await gitRevParse(resolved.gitRoot, [branchForFreshness]);
      } catch (err) {
        if (!isUnknownRevisionError(err)) throw err;
      }
      if (branchHeadSha) {
        const freshness = await assessPrArtifactFreshness({
          gitRoot: resolved.gitRoot,
          workflowDir: config.paths.workflow_dir,
          taskId: task.id,
          branchHeadSha,
          metaHeadSha: meta.head_sha ?? null,
          metaLastVerifiedSha: meta.last_verified_sha ?? null,
          metaVerifyStatus: meta.verify?.status ?? null,
          taskVerificationState: task.verification?.state ?? null,
          verifyLogText,
          requiresVerify,
        });
        evaluatedVerifyFreshness = requiresVerify;
        if (!freshness.reviewFresh) {
          errors.push(
            `PR artifacts stale: head_sha=${meta.head_sha ?? "<missing>"} current_head=${branchHeadSha}`,
          );
        }
        if (requiresVerify && !freshness.verifySatisfied) {
          if (meta?.verify?.status !== "pass") {
            errors.push("Verify requirements not satisfied (meta.verify.status != pass)");
          }
          if (
            (!meta?.last_verified_sha || !meta.last_verified_at) &&
            freshness.verifyLogSha === null
          ) {
            errors.push("Verify metadata missing (last_verified_sha/last_verified_at)");
          }
        }
        if (requiresVerify && meta.last_verified_sha && !freshness.verifyFresh) {
          errors.push(
            `Verify state stale: last_verified_sha=${meta.last_verified_sha} current_head=${branchHeadSha}`,
          );
        }
      }
    }

    if (requiresVerify && !evaluatedVerifyFreshness) {
      if (meta?.verify?.status !== "pass") {
        errors.push("Verify requirements not satisfied (meta.verify.status != pass)");
      }
      if (!meta?.last_verified_sha || !meta.last_verified_at) {
        errors.push("Verify metadata missing (last_verified_sha/last_verified_at)");
      }
    }

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
