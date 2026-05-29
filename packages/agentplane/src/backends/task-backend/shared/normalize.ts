import { isRecord } from "../../../shared/guards.js";

import type {
  PlanApproval,
  TaskData,
  TaskOrigin,
  TaskSummary,
  TaskRunnerEvidence,
  TaskRunnerExecutionMetrics,
  TaskRunnerHistoryEntry,
  TaskRunnerOutcome,
  TaskRunnerTarget,
  QualityReviewResult,
  VerificationResult,
} from "./types.js";

export function normalizeDependsOn(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string" && v.trim() !== "[]");
  }
  if (typeof value === "string" && value.trim() === "[]") return [];
  return [];
}

export function defaultPlanApproval(): PlanApproval {
  return { state: "pending", updated_at: null, updated_by: null, note: null };
}

export function defaultVerificationResult(): VerificationResult {
  return { state: "pending", attempts: 0, updated_at: null, updated_by: null, note: null };
}

export function normalizeQualityReviewResult(value: unknown): QualityReviewResult | null {
  if (!isRecord(value)) return null;
  const state = typeof value.state === "string" ? value.state : "";
  if (
    state !== "pending" &&
    state !== "pass" &&
    state !== "rework" &&
    state !== "blocked" &&
    state !== "human_review"
  ) {
    return null;
  }
  const updatedAt =
    value.updated_at === null || typeof value.updated_at === "string" ? value.updated_at : null;
  const updatedBy =
    value.updated_by === null || typeof value.updated_by === "string" ? value.updated_by : null;
  const note = value.note === null || typeof value.note === "string" ? value.note : null;
  const evaluatedSha =
    value.evaluated_sha === null || typeof value.evaluated_sha === "string"
      ? value.evaluated_sha
      : null;
  const blueprintDigest =
    value.blueprint_digest === null || typeof value.blueprint_digest === "string"
      ? value.blueprint_digest
      : null;
  return {
    state,
    updated_at: updatedAt,
    updated_by: updatedBy,
    note,
    evaluated_sha: evaluatedSha,
    blueprint_digest: blueprintDigest,
    evidence_refs: normalizeStringArray(value.evidence_refs) ?? [],
    findings: normalizeStringArray(value.findings) ?? [],
  };
}

export function normalizeTaskOrigin(value: unknown): TaskOrigin | null {
  if (!isRecord(value)) return null;
  const system = typeof value.system === "string" ? value.system.trim() : "";
  if (!system) return null;
  const origin: TaskOrigin = { system };
  for (const [key, raw] of Object.entries(value)) {
    if (key === "system") continue;
    if (typeof raw !== "string") continue;
    const normalizedKey = key.trim();
    const normalizedValue = raw.trim();
    if (!normalizedKey || !normalizedValue) continue;
    origin[normalizedKey] = normalizedValue;
  }
  return origin;
}

export function normalizePlanApproval(value: unknown): PlanApproval | null {
  if (!isRecord(value)) return null;
  const state = typeof value.state === "string" ? value.state : "";
  if (state !== "pending" && state !== "approved" && state !== "rejected") return null;
  const updatedAt =
    value.updated_at === null || typeof value.updated_at === "string" ? value.updated_at : null;
  const updatedBy =
    value.updated_by === null || typeof value.updated_by === "string" ? value.updated_by : null;
  const note = value.note === null || typeof value.note === "string" ? value.note : null;
  return { state, updated_at: updatedAt, updated_by: updatedBy, note };
}

export function normalizeVerificationResult(value: unknown): VerificationResult | null {
  if (!isRecord(value)) return null;
  const state = typeof value.state === "string" ? value.state : "";
  if (
    state !== "pending" &&
    state !== "ok" &&
    state !== "needs_rework" &&
    state !== "blocked_external"
  )
    return null;
  const attempts =
    value.attempts === undefined
      ? 0
      : typeof value.attempts === "number" &&
          Number.isInteger(value.attempts) &&
          value.attempts >= 0
        ? value.attempts
        : null;
  if (attempts === null) return null;
  const updatedAt =
    value.updated_at === null || typeof value.updated_at === "string" ? value.updated_at : null;
  const updatedBy =
    value.updated_by === null || typeof value.updated_by === "string" ? value.updated_by : null;
  const note = value.note === null || typeof value.note === "string" ? value.note : null;
  return { state, attempts, updated_at: updatedAt, updated_by: updatedBy, note };
}

function normalizeTaskRunnerTarget(value: unknown): TaskRunnerTarget | null {
  if (!isRecord(value)) return null;
  const kind = typeof value.kind === "string" ? value.kind.trim() : "";
  if (kind !== "task" && kind !== "recipe_scenario") return null;
  const target: TaskRunnerTarget = { kind };
  if (typeof value.task_id === "string" && value.task_id.trim()) {
    target.task_id = value.task_id.trim();
  }
  if (typeof value.recipe_id === "string" && value.recipe_id.trim()) {
    target.recipe_id = value.recipe_id.trim();
  }
  if (typeof value.scenario_id === "string" && value.scenario_id.trim()) {
    target.scenario_id = value.scenario_id.trim();
  }
  return target;
}

function normalizeTaskRunnerMetrics(value: unknown): TaskRunnerExecutionMetrics | null {
  if (!isRecord(value)) return null;
  const metrics: TaskRunnerExecutionMetrics = {};
  if (typeof value.duration_ms === "number" && Number.isFinite(value.duration_ms)) {
    metrics.duration_ms = value.duration_ms;
  }
  if (typeof value.stdout_bytes === "number" && Number.isFinite(value.stdout_bytes)) {
    metrics.stdout_bytes = value.stdout_bytes;
  }
  if (typeof value.stderr_bytes === "number" && Number.isFinite(value.stderr_bytes)) {
    metrics.stderr_bytes = value.stderr_bytes;
  }
  if (
    value.output_last_message_bytes === null ||
    (typeof value.output_last_message_bytes === "number" &&
      Number.isFinite(value.output_last_message_bytes))
  ) {
    metrics.output_last_message_bytes = value.output_last_message_bytes;
  }
  return Object.keys(metrics).length > 0 ? metrics : null;
}

function normalizeStringArray(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const entries = value
    .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    .map((item) => item.trim());
  return entries.length > 0 ? entries : null;
}

function normalizeTaskRunnerEvidence(value: unknown): TaskRunnerEvidence | null {
  if (!isRecord(value)) return null;
  const evidence: TaskRunnerEvidence = {};
  const evidencePaths = normalizeStringArray(value.evidence_paths);
  if (evidencePaths) evidence.evidence_paths = evidencePaths;
  const changedPaths = normalizeStringArray(value.changed_paths);
  if (changedPaths) evidence.changed_paths = changedPaths;
  const testsRun = normalizeStringArray(value.tests_run);
  if (testsRun) evidence.tests_run = testsRun;
  const verificationCandidates = normalizeStringArray(value.verification_candidates);
  if (verificationCandidates) evidence.verification_candidates = verificationCandidates;
  if (
    typeof value.files_changed_count === "number" &&
    Number.isInteger(value.files_changed_count) &&
    value.files_changed_count >= 0
  ) {
    evidence.files_changed_count = value.files_changed_count;
  }
  return Object.keys(evidence).length > 0 ? evidence : null;
}

function normalizeTaskRunnerHistoryEntry(value: unknown): TaskRunnerHistoryEntry | null {
  if (!isRecord(value)) return null;
  const runId = typeof value.run_id === "string" ? value.run_id.trim() : "";
  const status = typeof value.status === "string" ? value.status.trim() : "";
  const adapterId = typeof value.adapter_id === "string" ? value.adapter_id.trim() : "";
  const mode = value.mode === "execute" || value.mode === "dry_run" ? value.mode : null;
  const updatedAt = typeof value.updated_at === "string" ? value.updated_at.trim() : "";
  const target = normalizeTaskRunnerTarget(value.target);
  if (!runId || !adapterId || !updatedAt || !target || !mode) return null;
  if (
    status !== "prepared" &&
    status !== "running" &&
    status !== "success" &&
    status !== "failed" &&
    status !== "cancelled"
  ) {
    return null;
  }

  const outcome: TaskRunnerHistoryEntry = {
    run_id: runId,
    status,
    adapter_id: adapterId,
    mode,
    updated_at: updatedAt,
    exit_code:
      value.exit_code === null || typeof value.exit_code === "number" ? value.exit_code : null,
    target,
  };
  if (typeof value.started_at === "string" && value.started_at.trim()) {
    outcome.started_at = value.started_at.trim();
  }
  if (typeof value.ended_at === "string" && value.ended_at.trim()) {
    outcome.ended_at = value.ended_at.trim();
  }
  if (Array.isArray(value.output_paths)) {
    const outputPaths = value.output_paths.filter(
      (item): item is string => typeof item === "string" && item.trim().length > 0,
    );
    if (outputPaths.length > 0) outcome.output_paths = outputPaths;
  }
  if (typeof value.summary === "string" && value.summary.trim()) {
    outcome.summary = value.summary.trim();
  }
  if (typeof value.stdout_summary === "string" && value.stdout_summary.trim()) {
    outcome.stdout_summary = value.stdout_summary.trim();
  }
  if (typeof value.stderr_summary === "string" && value.stderr_summary.trim()) {
    outcome.stderr_summary = value.stderr_summary.trim();
  }
  const metrics = normalizeTaskRunnerMetrics(value.metrics);
  if (metrics) outcome.metrics = metrics;
  const evidence = normalizeTaskRunnerEvidence(value.evidence);
  if (evidence) outcome.evidence = evidence;
  return outcome;
}

export function normalizeTaskRunnerOutcome(value: unknown): TaskRunnerOutcome | null {
  const outcome = normalizeTaskRunnerHistoryEntry(value);
  if (!outcome) return null;
  const record = value as Record<string, unknown>;

  const history = Array.isArray(record.history)
    ? record.history
        .map((entry) => normalizeTaskRunnerHistoryEntry(entry))
        .filter((entry): entry is TaskRunnerHistoryEntry => !!entry)
    : [];

  return history.length > 0 ? { ...outcome, history } : outcome;
}

export function toTaskSummary(task: TaskData): TaskSummary {
  const { doc, sections, events, ...summary } = task;
  void doc;
  void sections;
  void events;
  return summary;
}

export function toTaskSummaries(tasks: TaskData[]): TaskSummary[] {
  return tasks.map((task) => toTaskSummary(task));
}
