import { mapCoreError } from "../../../cli/error-map.js";
import { infoMessage, successMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { refreshBranchPrArtifactsAfterTaskCommit } from "../../shared/post-commit-pr-artifacts.js";
import { loadCommandContext, type CommandContext } from "../../shared/task-backend.js";
import { ensureReconciledBeforeMutation } from "../../shared/reconcile-check.js";
import { stageAllowlist } from "./allow.js";
import { cmdCloseCommit } from "./commit-close.js";
import { asCommitFailure } from "./commit-diagnostics.js";
import { appendDcoSignoff } from "./dco.js";
import { buildGitCommitEnv, resolveCanonicalGitIdentity } from "./env.js";
import { commitRefreshedTaskArtifacts, formatCommitRef } from "./commit-refresh.js";
import { hasExplicitCommitScope, stageActiveTaskArtifactsFromAllowTasks } from "./commit-stage.js";
import { runCommitWithLock } from "./commit-runner.js";
import { guardCommitCheck } from "./policy.js";

export async function cmdCommit(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  baseBranchOverride?: string | null;
  taskId: string;
  message: string;
  close: boolean;
  allow: string[];
  autoAllow: boolean;
  allowTasks: boolean;
  allowBase: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
  requireClean: boolean;
  quiet: boolean;
  closeUnstageOthers: boolean;
  closeCheckOnly: boolean;
  closeStageTaskArtifacts?: boolean;
  closeRefreshTaskArtifacts?: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));

    if (opts.close) {
      return await cmdCloseCommit({ ...opts, ctx });
    }

    if (opts.autoAllow) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--auto-allow is disabled; pass explicit --allow <path-prefix>.",
      });
    }

    await ensureReconciledBeforeMutation({ ctx, command: "commit" });

    let autoStaged: string[] = [];
    const staged = await ctx.git.statusStagedPaths();
    if (staged.length === 0) {
      if (!hasExplicitCommitScope(opts)) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message:
            "No staged files and no commit allowlist. Pass --allow <path-prefix>, use --allow-tasks for active task artifacts, or stage files manually.",
        });
      }
      autoStaged = await stageAllowlist({
        ctx,
        allow: opts.allow,
        allowTasks: opts.allowTasks,
        allowPolicy: opts.allowPolicy,
        allowConfig: opts.allowConfig,
        allowHooks: opts.allowHooks,
        allowCI: opts.allowCI,
        tasksPath: ctx.config.paths.tasks_path,
        workflowDir: ctx.config.paths.workflow_dir,
        taskId: opts.taskId,
        allowTaskOnly: true,
        emptyAllowMessage:
          "No staged files and no commit allowlist. Pass --allow <path-prefix>, use --allow-tasks for active task artifacts, or stage files manually.",
        noMatchMessage:
          "No changed files matched the commit allowlist (adjust --allow, protected allow flags, or --allow-tasks; otherwise stage files manually).",
        mutationKind: "implementation_commit",
      });
      if (!opts.quiet) {
        process.stdout.write(
          `${infoMessage(`commit auto-staged ${autoStaged.length} path(s) from allowlist`)}\n`,
        );
      }
    } else {
      autoStaged = await stageActiveTaskArtifactsFromAllowTasks({
        ctx,
        taskId: opts.taskId,
        allowTasks: opts.allowTasks,
      });
      if (autoStaged.length > 0 && !opts.quiet) {
        process.stdout.write(
          `${infoMessage(
            `commit auto-staged ${autoStaged.length} active task artifact path(s) from --allow-tasks`,
          )}\n`,
        );
      }
    }

    await guardCommitCheck({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      baseBranchOverride: opts.baseBranchOverride ?? null,
      taskId: opts.taskId,
      message: opts.message,
      allow: opts.allow,
      allowBase: opts.allowBase,
      allowTasks: opts.allowTasks,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
      requireClean: opts.requireClean,
      quiet: opts.quiet,
    });

    const env = buildGitCommitEnv({
      taskId: opts.taskId,
      allowTasks: opts.allowTasks,
      allowBase: opts.allowBase,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
      gitIdentity: await resolveCanonicalGitIdentity(),
    });
    const [changedPaths, stagedPaths] = await Promise.all([
      ctx.git.statusChangedPaths(),
      ctx.git.statusStagedPaths(),
    ]);
    await runCommitWithLock({
      ctx,
      taskId: opts.taskId,
      message: opts.message,
      body: appendDcoSignoff({ config: ctx.config }),
      env,
      allowPrefixes: opts.allow,
      changedPaths,
      stagedPaths,
      mutationKind: "implementation_commit",
      phase: "task_commit",
    });
    const primaryCommit = await ctx.git.headHashSubject();
    await refreshBranchPrArtifactsAfterTaskCommit({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      quiet: opts.quiet,
    });
    ctx.git.invalidateStatus();
    const amendedCommit = await commitRefreshedTaskArtifacts({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      sourceMessage: opts.message,
      quiet: opts.quiet,
    });

    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage(
          "committed",
          formatCommitRef(primaryCommit),
          [
            autoStaged.length > 0 ? `staged=${autoStaged.join(", ")}` : null,
            amendedCommit ? `amended=${formatCommitRef(amendedCommit)}` : null,
          ]
            .filter(Boolean)
            .join("; ") || undefined,
        )}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    const commitFailure = asCommitFailure(err, opts.close ? "close_commit" : "task_commit");
    if (commitFailure) throw commitFailure;
    throw mapCoreError(err, { command: "commit", root: opts.rootOverride ?? null });
  }
}
