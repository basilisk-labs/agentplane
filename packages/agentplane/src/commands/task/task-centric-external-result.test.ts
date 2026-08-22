import {
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  withTaskCentricAggregate,
  type TaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import type { AgentSemanticResult, AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { describe, expect, it } from "vitest";

import type { TaskBackend, TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { recordTaskCentricExternalResult } from "./task-centric-external-result.js";

const TASK_ID = "202608220000-WORK01";
const NOW = "2026-08-22T00:00:00.000Z";
const HEAD = "a".repeat(40);

function repository() {
  return createRepositorySnapshot({
    git: { kind: "commit", sha: HEAD, ref: "refs/heads/main" },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: NOW,
  });
}

function check(id: string, command?: string) {
  return {
    schema_version: 1 as const,
    criteria: [
      { id: `criterion-${id}`, description: id, required: true, check_ids: [`check-${id}`] },
    ],
    checks: [
      {
        id: `check-${id}`,
        kind: "deterministic" as const,
        required: true,
        capability: "task.verify",
        ...(command ? { command } : {}),
      },
    ],
    evidence_fingerprint: taskCentricDigest(id),
  };
}

function initialTask(command?: string): TaskData {
  const proposal: TaskPlanProposal = {
    schema_version: 1,
    task_id: TASK_ID,
    planning_baseline: repository(),
    work_items: {
      schema_version: 1,
      work_items: ["a", "b"].map((id, index) => ({
        id,
        objective: `Implement ${id}`,
        depends_on: index === 0 ? [] : ["a"],
        required_inputs: index === 0 ? [] : ["out-a"],
        expected_outputs: [`out-${id}`],
        scope_roots: ["packages"],
        acceptance_criteria: check(id, id === "a" ? command : undefined).criteria,
        validation: check(id, id === "a" ? command : undefined),
        context: {
          required_sources: ["repository"],
          optional_sources: [],
          symbol_hints: [],
          max_bytes: 8192,
        },
        risk: "medium" as const,
        capabilities: ["task.verify"],
        resource_claims: [{ kind: "path" as const, resource: "packages", mode: "write" as const }],
        optional: false,
        priority: 2 - index,
      })),
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: check("root"),
  };
  const draft = createTaskPlanRevision({ proposal, revision: 1, created_at: NOW });
  const plan = approveTaskPlan({
    plan: draft,
    expected_digest: draft.digest,
    actor: "user",
    approved_at: NOW,
  });
  const aggregate = materializeApprovedWorkItems({
    task: createLegacyTaskAggregate({
      id: TASK_ID,
      revision: 1,
      title: "Task",
      description: "Description",
      status: "TODO",
      acceptance_criteria: ["done"],
      captured_at: NOW,
      updated_at: NOW,
    }),
    plan,
    now: NOW,
  });
  return {
    id: TASK_ID,
    title: "Task",
    description: "Description",
    status: "DOING",
    priority: "med",
    owner: "CODER",
    revision: aggregate.revision,
    depends_on: [],
    tags: [],
    verify: ["bun test"],
    commit: { hash: HEAD, message: "implementation" },
    verification: {
      state: "ok",
      attempts: 1,
      updated_at: NOW,
      updated_by: "SUPERVISOR",
      note: "passed",
    },
    extensions: withTaskCentricAggregate({}, aggregate),
  };
}

function memoryBackend(
  initial = initialTask(),
): TaskBackend & { current(): TaskData; replace(task: TaskData): void } {
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
    getTask(id: string) {
      return Promise.resolve(id === TASK_ID ? structuredClone(current) : null);
    },
    writeTask(next: TaskData, opts) {
      if (opts?.expectedRevision !== undefined && opts.expectedRevision !== current.revision) {
        throw new Error("Task revision changed concurrently");
      }
      current = structuredClone(next);
      return Promise.resolve();
    },
    current: () => structuredClone(current),
    replace(next: TaskData) {
      current = structuredClone(next);
    },
  } as TaskBackend & { current(): TaskData; replace(task: TaskData): void };
}

function workOrder(workItemId: string | null, workOrderId: string): AgentWorkOrderV2 {
  return {
    work_order_id: workOrderId,
    role: "EXECUTOR",
    task: { id: TASK_ID, work_item_id: workItemId },
    state_fingerprint: { digest: taskCentricDigest(workOrderId) },
    planning_context: {
      digest: taskCentricDigest(`context-${workOrderId}`),
      repository_snapshot: repository(),
    },
  } as unknown as AgentWorkOrderV2;
}

const semantic = {
  schema_version: 2,
  kind: "agent_semantic_result",
  work_order_id: "work-a",
  status: "completed",
  summary: "done",
  findings: ["implemented"],
  uncertainty: [],
} as const satisfies AgentSemanticResult;

describe("recordTaskCentricExternalResult", () => {
  it("replays a null-ID result against its claimed WorkItem instead of the next item", async () => {
    const initial = initialTask();
    const aggregate = taskCentricAggregateFromExtensions(initial.extensions)!;
    const backend = memoryBackend({
      ...initial,
      extensions: withTaskCentricAggregate(initial.extensions, {
        ...aggregate,
        work_items: {
          ...aggregate.work_items,
          a: { ...aggregate.work_items.a!, state: "CLAIMED", claim_id: "claim-a" },
        },
      }),
    });
    const command = { taskBackend: backend } as unknown as CommandContext;
    const verification = {
      status: "passed" as const,
      artifact_path: ".agentplane/checks.json",
      checks: [],
      reason: null,
    };
    const issued = workOrder(null, "work-null-id");
    const result = { ...semantic, work_order_id: "work-null-id" };

    await expect(
      recordTaskCentricExternalResult({
        command,
        work_order: issued,
        semantic: result,
        verification,
        head: HEAD,
        dirty_paths: [],
      }),
    ).resolves.toEqual({
      state: "work_item_completed",
      work_item_id: "a",
      remaining_required_work_items: 1,
    });
    expect(
      taskCentricAggregateFromExtensions(backend.current().extensions)?.work_items,
    ).toMatchObject({ a: { state: "COMPLETED" }, b: { state: "PLANNED" } });
    const completedRevision = backend.current().revision;

    await expect(
      recordTaskCentricExternalResult({
        command,
        work_order: issued,
        semantic: result,
        verification,
        head: HEAD,
        dirty_paths: [],
      }),
    ).resolves.toEqual({
      state: "work_item_completed",
      work_item_id: "a",
      remaining_required_work_items: 1,
    });
    expect(
      taskCentricAggregateFromExtensions(backend.current().extensions)?.work_items,
    ).toMatchObject({ a: { state: "COMPLETED" }, b: { state: "PLANNED" } });
    expect(backend.current().revision).toBe(completedRevision);
  });

  it("advances internal WorkItems while keeping one top-level Task", async () => {
    const backend = memoryBackend();
    const command = { taskBackend: backend } as unknown as CommandContext;
    const verification = {
      status: "passed" as const,
      artifact_path: ".agentplane/checks.json",
      checks: [],
      reason: null,
    };
    await expect(
      recordTaskCentricExternalResult({
        command,
        work_order: workOrder("a", "work-a"),
        semantic,
        verification,
        head: HEAD,
        dirty_paths: [],
      }),
    ).resolves.toEqual({
      state: "work_item_completed",
      work_item_id: "a",
      remaining_required_work_items: 1,
    });
    let current = backend.current();
    let aggregate = taskCentricAggregateFromExtensions(current.extensions)!;
    expect(aggregate.work_items.a?.state).toBe("COMPLETED");
    expect(aggregate.work_items.b?.state).toBe("PLANNED");
    expect(current.commit).toBeNull();
    expect(current.verification?.state).toBe("pending");

    backend.replace({
      ...current,
      commit: { hash: HEAD, message: "second" },
      verification: {
        state: "ok",
        attempts: 1,
        updated_at: NOW,
        updated_by: "SUPERVISOR",
        note: "passed",
      },
    });
    await expect(
      recordTaskCentricExternalResult({
        command,
        work_order: workOrder("b", "work-b"),
        semantic: { ...semantic, work_order_id: "work-b" },
        verification,
        head: HEAD,
        dirty_paths: [],
      }),
    ).resolves.toEqual({
      state: "work_item_completed",
      work_item_id: "b",
      remaining_required_work_items: 0,
    });
    current = backend.current();
    aggregate = taskCentricAggregateFromExtensions(current.extensions)!;
    expect(Object.values(aggregate.work_items).map((item) => item.state)).toEqual([
      "COMPLETED",
      "COMPLETED",
    ]);
    expect(current.commit?.message).toBe("second");
    expect(current.verification?.state).toBe("ok");
    expect(await backend.listTasks()).toHaveLength(1);
  });

  it("records deterministic failure as bounded rework instead of false success", async () => {
    const backend = memoryBackend();
    const projection = await recordTaskCentricExternalResult({
      command: { taskBackend: backend } as unknown as CommandContext,
      work_order: workOrder("a", "work-failed"),
      semantic: { ...semantic, work_order_id: "work-failed" },
      verification: {
        status: "failed",
        artifact_path: ".agentplane/checks.json",
        checks: [],
        reason: "test failed",
      },
      head: HEAD,
      dirty_paths: [],
    });
    expect(projection.state).toBe("work_item_rework");
    const runtime = taskCentricAggregateFromExtensions(backend.current().extensions)?.work_items.a;
    expect(runtime).toMatchObject({ state: "REWORK_READY", attempt: 1 });
    expect(runtime?.validation_result?.status).toBe("failed");
  });

  it("requires command-specific evidence for every declared validation command", async () => {
    const backend = memoryBackend(initialTask("bun test --filter task-centric"));
    const projection = await recordTaskCentricExternalResult({
      command: { taskBackend: backend } as unknown as CommandContext,
      work_order: workOrder("a", "work-missing-command"),
      semantic: { ...semantic, work_order_id: "work-missing-command" },
      verification: {
        status: "passed",
        artifact_path: ".agentplane/checks.json",
        checks: [],
        reason: null,
      },
      head: HEAD,
      dirty_paths: [],
    });

    expect(projection.state).toBe("work_item_rework");
    const validationResult = taskCentricAggregateFromExtensions(backend.current().extensions)
      ?.work_items.a?.validation_result;
    expect(validationResult?.status).toBe("blocked");
    expect(validationResult?.evidence).toEqual([
      expect.objectContaining({
        check_id: "check-a",
        status: "unsupported",
        command_identity: "bun test --filter task-centric",
        exit_code: null,
        detail: expect.stringContaining("was not observed") as unknown,
      }),
    ]);
  });

  it("records local amendments without invalidating approval and routes material changes to replanning", async () => {
    const verification = {
      status: "passed" as const,
      artifact_path: ".agentplane/checks.json",
      checks: [],
      reason: null,
    };
    const localBackend = memoryBackend();
    await expect(
      recordTaskCentricExternalResult({
        command: { taskBackend: localBackend } as unknown as CommandContext,
        work_order: workOrder("a", "work-local-refinement"),
        semantic: {
          ...semantic,
          work_order_id: "work-local-refinement",
          plan_refinement: {
            description: "Clarify and split the current step.",
            scope_roots_added: [],
            outputs_added: [],
            acceptance_changed: false,
            risk_changed: false,
            external_effects_added: [],
            dependencies_changed: false,
            architecture_constraints_changed: false,
            operations: ["split", "clarify"],
          },
        },
        verification,
        head: HEAD,
        dirty_paths: [],
      }),
    ).resolves.toMatchObject({ state: "work_item_completed", work_item_id: "a" });
    const locallyAmended = taskCentricAggregateFromExtensions(localBackend.current().extensions)!;
    expect(locallyAmended.current_plan?.approval.state).toBe("approved");
    expect(locallyAmended.plan_amendments).toHaveLength(1);

    const materialBackend = memoryBackend();
    await expect(
      recordTaskCentricExternalResult({
        command: { taskBackend: materialBackend } as unknown as CommandContext,
        work_order: workOrder("a", "work-material-refinement"),
        semantic: {
          ...semantic,
          work_order_id: "work-material-refinement",
          plan_refinement: {
            description: "Expand the approved scope.",
            scope_roots_added: ["outside"],
            outputs_added: [],
            acceptance_changed: false,
            risk_changed: false,
            external_effects_added: [],
            dependencies_changed: false,
            architecture_constraints_changed: false,
            operations: [],
          },
        },
        verification,
        head: HEAD,
        dirty_paths: [],
      }),
    ).resolves.toMatchObject({ state: "replan_required", work_item_id: "a" });
    const material = taskCentricAggregateFromExtensions(materialBackend.current().extensions)!;
    expect(material.lifecycle).toBe("PLANNING");
    expect(material.work_items.a?.state).toBe("READY");
  });
});
