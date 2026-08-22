import {
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  taskCentricDigest,
  withTaskCentricAggregate,
  type DomainEvent,
  type ExecutionLease,
  type SemanticWorkResult,
  type TaskAggregate,
  type TaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import {
  TaskCentricBackendAdapter,
  TASK_CENTRIC_RUNTIME_EXTENSION_KEY,
} from "./task-centric-backend-adapter.js";

const NOW = "2026-08-22T00:00:00.000Z";
const TASK_ID = "202608220000-TASK01";

function repository() {
  return createRepositorySnapshot({
    git: { kind: "commit", sha: "a".repeat(40), ref: "refs/heads/main" },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: NOW,
  });
}

function validation(id: string) {
  return {
    schema_version: 1 as const,
    criteria: [
      {
        id: `criterion-${id}`,
        description: `Validate ${id}`,
        required: true,
        check_ids: [`check-${id}`],
      },
    ],
    checks: [
      { id: `check-${id}`, kind: "deterministic" as const, required: true, capability: "test" },
    ],
    evidence_fingerprint: taskCentricDigest(id),
  };
}

function approvedAggregate(): TaskAggregate {
  const proposal: TaskPlanProposal = {
    schema_version: 1,
    task_id: TASK_ID,
    planning_baseline: repository(),
    work_items: {
      schema_version: 1,
      work_items: [
        {
          id: "implementation",
          objective: "Implement",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["implementation-output"],
          scope_roots: ["packages"],
          acceptance_criteria: validation("implementation").criteria,
          validation: validation("implementation"),
          context: {
            required_sources: ["repository"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 16_384,
          },
          risk: "medium",
          capabilities: ["test"],
          resource_claims: [{ kind: "path", resource: "packages", mode: "write" }],
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation("root"),
  };
  const draft = createTaskPlanRevision({ proposal, revision: 1, created_at: NOW });
  const plan = approveTaskPlan({
    plan: draft,
    expected_digest: draft.digest,
    actor: "user",
    approved_at: NOW,
  });
  return {
    ...createLegacyTaskAggregate({
      id: TASK_ID,
      revision: 1,
      title: "Task",
      description: "Description",
      status: "TODO",
      acceptance_criteria: ["done"],
      captured_at: NOW,
      updated_at: NOW,
    }),
    lifecycle: "AWAITING_PLAN_APPROVAL",
    current_plan: plan,
  };
}

function taskData(aggregate = approvedAggregate()): TaskData {
  return {
    id: TASK_ID,
    title: "Task",
    description: "Description",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    revision: aggregate.revision,
    depends_on: [],
    tags: [],
    verify: ["done"],
    doc: "## Summary\n\nDescription\n",
    extensions: withTaskCentricAggregate({}, aggregate),
  };
}

function memoryBackend(initial = taskData()): TaskBackend & { current(): TaskData } {
  let current = structuredClone(initial);
  return {
    id: "memory",
    capabilities: {
      canonical_source: "local",
      projection: "canonical",
      projection_read_mode: "native",
      reads_from_projection_by_default: true,
      writes_task_readmes: false,
      supports_task_revisions: true,
      supports_revision_guarded_writes: true,
      may_access_network_on_read: false,
      may_access_network_on_write: false,
      supports_projection_refresh: false,
      supports_push_sync: false,
      supports_snapshot_export: false,
    },
    listTasks() {
      return Promise.resolve([structuredClone(current)]);
    },
    getTask(taskId: string) {
      return Promise.resolve(taskId === current.id ? structuredClone(current) : null);
    },
    writeTask(next: TaskData, opts) {
      const observed = current.revision ?? 1;
      if (opts?.expectedRevision !== undefined && opts.expectedRevision !== observed) {
        throw new Error(
          `Task revision changed concurrently: expected ${opts.expectedRevision}, observed ${observed}.`,
        );
      }
      current = structuredClone(next);
      return Promise.resolve();
    },
    current() {
      return structuredClone(current);
    },
  } as TaskBackend & { current(): TaskData };
}

function event(
  task: TaskAggregate,
  mutationId: string,
  to: TaskAggregate["lifecycle"],
): DomainEvent {
  return {
    schema_version: 1,
    id: `event-${mutationId}`,
    mutation_id: mutationId,
    task_id: task.id,
    task_revision: task.revision,
    plan_revision: task.current_plan?.revision ?? null,
    plan_digest: task.current_plan?.digest ?? null,
    work_item_id: null,
    entity: "task",
    from: task.lifecycle,
    to,
    cause_refs: [],
    actor_id: "test",
    repository_fingerprint: repository().digest,
    at: NOW,
  };
}

describe("TaskCentricBackendAdapter", () => {
  it("materializes an approved graph atomically and makes duplicate mutation keys idempotent", async () => {
    const backend = memoryBackend();
    const adapter = new TaskCentricBackendAdapter({
      backend,
      observeRepository: () => Promise.resolve(repository()),
    });
    const initial = await adapter.readTask(TASK_ID);
    expect(initial?.work_items).toEqual({});

    const first = await adapter.materializeWorkItems({
      task_id: TASK_ID,
      expected_revision: 1,
      plan_revision: 1,
      plan_digest: initial!.current_plan!.digest,
      idempotency_key: "materialize-1",
    });
    expect(first).toMatchObject({ previous_revision: 1, next_revision: 2 });
    const materialized = await adapter.readTask(TASK_ID);
    expect(materialized?.work_items.implementation?.state).toBe("READY");

    await expect(
      adapter.materializeWorkItems({
        task_id: TASK_ID,
        expected_revision: 1,
        plan_revision: 1,
        plan_digest: initial!.current_plan!.digest,
        idempotency_key: "materialize-1",
      }),
    ).resolves.toEqual(first);
    await expect(
      adapter.materializeWorkItems({
        task_id: TASK_ID,
        expected_revision: 1,
        plan_revision: 1,
        plan_digest: initial!.current_plan!.digest,
        idempotency_key: "materialize-stale",
      }),
    ).rejects.toThrow(/revision changed concurrently/u);
    expect(backend.current().revision).toBe(2);
  });

  it("persists claims, results, checkpoints, retry budgets, and CAS receipts", async () => {
    const backend = memoryBackend();
    const adapter = new TaskCentricBackendAdapter({
      backend,
      observeRepository: () => Promise.resolve(repository()),
    });
    const initial = (await adapter.readTask(TASK_ID))!;
    await adapter.materializeWorkItems({
      task_id: TASK_ID,
      expected_revision: 1,
      plan_revision: 1,
      plan_digest: initial.current_plan!.digest,
      idempotency_key: "materialize",
    });
    const task = (await adapter.readTask(TASK_ID))!;
    const lease: ExecutionLease = {
      schema_version: 1,
      id: "lease-1",
      authority: {
        task_id: TASK_ID,
        plan_revision: 1,
        plan_digest: task.current_plan!.digest,
        work_item_id: "implementation",
        repository_snapshot_digest: repository().digest,
        workspace: "/workspace",
        writable_roots: ["packages"],
        allowed_operations: ["repository.write"],
        expires_at: null,
      },
      actor: { id: "same-actor", transport: "pull", capabilities: ["test"] },
      resource_claims: [{ kind: "path", resource: "packages", mode: "write" }],
      issued_at: NOW,
      expires_at: null,
    };
    await adapter.claimWorkItem({
      task_id: TASK_ID,
      expected_revision: 2,
      work_item_id: "implementation",
      lease,
      idempotency_key: lease.id,
    });
    const claimed = await adapter.reconcile(TASK_ID);
    expect(claimed.active_leases).toHaveLength(1);

    const semanticResult: SemanticWorkResult = {
      schema_version: 1,
      kind: "execute",
      task_id: TASK_ID,
      plan_revision: 1,
      plan_digest: task.current_plan!.digest,
      work_item_id: "implementation",
      context_digest: taskCentricDigest("context"),
      status: "completed",
      summary: "done",
      claims: [],
      questions: [],
      artifacts: [],
    };
    await adapter.recordWorkItemResult({
      task_id: TASK_ID,
      expected_revision: 3,
      work_item_id: "implementation",
      semantic_result: semanticResult,
      outputs: [
        {
          schema_version: 1,
          id: "implementation-output",
          kind: "test",
          schema: "test.v1",
          digest: taskCentricDigest("output"),
          producer: {
            task_id: TASK_ID,
            plan_revision: 1,
            work_item_id: "implementation",
            attempt: 1,
          },
          repository_snapshot_digest: repository().digest,
          provenance: [],
        },
      ],
      validation: [
        {
          check_id: "check-implementation",
          status: "passed",
          observed_at: NOW,
          repository_snapshot_digest: repository().digest,
          command_identity: "test",
          exit_code: 0,
          artifact_refs: [],
          detail: "passed",
        },
      ],
      idempotency_key: "result-1",
    });
    const released = await adapter.reconcile(TASK_ID);
    const completedWork = await adapter.readTask(TASK_ID);
    expect(released.active_leases).toHaveLength(0);
    expect(completedWork?.work_items.implementation?.state).toBe("COMPLETED");

    const completed = (await adapter.readTask(TASK_ID))!;
    const mutation = "complete-task";
    const receipt = await adapter.compareAndSwap({
      task_id: TASK_ID,
      expected_revision: completed.revision,
      next: { ...completed, lifecycle: "COMPLETED" },
      mutation_id: mutation,
      event: event(completed, mutation, "COMPLETED"),
    });
    await expect(
      adapter.compareAndSwap({
        task_id: TASK_ID,
        expected_revision: completed.revision,
        next: { ...completed, lifecycle: "COMPLETED" },
        mutation_id: mutation,
        event: event(completed, mutation, "COMPLETED"),
      }),
    ).resolves.toEqual(receipt);

    const reconciled = await adapter.reconcile(TASK_ID);
    await adapter.writeCheckpoint({
      schema_version: 1,
      task_id: TASK_ID,
      task_revision: reconciled.task.revision,
      plan_revision: 1,
      event_cursor: reconciled.task.event_cursor,
      work_item_states: { implementation: "COMPLETED" },
      context_refs: [],
      validation_refs: [],
      artifact_refs: ["implementation-output"],
      pending_effects: [],
      created_at: NOW,
    });
    await adapter.writeRetryBudget({
      task_id: TASK_ID,
      work_item_id: "implementation",
      operation: "semantic_work",
      failure_kind: "actor",
      maximum: 2,
      consumed: 1,
      reset_fingerprint: repository().digest,
    });
    await expect(
      adapter.readRetryBudget({
        task_id: TASK_ID,
        work_item_id: "implementation",
        operation: "semantic_work",
        failure_kind: "actor",
      }),
    ).resolves.toMatchObject({ consumed: 1, maximum: 2 });
    expect(backend.current().extensions?.[TASK_CENTRIC_RUNTIME_EXTENSION_KEY]).toMatchObject({
      schema_version: 1,
    });
  });

  it("completes the one canonical Task only after all required WorkItems and root verification pass", async () => {
    const backend = memoryBackend();
    const adapter = new TaskCentricBackendAdapter({
      backend,
      observeRepository: () => Promise.resolve(repository()),
    });
    const initial = (await adapter.readTask(TASK_ID))!;
    await adapter.materializeWorkItems({
      task_id: TASK_ID,
      expected_revision: 1,
      plan_revision: 1,
      plan_digest: initial.current_plan!.digest,
      idempotency_key: "materialize-for-finish",
    });
    await expect(
      adapter.completeTaskFromLegacyVerification({
        task_id: TASK_ID,
        repository: repository(),
        actor_id: "SUPERVISOR",
        evidence_refs: ["task-verification"],
        idempotency_key: "finish-too-early",
      }),
    ).rejects.toThrow(/successful task verification/u);

    const ready = (await adapter.readTask(TASK_ID))!;
    const semanticResult: SemanticWorkResult = {
      schema_version: 1,
      kind: "execute",
      task_id: TASK_ID,
      plan_revision: 1,
      plan_digest: ready.current_plan!.digest,
      work_item_id: "implementation",
      context_digest: taskCentricDigest("finish-context"),
      status: "completed",
      summary: "done",
      claims: [],
      questions: [],
      artifacts: ["implementation-output"],
    };
    await adapter.recordWorkItemResult({
      task_id: TASK_ID,
      expected_revision: 2,
      work_item_id: "implementation",
      semantic_result: semanticResult,
      outputs: [
        {
          schema_version: 1,
          id: "implementation-output",
          kind: "test",
          schema: "test.v1",
          digest: taskCentricDigest("finish-output"),
          producer: {
            task_id: TASK_ID,
            plan_revision: 1,
            work_item_id: "implementation",
            attempt: 1,
          },
          repository_snapshot_digest: repository().digest,
          provenance: [],
        },
      ],
      validation: [
        {
          check_id: "check-implementation",
          status: "passed",
          observed_at: NOW,
          repository_snapshot_digest: repository().digest,
          command_identity: "test",
          exit_code: 0,
          artifact_refs: [],
          detail: "passed",
        },
      ],
      idempotency_key: "finish-result",
    });
    const verified = backend.current();
    await backend.writeTask(
      {
        ...verified,
        revision: (verified.revision ?? 1) + 1,
        status: "DONE",
        verification: {
          state: "ok",
          attempts: 0,
          updated_at: NOW,
          updated_by: "SUPERVISOR",
          note: "root checks passed",
        },
      },
      { expectedRevision: verified.revision },
    );
    const completion = await adapter.completeTaskFromLegacyVerification({
      task_id: TASK_ID,
      repository: repository(),
      actor_id: "SUPERVISOR",
      evidence_refs: ["task-verification"],
      idempotency_key: "finish-complete",
    });
    expect(completion?.event).toMatchObject({ from: "ACTIVE", to: "COMPLETED" });
    await expect(
      adapter.completeTaskFromLegacyVerification({
        task_id: TASK_ID,
        repository: repository(),
        actor_id: "SUPERVISOR",
        evidence_refs: ["task-verification"],
        idempotency_key: "finish-complete",
      }),
    ).resolves.toEqual(completion);
    const completed = await adapter.readTask(TASK_ID);
    expect(completed).toMatchObject({
      lifecycle: "COMPLETED",
      final_validation: { status: "passed", stale_evidence: [] },
    });
    expect(backend.current()).toMatchObject({ status: "DONE", verification: { state: "ok" } });
  });
});
