import { readFile } from "node:fs/promises";

import type {
  RunnerAdapterCapabilities,
  RunnerContextBundle,
  RunnerInvocation,
  RunnerResult,
} from "../types.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import {
  runnerAdapterCancelledResult,
  runnerAdapterFailureResult,
  runnerAdapterSuccessResult,
  type RunnerAdapter,
} from "./shared.js";
import { buildRunnerExecutionArtifacts, durationMs } from "./runtime-shared.js";
import { runSupervisedProcess, type SupervisedProcessResult } from "../process-supervision/run.js";
import { exitCodeForSignal } from "../process-supervision/signals.js";
import {
  InvalidRunnerResultManifestError,
  applyRunnerResultManifest,
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
import { buildCodexInvocation, CODEX_RUN_PROFILE_CAPABILITIES } from "./codex-preparation.js";

function byteLength(text: string | null | undefined): number {
  return Buffer.byteLength(text ?? "", "utf8");
}

async function readOptionalText(filePath?: string | null): Promise<string | null> {
  if (!filePath?.trim()) return null;
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

function buildCodexArtifacts(opts: {
  invocation: RunnerInvocation;
  trace_artifact_path?: string | null;
  trace_archive_path?: string | null;
  stderr_artifact_path?: string | null;
  stderr_archive_path?: string | null;
  source_manifest_path?: string | null;
  invalid_manifest_path?: string | null;
}): NonNullable<RunnerResult["artifacts"]> {
  return buildRunnerExecutionArtifacts({ ...opts, include_output_last_message: true });
}

function assertCodexBundle(bundle: RunnerContextBundle): void {
  assertAdapterBundle({ adapterId: "codex", label: "Codex", bundle });
}

function assertCodexInvocation(invocation: RunnerInvocation): void {
  assertAdapterInvocation({
    adapterId: "codex",
    label: "Codex",
    invocation,
    requireBootstrap: true,
    minArgvLength: 5,
  });
}

function assertExecuteModeManifest(opts: {
  invocation: RunnerInvocation;
  processResult: SupervisedProcessResult;
  manifest: Awaited<ReturnType<typeof readRunnerResultManifest>>;
}): void {
  if (opts.invocation.dry_run) return;
  if (opts.processResult.exit_code !== 0) return;
  if (opts.processResult.timeout_reason !== null) return;
  if (opts.processResult.cancel_requested_at) return;
  if (opts.manifest !== null) return;
  throw new CliError({
    exitCode: exitCodeForError("E_RUNTIME"),
    code: "E_RUNTIME",
    message:
      `Codex exited successfully but did not write a valid runner result manifest to ` +
      `${JSON.stringify(opts.invocation.result_path)}.`,
    context: {
      adapter_id: "codex",
      result_path: opts.invocation.result_path,
      exit_code: opts.processResult.exit_code,
    },
  });
}

export class CodexRunnerAdapter implements RunnerAdapter {
  readonly id = "codex" as const;

  describeCapabilities(_bundle: RunnerContextBundle): RunnerAdapterCapabilities {
    return structuredClone(CODEX_RUN_PROFILE_CAPABILITIES);
  }

  prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation> {
    assertCodexBundle(bundle);
    return Promise.resolve(buildCodexInvocation({ adapterId: this.id, bundle }));
  }

  execute(invocation: RunnerInvocation): Promise<RunnerResult> {
    const started_at = new Date().toISOString();
    let processResult: SupervisedProcessResult | null = null;
    return (async () => {
      try {
        assertCodexInvocation(invocation);
        const repository = RunnerRunRepository.fromInvocation(invocation);
        const bootstrapText = await readFile(invocation.bootstrap_path!, "utf8");
        processResult = await runSupervisedProcess({
          invocation,
          stdin_text: bootstrapText,
          start_message: "codex exec started",
        });
        const lastMessage = await readOptionalText(invocation.output_last_message_path);
        const artifacts = buildCodexArtifacts({
          invocation,
          trace_artifact_path: processResult.trace_artifact_path,
          trace_archive_path: processResult.trace_archive_path,
          stderr_artifact_path: processResult.stderr_artifact_path,
          stderr_archive_path: processResult.stderr_archive_path,
        });
        const output_paths = artifacts.map((artifact) => artifact.path);
        const success = processResult.exit_code === 0;
        const ended_at = processResult.ended_at;
        const timedOut = processResult.timeout_reason !== null;
        const metrics = {
          duration_ms: durationMs(processResult.started_at, ended_at),
          stdout_bytes: processResult.stdout_bytes,
          stderr_bytes: processResult.stderr_bytes,
          output_last_message_bytes: lastMessage === null ? null : byteLength(lastMessage),
        };
        const baseResult = timedOut
          ? runnerAdapterFailureResult({
              err: new Error(`Codex execution timed out (${processResult.timeout_reason}).`),
              summary: `Codex execution timed out (${processResult.timeout_reason}).`,
              stderr_summary: "Timeout details were captured in stderr.log and agent-trace.jsonl.",
              started_at: processResult.started_at,
              ended_at,
              exit_code: 124,
              output_paths,
              metrics,
              timeout_reason: processResult.timeout_reason,
            })
          : processResult.cancel_requested_at
            ? runnerAdapterCancelledResult({
                reason: processResult.cancel_signal
                  ? `Codex runner cancelled via ${processResult.cancel_signal}.`
                  : "Codex runner cancelled.",
                summary: "Codex execution was cancelled.",
                stderr_summary:
                  "Cancellation details were recorded in stderr.log and agent-trace.jsonl.",
                started_at: processResult.started_at,
                ended_at,
                exit_code:
                  processResult.exit_code ?? exitCodeForSignal(processResult.exit_signal) ?? null,
                output_paths,
                metrics,
              })
            : success
              ? runnerAdapterSuccessResult({
                  summary: "Codex execution completed successfully.",
                  started_at: processResult.started_at,
                  ended_at,
                  exit_code: processResult.exit_code ?? 0,
                  stdout_summary: lastMessage?.trim()
                    ? "Assistant output was captured in codex-last-message.md; raw execution trace is in agent-trace.jsonl."
                    : "Raw execution trace was captured in agent-trace.jsonl.",
                  output_paths,
                  metrics,
                })
              : runnerAdapterFailureResult({
                  err: new Error(`Codex exited with code ${processResult.exit_code ?? "unknown"}`),
                  summary: "Codex execution failed.",
                  stderr_summary:
                    "Failure details were captured in stderr.log and agent-trace.jsonl.",
                  started_at: processResult.started_at,
                  ended_at,
                  exit_code:
                    processResult.exit_code ?? exitCodeForSignal(processResult.exit_signal) ?? 1,
                  output_paths,
                  metrics,
                  timeout_reason: processResult.timeout_reason,
                });
        const manifest = await readRunnerResultManifest(invocation.result_path);
        assertRunnerManifestArtifactPolicy({
          adapter_id: invocation.adapter_id,
          allowed_prefixes: readRecipeArtifactPrefixesFromRunnerEnv(invocation.env),
          manifest,
        });
        assertExecuteModeManifest({
          invocation,
          processResult,
          manifest,
        });
        const result = applyRunnerResultManifest({
          base: {
            ...baseResult,
            artifacts,
            capabilities_used: ["codex.exec"],
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
          message: `codex exec finished with status=${result.status}`,
          outputPaths: output_paths,
        });
        return result;
      } catch (err) {
        const ended_at = new Date().toISOString();
        const sourceManifestPath = await preserveRunnerResultManifestSource(invocation.result_path);
        const invalidManifestPath =
          err instanceof InvalidRunnerResultManifestError
            ? await preserveInvalidRunnerResultManifest({
                result_path: invocation.result_path,
                error: err,
              })
            : null;
        const artifacts = buildCodexArtifacts({
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
          summary: "Codex execution failed before producing a valid result manifest.",
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
            capabilities_used: ["codex.exec"],
          }),
        });
        const repository = RunnerRunRepository.fromInvocation(invocation);
        await writeRunnerResultState({ repository, result });
        await appendRunnerResultEvent({
          repository,
          invocation,
          result,
          type: "runner_execute_error",
          message: result.stderr_summary ?? "codex exec failed",
          outputPaths: output_paths,
        });
        return result;
      }
    })();
  }
}
