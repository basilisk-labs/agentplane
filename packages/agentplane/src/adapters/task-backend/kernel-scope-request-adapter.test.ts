import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import { taskKernel } from "@agentplaneorg/core/tasks";
import { LocalBackend, type TaskData } from "../../backends/task-backend.js";
import { KernelBackendAdapter, type KernelCommandInput } from "./kernel-backend-adapter.js";
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

it("requires independent stop evidence verification before a prospective scope mutation", async () => {
  const { adapter, backend } = await fixture();
  await adapter.create(task(), input());
  const current = await adapter.read(taskId);
  if (current.kind !== "canonical") throw new Error("Missing fixture record");
  const request = { record_digest: current.record.digest } as taskKernel.ProspectiveScopeRequest;
  const command = {
    ...input(),
    command: {
      ...input().command,
      kind: "approve_scope_request",
      record: { observation: { scope_request: request } },
    },
  } as KernelCommandInput;
  const write = vi.spyOn(backend, "writeTask");
  expect(await adapter.execute(command)).toMatchObject({
    kind: "unavailable",
    code: "backend_capability_missing",
    facts: ["scope_request_evidence_verifier"],
  });
  const verify = vi
    .fn()
    .mockRejectedValue(new Error("Current retained result is not authenticated"));
  const guarded = new KernelBackendAdapter(backend, identity, verify);
  await expect(guarded.execute(command)).rejects.toThrow("not authenticated");
  expect(verify).toHaveBeenCalledWith(request);
  expect(write).not.toHaveBeenCalled();
  if (command.command.kind !== "approve_scope_request") throw new Error("Unexpected test command");
  const wrongRecordCommand: KernelCommandInput = {
    ...command,
    command: {
      ...command.command,
      record: {
        ...command.command.record,
        observation: {
          ...command.command.record.observation!,
          scope_request: { ...request, record_digest: taskKernel.kernelDigest("different record") },
        },
      },
    },
  };
  expect(await guarded.execute(wrongRecordCommand)).toMatchObject({
    kind: "unavailable",
    code: "malformed",
  });
  expect(verify).toHaveBeenCalledTimes(1);
});
