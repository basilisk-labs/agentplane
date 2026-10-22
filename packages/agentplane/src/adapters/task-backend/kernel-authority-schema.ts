import { isoTimestampSchema } from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { z } from "zod";

const digest = z
  .string()
  .regex(/^sha256:[0-9a-f]{64}$/u)
  .transform((value) => value as k.Sha256Digest);
const strings = z.array(z.string().min(1));
export const kernelAuthoritySchema = z
  .strictObject({
    digest,
    task_id: z.string().min(1),
    plan_revision: z.number().int().nonnegative(),
    plan_digest: digest,
    work_item_id: z.string().min(1).nullable(),
    repository_identity: digest,
    repository_fingerprint: digest,
    scope_roots: strings,
    repository_effects: strings,
    external_effects: strings,
    capabilities: strings,
    resources: strings,
    validation_requirements: strings,
    policy_digests: z.array(digest),
    completion_requirements: strings,
    risk: z.strictObject({
      requirements: z.enum(["bounded", "material"]),
      implementation: z.enum(["bounded", "material"]),
      reversibility: z.enum(["reversible", "recovery_required", "irreversible"]),
    }),
    provenance: z.strictObject({
      kind: z.enum(["USER", "DELEGATED", "SYSTEM"]),
      actor_id: z.string().min(1),
      evidence_digest: digest,
      parent_authority_digest: digest.nullable(),
    }),
    expires_at: isoTimestampSchema().nullable(),
  })
  .refine((authority) => authority.digest === k.authorityDigest(authority), "authority_digest");

export const kernelAuthorityRecordSchema = z.strictObject({
  authority: kernelAuthoritySchema,
  approval_mode: z
    .enum(["manual_operator", "signed_user_receipt", "host_user_decision", "repository_policy"])
    .nullable(),
  observation: z
    .strictObject({
      kind: z.enum([
        "plan_amendment",
        "repository_implementation",
        "worktree_preparation",
        "authority_delta",
        "prospective_scope_request",
        "policy_renewal",
      ]),
      evidence_digest: digest,
      previous_fingerprint: digest,
      changed_paths: strings,
      request_digest: digest.optional(),
      added_scope_roots: strings.optional(),
      added_repository_effects: strings.optional(),
      request_task_revision: z.number().int().nonnegative().optional(),
      repository_evidence_digest: digest.optional(),
      scope_request: z
        .strictObject({
          task_id: z.string().min(1),
          record_digest: digest,
          task_revision: z.number().int().nonnegative(),
          plan_revision: z.number().int().nonnegative(),
          plan_digest: digest,
          work_item_id: z.string().min(1),
          attempt: z.number().int().positive(),
          claim_id: digest,
          contract_digest: digest,
          work_order_id: digest,
          result_digest: digest,
          stop_receipt_digest: digest,
          result_authentication: z.enum(["native_stop_receipt", "legacy_current_retained_content"]),
          parent_authority_digest: digest,
          repository_fingerprint: digest,
          intake_before_digest: digest,
          intake_after_digest: digest,
          scope_roots: strings,
          repository_effects: strings,
        })
        .optional(),
      reviewed_base_import: z
        .strictObject({
          old_commit: z.string().regex(/^[a-f0-9]{40}$/u),
          new_commit: z.string().regex(/^[a-f0-9]{40}$/u),
          work_order_digest: digest,
          checkpoint_digest: digest,
          canonical_record_digest: digest,
          mutation_receipt_digest: digest,
          overlay_digest: digest,
          imported_paths: strings,
        })
        .optional(),
    })
    .nullable(),
});
