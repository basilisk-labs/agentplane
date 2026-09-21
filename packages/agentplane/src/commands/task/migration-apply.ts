import {
  kernelIntentSchema,
  kernelMigrationSemanticAssessmentSchema,
  kernelWorkContractSchema,
  parseTaskReadme,
  renderTaskReadme,
  taskCentricDigest,
  taskKernel as k,
  type TaskAggregate as LegacyTaskAggregate,
} from "@agentplaneorg/core/tasks";
import { z } from "zod";

import { taskBytesDigest } from "../../backends/task-backend/local-task-byte-store.js";
import {
  makeKernelRecord,
  TASK_KERNEL_EXTENSION,
  type KernelArchive,
} from "../../adapters/task-backend/kernel-record.js";
import { projectKernelTask } from "../../adapters/task-backend/kernel-projector.js";
import type { TaskByteSnapshot, TaskByteStore } from "../../ports/task-byte-store.js";
import {
  admitSemanticResult,
  type SemanticResultOwner,
} from "../shared/semantic-result-admission.js";
import { withSupervisorExecutionAdmissionFence } from "../shared/supervisor-execution-episode.js";
import { inspectKernelMigrationAdmission } from "./kernel-migration-admission.js";
import {
  decodeLifecycleOwnerMigrationSource,
  previewLifecycleOwnerMigration,
  type LifecycleOwnerMigrationPreview,
} from "./migration-preview.js";

export const LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION = "task_kernel_lifecycle_migration";
export const LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION =
  "task_kernel_lifecycle_migration_quarantine";
const TASK_CENTRIC_EXTENSION = "agentplane.task_centric";
const TASK_CENTRIC_RUNTIME_EXTENSION = "agentplane.task_centric_runtime";
const digest = z
  .string()
  .regex(/^sha256:[a-f0-9]{64}$/u)
  .transform((value) => value as k.Sha256Digest);
const freshBindingSchema = z.strictObject({
  repository_identity: digest,
  state_fingerprint_digest: digest,
  policy_digest: digest,
  authority_digest: digest,
});
export type LifecycleOwnerMigrationFreshBinding = z.infer<typeof freshBindingSchema>;
const receiptSchema = z.strictObject({
  schema_version: z.literal(1),
  migration_version: z.string().min(1),
  task_id: z.string().min(1),
  repository_identity: digest,
  backend_identity: z.string().min(1),
  source_digest: digest,
  source_revision: z.number().int().nonnegative(),
  mapping_digest: digest,
  mapping_receipt: z.unknown(),
  semantic_assessment_digest: digest.nullable(),
  semantic_assessment: kernelMigrationSemanticAssessmentSchema.nullable(),
  state_fingerprint_digest: digest,
  policy_digest: digest,
  authority_digest: digest,
  output_revision: z.number().int().nonnegative(),
  disposition: z.enum(["kernel_task", "read_only_archive"]),
  canonical_digest: digest,
  projection_digest: digest,
  backup_digest: digest,
  backup_location: z.string().min(1),
  receipt_digest: digest,
});
export type LifecycleOwnerMigrationReceipt = z.infer<typeof receiptSchema>;
const quarantineMarkerSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("lifecycle_owner_migration_quarantine"),
  task_id: z.string().min(1),
  repository_identity: digest,
  backend_identity: z.string().min(1),
  source_digest: digest,
  source_revision: z.number().int().nonnegative(),
  mapping_version: z.string().min(1),
  mapping_digest: digest,
  mapping_receipt: z.unknown(),
  semantic_assessment_request: z.unknown().nullable(),
  reason: z.string().min(1),
  backup_digest: digest,
  backup_location: z.string().min(1),
  output_revision: z.number().int().nonnegative(),
  quarantine_digest: digest,
});
export type LifecycleOwnerMigrationQuarantine = z.infer<typeof quarantineMarkerSchema>;

export type BoundLifecycleOwnerMigrationAssessment = Readonly<{
  binding: LifecycleOwnerMigrationFreshBinding &
    Readonly<{
      task_id: string;
      source_digest: k.Sha256Digest;
      mapping_version: string;
      mapping_digest: k.Sha256Digest;
    }>;
  assessment: unknown;
  exchange: Readonly<{
    owner: SemanticResultOwner;
    work_order: unknown;
    result: unknown;
    format?: "semantic_payload_v1";
  }>;
}>;

export type LifecycleOwnerMigrationApplyResult =
  | Readonly<{
      kind: "applied" | "already_applied";
      receipt: LifecycleOwnerMigrationReceipt;
      output_bytes_digest: k.Sha256Digest;
    }>
  | Readonly<{
      kind: "quarantined";
      reason: string;
      persisted: boolean;
      quarantine_digest: k.Sha256Digest | null;
      audit: {
        task_id: string;
        source_digest: k.Sha256Digest;
        source_bytes_base64: string;
        mapping_version: string;
        mapping_digest: k.Sha256Digest;
        blockers: LifecycleOwnerMigrationPreview["mapping"]["blockers"];
        pending: LifecycleOwnerMigrationPreview["mapping"]["pending"];
        semantic_assessment: LifecycleOwnerMigrationPreview["semantic_assessment"];
        supported_resolutions: readonly string[];
      };
    }>
  | Readonly<{ kind: "refused"; reason: string }>;

function receipt(value: unknown): LifecycleOwnerMigrationReceipt | null {
  const parsed = receiptSchema.safeParse(value);
  if (!parsed.success) return null;
  const { receipt_digest: claimed, ...contents } = parsed.data;
  if (
    k.kernelDigest(contents) !== claimed ||
    k.kernelDigest(parsed.data.mapping_receipt) !== parsed.data.mapping_digest ||
    (parsed.data.semantic_assessment === null) !==
      (parsed.data.semantic_assessment_digest === null) ||
    (parsed.data.semantic_assessment !== null &&
      k.kernelDigest(parsed.data.semantic_assessment) !== parsed.data.semantic_assessment_digest)
  )
    return null;
  return parsed.data;
}

export function parseLifecycleOwnerMigrationReceipt(
  value: unknown,
): LifecycleOwnerMigrationReceipt | null {
  return receipt(value);
}

function sameFreshBinding(
  left: LifecycleOwnerMigrationFreshBinding,
  right: LifecycleOwnerMigrationFreshBinding,
): boolean {
  return (
    left.repository_identity === right.repository_identity &&
    left.state_fingerprint_digest === right.state_fingerprint_digest &&
    left.policy_digest === right.policy_digest &&
    left.authority_digest === right.authority_digest
  );
}

function quarantine(
  reason: string,
  source: TaskByteSnapshot,
  preview: LifecycleOwnerMigrationPreview,
  persisted = false,
  quarantineDigest: k.Sha256Digest | null = null,
): LifecycleOwnerMigrationApplyResult {
  return {
    kind: "quarantined",
    reason,
    persisted,
    quarantine_digest: quarantineDigest,
    audit: {
      task_id: preview.task_id,
      source_digest: preview.source_digest,
      source_bytes_base64: Buffer.from(source.text, "utf8").toString("base64"),
      mapping_version: preview.mapping_version,
      mapping_digest: k.kernelDigest(preview.mapping),
      blockers: preview.mapping.blockers,
      pending: preview.mapping.pending,
      semantic_assessment: preview.semantic_assessment,
      supported_resolutions: [
        "Drain or reconcile pending legacy work on its pinned runtime, then create a fresh preview.",
        "Provide one complete semantic assessment bound to the fresh preview and current authority.",
        "Export the retained source bytes and audit record without enabling effects.",
      ],
    },
  };
}

function quarantineMarker(value: unknown): LifecycleOwnerMigrationQuarantine | null {
  const parsed = quarantineMarkerSchema.safeParse(value);
  if (!parsed.success) return null;
  const { quarantine_digest: claimed, ...contents } = parsed.data;
  if (
    k.kernelDigest(contents) !== claimed ||
    k.kernelDigest(parsed.data.mapping_receipt) !== parsed.data.mapping_digest ||
    parsed.data.backup_digest !== parsed.data.source_digest
  )
    return null;
  return parsed.data;
}

function approvalEvidence(plan: NonNullable<LegacyTaskAggregate["current_plan"]>): k.Sha256Digest {
  return taskCentricDigest({
    state: plan.approval.state,
    approved_by: plan.approval.approved_by,
    approved_at: plan.approval.approved_at,
    approved_digest: plan.approval.approved_digest,
    policy_facts: plan.approval.policy_facts,
  }) as k.Sha256Digest;
}

function kernelPlanState(
  state: NonNullable<LegacyTaskAggregate["current_plan"]>["approval"]["state"],
  historical: boolean,
): k.PlanRecord["state"] {
  if (state === "rejected") return "REJECTED";
  if (historical) return "SUPERSEDED";
  return state === "approved" ? "APPROVED" : "PROPOSED";
}

function convertActiveTask(task: LegacyTaskAggregate): {
  aggregate: k.TaskAggregate;
  documents: Parameters<typeof makeKernelRecord>[3];
} {
  const intent = kernelIntentSchema.parse({
    objective: task.intent.request.trim() || `Migrate Task ${task.id}`,
    context:
      task.intent.constraints.length > 0
        ? task.intent.constraints.join("\n")
        : "Retained lifecycle-owner migration source.",
  });
  const contracts = new Map<string, z.infer<typeof kernelWorkContractSchema>>();
  const definitions = new Map<string, k.WorkItemDefinition>();
  const convertDefinition = (
    item: NonNullable<
      LegacyTaskAggregate["current_plan"]
    >["proposal"]["work_items"]["work_items"][number],
  ): k.WorkItemDefinition => {
    const contract = kernelWorkContractSchema.parse({
      objective: item.objective.trim() || `Migrate WorkItem ${item.id}`,
      acceptance_criteria:
        item.acceptance_criteria.map((entry) => entry.description).filter(Boolean).length > 0
          ? item.acceptance_criteria.map((entry) => entry.description).filter(Boolean)
          : [item.objective.trim() || `Preserve WorkItem ${item.id}`],
      verification_commands: item.validation.checks
        .map((check) => check.command)
        .filter((command): command is string => typeof command === "string" && command.length > 0),
      role: "EXECUTOR",
    });
    const contractDigest = k.kernelDigest(contract);
    contracts.set(contractDigest, contract);
    const definition: k.WorkItemDefinition = {
      id: item.id,
      contract_digest: contractDigest,
      depends_on: [...item.depends_on],
      required_inputs: [...item.required_inputs],
      expected_outputs: [...item.expected_outputs],
      execution_requirements: {
        scope_roots: [...item.scope_roots],
        repository_effects: [],
        external_effects: [],
        capabilities: [...item.capabilities],
        resources: item.resource_claims.map(
          (claim) => `${claim.kind}:${claim.resource}:${claim.mode}`,
        ),
      },
      optional: item.optional,
    };
    definitions.set(item.id, definition);
    return definition;
  };
  const convertPlan = (
    plan: NonNullable<LegacyTaskAggregate["current_plan"]>,
    historical: boolean,
  ): k.PlanRecord => {
    const workItems = plan.proposal.work_items.work_items.map((item) => convertDefinition(item));
    const state = kernelPlanState(plan.approval.state, historical);
    const approved = state === "APPROVED" || state === "SUPERSEDED";
    return {
      revision: plan.revision,
      digest: k.kernelDigest({ revision: plan.revision, work_items: workItems }),
      state,
      approval_actor_id: approved ? plan.approval.approved_by : null,
      approval_evidence_digest: approved ? approvalEvidence(plan) : null,
      work_items: workItems,
    };
  };
  const planHistory = (task.plan_history ?? []).map((plan) => convertPlan(plan, true));
  const currentPlan = task.current_plan ? convertPlan(task.current_plan, false) : null;
  const workItems = Object.fromEntries(
    Object.entries(task.work_items).map(([id, runtime]) => {
      const definition = definitions.get(id);
      if (!definition) throw new Error(`migration_work_item_definition_missing:${id}`);
      const outputManifests: k.OutputManifest[] = runtime.output_manifests.map((manifest) => ({
        id: manifest.id,
        kind: manifest.kind,
        digest: manifest.digest as k.Sha256Digest,
        task_id: manifest.producer.task_id,
        plan_revision: manifest.producer.plan_revision,
        work_item_id: manifest.producer.work_item_id,
        attempt: manifest.producer.attempt,
        repository_fingerprint: manifest.repository_snapshot_digest as k.Sha256Digest,
      }));
      return [
        id,
        {
          definition,
          state: runtime.state === "COMPLETED" ? "RESULT_RECEIVED" : "CANCELLED",
          revision: runtime.revision,
          attempt: runtime.attempt,
          claim_id: runtime.claim_id,
          result_digest:
            runtime.state === "COMPLETED"
              ? (taskCentricDigest({
                  id,
                  attempt: runtime.attempt,
                  outputs: runtime.output_manifests,
                  validation: runtime.validation_result,
                }) as k.Sha256Digest)
              : null,
          output_manifests: outputManifests,
          validation: null,
        } satisfies k.WorkItemRuntime,
      ];
    }),
  );
  const state: k.TaskState = currentPlan
    ? currentPlan.state === "PROPOSED"
      ? "AWAITING_PLAN_APPROVAL"
      : currentPlan.state === "REJECTED"
        ? "PLANNING"
        : task.lifecycle
    : task.lifecycle === "CAPTURED"
      ? "CAPTURED"
      : "PLANNING";
  return {
    aggregate: {
      schema_version: 1,
      id: task.id,
      revision: task.revision,
      state,
      intent_digest: k.kernelDigest(intent),
      current_plan: currentPlan,
      plan_history: planHistory,
      work_items: workItems,
      final_validation: null,
      effects: [],
      mutation_receipts: {},
      controller_transfer: null,
      migration_receipts: [],
    },
    documents: { intent, contracts: Object.fromEntries(contracts) },
  };
}

function validateAssessment(opts: {
  assessment: BoundLifecycleOwnerMigrationAssessment | undefined;
  expected_binding: LifecycleOwnerMigrationFreshBinding;
  preview: LifecycleOwnerMigrationPreview;
}): {
  assessment: z.infer<typeof kernelMigrationSemanticAssessmentSchema> | null;
  digest: k.Sha256Digest | null;
  reason: string | null;
} {
  const request = opts.preview.semantic_assessment;
  if (!request)
    return opts.assessment
      ? { assessment: null, digest: null, reason: "semantic_assessment_not_requested" }
      : { assessment: null, digest: null, reason: null };
  if (!opts.assessment)
    return { assessment: null, digest: null, reason: "semantic_assessment_required" };
  const binding = opts.assessment.binding;
  if (
    !sameFreshBinding(binding, opts.expected_binding) ||
    binding.task_id !== opts.preview.task_id ||
    binding.source_digest !== opts.preview.source_digest ||
    binding.mapping_version !== opts.preview.mapping_version ||
    binding.mapping_digest !== request.mapping_digest
  )
    return { assessment: null, digest: null, reason: "semantic_assessment_binding_stale" };
  let admitted;
  try {
    admitted = admitSemanticResult(opts.assessment.exchange);
  } catch {
    return { assessment: null, digest: null, reason: "semantic_assessment_unadmitted" };
  }
  const parsed = kernelMigrationSemanticAssessmentSchema.safeParse(opts.assessment.assessment);
  if (!parsed.success)
    return { assessment: null, digest: null, reason: "semantic_assessment_incomplete" };
  const result = parsed.data;
  const assessmentDigest = k.kernelDigest(result);
  const canonicalBinding = admitted.work_order.canonical_binding;
  if (
    admitted.work_order.role !== "CURATOR" ||
    admitted.work_order.task.id !== opts.preview.task_id ||
    admitted.work_order.state_fingerprint.digest !==
      opts.expected_binding.state_fingerprint_digest ||
    canonicalBinding?.repository_identity !== opts.expected_binding.repository_identity ||
    !canonicalBinding ||
    !("authority_digest" in canonicalBinding) ||
    canonicalBinding.authority_digest !== opts.expected_binding.authority_digest ||
    !admitted.work_order.required_inputs.some(
      (input) => input.id === "migration-source" && input.digest === request.source_digest,
    ) ||
    !admitted.work_order.required_inputs.some(
      (input) => input.id === "migration-mapping" && input.digest === request.mapping_digest,
    ) ||
    !admitted.result.canonical_outputs?.some(
      (output) => output.id === "migration-assessment" && output.digest === assessmentDigest,
    )
  )
    return { assessment: null, digest: null, reason: "semantic_assessment_unadmitted" };
  if (
    result.task_id !== request.task_id ||
    result.mapping_version !== request.mapping_version ||
    result.source_digest !== request.source_digest ||
    result.mapping_digest !== request.mapping_digest
  )
    return { assessment: null, digest: null, reason: "semantic_assessment_binding_stale" };
  if (result.status !== "resolved")
    return { assessment: result, digest: null, reason: "semantic_assessment_blocked" };
  const expected = new Map(request.fields.map((field) => [field.source_path, field.target]));
  if (
    result.resolutions.length !== expected.size ||
    new Set(result.resolutions.map((resolution) => resolution.source_path)).size !==
      expected.size ||
    result.resolutions.some(
      (resolution) => expected.get(resolution.source_path) !== resolution.target,
    )
  )
    return { assessment: null, digest: null, reason: "semantic_assessment_incomplete" };
  return { assessment: result, digest: assessmentDigest, reason: null };
}

function prepareOutput(opts: {
  source: TaskByteSnapshot;
  output_revision: number;
  preview: LifecycleOwnerMigrationPreview;
  repository_identity: k.Sha256Digest;
  backend_identity: string;
  binding: LifecycleOwnerMigrationFreshBinding;
  assessment: z.infer<typeof kernelMigrationSemanticAssessmentSchema> | null;
  assessment_digest: k.Sha256Digest | null;
  backup_location: string;
}): { text: string; receipt: LifecycleOwnerMigrationReceipt } {
  const decoded = decodeLifecycleOwnerMigrationSource(Buffer.from(opts.source.text, "utf8"));
  const parsed = parseTaskReadme(opts.source.text);
  const disposition = opts.preview.formal_projection.disposition;
  const prepared =
    disposition === "read_only_archive"
      ? (() => {
          const contents = {
            schema_version: 1 as const,
            kind: "archived_task" as const,
            task_id: decoded.task_id,
            repository_identity: opts.repository_identity,
            source_digest: opts.preview.source_digest,
            migration_version: opts.preview.mapping_version,
            legacy_status: "DONE" as const,
            read_only: true as const,
          };
          const archive = { ...contents, digest: k.kernelDigest(contents) } satisfies KernelArchive;
          const projection = {
            state: "ARCHIVED" as const,
            read_only: true as const,
            task_id: decoded.task_id,
          };
          return {
            canonical: archive,
            status: "DONE",
            projection_digest: k.kernelDigest(projection),
          };
        })()
      : (() => {
          const converted = convertActiveTask(decoded.task);
          const record = makeKernelRecord(
            opts.repository_identity,
            converted.aggregate,
            [],
            converted.documents,
          );
          const projection = projectKernelTask(converted.aggregate);
          return {
            canonical: record,
            status: projection.status,
            projection_digest: projection.digest as k.Sha256Digest,
          };
        })();
  const receiptContents = {
    schema_version: 1 as const,
    migration_version: opts.preview.mapping_version,
    task_id: decoded.task_id,
    repository_identity: opts.repository_identity,
    backend_identity: opts.backend_identity,
    source_digest: opts.preview.source_digest,
    source_revision: opts.preview.source_revision,
    mapping_digest: k.kernelDigest(opts.preview.mapping),
    mapping_receipt: opts.preview.mapping,
    semantic_assessment_digest: opts.assessment_digest,
    semantic_assessment: opts.assessment,
    state_fingerprint_digest: opts.binding.state_fingerprint_digest,
    policy_digest: opts.binding.policy_digest,
    authority_digest: opts.binding.authority_digest,
    output_revision: opts.output_revision,
    disposition,
    canonical_digest: prepared.canonical.digest as k.Sha256Digest,
    projection_digest: prepared.projection_digest,
    backup_digest: opts.preview.source_digest,
    backup_location: opts.backup_location,
  };
  const migrationReceipt = receiptSchema.parse({
    ...receiptContents,
    receipt_digest: k.kernelDigest(receiptContents),
  });
  const extensions = { ...(parsed.frontmatter.extensions as Record<string, unknown> | undefined) };
  delete extensions[TASK_CENTRIC_EXTENSION];
  delete extensions[TASK_CENTRIC_RUNTIME_EXTENSION];
  extensions[TASK_KERNEL_EXTENSION] = prepared.canonical;
  extensions[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION] = migrationReceipt;
  const text = renderTaskReadme(
    {
      ...parsed.frontmatter,
      revision: migrationReceipt.output_revision,
      status: prepared.status,
      extensions,
    },
    parsed.body,
  );
  return { text, receipt: migrationReceipt };
}

type ResolvedMigrationSource = Readonly<{
  current: TaskByteSnapshot;
  source: TaskByteSnapshot;
  marker: LifecycleOwnerMigrationQuarantine | null;
}>;

async function resolveMigrationSource(opts: {
  current: TaskByteSnapshot;
  store: TaskByteStore;
  repository_identity: k.Sha256Digest;
}): Promise<ResolvedMigrationSource | null> {
  let extensions: Record<string, unknown> | undefined;
  try {
    extensions = parseTaskReadme(opts.current.text).frontmatter.extensions as
      | Record<string, unknown>
      | undefined;
  } catch {
    return { current: opts.current, source: opts.current, marker: null };
  }
  if (!Object.hasOwn(extensions ?? {}, LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION))
    return { current: opts.current, source: opts.current, marker: null };
  const marker = quarantineMarker(extensions?.[LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION]);
  if (
    marker?.task_id !== opts.current.task_id ||
    marker.repository_identity !== opts.repository_identity ||
    marker.backend_identity !== opts.store.backend_identity ||
    marker.output_revision !== opts.current.revision
  )
    return null;
  let text: string;
  try {
    text = await opts.store.readBackup(marker.backup_location);
  } catch {
    return null;
  }
  if (taskBytesDigest(text) !== marker.backup_digest) return null;
  return {
    current: opts.current,
    source: {
      task_id: marker.task_id,
      text,
      encoding_valid: true,
      digest: marker.source_digest,
      revision: marker.source_revision,
    },
    marker,
  };
}

async function persistQuarantine(opts: {
  store: TaskByteStore;
  repository_identity: k.Sha256Digest;
  resolved: ResolvedMigrationSource;
  preview: LifecycleOwnerMigrationPreview;
  binding: LifecycleOwnerMigrationFreshBinding;
  observe_binding: () => Promise<LifecycleOwnerMigrationFreshBinding>;
  reason: string;
}): Promise<LifecycleOwnerMigrationApplyResult> {
  const { current, source, marker } = opts.resolved;
  if (marker?.reason === opts.reason)
    return quarantine(opts.reason, source, opts.preview, true, marker.quarantine_digest);
  let backupLocation: string;
  try {
    backupLocation = await opts.store.backup(source);
  } catch {
    return { kind: "refused", reason: "backup_mismatch" };
  }
  if (!sameFreshBinding(freshBindingSchema.parse(await opts.observe_binding()), opts.binding))
    return { kind: "refused", reason: "preview_binding_stale" };
  const contents = {
    schema_version: 1 as const,
    kind: "lifecycle_owner_migration_quarantine" as const,
    task_id: opts.preview.task_id,
    repository_identity: opts.repository_identity,
    backend_identity: opts.store.backend_identity,
    source_digest: opts.preview.source_digest,
    source_revision: opts.preview.source_revision,
    mapping_version: opts.preview.mapping_version,
    mapping_digest: k.kernelDigest(opts.preview.mapping),
    mapping_receipt: opts.preview.mapping,
    semantic_assessment_request: opts.preview.semantic_assessment,
    reason: opts.reason,
    backup_digest: opts.preview.source_digest,
    backup_location: backupLocation,
    output_revision: current.revision + 1,
  };
  const durable = quarantineMarkerSchema.parse({
    ...contents,
    quarantine_digest: k.kernelDigest(contents),
  });
  const parsed = parseTaskReadme(current.text);
  const extensions = { ...(parsed.frontmatter.extensions as Record<string, unknown> | undefined) };
  delete extensions[TASK_CENTRIC_EXTENSION];
  delete extensions[TASK_CENTRIC_RUNTIME_EXTENSION];
  delete extensions[TASK_KERNEL_EXTENSION];
  delete extensions[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION];
  extensions[LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION] = durable;
  const text = renderTaskReadme(
    {
      ...parsed.frontmatter,
      revision: durable.output_revision,
      status: "BLOCKED",
      extensions,
    },
    parsed.body,
  );
  try {
    if (!(await opts.store.compareAndSwap(current, text)))
      return { kind: "refused", reason: "source_changed" };
  } catch {
    const observed = await opts.store.read(opts.preview.task_id).catch(() => null);
    if (observed?.revision !== durable.output_revision || observed.digest !== taskBytesDigest(text))
      return { kind: "refused", reason: "write_in_doubt" };
  }
  const observed = await opts.store.read(opts.preview.task_id).catch(() => null);
  if (observed?.revision !== durable.output_revision || observed.digest !== taskBytesDigest(text))
    return { kind: "refused", reason: "write_in_doubt" };
  return quarantine(opts.reason, source, opts.preview, true, durable.quarantine_digest);
}

/** Inspect the exact legacy source, including a source retained behind a durable quarantine. */
export async function inspectLifecycleOwnerMigration(opts: {
  store: TaskByteStore;
  repository_identity: k.Sha256Digest;
  task_id: string;
}): Promise<
  | Readonly<{
      kind: "ready";
      current: TaskByteSnapshot;
      source: TaskByteSnapshot;
      preview: LifecycleOwnerMigrationPreview;
      quarantine: LifecycleOwnerMigrationQuarantine | null;
    }>
  | Readonly<{
      kind: "applied";
      current: TaskByteSnapshot;
      receipt: LifecycleOwnerMigrationReceipt;
    }>
  | Readonly<{ kind: "missing" | "invalid" }>
> {
  const current = await opts.store.read(opts.task_id);
  if (!current) return { kind: "missing" };
  try {
    const extensions = parseTaskReadme(current.text).frontmatter.extensions as
      | Record<string, unknown>
      | undefined;
    const applied = receipt(extensions?.[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION]);
    if (
      applied?.task_id === opts.task_id &&
      applied.repository_identity === opts.repository_identity &&
      applied.backend_identity === opts.store.backend_identity &&
      applied.output_revision === current.revision &&
      (extensions?.[TASK_KERNEL_EXTENSION] as { digest?: unknown } | undefined)?.digest ===
        applied.canonical_digest &&
      taskBytesDigest(await opts.store.readBackup(applied.backup_location)) ===
        applied.backup_digest
    )
      return { kind: "applied", current, receipt: applied };
  } catch {
    return { kind: "invalid" };
  }
  const resolved = await resolveMigrationSource({
    current,
    store: opts.store,
    repository_identity: opts.repository_identity,
  });
  if (!resolved) return { kind: "invalid" };
  try {
    return {
      kind: "ready",
      ...resolved,
      preview: previewLifecycleOwnerMigration(Buffer.from(resolved.source.text, "utf8")),
      quarantine: resolved.marker,
    };
  } catch {
    return { kind: "invalid" };
  }
}

async function proveAlreadyApplied(opts: {
  source: TaskByteSnapshot;
  store: TaskByteStore;
  request: LifecycleOwnerMigrationApplyRequest;
  repository_identity: k.Sha256Digest;
}): Promise<LifecycleOwnerMigrationApplyResult | null> {
  let frontmatter: Record<string, unknown>;
  try {
    frontmatter = parseTaskReadme(opts.source.text).frontmatter;
  } catch {
    return null;
  }
  const extensions = frontmatter.extensions as Record<string, unknown> | undefined;
  const currentReceipt = receipt(extensions?.[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION]);
  if (!currentReceipt) return null;
  if (
    currentReceipt.task_id !== opts.request.task_id ||
    currentReceipt.repository_identity !== opts.repository_identity ||
    currentReceipt.backend_identity !== opts.store.backend_identity ||
    currentReceipt.source_digest !== opts.request.source_digest ||
    currentReceipt.mapping_digest !== opts.request.mapping_digest ||
    currentReceipt.migration_version !== opts.request.mapping_version ||
    currentReceipt.output_revision !== opts.source.revision ||
    (extensions?.[TASK_KERNEL_EXTENSION] as { digest?: unknown } | undefined)?.digest !==
      currentReceipt.canonical_digest
  )
    return { kind: "refused", reason: "state_changed_after_migration" };
  try {
    const backup = await opts.store.readBackup(currentReceipt.backup_location);
    if (taskBytesDigest(backup) !== currentReceipt.backup_digest)
      return { kind: "refused", reason: "backup_mismatch" };
  } catch {
    return { kind: "refused", reason: "backup_mismatch" };
  }
  return {
    kind: "already_applied",
    receipt: currentReceipt,
    output_bytes_digest: opts.source.digest,
  };
}

export type LifecycleOwnerMigrationApplyRequest = Readonly<{
  task_id: string;
  source_digest: k.Sha256Digest;
  mapping_version: string;
  mapping_digest: k.Sha256Digest;
  binding: LifecycleOwnerMigrationFreshBinding;
  semantic_assessment?: BoundLifecycleOwnerMigrationAssessment;
}>;

/** Apply one reviewed preview while holding the common task execution fence and source-byte CAS. */
export async function applyLifecycleOwnerMigration(opts: {
  store: TaskByteStore;
  repository_identity: k.Sha256Digest;
  journal_path: string;
  request: LifecycleOwnerMigrationApplyRequest;
  observe_binding: () => Promise<LifecycleOwnerMigrationFreshBinding>;
}): Promise<LifecycleOwnerMigrationApplyResult> {
  const fenced = await withSupervisorExecutionAdmissionFence({
    journal_path: opts.journal_path,
    run: async (journal) => {
      const admission = inspectKernelMigrationAdmission(journal);
      if (!admission.admitted) return { kind: "refused", reason: admission.reason } as const;
      const current = await opts.store.read(opts.request.task_id);
      if (!current) return { kind: "refused", reason: "missing" } as const;
      const repeated = await proveAlreadyApplied({
        source: current,
        store: opts.store,
        request: opts.request,
        repository_identity: opts.repository_identity,
      });
      if (repeated) return repeated;
      const resolved = await resolveMigrationSource({
        current,
        store: opts.store,
        repository_identity: opts.repository_identity,
      });
      if (!resolved) return { kind: "refused", reason: "quarantine_invalid" } as const;
      const source = resolved.source;
      if (
        source.digest !== opts.request.source_digest ||
        opts.request.binding.repository_identity !== opts.repository_identity ||
        !sameFreshBinding(
          freshBindingSchema.parse(await opts.observe_binding()),
          opts.request.binding,
        )
      )
        return { kind: "refused", reason: "preview_binding_stale" } as const;
      let preview: LifecycleOwnerMigrationPreview;
      try {
        preview = previewLifecycleOwnerMigration(Buffer.from(source.text, "utf8"));
      } catch {
        return { kind: "refused", reason: "source_invalid" } as const;
      }
      if (
        preview.source_digest !== opts.request.source_digest ||
        preview.mapping_version !== opts.request.mapping_version ||
        k.kernelDigest(preview.mapping) !== opts.request.mapping_digest
      )
        return { kind: "refused", reason: "preview_binding_stale" } as const;
      if (preview.mapping.blockers.length > 0) return quarantine("formal_blocker", source, preview);
      if (
        preview.mapping.pending.work_item_ids.length > 0 ||
        preview.mapping.pending.lease_ids.length > 0 ||
        preview.mapping.pending.effect_operation_ids.length > 0
      )
        return quarantine("legacy_work_not_quiescent", source, preview);
      const assessment = validateAssessment({
        assessment: opts.request.semantic_assessment,
        expected_binding: opts.request.binding,
        preview,
      });
      if (assessment.reason)
        return persistQuarantine({
          store: opts.store,
          repository_identity: opts.repository_identity,
          resolved,
          preview,
          binding: opts.request.binding,
          observe_binding: opts.observe_binding,
          reason: assessment.reason,
        });
      let backupLocation: string;
      try {
        backupLocation = await opts.store.backup(source);
      } catch {
        return { kind: "refused", reason: "backup_mismatch" } as const;
      }
      if (
        !sameFreshBinding(
          freshBindingSchema.parse(await opts.observe_binding()),
          opts.request.binding,
        )
      )
        return { kind: "refused", reason: "preview_binding_stale" } as const;
      let prepared: ReturnType<typeof prepareOutput>;
      try {
        prepared = prepareOutput({
          source,
          output_revision: current.revision + 1,
          preview,
          repository_identity: opts.repository_identity,
          backend_identity: opts.store.backend_identity,
          binding: opts.request.binding,
          assessment: assessment.assessment,
          assessment_digest: assessment.digest,
          backup_location: backupLocation,
        });
      } catch {
        return quarantine("canonical_projection_invalid", source, preview);
      }
      try {
        if (!(await opts.store.compareAndSwap(current, prepared.text)))
          return { kind: "refused", reason: "source_changed" } as const;
      } catch {
        const observed = await opts.store.read(opts.request.task_id).catch(() => null);
        if (observed?.revision !== prepared.receipt.output_revision)
          return { kind: "refused", reason: "write_in_doubt" } as const;
      }
      const observed = await opts.store.read(opts.request.task_id).catch(() => null);
      if (observed?.revision !== prepared.receipt.output_revision)
        return { kind: "refused", reason: "write_in_doubt" } as const;
      const proof = await proveAlreadyApplied({
        source: observed,
        store: opts.store,
        request: opts.request,
        repository_identity: opts.repository_identity,
      });
      return proof?.kind === "already_applied"
        ? { ...proof, kind: "applied" as const }
        : { kind: "refused" as const, reason: "readback_mismatch" };
    },
  });
  return fenced.kind === "busy"
    ? { kind: "refused", reason: "supervisor_execution_active" }
    : fenced.result;
}

/** Restore retained source bytes only when the exact migration output is still current. */
export async function rollbackLifecycleOwnerMigration(opts: {
  store: TaskByteStore;
  repository_identity: k.Sha256Digest;
  receipt: LifecycleOwnerMigrationReceipt;
  expected_output_digest: k.Sha256Digest;
}): Promise<
  | Readonly<{ kind: "rolled_back"; source_digest: k.Sha256Digest }>
  | Readonly<{ kind: "refused"; reason: string }>
> {
  const current = await opts.store.read(opts.receipt.task_id);
  if (!current) return { kind: "refused", reason: "missing" };
  let extensions: Record<string, unknown> | undefined;
  try {
    extensions = parseTaskReadme(current.text).frontmatter.extensions as
      | Record<string, unknown>
      | undefined;
  } catch {
    return { kind: "refused", reason: "state_changed_after_migration" };
  }
  const durable = receipt(extensions?.[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION]);
  if (
    durable?.receipt_digest !== opts.receipt.receipt_digest ||
    durable.repository_identity !== opts.repository_identity ||
    durable.backend_identity !== opts.store.backend_identity ||
    durable.output_revision !== current.revision ||
    current.digest !== opts.expected_output_digest
  )
    return { kind: "refused", reason: "state_changed_after_migration" };
  let source: string;
  try {
    source = await opts.store.readBackup(durable.backup_location);
  } catch {
    return { kind: "refused", reason: "backup_mismatch" };
  }
  if (taskBytesDigest(source) !== durable.backup_digest)
    return { kind: "refused", reason: "backup_mismatch" };
  if (!(await opts.store.compareAndSwap(current, source)))
    return { kind: "refused", reason: "source_changed" };
  const observed = await opts.store.read(durable.task_id).catch(() => null);
  return observed?.digest === durable.source_digest && observed.revision === durable.source_revision
    ? { kind: "rolled_back", source_digest: durable.source_digest }
    : { kind: "refused", reason: "write_in_doubt" };
}
