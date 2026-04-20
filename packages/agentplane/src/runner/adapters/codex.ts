import { readFile } from "node:fs/promises";
import path from "node:path";

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
import {
  exitCodeForSignal,
  runSupervisedProcess,
  type SupervisedProcessResult,
} from "../process-supervision.js";
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
import { buildRecipeRunnerEnv, readRecipeRunProfile } from "./recipe-run-profile.js";
import {
  appendRunnerExecutionEvent,
  appendRunnerResultEvent,
  assertAdapterBundle,
  assertAdapterInvocation,
  writeRunnerExecutionState,
  writeRunnerResultState,
} from "./base.js";

const CODEX_LAST_MESSAGE_FILENAME = "codex-last-message.md";
const CODEX_SANDBOX_VALUES = new Set(["read-only", "workspace-write", "danger-full-access"]);
const SUPPORTED_CODEX_SANDBOXES = [...CODEX_SANDBOX_VALUES];
const CODEX_RUN_PROFILE_CAPABILITIES: RunnerAdapterCapabilities = {
  adapter_id: "codex",
  fields: {
    sandbox: {
      level: "native",
      channel: "argv",
      supported_values: SUPPORTED_CODEX_SANDBOXES,
      note: "Recipe sandbox is enforced through codex --sandbox argv mapping.",
    },
    writes_artifacts_to: {
      level: "advisory",
      channel: "env",
      note: "Recipe artifact prefixes are exported through env and enforced post-run against external manifest artifacts and evidence paths.",
    },
  },
};

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

function resolveCodexSandbox(value: unknown): string {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (!normalized) return "danger-full-access";
  if (CODEX_SANDBOX_VALUES.has(normalized)) return normalized;
  throw new CliError({
    exitCode: 8,
    code: "E_RUNTIME",
    message:
      `Codex runner does not support recipe sandbox ${JSON.stringify(normalized)}; ` +
      `supported values: ${SUPPORTED_CODEX_SANDBOXES.join(", ")}.`,
    context: {
      adapter_id: "codex",
      requested_sandbox: normalized,
      supported_sandboxes: SUPPORTED_CODEX_SANDBOXES,
    },
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
    const { execution } = bundle;
    const runProfile = readRecipeRunProfile(bundle.recipe);
    const sandbox = resolveCodexSandbox(runProfile?.sandbox);
    const recipeEnv = buildRecipeRunnerEnv(bundle.recipe);
    return Promise.resolve({
      adapter_id: this.id,
      run_id: execution.run_id,
      run_dir: execution.artifact_paths.run_dir,
      bundle_path: execution.artifact_paths.bundle_path,
      state_path: execution.artifact_paths.state_path,
      events_path: execution.artifact_paths.events_path,
      result_path: execution.artifact_paths.result_path,
      trace_path: execution.artifact_paths.trace_path,
      stderr_path: execution.artifact_paths.stderr_path,
      trace_policy: execution.trace_policy,
      timeout_policy: execution.timeout_policy,
      bootstrap_path: execution.artifact_paths.bootstrap_path,
      output_last_message_path: path.join(
        execution.artifact_paths.run_dir,
        CODEX_LAST_MESSAGE_FILENAME,
      ),
      argv: [
        "codex",
        "-a",
        "never",
        "exec",
        "--json",
        "--output-last-message",
        path.join(execution.artifact_paths.run_dir, CODEX_LAST_MESSAGE_FILENAME),
        "-C",
        bundle.repository.git_root,
        "-s",
        sandbox,
        "-",
      ],
      env: {
        AGENTPLANE_RUNNER_ADAPTER: this.id,
        AGENTPLANE_RUNNER_MODE: execution.mode,
        AGENTPLANE_RUNNER_API_VERSION: bundle.runner_api_version,
        AGENTPLANE_RUNNER_TARGET: bundle.target.kind,
        AGENTPLANE_RUNNER_RESULT_PATH: execution.artifact_paths.result_path,
        ...recipeEnv,
      },
      dry_run: execution.mode === "dry_run",
    });
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
