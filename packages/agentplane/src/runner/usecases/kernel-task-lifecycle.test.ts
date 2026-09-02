import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LocalBackend, type TaskData } from "../../backends/task-backend.js";
import {
  KernelBackendAdapter,
  type KernelCommandInput,
} from "../../adapters/task-backend/kernel-backend-adapter.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
} from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import {
  readKernelRecord,
  TASK_KERNEL_EXTENSION,
} from "../../adapters/task-backend/kernel-record.js";
import type { KernelWorkContract } from "../../adapters/task-backend/kernel-documents.js";
import { KernelTaskLifecycle } from "./kernel-task-lifecycle.js";

const roots: string[] = [];
afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});
type Payload = k.TaskCommand extends infer C
  ? C extends k.TaskCommand
    ? Omit<C, "task_id" | "expected_task_revision" | "expected_state_fingerprint">
    : never
  : never;
const contract: KernelWorkContract = {
  objective: "Implement canonical lifecycle routing",
  acceptance_criteria: ["Commands retain exact mutation identity"],
  verification_commands: ["bun test"],
  role: "EXECUTOR",
};
async function fixture(kind: "local" | "cloud" = "local") {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-kernel-lifecycle-"));
  roots.push(root);
  let saved: TaskData | null = null;
  const base = makeTaskBackendDouble();
  const backend =
    kind === "local"
      ? new LocalBackend({ dir: root })
      : makeTaskBackendDouble({
          id: "canonical-cloud-fake",
          capabilities: {
            ...base.capabilities,
            canonical_source: "remote",
            atomic_task_record: true,
          },
          getTask: () => Promise.resolve(structuredClone(saved)),
          writeTask: (next, options) => {
            if ((saved?.revision ?? 0) !== options?.expectedRevision)
              return Promise.reject(new Error("CAS conflict"));
            saved = structuredClone(next);
            return Promise.resolve();
          },
        });
  const journey = kernelReplayJourney("direct");
  const seed = journey.steps[0]!.input;
  const adapter = new KernelBackendAdapter(backend, replayRepositoryIdentity);
  const service = new KernelTaskLifecycle(adapter);
  const intent = { objective: journey.task.title, context: journey.task.description! };
  let counter = 0;
  async function input(payload: Payload): Promise<KernelCommandInput> {
    const read = await adapter.read(journey.task.id);
    const aggregate = read.kind === "canonical" ? read.record.aggregate : null;
    const plan = aggregate?.current_plan;
    return {
      ...seed,
      mutation_id: `lifecycle-${++counter}`,
      authority: {
        ...seed.authority!,
        plan_revision: plan?.revision ?? 0,
        plan_digest: plan?.digest ?? seed.authority!.plan_digest,
        work_item_id: "work_item_id" in payload ? payload.work_item_id : null,
      },
      command: {
        ...payload,
        task_id: journey.task.id,
        expected_task_revision: aggregate?.revision ?? 0,
        expected_state_fingerprint: seed.command.expected_state_fingerprint,
      } as k.TaskCommand,
    };
  }
  async function read() {
    const value = await adapter.read(journey.task.id);
    if (value.kind !== "canonical") throw new Error(JSON.stringify(value));
    return value;
  }
  async function apply(payload: Payload) {
    const result = await service.apply(await input(payload));
    expect(result.kind, JSON.stringify(result)).toBe("committed");
    return result;
  }
  async function create() {
    const command = await input({ kind: "capture_intent", intent_digest: k.kernelDigest(intent) });
    expect(await service.create(journey.task, intent, command)).toMatchObject({
      kind: "committed",
      replayed: false,
    });
    return command;
  }
  const definitions: k.WorkItemDefinition[] = ["build", "check"].map((id) => ({
    id,
    contract_digest: k.kernelDigest(contract),
    depends_on: id === "check" ? ["build"] : [],
    required_inputs: id === "check" ? ["built"] : [],
    expected_outputs: [id === "build" ? "built" : "checked"],
    execution_requirements: {
      scope_roots: ["src"],
      repository_effects: ["repository_write"],
      external_effects: [],
      capabilities: ["repository_write"],
      resources: [],
    },
    optional: false,
  }));
  const plan: k.PlanRecord = {
    revision: 1,
    digest: k.kernelDigest({ revision: 1, work_items: definitions }),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
    work_items: definitions,
  };
  async function propose() {
    const proposal = await input({ kind: "propose_plan", plan });
    expect(await service.apply(proposal, [contract])).toMatchObject({ kind: "committed" });
    return proposal;
  }
  async function ready() {
    const capture = await create();
    await propose();
    await apply({
      kind: "approve_plan",
      plan_revision: 1,
      plan_digest: plan.digest,
      approval_evidence_digest: seed.authority!.provenance.evidence_digest,
    });
    await apply({ kind: "materialize_work_items", plan_revision: 1, plan_digest: plan.digest });
    return capture;
  }
  async function begin() {
    await apply({
      kind: "transition_work_item",
      action: "claim",
      work_item_id: "build",
      claim_id: "owner-claim",
    });
    const command = await input({
      kind: "transition_work_item",
      action: "begin",
      work_item_id: "build",
      claim_id: "owner-claim",
    });
    const result = await service.begin(command);
    expect(result.work_order).not.toBeNull();
    return { command, order: result.work_order! };
  }
  return {
    root,
    backend,
    adapter,
    service,
    journey,
    seed,
    intent,
    input,
    read,
    apply,
    create,
    propose,
    ready,
    begin,
    plan,
  };
}

describe("canonical lifecycle application service", () => {
  it.each(["local", "cloud"] as const)(
    "runs creation, plan, claim and receipt on %s without legacy authority",
    async (kind) => {
      const f = await fixture(kind);
      const capture = await f.ready();
      const before = await f.read();
      expect(await f.service.create(f.journey.task, f.intent, capture)).toMatchObject({
        kind: "committed",
        replayed: true,
      });
      expect(await f.read()).toEqual(before);
      expect(before.record.aggregate.work_items.check?.state).toBe("PLANNED");
      const route = await f.service.read(f.journey.task.id, f.seed.repository_fingerprint);
      expect(route.next_action.reason_code).toBe("kernel_work_item_claim_required");
      const { command, order } = await f.begin();
      expect(order.contract).toEqual(contract);
      expect(order.authority.scope_roots).toEqual(["src"]);
      expect(k.compareExecutionAuthority(command.authority!, order.authority)).toEqual({
        ok: true,
      });
      expect(await f.service.begin(command)).toMatchObject({
        result: { kind: "committed", replayed: true },
        work_order: null,
      });
      const resultDigest = k.kernelDigest("implementation");
      const receipt = await f.input({
        kind: "accept_work_item_result",
        plan_revision: 1,
        plan_digest: f.plan.digest,
        work_item_id: "build",
        result_digest: resultDigest,
        output_manifests: [
          {
            id: "built",
            kind: "report",
            digest: k.kernelDigest("output"),
            task_id: order.binding.task_id,
            plan_revision: 1,
            work_item_id: "build",
            attempt: order.binding.attempt,
            repository_fingerprint: order.binding.repository_fingerprint,
          },
        ],
      });
      const beforeReceipt = await f.read();
      for (const invalid of [
        { ...order.binding, attempt: 99 },
        { ...order.binding, claim_id: "foreign-claim" },
        { ...order.binding, contract_digest: k.kernelDigest("foreign-contract") },
        { ...order.binding, repository_fingerprint: k.kernelDigest("stale-repository") },
      ]) {
        expect(await f.service.receiveResult(receipt, invalid)).toMatchObject({
          kind: "unavailable",
          facts: ["result_binding_mismatch"],
        });
        expect(await f.read()).toEqual(beforeReceipt);
      }
      expect(await f.service.receiveResult(receipt, order.binding)).toMatchObject({
        kind: "committed",
        replayed: false,
      });
      expect(
        await f.service.receiveResult(receipt, { ...order.binding, claim_id: "other" }),
      ).toMatchObject({ kind: "rejected", code: "MUTATION_ID_CONFLICT" });
      await f.apply({
        kind: "transition_work_item",
        work_item_id: "build",
        action: "inspect",
        claim_id: "owner-claim",
      });
      await f.apply({
        kind: "record_work_item_validation",
        work_item_id: "build",
        validation: {
          status: "PASSED",
          identity: {
            implementation_identity: resultDigest,
            check_id: "focused",
            command_digest: k.kernelDigest("test"),
            toolchain_digest: k.kernelDigest("toolchain"),
            environment_digest: k.kernelDigest("env"),
          },
          evidence_digests: [k.kernelDigest("log")],
          observed_at: f.seed.occurred_at,
        },
      });
      await f.apply({
        kind: "transition_work_item",
        work_item_id: "build",
        action: "complete",
        claim_id: "owner-claim",
      });
      const completedRead = await f.read();
      const completed = completedRead.record.aggregate.work_items.build;
      const amended = {
        revision: 2,
        work_items: f.plan.work_items,
        digest: k.kernelDigest({ revision: 2, work_items: f.plan.work_items }),
      };
      await f.apply({
        kind: "amend_plan",
        plan_revision: 1,
        plan_digest: f.plan.digest,
        amended_plan: amended,
        amendment_digest: k.kernelDigest(amended),
        authority_delta_digest: null,
      });
      const after = await f.read();
      expect(after.record.aggregate.work_items.build).toEqual(completed);
      expect(after.record.aggregate.work_items.check?.state).toBe("READY");
      expect(await f.service.receiveResult(receipt, order.binding)).toMatchObject({
        kind: "committed",
        replayed: true,
      });
      expect(await f.read()).toEqual(after);
    },
  );

  it.each(["local", "cloud"] as const)(
    "grants one dispatch across competing %s controllers",
    async (kind) => {
      const f = await fixture(kind);
      await f.ready();
      await f.apply({
        kind: "transition_work_item",
        work_item_id: "build",
        action: "claim",
        claim_id: "owner-claim",
      });
      const command = await f.input({
        kind: "transition_work_item",
        work_item_id: "build",
        action: "begin",
        claim_id: "owner-claim",
      });
      expect(await f.service.apply(command)).toMatchObject({
        kind: "unavailable",
        facts: ["begin_boundary_required"],
      });
      const other = new KernelTaskLifecycle(
        new KernelBackendAdapter(f.backend, replayRepositoryIdentity),
      );
      const returned = await Promise.all([f.service.begin(command), other.begin(command)]);
      expect(
        returned.filter((entry) => entry.work_order !== null),
        JSON.stringify(returned),
      ).toHaveLength(1);
      const read = await f.read();
      expect(
        read.record.events.filter((event) => event.mutation_id === command.mutation_id),
      ).toHaveLength(1);
    },
  );

  it("rejects approval by an agent and preserves unapproved state", async () => {
    const f = await fixture();
    await f.create();
    await f.propose();
    const input = await f.input({
      kind: "approve_plan",
      plan_revision: 1,
      plan_digest: f.plan.digest,
      approval_evidence_digest: f.seed.authority!.provenance.evidence_digest,
    });
    const before = await f.read();
    expect(
      await f.service.apply({ ...input, actor: { ...input.actor, kind: "AGENT" } }),
    ).toMatchObject({ kind: "rejected", code: "AUTHORITY_PROVENANCE_ESCALATION" });
    expect(await f.read()).toEqual(before);
  });

  it("rejects contract substitution and missing payloads before persistence", async () => {
    const f = await fixture();
    await f.create();
    const proposal = await f.input({ kind: "propose_plan", plan: f.plan });
    const write = vi.spyOn(f.backend, "writeTask");
    expect(
      await f.service.apply(proposal, [{ ...contract, objective: "Different work" }]),
    ).toMatchObject({ kind: "unavailable" });
    expect(await f.service.apply(proposal)).toMatchObject({ kind: "unavailable" });
    expect(write).not.toHaveBeenCalled();
    expect(await f.read()).toMatchObject({ record: { aggregate: { state: "PLANNING" } } });
  });

  it("does not treat changed acceptance criteria as a non-material refinement", async () => {
    const f = await fixture();
    await f.ready();
    const changed = { ...contract, acceptance_criteria: ["Skip identity validation"] };
    const workItems = f.plan.work_items.map((item) => ({
      ...item,
      contract_digest: k.kernelDigest(changed),
    }));
    const amended = {
      revision: 2,
      work_items: workItems,
      digest: k.kernelDigest({ revision: 2, work_items: workItems }),
    };
    const input = await f.input({
      kind: "amend_plan",
      plan_revision: 1,
      plan_digest: f.plan.digest,
      amended_plan: amended,
      amendment_digest: k.kernelDigest(amended),
      authority_delta_digest: null,
    });
    const before = await f.read();
    expect(await f.service.apply(input, [changed])).toMatchObject({
      kind: "rejected",
      code: "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    });
    expect(await f.read()).toEqual(before);
  });

  it("losing the begin response proves persistence but never grants duplicate dispatch", async () => {
    const f = await fixture();
    await f.ready();
    await f.apply({
      kind: "transition_work_item",
      work_item_id: "build",
      action: "claim",
      claim_id: "owner-claim",
    });
    const wrong = await f.input({
      kind: "transition_work_item",
      work_item_id: "build",
      action: "begin",
      claim_id: "foreign-claim",
    });
    expect(await f.service.begin(wrong)).toMatchObject({
      result: { kind: "unavailable", facts: ["claim_binding_mismatch"] },
      work_order: null,
    });
    const command = await f.input({
      kind: "transition_work_item",
      work_item_id: "build",
      action: "begin",
      claim_id: "owner-claim",
    });
    const write = f.backend.writeTask.bind(f.backend);
    vi.spyOn(f.backend, "writeTask").mockImplementation(async (...args) => {
      await write(...args);
      throw new Error("response lost");
    });
    expect(await f.service.begin(command)).toMatchObject({
      result: { kind: "committed", replayed: true },
      work_order: null,
    });
    expect(await f.read()).toMatchObject({
      record: { aggregate: { work_items: { build: { state: "EXECUTING" } } } },
    });
  });

  it("detects corrupted immutable documents on an independent read", async () => {
    const f = await fixture();
    await f.ready();
    const read = await f.read();
    const record = structuredClone(read.record);
    const contractKey: string = k.kernelDigest(contract);
    record.documents!.contracts[contractKey]!.objective = "Substituted work";
    const { digest: previous, ...contents } = record;
    void previous;
    record.digest = k.kernelDigest(contents);
    expect(
      readKernelRecord(
        { ...read.task, extensions: { [TASK_KERNEL_EXTENSION]: record } },
        replayRepositoryIdentity,
      ),
    ).toMatchObject({ kind: "malformed", reason: "canonical_invariant_violation" });
    const bytes = await readFile(path.join(f.root, f.journey.task.id, "README.md"));
    const independent = await new KernelBackendAdapter(
      new LocalBackend({ dir: f.root }),
      replayRepositoryIdentity,
    ).read(f.journey.task.id);
    expect(independent.kind).toBe("canonical");
    expect(await readFile(path.join(f.root, f.journey.task.id, "README.md"))).toEqual(bytes);
  });

  it("never upgrades a digest-only staged record or a legacy Task on execution", async () => {
    const f = await fixture();
    const input = await f.input({
      kind: "capture_intent",
      intent_digest: k.kernelDigest(f.intent),
    });
    await f.adapter.create(f.journey.task, input);
    const before = await f.read();
    expect(
      await f.service.apply(await f.input({ kind: "propose_plan", plan: f.plan }), [contract]),
    ).toMatchObject({ kind: "unavailable", facts: ["document_migration_required"] });
    expect(await f.read()).toEqual(before);
  });
});
