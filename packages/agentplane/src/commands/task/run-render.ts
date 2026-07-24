import { createCliEmitter, infoMessage } from "../../cli/output.js";
import type { LoadedTaskRunnerInspection } from "../../runner/usecases/task-run-inspect.js";
import type { RunnerLifecycleStatus } from "../../runner/types.js";
import { isProcessAlive } from "../../runner/process-supervision/signals.js";
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

function runnerProcessAlive(inspection: LoadedTaskRunnerInspection): boolean | null {
  const pid = inspection.state.supervision?.pid;
  if (typeof pid !== "number") return null;
  return isProcessAlive(pid);
}

export function renderRunnerStatusPayload(inspection: LoadedTaskRunnerInspection) {
  const state = inspection.state;
  const supervision = state.supervision ?? null;
  const executionReceipt = state.result?.execution_receipt ?? null;
  return {
    task_id: inspection.task_id,
    run_id: inspection.run_id,
    selection: inspection.selection,
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
    pid_alive: runnerProcessAlive(inspection),
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
      receipt: inspection.paths.receipt_path,
      bundle: inspection.paths.bundle_path,
      bootstrap: inspection.paths.bootstrap_path,
    },
  };
}

function renderRunnerStatusReportEntries(payload: ReturnType<typeof renderRunnerStatusPayload>) {
  return [
    { label: "task", value: payload.task_id },
    { label: "run", value: payload.run_id },
    { label: "status", value: payload.status },
    { label: "verification", value: payload.verification_state },
    { label: "mode", value: payload.mode },
    { label: "adapter", value: payload.adapter_id },
    { label: "updated_at", value: payload.updated_at },
    { label: "heartbeat_at", value: payload.heartbeat_at },
    { label: "pid", value: payload.pid },
    { label: "pid_alive", value: payload.pid_alive },
    { label: "summary", value: payload.summary },
    { label: "receipt", value: payload.receipt_path },
    { label: "state", value: payload.paths.state },
    { label: "trace", value: payload.paths.trace },
  ];
}

export function reportRunnerStatus(
  payload: ReturnType<typeof renderRunnerStatusPayload>,
  taskId: string,
): void {
  createCliEmitter().report(renderRunnerStatusReportEntries(payload), {
    header: infoMessage(`task runner status: ${taskId}`),
  });
}

export function renderRunnerInspectPayload(
  inspection: LoadedTaskRunnerInspection,
  eventCount: number,
) {
  return {
    ...renderRunnerStatusPayload(inspection),
    recent_events: inspection.events.slice(-eventCount),
    result: inspection.state.result ?? null,
    prepared_metadata: inspection.state.prepared_metadata ?? null,
    policy_decision: inspection.state.policy_decision ?? null,
  };
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
      { label: "result", value: payload.result_path },
      { label: "receipt", value: payload.receipt_path ?? null },
    ],
    { header: infoMessage(`task run completed: ${taskId}`) },
  );
}
