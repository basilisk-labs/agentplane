import type { RunnerAdapterId } from "@agentplaneorg/core";

import type { RunnerContextBundle, RunnerInvocation, RunnerResult } from "../types.js";

function nowIso(): string {
  return new Date().toISOString();
}

export type RunnerAdapter = {
  id: RunnerAdapterId;
  prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation>;
  execute(invocation: RunnerInvocation): Promise<RunnerResult>;
};

export function runnerAdapterSuccessResult(opts: {
  started_at?: string;
  exit_code?: number;
  stdout_summary: string;
  output_paths?: string[];
}): RunnerResult {
  const started_at = opts.started_at ?? nowIso();
  return {
    status: "success",
    exit_code: opts.exit_code ?? 0,
    started_at,
    ended_at: nowIso(),
    stdout_summary: opts.stdout_summary,
    output_paths: opts.output_paths,
  };
}

export function runnerAdapterFailureResult(opts: {
  err: unknown;
  started_at?: string;
  exit_code?: number | null;
  output_paths?: string[];
}): RunnerResult {
  const started_at = opts.started_at ?? nowIso();
  const message = opts.err instanceof Error ? opts.err.message : String(opts.err);
  return {
    status: "failed",
    exit_code: opts.exit_code ?? 1,
    started_at,
    ended_at: nowIso(),
    stderr_summary: message,
    output_paths: opts.output_paths,
  };
}
