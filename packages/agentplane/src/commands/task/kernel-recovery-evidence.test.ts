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
import {
  validationRecord,
  type InspectionBinding,
  type KernelNativeValidationEvidence,
} from "./kernel-inspection-validation.js";
import { withKernelReworkEvidence } from "./kernel-exchange.js";

const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
  vi.clearAllMocks();
});

async function fixture(nativeStop = false) {
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
  const savedInput = nativeStop
    ? {
        ...stopInput,
        command: {
          ...stopInput.command,
          semantic_result_digest: k.kernelDigest(JSON.parse(await readFile(resultPath, "utf8"))),
        },
      }
    : stopInput;
  if (nativeStop) {
    const nativeStopped = k.reduceTaskCommand(savedInput);
    if (nativeStopped.kind !== "accepted") throw new Error("fixture native stop failed");
    record = makeKernelRecord(
      record.repository_identity,
      nativeStopped.aggregate,
      nativeStopped.events,
    );
  }
  const { aggregate: _state, ...saved } = savedInput;
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
  it.each([false, true])(
    "issues a schema-valid new WorkOrder after blocked result and real operator recovery (native=%s)",
    async (nativeStop) => {
      const f = await fixture(nativeStop);
      const receipt = JSON.parse(await readFile(f.receiptPath, "utf8")) as {
        semantic_stop: { result_authentication: string };
      };
      expect(receipt.semantic_stop.result_authentication).toBe(
        nativeStop ? "native_stop_receipt" : "legacy_current_retained_content",
      );
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
    },
  );

  it.each([undefined, "native_stop_receipt", "invalid"] as const)(
    "validates recovery authentication metadata %s against retained evidence",
    async (authentication) => {
      const f = await fixture();
      const receipt = JSON.parse(await readFile(f.receiptPath, "utf8")) as {
        semantic_stop: { result_authentication?: string };
      };
      expect(receipt.semantic_stop.result_authentication).toBe("legacy_current_retained_content");
      if (authentication === undefined) delete receipt.semantic_stop.result_authentication;
      else receipt.semantic_stop.result_authentication = authentication;
      // Rebind the fixture receipt so the schema/authentication guard, not a stale hash, is tested.
      const digest = k.kernelDigest(receipt);
      const id = `work-item-resume:${digest}`;
      f.record.aggregate.mutation_receipts[id] = f.record.aggregate.mutation_receipts[f.receiptId]!;
      delete f.record.aggregate.mutation_receipts[f.receiptId];
      await writeFile(
        path.join(path.dirname(f.receiptPath), `${digest.slice(7)}.json`),
        JSON.stringify(receipt),
      );
      const result = withKernelReworkEvidence(f.order, f.directory, f.record);
      if (authentication === undefined) {
        const order = await result;
        expect(order.required_inputs.slice(-2).every((entry) => entry.required)).toBe(true);
      } else {
        await expect(result).rejects.toThrow(
          authentication === "invalid"
            ? "Invalid operator recovery evidence"
            : "Operator recovery does not bind the preceding semantic attempt",
        );
      }
    },
  );

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

async function nativeFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), "kernel-native-recovery-"));
  roots.push(root);
  const kernelRoot = path.join(root, "agentplane", "kernel");
  const item = runtime("INSPECTING");
  item.definition = { ...item.definition, contract_digest: k.kernelDigest("contract") };
  const initial = aggregate({
    work_items: { kernel: item },
    current_plan: { ...aggregate().current_plan!, work_items: [item.definition] },
  });
  const oldId = k.kernelDigest("native-previous-order");
  const binding = {
    task_id: initial.id,
    repository_identity: k.kernelDigest("repo"),
    repository_fingerprint: k.kernelDigest("repository-state"),
    plan_revision: initial.current_plan!.revision,
    plan_digest: initial.current_plan!.digest,
    phase: "implementation" as const,
    work_item_id: "kernel",
    attempt: 1,
    claim_id: item.claim_id!,
    contract_digest: item.definition.contract_digest!,
    authority_digest: k.kernelDigest("authority"),
  };
  const result = {
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: oldId,
    status: "completed",
    summary: "Implementation ready",
    findings: [],
    uncertainty: [],
    canonical_binding: binding,
    canonical_outputs: [{ id: "kernel-source", kind: "source", digest: k.kernelDigest("source") }],
  };
  item.result_digest = k.kernelDigest(result);
  const inspection: InspectionBinding = {
    ...binding,
    phase: "inspection",
    result_digest: item.result_digest,
  };
  const nativeInput = {
    schema_version: 1 as const,
    kind: "kernel_native_validation_input" as const,
    task_id: initial.id,
    work_item_id: "kernel",
    result_digest: item.result_digest,
    repository_fingerprint: binding.repository_fingerprint,
    repository_evidence_digest: null,
    verification: {
      schema_version: 1 as const,
      kind: "direct_task_verification_input" as const,
      cwd: root,
      commands: ["missing-check"],
      platform: process.platform,
      arch: process.arch,
      node: process.version,
      runtimes: [],
    },
  };
  const native: KernelNativeValidationEvidence = {
    schema_version: 1,
    kind: "kernel_native_validation",
    input: nativeInput,
    input_digest: k.kernelDigest(nativeInput),
    checks: {
      status: "unsupported",
      checks: [],
      reason: "Unsupported declared check",
      artifact_path: "checks.json",
    },
    repository_evidence: null,
  };
  const validation = validationRecord({
    binding: inspection,
    contractCommands: nativeInput.verification.commands,
    native,
    reviewDigest: null,
    status: "BLOCKED",
    observedAt: "2026-08-29T20:00:00.000Z",
  });
  const evidence = {
    task_id: initial.id,
    work_item_id: "kernel",
    attempt: 1,
    contract_digest: binding.contract_digest,
    repository_fingerprint: binding.repository_fingerprint,
    result_digest: item.result_digest,
    review_digest: null,
    native_evidence_digest: k.kernelDigest(native),
    status: "BLOCKED",
    checks: native.checks,
    repository_evidence: null,
  };
  const validationInput = input(
    initial,
    {
      kind: "record_work_item_validation",
      task_id: initial.id,
      expected_task_revision: initial.revision,
      expected_state_fingerprint: binding.repository_fingerprint,
      work_item_id: "kernel",
      validation,
    },
    `validation:${oldId}`,
  );
  const validated = k.reduceTaskCommand(validationInput);
  if (validated.kind !== "accepted") throw new Error("fixture validation failed");
  let record = makeKernelRecord(binding.repository_identity, validated.aggregate, validated.events);
  const oldDirectory = path.join(kernelRoot, "exchanges", initial.id, oldId.slice(7));
  await mkdir(oldDirectory, { recursive: true });
  const { aggregate: _aggregate, ...saved } = validationInput;
  const files = {
    result: path.join(oldDirectory, "received-result.json"),
    validation: path.join(oldDirectory, "validation.json"),
    command: path.join(oldDirectory, "validation-command.json"),
    native: path.join(oldDirectory, `native-validation-${native.input_digest.slice(7)}.json`),
  };
  for (const [file, value] of [
    [files.result, result],
    [files.validation, evidence],
    [files.command, saved],
    [files.native, native],
  ] as const)
    await writeFile(file, JSON.stringify(value));
  const opts = {
    taskId: initial.id,
    workItemId: "kernel",
    stateDigest: record.digest,
    by: "USER",
    note: "Approved parser repair now supports the original check.",
  };
  const apply = vi.fn((value: Omit<k.KernelInput, "aggregate">) => {
    const reduced = k.reduceTaskCommand({ ...value, aggregate: record.aggregate });
    if (reduced.kind !== "accepted") throw new Error("fixture recovery rejected");
    record = makeKernelRecord(record.repository_identity, reduced.aggregate, [
      ...record.events,
      ...reduced.events,
    ]);
    return Promise.resolve({ kind: "committed", record, receipts: [], replayed: false });
  });
  mocks.commonDir.mockResolvedValue(root);
  mocks.create.mockResolvedValue({
    adapter: { read: vi.fn(() => Promise.resolve({ kind: "canonical", record })) },
    input: vi.fn(
      (
        payload: Pick<
          Extract<k.TaskCommand, { kind: "transition_work_item" }>,
          "kind" | "action" | "work_item_id" | "claim_id"
        >,
        mutationId: string,
      ) => {
        const { aggregate: _state, ...value } = input(
          record.aggregate,
          { ...transitionCommand(record.aggregate, payload.action), ...payload },
          mutationId,
        );
        return Promise.resolve(value);
      },
    ),
    lifecycle: { apply },
  });
  const recover = async () => {
    await cmdWorkItemResume({} as never, opts);
    for (const action of ["claim", "begin"] as const) {
      const reduced = k.reduceTaskCommand(
        input(record.aggregate, transitionCommand(record.aggregate, action), `new-${action}`),
      );
      if (reduced.kind !== "accepted") throw new Error(`fixture ${action} failed`);
      record = makeKernelRecord(record.repository_identity, reduced.aggregate, [
        ...record.events,
        ...reduced.events,
      ]);
    }
    const order = buildAgentWorkOrderV2ValidFixture();
    order.task.id = initial.id;
    order.task.revision = record.aggregate.revision;
    order.task.work_item_id = "kernel";
    const { digest: _digest, ...contents } = order.state_fingerprint;
    const updated = { ...contents, task_id: initial.id, task_revision: record.aggregate.revision };
    order.state_fingerprint = { ...updated, digest: k.kernelDigest(updated) };
    order.canonical_binding = { ...binding, attempt: 2, claim_id: "claim-2" };
    order.work_order_id = k.kernelDigest("new-native-order");
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
    return { record, order, directory, receiptPath, receiptId };
  };
  return { record, files, recover, opts, apply };
}

describe("native infrastructure recovery evidence", () => {
  it("retains the exact BLOCKED evidence through USER recovery and fresh rework issuance", async () => {
    const f = await nativeFixture();
    const before = await readFile(f.files.validation, "utf8");
    const originalRecord = structuredClone(f.record);
    const next = await f.recover();
    const order = await withKernelReworkEvidence(next.order, next.directory, next.record);
    expect(order.required_inputs.slice(-2).map((entry) => entry.path)).toEqual([
      f.files.validation,
      next.receiptPath,
    ]);
    expect(order.required_inputs.slice(-2).every((entry) => entry.required)).toBe(true);
    expect(await readFile(f.files.validation, "utf8")).toBe(before);
    expect(f.record).toEqual(originalRecord);
    expect(next.record.aggregate.work_items.kernel).toMatchObject({
      state: "EXECUTING",
      attempt: 2,
      validation: null,
    });
    expect(Object.keys(next.record.aggregate.mutation_receipts)).toEqual(
      expect.arrayContaining(Object.keys(originalRecord.aggregate.mutation_receipts)),
    );
    await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow("stale");
    expect(f.apply).toHaveBeenCalledOnce();
  });

  it.each(["result", "validation", "command", "native"] as const)(
    "rejects missing %s before mutation",
    async (file) => {
      const f = await nativeFixture();
      await rm(f.files[file]);
      await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow();
      expect(f.apply).not.toHaveBeenCalled();
    },
  );

  it.each(["result", "validation", "command", "native"] as const)(
    "rejects tampered %s before mutation",
    async (file) => {
      const f = await nativeFixture();
      const value = JSON.parse(await readFile(f.files[file], "utf8")) as Record<string, unknown>;
      if (file === "validation") value.result_digest = k.kernelDigest("wrong");
      else if (file === "command") value.command = {};
      else value.tampered = true;
      await writeFile(f.files[file], JSON.stringify(value));
      await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow();
      expect(f.apply).not.toHaveBeenCalled();
    },
  );

  it.each([
    "task_id",
    "repository_identity",
    "plan_digest",
    "contract_digest",
    "work_item_id",
  ] as const)("rejects unrelated rework %s", async (field) => {
    const f = await nativeFixture();
    const next = await f.recover();
    next.order.canonical_binding = {
      ...next.order.canonical_binding!,
      [field]: k.kernelDigest("wrong"),
    };
    await expect(
      withKernelReworkEvidence(next.order, next.directory, next.record),
    ).rejects.toThrow();
  });

  it.each(["receipt", "native", "validation"] as const)(
    "rejects %s tampering at use time",
    async (which) => {
      const f = await nativeFixture();
      const next = await f.recover();
      const file = which === "receipt" ? next.receiptPath : f.files[which];
      const value = JSON.parse(await readFile(file, "utf8")) as Record<string, unknown>;
      value.tampered = true;
      await writeFile(file, JSON.stringify(value));
      await expect(
        withKernelReworkEvidence(next.order, next.directory, next.record),
      ).rejects.toThrow();
    },
  );
});
