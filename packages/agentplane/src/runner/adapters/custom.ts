import { readFile } from "node:fs/promises";

import type { RunnerCustomConfig } from "@agentplaneorg/core";

import { CliError } from "../../shared/errors.js";
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
import {
  exitCodeForSignal,
  runSupervisedProcess,
  type SupervisedProcessResult,
} from "../process-supervision.js";
import {
  InvalidRunnerResultManifestError,
  manifestFromRunnerResult,
  preserveRunnerResultManifestSource,
  preserveInvalidRunnerResultManifest,
  readRunnerResultManifest,
  writeRunnerResultManifest,
} from "../result-manifest.js";
import { RunnerRunRepository } from "../run-repository.js";
import {
  assertRunnerManifestArtifactPolicy,
  readRecipeArtifactPrefixesFromRunnerEnv,
} from "../result-manifest-policy.js";
import {
  appendRunnerExecutionEvent,
  appendRunnerResultEvent,
  assertAdapterBundle,
  assertAdapterInvocation,
  writeRunnerExecutionState,
  writeRunnerResultState,
} from "./base.js";
import { buildCustomCapabilities, buildCustomInvocation } from "./custom-preparation.js";

function assertCustomBundle(bundle: RunnerContextBundle): void {
  assertAdapterBundle({ adapterId: "custom", label: "Custom", bundle });
}

function buildCustomArtifacts(opts: {
  invocation: RunnerInvocation;
  trace_artifact_path?: string | null;
  trace_archive_path?: string | null;
  stderr_artifact_path?: string | null;
  stderr_archive_path?: string | null;
  source_manifest_path?: string | null;
  invalid_manifest_path?: string | null;
}): NonNullable<RunnerResult["artifacts"]> {
  return buildRunnerExecutionArtifacts({ ...opts, include_output_last_message: false });
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
    const started_at = new Date().toISOString();
    let processResult: SupervisedProcessResult | null = null;
    return (async () => {
      try {
        assertAdapterInvocation({ adapterId: "custom", label: "Custom", invocation });
        const repository = RunnerRunRepository.fromInvocation(invocation);
        const bootstrapText = invocation.bootstrap_path
          ? await readFile(invocation.bootstrap_path, "utf8")
          : "";
        processResult = await runSupervisedProcess({
          invocation,
          stdin_text: bootstrapText,
          start_message: "custom runner started",
        });
        const manifest = await readRunnerResultManifest(invocation.result_path);
        const sourceManifestPath = manifest
          ? await preserveRunnerResultManifestSource(invocation.result_path)
          : null;
        assertRunnerManifestArtifactPolicy({
          adapter_id: invocation.adapter_id,
          allowed_prefixes: readRecipeArtifactPrefixesFromRunnerEnv(invocation.env),
          manifest,
        });
        const artifacts = buildCustomArtifacts({
          invocation,
          trace_artifact_path: processResult?.trace_artifact_path,
          trace_archive_path: processResult?.trace_archive_path,
          stderr_artifact_path: processResult?.stderr_artifact_path,
          stderr_archive_path: processResult?.stderr_archive_path,
          source_manifest_path: sourceManifestPath,
        });
        const output_paths = artifacts.map((artifact) => artifact.path);
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
        const result = applyCustomRunnerResultManifest({
          base: {
            ...baseResult,
            artifacts,
            capabilities_used: [`custom:${invocation.argv[0] ?? "runner"}`],
          },
          manifest,
        });
        await writeRunnerResultManifest({
          result_path: invocation.result_path,
          manifest: manifestFromRunnerResult(result),
        });
        await writeRunnerExecutionState({
          repository,
          result,
          processResult,
          command: invocation.argv.join(" "),
        });
        await appendRunnerExecutionEvent({
          repository,
          invocation,
          result,
          processResult,
          message: `custom runner finished with status=${result.status}`,
          outputPaths: output_paths,
        });
        return result;
      } catch (err) {
        const sourceManifestPath = await preserveRunnerResultManifestSource(invocation.result_path);
        const ended_at = new Date().toISOString();
        const invalidManifestPath =
          err instanceof InvalidRunnerResultManifestError
            ? await preserveInvalidRunnerResultManifest({
                result_path: invocation.result_path,
                error: err,
              })
            : null;
        const artifacts = buildCustomArtifacts({
          invocation,
          trace_artifact_path: processResult?.trace_artifact_path,
          trace_archive_path: processResult?.trace_archive_path,
          stderr_artifact_path: processResult?.stderr_artifact_path,
          stderr_archive_path: processResult?.stderr_archive_path,
          source_manifest_path: sourceManifestPath,
          invalid_manifest_path: invalidManifestPath,
        });
        const output_paths = artifacts.map((artifact) => artifact.path);
        const result = runnerAdapterFailureResult({
          err,
          summary: "Custom runner execution failed before producing a valid result manifest.",
          started_at,
          ended_at,
          exit_code: err instanceof CliError ? err.exitCode : undefined,
          output_paths,
        });
        await writeRunnerResultManifest({
          result_path: invocation.result_path,
          manifest: manifestFromRunnerResult({
            ...result,
            artifacts,
            capabilities_used: [`custom:${invocation.argv[0] ?? "runner"}`],
          }),
        });
        const repository = RunnerRunRepository.fromInvocation(invocation);
        await writeRunnerResultState({ repository, result });
        await appendRunnerResultEvent({
          repository,
          invocation,
          result,
          type: "runner_execute_finish",
          message: `custom runner failed with status=${result.status}`,
          outputPaths: output_paths,
        });
        return result;
      }
    })();
  }
}
