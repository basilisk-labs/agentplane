import {
  completeSupervisorExecutionEpisode,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  reopenSupervisorExecutionEpisodeAfterEffectEvidence,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

export async function recoverNotAppliedWorktreePreparation(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  operation: { id: string; idempotencyKey: string };
  state_fingerprint_digest: string;
  compare_and_swap: (
    expected_digest: SupervisorExecutionEpisodeJournal["digest"],
    replacement: SupervisorExecutionEpisodeJournal,
  ) => Promise<boolean>;
}): Promise<SupervisorExecutionEpisodeJournal> {
  const interruptedOperation = opts.journal.operations.at(-1);
  if (
    opts.operation.id !== "worktree.prepare" ||
    opts.journal.status !== "stopped" ||
    opts.journal.stop?.reason !== "effect_in_doubt" ||
    interruptedOperation?.status !== "intent" ||
    interruptedOperation.effect_ref !== opts.operation.idempotencyKey ||
    interruptedOperation.authority_ref !== "workflow-operation:worktree.prepare"
  ) {
    return opts.journal;
  }

  const reopened = reopenSupervisorExecutionEpisodeAfterEffectEvidence({
    journal: opts.journal,
    operation_key: interruptedOperation.operation_key,
  });
  const failed = completeSupervisorExecutionEpisode({
    journal: reopened,
    operation_key: interruptedOperation.operation_key,
    result: {
      status: "not_applied",
      evidence: "current_route_still_requires_worktree.prepare",
    },
    failed: true,
  });
  const replacement = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
    journal: failed,
    state_fingerprint_digest: opts.state_fingerprint_digest,
  });
  if (!(await opts.compare_and_swap(opts.journal.digest, replacement))) {
    throw new Error(
      "Supervisor episode changed while replacing a proven not-applied worktree preparation.",
    );
  }
  return replacement;
}
