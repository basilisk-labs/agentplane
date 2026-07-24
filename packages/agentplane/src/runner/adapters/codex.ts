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
import type { SupervisedProcessResult } from "../process-supervision/run.js";
import { exitCodeForSignal } from "../process-supervision/signals.js";
import { applyRunnerResultManifest, type readRunnerResultManifest } from "../result-manifest.js";
import { assertAdapterBundle, assertAdapterInvocation } from "./base.js";
import {
  buildCodexInvocation,
  CODEX_RUN_PROFILE_CAPABILITIES,
  codexInvocationHasExactFilesystemEffectSandbox,
} from "./codex-preparation.js";
import {
  executeSupervisedRunnerAdapter,
  type SupervisedRunnerArtifactInput,
} from "./execute-supervised.js";
import {
  CODEX_RESULT_TRANSPORT,
  CODEX_RESULT_TRANSPORT_ENV,
  createCodexResultEventCollector,
  materializeCodexResultTransport,
  renderCodexResultOutputSchemaJson,
} from "./codex-result-transport.js";
import { readValidatedPreparedRunnerStdin } from "./prepared-input.js";

function byteLength(text: string | null | undefined): number {
  return Buffer.byteLength(text ?? "", "utf8");
}

function readOptionalCodexAgentMessage(
  collector: ReturnType<typeof createCodexResultEventCollector>,
): string | null {
  try {
    return collector.readLastAgentMessage();
  } catch {
    return null;
  }
}

function buildCodexArtifacts(
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

function usesSupervisorResultTransport(invocation: RunnerInvocation): boolean {
  return invocation.env[CODEX_RESULT_TRANSPORT_ENV] === CODEX_RESULT_TRANSPORT;
}

function assertSupervisorResultTransport(invocation: RunnerInvocation): void {
  if (!usesSupervisorResultTransport(invocation)) {
    throw new Error("Codex must use the supervisor JSONL semantic-result transport.");
  }
  if ("AGENTPLANE_RUNNER_RESULT_PATH" in invocation.env) {
    throw new Error("Codex must not receive the supervisor-owned canonical result path.");
  }
  const schemaFlagIndexes = invocation.argv.flatMap((arg, index) =>
    arg === "--output-schema" ? [index] : [],
  );
  if (
    !invocation.output_schema_path ||
    schemaFlagIndexes.length !== 1 ||
    invocation.argv[schemaFlagIndexes[0]! + 1] !== invocation.output_schema_path
  ) {
    throw new Error("Codex must receive exactly one supervised --output-schema argument.");
  }
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
  assertSupervisorResultTransport(invocation);
  if (
    invocation.filesystem_effect_containment &&
    !codexInvocationHasExactFilesystemEffectSandbox(invocation, "read-only")
  ) {
    throw new Error(
      "Codex filesystem-effect containment attestation does not match the executable argv.",
    );
  }
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
      `Codex exited successfully but the supervisor did not materialize a valid ` +
      `AgentSemanticResult v2 at ` +
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
    const executionInvocation = structuredClone(invocation);
    const resultEventCollector = createCodexResultEventCollector();
    return executeSupervisedRunnerAdapter({
      invocation: executionInvocation,
      assertInvocation: assertCodexInvocation,
      observeStdoutLine: (rawLine) => resultEventCollector.observeStdoutLine(rawLine),
      readStdinText: async (input) =>
        await readValidatedPreparedRunnerStdin({
          invocation: input,
          require_bootstrap: true,
          optional_inputs: input.output_schema_path
            ? [
                {
                  path: input.output_schema_path,
                  label: "runner prepared Codex output schema",
                  expected_text: renderCodexResultOutputSchemaJson(),
                },
              ]
            : [],
        }),
      materializeResult: async ({ invocation: input, processResult }) => {
        if (
          processResult.exit_code !== 0 ||
          processResult.timeout_reason !== null ||
          processResult.cancel_requested_at
        ) {
          return;
        }
        await materializeCodexResultTransport({
          raw_text: resultEventCollector.readLastAgentMessage(),
          result_path: input.result_path,
          work_order_id: input.work_order_id,
        });
      },
      startMessage: "codex exec started",
      buildArtifacts: buildCodexArtifacts,
      capabilitiesUsed: () => ["codex.exec"],
      assertManifest: assertExecuteModeManifest,
      applyManifest: ({ base, manifest }) => applyRunnerResultManifest({ base, manifest }),
      successEventMessage: (result) => `codex exec finished with status=${result.status}`,
      failureSummary: "Codex execution failed before producing a valid supervised semantic result.",
      failureEventType: "runner_execute_error",
      failureEventMessage: (result) => result.stderr_summary ?? "codex exec failed",
      buildBaseResult: ({ processResult, artifacts, output_paths }) => {
        const lastMessage = readOptionalCodexAgentMessage(resultEventCollector);
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
                    ? "Structured assistant output was extracted from supervised JSONL and normalized into result.json."
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
        return {
          ...baseResult,
          artifacts,
          capabilities_used: ["codex.exec"],
        };
      },
    });
  }
}
