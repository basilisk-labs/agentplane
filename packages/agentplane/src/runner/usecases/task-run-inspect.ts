import { lstat } from "node:fs/promises";

import { loadCommandContext, type CommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import {
  openExistingRunnerRunWithLegacyFallback,
  openLatestRunnerRunWithLegacyFallback,
} from "../run-repository-compat.js";
import type { RunnerRunRepository } from "../run-repository.js";
import type { TaskRunnerPaths } from "../task-run-paths.js";
import type { RunnerContextBundle, RunnerEvent, RunnerRunState } from "../types.js";
import type { TaskRunnerOutcome } from "../../backends/task-backend.js";
import { compressedTraceArtifactPath } from "../trace-artifacts.js";

import {
  inspectTaskRunnerActiveClaimOwner,
  inspectTaskRunnerClaimedRunAuthority,
  type TaskRunnerClaimedRunAuthority,
  type TaskRunnerActiveClaimOwnerStatus,
} from "./task-run-active-claim-authority.js";
import { readTaskRunnerActiveClaim, type TaskRunnerActiveClaim } from "./task-run-active-claim.js";
import {
  inspectTaskRunnerActiveClaimRecoveryLease,
  type TaskRunnerActiveClaimRecoveryLeaseInspection,
} from "./task-run-active-claim-recovery-lease.js";

export type TaskRunnerControlInspection = {
  ctx: CommandContext;
  task_id: string;
  active_claim: TaskRunnerActiveClaim | null;
  active_claim_owner_status: TaskRunnerActiveClaimOwnerStatus | null;
  claimed_run_authority: TaskRunnerClaimedRunAuthority | null;
  recovery_lease: TaskRunnerActiveClaimRecoveryLeaseInspection | null;
  task_runner_outcome: TaskRunnerOutcome | null;
};

export type LoadedTaskRunnerInspection = TaskRunnerControlInspection & {
  run_id: string;
  selection: "explicit" | "latest";
  storage: "supervisor" | "legacy_task";
  paths: TaskRunnerPaths;
  repository: RunnerRunRepository;
  bundle: RunnerContextBundle;
  state: RunnerRunState;
  events: RunnerEvent[];
  events_text: string;
};

export type TaskRunnerDiagnosticInspection = {
  control: TaskRunnerControlInspection;
  run: LoadedTaskRunnerInspection | null;
};

export type TaskRunnerActivityHealth = "active" | "idle" | "exited" | "unknown";

export type TaskRunnerActivityInspection = {
  last_trace_at: string | null;
  last_trace_seq: number | null;
  seconds_since_activity: number | null;
  health: TaskRunnerActivityHealth;
};

export type TaskRunnerProcessLiveness = boolean | "unverified" | "mismatch" | null;

function parsedTimestamp(value: string | null | undefined): number | null {
  if (typeof value !== "string") return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function latestTimestamp(values: readonly (string | null | undefined)[]): string | null {
  let latest: { value: string; parsed: number } | null = null;
  for (const value of values) {
    const parsed = parsedTimestamp(value);
    if (typeof value === "string" && parsed !== null && (!latest || parsed > latest.parsed)) {
      latest = { value, parsed };
    }
  }
  return latest?.value ?? null;
}

async function artifactModifiedAt(filePath: string, hasContent: boolean): Promise<string | null> {
  if (!hasContent) return null;
  for (const candidate of [filePath, compressedTraceArtifactPath(filePath)]) {
    try {
      const stats = await lstat(candidate);
      if (stats.isFile() && !stats.isSymbolicLink() && stats.size > 0) {
        return stats.mtime.toISOString();
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
    }
  }
  return null;
}

function latestTraceRecord(traceText: string): { at: string | null; seq: number | null } {
  let latestAt: string | null = null;
  let latestSeq: number | null = null;
  for (const line of traceText.split("\n")) {
    if (!line.trim()) continue;
    try {
      const record = JSON.parse(line) as { ts?: unknown; seq?: unknown };
      if (typeof record.ts === "string" && parsedTimestamp(record.ts) !== null) {
        latestAt = latestTimestamp([latestAt, record.ts]);
      }
      if (typeof record.seq === "number" && Number.isSafeInteger(record.seq)) {
        latestSeq = latestSeq === null ? record.seq : Math.max(latestSeq, record.seq);
      }
    } catch {
      // A partial final JSONL record must not hide earlier durable activity.
    }
  }
  return { at: latestAt, seq: latestSeq };
}

async function readActivityText(
  inspection: LoadedTaskRunnerInspection,
  stream: "trace" | "stderr",
): Promise<string> {
  const repository = inspection.repository as RunnerRunRepository | undefined;
  if (!repository) return "";
  try {
    return stream === "trace"
      ? await repository.readTraceTextRequired({
          task_id: inspection.task_id,
          run_id: inspection.run_id,
        })
      : await repository.readStderrTextRequired({
          task_id: inspection.task_id,
          run_id: inspection.run_id,
        });
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return "";
    if (
      error instanceof CliError &&
      error.code === "E_IO" &&
      error.message.startsWith("Runner artifact not found")
    ) {
      return "";
    }
    throw error;
  }
}

export async function inspectTaskRunnerActivity(opts: {
  inspection: LoadedTaskRunnerInspection;
  process_liveness: TaskRunnerProcessLiveness;
  now_ms?: number;
}): Promise<TaskRunnerActivityInspection> {
  const { inspection } = opts;
  const [traceText, stderrText] = await Promise.all([
    readActivityText(inspection, "trace"),
    readActivityText(inspection, "stderr"),
  ]);
  const traceRecord = latestTraceRecord(traceText);
  const [traceModifiedAt, stderrModifiedAt] = await Promise.all([
    artifactModifiedAt(inspection.paths.trace_path, traceText.length > 0),
    artifactModifiedAt(inspection.paths.stderr_path, stderrText.length > 0),
  ]);
  const lastTraceAt = latestTimestamp([traceRecord.at, traceModifiedAt]);
  const lastActivityAt = latestTimestamp([
    lastTraceAt,
    stderrModifiedAt,
    inspection.state.supervision?.heartbeat_at,
    inspection.state.updated_at,
    inspection.state.created_at,
  ]);
  const lastActivityMs = parsedTimestamp(lastActivityAt);
  const nowMs = opts.now_ms ?? Date.now();
  const secondsSinceActivity =
    lastActivityMs === null ? null : Math.max(0, Math.floor((nowMs - lastActivityMs) / 1000));
  const idleMs = inspection.state.timeout_policy?.idle_ms;
  const recentActivity =
    lastActivityMs !== null &&
    typeof idleMs === "number" &&
    idleMs > 0 &&
    nowMs - lastActivityMs <= idleMs;
  const terminal = ["success", "failed", "blocked", "cancelled"].includes(inspection.state.status);
  let health: TaskRunnerActivityHealth;
  if (terminal) health = "exited";
  else if (recentActivity || opts.process_liveness === true) health = "active";
  else if (opts.process_liveness === false || opts.process_liveness === "mismatch")
    health = "exited";
  else if (lastActivityMs !== null && typeof idleMs === "number" && idleMs > 0) health = "idle";
  else health = "unknown";

  return {
    last_trace_at: lastTraceAt,
    last_trace_seq: traceRecord.seq,
    seconds_since_activity: secondsSinceActivity,
    health,
  };
}

type TaskRunnerInspectionOptions = {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  run_id?: string;
};

type TaskRunnerRunSelection =
  | {
      source: "explicit" | "active_claim" | "task_projection";
      run_id: string;
    }
  | {
      source: "timestamp";
      run_id: null;
    };

function normalizedRunId(value: string | undefined): string | null {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
}

export function selectTaskRunnerInspectionRun(opts: {
  explicit_run_id?: string;
  active_claim_run_id?: string;
  task_projection_run_id?: string;
}): TaskRunnerRunSelection {
  const explicitRunId = normalizedRunId(opts.explicit_run_id);
  if (explicitRunId) return { source: "explicit", run_id: explicitRunId };
  const activeClaimRunId = normalizedRunId(opts.active_claim_run_id);
  if (activeClaimRunId) return { source: "active_claim", run_id: activeClaimRunId };
  const taskProjectionRunId = normalizedRunId(opts.task_projection_run_id);
  if (taskProjectionRunId) {
    return { source: "task_projection", run_id: taskProjectionRunId };
  }
  return { source: "timestamp", run_id: null };
}

function isNoRunnerRunsError(error: unknown): boolean {
  return (
    error instanceof CliError &&
    error.code === "E_IO" &&
    error.context?.reason === "runner_runs_not_found"
  );
}

function isUnavailableRunnerArtifactsError(error: unknown, taskId: string, runId: string): boolean {
  if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return true;
  return (
    error instanceof CliError &&
    error.code === "E_IO" &&
    error.message.startsWith(`Runner artifact not found for ${taskId}:${runId}`)
  );
}

function noRunnerRunsError(taskId: string): CliError {
  return new CliError({
    exitCode: 4,
    code: "E_IO",
    message: `No complete runner runs found for task ${taskId}`,
    context: {
      task_id: taskId,
      reason: "runner_runs_not_found",
    },
  });
}

async function loadTaskRunnerControlInspection(
  opts: TaskRunnerInspectionOptions,
): Promise<TaskRunnerControlInspection> {
  const command =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const executionContext = await makeReadOnlyExecutionContext(command);
  const task = await executionContext.backend.task_backend.getTask(opts.task_id);
  if (!task) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Task not found: ${opts.task_id}`,
    });
  }
  const activeClaim = await readTaskRunnerActiveClaim({
    git_root: executionContext.repo.git_root,
    workflow_dir: executionContext.repo.workflow_dir,
    task_id: opts.task_id,
    run_id: normalizedRunId(opts.run_id) ?? "active-claim-inspection-probe",
  });
  const [activeClaimOwnerStatus, claimedRunAuthority, recoveryLease] = activeClaim
    ? await Promise.all([
        inspectTaskRunnerActiveClaimOwner(activeClaim),
        inspectTaskRunnerClaimedRunAuthority(
          {
            git_root: executionContext.repo.git_root,
            workflow_dir: executionContext.repo.workflow_dir,
            task_id: opts.task_id,
          },
          activeClaim,
        ),
        inspectTaskRunnerActiveClaimRecoveryLease({
          git_root: executionContext.repo.git_root,
          workflow_dir: executionContext.repo.workflow_dir,
          task_id: opts.task_id,
          target_generation: activeClaim.generation,
        }),
      ])
    : [null, null, null];
  return {
    ctx: executionContext.command,
    task_id: opts.task_id,
    active_claim: activeClaim,
    active_claim_owner_status: activeClaimOwnerStatus,
    claimed_run_authority: claimedRunAuthority,
    recovery_lease: recoveryLease,
    task_runner_outcome: task.runner ?? null,
  };
}

async function loadSelectedTaskRunnerInspection(
  opts: TaskRunnerInspectionOptions,
  control: TaskRunnerControlInspection,
): Promise<LoadedTaskRunnerInspection> {
  const gitRoot = control.ctx.resolvedProject.gitRoot;
  const workflowDir = control.ctx.config.paths.workflow_dir;
  const runSelection = selectTaskRunnerInspectionRun({
    explicit_run_id: opts.run_id,
    active_claim_run_id: control.active_claim?.run_id,
    task_projection_run_id: control.task_runner_outcome?.run_id,
  });
  const loadRun = async (runId: string, repository?: RunnerRunRepository) => {
    const selectedRepository =
      repository ??
      (await openExistingRunnerRunWithLegacyFallback({
        git_root: gitRoot,
        workflow_dir: workflowDir,
        task_id: opts.task_id,
        run_id: runId,
      }));
    const [record, eventsData] = await Promise.all([
      selectedRepository.readRequiredRecord({
        task_id: opts.task_id,
        run_id: runId,
      }),
      selectedRepository.readEventsRequired({
        task_id: opts.task_id,
        run_id: runId,
      }),
    ]);
    return { run_id: runId, repository: selectedRepository, record, eventsData };
  };
  const loadTimestampRun = async () => {
    const selected = await openLatestRunnerRunWithLegacyFallback({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: opts.task_id,
    });
    return await loadRun(selected.run_id, selected.repository);
  };

  let selected: Awaited<ReturnType<typeof loadRun>>;
  if (runSelection.run_id) {
    try {
      selected = await loadRun(runSelection.run_id);
    } catch (error) {
      const mayBePreArtifactClaim =
        runSelection.source === "active_claim" &&
        (control.claimed_run_authority === "absent" ||
          control.claimed_run_authority === "incomplete_pre_provider");
      if (
        !mayBePreArtifactClaim ||
        !isUnavailableRunnerArtifactsError(error, opts.task_id, runSelection.run_id)
      ) {
        throw error;
      }
      const projectedRunId = normalizedRunId(control.task_runner_outcome?.run_id);
      if (projectedRunId && projectedRunId !== runSelection.run_id) {
        selected = await loadRun(projectedRunId);
      } else if (control.claimed_run_authority === "absent") {
        selected = await loadTimestampRun();
      } else {
        throw noRunnerRunsError(opts.task_id);
      }
    }
  } else {
    selected = await loadTimestampRun();
  }
  const runId = selected.run_id;
  const repository = selected.repository;
  const paths = repository.paths as TaskRunnerPaths;

  return {
    ...control,
    run_id: runId,
    selection: runSelection.source === "explicit" ? "explicit" : "latest",
    storage: repository.storage === "task" ? "legacy_task" : "supervisor",
    paths,
    repository,
    bundle: selected.record.bundle,
    state: selected.record.state,
    events: selected.eventsData.events,
    events_text: selected.eventsData.events_text,
  };
}

export async function loadTaskRunnerInspection(
  opts: TaskRunnerInspectionOptions,
): Promise<LoadedTaskRunnerInspection> {
  const control = await loadTaskRunnerControlInspection(opts);
  return await loadSelectedTaskRunnerInspection(opts, control);
}

export async function loadTaskRunnerDiagnosticInspection(
  opts: TaskRunnerInspectionOptions,
): Promise<TaskRunnerDiagnosticInspection> {
  const control = await loadTaskRunnerControlInspection(opts);
  try {
    return {
      control,
      run: await loadSelectedTaskRunnerInspection(opts, control),
    };
  } catch (error) {
    if (opts.run_id || !isNoRunnerRunsError(error)) throw error;
    return { control, run: null };
  }
}
