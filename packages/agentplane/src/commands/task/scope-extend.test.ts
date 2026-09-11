import { describe, expect, it, vi } from "vitest";
import * as fs from "node:fs/promises";
import * as git from "@agentplaneorg/core/git";
import { resolveRecordedImplementationRecovery } from "./external-agent-implementation-recovery.js";

vi.mock("node:fs/promises", { spy: true });
vi.mock("@agentplaneorg/core/git", { spy: true });

import type { TaskData } from "../../backends/task-backend.js";
import { parseCommandArgv } from "../../cli/spec/parse.js";
import {
  approveTaskPlan,
  createLegacyTaskAggregate,
  createExecutionGrant,
  createPlanProposal,
  createRepositorySnapshot,
  createTaskPlanRevision,
  executionGrantDigest,
  isExecutionGrantActive,
  materializeApprovedWorkItems,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  withTaskCentricAggregate,
  type TaskPlanProposal,
  type ValidationPlan,
  type WorkItem,
} from "@agentplaneorg/core/tasks";
import { makeTaskCommandContext, makeTaskFixture } from "@agentplane/testkit/task";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import {
  applyApprovedTaskScopeExtension,
  createTaskScopeExtensionRequestState,
  normalizeTaskScopeRoot,
  requiresImplementationReworkReopen,
  recoverAppliedTaskScopeExtension,
  scopeExtensionReceiptForState,
  TASK_SCOPE_EXTENSION_REQUEST_KEY,
} from "../shared/task-scope-extension-request.js";

import {
  extendBlockedTaskExecutionContract,
  taskWithRebasedExecutionGrant,
} from "./scope-extend.js";
import { taskScopeExtendSpec } from "./scope-extend.command.js";
import { buildTaskStatusTransition } from "./shared/workflow-transition-service.js";
import { projectTaskCentricCompatibilityMutation } from "../../adapters/task-backend/task-centric-backend-projection.js";

const REQUEST_DIGEST = `sha256:${"1".repeat(64)}`;
const STATE_SCOPE_DIGEST = `sha256:${"2".repeat(64)}`;
const STATE_FINGERPRINT = `sha256:${"3".repeat(64)}`;

describe("task scope extend command parsing", () => {
  it.each(
    [
      { option: "--state-scope-digest", value: STATE_SCOPE_DIGEST, key: "stateScopeDigest" },
      { option: "--state-fingerprint", value: STATE_FINGERPRINT, key: "stateFingerprint" },
    ].flatMap((binding) => [false, true].map((padded) => ({ ...binding, padded }))),
  )(
    "preserves scalar $option after normalization (padded=$padded)",
    ({ option, value, key, padded }) => {
      expect(
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          padded ? `  ${value}  ` : value,
          "--by",
          "USER",
        ]),
      ).toMatchObject({
        parsed: {
          taskId: "T-1",
          scopeRoots: ["packages/agentplane"],
          requestDigest: REQUEST_DIGEST,
          by: "USER",
          [key]: value,
        },
      });
    },
  );

  it("continues to reject a missing state binding", () => {
    const base = [
      "T-1",
      "--scope-root",
      "packages/agentplane",
      "--request-digest",
      REQUEST_DIGEST,
      "--by",
      "USER",
    ];

    expect(() => parseCommandArgv(taskScopeExtendSpec, base)).toThrow(
      "One of --state-scope-digest or --state-fingerprint is required.",
    );
  });

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "treats whitespace-only %s as missing",
    (option) => {
      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          "   ",
          "--by",
          "USER",
        ]),
      ).toThrow("One of --state-scope-digest or --state-fingerprint is required.");
    },
  );

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "continues to reject malformed %s",
    (option) => {
      const base = [
        "T-1",
        "--scope-root",
        "packages/agentplane",
        "--request-digest",
        REQUEST_DIGEST,
        "--by",
        "USER",
      ];

      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [...base, option, "sha256:not-a-digest"]),
      ).toThrow(`${option} must be an exact sha256:<64 lowercase hex> digest.`);
    },
  );
});

const NOW = "2026-08-18T01:00:00.000Z";

function taskCentricAggregate(taskId: string, parallel = false, optionalLater = false) {
  const validation: ValidationPlan = {
    schema_version: 1,
    criteria: [
      {
        id: "criterion-scope",
        description: "Validate the scoped WorkItem.",
        required: true,
        check_ids: ["check-scope"],
      },
    ],
    checks: [
      {
        id: "check-scope",
        kind: "deterministic",
        required: true,
        capability: "task.verify",
        command: "bun test scope",
      },
    ],
    evidence_fingerprint: taskCentricDigest("scope-extension-test"),
  };
  const item = (
    id: string,
    dependsOn: string[],
    scopeRoot: string,
    optional = false,
  ): WorkItem => ({
    id,
    objective: `Implement ${id}`,
    depends_on: dependsOn,
    required_inputs: dependsOn.length > 0 ? ["output-active"] : [],
    expected_outputs: [`output-${id}`],
    scope_roots: [scopeRoot],
    acceptance_criteria: validation.criteria,
    validation,
    context: {
      required_sources: ["repository"],
      optional_sources: [],
      symbol_hints: [],
      max_bytes: 16_384,
    },
    risk: "low",
    capabilities: ["task.verify"],
    resource_claims: [{ kind: "path", resource: scopeRoot, mode: "write" }],
    optional,
    priority: id === "active" ? 2 : 1,
  });
  const proposal: TaskPlanProposal = {
    schema_version: 1,
    task_id: taskId,
    planning_baseline: createRepositorySnapshot({
      git: { kind: "commit", sha: "a".repeat(40), ref: "refs/heads/main" },
      dirty_paths: [],
      policy_digest: null,
      config_digest: null,
      context_digest: null,
      task_history_cursor: "task-revision:1",
      captured_at: NOW,
    }),
    work_items: {
      schema_version: 1,
      work_items: [
        item("active", [], "docs/releases"),
        item("later", parallel ? [] : ["active"], "src/later.ts", optionalLater),
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
  const draft = createTaskPlanRevision({ proposal, revision: 1, created_at: NOW });
  const approved = approveTaskPlan({
    plan: draft,
    expected_digest: draft.digest,
    actor: "USER",
    approved_at: NOW,
  });
  return materializeApprovedWorkItems({
    task: createLegacyTaskAggregate({
      id: taskId,
      revision: 1,
      title: "Scope extension",
      description: "Exercise one task-centric scope extension.",
      status: "TODO",
      acceptance_criteria: ["Extend the selected WorkItem."],
      captured_at: NOW,
      updated_at: NOW,
    }),
    plan: approved,
    now: NOW,
  });
}

function fixture(
  overrides: Partial<TaskData> = {},
  request?: {
    scope_roots: string[];
    repository_effects: ("documentation" | "release_metadata")[];
  },
) {
  const requested = request ?? {
    scope_roots: ["website"],
    repository_effects: ["release_metadata" as const],
  };
  const command = makeTaskCommandContext({
    configureConfig: (config) => {
      config.workflow_mode = "branch_pr";
    },
  });
  const executionContract = resolveTaskExecutionContract({
    config: command.config,
    task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
    requestedMode: "branch_pr",
    declaration: {
      schema_version: 2,
      preferred_mode: "branch_pr",
      scope_roots: ["docs/releases"],
      repository_effects: ["documentation"],
      external_effects: [],
      requirements_uncertainty: "bounded",
      implementation_uncertainty: "bounded",
      reversibility: "reversible",
      rationale: ["release documentation"],
    },
  });
  executionContract.observed.changed_paths = ["docs/releases/v0.7.7.md"];
  const pending = createTaskScopeExtensionRequestState({
    request: {
      schema_version: 1,
      ...requested,
      rationale: "The required generated asset is outside the current scope.",
    },
    transition_id: "tr_11111111111111111111111111111111",
    state_fingerprint: `sha256:${"a".repeat(64)}`,
  });
  const task = makeTaskFixture({
    id: "202608181404-SCOPE1",
    status: "BLOCKED",
    execution_contract: executionContract,
    execution_route: {
      requested_mode: "branch_pr",
      selected_mode: "branch_pr",
      repository_mode: "branch_pr",
      reason_codes: [...executionContract.reason_codes],
    },
    comments: [
      {
        author: "SUPERVISOR",
        body: scopeExtensionReceiptForState(pending),
      },
    ],
    extensions: { [TASK_SCOPE_EXTENSION_REQUEST_KEY]: pending },
    ...overrides,
  });
  return { command, pending, task };
}

describe("blocked task execution scope extension", () => {
  it.each(["valid", "digest", "receipt", "scope", "approval", "verification", "task", "plan"])(
    "recovers only an applied scope receipt without relaxing generic revision checks (%s)",
    async (variant) => {
      const { command, pending, task } = fixture();
      const aggregate = taskCentricAggregate(task.id);
      task.revision = aggregate.revision;
      task.extensions = withTaskCentricAggregate(task.extensions, {
        ...aggregate,
        lifecycle: "BLOCKED",
      });
      const executionContract = extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: pending.request.scope_roots,
        repository_effects: pending.request.repository_effects,
        request_digest: pending.request_digest,
        by: "USER",
      });
      const updated = applyApprovedTaskScopeExtension({
        task,
        executionContract,
        pending,
        scopeRoots: pending.request.scope_roots,
        repositoryEffects: pending.request.repository_effects,
        by: "USER",
        now: NOW,
      });
      const nextAggregate = taskCentricAggregateFromExtensions(updated.extensions)!;
      const split: TaskData = {
        ...updated,
        revision: nextAggregate.revision + 1,
        extensions: withTaskCentricAggregate(updated.extensions, {
          ...nextAggregate,
          lifecycle: "BLOCKED",
        }),
      };
      if (variant === "digest")
        split.extensions![TASK_SCOPE_EXTENSION_REQUEST_KEY] = {
          ...(split.extensions![TASK_SCOPE_EXTENSION_REQUEST_KEY] as object),
          request_digest: "sha256:" + "0".repeat(64),
        };
      if (variant === "receipt") split.comments = [];
      if (variant === "scope") split.execution_contract = undefined;
      if (variant === "approval")
        split.extensions![TASK_SCOPE_EXTENSION_REQUEST_KEY] = {
          ...(split.extensions![TASK_SCOPE_EXTENSION_REQUEST_KEY] as object),
          applied_by: "CODER",
        };
      if (variant === "verification") split.verification = { ...split.verification!, state: "ok" };
      if (variant === "task") split.id = "OTHER";
      if (variant === "plan")
        split.extensions = withTaskCentricAggregate(split.extensions, {
          ...nextAggregate,
          lifecycle: "BLOCKED",
          current_plan: { ...nextAggregate.current_plan!, digest: taskCentricDigest("different") },
        });
      const before = structuredClone(split);
      expect(() =>
        projectTaskCentricCompatibilityMutation({
          current: split,
          next: { ...split, description: "unrelated" },
        }),
      ).toThrow(/revision mismatch/u);
      const recovered = recoverAppliedTaskScopeExtension(split);
      if (variant === "valid") {
        expect(recovered?.revision).toBe(split.revision);
        expect(recovered?.lifecycle).toBe("ACTIVE");
        expect(recovered?.work_items).toEqual(nextAggregate.work_items);
        expect(recovered?.current_plan).toEqual(nextAggregate.current_plan);
        const next = projectTaskCentricCompatibilityMutation({
          current: split,
          next: { ...split, extensions: withTaskCentricAggregate(split.extensions, recovered!) },
        });
        expect(next.revision).toBe(split.revision! + 1);
        expect(taskCentricAggregateFromExtensions(next.extensions)?.revision).toBe(next.revision);
        expect(recoverAppliedTaskScopeExtension(next)).toBeNull();
      } else {
        expect(recovered).toBeNull();
      }
      expect(split).toEqual(before);
      const completed = structuredClone(split);
      completed.plan_approval = { state: "approved", updated_at: NOW, updated_by: "USER" };
      const runtime = taskCentricAggregateFromExtensions(completed.extensions)!;
      for (const item of Object.values(runtime.work_items)) item.state = "COMPLETED";
      const commit = "b".repeat(40);
      const read = vi.spyOn(fs, "readFile").mockResolvedValue(
        JSON.stringify({
          kind: "direct_task_implementation_evidence",
          task_id: completed.id,
          implementation_commit: commit,
          execution_base_commit: "a".repeat(40),
        }),
      );
      const ancestry = vi.spyOn(git, "gitIsAncestor").mockResolvedValue(false);
      try {
        expect(
          await resolveRecordedImplementationRecovery({
            command,
            task: completed,
            work_order: { task: { work_item_id: null } } as never,
            head: commit,
            recorded_commit: null,
            purpose: "implementation",
          }),
        ).toBeNull();
        // A proven historical split reaches Git proof, but never bypasses it.
        expect(ancestry).toHaveBeenCalledTimes(variant === "valid" ? 1 : 0);
      } finally {
        read.mockRestore();
        ancestry.mockRestore();
      }
    },
  );

  it.each([
    "valid",
    "revision",
    "task",
    "repository",
    "plan",
    "scope",
    "receipt",
    "started",
    "approval",
  ])("recovers only an untouched, receipt-bound split first approval (%s)", (variant) => {
    const { task } = fixture({
      status: "TODO",
      revision: 3,
      sections: { Plan: "Scoped implementation" },
      commit: null,
    });
    const aggregate = taskCentricAggregate(task.id);
    const repository = "sha256:" + "a".repeat(64);
    const grant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: task.id,
        task_revision: 2,
        plan: task.sections!.Plan!,
        execution_contract: task.execution_contract,
        repository_identity: repository,
      }),
      execution_contract: task.execution_contract,
      actor: "USER",
      approval_kind: "manual_operator",
      issued_at: NOW,
    });
    task.plan_approval = { state: "approved", updated_at: NOW, updated_by: "USER", note: null };
    task.extensions = {
      ...withTaskCentricAggregate({}, aggregate),
      "agentplane.execution_grant": grant,
      task_execution_context: { repository_identity: repository },
    };
    if (variant === "revision") task.revision = 4;
    if (variant === "task") task.id = "OTHER";
    if (variant === "repository")
      task.extensions.task_execution_context = { repository_identity: "sha256:" + "b".repeat(64) };
    if (variant === "plan") task.sections = { Plan: "Changed plan" };
    if (variant === "scope") task.execution_contract = undefined;
    if (variant === "receipt")
      task.extensions["agentplane.execution_grant"] = {
        ...grant,
        digest: "sha256:" + "0".repeat(64),
      };
    if (variant === "started")
      task.extensions = withTaskCentricAggregate(task.extensions, {
        ...aggregate,
        work_items: {
          ...aggregate.work_items,
          active: { ...aggregate.work_items.active!, attempt: 1 },
        },
      });
    if (variant === "approval") task.plan_approval.updated_by = "OTHER";
    const before = structuredClone(task);
    const transition = buildTaskStatusTransition({
      task,
      at: NOW,
      toStatus: "DOING",
      eventAuthor: "CODER",
      updatedBy: "CODER",
    });
    const persist = () =>
      projectTaskCentricCompatibilityMutation({ current: task, next: transition.nextTask });
    if (variant === "valid") {
      const next = persist();
      expect(next.status).toBe("DOING");
      expect(next.revision).toBe(4);
      const canonical = taskCentricAggregateFromExtensions(next.extensions)!;
      expect(canonical.revision).toBe(4);
      expect(canonical.current_plan).toEqual(aggregate.current_plan);
      expect(canonical.work_items).toEqual(aggregate.work_items);
      expect(next.extensions?.["agentplane.execution_grant"]).toEqual(grant);
      expect(projectTaskCentricCompatibilityMutation({ current: next, next })).toEqual(next);
    } else {
      expect(persist).toThrow(/revision mismatch/u);
    }
    expect(task).toEqual(before);
  });

  it.each([
    ["implementation_rework", "DONE", null, false, true],
    ["implementation_rework", "DOING", null, false, false],
    ["implementation", "DONE", "required-work", true, true],
    ["implementation", "DONE", null, false, false],
    ["implementation", "DOING", "required-work", true, false],
    ["implementation", "DONE", "optional-work", false, false],
  ])(
    "reopen authority: purpose=%s status=%s item=%s required=%s",
    (purpose, taskStatus, workItemId, workItemIsRequired, expected) => {
      expect(
        requiresImplementationReworkReopen({
          purpose,
          task_status: taskStatus,
          work_item_id: workItemId,
          work_item_is_required: workItemIsRequired,
        }),
      ).toBe(expected);
    },
  );

  it.each([false, true])(
    "preserves the completed required plan (optional remaining=%s)",
    (optionalRemaining) => {
      const { command, pending, task } = fixture();
      const aggregate = taskCentricAggregate(task.id, optionalRemaining, optionalRemaining);
      const completed = {
        ...aggregate,
        lifecycle: "BLOCKED" as const,
        work_items: Object.fromEntries(
          Object.entries(aggregate.work_items).map(([id, item]) => [
            id,
            optionalRemaining && id !== "active" ? item : { ...item, state: "COMPLETED" as const },
          ]),
        ),
      };
      task.extensions = {
        ...withTaskCentricAggregate(task.extensions, completed),
        [TASK_SCOPE_EXTENSION_REQUEST_KEY]: pending,
      };
      const executionContract = extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: ["website"],
        repository_effects: ["release_metadata"],
        request_digest: pending.request_digest,
        by: "USER",
      });

      const updated = applyApprovedTaskScopeExtension({
        task,
        executionContract,
        pending,
        scopeRoots: ["website"],
        repositoryEffects: ["release_metadata"],
        by: "USER",
        now: NOW,
      });
      const next = taskCentricAggregateFromExtensions(updated.extensions);

      expect(next?.current_plan).toEqual(completed.current_plan);
      expect(next?.work_items).toEqual(completed.work_items);
      expect(next?.lifecycle).toBe("ACTIVE");
      expect(next?.revision).toBe(completed.revision + 1);
      expect(updated.revision).toBe(next?.revision);
      expect(updated.execution_contract).toEqual(executionContract);
      expect(updated.status).toBe("DOING");
      expect(updated.extensions?.[TASK_SCOPE_EXTENSION_REQUEST_KEY]).toMatchObject({
        status: "applied",
        applied_by: "USER",
      });
    },
  );

  it("fails closed when unfinished required WorkItems are not schedulable", () => {
    const { command, pending, task } = fixture();
    const aggregate = taskCentricAggregate(task.id);
    const effectInDoubt = {
      ...aggregate,
      work_items: {
        ...aggregate.work_items,
        active: {
          ...aggregate.work_items.active!,
          state: "EFFECT_IN_DOUBT" as const,
        },
      },
    };
    task.extensions = {
      ...withTaskCentricAggregate(task.extensions, effectInDoubt),
      [TASK_SCOPE_EXTENSION_REQUEST_KEY]: pending,
    };
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    expect(() =>
      applyApprovedTaskScopeExtension({
        task,
        executionContract,
        pending,
        scopeRoots: ["website"],
        repositoryEffects: ["release_metadata"],
        by: "USER",
        now: NOW,
      }),
    ).toThrow("unless every required WorkItem is completed");
  });

  it("fails closed when more than one task-centric WorkItem is schedulable", () => {
    const { command, pending, task } = fixture();
    task.extensions = {
      ...withTaskCentricAggregate(task.extensions, taskCentricAggregate(task.id, true)),
      [TASK_SCOPE_EXTENSION_REQUEST_KEY]: pending,
    };
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    expect(() =>
      applyApprovedTaskScopeExtension({
        task,
        executionContract,
        pending,
        scopeRoots: ["website"],
        repositoryEffects: ["release_metadata"],
        by: "USER",
        now: NOW,
      }),
    ).toThrow("exactly one schedulable WorkItem");
  });

  it("creates an approved plan revision for only the selected task-centric WorkItem", () => {
    const { command, pending, task } = fixture();
    const aggregate = taskCentricAggregate(task.id);
    task.extensions = {
      ...withTaskCentricAggregate(task.extensions, aggregate),
      [TASK_SCOPE_EXTENSION_REQUEST_KEY]: pending,
    };
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    const updated = applyApprovedTaskScopeExtension({
      task,
      executionContract,
      pending,
      scopeRoots: ["website"],
      repositoryEffects: ["release_metadata"],
      by: "USER",
      now: NOW,
    });
    const next = taskCentricAggregateFromExtensions(updated.extensions);

    expect(next?.current_plan).toMatchObject({
      revision: 2,
      approval: {
        state: "approved",
        approved_by: "USER",
        policy_facts: [`state_bound_scope_extension:${pending.request_digest}`],
      },
    });
    expect(next?.current_plan?.digest).not.toBe(aggregate.current_plan?.digest);
    expect(next?.revision).toBe(aggregate.revision + 1);
    expect(next?.event_cursor).toBe(aggregate.event_cursor + 1);
    const nextItems = next?.current_plan?.proposal.work_items.work_items;
    expect(nextItems?.map((item) => ({ id: item.id, scope_roots: item.scope_roots }))).toEqual([
      { id: "active", scope_roots: ["docs/releases", "website"] },
      { id: "later", scope_roots: ["src/later.ts"] },
    ]);
    expect(nextItems?.[0]?.resource_claims).toContainEqual({
      kind: "path",
      resource: "website",
      mode: "write",
    });
    expect(nextItems?.[1]).toEqual(aggregate.current_plan?.proposal.work_items.work_items[1]);
    expect(next?.plan_history).toEqual([aggregate.current_plan]);
    expect(next?.work_items).toEqual(aggregate.work_items);
  });

  it("adds repository authority monotonically and preserves observations", () => {
    const { command, pending, task } = fixture();

    const extended = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    expect(extended.declaration.scope_roots).toEqual(["docs/releases", "website"]);
    expect(extended.declaration.repository_effects).toEqual(["documentation", "release_metadata"]);
    expect(extended.observed.changed_paths).toEqual(["docs/releases/v0.7.7.md"]);
    expect(extended.authority.allowed_repository_effects).toContain("release_metadata");
    expect(extended.declaration.rationale).toContain(
      "USER-approved blocked-result scope extension: roots=website; repository_effects=release_metadata",
    );
  });

  it("preserves evaluator rework evidence while invalidating verification", () => {
    const qualityReview = {
      state: "rework" as const,
      updated_at: "2026-08-18T00:00:00.000Z",
      updated_by: "EVALUATOR",
      note: "The evaluator requested scoped rework.",
      evaluated_sha: "reviewed-head",
      blueprint_digest: "sha256:reviewed-blueprint",
      evidence_refs: ["quality/report.json"],
      findings: ["Generated asset is outside the issued writable roots."],
    };
    const { command, pending, task } = fixture({ quality_review: qualityReview });
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    const updated = applyApprovedTaskScopeExtension({
      task,
      executionContract,
      pending,
      scopeRoots: ["website"],
      repositoryEffects: ["release_metadata"],
      by: "USER",
      now: "2026-08-18T01:00:00.000Z",
    });

    expect(updated.quality_review).toEqual(qualityReview);
    expect(updated.verification).toMatchObject({
      state: "pending",
      note: "Invalidated by USER-approved execution scope extension.",
    });
  });

  it("persists a provenance-preserving active grant for an in-grant extension", () => {
    const { command, pending, task } = fixture();
    task.execution_contract!.authority.allowed_repository_effects.push("release_metadata");
    task.execution_contract!.verification.required_evidence = [
      ...new Set([
        ...task.execution_contract!.verification.required_evidence,
        "repository_effect:release_metadata",
        "repository_effect:repository_write",
      ]),
    ].toSorted();
    const repositoryIdentity = `sha256:${"f".repeat(64)}`;
    const grant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: task.id,
        task_revision: task.revision ?? 1,
        plan: task.sections?.Plan ?? "",
        execution_contract: task.execution_contract,
        repository_identity: repositoryIdentity,
      }),
      execution_contract: task.execution_contract,
      actor: "HOST:codex:USER",
      approval_kind: "host_user_decision",
      approval_evidence_digest: `sha256:${"a".repeat(64)}`,
      issued_at: "2026-08-18T00:00:00.000Z",
    });
    task.extensions = {
      ...(task.extensions ?? {}),
      "agentplane.execution_grant": grant,
    };
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });
    expect(executionContract.verification.required_evidence).toEqual(
      task.execution_contract!.verification.required_evidence,
    );

    const updated = taskWithRebasedExecutionGrant({
      task,
      execution_contract: executionContract,
      repository_identity: repositoryIdentity,
    });
    const rebased = updated.extensions?.["agentplane.execution_grant"];

    expect(rebased).toMatchObject({
      grant_id: grant.grant_id,
      actor: grant.actor,
      approval_kind: grant.approval_kind,
      approval_evidence_digest: grant.approval_evidence_digest,
      capabilities: grant.capabilities,
      issued_at: grant.issued_at,
    });
    expect(
      isExecutionGrantActive({
        grant: rebased as typeof grant,
        task_id: task.id,
        plan: task.sections?.Plan ?? "",
        execution_contract: executionContract,
        repository_identity: repositoryIdentity,
      }),
    ).toBe(true);
  });

  it("persists material extensions after invalidating the old completion-bound grant", () => {
    const { command, pending, task } = fixture();
    const repositoryIdentity = `sha256:${"f".repeat(64)}`;
    const grant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: task.id,
        task_revision: task.revision ?? 1,
        plan: task.sections?.Plan ?? "",
        execution_contract: task.execution_contract,
        repository_identity: repositoryIdentity,
      }),
      execution_contract: task.execution_contract,
      actor: "USER",
      approval_kind: "manual_operator",
      issued_at: "2026-08-18T00:00:00.000Z",
    });
    task.extensions = {
      ...(task.extensions ?? {}),
      "agentplane.execution_grant": grant,
    };
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    const withoutStaleGrant = taskWithRebasedExecutionGrant({
      task,
      execution_contract: executionContract,
      repository_identity: repositoryIdentity,
    });
    const updated = applyApprovedTaskScopeExtension({
      task: withoutStaleGrant,
      executionContract,
      pending,
      scopeRoots: ["website"],
      repositoryEffects: ["release_metadata"],
      by: "USER",
      now: "2026-08-18T01:00:00.000Z",
    });

    expect(updated.execution_contract).toEqual(executionContract);
    expect(updated.extensions?.["agentplane.execution_grant"]).toBeUndefined();
  });

  it("migrates and rebases a legacy execution grant during an in-grant extension", () => {
    const { command, pending, task } = fixture();
    task.execution_contract!.authority.allowed_repository_effects.push("release_metadata");
    task.execution_contract!.verification.required_evidence = [
      ...new Set([
        ...task.execution_contract!.verification.required_evidence,
        "repository_effect:release_metadata",
        "repository_effect:repository_write",
      ]),
    ].toSorted();
    const repositoryIdentity = `sha256:${"f".repeat(64)}`;
    const current = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: task.id,
        task_revision: task.revision ?? 1,
        plan: task.sections?.Plan ?? "",
        execution_contract: task.execution_contract,
        repository_identity: repositoryIdentity,
      }),
      execution_contract: task.execution_contract,
      actor: "HOST:codex:USER",
      approval_kind: "host_user_decision",
      approval_evidence_digest: `sha256:${"a".repeat(64)}`,
      issued_at: "2026-08-18T00:00:00.000Z",
    });
    const {
      digest: _digest,
      repository_identity: _repositoryIdentity,
      completion_contract_digest: _completionContractDigest,
      ...legacyUnsigned
    } = current;
    task.extensions = {
      ...(task.extensions ?? {}),
      "agentplane.execution_grant": {
        ...legacyUnsigned,
        digest: executionGrantDigest(legacyUnsigned),
      },
    };
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    const updated = taskWithRebasedExecutionGrant({
      task,
      execution_contract: executionContract,
      repository_identity: repositoryIdentity,
    });
    const rebased = updated.extensions?.["agentplane.execution_grant"];

    expect(rebased).toMatchObject({
      grant_id: current.grant_id,
      repository_identity: repositoryIdentity,
      completion_contract_digest: current.completion_contract_digest,
    });
    expect(
      isExecutionGrantActive({
        grant: rebased as typeof current,
        task_id: task.id,
        plan: task.sections?.Plan ?? "",
        execution_contract: executionContract,
        repository_identity: repositoryIdentity,
      }),
    ).toBe(true);
  });

  it("requires a BLOCKED task, blocker receipt, and explicit USER authority", () => {
    const { command, pending, task } = fixture();
    const cases: { task: TaskData; by: string; message: RegExp }[] = [
      { task: { ...task, status: "DOING" }, by: "USER", message: /only after a recorded BLOCKED/u },
      { task: { ...task, comments: [] }, by: "USER", message: /blocker receipt/u },
      { task, by: "SUPERVISOR", message: /explicit --by USER/u },
    ];

    for (const testCase of cases) {
      expect(() =>
        extendBlockedTaskExecutionContract({
          command,
          task: testCase.task,
          scope_roots: ["website"],
          repository_effects: [],
          request_digest: pending.request_digest,
          by: testCase.by,
        }),
      ).toThrow(testCase.message);
    }
  });

  it("rejects unsafe roots and no-op extensions", () => {
    const { command, pending, task } = fixture();

    expect(() => normalizeTaskScopeRoot("../outside")).toThrow(/Invalid scope root/u);
    expect(() =>
      extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: ["website"],
        repository_effects: ["release_metadata"],
        request_digest: `sha256:${"f".repeat(64)}`,
        by: "USER",
      }),
    ).toThrow(/request digest does not match/u);
    expect(() =>
      extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: ["website-other"],
        repository_effects: ["release_metadata"],
        request_digest: pending.request_digest,
        by: "USER",
      }),
    ).toThrow(/exactly match/u);

    const noOp = fixture(
      {},
      { scope_roots: ["docs/releases"], repository_effects: ["documentation"] },
    );
    expect(() =>
      extendBlockedTaskExecutionContract({
        command: noOp.command,
        task: noOp.task,
        scope_roots: ["docs/releases"],
        repository_effects: ["documentation"],
        request_digest: noOp.pending.request_digest,
        by: "USER",
      }),
    ).toThrow(/must add a new scope root or repository effect/u);
  });
});
