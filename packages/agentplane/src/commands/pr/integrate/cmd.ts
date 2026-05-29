import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { mapBackendError } from "../../../cli/error-map.js";
import { createCliEmitter } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";

import { cleanupMergedLocalBranch as cleanupIntegratedBranch } from "../../shared/merged-branch-cleanup.js";
import {
  renderPostIntegrateBootstrapFailureGuidance,
  renderPostIntegrateBootstrapGuidance,
  shouldRecommendPostIntegrateBootstrap,
} from "./internal/bootstrap-guidance.js";
import { PolicyEngine } from "../../../policy/engine.js";
import { gitRevParse } from "../../shared/git-ops.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { throwIfPolicyDecisionDenied } from "../../shared/policy-deny.js";

import { finalizeIntegrate } from "./internal/finalize.js";
import { runMergeCommit, runRebaseFastForward, runSquashMerge } from "./internal/merge.js";
import { maybeRunPreIntegrateBootstrap } from "./internal/pre-integrate-bootstrap.js";
import { maybeRunPostIntegrateBootstrap } from "./internal/post-integrate-bootstrap.js";
import { prepareIntegrate } from "./internal/prepare.js";
import { handleProtectedBaseIntegrate } from "./internal/protected-base-handoff.js";
import { resolveWorktreeForIntegrate } from "./internal/worktree.js";
import { runVerifyCommands } from "./verify.js";

export async function cmdIntegrate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  branch?: string;
  base?: string;
  mergeStrategy: "squash" | "merge" | "rebase";
  runVerify: boolean;
  dryRun: boolean;
  quiet: boolean;
}): Promise<number> {
  let tempWorktreePath: string | null = null;
  let createdTempWorktree = false;
  const output = createCliEmitter();

  try {
    const prepared = await prepareIntegrate({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      branch: opts.branch,
      base: opts.base,
      runVerify: opts.runVerify,
    });

    const {
      resolved,
      loadedConfig,
      task,
      prDir,
      metaPath,
      diffstatPath,
      verifyLogPath,
      metaSource,
      branch,
      base,
      verifyLogText,
      protectedBaseRequiresPrMerge,
    } = prepared;

    const verifyCommands = prepared.verifyCommands;
    let alreadyVerifiedSha = prepared.alreadyVerifiedSha;
    let shouldRunVerify = prepared.shouldRunVerify;
    let branchHeadSha = prepared.branchHeadSha;
    const changedPaths = prepared.changedPaths;

    throwIfPolicyDecisionDenied(
      new PolicyEngine().evaluate({
        action: "integrate",
        phase: "integrate",
        config: prepared.ctx.config,
        taskId: task.id,
        task: {
          status: task.status,
          planApprovalState: task.plan_approval?.state ?? null,
          verificationState: task.verification?.state ?? null,
          workflowMode: prepared.ctx.config.workflow_mode,
        },
        git: { stagedPaths: [], currentBranch: base, baseBranch: base },
      }),
    );

    if (opts.dryRun) {
      if (!opts.quiet) {
        output.success(
          "integrate dry-run",
          task.id,
          `base=${base} branch=${branch} verify=${shouldRunVerify ? "yes" : "no"} route=${protectedBaseRequiresPrMerge ? "github-pr" : "local"}`,
        );
      }
      return 0;
    }

    if (protectedBaseRequiresPrMerge) {
      await handleProtectedBaseIntegrate({
        ctx: prepared.ctx,
        taskId: task.id,
        branch,
        base,
        branchHeadSha,
        metaSource,
      });
    }

    const wt = await resolveWorktreeForIntegrate({
      gitRoot: resolved.gitRoot,
      worktreesDirRel: loadedConfig.paths.worktrees_dir,
      branch,
      taskId: task.id,
      mergeStrategy: opts.mergeStrategy,
      shouldRunVerify,
    });
    let worktreePath = wt.worktreePath;
    tempWorktreePath = wt.tempWorktreePath;
    createdTempWorktree = wt.createdTempWorktree;

    const verifyEntries: { header: string; content: string }[] = [];
    if (opts.mergeStrategy !== "rebase" && shouldRunVerify && verifyCommands.length > 0) {
      if (!worktreePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Unable to locate or create a worktree for verify execution",
        });
      }
      verifyEntries.push(
        ...(await runVerifyCommands({
          commands: verifyCommands,
          worktreePath,
          branchHeadSha,
          quiet: opts.quiet,
          taskId: task.id,
        })),
      );
    }

    const preBootstrapResult = await maybeRunPreIntegrateBootstrap({
      gitRoot: resolved.gitRoot,
      changedPaths,
    });
    if (preBootstrapResult.status === "failed") {
      throw new CliError({
        exitCode: 8,
        code: "E_RUNTIME",
        message:
          "Unable to prepare the base worktree for integrate: automatic repo-local runtime refresh " +
          `failed (${preBootstrapResult.error}). Run \`bun run framework:dev:bootstrap\` in ${resolved.gitRoot} and retry integrate.`,
      });
    }

    const baseShaBeforeMerge = await gitRevParse(resolved.gitRoot, [base]);
    const headBeforeMerge = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    let mergeHash = "";

    if (opts.mergeStrategy === "squash") {
      mergeHash = await runSquashMerge({
        gitRoot: resolved.gitRoot,
        base,
        branch,
        headBeforeMerge,
        taskId: task.id,
        taskTitle: task.title,
        taskTags: task.tags,
        workflowDir: loadedConfig.paths.workflow_dir,
        changedPaths,
        genericTokens: loadedConfig.commit.generic_tokens,
      });
    } else if (opts.mergeStrategy === "merge") {
      mergeHash = await runMergeCommit({
        gitRoot: resolved.gitRoot,
        branch,
        taskId: task.id,
        taskTitle: task.title,
        taskTags: task.tags,
        workflowDir: loadedConfig.paths.workflow_dir,
        changedPaths,
      });
    } else {
      if (!worktreePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "rebase strategy requires an existing worktree for the task branch",
        });
      }

      const rebaseRes = await runRebaseFastForward({
        gitRoot: resolved.gitRoot,
        worktreePath,
        base,
        branch,
        headBeforeMerge,
        rawVerify: task.verify,
        metaSource: metaSource ?? null,
        verifyLogText,
        runVerify: opts.runVerify,
        verifyCommands,
        alreadyVerifiedSha,
        shouldRunVerify,
        quiet: opts.quiet,
        taskId: task.id,
        workflowDir: loadedConfig.paths.workflow_dir,
        changedPaths,
      });

      mergeHash = rebaseRes.mergeHash;
      branchHeadSha = rebaseRes.branchHeadSha;
      alreadyVerifiedSha = rebaseRes.alreadyVerifiedSha;
      shouldRunVerify = rebaseRes.shouldRunVerify;
      verifyEntries.push(...rebaseRes.verifyEntries);
    }

    await finalizeIntegrate({
      ctx: prepared.ctx,
      task,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      gitRoot: resolved.gitRoot,
      prDir,
      metaPath,
      diffstatPath,
      verifyLogPath,
      taskId: task.id,
      branch,
      base,
      mergeStrategy: opts.mergeStrategy,
      mergeHash,
      branchHeadSha,
      baseShaBeforeMerge,
      verifyEntries,
      verifyCommands,
      alreadyVerifiedSha,
      shouldRunVerify,
      quiet: opts.quiet,
    });

    const cleanup = await cleanupIntegratedBranch({
      gitRoot: resolved.gitRoot,
      branch,
      worktreePathHint: worktreePath,
    });
    if (
      cleanup.removedWorktree &&
      cleanup.worktreePath &&
      tempWorktreePath &&
      path.resolve(cleanup.worktreePath) === path.resolve(tempWorktreePath)
    ) {
      tempWorktreePath = null;
      createdTempWorktree = false;
    }

    if (shouldRecommendPostIntegrateBootstrap(changedPaths)) {
      const bootstrapResult = await maybeRunPostIntegrateBootstrap({
        gitRoot: resolved.gitRoot,
        changedPaths,
      });
      if (!opts.quiet) {
        if (bootstrapResult.status === "skipped") {
          output.warn(renderPostIntegrateBootstrapGuidance());
        } else if (bootstrapResult.status === "failed") {
          output.warn(renderPostIntegrateBootstrapFailureGuidance(bootstrapResult.error));
        }
      }
    }

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "integrate", root: opts.rootOverride ?? null });
  } finally {
    if (createdTempWorktree && tempWorktreePath) {
      try {
        await execFileAsync("git", ["worktree", "remove", "--force", tempWorktreePath], {
          cwd: opts.cwd,
          env: gitEnv(),
        });
      } catch {
        // ignore cleanup errors
      }
    }
  }
}
