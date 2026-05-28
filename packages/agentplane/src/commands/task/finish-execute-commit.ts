import { invalidValueMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  defaultCommitEmojiForStatus,
  prepareTaskTransitionComment,
  readCommitInfo,
  runTaskTransitionCommentCommit,
} from "./shared.js";
import type { ResolvedCommitInfo } from "./finish-shared.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";

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
