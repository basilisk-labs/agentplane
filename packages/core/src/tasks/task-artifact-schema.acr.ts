import { z } from "zod";

import { ISO_UTC_TIMESTAMP, NON_EMPTY_STRING } from "./task-artifact-schema.shared.js";

export const ACR_VERSION = "0.1.0";

const SHA256_DIGEST_SCHEMA = z.string().regex(/^sha256:[0-9a-f]{64}$/);
const REPOSITORY_RELATIVE_PATH_SCHEMA = z
  .string()
  .min(1)
  .regex(/^(?!\/)(?!\\)(?![A-Za-z]:)(?!.*\\)(?!.*(?:^|\/)\.\.(?:\/|$)).+$/);

const PRINCIPAL_SCHEMA = z
  .object({
    type: NON_EMPTY_STRING,
    id: NON_EMPTY_STRING,
  })
  .strict();

const EXTERNAL_REF_SCHEMA = z
  .object({
    type: NON_EMPTY_STRING,
    id: NON_EMPTY_STRING,
  })
  .strict();

const ARTIFACT_SCHEMA = z
  .object({
    path: REPOSITORY_RELATIVE_PATH_SCHEMA,
    sha256: SHA256_DIGEST_SCHEMA,
  })
  .strict();

const TOOL_SCHEMA = z
  .object({
    name: NON_EMPTY_STRING,
    version: NON_EMPTY_STRING.optional(),
  })
  .strict();

const ACR_PRODUCER_SCHEMA = z
  .object({
    name: NON_EMPTY_STRING,
    version: NON_EMPTY_STRING,
  })
  .strict();

const ACR_REPOSITORY_SCHEMA = z
  .object({
    vcs: z.literal("git"),
    remote: NON_EMPTY_STRING.optional(),
    base_ref: NON_EMPTY_STRING.optional(),
    base_commit: NON_EMPTY_STRING,
    work_ref: NON_EMPTY_STRING.optional(),
    work_commit: NON_EMPTY_STRING,
    change_request: z
      .object({
        provider: z.enum(["github", "gitlab", "unknown", "custom"]),
        type: z.enum(["pull_request", "merge_request", "unknown", "custom"]),
        id: NON_EMPTY_STRING,
      })
      .strict()
      .optional(),
  })
  .strict();

const ACR_TASK_SCHEMA = z
  .object({
    task_id: NON_EMPTY_STRING,
    title: NON_EMPTY_STRING,
    intent: NON_EMPTY_STRING,
    requested_by: PRINCIPAL_SCHEMA.optional(),
    external_refs: z.array(EXTERNAL_REF_SCHEMA).optional(),
  })
  .strict();

const ACR_AGENT_SCHEMA = z
  .object({
    id: NON_EMPTY_STRING.optional(),
    name: NON_EMPTY_STRING,
    agent_type: z.enum(["coding_agent", "human", "hybrid", "automation", "unknown"]),
    model: z
      .object({
        provider: z.enum(["anthropic", "openai", "cursor", "aider", "unknown", "custom"]),
        name: NON_EMPTY_STRING,
        version: NON_EMPTY_STRING,
      })
      .strict()
      .optional(),
    toolchain: z.array(TOOL_SCHEMA).optional(),
  })
  .strict();

const ACR_PLAN_SCHEMA = z
  .object({
    status: z.enum(["missing", "draft", "pending_approval", "approved", "rejected", "waived"]),
    artifact: ARTIFACT_SCHEMA.optional(),
    approved_at: ISO_UTC_TIMESTAMP.optional(),
    approved_by: PRINCIPAL_SCHEMA.optional(),
  })
  .strict();

const ACR_PERMISSIONS_SCHEMA = z
  .object({
    filesystem: z
      .object({
        allowed_paths: z.array(NON_EMPTY_STRING).optional(),
        protected_paths: z.array(NON_EMPTY_STRING).optional(),
      })
      .strict()
      .optional(),
    network: z
      .object({
        mode: z.enum(["disabled", "approval_required", "allowed", "unknown"]),
      })
      .strict(),
    secrets: z
      .object({
        access: z.enum(["none", "approval_required", "allowed", "unknown"]),
      })
      .strict(),
    tools: z
      .array(
        z
          .object({
            name: NON_EMPTY_STRING,
            allowed: z.boolean(),
          })
          .strict(),
      )
      .optional(),
  })
  .strict();

const ACR_POLICY_SCHEMA = z
  .object({
    policy_version: NON_EMPTY_STRING.optional(),
    policy_hash: SHA256_DIGEST_SCHEMA.optional(),
    decisions: z.array(
      z
        .object({
          rule_id: NON_EMPTY_STRING,
          decision: z.enum(["pass", "fail", "warning", "not_applicable", "manual_override"]),
          reason: NON_EMPTY_STRING,
        })
        .strict(),
    ),
  })
  .strict();

const ACR_CHANGES_SCHEMA = z
  .object({
    summary: NON_EMPTY_STRING,
    diff_stats: z
      .object({
        files_changed: z.number().int().min(0),
        insertions: z.number().int().min(0),
        deletions: z.number().int().min(0),
      })
      .strict(),
    files: z.array(
      z
        .object({
          path: REPOSITORY_RELATIVE_PATH_SCHEMA,
          status: z.enum([
            "added",
            "modified",
            "deleted",
            "renamed",
            "copied",
            "type_changed",
            "unknown",
          ]),
          risk_categories: z.array(NON_EMPTY_STRING).optional(),
        })
        .strict(),
    ),
    risk: z
      .object({
        level: z.enum(["low", "medium", "high", "critical", "unknown"]),
        categories: z.array(NON_EMPTY_STRING),
        protected_paths_touched: z.boolean(),
      })
      .strict(),
  })
  .strict();

const ACR_VERIFICATION_SCHEMA = z
  .object({
    status: z.enum(["passed", "failed", "partial", "not_run", "waived"]),
    checks: z.array(
      z
        .object({
          check_id: NON_EMPTY_STRING,
          type: z.enum([
            "test",
            "lint",
            "typecheck",
            "build",
            "security_scan",
            "schema_validation",
            "manual_review",
            "other",
          ]),
          command: NON_EMPTY_STRING.optional(),
          status: z.enum(["passed", "failed", "skipped", "not_run", "waived", "unknown"]),
          exit_code: z.number().int().nullable().optional(),
          artifact: ARTIFACT_SCHEMA.optional(),
        })
        .strict(),
    ),
  })
  .strict();

const ACR_APPROVAL_SCHEMA = z
  .object({
    approval_id: NON_EMPTY_STRING,
    type: z.enum([
      "plan_approval",
      "plan_waiver",
      "protected_path_approval",
      "verification_waiver",
      "policy_override",
      "merge_approval",
    ]),
    decision: z.enum(["approved", "rejected", "waived", "overridden"]),
    approved_by: PRINCIPAL_SCHEMA,
    approved_at: ISO_UTC_TIMESTAMP,
    scope: NON_EMPTY_STRING,
  })
  .strict();

const ACR_EVIDENCE_SCHEMA = z
  .object({
    type: z.enum([
      "task",
      "plan",
      "approval",
      "policy",
      "diff",
      "verification_log",
      "test_report",
      "security_report",
      "finish",
      "other",
    ]),
    path: REPOSITORY_RELATIVE_PATH_SCHEMA,
    sha256: SHA256_DIGEST_SCHEMA,
  })
  .strict();

const ACR_RESULT_SCHEMA = z
  .object({
    status: z.enum([
      "draft",
      "planned",
      "approved",
      "implemented",
      "verified",
      "finished",
      "failed",
      "abandoned",
    ]),
    merge_ready: z.boolean(),
    residual_risks: z.array(NON_EMPTY_STRING).optional(),
    rollback: z
      .object({
        available: z.boolean(),
        notes: NON_EMPTY_STRING.optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

const ACR_INTEGRITY_SCHEMA = z
  .object({
    digest_algorithm: z.literal("sha256"),
    record_digest: SHA256_DIGEST_SCHEMA,
    canonicalization: z.literal("rfc8785-jcs"),
    signatures: z.array(z.unknown()).optional(),
  })
  .strict();

const ACR_EXTENSION_KEY_SCHEMA = z.string().regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)+$/);

export const ACR_ZOD_SCHEMA = z
  .object({
    acr_version: z.literal(ACR_VERSION),
    record_type: z.literal("agent_change_record"),
    record_id: z.string().regex(/^acr_[A-Za-z0-9_-]+$/),
    created_at: ISO_UTC_TIMESTAMP,
    producer: ACR_PRODUCER_SCHEMA,
    repository: ACR_REPOSITORY_SCHEMA,
    task: ACR_TASK_SCHEMA,
    agent: ACR_AGENT_SCHEMA,
    plan: ACR_PLAN_SCHEMA,
    permissions: ACR_PERMISSIONS_SCHEMA,
    policy: ACR_POLICY_SCHEMA,
    changes: ACR_CHANGES_SCHEMA,
    verification: ACR_VERIFICATION_SCHEMA,
    approvals: z.array(ACR_APPROVAL_SCHEMA),
    evidence: z.array(ACR_EVIDENCE_SCHEMA),
    result: ACR_RESULT_SCHEMA,
    integrity: ACR_INTEGRITY_SCHEMA,
    extensions: z.record(ACR_EXTENSION_KEY_SCHEMA, z.unknown()).optional(),
  })
  .strict();

export type AgentChangeRecord = z.infer<typeof ACR_ZOD_SCHEMA>;
