import { z } from "zod";

import { NULLABLE_ISO_UTC_TIMESTAMP, isRecord } from "./task-artifact-schema.shared.js";

export const PLAN_APPROVAL_STATE_VALUES = ["pending", "approved", "rejected"] as const;
export const VERIFICATION_STATE_VALUES = [
  "pending",
  "ok",
  "needs_rework",
  "blocked_external",
] as const;

export const TASK_PLAN_APPROVAL_SCHEMA = z
  .object({
    state: z.enum(PLAN_APPROVAL_STATE_VALUES),
    updated_at: NULLABLE_ISO_UTC_TIMESTAMP,
    updated_by: z.string().nullable(),
    note: z.string().nullable(),
  })
  .passthrough();

export const TASK_VERIFICATION_SCHEMA = z
  .object({
    state: z.enum(VERIFICATION_STATE_VALUES),
    attempts: z.number().int().min(0).optional(),
    updated_at: NULLABLE_ISO_UTC_TIMESTAMP,
    updated_by: z.string().nullable(),
    note: z.string().nullable(),
  })
  .passthrough()
  .transform((value) => ({ ...value, attempts: value.attempts ?? 0 }));

export function normalizeApprovalRecord(
  value: unknown,
  allowedStates: readonly string[],
): { state: string; updated_at: string | null; updated_by: string | null; note: string | null } {
  const source = isRecord(value) ? value : {};
  const state =
    typeof source.state === "string" && allowedStates.includes(source.state)
      ? source.state
      : (allowedStates[0] ?? "pending");
  return {
    state,
    updated_at:
      typeof source.updated_at === "string" || source.updated_at === null
        ? source.updated_at
        : null,
    updated_by:
      typeof source.updated_by === "string" || source.updated_by === null
        ? source.updated_by
        : null,
    note: typeof source.note === "string" || source.note === null ? source.note : null,
  };
}
