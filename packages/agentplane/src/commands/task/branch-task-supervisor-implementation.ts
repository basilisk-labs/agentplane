import {
  advanceSupervisorExecutionEpisodeState,
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { projectExecutedTaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";
import type { executeTaskRunnerExecution } from "../../runner/usecases/task-run.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import type {
  BranchEpisodeOutcome,
  BranchEvaluatorEvidence,
  BranchExecutorEvidence,
  BranchTaskSupervisorOptions,
  BranchTaskSupervisorStopCode,
} from "./branch-task-supervisor.js";
import type { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import { readDirectTaskHead } from "./direct-task-finalization.js";

import { prepareDirectImplementationEvidence } from "./direct-task-supervisor-implementation.js";
import { observeDirectExecutor } from "./direct-task-supervisor-observation.js";
import type { JournalProjection } from "./direct-task-supervisor-result.js";
import { journalProjection } from "./direct-task-supervisor-result.js";

import { cmdTaskSetStatus } from "./set-status.js";

import { commitBranchSupervisorTaskArtifacts } from "./branch-task-supervisor-artifact-commit.js";

import {
  observedExternalEffectsFromRunnerResult,
  recordObservedTaskExecutionContract,
} from "./task-execution-contract-observation.js";
import { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import path from "node:path";

import { taskCentricDigest } from "@agentplaneorg/core/tasks";
import { captureRunnerStateFingerprint } from "../../runner/state-fingerprint.js";
import { loadTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import { requiresImplementationReworkReopen } from "../shared/task-scope-extension-request.js";

import { resolveConflictReworkSemanticInput } from "../pr/conflict-rework-semantic-input.js";
import {
  applyConflictResolution,
  commitConflictResolutionSnapshot,
  resolveConflictResolutionSnapshot,
} from "../pr/conflict-rework-merge.js";
import {
  hasPendingManagedConflict,
  loadManagedConflictRecovery,
  managedImplementationStatusNote,
  managedConflictTaskPostconditions,
  finishManagedConflictTaskRecovery,
  managedConflictEvidenceCommitMessage,
  type ManagedConflictApplicationContext,
} from "./branch-task-supervisor-conflict-recovery.js";
import {
  conflictApplicationAuthority,
  conflictRecoveryAuthority,
} from "../pr/conflict-rework-authority.js";

import { readCommitInfo } from "./shared.js";

function operationId(decision: TaskRouteDecision): string | null {
  return decision.workflowStep.kind === "cli_operation" ? decision.workflowStep.operation.id : null;
}

export function stoppedEpisode(opts: {
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

export async function applyBranchImplementationResult(
  opts: {
    input: BranchTaskSupervisorOptions;
    decision: TaskRouteDecision;
    decide: () => Promise<TaskRouteDecision>;
  },
  context: {
    checkout: string;
    command: Awaited<ReturnType<typeof loadCommandContext>>;
    opened: Awaited<ReturnType<typeof openSupervisorExecutionEpisode>>;
    journal: SupervisorExecutionEpisodeJournal;
    executed: Awaited<ReturnType<typeof executeTaskRunnerExecution>>;
    eventsBefore: number;
    executionBaseCommit: string | null;
    executionBaselineStatus: Awaited<ReturnType<typeof readDirectRepositoryStatus>>;
    acceptedRoute: TaskRouteDecision | null;
    applicationContext: ManagedConflictApplicationContext | null;
    recovery?: boolean;
  },
): Promise<BranchEpisodeOutcome> {
  const {
    checkout,
    command,
    opened,
    executed,
    eventsBefore,
    executionBaseCommit,
    executionBaselineStatus,
    acceptedRoute,
    applicationContext,
  } = context;
  let { journal } = context;
  const step = opts.decision.workflowStep;
  if (step.kind !== "agent_episode") {
    throw new Error("Branch implementation application requires its issued semantic episode.");
  }
  const lifecycle = projectExecutedTaskRunnerLifecycleResult({
    task_id: opts.input.task_id,
    execution: executed,
  });
  const journalRef = journalProjection(journal, opened.journal_path);
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
      reason: "The EXECUTOR changed task lifecycle events; branch_pr lifecycle remains CLI-owned.",
      journal: journalRef,
      executor_lifecycle_event_delta: eventDelta,
      provider_episodes: 1,
    });
  }
  const order = executed.bundle.work_order;
  const conflict = order
    ? resolveConflictReworkSemanticInput({
        task_id: order.task.id,
        checkout,
        head: order.state_fingerprint.git_head,
        writable_roots: order.authority.writable_roots,
        required_inputs: order.required_inputs,
      })
    : null;
  if (step.id === "agent.provider_conflict_rework" && !conflict) {
    throw new Error("Managed conflict execution has no bound context.");
  }
  if (conflict && order) {
    const run = await loadTaskRunnerInspection({
      ctx: command,
      cwd: checkout,
      task_id: opts.input.task_id,
      run_id: executed.invocation.run_id,
    });
    if (
      run.state.status !== "success" ||
      taskCentricDigest(run.state.result) !== taskCentricDigest(executed.result) ||
      taskCentricDigest(run.bundle.work_order) !== taskCentricDigest(order)
    )
      throw new Error("Managed conflict result differs from its persisted runner authority.");
    const accepted = await captureRunnerStateFingerprint({ ctx: command, bundle: run.bundle });
    if (
      (!context.recovery || accepted.git_head === executionBaseCommit) &&
      (accepted.git_head !== executionBaseCommit ||
        accepted.components.git.digest !== executed.state_after.components.git.digest)
    ) {
      throw new Error("Managed conflict workspace changed after the observed result.");
    }
    if (
      acceptedRoute?.task.planApproval !== opts.decision.task.planApproval ||
      taskCentricDigest(acceptedRoute?.task.execution_contract) !==
        taskCentricDigest(opts.decision.task.execution_contract)
    ) {
      throw new Error("Managed conflict execution contract changed during the runner episode.");
    }
    const assertAuthority = async () => {
      const current = await opts.decide();
      const provider = current.prFlow?.providerObservation;
      if (
        digestSupervisorEpisodeValue({
          authority:
            context.recovery && applicationContext
              ? await conflictRecoveryAuthority({
                  command,
                  checkout,
                  decision: current,
                  order,
                  context: applicationContext,
                  changed_paths: executed.result.evidence?.changed_paths ?? [],
                })
              : conflictApplicationAuthority(current),
          implementation: applicationContext,
        }) !== journal.operations.at(-1)?.progress_digest ||
        provider?.state !== "found" ||
        provider.pr.status !== "OPEN" ||
        provider.pr.provider !== conflict.provider.name ||
        provider.pr.prNumber !== conflict.provider.pr_number ||
        provider.pr.headSha !== conflict.provider.head_sha ||
        provider.pr.headRef !== conflict.provider.branch ||
        provider.pr.base !== conflict.provider.base ||
        provider.pr.baseSha !== conflict.provider.base_sha
      ) {
        throw new Error("Managed conflict task or provider authority changed.");
      }
    };
    await assertAuthority();
    const changed =
      executed.result.evidence?.provenance === "supervisor_observed"
        ? (executed.result.evidence.changed_paths ?? [])
        : [];
    const resultDigest = taskCentricDigest({
      run_id: run.run_id,
      work_order: order.work_order_id,
      result: run.state.result,
    });
    if (changed.length > 0 && (!context.recovery || accepted.git_head === executionBaseCommit))
      await commitConflictResolutionSnapshot({
        command,
        cwd: checkout,
        task_id: opts.input.task_id,
        result_digest: resultDigest,
        changed_paths: changed,
      });
    const head = await readDirectTaskHead(checkout);
    if (!executionBaseCommit || !head) throw new Error("Managed conflict snapshot is unavailable.");
    const snapshot = context.recovery
      ? await resolveConflictResolutionSnapshot({
          cwd: checkout,
          task_id: opts.input.task_id,
          baseline: executionBaseCommit,
          head,
          base: conflict.local.base_head_sha,
          result_digest: resultDigest,
        })
      : head;
    const roots = order.authority.writable_roots.map(
      (root) => path.relative(checkout, root).replaceAll(path.sep, "/") || ".",
    );
    await applyConflictResolution({
      cwd: checkout,
      task_id: opts.input.task_id,
      task_branch: conflict.task_worktree.branch,
      base_ref: conflict.provider.base,
      task_head: executionBaseCommit,
      resolution_snapshot: snapshot,
      base: conflict.local.base_head_sha,
      merge_base: conflict.local.merge_base_sha,
      semantic_result_digest: resultDigest,
      assert_authority: assertAuthority,
      allowed_path: (file) =>
        roots.some((root) => root === "." || file === root || file.startsWith(`${root}/`)) ||
        file.startsWith(`.agentplane/tasks/${opts.input.task_id}/`),
    });
  }
  const implementation = await prepareDirectImplementationEvidence({
    command,
    cwd: checkout,
    task_id: opts.input.task_id,
    execution_base_commit: conflict?.local.base_head_sha ?? executionBaseCommit,
    observed_base_commit: conflict ? (executionBaseCommit ?? undefined) : undefined,
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
  const taskExecution =
    opts.input.task_execution ??
    (await resolveTaskExecutionContext({
      ctx: command,
      tasks: [currentTask],
      primaryTaskId: currentTask.id,
    }));
  const reconciliation = await recordObservedTaskExecutionContract({
    command,
    execution: taskExecution,
    task: currentTask,
    changed_paths: implementation.evidence.changed_paths,
    observed_external_effects: observedExternalEffectsFromRunnerResult(lifecycle.result),
    preserved_commit: commit,
  });
  if (reconciliation.task.execution_contract?.observed.authority_violations.length) {
    return stoppedEpisode({
      decision: opts.decision,
      code: "implementation_scope_violation",
      reason:
        "Supervisor-observed changes exceeded the execution contract authority; preserve the committed work and require a corrected scope or explicit side-effect authority before continuing.",
      journal: journalRef,
      provider_episodes: 1,
      executor_lifecycle_event_delta: eventDelta,
    });
  }
  const reopen =
    conflict !== null &&
    requiresImplementationReworkReopen({
      purpose: step.episode.purpose,
      task_status: currentTask.status,
      work_item_id: order?.task.work_item_id ?? null,
      work_item_is_required: false,
    });
  await cmdTaskSetStatus({
    ctx: command,
    cwd: checkout,
    taskId: opts.input.task_id,
    status: "DOING",
    author: "SUPERVISOR",
    body: managedImplementationStatusNote(commit),
    at: applicationContext?.status_at,
    commit,
    force: reopen,
    yes: reopen,
    commitFromComment: !conflict,
    commitAllow: [],
    commitAutoAllow: false,
    commitAllowTasks: true,
    commitRequireClean: false,
    confirmStatusCommit: !conflict,
    quiet: true,
  });
  if (applicationContext) {
    const commitInfo = await readCommitInfo(checkout, commit);
    const expected = managedConflictTaskPostconditions({
      context: applicationContext,
      checkout,
      workflow_dir: command.config.paths.workflow_dir,
      commit: { hash: commitInfo.hash, message: commitInfo.message },
      changed_paths: implementation.evidence.changed_paths,
      observed_external_effects: observedExternalEffectsFromRunnerResult(lifecycle.result),
    });
    const actual = await command.taskBackend.getTask(opts.input.task_id);
    if (taskCentricDigest(actual) !== taskCentricDigest(expected.applied)) {
      throw new Error("Managed conflict Task projection differs from its exact postcondition.");
    }
  }
  if (conflict) {
    if (!applicationContext)
      throw new Error("Managed conflict artifact commit has no bound context.");
    await commitBranchSupervisorTaskArtifacts({
      command,
      cwd: checkout,
      task_id: opts.input.task_id,
      message: managedConflictEvidenceCommitMessage({
        context: applicationContext,
        result: executed.result,
        decision: await opts.decide(),
      }),
    });
  }
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
    provider_episodes: context.recovery ? 0 : 1,
    lifecycle_calls: 1,
    executor_lifecycle_event_delta: eventDelta,
  };
}

export async function recoverProductionBranchConflict(opts: {
  input: BranchTaskSupervisorOptions;
  decision: TaskRouteDecision;
  decide: () => Promise<TaskRouteDecision>;
}): Promise<BranchEpisodeOutcome | null> {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.input.command.resolvedProject.gitRoot,
    task_id: opts.input.task_id,
  });
  const store = createSupervisorEpisodeStore(journalPath);
  const persisted = await store.read();
  if (!persisted) return null;
  const observed = validateSupervisorExecutionEpisodeJournal(persisted);
  if (!hasPendingManagedConflict(observed)) return null;
  const checkout = opts.decision.workspace.taskWorktreePath;
  if (!checkout) throw new Error("Pending managed conflict has no authoritative task worktree.");
  const command = await loadCommandContext({ cwd: checkout, rootOverride: null });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease)
    return stoppedEpisode({
      decision: opts.decision,
      code: "supervisor_stopped",
      reason: "Another supervisor owns the pending managed conflict application.",
      journal: journalProjection(observed, journalPath),
    });
  try {
    const journal = validateSupervisorExecutionEpisodeJournal(await store.read());
    if (journal.digest !== observed.digest) {
      throw new Error("Managed conflict journal changed before application recovery.");
    }
    const decision = await opts.decide();
    const recovery = await loadManagedConflictRecovery({
      command,
      checkout,
      task_id: opts.input.task_id,
      journal,
      decision,
    });
    const input = recovery.applicationContext;
    if (recovery.taskApplication)
      return await finishManagedConflictTaskRecovery({
        command,
        checkout,
        task_id: opts.input.task_id,
        journal,
        store,
        executed: recovery.executed,
        context: input,
        implementation_commit: recovery.taskApplication.implementation_commit,
        allow_unverified_receipt:
          opts.input.danger_authority?.danger_full_access_authorized === true,
        decide: opts.decide,
      });
    return await applyBranchImplementationResult(
      {
        ...opts,
        decision: recovery.issuedDecision,
      },
      {
        checkout,
        command,
        opened: { journal, store, journal_path: journalPath },
        journal,
        executed: recovery.executed,
        eventsBefore: input.execution_lifecycle_event_count,
        executionBaseCommit: input.execution_base_commit,
        executionBaselineStatus: input.execution_baseline_status,
        acceptedRoute: decision,
        applicationContext: input,
        recovery: true,
      },
    );
  } finally {
    await lease.release();
  }
}
