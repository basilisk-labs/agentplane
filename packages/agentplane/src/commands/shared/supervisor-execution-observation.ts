import type {
  SupervisorExecutionBudget,
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
  budget: SupervisorExecutionBudget;
}): {
  usage: Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">>;
  provider_usage?: SupervisorExecutionEpisodeJournal["operations"][number]["provider_usage"];
  progress: unknown;
  missing_dimensions: string[];
} {
  const lifecycle =
    opts.result.operation_result?.kind === "runner_lifecycle"
      ? opts.result.operation_result.value
      : null;
  if (lifecycle?.phase !== "executed" || lifecycle.result === null) {
    return { usage: {}, progress: undefined, missing_dimensions: [] };
  }
  const metrics = lifecycle.result.metrics;
  const evidence = lifecycle.result.evidence;
  const providerUsage = readCodexProviderUsageForResult(lifecycle.result);
  const usage: Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">> = {};
  const missing: string[] = [];
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
  // Provider token telemetry is completion-cost evidence, not execution
  // authority. Missing usage degrades the completed task projection to
  // `unavailable`; it must not turn an otherwise successful adapter result
  // into human review. Observed values still charge and enforce token budgets.
  if (isNonNegativeInteger(metrics?.duration_ms)) usage.wall_time_ms = metrics.duration_ms;
  else if (opts.budget.max_wall_time_ms !== null) missing.push("wall_time_ms_telemetry");
  if (isNonNegativeInteger(evidence?.files_changed_count)) {
    usage.changed_files = evidence.files_changed_count;
  } else if (opts.budget.max_changed_files !== null) {
    missing.push("changed_files_telemetry");
  }
  if (opts.budget.max_diff_lines !== null) missing.push("diff_lines_telemetry");
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
    missing_dimensions: missing.toSorted(),
  };
}
