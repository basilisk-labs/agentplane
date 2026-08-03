import {
  validateSupervisorExecutionEpisodeJournal,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import type { TaskTokenUsage } from "@agentplaneorg/core/tasks";

import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";

function unavailableTaskTokenUsage(opts: {
  reason: string;
  updated_at: string;
  journal?: SupervisorExecutionEpisodeJournal;
}): TaskTokenUsage {
  return {
    schema_version: 1,
    state: "unavailable",
    input_tokens: null,
    output_tokens: null,
    reasoning_tokens: null,
    total_tokens: null,
    agent_runs: opts.journal?.usage.agent_runs ?? 0,
    observed_agent_runs: 0,
    source: opts.journal ? "supervisor_journal" : "unavailable",
    observed_by: "agentplane",
    journal_digest: opts.journal?.digest ?? null,
    unavailable_reason: opts.reason,
    updated_at: opts.updated_at,
  };
}

export function projectTaskTokenUsage(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  updated_at?: string;
}): TaskTokenUsage {
  const journal = validateSupervisorExecutionEpisodeJournal(opts.journal);
  const usage = journal.usage;
  const updatedAt = opts.updated_at ?? new Date().toISOString();
  if (usage.agent_runs === 0) {
    return unavailableTaskTokenUsage({
      reason: "no_supervised_agent_runs",
      updated_at: updatedAt,
      journal,
    });
  }

  const observedAgentRuns =
    usage.token_observed_agent_runs ??
    (usage.input_tokens > 0 || usage.output_tokens > 0 || usage.total_tokens > 0 ? 1 : 0);
  if (observedAgentRuns === 0) {
    return unavailableTaskTokenUsage({
      reason: "provider_token_telemetry_unavailable",
      updated_at: updatedAt,
      journal,
    });
  }

  const hasBreakdown =
    usage.visible_output_tokens !== undefined && usage.reasoning_tokens !== undefined;
  const fullyObserved = observedAgentRuns === usage.agent_runs && hasBreakdown;
  return {
    schema_version: 1,
    state: fullyObserved ? "observed" : "partial",
    input_tokens: usage.input_tokens,
    output_tokens: hasBreakdown ? (usage.visible_output_tokens ?? null) : null,
    reasoning_tokens: hasBreakdown ? (usage.reasoning_tokens ?? null) : null,
    total_tokens: usage.total_tokens,
    agent_runs: usage.agent_runs,
    observed_agent_runs: observedAgentRuns,
    source: "supervisor_journal",
    observed_by: "agentplane",
    journal_digest: journal.digest,
    unavailable_reason: fullyObserved
      ? null
      : hasBreakdown
        ? "some_agent_runs_lack_provider_token_telemetry"
        : "legacy_journal_lacks_output_reasoning_breakdown",
    updated_at: updatedAt,
  };
}

export async function resolveTaskTokenUsageOnFinish(opts: {
  git_root: string;
  task_id: string;
  updated_at?: string;
}): Promise<TaskTokenUsage> {
  const updatedAt = opts.updated_at ?? new Date().toISOString();
  try {
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: opts.git_root,
      task_id: opts.task_id,
    });
    const input = await createSupervisorEpisodeStore(journalPath).read();
    if (input === null) {
      return unavailableTaskTokenUsage({
        reason: "supervisor_journal_missing",
        updated_at: updatedAt,
      });
    }
    return projectTaskTokenUsage({
      journal: validateSupervisorExecutionEpisodeJournal(input),
      updated_at: updatedAt,
    });
  } catch {
    return unavailableTaskTokenUsage({
      reason: "supervisor_journal_unreadable_or_invalid",
      updated_at: updatedAt,
    });
  }
}

export async function resolveReconciliationTaskTokenUsage(opts: {
  task: { id: string; token_usage?: TaskTokenUsage };
  git_root: string;
  updated_at: string;
}): Promise<TaskTokenUsage> {
  return (
    opts.task.token_usage ??
    (await resolveTaskTokenUsageOnFinish({
      git_root: opts.git_root,
      task_id: opts.task.id,
      updated_at: opts.updated_at,
    }))
  );
}
