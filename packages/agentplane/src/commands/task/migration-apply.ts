import { parseTaskReadme, renderTaskReadme, taskKernel as k } from "@agentplaneorg/core/tasks";

import { taskBytesDigest } from "../../backends/task-backend/local-task-byte-store.js";
import { TASK_KERNEL_EXTENSION } from "../../adapters/task-backend/kernel-record.js";
import type { TaskByteSnapshot, TaskByteStore } from "../../ports/task-byte-store.js";
import { withSupervisorExecutionAdmissionFence } from "../shared/supervisor-execution-episode.js";
import { inspectKernelMigrationAdmission } from "./kernel-migration-admission.js";
import {
  previewLifecycleOwnerMigration,
  type LifecycleOwnerMigrationPreview,
} from "./migration-preview.js";
import {
  LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION,
  LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION,
  createLifecycleOwnerMigrationQuarantineMarker,
  parseLifecycleOwnerMigrationFreshBinding,
  parseLifecycleOwnerMigrationReceipt,
  prepareOutput,
  quarantine,
  quarantineMarker,
  sameFreshBinding,
  validateAssessment,
  type BoundLifecycleOwnerMigrationAssessment,
  type LifecycleOwnerMigrationApplyResult,
  type LifecycleOwnerMigrationFreshBinding,
  type LifecycleOwnerMigrationQuarantine,
  type LifecycleOwnerMigrationReceipt,
} from "./migration-apply-conversion.js";

export {
  LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION,
  LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION,
  parseLifecycleOwnerMigrationReceipt,
  type BoundLifecycleOwnerMigrationAssessment,
  type LifecycleOwnerMigrationApplyResult,
  type LifecycleOwnerMigrationFreshBinding,
  type LifecycleOwnerMigrationQuarantine,
  type LifecycleOwnerMigrationReceipt,
} from "./migration-apply-conversion.js";

const TASK_CENTRIC_EXTENSION = "agentplane.task_centric";
const TASK_CENTRIC_RUNTIME_EXTENSION = "agentplane.task_centric_runtime";

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
    const applied = parseLifecycleOwnerMigrationReceipt(
      extensions?.[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION],
    );
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
  const currentReceipt = parseLifecycleOwnerMigrationReceipt(
    extensions?.[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION],
  );
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
          parseLifecycleOwnerMigrationFreshBinding(await opts.observe_binding()),
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
          parseLifecycleOwnerMigrationFreshBinding(await opts.observe_binding()),
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
  const durable = parseLifecycleOwnerMigrationReceipt(
    extensions?.[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION],
  );
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
