import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
  type SupervisorExecutionEpisodeJournal,
  type SupervisorExecutionUsage,
} from "@agentplaneorg/core/schemas";

import { readCodexProviderUsageForResult } from "../../runner/adapters/codex-result-transport.js";
import {
  projectExecutedTaskRunnerLifecycleResult,
  taskRunnerLifecycleExitCode,
  type TaskRunnerLifecycleResult,
} from "../../runner/usecases/task-run-lifecycle-result.js";
import { executeTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import { cmdCommit } from "../guard/impl/commit.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  openSupervisorExecutionEpisode,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import type {
  BranchEpisodeOutcome,
  BranchEvaluatorEvidence,
  BranchExecutorEvidence,
  BranchTaskSupervisorOptions,
  BranchTaskSupervisorStopCode,
} from "./branch-task-supervisor.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { runAndApplyDirectTaskEvaluator } from "./direct-task-supervisor-evaluator.js";
import { recordDirectTaskFormalOperation } from "./direct-task-supervisor-formal-operation.js";
import { prepareDirectImplementationEvidence } from "./direct-task-supervisor-implementation.js";
import { observeDirectExecutor } from "./direct-task-supervisor-observation.js";
import type { JournalProjection } from "./direct-task-supervisor-result.js";
import { journalProjection } from "./direct-task-supervisor-result.js";
import { runDirectTaskVerification } from "./direct-task-verification.js";
import { cmdTaskSetStatus } from "./set-status.js";
import { cmdVerifyParsed } from "./verify-record.js";

function operationId(decision: TaskRouteDecision): string | null {
  return decision.workflowStep.kind === "cli_operation" ? decision.workflowStep.operation.id : null;
}

function usageFromLifecycle(
  lifecycle: TaskRunnerLifecycleResult,
): Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">> {
  if (lifecycle.phase !== "executed" || !lifecycle.result) return {};
  const provider = readCodexProviderUsageForResult(lifecycle.result);
  const duration = lifecycle.result.metrics?.duration_ms;
  const changedFiles = lifecycle.result.evidence?.files_changed_count;
  return {
    ...(provider ?? {}),
    ...(typeof duration === "number" && Number.isSafeInteger(duration) && duration >= 0
      ? { wall_time_ms: duration }
      : {}),
    ...(typeof changedFiles === "number" && Number.isSafeInteger(changedFiles) && changedFiles >= 0
      ? { changed_files: changedFiles }
      : {}),
  };
}

function stoppedEpisode(opts: {
  decision: TaskRouteDecision;
  code: BranchTaskSupervisorStopCode;
  reason: string;
  journal?: JournalProjection | null;
  executor?: BranchExecutorEvidence;
  evaluator?: BranchEvaluatorEvidence;
  provider_episodes?: number;
  lifecycle_calls?: number;
  executor_lifecycle_event_delta?: number | null;
}): BranchEpisodeOutcome {
  return {
    status: "stopped",
    decision: opts.decision,
    stop: {
      code: opts.code,
      reason: opts.reason,
      route_step_id: opts.decision.workflowStep.id,
      operation_id: operationId(opts.decision),
    },
    journal: opts.journal ?? null,
    ...(opts.executor ? { executor: opts.executor } : {}),
    ...(opts.evaluator ? { evaluator: opts.evaluator } : {}),
    provider_episodes: opts.provider_episodes ?? 0,
    lifecycle_calls: opts.lifecycle_calls ?? 0,
    executor_lifecycle_event_delta: opts.executor_lifecycle_event_delta ?? null,
  };
}

async function commitTaskArtifacts(opts: {
  command: CommandContext;
  cwd: string;
  task_id: string;
  message: string;
}): Promise<void> {
  const exitCode = await cmdCommit({
    ctx: opts.command,
    cwd: opts.cwd,
    taskId: opts.task_id,
    message: opts.message,
    close: false,
    allow: [],
    autoAllow: false,
    allowTasks: true,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: false,
    quiet: true,
    closeUnstageOthers: false,
    closeCheckOnly: false,
  });
  if (exitCode !== 0) {
    throw new Error(`Task artifact commit exited with ${exitCode}.`);
  }
}

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
      effect_ref: `branch-pr:${opts.input.task_id}:${step.preconditionFingerprint.digest}`,
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
        include_remote: true,
        execution_role: step.episode.role,
        ...(opts.input.sandbox_override ? { sandbox_override: opts.input.sandbox_override } : {}),
        ...(opts.input.danger_authority ? { danger_authority: opts.input.danger_authority } : {}),
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
          "The branch EXECUTOR adapter failed after durable intent; the provider will not be replayed automatically.",
        journal: journalProjection(journal, opened.journal_path),
        provider_episodes: 1,
      });
    }
    const lifecycle = projectExecutedTaskRunnerLifecycleResult({
      task_id: opts.input.task_id,
      execution: executed,
    });
    const exitCode = taskRunnerLifecycleExitCode(lifecycle);
    journal = completeSupervisorExecutionEpisode({
      journal,
      operation_key: started.operation_key,
      result: {
        run_id: lifecycle.invocation.run_id,
        work_order_id: lifecycle.invocation.work_order_id,
        receipt: lifecycle.result?.execution_receipt ?? null,
        semantic_status: lifecycle.result?.semantic_result?.value.status ?? null,
      },
      usage: usageFromLifecycle(lifecycle),
      progress: lifecycle.lifecycle.state_fingerprint ?? {
        run_id: lifecycle.invocation.run_id,
        status: lifecycle.lifecycle.status,
      },
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
    const observed = observeDirectExecutor(lifecycle, {
      allow_unverified_receipt: opts.input.danger_authority?.danger_full_access_authorized === true,
    });
    if ("stop" in observed) {
      return stoppedEpisode({
        decision: opts.decision,
        code: observed.stop,
        reason: observed.reason,
        journal: journalRef,
        provider_episodes: 1,
      });
    }
    const currentTask = await loadTaskFromContext({ ctx: command, taskId: opts.input.task_id });
    const eventDelta = (currentTask.events?.length ?? 0) - eventsBefore;
    if (eventDelta !== 0) {
      return stoppedEpisode({
        decision: opts.decision,
        code: "executor_lifecycle_mutation",
        reason:
          "The EXECUTOR changed task lifecycle events; branch_pr lifecycle remains CLI-owned.",
        journal: journalRef,
        executor_lifecycle_event_delta: eventDelta,
        provider_episodes: 1,
      });
    }
    const implementation = await prepareDirectImplementationEvidence({
      command,
      cwd: checkout,
      task_id: opts.input.task_id,
      execution_base_commit: executionBaseCommit,
      execution_baseline_status: executionBaselineStatus,
      allowed_paths: lifecycle.lifecycle.work_order_authority?.writable_roots ?? [],
      observed_changed_paths:
        lifecycle.result?.evidence?.provenance === "supervisor_observed"
          ? (lifecycle.result.evidence.changed_paths ?? [])
          : null,
    });
    if (implementation.status !== "ready") {
      return stoppedEpisode({
        decision: opts.decision,
        code:
          implementation.status === "scope_violation"
            ? "implementation_scope_violation"
            : "implementation_commit_missing",
        reason: implementation.reason,
        journal: journalRef,
        provider_episodes: 1,
        executor_lifecycle_event_delta: eventDelta,
      });
    }
    const commit = implementation.evidence.implementation_commit;
    await cmdTaskSetStatus({
      ctx: command,
      cwd: checkout,
      taskId: opts.input.task_id,
      status: "DOING",
      author: "SUPERVISOR",
      body:
        `Implementation committed: ${commit.slice(0, 12)}. ` +
        "CLI recorded the observed branch EXECUTOR receipt and committed work-unit identity.",
      commit,
      force: false,
      yes: false,
      commitFromComment: true,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      confirmStatusCommit: true,
      quiet: true,
    });
    const refreshed = await opts.decide();
    if (journal.status === "running" && journal.cursor.phase === "completed") {
      journal = advanceSupervisorExecutionEpisodeState({
        journal,
        state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
        route_observation: { step_id: refreshed.workflowStep.id },
      });
      await opened.store.write(journal);
    }
    return {
      status: "completed",
      decision: refreshed,
      executor: {
        ...observed.executor,
        implementation_commit: commit,
      },
      journal: journalProjection(journal, opened.journal_path),
      provider_episodes: 1,
      lifecycle_calls: 1,
      executor_lifecycle_event_delta: eventDelta,
    };
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
          details: checks.checks
            .map((check, index) =>
              [
                `Command: ${check.command}`,
                `Result: ${check.exit_code === 0 ? "pass" : "fail"}`,
                `Evidence: ${checks.artifact_path}#check-${String(index + 1)}`,
                `Scope: branch_pr task ${opts.input.task_id} declared verification`,
              ].join("\n"),
            )
            .join("\n\n"),
          localOnly: false,
          repoFixable: !passed,
          incidentTags: [],
          incidentMatch: [],
          quiet: true,
        });
        if (exitCode !== 0) throw new Error(`Verification record exited with ${exitCode}.`);
        await commitTaskArtifacts({
          command,
          cwd: checkout,
          task_id: opts.input.task_id,
          message: passed
            ? `✅ ${opts.input.task_id} supervisor: record branch verification`
            : `🧪 ${opts.input.task_id} supervisor: record verification rework`,
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
        `(${error instanceof Error ? error.name : "unknown_error"}).`,
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
    await commitTaskArtifacts({
      command,
      cwd: checkout,
      task_id: opts.input.task_id,
      message: `🧭 ${opts.input.task_id} supervisor: record evaluator verdict`,
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
  if (evaluator.verdict !== "pass") {
    return stoppedEpisode({
      decision: refreshed,
      code:
        evaluator.verdict === "rework"
          ? "evaluator_rework"
          : evaluator.verdict === "human_review"
            ? "evaluator_human_review"
            : "evaluator_blocked",
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
