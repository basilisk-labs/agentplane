import canonicalize from "canonicalize";
import { createHash } from "node:crypto";
import { z } from "zod";

export const RUNNER_EFFECT_OPERATION_SCHEMA_VERSION = 1 as const;
export const RUNNER_EFFECT_OPERATION_KIND = "runner_effect_operation" as const;
export const RUNNER_EFFECT_JOURNAL_KIND = "runner_effect_journal" as const;
export const RUNNER_EFFECT_CLAIM_KIND = "runner_effect_claim" as const;
export const RUNNER_EFFECT_OPERATION_REF_KIND = "runner_effect_operation_ref" as const;
export const RUNNER_EFFECT_RESOLUTION_INTENT_KIND = "runner_effect_resolution_intent" as const;
export const RUNNER_EFFECT_RESOLUTION_LEASE_KIND = "runner_effect_resolution_lease" as const;
export const RUNNER_EFFECT_RESOLUTION_KIND = "runner_effect_resolution" as const;
export const RUNNER_EFFECT_RESOLUTION_REF_KIND = "runner_effect_resolution_ref" as const;

export const RUNNER_EFFECT_JOURNAL_PHASE_VALUES = [
  "prepared",
  "started",
  "effect_unknown",
  "post_state_unknown",
  "accepted",
] as const;

export const RUNNER_EFFECT_ENFORCEMENT_VALUES = [
  "supervisor_single_spawn",
  "provider_key_forwarded",
] as const;

export const RUNNER_EFFECT_REPLAY_DISPOSITION_VALUES = [
  "legacy_fresh",
  "prepared_fresh",
  "resolved_not_applied_fresh",
] as const;

export const RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES = ["applied", "not_applied"] as const;
export const RUNNER_EFFECT_RESOLUTION_PROVENANCE = "operator_supplied" as const;

const SHA256_DIGEST_SCHEMA = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const NON_EMPTY_STRING = z.string().trim().min(1).max(4096);
const ISO_UTC_TIMESTAMP_SCHEMA = z.string().datetime({ offset: true });

const EFFECT_EVIDENCE_ZOD_SCHEMA = z
  .object({
    code: NON_EMPTY_STRING,
    digest: SHA256_DIGEST_SCHEMA.nullable(),
  })
  .strict();

const EFFECT_REPLAY_SOURCE_ZOD_SCHEMA = z
  .object({
    source_run_id: NON_EMPTY_STRING,
    destination_run_id: NON_EMPTY_STRING,
    disposition: z.enum(RUNNER_EFFECT_REPLAY_DISPOSITION_VALUES),
  })
  .strict();

export const RUNNER_EFFECT_OPERATION_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(RUNNER_EFFECT_OPERATION_SCHEMA_VERSION),
    kind: z.literal(RUNNER_EFFECT_OPERATION_KIND),
    task_id: NON_EMPTY_STRING,
    origin_run_id: NON_EMPTY_STRING,
    adapter_id: NON_EMPTY_STRING,
    work_order_id: NON_EMPTY_STRING,
    operation_key: SHA256_DIGEST_SCHEMA,
    idempotency_key: NON_EMPTY_STRING,
    claim_generation: SHA256_DIGEST_SCHEMA,
    authority_ref: NON_EMPTY_STRING,
    authority_digest: SHA256_DIGEST_SCHEMA,
    precondition_fingerprint_digest: SHA256_DIGEST_SCHEMA,
    precondition_policy_digest: SHA256_DIGEST_SCHEMA,
    invocation_digest: SHA256_DIGEST_SCHEMA,
    expected_postconditions: z.array(NON_EMPTY_STRING).min(1),
    enforcement: z.enum(RUNNER_EFFECT_ENFORCEMENT_VALUES),
    replay_source: EFFECT_REPLAY_SOURCE_ZOD_SCHEMA.nullable(),
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export const RUNNER_EFFECT_JOURNAL_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(RUNNER_EFFECT_OPERATION_SCHEMA_VERSION),
    kind: z.literal(RUNNER_EFFECT_JOURNAL_KIND),
    operation_key: SHA256_DIGEST_SCHEMA,
    operation_digest: SHA256_DIGEST_SCHEMA,
    claim_generation: SHA256_DIGEST_SCHEMA,
    phase: z.enum(RUNNER_EFFECT_JOURNAL_PHASE_VALUES),
    previous_digest: SHA256_DIGEST_SCHEMA.nullable(),
    recorded_at: ISO_UTC_TIMESTAMP_SCHEMA,
    observed_evidence: EFFECT_EVIDENCE_ZOD_SCHEMA,
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export const RUNNER_EFFECT_CLAIM_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(RUNNER_EFFECT_OPERATION_SCHEMA_VERSION),
    kind: z.literal(RUNNER_EFFECT_CLAIM_KIND),
    operation_key: SHA256_DIGEST_SCHEMA,
    operation_digest: SHA256_DIGEST_SCHEMA,
    claim_generation: SHA256_DIGEST_SCHEMA,
    claimed_at: ISO_UTC_TIMESTAMP_SCHEMA,
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export const RUNNER_EFFECT_OPERATION_REF_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(RUNNER_EFFECT_OPERATION_SCHEMA_VERSION),
    kind: z.literal(RUNNER_EFFECT_OPERATION_REF_KIND),
    run_id: NON_EMPTY_STRING,
    source_run_id: NON_EMPTY_STRING.nullable(),
    operation_key: SHA256_DIGEST_SCHEMA,
    operation_digest: SHA256_DIGEST_SCHEMA,
    claim_generation: SHA256_DIGEST_SCHEMA,
    enforcement: z.enum(RUNNER_EFFECT_ENFORCEMENT_VALUES),
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

/**
 * This is an operator statement, not a provider observation.  The content of
 * the evidence is deliberately represented only by its canonical digest: the
 * durable runner record must not copy potentially sensitive operator material.
 */
export const RUNNER_EFFECT_RESOLUTION_INTENT_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(RUNNER_EFFECT_OPERATION_SCHEMA_VERSION),
    kind: z.literal(RUNNER_EFFECT_RESOLUTION_INTENT_KIND),
    operation_key: SHA256_DIGEST_SCHEMA,
    operation_digest: SHA256_DIGEST_SCHEMA,
    effect_claim_generation: SHA256_DIGEST_SCHEMA,
    active_claim_generation: NON_EMPTY_STRING,
    authority_ref: NON_EMPTY_STRING,
    authority_digest: SHA256_DIGEST_SCHEMA,
    precondition_fingerprint_digest: SHA256_DIGEST_SCHEMA,
    precondition_policy_digest: SHA256_DIGEST_SCHEMA,
    verdict: z.enum(RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES),
    actor: NON_EMPTY_STRING,
    provenance: z.literal(RUNNER_EFFECT_RESOLUTION_PROVENANCE),
    observed_at: ISO_UTC_TIMESTAMP_SCHEMA,
    evidence_ref: NON_EMPTY_STRING,
    evidence_digest: SHA256_DIGEST_SCHEMA,
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export const RUNNER_EFFECT_RESOLUTION_LEASE_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(RUNNER_EFFECT_OPERATION_SCHEMA_VERSION),
    kind: z.literal(RUNNER_EFFECT_RESOLUTION_LEASE_KIND),
    operation_key: SHA256_DIGEST_SCHEMA,
    intent_digest: SHA256_DIGEST_SCHEMA,
    lease_generation: SHA256_DIGEST_SCHEMA,
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export const RUNNER_EFFECT_RESOLUTION_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(RUNNER_EFFECT_OPERATION_SCHEMA_VERSION),
    kind: z.literal(RUNNER_EFFECT_RESOLUTION_KIND),
    operation_key: SHA256_DIGEST_SCHEMA,
    operation_digest: SHA256_DIGEST_SCHEMA,
    intent_digest: SHA256_DIGEST_SCHEMA,
    lease_generation: SHA256_DIGEST_SCHEMA,
    verdict: z.enum(RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES),
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export const RUNNER_EFFECT_RESOLUTION_REF_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(RUNNER_EFFECT_OPERATION_SCHEMA_VERSION),
    kind: z.literal(RUNNER_EFFECT_RESOLUTION_REF_KIND),
    run_id: NON_EMPTY_STRING,
    operation_key: SHA256_DIGEST_SCHEMA,
    operation_digest: SHA256_DIGEST_SCHEMA,
    active_claim_generation: NON_EMPTY_STRING,
    intent_digest: SHA256_DIGEST_SCHEMA,
    lease_generation: SHA256_DIGEST_SCHEMA,
    resolution_digest: SHA256_DIGEST_SCHEMA,
    verdict: z.enum(RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES),
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export type RunnerEffectOperation = z.infer<typeof RUNNER_EFFECT_OPERATION_ZOD_SCHEMA>;
export type RunnerEffectJournal = z.infer<typeof RUNNER_EFFECT_JOURNAL_ZOD_SCHEMA>;
export type RunnerEffectClaim = z.infer<typeof RUNNER_EFFECT_CLAIM_ZOD_SCHEMA>;
export type RunnerEffectOperationRef = z.infer<typeof RUNNER_EFFECT_OPERATION_REF_ZOD_SCHEMA>;
export type RunnerEffectResolutionIntent = z.infer<
  typeof RUNNER_EFFECT_RESOLUTION_INTENT_ZOD_SCHEMA
>;
export type RunnerEffectResolutionLease = z.infer<typeof RUNNER_EFFECT_RESOLUTION_LEASE_ZOD_SCHEMA>;
export type RunnerEffectResolution = z.infer<typeof RUNNER_EFFECT_RESOLUTION_ZOD_SCHEMA>;
export type RunnerEffectResolutionRef = z.infer<typeof RUNNER_EFFECT_RESOLUTION_REF_ZOD_SCHEMA>;
export type RunnerEffectJournalPhase = (typeof RUNNER_EFFECT_JOURNAL_PHASE_VALUES)[number];
export type RunnerEffectEnforcement = (typeof RUNNER_EFFECT_ENFORCEMENT_VALUES)[number];
export type RunnerEffectReplayDisposition =
  (typeof RUNNER_EFFECT_REPLAY_DISPOSITION_VALUES)[number];
export type RunnerEffectResolutionVerdict =
  (typeof RUNNER_EFFECT_RESOLUTION_VERDICT_VALUES)[number];

function canonicalJson(value: unknown): string {
  const serialized = canonicalize(value);
  if (typeof serialized !== "string") {
    throw new Error("Runner effect contracts require canonical JSON values.");
  }
  return serialized;
}

export function digestRunnerEffectValue(value: unknown): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(canonicalJson(value), "utf8").digest("hex")}`;
}

function sortedUnique(values: readonly string[]): string[] {
  const normalized = values
    .map((value) => value.trim())
    .filter(Boolean)
    .toSorted();
  if (new Set(normalized).size !== normalized.length) {
    throw new Error("Runner effect postconditions must be unique.");
  }
  if (normalized.length === 0) {
    throw new Error("Runner effect operations require expected postconditions.");
  }
  return normalized;
}

function operationIdentity(
  input: Omit<
    RunnerEffectOperation,
    "operation_key" | "idempotency_key" | "claim_generation" | "digest" | "origin_run_id"
  >,
): Record<string, unknown> {
  return {
    schema_version: input.schema_version,
    kind: input.kind,
    task_id: input.task_id,
    adapter_id: input.adapter_id,
    work_order_id: input.work_order_id,
    authority_ref: input.authority_ref,
    authority_digest: input.authority_digest,
    precondition_fingerprint_digest: input.precondition_fingerprint_digest,
    precondition_policy_digest: input.precondition_policy_digest,
    invocation_digest: input.invocation_digest,
    expected_postconditions: input.expected_postconditions,
    enforcement: input.enforcement,
    replay_source: input.replay_source,
  };
}

export function createRunnerEffectOperation(input: {
  task_id: string;
  origin_run_id: string;
  adapter_id: string;
  work_order_id: string;
  authority_ref: string;
  authority_digest: string;
  precondition_fingerprint_digest: string;
  precondition_policy_digest: string;
  invocation_digest: string;
  expected_postconditions: readonly string[];
  enforcement?: RunnerEffectEnforcement;
  replay_source?: {
    source_run_id: string;
    destination_run_id: string;
    disposition: RunnerEffectReplayDisposition;
  } | null;
}): RunnerEffectOperation {
  const base = {
    schema_version: RUNNER_EFFECT_OPERATION_SCHEMA_VERSION,
    kind: RUNNER_EFFECT_OPERATION_KIND,
    task_id: input.task_id.trim(),
    origin_run_id: input.origin_run_id.trim(),
    adapter_id: input.adapter_id.trim(),
    work_order_id: input.work_order_id.trim(),
    authority_ref: input.authority_ref.trim(),
    authority_digest: input.authority_digest,
    precondition_fingerprint_digest: input.precondition_fingerprint_digest,
    precondition_policy_digest: input.precondition_policy_digest,
    invocation_digest: input.invocation_digest,
    expected_postconditions: sortedUnique(input.expected_postconditions),
    enforcement: input.enforcement ?? "supervisor_single_spawn",
    replay_source: input.replay_source
      ? {
          source_run_id: input.replay_source.source_run_id.trim(),
          destination_run_id: input.replay_source.destination_run_id.trim(),
          disposition: input.replay_source.disposition,
        }
      : null,
  } as const;
  const operation_key = digestRunnerEffectValue(operationIdentity(base));
  const idempotency_key = `runner-effect:${operation_key}`;
  const claim_generation = digestRunnerEffectValue({
    kind: "runner_effect_claim_generation",
    operation_key,
  });
  const operation = {
    ...base,
    operation_key,
    idempotency_key,
    claim_generation,
  };
  return validateRunnerEffectOperation({
    ...operation,
    digest: digestRunnerEffectValue(operation),
  });
}

export function validateRunnerEffectOperation(input: unknown): RunnerEffectOperation {
  const parsed = RUNNER_EFFECT_OPERATION_ZOD_SCHEMA.parse(input);
  const expectedPostconditions = sortedUnique(parsed.expected_postconditions);
  if (expectedPostconditions.join("\n") !== parsed.expected_postconditions.join("\n")) {
    throw new Error("Runner effect operation postconditions must be sorted and unique.");
  }
  const {
    digest,
    operation_key,
    idempotency_key,
    claim_generation,
    origin_run_id: _originRunId,
    ...base
  } = parsed;
  const expectedOperationKey = digestRunnerEffectValue(operationIdentity(base));
  if (operation_key !== expectedOperationKey) {
    throw new Error(
      `Runner effect operation key mismatch: expected ${expectedOperationKey}, observed ${operation_key}.`,
    );
  }
  if (idempotency_key !== `runner-effect:${operation_key}`) {
    throw new Error("Runner effect idempotency key does not bind the operation key.");
  }
  const expectedGeneration = digestRunnerEffectValue({
    kind: "runner_effect_claim_generation",
    operation_key,
  });
  if (claim_generation !== expectedGeneration) {
    throw new Error("Runner effect claim generation does not bind the operation key.");
  }
  const expectedDigest = digestRunnerEffectValue({
    ...base,
    origin_run_id: _originRunId,
    operation_key,
    idempotency_key,
    claim_generation,
  });
  if (digest !== expectedDigest) {
    throw new Error(
      `Runner effect operation digest mismatch: expected ${expectedDigest}, observed ${digest}.`,
    );
  }
  return parsed;
}

export function createRunnerEffectJournal(input: {
  operation: RunnerEffectOperation;
  phase: RunnerEffectJournalPhase;
  previous_digest: string | null;
  recorded_at?: string;
  observed_evidence: { code: string; digest?: string | null };
}): RunnerEffectJournal {
  const journal = {
    schema_version: RUNNER_EFFECT_OPERATION_SCHEMA_VERSION,
    kind: RUNNER_EFFECT_JOURNAL_KIND,
    operation_key: input.operation.operation_key,
    operation_digest: input.operation.digest,
    claim_generation: input.operation.claim_generation,
    phase: input.phase,
    previous_digest: input.previous_digest,
    recorded_at: input.recorded_at ?? new Date().toISOString(),
    observed_evidence: {
      code: input.observed_evidence.code.trim(),
      digest: input.observed_evidence.digest ?? null,
    },
  } as const;
  return validateRunnerEffectJournal({
    ...journal,
    digest: digestRunnerEffectValue(journal),
  });
}

export function validateRunnerEffectJournal(input: unknown): RunnerEffectJournal {
  const parsed = RUNNER_EFFECT_JOURNAL_ZOD_SCHEMA.parse(input);
  const { digest, ...payload } = parsed;
  const expected = digestRunnerEffectValue(payload);
  if (digest !== expected) {
    throw new Error(
      `Runner effect journal digest mismatch: expected ${expected}, observed ${digest}.`,
    );
  }
  return parsed;
}

export function createRunnerEffectClaim(input: {
  operation: RunnerEffectOperation;
  claimed_at?: string;
}): RunnerEffectClaim {
  const claim = {
    schema_version: RUNNER_EFFECT_OPERATION_SCHEMA_VERSION,
    kind: RUNNER_EFFECT_CLAIM_KIND,
    operation_key: input.operation.operation_key,
    operation_digest: input.operation.digest,
    claim_generation: input.operation.claim_generation,
    claimed_at: input.claimed_at ?? new Date().toISOString(),
  } as const;
  return validateRunnerEffectClaim({
    ...claim,
    digest: digestRunnerEffectValue(claim),
  });
}

export function validateRunnerEffectClaim(input: unknown): RunnerEffectClaim {
  const parsed = RUNNER_EFFECT_CLAIM_ZOD_SCHEMA.parse(input);
  const { digest, ...payload } = parsed;
  const expected = digestRunnerEffectValue(payload);
  if (digest !== expected) {
    throw new Error(
      `Runner effect claim digest mismatch: expected ${expected}, observed ${digest}.`,
    );
  }
  return parsed;
}

export function createRunnerEffectOperationRef(input: {
  run_id: string;
  source_run_id?: string | null;
  operation: RunnerEffectOperation;
}): RunnerEffectOperationRef {
  const reference = {
    schema_version: RUNNER_EFFECT_OPERATION_SCHEMA_VERSION,
    kind: RUNNER_EFFECT_OPERATION_REF_KIND,
    run_id: input.run_id.trim(),
    source_run_id: input.source_run_id?.trim() ?? null,
    operation_key: input.operation.operation_key,
    operation_digest: input.operation.digest,
    claim_generation: input.operation.claim_generation,
    enforcement: input.operation.enforcement,
  } as const;
  return validateRunnerEffectOperationRef({
    ...reference,
    digest: digestRunnerEffectValue(reference),
  });
}

export function validateRunnerEffectOperationRef(input: unknown): RunnerEffectOperationRef {
  const parsed = RUNNER_EFFECT_OPERATION_REF_ZOD_SCHEMA.parse(input);
  const { digest, ...payload } = parsed;
  const expected = digestRunnerEffectValue(payload);
  if (digest !== expected) {
    throw new Error(
      `Runner effect operation reference digest mismatch: expected ${expected}, observed ${digest}.`,
    );
  }
  return parsed;
}

export function createRunnerEffectResolutionIntent(input: {
  operation: RunnerEffectOperation;
  active_claim_generation: string;
  verdict: RunnerEffectResolutionVerdict;
  actor: string;
  observed_at: string;
  evidence_ref: string;
  evidence_digest: string;
}): RunnerEffectResolutionIntent {
  const intent = {
    schema_version: RUNNER_EFFECT_OPERATION_SCHEMA_VERSION,
    kind: RUNNER_EFFECT_RESOLUTION_INTENT_KIND,
    operation_key: input.operation.operation_key,
    operation_digest: input.operation.digest,
    effect_claim_generation: input.operation.claim_generation,
    active_claim_generation: input.active_claim_generation.trim(),
    authority_ref: input.operation.authority_ref,
    authority_digest: input.operation.authority_digest,
    precondition_fingerprint_digest: input.operation.precondition_fingerprint_digest,
    precondition_policy_digest: input.operation.precondition_policy_digest,
    verdict: input.verdict,
    actor: input.actor.trim(),
    provenance: RUNNER_EFFECT_RESOLUTION_PROVENANCE,
    observed_at: input.observed_at,
    evidence_ref: input.evidence_ref.trim(),
    evidence_digest: input.evidence_digest,
  } as const;
  return validateRunnerEffectResolutionIntent({
    ...intent,
    digest: digestRunnerEffectValue(intent),
  });
}

export function validateRunnerEffectResolutionIntent(input: unknown): RunnerEffectResolutionIntent {
  const parsed = RUNNER_EFFECT_RESOLUTION_INTENT_ZOD_SCHEMA.parse(input);
  const { digest, ...payload } = parsed;
  const expected = digestRunnerEffectValue(payload);
  if (digest !== expected) {
    throw new Error(
      `Runner effect resolution intent digest mismatch: expected ${expected}, observed ${digest}.`,
    );
  }
  return parsed;
}

export function createRunnerEffectResolutionLease(input: {
  operation_key: string;
  intent_digest: string;
}): RunnerEffectResolutionLease {
  const lease = {
    schema_version: RUNNER_EFFECT_OPERATION_SCHEMA_VERSION,
    kind: RUNNER_EFFECT_RESOLUTION_LEASE_KIND,
    operation_key: input.operation_key,
    intent_digest: input.intent_digest,
    lease_generation: digestRunnerEffectValue({
      kind: "runner_effect_resolution_lease_generation",
      operation_key: input.operation_key,
      intent_digest: input.intent_digest,
    }),
  } as const;
  return validateRunnerEffectResolutionLease({
    ...lease,
    digest: digestRunnerEffectValue(lease),
  });
}

export function validateRunnerEffectResolutionLease(input: unknown): RunnerEffectResolutionLease {
  const parsed = RUNNER_EFFECT_RESOLUTION_LEASE_ZOD_SCHEMA.parse(input);
  const { digest, lease_generation, ...identity } = parsed;
  const expectedGeneration = digestRunnerEffectValue({
    kind: "runner_effect_resolution_lease_generation",
    operation_key: identity.operation_key,
    intent_digest: identity.intent_digest,
  });
  if (lease_generation !== expectedGeneration) {
    throw new Error("Runner effect resolution lease generation does not bind the selected intent.");
  }
  const expected = digestRunnerEffectValue({ ...identity, lease_generation });
  if (digest !== expected) {
    throw new Error(
      `Runner effect resolution lease digest mismatch: expected ${expected}, observed ${digest}.`,
    );
  }
  return parsed;
}

export function createRunnerEffectResolution(input: {
  operation: RunnerEffectOperation;
  intent: RunnerEffectResolutionIntent;
  lease: RunnerEffectResolutionLease;
}): RunnerEffectResolution {
  if (
    input.intent.operation_key !== input.operation.operation_key ||
    input.intent.operation_digest !== input.operation.digest ||
    input.lease.operation_key !== input.operation.operation_key ||
    input.lease.intent_digest !== input.intent.digest
  ) {
    throw new Error(
      "Runner effect resolution inputs do not bind one immutable operation and intent.",
    );
  }
  const resolution = {
    schema_version: RUNNER_EFFECT_OPERATION_SCHEMA_VERSION,
    kind: RUNNER_EFFECT_RESOLUTION_KIND,
    operation_key: input.operation.operation_key,
    operation_digest: input.operation.digest,
    intent_digest: input.intent.digest,
    lease_generation: input.lease.lease_generation,
    verdict: input.intent.verdict,
  } as const;
  return validateRunnerEffectResolution({
    ...resolution,
    digest: digestRunnerEffectValue(resolution),
  });
}

export function validateRunnerEffectResolution(input: unknown): RunnerEffectResolution {
  const parsed = RUNNER_EFFECT_RESOLUTION_ZOD_SCHEMA.parse(input);
  const { digest, ...payload } = parsed;
  const expected = digestRunnerEffectValue(payload);
  if (digest !== expected) {
    throw new Error(
      `Runner effect resolution digest mismatch: expected ${expected}, observed ${digest}.`,
    );
  }
  return parsed;
}

export function createRunnerEffectResolutionRef(input: {
  run_id: string;
  active_claim_generation: string;
  operation: RunnerEffectOperation;
  intent: RunnerEffectResolutionIntent;
  lease: RunnerEffectResolutionLease;
  resolution: RunnerEffectResolution;
}): RunnerEffectResolutionRef {
  if (
    input.resolution.operation_key !== input.operation.operation_key ||
    input.resolution.operation_digest !== input.operation.digest ||
    input.resolution.intent_digest !== input.intent.digest ||
    input.resolution.lease_generation !== input.lease.lease_generation ||
    input.resolution.verdict !== input.intent.verdict
  ) {
    throw new Error("Runner effect resolution reference does not bind the immutable resolution.");
  }
  const reference = {
    schema_version: RUNNER_EFFECT_OPERATION_SCHEMA_VERSION,
    kind: RUNNER_EFFECT_RESOLUTION_REF_KIND,
    run_id: input.run_id.trim(),
    operation_key: input.operation.operation_key,
    operation_digest: input.operation.digest,
    active_claim_generation: input.active_claim_generation.trim(),
    intent_digest: input.intent.digest,
    lease_generation: input.lease.lease_generation,
    resolution_digest: input.resolution.digest,
    verdict: input.resolution.verdict,
  } as const;
  return validateRunnerEffectResolutionRef({
    ...reference,
    digest: digestRunnerEffectValue(reference),
  });
}

export function validateRunnerEffectResolutionRef(input: unknown): RunnerEffectResolutionRef {
  const parsed = RUNNER_EFFECT_RESOLUTION_REF_ZOD_SCHEMA.parse(input);
  const { digest, ...payload } = parsed;
  const expected = digestRunnerEffectValue(payload);
  if (digest !== expected) {
    throw new Error(
      `Runner effect resolution reference digest mismatch: expected ${expected}, observed ${digest}.`,
    );
  }
  return parsed;
}
