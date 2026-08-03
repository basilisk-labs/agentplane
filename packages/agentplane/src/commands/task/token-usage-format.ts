import type { TaskTokenUsage } from "@agentplaneorg/core/tasks";

function displayTokenCount(value: number | null): string {
  return value === null ? "unavailable" : String(value);
}

export function formatTaskTokenUsageSummary(usage: TaskTokenUsage): string {
  const summary =
    `state=${usage.state} ` +
    `completeness=${usage.observed_agent_runs}/${usage.agent_runs} ` +
    `input=${displayTokenCount(usage.input_tokens)} ` +
    `output=${displayTokenCount(usage.output_tokens)} ` +
    `reasoning=${displayTokenCount(usage.reasoning_tokens)} ` +
    `total=${displayTokenCount(usage.total_tokens)} ` +
    `provenance=${usage.source}/${usage.observed_by}`;
  return usage.unavailable_reason ? `${summary} reason=${usage.unavailable_reason}` : summary;
}
