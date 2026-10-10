import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import {
  readKernelValidation,
  readKernelReview,
  readKernelEffectObservation,
} from "./kernel-observations.js";
import { aggregateFrom, runtimeFrom } from "./task-centric-backend-runtime.js";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { taskKernel } from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LocalBackend, type TaskData } from "../../backends/task-backend.js";
import { KernelBackendAdapter, type KernelCommandInput } from "./kernel-backend-adapter.js";
import { makeKernelRecord, readKernelRecord, TASK_KERNEL_EXTENSION } from "./kernel-record.js";
import { projectKernelTask } from "./kernel-projector.js";
import { kernelRecordIssues } from "./kernel-record-invariants.js";

const taskId = "202608300000-KRN001";
const identity = taskKernel.kernelDigest("fixture-repository");
const fingerprint = taskKernel.kernelDigest("fixture-state");
const paths: string[] = [];
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(paths.splice(0).map((p) => rm(p, { recursive: true, force: true })));
});
function task(): TaskData {
  return {
    id: taskId,
    title: "Canonical adapter contract",
    description: "Fixture task",
    status: "TODO",
    priority: "high",
    owner: "CODER",
    depends_on: [],
    tags: [],
    verify: ["git diff --check"],
  };
}
function input(): KernelCommandInput {
  return {
    command: {
      kind: "capture_intent",
      task_id: taskId,
      expected_task_revision: 0,
      expected_state_fingerprint: fingerprint,
      intent_digest: taskKernel.kernelDigest("fixture-intent"),
    },
    actor: {
      id: "fixture-user",
      kind: "USER",
      transport: "manual",
      capabilities: ["repository_write"],
    },
    authority: {
      digest: taskKernel.kernelDigest("fixture-authority"),
      task_id: taskId,
      plan_revision: 0,
      plan_digest: taskKernel.kernelDigest("no-plan"),
      work_item_id: null,
      repository_identity: identity,
      repository_fingerprint: fingerprint,
      scope_roots: ["."],
      repository_effects: ["repository_write"],
      external_effects: [],
      capabilities: ["repository_write"],
      resources: [],
      validation_requirements: [],
      policy_digests: [],
      completion_requirements: [],
      risk: { requirements: "bounded", implementation: "bounded", reversibility: "reversible" },
      provenance: {
        kind: "USER",
        actor_id: "fixture-user",
        evidence_digest: taskKernel.kernelDigest("fixture-user-decision"),
        parent_authority_digest: null,
      },
      expires_at: null,
    },
    repository_fingerprint: fingerprint,
    occurred_at: "2026-08-30T00:00:00.000Z",
    mutation_id: "capture-1",
  };
}
async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-kernel-backend-"));
  paths.push(root);
  const backend = new LocalBackend({ dir: root });
  return { root, backend, adapter: new KernelBackendAdapter(backend, identity) };
}

function approvedMaterialLineage(state: "ACTIVE" | "COMPLETED"): taskKernel.TaskAggregate {
  const digest = taskKernel.kernelDigest;
  const requirements = {
    scope_roots: ["src"],
    repository_effects: ["repository_write"],
    external_effects: [],
    capabilities: ["repository_write"],
    resources: [],
  };
  const definitions: taskKernel.WorkItemDefinition[] = [1, 2, 3].map((n) => ({
    id: `work-${n}`,
    depends_on: n === 1 ? [] : [`work-${n - 1}`],
    required_inputs: [],
    expected_outputs: [`output-${n}`],
    execution_requirements: requirements,
    optional: false,
  }));
  const plans: taskKernel.PlanRecord[] = [];
  const lineage: taskKernel.CanonicalAuthorityRecord[] = [];
  for (const revision of [1, 2, 3]) {
    const workItems = definitions.slice(0, revision);
    const planDigest = digest({ revision, work_items: workItems });
    const approval =
      revision === 1
        ? digest("initial-user-approval")
        : taskKernel.planScopeExpansionApprovalDigest({
            task_id: taskId,
            current_plan_digest: plans.at(-1)!.digest,
            amended_plan_digest: planDigest,
            actor_id: "USER",
          });
    plans.push({
      revision,
      digest: planDigest,
      state: revision === 3 ? "APPROVED" : "SUPERSEDED",
      approval_actor_id: "USER",
      approval_evidence_digest: approval,
      work_items: workItems,
    });
    const parent = lineage.at(-1)?.authority;
    const contents = {
      ...input().authority!,
      scope_roots: requirements.scope_roots,
      plan_revision: revision,
      plan_digest: planDigest,
      provenance: {
        kind: parent ? ("SYSTEM" as const) : ("USER" as const),
        actor_id: parent ? "kernel" : "USER",
        evidence_digest: parent?.provenance.evidence_digest ?? approval,
        parent_authority_digest: parent?.digest ?? null,
      },
    };
    lineage.push({
      authority: { ...contents, digest: taskKernel.authorityDigest(contents) },
      approval_mode: parent ? null : "manual_operator",
      observation: parent
        ? {
            kind: "plan_amendment",
            evidence_digest: digest(`amend-${revision}`),
            previous_fingerprint: parent.repository_fingerprint,
            changed_paths: [],
            added_scope_roots: [],
          }
        : null,
    });
  }
  const parent = lineage.at(-1)!.authority;
  const continued = {
    ...parent,
    repository_fingerprint: digest("implementation-after-amendments"),
    provenance: { ...parent.provenance, parent_authority_digest: parent.digest },
  };
  lineage.push({
    authority: { ...continued, digest: taskKernel.authorityDigest(continued) },
    approval_mode: null,
    observation: {
      kind: "repository_implementation",
      evidence_digest: digest("implementation-observation"),
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: ["src/repair.ts"],
    },
  });
  const validation = (identity: taskKernel.Sha256Digest): taskKernel.ValidationRecord => ({
    status: "PASSED",
    identity: {
      implementation_identity: identity,
      check_id: "reviewed-tests",
      command_digest: digest("test-command"),
      toolchain_digest: digest("toolchain"),
      environment_digest: digest("environment"),
    },
    evidence_digests: [digest("preserved-review-evidence")],
    observed_at: "2026-10-05T00:00:00.000Z",
  });
  return {
    schema_version: 1,
    id: taskId,
    revision: 20,
    state,
    intent_digest: digest("intent"),
    current_plan: plans[2]!,
    plan_history: plans.slice(0, 2),
    authority_lineage: lineage,
    work_items: Object.fromEntries(
      definitions.map((definition, index) => {
        const result = digest(`result-${definition.id}`);
        return [
          definition.id,
          {
            definition,
            state: "COMPLETED" as const,
            revision: index + 1,
            attempt: 1,
            claim_id: `claim-${definition.id}`,
            result_digest: result,
            output_manifests: [
              {
                id: definition.expected_outputs[0]!,
                kind: "report",
                digest: digest(`output-${definition.id}`),
                task_id: taskId,
                plan_revision: index + 1,
                work_item_id: definition.id,
                attempt: 1,
                repository_fingerprint: fingerprint,
              },
            ],
            validation: validation(result),
          },
        ];
      }),
    ),
    final_validation: state === "COMPLETED" ? validation(continued.repository_fingerprint) : null,
    effects: [],
    mutation_receipts: {},
    controller_transfer: null,
    migration_receipts: [],
  };
}

describe("canonical kernel persistence boundary", () => {
  it.each(["ACTIVE", "COMPLETED"] as const)(
    "roundtrips %s material-amendment lineage without losing completed work or review evidence",
    async (state) => {
      const { backend, adapter } = await fixture();
      const aggregate = approvedMaterialLineage(state);
      const record = makeKernelRecord(identity, aggregate, []);
      const original = structuredClone(record);
      await backend.writeTask({
        ...task(),
        status: projectKernelTask(aggregate).status,
        extensions: { [TASK_KERNEL_EXTENSION]: record },
      });
      const loaded = await adapter.read(taskId);
      expect(loaded.kind).toBe("canonical");
      if (loaded.kind !== "canonical") throw new Error(JSON.stringify(loaded));
      expect(loaded.record).toEqual(original);
      expect(loaded.record.aggregate.plan_history.map((entry) => entry.work_items.length)).toEqual([
        1, 2,
      ]);
      expect(loaded.record.aggregate.work_items["work-1"]).toEqual(aggregate.work_items["work-1"]);
      expect(loaded.record.aggregate.work_items["work-1"]!.output_manifests[0]!.plan_revision).toBe(
        1,
      );
      expect(loaded.record.aggregate.authority_lineage).toHaveLength(4);
      expect(record).toEqual(original);

      // Recompute transport integrity: the reader must reject invalid historical approval itself.
      const tampered = {
        ...aggregate,
        plan_history: aggregate.plan_history.map((plan, index) =>
          index === 1
            ? {
                ...plan,
                approval_evidence_digest: taskKernel.kernelDigest("wrong-history-approval"),
              }
            : plan,
        ),
      };
      const corruptRecord = makeKernelRecord(identity, tampered, []);
      const corruptRead = readKernelRecord(
        { ...loaded.task, extensions: { [TASK_KERNEL_EXTENSION]: corruptRecord } },
        identity,
      );
      expect(corruptRead).toMatchObject({
        kind: "malformed",
        reason: "canonical_invariant_violation",
      });
      if (corruptRead.kind !== "malformed") throw new Error("Expected malformed record");
      expect(corruptRead.fields).toContain("authority_plan");
    },
  );

  it("retains accepted outputs when USER rejection reopens an approved plan", () => {
    const resultDigest = taskKernel.kernelDigest("accepted-result");
    const definition = {
      id: "done",
      depends_on: [],
      required_inputs: [],
      expected_outputs: ["accepted-output"],
      execution_requirements: {
        scope_roots: ["packages/agentplane/src"],
        repository_effects: ["tests"],
        external_effects: [],
        capabilities: ["task.verify"],
        resources: [],
      },
      optional: false,
    };
    const aggregate = {
      schema_version: 1,
      id: taskId,
      revision: 8,
      state: "PLANNING",
      intent_digest: taskKernel.kernelDigest("intent"),
      current_plan: {
        revision: 2,
        digest: taskKernel.kernelDigest({ revision: 2, work_items: [definition] }),
        state: "REJECTED",
        approval_actor_id: "USER",
        approval_evidence_digest: taskKernel.kernelDigest("approval"),
        work_items: [definition],
      },
      plan_history: [],
      work_items: {
        done: {
          definition,
          state: "COMPLETED",
          revision: 7,
          attempt: 1,
          claim_id: taskKernel.kernelDigest("claim"),
          result_digest: resultDigest,
          output_manifests: [
            {
              id: "accepted-output",
              kind: "report",
              digest: taskKernel.kernelDigest("output"),
              task_id: taskId,
              plan_revision: 2,
              work_item_id: "done",
              attempt: 1,
              repository_fingerprint: fingerprint,
            },
          ],
          validation: {
            status: "PASSED",
            identity: {
              implementation_identity: resultDigest,
              check_id: "focused",
              command_digest: taskKernel.kernelDigest("command"),
              toolchain_digest: taskKernel.kernelDigest("toolchain"),
              environment_digest: taskKernel.kernelDigest("environment"),
            },
            evidence_digests: [taskKernel.kernelDigest("evidence")],
            observed_at: "2026-09-21T00:00:00.000Z",
          },
        },
      },
      final_validation: null,
      effects: [],
      mutation_receipts: {},
      controller_transfer: null,
      migration_receipts: [],
    } satisfies taskKernel.TaskAggregate;

    expect(kernelRecordIssues(aggregate, [])).toEqual([]);
  });

  it("creates through the kernel and independently reads atomic aggregate, events and receipts", async () => {
    const { root, adapter } = await fixture();
    const result = await adapter.create(task(), input());
    expect(result.kind).toBe("committed");
    const fresh = await new KernelBackendAdapter(new LocalBackend({ dir: root }), identity).read(
      taskId,
    );
    expect(fresh.kind).toBe("canonical");
    if (fresh.kind !== "canonical") throw new Error(JSON.stringify(fresh));
    expect(fresh.record.aggregate).toMatchObject({
      state: "PLANNING",
      revision: 1,
      current_plan: null,
      work_items: {},
    });
    expect(fresh.record.events.map((e) => e.kind)).toEqual(["intent_captured"]);
    for (const legacyRead of [aggregateFrom, runtimeFrom]) {
      expect(() => legacyRead(fresh.task)).toThrow(
        expect.objectContaining({ reasonCode: "canonical_task_requires_kernel_adapter" }),
      );
    }
    expect(fresh.record.aggregate.mutation_receipts["capture-1"]?.after_revision).toBe(1);
    const missingEvents = makeKernelRecord(identity, fresh.record.aggregate, []);
    expect(
      readKernelRecord(
        { ...fresh.task, extensions: { [TASK_KERNEL_EXTENSION]: missingEvents } },
        identity,
      ),
    ).toMatchObject({ kind: "malformed", reason: "canonical_invariant_violation" });
    const bytes = await readFile(path.join(root, taskId, "README.md"));
    expect(await adapter.create(task(), input())).toMatchObject({
      kind: "committed",
      replayed: true,
    });
    expect(await readFile(path.join(root, taskId, "README.md"))).toEqual(bytes);
  });

  it("rejects changed commands with a reused idempotency key without writing", async () => {
    const { adapter, backend } = await fixture();
    await adapter.create(task(), input());
    const write = vi.spyOn(backend, "writeTask");
    const next = input();
    expect(
      await adapter.execute({ ...next, command: { ...next.command, expected_task_revision: 99 } }),
    ).toMatchObject({ kind: "rejected", code: "MUTATION_ID_CONFLICT" });
    expect(write).not.toHaveBeenCalled();
  });

  it("retries only transient atomic task README replacement observations", async () => {
    const { adapter, backend } = await fixture();
    await adapter.create(task(), input());
    const original = backend.getTask.bind(backend);
    const replacement = Object.assign(
      new Error(`Refusing changed task README ${taskId} path: /fixture/README.md`),
      { code: "ELOOP" },
    );
    const read = vi
      .spyOn(backend, "getTask")
      .mockRejectedValueOnce(replacement)
      .mockImplementation(original);
    expect(await adapter.read(taskId)).toMatchObject({ kind: "canonical" });
    expect(read).toHaveBeenCalledTimes(2);

    const unsafeSymlink = Object.assign(new Error("Refusing symlink task README path"), {
      code: "ELOOP",
    });
    read.mockRejectedValue(unsafeSymlink);
    await expect(adapter.read(taskId)).rejects.toBe(unsafeSymlink);
  });

  it.each([
    "changed before it could be read",
    "changed while it was being read",
    "path changed before it could be read",
    "path changed while it was being read",
  ])("retries a fresh secure task read after snapshot drift: %s", async (reason) => {
    const { adapter, backend } = await fixture();
    await adapter.create(task(), input());
    const original = backend.getTask.bind(backend);
    const drift = new Error(`task README ${taskId} ${reason}: /fixture/README.md`);
    const read = vi
      .spyOn(backend, "getTask")
      .mockRejectedValueOnce(drift)
      .mockImplementation(original);
    expect(await adapter.read(taskId)).toMatchObject({ kind: "canonical" });
    expect(read).toHaveBeenCalledTimes(2);
    expect(read).toHaveBeenNthCalledWith(1, taskId);
    expect(read).toHaveBeenNthCalledWith(2, taskId);

    read.mockClear().mockRejectedValue(drift);
    await expect(adapter.read(taskId)).rejects.toBe(drift);
    expect(read).toHaveBeenCalledTimes(4);
  });

  it.each([
    Object.assign(new Error(`Refusing symlinked task README ${taskId} path: /fixture/README.md`), {
      code: "ELOOP",
    }),
    new Error(`Refusing non-regular task README ${taskId}: /fixture/README.md`),
    new Error(`task README ${taskId} exceeds the 10-byte observation budget: /fixture/README.md`),
    new SyntaxError("Invalid task README frontmatter"),
    new Error("task README other-task changed before it could be read: /fixture/README.md"),
    new Error(`task README ${taskId}-other changed while it was being read: /fixture/README.md`),
    new Error(`task README ${taskId} changed for an unrelated reason: /fixture/README.md`),
    Object.assign(
      new Error(`task README ${taskId} changed before it could be read: /fixture/README.md`),
      { code: "EACCES" },
    ),
  ])("propagates non-transient task read failure without retry: %s", async (failure) => {
    const { adapter, backend } = await fixture();
    const read = vi.spyOn(backend, "getTask").mockRejectedValue(failure);
    await expect(adapter.read(taskId)).rejects.toBe(failure);
    expect(read).toHaveBeenCalledTimes(1);
  });

  it("does not turn legacy status, approval or verification into a canonical record", async () => {
    const { adapter, backend } = await fixture();
    await backend.writeTask({ ...task(), status: "DONE" });
    const write = vi.spyOn(backend, "writeTask");
    expect(await adapter.read(taskId)).toMatchObject({ kind: "legacy_unmigrated" });
    expect(await adapter.execute(input())).toMatchObject({
      kind: "unavailable",
      code: "legacy_unmigrated",
    });
    expect(await adapter.create(task(), input())).toMatchObject({
      kind: "unavailable",
      code: "task_exists",
    });
    expect(write).not.toHaveBeenCalled();
  });

  it("rejects malformed canonical state and repository identity drift", async () => {
    const { adapter, backend } = await fixture();
    await adapter.create(task(), input());
    const saved = await backend.getTask(taskId);
    if (!saved) throw new Error("missing fixture");
    expect(readKernelRecord(saved, taskKernel.kernelDigest("different-repository"))).toMatchObject({
      kind: "malformed",
    });
    for (const value of [null, {}, { schema_version: 2 }, { state: "COMPLETED" }]) {
      expect(
        readKernelRecord({ ...saved, extensions: { [TASK_KERNEL_EXTENSION]: value } }, identity),
      ).toMatchObject({ kind: "malformed" });
    }
  });

  it("refuses unsupported atomicity before a backend write", async () => {
    const { adapter, backend } = await fixture();
    Object.defineProperty(backend, "capabilities", {
      value: { ...backend.capabilities, atomic_task_record: false },
    });
    const write = vi.spyOn(backend, "writeTask");
    expect(await adapter.create(task(), input())).toMatchObject({
      kind: "unavailable",
      code: "backend_capability_missing",
    });
    expect(write).not.toHaveBeenCalled();
  });

  it.each([
    { supports_task_revisions: false },
    { supports_revision_guarded_writes: false },
    { atomic_task_record: false },
    { canonical_source: "remote" as const, reads_from_projection_by_default: true },
  ])(
    "refuses execution after capability downgrade %j without changing durable bytes",
    async (downgrade) => {
      const { root, adapter, backend } = await fixture();
      await adapter.create(task(), input());
      const readme = path.join(root, taskId, "README.md");
      const before = await readFile(readme);
      Object.defineProperty(backend, "capabilities", {
        value: { ...backend.capabilities, ...downgrade },
      });
      const write = vi.spyOn(backend, "writeTask");
      expect(await adapter.execute({ ...input(), mutation_id: "after-downgrade" })).toMatchObject({
        kind: "unavailable",
        code: "backend_capability_missing",
      });
      expect(write).not.toHaveBeenCalled();
      expect(await readFile(readme)).toEqual(before);
    },
  );

  it("resolves a response lost after commit using independent readback", async () => {
    const { adapter, backend } = await fixture();
    const original = backend.writeTask.bind(backend);
    vi.spyOn(backend, "writeTask").mockImplementation(async (...args) => {
      await original(...args);
      throw new Error("lost response");
    });
    expect(await adapter.create(task(), input())).toMatchObject({
      kind: "committed",
      replayed: true,
    });
    expect(await adapter.read(taskId)).toMatchObject({ kind: "canonical" });
  });

  it("does not expose a success receipt for a dropped write or unavailable readback", async () => {
    const { adapter, backend } = await fixture();
    const write = vi.spyOn(backend, "writeTask").mockResolvedValue();
    expect(await adapter.create(task(), input())).toMatchObject({
      kind: "unavailable",
      code: "readback_mismatch",
    });
    write.mockImplementation(() => {
      vi.spyOn(backend, "getTask").mockRejectedValue(new Error("read unavailable"));
      return Promise.resolve();
    });
    expect(await adapter.create(task(), input())).toMatchObject({
      kind: "unavailable",
      code: "write_in_doubt",
    });
  });

  it("serializes competing creates through the local CAS without duplicate events", async () => {
    const { adapter } = await fixture();
    await Promise.all([adapter.create(task(), input()), adapter.create(task(), input())]);
    const read = await adapter.read(taskId);
    expect(read.kind).toBe("canonical");
    if (read.kind !== "canonical") throw new Error(JSON.stringify(read));
    expect(read.record.events).toHaveLength(1);
    expect(Object.keys(read.record.aggregate.mutation_receipts)).toEqual(["capture-1"]);
  });

  it("projects and previews without giving legacy fields transition authority", async () => {
    const { adapter, backend } = await fixture();
    await adapter.create(task(), input());
    const read = await adapter.read(taskId);
    if (read.kind !== "canonical") throw new Error("missing fixture");
    expect(projectKernelTask(read.record.aggregate)).toMatchObject({
      status: "TODO",
      state: "PLANNING",
    });
    const write = vi.spyOn(backend, "writeTask");
    const next = input();
    expect(
      await adapter.preview({
        ...next,
        mutation_id: "complete-1",
        command: {
          kind: "complete_task",
          task_id: taskId,
          expected_task_revision: 1,
          expected_state_fingerprint: fingerprint,
        },
      }),
    ).toMatchObject({ kind: "rejected" });
    expect(write).not.toHaveBeenCalled();
  });

  it("rejects foreign repository authority equally for preview, creation and execution", async () => {
    const { adapter, backend } = await fixture();
    await adapter.create(task(), input());
    const before = await adapter.read(taskId);
    const command = input();
    command.authority = {
      ...command.authority!,
      repository_identity: taskKernel.kernelDigest("foreign-repository"),
    };
    const write = vi.spyOn(backend, "writeTask");
    const refusal = {
      kind: "rejected",
      code: "AUTHORITY_SCOPE_EXCEEDED",
      facts: ["repository_identity"],
      required_action: null,
    };
    expect(await adapter.preview(command)).toEqual(refusal);
    expect(await adapter.create(task(), command)).toEqual(refusal);
    expect(await adapter.execute(command)).toEqual(refusal);
    expect(write).not.toHaveBeenCalled();
    expect(await adapter.read(taskId)).toEqual(before);
  });
});

describe("kernel observation and backend contracts", () => {
  it("matches cloud-fake atomic CAS records to local storage", async () => {
    const { adapter: local } = await fixture();
    let saved: TaskData | null = null;
    const base = makeTaskBackendDouble();
    const cloud = makeTaskBackendDouble({
      id: "cloud-fake",
      capabilities: { ...base.capabilities, canonical_source: "remote", atomic_task_record: true },
      getTask: () => Promise.resolve(structuredClone(saved)),
      writeTask: (next, options) => {
        if ((saved?.revision ?? 0) !== options?.expectedRevision)
          return Promise.reject(new Error("CAS conflict"));
        saved = structuredClone(next);
        return Promise.resolve();
      },
    });
    const remote = new KernelBackendAdapter(cloud, identity);
    const [a, b] = await Promise.all([
      local.create(task(), input()),
      remote.create(task(), input()),
    ]);
    expect(a.kind).toBe("committed");
    expect(b.kind).toBe("committed");
    if (a.kind !== "committed" || b.kind !== "committed") throw new Error("fixture failed");
    expect(b.record).toEqual(a.record);
    expect(await remote.execute(input())).toMatchObject({ kind: "committed", replayed: true });
  });

  it("binds validation and evaluator observations to exact work and implementation identities", () => {
    const binding = {
      task_id: taskId,
      plan_revision: 1,
      plan_digest: taskKernel.kernelDigest("plan"),
      work_item_id: "implementation",
      repository_fingerprint: fingerprint,
      implementation_identity: taskKernel.kernelDigest("implementation"),
    };
    const check = {
      implementation_identity: binding.implementation_identity,
      check_id: "unit",
      command_digest: taskKernel.kernelDigest("test"),
      toolchain_digest: taskKernel.kernelDigest("node"),
      environment_digest: taskKernel.kernelDigest("env"),
    };
    const validation = {
      status: "PASSED",
      identity: check,
      evidence_digests: [taskKernel.kernelDigest("log")],
      observed_at: "2026-08-30T00:00:00.000Z",
    };
    expect(
      readKernelValidation({ kind: "validation", binding, validation }, binding, check),
    ).toMatchObject({ kind: "validation" });
    expect(
      readKernelValidation({ kind: "validation", binding, validation }, binding, {
        ...check,
        toolchain_digest: taskKernel.kernelDigest("new-node"),
      }),
    ).toMatchObject({ kind: "rejected", code: "observation_binding_mismatch" });
    const review = {
      kind: "review",
      binding,
      verdict: "PASS",
      evidence_digests: validation.evidence_digests,
      findings: [],
    };
    expect(readKernelReview(review, binding)).toMatchObject({ kind: "review", verdict: "PASS" });
    expect(readKernelReview(review, { ...binding, work_item_id: "other" })).toMatchObject({
      kind: "rejected",
    });
    expect(readKernelReview({ ...review, status: "DONE" }, binding)).toMatchObject({
      kind: "rejected",
      code: "observation_schema_invalid",
    });
  });

  it("does not accept an unmatched provider observation as effect evidence", async () => {
    const { adapter } = await fixture();
    await adapter.create(task(), input());
    const read = await adapter.read(taskId);
    if (read.kind !== "canonical") throw new Error("fixture failed");
    const observation = {
      kind: "provider",
      task_id: taskId,
      repository_fingerprint: fingerprint,
      effect_id: "merge",
      request_digest: taskKernel.kernelDigest("request"),
      state: "APPLIED",
      receipt_digest: taskKernel.kernelDigest("receipt"),
    };
    expect(
      readKernelEffectObservation(observation, read.record.aggregate, fingerprint),
    ).toMatchObject({ kind: "rejected", code: "observation_effect_mismatch" });
  });
});

it("keeps migrated terminal archives read only", async () => {
  const { adapter, backend } = await fixture();
  const contents = {
    schema_version: 1,
    kind: "archived_task",
    task_id: taskId,
    repository_identity: identity,
    source_digest: taskKernel.kernelDigest("legacy bytes"),
    migration_version: "1",
    legacy_status: "DONE",
    read_only: true,
  };
  await backend.writeTask({
    ...task(),
    status: "DONE",
    extensions: {
      [TASK_KERNEL_EXTENSION]: { ...contents, digest: taskKernel.kernelDigest(contents) },
    },
  });
  const write = vi.spyOn(backend, "writeTask");
  expect(await adapter.read(taskId)).toMatchObject({ kind: "archived" });
  expect(await adapter.execute(input())).toMatchObject({ kind: "unavailable", code: "archived" });
  expect(write).not.toHaveBeenCalled();
});

it("persists approved plan and materialized WorkItems atomically through kernel commands", async () => {
  const { adapter } = await fixture();
  await adapter.create(task(), input());
  let plan: taskKernel.PlanRecord = {
    revision: 1,
    digest: taskKernel.kernelDigest("pending-plan-definition"),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
    work_items: [
      {
        id: "build",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["built"],
        optional: false,
        execution_requirements: {
          scope_roots: ["."],
          repository_effects: ["repository_write"],
          external_effects: [],
          capabilities: ["repository_write"],
          resources: [],
        },
      },
    ],
  };
  plan = {
    ...plan,
    digest: taskKernel.kernelDigest({ revision: plan.revision, work_items: plan.work_items }),
  };
  const proposed = await adapter.execute({
    ...input(),
    mutation_id: "propose",
    command: {
      kind: "propose_plan",
      task_id: taskId,
      expected_task_revision: 1,
      expected_state_fingerprint: fingerprint,
      plan,
    },
  });
  expect(proposed.kind).toBe("committed");
  const authority = { ...input().authority!, plan_revision: 1, plan_digest: plan.digest };
  expect(
    await adapter.execute({
      ...input(),
      authority,
      mutation_id: "approve",
      command: {
        kind: "approve_plan",
        task_id: taskId,
        expected_task_revision: 2,
        expected_state_fingerprint: fingerprint,
        plan_revision: 1,
        plan_digest: plan.digest,
        approval_evidence_digest: authority.provenance.evidence_digest,
      },
    }),
  ).toMatchObject({ kind: "committed" });
  const materialized = await adapter.execute({
    ...input(),
    authority,
    mutation_id: "materialize",
    command: {
      kind: "materialize_work_items",
      task_id: taskId,
      expected_task_revision: 3,
      expected_state_fingerprint: fingerprint,
      plan_revision: 1,
      plan_digest: plan.digest,
    },
  });
  expect(materialized.kind).toBe("committed");
  const read = await adapter.read(taskId);
  expect(read.kind).toBe("canonical");
  if (read.kind !== "canonical") throw new Error(JSON.stringify(read));
  expect(read.record.aggregate).toMatchObject({
    state: "ACTIVE",
    revision: 4,
    current_plan: { state: "APPROVED" },
    work_items: { build: { state: "READY", attempt: 0, output_manifests: [] } },
  });
  expect(read.record.events.map((event) => event.kind)).toEqual([
    "intent_captured",
    "plan_proposed",
    "plan_approved",
    "work_items_materialized",
  ]);
  expect(read.task.status).toBe("DOING");
  const resultDigest = taskKernel.kernelDigest("completed-build");
  const envelope = { task_id: taskId, expected_state_fingerprint: fingerprint };
  const output: taskKernel.OutputManifest = {
    id: "built",
    kind: "file",
    digest: resultDigest,
    task_id: taskId,
    plan_revision: 1,
    work_item_id: "build",
    attempt: 1,
    repository_fingerprint: fingerprint,
  };
  const commands: taskKernel.TaskCommand[] = [
    {
      ...envelope,
      expected_task_revision: 4,
      kind: "transition_work_item",
      work_item_id: "build",
      action: "claim",
      claim_id: "claim",
    },
    {
      ...envelope,
      expected_task_revision: 5,
      kind: "transition_work_item",
      work_item_id: "build",
      action: "begin",
      claim_id: "claim",
    },
    {
      ...envelope,
      expected_task_revision: 6,
      kind: "accept_work_item_result",
      plan_revision: 1,
      plan_digest: plan.digest,
      work_item_id: "build",
      result_digest: resultDigest,
      output_manifests: [output],
    },
    {
      ...envelope,
      expected_task_revision: 7,
      kind: "transition_work_item",
      work_item_id: "build",
      action: "inspect",
      claim_id: "claim",
    },
    {
      ...envelope,
      expected_task_revision: 8,
      kind: "record_work_item_validation",
      work_item_id: "build",
      validation: {
        status: "PASSED",
        identity: {
          implementation_identity: resultDigest,
          check_id: "build-test",
          command_digest: fingerprint,
          toolchain_digest: fingerprint,
          environment_digest: fingerprint,
        },
        evidence_digests: [resultDigest],
        observed_at: input().occurred_at,
      },
    },
    {
      ...envelope,
      expected_task_revision: 9,
      kind: "transition_work_item",
      work_item_id: "build",
      action: "complete",
      claim_id: "claim",
    },
  ];
  for (const command of commands) {
    expect(
      await adapter.execute({
        ...input(),
        command,
        authority: { ...authority, work_item_id: "build" },
        mutation_id: `step-${command.expected_task_revision}`,
      }),
    ).toMatchObject({ kind: "committed" });
  }
  const proposedAmendment = { revision: 2, work_items: plan.work_items };
  const amendedPlan = { ...proposedAmendment, digest: taskKernel.kernelDigest(proposedAmendment) };
  const amended = await adapter.execute({
    ...input(),
    authority,
    mutation_id: "amend",
    command: {
      ...envelope,
      expected_task_revision: 10,
      kind: "amend_plan",
      plan_revision: 1,
      plan_digest: plan.digest,
      amendment_digest: taskKernel.kernelDigest(amendedPlan),
      amended_plan: amendedPlan,
      authority_delta_digest: null,
    },
  });
  expect(amended).toMatchObject({ kind: "committed" });
  const after = await adapter.read(taskId);
  expect(after.kind).toBe("canonical");
  if (after.kind !== "canonical") throw new Error(JSON.stringify(after));
  expect(after.record.aggregate.work_items.build?.output_manifests).toEqual([output]);
});
