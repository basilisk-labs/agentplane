import { kernelRecordIssues } from "./kernel-record-invariants.js";
import { taskKernel } from "@agentplaneorg/core/tasks";
import { z } from "zod";

import type { TaskData } from "../../backends/task-backend.js";

export const TASK_KERNEL_EXTENSION = "task_kernel";
const digest = z
  .string()
  .regex(/^sha256:[a-f0-9]{64}$/u)
  .transform((value) => value as taskKernel.Sha256Digest);
const strings = z.array(z.string().min(1));
const revision = z.number().int().nonnegative();
const requirements = z.strictObject({
  scope_roots: strings,
  repository_effects: strings,
  external_effects: strings,
  capabilities: strings,
  resources: strings,
});
const definition = z.strictObject({
  id: z.string().min(1),
  depends_on: strings,
  required_inputs: strings,
  expected_outputs: strings,
  execution_requirements: requirements,
  optional: z.boolean(),
});
const plan = z.strictObject({
  revision: revision.positive(),
  digest,
  state: z.enum(["PROPOSED", "APPROVED", "REJECTED", "SUPERSEDED"]),
  approval_actor_id: z.string().nullable(),
  approval_evidence_digest: digest.nullable(),
  work_items: z.array(definition),
});
export const kernelValidationSchema = z.strictObject({
  status: z.enum(["PASSED", "FAILED", "BLOCKED", "STALE"]),
  identity: z.strictObject({
    implementation_identity: digest,
    check_id: z.string().min(1),
    command_digest: digest,
    toolchain_digest: digest,
    environment_digest: digest,
  }),
  evidence_digests: z.array(digest),
  observed_at: z.iso.datetime(),
});
const output = z.strictObject({
  id: z.string().min(1),
  kind: z.string().min(1),
  digest,
  task_id: z.string().min(1),
  plan_revision: revision.positive(),
  work_item_id: z.string().min(1),
  attempt: revision,
  repository_fingerprint: digest,
});
const mutationReceipt = z.strictObject({
  mutation_id: z.string().min(1),
  command_digest: digest,
  before_revision: revision,
  after_revision: revision,
  aggregate_digest: digest,
  event_digests: z.array(digest),
  effect_ids: strings,
});
export const kernelAggregateSchema = z.strictObject({
  schema_version: z.literal(1),
  id: z.string().min(1),
  revision,
  state: z.enum(taskKernel.TASK_STATES),
  intent_digest: digest,
  current_plan: plan.nullable(),
  plan_history: z.array(plan),
  work_items: z.record(
    z.string(),
    z.strictObject({
      definition,
      state: z.enum(taskKernel.WORK_ITEM_STATES),
      revision,
      attempt: revision,
      claim_id: z.string().nullable(),
      result_digest: digest.nullable(),
      output_manifests: z.array(output),
      validation: kernelValidationSchema.nullable(),
    }),
  ),
  final_validation: kernelValidationSchema.nullable(),
  effects: z.array(
    z.strictObject({
      id: z.string().min(1),
      kind: z.string().min(1),
      execution_requirements: requirements,
      idempotency_key: z.string().min(1),
      state: z.enum(taskKernel.EFFECT_STATES),
      request_digest: digest,
      provider_receipt_digest: digest.nullable(),
      observed_state_digest: digest.nullable(),
    }),
  ),
  mutation_receipts: z.record(z.string(), mutationReceipt),
  controller_transfer: z
    .strictObject({
      from_controller: z.string().min(1),
      to_controller: z.string().min(1),
      state_digest: digest,
      authority_digest: digest,
    })
    .nullable(),
  migration_receipts: z.array(
    z.strictObject({
      migration_version: z.string().min(1),
      source_digest: digest,
      canonical_digest: digest,
      projection_digest: digest,
      backup_digest: digest,
    }),
  ),
});
const event = z.strictObject({
  id: z.string().min(1),
  kind: z.enum([
    "intent_captured",
    "task_transitioned",
    "plan_proposed",
    "plan_rejected",
    "plan_approved",
    "work_items_materialized",
    "work_item_transitioned",
    "work_item_result_accepted",
    "work_item_validation_recorded",
    "final_validation_recorded",
    "effect_prepared",
    "effect_observed",
    "effect_reconciled",
    "effect_superseded",
    "plan_amended",
    "authority_delta_requested",
    "task_completed",
    "controller_transferred",
    "migration_recorded",
  ]),
  task_id: z.string().min(1),
  task_revision: revision,
  mutation_id: z.string().min(1),
  occurred_at: z.iso.datetime(),
  command_digest: digest,
  payload_digest: digest,
});
export const kernelRecordSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("canonical_task"),
  repository_identity: digest,
  aggregate: kernelAggregateSchema,
  events: z.array(event),
  digest,
});
export type KernelRecord = z.infer<typeof kernelRecordSchema>;
export const kernelArchiveSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("archived_task"),
  task_id: z.string().min(1),
  repository_identity: digest,
  source_digest: digest,
  migration_version: z.string().min(1),
  legacy_status: z.literal("DONE"),
  read_only: z.literal(true),
  digest,
});
export type KernelArchive = z.infer<typeof kernelArchiveSchema>;
export type KernelRead =
  | { kind: "archived"; task: TaskData; archive: KernelArchive }
  | { kind: "missing" }
  | { kind: "legacy_unmigrated"; task: TaskData }
  | { kind: "malformed"; reason: string; fields: string[] }
  | { kind: "canonical"; task: TaskData; record: KernelRecord };

export function makeKernelRecord(
  repositoryIdentity: taskKernel.Sha256Digest,
  aggregate: taskKernel.TaskAggregate,
  events: readonly taskKernel.DomainEvent[],
): KernelRecord {
  const value = {
    schema_version: 1 as const,
    kind: "canonical_task" as const,
    repository_identity: repositoryIdentity,
    aggregate,
    events,
  };
  return kernelRecordSchema.parse({ ...value, digest: taskKernel.kernelDigest(value) });
}

export function readKernelRecord(
  task: TaskData | null,
  repositoryIdentity: taskKernel.Sha256Digest,
): KernelRead {
  if (!task) return { kind: "missing" };
  if (!Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION)) {
    return { kind: "legacy_unmigrated", task };
  }
  const archive = kernelArchiveSchema.safeParse(task.extensions?.[TASK_KERNEL_EXTENSION]);
  if (archive.success) {
    const { digest: storedDigest, ...contents } = archive.data;
    if (
      contents.task_id === task.id &&
      contents.repository_identity === repositoryIdentity &&
      taskKernel.kernelDigest(contents) === storedDigest
    ) {
      return { kind: "archived", task, archive: archive.data };
    }
    return {
      kind: "malformed",
      reason: "archive_identity_mismatch",
      fields: ["digest", "task_id", "repository_identity"],
    };
  }
  const parsed = kernelRecordSchema.safeParse(task.extensions?.[TASK_KERNEL_EXTENSION]);
  if (!parsed.success)
    return {
      kind: "malformed",
      reason: "invalid_canonical_schema",
      fields: parsed.error.issues.map((issue) => issue.path.join(".")),
    };
  const { digest: storedDigest, ...contents } = parsed.data;
  if (
    taskKernel.kernelDigest(contents) !== storedDigest ||
    contents.aggregate.id !== task.id ||
    contents.repository_identity !== repositoryIdentity
  ) {
    return {
      kind: "malformed",
      reason: "canonical_identity_mismatch",
      fields: ["digest", "aggregate.id", "repository_identity"],
    };
  }
  const aggregate = contents.aggregate;
  const persistedIssues = kernelRecordIssues(aggregate, contents.events);
  const graphIssues = aggregate.current_plan
    ? taskKernel.validateWorkItemDefinitions(aggregate.current_plan.work_items)
    : [];
  const invalidRuntime = Object.entries(aggregate.work_items).some(
    ([id, item]) =>
      id !== item.definition.id ||
      !aggregate.current_plan?.work_items.some(
        (declared) =>
          declared.id === id &&
          taskKernel.kernelDigest(declared) === taskKernel.kernelDigest(item.definition),
      ),
  );
  const invalidEvents = contents.events.some(
    (entry) =>
      entry.task_id !== task.id ||
      entry.task_revision > aggregate.revision ||
      !aggregate.mutation_receipts[entry.mutation_id]?.event_digests.includes(
        taskKernel.kernelDigest(entry),
      ),
  );
  if (persistedIssues.length > 0 || graphIssues.length > 0 || invalidRuntime || invalidEvents)
    return {
      kind: "malformed",
      reason: "canonical_invariant_violation",
      fields: [
        ...persistedIssues,
        ...graphIssues,
        ...(invalidRuntime ? ["work_items"] : []),
        ...(invalidEvents ? ["events"] : []),
      ],
    };
  return { kind: "canonical", task, record: parsed.data };
}
