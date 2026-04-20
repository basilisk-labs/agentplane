import type { SupervisedProcessResult } from "../process-supervision.js";
import type { RunnerRunRepository } from "../run-repository.js";
import type { RunnerContextBundle, RunnerInvocation, RunnerResult } from "../types.js";
import { evolveRunnerRunState } from "../artifacts.js";
import { buildInvocationEventData } from "./runtime-shared.js";

export function assertAdapterBundle(opts: {
  adapterId: string;
  label: string;
  bundle: RunnerContextBundle;
}): void {
  if (opts.bundle.execution.adapter_id !== opts.adapterId) {
    throw new Error(
      `${opts.label} adapter cannot prepare bundle for adapter_id=${JSON.stringify(opts.bundle.execution.adapter_id)}`,
    );
  }
  if (!opts.bundle.execution.artifact_paths.bundle_path.trim()) {
    throw new Error(`${opts.label} adapter requires a non-empty bundle path`);
  }
  if (!opts.bundle.execution.artifact_paths.run_dir.trim()) {
    throw new Error(`${opts.label} adapter requires a non-empty run dir`);
  }
}

export function assertAdapterInvocation(opts: {
  adapterId: string;
  label: string;
  invocation: RunnerInvocation;
  requireBootstrap?: boolean;
  minArgvLength?: number;
}): void {
  const { invocation } = opts;
  if (invocation.adapter_id !== opts.adapterId) {
    throw new Error(
      `${opts.label} adapter cannot execute invocation for adapter_id=${JSON.stringify(invocation.adapter_id)}`,
    );
  }
  const requiredPaths: [string, string | null | undefined][] = [
    ["bundle_path", invocation.bundle_path],
    ["run_dir", invocation.run_dir],
    ["state_path", invocation.state_path],
    ["events_path", invocation.events_path],
    ["result_path", invocation.result_path],
    ["trace_path", invocation.trace_path],
    ["stderr_path", invocation.stderr_path],
  ];
  if (opts.requireBootstrap) {
    requiredPaths.push(["bootstrap_path", invocation.bootstrap_path]);
  }
  for (const [field, value] of requiredPaths) {
    if (!value?.trim()) {
      throw new Error(`${opts.label} adapter invocation is missing ${field}`);
    }
  }
  if (opts.minArgvLength !== undefined && invocation.argv.length < opts.minArgvLength) {
    throw new Error(`${opts.label} adapter invocation is missing normalized argv metadata`);
  }
}

export async function writeRunnerExecutionState(opts: {
  repository: RunnerRunRepository;
  result: RunnerResult;
  processResult: SupervisedProcessResult;
  command: string;
}): Promise<void> {
  const stateAfter = await opts.repository.readState();
  if (!stateAfter) return;
  await opts.repository.writeState(
    evolveRunnerRunState({
      state: stateAfter,
      status: opts.result.status,
      result: opts.result,
      supervision: {
        ...stateAfter.supervision,
        pid: opts.processResult.pid,
        command: opts.command,
        started_at: opts.processResult.started_at,
        heartbeat_at: opts.processResult.heartbeat_at,
        exit_signal: opts.processResult.exit_signal,
        timeout_reason: opts.processResult.timeout_reason,
        timeout_requested_at: opts.processResult.timeout_requested_at,
        terminate_sent_at: opts.processResult.terminate_sent_at,
        kill_sent_at: opts.processResult.kill_sent_at,
        force_killed: opts.processResult.force_killed,
      },
    }),
  );
}

export async function writeRunnerResultState(opts: {
  repository: RunnerRunRepository;
  result: RunnerResult;
}): Promise<void> {
  const stateAfter = await opts.repository.readState();
  if (!stateAfter) return;
  await opts.repository.writeState(
    evolveRunnerRunState({
      state: stateAfter,
      status: opts.result.status,
      result: opts.result,
    }),
  );
}

export async function appendRunnerExecutionEvent(opts: {
  repository: RunnerRunRepository;
  invocation: RunnerInvocation;
  result: RunnerResult;
  processResult: SupervisedProcessResult;
  message: string;
  outputPaths: string[];
}): Promise<void> {
  await opts.repository.appendEvent({
    at: opts.result.ended_at,
    type: "runner_execute_finish",
    message: opts.message,
    data: {
      ...buildInvocationEventData(opts.invocation),
      pid: opts.processResult.pid,
      exit_signal: opts.processResult.exit_signal,
      cancel_requested_at: opts.processResult.cancel_requested_at,
      cancel_signal: opts.processResult.cancel_signal,
      timeout_reason: opts.processResult.timeout_reason,
      timeout_requested_at: opts.processResult.timeout_requested_at,
      terminate_sent_at: opts.processResult.terminate_sent_at,
      kill_sent_at: opts.processResult.kill_sent_at,
      force_killed: opts.processResult.force_killed,
      exit_code: opts.result.exit_code,
      output_paths: opts.outputPaths,
      metrics: opts.result.metrics,
    },
  });
}

export async function appendRunnerResultEvent(opts: {
  repository: RunnerRunRepository;
  invocation: RunnerInvocation;
  result: RunnerResult;
  type: "runner_execute_error" | "runner_execute_finish";
  message: string;
  outputPaths: string[];
}): Promise<void> {
  await opts.repository.appendEvent({
    at: opts.result.ended_at,
    type: opts.type,
    message: opts.message,
    data: {
      ...buildInvocationEventData(opts.invocation),
      exit_code: opts.result.exit_code,
      output_paths: opts.outputPaths,
      metrics: opts.result.metrics,
    },
  });
}
