import type { RunnerInvocation, RunnerResult } from "../types.js";
import { runnerArtifactsFromSpecs } from "./shared.js";

export function durationMs(startedAt: string, endedAt: string): number | undefined {
  const started = Date.parse(startedAt);
  const ended = Date.parse(endedAt);
  if (Number.isNaN(started) || Number.isNaN(ended)) return undefined;
  return Math.max(0, ended - started);
}

export function buildInvocationEventData(
  invocation: RunnerInvocation,
  extra: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    executable: invocation.argv[0] ?? null,
    argv_count: invocation.argv.length,
    cwd: invocation.run_dir,
    env_keys: Object.keys(invocation.env).toSorted(),
    trace_policy: invocation.trace_policy,
    timeout_policy: invocation.timeout_policy,
    has_bootstrap_path:
      typeof invocation.bootstrap_path === "string" && invocation.bootstrap_path.trim().length > 0,
    ...extra,
  };
}

export function buildRunnerExecutionArtifacts(opts: {
  invocation: RunnerInvocation;
  trace_artifact_path?: string | null;
  trace_archive_path?: string | null;
  stderr_artifact_path?: string | null;
  stderr_archive_path?: string | null;
  source_manifest_path?: string | null;
  invalid_manifest_path?: string | null;
  include_output_last_message?: boolean;
}): NonNullable<RunnerResult["artifacts"]> {
  return (
    runnerArtifactsFromSpecs([
      { path: opts.invocation.bundle_path, label: "bundle" },
      { path: opts.invocation.bootstrap_path, label: "bootstrap" },
      { path: opts.trace_artifact_path, label: "raw-trace" },
      { path: opts.trace_archive_path, label: "raw-trace-gzip" },
      { path: opts.stderr_artifact_path, label: "stderr-log" },
      { path: opts.stderr_archive_path, label: "stderr-log-gzip" },
      { path: opts.source_manifest_path, label: "source-result-manifest" },
      ...(opts.include_output_last_message
        ? [{ path: opts.invocation.output_last_message_path, label: "assistant-last-message" }]
        : []),
      { path: opts.invalid_manifest_path, label: "invalid-result-manifest" },
      { path: opts.invocation.result_path, label: "result-manifest" },
    ]) ?? []
  );
}
