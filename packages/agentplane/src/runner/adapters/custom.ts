import { readFile } from "node:fs/promises";

import type { RunnerCustomConfig } from "@agentplaneorg/core/config";

import type {
  RunnerAdapterCapabilities,
  RunnerContextBundle,
  RunnerInvocation,
  RunnerResultArtifact,
  RunnerResult,
} from "../types.js";
import {
  runnerAdapterCancelledResult,
  runnerAdapterFailureResult,
  runnerAdapterSuccessResult,
  type RunnerAdapter,
} from "./shared.js";
import { buildRunnerExecutionArtifacts, durationMs } from "./runtime-shared.js";
import { exitCodeForSignal } from "../process-supervision/signals.js";
import type { readRunnerResultManifest } from "../result-manifest.js";
import { assertAdapterBundle, assertAdapterInvocation } from "./base.js";
import { buildCustomCapabilities, buildCustomInvocation } from "./custom-preparation.js";
import {
  executeSupervisedRunnerAdapter,
  type SupervisedRunnerArtifactInput,
} from "./execute-supervised.js";

function assertCustomBundle(bundle: RunnerContextBundle): void {
  assertAdapterBundle({ adapterId: "custom", label: "Custom", bundle });
}

function buildCustomArtifacts(
  opts: SupervisedRunnerArtifactInput,
): NonNullable<RunnerResult["artifacts"]> {
  return buildRunnerExecutionArtifacts({
    invocation: opts.invocation,
    trace_artifact_path: opts.processResult?.trace_artifact_path,
    trace_archive_path: opts.processResult?.trace_archive_path,
    stderr_artifact_path: opts.processResult?.stderr_artifact_path,
    stderr_archive_path: opts.processResult?.stderr_archive_path,
    source_manifest_path: opts.source_manifest_path,
    invalid_manifest_path: opts.invalid_manifest_path,
    include_output_last_message: false,
  });
}

function mergeRunnerArtifacts(
  base: RunnerResult["artifacts"],
  extra: RunnerResultArtifact[] | undefined,
): RunnerResult["artifacts"] {
  const merged: NonNullable<RunnerResult["artifacts"]> = [];
  const seen = new Set<string>();
  for (const artifact of [...(base ?? []), ...(extra ?? [])]) {
    const key = `${artifact.path}::${artifact.label ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(artifact);
  }
  return merged.length > 0 ? merged : undefined;
}

function applyCustomRunnerResultManifest(opts: {
  base: RunnerResult;
  manifest: Awaited<ReturnType<typeof readRunnerResultManifest>>;
}): RunnerResult {
  if (!opts.manifest) return opts.base;
  const merged: RunnerResult = {
    ...opts.base,
    status:
      opts.base.status === "cancelled" ? "cancelled" : (opts.manifest.status ?? opts.base.status),
    exit_code:
      opts.base.status === "cancelled"
        ? opts.base.exit_code
        : (opts.manifest.exit_code ?? opts.base.exit_code),
    artifacts: mergeRunnerArtifacts(opts.base.artifacts, opts.manifest.artifacts),
    capabilities_used: opts.manifest.capabilities_used ?? opts.base.capabilities_used,
    metrics: {
      ...opts.base.metrics,
      ...opts.manifest.metrics,
    },
    evidence: opts.manifest.evidence ?? opts.base.evidence,
  };
  if (merged.artifacts && merged.artifacts.length > 0) {
    merged.output_paths = merged.artifacts.map((artifact) => artifact.path);
  }
  return merged;
}

export class CustomRunnerAdapter implements RunnerAdapter {
  readonly id = "custom" as const;

  constructor(private readonly config: RunnerCustomConfig | undefined) {}

  describeCapabilities(_bundle: RunnerContextBundle): RunnerAdapterCapabilities {
    return structuredClone(buildCustomCapabilities(this.config));
  }

  prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation> {
    assertCustomBundle(bundle);
    return Promise.resolve(
      buildCustomInvocation({
        adapterId: this.id,
        config: this.config,
        bundle,
      }),
    );
  }

  execute(invocation: RunnerInvocation): Promise<RunnerResult> {
    return executeSupervisedRunnerAdapter({
      invocation,
      assertInvocation: (input) =>
        assertAdapterInvocation({ adapterId: "custom", label: "Custom", invocation: input }),
      readStdinText: async (input) =>
        input.bootstrap_path ? await readFile(input.bootstrap_path, "utf8") : "",
      startMessage: "custom runner started",
      buildArtifacts: buildCustomArtifacts,
      preserveSourceManifestOnSuccess: (manifest) => manifest !== null,
      capabilitiesUsed: (input) => [`custom:${input.argv[0] ?? "runner"}`],
      applyManifest: applyCustomRunnerResultManifest,
      successEventMessage: (result) => `custom runner finished with status=${result.status}`,
      failureSummary: "Custom runner execution failed before producing a valid result manifest.",
      failureEventType: "runner_execute_finish",
      failureEventMessage: (result) => `custom runner failed with status=${result.status}`,
      buildBaseResult: ({ processResult, artifacts, output_paths }) => {
        const success = processResult.exit_code === 0;
        const ended_at = processResult.ended_at;
        const timedOut = processResult.timeout_reason !== null;
        const resultMetrics = {
          duration_ms: durationMs(processResult.started_at, ended_at),
          stdout_bytes: processResult.stdout_bytes,
          stderr_bytes: processResult.stderr_bytes,
        };
        const baseResult = timedOut
          ? runnerAdapterFailureResult({
              err: new Error(
                `Custom runner execution timed out (${processResult.timeout_reason}).`,
              ),
              summary: `Custom runner execution timed out (${processResult.timeout_reason}).`,
              stderr_summary: "Timeout details were captured in stderr.log and agent-trace.jsonl.",
              started_at: processResult.started_at,
              ended_at,
              exit_code: 124,
              output_paths,
              metrics: resultMetrics,
              timeout_reason: processResult.timeout_reason,
            })
          : processResult.cancel_requested_at
            ? runnerAdapterCancelledResult({
                reason: processResult.cancel_signal
                  ? `Custom runner cancelled via ${processResult.cancel_signal}.`
                  : "Custom runner cancelled.",
                summary: "Custom runner execution was cancelled.",
                stderr_summary:
                  "Cancellation details were recorded in stderr.log and agent-trace.jsonl.",
                started_at: processResult.started_at,
                ended_at,
                exit_code:
                  processResult.exit_code ?? exitCodeForSignal(processResult.exit_signal) ?? null,
                output_paths,
                metrics: resultMetrics,
              })
            : success
              ? runnerAdapterSuccessResult({
                  summary: "Custom runner execution completed successfully.",
                  started_at: processResult.started_at,
                  ended_at,
                  exit_code: processResult.exit_code ?? 0,
                  stdout_summary: "Raw execution trace was captured in agent-trace.jsonl.",
                  output_paths,
                  metrics: resultMetrics,
                })
              : runnerAdapterFailureResult({
                  err: new Error(
                    `Custom runner exited with code ${processResult.exit_code ?? "unknown"}`,
                  ),
                  summary: "Custom runner execution failed.",
                  stderr_summary:
                    "Failure details were captured in stderr.log and agent-trace.jsonl.",
                  started_at: processResult.started_at,
                  ended_at,
                  exit_code:
                    processResult.exit_code ?? exitCodeForSignal(processResult.exit_signal) ?? 1,
                  output_paths,
                  metrics: resultMetrics,
                  timeout_reason: processResult.timeout_reason,
                });
        return {
          ...baseResult,
          artifacts,
          capabilities_used: [`custom:${invocation.argv[0] ?? "runner"}`],
        };
      },
    });
  }
}
