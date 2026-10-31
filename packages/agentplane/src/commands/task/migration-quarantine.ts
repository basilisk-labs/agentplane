import { parseTaskReadme, renderTaskReadme, taskKernel as k } from "@agentplaneorg/core/tasks";

import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import { taskBytesDigest } from "../../backends/task-backend/local-task-byte-store.js";
import type { TaskByteSnapshot, TaskByteStore } from "../../ports/task-byte-store.js";
import {
  LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION,
  LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION,
  createLifecycleOwnerMigrationQuarantineMarker,
  parseLifecycleOwnerMigrationFreshBinding,
  quarantine,
  quarantineMarker,
  parseLifecycleOwnerQuarantineRollbackProof,
  sameFreshBinding,
  type LifecycleOwnerMigrationApplyResult,
  type LifecycleOwnerMigrationFreshBinding,
  type LifecycleOwnerMigrationQuarantine,
  type LifecycleOwnerQuarantineRollbackProof,
} from "./migration-apply-conversion.js";
import type { LifecycleOwnerMigrationPreview } from "./migration-preview.js";

export type ResolvedMigrationSource = Readonly<{
  current: TaskByteSnapshot;
  source: TaskByteSnapshot;
  marker: LifecycleOwnerMigrationQuarantine | null;
}>;

export function isRevisionSplitPreview(
  preview: LifecycleOwnerMigrationPreview,
  taskId: string,
): boolean {
  return (
    preview.task_id === taskId &&
    preview.mapping.blockers.length === 1 &&
    preview.mapping.blockers[0]?.source_path === "task.revision" &&
    preview.mapping.blockers[0]?.reason_code === "source_revision_mismatch"
  );
}

/** The marker authenticates its retained source; this projection also binds every outer field. */
export function quarantineAfterimage(
  sourceText: string,
  marker: LifecycleOwnerMigrationQuarantine,
): string {
  const parsed = parseTaskReadme(sourceText);
  const extensions = { ...(parsed.frontmatter.extensions as Record<string, unknown> | undefined) };
  delete extensions["agentplane.task_centric"];
  delete extensions["agentplane.task_centric_runtime"];
  delete extensions[TASK_KERNEL_EXTENSION];
  delete extensions[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION];
  extensions[LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION] = marker;
  return renderTaskReadme(
    { ...parsed.frontmatter, revision: marker.output_revision, status: "BLOCKED", extensions },
    parsed.body,
  );
}

export function quarantineRollbackProof(
  marker: LifecycleOwnerMigrationQuarantine,
  outputDigest: k.Sha256Digest,
): LifecycleOwnerQuarantineRollbackProof {
  return {
    schema_version: 1,
    kind: "lifecycle_owner_quarantine_rollback",
    task_id: marker.task_id,
    repository_identity: marker.repository_identity,
    backend_identity: marker.backend_identity,
    source_digest: marker.source_digest,
    backup_location: marker.backup_location,
    quarantine_digest: marker.quarantine_digest,
    output_bytes_digest: outputDigest,
  };
}

function persistedResult(
  reason: string,
  source: TaskByteSnapshot,
  preview: LifecycleOwnerMigrationPreview,
  marker: LifecycleOwnerMigrationQuarantine,
  outputDigest: k.Sha256Digest,
): LifecycleOwnerMigrationApplyResult {
  return {
    ...quarantine(reason, source, preview, true, marker.quarantine_digest),
    quarantine_proof: quarantineRollbackProof(marker, outputDigest),
  };
}

export async function persistQuarantine(opts: {
  store: TaskByteStore;
  repository_identity: k.Sha256Digest;
  resolved: ResolvedMigrationSource;
  preview: LifecycleOwnerMigrationPreview;
  binding: LifecycleOwnerMigrationFreshBinding;
  observe_binding: () => Promise<LifecycleOwnerMigrationFreshBinding>;
  reason: string;
}): Promise<LifecycleOwnerMigrationApplyResult> {
  const { current, source, marker } = opts.resolved;
  if (marker?.reason === opts.reason) {
    const observed = await opts.store.read(marker.task_id).catch(() => null);
    if (observed?.digest !== current.digest || observed.revision !== current.revision)
      return { kind: "refused", reason: "source_changed" };
    return persistedResult(opts.reason, source, opts.preview, marker, observed.digest);
  }
  let backupLocation: string;
  try {
    backupLocation = await opts.store.backup(source);
  } catch {
    return { kind: "refused", reason: "backup_mismatch" };
  }
  if (
    !sameFreshBinding(
      parseLifecycleOwnerMigrationFreshBinding(await opts.observe_binding()),
      opts.binding,
    )
  )
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
  const durable = createLifecycleOwnerMigrationQuarantineMarker(contents);
  const text = quarantineAfterimage(source.text, durable);
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
  return persistedResult(opts.reason, source, opts.preview, durable, observed.digest);
}

/** Restore exact retained bytes only while the emitted quarantine afterimage is current. */
export async function rollbackLifecycleOwnerQuarantine(opts: {
  store: TaskByteStore;
  repository_identity: k.Sha256Digest;
  proof: LifecycleOwnerQuarantineRollbackProof;
}): Promise<
  | Readonly<{ kind: "rolled_back"; source_digest: k.Sha256Digest }>
  | Readonly<{ kind: "refused"; reason: string }>
> {
  const proof = parseLifecycleOwnerQuarantineRollbackProof(opts.proof);
  if (!proof) return { kind: "refused", reason: "quarantine_proof_invalid" };
  const current = await opts.store.read(proof.task_id);
  if (!current) return { kind: "refused", reason: "missing" };
  let durable: LifecycleOwnerMigrationQuarantine | null;
  try {
    const extensions = parseTaskReadme(current.text).frontmatter.extensions as
      Record<string, unknown> | undefined;
    durable = quarantineMarker(extensions?.[LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION]);
  } catch {
    return { kind: "refused", reason: "state_changed_after_quarantine" };
  }
  if (
    durable?.quarantine_digest !== proof.quarantine_digest ||
    proof.repository_identity !== opts.repository_identity ||
    proof.backend_identity !== opts.store.backend_identity ||
    durable.repository_identity !== proof.repository_identity ||
    durable.source_digest !== proof.source_digest ||
    durable.backup_location !== proof.backup_location ||
    durable.backend_identity !== opts.store.backend_identity ||
    durable.task_id !== current.task_id ||
    durable.output_revision !== current.revision ||
    current.digest !== proof.output_bytes_digest
  )
    return { kind: "refused", reason: "state_changed_after_quarantine" };
  let source: string;
  try {
    source = await opts.store.readBackup(durable.backup_location);
    const parsed = parseTaskReadme(source).frontmatter;
    if (
      taskBytesDigest(source) !== durable.backup_digest ||
      parsed.id !== durable.task_id ||
      Number(parsed.revision ?? 1) !== durable.source_revision
    )
      return { kind: "refused", reason: "backup_mismatch" };
    if (quarantineAfterimage(source, durable) !== current.text)
      return { kind: "refused", reason: "state_changed_after_quarantine" };
  } catch {
    return { kind: "refused", reason: "backup_mismatch" };
  }
  try {
    if (!(await opts.store.compareAndSwap(current, source)))
      return { kind: "refused", reason: "source_changed" };
  } catch {
    // An interrupted publication is successful only after the exact original bytes are observed.
  }
  const observed = await opts.store.read(durable.task_id).catch(() => null);
  return observed?.digest === durable.source_digest && observed.revision === durable.source_revision
    ? { kind: "rolled_back", source_digest: durable.source_digest }
    : { kind: "refused", reason: "write_in_doubt" };
}
