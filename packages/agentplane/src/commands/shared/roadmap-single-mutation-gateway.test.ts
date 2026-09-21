import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { taskKernel } from "@agentplaneorg/core/tasks";
import { describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import {
  KernelBackendAdapter,
  type KernelCommandInput,
} from "../../adapters/task-backend/kernel-backend-adapter.js";
import {
  readKernelRecord,
  TASK_KERNEL_EXTENSION,
} from "../../adapters/task-backend/kernel-record.js";
import { projectKernelTask } from "../../adapters/task-backend/kernel-projector.js";

const taskId = "202609210000-LC0201";
const identity = taskKernel.kernelDigest("lc-02-repository");
const fingerprint = taskKernel.kernelDigest("lc-02-state");

function task(): TaskData {
  return {
    id: taskId,
    title: "Single mutation gateway",
    description: "LC-02 fixture",
    status: "TODO",
    priority: "high",
    owner: "CODER",
    depends_on: [],
    tags: [],
    verify: ["focused"],
  };
}

function input(): KernelCommandInput {
  return {
    command: {
      kind: "capture_intent",
      task_id: taskId,
      expected_task_revision: 0,
      expected_state_fingerprint: fingerprint,
      intent_digest: taskKernel.kernelDigest("lc-02-intent"),
    },
    actor: {
      id: "lc-02-user",
      kind: "USER",
      transport: "manual",
      capabilities: ["repository_write"],
    },
    authority: {
      digest: taskKernel.kernelDigest("lc-02-authority"),
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
        actor_id: "lc-02-user",
        evidence_digest: taskKernel.kernelDigest("lc-02-user-decision"),
        parent_authority_digest: null,
      },
      expires_at: null,
    },
    repository_fingerprint: fingerprint,
    occurred_at: "2026-09-21T00:00:00.000Z",
    mutation_id: "capture",
  };
}

function plan(id: string): taskKernel.PlanRecord {
  const work_items: taskKernel.WorkItemDefinition[] = [
    {
      id,
      depends_on: [],
      required_inputs: [],
      expected_outputs: [`${id}-output`],
      execution_requirements: {
        scope_roots: ["."],
        repository_effects: ["repository_write"],
        external_effects: [],
        capabilities: ["repository_write"],
        resources: [],
      },
      optional: false,
    },
  ];
  return {
    revision: 1,
    digest: taskKernel.kernelDigest({ revision: 1, work_items }),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
    work_items,
  };
}

function memoryGateway() {
  let stored: TaskData | null = null;
  const base = makeTaskBackendDouble();
  const backend = makeTaskBackendDouble({
    capabilities: { ...base.capabilities, canonical_source: "local", atomic_task_record: true },
    getTask: () => Promise.resolve(structuredClone(stored)),
    writeTask: (next, options) => {
      if ((stored?.revision ?? 0) !== options?.expectedRevision) {
        return Promise.reject(new Error("CAS conflict"));
      }
      stored = structuredClone(next);
      return Promise.resolve();
    },
  });
  return {
    adapter: new KernelBackendAdapter(backend, identity),
    backend,
    current: () => structuredClone(stored),
  };
}

describe("LC-02 single Kernel mutation gateway", () => {
  it("uses one CAS boundary and records one event and receipt for the accepted transition", async () => {
    const gateway = memoryGateway();
    expect(await gateway.adapter.create(task(), input())).toMatchObject({ kind: "committed" });

    const invoke = (id: string) =>
      gateway.adapter.execute({
        ...input(),
        mutation_id: `propose-${id}`,
        command: {
          kind: "propose_plan",
          task_id: taskId,
          expected_task_revision: 1,
          expected_state_fingerprint: fingerprint,
          plan: plan(id),
        },
      });
    const results = await Promise.all([invoke("first"), invoke("second")]);

    expect(results.filter((result) => result.kind === "committed")).toHaveLength(1);
    expect(results).toContainEqual(
      expect.objectContaining({ kind: "unavailable", code: "concurrent_write" }),
    );
    const read = await gateway.adapter.read(taskId);
    expect(read.kind).toBe("canonical");
    if (read.kind !== "canonical") throw new Error(JSON.stringify(read));
    expect(read.record.events).toHaveLength(2);
    expect(Object.keys(read.record.aggregate.mutation_receipts)).toHaveLength(2);
  });

  it("renders compatibility state without writing and rejects a conflicting outer status", async () => {
    const gateway = memoryGateway();
    await gateway.adapter.create(task(), input());
    const read = await gateway.adapter.read(taskId);
    if (read.kind !== "canonical") throw new Error(JSON.stringify(read));
    const write = vi.spyOn(gateway.backend, "writeTask");

    expect(projectKernelTask(read.record.aggregate)).toMatchObject({
      state: "PLANNING",
      status: "TODO",
    });
    expect(write).not.toHaveBeenCalled();
    expect(readKernelRecord({ ...read.task, status: "DONE" }, identity)).toMatchObject({
      kind: "malformed",
      reason: "canonical_projection_mismatch",
      fields: ["status"],
    });
    expect(write).not.toHaveBeenCalled();
  });

  it("keeps non-Kernel historical records on the explicit legacy decoder path", () => {
    expect(readKernelRecord({ ...task(), status: "DONE" }, identity)).toMatchObject({
      kind: "legacy_unmigrated",
    });
    expect(task()).not.toHaveProperty(`extensions.${TASK_KERNEL_EXTENSION}`);
  });
});
