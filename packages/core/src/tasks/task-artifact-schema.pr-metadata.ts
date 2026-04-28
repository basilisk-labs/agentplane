import { z } from "zod";

import {
  ISO_UTC_TIMESTAMP,
  NON_EMPTY_STRING,
  NULLABLE_ISO_UTC_TIMESTAMP,
} from "./task-artifact-schema.shared.js";

const PR_STATUS_VALUES = ["OPEN", "CLOSED", "MERGED"] as const;
const PR_ARTIFACT_STATE_VALUES = [
  "open",
  "merged",
  "handoff",
  "remote_staged",
  "remote_failed",
] as const;
const MERGE_STRATEGY_VALUES = ["squash", "merge", "rebase"] as const;
const PR_VERIFY_STATUS_VALUES = ["pass", "fail", "skipped"] as const;

export const TASK_PR_META_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    task_id: NON_EMPTY_STRING,
    branch: NON_EMPTY_STRING.optional(),
    base: NON_EMPTY_STRING.optional(),
    pr_number: z.number().int().min(1).optional(),
    pr_url: NON_EMPTY_STRING.optional(),
    created_at: ISO_UTC_TIMESTAMP,
    updated_at: ISO_UTC_TIMESTAMP,
    status: z.enum(PR_STATUS_VALUES).optional(),
    artifact_state: z.enum(PR_ARTIFACT_STATE_VALUES).optional(),
    artifact_state_reason: NON_EMPTY_STRING.optional(),
    artifact_state_updated_at: ISO_UTC_TIMESTAMP.optional(),
    merge_strategy: z.enum(MERGE_STRATEGY_VALUES).optional(),
    merged_at: ISO_UTC_TIMESTAMP.optional(),
    merge_commit: NON_EMPTY_STRING.optional(),
    head_sha: NON_EMPTY_STRING.optional(),
    last_verified_sha: z.string().min(7).nullable().optional(),
    last_verified_at: NULLABLE_ISO_UTC_TIMESTAMP.optional(),
    verify: z
      .object({
        status: z.enum(PR_VERIFY_STATUS_VALUES).optional(),
        command: z.string().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();

export type TaskPrMeta = z.infer<typeof TASK_PR_META_ZOD_SCHEMA>;
