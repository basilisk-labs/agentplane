import {
  approveTaskPlan,
  EXECUTION_GRANT_EXTENSION_KEY,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY,
  taskCentricDigest,
  taskCentricAggregateFromExtensions,
  withTaskCentricAggregate,
  type DomainEvent,
  type ExecutionLease,
  type SemanticWorkResult,
  type TaskAggregate,
  type TaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import { makeTaskCommandContext } from "@agentplane/testkit/task";
import { describe, expect, it, vi } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import { applyTaskMutation } from "../../commands/shared/task-mutation.js";
import { cmdTaskPlanApprove } from "../../commands/task/plan.js";
import {
  TaskCentricBackendAdapter,
  TASK_CENTRIC_RUNTIME_EXTENSION_KEY,
} from "./task-centric-backend-adapter.js";

vi.mock("../../commands/task/execution-authority-context.js", () => ({
  resolveLogicalRepositoryIdentity: () => Promise.resolve(`sha256:${"f".repeat(64)}`),
}));

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

function pendingAggregate(revision = 1): TaskAggregate {
  const approved = approvedAggregate();
  return {
    ...approved,
    revision,
    current_plan: {
      ...approved.current_plan!,
      approval: {
        state: "pending",
        approved_by: null,
        approved_at: null,
        approved_digest: null,
        policy_facts: [],
      },
    },
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

function approvalContext(initial = taskData(pendingAggregate())) {
  const durable = memoryBackend({
    ...initial,
    doc: "## Summary\n\nDescription\n\n## Plan\n\nImplement\n\n## Verify Steps\n\nRun tests\n",
  });
  const backend: TaskBackend = {
    ...durable,
    getTaskDoc: () => Promise.resolve(durable.current().doc ?? ""),
    writeTask: async (next, opts) =>
      await durable.writeTask({ ...next, revision: durable.current().revision! + 1 }, opts),
  };
  return {
    durable,
    backend,
    ctx: makeTaskCommandContext({
      taskBackend: backend,
      configureConfig: (config) => {
        config.tasks.doc.required_sections = ["Summary", "Plan", "Verify Steps"];
      },
    }),
  };
}

describe("task plan approval projection", () => {
  it("projects lifecycle and revision together on first and repeated approval", async () => {
    const { ctx, durable } = approvalContext();
    for (const revision of [2, 3]) {
      await cmdTaskPlanApprove({ ctx, cwd: "/repo", taskId: TASK_ID, by: "USER" });
      const stored = durable.current();
      const aggregate = taskCentricAggregateFromExtensions(stored.extensions)!;
      expect(stored.status).toBe("DOING");
      expect(stored.revision).toBe(revision);
      expect(aggregate.revision).toBe(revision);
      expect(aggregate.lifecycle).toBe("ACTIVE");
      expect(aggregate.current_plan!.approval.state).toBe("approved");
      expect(aggregate.work_items.implementation!.state).toBe("READY");
    }
  });

  it("recovers an approved split revision without resetting runtime or verification", async () => {
    const initial = approvedAggregate();
    const active = materializeApprovedWorkItems({
      task: initial,
      plan: initial.current_plan!,
      now: NOW,
    });
    const runtime = {
      ...active.work_items.implementation!,
      state: "COMPLETED" as const,
      attempt: 2,
    };
    const aggregate = { ...active, revision: 14, work_items: { implementation: runtime } };
    const { ctx, durable } = approvalContext({
      ...taskData(aggregate),
      revision: 15,
      verification: { state: "pending", updated_at: NOW, updated_by: "TESTER", note: null },
    });
    const before = durable.current();
    await cmdTaskPlanApprove({
      ctx,
      cwd: "/repo",
      taskId: TASK_ID,
      by: "USER",
      expectedTaskRevision: 15,
      expectedPlanDigest: active.current_plan!.digest,
    });
    const stored = durable.current();
    const recovered = taskCentricAggregateFromExtensions(stored.extensions)!;
    expect(stored.status).toBe("DOING");
    expect(stored.revision).toBe(16);
    expect(recovered.revision).toBe(16);
    expect(recovered.current_plan).toEqual(aggregate.current_plan);
    expect(recovered.work_items).toEqual(aggregate.work_items);
    expect(stored.verification).toEqual(before.verification);
    await applyTaskMutation({
      ctx,
      taskId: TASK_ID,
      build: (current) => ({ nextTask: { ...current, title: "Resumed task" } }),
    });
    expect(durable.current().revision).toBe(17);
    expect(taskCentricAggregateFromExtensions(durable.current().extensions)!.revision).toBe(17);
  });

  it.each([{ expectedTaskRevision: 0 }, { expectedPlanDigest: `sha256:${"0".repeat(64)}` }])(
    "rejects stale approval authority without writing: %j",
    async (guard) => {
      const { ctx, durable } = approvalContext();
      const before = durable.current();
      await expect(
        cmdTaskPlanApprove({ ctx, cwd: "/repo", taskId: TASK_ID, by: "USER", ...guard }),
      ).rejects.toThrow();
      expect(durable.current()).toEqual(before);
    },
  );

  it("refuses to rewind a canonical revision ahead of the stored record", async () => {
    const { ctx, durable } = approvalContext({ ...taskData(pendingAggregate(3)), revision: 1 });
    const before = durable.current();
    await expect(
      cmdTaskPlanApprove({ ctx, cwd: "/repo", taskId: TASK_ID, by: "USER" }),
    ).rejects.toThrow(/revision is ahead/);
    expect(durable.current()).toEqual(before);
  });

  it("guards the revision read for approval against a concurrent writer", async () => {
    const { ctx, backend, durable } = approvalContext();
    backend.writeTask = async (next, opts) => {
      await durable.writeTask({ ...durable.current(), revision: 2, title: "Concurrent update" });
      await durable.writeTask(next, opts);
    };
    await expect(
      cmdTaskPlanApprove({ ctx, cwd: "/repo", taskId: TASK_ID, by: "USER" }),
    ).rejects.toThrow(/revision changed concurrently/);
    expect(durable.current().title).toBe("Concurrent update");
    expect(
      taskCentricAggregateFromExtensions(durable.current().extensions)!.current_plan!.approval
        .state,
    ).toBe("pending");
  });
});

describe("TaskCentricBackendAdapter", () => {
  it("atomically projects an accepted verification clarification and replays idempotently", async () => {
    const fallback = "PLANNER fallback scaffold. Replace with task-specific acceptance checks.";
    const aggregate = approvedAggregate();
    const topLevel = aggregate.current_plan!.proposal.top_level_validation;
    const initial = taskData({
      ...aggregate,
      current_plan: {
        ...aggregate.current_plan!,
        proposal: {
          ...aggregate.current_plan!.proposal,
          top_level_validation: {
            ...topLevel,
            checks: topLevel.checks.map((check) => ({
              ...check,
              command: "bun run test:root",
            })),
          },
        },
      },
    });
    initial.doc = `## Summary\n\nDescription\n\n## Verify Steps\n\n${fallback}\n`;
    initial.sections = { "Verify Steps": fallback };
    const durable = memoryBackend(initial);
    let writes = 0;
    const backend: TaskBackend = {
      ...durable,
      async writeTask(next, options) {
        writes += 1;
        await durable.writeTask(next, options);
      },
    };
    const adapter = new TaskCentricBackendAdapter({
      backend,
      observeRepository: () => Promise.resolve(repository()),
    });
    const input = {
      task_id: TASK_ID,
      expected_revision: 1,
      refinement: {
        description: "Project the approved task-specific checks into Verify Steps.",
        scope_roots_added: [],
        outputs_added: [],
        acceptance_changed: false,
        risk_changed: false,
        external_effects_added: [],
        dependencies_changed: false,
        architecture_constraints_changed: false,
        operations: ["clarify"],
      },
      actor_id: "external:EXECUTOR",
      at: NOW,
      idempotency_key: "clarify-verify-steps",
    } as const;

    const receipt = await adapter.recordPlanRefinement(input);
    const stored = durable.current();
    expect(writes).toBe(1);
    expect(receipt.action).toBe("amended");
    expect(stored.sections?.["Verify Steps"]).toBe(
      "1. Run `bun run test:root`. Expected: Validate root",
    );
    expect(stored.doc).toContain(
      "## Verify Steps\n\n1. Run `bun run test:root`. Expected: Validate root",
    );
    expect(stored.doc_updated_by).toBe("external:EXECUTOR");
    expect(taskCentricAggregateFromExtensions(stored.extensions)?.plan_amendments).toHaveLength(1);

    await expect(adapter.recordPlanRefinement(input)).resolves.toEqual(receipt);
    expect(writes).toBe(1);
    expect(durable.current()).toEqual(stored);
  });

  it("rejects a proposed plan as one atomic event and receipt and replays exactly", async () => {
    const initial = taskData(pendingAggregate());
    initial.plan_approval = { state: "pending", updated_at: null, updated_by: null, note: null };
    initial.extensions = {
      ...initial.extensions,
      [EXECUTION_GRANT_EXTENSION_KEY]: { stale: true },
    };
    const backend = memoryBackend(initial);
    const adapter = new TaskCentricBackendAdapter({
      backend,
      observeRepository: () => Promise.resolve(repository()),
    });
    const plan = pendingAggregate().current_plan!;
    const input = {
      task_id: TASK_ID,
      expected_revision: 1,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      actor_id: "USER",
      note: "Revise authority roots",
      rejected_at: NOW,
      idempotency_key: "reject-plan-1",
    } as const;

    const receipt = await adapter.rejectPlan(input);
    const stored = backend.current();
    const aggregate = taskCentricAggregateFromExtensions(stored.extensions)!;
    const runtime = stored.extensions?.[TASK_CENTRIC_RUNTIME_EXTENSION_KEY] as {
      events: DomainEvent[];
      mutation_receipts: Record<string, unknown>;
    };
    expect(stored.revision).toBe(2);
    expect(stored.plan_approval).toMatchObject({
      state: "rejected",
      updated_by: "USER",
      note: "Revise authority roots",
    });
    expect(aggregate).toMatchObject({ revision: 2, lifecycle: "PLANNING", event_cursor: 1 });
    expect(aggregate.current_plan?.approval.state).toBe("rejected");
    expect(runtime.events).toHaveLength(1);
    expect(runtime.mutation_receipts["reject-plan-1"]).toEqual(receipt);
    expect(stored.extensions).not.toHaveProperty(EXECUTION_GRANT_EXTENSION_KEY);
    expect(stored.extensions).toHaveProperty("agentplane.task_centric_replan_required");

    await expect(adapter.rejectPlan(input)).resolves.toEqual(receipt);
    expect(backend.current()).toEqual(stored);
  });

  it("recovers the historical rejected README mismatch with a monotonic audited revision", async () => {
    const aggregate = pendingAggregate(50);
    const initial = {
      ...taskData(aggregate),
      revision: 52,
      plan_approval: {
        state: "rejected" as const,
        updated_at: NOW,
        updated_by: "USER",
        note: "Rejected authority-incomplete plan",
      },
    };
    const backend = memoryBackend(initial);
    const adapter = new TaskCentricBackendAdapter({
      backend,
      observeRepository: () => Promise.resolve(repository()),
    });
    const fingerprint = taskCentricDigest("historical-corruption");
    const receipt = await adapter.recoverRejectedPlanProjection({
      task_id: TASK_ID,
      expected_readme_revision: 52,
      expected_aggregate_revision: 50,
      plan_digest: aggregate.current_plan!.digest,
      expected_state_fingerprint: fingerprint,
      observed_state_fingerprint: fingerprint,
      actor_id: "USER",
      note: "Repair split plan rejection",
      recovered_at: NOW,
      idempotency_key: "recover-rejection-1",
    });
    const stored = backend.current();
    const recovered = taskCentricAggregateFromExtensions(stored.extensions)!;
    expect(stored.revision).toBe(53);
    expect(recovered).toMatchObject({ revision: 53, lifecycle: "PLANNING", event_cursor: 1 });
    expect(recovered.current_plan?.approval.state).toBe("rejected");
    expect(receipt).toMatchObject({ previous_revision: 50, next_revision: 53 });
    expect(receipt.event).toMatchObject({
      entity: "task",
      from: "AWAITING_PLAN_APPROVAL",
      to: "PLANNING",
      work_item_id: null,
      cause_refs: [
        "projection-recovery:plan-rejection",
        "readme-revision:52",
        "aggregate-revision:50",
        `state-fingerprint:${fingerprint}`,
        expect.stringMatching(/^note:sha256:[0-9a-f]{64}$/u),
      ],
    });
    expect(stored.extensions?.[TASK_CENTRIC_REPLAN_REQUIRED_EXTENSION_KEY]).toEqual({
      schema_version: 1,
      reason_code: "plan_rejection_projection_recovered",
    });
    expect(
      (
        stored.extensions?.[TASK_CENTRIC_RUNTIME_EXTENSION_KEY] as {
          mutation_receipts: Record<string, unknown>;
        }
      ).mutation_receipts["recover-rejection-1"],
    ).toEqual(receipt);
    expect(
      (stored.extensions?.[TASK_CENTRIC_RUNTIME_EXTENSION_KEY] as { events: DomainEvent[] }).events,
    ).toHaveLength(1);
    await expect(
      adapter.recoverRejectedPlanProjection({
        task_id: TASK_ID,
        expected_readme_revision: 52,
        expected_aggregate_revision: 50,
        plan_digest: aggregate.current_plan!.digest,
        expected_state_fingerprint: fingerprint,
        observed_state_fingerprint: fingerprint,
        actor_id: "USER",
        note: "Repair split plan rejection",
        recovered_at: NOW,
        idempotency_key: "recover-rejection-1",
      }),
    ).resolves.toEqual(receipt);
  });

  it("reconciles an interruption after the atomic write from the durable rejection receipt", async () => {
    const initial = taskData(pendingAggregate());
    initial.plan_approval = { state: "pending", updated_at: null, updated_by: null, note: null };
    const durable = memoryBackend(initial);
    let interrupt = true;
    const backend: TaskBackend = {
      ...durable,
      async writeTask(next, options) {
        await durable.writeTask(next, options);
        if (interrupt) {
          interrupt = false;
          throw new Error("simulated interruption after durable write");
        }
      },
    };
    const adapter = new TaskCentricBackendAdapter({
      backend,
      observeRepository: () => Promise.resolve(repository()),
    });
    const plan = pendingAggregate().current_plan!;
    const input = {
      task_id: TASK_ID,
      expected_revision: 1,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      actor_id: "USER",
      note: "Reject once",
      rejected_at: NOW,
      idempotency_key: "reject-after-write",
    } as const;

    await expect(adapter.rejectPlan(input)).rejects.toThrow(/simulated interruption/u);
    const afterInterruption = durable.current();
    expect(afterInterruption.plan_approval?.state).toBe("rejected");
    expect(
      taskCentricAggregateFromExtensions(afterInterruption.extensions)?.current_plan?.approval
        .state,
    ).toBe("rejected");
    await expect(adapter.rejectPlan(input)).resolves.toMatchObject({
      mutation_id: "reject-after-write",
      previous_revision: 1,
      next_revision: 2,
    });
    expect(durable.current()).toEqual(afterInterruption);
  });

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
