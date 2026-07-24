import { isDeepStrictEqual } from "node:util";

import { CliError } from "../shared/errors.js";

import type {
  RunnerArtifactPaths,
  RunnerContextBundle,
  RunnerEvent,
  RunnerRunState,
} from "./types.js";

export const RUNNER_ARTIFACT_PATH_KEYS = [
  "run_dir",
  "bundle_path",
  "blueprint_plan_path",
  "blueprint_execution_plan_path",
  "blueprint_execution_state_path",
  "context_manifest_path",
  "bootstrap_path",
  "state_path",
  "events_path",
  "result_path",
  "receipt_path",
  "trace_path",
  "stderr_path",
] as const satisfies readonly (keyof RunnerArtifactPaths)[];

type RunnerRecordCompatibility = {
  allow_legacy_missing_receipt_path?: boolean;
};

export function parseRunnerEventsText(text: string): RunnerEvent[] {
  return text
    .split(/\r?\n/u)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as RunnerEvent];
      } catch {
        return [];
      }
    });
}

export function assertRunnerBundleMatchesTask(
  bundle: RunnerContextBundle,
  taskId: string,
  runId: string,
): void {
  const bundleTaskIds = [
    bundle.task?.task_id,
    bundle.task?.data.id,
    bundle.target.kind === "task" ? bundle.target.task_id : bundle.target.task_id,
  ].filter((value): value is string => typeof value === "string" && value.length > 0);
  if (bundle.execution.run_id !== runId) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner bundle/run mismatch for ${taskId}:${runId} (bundle.run_id=${bundle.execution.run_id})`,
    });
  }
  if (bundleTaskIds.length === 0 || bundleTaskIds.some((bundleTaskId) => bundleTaskId !== taskId)) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message:
        `Runner bundle/task mismatch for ${taskId}:${runId} ` +
        `(declared_task_ids=${JSON.stringify(bundleTaskIds)})`,
    });
  }
}

export function assertRunnerBundleArtifactPaths(
  bundle: RunnerContextBundle,
  expectedPaths: RunnerArtifactPaths,
  taskId: string,
  runId: string,
  compatibility: RunnerRecordCompatibility = {},
): void {
  for (const key of RUNNER_ARTIFACT_PATH_KEYS) {
    const declaredPath = bundle.execution.artifact_paths[key];
    const expectedPath = expectedPaths[key];
    if (
      compatibility.allow_legacy_missing_receipt_path === true &&
      key === "receipt_path" &&
      declaredPath === undefined
    ) {
      continue;
    }
    if (declaredPath !== expectedPath) {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message:
          `Runner bundle artifact path mismatch for ${taskId}:${runId} ` +
          `(${key}=${JSON.stringify(declaredPath)}; expected=${JSON.stringify(expectedPath)})`,
        context: {
          task_id: taskId,
          run_id: runId,
          artifact_path_key: key,
          declared_path: declaredPath,
          expected_path: expectedPath,
        },
      });
    }
  }
}

export function assertRunnerStateMatchesBundle(
  state: RunnerRunState,
  bundle: RunnerContextBundle,
  expectedPaths: RunnerArtifactPaths,
  taskId: string,
  runId: string,
  compatibility: RunnerRecordCompatibility = {},
): void {
  const expected = {
    schema_version: bundle.schema_version,
    runner_api_version: bundle.runner_api_version,
    run_id: runId,
    adapter_id: bundle.execution.adapter_id,
    target: bundle.target,
    mode: bundle.execution.mode,
    bundle_path: expectedPaths.bundle_path,
    result_path: expectedPaths.result_path,
    receipt_path: expectedPaths.receipt_path,
    bootstrap_path: expectedPaths.bootstrap_path,
    events_path: expectedPaths.events_path,
    trace_path: expectedPaths.trace_path,
    stderr_path: expectedPaths.stderr_path,
  };
  for (const [field, expectedValue] of Object.entries(expected)) {
    const observedValue = state[field as keyof typeof expected];
    if (
      compatibility.allow_legacy_missing_receipt_path === true &&
      field === "receipt_path" &&
      observedValue === undefined
    ) {
      continue;
    }
    if (!isDeepStrictEqual(observedValue, expectedValue)) {
      throw new CliError({
        exitCode: 4,
        code: "E_IO",
        message:
          `Runner state/bundle mismatch for ${taskId}:${runId} ` +
          `(${field}=${JSON.stringify(observedValue)}; expected=${JSON.stringify(expectedValue)})`,
        context: {
          task_id: taskId,
          run_id: runId,
          state_field: field,
          declared_value: observedValue,
          expected_value: expectedValue,
        },
      });
    }
  }
}
