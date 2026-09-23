import {
  advanceSupervisorExecutionEpisodeState,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import {
  branchSupervisorArtifactCommitMessage,
  commitBranchSupervisorTaskArtifacts,
} from "./branch-task-supervisor-artifact-commit.js";
import type {
  BranchEpisodeOutcome,
  BranchTaskSupervisorOptions,
} from "./branch-task-supervisor.js";
import { stoppedEpisode } from "./branch-task-supervisor-implementation.js";
import { runAndApplyDirectTaskEvaluator } from "./direct-task-supervisor-evaluator.js";
import { journalProjection } from "./direct-task-supervisor-result.js";

export async function executeBranchEvaluatorEpisode(opts: {
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
      replacement: opts.input.replace_failed_operation === true,
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
