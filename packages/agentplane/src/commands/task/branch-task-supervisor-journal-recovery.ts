import {
  completeSupervisorExecutionEpisode,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  refreshPendingReplacementSupervisorExecutionEpisode,
  reopenCompletedSupervisorExecutionEpisodeAfterStaleState,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";

export async function recoverBranchImplementationJournal(opts: {
  opened: Awaited<ReturnType<typeof openSupervisorExecutionEpisode>>;
  journal: SupervisorExecutionEpisodeJournal;
  decision: TaskRouteDecision;
  task: TaskData;
  replace_failed_operation: boolean;
}): Promise<SupervisorExecutionEpisodeJournal> {
  let journal = opts.journal;
  const fingerprint = opts.decision.workflowStep.preconditionFingerprint.digest;
  const interruptedPredispatch = journal.operations.at(-1);
  if (
    opts.replace_failed_operation &&
    journal.status === "running" &&
    journal.cursor.phase === "intent_recorded" &&
    journal.cursor.operation_key === interruptedPredispatch?.operation_key &&
    interruptedPredispatch.status === "intent" &&
    interruptedPredispatch.kind === "agent_episode" &&
    interruptedPredispatch.work_order_ref === null &&
    interruptedPredispatch.progress_digest === null &&
    opts.decision.workflowStep.kind === "agent_episode" &&
    opts.decision.workflowStep.episode.purpose === "implementation_rework" &&
    opts.task.status === "DONE" &&
    Object.hasOwn(opts.task.extensions ?? {}, TASK_KERNEL_EXTENSION)
  ) {
    const failed = completeSupervisorExecutionEpisode({
      journal,
      operation_key: interruptedPredispatch.operation_key,
      result: { error: "canonical_rework_predispatch_interrupted" },
      failed: true,
    });
    const replacement = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
      journal: failed,
      state_fingerprint_digest: fingerprint,
    });
    if (!(await opts.opened.store.compareAndSwap(journal.digest, replacement))) {
      throw new Error("Branch supervisor journal changed during pre-dispatch recovery.");
    }
    journal = replacement;
  }
  if (journal.status === "stopped" && opts.replace_failed_operation) {
    const replacement = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
      journal,
      state_fingerprint_digest: fingerprint,
    });
    if (!(await opts.opened.store.compareAndSwap(journal.digest, replacement))) {
      throw new Error("Branch supervisor journal changed during replacement preparation.");
    }
    journal = replacement;
  }
  const replacementOperation = journal.operations.at(-1);
  if (
    journal.status === "running" &&
    journal.cursor.phase === "ready" &&
    journal.cursor.replacement_of_operation_key === replacementOperation?.operation_key &&
    replacementOperation?.status === "failed" &&
    journal.state_fingerprint_digest !== fingerprint
  ) {
    const refreshed = refreshPendingReplacementSupervisorExecutionEpisode({
      journal,
      state_fingerprint_digest: fingerprint,
    });
    if (!(await opts.opened.store.compareAndSwap(journal.digest, refreshed))) {
      throw new Error("Branch supervisor journal changed during replacement refresh.");
    }
    journal = refreshed;
  }
  if (journal.status === "stopped" && journal.stop?.reason === "stale_state") {
    const reopened = reopenCompletedSupervisorExecutionEpisodeAfterStaleState({
      journal,
      state_fingerprint_digest: fingerprint,
    });
    if (!(await opts.opened.store.compareAndSwap(journal.digest, reopened))) {
      throw new Error("Branch supervisor journal changed during stale-state recovery.");
    }
    journal = reopened;
  }
  return journal;
}
