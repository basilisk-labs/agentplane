import { readFile } from "node:fs/promises";
import path from "node:path";

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

const CODEX_LAST_MESSAGE_FILENAME = "codex-last-message.md";
const CODEX_SANDBOX_VALUES = new Set(["read-only", "workspace-write", "danger-full-access"]);

type RecipeRunProfileMetadata = {
  mode?: string;
  sandbox?: string;
  network?: boolean;
  requires_human_approval?: boolean;
  writes_artifacts_to?: string[];
  expected_exit_contract?: string;
};

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
    has_output_last_message_path:
      typeof invocation.output_last_message_path === "string" &&
      invocation.output_last_message_path.trim().length > 0,
  };
}

async function readOptionalText(filePath?: string | null): Promise<string | null> {
  if (!filePath?.trim()) return null;
  try {
    return await readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

function assertCodexBundle(bundle: RunnerContextBundle): void {
  if (bundle.execution.adapter_id !== "codex") {
    throw new Error(
      `Codex adapter cannot prepare bundle for adapter_id=${JSON.stringify(bundle.execution.adapter_id)}`,
    );
  }
  if (!bundle.execution.artifact_paths.bundle_path.trim()) {
    throw new Error("Codex adapter requires a non-empty bundle path");
  }
  if (!bundle.execution.artifact_paths.run_dir.trim()) {
    throw new Error("Codex adapter requires a non-empty run dir");
  }
}

function assertCodexInvocation(invocation: RunnerInvocation): void {
  if (invocation.adapter_id !== "codex") {
    throw new Error(
      `Codex adapter cannot execute invocation for adapter_id=${JSON.stringify(invocation.adapter_id)}`,
    );
  }
  if (!invocation.bundle_path.trim()) {
    throw new Error("Codex adapter invocation is missing bundle_path");
  }
  if (!invocation.run_dir.trim()) {
    throw new Error("Codex adapter invocation is missing run_dir");
  }
  if (!invocation.state_path.trim()) {
    throw new Error("Codex adapter invocation is missing state_path");
  }
  if (!invocation.events_path.trim()) {
    throw new Error("Codex adapter invocation is missing events_path");
  }
  if (!invocation.result_path.trim()) {
    throw new Error("Codex adapter invocation is missing result_path");
  }
  if (!invocation.bootstrap_path?.trim()) {
    throw new Error("Codex adapter invocation is missing bootstrap_path");
  }
  if (invocation.argv.length < 5) {
    throw new Error("Codex adapter invocation is missing normalized argv metadata");
  }
}

function normalizeCodexSandbox(value: unknown): string | null {
  const normalized = typeof value === "string" ? value.trim() : "";
  if (!normalized) return null;
  return CODEX_SANDBOX_VALUES.has(normalized) ? normalized : null;
}

function readRecipeRunProfile(bundle: RunnerContextBundle): RecipeRunProfileMetadata | null {
  const profile = bundle.recipe?.run_profile;
  if (!profile || typeof profile !== "object") return null;
  const candidate = profile;
  return {
    mode: typeof candidate.mode === "string" ? candidate.mode.trim() : undefined,
    sandbox: typeof candidate.sandbox === "string" ? candidate.sandbox.trim() : undefined,
    network: typeof candidate.network === "boolean" ? candidate.network : undefined,
    requires_human_approval:
      typeof candidate.requires_human_approval === "boolean"
        ? candidate.requires_human_approval
        : undefined,
    writes_artifacts_to: Array.isArray(candidate.writes_artifacts_to)
      ? candidate.writes_artifacts_to
          .filter((entry): entry is string => typeof entry === "string")
          .map((entry) => entry.trim())
          .filter((entry) => entry.length > 0)
      : undefined,
    expected_exit_contract:
      typeof candidate.expected_exit_contract === "string"
        ? candidate.expected_exit_contract.trim()
        : undefined,
  };
}

export class CodexRunnerAdapter implements RunnerAdapter {
  readonly id = "codex" as const;

  prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation> {
    assertCodexBundle(bundle);
    const { execution } = bundle;
    const runProfile = readRecipeRunProfile(bundle);
    const sandbox = normalizeCodexSandbox(runProfile?.sandbox) ?? "danger-full-access";
    const recipeEnv: Record<string, string> = {};
    if (runProfile?.mode) recipeEnv.AGENTPLANE_RECIPE_MODE = runProfile.mode;
    if (runProfile?.sandbox) recipeEnv.AGENTPLANE_RECIPE_SANDBOX = runProfile.sandbox;
    if (typeof runProfile?.network === "boolean") {
      recipeEnv.AGENTPLANE_RECIPE_NETWORK = String(runProfile.network);
    }
    if (typeof runProfile?.requires_human_approval === "boolean") {
      recipeEnv.AGENTPLANE_RECIPE_REQUIRES_HUMAN_APPROVAL = String(
        runProfile.requires_human_approval,
      );
    }
    if (runProfile?.expected_exit_contract) {
      recipeEnv.AGENTPLANE_RECIPE_EXPECTED_EXIT_CONTRACT = runProfile.expected_exit_contract;
    }
    if (runProfile?.writes_artifacts_to && runProfile.writes_artifacts_to.length > 0) {
      recipeEnv.AGENTPLANE_RECIPE_WRITES_ARTIFACTS_TO = JSON.stringify(
        runProfile.writes_artifacts_to,
      );
    }
    return Promise.resolve({
      adapter_id: this.id,
      run_id: execution.run_id,
      run_dir: execution.artifact_paths.run_dir,
      bundle_path: execution.artifact_paths.bundle_path,
      state_path: execution.artifact_paths.state_path,
      events_path: execution.artifact_paths.events_path,
      result_path: execution.artifact_paths.result_path,
      bootstrap_path: execution.artifact_paths.bootstrap_path,
      output_last_message_path: path.join(
        execution.artifact_paths.run_dir,
        CODEX_LAST_MESSAGE_FILENAME,
      ),
      argv: [
        "codex",
        "exec",
        "--json",
        "--output-last-message",
        path.join(execution.artifact_paths.run_dir, CODEX_LAST_MESSAGE_FILENAME),
        "-C",
        bundle.repository.git_root,
        "-s",
        sandbox,
        "-a",
        "never",
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
    return (async () => {
      try {
        assertCodexInvocation(invocation);
        const bootstrapText = await readFile(invocation.bootstrap_path!, "utf8");
        const processResult = await runSupervisedProcess({
          invocation,
          stdin_text: bootstrapText,
          start_message: "codex exec started",
        });
        const lastMessage = await readOptionalText(invocation.output_last_message_path);
        const output_paths = [
          invocation.bundle_path,
          invocation.bootstrap_path,
          invocation.output_last_message_path,
        ].filter((value): value is string => typeof value === "string" && value.trim().length > 0);
        const success = processResult.exit_code === 0;
        const ended_at = processResult.ended_at;
        const metrics = {
          duration_ms: durationMs(processResult.started_at, ended_at),
          stdout_bytes: byteLength(processResult.stdout),
          stderr_bytes: byteLength(processResult.stderr),
          output_last_message_bytes: lastMessage === null ? null : byteLength(lastMessage),
        };
        const baseResult = processResult.cancel_requested_at
          ? runnerAdapterCancelledResult({
              reason: processResult.cancel_signal
                ? `Codex runner cancelled via ${processResult.cancel_signal}.`
                : "Codex runner cancelled.",
              started_at: processResult.started_at,
              ended_at,
              exit_code:
                processResult.exit_code ?? exitCodeForSignal(processResult.exit_signal) ?? null,
              output_paths,
              metrics,
            })
          : success
            ? runnerAdapterSuccessResult({
                started_at: processResult.started_at,
                ended_at,
                exit_code: processResult.exit_code ?? 0,
                stdout_summary:
                  summarizeOutput(lastMessage ?? processResult.stdout) ??
                  "Codex execution finished without output.",
                output_paths,
                metrics,
              })
            : runnerAdapterFailureResult({
                err:
                  summarizeOutput(processResult.stderr) ??
                  summarizeOutput(processResult.stdout) ??
                  `Codex exited with code ${processResult.exit_code ?? "unknown"}`,
                started_at: processResult.started_at,
                ended_at,
                exit_code:
                  processResult.exit_code ?? exitCodeForSignal(processResult.exit_signal) ?? 1,
                output_paths,
                metrics,
              });
        const manifest = await readRunnerResultManifest(invocation.result_path);
        const result = applyRunnerResultManifest({
          base: {
            ...baseResult,
            summary: baseResult.stdout_summary ?? baseResult.stderr_summary,
            artifacts: runnerArtifactsFromPaths(output_paths),
            capabilities_used: ["codex.exec"],
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
            message: `codex exec finished with status=${result.status}`,
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
          invocation.output_last_message_path,
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
            capabilities_used: ["codex.exec"],
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
            type: "runner_execute_error",
            message: result.stderr_summary ?? "codex exec failed",
            data: {
              ...buildInvocationEventData(invocation),
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
