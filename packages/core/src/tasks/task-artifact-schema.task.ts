import { z } from "zod";

import {
  DOC_VERSION_SCHEMA,
  TASK_COMMENT_SCHEMA,
  TASK_EVENT_SCHEMA,
  TASK_SECTIONS_SCHEMA,
} from "./task-artifact-schema.findings.js";
import { ISO_UTC_TIMESTAMP, NON_EMPTY_STRING, isRecord } from "./task-artifact-schema.shared.js";
import {
  TASK_PLAN_APPROVAL_SCHEMA,
  TASK_QUALITY_REVIEW_SCHEMA,
  TASK_VERIFICATION_SCHEMA,
  normalizeApprovalRecord,
} from "./task-artifact-schema.verification.js";
import { TASK_STATUS_VALUES } from "./task-status.js";

const TASK_PRIORITY_VALUES = ["low", "normal", "med", "high"] as const;
const TASK_RISK_LEVEL_VALUES = ["low", "med", "high"] as const;
const TASK_KIND_VALUES = [
  "analysis",
  "content",
  "docs",
  "code",
  "release",
  "ops",
  "context",
] as const;
const TASK_MUTATION_SCOPE_VALUES = [
  "none",
  "docs",
  "code",
  "release",
  "ops",
  "context",
  "unknown",
] as const;
const TASK_RISK_FLAG_VALUES = [
  "network",
  "credentials",
  "deploy",
  "publish",
  "merge",
  "security",
  "external_system",
] as const;
const TASK_BLUEPRINT_REQUEST_VALUES = [
  "analysis.light",
  "content.light",
  "docs.change",
  "code.direct",
  "code.branch_pr",
  "performance.benchmark",
  "quality.regression",
  "context.assimilation",
  "context.maximum_assimilation",
  "runner.execution",
  "post_run.improvement_review",
  "release.strict",
  "ops.approval",
] as const;
const RUNNER_OUTCOME_STATUS_VALUES = [
  "prepared",
  "running",
  "success",
  "failed",
  "blocked",
  "cancelled",
] as const;
const RUNNER_MODE_VALUES = ["execute", "dry_run"] as const;
const RUNNER_TARGET_KIND_VALUES = ["task", "recipe_scenario"] as const;
const TASK_SYNC_FIELD_AUTHORITY_VALUES = [
  "agentplane",
  "provider",
  "bidirectional",
  "derived",
  "ignored",
] as const;
const TASK_SYNC_CONFLICT_POLICY_VALUES = [
  "record",
  "manual",
  "agentplane_wins",
  "provider_wins",
] as const;
const TASK_SYNC_CONFLICT_KIND_VALUES = [
  "field",
  "identity",
  "freshness",
  "deletion",
  "dependency",
  "permission",
] as const;
const TASK_SYNC_CONFLICT_SEVERITY_VALUES = ["info", "warning", "blocking"] as const;
const TASK_SYNC_CONFLICT_STATUS_VALUES = ["open", "resolved", "ignored"] as const;

const TASK_STATUS_SCHEMA = z.enum(TASK_STATUS_VALUES);
const TASK_PRIORITY_SCHEMA = z.enum(TASK_PRIORITY_VALUES);
const TASK_RISK_LEVEL_SCHEMA = z.enum(TASK_RISK_LEVEL_VALUES);
const TASK_KIND_SCHEMA = z.enum(TASK_KIND_VALUES);
const TASK_MUTATION_SCOPE_SCHEMA = z.enum(TASK_MUTATION_SCOPE_VALUES);
const TASK_RISK_FLAGS_SCHEMA = z.array(z.enum(TASK_RISK_FLAG_VALUES));
const TASK_BLUEPRINT_REQUEST_SCHEMA = z.enum(TASK_BLUEPRINT_REQUEST_VALUES);
const TASK_EXECUTION_ROUTE_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    requested_mode: z.enum(["repository", "auto", "direct", "branch_pr"]),
    selected_mode: z.enum(["direct", "branch_pr"]),
    repository_mode: z.enum(["direct", "branch_pr"]),
    reason_codes: z.array(NON_EMPTY_STRING).min(1),
    frozen: z.literal(true),
  })
  .strict();
const TASK_REPOSITORY_EFFECT_SCHEMA = z.enum([
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);
const TASK_EXTERNAL_EFFECT_SCHEMA = z.enum([
  "network_read",
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
]);
const TASK_EXECUTION_DECLARATION_SCHEMA = z
  .object({
    schema_version: z.literal(2),
    preferred_mode: z.enum(["direct", "branch_pr"]),
    scope_roots: z.array(NON_EMPTY_STRING),
    repository_effects: z.array(TASK_REPOSITORY_EFFECT_SCHEMA),
    external_effects: z.array(TASK_EXTERNAL_EFFECT_SCHEMA),
    requirements_uncertainty: z.enum(["bounded", "material"]),
    implementation_uncertainty: z.enum(["bounded", "material"]),
    reversibility: z.enum(["reversible", "recovery_required", "irreversible"]),
    rationale: z.array(NON_EMPTY_STRING).min(1),
  })
  .strict();
const TASK_VERIFICATION_OBSERVATION_SCHEMA = z
  .object({
    id: NON_EMPTY_STRING,
    result: z.enum(["pass", "fail", "unsupported"]),
  })
  .strict();
const TASK_VERIFICATION_CONTRACT_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    source: z.literal("execution_contract"),
    phase: z.enum(["task", "local", "pr", "release"]),
    declared: z
      .object({
        repository_effects: z.array(TASK_REPOSITORY_EFFECT_SCHEMA),
        external_effects: z.array(TASK_EXTERNAL_EFFECT_SCHEMA),
      })
      .strict(),
    observed: z
      .object({
        repository_effects: z.array(TASK_REPOSITORY_EFFECT_SCHEMA),
        external_effects: z.array(TASK_EXTERNAL_EFFECT_SCHEMA),
        changed_components: z.array(NON_EMPTY_STRING),
        changed_files: z.array(NON_EMPTY_STRING),
      })
      .strict(),
    policy_floor: z
      .object({
        pr_full_regression: z.literal(true),
        unknown_or_central_full_regression: z.literal(true),
        monotonic_strengthening: z.literal(true),
      })
      .strict(),
    selector: z
      .object({
        kind: NON_EMPTY_STRING,
        reason: NON_EMPTY_STRING,
        selected_test_files: z.array(NON_EMPTY_STRING),
      })
      .strict(),
    selected_checks: z.array(NON_EMPTY_STRING).min(1),
    escalation_reasons: z.array(NON_EMPTY_STRING),
    requires_full_regression: z.boolean(),
    requires_real_e2e: z.boolean(),
    digest: z.string().regex(/^sha256:[0-9a-f]{64}$/u),
  })
  .strict();
const TASK_EXECUTION_CONTRACT_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    source: z.enum(["agent_declared", "legacy_compatibility"]),
    declaration: TASK_EXECUTION_DECLARATION_SCHEMA,
    selected_mode: z.enum(["direct", "branch_pr"]),
    repository_mode: z.enum(["direct", "branch_pr"]),
    reason_codes: z.array(NON_EMPTY_STRING).min(1),
    authority: z
      .object({
        writable_roots: z.array(NON_EMPTY_STRING),
        allowed_repository_effects: z.array(TASK_REPOSITORY_EFFECT_SCHEMA),
        forbidden_repository_effects: z.array(TASK_REPOSITORY_EFFECT_SCHEMA),
        allowed_external_effects: z.array(TASK_EXTERNAL_EFFECT_SCHEMA),
        forbidden_external_effects: z.array(TASK_EXTERNAL_EFFECT_SCHEMA),
      })
      .strict(),
    safety: z
      .object({
        requires_worktree: z.boolean(),
        requires_user_approval: z.boolean(),
        approval_effects: z.array(TASK_EXTERNAL_EFFECT_SCHEMA),
      })
      .strict(),
    verification: z
      .object({
        required_evidence: z.array(NON_EMPTY_STRING).min(1),
        contract: TASK_VERIFICATION_CONTRACT_SCHEMA.optional(),
      })
      .strict(),
    observed: z
      .object({
        repository_effects: z.array(TASK_REPOSITORY_EFFECT_SCHEMA),
        external_effects: z.array(TASK_EXTERNAL_EFFECT_SCHEMA),
        changed_paths: z.array(NON_EMPTY_STRING),
        changed_components: z.array(NON_EMPTY_STRING),
        verification_results: z.array(TASK_VERIFICATION_OBSERVATION_SCHEMA),
        authority_violations: z.array(NON_EMPTY_STRING),
      })
      .strict(),
    escalation: z
      .object({
        from: z.literal("direct"),
        to: z.literal("branch_pr"),
        reason_codes: z.array(NON_EMPTY_STRING).min(1),
        preserved_changed_paths: z.array(NON_EMPTY_STRING).min(1),
        preserved_commit: NON_EMPTY_STRING.optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

const TASK_ORIGIN_SCHEMA = z
  .object({
    system: NON_EMPTY_STRING,
    issue_id: NON_EMPTY_STRING.optional(),
    url: NON_EMPTY_STRING.optional(),
    recipe_id: NON_EMPTY_STRING.optional(),
    scenario_id: NON_EMPTY_STRING.optional(),
    recipe_version: NON_EMPTY_STRING.optional(),
    run_id: NON_EMPTY_STRING.optional(),
  })
  .catchall(z.string());

const TASK_COMMIT_SCHEMA = z
  .object({
    hash: NON_EMPTY_STRING,
    message: NON_EMPTY_STRING,
  })
  .strict()
  .nullable();

const RUNNER_TARGET_SCHEMA = z
  .object({
    kind: z.enum(RUNNER_TARGET_KIND_VALUES),
    task_id: NON_EMPTY_STRING.optional(),
    recipe_id: NON_EMPTY_STRING.optional(),
    scenario_id: NON_EMPTY_STRING.optional(),
  })
  .passthrough();

const RUNNER_METRICS_SCHEMA = z
  .object({
    duration_ms: z.number().optional(),
    stdout_bytes: z.number().optional(),
    stderr_bytes: z.number().optional(),
    output_last_message_bytes: z.number().nullable().optional(),
  })
  .passthrough();

const RUNNER_EVIDENCE_SCHEMA = z
  .object({
    provenance: z.literal("supervisor_observed").optional(),
    evidence_paths: z.array(NON_EMPTY_STRING).optional(),
    changed_paths: z.array(NON_EMPTY_STRING).optional(),
    files_changed_count: z.number().int().min(0).optional(),
    tests_run: z.array(NON_EMPTY_STRING).optional(),
    verification_candidates: z.array(NON_EMPTY_STRING).optional(),
  })
  .passthrough();

const RUNNER_EXECUTION_RECEIPT_REF_SCHEMA = z
  .object({
    path: NON_EMPTY_STRING,
    sha256: z.string().regex(/^sha256:[0-9a-f]{64}$/u),
    verification_state: z.enum([
      "observed_success",
      "rejected",
      "unverified",
      "compatibility_unverified",
    ]),
    observed_by: z.literal("agentplane"),
  })
  .strict();

const RUNNER_HISTORY_ENTRY_SCHEMA = z
  .object({
    run_id: NON_EMPTY_STRING,
    status: z.enum(RUNNER_OUTCOME_STATUS_VALUES),
    adapter_id: NON_EMPTY_STRING,
    mode: z.enum(RUNNER_MODE_VALUES),
    created_at: ISO_UTC_TIMESTAMP.optional(),
    updated_at: ISO_UTC_TIMESTAMP,
    started_at: ISO_UTC_TIMESTAMP.optional(),
    ended_at: ISO_UTC_TIMESTAMP.optional(),
    exit_code: z.number().int().nullable(),
    target: RUNNER_TARGET_SCHEMA,
    summary: z.string().optional(),
    output_paths: z.array(NON_EMPTY_STRING).optional(),
    stdout_summary: z.string().optional(),
    stderr_summary: z.string().optional(),
    metrics: RUNNER_METRICS_SCHEMA.optional(),
    evidence: RUNNER_EVIDENCE_SCHEMA.optional(),
    execution_receipt: RUNNER_EXECUTION_RECEIPT_REF_SCHEMA.optional(),
  })
  .passthrough();

const RUNNER_OUTCOME_SCHEMA = RUNNER_HISTORY_ENTRY_SCHEMA.extend({
  history: z.array(RUNNER_HISTORY_ENTRY_SCHEMA).optional(),
});

const TASK_TOKEN_USAGE_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    state: z.enum(["observed", "partial", "unavailable"]),
    input_tokens: z.number().int().min(0).nullable(),
    output_tokens: z.number().int().min(0).nullable(),
    reasoning_tokens: z.number().int().min(0).nullable(),
    total_tokens: z.number().int().min(0).nullable(),
    agent_runs: z.number().int().min(0),
    observed_agent_runs: z.number().int().min(0),
    source: z.enum(["supervisor_journal", "unavailable"]),
    observed_by: z.literal("agentplane"),
    journal_digest: z
      .string()
      .regex(/^sha256:[0-9a-f]{64}$/u)
      .nullable(),
    unavailable_reason: z.string().min(1).nullable(),
    updated_at: ISO_UTC_TIMESTAMP,
  })
  .strict()
  .superRefine((usage, ctx) => {
    if (usage.observed_agent_runs > usage.agent_runs) {
      ctx.addIssue({
        code: "custom",
        message: "Observed token-usage runs cannot exceed total agent runs.",
      });
    }
    const tokenFields = [
      usage.input_tokens,
      usage.output_tokens,
      usage.reasoning_tokens,
      usage.total_tokens,
    ];
    if (usage.state === "observed") {
      if (
        usage.agent_runs === 0 ||
        usage.observed_agent_runs !== usage.agent_runs ||
        tokenFields.includes(null) ||
        usage.source !== "supervisor_journal" ||
        usage.unavailable_reason !== null
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Observed token usage requires complete supervisor-observed telemetry.",
        });
      }
    } else if (usage.state === "partial") {
      if (
        usage.observed_agent_runs === 0 ||
        usage.source !== "supervisor_journal" ||
        usage.unavailable_reason === null
      ) {
        ctx.addIssue({
          code: "custom",
          message: "Partial token usage requires some observed telemetry and a gap reason.",
        });
      }
    } else if (
      usage.observed_agent_runs !== 0 ||
      tokenFields.some((value) => value !== null) ||
      usage.unavailable_reason === null
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Unavailable token usage must not fabricate token counts.",
      });
    }
  });

const TASK_SYNC_EXTERNAL_REF_SCHEMA = z
  .object({
    provider: NON_EMPTY_STRING,
    connector_kind: NON_EMPTY_STRING.optional(),
    connection_id: NON_EMPTY_STRING.optional(),
    installation_id: NON_EMPTY_STRING.optional(),
    remote_id: NON_EMPTY_STRING,
    remote_url: NON_EMPTY_STRING.optional(),
    remote_revision: NON_EMPTY_STRING.optional(),
    title: NON_EMPTY_STRING.optional(),
    state: NON_EMPTY_STRING.optional(),
    synced_at: ISO_UTC_TIMESTAMP.optional(),
  })
  .strict();

const TASK_SYNC_FIELD_POLICY_SCHEMA = z
  .object({
    authority: z.enum(TASK_SYNC_FIELD_AUTHORITY_VALUES),
    remote_field: NON_EMPTY_STRING.optional(),
    conflict_policy: z.enum(TASK_SYNC_CONFLICT_POLICY_VALUES).optional(),
    updated_at: ISO_UTC_TIMESTAMP.optional(),
    note: NON_EMPTY_STRING.optional(),
  })
  .strict();

const TASK_SYNC_FRESHNESS_SCHEMA = z
  .object({
    projected_at: ISO_UTC_TIMESTAMP.optional(),
    projection_sha256: NON_EMPTY_STRING.optional(),
    source_revision: z.number().int().min(0).optional(),
    provider_revision: NON_EMPTY_STRING.optional(),
    stale: z.boolean().optional(),
    reason: NON_EMPTY_STRING.optional(),
  })
  .strict();

const TASK_SYNC_CONFLICT_SCHEMA = z
  .object({
    id: NON_EMPTY_STRING,
    kind: z.enum(TASK_SYNC_CONFLICT_KIND_VALUES),
    severity: z.enum(TASK_SYNC_CONFLICT_SEVERITY_VALUES),
    status: z.enum(TASK_SYNC_CONFLICT_STATUS_VALUES),
    summary: NON_EMPTY_STRING,
    provider: NON_EMPTY_STRING.optional(),
    remote_id: NON_EMPTY_STRING.optional(),
    field: NON_EMPTY_STRING.optional(),
    detected_at: ISO_UTC_TIMESTAMP,
    resolved_at: ISO_UTC_TIMESTAMP.optional(),
    safe_command: NON_EMPTY_STRING.optional(),
    when_to_stop: NON_EMPTY_STRING.optional(),
  })
  .strict();

const TASK_SYNC_ENVELOPE_SCHEMA = z
  .object({
    version: z.literal(1),
    external_refs: z.array(TASK_SYNC_EXTERNAL_REF_SCHEMA).default([]),
    field_policies: z.record(NON_EMPTY_STRING, TASK_SYNC_FIELD_POLICY_SCHEMA).default({}),
    freshness: TASK_SYNC_FRESHNESS_SCHEMA.optional(),
    conflicts: z.array(TASK_SYNC_CONFLICT_SCHEMA).default([]),
  })
  .strict();

export const TASK_README_FRONTMATTER_ZOD_SCHEMA = z
  .object({
    id: NON_EMPTY_STRING,
    title: NON_EMPTY_STRING,
    result_summary: z.string().optional(),
    risk_level: TASK_RISK_LEVEL_SCHEMA.optional(),
    breaking: z.boolean().optional(),
    status: TASK_STATUS_SCHEMA,
    priority: TASK_PRIORITY_SCHEMA,
    owner: NON_EMPTY_STRING,
    revision: z.number().int().min(1).optional(),
    origin: TASK_ORIGIN_SCHEMA.optional(),
    depends_on: z.array(NON_EMPTY_STRING),
    tags: z.array(NON_EMPTY_STRING),
    task_kind: TASK_KIND_SCHEMA.optional(),
    mutation_scope: TASK_MUTATION_SCOPE_SCHEMA.optional(),
    risk_flags: TASK_RISK_FLAGS_SCHEMA.optional(),
    blueprint_request: TASK_BLUEPRINT_REQUEST_SCHEMA.optional(),
    verify: z.array(NON_EMPTY_STRING),
    plan_approval: TASK_PLAN_APPROVAL_SCHEMA,
    verification: TASK_VERIFICATION_SCHEMA,
    quality_review: TASK_QUALITY_REVIEW_SCHEMA.optional(),
    runner: RUNNER_OUTCOME_SCHEMA.optional(),
    token_usage: TASK_TOKEN_USAGE_SCHEMA.optional(),
    execution_route: TASK_EXECUTION_ROUTE_SCHEMA.optional(),
    execution_contract: TASK_EXECUTION_CONTRACT_SCHEMA.optional(),
    sync: TASK_SYNC_ENVELOPE_SCHEMA.optional(),
    commit: TASK_COMMIT_SCHEMA.optional(),
    comments: z.array(TASK_COMMENT_SCHEMA),
    events: z.array(TASK_EVENT_SCHEMA).optional(),
    doc_version: DOC_VERSION_SCHEMA,
    doc_updated_at: ISO_UTC_TIMESTAMP,
    doc_updated_by: NON_EMPTY_STRING,
    description: z.string(),
    sections: TASK_SECTIONS_SCHEMA.optional(),
    dirty: z.boolean().optional(),
    id_source: NON_EMPTY_STRING.optional(),
    extensions: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

const TASKS_EXPORT_TASK_SCHEMA = z
  .object({
    id: NON_EMPTY_STRING,
    title: NON_EMPTY_STRING,
    result_summary: z.string().optional(),
    risk_level: TASK_RISK_LEVEL_SCHEMA.optional(),
    breaking: z.boolean().optional(),
    status: TASK_STATUS_SCHEMA,
    priority: TASK_PRIORITY_SCHEMA,
    owner: NON_EMPTY_STRING,
    revision: z.number().int().min(1).optional(),
    origin: TASK_ORIGIN_SCHEMA.optional(),
    runner: RUNNER_OUTCOME_SCHEMA.optional(),
    token_usage: TASK_TOKEN_USAGE_SCHEMA.optional(),
    execution_route: TASK_EXECUTION_ROUTE_SCHEMA.optional(),
    execution_contract: TASK_EXECUTION_CONTRACT_SCHEMA.optional(),
    depends_on: z.array(NON_EMPTY_STRING),
    tags: z.array(NON_EMPTY_STRING),
    task_kind: TASK_KIND_SCHEMA.optional(),
    mutation_scope: TASK_MUTATION_SCOPE_SCHEMA.optional(),
    risk_flags: TASK_RISK_FLAGS_SCHEMA.optional(),
    blueprint_request: TASK_BLUEPRINT_REQUEST_SCHEMA.optional(),
    verify: z.array(NON_EMPTY_STRING),
    plan_approval: TASK_PLAN_APPROVAL_SCHEMA,
    verification: TASK_VERIFICATION_SCHEMA,
    quality_review: TASK_QUALITY_REVIEW_SCHEMA.optional(),
    commit: TASK_COMMIT_SCHEMA,
    comments: z.array(TASK_COMMENT_SCHEMA),
    events: z.array(TASK_EVENT_SCHEMA).optional(),
    sync: TASK_SYNC_ENVELOPE_SCHEMA.optional(),
    doc_version: DOC_VERSION_SCHEMA,
    doc_updated_at: ISO_UTC_TIMESTAMP,
    doc_updated_by: NON_EMPTY_STRING,
    description: z.string(),
    dirty: z.boolean(),
    id_source: NON_EMPTY_STRING,
  })
  .passthrough();

const TASKS_EXPORT_META_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    managed_by: NON_EMPTY_STRING,
    checksum_algo: z.literal("sha256"),
    checksum: NON_EMPTY_STRING,
  })
  .strict();

export const TASKS_EXPORT_ZOD_SCHEMA = z
  .object({
    tasks: z.array(TASKS_EXPORT_TASK_SCHEMA),
    meta: TASKS_EXPORT_META_SCHEMA,
  })
  .strict();

function normalizeLegacyTaskPriority(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const normalized = value.trim().toLowerCase();
  if (normalized === "medium") return "med";
  if (
    normalized === "low" ||
    normalized === "normal" ||
    normalized === "med" ||
    normalized === "high"
  ) {
    return normalized;
  }
  return value;
}

function legacyExecutionContractDefaults(value: unknown): unknown {
  if (!isRecord(value) || !isRecord(value.declaration)) return value;
  const declaration = value.declaration;
  const legacyUncertainty = declaration.uncertainty === "material" ? "material" : "bounded";
  const normalizedDeclaration =
    declaration.schema_version === 1
      ? (() => {
          const { uncertainty: _legacyUncertainty, ...remainingDeclaration } = declaration;
          return {
            ...remainingDeclaration,
            schema_version: 2,
            requirements_uncertainty: legacyUncertainty,
            implementation_uncertainty: legacyUncertainty,
          };
        })()
      : declaration;
  const repositoryEffects = Array.isArray(declaration.repository_effects)
    ? declaration.repository_effects.filter(
        (effect): effect is string => typeof effect === "string",
      )
    : [];
  const scopeRoots = Array.isArray(declaration.scope_roots)
    ? declaration.scope_roots.filter((root): root is string => typeof root === "string")
    : [];
  const observedSource = isRecord(value.observed) ? value.observed : {};
  const observedRepositoryEffects = Array.isArray(observedSource.repository_effects)
    ? observedSource.repository_effects.filter(
        (effect): effect is string => typeof effect === "string",
      )
    : [];
  const changedPaths = Array.isArray(observedSource.changed_paths)
    ? observedSource.changed_paths.filter((entry): entry is string => typeof entry === "string")
    : [];
  const authoritySource = isRecord(value.authority) ? value.authority : {};
  const allowedExternalEffects = Array.isArray(authoritySource.allowed_external_effects)
    ? authoritySource.allowed_external_effects.filter(
        (effect): effect is string => typeof effect === "string",
      )
    : [];
  if (
    Array.isArray(declaration.external_effects) &&
    declaration.external_effects.includes("network_read") &&
    !allowedExternalEffects.includes("network_read")
  ) {
    allowedExternalEffects.push("network_read");
  }
  const authority = {
    writable_roots: Array.isArray(authoritySource.writable_roots)
      ? authoritySource.writable_roots
      : scopeRoots,
    allowed_repository_effects: Array.isArray(authoritySource.allowed_repository_effects)
      ? authoritySource.allowed_repository_effects
      : repositoryEffects,
    forbidden_repository_effects: Array.isArray(authoritySource.forbidden_repository_effects)
      ? authoritySource.forbidden_repository_effects
      : TASK_REPOSITORY_EFFECT_SCHEMA.options.filter(
          (effect) => !repositoryEffects.includes(effect),
        ),
    allowed_external_effects: allowedExternalEffects,
    forbidden_external_effects: (Array.isArray(authoritySource.forbidden_external_effects)
      ? authoritySource.forbidden_external_effects.filter(
          (effect): effect is string => typeof effect === "string",
        )
      : TASK_EXTERNAL_EFFECT_SCHEMA.options
    ).filter((effect) => effect !== "network_read" || !allowedExternalEffects.includes(effect)),
  };
  return {
    ...value,
    declaration: normalizedDeclaration,
    authority,
    observed: {
      ...observedSource,
      repository_effects: observedRepositoryEffects,
      external_effects: Array.isArray(observedSource.external_effects)
        ? observedSource.external_effects
        : [],
      changed_paths: changedPaths,
      changed_components: Array.isArray(observedSource.changed_components)
        ? observedSource.changed_components
        : [],
      verification_results: Array.isArray(observedSource.verification_results)
        ? observedSource.verification_results
        : [],
      authority_violations: Array.isArray(observedSource.authority_violations)
        ? observedSource.authority_violations
        : observedRepositoryEffects
            .filter((effect) => !repositoryEffects.includes(effect))
            .map((effect) => `repository_effect:${effect}`),
    },
  };
}

export function withTaskReadmeFrontmatterDefaults(
  value: Record<string, unknown>,
): Record<string, unknown> {
  const verificationSource = isRecord(value.verification) ? value.verification : {};
  const verification = normalizeApprovalRecord(verificationSource, [
    "pending",
    "ok",
    "needs_rework",
    "blocked_external",
  ]);
  const verificationAttemptsSource = verificationSource.attempts;
  const verificationAttempts =
    typeof verificationAttemptsSource === "number" &&
    Number.isInteger(verificationAttemptsSource) &&
    verificationAttemptsSource >= 0
      ? verificationAttemptsSource
      : 0;
  return {
    ...value,
    priority: normalizeLegacyTaskPriority(value.priority),
    depends_on: Array.isArray(value.depends_on) ? value.depends_on : [],
    tags: Array.isArray(value.tags) ? value.tags : [],
    verify: Array.isArray(value.verify) ? value.verify : [],
    comments: Array.isArray(value.comments) ? value.comments : [],
    plan_approval: normalizeApprovalRecord(value.plan_approval, [
      "pending",
      "approved",
      "rejected",
    ]),
    verification: { ...verification, attempts: verificationAttempts },
    ...(value.execution_contract
      ? { execution_contract: legacyExecutionContractDefaults(value.execution_contract) }
      : {}),
  };
}
