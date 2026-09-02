import { renderTaskReadme, taskKernel } from "@agentplaneorg/core/tasks";
import { z } from "zod";
import type { TaskByteSnapshot, TaskByteStore } from "../../ports/task-byte-store.js";
import { taskBytesDigest } from "../../backends/task-backend/local-task-byte-store.js";
import { classifyMigrationSource, type MigrationSource } from "./kernel-migration-source.js";
import { makeKernelRecord, TASK_KERNEL_EXTENSION, type KernelArchive } from "./kernel-record.js";
import { projectKernelTask } from "./kernel-projector.js";

const KERNEL_MIGRATION_VERSION = "clean-task-core-v1";
export const KERNEL_MIGRATION_EXTENSION = "task_kernel_migration";
const digest = z
  .string()
  .regex(/^sha256:[a-f0-9]{64}$/u)
  .transform((value) => value as taskKernel.Sha256Digest);
const revision = z.number().int().nonnegative();
const kernelMigrationReceiptSchema = z.strictObject({
  schema_version: z.literal(1),
  migration_version: z.literal(KERNEL_MIGRATION_VERSION),
  task_id: z.string().min(1),
  repository_identity: digest,
  backend_identity: z.string().min(1),
  source_schema: z.literal("task-readme-v1"),
  source_class: z.enum(["legacy_active", "legacy_terminal"]),
  source_digest: digest,
  source_revision: revision,
  output_revision: revision,
  canonical_digest: digest,
  projection_digest: digest,
  backup_digest: digest,
  backup_location: z.string().min(1),
  input_classification: z.strictObject({
    context_refs: z.array(z.string()),
    output_manifest_refs: z.array(z.string()),
  }),
  digest,
});
type KernelMigrationReceipt = z.infer<typeof kernelMigrationReceiptSchema>;
export const kernelMigrationProofSchema = z.strictObject({
  receipt: kernelMigrationReceiptSchema,
  output_bytes_digest: digest,
  readback: z.literal("confirmed"),
});
export type KernelMigrationProof = z.infer<typeof kernelMigrationProofSchema>;
export type KernelMigrationResult =
  | { kind: "applied" | "already_applied"; proof: KernelMigrationProof }
  | { kind: "rolled_back"; source_digest: taskKernel.Sha256Digest }
  | { kind: "refused"; reason: string };

type LegacySource = Extract<MigrationSource, { kind: "legacy_active" | "legacy_terminal" }>;

function prepare(
  source: LegacySource,
  repositoryIdentity: taskKernel.Sha256Digest,
  backendIdentity: string,
  backupLocation: string,
) {
  const archiveContents = {
    schema_version: 1 as const,
    kind: "archived_task" as const,
    task_id: source.task.id,
    repository_identity: repositoryIdentity,
    source_digest: source.source.digest,
    migration_version: KERNEL_MIGRATION_VERSION,
    legacy_status: "DONE" as const,
    read_only: true as const,
  };
  // This explicit one-time migration creates no execution plan, approval, WorkItem or evidence.
  const aggregate: taskKernel.TaskAggregate = {
    schema_version: 1,
    id: source.task.id,
    revision: 0,
    state: "PLANNING",
    intent_digest: taskKernel.kernelDigest({
      title: source.task.title,
      description: source.task.description,
    }),
    current_plan: null,
    plan_history: [],
    work_items: {},
    final_validation: null,
    effects: [],
    mutation_receipts: {},
    controller_transfer: null,
    migration_receipts: [],
  };
  const record =
    source.kind === "legacy_terminal"
      ? ({
          ...archiveContents,
          digest: taskKernel.kernelDigest(archiveContents),
        } satisfies KernelArchive)
      : makeKernelRecord(repositoryIdentity, aggregate, []);
  const projection =
    source.kind === "legacy_terminal"
      ? {
          digest: taskKernel.kernelDigest({
            state: "ARCHIVED",
            read_only: true,
            task_id: source.task.id,
          }),
          status: "DONE",
        }
      : projectKernelTask(aggregate);
  const receiptContents = {
    schema_version: 1 as const,
    migration_version: KERNEL_MIGRATION_VERSION,
    task_id: source.task.id,
    repository_identity: repositoryIdentity,
    backend_identity: backendIdentity,
    source_schema: "task-readme-v1" as const,
    source_class: source.kind,
    source_digest: source.source.digest,
    source_revision: source.source.revision,
    output_revision: source.source.revision + 1,
    canonical_digest: record.digest,
    projection_digest: projection.digest,
    backup_digest: source.source.digest,
    backup_location: backupLocation,
    input_classification: source.inputs,
  };
  const receipt = kernelMigrationReceiptSchema.parse({
    ...receiptContents,
    digest: taskKernel.kernelDigest(receiptContents),
  });
  const frontmatter = {
    ...source.frontmatter,
    revision: receipt.output_revision,
    status: projection.status,
    extensions: {
      ...source.task.extensions,
      [TASK_KERNEL_EXTENSION]: record,
      [KERNEL_MIGRATION_EXTENSION]: receipt,
    },
  };
  return { receipt, text: renderTaskReadme(frontmatter, source.body) };
}

function validReceipt(value: unknown): KernelMigrationReceipt | null {
  const parsed = kernelMigrationReceiptSchema.safeParse(value);
  if (!parsed.success) return null;
  const { digest: claimed, ...contents } = parsed.data;
  return taskKernel.kernelDigest(contents) === claimed ? parsed.data : null;
}

/** Explicit migration only. This service is not called by normal mutation or read fallbacks. */
export class KernelMigration {
  constructor(
    readonly store: TaskByteStore,
    readonly repositoryIdentity: taskKernel.Sha256Digest,
  ) {}

  async inspect(taskId: string): Promise<MigrationSource | { kind: "missing" }> {
    const source = await this.store.read(taskId);
    return source ? classifyMigrationSource(source, this.repositoryIdentity) : { kind: "missing" };
  }

  async dryRun(taskId: string) {
    const source = await this.inspect(taskId);
    const next =
      "frontmatter" in source
        ? prepare(
            source,
            this.repositoryIdentity,
            this.store.backend_identity,
            this.store.backupLocation(source.source),
          )
        : null;
    return {
      task_id: taskId,
      classification: source.kind,
      source_digest: "source" in source ? source.source.digest : null,
      source_revision: "source" in source ? source.source.revision : null,
      reason: "reason" in source ? source.reason : null,
      fields: "fields" in source ? source.fields : [],
      proposed_canonical_digest: next?.receipt.canonical_digest ?? null,
      proposed_projection_digest: next?.receipt.projection_digest ?? null,
      proposed_output_bytes_digest: next ? taskBytesDigest(next.text) : null,
      backup_location: next?.receipt.backup_location ?? null,
      rollback_capability: next ? "exact_bytes_cas" : "not_applicable",
      input_classification: next?.receipt.input_classification ?? null,
    };
  }

  private async readVerifiedBackup(receipt: KernelMigrationReceipt): Promise<string | null> {
    const backup = await this.store.readBackup(receipt.backup_location);
    return taskBytesDigest(backup) === receipt.backup_digest &&
      receipt.backup_digest === receipt.source_digest
      ? backup
      : null;
  }

  private async proveCurrent(
    source: Extract<MigrationSource, { kind: "canonical" | "archived" }>,
  ): Promise<KernelMigrationProof | null> {
    const receipt = validReceipt(source.task.extensions?.[KERNEL_MIGRATION_EXTENSION]);
    if (
      receipt?.task_id !== source.source.task_id ||
      receipt.repository_identity !== this.repositoryIdentity ||
      receipt.backend_identity !== this.store.backend_identity
    )
      return null;
    const backup = await this.readVerifiedBackup(receipt);
    if (backup === null) return null;
    const original: TaskByteSnapshot = {
      task_id: receipt.task_id,
      text: backup,
      encoding_valid: true,
      digest: receipt.source_digest,
      revision: receipt.source_revision,
    };
    const classification = classifyMigrationSource(original, this.repositoryIdentity);
    if (classification.kind !== "legacy_active" && classification.kind !== "legacy_terminal")
      return null;
    const expected = prepare(
      classification,
      this.repositoryIdentity,
      this.store.backend_identity,
      receipt.backup_location,
    );
    if (
      expected.receipt.digest !== receipt.digest ||
      taskBytesDigest(expected.text) !== source.source.digest ||
      source.source.revision !== receipt.output_revision
    )
      return null;
    return { receipt, output_bytes_digest: source.source.digest, readback: "confirmed" };
  }

  async apply(
    taskId: string,
    expectedSourceDigest: taskKernel.Sha256Digest,
  ): Promise<KernelMigrationResult> {
    const current = await this.inspect(taskId);
    if (current.kind === "missing") return { kind: "refused", reason: "missing" };
    if (current.kind === "quarantined") return { kind: "refused", reason: current.reason };
    if (current.kind === "canonical" || current.kind === "archived") {
      try {
        const proof = await this.proveCurrent(current);
        return proof?.receipt.source_digest === expectedSourceDigest
          ? { kind: "already_applied", proof }
          : { kind: "refused", reason: "state_changed_after_migration" };
      } catch {
        return { kind: "refused", reason: "backup_mismatch" };
      }
    }
    if (!("frontmatter" in current))
      return { kind: "refused", reason: "state_changed_after_migration" };
    if (current.source.digest !== expectedSourceDigest)
      return { kind: "refused", reason: "source_changed" };
    let backup: string;
    try {
      backup = await this.store.backup(current.source);
    } catch {
      return { kind: "refused", reason: "backup_mismatch" };
    }
    const next = prepare(current, this.repositoryIdentity, this.store.backend_identity, backup);
    let writeFailed = false;
    try {
      if (!(await this.store.compareAndSwap(current.source, next.text)))
        return { kind: "refused", reason: "source_changed" };
    } catch {
      writeFailed = true;
    }
    try {
      const observed = await this.store.read(taskId);
      if (
        observed?.digest !== taskBytesDigest(next.text) ||
        observed.revision !== next.receipt.output_revision
      ) {
        return { kind: "refused", reason: writeFailed ? "write_in_doubt" : "readback_mismatch" };
      }
      return {
        kind: "applied",
        proof: {
          receipt: next.receipt,
          output_bytes_digest: observed.digest,
          readback: "confirmed",
        },
      };
    } catch {
      return { kind: "refused", reason: "write_in_doubt" };
    }
  }

  /** The first item is the canary. Never proceed after an unexplained failure. */
  async applyCanaryBatch(
    items: readonly { task_id: string; source_digest: taskKernel.Sha256Digest }[],
  ): Promise<KernelMigrationResult[]> {
    if (new Set(items.map((item) => item.task_id)).size !== items.length)
      return [{ kind: "refused", reason: "duplicate_task" }];
    const results: KernelMigrationResult[] = [];
    for (const item of items) {
      const result = await this.apply(item.task_id, item.source_digest);
      results.push(result);
      if (result.kind === "refused") break;
    }
    return results;
  }

  async rollback(input: unknown): Promise<KernelMigrationResult> {
    const parsed = kernelMigrationProofSchema.safeParse(input);
    if (!parsed.success || !validReceipt(parsed.data.receipt))
      return { kind: "refused", reason: "invalid_receipt" };
    const { receipt, output_bytes_digest: outputDigest } = parsed.data;
    if (
      receipt.repository_identity !== this.repositoryIdentity ||
      receipt.backend_identity !== this.store.backend_identity
    )
      return { kind: "refused", reason: "receipt_identity_mismatch" };
    let current: TaskByteSnapshot | null;
    try {
      current = await this.store.read(receipt.task_id);
    } catch {
      return { kind: "refused", reason: "rollback_in_doubt" };
    }
    if (current?.digest === receipt.source_digest && current.revision === receipt.source_revision) {
      try {
        return (await this.readVerifiedBackup(receipt)) === current.text
          ? { kind: "rolled_back", source_digest: current.digest }
          : { kind: "refused", reason: "backup_mismatch" };
      } catch {
        return { kind: "refused", reason: "backup_mismatch" };
      }
    }
    if (current?.digest !== outputDigest || current.revision !== receipt.output_revision)
      return { kind: "refused", reason: "state_changed_after_migration" };
    let backup: string;
    try {
      const verifiedBackup = await this.readVerifiedBackup(receipt);
      if (verifiedBackup === null) return { kind: "refused", reason: "backup_mismatch" };
      backup = verifiedBackup;
      const classification = classifyMigrationSource(current, this.repositoryIdentity);
      if (classification.kind !== "canonical" && classification.kind !== "archived")
        return { kind: "refused", reason: "state_changed_after_migration" };
      const proof = await this.proveCurrent(classification);
      if (proof?.receipt.digest !== receipt.digest)
        return { kind: "refused", reason: "state_changed_after_migration" };
    } catch {
      return { kind: "refused", reason: "backup_mismatch" };
    }
    try {
      if (!(await this.store.compareAndSwap(current, backup)))
        return { kind: "refused", reason: "state_changed_after_migration" };
    } catch {
      /* Independent readback resolves a lost write response. */
    }
    try {
      const observed = await this.store.read(receipt.task_id);
      return observed?.digest === receipt.source_digest
        ? { kind: "rolled_back", source_digest: observed.digest }
        : { kind: "refused", reason: "rollback_in_doubt" };
    } catch {
      return { kind: "refused", reason: "rollback_in_doubt" };
    }
  }
}
