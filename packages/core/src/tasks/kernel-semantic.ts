import { z } from "zod";

const text = z.string().trim().min(1);
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const safeId = text.refine((value) => !["__proto__", "constructor", "prototype"].includes(value));
const root = text.refine(
  (value) =>
    value === "." ||
    (!value.startsWith("/") &&
      !value.includes("\\") &&
      !value.split("/").some((part) => part === ".." || part === "." || !part)),
);

export const kernelIntentSchema = z.strictObject({ objective: text, context: text });
export const kernelWorkContractSchema = z.strictObject({
  objective: text,
  acceptance_criteria: z.array(text).min(1),
  verification_commands: z.array(text),
  role: z.enum(["PLANNER", "CURATOR", "EXECUTOR", "EVALUATOR"]),
});
const kernelExecutionRequirementsSchema = z.strictObject({
  scope_roots: z.array(root),
  repository_effects: z.array(text),
  external_effects: z.array(text),
  capabilities: z.array(text),
  resources: z.array(text),
});
export const kernelPlanProposalSchema = z.strictObject({
  work_items: z
    .array(
      z.strictObject({
        id: safeId,
        depends_on: z.array(safeId),
        required_inputs: z.array(safeId),
        expected_outputs: z.array(safeId).min(1),
        execution_requirements: kernelExecutionRequirementsSchema,
        optional: z.boolean(),
        contract: kernelWorkContractSchema,
      }),
    )
    .min(1),
});
const commonBinding = {
  task_id: text,
  repository_identity: digest,
  repository_fingerprint: digest,
  plan_revision: z.number().int().nonnegative(),
  plan_digest: digest,
};
export const kernelEpisodeBindingSchema = z.discriminatedUnion("phase", [
  z.strictObject({ ...commonBinding, phase: z.literal("planning") }),
  z.strictObject({
    ...commonBinding,
    phase: z.literal("implementation"),
    work_item_id: safeId,
    attempt: z.number().int().positive(),
    claim_id: text,
    contract_digest: digest,
    authority_digest: digest,
  }),
  z.strictObject({
    ...commonBinding,
    phase: z.literal("inspection"),
    work_item_id: safeId,
    attempt: z.number().int().positive(),
    claim_id: text,
    contract_digest: digest,
    authority_digest: digest,
    result_digest: digest,
  }),
]);
export const kernelOutputClaimsSchema = z.array(z.strictObject({ id: safeId, kind: text, digest }));
export const kernelMigrationSemanticAssessmentRequestSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("kernel_migration_semantic_assessment"),
  task_id: text,
  mapping_version: text,
  source_digest: digest,
  source_bytes_base64: z.string().min(1),
  mapping_digest: digest,
  fields: z
    .array(
      z.strictObject({
        source_path: text,
        target: text,
        reason_code: text,
      }),
    )
    .min(1),
  stop_rules: z.array(text).min(1),
});
export const kernelMigrationSemanticAssessmentSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("kernel_migration_semantic_assessment_result"),
  task_id: text,
  mapping_version: text,
  source_digest: digest,
  mapping_digest: digest,
  status: z.enum(["resolved", "blocked"]),
  resolutions: z.array(
    z.strictObject({ source_path: text, target: text, decision: text, evidence_digest: digest }),
  ),
});
export type KernelEpisodeBinding = z.infer<typeof kernelEpisodeBindingSchema>;
export type KernelPlanProposal = z.infer<typeof kernelPlanProposalSchema>;
export type KernelMigrationSemanticAssessmentRequest = z.infer<
  typeof kernelMigrationSemanticAssessmentRequestSchema
>;
export type KernelMigrationSemanticAssessment = z.infer<
  typeof kernelMigrationSemanticAssessmentSchema
>;
