import { gitRevParse } from "@agentplaneorg/core/git";

import { invalidValueMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  isTaskLocalOnlyAdvance,
  isTaskSetLocalOnlyAdvance,
} from "../shared/task-local-freshness.js";
import {
  defaultCommitEmojiForStatus,
  prepareTaskTransitionComment,
  readCommitInfo,
  runTaskTransitionCommentCommit,
} from "./shared.js";
import {
  existingCommitInfo,
  resolveBatchArtifactTaskIds,
  type LoadedFinishTask,
  type ResolvedCommitInfo,
} from "./finish-shared.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";

async function isTaskArtifactOnlyAdvance(opts: {
  ctx: CommandContext;
  loaded: LoadedFinishTask;
  artifactTaskIds: readonly string[];
  fromRef: string;
  toRef: string;
}): Promise<boolean> {
  return await (
    opts.artifactTaskIds.length === 1
      ? isTaskLocalOnlyAdvance({
          gitRoot: opts.ctx.resolvedProject.gitRoot,
          workflowDir: opts.ctx.config.paths.workflow_dir,
          taskId: opts.loaded.taskId,
          tasksPath: opts.ctx.config.paths.tasks_path,
          fromRef: opts.fromRef,
          toRef: opts.toRef,
        })
      : isTaskSetLocalOnlyAdvance({
          gitRoot: opts.ctx.resolvedProject.gitRoot,
          workflowDir: opts.ctx.config.paths.workflow_dir,
          taskIds: opts.artifactTaskIds,
          tasksPath: opts.ctx.config.paths.tasks_path,
          fromRef: opts.fromRef,
          toRef: opts.toRef,
        })
  ).catch(() => false);
}

async function resolveReviewedImplementationSha(opts: {
  ctx: CommandContext;
  loaded: LoadedFinishTask;
  artifactTaskIds: readonly string[];
  reviewedSha: string;
}): Promise<string> {
  let implementationSha = opts.reviewedSha;
  for (;;) {
    const parentSha = await gitRevParse(opts.ctx.resolvedProject.gitRoot, [
      `${implementationSha}^`,
    ]).catch(() => null);
    if (!parentSha) return implementationSha;

    const taskArtifactOnly = await isTaskArtifactOnlyAdvance({
      ...opts,
      fromRef: parentSha,
      toRef: implementationSha,
    });
    if (!taskArtifactOnly) return implementationSha;
    implementationSha = parentSha;
  }
}

export async function resolveTaskCommitInfo(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
  primaryStatusFrom: string | null;
  primaryTag: string | null;
}): Promise<ResolvedCommitInfo | null> {
  const { ctx, options, plan, primaryStatusFrom, primaryTag } = opts;
  let taskCommitInfo: ResolvedCommitInfo | null = options.commit
    ? await readCommitInfo(ctx.resolvedProject.gitRoot, options.commit)
    : null;
  const preparedComment =
    options.commitFromComment || plan.statusCommitRequested
      ? prepareTaskTransitionComment({
          body: options.body,
          enabled: true,
          config: ctx.config,
        })
      : null;

  if (options.commitFromComment) {
    if (typeof options.commitEmoji === "string" && options.commitEmoji.trim() !== "✅") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: invalidValueMessage(
          "--commit-emoji",
          options.commitEmoji,
          "✅ (finish commits must use a checkmark)",
        ),
      });
    }
    taskCommitInfo = await runTaskTransitionCommentCommit({
      ctx,
      cwd: options.cwd,
      rootOverride: options.rootOverride,
      taskId: plan.primaryTaskId,
      primaryTag: primaryTag ?? "meta",
      author: options.author,
      statusFrom: primaryStatusFrom ?? undefined,
      statusTo: "DONE",
      commentBody: options.body,
      formattedComment: preparedComment?.formattedComment ?? null,
      emoji: options.commitEmoji ?? defaultCommitEmojiForStatus("DONE"),
      allow: options.commitAllow,
      autoAllow: false,
      allowTasks: options.commitAllowTasks,
      requireClean: options.commitRequireClean,
      quiet: options.quiet,
      progressMessage: "creating commit from verification comment",
      resolveExecutorAgent: true,
    });
  }

  if (plan.statusCommitRequested) {
    if (
      typeof options.statusCommitEmoji === "string" &&
      options.statusCommitEmoji.trim() !== "✅"
    ) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: invalidValueMessage(
          "--status-commit-emoji",
          options.statusCommitEmoji,
          "✅ (finish commits must use a checkmark)",
        ),
      });
    }
    await runTaskTransitionCommentCommit({
      ctx,
      cwd: options.cwd,
      rootOverride: options.rootOverride,
      taskId: plan.primaryTaskId,
      primaryTag: primaryTag ?? "meta",
      author: options.author,
      statusFrom: primaryStatusFrom ?? undefined,
      statusTo: "DONE",
      commentBody: options.body,
      formattedComment: preparedComment?.formattedComment ?? null,
      emoji: options.statusCommitEmoji ?? defaultCommitEmojiForStatus("DONE"),
      allow: options.statusCommitAllow,
      autoAllow: false,
      allowTasks: true,
      requireClean: options.statusCommitRequireClean,
      quiet: options.quiet,
      progressMessage: "creating status commit",
      resolveExecutorAgent: true,
    });
  }

  return taskCommitInfo;
}

export async function resolveImplementationCommitInfo(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  loadedTasks: readonly LoadedFinishTask[];
  taskCommitInfo: ResolvedCommitInfo | null;
}): Promise<ResolvedCommitInfo | null> {
  if (opts.options.implementationCommit) {
    return await readCommitInfo(
      opts.ctx.resolvedProject.gitRoot,
      opts.options.implementationCommit,
    );
  }

  if (opts.loadedTasks.length !== 1) return null;

  const loaded = opts.loadedTasks[0];
  const reviewedSha = loaded?.task.quality_review?.evaluated_sha ?? null;
  if (!loaded || !reviewedSha) return null;
  const candidateCommitInfo = opts.taskCommitInfo ?? existingCommitInfo(loaded.task);
  if (!candidateCommitInfo) return null;

  const artifactTaskIds = resolveBatchArtifactTaskIds(loaded);
  const taskLocalAdvance = await isTaskArtifactOnlyAdvance({
    ctx: opts.ctx,
    loaded,
    artifactTaskIds,
    fromRef: reviewedSha,
    toRef: candidateCommitInfo.hash,
  });
  if (!taskLocalAdvance) return null;

  const implementationSha = await resolveReviewedImplementationSha({
    ctx: opts.ctx,
    loaded,
    artifactTaskIds,
    reviewedSha,
  });
  const commitInfo = await readCommitInfo(opts.ctx.resolvedProject.gitRoot, implementationSha);
  if (!opts.options.quiet) {
    process.stdout.write(
      `finish detected task-artifact evidence commits; using implementation commit ${commitInfo.hash} from quality_review.evaluated_sha=${reviewedSha}\n`,
    );
  }
  return commitInfo;
}
