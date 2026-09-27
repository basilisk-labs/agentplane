import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { buildAgentWorkOrderV2ValidFixture } from "../../../../core/src/runner/agent-work-order-fixtures.js";
import {
  aggregate,
  input,
  runtime,
  transitionCommand,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { makeKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type * as RuntimeModule from "./kernel-runtime-context.js";
import type * as BackendModule from "../shared/task-backend.js";

const mocks = vi.hoisted(() => ({ create: vi.fn(), commonDir: vi.fn() }));
vi.mock("./kernel-runtime-context.js", async (original) => ({
  ...(await original<typeof RuntimeModule>()),
  createKernelRuntime: mocks.create,
}));
vi.mock("../shared/task-backend.js", async (original) => ({
  ...(await original<typeof BackendModule>()),
  resolveCommandGitCommonDir: mocks.commonDir,
}));
import { cmdWorkItemResume } from "./kernel-work-item-resume.js";
import { withKernelReworkEvidence } from "./kernel-exchange.js";

const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
  vi.clearAllMocks();
});

async function fixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "kernel-recovery-"));
  roots.push(root);
  const kernelRoot = path.join(root, "agentplane", "kernel");
  const item = runtime("EXECUTING");
  item.definition = { ...item.definition, contract_digest: k.kernelDigest("contract") };
  const initial = aggregate({
    work_items: { kernel: item },
    current_plan: { ...aggregate().current_plan!, work_items: [item.definition] },
  });
  const oldId = k.kernelDigest("previous-work-order");
  const stopId = `semantic-stop:${oldId}`;
  const stopInput = input(
    initial,
    { ...transitionCommand(initial, "block"), claim_id: item.claim_id },
    stopId,
  );
  const stopped = k.reduceTaskCommand(stopInput);
  if (stopped.kind !== "accepted") throw new Error("fixture stop failed");
  let record = makeKernelRecord(k.kernelDigest("repo"), stopped.aggregate, stopped.events);
  const binding = {
    task_id: initial.id,
    repository_identity: record.repository_identity,
    repository_fingerprint: stopInput.repository_fingerprint,
    plan_revision: initial.current_plan!.revision,
    plan_digest: initial.current_plan!.digest,
    phase: "implementation" as const,
    work_item_id: "kernel",
    attempt: 1,
    claim_id: item.claim_id!,
    contract_digest: item.definition.contract_digest!,
    authority_digest: k.kernelDigest("authority"),
  };
  const oldDirectory = path.join(kernelRoot, "exchanges", initial.id, oldId.slice(7));
  await mkdir(oldDirectory, { recursive: true });
  const resultPath = path.join(oldDirectory, "received-result.json");
  await writeFile(
    resultPath,
    JSON.stringify({
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: oldId,
      status: "blocked",
      summary: "Required actionlint executable is missing.",
      findings: [],
      uncertainty: [],
      blocker: { summary: "Install actionlint." },
      canonical_binding: binding,
    }),
  );
  const { aggregate: _state, ...saved } = stopInput;
  await writeFile(path.join(oldDirectory, "semantic-stop-command.json"), JSON.stringify(saved));
  mocks.commonDir.mockResolvedValue(root);
  mocks.create.mockResolvedValue({
    adapter: { read: vi.fn(() => Promise.resolve({ kind: "canonical", record })) },
    input: vi.fn(
      (
        payload: {
          kind: "transition_work_item";
          action: "resume";
          work_item_id: string;
          claim_id: string;
        },
        mutationId: string,
      ) => {
        const { aggregate: _aggregate, ...value } = input(
          record.aggregate,
          {
            ...transitionCommand(record.aggregate, "resume"),
            ...payload,
          },
          mutationId,
        );
        return Promise.resolve(value);
      },
    ),
    lifecycle: {
      apply: vi.fn((value: Omit<k.KernelInput, "aggregate">) => {
        const result = k.reduceTaskCommand({ ...value, aggregate: record.aggregate });
        if (result.kind !== "accepted") throw new Error("fixture recovery rejected");
        record = makeKernelRecord(record.repository_identity, result.aggregate, [
          ...record.events,
          ...result.events,
        ]);
        return Promise.resolve({ kind: "committed", record, receipts: [], replayed: false });
      }),
    },
  });
  await cmdWorkItemResume({} as never, {
    taskId: initial.id,
    workItemId: "kernel",
    stateDigest: record.digest,
    by: "USER",
    note: "Installed and verified actionlint.",
  });
  for (const action of ["claim", "begin"] as const) {
    const result = k.reduceTaskCommand(
      input(record.aggregate, transitionCommand(record.aggregate, action), action),
    );
    if (result.kind !== "accepted") throw new Error(`fixture ${action} failed`);
    record = makeKernelRecord(record.repository_identity, result.aggregate, [
      ...record.events,
      ...result.events,
    ]);
  }
  const order = buildAgentWorkOrderV2ValidFixture();
  order.task.id = initial.id;
  order.task.revision = record.aggregate.revision;
  order.task.work_item_id = "kernel";
  const { digest: _fingerprintDigest, ...fingerprintContents } = order.state_fingerprint;
  const fingerprintState = {
    ...fingerprintContents,
    task_id: initial.id,
    task_revision: record.aggregate.revision,
  };
  order.state_fingerprint = { ...fingerprintState, digest: k.kernelDigest(fingerprintState) };
  order.canonical_binding = { ...binding, attempt: 2, claim_id: "claim-2" };
  order.work_order_id = k.kernelDigest("new-work-order");
  const directory = path.join(kernelRoot, "exchanges", initial.id, order.work_order_id.slice(7));
  const receiptId = Object.keys(record.aggregate.mutation_receipts).find((id) =>
    id.startsWith("work-item-resume:"),
  )!;
  const receiptPath = path.join(
    kernelRoot,
    "recoveries",
    initial.id,
    receiptId.slice("work-item-resume:sha256:".length) + ".json",
  );
  return { record, order, directory, resultPath, receiptPath, receiptId };
}

describe("semantic stop recovery evidence", () => {
  it("issues a schema-valid new WorkOrder after blocked result and real operator recovery", async () => {
    const f = await fixture();
    const order = await withKernelReworkEvidence(f.order, f.directory, f.record);
    expect(order.canonical_binding).toMatchObject({
      phase: "implementation",
      attempt: 2,
      claim_id: "claim-2",
    });
    expect(order.required_inputs.slice(-2).map((entry) => entry.path)).toEqual([
      f.resultPath,
      f.receiptPath,
    ]);
    expect(order.required_inputs.slice(-2).every((entry) => entry.required)).toBe(true);
    expect(f.record.aggregate.work_items.kernel).toMatchObject({
      state: "EXECUTING",
      validation: null,
      result_digest: null,
    });
  });

  it("rejects unrecorded operator recovery", async () => {
    const f = await fixture();
    delete f.record.aggregate.mutation_receipts[f.receiptId];
    await expect(withKernelReworkEvidence(f.order, f.directory, f.record)).rejects.toThrow(
      "retained review",
    );
  });

  it.each(["receipt", "result"] as const)("rejects missing %s evidence", async (which) => {
    const f = await fixture();
    await rm(which === "receipt" ? f.receiptPath : f.resultPath);
    await expect(withKernelReworkEvidence(f.order, f.directory, f.record)).rejects.toThrow();
  });

  it.each(["receipt", "result"] as const)("rejects tampered %s evidence", async (which) => {
    const f = await fixture();
    const file = which === "receipt" ? f.receiptPath : f.resultPath;
    const value = JSON.parse(await readFile(file, "utf8")) as Record<string, unknown>;
    if (which === "receipt") value.note = "Changed operator resolution.";
    else value.summary = "Changed stop reason.";
    await writeFile(file, JSON.stringify(value));
    await expect(withKernelReworkEvidence(f.order, f.directory, f.record)).rejects.toThrow();
  });

  it.each([
    "task_id",
    "repository_identity",
    "plan_digest",
    "contract_digest",
    "work_item_id",
  ] as const)("rejects an unrelated %s binding", async (field) => {
    const f = await fixture();
    f.order.canonical_binding = {
      ...f.order.canonical_binding!,
      [field]: k.kernelDigest("different"),
    };
    await expect(withKernelReworkEvidence(f.order, f.directory, f.record)).rejects.toThrow();
  });

  it("rejects recovery from an older attempt", async () => {
    const f = await fixture();
    f.order.canonical_binding = {
      ...f.order.canonical_binding!,
      phase: "implementation",
      attempt: 3,
      claim_id: "claim-3",
      work_item_id: "kernel",
      contract_digest: k.kernelDigest("contract"),
      authority_digest: k.kernelDigest("authority"),
    };
    await expect(withKernelReworkEvidence(f.order, f.directory, f.record)).rejects.toThrow(
      "retained review",
    );
  });
});
