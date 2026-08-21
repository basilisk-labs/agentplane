import {
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

export function continueSupervisorExecutionEpisodeAfterRenewableBudget(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  state_fingerprint_digest: string;
  max_episodes?: number;
  max_agent_runs?: number;
}): SupervisorExecutionEpisodeJournal {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const last = journal.operations.at(-1);
  const exhausted = journal.stop?.exhausted_dimensions ?? [];
  if (
    journal.status !== "stopped" ||
    journal.stop?.reason !== "budget_exhausted" ||
    journal.cursor.phase !== "stopped" ||
    last?.status !== "completed" ||
    (journal.stop.operation_key !== null && journal.stop.operation_key !== last.operation_key) ||
    exhausted.length === 0 ||
    exhausted.some((dimension) => dimension !== "episodes" && dimension !== "agent_runs")
  ) {
    throw new Error(
      "Supervisor episode continuation requires a completed stop caused only by renewable orchestration budgets.",
    );
  }
  const maxEpisodes = opts.max_episodes ?? journal.budget.max_episodes;
  const maxAgentRuns = opts.max_agent_runs ?? journal.budget.max_agent_runs;
  if (
    !Number.isInteger(maxEpisodes) ||
    (exhausted.includes("episodes") && maxEpisodes <= journal.budget.max_episodes)
  ) {
    throw new Error("Renewing an exhausted episode budget requires a larger integer cap.");
  }
  if (
    exhausted.includes("agent_runs") &&
    (maxAgentRuns === null ||
      !Number.isInteger(maxAgentRuns) ||
      journal.budget.max_agent_runs === null ||
      maxAgentRuns <= journal.budget.max_agent_runs)
  ) {
    throw new Error("Renewing an exhausted agent-run budget requires a larger integer cap.");
  }
  if (maxAgentRuns !== null && maxAgentRuns > maxEpisodes) {
    throw new Error("Renewed max_agent_runs cannot exceed max_episodes.");
  }
  const now = new Date().toISOString();
  const { digest: previousDigest, ...previous } = journal;
  const payload = {
    ...previous,
    state_fingerprint_digest: opts.state_fingerprint_digest,
    budget: { ...journal.budget, max_episodes: maxEpisodes, max_agent_runs: maxAgentRuns },
    cursor: { episode: journal.cursor.episode, phase: "ready" as const, operation_key: null },
    status: "running" as const,
    stop: null,
    updated_at: now,
    previous_digest: previousDigest,
  };
  return validateSupervisorExecutionEpisodeJournal({
    ...payload,
    digest: digestSupervisorEpisodeValue(payload),
  });
}
