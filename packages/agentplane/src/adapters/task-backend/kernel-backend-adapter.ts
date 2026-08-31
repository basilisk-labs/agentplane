import { kernelAuthorityRecordSchema } from "./kernel-authority-schema.js";
import { taskKernel } from "@agentplaneorg/core/tasks";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import {
  makeKernelRecord,
  readKernelRecord,
  TASK_KERNEL_EXTENSION,
  type KernelRead,
  type KernelRecord,
} from "./kernel-record.js";
import { projectKernelTask } from "./kernel-projector.js";
import { readKernelNextAction } from "./kernel-next-action.js";
import {
  kernelDocumentIssues,
  kernelDocumentsSchema,
  type KernelDocuments,
} from "./kernel-documents.js";

export type KernelAdapterResult =
  | {
      kind: "committed";
      record: KernelRecord;
      receipts: readonly taskKernel.MutationReceipt[];
      replayed: boolean;
    }
  | Extract<taskKernel.KernelResult, { kind: "rejected" }>
  | {
      kind: "unavailable";
      code:
        | "backend_capability_missing"
        | "archived"
        | "legacy_unmigrated"
        | "missing"
        | "malformed"
        | "task_exists"
        | "concurrent_write"
        | "write_in_doubt"
        | "readback_mismatch";
      facts: string[];
    };
export type KernelCommandInput = Omit<taskKernel.KernelInput, "aggregate">;

/** Staged M2 boundary. Legacy callers remain separate until the replay/cutover gate. */
export class KernelBackendAdapter {
  constructor(
    readonly backend: TaskBackend,
    readonly repositoryIdentity: taskKernel.Sha256Digest,
  ) {}

  async read(taskId: string): Promise<KernelRead> {
    return readKernelRecord(await this.backend.getTask(taskId), this.repositoryIdentity);
  }

  async nextAction(taskId: string, repositoryFingerprint: taskKernel.Sha256Digest) {
    return readKernelNextAction(await this.read(taskId), repositoryFingerprint);
  }

  private unavailable(
    code: Extract<KernelAdapterResult, { kind: "unavailable" }>["code"],
    ...facts: string[]
  ): KernelAdapterResult {
    return { kind: "unavailable", code, facts };
  }

  private supportsMutation(): boolean {
    const c = this.backend.capabilities;
    return (
      c.supports_task_revisions &&
      c.supports_revision_guarded_writes &&
      c.atomic_task_record === true &&
      (c.canonical_source === "local" ||
        (c.projection === "canonical" && !c.reads_from_projection_by_default))
    );
  }

  private repositoryRejection(
    input: KernelCommandInput,
  ): Extract<taskKernel.KernelResult, { kind: "rejected" }> | null {
    if (input.authority && input.authority.repository_identity !== this.repositoryIdentity) {
      return {
        kind: "rejected",
        code: "AUTHORITY_SCOPE_EXCEEDED",
        facts: ["repository_identity"],
        required_action: null,
      };
    }
    return null;
  }

  async create(
    task: TaskData,
    input: KernelCommandInput,
    documents?: KernelDocuments,
  ): Promise<KernelAdapterResult> {
    if (!this.supportsMutation()) return this.unavailable("backend_capability_missing");
    const rejection = this.repositoryRejection(input);
    if (rejection) return rejection;
    if (input.command.kind !== "capture_intent" || input.command.task_id !== task.id) {
      return {
        kind: "rejected",
        code: "TASK_ID_MISMATCH",
        facts: [task.id, input.command.kind],
        required_action: null,
      };
    }
    const existing = await this.read(task.id);
    if (existing.kind === "canonical") {
      if (
        documents &&
        (!existing.record.documents ||
          !kernelDocumentsSchema.safeParse(documents).success ||
          Object.keys(documents.contracts).length > 0 ||
          taskKernel.kernelDigest(documents.intent) !==
            taskKernel.kernelDigest(existing.record.documents.intent))
      )
        return this.unavailable("malformed", "creation_documents_changed");
      return this.execute(input);
    }
    if (existing.kind !== "missing") return this.unavailable("task_exists", existing.kind);
    const aggregate: taskKernel.TaskAggregate = {
      schema_version: 1,
      id: task.id,
      revision: 0,
      state: "CAPTURED",
      intent_digest: input.command.intent_digest,
      current_plan: null,
      plan_history: [],
      work_items: {},
      final_validation: null,
      effects: [],
      mutation_receipts: {},
      controller_transfer: null,
      migration_receipts: [],
    };
    const result = taskKernel.reduceTaskCommand({ ...input, aggregate });
    if (result.kind === "rejected") return result;
    const documentFailure = this.validateRecordContents(result.aggregate, documents);
    if (documentFailure) return documentFailure;
    return this.persist(
      task,
      0,
      makeKernelRecord(this.repositoryIdentity, result.aggregate, result.events, documents),
      result.receipts,
    );
  }

  async execute(
    input: KernelCommandInput,
    documents?: KernelDocuments,
  ): Promise<KernelAdapterResult> {
    if (!this.supportsMutation()) return this.unavailable("backend_capability_missing");
    const rejection = this.repositoryRejection(input);
    if (rejection) return rejection;
    const current = await this.read(input.command.task_id);
    if (current.kind !== "canonical")
      return this.unavailable(current.kind, ...("reason" in current ? [current.reason] : []));
    const result = taskKernel.reduceTaskCommand({ ...input, aggregate: current.record.aggregate });
    if (result.kind === "rejected") return result;
    const retained = documents ?? current.record.documents;
    if (
      documents &&
      current.record.documents &&
      (taskKernel.kernelDigest(documents.intent) !==
        taskKernel.kernelDigest(current.record.documents.intent) ||
        Object.entries(current.record.documents.contracts).some(
          ([digest, contract]) =>
            !Object.hasOwn(documents.contracts, digest) ||
            taskKernel.kernelDigest(documents.contracts[digest]) !==
              taskKernel.kernelDigest(contract),
        ))
    )
      return this.unavailable("malformed", "immutable_documents_changed");
    // Adding documents to an existing record is a migration, not an execution side effect.
    if (documents && !current.record.documents)
      return this.unavailable("malformed", "document_migration_required");
    const documentFailure = this.validateRecordContents(result.aggregate, retained);
    if (documentFailure) return documentFailure;
    if (
      result.events.length === 0 &&
      taskKernel.kernelDigest(retained ?? null) !==
        taskKernel.kernelDigest(current.record.documents ?? null)
    )
      return this.unavailable("malformed", "replay_documents_changed");
    if (result.events.length === 0)
      return {
        kind: "committed",
        record: current.record,
        receipts: result.receipts,
        replayed: true,
      };
    return this.persist(
      current.task,
      current.task.revision ?? 1,
      makeKernelRecord(
        this.repositoryIdentity,
        result.aggregate,
        [...current.record.events, ...result.events],
        retained,
      ),
      result.receipts,
    );
  }

  private validateRecordContents(
    aggregate: taskKernel.TaskAggregate,
    documents?: KernelDocuments,
  ): KernelAdapterResult | null {
    if (
      aggregate.authority_lineage &&
      !kernelAuthorityRecordSchema.array().safeParse(aggregate.authority_lineage).success
    )
      return this.unavailable("malformed", "invalid_authority_schema");
    const authorityIssues = taskKernel.canonicalAuthorityIssues(aggregate);
    if (authorityIssues.length > 0) return this.unavailable("malformed", ...authorityIssues);
    if (documents && !kernelDocumentsSchema.safeParse(documents).success)
      return this.unavailable("malformed", "invalid_documents_schema");
    const issues = kernelDocumentIssues(aggregate, documents);
    return issues.length > 0 ? this.unavailable("malformed", ...issues) : null;
  }

  /** Comparison only: never writes or invokes a provider. */
  async preview(input: KernelCommandInput): Promise<taskKernel.KernelResult | KernelRead> {
    const rejection = this.repositoryRejection(input);
    if (rejection) return rejection;
    const current = await this.read(input.command.task_id);
    return current.kind === "canonical"
      ? taskKernel.reduceTaskCommand({ ...input, aggregate: current.record.aggregate })
      : current;
  }

  private async persist(
    task: TaskData,
    expectedRevision: number,
    record: KernelRecord,
    receipts: readonly taskKernel.MutationReceipt[],
  ): Promise<KernelAdapterResult> {
    const projection = projectKernelTask(record.aggregate);
    const next = {
      ...task,
      revision: expectedRevision + 1,
      status: projection.status,
      extensions: { ...task.extensions, [TASK_KERNEL_EXTENSION]: record },
    };
    try {
      await this.backend.writeTask(next, { expectedRevision });
    } catch {
      // A failed response is not proof that the atomic write did not happen.
      try {
        const observed = await this.read(task.id);
        if (observed.kind === "canonical" && observed.record.digest === record.digest) {
          // Readback proves durability, not which concurrent caller performed the write.
          // Never grant fresh dispatch ownership from an uncertain write response.
          return { kind: "committed", record: observed.record, receipts, replayed: true };
        }
        if (observed.kind === "canonical" && observed.task.revision !== expectedRevision) {
          return this.unavailable("concurrent_write", observed.record.digest);
        }
      } catch {
        return this.unavailable("write_in_doubt");
      }
      return this.unavailable("write_in_doubt");
    }
    try {
      const observed = await this.read(task.id);
      if (observed.kind !== "canonical" || observed.record.digest !== record.digest) {
        return this.unavailable("readback_mismatch", observed.kind);
      }
      return { kind: "committed", record: observed.record, receipts, replayed: false };
    } catch {
      return this.unavailable("write_in_doubt");
    }
  }
}
