import type { SupervisedProcessResult } from "../process-supervision/run.js";
import type { RunnerRunRepository } from "../run-repository.js";
import type {
  RunnerContextBundle,
  RunnerInvocation,
  RunnerResult,
  RunnerRunState,
} from "../types.js";
import { evolveRunnerRunState } from "../artifacts.js";
import { buildInvocationEventData } from "./runtime-shared.js";

function isTerminalRunnerState(state: RunnerRunState): boolean {
  return state.status !== "prepared" && state.status !== "running";
}

async function commitRunnerTerminalState(opts: {
  repository: RunnerRunRepository;
  expected_statuses: readonly ("prepared" | "running")[];
  evolve: (state: RunnerRunState) => RunnerRunState;
}): Promise<RunnerRunState | null> {
  const current = await opts.repository.readState();
  if (!current || isTerminalRunnerState(current)) return current;
  const expectedStatuses: readonly RunnerRunState["status"][] = opts.expected_statuses;
  if (!expectedStatuses.includes(current.status)) {
    throw new Error(
      `Runner terminal writer expected state in ${opts.expected_statuses.join(",")}, ` +
        `observed ${current.status}.`,
    );
  }
  const next = opts.evolve(current);
  await opts.repository.writeState(next);
  const observed = await opts.repository.readState();
  if (!observed || !isTerminalRunnerState(observed)) {
    throw new Error(
      `Runner terminal writer could not verify terminal state after ` +
        `${opts.expected_statuses.join(",")}.`,
    );
  }
  return observed;
}

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
    ["receipt_path", invocation.receipt_path],
    ["trace_path", invocation.trace_path],
    ["stderr_path", invocation.stderr_path],
    ["repository_root", invocation.repository_root],
    ["work_order_id", invocation.work_order_id],
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
}): Promise<RunnerRunState | null> {
  return await commitRunnerTerminalState({
    repository: opts.repository,
    expected_statuses: ["prepared", "running"],
    evolve: (state) =>
      evolveRunnerRunState({
        state,
        status: opts.result.status,
        result: opts.result,
        supervision: {
          ...state.supervision,
          pid: opts.processResult.pid,
          command: opts.command,
          started_at: opts.processResult.started_at,
          heartbeat_at: opts.processResult.heartbeat_at,
          cancel_requested_at: opts.processResult.cancel_requested_at,
          cancel_signal: opts.processResult.cancel_signal,
          exit_signal: opts.processResult.exit_signal,
          timeout_reason: opts.processResult.timeout_reason,
          timeout_requested_at: opts.processResult.timeout_requested_at,
          terminate_sent_at: opts.processResult.terminate_sent_at,
          kill_sent_at: opts.processResult.kill_sent_at,
          force_killed: opts.processResult.force_killed,
          process_tree: opts.processResult.process_tree,
        },
      }),
  });
}

export async function writeRunnerResultState(opts: {
  repository: RunnerRunRepository;
  result: RunnerResult;
}): Promise<RunnerRunState | null> {
  return await commitRunnerTerminalState({
    repository: opts.repository,
    expected_statuses: ["prepared", "running"],
    evolve: (state) =>
      evolveRunnerRunState({
        state,
        status: opts.result.status,
        result: opts.result,
      }),
  });
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
      process_tree: opts.processResult.process_tree,
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
