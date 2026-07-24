import { CliError } from "../../shared/errors.js";
import { readRunnerChildSpawnClaim } from "../adapters/execution-control.js";
import { RunnerRunRepository } from "../run-repository.js";
import type { RunnerRunState } from "../types.js";

import { readTaskRunnerActiveClaim } from "./task-run-active-claim.js";
import {
  isRunnerEffectInDoubt,
  isRunnerManagedScopeCleanupConfirmed,
} from "./task-run-active-claim-authority.js";
import {
  assertTaskRunnerSupervisorHistoryAnchorStable,
  captureTaskRunnerSupervisorHistoryAnchorIfPresent,
  type TaskRunnerSupervisorHistoryAnchor,
} from "./task-run-supervisor-history-anchor.js";
import { inspectTaskRunnerMissingStateAuthority } from "./task-run-missing-state-authority.js";

type OrphanedRunnerEffect = {
  run_id: string;
  status: RunnerRunState["status"] | "missing";
  outcome: "effect_started" | "effect_unknown" | "post_state_unknown";
};

function invalidRunStateError(opts: {
  task_id: string;
  run_id: string;
  reason:
    | "runner_run_state_identity_mismatch"
    | "runner_run_state_invalid"
    | "runner_run_state_missing";
}): CliError {
  return new CliError({
    exitCode: 4,
    code: "E_IO",
    message: `Runner supervisor history is not safe to scan for task ${opts.task_id}.`,
    context: {
      reason: opts.reason,
      task_id: opts.task_id,
      run_id: opts.run_id,
    },
  });
}

function effectOutcome(
  taskId: string,
  runId: string,
  state: RunnerRunState,
  spawnClaimPresent: boolean,
): OrphanedRunnerEffect["outcome"] | null {
  if (state.run_id !== runId) {
    throw invalidRunStateError({
      task_id: taskId,
      run_id: runId,
      reason: "runner_run_state_identity_mismatch",
    });
  }
  const fingerprint = state.state_fingerprint;
  const processTree = state.supervision?.process_tree;
  if (
    state.status !== "prepared" &&
    state.status !== "running" &&
    (processTree?.residual_alive === true ||
      processTree?.cleanup_state === "failed" ||
      (spawnClaimPresent && !isRunnerManagedScopeCleanupConfirmed(processTree)))
  ) {
    return "effect_unknown";
  }
  if (state.status === "running" || (state.status === "prepared" && spawnClaimPresent)) {
    return "effect_unknown";
  }
  if (fingerprint === undefined) {
    return null;
  }
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
    throw invalidRunStateError({
      task_id: taskId,
      run_id: runId,
      reason: "runner_run_state_invalid",
    });
  }
  if (
    !spawnClaimPresent &&
    fingerprint.outcome === "accepted" &&
    (state.status === "success" || state.status === "blocked")
  ) {
    return "effect_unknown";
  }
  if (spawnClaimPresent && fingerprint.outcome !== "accepted") {
    return "effect_unknown";
  }
  return isRunnerEffectInDoubt(state)
    ? (fingerprint.outcome as OrphanedRunnerEffect["outcome"])
    : null;
}

async function scanSupervisorEffects(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  expected_history_anchor?: TaskRunnerSupervisorHistoryAnchor;
  allowed_new_run_id?: string;
  after_history_snapshot?: () => Promise<void>;
}): Promise<OrphanedRunnerEffect[]> {
  const anchor =
    opts.expected_history_anchor ?? (await captureTaskRunnerSupervisorHistoryAnchorIfPresent(opts));
  if (!anchor) return [];
  const assertHistoryStable = async () =>
    await assertTaskRunnerSupervisorHistoryAnchorStable({
      anchor,
      git_root: opts.git_root,
      workflow_dir: opts.workflow_dir,
      ...(opts.allowed_new_run_id ? { allowed_new_run_id: opts.allowed_new_run_id } : {}),
    });
  await assertHistoryStable();
  await opts.after_history_snapshot?.();
  const findings: OrphanedRunnerEffect[] = [];
  for (const snapshot of anchor.runs) {
    await assertHistoryStable();
    const repository = await RunnerRunRepository.openExistingTaskRun({
      ...opts,
      run_id: snapshot.run_id,
      storage: "supervisor",
    });
    let state = await repository.readState();
    await assertHistoryStable();
    if (!state) {
      await assertHistoryStable();
      const authority = await inspectTaskRunnerMissingStateAuthority({
        repository,
        run_id: snapshot.run_id,
      });
      await assertHistoryStable();
      if (authority === "spawn_authorized_but_unconfirmed") {
        findings.push({
          run_id: snapshot.run_id,
          status: "missing",
          outcome: "effect_unknown",
        });
      } else if (authority === "missing_state_unverified") {
        throw invalidRunStateError({
          task_id: opts.task_id,
          run_id: snapshot.run_id,
          reason: "runner_run_state_missing",
        });
      }
      continue;
    }
    await assertHistoryStable();
    const record = await repository.readRequiredRecord({
      task_id: opts.task_id,
      run_id: snapshot.run_id,
    });
    state = record.state;
    await assertHistoryStable();
    let spawnClaimPresent = false;
    if (state.status !== "running") {
      await assertHistoryStable();
      spawnClaimPresent =
        (await readRunnerChildSpawnClaim({
          run_dir: repository.paths.run_dir,
          run_id: snapshot.run_id,
        })) !== null;
      await assertHistoryStable();
    }
    const outcome = effectOutcome(opts.task_id, snapshot.run_id, state, spawnClaimPresent);
    if (outcome) {
      findings.push({
        run_id: snapshot.run_id,
        status: state.status,
        outcome,
      });
    }
  }
  await assertHistoryStable();
  return findings;
}

export async function assertNoOrphanedRunnerEffectInDoubt(opts: {
  git_root: string;
  workflow_dir: string;
  task_id: string;
  expected_active_claim?: {
    run_id: string;
    generation: string;
  };
  expected_history_anchor?: TaskRunnerSupervisorHistoryAnchor;
  allowed_new_run_id?: string;
  /** @internal Deterministic race injection for security regression tests. */
  after_history_snapshot?: () => Promise<void>;
}): Promise<void> {
  const readActiveClaim = async () =>
    await readTaskRunnerActiveClaim({
      git_root: opts.git_root,
      workflow_dir: opts.workflow_dir,
      task_id: opts.task_id,
      run_id: "orphaned-effect-active-claim-probe",
    });
  const assertExpectedActiveClaim = (
    active: Awaited<ReturnType<typeof readActiveClaim>>,
    phase: "before_scan" | "after_scan",
  ): void => {
    const expected = opts.expected_active_claim;
    if (
      expected &&
      (active?.run_id !== expected.run_id || active?.generation !== expected.generation)
    ) {
      throw new CliError({
        exitCode: 8,
        code: "E_RUNTIME",
        message:
          `Runner active claim changed while checking supervisor history for task ` +
          `${opts.task_id}.`,
        context: {
          reason: "runner_active_claim_changed_during_orphan_scan",
          phase,
          task_id: opts.task_id,
          expected_run_id: expected.run_id,
          expected_generation: expected.generation,
          observed_run_id: active?.run_id ?? null,
          observed_generation: active?.generation ?? null,
        },
      });
    }
  };

  const active = await readActiveClaim();
  if (!opts.expected_active_claim && active) return;
  assertExpectedActiveClaim(active, "before_scan");
  const findings = await scanSupervisorEffects(opts);
  if (opts.expected_active_claim) {
    assertExpectedActiveClaim(await readActiveClaim(), "after_scan");
  }
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
