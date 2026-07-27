import { isDeepStrictEqual } from "node:util";

import {
  type StateFingerprint,
  validateStateFingerprint,
  validateStateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../shared/errors.js";

import type { RunnerRecordProfile } from "./run-record-profile.js";
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

type RunnerRecordContract = {
  profile?: RunnerRecordProfile;
};

const LEGACY_OPTIONAL_BUNDLE_PATHS = new Set<(typeof RUNNER_ARTIFACT_PATH_KEYS)[number]>([
  "blueprint_plan_path",
  "blueprint_execution_plan_path",
  "blueprint_execution_state_path",
  "context_manifest_path",
  "receipt_path",
  "trace_path",
  "stderr_path",
]);

const LEGACY_OPTIONAL_STATE_FIELDS = new Set([
  "receipt_path",
  "trace_path",
  "stderr_path",
  "trace_policy",
  "timeout_policy",
]);

function matchesPreparedOrReplayAdvance(
  prepared: StateFingerprint,
  effective: StateFingerprint,
): boolean {
  if (isDeepStrictEqual(prepared, effective)) return true;
  if (
    typeof prepared.task_revision !== "number" ||
    effective.task_revision !== prepared.task_revision + 1 ||
    effective.task_id !== prepared.task_id ||
    effective.worktree !== prepared.worktree ||
    effective.git_head !== prepared.git_head ||
    isDeepStrictEqual(effective.components.task, prepared.components.task)
  ) {
    return false;
  }
  return (
    isDeepStrictEqual(effective.components.git, prepared.components.git) &&
    isDeepStrictEqual(effective.components.policy, prepared.components.policy) &&
    isDeepStrictEqual(effective.components.blueprint, prepared.components.blueprint) &&
    isDeepStrictEqual(effective.components.knowledge, prepared.components.knowledge) &&
    isDeepStrictEqual(effective.components.provider, prepared.components.provider) &&
    isDeepStrictEqual(effective.components.authority, prepared.components.authority)
  );
}

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
    bundle.task?.metadata.task_id,
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
  contract: RunnerRecordContract = {},
): void {
  const legacyActive =
    contract.profile === "legacy_task_pre_trace" &&
    bundle.state_fingerprint === undefined &&
    bundle.state_fingerprint_policy === undefined;
  for (const key of RUNNER_ARTIFACT_PATH_KEYS) {
    const declaredPath = bundle.execution.artifact_paths[key];
    const expectedPath = expectedPaths[key];
    if (legacyActive && LEGACY_OPTIONAL_BUNDLE_PATHS.has(key) && declaredPath === undefined) {
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
  contract: RunnerRecordContract = {},
): void {
  const legacyActive =
    contract.profile === "legacy_task_pre_trace" &&
    state.state_fingerprint === undefined &&
    bundle.state_fingerprint === undefined &&
    bundle.state_fingerprint_policy === undefined;
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
    trace_policy: bundle.execution.trace_policy,
    timeout_policy: bundle.execution.timeout_policy,
  };
  for (const [field, expectedValue] of Object.entries(expected)) {
    const observedValue = state[field as keyof typeof expected];
    const correspondingBundleValue =
      field === "trace_policy" || field === "timeout_policy"
        ? bundle.execution[field]
        : field === "receipt_path" || field === "trace_path" || field === "stderr_path"
          ? bundle.execution.artifact_paths[field]
          : undefined;
    if (
      legacyActive &&
      LEGACY_OPTIONAL_STATE_FIELDS.has(field) &&
      observedValue === undefined &&
      correspondingBundleValue === undefined
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

  const stateFingerprint = state.state_fingerprint;
  const bundleFingerprint = bundle.state_fingerprint;
  const bundleFingerprintPolicy = bundle.state_fingerprint_policy;
  let validatedBundleFingerprint = bundleFingerprint;
  let validatedBundleFingerprintPolicy = bundleFingerprintPolicy;
  try {
    if (bundleFingerprint !== undefined) {
      validatedBundleFingerprint = validateStateFingerprint(bundleFingerprint);
    }
    if (bundleFingerprintPolicy !== undefined) {
      validatedBundleFingerprintPolicy = validateStateFingerprintPolicy(bundleFingerprintPolicy);
    }
  } catch {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner bundle/fingerprint authority is invalid for ${taskId}:${runId}`,
      context: {
        task_id: taskId,
        run_id: runId,
        reason: "runner_bundle_fingerprint_invalid",
      },
    });
  }
  if (
    contract.profile === "strict_modern_fingerprinted" &&
    (stateFingerprint === undefined ||
      validatedBundleFingerprint === undefined ||
      validatedBundleFingerprintPolicy === undefined)
  ) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner modern fingerprint authority is missing for ${taskId}:${runId}`,
      context: {
        task_id: taskId,
        run_id: runId,
        reason: "runner_modern_fingerprint_authority_missing",
      },
    });
  }
  if (
    contract.profile === "legacy_task_pre_trace" &&
    (stateFingerprint !== undefined ||
      validatedBundleFingerprint !== undefined ||
      validatedBundleFingerprintPolicy !== undefined)
  ) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner legacy record contains modern fingerprint authority for ${taskId}:${runId}`,
      context: {
        task_id: taskId,
        run_id: runId,
        reason: "runner_legacy_fingerprint_authority_conflict",
      },
    });
  }
  const fingerprintAuthorityMatches =
    stateFingerprint === undefined
      ? validatedBundleFingerprint === undefined && validatedBundleFingerprintPolicy === undefined
      : validatedBundleFingerprint !== undefined &&
        validatedBundleFingerprintPolicy !== undefined &&
        validatedBundleFingerprint.task_id === taskId &&
        validatedBundleFingerprint.worktree === bundle.repository.git_root &&
        stateFingerprint.precondition_fingerprint.task_id === validatedBundleFingerprint.task_id &&
        stateFingerprint.precondition_fingerprint.worktree ===
          validatedBundleFingerprint.worktree &&
        isDeepStrictEqual(stateFingerprint.precondition_policy, validatedBundleFingerprintPolicy) &&
        matchesPreparedOrReplayAdvance(
          validatedBundleFingerprint,
          stateFingerprint.precondition_fingerprint,
        ) &&
        (stateFingerprint.outcome !== "prepared" ||
          isDeepStrictEqual(stateFingerprint.precondition_fingerprint, validatedBundleFingerprint));
  if (!fingerprintAuthorityMatches) {
    throw new CliError({
      exitCode: 4,
      code: "E_IO",
      message: `Runner state/fingerprint authority mismatch for ${taskId}:${runId}`,
      context: {
        task_id: taskId,
        run_id: runId,
        state_has_fingerprint: stateFingerprint !== undefined,
        bundle_has_fingerprint: bundleFingerprint !== undefined,
        bundle_has_fingerprint_policy: bundleFingerprintPolicy !== undefined,
      },
    });
  }
}
