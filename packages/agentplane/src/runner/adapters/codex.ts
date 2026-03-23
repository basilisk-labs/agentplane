import type { RunnerContextBundle, RunnerInvocation, RunnerResult } from "../types.js";
import {
  runnerAdapterFailureResult,
  runnerAdapterSuccessResult,
  type RunnerAdapter,
} from "./shared.js";

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
  if (invocation.argv.length < 3) {
    throw new Error("Codex adapter invocation is missing normalized argv metadata");
  }
}

export class CodexRunnerAdapter implements RunnerAdapter {
  readonly id = "codex" as const;

  prepare(bundle: RunnerContextBundle): Promise<RunnerInvocation> {
    assertCodexBundle(bundle);
    const { execution } = bundle;
    return Promise.resolve({
      adapter_id: this.id,
      run_id: execution.run_id,
      run_dir: execution.artifact_paths.run_dir,
      bundle_path: execution.artifact_paths.bundle_path,
      bootstrap_path: execution.artifact_paths.bootstrap_path,
      argv: [
        "codex",
        "runner",
        "--bundle",
        execution.artifact_paths.bundle_path,
        "--run-dir",
        execution.artifact_paths.run_dir,
      ],
      env: {
        AGENTPLANE_RUNNER_ADAPTER: this.id,
        AGENTPLANE_RUNNER_MODE: execution.mode,
        AGENTPLANE_RUNNER_API_VERSION: bundle.runner_api_version,
        AGENTPLANE_RUNNER_TARGET: bundle.target.kind,
      },
      dry_run: execution.mode === "dry_run",
    });
  }

  execute(invocation: RunnerInvocation): Promise<RunnerResult> {
    const started_at = new Date().toISOString();
    try {
      assertCodexInvocation(invocation);
      const output_paths = [invocation.bundle_path, invocation.bootstrap_path].filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0,
      );
      return Promise.resolve(
        runnerAdapterSuccessResult({
          started_at,
          stdout_summary:
            "Codex adapter stub prepared normalized invocation metadata; real execution is deferred.",
          output_paths,
        }),
      );
    } catch (err) {
      return Promise.resolve(
        runnerAdapterFailureResult({
          err,
          started_at,
          output_paths: [invocation.bundle_path].filter(Boolean),
        }),
      );
    }
  }
}
