import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  reopenCompletedSupervisorExecutionEpisodeAfterStaleState,
  resumeSupervisorExecutionEpisodeAfterInternalAnomaly,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
  type SupervisorEpisodeOperationKind,
  type SupervisorExecutionBudget,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { CliError } from "../../shared/errors.js";

import type { TaskRouteDecision } from "./route-decision-types.js";
import {
  superviseWorkflowStep,
  type WorkflowSupervisorExecution,
  type WorkflowSupervisorExecutor,
} from "./workflow-supervisor.js";
import {
  buildSingleStageLifecycleTiming,
  workflowOperationLifecycleStage,
} from "./lifecycle-stage-timing.js";
import { observedRunnerUsage } from "./supervisor-execution-observation.js";
import { recoverProvenNotAppliedWorktreePreparation } from "./supervisor-execution-effect-recovery.js";

import { tryAcquireSupervisorExecutionLease } from "./supervisor-execution-lease.js";

export { tryAcquireSupervisorExecutionLease } from "./supervisor-execution-lease.js";

import {
  createSupervisorEpisodeStore,
  openSupervisorExecutionEpisode,
  openGitLabSupervisorExecutionEpisode,
  openLegacyWorkflowSupervisorExecutionEpisode,
  publishLegacyWorkflowJournalTransition,
  LegacyJournalOriginConflictError,
  resolveSupervisorExecutionEpisodePath,
  readProviderUpdateJournalProvider,
  publishGitLabJournalTransition,
  GitLabJournalPublicationError,
  withGitLabJournalLease,
} from "./supervisor-execution-journal.js";
export {
  openSupervisorExecutionEpisode,
  resolveSupervisorExecutionEpisodePath,
  createSupervisorEpisodeStore,
  type SupervisorEpisodeStore,
} from "./supervisor-execution-journal.js";

/**
 * Hold the same task-wide execution lease used by managed and external work while a competing
 * admission path rechecks the durable journal and commits its CAS. A busy lease is a formal loss,
 * not a reason to continue with a task-record CAS alone.
 */
export async function withSupervisorExecutionAdmissionFence<T>(opts: {
  journal_path: string;
  run: (journal: unknown) => Promise<T>;
}): Promise<{ kind: "completed"; result: T } | { kind: "busy" }> {
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: opts.journal_path });
  if (!lease) return { kind: "busy" };
  try {
    const journal = await createSupervisorEpisodeStore(opts.journal_path).read();
    return { kind: "completed", result: await opts.run(journal) };
  } finally {
    await lease.release();
  }
}

export async function preparePersistedSupervisorReplacementAfterFailure(opts: {
  git_root: string;
  task_id: string;
  state_fingerprint_digest: string;
}): Promise<"prepared" | "anomaly_resumed" | "already_prepared" | "not_failed"> {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.git_root,
    task_id: opts.task_id,
  });
  if ((await createSupervisorEpisodeStore(journalPath).read()) === null) return "not_failed";
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const opened = await openSupervisorExecutionEpisode({
      git_root: opts.git_root,
      task_id: opts.task_id,
      task_revision: null,
      state_fingerprint_digest: opts.state_fingerprint_digest,
      recover_intent: false,
    });
    const journal = opened.journal;
    if (
      journal.status === "running" &&
      journal.cursor.phase === "ready" &&
      typeof journal.cursor.replacement_of_operation_key === "string"
    ) {
      return "already_prepared";
    }
    const latest = journal.operations.at(-1);
    if (journal.status === "stopped" && journal.stop?.reason === "internal_anomaly") {
      const resumed = resumeSupervisorExecutionEpisodeAfterInternalAnomaly({
        journal,
        state_fingerprint_digest: opts.state_fingerprint_digest,
      });
      if (await opened.store.compareAndSwap(journal.digest, resumed)) return "anomaly_resumed";
      continue;
    }
    const recoverableFailure =
      journal.status === "stopped" &&
      latest?.status === "failed" &&
      (journal.stop?.reason === "operation_failed" || journal.stop?.reason === "stale_state");
    if (!recoverableFailure) {
      return "not_failed";
    }
    const replacement = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
      journal,
      state_fingerprint_digest: opts.state_fingerprint_digest,
    });
    if (await opened.store.compareAndSwap(journal.digest, replacement)) return "prepared";
  }
  throw new Error(
    "Supervisor episode journal changed while failed-operation replacement was being prepared.",
  );
}

function operationKind(decision: TaskRouteDecision): SupervisorEpisodeOperationKind {
  const operation =
    decision.workflowStep.kind === "cli_operation" ? decision.workflowStep.operation : null;
  if (operation?.id === "runner.follow" && operation.params.mode === "run") {
    return "agent_episode";
  }
  return "cli_operation";
}

function operationRole(opts: {
  decision: TaskRouteDecision;
  kind: SupervisorEpisodeOperationKind;
}): "EXECUTOR" | "CURATOR" | "EVALUATOR" {
  if (opts.kind === "evaluator_episode") return "EVALUATOR";
  return opts.decision.task.owner.trim().toUpperCase() === "CURATOR" ? "CURATOR" : "EXECUTOR";
}

function stoppedExecution(opts: {
  decision: TaskRouteDecision;
  reason: string;
}): WorkflowSupervisorExecution {
  return {
    decision: opts.decision,
    operation:
      opts.decision.workflowStep.kind === "cli_operation"
        ? opts.decision.workflowStep.operation
        : null,
    executable: false,
    stop_reason: opts.reason,
    audit: [],
    result: null,
    refreshed_decision: null,
  };
}

/**
 * Persist the intent before calling the existing typed supervisor. A restart
 * can therefore distinguish an uncompleted provider/effect from a completed
 * one and refuses to replay it implicitly.
 */
export async function supervisePersistedWorkflowEpisode(opts: {
  decision: TaskRouteDecision;
  git_root: string;
  task_revision?: number | null;
  execute: WorkflowSupervisorExecutor;
  refresh: () => Promise<TaskRouteDecision>;
  budget?: SupervisorExecutionBudget;
}): Promise<{
  execution: WorkflowSupervisorExecution;
  journal: SupervisorExecutionEpisodeJournal;
  journal_path: string;
}> {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.git_root,
    task_id: opts.decision.task.id,
  });
  const guarded = await usesGitLabJournal(opts.decision, journalPath);
  const run = () => runPersistedWorkflowEpisode(opts, guarded);
  return guarded
    ? await withGitLabJournalLease({
        journal_path: journalPath,
        run,
        failed: ({ execution }) =>
          execution.stop_reason !== null ||
          execution.result?.status === "failed" ||
          (execution.result?.exit_code ?? 0) !== 0,
      })
    : await run();
}

async function usesGitLabJournal(decision: TaskRouteDecision, journalPath: string) {
  const operation =
    decision.workflowStep.kind === "cli_operation" ? decision.workflowStep.operation : null;
  const provider =
    operation?.id === "provider.pr.update_branch"
      ? operation.params.identity.provider
      : decision.prFlow?.pr?.provider;
  const retained = await readProviderUpdateJournalProvider(
    createSupervisorEpisodeStore(journalPath),
  );
  if (retained === "gitlab" && (decision.prFlow?.adoption || provider === "github"))
    throw new CliError({
      code: "E_RUNTIME",
      message: "The current route conflicts with the retained task-owned GitLab update.",
      context: { reason_code: "provider_update_journal_route_conflict" },
    });
  if (retained === "github" && provider === "gitlab")
    throw new CliError({
      code: "E_RUNTIME",
      message: "The current route conflicts with the retained provider update.",
      context: { reason_code: "provider_update_journal_route_conflict" },
    });
  if (retained === "gitlab") return true;
  if (retained === "adopted" || retained === "github") return false;
  if (decision.prFlow?.adoption) return false;
  if (provider === "gitlab") return true;
  if (provider === "github") return false;
  if (retained === "unproven")
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "The retained provider update has no proven identity. Refresh the provider route before changing its journal.",
      context: { reason_code: "provider_update_journal_identity_unproven" },
    });
  return false;
}

async function runPersistedWorkflowEpisode(
  opts: Parameters<typeof supervisePersistedWorkflowEpisode>[0],
  gitLabJournal: boolean,
) {
  const currentFingerprint = opts.decision.workflowStep.preconditionFingerprint.digest;
  const opened = await (
    gitLabJournal
      ? openGitLabSupervisorExecutionEpisode
      : openLegacyWorkflowSupervisorExecutionEpisode
  )({
    git_root: opts.git_root,
    task_id: opts.decision.task.id,
    task_revision: opts.task_revision ?? null,
    state_fingerprint_digest: currentFingerprint,
    budget: opts.budget,
  });
  let journal = opened.journal;
  const store = opened.store;
  const publishJournal = async (
    before: SupervisorExecutionEpisodeJournal,
    next: SupervisorExecutionEpisodeJournal,
    phase: "dispatch" | "state" = "state",
  ) => {
    if (gitLabJournal) await publishGitLabJournalTransition({ store, before, next, phase });
    else await publishLegacyWorkflowJournalTransition({ store, before, next });
  };
  const operation =
    opts.decision.workflowStep.kind === "cli_operation"
      ? opts.decision.workflowStep.operation
      : null;
  if (!operation) {
    const inspected = await superviseWorkflowStep({ decision: opts.decision, mode: "inspect" });
    return {
      execution: inspected,
      journal,
      journal_path: opened.journal_path,
    };
  }

  journal = await recoverProvenNotAppliedWorktreePreparation({
    journal,
    operation,
    state_fingerprint_digest: currentFingerprint,
    compare_and_swap: store.compareAndSwap,
  });

  // A restart can observe the durable agent outcome before the route cursor
  // was advanced. Refresh and commit that observation first; launching a new
  // provider here would replay an already completed semantic episode.
  if (journal.status === "running" && journal.cursor.phase === "completed") {
    const refreshed = await opts.refresh();
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal,
      state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
      route_observation: { step_id: refreshed.workflowStep.id },
    });
    await publishJournal(journal, advanced);
    journal = advanced;
    return {
      execution: {
        ...(await superviseWorkflowStep({ decision: refreshed, mode: "inspect" })),
        refreshed_decision: refreshed,
      },
      journal,
      journal_path: store.path,
    };
  }

  const operationAlreadyCompleted = journal.operations.some(
    (entry) => entry.status === "completed" && entry.effect_ref === operation.idempotencyKey,
  );
  if (operationAlreadyCompleted) {
    return {
      execution: stoppedExecution({
        decision: opts.decision,
        reason:
          "supervisor episode already completed this idempotency key; refresh provider or route truth before another side effect",
      }),
      journal,
      journal_path: store.path,
    };
  }

  const kind = operationKind(opts.decision);
  const start = () =>
    startSupervisorExecutionEpisode({
      journal,
      role: operationRole({ decision: opts.decision, kind }),
      kind,
      operation_identity: operation,
      ...(operation.id === "integration.run_next"
        ? {
            recovery_context: {
              schema_version: 1,
              kind: "integration_run_next",
              task_id: opts.decision.task.id,
              repository_root: opts.git_root,
              queue: opts.decision.prFlow?.queue ?? null,
              provider: opts.decision.prFlow?.providerObservation ?? null,
              branch: opts.decision.prFlow?.branch ?? null,
            },
          }
        : (operation.id === "provider.pr.update_branch" && opts.decision.prFlow?.adoption) ||
            operation.id === "integration.adopted_merge"
          ? {
              recovery_context: {
                schema_version: 1,
                kind: "adopted_provider_effect",
                task_id: opts.decision.task.id,
                adoption: opts.decision.prFlow?.adoption ?? null,
              },
            }
          : operation.id === "provider.pr.update_branch" &&
              operation.params.identity.provider === "gitlab"
            ? {
                recovery_context: {
                  schema_version: 1,
                  kind: "gitlab_provider_update_branch",
                  task_id: opts.decision.task.id,
                },
              }
            : {}),
      precondition_fingerprint_digest: currentFingerprint,
      authority_ref: `workflow-operation:${operation.id}`,
      authority_digest: operation.preconditionFingerprint.digest,
      effect_ref: operation.idempotencyKey,
      ...(journal.cursor.replacement_of_operation_key
        ? { replacement_of_operation_key: journal.cursor.replacement_of_operation_key }
        : {}),
    });
  let started = start();
  if (started.status === "stopped" && started.stop.reason === "stale_state") {
    const reopened = reopenCompletedSupervisorExecutionEpisodeAfterStaleState({
      journal: started.journal,
      state_fingerprint_digest: currentFingerprint,
    });
    await publishJournal(journal, reopened);
    journal = reopened;
    started = start();
  }
  const admitted = started.journal;
  await publishJournal(journal, admitted, started.status === "started" ? "dispatch" : "state");
  journal = admitted;
  if (started.status !== "started") {
    return {
      execution: stoppedExecution({
        decision: opts.decision,
        reason:
          started.status === "effect_in_doubt"
            ? "supervisor episode has an effect in doubt; resolve it before retrying"
            : `supervisor episode stopped: ${started.stop.reason} (${started.stop.exhausted_dimensions.join(",") || "none"})`,
      }),
      journal,
      journal_path: store.path,
    };
  }

  let completed = false;
  let refreshed: TaskRouteDecision | null = null;
  const execution = await superviseWorkflowStep({
    decision: opts.decision,
    mode: "execute",
    execute: async ({ operation: invoked }) => {
      const operationStartedAt = performance.now();
      let journalPublicationUncertain = false;
      const timing = (endedAt: number, firstMutation: boolean) => {
        const stage = workflowOperationLifecycleStage({
          operation_id: invoked.id,
          semantic: kind === "agent_episode" || kind === "evaluator_episode",
          evaluator: kind === "evaluator_episode",
        });
        return buildSingleStageLifecycleTiming({
          root_span_id: started.operation_key,
          ...stage,
          started_ms: operationStartedAt,
          ended_ms: endedAt,
          first_scoped_mutation: firstMutation,
        });
      };
      try {
        const result = await opts.execute({ operation: invoked });
        const operationEndedAt = performance.now();
        const observed = observedRunnerUsage({ result });
        const nextJournal = completeSupervisorExecutionEpisode({
          journal,
          operation_key: started.operation_key,
          result: {
            status: result.status,
            observed_postconditions: result.observed_postconditions,
            exit_code: result.exit_code,
          },
          usage: observed.usage,
          provider_usage: observed.provider_usage,
          lifecycle_timing: timing(operationEndedAt, (observed.usage.changed_files ?? 0) > 0),
          ...(observed.progress === undefined ? {} : { progress: observed.progress }),
          failed: result.status !== "succeeded",
        });
        const gitLabUpdated =
          invoked.id === "provider.pr.update_branch" &&
          invoked.params.identity.provider === "gitlab" &&
          result.status === "succeeded" &&
          result.exit_code === 0 &&
          result.observed_postconditions.some((item) =>
            /^provider_update_head:(?:[a-f0-9]{40}|[a-f0-9]{64})$/u.test(item),
          );
        if (gitLabJournal) {
          try {
            await publishJournal(journal, nextJournal);
          } catch (error) {
            journalPublicationUncertain = true;
            if (
              gitLabUpdated &&
              error instanceof GitLabJournalPublicationError &&
              error.durable_state === "before"
            ) {
              const stopped = stopSupervisorExecutionEpisode({
                journal,
                reason: "effect_in_doubt",
              });
              try {
                await publishJournal(journal, stopped);
                journal = stopped;
              } catch {
                // Preserve changed or unreadable state; never replay the provider effect.
              }
            }
            throw error;
          }
          journal = nextJournal;
          completed = result.status === "succeeded" && journal.status === "running";
        } else {
          try {
            await publishJournal(journal, nextJournal);
          } catch (error) {
            journalPublicationUncertain = true;
            throw error;
          }
          journal = nextJournal;
          completed = result.status === "succeeded" && journal.status === "running";
        }
        return result;
      } catch (error) {
        if (journalPublicationUncertain || error instanceof LegacyJournalOriginConflictError)
          throw error;
        if (
          invoked.id === "integration.adopted_merge" ||
          (invoked.id === "provider.pr.update_branch" && opts.decision.prFlow?.adoption) ||
          (invoked.id === "provider.pr.update_branch" &&
            invoked.params.identity.provider === "gitlab" &&
            error instanceof CliError &&
            error.code === "E_RUNTIME" &&
            error.context?.reason_code === "provider_update_effect_in_doubt")
        ) {
          const stopped = stopSupervisorExecutionEpisode({ journal, reason: "effect_in_doubt" });
          if (gitLabJournal) {
            try {
              await publishJournal(journal, stopped);
              journal = stopped;
            } catch {
              // Retain the original typed uncertainty without replacing durable evidence.
            }
          } else {
            try {
              await publishJournal(journal, stopped);
              journal = stopped;
            } catch (publicationError) {
              if (!(publicationError instanceof LegacyJournalOriginConflictError))
                throw publicationError;
            }
          }
          throw error;
        }
        const operationEndedAt = performance.now();
        const failed = completeSupervisorExecutionEpisode({
          journal,
          operation_key: started.operation_key,
          result: { error: error instanceof Error ? error.name : "unknown_error" },
          usage: {
            wall_time_ms: Math.max(0, Math.round(operationEndedAt - operationStartedAt)),
          },
          lifecycle_timing: timing(operationEndedAt, false),
          failed: true,
        });
        if (gitLabJournal) {
          try {
            await publishJournal(journal, failed);
            journal = failed;
          } catch {
            // Preserve both the primary failure and uncertain journal state.
          }
        } else {
          try {
            await publishJournal(journal, failed);
            journal = failed;
          } catch (publicationError) {
            if (!(publicationError instanceof LegacyJournalOriginConflictError))
              throw publicationError;
          }
        }
        throw error;
      }
    },
    refresh: async () => {
      refreshed = await opts.refresh();
      if (completed && journal.status === "running") {
        const advanced = advanceSupervisorExecutionEpisodeState({
          journal,
          state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
          route_observation: {
            step_id: refreshed.workflowStep.id,
          },
        });
        await publishJournal(journal, advanced);
        journal = advanced;
      }
      return refreshed;
    },
  });
  return { execution, journal, journal_path: store.path };
}
