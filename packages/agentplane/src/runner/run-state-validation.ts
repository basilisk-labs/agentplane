import { isDeepStrictEqual } from "node:util";

import {
  evaluateStateFingerprintPrecondition,
  validateStateFingerprint,
  validateStateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";

import { isRecord } from "../shared/guards.js";

import type { RunnerRecordProfile } from "./run-record-profile.js";
import { isRunnerResult } from "./runner-result-validation.js";
import {
  RUNNER_API_VERSION,
  RUNNER_BUNDLE_SCHEMA_VERSION,
  type RunnerLifecycleStatus,
  type RunnerRunState,
  type RunnerTarget,
} from "./types.js";

const RUNNER_STATUSES = new Set<RunnerLifecycleStatus>([
  "prepared",
  "running",
  "success",
  "failed",
  "blocked",
  "cancelled",
]);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isNullableObject(value: unknown): boolean {
  return value === null || isRecord(value);
}

function isTimestamp(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function isNullableTimestamp(value: unknown): value is string | null {
  return value === null || isTimestamp(value);
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((entry) => typeof entry === "string" && entry.length > 0)
  );
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: ReadonlySet<string>): boolean {
  return Object.keys(value).every((key) => allowed.has(key));
}

const RUNNER_TRACE_POLICY_KEYS = new Set([
  "mode",
  "max_tail_bytes",
  "capture_stderr",
  "retention",
  "compression",
  "redact_patterns",
]);

function isRunnerTracePolicy(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    hasOnlyKeys(value, RUNNER_TRACE_POLICY_KEYS) &&
    (value.mode === "raw" || value.mode === "off") &&
    isNonNegativeInteger(value.max_tail_bytes) &&
    typeof value.capture_stderr === "boolean" &&
    (value.retention === undefined ||
      value.retention === "keep" ||
      value.retention === "remove_on_success" ||
      value.retention === "remove_always") &&
    (value.compression === undefined ||
      value.compression === "none" ||
      value.compression === "gzip") &&
    (value.redact_patterns === undefined || isStringArray(value.redact_patterns))
  );
}

const RUNNER_TIMEOUT_POLICY_KEYS = new Set(["wall_clock_ms", "idle_ms", "terminate_grace_ms"]);

function isRunnerTimeoutPolicy(value: unknown): boolean {
  if (!isRecord(value)) return false;
  return (
    hasOnlyKeys(value, RUNNER_TIMEOUT_POLICY_KEYS) &&
    isNonNegativeInteger(value.wall_clock_ms) &&
    isNonNegativeInteger(value.idle_ms) &&
    isNonNegativeInteger(value.terminate_grace_ms)
  );
}

function isRunnerTarget(value: unknown): value is RunnerTarget {
  if (!isRecord(value)) return false;
  if (value.kind === "task") return isNonEmptyString(value.task_id);
  return (
    value.kind === "recipe_scenario" &&
    isNonEmptyString(value.recipe_id) &&
    isNonEmptyString(value.scenario_id) &&
    (value.task_id === undefined || isNonEmptyString(value.task_id))
  );
}

function isRunnerProcessTree(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const scopeIdentityValid =
    value.scope === "posix_process_group"
      ? value.cleanup_state === "failed"
        ? value.group_id === null ||
          (typeof value.group_id === "number" &&
            Number.isSafeInteger(value.group_id) &&
            value.group_id > 0)
        : typeof value.group_id === "number" &&
          Number.isSafeInteger(value.group_id) &&
          value.group_id > 0
      : value.scope === "direct_child_only" && value.group_id === null;
  const successfulCleanupEvidenceValid =
    value.cleanup_state === "not_needed"
      ? value.terminate_sent_at === null && value.kill_sent_at === null
      : value.cleanup_state === "terminated"
        ? isTimestamp(value.terminate_sent_at) &&
          value.kill_sent_at === null &&
          isTimestamp(value.completed_at) &&
          Date.parse(value.terminate_sent_at) <= Date.parse(value.completed_at)
        : value.cleanup_state === "force_killed"
          ? isTimestamp(value.terminate_sent_at) &&
            isTimestamp(value.kill_sent_at) &&
            isTimestamp(value.completed_at) &&
            Date.parse(value.terminate_sent_at) <= Date.parse(value.kill_sent_at) &&
            Date.parse(value.kill_sent_at) <= Date.parse(value.completed_at)
          : false;
  const cleanupEvidenceValid =
    value.cleanup_state === "failed"
      ? isNonEmptyString(value.error)
      : value.scope === "direct_child_only" && value.cleanup_state === "unsupported"
        ? value.terminate_sent_at === null &&
          value.kill_sent_at === null &&
          value.residual_alive === null &&
          isNonEmptyString(value.error)
        : value.scope === "posix_process_group" && value.cleanup_state === "unsupported"
          ? false
          : successfulCleanupEvidenceValid &&
            value.residual_alive === false &&
            value.error === null;
  const containmentValid =
    value.scope === "direct_child_only"
      ? value.containment_state === "limited" && isNonEmptyString(value.containment_limitation)
      : (value.containment_state === "bounded" && value.containment_limitation === null) ||
        (value.containment_state === "limited" && isNonEmptyString(value.containment_limitation));
  return (
    scopeIdentityValid &&
    cleanupEvidenceValid &&
    isNullableTimestamp(value.terminate_sent_at) &&
    isNullableTimestamp(value.kill_sent_at) &&
    isTimestamp(value.completed_at) &&
    (value.residual_alive === null || typeof value.residual_alive === "boolean") &&
    (value.error === null || typeof value.error === "string") &&
    containmentValid
  );
}

function hasValidRunnerResultContract(
  state: Record<string, unknown>,
  stateFingerprint: unknown,
): boolean {
  if (!RUNNER_STATUSES.has(state.status as RunnerLifecycleStatus)) {
    return false;
  }
  const result = state.result;
  if (result !== undefined && !isRunnerResult(result)) return false;

  const terminal = state.status !== "prepared" && state.status !== "running";
  const terminalResultMatches = terminal && result !== undefined && result.status === state.status;
  if (stateFingerprint === undefined) {
    return terminal ? result === undefined || terminalResultMatches : result === undefined;
  }
  if (!isRecord(stateFingerprint)) return false;

  switch (stateFingerprint.outcome) {
    case "accepted": {
      return terminalResultMatches;
    }
    case "refused": {
      return state.status === "failed" && terminalResultMatches;
    }
    case "prepared": {
      return terminal
        ? (state.status === "failed" || state.status === "cancelled") && terminalResultMatches
        : result === undefined;
    }
    case "effect_started": {
      return terminal ? terminalResultMatches : result === undefined;
    }
    case "effect_unknown": {
      return terminalResultMatches;
    }
    case "post_state_unknown": {
      return result !== undefined && (!terminal || terminalResultMatches);
    }
    default: {
      return false;
    }
  }
}

function fingerprintMatchesAuthority(
  fingerprint: ReturnType<typeof validateStateFingerprint>,
  opts: {
    task_id: string;
    worktree: string;
  },
): boolean {
  return fingerprint.task_id === opts.task_id && fingerprint.worktree === opts.worktree;
}

function isRunnerStateFingerprintRecord(value: unknown, target: RunnerTarget): boolean {
  if (!isRecord(value)) return false;
  if (
    value.schema_version !== 1 ||
    value.kind !== "runner_state_fingerprint_record" ||
    !(
      value.outcome === "prepared" ||
      value.outcome === "effect_started" ||
      value.outcome === "accepted" ||
      value.outcome === "refused" ||
      value.outcome === "effect_unknown" ||
      value.outcome === "post_state_unknown"
    ) ||
    !isNullableObject(value.state_before) ||
    !isNullableObject(value.state_after) ||
    !isNullableObject(value.precondition)
  ) {
    return false;
  }

  try {
    const expected = validateStateFingerprint(value.precondition_fingerprint);
    const policy = validateStateFingerprintPolicy(value.precondition_policy);
    const targetTaskId = target.task_id;
    if (
      !targetTaskId ||
      !fingerprintMatchesAuthority(expected, {
        task_id: targetTaskId,
        worktree: expected.worktree,
      })
    ) {
      return false;
    }
    const authority = {
      task_id: expected.task_id,
      worktree: expected.worktree,
    };
    if (value.outcome === "prepared") {
      return (
        value.state_before === null &&
        value.state_after === null &&
        value.precondition === null &&
        value.effect_applied === null &&
        value.post_state_reason_code === null
      );
    }

    if (value.state_before === null || value.precondition === null) return false;
    const stateBefore = validateStateFingerprint(value.state_before);
    if (!fingerprintMatchesAuthority(stateBefore, authority)) return false;
    const diagnostic = evaluateStateFingerprintPrecondition({
      expected,
      current: stateBefore,
      policy,
    });
    if (!isDeepStrictEqual(value.precondition, diagnostic)) return false;

    if (value.outcome === "effect_started" || value.outcome === "effect_unknown") {
      return (
        diagnostic.status !== "stale" &&
        diagnostic.status !== "blocked" &&
        value.state_after === null &&
        value.effect_applied === null &&
        value.post_state_reason_code === null
      );
    }
    if (value.outcome === "refused") {
      if (value.state_after === null) return false;
      const stateAfter = validateStateFingerprint(value.state_after);
      if (!fingerprintMatchesAuthority(stateAfter, authority)) return false;
      return (
        (diagnostic.status === "stale" || diagnostic.status === "blocked") &&
        isDeepStrictEqual(stateBefore, stateAfter) &&
        value.effect_applied === false &&
        value.post_state_reason_code === null
      );
    }
    if (value.outcome === "post_state_unknown") {
      return (
        diagnostic.status !== "stale" &&
        diagnostic.status !== "blocked" &&
        value.state_after === null &&
        value.effect_applied === true &&
        value.post_state_reason_code === "post_state_unavailable"
      );
    }

    if (value.state_after === null) return false;
    const stateAfter = validateStateFingerprint(value.state_after);
    if (!fingerprintMatchesAuthority(stateAfter, authority)) return false;
    // Accepted state_after is bounded observation; required freshness already gated state_before.
    return (
      diagnostic.status !== "stale" &&
      diagnostic.status !== "blocked" &&
      value.effect_applied === true &&
      value.post_state_reason_code === null
    );
  } catch {
    return false;
  }
}

export type RunnerRunStateParseOptions = {
  profile?: RunnerRecordProfile;
};

function hasValidRunnerRunStateShape(
  value: unknown,
  options: RunnerRunStateParseOptions,
): value is RunnerRunState {
  if (!isRecord(value)) return false;
  if (!isRunnerTarget(value.target)) return false;
  const supervision = value.supervision;
  const stateFingerprint = value.state_fingerprint;
  const legacyTaskState =
    options.profile === "legacy_task_pre_trace" && stateFingerprint === undefined;
  const traceContractValid =
    (isNonEmptyString(value.trace_path) &&
      isNonEmptyString(value.stderr_path) &&
      isRunnerTracePolicy(value.trace_policy) &&
      isRunnerTimeoutPolicy(value.timeout_policy)) ||
    (legacyTaskState &&
      (value.trace_path === undefined || isNonEmptyString(value.trace_path)) &&
      (value.stderr_path === undefined || isNonEmptyString(value.stderr_path)) &&
      (value.trace_policy === undefined || isRunnerTracePolicy(value.trace_policy)) &&
      (value.timeout_policy === undefined || isRunnerTimeoutPolicy(value.timeout_policy)));
  const receiptContractValid = legacyTaskState
    ? value.receipt_path === undefined || isNonEmptyString(value.receipt_path)
    : isNonEmptyString(value.receipt_path);
  const bootstrapContractValid =
    value.bootstrap_path === undefined ||
    value.bootstrap_path === null ||
    isNonEmptyString(value.bootstrap_path);
  return (
    value.schema_version === RUNNER_BUNDLE_SCHEMA_VERSION &&
    value.runner_api_version === RUNNER_API_VERSION &&
    isNonEmptyString(value.run_id) &&
    isNonEmptyString(value.adapter_id) &&
    RUNNER_STATUSES.has(value.status as RunnerLifecycleStatus) &&
    (value.mode === "execute" || value.mode === "dry_run") &&
    isNonEmptyString(value.bundle_path) &&
    isNonEmptyString(value.result_path) &&
    receiptContractValid &&
    bootstrapContractValid &&
    isNonEmptyString(value.events_path) &&
    traceContractValid &&
    isTimestamp(value.created_at) &&
    isTimestamp(value.updated_at) &&
    (supervision === undefined ||
      (isRecord(supervision) &&
        (supervision.process_tree === undefined ||
          isRunnerProcessTree(supervision.process_tree)))) &&
    hasValidRunnerResultContract(value, stateFingerprint) &&
    (stateFingerprint === undefined ||
      isRunnerStateFingerprintRecord(stateFingerprint, value.target))
  );
}

export function parseRunnerRunState(
  raw: string,
  statePath: string,
  options: RunnerRunStateParseOptions = {},
): RunnerRunState {
  const parsed: unknown = JSON.parse(raw);
  if (!hasValidRunnerRunStateShape(parsed, options)) {
    throw new Error(`Runner state file has an invalid supervisor contract: ${statePath}`);
  }
  return parsed;
}
