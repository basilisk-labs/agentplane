import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { buildAgentWorkOrderV2ValidFixture } from "../../../../core/src/runner/agent-work-order-fixtures.js";
import {
  aggregate,
  authority,
  input,
  runtime,
  transitionCommand,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { makeKernelRecord, type KernelRecord } from "../../adapters/task-backend/kernel-record.js";
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
  nativeValidationInput,
  recordKernelValidation,
  type InspectionBinding,
  type KernelNativeValidationEvidence,
} from "./kernel-inspection-validation.js";
import { withKernelReworkEvidence } from "./kernel-exchange.js";
import { authenticNativePlanCorrection } from "./kernel-recovery-lineage.js";

const hash = k.kernelDigest;
const repo = hash("repo");
const contractDigest = hash("contract");
const fp = hash("repository-state");
const unrelatedFields = [
  "task_id",
  "repository_identity",
  "plan_digest",
  "plan_revision",
  "contract_digest",
  "work_item_id",
] as const;
const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
  vi.clearAllMocks();
});

async function fixtureRoot(prefix: string) {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  roots.push(root);
  return { root, kernelRoot: path.join(root, "agentplane", "kernel") };
}
function claimAndBegin(
  record: KernelRecord,
  prefix = "",
  currentAuthority = record.aggregate.authority_lineage?.at(-1)?.authority ?? authority,
  target?: { id: string; claim: string; actor: k.KernelInput["actor"] },
) {
  for (const action of ["claim", "begin"] as const) {
    record = reduceRecord(record, {
      ...input(
        record.aggregate,
        {
          ...transitionCommand(record.aggregate, action),
          ...(target ? { work_item_id: target.id, claim_id: target.claim } : {}),
        },
        `${prefix}${action}`,
      ),
      authority: currentAuthority,
      ...(target ? { actor: target.actor } : {}),
    });
  }
  return record;
}
function expectInputs(
  order: Awaited<ReturnType<typeof withKernelReworkEvidence>>,
  paths: string[],
) {
  expect(order.required_inputs.slice(-2).map((entry) => entry.path)).toEqual(paths);
  expect(order.required_inputs.slice(-2).every((entry) => entry.required)).toBe(true);
}
function reduceRecord(record: KernelRecord, value: Omit<k.KernelInput, "aggregate">) {
  const reduced = k.reduceTaskCommand({ ...value, aggregate: record.aggregate });
  if (reduced.kind !== "accepted") throw new Error(`fixture command: ${JSON.stringify(reduced)}`);
  return makeKernelRecord(
    record.repository_identity,
    reduced.aggregate,
    [...record.events, ...reduced.events],
    record.documents,
  );
}
type FixtureCommand = {
  [Kind in k.TaskCommand["kind"]]: Omit<
    Extract<k.TaskCommand, { kind: Kind }>,
    "task_id" | "expected_task_revision" | "expected_state_fingerprint"
  >;
}[k.TaskCommand["kind"]];
function fixtureInput(
  record: KernelRecord,
  command: FixtureCommand,
  mutation: string,
  authority: k.ExecutionAuthority | null,
  actor?: k.KernelInput["actor"],
) {
  const {
    action: _action,
    work_item_id: _item,
    claim_id: _claim,
    ...binding
  } = transitionCommand(record.aggregate, "claim");
  const { aggregate: _aggregate, ...value } = input(
    record.aggregate,
    { ...binding, ...command } as k.TaskCommand,
    mutation,
  );
  return { ...value, authority, ...(actor ? { actor } : {}) };
}
async function readJSON<T = Record<string, unknown>>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}
async function writeJSON(file: string, value: unknown) {
  await writeFile(file, JSON.stringify(value));
}
function mockRuntime(root: string, state: { record: KernelRecord }) {
  const apply = vi.fn((value: Omit<k.KernelInput, "aggregate">) => {
    const next = reduceRecord(state.record, value);
    state.record = next;
    return Promise.resolve({ kind: "committed", record: next, receipts: [], replayed: false });
  });
  mocks.commonDir.mockResolvedValue(root);
  mocks.create.mockResolvedValue({
    adapter: { read: vi.fn(() => Promise.resolve({ kind: "canonical", record: state.record })) },
    input: vi.fn((payload: FixtureCommand, mutationId: string) => {
      const record = state.record;
      return Promise.resolve(
        fixtureInput(
          record,
          payload,
          mutationId,
          record.aggregate.authority_lineage?.at(-1)?.authority ?? authority,
        ),
      );
    }),
    lifecycle: { apply },
  });
  return apply;
}
function bindingFor(
  initial: k.TaskAggregate,
  workItemId: string,
  repository_identity: k.Sha256Digest,
  repository_fingerprint: k.Sha256Digest,
  authority_digest: k.Sha256Digest,
) {
  const item = initial.work_items[workItemId]!;
  return {
    task_id: initial.id,
    repository_identity,
    repository_fingerprint,
    plan_revision: initial.current_plan!.revision,
    plan_digest: initial.current_plan!.digest,
    phase: "implementation" as const,
    work_item_id: workItemId,
    attempt: item.attempt,
    claim_id: item.claim_id!,
    contract_digest: item.definition.contract_digest!,
    authority_digest,
  };
}
function reworkArtifacts(
  kernelRoot: string,
  record: KernelRecord,
  binding: ReturnType<typeof bindingFor>,
  id: k.Sha256Digest,
) {
  const order = buildAgentWorkOrderV2ValidFixture();
  const taskId = record.aggregate.id;
  order.task = {
    ...order.task,
    id: taskId,
    revision: record.aggregate.revision,
    work_item_id: "kernel",
  };
  const { digest: _digest, ...contents } = order.state_fingerprint;
  const updated = { ...contents, task_id: taskId, task_revision: record.aggregate.revision };
  order.state_fingerprint = { ...updated, digest: hash(updated) };
  order.canonical_binding = {
    ...binding,
    plan_digest: record.aggregate.current_plan!.digest,
    plan_revision: record.aggregate.current_plan!.revision,
    attempt: 2,
    claim_id: "claim-2",
  };
  order.work_order_id = id;
  const directory = path.join(kernelRoot, "exchanges", taskId, id.slice(7));
  const receiptId = Object.keys(record.aggregate.mutation_receipts).find((id) =>
    id.startsWith("work-item-resume:"),
  )!;
  const receiptName = receiptId.slice("work-item-resume:sha256:".length) + ".json";
  const receiptPath = path.join(kernelRoot, "recoveries", taskId, receiptName);
  return { record, order, directory, receiptPath, receiptId };
}
function operatorFixture(
  root: string,
  kernelRoot: string,
  initial: KernelRecord,
  binding: ReturnType<typeof bindingFor>,
  native = false,
) {
  const state = { record: initial };
  const opts = {
    taskId: state.record.aggregate.id,
    workItemId: "kernel",
    stateDigest: state.record.digest,
    by: "USER",
    note: native
      ? "Approved parser repair now supports the original check."
      : "Installed and verified actionlint.",
  };
  const apply = mockRuntime(root, state);
  const recover = async () => {
    await cmdWorkItemResume({} as never, opts);
    state.record = claimAndBegin(state.record, native ? "new-" : "");
    return reworkArtifacts(
      kernelRoot,
      state.record,
      binding,
      hash(native ? "new-native-order" : "new-work-order"),
    );
  };
  return { record: initial, opts, apply, recover };
}
function fixtureState(status: Parameters<typeof runtime>[0], claim = "claim-1") {
  const item = { ...runtime(status), claim_id: claim };
  item.definition = { ...item.definition, contract_digest: contractDigest };
  return {
    item,
    initial: aggregate({
      work_items: { kernel: item },
      current_plan: { ...aggregate().current_plan!, work_items: [item.definition] },
    }),
  };
}
async function nativeFixture() {
  const { root, kernelRoot } = await fixtureRoot("kernel-native-recovery-");
  const { item, initial } = fixtureState("INSPECTING");
  const oldId = hash("native-previous-order");
  const binding = bindingFor(initial, "kernel", repo, fp, authority.digest);
  const result = {
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: oldId,
    status: "completed",
    summary: "Implementation ready",
    findings: [],
    uncertainty: [],
    canonical_binding: binding,
    canonical_outputs: [{ id: "kernel-source", kind: "source", digest: hash("source") }],
  };
  item.result_digest = hash(result);
  const inspection: InspectionBinding = {
    ...binding,
    phase: "inspection",
    result_digest: item.result_digest,
  };
  const { input: nativeInput } = nativeValidationInput({
    command: { resolvedProject: { gitRoot: root } } as Parameters<
      typeof nativeValidationInput
    >[0]["command"],
    binding: inspection,
    commands: ["missing-check"],
    repositoryEvidence: null,
  });
  const native: KernelNativeValidationEvidence = {
    schema_version: 1,
    kind: "kernel_native_validation",
    input: nativeInput,
    input_digest: hash(nativeInput),
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
    native_evidence_digest: hash(native),
    status: "BLOCKED",
    checks: native.checks,
    repository_evidence: null,
  };
  const state = { record: makeKernelRecord(binding.repository_identity, initial, []) };
  mockRuntime(root, state);
  const directory = path.join(kernelRoot, "exchanges", initial.id, oldId.slice(7));
  await recordKernelValidation({
    runtime: (await mocks.create()) as Parameters<typeof recordKernelValidation>[0]["runtime"],
    directory,
    binding: inspection,
    evidence,
    validation,
    mutationId: `validation:${oldId}`,
  });
  const files = {
    result: path.join(directory, "received-result.json"),
    order: path.join(directory, "work-order.json"),
    validation: path.join(directory, "validation.json"),
    command: path.join(directory, "validation-command.json"),
    native: path.join(directory, `native-validation-${native.input_digest.slice(7)}.json`),
  };
  const issued = buildAgentWorkOrderV2ValidFixture();
  issued.work_order_id = oldId;
  issued.task.id = initial.id;
  issued.task.work_item_id = "kernel";
  issued.task.revision = initial.revision;
  const { digest: _issuedDigest, ...issuedFingerprint } = issued.state_fingerprint;
  const issuedState = {
    ...issuedFingerprint,
    task_id: initial.id,
    task_revision: initial.revision,
  };
  issued.state_fingerprint = { ...issuedState, digest: hash(issuedState) };
  issued.canonical_binding = binding;
  await writeJSON(files.order, issued);
  await writeJSON(files.result, result);
  await writeJSON(files.native, native);
  return { ...operatorFixture(root, kernelRoot, state.record, binding, true), files };
}
async function correctedNativePlanFixture() {
  const { kernelRoot } = await fixtureRoot("native-check-correction-");
  const oldCheck = "Unlaunchable declared check";
  const newCheck =
    "bunx vitest run packages/agentplane/src/commands/task/kernel-recovery-evidence.test.ts";
  const oldContract = {
    role: "EXECUTOR" as const,
    objective: "Validate implementation",
    acceptance_criteria: ["Validation passes"],
    verification_commands: [oldCheck],
  };
  const newContract = { ...oldContract, verification_commands: [newCheck] };
  const oldDefinition = { ...runtime("READY").definition, contract_digest: hash(oldContract) };
  const newDefinition = { ...oldDefinition, contract_digest: hash(newContract) };
  const source = {
    ...aggregate().current_plan!,
    work_items: [oldDefinition],
    digest: hash({ revision: 1, work_items: [oldDefinition] }),
    state: "SUPERSEDED" as const,
    approval_actor_id: "USER",
  };
  const amended = {
    revision: 2,
    work_items: [newDefinition],
    digest: hash({ revision: 2, work_items: [newDefinition] }),
  };
  const approval = k.planScopeExpansionApprovalDigest({
    task_id: "task-1",
    current_plan_digest: source.digest,
    amended_plan_digest: amended.digest,
    actor_id: "USER",
  });
  const current = {
    ...source,
    ...amended,
    state: "APPROVED" as const,
    approval_actor_id: "USER",
    approval_evidence_digest: approval,
  };
  const parentContents = {
    ...authority,
    plan_digest: source.digest,
    repository_identity: repo,
    scope_roots: oldDefinition.execution_requirements.scope_roots,
    provenance: { ...authority.provenance, actor_id: "USER" },
  };
  const parent = { ...parentContents, digest: k.authorityDigest(parentContents) };
  const childContents = {
    ...parent,
    plan_revision: 2,
    plan_digest: current.digest,
    provenance: { ...parent.provenance, parent_authority_digest: parent.digest },
  };
  const child = { ...childContents, digest: k.authorityDigest(childContents) };
  const oldOrderId = hash("historical-native-check-order");
  const native = { checks: { status: "unsupported", checks: [] } };
  const failedWorkOrder = {
    work_order_id: oldOrderId,
    canonical_binding: { plan_digest: source.digest },
  };
  const acceptedResult = {
    command: { kind: "accept_work_item_result", plan_digest: source.digest },
  };
  const validation = { command: { validation: { evidence_digests: [hash(native)] } } };
  const proof = {
    work_item_id: "kernel",
    failed_work_order_id: oldOrderId,
    previous_command: oldCheck,
    replacement_command: newCheck,
    failed_work_order: failedWorkOrder,
    accepted_result_command_input: acceptedResult,
    validation_command_input: validation,
    native_validation: native,
  };
  const contracts = { [hash(oldContract)]: oldContract, [hash(newContract)]: newContract };
  const command: k.TaskCommand = {
    kind: "amend_plan",
    task_id: "task-1",
    expected_task_revision: 7,
    expected_state_fingerprint: fp,
    plan_revision: 1,
    plan_digest: source.digest,
    amended_plan: amended,
    amendment_digest: hash(amended),
    authority_delta_digest: approval,
    work_contracts: contracts,
    required_check_correction: proof,
  };
  const event: k.DomainEvent = {
    id: "amendment:plan_amended",
    task_id: "task-1",
    mutation_id: "amendment",
    task_revision: 8,
    kind: "plan_amended",
    command_digest: hash(command),
    payload_digest: hash({ kind: "amend_plan", aggregate_revision: 8 }),
    occurred_at: "2026-10-27T00:00:00.000Z",
  };
  const record = makeKernelRecord(
    repo,
    aggregate({
      revision: 8,
      plan_history: [source],
      current_plan: current,
      work_items: { kernel: { ...runtime("READY"), definition: newDefinition, attempt: 2 } },
      authority_lineage: [
        { authority: parent, approval_mode: "manual_operator", observation: null },
        {
          authority: child,
          approval_mode: null,
          observation: {
            kind: "plan_amendment",
            previous_fingerprint: fp,
            changed_paths: [],
            added_scope_roots: [],
            evidence_digest: hash("amendment observation"),
          },
        },
      ],
      mutation_receipts: {
        amendment: {
          mutation_id: "amendment",
          command_digest: event.command_digest,
          before_revision: 7,
          after_revision: 8,
          aggregate_digest: hash("after amendment"),
          event_digests: [hash(event)],
          effect_ids: [],
        },
        [`validation:${oldOrderId}`]: {
          mutation_id: `validation:${oldOrderId}`,
          command_digest: hash(validation),
          before_revision: 6,
          after_revision: 7,
          aggregate_digest: hash("blocked validation"),
          event_digests: [],
          effect_ids: [],
        },
      },
    }),
    [event],
    { intent: { objective: "Validate implementation", context: "Test" }, contracts },
  );
  const oldDirectory = path.join(kernelRoot, "exchanges", "task-1", oldOrderId.slice(7));
  await mkdir(oldDirectory, { recursive: true });
  await Promise.all([
    writeJSON(path.join(oldDirectory, "command-input.json"), acceptedResult),
    writeJSON(path.join(oldDirectory, "work-order.json"), failedWorkOrder),
    writeJSON(path.join(oldDirectory, "validation-command.json"), validation),
    writeJSON(path.join(oldDirectory, `native-validation-${hash(native).slice(7)}.json`), native),
  ]);
  const oldBinding = {
    task_id: "task-1",
    repository_identity: repo,
    repository_fingerprint: fp,
    plan_revision: 1,
    plan_digest: source.digest,
    phase: "implementation" as const,
    work_item_id: "kernel",
    attempt: 1,
    claim_id: "old-claim",
    contract_digest: hash(oldContract),
    authority_digest: parent.digest,
  };
  const newBinding = {
    ...oldBinding,
    plan_revision: 2,
    plan_digest: current.digest,
    attempt: 2,
    claim_id: "new-claim",
    contract_digest: hash(newContract),
    authority_digest: child.digest,
  };
  return { record, oldDirectory, oldOrderId, oldBinding, newBinding, event };
}
describe("approved native check correction lineage", () => {
  it("accepts the original failed check only through the exact USER amendment receipt", async () => {
    const f = await correctedNativePlanFixture();
    expect(
      await authenticNativePlanCorrection(
        f.oldDirectory,
        f.record,
        f.oldBinding,
        f.newBinding,
        7,
        f.oldOrderId,
      ),
    ).toBe(true);
    f.record.aggregate.mutation_receipts.amendment!.command_digest = hash("forged amendment");
    expect(
      await authenticNativePlanCorrection(
        f.oldDirectory,
        f.record,
        f.oldBinding,
        f.newBinding,
        7,
        f.oldOrderId,
      ),
    ).toBe(false);
  });
  it.each([
    "missing-proof",
    "wrong-old-contract",
    "stale-attempt",
    "unapproved-plan",
    "wrong-old-order",
    "wrong-parent-plan",
    "missing-approval-evidence",
  ] as const)("rejects %s before accepting historical validation", async (kind) => {
    const f = await correctedNativePlanFixture();
    switch (kind) {
      case "missing-proof": {
        await rm(path.join(f.oldDirectory, "validation-command.json"));
        break;
      }
      case "wrong-old-contract": {
        f.oldBinding.contract_digest = hash("unrelated contract");
        break;
      }
      case "stale-attempt": {
        f.newBinding.attempt = 4;
        break;
      }
      case "unapproved-plan": {
        f.record.aggregate.current_plan!.approval_actor_id = "SYSTEM";
        break;
      }
      case "wrong-old-order": {
        f.oldOrderId = hash("unrelated native WorkOrder");
        break;
      }
      case "wrong-parent-plan": {
        f.record.aggregate.authority_lineage![0]!.authority.plan_digest = hash("unrelated Plan");
        break;
      }
      case "missing-approval-evidence": {
        f.record.aggregate.current_plan!.approval_evidence_digest = hash("unrelated approval");
        break;
      }
    }
    expect(
      await authenticNativePlanCorrection(
        f.oldDirectory,
        f.record,
        f.oldBinding,
        f.newBinding,
        7,
        f.oldOrderId,
      ),
    ).toBe(false);
  });
});
describe("native infrastructure recovery evidence", () => {
  it("retains the exact BLOCKED evidence through USER recovery and fresh rework issuance", async () => {
    const f = await nativeFixture();
    const before = await readFile(f.files.validation, "utf8");
    const originalRecord = structuredClone(f.record);
    const next = await f.recover();
    const order = await withKernelReworkEvidence(next.order, next.directory, next.record);
    expectInputs(order, [f.files.validation, next.receiptPath]);
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
  it("does not use the correction route to bypass USER resume under the same Plan", async () => {
    const f = await nativeFixture();
    const next = await f.recover();
    delete next.record.aggregate.mutation_receipts[next.receiptId];
    await expect(withKernelReworkEvidence(next.order, next.directory, next.record)).rejects.toThrow(
      "retained review",
    );
  });
  it("rejects a historical WorkOrder with a different claim", async () => {
    const f = await nativeFixture();
    const order = await readJSON(f.files.order);
    const binding = order.canonical_binding as Record<string, unknown>;
    binding.claim_id = hash("unrelated claim");
    await writeJSON(f.files.order, order);
    await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow();
    expect(f.apply).not.toHaveBeenCalled();
  });
  it.each(
    ["missing", "tampered"].flatMap((operation) =>
      (["order", "result", "validation", "command", "native"] as const).map((file) => ({
        operation,
        file,
      })),
    ),
  )("rejects $operation $file before mutation", async ({ operation, file }) => {
    const f = await nativeFixture();
    if (operation === "missing") await rm(f.files[file]);
    else {
      const value = await readJSON(f.files[file]);
      switch (file) {
        case "order": {
          value.work_order_id = hash("wrong");
          break;
        }
        case "validation": {
          value.result_digest = hash("wrong");
          break;
        }
        case "command": {
          value.command = {};
          break;
        }
        default: {
          value.tampered = true;
        }
      }
      await writeJSON(f.files[file], value);
    }
    await expect(cmdWorkItemResume({} as never, f.opts)).rejects.toThrow();
    expect(f.apply).not.toHaveBeenCalled();
  });
  it.each(unrelatedFields)("rejects unrelated rework %s", async (field) => {
    const f = await nativeFixture();
    const next = await f.recover();
    next.order.canonical_binding = {
      ...next.order.canonical_binding!,
      [field]: field === "plan_revision" ? 99 : hash("wrong"),
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
      const value = await readJSON(file);
      value.tampered = true;
      await writeJSON(file, value);
      await expect(
        withKernelReworkEvidence(next.order, next.directory, next.record),
      ).rejects.toThrow();
    },
  );
});
