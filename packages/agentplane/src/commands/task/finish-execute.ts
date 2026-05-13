import { invalidValueMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { collectTaskIncidents, renderIncidentCollectionPlanOutcome } from "../incidents/shared.js";
import type { CommandContext } from "../shared/task-backend.js";

import { assertBlueprintEvidenceBeforeFinish } from "./finish-blueprint-evidence.js";
import {
  createTaskCloseCommit,
  existingCommitInfo,
  loadTaskForFinish,
  refreshAcrArtifactsForFinishedTasks,
  type LoadedFinishTask,
  type ResolvedCommitInfo,
  writeFinishedTasks,
} from "./finish-shared.js";
import {
  clearDirectWorkLockIfMatches,
  materializeBranchPrCloseTail,
  resolveBranchPrCloseTailState,
} from "./finish-close.js";
import { appendFinishStructuredFinding } from "./finish-findings.js";
import {
  defaultCommitEmojiForStatus,
  enforceStatusCommitPolicy,
  prepareTaskTransitionComment,
  readCommitInfo,
  runTaskTransitionCommentCommit,
} from "./shared.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";

export async function executeFinishPlan(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
}): Promise<number> {
  const { ctx, options, plan } = opts;
  if (await shouldSkipAlreadyHandledBranchPrCloseTail({ ctx, options, plan })) {
    return 0;
  }

  await appendStructuredFindingIfNeeded({ ctx, options, plan });

  const loadedState = await loadFinishTasks({ ctx, options, plan });
  await assertBlueprintEvidenceBeforeFinish({ ctx, loadedTasks: loadedState.loadedTasks });
  await collectIncidentsForLoadedTasks({
    ctx,
    taskIds: options.taskIds,
    loadedTasks: loadedState.loadedTasks,
    write: false,
  });

  const tasksMissingCommit = loadedState.loadedTasks
    .filter(({ task }) => !existingCommitInfo(task))
    .map(({ taskId }) => taskId);
  if (!options.commitFromComment && !options.commit && tasksMissingCommit.length > 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: [
        "finish requires --commit <hash> or existing task commit metadata on every task; implicit HEAD fallback was removed.",
        `tasks_missing_commit=${tasksMissingCommit.join(", ")}`,
        "Fix:",
        "  1) Select the implementation commit explicitly: git log --oneline --decorate -n 10",
        '  2) Re-run finish with: agentplane finish <task-id> --author <ROLE> --body "Verified: ..." --result "..." --commit <hash>',
        "  3) If the implementation is still unstaged, use --commit-from-comment with explicit --commit-allow <path-prefix> instead of relying on HEAD.",
      ].join("\n"),
    });
  }

  if (options.commitFromComment || plan.statusCommitRequested) {
    enforceStatusCommitPolicy({
      policy: ctx.config.status_commit_policy,
      action: "finish",
      confirmed: options.confirmStatusCommit,
      quiet: options.quiet,
      statusFrom: loadedState.primaryStatusFrom ?? "UNKNOWN",
      statusTo: "DONE",
    });
  }

  const taskCommitInfo = await resolveTaskCommitInfo({
    ctx,
    options,
    plan,
    primaryStatusFrom: loadedState.primaryStatusFrom,
    primaryTag: loadedState.primaryTag,
  });

  await assertCloseCommitCanMutateTaskState({ ctx, options, plan });

  await writeFinishedTasks({
    ctx,
    loadedTasks: loadedState.loadedTasks,
    metaTaskId: plan.metaTaskId,
    author: options.author,
    body: options.body,
    force: options.force,
    resultProvided: plan.resultProvided,
    resultSummary: plan.resultSummary,
    riskLevel: plan.riskLevel,
    breaking: plan.breaking,
    taskCommitInfo,
  });

  await refreshAcrArtifactsForFinishedTasks({
    ctx,
    cwd: options.cwd,
    rootOverride: options.rootOverride,
    loadedTasks: loadedState.loadedTasks,
    taskCommitInfo,
    author: options.author,
    noWriteAcr: options.noWriteAcr,
  });

  const incidentOutcome = await collectIncidentsForLoadedTasks({
    ctx,
    taskIds: options.taskIds,
    loadedTasks: loadedState.loadedTasks,
    write: true,
  });
  const promotedIncidents = incidentOutcome.plans.reduce(
    (sum, candidate) => sum + candidate.promotable.length,
    0,
  );

  await finalizeCloseTail({
    ctx,
    options,
    plan,
    primaryTaskId: plan.primaryTaskId,
    promotedIncidents,
  });

  if (ctx.config.workflow_mode === "direct") {
    await clearDirectWorkLockIfMatches({
      agentplaneDir: ctx.resolvedProject.agentplaneDir,
      taskIds: options.taskIds,
    });
  }

  if (!options.quiet) {
    const incidentPlan = incidentOutcome.plans[0] ?? {
      candidates: [],
      skipped: [],
      promotable: [],
      duplicates: [],
    };
    process.stdout.write(
      `${renderIncidentCollectionPlanOutcome(incidentPlan, {
        wrote: promotedIncidents > 0,
        context: "finish",
        promotedIds: incidentPlan.promotable.map((item) => item.entry.id),
        registryPaths: incidentOutcome.registryPaths[0] ?? [],
        taskId: options.taskIds[0] ?? null,
      })}\n`,
    );
    process.stdout.write("finished\n");
  }

  return 0;
}

async function shouldSkipAlreadyHandledBranchPrCloseTail(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
}): Promise<boolean> {
  if (opts.ctx.config.workflow_mode !== "branch_pr") return false;
  if (!opts.plan.shouldCloseCommit || !opts.plan.primaryTaskId) return false;

  const closeTailState = await resolveBranchPrCloseTailState({
    ctx: opts.ctx,
    taskId: opts.plan.primaryTaskId,
  });
  if (!closeTailState.alreadyHandled) return false;

  if (!opts.options.quiet) {
    const detail = closeTailState.closeBranch
      ? `hosted close already owns ${closeTailState.closeBranch} for base ${closeTailState.baseBranch}`
      : `close commit already recorded on base ${closeTailState.baseBranch}`;
    process.stdout.write(
      `branch_pr close tail already handled: ${detail}; skipping local task artifact writes.\n`,
    );
  }
  return true;
}

async function appendStructuredFindingIfNeeded(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
}): Promise<void> {
  const { ctx, options, plan } = opts;
  if (!plan.finishFinding || !plan.primaryTaskId) return;

  await loadTaskForFinish({
    ctx,
    store: plan.store,
    useStore: plan.useStore,
    taskId: plan.primaryTaskId,
    taskCount: options.taskIds.length,
    metaTaskId: plan.metaTaskId,
    resultProvided: plan.resultProvided,
    resultSummary: plan.resultSummary,
    force: options.force,
    capturePrimaryLifecycleMeta: false,
  });
  await appendFinishStructuredFinding({
    ctx,
    taskId: plan.primaryTaskId,
    author: options.author,
    finding: plan.finishFinding,
  });
}

async function loadFinishTasks(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
}): Promise<{
  loadedTasks: LoadedFinishTask[];
  primaryStatusFrom: string | null;
  primaryTag: string | null;
}> {
  const { ctx, options, plan } = opts;
  let primaryStatusFrom: string | null = null;
  let primaryTag: string | null = null;
  const loadedTasks: LoadedFinishTask[] = [];

  for (const taskId of options.taskIds) {
    const loaded = await loadTaskForFinish({
      ctx,
      store: plan.store,
      useStore: plan.useStore,
      taskId,
      taskCount: options.taskIds.length,
      metaTaskId: plan.metaTaskId,
      resultProvided: plan.resultProvided,
      resultSummary: plan.resultSummary,
      force: options.force,
      capturePrimaryLifecycleMeta: taskId === plan.primaryTaskId,
    });
    loadedTasks.push(loaded.loaded);
    if (taskId === plan.primaryTaskId) {
      primaryStatusFrom = loaded.primaryStatusFrom;
      primaryTag = loaded.primaryTag;
    }
  }

  return { loadedTasks, primaryStatusFrom, primaryTag };
}

async function collectIncidentsForLoadedTasks(opts: {
  ctx: CommandContext;
  taskIds: string[];
  loadedTasks: LoadedFinishTask[];
  write: boolean;
}): Promise<{
  plans: Awaited<ReturnType<typeof collectTaskIncidents>>["plan"][];
  registryPaths: string[][];
}> {
  const plans = [];
  const registryPaths = [];
  for (const taskId of opts.taskIds) {
    const loadedTask = opts.loadedTasks.find((candidate) => candidate.taskId === taskId) ?? null;
    const collected = await collectTaskIncidents({
      ctx: opts.ctx,
      taskId,
      task: loadedTask?.task ?? null,
      write: opts.write,
    });
    plans.push(collected.plan);
    registryPaths.push(collected.registryPaths);
  }
  return { plans, registryPaths };
}

async function resolveTaskCommitInfo(opts: {
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

async function assertCloseCommitCanMutateTaskState(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
}): Promise<void> {
  const { ctx, options, plan } = opts;
  if (!plan.shouldCloseCommit) return;
  if (ctx.config.workflow_mode !== "branch_pr") return;

  const staged = await ctx.git.statusStagedPaths();
  if (staged.length > 0 && options.closeUnstageOthers !== true) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: [
        "finish --close-commit cannot proceed with a non-empty index.",
        "Why: close commit creation would fail after the task is marked DONE.",
        "Fix: clear the index or rerun with --close-unstage-others.",
        "Safe command: git status --short --untracked-files=no",
      ].join("\n"),
    });
  }

  const unstaged = await ctx.git.statusUnstagedTrackedPaths();
  if (unstaged.length === 0) return;

  throw new CliError({
    exitCode: 5,
    code: "E_GIT",
    message: [
      "finish --close-commit requires a clean tracked working tree before mutating task state.",
      "Why: deterministic branch_pr close commits stage only the finished task artifacts; other tracked changes would make commit creation fail after the task is marked DONE.",
      `Dirty tracked paths: ${unstaged.slice(0, 12).join(", ")}${unstaged.length > 12 ? ` (+${unstaged.length - 12} more)` : ""}`,
      "Fix: commit, stash, or move unrelated lifecycle changes into a batch close branch before rerunning finish.",
      "Safe command: git status --short --untracked-files=no",
    ].join("\n"),
  });
}

async function finalizeCloseTail(opts: {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
  primaryTaskId: string;
  promotedIncidents: number;
}): Promise<void> {
  const { ctx, options, plan, primaryTaskId, promotedIncidents } = opts;
  if (!plan.shouldCloseCommit || !primaryTaskId) return;

  if (!options.quiet) {
    process.stdout.write("task marked DONE; creating deterministic close commit\n");
  }
  const closeUnstageOthers = options.closeCommit === true && options.closeUnstageOthers === true;
  if (ctx.config.workflow_mode === "branch_pr") {
    const closeBranch = await materializeBranchPrCloseTail({
      ctx,
      cwd: options.cwd,
      rootOverride: options.rootOverride,
      taskId: primaryTaskId,
      baseBranchOverride: options.baseBranchOverride,
      quiet: options.quiet,
      closeUnstageOthers,
      allowPolicy: promotedIncidents > 0,
    });
    if (options.quiet) return;
    if (closeBranch) {
      process.stdout.write(
        `branch_pr close tail ready on ${closeBranch}; push that branch and open it with task hosted-close-pr if hosted automation does not create the closure PR for you.\n`,
      );
      return;
    }
    process.stdout.write(
      "branch_pr close tail already handled; skipping local task-close branch materialization.\n",
    );
    return;
  }

  await createTaskCloseCommit({
    ctx,
    cwd: options.cwd,
    rootOverride: options.rootOverride,
    taskId: primaryTaskId,
    baseBranchOverride: options.baseBranchOverride,
    quiet: options.quiet,
    closeUnstageOthers,
    allowPolicy: promotedIncidents > 0,
  });
}
