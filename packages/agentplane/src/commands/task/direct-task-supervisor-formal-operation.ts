import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";

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
  let journal = opened.journal;
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
  if (journal.cursor.phase !== "ready") {
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "Direct task supervisor has an unresolved operation intent; resolve it before continuing.",
    });
  }
  const started = startSupervisorExecutionEpisode({
    journal,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: { direct_task_operation: opts.id },
    precondition_fingerprint_digest: before.workflowStep.preconditionFingerprint.digest,
    authority_ref: `direct-task-supervisor:${opts.id}`,
    authority_digest: before.workflowStep.preconditionFingerprint.digest,
    effect_ref: opts.id,
  });
  if (started.status !== "started") {
    await opened.store.write(started.journal);
    throw new CliError({
      code: "E_RUNTIME",
      message: `Direct task supervisor cannot start ${opts.id}: ${started.status}.`,
    });
  }
  journal = started.journal;
  await opened.store.write(journal);
  try {
    const result = await opts.run();
    journal = completeSupervisorExecutionEpisode({
      journal,
      operation_key: started.operation_key,
      result: { direct_task_operation: opts.id, result },
    });
    await opened.store.write(journal);
  } catch (error) {
    journal = completeSupervisorExecutionEpisode({
      journal,
      operation_key: started.operation_key,
      result: {
        direct_task_operation: opts.id,
        error: error instanceof Error ? error.name : "unknown",
      },
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
}
