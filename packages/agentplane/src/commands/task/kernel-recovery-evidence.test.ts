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
  amendmentCommand,
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
import { captureKernelSemanticStop } from "./kernel-recovery-evidence.js";

const hash = k.kernelDigest;
const manualActor = { id: "USER", kind: "USER", transport: "manual" } as const;
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
function proposedPlan(revision: number, work_items: k.PlanRecord["work_items"]): k.PlanRecord {
  return {
    revision,
    work_items,
    digest: hash({ revision, work_items }),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
  };
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
function approvePlan(
  record: KernelRecord,
  authority: k.ExecutionAuthority,
  mutation: string,
  actor: k.KernelInput["actor"] = manualActor,
) {
  const plan = record.aggregate.current_plan!;
  return reduceRecord(
    record,
    fixtureInput(
      record,
      {
        kind: "approve_plan",
        plan_revision: plan.revision,
        plan_digest: plan.digest,
        approval_evidence_digest: authority.provenance.evidence_digest,
        authority_mode: "manual_operator",
      },
      mutation,
      authority,
      actor,
    ),
  );
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
async function fixture(nativeStop = false, replan = false) {
  const { root, kernelRoot } = await fixtureRoot("kernel-recovery-");
  const seed = fixtureState("EXECUTING", replan ? hash("claim-1") : "claim-1");
  const item = seed.item;
  let initial = seed.initial;
  if (replan) {
    const current_plan = {
      ...initial.current_plan!,
      digest: hash({ revision: 1, work_items: [item.definition] }),
    };
    const parent = { ...authority, plan_digest: current_plan.digest, repository_identity: repo };
    initial = {
      ...initial,
      current_plan,
      authority_lineage: [
        {
          authority: { ...parent, digest: k.authorityDigest(parent) },
          approval_mode: "manual_operator",
          observation: null,
        },
      ],
    };
  }
  const oldId = hash("previous-work-order");
  const stopId = `semantic-stop:${oldId}`;
  const stopInput = {
    ...input(initial, { ...transitionCommand(initial, "block"), claim_id: item.claim_id }, stopId),
    authority: initial.authority_lineage?.at(-1)?.authority ?? authority,
  };
  const binding = bindingFor(
    initial,
    "kernel",
    repo,
    stopInput.repository_fingerprint,
    authority.digest,
  );
  const oldDirectory = path.join(kernelRoot, "exchanges", initial.id, oldId.slice(7));
  await mkdir(oldDirectory, { recursive: true });
  const resultPath = path.join(oldDirectory, "received-result.json");
  await writeJSON(resultPath, {
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: oldId,
    status: "blocked",
    summary: "Required actionlint executable is missing.",
    findings: [],
    uncertainty: [],
    blocker: { summary: "Install actionlint." },
    canonical_binding: binding,
  });
  const savedInput = nativeStop
    ? {
        ...stopInput,
        command: {
          ...stopInput.command,
          semantic_result_digest: hash(await readJSON(resultPath)),
        },
      }
    : stopInput;
  const stopped = k.reduceTaskCommand(savedInput);
  if (stopped.kind !== "accepted") throw new Error("fixture stop failed");
  let record = makeKernelRecord(repo, stopped.aggregate, stopped.events);
  const { aggregate: _state, ...saved } = savedInput;
  await writeJSON(path.join(oldDirectory, "semantic-stop-command.json"), saved);
  if (replan) record = approveReplan(record, await readJSON(resultPath), oldId);
  const recovery = operatorFixture(root, kernelRoot, record, binding);
  return { ...(await recovery.recover()), resultPath };
}
function approveReplan(
  initial: KernelRecord,
  result: unknown,
  workOrderId: k.Sha256Digest,
  workItemId = "kernel",
) {
  let record = initial;
  const parent = record.aggregate.authority_lineage!.at(-1)!.authority;
  const item = record.aggregate.work_items[workItemId]!;
  const request: k.ProspectiveScopeRequest = {
    task_id: record.aggregate.id,
    record_digest: record.digest,
    task_revision: record.aggregate.revision,
    plan_revision: parent.plan_revision,
    plan_digest: parent.plan_digest,
    work_item_id: workItemId,
    attempt: item.attempt,
    claim_id: item.claim_id!,
    contract_digest: item.definition.contract_digest!,
    work_order_id: workOrderId,
    result_digest: hash(result),
    result_authentication: "native_stop_receipt",
    stop_receipt_digest: hash(
      record.aggregate.mutation_receipts[String(`semantic-stop:${workOrderId}`)],
    ),
    parent_authority_digest: parent.digest,
    repository_fingerprint: parent.repository_fingerprint,
    intake_before_digest: hash("before"),
    intake_after_digest: hash("after"),
    scope_roots: ["fixture.test.ts"],
    repository_effects: [],
  };
  const child = {
    ...parent,
    scope_roots: [...parent.scope_roots, ...request.scope_roots].toSorted(),
    provenance: {
      ...parent.provenance,
      kind: "USER" as const,
      actor_id: "USER",
      parent_authority_digest: parent.digest,
    },
  };
  const grant: k.CanonicalAuthorityRecord = {
    authority: { ...child, digest: k.authorityDigest(child) },
    approval_mode: "manual_operator",
    observation: {
      kind: "prospective_scope_request",
      evidence_digest: k.prospectiveScopeApprovalEvidence(request, "USER"),
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: [],
      request_digest: hash(request),
      scope_request: request,
    },
  };
  const apply = (
    command: FixtureCommand,
    mutation: string,
    authority: k.ExecutionAuthority | null,
    actor: k.KernelInput["actor"] = manualActor,
  ) => {
    record = reduceRecord(record, fixtureInput(record, command, mutation, authority, actor));
  };
  apply({ kind: "approve_scope_request", record: grant }, `scope-request:${hash(request)}`, null);
  const revision = parent.plan_revision + 1;
  const work_items = record.aggregate.current_plan!.work_items;
  const proposal = proposedPlan(revision, work_items);
  const planning = {
    ...parent,
    scope_roots: [],
    repository_effects: [],
    external_effects: [],
    capabilities: [],
    resources: [],
    provenance: {
      kind: "SYSTEM" as const,
      actor_id: "controller",
      evidence_digest: hash("planning"),
      parent_authority_digest: null,
    },
  };
  apply(
    { kind: "propose_plan", plan: proposal },
    `result:${hash("replanned-result")}`,
    { ...planning, digest: k.authorityDigest(planning) },
    { id: "controller", kind: "SYSTEM", transport: "managed" },
  );
  const evidence = hash("new USER approval");
  const approved = {
    ...grant.authority,
    plan_revision: revision,
    plan_digest: proposal.digest,
    provenance: {
      kind: "USER" as const,
      actor_id: "USER",
      evidence_digest: evidence,
      parent_authority_digest: null,
    },
  };
  record = approvePlan(
    record,
    { ...approved, digest: k.authorityDigest(approved) },
    "approve-replan",
  );
  return record;
}

async function unchangedHistoryFixture(amendIntermediate = false, finalAmendment = false) {
  const { kernelRoot } = await fixtureRoot("kernel-target-recovery-");
  const contract = {
    role: "EXECUTOR" as const,
    objective: "Recover blocked work",
    acceptance_criteria: ["Evidence is authentic"],
    verification_commands: [],
  };
  const documents = {
    intent: { objective: "Recover work", context: "Preserve approved target history" },
    contracts: { [String(hash(contract))]: contract },
  };
  const definition = {
    ...runtime("EXECUTING").definition,
    contract_digest: hash(contract),
    execution_requirements: {
      ...runtime("EXECUTING").definition.execution_requirements,
      resources: [],
    },
  };
  const other = { ...definition, id: "other" };
  const work_items = [definition, other];
  const plan = { ...aggregate().current_plan!, ...proposedPlan(1, work_items) };
  let parent = {
    ...authority,
    plan_digest: plan.digest,
    repository_identity: repo,
    provenance: { ...authority.provenance, actor_id: "USER" },
  };
  parent = { ...parent, digest: k.authorityDigest(parent) };
  let record = makeKernelRecord(
    parent.repository_identity,
    aggregate({
      state: "AWAITING_PLAN_APPROVAL",
      current_plan: plan,
      authority_lineage: [],
      intent_digest: hash(documents.intent),
      work_items: {
        kernel: { ...runtime("EXECUTING"), definition, claim_id: hash("target-claim") },
        other: {
          ...runtime(amendIntermediate ? "READY" : "EXECUTING"),
          definition: other,
          attempt: amendIntermediate ? 0 : 1,
          claim_id: amendIntermediate ? null : hash("other-claim"),
        },
      },
    }),
    [],
    documents,
  );
  const user = { ...manualActor, capabilities: ["repository_write"] } as const;
  function apply(command: k.TaskCommand, mutationId: string, actor: k.KernelInput["actor"] = user) {
    record = reduceRecord(record, fixtureInput(record, command, mutationId, parent, actor));
  }
  record = approvePlan(record, parent, "initial-target-approval", user);
  async function stop(workItemId: string) {
    const item = record.aggregate.work_items[workItemId]!;
    const orderId = hash(`stop-${workItemId}`);
    const result = {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: orderId,
      status: "blocked",
      summary: "The prerequisite needs repair.",
      findings: [],
      uncertainty: [],
      blocker: { summary: "Repair the prerequisite." },
      canonical_binding: bindingFor(
        record.aggregate,
        workItemId,
        repo,
        parent.repository_fingerprint,
        parent.digest,
      ),
    };
    const command = {
      ...transitionCommand(record.aggregate, "block"),
      work_item_id: workItemId,
      claim_id: item.claim_id,
      semantic_result_digest: hash(result),
    };
    const directory = path.join(kernelRoot, "exchanges", record.aggregate.id, orderId.slice(7));
    await mkdir(directory, { recursive: true });
    const resultPath = path.join(directory, "received-result.json");
    const commandPath = path.join(directory, "semantic-stop-command.json");
    await writeJSON(resultPath, result);
    await writeJSON(commandPath, { command });
    apply(command, `semantic-stop:${orderId}`);
    return { orderId, result, resultPath, commandPath };
  }
  const target = await stop("kernel");
  if (amendIntermediate) {
    const amended = amendmentCommand(record.aggregate, [...work_items, { ...other, id: "extra" }]);
    apply(
      {
        ...amended,
        work_contracts: documents.contracts,
        authority_delta_digest: k.planScopeExpansionApprovalDigest({
          task_id: record.aggregate.id,
          current_plan_digest: plan.digest,
          amended_plan_digest: amended.amended_plan.digest,
          actor_id: "USER",
        }),
      },
      "target-preserving-amendment",
    );
    const current = record.aggregate.current_plan!;
    const contents = {
      ...parent,
      plan_revision: current.revision,
      plan_digest: current.digest,
      provenance: {
        ...parent.provenance,
        kind: "SYSTEM" as const,
        actor_id: "agentplane:kernel-controller",
        parent_authority_digest: parent.digest,
      },
    };
    const child: k.CanonicalAuthorityRecord = {
      authority: { ...contents, digest: k.authorityDigest(contents) },
      approval_mode: null,
      observation: {
        kind: "plan_amendment",
        previous_fingerprint: parent.repository_fingerprint,
        changed_paths: [],
        added_scope_roots: [],
        evidence_digest: hash("native target-preserving amendment"),
      },
    };
    record = reduceRecord(
      record,
      fixtureInput(
        record,
        { kind: "continue_authority", record: child },
        "target-preserving-continuation",
        parent,
        {
          id: "agentplane:kernel-controller",
          kind: "SYSTEM",
          transport: "host",
          capabilities: ["authority.observe"],
        },
      ),
    );
    parent = child.authority;
    if (finalAmendment) return { record, kernelRoot, target, unrelated: target };
    record = claimAndBegin(record, "amended-other-", parent, {
      id: "other",
      claim: hash("other-claim"),
      actor: user,
    });
  }
  const unrelated = await stop("other");
  record = approveReplan(record, unrelated.result, unrelated.orderId, "other");
  parent = record.aggregate.authority_lineage!.at(-1)!.authority;
  apply(
    {
      ...transitionCommand(record.aggregate, "resume"),
      work_item_id: "other",
      claim_id: record.aggregate.work_items.other!.claim_id,
    },
    "other-resume",
  );
  record = claimAndBegin(record, "other-", parent, {
    id: "other",
    claim: hash("other-new-claim"),
    actor: user,
  });
  return { record, kernelRoot, target, unrelated };
}

describe("target-preserving approved Plan recovery", () => {
  it.each(["approved", "intermediate", "final"])(
    "selects the authentic target with %s plan history",
    async (kind) => {
      const f = await unchangedHistoryFixture(kind !== "approved", kind === "final");
      expect(f.record.aggregate.work_items.other).toMatchObject(
        kind === "final" ? { state: "READY", attempt: 0 } : { state: "EXECUTING", attempt: 2 },
      );
      expect(f.record.aggregate.work_items.kernel).toMatchObject({ state: "BLOCKED", attempt: 1 });
      expect(await captureKernelSemanticStop(f.kernelRoot, f.record, "kernel")).toEqual({
        work_order_id: f.target.orderId,
        result_digest: hash(f.target.result),
        result_authentication: "native_stop_receipt",
      });
    },
  );
  it.each(
    [false, true].flatMap((final) =>
      ["definition", "missing", "forged", "duplicate", "cross-plan", "history"].map((kind) => ({
        final,
        kind,
      })),
    ),
  )("rejects $kind amendment evidence (final=$final)", async ({ final, kind }) => {
    const f = await unchangedHistoryFixture(true, final);
    const amended = final ? f.record.aggregate.current_plan! : f.record.aggregate.plan_history[1]!;
    const event = f.record.events.find((entry) => entry.kind === "plan_amended")!;
    const edits: Record<string, () => unknown> = {
      missing: () => (f.record.events = f.record.events.filter((entry) => entry !== event)),
      duplicate: () => f.record.events.push(event),
      "cross-plan": () => (amended.approval_evidence_digest = hash("another plan")),
      forged: () =>
        (f.record.aggregate.mutation_receipts[event.mutation_id]!.command_digest = hash("forged")),
    };
    if (kind === "definition") {
      amended.work_items[0]!.expected_outputs = ["changed target"];
      amended.digest = hash({ revision: amended.revision, work_items: amended.work_items });
    } else if (kind === "history") f.record.aggregate.plan_history.splice(final ? 0 : 1, 1);
    else edits[kind]!();
    await expect(captureKernelSemanticStop(f.kernelRoot, f.record, "kernel")).rejects.toThrow();
  });
  const historyCases: [
    string,
    (state: k.TaskAggregate, record: KernelRecord, approvals: KernelRecord["events"]) => unknown,
  ][] = [
    ["initial", (_s, r, a) => (r.events = r.events.filter((e) => e !== a[0]!))],
    ["current", (_s, r, a) => (r.events = r.events.filter((e) => e !== a.at(-1)!))],
    ["duplicate", (_s, r, a) => r.events.push(a[0]!)],
    ["receipt", (s, _r, a) => (s.mutation_receipts[a[0]!.mutation_id]!.event_digests = [])],
    ["authority", (s) => (s.authority_lineage![0]!.authority.digest = hash("tampered"))],
    ["definition", (s) => (s.plan_history[0]!.work_items[0]!.expected_outputs = ["changed"])],
    [
      "missing-target",
      (s) => (s.plan_history[0]!.work_items = [s.plan_history[0]!.work_items[1]!]),
    ],
    ["claim", (s) => (s.work_items.kernel!.claim_id = hash("stale"))],
    ["attempt", (s) => s.work_items.kernel!.attempt++],
  ];
  it.each(historyCases)("rejects invalid %s target history", async (_kind, change) => {
    const f = await unchangedHistoryFixture();
    change(
      f.record.aggregate,
      f.record,
      f.record.events.filter((event) => event.kind === "plan_approved"),
    );
    await expect(captureKernelSemanticStop(f.kernelRoot, f.record, "kernel")).rejects.toThrow();
  });
  it.each(["target-result", "target-command", "unrelated-command"])(
    "rejects tampered %s before recovery",
    async (kind) => {
      const f = await unchangedHistoryFixture();
      if (kind === "target-result") {
        await writeJSON(f.target.resultPath, {
          ...f.target.result,
          summary: "Changed retained result.",
        });
      } else {
        const file = kind === "target-command" ? f.target.commandPath : f.unrelated.commandPath;
        const saved = await readJSON<{ command: k.TaskCommand }>(file);
        await writeJSON(file, { command: { ...saved.command, expected_task_revision: 999 } });
      }
      await expect(captureKernelSemanticStop(f.kernelRoot, f.record, "kernel")).rejects.toThrow();
    },
  );
});

describe("semantic stop recovery evidence", () => {
  it("recovers an authenticated old stop after genuine USER scope approval and approved replan", async () => {
    const f = await fixture(true, true);
    const stopped = await readJSON<{
      canonical_binding: { plan_digest: string; plan_revision: number };
    }>(f.resultPath);
    expect(f.order.canonical_binding!.plan_digest).not.toBe(stopped.canonical_binding.plan_digest);
    expect(f.order.canonical_binding!.plan_revision).toBe(
      stopped.canonical_binding.plan_revision + 1,
    );
    const order = await withKernelReworkEvidence(f.order, f.directory, f.record);
    expectInputs(order, [f.resultPath, f.receiptPath]);
  });
  it.each(["plan_digest", "plan_revision", "stale_plan"] as const)(
    "rejects incoming %s before reading recovery evidence",
    async (mismatch) => {
      const f = await fixture(true, true);
      const stopped = await readJSON<{
        canonical_binding: { plan_digest: string; plan_revision: number };
      }>(f.resultPath);
      const binding = f.order.canonical_binding!;
      f.order.canonical_binding = {
        ...binding,
        ...(mismatch === "plan_digest"
          ? { plan_digest: hash("unrelated") }
          : mismatch === "plan_revision"
            ? { plan_revision: binding.plan_revision + 1 }
            : {
                plan_digest: stopped.canonical_binding.plan_digest,
                plan_revision: stopped.canonical_binding.plan_revision,
              }),
      };
      await rm(f.receiptPath);
      await expect(withKernelReworkEvidence(f.order, f.directory, f.record)).rejects.toThrow(
        "Incoming recovery WorkOrder does not bind the current Plan",
      );
    },
  );
  it.each([false, true])(
    "issues a schema-valid new WorkOrder after blocked result and real operator recovery (native=%s)",
    async (nativeStop) => {
      const f = await fixture(nativeStop);
      const receipt = await readJSON<{
        semantic_stop: { result_authentication: string };
      }>(f.receiptPath);
      expect(receipt.semantic_stop.result_authentication).toBe(
        nativeStop ? "native_stop_receipt" : "legacy_current_retained_content",
      );
      const order = await withKernelReworkEvidence(f.order, f.directory, f.record);
      expect(order.canonical_binding).toMatchObject({
        phase: "implementation",
        attempt: 2,
        claim_id: "claim-2",
      });
      expectInputs(order, [f.resultPath, f.receiptPath]);
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
      const receipt = await readJSON<{
        semantic_stop: { result_authentication?: string };
      }>(f.receiptPath);
      expect(receipt.semantic_stop.result_authentication).toBe("legacy_current_retained_content");
      if (authentication === undefined) delete receipt.semantic_stop.result_authentication;
      else receipt.semantic_stop.result_authentication = authentication;
      // Rebind the fixture receipt so the schema/authentication guard, not a stale hash, is tested.
      const digest = hash(receipt);
      const id = `work-item-resume:${digest}`;
      f.record.aggregate.mutation_receipts[id] = f.record.aggregate.mutation_receipts[f.receiptId]!;
      delete f.record.aggregate.mutation_receipts[f.receiptId];
      await writeJSON(path.join(path.dirname(f.receiptPath), `${digest.slice(7)}.json`), receipt);
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
  it.each(
    ["missing", "tampered"].flatMap((operation) =>
      ["receipt", "result"].map((which) => ({ operation, which })),
    ),
  )("rejects $operation $which evidence", async ({ operation, which }) => {
    const f = await fixture();
    const file = which === "receipt" ? f.receiptPath : f.resultPath;
    if (operation === "missing") await rm(file);
    else {
      const value = await readJSON(file);
      if (which === "receipt") value.note = "Changed operator resolution.";
      else value.summary = "Changed stop reason.";
      await writeJSON(file, value);
    }
    await expect(withKernelReworkEvidence(f.order, f.directory, f.record)).rejects.toThrow();
  });
  it.each(unrelatedFields)("rejects an unrelated %s binding", async (field) => {
    const f = await fixture();
    f.order.canonical_binding = {
      ...f.order.canonical_binding!,
      [field]: field === "plan_revision" ? 99 : hash("different"),
    };
    await expect(withKernelReworkEvidence(f.order, f.directory, f.record)).rejects.toThrow();
  });
  it("rejects recovery from an older attempt", async () => {
    const f = await fixture();
    f.order.canonical_binding = { ...f.order.canonical_binding!, attempt: 3, claim_id: "claim-3" };
    await expect(withKernelReworkEvidence(f.order, f.directory, f.record)).rejects.toThrow(
      "retained review",
    );
  });
});

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
    validation: path.join(directory, "validation.json"),
    command: path.join(directory, "validation-command.json"),
    native: path.join(directory, `native-validation-${native.input_digest.slice(7)}.json`),
  };
  await writeJSON(files.result, result);
  await writeJSON(files.native, native);
  return { ...operatorFixture(root, kernelRoot, state.record, binding, true), files };
}

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
  it.each(
    ["missing", "tampered"].flatMap((operation) =>
      (["result", "validation", "command", "native"] as const).map((file) => ({ operation, file })),
    ),
  )("rejects $operation $file before mutation", async ({ operation, file }) => {
    const f = await nativeFixture();
    if (operation === "missing") await rm(f.files[file]);
    else {
      const value = await readJSON(f.files[file]);
      if (file === "validation") value.result_digest = hash("wrong");
      else if (file === "command") value.command = {};
      else value.tampered = true;
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
