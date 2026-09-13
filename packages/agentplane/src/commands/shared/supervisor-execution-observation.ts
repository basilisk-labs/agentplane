import type {
  SupervisorExecutionEpisodeJournal,
  SupervisorExecutionUsage,
} from "@agentplaneorg/core/schemas";

import { readCodexProviderUsageForResult } from "../../runner/adapters/codex-result-transport.js";
import type { WorkflowSupervisorExecutor } from "./workflow-supervisor.js";

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

export function observedRunnerUsage(opts: {
  result: Awaited<ReturnType<WorkflowSupervisorExecutor>>;
}): {
  usage: Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">>;
  provider_usage?: SupervisorExecutionEpisodeJournal["operations"][number]["provider_usage"];
  progress: unknown;
} {
  const lifecycle =
    opts.result.operation_result?.kind === "runner_lifecycle"
      ? opts.result.operation_result.value
      : null;
  if (lifecycle?.phase !== "executed" || lifecycle.result === null) {
    return { usage: {}, progress: undefined };
  }
  const metrics = lifecycle.result.metrics;
  const evidence = lifecycle.result.evidence;
  const providerUsage = readCodexProviderUsageForResult(lifecycle.result);
  const usage: Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">> = {};
  for (const field of [
    "input_tokens",
    "output_tokens",
    "total_tokens",
    "visible_output_tokens",
    "reasoning_tokens",
    "cached_input_tokens",
    "prepared_context_bytes",
  ] as const) {
    if (isNonNegativeInteger(providerUsage?.[field])) usage[field] = providerUsage[field];
  }
  // Provider and workspace usage are evidence only. Missing measurements do
  // not change execution authority or turn successful work into human review.
  if (isNonNegativeInteger(metrics?.duration_ms)) usage.wall_time_ms = metrics.duration_ms;
  if (isNonNegativeInteger(evidence?.files_changed_count)) {
    usage.changed_files = evidence.files_changed_count;
  }
  return {
    usage,
    ...(lifecycle.invocation
      ? {
          provider_usage: {
            provider: lifecycle.invocation.adapter_id,
            run_id: lifecycle.invocation.run_id,
            work_order_id: lifecycle.invocation.work_order_id,
            thread_id: providerUsage?.thread_id ?? null,
            turn_id: providerUsage?.turn_id ?? null,
          },
        }
      : {}),
    progress: lifecycle.lifecycle.state_fingerprint,
  };
}
