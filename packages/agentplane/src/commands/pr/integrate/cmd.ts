import path from "node:path";

import { mapBackendError } from "../../../cli/error-map.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { createCliEmitter } from "../../../cli/output.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../../shared/errors.js";

import { cleanupMergedLocalBranch as cleanupIntegratedBranch } from "../../shared/merged-branch-cleanup.js";
import {
  renderPostIntegrateBootstrapFailureGuidance,
  renderPostIntegrateBootstrapGuidance,
  shouldRecommendPostIntegrateBootstrap,
} from "./internal/bootstrap-guidance.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { gitRevParse } from "../../shared/git-ops.js";
import type { CommandContext } from "../../shared/task-backend.js";
import {
  buildTaskHandoffArtifact,
  resolveTaskHandoffPaths,
  writeTaskHandoff,
} from "../../shared/task-handoff.js";

import { finalizeIntegrate } from "./internal/finalize.js";
import { runMergeCommit, runRebaseFastForward, runSquashMerge } from "./internal/merge.js";
import { maybeRunPreIntegrateBootstrap } from "./internal/pre-integrate-bootstrap.js";
import { maybeRunPostIntegrateBootstrap } from "./internal/post-integrate-bootstrap.js";
import { prepareIntegrate } from "./internal/prepare.js";
import { resolveWorktreeForIntegrate } from "./internal/worktree.js";
import { runVerifyCommands } from "./verify.js";

function summarizeGhMergeFailure(err: unknown): string {
  const stderr =
    typeof (err as { stderr?: unknown } | null)?.stderr === "string"
      ? String((err as { stderr?: unknown }).stderr).trim()
      : "";
  const stdout =
    typeof (err as { stdout?: unknown } | null)?.stdout === "string"
      ? String((err as { stdout?: unknown }).stdout).trim()
      : "";
  const message = err instanceof Error ? err.message.trim() : String(err).trim();
  return stderr || stdout || message || "unknown failure";
}

async function runProtectedBaseGithubMerge(opts: {
  gitRoot: string;
  prTarget: string;
}): Promise<{ status: "merged" | "auto_merge_enabled"; detail: string }> {
  try {
    await execFileAsync("gh", ["pr", "merge", "--merge", "--delete-branch", opts.prTarget], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    return { status: "merged", detail: `GitHub PR merged with --merge: ${opts.prTarget}` };
  } catch (directErr) {
    try {
      await execFileAsync(
        "gh",
        ["pr", "merge", "--auto", "--merge", "--delete-branch", opts.prTarget],
        {
          cwd: opts.gitRoot,
          env: gitEnv(),
        },
      );
      return {
        status: "auto_merge_enabled",
        detail: `GitHub auto-merge enabled with --merge: ${opts.prTarget}`,
      };
    } catch (autoErr) {
      throw new CliError({
        exitCode: exitCodeForError("E_HANDOFF"),
        code: "E_HANDOFF",
        message:
          "Unable to merge protected-base GitHub PR automatically. " +
          `direct=${summarizeGhMergeFailure(directErr)}; auto=${summarizeGhMergeFailure(autoErr)}`,
      });
    }
  }
}

async function recordProtectedBaseIntegrateHandoff(opts: {
  ctx: CommandContext;
  taskId: string;
  branch: string;
  base: string;
  branchHeadSha: string | null;
  prNumber: number | null;
  prUrl: string | null;
}): Promise<void> {
  const paths = resolveTaskHandoffPaths({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.taskId,
  });
  const handoffShowCommand = `agentplane task handoff show ${opts.taskId}`;
  const prLabel =
    typeof opts.prNumber === "number" && opts.prNumber > 0
      ? `GitHub PR #${opts.prNumber}`
      : `the GitHub PR for branch ${opts.branch}`;
  const prUrl = opts.prUrl?.trim() ?? "";
  const prMetaPath = path.join(opts.ctx.config.paths.workflow_dir, opts.taskId, "pr", "meta.json");
  const taskReadmePath = path.join(opts.ctx.config.paths.workflow_dir, opts.taskId, "README.md");
  await writeTaskHandoff({
    paths,
    handoff: buildTaskHandoffArtifact({
      task_id: opts.taskId,
      created_at: new Date().toISOString(),
      from_role: "INTEGRATOR",
      reason: `Protected base ${opts.base} requires GitHub pull-request merges.`,
      note:
        prUrl.length > 0
          ? `Merge ${prLabel}: ${prUrl}. After GitHub merge, wait for Task Hosted Close, then pull ${opts.base}.`
          : `Merge ${prLabel} on GitHub. After GitHub merge, wait for Task Hosted Close, then pull ${opts.base}.`,
      branch: opts.branch,
      base_branch: opts.base,
      head_sha: opts.branchHeadSha,
      workspace_root: opts.ctx.resolvedProject.gitRoot,
      pr_branch: opts.branch,
      route: {
        kind: "protected_base_integrate",
        status: "awaiting_github_merge",
        local_mutation: "not_performed",
        finalize_via: "github_pr_merge_then_hosted_close",
        pr_number: opts.prNumber,
        pr_url: prUrl.length > 0 ? prUrl : null,
        handoff_show_command: handoffShowCommand,
        base_pull_command: "git pull --ff-only",
      },
      next_actions: [
        handoffShowCommand,
        prUrl.length > 0 ? `Merge ${prLabel}: ${prUrl}` : `Merge ${prLabel} on GitHub`,
        `Wait for Task Hosted Close to finish`,
        `git pull --ff-only`,
      ],
      evidence_paths: [taskReadmePath, prMetaPath],
    }),
  });
}

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
      const prNumber =
        typeof metaSource.pr_number === "number" && metaSource.pr_number > 0
          ? metaSource.pr_number
          : null;
      const prUrl = typeof metaSource.pr_url === "string" ? metaSource.pr_url : null;
      const prUrlTarget = prUrl?.trim() ?? "";
      const prTarget =
        prUrlTarget.length > 0 ? prUrlTarget : prNumber === null ? "" : String(prNumber);
      const prHint =
        prNumber === null ? `the GitHub PR for branch ${branch}` : `GitHub PR #${prNumber}`;
      let protectedBaseMergeFailure: string | null = null;
      if (prTarget) {
        try {
          const githubMerge = await runProtectedBaseGithubMerge({
            gitRoot: resolved.gitRoot,
            prTarget,
          });
          if (githubMerge.status === "merged") {
            if (!opts.quiet) output.success("integrate github merge", task.id, githubMerge.detail);
            return 0;
          }
          await recordProtectedBaseIntegrateHandoff({
            ctx: prepared.ctx,
            taskId: task.id,
            branch,
            base,
            branchHeadSha,
            prNumber,
            prUrl,
          });
          throw new CliError({
            exitCode: exitCodeForError("E_HANDOFF"),
            code: "E_HANDOFF",
            message: `${githubMerge.detail}. Wait for GitHub to merge the PR, let Task Hosted Close finish the closure tail, then pull ${base}.`,
            context: withDiagnosticContext(
              {
                task_id: task.id,
                branch,
                base_branch: base,
                reason_code: "protected_base_auto_merge_enabled",
              },
              {
                state: `protected-base auto-merge enabled for ${task.id}`,
                likelyCause: `base branch ${base} is protected and GitHub accepted auto-merge instead of immediate merge`,
                hint: "Wait for GitHub auto-merge and Task Hosted Close, then pull the base branch.",
                nextAction: {
                  command: `git pull --ff-only`,
                  reason:
                    "refresh the base checkout after GitHub completes the protected-base merge",
                  reasonCode: "protected_base_auto_merge_wait",
                },
              },
            ),
          });
        } catch (err) {
          if (!(err instanceof CliError) || err.code !== "E_HANDOFF") throw err;
          if (err.context?.reason_code === "protected_base_auto_merge_enabled") throw err;
          protectedBaseMergeFailure = err.message;
        }
      }
      await recordProtectedBaseIntegrateHandoff({
        ctx: prepared.ctx,
        taskId: task.id,
        branch,
        base,
        branchHeadSha,
        prNumber,
        prUrl,
      });
      throw new CliError({
        exitCode: exitCodeForError("E_HANDOFF"),
        code: "E_HANDOFF",
        message:
          `Base branch ${base} requires GitHub pull-request merges; integrate will not mutate it locally. ` +
          (protectedBaseMergeFailure ? `${protectedBaseMergeFailure}. ` : "") +
          `Merge ${prHint} on GitHub, let Task Hosted Close finish the closure tail, then pull ${base}.`,
        context: withDiagnosticContext(
          {
            task_id: task.id,
            branch,
            base_branch: base,
            reason_code: "protected_base_integrate_handoff",
          },
          {
            state: `protected-base integrate routed to GitHub merge handoff for ${task.id}`,
            likelyCause: `base branch ${base} is protected by a GitHub pull-request merge policy, so local integrate must stop before mutating ${base}`,
            hint: "Inspect the persisted handoff artifact for the canonical finalize route, then merge the PR on GitHub and let Task Hosted Close finish the close tail.",
            nextAction: {
              command: `agentplane task handoff show ${task.id}`,
              reason: "inspect the persisted protected-base finalize route before continuing",
              reasonCode: "protected_base_integrate_handoff",
            },
          },
        ),
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
