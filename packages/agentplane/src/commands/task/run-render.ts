import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type {
  LoadedTaskRunnerInspection,
  TaskRunnerControlInspection,
  TaskRunnerDiagnosticInspection,
} from "../../runner/usecases/task-run-inspect.js";
import type { TaskRunnerActiveClaimCleanupDiagnostic } from "../../runner/usecases/task-run-active-claim-runtime.js";
import type { RunnerLifecycleStatus } from "../../runner/types.js";
import {
  isProcessAlive,
  readObservedProcessIdentity,
} from "../../runner/process-supervision/signals.js";
import type { TaskRunLogsParsed } from "./run-parse.js";

export function renderTaskRunPayload(opts: {
  taskId: string;
  mode: "dry_run" | "execute";
  adapterId: string;
  runId: string;
  runDir: string;
  bundlePath: string;
  bootstrapPath: string;
  resultPath: string;
  status?: string;
  verificationState?: string;
  receiptPath?: string;
  exitCode?: number | null;
  summary?: string;
  activeClaimCleanup?: TaskRunnerActiveClaimCleanupDiagnostic;
}) {
  return {
    task_id: opts.taskId,
    mode: opts.mode,
    adapter_id: opts.adapterId,
    run_id: opts.runId,
    run_dir: opts.runDir,
    bundle_path: opts.bundlePath,
    bootstrap_path: opts.bootstrapPath,
    result_path: opts.resultPath,
    ...(opts.status ? { status: opts.status } : {}),
    ...(opts.verificationState ? { verification_state: opts.verificationState } : {}),
    ...(opts.receiptPath ? { receipt_path: opts.receiptPath } : {}),
    ...(opts.exitCode === undefined ? {} : { exit_code: opts.exitCode }),
    ...(opts.summary ? { summary: opts.summary } : {}),
    ...(opts.activeClaimCleanup
      ? {
          lifecycle_status: "degraded" as const,
          active_claim_cleanup: opts.activeClaimCleanup,
        }
      : {}),
  };
}

export function isTerminalRunnerStatus(status: RunnerLifecycleStatus): boolean {
  return (
    status === "success" || status === "failed" || status === "blocked" || status === "cancelled"
  );
}

export function tailText(text: string, lineCount: number): string {
  if (lineCount === 0) return "";
  const normalized = text.replaceAll("\r\n", "\n");
  const lines = normalized.split("\n");
  const trailingEmpty = lines.at(-1) === "" ? lines.slice(0, -1) : lines;
  return trailingEmpty.slice(-lineCount).join("\n");
}

export type RunnerProcessLiveness = boolean | "unverified" | "mismatch" | null;

async function runnerProcessAlive(
  inspection: LoadedTaskRunnerInspection,
): Promise<RunnerProcessLiveness> {
  const pid = inspection.state.supervision?.pid;
  if (typeof pid !== "number") return null;
  const expected = inspection.state.supervision?.process_identity;
  if (!expected) {
    return isProcessAlive(pid) ? "unverified" : false;
  }
  if (expected.pid !== pid) return "mismatch";
  try {
    const observed = await readObservedProcessIdentity(pid);
    if (!observed) return isProcessAlive(pid) ? "unverified" : false;
    if (!observed.command || !observed.started_at) return "unverified";
    if (
      observed.pid !== expected.pid ||
      observed.command !== expected.command ||
      observed.started_at !== expected.started_at
    ) {
      return "mismatch";
    }
    return true;
  } catch {
    return isProcessAlive(pid) ? "unverified" : false;
  }
}

function taskOutcomeContainsRun(inspection: LoadedTaskRunnerInspection): boolean {
  const outcome = inspection.task_runner_outcome;
  if (!outcome) return false;
  const entries = outcome.history?.length ? outcome.history : [outcome];
  return entries.some(
    (entry) =>
      entry.run_id === inspection.run_id &&
      entry.status === inspection.state.status &&
      entry.updated_at === inspection.state.updated_at,
  );
}

type TaskRunnerNextSafeAction =
  | "none"
  | "inspect_process_cleanup"
  | "inspect_run_state"
  | "inspect_spawn_authority"
  | "manual_repair_required"
  | "task_reclaim"
  | "task_run_reconcile"
  | "wait_for_active_run"
  | "wait_for_recovery_owner";

function taskRunnerNextSafeAction(
  inspection: TaskRunnerControlInspection,
): TaskRunnerNextSafeAction {
  if (!inspection.active_claim) return "none";
  const recoveryLease = inspection.recovery_lease;
  if (recoveryLease?.status === "invalid") return "manual_repair_required";
  if (recoveryLease?.status === "held") {
    return recoveryLease.owner_status === "active"
      ? "wait_for_recovery_owner"
      : "manual_repair_required";
  }
  if (
    inspection.active_claim_owner_status === "active" ||
    inspection.active_claim_owner_status === "unverified"
  ) {
    return "wait_for_active_run";
  }
  if (
    inspection.claimed_run_authority === "absent" ||
    inspection.claimed_run_authority === "incomplete_pre_provider" ||
    inspection.claimed_run_authority === "terminal"
  ) {
    return "task_run_reconcile";
  }
  if (inspection.claimed_run_authority === "terminal_cleanup_unverified") {
    return "inspect_process_cleanup";
  }
  if (
    inspection.claimed_run_authority === "running_child_dead" ||
    inspection.claimed_run_authority === "running_child_mismatch"
  ) {
    return "task_reclaim";
  }
  if (inspection.claimed_run_authority === "spawn_authorized_but_unconfirmed") {
    return "inspect_spawn_authority";
  }
  return "inspect_run_state";
}

function renderTaskRunnerControlPayload(inspection: TaskRunnerControlInspection) {
  const activeClaim = inspection.active_claim ?? null;
  return {
    active_claim_present: activeClaim !== null,
    active_claim: activeClaim
      ? {
          run_id: activeClaim.run_id,
          operation: activeClaim.operation,
          generation: activeClaim.generation,
          claimed_at: activeClaim.claimed_at,
          owner_status: inspection.active_claim_owner_status,
        }
      : null,
    claimed_run_authority: inspection.claimed_run_authority,
    recovery_lease: inspection.recovery_lease,
    execution_blocked: activeClaim !== null,
    next_safe_action: taskRunnerNextSafeAction(inspection),
  };
}

export async function renderRunnerStatusPayload(inspection: LoadedTaskRunnerInspection) {
  const state = inspection.state;
  const supervision = state.supervision ?? null;
  const executionReceipt = state.result?.execution_receipt ?? null;
  const activeClaim = inspection.active_claim ?? null;
  const selectedRunOwnsActiveClaim = activeClaim?.run_id === inspection.run_id;
  const reconcileRequired = selectedRunOwnsActiveClaim && isTerminalRunnerStatus(state.status);
  const control = renderTaskRunnerControlPayload(inspection);
  return {
    task_id: inspection.task_id,
    run_id: inspection.run_id,
    selection: inspection.selection,
    storage: inspection.storage,
    status: state.status,
    mode: state.mode,
    adapter_id: state.adapter_id,
    target: state.target,
    created_at: state.created_at,
    updated_at: state.updated_at,
    started_at: supervision?.started_at ?? null,
    heartbeat_at: supervision?.heartbeat_at ?? null,
    ended_at: state.result?.ended_at ?? null,
    pid: supervision?.pid ?? null,
    pid_alive: await runnerProcessAlive(inspection),
    ...control,
    active_claim_retained: reconcileRequired,
    active_claim_selected_run: selectedRunOwnsActiveClaim,
    projection_pending: reconcileRequired && !taskOutcomeContainsRun(inspection),
    reconcile_required: reconcileRequired,
    exit_code: state.result?.exit_code ?? null,
    summary: state.result?.summary ?? null,
    verification_state: executionReceipt?.verification_state ?? null,
    receipt_path: executionReceipt?.path ?? null,
    paths: {
      run_dir: inspection.paths.run_dir,
      state: inspection.paths.state_path,
      events: inspection.paths.events_path,
      trace: inspection.paths.trace_path,
      stderr: inspection.paths.stderr_path,
      result: inspection.paths.result_path,
      receipt:
        inspection.storage === "legacy_task" &&
        inspection.bundle.execution.artifact_paths.receipt_path === undefined
          ? null
          : inspection.paths.receipt_path,
      bundle: inspection.paths.bundle_path,
      bootstrap: inspection.paths.bootstrap_path,
    },
  };
}

export async function renderRunnerDiagnosticStatusPayload(
  inspection: TaskRunnerDiagnosticInspection,
) {
  if (inspection.run) return await renderRunnerStatusPayload(inspection.run);
  return {
    task_id: inspection.control.task_id,
    run_id: null,
    selection: "none" as const,
    storage: null,
    status: null,
    mode: null,
    adapter_id: null,
    target: null,
    created_at: null,
    updated_at: null,
    started_at: null,
    heartbeat_at: null,
    ended_at: null,
    pid: null,
    pid_alive: null,
    ...renderTaskRunnerControlPayload(inspection.control),
    active_claim_retained: false,
    active_claim_selected_run: false,
    projection_pending: false,
    reconcile_required: false,
    exit_code: null,
    summary: null,
    verification_state: null,
    receipt_path: null,
    paths: null,
  };
}

function renderRunnerStatusReportEntries(
  payload: Awaited<ReturnType<typeof renderRunnerDiagnosticStatusPayload>>,
) {
  return [
    { label: "task", value: payload.task_id },
    { label: "run", value: payload.run_id },
    { label: "storage", value: payload.storage },
    { label: "status", value: payload.status },
    { label: "verification", value: payload.verification_state },
    { label: "mode", value: payload.mode },
    { label: "adapter", value: payload.adapter_id },
    { label: "updated_at", value: payload.updated_at },
    { label: "heartbeat_at", value: payload.heartbeat_at },
    { label: "pid", value: payload.pid },
    { label: "pid_alive", value: payload.pid_alive },
    { label: "active_claim_present", value: payload.active_claim_present },
    { label: "active_claim_retained", value: payload.active_claim_retained },
    { label: "active_claim_run", value: payload.active_claim?.run_id ?? null },
    { label: "active_claim_owner", value: payload.active_claim?.owner_status ?? null },
    { label: "claimed_run_authority", value: payload.claimed_run_authority },
    { label: "recovery_lease", value: payload.recovery_lease?.status ?? null },
    { label: "recovery_lease_owner", value: payload.recovery_lease?.owner_status ?? null },
    { label: "execution_blocked", value: payload.execution_blocked },
    { label: "next_safe_action", value: payload.next_safe_action },
    { label: "projection_pending", value: payload.projection_pending },
    { label: "reconcile_required", value: payload.reconcile_required },
    { label: "summary", value: payload.summary },
    { label: "receipt", value: payload.receipt_path },
    { label: "state", value: payload.paths?.state ?? null },
    { label: "trace", value: payload.paths?.trace ?? null },
  ];
}

export function reportRunnerStatus(
  payload: Awaited<ReturnType<typeof renderRunnerDiagnosticStatusPayload>>,
  taskId: string,
): void {
  createCliEmitter().report(renderRunnerStatusReportEntries(payload), {
    header: infoMessage(`task runner status: ${taskId}`),
  });
}

async function renderRunnerInspectPayload(
  inspection: LoadedTaskRunnerInspection,
  eventCount: number,
) {
  return {
    ...(await renderRunnerStatusPayload(inspection)),
    recent_events: inspection.events.slice(-eventCount),
    result: inspection.state.result ?? null,
    prepared_metadata: inspection.state.prepared_metadata ?? null,
    policy_decision: inspection.state.policy_decision ?? null,
  };
}

export async function renderRunnerDiagnosticInspectPayload(
  inspection: TaskRunnerDiagnosticInspection,
  eventCount: number,
) {
  if (inspection.run) return await renderRunnerInspectPayload(inspection.run, eventCount);
  return {
    ...(await renderRunnerDiagnosticStatusPayload(inspection)),
    recent_events: [],
    result: null,
    prepared_metadata: null,
    policy_decision: null,
  };
}

export function runnerReconciliationWarning(
  payload: Awaited<ReturnType<typeof renderRunnerDiagnosticStatusPayload>>,
): string | null {
  if (payload.active_claim_retained && payload.projection_pending) {
    return (
      `task runner run ${payload.run_id} retains the active claim; TaskData projection is pending ` +
      `and reconciliation is required.`
    );
  }
  if (payload.active_claim_retained && payload.reconcile_required) {
    return `task runner run ${payload.run_id} retains the active claim; reconciliation is required.`;
  }
  if (
    payload.execution_blocked &&
    payload.next_safe_action !== "wait_for_active_run" &&
    payload.active_claim
  ) {
    return (
      `task runner active claim for run ${payload.active_claim.run_id} blocks new execution; ` +
      `next_safe_action=${payload.next_safe_action}.`
    );
  }
  return null;
}

export async function loadRunnerLogText(
  inspection: LoadedTaskRunnerInspection,
  stream: TaskRunLogsParsed["stream"],
): Promise<string> {
  if (stream === "events") return inspection.events_text;
  if (stream === "trace") {
    return await inspection.repository.readTraceTextRequired({
      task_id: inspection.task_id,
      run_id: inspection.run_id,
    });
  }
  return await inspection.repository.readStderrTextRequired({
    task_id: inspection.task_id,
    run_id: inspection.run_id,
  });
}

export function reportPreparedTaskRun(
  payload: ReturnType<typeof renderTaskRunPayload>,
  taskId: string,
): void {
  createCliEmitter().report(
    [
      { label: "task", value: payload.task_id },
      { label: "mode", value: payload.mode },
      { label: "adapter", value: payload.adapter_id },
      { label: "run", value: payload.run_id },
      { label: "bundle", value: payload.bundle_path },
      { label: "bootstrap", value: payload.bootstrap_path },
      { label: "result", value: payload.result_path },
    ],
    { header: infoMessage(`task run prepared: ${taskId}`) },
  );
}

export function reportExecutedTaskRun(
  payload: ReturnType<typeof renderTaskRunPayload>,
  taskId: string,
): void {
  createCliEmitter().report(
    [
      { label: "task", value: payload.task_id },
      { label: "mode", value: payload.mode },
      { label: "adapter", value: payload.adapter_id },
      { label: "run", value: payload.run_id },
      { label: "status", value: payload.status ?? "unknown" },
      { label: "verification", value: payload.verification_state ?? "unavailable" },
      { label: "exit_code", value: payload.exit_code ?? null },
      { label: "summary", value: payload.summary ?? null },
      {
        label: "lifecycle",
        value: payload.active_claim_cleanup ? "degraded" : "complete",
      },
      {
        label: "active_claim_cleanup",
        value: payload.active_claim_cleanup?.message ?? null,
      },
      { label: "result", value: payload.result_path },
      { label: "receipt", value: payload.receipt_path ?? null },
    ],
    { header: infoMessage(`task run completed: ${taskId}`) },
  );
}
