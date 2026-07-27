import canonicalize from "canonicalize";
import { createHash } from "node:crypto";
import { z } from "zod";

export const RUNNER_EFFECT_OPERATION_SCHEMA_VERSION = 1 as const;
export const RUNNER_EFFECT_OPERATION_KIND = "runner_effect_operation" as const;
export const RUNNER_EFFECT_JOURNAL_KIND = "runner_effect_journal" as const;
export const RUNNER_EFFECT_CLAIM_KIND = "runner_effect_claim" as const;
export const RUNNER_EFFECT_OPERATION_REF_KIND = "runner_effect_operation_ref" as const;

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

export const RUNNER_EFFECT_REPLAY_DISPOSITION_VALUES = ["legacy_fresh", "prepared_fresh"] as const;

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

export type RunnerEffectOperation = z.infer<typeof RUNNER_EFFECT_OPERATION_ZOD_SCHEMA>;
export type RunnerEffectJournal = z.infer<typeof RUNNER_EFFECT_JOURNAL_ZOD_SCHEMA>;
export type RunnerEffectClaim = z.infer<typeof RUNNER_EFFECT_CLAIM_ZOD_SCHEMA>;
export type RunnerEffectOperationRef = z.infer<typeof RUNNER_EFFECT_OPERATION_REF_ZOD_SCHEMA>;
export type RunnerEffectJournalPhase = (typeof RUNNER_EFFECT_JOURNAL_PHASE_VALUES)[number];
export type RunnerEffectEnforcement = (typeof RUNNER_EFFECT_ENFORCEMENT_VALUES)[number];
export type RunnerEffectReplayDisposition =
  (typeof RUNNER_EFFECT_REPLAY_DISPOSITION_VALUES)[number];

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
    source_run_id: input.source_run_id?.trim() || null,
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
