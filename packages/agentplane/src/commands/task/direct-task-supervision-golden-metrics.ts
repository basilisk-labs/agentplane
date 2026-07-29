import { mkdir } from "node:fs/promises";
import path from "node:path";

import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  compareDirectTaskSupervisionGoldenPath,
  DIRECT_TASK_SUPERVISION_PRE_V07_BASELINE,
  DIRECT_TASK_SUPERVISION_PRE_V07_BASELINE_PROVENANCE,
} from "./direct-task-supervision-benchmark.js";
import type { DirectTaskSupervisorMetrics } from "./direct-task-supervision-measurement.js";

export type DirectTaskSupervisionGoldenMetricsEvidence = {
  artifact_path: string;
  comparison: ReturnType<typeof compareDirectTaskSupervisionGoldenPath>;
};

/**
 * Persist the actual direct-run costs after every formal lifecycle operation
 * has completed. This makes the comparison auditable without treating a test
 * fixture or a human-written summary as observed runtime telemetry.
 */
export async function recordDirectTaskSupervisionGoldenMetrics(opts: {
  command: CommandContext;
  task_id: string;
  metrics: DirectTaskSupervisorMetrics;
  verified_success: boolean;
  committed_scope_enforced: boolean;
}): Promise<DirectTaskSupervisionGoldenMetricsEvidence> {
  const candidate = opts.metrics.orchestration;
  const qualitySafety = {
    verified_success: opts.verified_success,
    executor_lifecycle_event_delta: opts.metrics.executor_lifecycle_event_delta,
    committed_scope_enforced: opts.committed_scope_enforced,
  };
  const comparison = compareDirectTaskSupervisionGoldenPath({
    baseline: DIRECT_TASK_SUPERVISION_PRE_V07_BASELINE,
    candidate,
    quality_safety: qualitySafety,
  });
  const artifactPath = path.join(
    opts.command.config.paths.workflow_dir,
    opts.task_id,
    "supervision",
    "golden-metrics.json",
  );
  const absolutePath = path.join(opts.command.resolvedProject.gitRoot, artifactPath);
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeJsonStableIfChanged(absolutePath, {
    schema_version: 1,
    kind: "direct_task_supervision_golden_metrics",
    task_id: opts.task_id,
    baseline: {
      ...DIRECT_TASK_SUPERVISION_PRE_V07_BASELINE_PROVENANCE,
      costs: DIRECT_TASK_SUPERVISION_PRE_V07_BASELINE,
    },
    observed: {
      costs: candidate,
      quality_safety: qualitySafety,
      provider_episodes: opts.metrics.provider_episodes,
      declared_checks: opts.metrics.declared_checks,
    },
    comparison,
  });
  return { artifact_path: artifactPath, comparison };
}
