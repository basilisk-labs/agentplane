import { describe, expect, it } from "vitest";

import {
  approveTaskPlan,
  createExecutionGrant,
  createLegacyTaskAggregate,
  createPlanProposal,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  taskCentricDigest,
  withTaskCentricAggregate,
  type TaskPlanProposal,
  type ValidationPlan,
  type WorkItem,
} from "@agentplaneorg/core/tasks";
import { makeTaskCommandContext, makeTaskFixture } from "@agentplane/testkit/task";

import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import {
  createTaskScopeExtensionRequestState,
  scopeExtensionReceiptForState,
  TASK_SCOPE_EXTENSION_REQUEST_KEY,
} from "../shared/task-scope-extension-request.js";
import {
  extendBlockedTaskExecutionContract,
  taskWithRebasedExecutionGrant,
} from "./scope-extend.js";

const NOW = "2026-08-18T01:00:00.000Z";

function approvedAggregate(taskId: string) {
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
    evidence_fingerprint: taskCentricDigest("scope-extension-legacy-compat-test"),
  };
  const active: WorkItem = {
    id: "active",
    objective: "Implement active",
    depends_on: [],
    required_inputs: [],
    expected_outputs: ["output-active"],
    scope_roots: ["docs/releases"],
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
    resource_claims: [{ kind: "path", resource: "docs/releases", mode: "write" }],
    optional: false,
    priority: 1,
  };
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
    work_items: { schema_version: 1, work_items: [active] },
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

function fixture() {
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
  const pending = createTaskScopeExtensionRequestState({
    request: {
      schema_version: 1,
      scope_roots: [],
      repository_effects: ["release_metadata"],
      rationale: "The required effect is outside the legacy contract.",
    },
    transition_id: "tr_11111111111111111111111111111111",
    state_fingerprint: `sha256:${"a".repeat(64)}`,
  });
  pending.work_item_id = "active";
  const task = makeTaskFixture({
    id: "202608181404-SCOPE1",
    status: "BLOCKED",
    execution_contract: executionContract,
    comments: [{ author: "SUPERVISOR", body: scopeExtensionReceiptForState(pending) }],
  });
  task.execution_contract!.declaration.scope_roots = [];
  task.execution_contract!.authority.writable_roots = [];
  task.extensions = {
    ...withTaskCentricAggregate(task.extensions, approvedAggregate(task.id)),
    [TASK_SCOPE_EXTENSION_REQUEST_KEY]: pending,
  };
  return { command, pending, task };
}

describe("legacy blocked task scope extension compatibility", () => {
  it("migrates approved WorkItem roots for an effects-only extension", () => {
    const { command, pending, task } = fixture();
    const extended = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: [],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    expect(extended.declaration.scope_roots).toEqual(["docs/releases"]);
    expect(extended.authority.writable_roots).toEqual(["docs/releases"]);
    expect(extended.declaration.repository_effects).toEqual(["documentation", "release_metadata"]);
    expect(extended.declaration.rationale).toContain(
      "Migrated approved WorkItem scope for a legacy rootless execution contract.",
    );
  });

  it("invalidates a stale grant before applying an effects-only extension", () => {
    const { command, pending, task } = fixture();
    const repositoryIdentity = `sha256:${"f".repeat(64)}`;
    const staleContract = structuredClone(task.execution_contract!);
    staleContract.declaration.scope_roots = ["src/stale"];
    staleContract.authority.writable_roots = ["src/stale"];
    const staleGrant = createExecutionGrant({
      proposal: createPlanProposal({
        task_id: task.id,
        task_revision: task.revision ?? 1,
        plan: task.sections?.Plan ?? "",
        execution_contract: staleContract,
        repository_identity: repositoryIdentity,
      }),
      execution_contract: staleContract,
      actor: "USER",
      approval_kind: "manual_operator",
      issued_at: "2026-08-18T00:00:00.000Z",
    });
    task.extensions = { ...task.extensions, "agentplane.execution_grant": staleGrant };
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: [],
      repository_effects: ["release_metadata"],
      request_digest: pending.request_digest,
      by: "USER",
    });

    const updated = taskWithRebasedExecutionGrant({
      task,
      execution_contract: executionContract,
      repository_identity: repositoryIdentity,
    });

    expect(updated.extensions?.["agentplane.execution_grant"]).toBeUndefined();
  });
});
