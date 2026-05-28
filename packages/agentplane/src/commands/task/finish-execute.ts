import { PolicyEngine } from "../../policy/engine.js";
import { CliError } from "../../shared/errors.js";
import { renderIncidentCollectionPlanOutcome } from "../incidents/shared.js";
import { throwIfPolicyDecisionDenied } from "../shared/policy-deny.js";
import type { CommandContext } from "../shared/task-backend.js";

import {
  assertBlueprintEvidenceBeforeFinish,
  assertQualityReviewBeforeFinish,
} from "./finish-blueprint-evidence.js";
import {
  existingCommitInfo,
  loadTaskForFinish,
  refreshAcrArtifactsForFinishedTasks,
  type LoadedFinishTask,
  writeFinishedTasks,
} from "./finish-shared.js";
import { clearDirectWorkLockIfMatches, resolveBranchPrCloseTailState } from "./finish-close.js";
import { appendFinishStructuredFinding } from "./finish-findings.js";
import { enforceStatusCommitPolicy } from "./shared.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";
import { collectIncidentsForLoadedTasks, loadFinishTasks } from "./finish-execute-load.js";
import { resolveTaskCommitInfo } from "./finish-execute-commit.js";
import { assertCloseCommitCanMutateTaskState, finalizeCloseTail } from "./finish-execute-close.js";

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
  assertFinishPhasePolicy({ ctx, loadedTasks: loadedState.loadedTasks });
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
  await assertQualityReviewBeforeFinish({
    ctx,
    loadedTasks: loadedState.loadedTasks,
    taskCommitInfo,
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

function assertFinishPhasePolicy(opts: {
  ctx: CommandContext;
  loadedTasks: LoadedFinishTask[];
}): void {
  const engine = new PolicyEngine();
  for (const { taskId, task } of opts.loadedTasks) {
    throwIfPolicyDecisionDenied(
      engine.evaluate({
        action: "task_finish",
        phase: "finish",
        config: opts.ctx.config,
        taskId,
        task: {
          status: task.status,
          planApprovalState: task.plan_approval?.state ?? null,
          verificationState: task.verification?.state ?? null,
          workflowMode: opts.ctx.config.workflow_mode,
        },
        git: { stagedPaths: [] },
      }),
    );
  }
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
