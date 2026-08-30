import { taskKernel } from "@agentplaneorg/core/tasks";
import { z } from "zod";

import { kernelValidationSchema } from "./kernel-record.js";

const digest = z
  .string()
  .regex(/^sha256:[a-f0-9]{64}$/u)
  .transform((value) => value as taskKernel.Sha256Digest);
const binding = z.strictObject({
  task_id: z.string().min(1),
  plan_revision: z.number().int().positive(),
  plan_digest: digest,
  work_item_id: z.string().min(1),
  repository_fingerprint: digest,
  implementation_identity: digest,
});
export type KernelEvidenceBinding = z.infer<typeof binding>;
const validationObservation = z.strictObject({
  kind: z.literal("validation"),
  binding,
  validation: kernelValidationSchema,
});
const reviewObservation = z.strictObject({
  kind: z.literal("review"),
  binding,
  verdict: z.enum(["PASS", "REWORK", "BLOCKED", "HUMAN_REQUIRED"]),
  evidence_digests: z.array(digest).min(1),
  findings: z.array(z.string()),
});
const effectObservation = z.strictObject({
  kind: z.literal("provider"),
  task_id: z.string().min(1),
  repository_fingerprint: digest,
  effect_id: z.string().min(1),
  request_digest: digest,
  state: z.enum(["APPLIED", "NOT_APPLIED", "IN_DOUBT"]),
  receipt_digest: digest,
});
export type ObservationRejection = {
  kind: "rejected";
  code:
    | "observation_schema_invalid"
    | "observation_binding_mismatch"
    | "observation_effect_mismatch";
};

/** Validation transport returns evidence only. The supervisor separately submits a kernel command. */
export function readKernelValidation(
  raw: unknown,
  expected: KernelEvidenceBinding,
  check: taskKernel.ValidationIdentity,
): { kind: "validation"; validation: taskKernel.ValidationRecord } | ObservationRejection {
  const parsed = validationObservation.safeParse(raw);
  if (!parsed.success) return { kind: "rejected", code: "observation_schema_invalid" };
  if (
    taskKernel.kernelDigest(parsed.data.binding) !== taskKernel.kernelDigest(expected) ||
    taskKernel.kernelDigest(parsed.data.validation.identity) !== taskKernel.kernelDigest(check) ||
    check.implementation_identity !== expected.implementation_identity
  ) {
    return { kind: "rejected", code: "observation_binding_mismatch" };
  }
  return { kind: "validation", validation: parsed.data.validation };
}

/** An evaluator PASS is not a completion command or deterministic verification result. */
export function readKernelReview(
  raw: unknown,
  expected: KernelEvidenceBinding,
): z.infer<typeof reviewObservation> | ObservationRejection {
  const parsed = reviewObservation.safeParse(raw);
  if (!parsed.success) return { kind: "rejected", code: "observation_schema_invalid" };
  return taskKernel.kernelDigest(parsed.data.binding) === taskKernel.kernelDigest(expected)
    ? parsed.data
    : { kind: "rejected", code: "observation_binding_mismatch" };
}

/** Git/workspace/provider clients report exact observations; none chooses a Task transition. */
export function readKernelEffectObservation(
  raw: unknown,
  aggregate: taskKernel.TaskAggregate,
  repositoryFingerprint: taskKernel.Sha256Digest,
): z.infer<typeof effectObservation> | ObservationRejection {
  const parsed = effectObservation.safeParse(raw);
  if (!parsed.success) return { kind: "rejected", code: "observation_schema_invalid" };
  const value = parsed.data;
  if (value.task_id !== aggregate.id || value.repository_fingerprint !== repositoryFingerprint) {
    return { kind: "rejected", code: "observation_binding_mismatch" };
  }
  const effect = aggregate.effects.find((candidate) => candidate.id === value.effect_id);
  if (effect?.request_digest !== value.request_digest) {
    return { kind: "rejected", code: "observation_effect_mismatch" };
  }
  return value;
}
