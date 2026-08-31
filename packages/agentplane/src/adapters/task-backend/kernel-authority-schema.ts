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
    expires_at: z.iso.datetime().nullable(),
  })
  .refine((authority) => authority.digest === k.authorityDigest(authority), "authority_digest");

export const kernelAuthorityRecordSchema = z.strictObject({
  authority: kernelAuthoritySchema,
  approval_mode: z
    .enum(["manual_operator", "signed_user_receipt", "host_user_decision"])
    .nullable(),
  observation: z
    .strictObject({
      kind: z.enum(["plan_amendment", "repository_implementation"]),
      evidence_digest: digest,
      previous_fingerprint: digest,
      changed_paths: strings,
    })
    .nullable(),
});
