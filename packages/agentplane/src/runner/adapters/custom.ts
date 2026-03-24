import { readFile } from "node:fs/promises";

import type { RunnerCustomConfig } from "@agentplaneorg/core";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import type {
  RunnerAdapterCapabilities,
  RunnerContextBundle,
  RunnerInvocation,
  RunnerResultArtifact,
  RunnerResult,
} from "../types.js";
import {
  appendRunnerEvent,
  evolveRunnerRunState,
  readRunnerRunState,
  writeRunnerRunState,
} from "../artifacts.js";
import {
  runnerArtifactsFromSpecs,
  runnerAdapterCancelledResult,
  runnerAdapterFailureResult,
  runnerAdapterSuccessResult,
  type RunnerAdapter,
} from "./shared.js";
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
import {
  assertRunnerManifestArtifactPolicy,
  readRecipeArtifactPrefixesFromRunnerEnv,
} from "../result-manifest-policy.js";
import { buildRecipeRunnerEnv, readRecipeRunProfile } from "./recipe-run-profile.js";

const CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES = ["workspace-write"];

function normalizeCustomEnforcement(config: RunnerCustomConfig | undefined): {
  mode: NonNullable<RunnerCustomConfig["enforcement"]>["mode"];
  platform: NonNullable<RunnerCustomConfig["enforcement"]>["platform"];
} {
  return {
    mode: config?.enforcement?.mode ?? "none",
    platform: config?.enforcement?.platform ?? "auto",
  };
}

function buildCustomCapabilities(
  config: RunnerCustomConfig | undefined,
): RunnerAdapterCapabilities {
  const enforcement = normalizeCustomEnforcement(config);
  const configuredModeNote =
    `Configured via runner.custom.enforcement.mode=${JSON.stringify(enforcement.mode)} ` +
    `(platform=${JSON.stringify(enforcement.platform)}).`;
  return {
    adapter_id: "custom",
    fields: {
      mode: {
        level: "advisory",
        channel: "env",
      },
      sandbox:
        enforcement.mode === "codex_sandbox_full_auto"
          ? {
              level: "wrapper",
              channel: "argv",
              supported_values: [...CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES],
              note:
                `${configuredModeNote} Custom runner sandbox is enforced through ` +
                "`codex sandbox <platform> --full-auto` and currently supports workspace-write only, " +
                "because the shared runner contract requires writable result and trace artifacts inside run_dir.",
            }
          : {
              level: "advisory",
              channel: "env",
              note:
                `${configuredModeNote} Custom runner receives sandbox intent through env only; ` +
                "the adapter does not enforce it.",
            },
      writes_artifacts_to: {
        level: "advisory",
        channel: "env",
        note: "Recipe artifact prefixes are exported through env and enforced post-run against external manifest artifacts and evidence paths.",
      },
      expected_exit_contract: {
        level: "advisory",
        channel: "env",
      },
    },
  };
}

function resolveCodexSandboxPlatform(
  value: NonNullable<RunnerCustomConfig["enforcement"]>["platform"],
): "macos" | "linux" | "windows" {
  const currentPlatform = (() => {
    switch (process.platform) {
      case "darwin": {
        return "macos";
      }
      case "linux": {
        return "linux";
      }
      case "win32": {
        return "windows";
      }
      default: {
        return null;
      }
    }
  })();
  if (!currentPlatform) {
    throw new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message: `Custom runner codex sandbox wrapper does not support current platform ${JSON.stringify(process.platform)}.`,
      context: {
        adapter_id: "custom",
        wrapper_mode: "codex_sandbox_full_auto",
        platform: process.platform,
        policy_field: "sandbox",
      },
    });
  }
  if (value && value !== "auto") {
    if (value !== currentPlatform) {
      throw new CliError({
        exitCode: exitCodeForError("E_RUNTIME"),
        code: "E_RUNTIME",
        message:
          `Custom runner codex sandbox wrapper is configured for ${JSON.stringify(value)} but current platform is ` +
          `${JSON.stringify(currentPlatform)}.`,
        context: {
          adapter_id: "custom",
          wrapper_mode: "codex_sandbox_full_auto",
          configured_platform: value,
          platform: currentPlatform,
          policy_field: "sandbox",
        },
      });
    }
    return value;
  }
  return currentPlatform;
}

function unsupportedCustomSandboxError(opts: {
  enforcementMode: string;
  requestedSandbox: string;
}): CliError {
  const baseContext = {
    adapter_id: "custom",
    wrapper_mode: opts.enforcementMode,
    policy_field: "sandbox",
    declared_value: opts.requestedSandbox,
    supported_values: CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES,
  } as const;
  if (opts.requestedSandbox === "read-only") {
    return new CliError({
      exitCode: exitCodeForError("E_RUNTIME"),
      code: "E_RUNTIME",
      message:
        `Custom runner wrapper mode ${JSON.stringify(opts.enforcementMode)} cannot support recipe sandbox ` +
        `${JSON.stringify(opts.requestedSandbox)} because the shared runner contract requires write access ` +
        "to result.json and trace artifacts inside run_dir, while the default codex sandbox blocks writes " +
        "to cwd and TMPDIR. Supported values: workspace-write.",
      context: baseContext,
    });
  }
  return new CliError({
    exitCode: exitCodeForError("E_RUNTIME"),
    code: "E_RUNTIME",
    message:
      `Custom runner wrapper mode ${JSON.stringify(opts.enforcementMode)} does not support recipe sandbox ` +
      `${JSON.stringify(opts.requestedSandbox)}; supported values: ${CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES.join(", ")}.`,
    context: baseContext,
  });
}

function buildCustomCommand(opts: {
  config: RunnerCustomConfig | undefined;
  bundle: RunnerContextBundle;
  command: string[];
}): string[] {
  const enforcement = normalizeCustomEnforcement(opts.config);
  if (enforcement.mode !== "codex_sandbox_full_auto") return opts.command;

  const runProfile = readRecipeRunProfile(opts.bundle.recipe);
  const requestedSandbox = typeof runProfile?.sandbox === "string" ? runProfile.sandbox.trim() : "";
  if (!requestedSandbox) return opts.command;
  if (!CUSTOM_SANDBOX_WRAPPER_SUPPORTED_VALUES.includes(requestedSandbox)) {
    throw unsupportedCustomSandboxError({
      enforcementMode: enforcement.mode,
      requestedSandbox,
    });
  }

  return [
    "codex",
    "sandbox",
    resolveCodexSandboxPlatform(enforcement.platform),
    "--full-auto",
    ...opts.command,
  ];
}

function durationMs(startedAt: string, endedAt: string): number | undefined {
  const started = Date.parse(startedAt);
  const ended = Date.parse(endedAt);
  if (Number.isNaN(started) || Number.isNaN(ended)) return undefined;
  return Math.max(0, ended - started);
}

function buildInvocationEventData(invocation: RunnerInvocation): Record<string, unknown> {
  return {
    executable: invocation.argv[0] ?? null,
    argv_count: invocation.argv.length,
    cwd: invocation.run_dir,
    env_keys: Object.keys(invocation.env).toSorted(),
    trace_policy: invocation.trace_policy,
    timeout_policy: invocation.timeout_policy,
    has_bootstrap_path:
      typeof invocation.bootstrap_path === "string" && invocation.bootstrap_path.trim().length > 0,
  };
}

function normalizeCustomCommand(value: RunnerCustomConfig["command"] | undefined): string[] {
  return Array.isArray(value)
    ? value.map((entry) => entry.trim()).filter((entry) => entry.length > 0)
    : [];
}

function assertCustomBundle(bundle: RunnerContextBundle): void {
  if (bundle.execution.adapter_id !== "custom") {
    throw new Error(
      `Custom adapter cannot prepare bundle for adapter_id=${JSON.stringify(bundle.execution.adapter_id)}`,
    );
  }
  if (!bundle.execution.artifact_paths.bundle_path.trim()) {
    throw new Error("Custom adapter requires a non-empty bundle path");
  }
  if (!bundle.execution.artifact_paths.run_dir.trim()) {
    throw new Error("Custom adapter requires a non-empty run dir");
  }
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
  return (
    runnerArtifactsFromSpecs([
      { path: opts.invocation.bundle_path, label: "bundle" },
      { path: opts.invocation.bootstrap_path, label: "bootstrap" },
      { path: opts.trace_artifact_path, label: "raw-trace" },
      { path: opts.trace_archive_path, label: "raw-trace-gzip" },
      { path: opts.stderr_artifact_path, label: "stderr-log" },
      { path: opts.stderr_archive_path, label: "stderr-log-gzip" },
      { path: opts.source_manifest_path, label: "source-result-manifest" },
      { path: opts.invalid_manifest_path, label: "invalid-result-manifest" },
      { path: opts.invocation.result_path, label: "result-manifest" },
    ]) ?? []
  );
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

function assertCustomInvocation(invocation: RunnerInvocation): void {
  if (invocation.adapter_id !== "custom") {
    throw new Error(
      `Custom adapter cannot execute invocation for adapter_id=${JSON.stringify(invocation.adapter_id)}`,
    );
  }
  if (!invocation.bundle_path.trim()) {
    throw new Error("Custom adapter invocation is missing bundle_path");
  }
  if (!invocation.run_dir.trim()) {
    throw new Error("Custom adapter invocation is missing run_dir");
  }
  if (!invocation.state_path.trim()) {
    throw new Error("Custom adapter invocation is missing state_path");
  }
  if (!invocation.events_path.trim()) {
    throw new Error("Custom adapter invocation is missing events_path");
  }
  if (!invocation.result_path.trim()) {
    throw new Error("Custom adapter invocation is missing result_path");
  }
  if (!invocation.trace_path.trim()) {
    throw new Error("Custom adapter invocation is missing trace_path");
  }
  if (!invocation.stderr_path.trim()) {
    throw new Error("Custom adapter invocation is missing stderr_path");
  }
}

export class CustomRunnerAdapter implements RunnerAdapter {
  readonly id = "custom" as const;

  constructor(private readonly config: RunnerCustomConfig | undefined) {}

  describeCapabilities(_bundle: RunnerContextBundle): RunnerAdapterCapabilities {
    return structuredClone(buildCustomCapabilities(this.config));
  }

  prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation> {
    assertCustomBundle(bundle);
    const command = normalizeCustomCommand(this.config?.command);
    if (command.length === 0) {
      throw new Error(
        "Custom runner adapter requires config.runner.custom.command to contain at least one argv element",
      );
    }
    const { execution } = bundle;
    const recipeEnv = buildRecipeRunnerEnv(bundle.recipe);
    const enforcement = normalizeCustomEnforcement(this.config);
    const preparedCommand = buildCustomCommand({
      config: this.config,
      bundle,
      command,
    });
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
      output_last_message_path: null,
      argv: preparedCommand,
      env: {
        ...this.config?.env,
        AGENTPLANE_RUNNER_ADAPTER: this.id,
        AGENTPLANE_RUNNER_MODE: execution.mode,
        AGENTPLANE_RUNNER_API_VERSION: bundle.runner_api_version,
        AGENTPLANE_RUNNER_TARGET: bundle.target.kind,
        AGENTPLANE_RUNNER_BUNDLE_PATH: execution.artifact_paths.bundle_path,
        AGENTPLANE_RUNNER_RUN_DIR: execution.artifact_paths.run_dir,
        AGENTPLANE_RUNNER_BOOTSTRAP_PATH: execution.artifact_paths.bootstrap_path,
        AGENTPLANE_RUNNER_STATE_PATH: execution.artifact_paths.state_path,
        AGENTPLANE_RUNNER_EVENTS_PATH: execution.artifact_paths.events_path,
        AGENTPLANE_RUNNER_RESULT_PATH: execution.artifact_paths.result_path,
        AGENTPLANE_RUNNER_ENFORCEMENT_MODE: enforcement.mode ?? "none",
        AGENTPLANE_RUNNER_ENFORCEMENT_PLATFORM: enforcement.platform ?? "auto",
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
        assertCustomInvocation(invocation);
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
        const stateAfter = await readRunnerRunState(invocation.state_path);
        if (stateAfter) {
          await writeRunnerRunState({
            state_path: invocation.state_path,
            state: evolveRunnerRunState({
              state: stateAfter,
              status: result.status,
              result,
              supervision: {
                ...stateAfter.supervision,
                pid: processResult.pid,
                command: invocation.argv.join(" "),
                started_at: processResult.started_at,
                heartbeat_at: processResult.heartbeat_at,
                exit_signal: processResult.exit_signal,
                timeout_reason: processResult.timeout_reason,
                timeout_requested_at: processResult.timeout_requested_at,
                terminate_sent_at: processResult.terminate_sent_at,
                kill_sent_at: processResult.kill_sent_at,
                force_killed: processResult.force_killed,
              },
            }),
          });
        }
        await appendRunnerEvent({
          events_path: invocation.events_path,
          event: {
            at: result.ended_at,
            type: "runner_execute_finish",
            message: `custom runner finished with status=${result.status}`,
            data: {
              ...buildInvocationEventData(invocation),
              pid: processResult.pid,
              exit_signal: processResult.exit_signal,
              cancel_requested_at: processResult.cancel_requested_at,
              cancel_signal: processResult.cancel_signal,
              timeout_reason: processResult.timeout_reason,
              timeout_requested_at: processResult.timeout_requested_at,
              terminate_sent_at: processResult.terminate_sent_at,
              kill_sent_at: processResult.kill_sent_at,
              force_killed: processResult.force_killed,
              exit_code: result.exit_code,
              output_paths,
              metrics: result.metrics,
            },
          },
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
        const stateAfter = await readRunnerRunState(invocation.state_path);
        if (stateAfter) {
          await writeRunnerRunState({
            state_path: invocation.state_path,
            state: evolveRunnerRunState({
              state: stateAfter,
              status: result.status,
              result,
            }),
          });
        }
        await appendRunnerEvent({
          events_path: invocation.events_path,
          event: {
            at: result.ended_at,
            type: "runner_execute_finish",
            message: `custom runner failed with status=${result.status}`,
            data: {
              ...buildInvocationEventData(invocation),
              exit_code: result.exit_code,
              output_paths,
              metrics: result.metrics,
            },
          },
        });
        return result;
      }
    })();
  }
}
