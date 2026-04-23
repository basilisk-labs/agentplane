import { mapCoreError } from "../../../cli/error-map.js";
import { infoMessage, successMessage } from "../../../cli/output.js";
import { withDiagnosticContext } from "../../shared/diagnostics.js";
import { CliError } from "../../../shared/errors.js";
import { refreshBranchPrArtifactsAfterTaskCommit } from "../../shared/post-commit-pr-artifacts.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../../shared/task-backend.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { ensureReconciledBeforeMutation } from "../../shared/reconcile-check.js";
import { stageAllowlist } from "./allow.js";
import { resolveIgnoredDirectCloseDirtyPaths } from "./close-dirt.js";
import { buildCloseCommitMessage, taskReadmePathForTask } from "./close-message.js";
import { asCommitFailure } from "./commit-diagnostics.js";
import { buildGitCommitEnv, resolveCanonicalGitIdentity } from "./env.js";
import {
  commitRefreshedTaskArtifacts,
  formatCommitRef,
  refreshBranchPrArtifactsForCloseCommit,
  resetRebuildableTaskIndexCache,
} from "./commit-refresh.js";
import {
  hasExplicitCommitScope,
  stageActiveTaskArtifactsFromAllowTasks,
  stageCloseCommitPaths,
} from "./commit-stage.js";
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
    await ctx.git.commit({ message: opts.message, env });
    const primaryCommit = await ctx.git.headHashSubject();
    await refreshBranchPrArtifactsAfterTaskCommit({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      quiet: opts.quiet,
    });
    ctx.git.invalidateStatus();
    const refreshCommit = await commitRefreshedTaskArtifacts({
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
            refreshCommit ? `refresh=${formatCommitRef(refreshCommit)}` : null,
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

async function cmdCloseCommit(
  opts: Parameters<typeof cmdCommit>[0] & {
    ctx: CommandContext;
  },
): Promise<number> {
  if (!opts.closeCheckOnly) {
    await ensureReconciledBeforeMutation({ ctx: opts.ctx, command: "commit" });
    await resetRebuildableTaskIndexCache(opts.ctx);
  }

  let staged = await opts.ctx.git.statusStagedPaths();
  if (staged.length > 0 && opts.closeUnstageOthers) {
    if (!opts.closeCheckOnly) {
      await execFileAsync("git", ["restore", "--staged", "--", "."], {
        cwd: opts.ctx.resolvedProject.gitRoot,
        env: gitEnv(),
      });
    }
    staged = opts.closeCheckOnly ? staged : await opts.ctx.git.statusStagedPaths();
  }
  if (staged.length > 0 && !opts.closeUnstageOthers) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message:
        "Staged files exist (close commit requires an empty index; rerun with --unstage-others to auto-unstage).",
      context: withDiagnosticContext(
        { command: "commit" },
        {
          state: "close commit cannot run with a non-empty git index",
          likelyCause:
            "deterministic close commits only stage the active task artifact scope, but other staged files are already in the index",
          nextAction: {
            command: "git restore --staged -- .",
            reason: "clear the current index before rerunning the close commit flow",
            reasonCode: "git_close_commit_dirty_index",
          },
        },
      ),
    });
  }

  const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  const msg = await buildCloseCommitMessage({ gitRoot: opts.ctx.resolvedProject.gitRoot, task });
  const readmeAbs = taskReadmePathForTask({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.taskId,
  });
  const readmeRel = readmeAbs.startsWith(opts.ctx.resolvedProject.gitRoot)
    ? readmeAbs.slice(opts.ctx.resolvedProject.gitRoot.length + 1)
    : readmeAbs;
  if (opts.closeCheckOnly) {
    if (!opts.quiet) {
      const stagedCount = staged.length;
      const suffix =
        stagedCount > 0 && opts.closeUnstageOthers ? `; would unstage ${stagedCount} path(s)` : "";
      process.stdout.write(
        `${successMessage("close preflight", opts.taskId, `subject=${msg.subject}${suffix}`)}\n`,
      );
    }
    return 0;
  }
  if (opts.closeStageTaskArtifacts === true) {
    await refreshBranchPrArtifactsForCloseCommit({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      quiet: opts.quiet,
      refreshTaskArtifacts: opts.closeRefreshTaskArtifacts !== false,
    });
  }
  await (opts.closeStageTaskArtifacts === true
    ? stageAllowlist({
        ctx: opts.ctx,
        allow: [],
        allowTasks: true,
        allowPolicy: opts.allowPolicy,
        tasksPath: opts.ctx.config.paths.tasks_path,
        workflowDir: opts.ctx.config.paths.workflow_dir,
        taskId: opts.taskId,
        allowTaskOnly: true,
        emptyAllowMessage: "No changed task artifacts to stage for the deterministic close commit.",
        noMatchMessage:
          "No changed files matched the active task artifact scope for the deterministic close commit.",
      })
    : stageCloseCommitPaths({
        ctx: opts.ctx,
        readmeRel,
        taskId: opts.taskId,
        allowPolicy: opts.allowPolicy,
      }));
  const ignoredUnstagedTrackedPaths = await resolveIgnoredDirectCloseDirtyPaths({
    ctx: opts.ctx,
    taskId: opts.taskId,
  });

  await guardCommitCheck({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    baseBranchOverride: opts.baseBranchOverride ?? null,
    taskId: opts.taskId,
    message: msg.subject,
    allow: [],
    allowBase: opts.allowBase,
    allowTasks: true,
    allowPolicy: opts.allowPolicy,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: true,
    ignoredUnstagedTrackedPaths,
    quiet: opts.quiet,
  });

  const env = buildGitCommitEnv({
    taskId: opts.taskId,
    allowTasks: true,
    allowBase: opts.allowBase,
    allowPolicy: opts.allowPolicy,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    allowStaleDist: true,
    gitIdentity: await resolveCanonicalGitIdentity(),
  });
  await opts.ctx.git.commit({ message: msg.subject, body: msg.body, env });

  if (!opts.quiet) {
    const { hash, subject } = await opts.ctx.git.headHashSubject();
    process.stdout.write(
      `${successMessage("committed", `${hash?.slice(0, 12) ?? ""} ${subject ?? ""}`.trim())}\n`,
    );
  }
  return 0;
}
