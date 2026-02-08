import { isRecord } from "../../../shared/guards.js";

import type { PlanApproval, VerificationResult } from "./types.js";
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
