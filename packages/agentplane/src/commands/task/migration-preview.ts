import { createHash } from "node:crypto";

import {
  createLegacyTaskAggregate,
  kernelMigrationSemanticAssessmentRequestSchema,
  mapTaskCentricKernelMigration,
  parseTaskReadme,
  taskCentricDigest,
  taskCentricAggregateFromExtensions,
  taskKernel as k,
  type TaskAggregate,
  type TaskCentricMigrationRuntime,
} from "@agentplaneorg/core/tasks";

const TASK_CENTRIC_RUNTIME_EXTENSION_KEY = "agentplane.task_centric_runtime";

export type LifecycleOwnerMigrationPreview = Readonly<{
  schema_version: 1;
  kind: "lifecycle_owner_migration_preview";
  mapping_version: string;
  task_id: string;
  source_class: "legacy" | "parallel";
  source_digest: k.Sha256Digest;
  source_revision: number;
  source_bytes: Readonly<{ encoding: "base64"; value: string }>;
  status: "ready" | "semantic_assessment_required" | "blocked";
  mapping: ReturnType<typeof mapTaskCentricKernelMigration>;
  formal_projection: Readonly<{
    disposition: "kernel_task" | "read_only_archive";
    state: TaskAggregate["lifecycle"];
    intent_digest: k.Sha256Digest;
    current_plan: Readonly<{
      revision: number;
      digest: k.Sha256Digest;
      approval_state: string;
    }> | null;
    work_items: Readonly<
      Record<
        string,
        Readonly<{
          state: string;
          revision: number;
          attempt: number;
          claim_id: string | null;
          output_manifests: readonly Readonly<{
            id: string;
            kind: string;
            digest: k.Sha256Digest;
            task_id: string;
            plan_revision: number;
            work_item_id: string;
            attempt: number;
            repository_fingerprint: k.Sha256Digest;
          }>[];
          legacy_validation_digest: k.Sha256Digest | null;
        }>
      >
    >;
    retained_source_task_digest: k.Sha256Digest;
    retained_source_runtime_digest: k.Sha256Digest;
  }>;
  semantic_assessment: ReturnType<
    typeof kernelMigrationSemanticAssessmentRequestSchema.parse
  > | null;
  digest: k.Sha256Digest;
}>;

function bytesDigest(bytes: Uint8Array): k.Sha256Digest {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function decodeRuntime(extensions: Readonly<Record<string, unknown>>): TaskCentricMigrationRuntime {
  const value = extensions[TASK_CENTRIC_RUNTIME_EXTENSION_KEY];
  if (value === undefined)
    return {
      events: [],
      leases: [],
      pending_effects: [],
      checkpoints: [],
      retry_budgets: [],
      mutation_receipts: {},
    };
  const runtime = object(value);
  if (
    runtime?.schema_version !== 1 ||
    (runtime.events !== undefined && !Array.isArray(runtime.events)) ||
    !Array.isArray(runtime.leases) ||
    !Array.isArray(runtime.pending_effects) ||
    !Array.isArray(runtime.checkpoints) ||
    !Array.isArray(runtime.retry_budgets) ||
    !object(runtime.mutation_receipts)
  )
    throw new Error("Task-centric runtime projection is malformed");
  return {
    events: runtime.events ?? [],
    leases: runtime.leases,
    pending_effects: runtime.pending_effects,
    checkpoints: runtime.checkpoints,
    retry_budgets: runtime.retry_budgets,
    mutation_receipts: runtime.mutation_receipts,
  } as TaskCentricMigrationRuntime;
}

function decodeSource(sourceBytes: Buffer): {
  task_id: string;
  source_revision: number;
  source_class: "legacy" | "parallel";
  source_record: Readonly<{ frontmatter: Record<string, unknown>; body: string }>;
  task: TaskAggregate;
  runtime: TaskCentricMigrationRuntime;
} {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(sourceBytes);
  const { frontmatter, body } = parseTaskReadme(text);
  if (typeof frontmatter.id !== "string" || !frontmatter.id)
    throw new Error("Migration source has no Task identity");
  const sourceRevision = Number(frontmatter.revision ?? 1);
  if (!Number.isSafeInteger(sourceRevision) || sourceRevision < 1)
    throw new Error("Migration source has an invalid revision");
  const extensions = object(frontmatter.extensions) ?? {};
  const parallel = taskCentricAggregateFromExtensions(extensions);
  const capturedAt =
    typeof frontmatter.doc_updated_at === "string"
      ? frontmatter.doc_updated_at
      : new Date(0).toISOString();
  const title = typeof frontmatter.title === "string" ? frontmatter.title : "";
  const description =
    typeof frontmatter.description === "string" ? frontmatter.description : body.trim();
  const status = typeof frontmatter.status === "string" ? frontmatter.status : "TODO";
  const acceptance =
    Array.isArray(frontmatter.verify) && frontmatter.verify.length > 0
      ? frontmatter.verify
      : [body.trim() || description || title || frontmatter.id];
  const task =
    parallel ??
    createLegacyTaskAggregate({
      id: frontmatter.id,
      revision: sourceRevision,
      title,
      description,
      status,
      acceptance_criteria: acceptance.filter((entry): entry is string => typeof entry === "string"),
      captured_at: capturedAt,
      updated_at: capturedAt,
    });
  return {
    task_id: frontmatter.id,
    source_revision: sourceRevision,
    source_class: parallel ? "parallel" : "legacy",
    source_record: { frontmatter: frontmatter as Record<string, unknown>, body },
    task,
    runtime: decodeRuntime(extensions),
  };
}

/** Read-only lifecycle-owner preview. It has no ports and cannot dispatch or persist. */
export function previewLifecycleOwnerMigration(
  source_bytes: Uint8Array,
): LifecycleOwnerMigrationPreview {
  const sourceBytes = Buffer.from(source_bytes);
  const sourceDigest = bytesDigest(sourceBytes);
  const decoded = decodeSource(sourceBytes);
  const mapping = mapTaskCentricKernelMigration({
    task: decoded.task,
    runtime: decoded.runtime,
    source_task_id: decoded.task_id,
    source_revision: decoded.source_revision,
    source_record: decoded.source_record,
    terminal_archive:
      decoded.task.lifecycle === "COMPLETED" || decoded.task.lifecycle === "CANCELLED",
  });
  const mappingDigest = k.kernelDigest(mapping);
  const formalProjection = {
    disposition:
      decoded.task.lifecycle === "COMPLETED" || decoded.task.lifecycle === "CANCELLED"
        ? ("read_only_archive" as const)
        : ("kernel_task" as const),
    state: decoded.task.lifecycle,
    intent_digest: k.kernelDigest(decoded.task.intent),
    current_plan: decoded.task.current_plan
      ? {
          revision: decoded.task.current_plan.revision,
          digest: decoded.task.current_plan.digest as k.Sha256Digest,
          approval_state: decoded.task.current_plan.approval.state,
        }
      : null,
    work_items: Object.fromEntries(
      Object.entries(decoded.task.work_items)
        .toSorted(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
        .map(([id, item]) => [
          id,
          {
            state: item.state,
            revision: item.revision,
            attempt: item.attempt,
            claim_id: item.claim_id,
            output_manifests: item.output_manifests.map((manifest) => ({
              id: manifest.id,
              kind: manifest.kind,
              digest: manifest.digest as k.Sha256Digest,
              task_id: manifest.producer.task_id,
              plan_revision: manifest.producer.plan_revision,
              work_item_id: manifest.producer.work_item_id,
              attempt: manifest.producer.attempt,
              repository_fingerprint: manifest.repository_snapshot_digest as k.Sha256Digest,
            })),
            legacy_validation_digest: item.validation_result
              ? (taskCentricDigest(item.validation_result) as k.Sha256Digest)
              : null,
          },
        ]),
    ),
    retained_source_task_digest: mapping.source_task_digest as k.Sha256Digest,
    retained_source_runtime_digest: mapping.source_runtime_digest as k.Sha256Digest,
  };
  const status: LifecycleOwnerMigrationPreview["status"] =
    mapping.blockers.length > 0
      ? "blocked"
      : mapping.semantic_assessment_fields.length > 0
        ? "semantic_assessment_required"
        : "ready";
  const semanticAssessment =
    status === "semantic_assessment_required"
      ? kernelMigrationSemanticAssessmentRequestSchema.parse({
          schema_version: 1,
          kind: "kernel_migration_semantic_assessment",
          task_id: decoded.task_id,
          mapping_version: mapping.mapping_version,
          source_digest: sourceDigest,
          source_bytes_base64: sourceBytes.toString("base64"),
          mapping_digest: mappingDigest,
          fields: mapping.semantic_assessment_fields,
          stop_rules: [
            "Interpret only the listed semantic fields.",
            "Do not override integrity, authority, stale-state, or unresolved-effect blockers.",
            "Bind every resolution to this source digest, mapping version, and mapping digest.",
          ],
        })
      : null;
  const contents = {
    schema_version: 1 as const,
    kind: "lifecycle_owner_migration_preview" as const,
    mapping_version: mapping.mapping_version,
    task_id: decoded.task_id,
    source_class: decoded.source_class,
    source_digest: sourceDigest,
    source_revision: decoded.source_revision,
    source_bytes: { encoding: "base64" as const, value: sourceBytes.toString("base64") },
    status,
    mapping,
    formal_projection: formalProjection,
    semantic_assessment: semanticAssessment,
  };
  return Object.freeze({ ...contents, digest: k.kernelDigest(contents) });
}
