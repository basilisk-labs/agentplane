import type { RunnerAdapterId } from "@agentplaneorg/core";

import type {
  RunnerAdapterCapabilities,
  RunnerContextBundle,
  RunnerExecutionMetrics,
  RunnerInvocation,
  RunnerResultArtifact,
  RunnerResult,
} from "../types.js";

function nowIso(): string {
  return new Date().toISOString();
}

export type RunnerAdapter = {
  id: RunnerAdapterId;
  describeCapabilities(bundle: RunnerContextBundle): RunnerAdapterCapabilities;
  prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation>;
  execute(invocation: RunnerInvocation): Promise<RunnerResult>;
};

export function runnerAdapterSuccessResult(opts: {
  started_at?: string;
  ended_at?: string;
  exit_code?: number;
  summary?: string;
  stdout_summary: string;
  output_paths?: string[];
  metrics?: RunnerExecutionMetrics;
}): RunnerResult {
  const started_at = opts.started_at ?? nowIso();
  const ended_at = opts.ended_at ?? nowIso();
  return {
    status: "success",
    exit_code: opts.exit_code ?? 0,
    started_at,
    ended_at,
    summary: opts.summary,
    stdout_summary: opts.stdout_summary,
    output_paths: opts.output_paths,
    metrics: opts.metrics,
  };
}

export function runnerAdapterFailureResult(opts: {
  err: unknown;
  started_at?: string;
  ended_at?: string;
  exit_code?: number | null;
  summary?: string;
  stderr_summary?: string;
  output_paths?: string[];
  metrics?: RunnerExecutionMetrics;
}): RunnerResult {
  const started_at = opts.started_at ?? nowIso();
  const ended_at = opts.ended_at ?? nowIso();
  const message =
    opts.stderr_summary ?? (opts.err instanceof Error ? opts.err.message : String(opts.err));
  return {
    status: "failed",
    exit_code: opts.exit_code ?? 1,
    started_at,
    ended_at,
    summary: opts.summary,
    stderr_summary: message,
    output_paths: opts.output_paths,
    metrics: opts.metrics,
  };
}

export function runnerAdapterCancelledResult(opts: {
  reason: string;
  started_at?: string;
  ended_at?: string;
  exit_code?: number | null;
  summary?: string;
  stderr_summary?: string;
  output_paths?: string[];
  metrics?: RunnerExecutionMetrics;
}): RunnerResult {
  const started_at = opts.started_at ?? nowIso();
  const ended_at = opts.ended_at ?? nowIso();
  return {
    status: "cancelled",
    exit_code: opts.exit_code ?? null,
    started_at,
    ended_at,
    summary: opts.summary,
    stderr_summary: opts.stderr_summary ?? opts.reason,
    output_paths: opts.output_paths,
    metrics: opts.metrics,
  };
}

export function runnerArtifactsFromSpecs(
  specs: { path: string | null | undefined; label?: string }[],
): RunnerResultArtifact[] | undefined {
  const artifacts = specs
    .filter(
      (spec): spec is { path: string; label?: string } =>
        typeof spec.path === "string" && spec.path.trim().length > 0,
    )
    .map((spec) => ({
      path: spec.path,
      ...(spec.label ? { label: spec.label } : {}),
    }));
  return artifacts.length > 0 ? artifacts : undefined;
}
