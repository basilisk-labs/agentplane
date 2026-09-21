import { createHash } from "node:crypto";

import {
  kernelMigrationSemanticAssessmentRequestSchema,
  mapTaskCentricKernelMigration,
  taskCentricDigest,
  taskKernel as k,
  type TaskAggregate,
  type TaskCentricMigrationRuntime,
} from "@agentplaneorg/core/tasks";

export type LifecycleOwnerMigrationPreview = Readonly<{
  schema_version: 1;
  kind: "lifecycle_owner_migration_preview";
  mapping_version: string;
  task_id: string;
  source_digest: k.Sha256Digest;
  source_revision: number;
  source_bytes: Readonly<{ encoding: "base64"; value: string }>;
  status: "ready" | "semantic_assessment_required" | "blocked";
  mapping: ReturnType<typeof mapTaskCentricKernelMigration>;
  formal_projection: Readonly<{
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

/** Read-only lifecycle-owner preview. It has no ports and cannot dispatch or persist. */
export function previewLifecycleOwnerMigration(opts: {
  task_id: string;
  source_revision: number;
  source_bytes: Uint8Array;
  task: TaskAggregate;
  runtime: TaskCentricMigrationRuntime;
}): LifecycleOwnerMigrationPreview {
  const sourceBytes = Buffer.from(opts.source_bytes);
  const sourceDigest = bytesDigest(sourceBytes);
  const mapping = mapTaskCentricKernelMigration({
    task: opts.task,
    runtime: opts.runtime,
    source_task_id: opts.task_id,
    source_revision: opts.source_revision,
  });
  const mappingDigest = k.kernelDigest(mapping);
  const formalProjection = {
    state: opts.task.lifecycle,
    intent_digest: k.kernelDigest(opts.task.intent),
    current_plan: opts.task.current_plan
      ? {
          revision: opts.task.current_plan.revision,
          digest: opts.task.current_plan.digest as k.Sha256Digest,
          approval_state: opts.task.current_plan.approval.state,
        }
      : null,
    work_items: Object.fromEntries(
      Object.entries(opts.task.work_items)
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
          task_id: opts.task_id,
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
    task_id: opts.task_id,
    source_digest: sourceDigest,
    source_revision: opts.source_revision,
    source_bytes: { encoding: "base64" as const, value: sourceBytes.toString("base64") },
    status,
    mapping,
    formal_projection: formalProjection,
    semantic_assessment: semanticAssessment,
  };
  return Object.freeze({ ...contents, digest: k.kernelDigest(contents) });
}
