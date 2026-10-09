import type * as TaskBackend from "../shared/task-backend.js";
import type * as RepositoryCoordinator from "./kernel-repository-coordinator.js";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import {
  aggregate,
  authority as rootAuthority,
  input,
  runtime,
  transitionCommand,
  amendmentCommand,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { buildKernelAgentWorkOrder, resumeKernelWorkOrder } from "./kernel-work-order.js";
import { makeKernelRecord, type KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  isKernelScopeExpansionRecovery,
  withKernelReworkEvidence,
  issueKernelExchange,
} from "./kernel-exchange.js";

const exchangeMocks = vi.hoisted(() => ({ commonDir: vi.fn() }));
vi.mock("../shared/task-backend.js", async (original) => ({
  ...(await original<typeof TaskBackend>()),
  resolveCommandGitCommonDir: exchangeMocks.commonDir,
}));
vi.mock("./kernel-repository-coordinator.js", async (original) => ({
  ...(await original<typeof RepositoryCoordinator>()),
  captureKernelRepositoryBaseline: vi.fn(() =>
    Promise.resolve({
      fixture: "unchanged repository baseline",
    }),
  ),
}));
function sealFingerprint(order: AgentWorkOrderV2) {
  const { digest: _digest, ...contents } = order.state_fingerprint;
  order.state_fingerprint.digest = k.kernelDigest(contents);
}

async function nativeOrder(record: KernelRecord, authority: k.ExecutionAuthority) {
  const implementation = resumeKernelWorkOrder({
    record,
    work_item_id: "kernel",
    authority,
    repository_fingerprint: authority.repository_fingerprint,
  });
  if (!implementation) throw new Error("Expected native implementation WorkOrder");
  return buildKernelAgentWorkOrder({
    command: {
      backendId: "local",
      resolvedProject: { gitRoot: process.cwd() },
      config: {
        paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" },
      },
    } as never,
    record,
    implementation,
    context: {
      repository_identity: record.repository_identity,
      repository_fingerprint: authority.repository_fingerprint,
      ceiling: authority,
    } as never,
  });
}

async function fixture(material = false, preStopContinuation = false) {
  const contract = {
    role: "EXECUTOR" as const,
    objective: "Build source",
    acceptance_criteria: ["Source is correct"],
    verification_commands: [],
  };
  const nextContract = material
    ? { ...contract, objective: "Build source with bounded network reads" }
    : contract;
  const previous = {
    ...runtime("EXECUTING").definition,
    contract_digest: k.kernelDigest(contract),
    execution_requirements: {
      scope_roots: ["src"],
      repository_effects: ["source_code"],
      external_effects: [],
      capabilities: ["repository_write"],
      resources: [],
    },
  } satisfies k.WorkItemDefinition;
  const amended = {
    ...previous,
    contract_digest: k.kernelDigest(nextContract),
    execution_requirements: {
      ...previous.execution_requirements,
      ...(material ? { external_effects: ["network_read"] } : { scope_roots: ["src", "shared"] }),
    },
  };
  const source = {
    ...aggregate().current_plan!,
    approval_actor_id: "USER",
    work_items: [previous],
    digest: k.kernelDigest({ revision: 1, work_items: [previous] }),
  };
  let root = {
    ...rootAuthority,
    plan_digest: source.digest,
    repository_identity: k.kernelDigest("repo"),
    scope_roots: ["src"],
    repository_effects: ["source_code"],
    external_effects: ["network_read"],
    resources: [],
    provenance: { ...rootAuthority.provenance, actor_id: "USER" },
  };
  root.digest = k.authorityDigest(root);
  const documents = {
    intent: { objective: "Build source", context: "Bounded exchange recovery." },
    contracts: Object.fromEntries([
      [k.kernelDigest(contract), contract],
      [k.kernelDigest(nextContract), nextContract],
    ]),
  };
  let state = aggregate({
    intent_digest: k.kernelDigest(documents.intent),
    ...(preStopContinuation ? { revision: 142 } : {}),
    current_plan: source,
    authority_lineage: [{ authority: root, approval_mode: "manual_operator", observation: null }],
    work_items: {
      kernel: { ...runtime("EXECUTING"), definition: previous, attempt: 2, claim_id: "old-claim" },
    },
  });
  const events: k.DomainEvent[] = [];
  function apply(value: k.KernelInput) {
    const fingerprint =
      value.command.kind === "continue_authority"
        ? value.command.record.authority.repository_fingerprint
        : root.repository_fingerprint;
    value = {
      ...value,
      repository_fingerprint: fingerprint,
      command: { ...value.command, expected_state_fingerprint: fingerprint },
    };
    const result = k.reduceTaskCommand(value);
    if (result.kind !== "accepted") throw new Error(JSON.stringify(result));
    state = result.aggregate;
    events.push(...result.events);
  }
  const oldOrder = await nativeOrder(
    makeKernelRecord(root.repository_identity, state, events, documents),
    root,
  );
  const oldId = oldOrder.work_order_id;
  if (preStopContinuation) {
    const authority = {
      ...root,
      repository_fingerprint: k.kernelDigest("edited source"),
      provenance: {
        ...root.provenance,
        kind: "SYSTEM" as const,
        actor_id: "agentplane:kernel-controller",
        parent_authority_digest: root.digest,
      },
    };
    authority.digest = k.authorityDigest(authority);
    apply({
      ...input(
        state,
        {
          kind: "continue_authority",
          task_id: state.id,
          expected_task_revision: state.revision,
          expected_state_fingerprint: authority.repository_fingerprint,
          record: {
            authority,
            approval_mode: null,
            observation: {
              kind: "repository_implementation",
              previous_fingerprint: root.repository_fingerprint,
              changed_paths: ["src/change.ts"],
              evidence_digest: k.kernelDigest("native edited source observation"),
            },
          },
        },
        "pre-stop-continuation",
      ),
      authority: root,
      actor: {
        id: "agentplane:kernel-controller",
        kind: "SYSTEM",
        transport: "host",
        capabilities: ["authority.observe"],
      },
    });
    root = authority;
  }
  const stop = {
    ...input(
      state,
      { ...transitionCommand(state, "block"), claim_id: "old-claim" },
      `semantic-stop:${oldId}`,
    ),
    authority: root,
  };
  stop.command.expected_state_fingerprint = root.repository_fingerprint;
  apply(stop);
  const amendment = amendmentCommand(state, [amended]);
  const approval = k.planScopeExpansionApprovalDigest({
    task_id: state.id,
    current_plan_digest: source.digest,
    amended_plan_digest: amendment.amended_plan.digest,
    actor_id: "USER",
  });
  apply({
    ...input(
      state,
      {
        ...amendment,
        authority_delta_digest: approval,
        work_contracts: {
          [String(k.kernelDigest(contract))]: contract,
          [String(k.kernelDigest(nextContract))]: nextContract,
        },
      },
      "amend-fixture",
    ),
    authority: root,
    actor: { id: "USER", kind: "USER", transport: "manual", capabilities: ["repository_write"] },
  });
  const current = state.current_plan!;
  const child = {
    ...root,
    plan_revision: current.revision,
    plan_digest: current.digest,
    scope_roots: material ? ["src"] : ["shared", "src"],
    provenance: {
      ...root.provenance,
      kind: "SYSTEM" as const,
      actor_id: "agentplane:kernel-controller",
      parent_authority_digest: root.digest,
    },
  };
  child.digest = k.authorityDigest(child);
  const continued: k.CanonicalAuthorityRecord = {
    authority: child,
    approval_mode: null,
    observation: {
      kind: "plan_amendment",
      previous_fingerprint: root.repository_fingerprint,
      changed_paths: [],
      added_scope_roots: material ? [] : ["shared"],
      evidence_digest: k.kernelDigest("native amendment observation"),
    },
  };
  apply({
    ...input(
      state,
      {
        kind: "continue_authority",
        task_id: state.id,
        expected_task_revision: state.revision,
        expected_state_fingerprint: root.repository_fingerprint,
        record: continued,
      },
      "continue-fixture",
    ),
    authority: root,
    actor: {
      id: "agentplane:kernel-controller",
      kind: "SYSTEM",
      transport: "host",
      capabilities: ["authority.observe"],
    },
  });
  for (const action of ["claim", "begin"] as const)
    apply({
      ...input(state, { ...transitionCommand(state, action), claim_id: "claim-2" }, action),
      authority: child,
    });
  const record = makeKernelRecord(root.repository_identity, state, events, documents);
  const order = await nativeOrder(record, child);
  const { aggregate: _aggregate, ...stopCommand } = stop;
  return { record, order, oldOrder, stopCommand, approval };
}

describe("canonical exchange scope recovery", () => {
  it("recognizes only the exact USER-approved additive WorkItem scope amendment", async () => {
    const { order, record } = await fixture();
    expect(isKernelScopeExpansionRecovery(order, record)).toBe(true);
    record.aggregate.current_plan!.approval_evidence_digest = k.kernelDigest("wrong");
    expect(isKernelScopeExpansionRecovery(order, record)).toBe(false);
  });
  it("does not treat a repeated attempt alone as scope recovery", async () => {
    const { order, record } = await fixture();
    record.aggregate.plan_history[0]!.work_items[0]!.execution_requirements.scope_roots = [
      "src",
      "shared",
    ];
    expect(isKernelScopeExpansionRecovery(order, record)).toBe(false);
  });
  it("recognizes a material contract/network amendment within its parent ceiling", async () => {
    const { order, record } = await fixture(true);
    expect(isKernelScopeExpansionRecovery(order, record)).toBe(true);
    expect(record.aggregate.work_items.kernel!.attempt).toBe(3);
  });
  it.each([
    "approval",
    "actor",
    "source",
    "plan",
    "contract",
    "attempt",
    "claim",
    "runtime",
    "authority",
    "ceiling",
    "task",
  ])("rejects forged or stale %s binding", async (field) => {
    const { order, record } = await fixture(true);
    const binding = order.canonical_binding!;
    if (field === "approval") record.aggregate.current_plan!.approval_evidence_digest = null;
    if (field === "actor") record.aggregate.current_plan!.approval_actor_id = "POLICY:repository";
    if (field === "source") record.aggregate.plan_history = [];
    if (field === "plan") binding.plan_digest = k.kernelDigest("stale");
    if (field === "contract" && binding.phase === "implementation")
      binding.contract_digest = k.kernelDigest("stale");
    if (field === "attempt" && binding.phase === "implementation") binding.attempt += 1;
    if (field === "claim" && binding.phase === "implementation") binding.claim_id = "stale";
    if (field === "runtime")
      record.aggregate.work_items.kernel!.definition.contract_digest = k.kernelDigest("stale");
    if (field === "authority" && binding.phase === "implementation")
      binding.authority_digest = k.kernelDigest("forged");
    if (field === "ceiling")
      record.aggregate.authority_lineage![0]!.authority.external_effects = [];
    if (field === "task") binding.task_id = "another-task";
    expect(isKernelScopeExpansionRecovery(order, record)).toBe(false);
  });
  it.each(["bare-value", "issued-authority", "lineage"])(
    "rejects a tampered native authority component (%s)",
    async (kind) => {
      const f = await fixture(true, true);
      const authority = f.record.aggregate.authority_lineage!.at(-1)!.authority;
      if (kind === "bare-value") {
        const binding = f.order.canonical_binding;
        if (binding?.phase !== "implementation") throw new Error("Expected implementation binding");
        f.order.state_fingerprint.components.authority.digest = k.kernelDigest({
          issued: binding.authority_digest,
          lineage: authority.digest,
        });
      } else {
        const altered = structuredClone(f.record);
        const issued = { ...authority };
        if (kind === "issued-authority") issued.digest = k.kernelDigest("another issued authority");
        else
          altered.aggregate.authority_lineage!.at(-1)!.authority.digest =
            k.kernelDigest("another lineage");
        const other = await nativeOrder(altered, issued);
        f.order.state_fingerprint.components.authority =
          other.state_fingerprint.components.authority;
      }
      expect(isKernelScopeExpansionRecovery(f.order, f.record)).toBe(false);
      await expect(
        withKernelReworkEvidence(f.order, "/unissued/tampered", f.record),
      ).rejects.toThrow("retained review");
    },
  );
  it.each(["missing", "tampered", "wrong-attempt"])(
    "rejects %s preceding native stop evidence",
    async (kind) => {
      const f = await fixture(true);
      const root = await mkdtemp(path.join(os.tmpdir(), "amended-evidence-"));
      try {
        const oldDirectory = path.join(root, f.oldOrder.work_order_id.slice(7));
        await mkdir(oldDirectory);
        if (kind === "wrong-attempt" && f.oldOrder.canonical_binding?.phase === "implementation") {
          f.oldOrder.canonical_binding.attempt = 1;
        }
        await writeFile(path.join(oldDirectory, "work-order.json"), JSON.stringify(f.oldOrder));
        if (kind !== "missing") {
          if (kind === "tampered") f.stopCommand.command.claim_id = "forged";
          await writeFile(
            path.join(oldDirectory, "semantic-stop-command.json"),
            JSON.stringify(f.stopCommand),
          );
        }
        await expect(
          withKernelReworkEvidence(
            f.order,
            path.join(root, f.order.work_order_id.slice(7)),
            f.record,
          ),
        ).rejects.toThrow();
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    },
  );
  it("rejects forged FAILED validation paired with an unrelated native mutation receipt", async () => {
    const f = await fixture(true);
    const root = await mkdtemp(path.join(os.tmpdir(), "amended-validation-"));
    try {
      const oldDirectory = path.join(root, f.oldOrder.work_order_id.slice(7));
      await mkdir(oldDirectory);
      await writeFile(path.join(oldDirectory, "work-order.json"), JSON.stringify(f.oldOrder));
      const receipt =
        f.record.aggregate.mutation_receipts[String(`semantic-stop:${f.oldOrder.work_order_id}`)]!;
      delete f.record.aggregate.mutation_receipts[
        String(`semantic-stop:${f.oldOrder.work_order_id}`)
      ];
      f.record.aggregate.mutation_receipts[String(`validation:${f.oldOrder.work_order_id}`)] =
        receipt;
      const old = f.oldOrder.canonical_binding!;
      if (old.phase !== "implementation") throw new Error("Expected implementation");
      await writeFile(
        path.join(oldDirectory, "validation.json"),
        JSON.stringify({
          task_id: old.task_id,
          work_item_id: old.work_item_id,
          attempt: old.attempt,
          contract_digest: old.contract_digest,
          repository_fingerprint: old.repository_fingerprint,
          result_digest: k.kernelDigest("result"),
          review_digest: null,
          native_evidence_digest: k.kernelDigest("native"),
          status: "FAILED",
        }),
      );
      await writeFile(
        path.join(oldDirectory, "validation-command.json"),
        JSON.stringify(f.stopCommand),
      );
      await expect(
        withKernelReworkEvidence(
          f.order,
          path.join(root, f.order.work_order_id.slice(7)),
          f.record,
        ),
      ).rejects.toThrow();
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
  it.each(["receipt", "event", "transition", "missing", "stale-issuance"])(
    "rejects %s in the native continuation before stop",
    async (kind) => {
      const f = await fixture(true, true);
      const root = await mkdtemp(path.join(os.tmpdir(), "preceding-continuation-"));
      try {
        const event = f.record.events.find(
          (entry) => entry.mutation_id === "pre-stop-continuation",
        )!;
        if (kind === "receipt")
          f.record.aggregate.mutation_receipts[event.mutation_id]!.command_digest =
            k.kernelDigest("forged");
        if (kind === "event") event.command_digest = k.kernelDigest("forged");
        if (kind === "transition") event.kind = "work_item_transitioned";
        if (kind === "missing")
          f.record.events = f.record.events.filter((entry) => entry !== event);
        if (kind === "stale-issuance") {
          f.oldOrder.task.revision! -= 1;
          f.oldOrder.state_fingerprint.task_revision = f.oldOrder.task.revision;
          sealFingerprint(f.oldOrder);
        }
        const oldDirectory = path.join(root, f.oldOrder.work_order_id.slice(7));
        await mkdir(oldDirectory);
        await writeFile(path.join(oldDirectory, "work-order.json"), JSON.stringify(f.oldOrder));
        await writeFile(
          path.join(oldDirectory, "semantic-stop-command.json"),
          JSON.stringify(f.stopCommand),
        );
        await expect(
          withKernelReworkEvidence(
            f.order,
            path.join(root, f.order.work_order_id.slice(7)),
            f.record,
          ),
        ).rejects.toThrow("retained review");
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    },
  );
  it.each([
    [false, false],
    [true, false],
    [true, true],
  ])(
    "binds first changed-definition attempt and stable replay (material=%s, continuation=%s)",
    async (material, continuation) => {
      const f = await fixture(material, continuation);
      if (continuation) {
        expect(f.oldOrder.task.revision).toBe(142);
        expect(f.stopCommand.command.expected_task_revision).toBe(143);
        expect(
          f.record.events.find((event) => event.mutation_id.startsWith("semantic-stop:"))
            ?.task_revision,
        ).toBe(144);
      }
      const root = await mkdtemp(path.join(os.tmpdir(), "amended-exchange-"));
      try {
        const taskDirectory = path.join(
          root,
          "agentplane",
          "kernel",
          "exchanges",
          f.record.aggregate.id,
        );
        const oldDirectory = path.join(taskDirectory, f.oldOrder.work_order_id.slice(7));
        await mkdir(oldDirectory, { recursive: true });
        await writeFile(path.join(oldDirectory, "work-order.json"), JSON.stringify(f.oldOrder));
        await writeFile(
          path.join(oldDirectory, "semantic-stop-command.json"),
          JSON.stringify(f.stopCommand),
        );
        const directory = path.join(taskDirectory, f.order.work_order_id.slice(7));
        const before = structuredClone(f.record);
        const issued = await withKernelReworkEvidence(f.order, directory, f.record);
        expect(issued.required_inputs.at(-1)?.id).toBe(
          `previous-definition:${f.oldOrder.work_order_id}`,
        );
        expect(await withKernelReworkEvidence(f.order, directory, f.record)).toEqual(issued);
        exchangeMocks.commonDir.mockResolvedValue(root);
        const context = {
          resolvedProject: { gitRoot: root },
          config: { paths: { workflow_dir: ".agentplane/tasks" } },
        } as never;
        const packet = await issueKernelExchange(context, f.order, "host", f.record);
        expect(packet.action.kind).toBe("agent_episode");
        expect(JSON.parse(await readFile(path.join(directory, "work-order.json"), "utf8"))).toEqual(
          issued,
        );
        expect(await issueKernelExchange(context, f.order, "host", f.record)).toEqual(packet);
        await expect(
          issueKernelExchange(context, f.order, "managed", f.record),
        ).rejects.toMatchObject({
          code: "E_HANDOFF",
          context: {
            owner: "host",
            requested_transport: "managed",
            work_order_id: f.order.work_order_id,
            continuation_argv: [
              "agentplane",
              "task",
              "advance",
              f.order.task.id,
              "--result",
              path.join(directory, "result.json"),
              "--agent-json",
            ],
          },
        });
        const owner: unknown = JSON.parse(
          await readFile(path.join(directory, "transport-owner.json"), "utf8"),
        );
        expect(owner).toMatchObject({ transport: "host" });
        expect(f.record).toEqual(before);
        // A real unchanged retry cannot reuse historical approval, even if the
        // old WorkOrder attempt is rewritten to appear immediately preceding.
        for (const action of ["block", "resume", "claim", "begin"] as const) {
          const state = f.record.aggregate;
          const command = {
            ...transitionCommand(state, action),
            expected_state_fingerprint:
              state.authority_lineage!.at(-1)!.authority.repository_fingerprint,
            claim_id:
              action === "claim" || action === "begin"
                ? "claim-4"
                : state.work_items.kernel!.claim_id,
          };
          const result = k.reduceTaskCommand({
            ...input(state, command, `retry-${action}`),
            repository_fingerprint:
              state.authority_lineage!.at(-1)!.authority.repository_fingerprint,
            authority: state.authority_lineage!.at(-1)!.authority,
          });
          if (result.kind !== "accepted") throw new Error(JSON.stringify(result));
          f.record.aggregate = result.aggregate;
          f.record.events.push(...result.events);
        }
        f.order.task.revision = f.record.aggregate.revision;
        if (f.order.canonical_binding?.phase === "implementation") {
          f.order.canonical_binding.attempt = 4;
          f.order.canonical_binding.claim_id = "claim-4";
        }
        if (f.oldOrder.canonical_binding?.phase === "implementation")
          f.oldOrder.canonical_binding.attempt = 3;
        await writeFile(path.join(oldDirectory, "work-order.json"), JSON.stringify(f.oldOrder));
        await expect(withKernelReworkEvidence(f.order, directory, f.record)).rejects.toThrow(
          "retained review",
        );
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    },
  );
});

describe("compact packet network authority", () => {
  it.each(["allowed", "narrowed-ceiling", "planning"] as const)(
    "mirrors the native WorkOrder for %s",
    async (mode) => {
      const root = await mkdtemp(path.join(os.tmpdir(), "network-exchange-"));
      try {
        const contract = {
          role: "EXECUTOR" as const,
          objective: "Read the authorized registry",
          acceptance_criteria: ["No publication"],
          verification_commands: [],
        };
        const item = runtime("EXECUTING");
        const definition = {
          ...item.definition,
          contract_digest: k.kernelDigest(contract),
          execution_requirements: {
            ...item.definition.execution_requirements,
            external_effects: ["network_read"],
          },
        };
        const workItems = [definition];
        const plan = {
          ...aggregate().current_plan!,
          work_items: workItems,
          digest: k.kernelDigest({ revision: 1, work_items: workItems }),
        };
        const intent = {
          objective: contract.objective,
          context: "Exact native network projection",
        };
        const record = makeKernelRecord(
          rootAuthority.repository_identity,
          aggregate({
            intent_digest: k.kernelDigest(intent),
            current_plan: plan,
            work_items: { kernel: { ...item, definition } },
          }),
          [],
          { intent, contracts: { [String(k.kernelDigest(contract))]: contract } },
        );
        const authority = {
          ...rootAuthority,
          plan_digest: plan.digest,
          work_item_id: "kernel",
          external_effects: ["network_read"],
        };
        authority.digest = k.authorityDigest(authority);
        const context = {
          task_id: record.aggregate.id,
          task_revision: record.aggregate.revision,
          repository_identity: authority.repository_identity,
          repository_fingerprint: authority.repository_fingerprint,
          ceiling: {
            ...authority,
            external_effects: mode === "narrowed-ceiling" ? [] : ["network_read"],
          },
        };
        const implementation = resumeKernelWorkOrder({
          record,
          work_item_id: "kernel",
          authority,
          repository_fingerprint: authority.repository_fingerprint,
        });
        if (!implementation) throw new Error("Expected native implementation");
        const command = {
          backendId: "local",
          resolvedProject: { gitRoot: root },
          config: {
            paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" },
          },
        } as never;
        const order = await buildKernelAgentWorkOrder({
          command,
          record,
          context: context as never,
          ...(mode === "planning" ? {} : { implementation }),
        });
        const before = structuredClone(order.authority);
        exchangeMocks.commonDir.mockResolvedValue(root);
        const packet = await issueKernelExchange(command, order, "host", record);
        const schemaPath = path.resolve(
          packet.exchange.directory,
          packet.exchange.result_schema_ref,
        );
        expect(path.relative(root, schemaPath).startsWith("..")).toBe(false);
        expect(JSON.parse(await readFile(schemaPath, "utf8"))).toHaveProperty("$schema");
        const delivered = JSON.parse(
          await readFile(path.join(packet.exchange.directory, "work-order.json"), "utf8"),
        ) as AgentWorkOrderV2;
        expect(order.authority.network).toBe(mode === "allowed" ? "allowed" : "deny");
        expect(packet.authority.network).toBe(order.authority.network);
        expect(delivered.authority).toEqual(before);
        expect(order.authority).toEqual(before);
        expect(order.authority.allowed_tool_classes).not.toContain("network_read");
        expect(order.authority.external_side_effects).toEqual([]);
      } finally {
        await rm(root, { recursive: true, force: true });
      }
    },
  );
});
