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
  reconcileReplacementPlanWorkItems,
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
  type DomainEvent,
  type OutputManifest,
  type ReplacementPlanWorkItemRecoveryEvidence,
  type RepositorySnapshot,
  type TaskAggregate,
  type TaskPlanProposal,
  type TransitionReceipt,
  type ValidationPlan,
  type WorkItem,
  type WorkItemState,
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

function completedRecoveryEvidence(task: TaskAggregate): ReplacementPlanWorkItemRecoveryEvidence {
  const plan = task.current_plan!;
  const current = task.work_items.a!;
  const runtime = {
    ...current,
    state: "COMPLETED" as const,
    revision: current.revision + 1,
    attempt: current.attempt + 1,
    output_manifests: [manifest({ id: "out-a", work_item_id: "a" })],
    validation_result: aggregateValidation(validation("a"), [
      {
        check_id: "check-a",
        status: "passed",
        observed_at: NOW,
        repository_snapshot_digest: snapshot().digest,
        command_identity: "test",
        exit_code: 0,
        artifact_refs: ["verification.json"],
        detail: "passed",
      },
    ]),
  };
  const event: DomainEvent = {
    schema_version: 1,
    id: "event_completed_a",
    mutation_id: "result-a",
    task_id: task.id,
    task_revision: task.revision,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    work_item_id: "a",
    entity: "work_item",
    from: current.state,
    to: runtime.state,
    cause_refs: [],
    actor_id: "agentplane",
    repository_fingerprint: null,
    at: NOW,
  };
  const aggregate: TaskAggregate = {
    ...task,
    revision: task.revision + 1,
    event_cursor: task.event_cursor + 1,
    work_items: { ...task.work_items, a: runtime },
  };
  const receipt: TransitionReceipt = {
    schema_version: 1,
    task_id: task.id,
    previous_revision: task.revision,
    next_revision: aggregate.revision,
    mutation_id: event.mutation_id,
    event,
    aggregate_digest: taskCentricDigest(aggregate),
  };
  return { aggregate, receipt };
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

  it.each<WorkItemState>([
    "PLANNED",
    "READY",
    "CLAIMED",
    "EXECUTING",
    "RESULT_RECEIVED",
    "INSPECTING",
    "VALIDATING",
    "REWORK_READY",
    "COMPLETED",
    "BLOCKED",
    "EFFECT_IN_DOUBT",
    "CANCELLED",
  ])("preserves completed evidence and %s runtime on same-plan reapproval", (state) => {
    const initial = approvedTask([item({ id: "a" }), item({ id: "b", depends_on: ["a"] })]);
    const validationResult = aggregateValidation(validation("a"), [
      {
        check_id: "check-a",
        status: "passed",
        observed_at: NOW,
        repository_snapshot_digest: snapshot().digest,
        command_identity: "test",
        exit_code: 0,
        artifact_refs: ["verification.json"],
        detail: "passed",
      },
    ]);
    const task: TaskAggregate = {
      ...initial,
      work_items: {
        a: {
          ...initial.work_items.a!,
          state: "COMPLETED",
          revision: 7,
          attempt: 2,
          output_manifests: [manifest({ id: "out-a", work_item_id: "a" })],
          validation_result: validationResult,
        },
        b: { ...initial.work_items.b!, state, revision: 4, attempt: 3, claim_id: "claim-b" },
      },
      final_validation: validationResult,
    };
    const plan = approveTaskPlan({
      plan: task.current_plan!,
      expected_digest: task.current_plan!.digest,
      actor: "operator",
      approved_at: "2026-08-30T00:00:00.000Z",
    });
    const reapplied = materializeApprovedWorkItems({ task, plan, now: "2026-08-30T00:00:00.000Z" });
    expect(reapplied).toBe(task);
    expect(materializeApprovedWorkItems({ task: reapplied, plan, now: NOW })).toBe(task);
  });

  it("rejects ambiguous existing runtime instead of resetting it", () => {
    const task = approvedTask([item({ id: "a" }), item({ id: "b", depends_on: ["a"] })]);
    const plan = task.current_plan!;
    const invalid: TaskAggregate[] = [
      { ...task, current_plan: null },
      { ...task, current_plan: { ...plan, revision: plan.revision + 1 } },
      { ...task, current_plan: { ...plan, approval: { ...plan.approval, state: "pending" } } },
      {
        ...task,
        current_plan: {
          ...plan,
          approval: { ...plan.approval, approved_digest: taskCentricDigest("other") },
        },
      },
      { ...task, current_plan: { ...plan, proposal: proposal([item({ id: "changed" })]) } },
      { ...task, work_items: { a: task.work_items.a! } },
      {
        ...task,
        work_items: { ...task.work_items, extra: { ...task.work_items.a!, id: "extra" } },
      },
      { ...task, work_items: { ...task.work_items, a: { ...task.work_items.a!, id: "other" } } },
    ];
    for (const candidate of invalid) {
      expect(() => materializeApprovedWorkItems({ task: candidate, plan, now: NOW })).toThrow(
        /Existing work item runtime/u,
      );
    }
    const draft = createTaskPlanRevision({
      proposal: proposal([item({ id: "new" })]),
      revision: 2,
      created_at: NOW,
    });
    const changed = approveTaskPlan({
      plan: draft,
      expected_digest: draft.digest,
      actor: "operator",
      approved_at: NOW,
    });
    expect(() => materializeApprovedWorkItems({ task, plan: changed, now: NOW })).toThrow(
      /different current revision/u,
    );
    expect(() => materializeApprovedWorkItems({ task, plan: draft, now: NOW })).toThrow(
      /approved current task plan/u,
    );
    expect(
      materializeApprovedWorkItems({
        task: { ...task, current_plan: draft, work_items: {} },
        plan: changed,
        now: NOW,
      }).work_items.new?.state,
    ).toBe("READY");
  });

  it("preserves only unchanged WorkItems across a replacement plan", () => {
    const original = approvedTask([
      item({ id: "done" }),
      item({ id: "changed", depends_on: ["done"] }),
    ]);
    const completed: TaskAggregate = {
      ...original,
      work_items: {
        done: {
          ...original.work_items.done!,
          state: "COMPLETED",
          output_manifests: [manifest({ id: "out-done", work_item_id: "done" })],
        },
        changed: { ...original.work_items.changed!, state: "COMPLETED" },
      },
    };
    const doneDefinition = original.current_plan!.proposal.work_items.work_items[0]!;
    const replacementProposal = proposal([
      {
        ...doneDefinition,
        validation: {
          ...doneDefinition.validation,
          evidence_fingerprint: taskCentricDigest("refreshed-evidence"),
        },
      },
      item({ id: "changed", depends_on: ["done"], objective: "Refined objective" }),
    ]);
    const workItems = reconcileReplacementPlanWorkItems({
      task: completed,
      proposal: replacementProposal,
    });

    expect(workItems.done).toBe(completed.work_items.done);
    expect(workItems.changed).toMatchObject({
      state: "PLANNED",
      revision: 1,
      attempt: 0,
      claim_id: null,
      output_manifests: [],
      validation_result: null,
    });

    const draft = createTaskPlanRevision({
      proposal: replacementProposal,
      revision: completed.current_plan!.revision + 1,
      created_at: NOW,
    });
    const pending: TaskAggregate = {
      ...completed,
      lifecycle: "AWAITING_PLAN_APPROVAL",
      current_plan: draft,
      work_items: workItems,
      final_validation: null,
    };
    const approved = approveTaskPlan({
      plan: draft,
      expected_digest: draft.digest,
      actor: "denis",
      approved_at: NOW,
    });
    const materialized = materializeApprovedWorkItems({ task: pending, plan: approved, now: NOW });

    expect(materialized.work_items.done).toBe(completed.work_items.done);
    expect(materialized.work_items.changed?.state).toBe("READY");
    expect(materialized.current_plan).toBe(approved);
    expect(materialized.lifecycle).toBe("ACTIVE");
  });

  it("recovers an exactly receipted WorkItem runtime after a semantic-only plan revision", () => {
    const original = approvedTask([item({ id: "a" })]);
    const evidence = completedRecoveryEvidence(original);
    const originalDefinition = original.current_plan!.proposal.work_items.work_items[0]!;
    const commandOnlyDefinition = {
      ...originalDefinition,
      validation: {
        ...originalDefinition.validation,
        evidence_fingerprint: taskCentricDigest("command-only-verification-change"),
      },
    };
    const commandOnlyDraft = createTaskPlanRevision({
      proposal: proposal([commandOnlyDefinition]),
      revision: 2,
      created_at: NOW,
    });
    const commandOnlyPlan = approveTaskPlan({
      plan: commandOnlyDraft,
      expected_digest: commandOnlyDraft.digest,
      actor: "denis",
      approved_at: NOW,
    });
    const resetRuntime = {
      id: "a",
      state: "PLANNED" as const,
      revision: 1,
      attempt: 0,
      claim_id: null,
      output_manifests: [],
      validation_result: null,
      last_failure: null,
    };
    const resetTask: TaskAggregate = {
      ...evidence.aggregate,
      current_plan: commandOnlyPlan,
      plan_history: [original.current_plan!],
      work_items: { a: resetRuntime },
      final_validation: null,
    };

    const recovered = reconcileReplacementPlanWorkItems({
      task: resetTask,
      proposal: commandOnlyPlan.proposal,
      recovery_evidence: [evidence],
    });
    expect(recovered.a).toBe(evidence.aggregate.work_items.a);

    const replayed = reconcileReplacementPlanWorkItems({
      task: { ...resetTask, work_items: recovered },
      proposal: commandOnlyPlan.proposal,
      recovery_evidence: [evidence],
    });
    expect(replayed.a).toBe(recovered.a);
  });

  it("fails closed for ambiguous, mismatched, cross-task, or incomplete recovery evidence", () => {
    const original = approvedTask([item({ id: "a" })]);
    const evidence = completedRecoveryEvidence(original);
    const resetRuntime = {
      id: "a",
      state: "PLANNED" as const,
      revision: 1,
      attempt: 0,
      claim_id: null,
      output_manifests: [],
      validation_result: null,
      last_failure: null,
    };
    const resetTask: TaskAggregate = {
      ...original,
      plan_history: [original.current_plan!],
      work_items: { a: resetRuntime },
    };
    const crossTaskAggregate = { ...evidence.aggregate, id: "other-task" };
    const invalidCases: readonly (readonly ReplacementPlanWorkItemRecoveryEvidence[])[] = [
      [evidence, evidence],
      [
        {
          aggregate: evidence.aggregate,
          receipt: { ...evidence.receipt, aggregate_digest: taskCentricDigest("incomplete") },
        },
      ],
      [
        {
          aggregate: crossTaskAggregate,
          receipt: {
            ...evidence.receipt,
            task_id: "other-task",
            event: { ...evidence.receipt.event, task_id: "other-task" },
            aggregate_digest: taskCentricDigest(crossTaskAggregate),
          },
        },
      ],
    ];
    const before = taskCentricDigest(resetTask);
    for (const recovery_evidence of invalidCases) {
      expect(
        reconcileReplacementPlanWorkItems({
          task: resetTask,
          proposal: original.current_plan!.proposal,
          recovery_evidence,
        }).a,
      ).toBe(resetRuntime);
      expect(taskCentricDigest(resetTask)).toBe(before);
    }

    const changed = proposal([item({ id: "a", objective: "Different semantic contract" })]);
    expect(
      reconcileReplacementPlanWorkItems({
        task: resetTask,
        proposal: changed,
        recovery_evidence: [evidence],
      }).a,
    ).toMatchObject({ state: "PLANNED", revision: 1, attempt: 0 });
    expect(taskCentricDigest(resetTask)).toBe(before);
  });

  it.each(["scope", "acceptance"] as const)(
    "rejects reapproval after persisted %s changes with a stale digest",
    (field) => {
      const original = approvedTask([item({ id: "a" })]);
      const originalPlan = original.current_plan!;
      const definition = originalPlan.proposal.work_items.work_items[0]!;
      const changed =
        field === "scope"
          ? { ...definition, scope_roots: ["packages/expanded"] }
          : {
              ...definition,
              acceptance_criteria: [
                { ...definition.acceptance_criteria[0]!, description: "Changed acceptance" },
              ],
            };
      const persistedPlan = {
        ...originalPlan,
        proposal: {
          ...originalPlan.proposal,
          work_items: { ...originalPlan.proposal.work_items, work_items: [changed] },
        },
      };
      const task = {
        ...original,
        current_plan: persistedPlan,
        work_items: {
          a: {
            ...original.work_items.a!,
            state: "COMPLETED" as const,
            output_manifests: [manifest({ id: "out-a", work_item_id: "a" })],
          },
        },
      };
      const before = taskCentricDigest(task);
      const approved = approveTaskPlan({
        plan: task.current_plan,
        expected_digest: task.current_plan.digest,
        actor: "operator",
        approved_at: NOW,
      });
      expect(() => materializeApprovedWorkItems({ task, plan: approved, now: NOW })).toThrow(
        /Existing work item runtime/u,
      );
      expect(taskCentricDigest(task)).toBe(before);
    },
  );

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
      reason_codes: expect.arrayContaining([
        "dependency_incomplete:a",
        "input_missing:out-a",
      ]) as unknown,
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
