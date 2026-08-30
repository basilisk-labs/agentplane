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

  async create(task: TaskData, input: KernelCommandInput): Promise<KernelAdapterResult> {
    if (!this.supportsMutation()) return this.unavailable("backend_capability_missing");
    if (input.authority && input.authority.repository_identity !== this.repositoryIdentity) {
      return {
        kind: "rejected",
        code: "AUTHORITY_SCOPE_EXCEEDED",
        facts: ["repository_identity"],
        required_action: null,
      };
    }
    if (input.command.kind !== "capture_intent" || input.command.task_id !== task.id) {
      return {
        kind: "rejected",
        code: "TASK_ID_MISMATCH",
        facts: [task.id, input.command.kind],
        required_action: null,
      };
    }
    const existing = await this.read(task.id);
    if (existing.kind === "canonical") return this.execute(input);
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
    return this.persist(
      task,
      0,
      makeKernelRecord(this.repositoryIdentity, result.aggregate, result.events),
      result.receipts,
    );
  }

  async execute(input: KernelCommandInput): Promise<KernelAdapterResult> {
    if (!this.supportsMutation()) return this.unavailable("backend_capability_missing");
    if (input.authority && input.authority.repository_identity !== this.repositoryIdentity) {
      return {
        kind: "rejected",
        code: "AUTHORITY_SCOPE_EXCEEDED",
        facts: ["repository_identity"],
        required_action: null,
      };
    }
    const current = await this.read(input.command.task_id);
    if (current.kind !== "canonical")
      return this.unavailable(current.kind, ...("reason" in current ? [current.reason] : []));
    const result = taskKernel.reduceTaskCommand({ ...input, aggregate: current.record.aggregate });
    if (result.kind === "rejected") return result;
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
      makeKernelRecord(this.repositoryIdentity, result.aggregate, [
        ...current.record.events,
        ...result.events,
      ]),
      result.receipts,
    );
  }

  /** Comparison only: never writes or invokes a provider. */
  async preview(input: KernelCommandInput): Promise<taskKernel.KernelResult | KernelRead> {
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
          return { kind: "committed", record: observed.record, receipts, replayed: false };
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
