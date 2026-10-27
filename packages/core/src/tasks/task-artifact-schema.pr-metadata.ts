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
const PR_BATCH_CLOSURE_POLICY_VALUES = ["all_or_fail"] as const;
const GIT_OBJECT_ID = /^[0-9a-f]{40,64}$/u;
const SHA256_DIGEST = /^sha256:[0-9a-f]{64}$/u;

/** Immutable provider observation retained when a task adopts an existing PR. */
const ADOPTED_PR_IDENTITY_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    task_id: NON_EMPTY_STRING,
    provider: z.enum(["github", "gitlab"]),
    hostname: NON_EMPTY_STRING,
    remote: NON_EMPTY_STRING,
    source_project: NON_EMPTY_STRING,
    target_project: NON_EMPTY_STRING,
    pr_number: z.number().int().positive(),
    head_ref: NON_EMPTY_STRING,
    base_ref: NON_EMPTY_STRING,
    head_sha: z.string().regex(GIT_OBJECT_ID),
    base_sha: z.string().regex(GIT_OBJECT_ID),
    observed_at: ISO_UTC_TIMESTAMP,
    readback_digest: z.string().regex(SHA256_DIGEST),
    authority_digest: z.string().regex(SHA256_DIGEST),
  })
  .strict()
  .refine((identity) => identity.source_project === identity.target_project, {
    message: "Adopted PR must have a same-repository source and target",
  });

export const TASK_PR_META_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    task_id: NON_EMPTY_STRING,
    related_task_ids: z.array(NON_EMPTY_STRING).optional(),
    batch: z
      .object({
        schema_version: z.literal(1),
        primary_task_id: NON_EMPTY_STRING,
        included_task_ids: z.array(NON_EMPTY_STRING).min(1),
        closure_policy: z.enum(PR_BATCH_CLOSURE_POLICY_VALUES),
      })
      .strict()
      .optional(),
    branch: NON_EMPTY_STRING.optional(),
    base: NON_EMPTY_STRING.optional(),
    pr_number: z.number().int().min(1).optional(),
    pr_url: NON_EMPTY_STRING.optional(),
    provider: z
      .object({
        schema_version: z.literal(1),
        kind: z.enum(["github", "gitlab"]),
        hostname: NON_EMPTY_STRING,
        remote: NON_EMPTY_STRING,
        source_project: NON_EMPTY_STRING,
        target_project: NON_EMPTY_STRING,
      })
      .strict()
      .optional(),
    adoption: ADOPTED_PR_IDENTITY_SCHEMA.optional(),
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
  .passthrough()
  .refine((meta) => !meta.adoption || meta.adoption.task_id === meta.task_id, {
    message: "Adopted PR task ID must match PR metadata task ID",
    path: ["adoption", "task_id"],
  });

export type TaskPrMeta = z.infer<typeof TASK_PR_META_ZOD_SCHEMA>;
