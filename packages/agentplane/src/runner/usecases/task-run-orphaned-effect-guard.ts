import { readdir } from "node:fs/promises";
import type { Dirent } from "node:fs";

import { CliError } from "../../shared/errors.js";
import {
  captureRunnerArtifactDirectoryBoundaryIfPresent,
  type RunnerRunDirectoryBoundary,
} from "../run-directory-boundary.js";
import { RunnerRunRepository } from "../run-repository.js";
import { assertSafeRunnerRunId, resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import type { RunnerRunState } from "../types.js";

import { readTaskRunnerActiveClaim } from "./task-run-active-claim.js";
import { isRunnerEffectInDoubt } from "./task-run-active-claim-authority.js";

type OrphanedRunnerEffect = {
  run_id: string;
  status: RunnerRunState["status"];
  outcome: "effect_started" | "effect_unknown" | "post_state_unknown";
};

function invalidRunsError(opts: {
  task_id: string;
  reason:
    | "runner_runs_changed_during_scan"
    | "runner_runs_invalid_entries"
    | "runner_run_state_identity_mismatch"
    | "runner_run_state_invalid"
    | "runner_run_state_missing";
  run_id?: string;
  invalid_entries?: string[];
}): CliError {
  return new CliError({
    exitCode: 4,
    code: "E_IO",
    message: `Runner supervisor history is not safe to scan for task ${opts.task_id}.`,
    context: {
      reason: opts.reason,
      task_id: opts.task_id,
      ...(opts.run_id ? { run_id: opts.run_id } : {}),
      ...(opts.invalid_entries ? { invalid_entries: opts.invalid_entries } : {}),
    },
  });
}

function stableEntryNames(entries: Dirent[], taskId: string, ignoreRunId?: string): string[] {
  const invalid: string[] = [];
  const runIds: string[] = [];
  for (const entry of entries) {
    if (entry.name === ignoreRunId) continue;
    if (!entry.isDirectory()) {
      invalid.push(entry.name);
      continue;
    }
    try {
      const runId = assertSafeRunnerRunId(entry.name);
      if (runId === entry.name) {
        runIds.push(runId);
      } else {
        invalid.push(entry.name);
      }
    } catch {
      invalid.push(entry.name);
    }
  }
  if (invalid.length > 0) {
    throw invalidRunsError({
      task_id: taskId,
      reason: "runner_runs_invalid_entries",
      invalid_entries: invalid.toSorted(),
    });
  }
  return runIds.toSorted();
}

function effectOutcome(
  taskId: string,
  runId: string,
  state: RunnerRunState,
): OrphanedRunnerEffect["outcome"] | null {
  if (state.run_id !== runId) {
    throw invalidRunsError({
      task_id: taskId,
      run_id: runId,
      reason: "runner_run_state_identity_mismatch",
    });
  }
  const fingerprint = state.state_fingerprint;
  if (fingerprint === undefined) return null;
  if (
    !fingerprint ||
    typeof fingerprint !== "object" ||
    !(
      fingerprint.outcome === "prepared" ||
      fingerprint.outcome === "effect_started" ||
      fingerprint.outcome === "accepted" ||
      fingerprint.outcome === "refused" ||
      fingerprint.outcome === "effect_unknown" ||
      fingerprint.outcome === "post_state_unknown"
    )
  ) {
    throw invalidRunsError({
      task_id: taskId,
      run_id: runId,
      reason: "runner_run_state_invalid",
    });
  }
  return isRunnerEffectInDoubt(state)
    ? (fingerprint.outcome as OrphanedRunnerEffect["outcome"])
    : null;
}

async function readRunIds(opts: {
  boundary: RunnerRunDirectoryBoundary;
  task_id: string;
  ignore_run_id?: string;
}): Promise<string[]> {
  await opts.boundary.assertStable("before scanning runner supervisor history");
  const entries = await readdir(opts.boundary.run_dir, { withFileTypes: true });
  await opts.boundary.assertStable("after scanning runner supervisor history");
  return stableEntryNames(entries, opts.task_id, opts.ignore_run_id);
}

async function scanSupervisorEffects(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  ignore_run_id?: string;
}): Promise<OrphanedRunnerEffect[]> {
  const probe = await resolveSupervisorTaskRunnerPaths({
    ...opts,
    run_id: "orphaned-effect-scan-probe",
  });
  const boundary = await captureRunnerArtifactDirectoryBoundaryIfPresent({
    run_dir: probe.runs_dir,
    artifact_root: probe.artifact_root,
    artifact_paths: [],
  });
  if (!boundary) return [];
  const runIds = await readRunIds({
    boundary,
    task_id: opts.task_id,
    ignore_run_id: opts.ignore_run_id,
  });
  const findings: OrphanedRunnerEffect[] = [];
  for (const runId of runIds) {
    const repository = await RunnerRunRepository.openExistingTaskRun({
      ...opts,
      run_id: runId,
      storage: "supervisor",
    });
    const state = await repository.readState();
    if (!state) {
      throw invalidRunsError({
        task_id: opts.task_id,
        run_id: runId,
        reason: "runner_run_state_missing",
      });
    }
    const outcome = effectOutcome(opts.task_id, runId, state);
    if (outcome) {
      findings.push({
        run_id: runId,
        status: state.status,
        outcome,
      });
    }
  }
  const finalRunIds = await readRunIds({
    boundary,
    task_id: opts.task_id,
    ignore_run_id: opts.ignore_run_id,
  });
  if (JSON.stringify(finalRunIds) !== JSON.stringify(runIds)) {
    throw invalidRunsError({
      task_id: opts.task_id,
      reason: "runner_runs_changed_during_scan",
    });
  }
  return findings;
}

export async function assertNoOrphanedRunnerEffectInDoubt(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  ignore_run_id?: string;
}): Promise<void> {
  const active = await readTaskRunnerActiveClaim({
    ...opts,
    run_id: "orphaned-effect-active-claim-probe",
  });
  if (active) return;
  const findings = await scanSupervisorEffects(opts);
  if (findings.length === 0) return;
  throw new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `Runner refuses to start because supervisor history contains an effect-in-doubt run ` +
      `without an active claim for task ${opts.task_id}.`,
    context: {
      reason: "runner_orphaned_effect_in_doubt",
      task_id: opts.task_id,
      orphaned_run_ids: findings.map((finding) => finding.run_id),
      orphaned_runs: findings,
      next_safe_action: "manual_repair_required",
    },
  });
}
