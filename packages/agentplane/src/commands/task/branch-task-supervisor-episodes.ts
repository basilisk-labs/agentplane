import {
  stoppedEpisode,
  applyBranchImplementationResult,
  recoverProductionBranchConflict,
} from "./branch-task-supervisor-implementation.js";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import {
  projectExecutedTaskRunnerLifecycleResult,
  taskRunnerLifecycleExitCode,
} from "../../runner/usecases/task-run-lifecycle-result.js";
import { executeTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  openSupervisorExecutionEpisode,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  resolveCommandGitCommonDir,
} from "../shared/task-backend.js";
import type {
  BranchEpisodeOutcome,
  BranchTaskSupervisorOptions,
} from "./branch-task-supervisor.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { runAndApplyDirectTaskEvaluator } from "./direct-task-supervisor-evaluator.js";
import { recordDirectTaskFormalOperation } from "./direct-task-supervisor-formal-operation.js";

import { journalProjection } from "./direct-task-supervisor-result.js";
import {
  renderDirectTaskVerificationDetails,
  runDirectTaskVerification,
} from "./direct-task-verification.js";

import { cmdVerifyParsed } from "./verify-record.js";
import {
  branchSupervisorArtifactCommitMessage,
  commitBranchSupervisorTaskArtifacts,
} from "./branch-task-supervisor-artifact-commit.js";
import { branchSupervisorUsageFromLifecycle } from "./branch-task-supervisor-usage.js";

import path from "node:path";
import { readFile } from "node:fs/promises";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { taskCentricDigest } from "@agentplaneorg/core/tasks";

import {
  createRunnerRunId,
  resolveSupervisorTaskRunnerPaths,
} from "../../runner/task-run-paths.js";

import { conflictApplicationAuthority } from "../pr/conflict-rework-authority.js";
import { workflowTaskFingerprintComponent } from "../shared/workflow-step-fingerprint.js";

async function executeBranchImplementationEpisode(opts: {
  input: BranchTaskSupervisorOptions;
  decision: TaskRouteDecision;
  decide: () => Promise<TaskRouteDecision>;
}): Promise<BranchEpisodeOutcome> {
  const checkout = opts.decision.executionPacket.mustRunFrom;
  if (!checkout) {
    return stoppedEpisode({
      decision: opts.decision,
      code: "route_refresh_failed",
      reason: "The implementation episode has no authoritative task worktree.",
    });
  }
  const command = await loadCommandContext({ cwd: checkout, rootOverride: null });
  const task = await loadTaskFromContext({ ctx: command, taskId: opts.input.task_id });
  const opened = await openSupervisorExecutionEpisode({
    git_root: command.resolvedProject.gitRoot,
    task_id: opts.input.task_id,
    task_revision: task.revision ?? null,
    state_fingerprint_digest: opts.decision.workflowStep.preconditionFingerprint.digest,
    recover_intent: false,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: opened.journal_path });
  if (!lease) {
    return stoppedEpisode({
      decision: opts.decision,
      code: "supervisor_stopped",
      reason:
        "Another supervisor owns the branch_pr provider window; no second EXECUTOR was started.",
      journal: journalProjection(opened.journal, opened.journal_path),
    });
  }
  try {
    let journal = opened.journal;
    if (journal.status !== "running" || journal.cursor.phase !== "ready") {
      return stoppedEpisode({
        decision: opts.decision,
        code: "supervisor_stopped",
        reason:
          "The branch_pr supervisor journal is not ready; resolve its completed, failed, or effect-in-doubt episode before another provider run.",
        journal: journalProjection(journal, opened.journal_path),
      });
    }
    const step = opts.decision.workflowStep;
    if (step.kind !== "agent_episode") {
      return stoppedEpisode({
        decision: opts.decision,
        code: "unsupported_agent_episode",
        reason: "The branch implementation executor received a non-agent route.",
        journal: journalProjection(journal, opened.journal_path),
      });
    }
    const conflictRun = step.id === "agent.provider_conflict_rework" ? createRunnerRunId() : null;
    const conflictRunPaths = conflictRun
      ? await resolveSupervisorTaskRunnerPaths({
          git_root: command.resolvedProject.gitRoot,
          workflow_dir: command.config.paths.workflow_dir,
          task_id: opts.input.task_id,
          run_id: conflictRun,
          common_git_dir: await resolveCommandGitCommonDir(command),
        })
      : null;
    const started = startSupervisorExecutionEpisode({
      journal,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: {
        workflow_step_id: step.id,
        purpose: step.episode.purpose,
        task_id: opts.input.task_id,
      },
      precondition_fingerprint_digest: step.preconditionFingerprint.digest,
      authority_ref: `branch-pr:${opts.input.task_id}:${step.id}`,
      authority_digest: step.preconditionFingerprint.digest,
      effect_ref:
        conflictRunPaths?.result_path ??
        `branch-pr:${opts.input.task_id}:${step.preconditionFingerprint.digest}`,
      ...(conflictRunPaths ? { work_order_ref: conflictRunPaths.bundle_path } : {}),
    });
    if (started.status !== "started") {
      await opened.store.write(started.journal);
      return stoppedEpisode({
        decision: opts.decision,
        code: "supervisor_stopped",
        reason:
          started.status === "effect_in_doubt"
            ? "The branch EXECUTOR effect is in doubt; no provider retry is allowed."
            : `The branch EXECUTOR journal stopped: ${started.stop.reason}.`,
        journal: journalProjection(started.journal, opened.journal_path),
      });
    }
    if (!(await opened.store.compareAndSwap(journal.digest, started.journal))) {
      return stoppedEpisode({
        decision: opts.decision,
        code: "supervisor_stopped",
        reason:
          "The branch supervisor journal changed before provider intent was persisted; no EXECUTOR was started.",
        journal: journalProjection(journal, opened.journal_path),
      });
    }
    journal = started.journal;
    const [executionBaseCommit, executionBaselineStatus] = await Promise.all([
      readDirectTaskHead(checkout),
      readDirectRepositoryStatus(checkout),
    ]);
    const eventsBefore = task.events?.length ?? 0;
    let executed: Awaited<ReturnType<typeof executeTaskRunnerExecution>>;
    try {
      executed = await executeTaskRunnerExecution({
        ctx: command,
        cwd: checkout,
        task_id: opts.input.task_id,
        ...(conflictRun ? { run_id: conflictRun } : {}),
        include_remote: true,
        execution_role: step.episode.role,
        ...(opts.input.sandbox_override ? { sandbox_override: opts.input.sandbox_override } : {}),
        ...(opts.input.danger_authority ? { danger_authority: opts.input.danger_authority } : {}),
        task_execution: opts.input.task_execution,
      });
    } catch (error) {
      journal = completeSupervisorExecutionEpisode({
        journal,
        operation_key: started.operation_key,
        result: { error: error instanceof Error ? error.name : "unknown_error" },
        failed: true,
      });
      await opened.store.write(journal);
      return stoppedEpisode({
        decision: opts.decision,
        code: "executor_adapter_crash",
        reason:
          "The branch EXECUTOR adapter failed after durable intent; the provider will not be replayed automatically. " +
          (error instanceof Error ? `${error.name}: ${error.message}` : "Unknown adapter error."),
        journal: journalProjection(journal, opened.journal_path),
        provider_episodes: 1,
      });
    }
    const lifecycle = projectExecutedTaskRunnerLifecycleResult({
      task_id: opts.input.task_id,
      execution: executed,
    });
    const exitCode = taskRunnerLifecycleExitCode(lifecycle);
    // Persist the application authority before Git changes invalidate the route fingerprint.
    // The exact runner references in this intent identify the result; Git effects have their
    // own result-bound snapshot and merge proof.
    const acceptedRoute = conflictRun ? await opts.decide() : null;
    const acceptedTask = acceptedRoute
      ? await command.taskBackend.getTask(opts.input.task_id)
      : null;
    if (
      acceptedRoute &&
      (acceptedTask?.revision !==
        acceptedRoute.workflowStep.preconditionFingerprint.task_revision ||
        taskCentricDigest(workflowTaskFingerprintComponent(acceptedTask)) !==
          acceptedRoute.workflowStep.preconditionFingerprint.components.task.digest)
    ) {
      throw new Error(
        "Managed conflict initial Task observation differs from its route authority.",
      );
    }
    const applicationContext =
      acceptedRoute && acceptedTask
        ? {
            run_id: executed.invocation.run_id,
            work_order_id: executed.invocation.work_order_id,
            result_digest: taskCentricDigest(executed.result),
            execution_base_commit: executionBaseCommit,
            execution_baseline_status: executionBaselineStatus,
            execution_lifecycle_event_count: eventsBefore,
            accepted_task: acceptedTask,
            accepted_authority: conflictApplicationAuthority(acceptedRoute),
            status_at: new Date().toISOString(),
          }
        : null;
    if (applicationContext) {
      // This is the original supervisor Git observation, not a second lifecycle store.
      // Recovery cannot reconstruct the pre-execution status from the post-merge tree.
      const contextPath = path.join(executed.invocation.run_dir, "implementation-context.json");
      const existing = await readFile(contextPath, "utf8").catch((error: unknown) => {
        if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
        throw error;
      });
      if (existing === null) {
        await atomicWriteFile(
          contextPath,
          `${JSON.stringify(applicationContext, null, 2)}\n`,
          "utf8",
        );
      } else {
        if (taskCentricDigest(JSON.parse(existing)) !== taskCentricDigest(applicationContext)) {
          throw new Error("Managed conflict implementation context changed after observation.");
        }
      }
    }
    journal = completeSupervisorExecutionEpisode({
      journal,
      operation_key: started.operation_key,
      result: {
        run_id: lifecycle.invocation.run_id,
        work_order_id: lifecycle.invocation.work_order_id,
        receipt: lifecycle.result?.execution_receipt ?? null,
        semantic_status: lifecycle.result?.semantic_result?.value.status ?? null,
      },
      usage: branchSupervisorUsageFromLifecycle(lifecycle),
      progress: acceptedRoute
        ? {
            authority: conflictApplicationAuthority(acceptedRoute),
            implementation: applicationContext,
          }
        : (lifecycle.lifecycle.state_fingerprint ?? {
            run_id: lifecycle.invocation.run_id,
            status: lifecycle.lifecycle.status,
          }),
      failed: exitCode !== 0,
    });
    await opened.store.write(journal);
    const journalRef = journalProjection(journal, opened.journal_path);
    if (exitCode !== 0) {
      return stoppedEpisode({
        decision: opts.decision,
        code: "runner_failed",
        reason:
          "The branch EXECUTOR did not complete with a clean runner/active-claim terminal state.",
        journal: journalRef,
        provider_episodes: 1,
      });
    }
    return await applyBranchImplementationResult(opts, {
      checkout,
      command,
      opened,
      journal,
      executed,
      eventsBefore,
      executionBaseCommit,
      executionBaselineStatus,
      acceptedRoute,
      applicationContext,
    });
  } finally {
    await lease.release();
  }
}

async function executeBranchVerificationEpisode(opts: {
  input: BranchTaskSupervisorOptions;
  decision: TaskRouteDecision;
  decide: () => Promise<TaskRouteDecision>;
}): Promise<BranchEpisodeOutcome> {
  const checkout = opts.decision.executionPacket.mustRunFrom;
  if (!checkout) {
    return stoppedEpisode({
      decision: opts.decision,
      code: "route_refresh_failed",
      reason: "The verification episode has no authoritative task worktree.",
    });
  }
  const command = await loadCommandContext({ cwd: checkout, rootOverride: null });
  const task = await loadTaskFromContext({ ctx: command, taskId: opts.input.task_id });
  let passed = false;
  let failureReason = "A declared branch_pr verification check failed.";
  try {
    const formal = await recordDirectTaskFormalOperation({
      git_root: command.resolvedProject.gitRoot,
      task_id: opts.input.task_id,
      id: "task_verify",
      decision: opts.decide,
      run: async () => {
        const checks = await runDirectTaskVerification({
          command,
          task,
          task_id: opts.input.task_id,
          cwd: checkout,
        });
        passed = checks.status === "passed";
        failureReason = checks.reason ?? failureReason;
        const exitCode = await cmdVerifyParsed({
          ctx: command,
          cwd: checkout,
          taskId: opts.input.task_id,
          state: passed ? "ok" : "needs_rework",
          by: "SUPERVISOR",
          note: passed
            ? "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
            : `Rework: ${failureReason}`,
          details: renderDirectTaskVerificationDetails({
            task,
            taskId: opts.input.task_id,
            workflow: "branch_pr",
            result: checks,
          }),
          localOnly: false,
          repoFixable: !passed,
          incidentTags: [],
          incidentMatch: [],
          quiet: true,
        });
        if (exitCode !== 0) throw new Error(`Verification record exited with ${exitCode}.`);
        await commitBranchSupervisorTaskArtifacts({
          command,
          cwd: checkout,
          task_id: opts.input.task_id,
          message: branchSupervisorArtifactCommitMessage(
            opts.input.task_id,
            passed ? "verification_pass" : "verification_rework",
          ),
        });
        return {
          verification: passed ? "ok" : "needs_rework",
          declared_checks: checks.artifact_path,
        };
      },
    });
    const journal = journalProjection(formal.journal, formal.journal_path);
    if (!passed) {
      return stoppedEpisode({
        decision: formal.decision,
        code: "verification_failed",
        reason: failureReason,
        journal,
        lifecycle_calls: 1,
      });
    }
    return {
      status: "completed",
      decision: formal.decision,
      journal,
      provider_episodes: 0,
      lifecycle_calls: 1,
    };
  } catch (error) {
    return stoppedEpisode({
      decision: opts.decision,
      code: "verification_failed",
      reason:
        "The CLI could not complete and commit the branch verification operation " +
        `(${error instanceof Error ? `${error.name}: ${error.message}` : "unknown_error"}).`,
    });
  }
}

async function executeBranchEvaluatorEpisode(opts: {
  input: BranchTaskSupervisorOptions;
  decision: TaskRouteDecision;
  decide: () => Promise<TaskRouteDecision>;
}): Promise<BranchEpisodeOutcome> {
  const checkout = opts.decision.executionPacket.mustRunFrom;
  if (!checkout) {
    return stoppedEpisode({
      decision: opts.decision,
      code: "route_refresh_failed",
      reason: "The EVALUATOR episode has no authoritative task worktree.",
    });
  }
  const command = await loadCommandContext({ cwd: checkout, rootOverride: null });
  const task = await loadTaskFromContext({ ctx: command, taskId: opts.input.task_id });
  let episode: Awaited<ReturnType<typeof runAndApplyDirectTaskEvaluator>>;
  try {
    episode = await runAndApplyDirectTaskEvaluator({
      ctx: { cwd: checkout },
      command,
      task,
      task_id: opts.input.task_id,
      evaluator_id: "recovery-context",
    });
    await commitBranchSupervisorTaskArtifacts({
      command,
      cwd: checkout,
      task_id: opts.input.task_id,
      message: branchSupervisorArtifactCommitMessage(opts.input.task_id, "evaluator_verdict"),
    });
  } catch (error) {
    return stoppedEpisode({
      decision: opts.decision,
      code: "evaluator_adapter_crash",
      reason:
        "The independent EVALUATOR did not produce and commit a typed verdict " +
        `(${error instanceof Error ? error.name : "unknown_error"}).`,
      provider_episodes: 1,
    });
  }
  const refreshed = await opts.decide();
  let journal: SupervisorExecutionEpisodeJournal = episode.execution.journal;
  if (journal.status === "running" && journal.cursor.phase === "completed") {
    journal = advanceSupervisorExecutionEpisodeState({
      journal,
      state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
      route_observation: { step_id: refreshed.workflowStep.id },
    });
    await episode.execution.store.write(journal);
  }
  const evaluator = episode.result;
  const journalRef = journalProjection(journal, episode.execution.store.path);
  if (evaluator.verdict === "rework") {
    return {
      status: "completed",
      decision: refreshed,
      evaluator,
      journal: journalRef,
      provider_episodes: 1,
      lifecycle_calls: 1,
    };
  }
  if (evaluator.verdict !== "pass") {
    return stoppedEpisode({
      decision: refreshed,
      code: evaluator.verdict === "human_review" ? "evaluator_human_review" : "evaluator_blocked",
      reason: `EVALUATOR returned ${evaluator.verdict}; no PR side effect was attempted.`,
      evaluator,
      journal: journalRef,
      provider_episodes: 1,
      lifecycle_calls: 1,
    });
  }
  if (journal.status !== "running") {
    return stoppedEpisode({
      decision: refreshed,
      code: "evaluator_human_review",
      reason:
        "EVALUATOR produced a verdict, but the supervisor journal stopped before route advancement.",
      evaluator,
      journal: journalRef,
      provider_episodes: 1,
      lifecycle_calls: 1,
    });
  }
  return {
    status: "completed",
    decision: refreshed,
    evaluator,
    journal: journalRef,
    provider_episodes: 1,
    lifecycle_calls: 1,
  };
}

export async function executeProductionBranchEpisode(opts: {
  input: BranchTaskSupervisorOptions;
  decision: TaskRouteDecision;
  decide: () => Promise<TaskRouteDecision>;
}): Promise<BranchEpisodeOutcome> {
  const recovery = await recoverProductionBranchConflict(opts);
  if (recovery) return recovery;
  const step = opts.decision.workflowStep;
  if (step.kind !== "agent_episode") {
    return stoppedEpisode({
      decision: opts.decision,
      code: "unsupported_agent_episode",
      reason: "The branch episode executor received a non-agent route.",
    });
  }
  if (step.episode.purpose === "verification") {
    return await executeBranchVerificationEpisode(opts);
  }
  if (step.episode.purpose === "quality_review") {
    return await executeBranchEvaluatorEpisode(opts);
  }
  if (
    step.episode.purpose === "implementation" ||
    step.episode.purpose === "implementation_rework"
  ) {
    return await executeBranchImplementationEpisode(opts);
  }
  return stoppedEpisode({
    decision: opts.decision,
    code: "unsupported_agent_episode",
    reason:
      "Task-worktree intent resolution remains a semantic human/CODER stop; the CLI will not guess which changes to keep.",
  });
}
