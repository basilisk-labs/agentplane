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
  type OutputManifest,
  type RepositorySnapshot,
  type TaskAggregate,
  type TaskPlanProposal,
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

  it("preserves completed runtime across a baseline-only fingerprint change", () => {
    const implementation = item({ id: "implementation" });
    const qualificationValidation = validation("qualification");
    const qualification = item({
      id: "qualification",
      depends_on: ["implementation"],
      required_inputs: ["out-implementation"],
      validation: {
        ...qualificationValidation,
        checks: qualificationValidation.checks.map((check) => ({
          ...check,
          command: "agentplane task lint 202609032308-F31YXS",
        })),
      },
    });
    const original = approvedTask([implementation, qualification]);
    const implementationValidationResult = aggregateValidation(implementation.validation, [
      {
        check_id: "check-implementation",
        status: "passed",
        observed_at: NOW,
        repository_snapshot_digest: snapshot().digest,
        command_identity: "bun test implementation",
        exit_code: 0,
        artifact_refs: ["implementation-verification.json"],
        detail: "passed",
      },
    ]);
    const completed: TaskAggregate = {
      ...original,
      work_items: {
        implementation: {
          ...original.work_items.implementation!,
          state: "COMPLETED",
          revision: 7,
          attempt: 2,
          output_manifests: [
            manifest({ id: "out-implementation", work_item_id: "implementation" }),
          ],
          validation_result: implementationValidationResult,
        },
        qualification: {
          ...original.work_items.qualification!,
          state: "COMPLETED",
          revision: 5,
          attempt: 3,
        },
      },
    };
    const replacementProposal = proposal([
      {
        ...implementation,
        validation: {
          ...implementation.validation,
          evidence_fingerprint: taskCentricDigest("replacement baseline"),
        },
      },
      {
        ...qualification,
        validation: {
          ...qualification.validation,
          checks: qualification.validation.checks.map((check) => ({
            ...check,
            command: "agentplane task lint",
          })),
          evidence_fingerprint: taskCentricDigest("replacement baseline"),
        },
      },
    ]);
    const workItems = reconcileReplacementPlanWorkItems({
      task: completed,
      proposal: replacementProposal,
    });

    expect(workItems.implementation).toBe(completed.work_items.implementation);
    expect(workItems.implementation?.validation_result).toBe(implementationValidationResult);
    expect(workItems.qualification).toMatchObject({
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

    expect(materialized.work_items.implementation).toBe(completed.work_items.implementation);
    expect(materialized.work_items.qualification?.state).toBe("READY");
    expect(materialized.current_plan).toBe(approved);
    expect(materialized.lifecycle).toBe("ACTIVE");
  });

  it.each([
    ["objective", (value: WorkItem) => ({ ...value, objective: "Changed objective" })],
    ["dependency", (value: WorkItem) => ({ ...value, depends_on: ["other"] })],
    ["required input", (value: WorkItem) => ({ ...value, required_inputs: ["other-output"] })],
    ["expected output", (value: WorkItem) => ({ ...value, expected_outputs: ["other-output"] })],
    ["scope", (value: WorkItem) => ({ ...value, scope_roots: ["packages/other"] })],
    [
      "acceptance",
      (value: WorkItem) => ({
        ...value,
        acceptance_criteria: [
          { ...value.acceptance_criteria[0]!, description: "Changed acceptance" },
        ],
      }),
    ],
    [
      "validation criterion",
      (value: WorkItem) => ({
        ...value,
        validation: {
          ...value.validation,
          criteria: [{ ...value.validation.criteria[0]!, description: "Changed criterion" }],
        },
      }),
    ],
    [
      "validation command",
      (value: WorkItem) => ({
        ...value,
        validation: {
          ...value.validation,
          checks: value.validation.checks.map((check) => ({ ...check, command: "changed" })),
        },
      }),
    ],
    [
      "context",
      (value: WorkItem) => ({
        ...value,
        context: { ...value.context, required_sources: ["changed"] },
      }),
    ],
    ["risk", (value: WorkItem) => ({ ...value, risk: "high" as const })],
    ["capability", (value: WorkItem) => ({ ...value, capabilities: ["changed"] })],
    [
      "resource claim",
      (value: WorkItem) => ({
        ...value,
        resource_claims: [{ kind: "path" as const, resource: "changed", mode: "write" as const }],
      }),
    ],
    ["optionality", (value: WorkItem) => ({ ...value, optional: true })],
    ["priority", (value: WorkItem) => ({ ...value, priority: value.priority + 1 })],
  ] satisfies readonly (readonly [string, (value: WorkItem) => WorkItem])[])(
    "resets runtime when the replacement changes %s",
    (_field, mutate) => {
      const definition = item({ id: "candidate" });
      const original = approvedTask([definition]);
      const completed: TaskAggregate = {
        ...original,
        work_items: {
          candidate: {
            ...original.work_items.candidate!,
            state: "COMPLETED",
            revision: 8,
            attempt: 4,
            output_manifests: [manifest({ id: "out-candidate", work_item_id: "candidate" })],
          },
        },
      };

      expect(
        reconcileReplacementPlanWorkItems({
          task: completed,
          proposal: proposal([mutate(definition)]),
        }).candidate,
      ).toEqual({
        id: "candidate",
        state: "PLANNED",
        revision: 1,
        attempt: 0,
        claim_id: null,
        output_manifests: [],
        validation_result: null,
        last_failure: null,
      });
    },
  );

  it("resets runtime when the replacement changes WorkItem identity", () => {
    const definition = item({ id: "candidate" });
    const original = approvedTask([definition]);

    expect(
      reconcileReplacementPlanWorkItems({
        task: original,
        proposal: proposal([{ ...definition, id: "replacement" }]),
      }).replacement,
    ).toMatchObject({ id: "replacement", state: "PLANNED", attempt: 0 });
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
