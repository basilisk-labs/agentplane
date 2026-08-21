import type { SupervisorExecutionUsage } from "@agentplaneorg/core/schemas";

import { readCodexProviderUsageForResult } from "../../runner/adapters/codex-result-transport.js";
import type { TaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";

export function branchSupervisorUsageFromLifecycle(
  lifecycle: TaskRunnerLifecycleResult,
): Partial<Omit<SupervisorExecutionUsage, "episodes" | "agent_runs">> {
  if (lifecycle.phase !== "executed" || !lifecycle.result) return {};
  const provider = readCodexProviderUsageForResult(lifecycle.result);
  const duration = lifecycle.result.metrics?.duration_ms;
  const changedFiles = lifecycle.result.evidence?.files_changed_count;
  return {
    ...(provider ?? {}),
    ...(typeof duration === "number" && Number.isSafeInteger(duration) && duration >= 0
      ? { wall_time_ms: duration }
      : {}),
    ...(typeof changedFiles === "number" && Number.isSafeInteger(changedFiles) && changedFiles >= 0
      ? { changed_files: changedFiles }
      : {}),
  };
}
