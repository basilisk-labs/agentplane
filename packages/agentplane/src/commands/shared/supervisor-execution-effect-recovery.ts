import {
  completeSupervisorExecutionEpisode,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  reopenSupervisorExecutionEpisodeAfterEffectEvidence,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

export async function recoverProvenNotAppliedWorktreePreparation(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  operation: { id: string; idempotencyKey: string };
  state_fingerprint_digest: string;
  compare_and_swap: (
    expected_digest: SupervisorExecutionEpisodeJournal["digest"],
    journal: SupervisorExecutionEpisodeJournal,
  ) => Promise<boolean>;
}): Promise<SupervisorExecutionEpisodeJournal> {
  const interrupted = opts.journal.operations.at(-1);
  if (
    opts.operation.id !== "worktree.prepare" ||
    opts.journal.status !== "stopped" ||
    opts.journal.stop?.reason !== "effect_in_doubt" ||
    interrupted?.status !== "intent" ||
    interrupted.effect_ref !== opts.operation.idempotencyKey ||
    interrupted.authority_ref !== "workflow-operation:worktree.prepare"
  ) {
    return opts.journal;
  }

  const reopened = reopenSupervisorExecutionEpisodeAfterEffectEvidence({
    journal: opts.journal,
    operation_key: interrupted.operation_key,
  });
  const failed = completeSupervisorExecutionEpisode({
    journal: reopened,
    operation_key: interrupted.operation_key,
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
