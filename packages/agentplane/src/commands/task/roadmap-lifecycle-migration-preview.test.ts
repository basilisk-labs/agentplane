import {
  createLegacyTaskAggregate,
  taskCentricDigest,
  taskKernel as k,
  type TaskAggregate,
  type TaskCentricMigrationRuntime,
} from "@agentplaneorg/core/tasks";
import { describe, expect, it } from "vitest";

import { previewLifecycleOwnerMigration } from "./migration-preview.js";

const digest = (value: unknown) => k.kernelDigest(value);

function runtime(
  overrides: Partial<TaskCentricMigrationRuntime> = {},
): TaskCentricMigrationRuntime {
  return {
    events: [],
    leases: [],
    pending_effects: [],
    checkpoints: [],
    retry_budgets: [],
    mutation_receipts: {},
    ...overrides,
  };
}

function parallelTask(): TaskAggregate {
  const repository = {
    schema_version: 1 as const,
    digest: digest("repository"),
    git: { kind: "commit" as const, sha: "a".repeat(40), ref: "refs/heads/task" },
    dirty_paths: [],
    policy_digest: digest("policy"),
    config_digest: digest("config"),
    context_digest: digest("context"),
    task_history_cursor: null,
    captured_at: "2026-09-21T00:00:00.000Z",
  };
  const criteria = [
    {
      id: "criterion",
      description: "Preserve accepted work",
      required: true,
      check_ids: ["check"],
    },
  ];
  const validation = {
    schema_version: 1 as const,
    criteria,
    checks: [
      {
        id: "check",
        kind: "deterministic" as const,
        required: true,
        capability: "command",
        command: "bun test",
      },
    ],
    evidence_fingerprint: repository.digest,
  };
  const definition = {
    id: "build",
    objective: "Interpret custom deployment semantics",
    depends_on: [],
    required_inputs: [],
    expected_outputs: ["report"],
    scope_roots: ["src"],
    acceptance_criteria: criteria,
    validation,
    context: {
      required_sources: ["src/index.ts"],
      optional_sources: [],
      symbol_hints: [],
      max_bytes: 4096,
    },
    risk: "medium" as const,
    capabilities: ["repository_write"],
    resource_claims: [
      { kind: "exclusive" as const, resource: "workspace", mode: "exclusive" as const },
    ],
    optional: false,
    priority: 10,
  };
  const proposal = {
    schema_version: 1 as const,
    task_id: "task-1",
    planning_baseline: repository,
    work_items: { schema_version: 1 as const, work_items: [definition] },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
  const planDigest = digest(proposal);
  return {
    schema_version: 1,
    id: "task-1",
    revision: 4,
    intent: {
      task_id: "task-1",
      request: "Keep the exact custom deployment behavior",
      constraints: ["Do not infer deployment equivalence from labels"],
      acceptance_criteria: criteria,
      captured_at: "2026-09-21T00:00:00.000Z",
    },
    lifecycle: "ACTIVE",
    current_plan: {
      schema_version: 1,
      task_id: "task-1",
      revision: 2,
      digest: planDigest,
      proposal,
      approval: {
        state: "approved",
        approved_by: "USER",
        approved_at: "2026-09-21T00:01:00.000Z",
        approved_digest: planDigest,
        policy_facts: [],
      },
      created_at: "2026-09-21T00:00:30.000Z",
    },
    plan_history: [],
    plan_amendments: [],
    work_items: {
      build: {
        id: "build",
        state: "COMPLETED",
        revision: 5,
        attempt: 2,
        claim_id: null,
        output_manifests: [
          {
            schema_version: 1,
            id: "report",
            kind: "report",
            schema: "text/plain",
            digest: digest("accepted-report"),
            producer: {
              task_id: "task-1",
              plan_revision: 2,
              work_item_id: "build",
              attempt: 2,
            },
            repository_snapshot_digest: repository.digest,
            provenance: ["result:accepted"],
          },
        ],
        validation_result: {
          schema_version: 1,
          status: "passed",
          evidence: [
            {
              check_id: "check",
              status: "passed",
              observed_at: "2026-09-21T00:02:00.000Z",
              repository_snapshot_digest: repository.digest,
              command_identity: "bun test",
              exit_code: 0,
              artifact_refs: ["evidence/check.json"],
              detail: "passed",
            },
          ],
          unsatisfied_criteria: [],
          stale_evidence: [],
        },
        last_failure: null,
      },
    },
    final_validation: null,
    event_cursor: 7,
    updated_at: "2026-09-21T00:03:00.000Z",
  };
}

describe("LC-13 lifecycle-owner migration preview", () => {
  it("is byte-deterministic, read-only, and needs no agent for an exact legacy mapping", () => {
    const task = createLegacyTaskAggregate({
      id: "task-1",
      revision: 1,
      title: "Legacy task",
      description: "No parallel plan exists",
      status: "TODO",
      acceptance_criteria: ["Create a plan"],
      captured_at: "2026-09-21T00:00:00.000Z",
      updated_at: "2026-09-21T00:00:00.000Z",
    });
    const state = runtime();
    const original = structuredClone({ task, state });
    const input = {
      task_id: "task-1",
      source_revision: 1,
      source_bytes: Buffer.from("exact legacy bytes\r\n", "utf8"),
      task,
      runtime: state,
    };

    const first = previewLifecycleOwnerMigration(input);
    const second = previewLifecycleOwnerMigration(input);

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      status: "ready",
      semantic_assessment: null,
      mapping: { blockers: [], semantic_assessment_fields: [] },
    });
    expect({ task, state }).toEqual(original);
  });

  it("accounts for every source leaf and emits one bytes-bound assessment for real meaning gaps", () => {
    const task = parallelTask();
    const source = Buffer.from("parallel owner source bytes\n", "utf8");
    const preview = previewLifecycleOwnerMigration({
      task_id: task.id,
      source_revision: task.revision,
      source_bytes: source,
      task,
      runtime: runtime(),
    });
    const paths = preview.mapping.field_mappings.map((entry) => entry.source_path);

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).toContain("task.current_plan.proposal.work_items.work_items.0.objective");
    expect(paths).toContain("task.work_items.build.output_manifests.0.digest");
    expect(preview.status).toBe("semantic_assessment_required");
    expect(preview.semantic_assessment).toMatchObject({
      kind: "kernel_migration_semantic_assessment",
      task_id: "task-1",
      mapping_version: preview.mapping.mapping_version,
      source_digest: preview.source_digest,
      source_bytes_base64: source.toString("base64"),
      mapping_digest: digest(preview.mapping),
    });
    expect(preview.mapping.semantic_assessment_fields.length).toBeGreaterThan(0);
    expect(preview.semantic_assessment?.fields).toEqual(preview.mapping.semantic_assessment_fields);
  });

  it("retains accepted outputs and validation identities in the formal projection", () => {
    const task = parallelTask();
    const preview = previewLifecycleOwnerMigration({
      task_id: task.id,
      source_revision: task.revision,
      source_bytes: Buffer.from("accepted source"),
      task,
      runtime: runtime(),
    });
    const item = task.work_items.build!;

    expect(preview.formal_projection.work_items.build).toMatchObject({
      state: "COMPLETED",
      revision: 5,
      attempt: 2,
      output_manifests: [
        {
          id: "report",
          digest: item.output_manifests[0]?.digest,
          repository_fingerprint: item.output_manifests[0]?.repository_snapshot_digest,
        },
      ],
      legacy_validation_digest: taskCentricDigest(item.validation_result),
    });
    expect(preview.mapping.retained).toMatchObject({
      plan_digest: task.current_plan?.digest,
      output_manifest_digests: [item.output_manifests[0]?.digest],
      validation_digests: [taskCentricDigest(item.validation_result)],
    });
  });

  it("exposes pending work and blocks active leases, stale revisions, and unresolved effects", () => {
    const task = { ...parallelTask(), revision: 5 };
    const state = runtime({
      leases: [
        {
          schema_version: 1,
          id: "lease-1",
          authority: {
            task_id: "task-1",
            plan_revision: 2,
            plan_digest: task.current_plan!.digest,
            work_item_id: "build",
            repository_snapshot_digest: digest("repository"),
            workspace: "/tmp/worktree",
            writable_roots: ["src"],
            allowed_operations: ["edit"],
            expires_at: null,
          },
          actor: { id: "agent", transport: "managed", capabilities: ["edit"] },
          resource_claims: [],
          issued_at: "2026-09-21T00:01:00.000Z",
          expires_at: null,
        },
      ],
      pending_effects: [
        {
          operation_id: "publish-1",
          state: "effect_in_doubt",
          idempotent: false,
          receipt_ref: null,
        },
      ],
      checkpoints: [
        {
          schema_version: 1,
          task_id: "task-1",
          task_revision: 4,
          plan_revision: 2,
          event_cursor: 7,
          work_item_states: { build: "EXECUTING" },
          context_refs: [],
          validation_refs: [],
          artifact_refs: ["exchange/result.json"],
          pending_effects: [],
          created_at: "2026-09-21T00:02:00.000Z",
        },
      ],
    });
    const preview = previewLifecycleOwnerMigration({
      task_id: "task-1",
      source_revision: 4,
      source_bytes: Buffer.from("stale source"),
      task,
      runtime: state,
    });

    expect(preview.status).toBe("blocked");
    expect(preview.semantic_assessment).toBeNull();
    expect(preview.mapping.blockers.map((entry) => entry.reason_code)).toEqual([
      "active_legacy_execution_lease",
      "unresolved_legacy_effect",
      "source_revision_mismatch",
    ]);
    expect(preview.mapping.pending).toEqual({
      work_item_ids: [],
      lease_ids: ["lease-1"],
      effect_operation_ids: ["publish-1"],
      checkpoint_revisions: [4],
    });
  });
});
