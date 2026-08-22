import { describe, expect, it } from "vitest";

import {
  aggregateValidation,
  applyPlanRefinement,
  approveTaskPlan,
  assertAutonomousRepositoryCapabilities,
  assertTaskTransition,
  assertWorkItemTransition,
  belongsInLiveTaskIndex,
  classifyPlanChange,
  computeReadyWorkItems,
  consumeRetryBudget,
  createHumanDecisionTicket,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  decideConfirmation,
  dispositionForOutcome,
  evaluateTaskCompletion,
  materializeApprovedWorkItems,
  parseTaskPlanProposal,
  recoveryDecisionForFailure,
  requiredOutputManifestsPresent,
  requiredOutputsSatisfied,
  resourceClaimsConflict,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  validateHumanDecisionAnswer,
  validateTaskPlanProposal,
  validateWorkItemGraph,
  withTaskCentricAggregate,
  WorkItemScheduler,
  type OutputManifest,
  type RepositorySnapshot,
  type TaskAggregate,
  type TaskPlanProposal,
  type ValidationPlan,
  type WorkItem,
} from "./index.js";

const NOW = "2026-08-22T00:00:00.000Z";

function snapshot(sha = "a".repeat(40), dirty_paths: readonly string[] = []): RepositorySnapshot {
  return createRepositorySnapshot({
    git: { kind: "commit", sha, ref: "refs/heads/main" },
    dirty_paths,
    policy_digest: taskCentricDigest("policy"),
    config_digest: taskCentricDigest("config"),
    context_digest: taskCentricDigest("context"),
    task_history_cursor: "cursor-1",
    captured_at: NOW,
  });
}

function validation(id: string): ValidationPlan {
  const checkId = `check-${id}`;
  return {
    schema_version: 1,
    criteria: [
      {
        id: `criterion-${id}`,
        description: `Validate ${id}`,
        required: true,
        check_ids: [checkId],
      },
    ],
    checks: [{ id: checkId, kind: "deterministic", required: true, capability: "test" }],
    evidence_fingerprint: taskCentricDigest({ id }),
  };
}

function item(opts: Partial<WorkItem> & Pick<WorkItem, "id">): WorkItem {
  const plan = validation(opts.id);
  return {
    id: opts.id,
    objective: opts.objective ?? `Implement ${opts.id}`,
    depends_on: opts.depends_on ?? [],
    required_inputs: opts.required_inputs ?? [],
    expected_outputs: opts.expected_outputs ?? [`out-${opts.id}`],
    scope_roots: opts.scope_roots ?? [`packages/${opts.id}`],
    acceptance_criteria: opts.acceptance_criteria ?? plan.criteria,
    validation: opts.validation ?? plan,
    context: opts.context ?? {
      required_sources: ["repository"],
      optional_sources: [],
      symbol_hints: [],
      max_bytes: 16_384,
    },
    risk: opts.risk ?? "medium",
    capabilities: opts.capabilities ?? ["test"],
    resource_claims: opts.resource_claims ?? [
      { kind: "path", resource: `packages/${opts.id}`, mode: "write" },
    ],
    optional: opts.optional ?? false,
    priority: opts.priority ?? 0,
  };
}

function proposal(workItems: readonly WorkItem[], baseline = snapshot()): TaskPlanProposal {
  return {
    schema_version: 1,
    task_id: "task-1",
    planning_baseline: baseline,
    work_items: { schema_version: 1, work_items: workItems },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation("root"),
  };
}

function approvedTask(workItems: readonly WorkItem[]): TaskAggregate {
  const plan = createTaskPlanRevision({
    proposal: proposal(workItems),
    revision: 1,
    created_at: NOW,
  });
  const approved = approveTaskPlan({
    plan,
    expected_digest: plan.digest,
    actor: "denis",
    approved_at: NOW,
  });
  return materializeApprovedWorkItems({
    task: createLegacyTaskAggregate({
      id: "task-1",
      revision: 1,
      title: "Task",
      description: "Description",
      status: "TODO",
      acceptance_criteria: ["Complete the task"],
      captured_at: NOW,
      updated_at: NOW,
    }),
    plan: approved,
    now: NOW,
  });
}

function manifest(opts: {
  id: string;
  work_item_id: string;
  repository?: RepositorySnapshot;
}): OutputManifest {
  return {
    schema_version: 1,
    id: opts.id,
    kind: "test",
    schema: "test.v1",
    digest: taskCentricDigest(opts.id),
    producer: { task_id: "task-1", plan_revision: 1, work_item_id: opts.work_item_id, attempt: 1 },
    repository_snapshot_digest: (opts.repository ?? snapshot()).digest,
    provenance: [],
  };
}

describe("task-centric domain", () => {
  it("creates stable repository snapshots and rejects synthetic zero Git identities", () => {
    expect(snapshot().digest).toBe(snapshot().digest);
    expect(snapshot("b".repeat(40)).digest).not.toBe(snapshot().digest);
    expect(() => snapshot("0".repeat(40))).toThrow(/valid Git object id/u);
    expect(() => snapshot("not-a-sha")).toThrow(/valid Git object id/u);
    expect(
      createRepositorySnapshot({
        git: { kind: "unborn", ref: "refs/heads/main" },
        dirty_paths: [],
        policy_digest: null,
        config_digest: null,
        context_digest: null,
        task_history_cursor: null,
        captured_at: NOW,
      }).git,
    ).toEqual({ kind: "unborn", ref: "refs/heads/main" });
  });

  it("binds approval to one immutable plan digest and atomically materializes internal work items", () => {
    const draft = createTaskPlanRevision({
      proposal: proposal([item({ id: "a" }), item({ id: "b", depends_on: ["a"] })]),
      revision: 1,
      created_at: NOW,
    });
    expect(() =>
      approveTaskPlan({
        plan: draft,
        expected_digest: taskCentricDigest("stale"),
        actor: "denis",
        approved_at: NOW,
      }),
    ).toThrow(/stale/u);

    const approved = approveTaskPlan({
      plan: draft,
      expected_digest: draft.digest,
      actor: "denis",
      approved_at: NOW,
      policy_facts: ["explicit-user-approval"],
    });
    expect(
      approveTaskPlan({
        plan: approved,
        expected_digest: draft.digest,
        actor: "other",
        approved_at: NOW,
      }),
    ).toBe(approved);

    const aggregate = materializeApprovedWorkItems({
      task: createLegacyTaskAggregate({
        id: "task-1",
        revision: 1,
        title: "One task",
        description: "Two internal steps",
        status: "TODO",
        acceptance_criteria: ["done"],
        captured_at: NOW,
        updated_at: NOW,
      }),
      plan: approved,
      now: NOW,
    });
    expect(aggregate.lifecycle).toBe("ACTIVE");
    expect(Object.keys(aggregate.work_items)).toEqual(["a", "b"]);
    expect(aggregate.work_items.a?.state).toBe("READY");
    expect(aggregate.work_items.b?.state).toBe("PLANNED");
    expect(aggregate.id).toBe("task-1");
  });

  it("rejects malformed plans deterministically before approval", () => {
    const cyclic = proposal([
      item({ id: "a", depends_on: ["b"], capabilities: ["missing"] }),
      item({ id: "b", depends_on: ["a"] }),
    ]);
    expect(
      validateWorkItemGraph(cyclic.work_items, new Set(["test"])).map((issue) => issue.code),
    ).toEqual(expect.arrayContaining(["dependency_cycle", "unsupported_capability"]));

    const uncovered = proposal([
      item({
        id: "uncovered",
        validation: {
          ...validation("uncovered"),
          criteria: [],
        },
      }),
    ]);
    expect(validateWorkItemGraph(uncovered.work_items).map((issue) => issue.code)).toContain(
      "missing_validation",
    );
    expect(() => parseTaskPlanProposal(uncovered)).toThrow(/not fully covered/u);

    const stale = { ...proposal([item({ id: "a" })]), unresolved_questions: ["Material choice"] };
    expect(
      validateTaskPlanProposal({
        proposal: stale,
        expected_task_id: "task-1",
        current_repository_digest: snapshot("b".repeat(40)).digest,
        supported_capabilities: new Set(["test"]),
      }).map((issue) => issue.code),
    ).toEqual(expect.arrayContaining(["material_question", "stale_baseline"]));

    const parsed = parseTaskPlanProposal(proposal([item({ id: "a" })]));
    expect(parsed.task_id).toBe("task-1");
    expect(() => parseTaskPlanProposal({ ...parsed, task_id: "" })).toThrow();
  });

  it("computes readiness and deterministic resource-aware scheduling", () => {
    const a = item({
      id: "a",
      priority: 2,
      resource_claims: [{ kind: "path", resource: "src", mode: "write" }],
    });
    const b = item({
      id: "b",
      priority: 1,
      resource_claims: [{ kind: "path", resource: "src/nested", mode: "write" }],
    });
    const c = item({
      id: "c",
      priority: 1,
      resource_claims: [{ kind: "path", resource: "docs", mode: "write" }],
    });
    const task = approvedTask([a, b, c]);
    expect(resourceClaimsConflict(a.resource_claims, b.resource_claims)).toBe(true);
    expect(resourceClaimsConflict(a.resource_claims, c.resource_claims)).toBe(false);
    expect(
      new WorkItemScheduler(2)
        .select({
          graph: task.current_plan!.proposal.work_items,
          runtime: task.work_items,
          active_leases: [],
        })
        .map((entry) => entry.id),
    ).toEqual(["a", "c"]);

    const dependent = item({ id: "dependent", depends_on: ["a"], required_inputs: ["out-a"] });
    const dependentTask = approvedTask([a, dependent]);
    expect(
      computeReadyWorkItems({
        graph: dependentTask.current_plan!.proposal.work_items,
        runtime: dependentTask.work_items,
      })[1],
    ).toMatchObject({
      ready: false,
      reason_codes: expect.arrayContaining(["dependency_incomplete:a", "input_missing:out-a"]),
    });
  });

  it("distinguishes current output freshness from durable output presence", () => {
    const work = item({ id: "a", expected_outputs: ["out-a"] });
    const original = snapshot();
    const output = manifest({ id: "out-a", work_item_id: "a", repository: original });
    expect(requiredOutputsSatisfied(work, [output], original.digest)).toBe(true);
    expect(requiredOutputsSatisfied(work, [output], snapshot("b".repeat(40)).digest)).toBe(false);
    expect(requiredOutputManifestsPresent(work, [output])).toBe(true);
    expect(
      requiredOutputManifestsPresent(work, [
        { ...output, producer: { ...output.producer, work_item_id: "other" } },
      ]),
    ).toBe(false);
  });

  it("aggregates validation and requires complete evidence for Task completion", () => {
    const work = item({ id: "a" });
    const task = approvedTask([work]);
    const evidence = [
      {
        check_id: "check-a",
        status: "passed" as const,
        observed_at: NOW,
        repository_snapshot_digest: snapshot().digest,
        command_identity: "test",
        exit_code: 0,
        artifact_refs: [],
        detail: "passed",
      },
    ];
    const result = aggregateValidation(work.validation, evidence);
    const completed = {
      ...task,
      work_items: {
        a: {
          ...task.work_items.a!,
          state: "COMPLETED" as const,
          output_manifests: [manifest({ id: "out-a", work_item_id: "a" })],
          validation_result: result,
        },
      },
      final_validation: aggregateValidation(task.current_plan!.proposal.top_level_validation, [
        { ...evidence[0]!, check_id: "check-root" },
      ]),
    };
    expect(
      evaluateTaskCompletion({
        task: completed,
        repository_digest: snapshot("c".repeat(40)).digest,
        pending_effects: [],
      }),
    ).toEqual({ eligible: true, reason_codes: [] });
    expect(
      evaluateTaskCompletion({
        task: { ...completed, final_validation: null },
        repository_digest: snapshot().digest,
        pending_effects: [],
      }).reason_codes,
    ).toContain("final_validation_missing");
    expect(
      evaluateTaskCompletion({
        task: completed,
        repository_digest: snapshot().digest,
        pending_effects: [
          { operation_id: "op", state: "effect_in_doubt", idempotent: false, receipt_ref: null },
        ],
      }).reason_codes,
    ).toContain("pending_or_uncertain_effect");
  });

  it("enforces lifecycle, confirmation, recovery, retry, and plan-change policies", () => {
    expect(() => assertTaskTransition("CAPTURED", "COMPLETED")).toThrow(/Illegal/u);
    expect(() => assertWorkItemTransition("READY", "COMPLETED")).toThrow(/Illegal/u);
    expect(() => assertTaskTransition("CAPTURED", "PLANNING")).not.toThrow();
    expect(dispositionForOutcome("failed")).toMatchObject({
      kind: "failure",
      exit_code: 1,
      terminal: true,
    });
    expect(dispositionForOutcome("awaiting_plan_approval")).toMatchObject({
      kind: "pause",
      exit_code: 0,
      terminal: false,
    });
    expect(
      recoveryDecisionForFailure({
        kind: "effect_in_doubt",
        code: "unknown",
        message: "unknown",
        retryable: true,
        cause_refs: [],
      }).action,
    ).toBe("reconcile_effect");
    expect(
      decideConfirmation({
        plan_approved: true,
        plan_digest_matches: true,
        safe_local_effect: true,
        external_effect: false,
        destructive_effect: false,
        credentials_required: false,
        policy_allows_external_effect: false,
        effect_state: "none",
      }).action,
    ).toBe("proceed");
    expect(
      classifyPlanChange({
        description: "split",
        scope_roots_added: [],
        outputs_added: [],
        acceptance_changed: false,
        risk_changed: false,
        external_effects_added: [],
        dependencies_changed: false,
        architecture_constraints_changed: false,
        operations: ["split", "add_test"],
      }),
    ).toEqual({ material: false, reason_codes: [] });
    expect(
      classifyPlanChange({
        description: "expand",
        scope_roots_added: ["new"],
        outputs_added: [],
        acceptance_changed: false,
        risk_changed: false,
        external_effects_added: [],
        dependencies_changed: false,
        architecture_constraints_changed: false,
        operations: [],
      }).material,
    ).toBe(true);
    const approved = approvedTask([item({ id: "a" })]);
    const local = applyPlanRefinement({
      task: approved,
      refinement: {
        description: "split and clarify",
        scope_roots_added: [],
        outputs_added: [],
        acceptance_changed: false,
        risk_changed: false,
        external_effects_added: [],
        dependencies_changed: false,
        architecture_constraints_changed: false,
        operations: ["split", "clarify"],
      },
      actor_id: "same-actor",
      at: NOW,
    });
    expect(local).toMatchObject({
      action: "amended",
      classification: { material: false },
      task: { lifecycle: "ACTIVE", current_plan: { approval: { state: "approved" } } },
      amendment: { actor_id: "same-actor", plan_digest: approved.current_plan!.digest },
    });
    expect(local.task.current_plan).toBe(approved.current_plan);
    const material = applyPlanRefinement({
      task: approved,
      refinement: {
        description: "expand scope",
        scope_roots_added: ["new"],
        outputs_added: [],
        acceptance_changed: false,
        risk_changed: false,
        external_effects_added: [],
        dependencies_changed: false,
        architecture_constraints_changed: false,
        operations: [],
      },
      actor_id: "same-actor",
      at: NOW,
    });
    expect(material).toMatchObject({
      action: "replan_required",
      classification: { material: true },
      amendment: null,
    });
    expect(material.task).toBe(approved);
    const budget = {
      task_id: "task-1",
      work_item_id: "a",
      operation: "actor",
      failure_kind: "actor" as const,
      maximum: 1,
      consumed: 0,
      reset_fingerprint: snapshot().digest,
    };
    expect(consumeRetryBudget({ budget, current_fingerprint: snapshot().digest })?.consumed).toBe(
      1,
    );
    expect(
      consumeRetryBudget({
        budget: { ...budget, consumed: 1 },
        current_fingerprint: snapshot().digest,
      }),
    ).toBeNull();
  });

  it("binds human answers and legacy projections to explicit state", () => {
    const state = taskCentricDigest("state");
    const ticket = createHumanDecisionTicket({
      kind: "semantic",
      question: "Choose",
      alternatives: [{ id: "a", consequence: "Proceed" }],
      required_authority: "user",
      state_fingerprint: state,
      expires_at: "2026-08-23T00:00:00.000Z",
    });
    expect(() =>
      validateHumanDecisionAnswer({ ticket, state_fingerprint: state, answer_id: "a", now: NOW }),
    ).not.toThrow();
    expect(() =>
      validateHumanDecisionAnswer({
        ticket,
        state_fingerprint: taskCentricDigest("changed"),
        answer_id: "a",
        now: NOW,
      }),
    ).toThrow(/stale/u);
    expect(() =>
      validateHumanDecisionAnswer({
        ticket,
        state_fingerprint: state,
        answer_id: "a",
        now: "2026-08-24T00:00:00.000Z",
      }),
    ).toThrow(/expired/u);

    const task = approvedTask([item({ id: "a" })]);
    expect(taskCentricAggregateFromExtensions(withTaskCentricAggregate({}, task))).toEqual(task);
    expect(() =>
      taskCentricAggregateFromExtensions({
        "agentplane.task_centric": { ...task, lifecycle: "FUTURE" },
      }),
    ).toThrow(/malformed/u);
    expect(
      belongsInLiveTaskIndex(
        { ...task, lifecycle: "COMPLETED", updated_at: "2025-01-01T00:00:00.000Z" },
        "2026-01-01T00:00:00.000Z",
      ),
    ).toBe(false);
  });

  it("fails closed when repository capabilities cannot support autonomous execution", () => {
    expect(() =>
      assertAutonomousRepositoryCapabilities({
        compare_and_swap: true,
        atomic_transition_event: true,
        atomic_plan_materialization: true,
        idempotency_keys: true,
        serialized: false,
      }),
    ).not.toThrow();
    expect(() =>
      assertAutonomousRepositoryCapabilities({
        compare_and_swap: false,
        atomic_transition_event: true,
        atomic_plan_materialization: true,
        idempotency_keys: true,
        serialized: false,
      }),
    ).toThrow(/requires CAS/u);
  });
});
