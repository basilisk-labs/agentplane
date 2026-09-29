import type {
  SupervisorExecutionEpisodeJournal,
  SupervisorExecutionUsage,
} from "@agentplaneorg/core/schemas";

import { readCodexProviderUsageForResult } from "../../runner/adapters/codex-result-transport.js";
import type { TaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";

export function branchSupervisorAccountingFromLifecycle(lifecycle: TaskRunnerLifecycleResult): {
  usage: Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">>;
  provider_usage?: SupervisorExecutionEpisodeJournal["operations"][number]["provider_usage"];
} {
  if (lifecycle.phase !== "executed" || !lifecycle.result) return { usage: {} };
  const provider = readCodexProviderUsageForResult(lifecycle.result);
  const duration = lifecycle.result.metrics?.duration_ms;
  const changedFiles = lifecycle.result.evidence?.files_changed_count;
  return {
    usage: {
      ...(provider ?? {}),
      ...(typeof duration === "number" && Number.isSafeInteger(duration) && duration >= 0
        ? { wall_time_ms: duration }
        : {}),
      ...(typeof changedFiles === "number" &&
      Number.isSafeInteger(changedFiles) &&
      changedFiles >= 0
        ? { changed_files: changedFiles }
        : {}),
    },
    provider_usage: {
      provider: lifecycle.invocation.adapter_id,
      run_id: lifecycle.invocation.run_id,
      work_order_id: lifecycle.invocation.work_order_id,
      thread_id: provider?.thread_id ?? null,
      turn_id: provider?.turn_id ?? null,
    },
  };
}
