import { isRecord } from "../types/guards.js";

export type TaskTokenUsageRenderInput = {
  state: "observed" | "partial" | "unavailable";
  input_tokens: number | null;
  output_tokens: number | null;
  reasoning_tokens: number | null;
  total_tokens: number | null;
  agent_runs: number;
  observed_agent_runs: number;
  source: "supervisor_journal" | "unavailable";
  observed_by: "agentplane";
  journal_digest: string | null;
  unavailable_reason: string | null;
  updated_at: string;
};

function nullableTokenCount(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isSafeInteger(value) && value >= 0);
}

export function isTaskTokenUsageRenderInput(value: unknown): value is TaskTokenUsageRenderInput {
  return (
    isRecord(value) &&
    (value.state === "observed" || value.state === "partial" || value.state === "unavailable") &&
    nullableTokenCount(value.input_tokens) &&
    nullableTokenCount(value.output_tokens) &&
    nullableTokenCount(value.reasoning_tokens) &&
    nullableTokenCount(value.total_tokens) &&
    typeof value.agent_runs === "number" &&
    Number.isSafeInteger(value.agent_runs) &&
    value.agent_runs >= 0 &&
    typeof value.observed_agent_runs === "number" &&
    Number.isSafeInteger(value.observed_agent_runs) &&
    value.observed_agent_runs >= 0 &&
    value.observed_agent_runs <= value.agent_runs &&
    (value.source === "supervisor_journal" || value.source === "unavailable") &&
    value.observed_by === "agentplane" &&
    (value.journal_digest === null || typeof value.journal_digest === "string") &&
    (value.unavailable_reason === null || typeof value.unavailable_reason === "string") &&
    typeof value.updated_at === "string"
  );
}

function displayTokenCount(value: number | null): string {
  return value === null ? "unavailable" : String(value);
}

export function formatTaskTokenUsageSummary(usage: TaskTokenUsageRenderInput): string {
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

export function renderTaskTokenUsageBody(usage: TaskTokenUsageRenderInput): string {
  return [
    `- State: \`${usage.state}\``,
    `- Completeness: \`${usage.observed_agent_runs}/${usage.agent_runs}\` agent runs`,
    `- Input tokens: \`${displayTokenCount(usage.input_tokens)}\``,
    `- Output tokens: \`${displayTokenCount(usage.output_tokens)}\``,
    `- Reasoning tokens: \`${displayTokenCount(usage.reasoning_tokens)}\``,
    `- Total tokens: \`${displayTokenCount(usage.total_tokens)}\``,
    `- Provenance: \`${usage.source}/${usage.observed_by}\``,
    `- Journal digest: \`${usage.journal_digest ?? "unavailable"}\``,
    `- Unavailable reason: \`${usage.unavailable_reason ?? "none"}\``,
    `- Updated at: \`${usage.updated_at}\``,
  ].join("\n");
}
