import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  refreshPendingReplacementSupervisorExecutionEpisode,
  reopenCompletedSupervisorExecutionEpisodeAfterStaleState,
  startSupervisorExecutionEpisode,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import {
  openSupervisorExecutionEpisode,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { buildMonotonicLifecycleTiming } from "../shared/lifecycle-stage-timing.js";

export async function recordDirectTaskFormalOperation(opts: {
  git_root: string;
  task_id: string;
  id: "task_verify" | "task_finish";
  run: () => Promise<Record<string, unknown>> | Record<string, unknown>;
  decision: () => Promise<TaskRouteDecision>;
}): Promise<{
  journal: SupervisorExecutionEpisodeJournal;
  journal_path: string;
  decision: TaskRouteDecision;
}> {
  const before = await opts.decision();
  const opened = await openSupervisorExecutionEpisode({
    git_root: opts.git_root,
    task_id: opts.task_id,
    task_revision: null,
    state_fingerprint_digest: before.workflowStep.preconditionFingerprint.digest,
    recover_intent: false,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: opened.journal_path });
  if (!lease) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "Another supervisor owns this task's formal verification or closeout window; no duplicate operation was started.",
    });
  }
  try {
    let journal = opened.journal;
    const interruptedOperation = journal.operations.at(-1);
    if (
      opts.id === "task_verify" &&
      journal.status === "running" &&
      journal.cursor.phase === "intent_recorded" &&
      interruptedOperation?.status === "intent" &&
      interruptedOperation.effect_ref === opts.id &&
      interruptedOperation.operation_key === journal.cursor.operation_key &&
      journal.state_fingerprint_digest !== before.workflowStep.preconditionFingerprint.digest
    ) {
      const failed = completeSupervisorExecutionEpisode({
        journal,
        operation_key: interruptedOperation.operation_key,
        result: {
          direct_task_operation: opts.id,
          error: "interrupted_verification_owner",
        },
        failed: true,
      });
      journal = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
        journal: failed,
        state_fingerprint_digest: before.workflowStep.preconditionFingerprint.digest,
      });
      await opened.store.write(journal);
    }
    if (journal.status === "stopped") {
      throw new CliError({
        code: "E_RUNTIME",
        message: `Direct task supervisor journal is stopped (${journal.stop?.reason ?? "unknown"}).`,
      });
    }
    if (journal.cursor.phase === "completed") {
      journal = advanceSupervisorExecutionEpisodeState({
        journal,
        state_fingerprint_digest: before.workflowStep.preconditionFingerprint.digest,
        route_observation: { direct_task_operation: opts.id, resumed: true },
      });
      await opened.store.write(journal);
    }
    const reservedFailure = journal.operations.at(-1);
    if (
      journal.status === "running" &&
      journal.cursor.phase === "ready" &&
      journal.cursor.replacement_of_operation_key === reservedFailure?.operation_key &&
      reservedFailure?.status === "failed" &&
      journal.state_fingerprint_digest !== before.workflowStep.preconditionFingerprint.digest
    ) {
      journal = refreshPendingReplacementSupervisorExecutionEpisode({
        journal,
        state_fingerprint_digest: before.workflowStep.preconditionFingerprint.digest,
      });
      await opened.store.write(journal);
    }
    const pendingOperation = journal.operations.at(-1);
    const resumedOperationKey =
      journal.cursor.phase === "intent_recorded" &&
      journal.state_fingerprint_digest === before.workflowStep.preconditionFingerprint.digest &&
      pendingOperation?.status === "intent" &&
      pendingOperation.effect_ref === opts.id &&
      pendingOperation.operation_key === journal.cursor.operation_key
        ? pendingOperation.operation_key
        : null;
    if (journal.cursor.phase !== "ready" && resumedOperationKey === null) {
      throw new CliError({
        code: "E_RUNTIME",
        message:
          "Direct task supervisor has an unresolved operation intent; resolve it before continuing.",
      });
    }
    const start = () =>
      startSupervisorExecutionEpisode({
        journal,
        role: "EXECUTOR",
        kind: "cli_operation",
        operation_identity: { direct_task_operation: opts.id },
        precondition_fingerprint_digest: before.workflowStep.preconditionFingerprint.digest,
        authority_ref: `direct-task-supervisor:${opts.id}`,
        authority_digest: before.workflowStep.preconditionFingerprint.digest,
        effect_ref: opts.id,
        ...(journal.cursor.replacement_of_operation_key
          ? { replacement_of_operation_key: journal.cursor.replacement_of_operation_key }
          : {}),
      });
    let started =
      resumedOperationKey === null
        ? start()
        : ({ status: "started", journal, operation_key: resumedOperationKey } as const);
    // A completed runner episode is allowed to advance to the route observed
    // after its own durable outcome. This is distinct from retrying an unknown
    // effect: the helper only reopens a stale journal with a completed latest
    // operation, while interrupted or failed intents remain terminal.
    if (started.status === "stopped" && started.stop.reason === "stale_state") {
      journal = reopenCompletedSupervisorExecutionEpisodeAfterStaleState({
        journal: started.journal,
        state_fingerprint_digest: before.workflowStep.preconditionFingerprint.digest,
      });
      await opened.store.write(journal);
      started = start();
    }
    if (started.status !== "started") {
      await opened.store.write(started.journal);
      throw new CliError({
        code: "E_RUNTIME",
        message: `Direct task supervisor cannot start ${opts.id}: ${started.status}.`,
      });
    }
    journal = started.journal;
    await opened.store.write(journal);
    const operationStartedAt = performance.now();
    const timing = (endedAt: number, verified: boolean) =>
      buildMonotonicLifecycleTiming({
        root_span_id: started.operation_key,
        started_ms: operationStartedAt,
        ended_ms: endedAt,
        spans: [
          {
            span_id: `${started.operation_key}:${opts.id}`,
            parent_span_id: started.operation_key,
            stage: opts.id === "task_verify" ? "native_verification" : "closure",
            category: "local_work",
            started_ms: operationStartedAt,
            ended_ms: endedAt,
          },
          ...(verified
            ? [
                {
                  span_id: `${started.operation_key}:verified_state`,
                  parent_span_id: started.operation_key,
                  stage: "verified_state" as const,
                  category: "local_work" as const,
                  started_ms: endedAt,
                  ended_ms: endedAt,
                },
              ]
            : []),
        ],
      });
    try {
      const result = await opts.run();
      const operationEndedAt = performance.now();
      journal = completeSupervisorExecutionEpisode({
        journal,
        operation_key: started.operation_key,
        result: { direct_task_operation: opts.id, result },
        lifecycle_timing: timing(operationEndedAt, opts.id === "task_verify"),
      });
      await opened.store.write(journal);
    } catch (error) {
      const operationEndedAt = performance.now();
      journal = completeSupervisorExecutionEpisode({
        journal,
        operation_key: started.operation_key,
        result: {
          direct_task_operation: opts.id,
          error: error instanceof Error ? error.name : "unknown",
        },
        lifecycle_timing: timing(operationEndedAt, false),
        failed: true,
      });
      await opened.store.write(journal);
      throw error;
    }
    const after = await opts.decision();
    journal = advanceSupervisorExecutionEpisodeState({
      journal,
      state_fingerprint_digest: after.workflowStep.preconditionFingerprint.digest,
      route_observation: { direct_task_operation: opts.id, step_id: after.workflowStep.id },
    });
    await opened.store.write(journal);
    return { journal, journal_path: opened.journal_path, decision: after };
  } finally {
    await lease.release();
  }
}
