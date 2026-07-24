import { z } from "zod";

import {
  ISO_UTC_TIMESTAMP,
  NON_EMPTY_STRING,
  assertValid,
  buildJsonSchemaDocument,
  schemaErrors,
} from "../tasks/task-artifact-schema.shared.js";

export const EXECUTION_RECEIPT_LEGACY_SCHEMA_VERSION = 1 as const;
export const EXECUTION_RECEIPT_SCHEMA_VERSION = 2 as const;
export const EXECUTION_RECEIPT_KIND = "execution_receipt" as const;
export const EXECUTION_RECEIPT_OBSERVER = "agentplane" as const;
export const EXECUTION_RECEIPT_PROVENANCE = "supervisor_observed" as const;
export const EXECUTION_RECEIPT_PROCESS_OUTCOME_VALUES = [
  "exited",
  "signaled",
  "timed_out",
  "cancelled",
  "supervisor_error",
] as const;
const EXECUTION_RECEIPT_PROCESS_TREE_SCOPE_VALUES = [
  "posix_process_group",
  "direct_child_only",
] as const;
const EXECUTION_RECEIPT_PROCESS_TREE_CLEANUP_STATE_VALUES = [
  "not_needed",
  "terminated",
  "force_killed",
  "unsupported",
  "failed",
] as const;
const EXECUTION_RECEIPT_PROCESS_CONTAINMENT_STATE_VALUES = ["bounded", "limited"] as const;
export const EXECUTION_RECEIPT_GIT_STATE_VALUES = ["observed", "unavailable"] as const;
export const EXECUTION_RECEIPT_GIT_CHANGE_VALUES = [
  "added",
  "modified",
  "deleted",
  "renamed",
  "type_changed",
] as const;
export const EXECUTION_RECEIPT_ARTIFACT_STATE_VALUES = [
  "present",
  "missing",
  "unsupported",
] as const;
export const EXECUTION_RECEIPT_CHECK_STATUS_VALUES = ["passed", "failed", "not_run"] as const;
export const EXECUTION_RECEIPT_COLLECTION_STATUS_VALUES = ["complete", "partial"] as const;
export const EXECUTION_RECEIPT_SUCCESS_POLICY_OUTCOME_VALUES = [
  "observed_success",
  "rejected",
  "unverified",
] as const;
const EXECUTION_RECEIPT_SANDBOX_VALUES = [
  "read-only",
  "workspace-write",
  "danger-full-access",
] as const;
const EXECUTION_RECEIPT_DANGER_SANDBOX = EXECUTION_RECEIPT_SANDBOX_VALUES[2];

const SHA256_DIGEST_SCHEMA = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const GIT_OID_SCHEMA = z.string().regex(/^[0-9a-f]{7,64}$/u);
const NON_NEGATIVE_INTEGER = z.number().int().min(0);
const PROCESS_SIGNAL_SCHEMA = z
  .string()
  .regex(/^SIG[A-Z0-9]+$/u)
  .nullable();
const TIMEOUT_REASON_SCHEMA = z.enum(["idle", "wall_clock"]).nullable();
const EXECUTION_RECEIPT_SANDBOX_ZOD_SCHEMA = z.enum(EXECUTION_RECEIPT_SANDBOX_VALUES);

const SUPERVISOR_PROVENANCE_SHAPE = {
  provenance: z.literal(EXECUTION_RECEIPT_PROVENANCE),
} as const;

const EXECUTION_RECEIPT_PROCESS_METRICS_ZOD_SCHEMA = z
  .object({
    duration_ms: NON_NEGATIVE_INTEGER,
    stdout_bytes: NON_NEGATIVE_INTEGER,
    stderr_bytes: NON_NEGATIVE_INTEGER,
    output_last_message_bytes: NON_NEGATIVE_INTEGER.nullable().optional(),
  })
  .strict();

const EXECUTION_RECEIPT_PROCESS_TREE_ZOD_SCHEMA = z
  .object({
    scope: z.enum(EXECUTION_RECEIPT_PROCESS_TREE_SCOPE_VALUES),
    group_id: z.number().int().positive().nullable(),
    cleanup_state: z.enum(EXECUTION_RECEIPT_PROCESS_TREE_CLEANUP_STATE_VALUES),
    terminate_sent_at: ISO_UTC_TIMESTAMP.nullable(),
    kill_sent_at: ISO_UTC_TIMESTAMP.nullable(),
    completed_at: ISO_UTC_TIMESTAMP,
    residual_alive: z.boolean().nullable(),
    error: NON_EMPTY_STRING.nullable(),
    containment_state: z.enum(EXECUTION_RECEIPT_PROCESS_CONTAINMENT_STATE_VALUES),
    containment_limitation: NON_EMPTY_STRING.nullable(),
  })
  .strict()
  .superRefine((observation, ctx) => {
    if (
      (observation.containment_state === "bounded" &&
        observation.containment_limitation !== null) ||
      (observation.containment_state === "limited" && observation.containment_limitation === null)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["containment_limitation"],
        message:
          "bounded containment requires no limitation; limited containment requires an explanation",
      });
    }
    if (observation.scope === "direct_child_only") {
      if (observation.containment_state !== "limited") {
        ctx.addIssue({
          code: "custom",
          path: ["containment_state"],
          message: "direct_child_only supervision cannot claim bounded containment",
        });
      }
      if (observation.group_id !== null) {
        ctx.addIssue({
          code: "custom",
          path: ["group_id"],
          message: "direct_child_only cleanup cannot claim a process-group id",
        });
      }
      if (observation.cleanup_state === "unsupported") {
        if (
          observation.terminate_sent_at !== null ||
          observation.kill_sent_at !== null ||
          observation.residual_alive !== null
        ) {
          ctx.addIssue({
            code: "custom",
            message: "unsupported direct-child cleanup cannot claim cleanup observations",
          });
        }
        if (observation.error === null) {
          ctx.addIssue({
            code: "custom",
            path: ["error"],
            message: "unsupported direct-child cleanup requires an explanation",
          });
        }
        return;
      }
      switch (observation.cleanup_state) {
        case "not_needed": {
          if (observation.terminate_sent_at !== null || observation.kill_sent_at !== null) {
            ctx.addIssue({
              code: "custom",
              message: "not_needed direct-child cleanup cannot include signal timestamps",
            });
          }
          break;
        }
        case "terminated": {
          if (observation.terminate_sent_at === null || observation.kill_sent_at !== null) {
            ctx.addIssue({
              code: "custom",
              message: "terminated direct-child cleanup requires only terminate_sent_at",
            });
          }
          break;
        }
        case "force_killed": {
          if (observation.terminate_sent_at === null || observation.kill_sent_at === null) {
            ctx.addIssue({
              code: "custom",
              message: "force_killed direct-child cleanup requires both signal timestamps",
            });
          }
          break;
        }
        case "failed": {
          if (observation.error === null) {
            ctx.addIssue({
              code: "custom",
              path: ["error"],
              message: "failed direct-child cleanup requires an error",
            });
          }
          break;
        }
      }
      if (
        observation.cleanup_state !== "failed" &&
        (observation.residual_alive !== false || observation.error !== null)
      ) {
        ctx.addIssue({
          code: "custom",
          message: "successful direct-child cleanup requires no direct-child residual or error",
        });
      }
      return;
    }

    if (observation.cleanup_state === "unsupported") {
      ctx.addIssue({
        code: "custom",
        path: ["cleanup_state"],
        message: "POSIX process-group cleanup cannot be unsupported",
      });
    }
    if (observation.group_id === null && observation.cleanup_state !== "failed") {
      ctx.addIssue({
        code: "custom",
        path: ["group_id"],
        message: "successful POSIX process-group cleanup requires group_id",
      });
    }
    if (
      observation.cleanup_state === "not_needed" &&
      (observation.terminate_sent_at !== null || observation.kill_sent_at !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "not_needed cleanup cannot include signal timestamps",
      });
    }
    if (
      observation.cleanup_state === "terminated" &&
      (observation.terminate_sent_at === null || observation.kill_sent_at !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "terminated cleanup requires only terminate_sent_at",
      });
    }
    if (
      observation.cleanup_state === "force_killed" &&
      (observation.terminate_sent_at === null || observation.kill_sent_at === null)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "force_killed cleanup requires both signal timestamps",
      });
    }
    if (
      observation.cleanup_state !== "failed" &&
      (observation.residual_alive !== false || observation.error !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "successful process-group cleanup requires no residual process and no error",
      });
    }
    if (observation.cleanup_state === "failed" && observation.error === null) {
      ctx.addIssue({
        code: "custom",
        path: ["error"],
        message: "failed process-group cleanup requires an error",
      });
    }
  });

const EXECUTION_RECEIPT_PROCESS_OBSERVATION_ZOD_SCHEMA = z
  .object({
    ...SUPERVISOR_PROVENANCE_SHAPE,
    outcome: z.enum(EXECUTION_RECEIPT_PROCESS_OUTCOME_VALUES),
    started_at: ISO_UTC_TIMESTAMP,
    ended_at: ISO_UTC_TIMESTAMP,
    exit_code: z.number().int().nullable(),
    exit_signal: PROCESS_SIGNAL_SCHEMA,
    timeout_reason: TIMEOUT_REASON_SCHEMA,
    process_tree: EXECUTION_RECEIPT_PROCESS_TREE_ZOD_SCHEMA,
    capabilities_invoked: z.array(NON_EMPTY_STRING),
    metrics: EXECUTION_RECEIPT_PROCESS_METRICS_ZOD_SCHEMA,
  })
  .strict();

const EXECUTION_RECEIPT_GIT_SNAPSHOT_ZOD_SCHEMA = z
  .object({
    head_commit: GIT_OID_SCHEMA.nullable(),
    snapshot_sha256: SHA256_DIGEST_SCHEMA,
    dirty_paths: z.array(NON_EMPTY_STRING),
  })
  .strict();

const EXECUTION_RECEIPT_GIT_DELTA_ENTRY_ZOD_SCHEMA = z
  .object({
    path: NON_EMPTY_STRING,
    change: z.enum(EXECUTION_RECEIPT_GIT_CHANGE_VALUES),
    before_sha256: SHA256_DIGEST_SCHEMA.nullable(),
    after_sha256: SHA256_DIGEST_SCHEMA.nullable(),
  })
  .strict();

const EXECUTION_RECEIPT_GIT_DELTA_ZOD_SCHEMA = z
  .object({
    changed_paths: z.array(NON_EMPTY_STRING),
    entries: z.array(EXECUTION_RECEIPT_GIT_DELTA_ENTRY_ZOD_SCHEMA),
    sha256: SHA256_DIGEST_SCHEMA,
  })
  .strict();

const EXECUTION_RECEIPT_GIT_OBSERVATION_ZOD_SCHEMA = z.discriminatedUnion("state", [
  z
    .object({
      ...SUPERVISOR_PROVENANCE_SHAPE,
      state: z.literal("observed"),
      before: EXECUTION_RECEIPT_GIT_SNAPSHOT_ZOD_SCHEMA,
      after: EXECUTION_RECEIPT_GIT_SNAPSHOT_ZOD_SCHEMA,
      delta: EXECUTION_RECEIPT_GIT_DELTA_ZOD_SCHEMA,
      excluded_paths: z.array(NON_EMPTY_STRING),
    })
    .strict(),
  z
    .object({
      ...SUPERVISOR_PROVENANCE_SHAPE,
      state: z.literal("unavailable"),
      before: z.null(),
      after: z.null(),
      delta: z.null(),
      excluded_paths: z.array(NON_EMPTY_STRING),
    })
    .strict(),
]);

const EXECUTION_RECEIPT_ARTIFACT_OBSERVATION_ZOD_SCHEMA = z.discriminatedUnion("state", [
  z
    .object({
      ...SUPERVISOR_PROVENANCE_SHAPE,
      path: NON_EMPTY_STRING,
      label: NON_EMPTY_STRING.optional(),
      required: z.boolean(),
      state: z.literal("present"),
      bytes: NON_NEGATIVE_INTEGER,
      sha256: SHA256_DIGEST_SCHEMA,
    })
    .strict(),
  z
    .object({
      ...SUPERVISOR_PROVENANCE_SHAPE,
      path: NON_EMPTY_STRING,
      label: NON_EMPTY_STRING.optional(),
      required: z.boolean(),
      state: z.enum(["missing", "unsupported"]),
      bytes: z.null(),
      sha256: z.null(),
    })
    .strict(),
]);

const EXECUTION_RECEIPT_OBSERVED_CHECK_ZOD_SCHEMA = z
  .object({
    ...SUPERVISOR_PROVENANCE_SHAPE,
    id: NON_EMPTY_STRING,
    required: z.boolean(),
    status: z.enum(EXECUTION_RECEIPT_CHECK_STATUS_VALUES),
    exit_code: z.number().int().nullable().optional(),
    duration_ms: NON_NEGATIVE_INTEGER.optional(),
    details: NON_EMPTY_STRING.optional(),
  })
  .strict();

const EXECUTION_RECEIPT_COLLECTION_ZOD_SCHEMA = z.discriminatedUnion("status", [
  z
    .object({
      ...SUPERVISOR_PROVENANCE_SHAPE,
      status: z.literal("complete"),
      errors: z.array(NON_EMPTY_STRING).length(0),
    })
    .strict(),
  z
    .object({
      ...SUPERVISOR_PROVENANCE_SHAPE,
      status: z.literal("partial"),
      errors: z.array(NON_EMPTY_STRING).min(1),
    })
    .strict(),
]);

const EXECUTION_RECEIPT_SANDBOX_AUTHORITY_ZOD_SCHEMA = z
  .object({
    danger_full_access_authorized: z.boolean(),
    provenance: z.literal("explicit_operator").nullable(),
    source: NON_EMPTY_STRING.nullable(),
  })
  .strict();

const EXECUTION_RECEIPT_SANDBOX_POLICY_ZOD_SCHEMA = z
  .object({
    requested: EXECUTION_RECEIPT_SANDBOX_ZOD_SCHEMA,
    effective: EXECUTION_RECEIPT_SANDBOX_ZOD_SCHEMA.nullable(),
    source: z.enum(["role_default", "recipe_run_profile", "cli_override"]),
    role: NON_EMPTY_STRING,
    enforcement: z.enum(["enforced", "advisory", "unsupported"]),
    capability_level: z.enum(["native", "wrapper", "advisory", "unsupported"]),
    channel: z.enum(["argv", "env", "result", "none"]),
    authority: EXECUTION_RECEIPT_SANDBOX_AUTHORITY_ZOD_SCHEMA,
  })
  .strict()
  .superRefine((sandbox, ctx) => {
    const dangerRequested = sandbox.requested === EXECUTION_RECEIPT_DANGER_SANDBOX;
    if (
      dangerRequested &&
      (sandbox.authority.danger_full_access_authorized !== true ||
        sandbox.authority.provenance !== "explicit_operator" ||
        sandbox.authority.source === null)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["authority"],
        message: "danger sandbox requires explicit operator authority provenance",
      });
    }
    if (
      !dangerRequested &&
      (sandbox.authority.danger_full_access_authorized ||
        sandbox.authority.provenance !== null ||
        sandbox.authority.source !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["authority"],
        message: "non-danger sandbox cannot claim danger authority",
      });
    }
    if (
      (sandbox.enforcement === "enforced" && sandbox.effective !== sandbox.requested) ||
      (sandbox.enforcement !== "enforced" && sandbox.effective !== null)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["effective"],
        message:
          "enforced sandbox must record the requested effective value; downgrade must record null",
      });
    }
  });

const EXECUTION_RECEIPT_SCOPE_VIOLATION_ZOD_SCHEMA = z
  .object({
    path: NON_EMPTY_STRING,
    kind: z.enum(["out_of_scope", "protected_path"]),
  })
  .strict();

const EXECUTION_RECEIPT_SCOPE_COMMON_SHAPE = {
  ...SUPERVISOR_PROVENANCE_SHAPE,
  sandbox: EXECUTION_RECEIPT_SANDBOX_POLICY_ZOD_SCHEMA,
  mutation_scope: NON_EMPTY_STRING.nullable(),
  writable_roots: z.array(NON_EMPTY_STRING),
  protected_paths: z.array(NON_EMPTY_STRING),
} as const;

const EXECUTION_RECEIPT_SCOPE_EVALUATION_ZOD_SCHEMA = z.discriminatedUnion("state", [
  z
    .object({
      ...SUPERVISOR_PROVENANCE_SHAPE,
      state: z.literal("not_evaluated"),
    })
    .strict(),
  z
    .object({
      ...EXECUTION_RECEIPT_SCOPE_COMMON_SHAPE,
      state: z.literal("passed"),
      violations: z.array(EXECUTION_RECEIPT_SCOPE_VIOLATION_ZOD_SCHEMA).length(0),
      limitations: z.array(NON_EMPTY_STRING).length(0),
    })
    .strict(),
  z
    .object({
      ...EXECUTION_RECEIPT_SCOPE_COMMON_SHAPE,
      state: z.literal("rejected"),
      violations: z.array(EXECUTION_RECEIPT_SCOPE_VIOLATION_ZOD_SCHEMA).min(1),
      limitations: z.array(NON_EMPTY_STRING),
    })
    .strict(),
  z
    .object({
      ...EXECUTION_RECEIPT_SCOPE_COMMON_SHAPE,
      state: z.literal("unverified"),
      violations: z.array(EXECUTION_RECEIPT_SCOPE_VIOLATION_ZOD_SCHEMA).length(0),
      limitations: z.array(NON_EMPTY_STRING).min(1),
    })
    .strict(),
]);

const EXECUTION_RECEIPT_LEGACY_SCOPE_EVALUATION_ZOD_SCHEMA = z
  .object({
    ...SUPERVISOR_PROVENANCE_SHAPE,
    state: z.literal("not_evaluated"),
  })
  .strict();

const EXECUTION_RECEIPT_SUCCESS_POLICY_ZOD_SCHEMA = z.discriminatedUnion("outcome", [
  z
    .object({
      ...SUPERVISOR_PROVENANCE_SHAPE,
      outcome: z.literal("observed_success"),
      reasons: z.array(NON_EMPTY_STRING).length(0),
    })
    .strict(),
  z
    .object({
      ...SUPERVISOR_PROVENANCE_SHAPE,
      outcome: z.enum(["rejected", "unverified"]),
      reasons: z.array(NON_EMPTY_STRING).min(1),
    })
    .strict(),
]);

const EXECUTION_RECEIPT_COMMON_SHAPE = {
  kind: z.literal(EXECUTION_RECEIPT_KIND),
  observed_by: z.literal(EXECUTION_RECEIPT_OBSERVER),
  run_id: NON_EMPTY_STRING,
  work_order_id: NON_EMPTY_STRING,
  process: EXECUTION_RECEIPT_PROCESS_OBSERVATION_ZOD_SCHEMA,
  git: EXECUTION_RECEIPT_GIT_OBSERVATION_ZOD_SCHEMA,
  artifacts: z.array(EXECUTION_RECEIPT_ARTIFACT_OBSERVATION_ZOD_SCHEMA),
  checks: z.array(EXECUTION_RECEIPT_OBSERVED_CHECK_ZOD_SCHEMA),
  collection: EXECUTION_RECEIPT_COLLECTION_ZOD_SCHEMA,
  success_policy: EXECUTION_RECEIPT_SUCCESS_POLICY_ZOD_SCHEMA,
} as const;

export const EXECUTION_RECEIPT_V1_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(EXECUTION_RECEIPT_LEGACY_SCHEMA_VERSION),
    ...EXECUTION_RECEIPT_COMMON_SHAPE,
    scope_evaluation: EXECUTION_RECEIPT_LEGACY_SCOPE_EVALUATION_ZOD_SCHEMA,
  })
  .strict();

export const EXECUTION_RECEIPT_V2_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(EXECUTION_RECEIPT_SCHEMA_VERSION),
    ...EXECUTION_RECEIPT_COMMON_SHAPE,
    scope_evaluation: EXECUTION_RECEIPT_SCOPE_EVALUATION_ZOD_SCHEMA,
  })
  .strict();

export const EXECUTION_RECEIPT_ZOD_SCHEMA = z
  .discriminatedUnion("schema_version", [
    EXECUTION_RECEIPT_V1_ZOD_SCHEMA,
    EXECUTION_RECEIPT_V2_ZOD_SCHEMA,
  ])
  .superRefine((receipt, ctx) => {
    if (Date.parse(receipt.process.ended_at) < Date.parse(receipt.process.started_at)) {
      ctx.addIssue({
        code: "custom",
        path: ["process", "ended_at"],
        message: "ended_at must not precede started_at",
      });
    }
    if (
      Date.parse(receipt.process.process_tree.completed_at) <
        Date.parse(receipt.process.started_at) ||
      Date.parse(receipt.process.process_tree.completed_at) > Date.parse(receipt.process.ended_at)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["process", "process_tree", "completed_at"],
        message: "process-group cleanup must complete during the observed process interval",
      });
    }
    if (receipt.process.outcome === "exited" && receipt.process.exit_code === null) {
      ctx.addIssue({
        code: "custom",
        path: ["process", "exit_code"],
        message: "exit_code is required when process outcome is exited",
      });
    }
    if (receipt.process.outcome === "exited" && receipt.process.timeout_reason !== null) {
      ctx.addIssue({
        code: "custom",
        path: ["process", "timeout_reason"],
        message: "timeout_reason must be null when process outcome is exited",
      });
    }
    if (receipt.process.outcome === "signaled" && receipt.process.exit_signal === null) {
      ctx.addIssue({
        code: "custom",
        path: ["process", "exit_signal"],
        message: "exit_signal is required when process outcome is signaled",
      });
    }
    if (receipt.process.outcome === "timed_out" && receipt.process.timeout_reason === null) {
      ctx.addIssue({
        code: "custom",
        path: ["process", "timeout_reason"],
        message: "timeout_reason is required when process outcome is timed_out",
      });
    }
    if (
      receipt.schema_version === EXECUTION_RECEIPT_SCHEMA_VERSION &&
      receipt.scope_evaluation.state === "passed"
    ) {
      const sandbox = receipt.scope_evaluation.sandbox;
      const sandboxIsEnforced =
        sandbox.enforcement === "enforced" &&
        (sandbox.capability_level === "native" || sandbox.capability_level === "wrapper") &&
        sandbox.channel !== "none" &&
        sandbox.effective === sandbox.requested;
      if (!sandboxIsEnforced) {
        ctx.addIssue({
          code: "custom",
          path: ["scope_evaluation", "state"],
          message: "passed scope evaluation requires a coherent native or wrapper enforced sandbox",
        });
      }
      if (sandbox.requested === EXECUTION_RECEIPT_DANGER_SANDBOX) {
        ctx.addIssue({
          code: "custom",
          path: ["scope_evaluation", "state"],
          message: "danger-full-access sandbox cannot produce a passed scope evaluation",
        });
      }
    }
    if (receipt.success_policy.outcome !== "observed_success") return;
    if (
      receipt.process.outcome !== "exited" ||
      receipt.process.exit_code !== 0 ||
      receipt.process.exit_signal !== null ||
      receipt.process.timeout_reason !== null
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["success_policy", "outcome"],
        message: "observed_success requires a clean observed process exit",
      });
    }
    if (receipt.git.state !== "observed" || receipt.collection.status !== "complete") {
      ctx.addIssue({
        code: "custom",
        path: ["success_policy", "outcome"],
        message: "observed_success requires complete Git and collection observations",
      });
    }
    if (
      receipt.schema_version === EXECUTION_RECEIPT_SCHEMA_VERSION &&
      receipt.scope_evaluation.state !== "passed"
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["success_policy", "outcome"],
        message: "observed_success requires a passed supervisor-owned scope evaluation",
      });
    }
    if (
      receipt.artifacts.some((artifact) => artifact.required && artifact.state !== "present") ||
      receipt.checks.some((check) => check.required && check.status !== "passed")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["success_policy", "outcome"],
        message: "observed_success requires every required artifact and check to pass",
      });
    }
    const containmentCheck = receipt.checks.find(
      (check) => check.id === "runner.process_containment",
    );
    const processGroupCleanupCheck = receipt.checks.find(
      (check) => check.id === "runner.process_group_cleanup",
    );
    const filesystemEffectCheck = receipt.checks.find(
      (check) => check.id === "runner.sandbox.filesystem_effects_enforced",
    );
    const boundedProcessContainment =
      receipt.process.process_tree.scope === "posix_process_group" &&
      ["not_needed", "terminated", "force_killed"].includes(
        receipt.process.process_tree.cleanup_state,
      ) &&
      receipt.process.process_tree.residual_alive === false &&
      receipt.process.process_tree.containment_state === "bounded" &&
      containmentCheck?.required === true &&
      containmentCheck.status === "passed";
    const processCleanupCompatibleWithFilesystemEffects =
      (receipt.process.process_tree.scope === "posix_process_group" &&
        ["not_needed", "terminated", "force_killed"].includes(
          receipt.process.process_tree.cleanup_state,
        ) &&
        receipt.process.process_tree.residual_alive === false) ||
      (receipt.process.process_tree.scope === "direct_child_only" &&
        receipt.process.process_tree.group_id === null &&
        ((receipt.process.process_tree.cleanup_state === "unsupported" &&
          receipt.process.process_tree.residual_alive === null) ||
          (["not_needed", "terminated", "force_killed"].includes(
            receipt.process.process_tree.cleanup_state,
          ) &&
            receipt.process.process_tree.residual_alive === false &&
            receipt.process.process_tree.error === null)) &&
        processGroupCleanupCheck?.required === false &&
        processGroupCleanupCheck.status === "not_run");
    const sandboxFilesystemEffectsContained =
      receipt.schema_version === EXECUTION_RECEIPT_SCHEMA_VERSION &&
      processCleanupCompatibleWithFilesystemEffects &&
      filesystemEffectCheck?.required === true &&
      filesystemEffectCheck.status === "passed" &&
      receipt.scope_evaluation.state === "passed" &&
      receipt.scope_evaluation.sandbox.enforcement === "enforced" &&
      receipt.scope_evaluation.sandbox.capability_level === "native" &&
      receipt.scope_evaluation.sandbox.effective === receipt.scope_evaluation.sandbox.requested &&
      receipt.scope_evaluation.sandbox.requested === "read-only" &&
      receipt.scope_evaluation.mutation_scope === "none" &&
      receipt.scope_evaluation.writable_roots.length === 0;
    if (!boundedProcessContainment && !sandboxFilesystemEffectsContained) {
      ctx.addIssue({
        code: "custom",
        path: ["success_policy", "outcome"],
        message:
          "observed_success requires either bounded process containment or a passed required native sandbox filesystem-effect containment check",
      });
    }
    const scopeCheck = receipt.checks.find((check) => check.id === "runner.scope.within_authority");
    if (
      receipt.schema_version === EXECUTION_RECEIPT_SCHEMA_VERSION &&
      (scopeCheck?.required !== true || scopeCheck.status !== "passed")
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["success_policy", "outcome"],
        message: "observed_success requires a passed required runner.scope.within_authority check",
      });
    }
  });

export type ExecutionReceiptV1 = z.infer<typeof EXECUTION_RECEIPT_V1_ZOD_SCHEMA>;
export type ExecutionReceiptV2 = z.infer<typeof EXECUTION_RECEIPT_V2_ZOD_SCHEMA>;
export type ExecutionReceipt = z.infer<typeof EXECUTION_RECEIPT_ZOD_SCHEMA>;
export type ExecutionReceiptProcessObservation = z.infer<
  typeof EXECUTION_RECEIPT_PROCESS_OBSERVATION_ZOD_SCHEMA
>;
export type ExecutionReceiptGitSnapshot = z.infer<typeof EXECUTION_RECEIPT_GIT_SNAPSHOT_ZOD_SCHEMA>;
export type ExecutionReceiptGitDeltaEntry = z.infer<
  typeof EXECUTION_RECEIPT_GIT_DELTA_ENTRY_ZOD_SCHEMA
>;
export type ExecutionReceiptGitDelta = z.infer<typeof EXECUTION_RECEIPT_GIT_DELTA_ZOD_SCHEMA>;
export type ExecutionReceiptGitObservation = z.infer<
  typeof EXECUTION_RECEIPT_GIT_OBSERVATION_ZOD_SCHEMA
>;
export type ExecutionReceiptArtifactObservation = z.infer<
  typeof EXECUTION_RECEIPT_ARTIFACT_OBSERVATION_ZOD_SCHEMA
>;
export type ExecutionReceiptObservedCheck = z.infer<
  typeof EXECUTION_RECEIPT_OBSERVED_CHECK_ZOD_SCHEMA
>;
export type ExecutionReceiptCollection = z.infer<typeof EXECUTION_RECEIPT_COLLECTION_ZOD_SCHEMA>;
export type ExecutionReceiptScopeEvaluation = z.infer<
  typeof EXECUTION_RECEIPT_SCOPE_EVALUATION_ZOD_SCHEMA
>;
export type ExecutionReceiptSuccessPolicy = z.infer<
  typeof EXECUTION_RECEIPT_SUCCESS_POLICY_ZOD_SCHEMA
>;

const EXECUTION_RECEIPT_SCHEMA = buildJsonSchemaDocument(EXECUTION_RECEIPT_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/execution-receipt.schema.json",
  title: "Execution receipt (v1-v2)",
  description:
    "Supervisor-owned process, Git, artifact, check, collection, and success-policy observations for one agent execution.",
});

const SHA_A = `sha256:${"1".repeat(64)}`;
const SHA_B = `sha256:${"2".repeat(64)}`;
const SHA_C = `sha256:${"3".repeat(64)}`;
const SHA_D = `sha256:${"4".repeat(64)}`;

export const EXECUTION_RECEIPT_V2_VALID_FIXTURE = {
  schema_version: EXECUTION_RECEIPT_SCHEMA_VERSION,
  kind: EXECUTION_RECEIPT_KIND,
  observed_by: EXECUTION_RECEIPT_OBSERVER,
  run_id: "run-example-001",
  work_order_id: "work-order-example-001",
  process: {
    provenance: EXECUTION_RECEIPT_PROVENANCE,
    outcome: "exited",
    started_at: "2026-07-23T10:00:00.000Z",
    ended_at: "2026-07-23T10:00:01.250Z",
    exit_code: 0,
    exit_signal: null,
    timeout_reason: null,
    process_tree: {
      scope: "posix_process_group",
      group_id: 4242,
      cleanup_state: "not_needed",
      terminate_sent_at: null,
      kill_sent_at: null,
      completed_at: "2026-07-23T10:00:01.250Z",
      residual_alive: false,
      error: null,
      containment_state: "bounded",
      containment_limitation: null,
    },
    capabilities_invoked: ["codex.exec"],
    metrics: {
      duration_ms: 1250,
      stdout_bytes: 96,
      stderr_bytes: 0,
      output_last_message_bytes: 64,
    },
  },
  git: {
    provenance: EXECUTION_RECEIPT_PROVENANCE,
    state: "observed",
    before: {
      head_commit: "1111111111111111111111111111111111111111",
      snapshot_sha256: SHA_A,
      dirty_paths: ["pre-existing.txt"],
    },
    after: {
      head_commit: "1111111111111111111111111111111111111111",
      snapshot_sha256: SHA_B,
      dirty_paths: ["packages/core/src/runner/execution-receipt.ts", "pre-existing.txt"],
    },
    delta: {
      changed_paths: ["packages/core/src/runner/execution-receipt.ts"],
      entries: [
        {
          path: "packages/core/src/runner/execution-receipt.ts",
          change: "added",
          before_sha256: null,
          after_sha256: SHA_C,
        },
      ],
      sha256: SHA_D,
    },
    excluded_paths: [],
  },
  artifacts: [
    {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      path: "/repo/.git/agentplane/runner/tasks/work-order-example-001/runs/run-example-001/result.source.json",
      label: "source-result-manifest",
      required: true,
      state: "present",
      bytes: 384,
      sha256: SHA_C,
    },
  ],
  checks: [
    {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      id: "runner.process_containment",
      required: true,
      status: "passed",
      details: "The supervisor used bounded descendant containment.",
    },
    {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      id: "runner.manifest.valid",
      required: true,
      status: "passed",
      exit_code: 0,
      duration_ms: 4,
      details: "The supervisor parsed the source manifest with the canonical schema.",
    },
    {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      id: "runner.scope.within_authority",
      required: true,
      status: "passed",
      details: "Observed writes remained inside the declared writable scope.",
    },
  ],
  collection: {
    provenance: EXECUTION_RECEIPT_PROVENANCE,
    status: "complete",
    errors: [],
  },
  scope_evaluation: {
    provenance: EXECUTION_RECEIPT_PROVENANCE,
    state: "passed",
    sandbox: {
      requested: "workspace-write",
      effective: "workspace-write",
      source: "role_default",
      role: "CODER",
      enforcement: "enforced",
      capability_level: "native",
      channel: "argv",
      authority: {
        danger_full_access_authorized: false,
        provenance: null,
        source: null,
      },
    },
    mutation_scope: "code",
    writable_roots: ["."],
    protected_paths: [".agentplane/policy", "AGENTS.md"],
    violations: [],
    limitations: [],
  },
  success_policy: {
    provenance: EXECUTION_RECEIPT_PROVENANCE,
    outcome: "observed_success",
    reasons: [],
  },
} as const satisfies ExecutionReceiptV2;

export const EXECUTION_RECEIPT_V1_VALID_FIXTURE = {
  ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
  schema_version: EXECUTION_RECEIPT_LEGACY_SCHEMA_VERSION,
  checks: EXECUTION_RECEIPT_V2_VALID_FIXTURE.checks.filter(
    (check) => check.id !== "runner.scope.within_authority",
  ),
  scope_evaluation: {
    provenance: EXECUTION_RECEIPT_PROVENANCE,
    state: "not_evaluated",
  },
} as const satisfies ExecutionReceiptV1;

export function listExecutionReceiptSchemaErrors(value: unknown): string[] {
  return schemaErrors("execution receipt", EXECUTION_RECEIPT_ZOD_SCHEMA, value);
}

export function validateExecutionReceipt(value: unknown): ExecutionReceipt {
  return assertValid("execution receipt", EXECUTION_RECEIPT_ZOD_SCHEMA, value);
}

export function renderExecutionReceiptSchemaJson(): string {
  return `${JSON.stringify(EXECUTION_RECEIPT_SCHEMA, null, 2)}\n`;
}

export function renderExecutionReceiptV2ValidFixtureJson(): string {
  return `${JSON.stringify(EXECUTION_RECEIPT_V2_VALID_FIXTURE, null, 2)}\n`;
}

export function renderExecutionReceiptV1ValidFixtureJson(): string {
  return `${JSON.stringify(EXECUTION_RECEIPT_V1_VALID_FIXTURE, null, 2)}\n`;
}
