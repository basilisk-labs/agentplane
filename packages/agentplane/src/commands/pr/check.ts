import path from "node:path";
import { execFileAsync } from "@agentplaneorg/core/process";
import { resolveGhCommand } from "../shared/gh-transport.js";

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

import {
  checkGithubUnresolvedReviewThreads,
  throwIfGithubReviewThreadsUnresolved,
} from "./internal/github-review-threads.js";
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
import { computePrDiffstat } from "./internal/sync-branch.js";
import { tryLookupExistingGithubPrByBranch } from "./internal/sync-github.js";
import { waitForHostedChecks } from "./hosted-checks.js";
import { ghEnv } from "./internal/gh-api.js";

type GithubMergeDiagnostic = {
  mergeStateStatus?: string | null;
  reviewDecision?: string | null;
  autoMergeRequest?: unknown;
};

async function lookupGithubMergeDiagnostic(opts: {
  gitRoot: string;
  prNumber: number | null;
}): Promise<GithubMergeDiagnostic | null> {
  if (opts.prNumber === null) return null;
  const gh = resolveGhCommand();
  try {
    const { stdout } = await execFileAsync(
      gh.command,
      [
        ...gh.argsPrefix,
        "pr",
        "view",
        String(opts.prNumber),
        "--json",
        "mergeStateStatus,reviewDecision,autoMergeRequest",
      ],
      { cwd: opts.gitRoot, env: ghEnv(), maxBuffer: 1024 * 1024 },
    );
    return JSON.parse(stdout) as GithubMergeDiagnostic;
  } catch {
    return null;
  }
}

function mergeDiagnosticNextAction(diag: GithubMergeDiagnostic): string {
  const review = String(diag.reviewDecision ?? "").trim();
  if (review === "REVIEW_REQUIRED" || review === "CHANGES_REQUESTED") {
    return "request or resolve the required GitHub review, then rerun agentplane pr check --hosted";
  }
  if (diag.autoMergeRequest) {
    return "auto-merge is enabled; wait for GitHub branch protection to unblock or inspect the protection rule";
  }
  return "inspect GitHub branch protection or enable auto-merge through the integration route";
}

export async function cmdPrCheck(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  branch?: string;
  hosted?: boolean;
  stablePolls?: number;
  pollIntervalMs?: number;
  timeoutMs?: number;
  requiredChecks?: readonly string[];
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
      sourceBranch: null,
      texts: localTexts,
      meta: localParsed.meta,
      errors: localParsed.errors,
      freshnessEvaluated: false,
      freshnessReviewFresh: false,
      freshnessVerifySatisfied: false,
      freshnessVerifyFresh: false,
      freshnessVerifyLogSha: null,
    };

    const branchOverride = opts.branch?.trim() ?? "";
    const localBranch =
      branchOverride.length > 0 ? branchOverride : (localSnapshot.meta?.branch?.trim() ?? "");
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
    let currentDiffstatText: string | null = null;
    if (branchForFreshness && localSnapshot.meta?.base) {
      const currentDiffstat = await computePrDiffstat({
        gitRoot: resolved.gitRoot,
        baseBranch: localSnapshot.meta.base,
        branch: branchForFreshness,
        prDir,
        tasksPath: config.paths.tasks_path,
      });
      currentDiffstatText = currentDiffstat ? `${currentDiffstat}\n` : "";
    }
    await evaluateSnapshotFreshness({
      snapshot: localSnapshot,
      gitRoot: resolved.gitRoot,
      workflowDir: config.paths.workflow_dir,
      tasksPath: config.paths.tasks_path,
      taskId: task.id,
      branchHeadSha,
      currentDiffstatText,
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
      let branchCurrentDiffstatText = currentDiffstatText;
      if (branchCurrentDiffstatText === null && branchSnapshot.meta?.base) {
        const branchCurrentDiffstat = await computePrDiffstat({
          gitRoot: resolved.gitRoot,
          baseBranch: branchSnapshot.meta.base,
          branch: branchForFreshness,
          prDir,
          tasksPath: config.paths.tasks_path,
        });
        branchCurrentDiffstatText = branchCurrentDiffstat ? `${branchCurrentDiffstat}\n` : "";
      }
      await evaluateSnapshotFreshness({
        snapshot: branchSnapshot,
        gitRoot: resolved.gitRoot,
        workflowDir: config.paths.workflow_dir,
        tasksPath: config.paths.tasks_path,
        taskId: task.id,
        branchHeadSha,
        currentDiffstatText: branchCurrentDiffstatText,
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

    let prNumber =
      typeof selectedSnapshot.meta?.pr_number === "number" && selectedSnapshot.meta.pr_number > 0
        ? selectedSnapshot.meta.pr_number
        : null;
    if (prNumber === null && branchForFreshness) {
      const observedPr = await tryLookupExistingGithubPrByBranch({
        gitRoot: resolved.gitRoot,
        branch: branchForFreshness,
        baseBranch: selectedSnapshot.meta?.base ?? null,
      });
      prNumber = observedPr?.prNumber ?? null;
    }
    const reviewThreads = await checkGithubUnresolvedReviewThreads({
      gitRoot: resolved.gitRoot,
      prNumber,
    });
    if (reviewThreads.checked && prNumber !== null) {
      throwIfGithubReviewThreadsUnresolved({
        prNumber,
        unresolved: reviewThreads.unresolved,
      });
    }
    if (opts.hosted === true) {
      const hosted = await waitForHostedChecks({
        gitRoot: resolved.gitRoot,
        prNumber,
        stablePolls: opts.stablePolls ?? 2,
        pollIntervalMs: opts.pollIntervalMs ?? null,
        timeoutMs: opts.timeoutMs ?? null,
        requiredChecks: opts.requiredChecks ?? [],
      });
      output.success(
        "hosted checks",
        prNumber ? `#${prNumber}` : undefined,
        `total=${hosted.total} passing=${hosted.passing}`,
      );
    }

    const mergeDiagnostic = await lookupGithubMergeDiagnostic({
      gitRoot: resolved.gitRoot,
      prNumber,
    });
    if (mergeDiagnostic?.mergeStateStatus === "BLOCKED") {
      output.line(
        `merge_state: BLOCKED review=${mergeDiagnostic.reviewDecision ?? "unknown"} auto_merge=${mergeDiagnostic.autoMergeRequest ? "enabled" : "disabled"}`,
      );
      output.line(`next_action: ${mergeDiagnosticNextAction(mergeDiagnostic)}`);
    }

    output.line(
      [
        `artifact_source: ${selectedSnapshot.source}`,
        `artifact_branch=${selectedSnapshot.sourceBranch ?? branchForFreshness ?? "none"}`,
        `branch_head=${branchHeadSha ?? "unknown"}`,
        `meta_head=${selectedSnapshot.meta?.head_sha ?? "unknown"}`,
        `verify_status=${selectedSnapshot.meta?.verify?.status ?? "unknown"}`,
      ].join(" "),
    );
    output.success("pr check", path.relative(resolved.gitRoot, prDir));
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr check", root: opts.rootOverride ?? null });
  }
}
