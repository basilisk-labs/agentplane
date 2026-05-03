import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { validateAcrTarget } from "../acr/acr.command.js";

import { resolvePrPaths } from "./internal/pr-paths.js";
import {
  buildBranchSnapshot,
  evaluateSnapshotFreshness,
  finalizeSnapshotErrors,
  readLocalPrArtifactText,
  resolveArtifactBranch,
  resolveBranchHeadSha,
  type PrArtifactSnapshot,
  type PrArtifactTexts,
  validateSnapshotContents,
} from "./internal/pr-artifact-snapshot.js";

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
      artifactsLanguage: config.artifacts_language,
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
    const branchHeadSha = await resolveBranchHeadSha({
      gitRoot: resolved.gitRoot,
      branchForFreshness,
    });
    await evaluateSnapshotFreshness({
      snapshot: localSnapshot,
      gitRoot: resolved.gitRoot,
      workflowDir: config.paths.workflow_dir,
      tasksPath: config.paths.tasks_path,
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
      const branchSnapshot = await buildBranchSnapshot({
        resolved,
        prDir,
        relPrDir,
        relMetaPath,
        relDiffstatPath,
        relVerifyLogPath,
        relReviewPath,
        relGithubTitlePath,
        relGithubBodyPath,
        taskId: task.id,
        branchForFreshness,
        artifactsLanguage: config.artifacts_language,
      });
      await evaluateSnapshotFreshness({
        snapshot: branchSnapshot,
        gitRoot: resolved.gitRoot,
        workflowDir: config.paths.workflow_dir,
        tasksPath: config.paths.tasks_path,
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

    if (config.acr.require_for_pr_check) {
      if (!config.acr.enabled) {
        throw new CliError({
          exitCode: exitCodeForError("E_VALIDATION"),
          code: "E_VALIDATION",
          message: "ACR is required for pr check but acr.enabled=false.",
        });
      }
      await validateAcrTarget({
        ctx,
        target: task.id,
        mode: "ci",
        strict: true,
        requirePlanApproved: true,
        requireVerification: true,
        requirePolicyPass: true,
        allowWaivedVerification: false,
        allowManualOverride: false,
      });
    }

    output.success("pr check", path.relative(resolved.gitRoot, prDir));
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr check", root: opts.rootOverride ?? null });
  }
}
