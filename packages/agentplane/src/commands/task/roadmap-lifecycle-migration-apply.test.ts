import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  AGENT_WORK_ORDER_V2_VALID_FIXTURE,
  buildAgentSemanticResultV2ValidFixtures,
  buildStateFingerprint,
  validateAgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import {
  parseTaskReadme,
  renderTaskReadme,
  TASK_CENTRIC_EXTENSION_KEY,
  taskKernel as k,
  type TaskAggregate,
} from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it } from "vitest";

import { taskBytesDigest } from "../../backends/task-backend/local-task-byte-store.js";
import type { TaskByteSnapshot, TaskByteStore } from "../../ports/task-byte-store.js";
import { tryAcquireSupervisorExecutionLease } from "../shared/supervisor-execution-episode.js";
import {
  applyLifecycleOwnerMigration,
  LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION,
  LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION,
  type BoundLifecycleOwnerMigrationAssessment,
  type LifecycleOwnerMigrationApplyRequest,
  type LifecycleOwnerMigrationFreshBinding,
} from "./migration-apply.js";
import { classifyKernelCutover, requireKernelIssuanceEligibility } from "./kernel-cutover.js";
import { previewLifecycleOwnerMigration } from "./migration-preview.js";

const identity = k.kernelDigest("repository");
const assessmentFingerprint = buildStateFingerprint({
  task_id: "task-1",
  task_revision: 4,
  git_head: "a".repeat(40),
  worktree: "/fixture",
  components: {
    task: { state: "present", source: "fixture", value: { revision: 4 } },
    git: { state: "present", source: "fixture", value: { head: "a".repeat(40) } },
    backend_projection: { state: "present", source: "fixture", value: { revision: 4 } },
    plan: { state: "present", source: "fixture", value: { revision: 2 } },
    policy: { state: "present", source: "fixture", value: { digest: "policy" } },
    capability: { state: "present", source: "fixture", value: { digest: "capability" } },
    knowledge: { state: "present", source: "fixture", value: { digest: "knowledge" } },
    provider: { state: "missing", source: "fixture", reason_code: "not_requested" },
    authority: { state: "present", source: "fixture", value: { role: "CURATOR" } },
  },
});
const binding: LifecycleOwnerMigrationFreshBinding = {
  repository_identity: identity,
  state_fingerprint_digest: assessmentFingerprint.digest,
  policy_digest: k.kernelDigest("policy"),
  authority_digest: k.kernelDigest("authority"),
};
const temporary: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporary.splice(0).map((entry) => rm(entry, { recursive: true, force: true })),
  );
});

class MemoryTaskByteStore implements TaskByteStore {
  readonly backend_identity = "memory-task-v1";
  readonly backups = new Map<string, string>();
  compare_count = 0;

  constructor(private snapshot: TaskByteSnapshot | null) {}

  read(taskId: string): Promise<TaskByteSnapshot | null> {
    return Promise.resolve(
      this.snapshot?.task_id === taskId ? structuredClone(this.snapshot) : null,
    );
  }

  compareAndSwap(expected: TaskByteSnapshot, nextText: string): Promise<boolean> {
    this.compare_count += 1;
    if (this.snapshot?.digest !== expected.digest || this.snapshot.revision !== expected.revision)
      return Promise.resolve(false);
    const parsed = /^revision:\s*(\d+)$/mu.exec(nextText);
    this.snapshot = {
      task_id: expected.task_id,
      text: nextText,
      encoding_valid: true,
      digest: taskBytesDigest(nextText),
      revision: Number(parsed?.[1] ?? expected.revision + 1),
    };
    return Promise.resolve(true);
  }

  backupLocation(source: TaskByteSnapshot): string {
    return `${source.task_id}/migration-${source.digest.slice(7)}.source`;
  }

  backup(source: TaskByteSnapshot): Promise<string> {
    const location = this.backupLocation(source);
    const previous = this.backups.get(location);
    if (previous !== undefined && previous !== source.text) throw new Error("backup_mismatch");
    this.backups.set(location, source.text);
    return Promise.resolve(location);
  }

  readBackup(location: string): Promise<string> {
    const value = this.backups.get(location);
    if (value === undefined) throw new Error("missing_backup");
    return Promise.resolve(value);
  }
}

function legacyBytes(status: "TODO" | "DOING" | "DONE" | "BLOCKED" = "TODO"): Buffer {
  return Buffer.from(
    renderTaskReadme(
      {
        schema_version: 1,
        doc_version: 3,
        id: "task-1",
        title: "Migration fixture",
        description: "Preserve source semantics",
        status,
        priority: "med",
        owner: "CODER",
        tags: [],
        depends_on: [],
        verify: ["Preserve exact source"],
        revision: 1,
        extensions: {},
      },
      "# Exact source\n",
    ),
  );
}

function acceptedTask(state: "COMPLETED" | "EXECUTING" = "COMPLETED"): TaskAggregate {
  const repositoryDigest = k.kernelDigest("legacy-repository");
  const criteria = [
    {
      id: "criterion",
      description: "Keep the accepted report",
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
    evidence_fingerprint: repositoryDigest,
  };
  const workItem = {
    id: "build",
    objective: "Build the accepted report",
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
    resource_claims: [{ kind: "workspace" as const, resource: "task", mode: "exclusive" as const }],
    optional: false,
    priority: 1,
  };
  const proposal = {
    schema_version: 1 as const,
    task_id: "task-1",
    planning_baseline: {
      schema_version: 1 as const,
      digest: repositoryDigest,
      git: { kind: "commit" as const, sha: "a".repeat(40), ref: "refs/heads/task" },
      dirty_paths: [],
      policy_digest: k.kernelDigest("legacy-policy"),
      config_digest: k.kernelDigest("legacy-config"),
      context_digest: k.kernelDigest("legacy-context"),
      task_history_cursor: null,
      captured_at: "2026-09-21T00:00:00.000Z",
    },
    work_items: { schema_version: 1 as const, work_items: [workItem] },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
  const planDigest = k.kernelDigest(proposal);
  return {
    schema_version: 1,
    id: "task-1",
    revision: 4,
    intent: {
      task_id: "task-1",
      request: "Preserve accepted semantic work",
      constraints: ["Do not replay the agent"],
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
        state,
        revision: 5,
        attempt: 2,
        claim_id: state === "EXECUTING" ? "claim-2" : null,
        output_manifests:
          state === "COMPLETED"
            ? [
                {
                  schema_version: 1,
                  id: "report",
                  kind: "report",
                  schema: "text/plain",
                  digest: k.kernelDigest("accepted-report"),
                  producer: {
                    task_id: "task-1",
                    plan_revision: 2,
                    work_item_id: "build",
                    attempt: 2,
                  },
                  repository_snapshot_digest: repositoryDigest,
                  provenance: ["accepted-result"],
                },
              ]
            : [],
        validation_result:
          state === "COMPLETED"
            ? {
                schema_version: 1,
                status: "passed",
                evidence: [
                  {
                    check_id: "check",
                    status: "passed",
                    observed_at: "2026-09-21T00:02:00.000Z",
                    repository_snapshot_digest: repositoryDigest,
                    command_identity: "bun test",
                    exit_code: 0,
                    artifact_refs: ["evidence/check.json"],
                    detail: "passed",
                  },
                ],
                unsatisfied_criteria: [],
                stale_evidence: [],
              }
            : null,
        last_failure: null,
      },
    },
    final_validation: null,
    event_cursor: 7,
    updated_at: "2026-09-21T00:03:00.000Z",
  };
}

function parallelBytes(task: TaskAggregate, pendingEffects: unknown[] = []): Buffer {
  return Buffer.from(
    renderTaskReadme(
      {
        schema_version: 1,
        doc_version: 3,
        id: task.id,
        title: "Parallel fixture",
        description: "Preserve accepted work",
        status: "DOING",
        priority: "med",
        owner: "CODER",
        tags: [],
        depends_on: [],
        verify: ["Keep the accepted report"],
        revision: task.revision,
        extensions: {
          [TASK_CENTRIC_EXTENSION_KEY]: task,
          "agentplane.task_centric_runtime": {
            schema_version: 1,
            events: [],
            leases: [],
            pending_effects: pendingEffects,
            checkpoints: [],
            retry_budgets: [],
            mutation_receipts: {},
          },
        },
      },
      "# Parallel fixture\n",
    ),
  );
}

function storeFor(bytes: Buffer, revision: number): MemoryTaskByteStore {
  return new MemoryTaskByteStore({
    task_id: "task-1",
    text: bytes.toString("utf8"),
    encoding_valid: true,
    digest: taskBytesDigest(bytes),
    revision,
  });
}

async function journalPath(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-lifecycle-migration-"));
  temporary.push(root);
  return path.join(root, "journal.json");
}

function requestFor(
  bytes: Buffer,
  assessment?: BoundLifecycleOwnerMigrationAssessment,
): LifecycleOwnerMigrationApplyRequest {
  const preview = previewLifecycleOwnerMigration(bytes);
  return {
    task_id: preview.task_id,
    source_digest: preview.source_digest,
    mapping_version: preview.mapping_version,
    mapping_digest: k.kernelDigest(preview.mapping),
    binding,
    ...(assessment ? { semantic_assessment: assessment } : {}),
  };
}

function resolvedAssessment(
  bytes: Buffer,
  freshBinding: LifecycleOwnerMigrationFreshBinding = binding,
  fingerprint = assessmentFingerprint,
): BoundLifecycleOwnerMigrationAssessment {
  const preview = previewLifecycleOwnerMigration(bytes);
  const semantic = preview.semantic_assessment;
  if (!semantic) throw new Error("fixture requires semantic assessment");
  const assessment = {
    schema_version: 1 as const,
    kind: "kernel_migration_semantic_assessment_result" as const,
    task_id: preview.task_id,
    mapping_version: preview.mapping_version,
    source_digest: preview.source_digest,
    mapping_digest: semantic.mapping_digest,
    status: "resolved" as const,
    resolutions: semantic.fields.map((field) => ({
      source_path: field.source_path,
      target: field.target,
      decision: "Preserve the exact source field through its bound Kernel contract.",
      evidence_digest: k.kernelDigest(field),
    })),
  };
  const order = structuredClone(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
  order.work_order_id = `migration-assessment-${preview.source_digest.slice(7, 19)}`;
  order.role = "CURATOR";
  order.prepared_evidence = order.prepared_evidence.map((evidence) => ({
    ...evidence,
    role: "CURATOR" as const,
  }));
  order.task = {
    ...order.task,
    id: preview.task_id,
    revision: fingerprint.task_revision ?? preview.source_revision,
    work_item_id: "migration",
  };
  order.state_fingerprint = fingerprint;
  order.canonical_binding = {
    phase: "implementation",
    task_id: preview.task_id,
    repository_identity: freshBinding.repository_identity,
    repository_fingerprint: k.kernelDigest("repository-state"),
    plan_revision: 1,
    plan_digest: k.kernelDigest("migration-plan"),
    work_item_id: "migration",
    attempt: 1,
    claim_id: "migration-assessment",
    contract_digest: k.kernelDigest("migration-contract"),
    authority_digest: freshBinding.authority_digest,
  };
  order.required_inputs = [
    {
      id: "migration-source",
      kind: "source_artifact",
      description: "Exact retained lifecycle source.",
      digest: semantic.source_digest,
      required: true,
    },
    {
      id: "migration-mapping",
      kind: "source_artifact",
      description: "Deterministic lifecycle field mapping.",
      digest: semantic.mapping_digest,
      required: true,
    },
  ];
  order.required_outputs = [
    {
      id: "migration-assessment",
      kind: "semantic_result",
      description: "Bound semantic lifecycle assessment.",
      required: true,
    },
  ];
  const issued = validateAgentWorkOrderV2(order);
  const result = {
    ...buildAgentSemanticResultV2ValidFixtures(issued.work_order_id).completed,
    canonical_binding: issued.canonical_binding,
    canonical_outputs: [
      { id: "migration-assessment", kind: "report" as const, digest: k.kernelDigest(assessment) },
    ],
  };
  return {
    binding: {
      ...freshBinding,
      task_id: preview.task_id,
      source_digest: preview.source_digest,
      mapping_version: preview.mapping_version,
      mapping_digest: semantic.mapping_digest,
    },
    assessment,
    exchange: {
      owner: {
        task_id: issued.task.id,
        work_order_id: issued.work_order_id,
        role: issued.role,
      },
      work_order: issued,
      result,
    },
  };
}

async function apply(opts: {
  store: MemoryTaskByteStore;
  journal: string;
  request: LifecycleOwnerMigrationApplyRequest;
  observe?: () => Promise<LifecycleOwnerMigrationFreshBinding>;
}) {
  return applyLifecycleOwnerMigration({
    store: opts.store,
    repository_identity: identity,
    journal_path: opts.journal,
    request: opts.request,
    observe_binding: opts.observe ?? (() => Promise.resolve(binding)),
  });
}

describe("LC-14 lifecycle-owner migration apply", () => {
  it("uses the shared fence, source CAS, and an idempotent exact mapping without an agent", async () => {
    const bytes = legacyBytes();
    const store = storeFor(bytes, 1);
    const journal = await journalPath();
    const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journal });
    if (!lease) throw new Error("expected fixture lease");

    await expect(apply({ store, journal, request: requestFor(bytes) })).resolves.toEqual({
      kind: "refused",
      reason: "supervisor_execution_active",
    });
    expect(store.compare_count).toBe(0);
    await lease.release();

    const applied = await apply({ store, journal, request: requestFor(bytes) });
    expect(applied).toMatchObject({
      kind: "applied",
      receipt: { semantic_assessment_digest: null, backup_digest: taskBytesDigest(bytes) },
    });
    if (applied.kind !== "applied") throw new Error(JSON.stringify(applied));
    expect(store.compare_count).toBe(1);
    const repeated = await apply({ store, journal, request: requestFor(bytes) });
    expect(repeated).toMatchObject({ kind: "already_applied", receipt: applied.receipt });
    expect(store.compare_count).toBe(1);
  });

  it("preserves accepted outputs without replay and records one fresh bound assessment", async () => {
    const bytes = parallelBytes(acceptedTask());
    const store = storeFor(bytes, 4);
    const assessment = resolvedAssessment(bytes);
    const result = await apply({
      store,
      journal: await journalPath(),
      request: requestFor(bytes, assessment),
    });

    expect(result).toMatchObject({
      kind: "applied",
      receipt: {
        mapping_receipt: previewLifecycleOwnerMigration(bytes).mapping,
        semantic_assessment_digest: k.kernelDigest(assessment.assessment),
        semantic_assessment: assessment.assessment,
      },
    });
    const current = await store.read("task-1");
    const extensions = parseExtensions(current!.text);
    expect(extensions).not.toHaveProperty(TASK_CENTRIC_EXTENSION_KEY);
    expect(extensions).not.toHaveProperty("agentplane.task_centric_runtime");
    expect(extensions[TASK_KERNEL_EXTENSION_KEY]).toMatchObject({
      aggregate: {
        work_items: {
          build: {
            state: "RESULT_RECEIVED",
            attempt: 2,
            validation: null,
            output_manifests: [{ id: "report", digest: k.kernelDigest("accepted-report") }],
          },
        },
      },
    });
    expect(extensions[LIFECYCLE_OWNER_MIGRATION_RECEIPT_EXTENSION]).toMatchObject({
      source_digest: taskBytesDigest(bytes),
      semantic_assessment_digest: k.kernelDigest(assessment.assessment),
    });
    expect([...store.backups.values()]).toEqual([bytes.toString("utf8")]);
  });

  it("rejects policy or state drift after backup and never reaches source CAS", async () => {
    const bytes = legacyBytes();
    const store = storeFor(bytes, 1);
    let observations = 0;
    const result = await apply({
      store,
      journal: await journalPath(),
      request: requestFor(bytes),
      observe: () => {
        observations += 1;
        return Promise.resolve(
          observations === 1
            ? binding
            : { ...binding, policy_digest: k.kernelDigest("changed-policy") },
        );
      },
    });
    expect(result).toEqual({ kind: "refused", reason: "preview_binding_stale" });
    expect(store.compare_count).toBe(0);
  });

  it("quarantines incomplete or stale semantic assessment with an auditable resolution path", async () => {
    const bytes = parallelBytes(acceptedTask());
    const store = storeFor(bytes, 4);
    const assessment = resolvedAssessment(bytes);
    const staleAssessment = {
      ...assessment,
      binding: { ...assessment.binding, policy_digest: k.kernelDigest("stale-policy") },
    };
    const result = await apply({
      store,
      journal: await journalPath(),
      request: requestFor(bytes, staleAssessment),
    });
    expect(result).toMatchObject({
      kind: "quarantined",
      reason: "semantic_assessment_binding_stale",
      persisted: true,
      audit: {
        source_digest: taskBytesDigest(bytes),
        source_bytes_base64: bytes.toString("base64"),
      },
    });
    if (result.kind !== "quarantined") throw new Error(JSON.stringify(result));
    expect(result.audit.supported_resolutions.join("\n")).toContain("fresh preview");
    expect(result.audit.supported_resolutions.join("\n")).toContain("semantic assessment");
    expect(result.audit.supported_resolutions.join("\n")).toContain("Export");
    expect(store.compare_count).toBe(1);
    expect(store.backups.size).toBe(1);
    const quarantined = await store.read("task-1");
    const extensions = parseExtensions(quarantined!.text);
    expect(extensions).toHaveProperty(LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION);
    expect(extensions).not.toHaveProperty(TASK_CENTRIC_EXTENSION_KEY);
    const projected = {
      id: "task-1",
      status: "BLOCKED",
      extensions,
    } as Parameters<typeof classifyKernelCutover>[0];
    expect(classifyKernelCutover(projected)).toEqual({
      kind: "migration_required",
      reason: "lifecycle_migration_quarantined",
    });
    expect(() => requireKernelIssuanceEligibility(projected)).toThrow(/cannot issue new work/u);

    const currentFingerprint = buildStateFingerprint({
      task_id: "task-1",
      task_revision: quarantined!.revision,
      git_head: "a".repeat(40),
      worktree: "/fixture",
      components: {
        task: {
          state: "present",
          source: "fixture",
          value: { revision: quarantined!.revision },
        },
        git: { state: "present", source: "fixture", value: { head: "a".repeat(40) } },
        backend_projection: {
          state: "present",
          source: "fixture",
          value: { revision: quarantined!.revision },
        },
        plan: { state: "present", source: "fixture", value: { revision: 2 } },
        policy: { state: "present", source: "fixture", value: { digest: "policy" } },
        capability: {
          state: "present",
          source: "fixture",
          value: { digest: "capability" },
        },
        knowledge: { state: "present", source: "fixture", value: { digest: "knowledge" } },
        provider: { state: "missing", source: "fixture", reason_code: "not_requested" },
        authority: { state: "present", source: "fixture", value: { role: "CURATOR" } },
      },
    });
    const currentBinding = {
      ...binding,
      state_fingerprint_digest: currentFingerprint.digest,
      authority_digest: k.kernelDigest("fresh-quarantine-authority"),
    };
    const resolved = await apply({
      store,
      journal: await journalPath(),
      request: {
        ...requestFor(bytes, resolvedAssessment(bytes, currentBinding, currentFingerprint)),
        binding: currentBinding,
      },
      observe: () => Promise.resolve(currentBinding),
    });
    expect(resolved).toMatchObject({ kind: "applied" });
    expect(parseExtensions((await store.read("task-1"))!.text)).not.toHaveProperty(
      LIFECYCLE_OWNER_MIGRATION_QUARANTINE_EXTENSION,
    );
  });

  it("rejects an assessment that is not admitted through its issued WorkOrder", async () => {
    const bytes = parallelBytes(acceptedTask());
    const store = storeFor(bytes, 4);
    const assessment = resolvedAssessment(bytes);
    const result = await apply({
      store,
      journal: await journalPath(),
      request: requestFor(bytes, {
        ...assessment,
        exchange: {
          ...assessment.exchange,
          owner: { ...assessment.exchange.owner, work_order_id: "unissued-order" },
        },
      }),
    });
    expect(result).toMatchObject({
      kind: "quarantined",
      reason: "semantic_assessment_unadmitted",
      persisted: true,
    });
    expect(store.compare_count).toBe(1);
  });

  it("refuses to convert pending work or an unresolved effect", async () => {
    const pendingBytes = parallelBytes(acceptedTask("EXECUTING"));
    const pendingStore = storeFor(pendingBytes, 4);
    await expect(
      apply({
        store: pendingStore,
        journal: await journalPath(),
        request: requestFor(pendingBytes, resolvedAssessment(pendingBytes)),
      }),
    ).resolves.toMatchObject({
      kind: "quarantined",
      reason: "legacy_work_not_quiescent",
      audit: { pending: { work_item_ids: ["build"] } },
    });
    const effectBytes = parallelBytes(acceptedTask(), [
      {
        operation_id: "publish-1",
        state: "effect_in_doubt",
        idempotent: false,
        receipt_ref: null,
      },
    ]);
    const effectStore = storeFor(effectBytes, 4);
    await expect(
      apply({
        store: effectStore,
        journal: await journalPath(),
        request: requestFor(effectBytes),
      }),
    ).resolves.toMatchObject({
      kind: "quarantined",
      reason: "formal_blocker",
      audit: { blockers: [{ reason_code: "unresolved_legacy_effect" }] },
    });
    expect(pendingStore.compare_count).toBe(0);
    expect(effectStore.compare_count).toBe(0);
  });
});

const TASK_KERNEL_EXTENSION_KEY = "task_kernel";

function parseExtensions(text: string): Record<string, unknown> {
  return (
    (parseTaskReadme(text).frontmatter.extensions as Record<string, unknown> | undefined) ?? {}
  );
}
