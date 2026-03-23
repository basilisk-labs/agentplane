import { readFile } from "node:fs/promises";

import type { RunnerCustomConfig } from "@agentplaneorg/core";

import type { RunnerContextBundle, RunnerInvocation, RunnerResult } from "../types.js";
import {
  appendRunnerEvent,
  evolveRunnerRunState,
  readRunnerRunState,
  writeRunnerRunState,
} from "../artifacts.js";
import {
  runnerArtifactsFromPaths,
  runnerAdapterCancelledResult,
  runnerAdapterFailureResult,
  runnerAdapterSuccessResult,
  type RunnerAdapter,
} from "./shared.js";
import { exitCodeForSignal, runSupervisedProcess } from "../process-supervision.js";
import {
  InvalidRunnerResultManifestError,
  applyRunnerResultManifest,
  manifestFromRunnerResult,
  preserveInvalidRunnerResultManifest,
  readRunnerResultManifest,
  writeRunnerResultManifest,
} from "../result-manifest.js";

function summarizeOutput(text: string, limit = 4000): string | undefined {
  const normalized = text.replaceAll("\r\n", "\n").trim();
  if (!normalized) return undefined;
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, limit - 15)}\n...[truncated]`;
}

function byteLength(text: string | null | undefined): number {
  return Buffer.byteLength(text ?? "", "utf8");
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
}

export class CustomRunnerAdapter implements RunnerAdapter {
  readonly id = "custom" as const;

  constructor(private readonly config: RunnerCustomConfig | undefined) {}

  prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation> {
    assertCustomBundle(bundle);
    const command = normalizeCustomCommand(this.config?.command);
    if (command.length === 0) {
      throw new Error(
        "Custom runner adapter requires config.runner.custom.command to contain at least one argv element",
      );
    }
    const { execution } = bundle;
    return Promise.resolve({
      adapter_id: this.id,
      run_id: execution.run_id,
      run_dir: execution.artifact_paths.run_dir,
      bundle_path: execution.artifact_paths.bundle_path,
      state_path: execution.artifact_paths.state_path,
      events_path: execution.artifact_paths.events_path,
      result_path: execution.artifact_paths.result_path,
      bootstrap_path: execution.artifact_paths.bootstrap_path,
      output_last_message_path: null,
      argv: command,
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
      },
      dry_run: execution.mode === "dry_run",
    });
  }

  execute(invocation: RunnerInvocation): Promise<RunnerResult> {
    const started_at = new Date().toISOString();
    return (async () => {
      try {
        assertCustomInvocation(invocation);
        const bootstrapText = invocation.bootstrap_path
          ? await readFile(invocation.bootstrap_path, "utf8")
          : "";
        const processResult = await runSupervisedProcess({
          invocation,
          stdin_text: bootstrapText,
          start_message: "custom runner started",
        });
        const output_paths = [invocation.bundle_path, invocation.bootstrap_path].filter(
          (value): value is string => typeof value === "string" && value.trim().length > 0,
        );
        const success = processResult.exit_code === 0;
        const ended_at = processResult.ended_at;
        const resultMetrics = {
          duration_ms: durationMs(processResult.started_at, ended_at),
          stdout_bytes: byteLength(processResult.stdout),
          stderr_bytes: byteLength(processResult.stderr),
        };
        const baseResult = processResult.cancel_requested_at
          ? runnerAdapterCancelledResult({
              reason: processResult.cancel_signal
                ? `Custom runner cancelled via ${processResult.cancel_signal}.`
                : "Custom runner cancelled.",
              started_at: processResult.started_at,
              ended_at,
              exit_code:
                processResult.exit_code ?? exitCodeForSignal(processResult.exit_signal) ?? null,
              output_paths,
              metrics: resultMetrics,
            })
          : success
            ? runnerAdapterSuccessResult({
                started_at: processResult.started_at,
                ended_at,
                exit_code: processResult.exit_code ?? 0,
                stdout_summary:
                  summarizeOutput(processResult.stdout) ??
                  "Custom runner execution finished without output.",
                output_paths,
                metrics: resultMetrics,
              })
            : runnerAdapterFailureResult({
                err:
                  summarizeOutput(processResult.stderr) ??
                  summarizeOutput(processResult.stdout) ??
                  `Custom runner exited with code ${processResult.exit_code ?? "unknown"}`,
                started_at: processResult.started_at,
                ended_at,
                exit_code:
                  processResult.exit_code ?? exitCodeForSignal(processResult.exit_signal) ?? 1,
                output_paths,
                metrics: resultMetrics,
              });
        const manifest = await readRunnerResultManifest(invocation.result_path);
        const result = applyRunnerResultManifest({
          base: {
            ...baseResult,
            summary: baseResult.stdout_summary ?? baseResult.stderr_summary,
            artifacts: runnerArtifactsFromPaths(output_paths),
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
                command: invocation.argv[0] ?? null,
                started_at: processResult.started_at,
                heartbeat_at: processResult.heartbeat_at,
                exit_signal: processResult.exit_signal,
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
              force_killed: processResult.force_killed,
              exit_code: result.exit_code,
              output_paths,
              metrics: result.metrics,
            },
          },
        });
        return result;
      } catch (err) {
        const ended_at = new Date().toISOString();
        const invalidManifestPath =
          err instanceof InvalidRunnerResultManifestError
            ? await preserveInvalidRunnerResultManifest({
                result_path: invocation.result_path,
                error: err,
              })
            : null;
        const output_paths = [
          invocation.bundle_path,
          invocation.bootstrap_path,
          invalidManifestPath,
          invocation.result_path,
        ].filter((value): value is string => typeof value === "string" && value.trim().length > 0);
        const result = runnerAdapterFailureResult({
          err,
          started_at,
          ended_at,
          output_paths,
        });
        await writeRunnerResultManifest({
          result_path: invocation.result_path,
          manifest: manifestFromRunnerResult({
            ...result,
            summary: result.stderr_summary,
            artifacts: runnerArtifactsFromPaths(output_paths),
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
