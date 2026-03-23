import { isRecord } from "../../../shared/guards.js";

import type {
  PlanApproval,
  TaskOrigin,
  TaskRunnerExecutionMetrics,
  TaskRunnerOutcome,
  TaskRunnerTarget,
  VerificationResult,
} from "./types.js";
import { toStringSafe } from "./strings.js";

export function normalizeDependsOn(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string" && v.trim() !== "[]");
  }
  if (typeof value === "string" && value.trim() === "[]") return [];
  return [];
}

export function normalizePriority(value: unknown): string {
  const raw = toStringSafe(value).trim().toLowerCase();
  if (!raw) return "med";
  if (raw === "low") return "low";
  if (raw === "normal") return "normal";
  if (raw === "medium" || raw === "med") return "med";
  if (raw === "high") return "high";
  if (raw === "urgent" || raw === "immediate") return "high";
  return "med";
}

export function defaultPlanApproval(): PlanApproval {
  return { state: "pending", updated_at: null, updated_by: null, note: null };
}

export function defaultVerificationResult(): VerificationResult {
  return { state: "pending", updated_at: null, updated_by: null, note: null };
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
  if (state !== "pending" && state !== "ok" && state !== "needs_rework") return null;
  const updatedAt =
    value.updated_at === null || typeof value.updated_at === "string" ? value.updated_at : null;
  const updatedBy =
    value.updated_by === null || typeof value.updated_by === "string" ? value.updated_by : null;
  const note = value.note === null || typeof value.note === "string" ? value.note : null;
  return { state, updated_at: updatedAt, updated_by: updatedBy, note };
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

export function normalizeTaskRunnerOutcome(value: unknown): TaskRunnerOutcome | null {
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

  const outcome: TaskRunnerOutcome = {
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
  if (typeof value.stdout_summary === "string" && value.stdout_summary.trim()) {
    outcome.stdout_summary = value.stdout_summary.trim();
  }
  if (typeof value.stderr_summary === "string" && value.stderr_summary.trim()) {
    outcome.stderr_summary = value.stderr_summary.trim();
  }
  const metrics = normalizeTaskRunnerMetrics(value.metrics);
  if (metrics) outcome.metrics = metrics;
  return outcome;
}
