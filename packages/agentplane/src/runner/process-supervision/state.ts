import { readRunnerRunState } from "../artifacts.js";
import type { RunnerInvocation, RunnerRunState, RunnerSupervisionState } from "../types.js";

export function renderInvocationCommand(invocation: RunnerInvocation): string | null {
  const commandLine = invocation.argv
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join(" ");
  return commandLine.length > 0 ? commandLine : null;
}

export function mergeSupervisionState(
  current: RunnerSupervisionState | undefined,
  patch: Partial<RunnerSupervisionState>,
): RunnerSupervisionState {
  return {
    ...current,
    ...Object.fromEntries(Object.entries(patch).filter(([, value]) => value !== undefined)),
  };
}

export function buildInvocationEventData(
  invocation: RunnerInvocation,
  pid: number | null,
): Record<string, unknown> {
  return {
    executable: invocation.argv[0] ?? null,
    argv_count: invocation.argv.length,
    cwd: invocation.repository_root,
    env_keys: Object.keys(invocation.env).toSorted(),
    has_bootstrap_path:
      typeof invocation.bootstrap_path === "string" && invocation.bootstrap_path.trim().length > 0,
    has_output_last_message_path:
      typeof invocation.output_last_message_path === "string" &&
      invocation.output_last_message_path.trim().length > 0,
    has_trace_path:
      typeof invocation.trace_path === "string" && invocation.trace_path.trim().length > 0,
    has_stderr_path:
      typeof invocation.stderr_path === "string" && invocation.stderr_path.trim().length > 0,
    trace_policy: invocation.trace_policy,
    timeout_policy: invocation.timeout_policy,
    pid,
  };
}

export async function waitForRunnerStateStop(opts: {
  state_path: string;
  timeout_ms: number;
  poll_ms?: number;
}): Promise<RunnerRunState | null> {
  const started = Date.now();
  const poll_ms = opts.poll_ms ?? 100;
  while (Date.now() - started < opts.timeout_ms) {
    const state = await readRunnerRunState(opts.state_path);
    if (state && state.status !== "running") return state;
    await new Promise((resolve) => setTimeout(resolve, poll_ms));
  }
  const state = await readRunnerRunState(opts.state_path);
  return state && state.status !== "running" ? state : null;
}
