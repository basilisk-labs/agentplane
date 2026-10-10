import {
  KernelTaskLifecycle,
  type KernelWorkBinding,
} from "../../runner/usecases/kernel-task-lifecycle.js";
import type { KernelCommandInput } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  aggregate,
  authority as rootAuthority,
  input,
  runtime,
  transitionCommand,
  amendmentCommand,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import {
  buildKernelAgentWorkOrder,
  buildKernelStateFingerprint,
  resumeKernelWorkOrder,
} from "./kernel-work-order.js";
import { makeKernelRecord, type KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { authenticatedAmendmentHistory } from "./kernel-rework-proof.js";
import { withKernelReworkEvidence } from "./kernel-exchange.js";
async function nativeOrder(
  record: KernelRecord,
  authority: k.ExecutionAuthority,
  workItem = "kernel",
) {
  const implementation = resumeKernelWorkOrder({
    record,
    work_item_id: workItem,
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

async function fixture(directory: string, sourceChange = true, targetRetry = false) {
  const material = true,
    preStopContinuation = true;
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
  const prerequisite = {
    ...previous,
    id: "prerequisite",
    expected_outputs: ["prerequisite-source"],
  };
  const amended = {
    ...previous,
    depends_on: ["prerequisite"],
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
    ...(preStopContinuation ? { revision: 147 } : {}),
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
  const amendment = amendmentCommand(state, [prerequisite, amended]);
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
  root = child;
  const write = async (dir: string, name: string, value: unknown) => {
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), JSON.stringify(value));
  };
  const transition = (
    action: "claim" | "begin" | "inspect" | "complete",
    mutation = `prerequisite-${action}`,
  ) =>
    apply({
      ...input(
        state,
        {
          ...transitionCommand(state, action),
          work_item_id: "prerequisite",
          claim_id: "prerequisite-claim",
        },
        mutation,
      ),
      authority: root,
    });
  transition("claim");
  transition("begin");
  const prerequisiteOrder = await nativeOrder(
    makeKernelRecord(root.repository_identity, state, events, documents),
    root,
    "prerequisite",
  );
  const sourceDirectory = path.join(directory, prerequisiteOrder.work_order_id.slice(7));
  await write(sourceDirectory, "work-order.json", prerequisiteOrder);
  if (sourceChange) {
    const changed = {
      ...root,
      repository_fingerprint: k.kernelDigest("prerequisite source"),
      provenance: {
        ...root.provenance,
        parent_authority_digest: root.digest,
      },
    };
    changed.digest = k.authorityDigest(changed);
    apply({
      ...input(
        state,
        {
          kind: "continue_authority",
          task_id: state.id,
          expected_task_revision: state.revision,
          expected_state_fingerprint: changed.repository_fingerprint,
          record: {
            authority: changed,
            approval_mode: null,
            observation: {
              kind: "repository_implementation",
              previous_fingerprint: root.repository_fingerprint,
              changed_paths: ["src/prerequisite.ts"],
              evidence_digest: k.kernelDigest("source observation"),
            },
          },
        },
        "prerequisite-continuation",
      ),
      authority: root,
      actor: {
        id: "agentplane:kernel-controller",
        kind: "SYSTEM",
        transport: "host",
        capabilities: ["authority.observe"],
      },
    });
    root = changed;
  }
  const semantic = {
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: prerequisiteOrder.work_order_id,
    canonical_binding: prerequisiteOrder.canonical_binding,
    summary: "Implemented prerequisite",
    status: "completed",
    findings: [],
    uncertainty: [],
  };
  const result = {
    ...input(
      state,
      {
        kind: "accept_work_item_result",
        task_id: state.id,
        expected_task_revision: state.revision,
        expected_state_fingerprint: root.repository_fingerprint,
        work_item_id: "prerequisite",
        plan_revision: state.current_plan!.revision,
        plan_digest: state.current_plan!.digest,
        result_digest: k.kernelDigest(semantic),
        output_manifests: [
          {
            id: "prerequisite-source",
            kind: "source",
            digest: k.kernelDigest("source"),
            task_id: state.id,
            plan_revision: state.current_plan!.revision,
            work_item_id: "prerequisite",
            attempt: 1,
            repository_fingerprint: root.repository_fingerprint,
          },
        ],
      },
      `result:${prerequisiteOrder.work_order_id}`,
    ),
    authority: root,
  };
  const {
    phase: _phase,
    repository_identity: _repository,
    authority_digest: _authority,
    ...workBinding
  } = prerequisiteOrder.canonical_binding!;
  const lifecycle = new KernelTaskLifecycle({
    read: () =>
      Promise.resolve({
        kind: "canonical",
        record: makeKernelRecord(root.repository_identity, state, events, documents),
      }),
    execute: (value: KernelCommandInput) => {
      apply({ ...value, aggregate: state });
      return Promise.resolve({
        kind: "committed",
        record: makeKernelRecord(root.repository_identity, state, events, documents),
        receipts: [],
        replayed: false,
      });
    },
  } as unknown as ConstructorParameters<typeof KernelTaskLifecycle>[0]);
  expect(
    await lifecycle.receiveResult(
      { ...result, repository_fingerprint: root.repository_fingerprint },
      workBinding as KernelWorkBinding,
    ),
  ).toMatchObject({ kind: "committed" });
  await write(sourceDirectory, "command-input.json", result);
  await write(sourceDirectory, "received-result.json", semantic);
  transition("inspect");
  const inspection = structuredClone(prerequisiteOrder);
  inspection.role = "EVALUATOR";
  inspection.task.revision = state.revision;
  inspection.authority.mutation_scope = "none";
  inspection.authority.writable_roots = [];
  inspection.state_fingerprint = await buildKernelStateFingerprint({
    command: {
      backendId: "local",
      resolvedProject: { gitRoot: process.cwd() },
      config: {
        paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" },
      },
    } as never,
    record: makeKernelRecord(root.repository_identity, state, events, documents),
    context: {
      repository_identity: root.repository_identity,
      repository_fingerprint: root.repository_fingerprint,
      ceiling: root,
    } as never,
    authority_digest: root.digest,
  });
  inspection.canonical_binding = {
    ...prerequisiteOrder.canonical_binding!,
    phase: "inspection",
    repository_fingerprint: root.repository_fingerprint,
    result_digest: k.kernelDigest(semantic),
  } as typeof inspection.canonical_binding;
  inspection.work_order_id = k.kernelDigest({
    inspection: inspection.canonical_binding,
    revision: state.revision,
  });
  const inspectionDirectory = path.join(directory, inspection.work_order_id.slice(7));
  await write(inspectionDirectory, "work-order.json", inspection);
  const review = {
    ...semantic,
    work_order_id: inspection.work_order_id,
    canonical_binding: inspection.canonical_binding,
    review: { verdict: "pass" },
  };
  const native = {
    input: {
      task_id: state.id,
      work_item_id: "prerequisite",
      result_digest: k.kernelDigest(semantic),
      repository_fingerprint: root.repository_fingerprint,
    },
    checks: { status: "passed" },
  };
  const validation = {
    status: "PASSED" as const,
    identity: {
      implementation_identity: k.kernelDigest(semantic),
      check_id: "native-and-review",
      command_digest: k.kernelDigest([]),
      toolchain_digest: k.kernelDigest("toolchain"),
      environment_digest: k.kernelDigest("environment"),
    },
    evidence_digests: [k.kernelDigest(native), k.kernelDigest(review)],
    observed_at: "2026-10-06T00:00:00.000Z",
  };
  const validationInput = {
    ...input(
      state,
      {
        kind: "record_work_item_validation",
        task_id: state.id,
        expected_task_revision: state.revision,
        expected_state_fingerprint: root.repository_fingerprint,
        work_item_id: "prerequisite",
        validation,
      },
      `validation:${inspection.work_order_id}`,
    ),
    authority: root,
  };
  apply(validationInput);
  await write(inspectionDirectory, "validation-command.json", validationInput);
  await write(inspectionDirectory, "inspection-result.json", review);
  await write(inspectionDirectory, "validation.json", {
    task_id: state.id,
    work_item_id: "prerequisite",
    attempt: 1,
    contract_digest: prerequisite.contract_digest,
    repository_fingerprint: root.repository_fingerprint,
    result_digest: k.kernelDigest(semantic),
    review_digest: k.kernelDigest(review),
    native_evidence_digest: k.kernelDigest(native),
    status: "PASSED",
    checks: native.checks,
  });
  await write(sourceDirectory, `native-validation-${k.kernelDigest(native).slice(7)}.json`, native);
  transition("complete", `validation-resolution:${k.kernelDigest(validation)}`);
  for (const action of ["claim", "begin"] as const)
    apply({
      ...input(state, { ...transitionCommand(state, action), claim_id: "claim-2" }, action),
      authority: root,
    });
  if (targetRetry) {
    for (const action of ["block", "resume", "claim", "begin"] as const) {
      apply({
        ...input(
          state,
          {
            ...transitionCommand(state, action),
            claim_id: action === "block" ? "claim-2" : action === "resume" ? null : "retry-claim",
          },
          `target-retry-${action}`,
        ),
        authority: root,
      });
    }
  }
  const record = makeKernelRecord(root.repository_identity, state, events, documents);
  const order = await nativeOrder(record, root);
  const { aggregate: _aggregate, ...stopCommand } = stop;
  return {
    record,
    order,
    oldOrder,
    stopCommand,
    approval,
    source: sourceDirectory,
    inspectionDirectory,
  };
}

describe("authenticated prerequisite rework history", () => {
  it("rejects an authenticated native target retry after the closed prerequisite", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "kernel-prerequisite-"));
    try {
      const { record, order } = await fixture(directory, true, true);
      const amendment = record.events.findLast((event) => event.kind === "plan_amended")!;
      expect(record.aggregate.work_items.kernel!.attempt).toBe(4);
      expect(
        await authenticatedAmendmentHistory(
          order,
          path.join(directory, order.work_order_id.slice(7)),
          record,
          amendment,
        ),
      ).toBe(false);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it.each([true, false])(
    "authenticates native prerequisite completion (source continuation: %s)",
    async (sourceChange) => {
      const directory = await mkdtemp(path.join(os.tmpdir(), "kernel-prerequisite-"));
      try {
        const { record, order, oldOrder, stopCommand } = await fixture(directory, sourceChange);
        const amendment = record.events.findLast((event) => event.kind === "plan_amended")!;
        expect(
          record.events.filter((event) => event.task_revision > amendment.task_revision),
        ).toHaveLength(sourceChange ? 10 : 9);
        expect(record.aggregate.revision).toBe(sourceChange ? 160 : 159);
        const target = path.join(directory, order.work_order_id.slice(7));
        expect(await authenticatedAmendmentHistory(order, target, record, amendment)).toBe(true);
        const prior = path.join(directory, oldOrder.work_order_id.slice(7));
        await mkdir(prior, { recursive: true });
        await writeFile(path.join(prior, "work-order.json"), JSON.stringify(oldOrder));
        await writeFile(
          path.join(prior, "semantic-stop-command.json"),
          JSON.stringify(stopCommand),
        );
        const enriched = await withKernelReworkEvidence(order, target, record);
        expect(
          enriched.required_inputs.some((entry) => entry.id.startsWith("previous-definition:")),
        ).toBe(true);
      } finally {
        await rm(directory, { recursive: true, force: true });
      }
    },
  );
  it.each([
    "receipt",
    "event",
    "gap",
    "unrelated",
    "attempt",
    "claim",
    "output",
    "missing-result",
    "result",
    "validation",
    "review",
    "native",
    "unknown",
    "retry",
    "cycle",
    "wrong-task",
    "wrong-plan",
    "authority",
    "reordered",
  ])("rejects %s tampering or unsupported history", async (kind) => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "kernel-prerequisite-"));
    try {
      const { record, order, source, inspectionDirectory } = await fixture(directory);
      const amendment = record.events.findLast((event) => event.kind === "plan_amended")!;
      const events = record.events.filter((event) => event.task_revision > amendment.task_revision);
      const prerequisite = record.aggregate.work_items.prerequisite!;
      if (kind === "cycle")
        record.aggregate.current_plan!.work_items.find(
          (item) => item.id === "prerequisite",
        )!.depends_on = ["prerequisite"];
      if (["wrong-task", "wrong-plan", "authority"].includes(kind)) {
        const retained = JSON.parse(
          await readFile(path.join(source, "work-order.json"), "utf8"),
        ) as {
          canonical_binding: { task_id: string; plan_digest: string; authority_digest: string };
          task: { id: string };
        };
        if (kind === "wrong-task") {
          retained.canonical_binding.task_id = "other-task";
          retained.task.id = "other-task";
        }
        if (kind === "wrong-plan")
          retained.canonical_binding.plan_digest = k.kernelDigest("other-plan");
        if (kind === "authority")
          retained.canonical_binding.authority_digest = k.kernelDigest("other-authority");
        await writeFile(path.join(source, "work-order.json"), JSON.stringify(retained));
      }
      if (kind === "reordered") {
        const first = record.events.indexOf(events[1]!);
        const second = record.events.indexOf(events[2]!);
        [record.events[first], record.events[second]] = [
          record.events[second]!,
          record.events[first]!,
        ];
      }
      if (kind === "receipt")
        record.aggregate.mutation_receipts[events[1]!.mutation_id]!.event_digests = [];
      if (kind === "event") events[1]!.payload_digest = k.kernelDigest("tampered");
      if (kind === "gap") record.events.splice(record.events.indexOf(events[2]!), 1);
      if (kind === "unrelated")
        record.aggregate.current_plan!.work_items.find((item) => item.id === "kernel")!.depends_on =
          [];
      if (kind === "attempt") prerequisite.attempt++;
      if (kind === "claim") prerequisite.claim_id = "wrong";
      if (kind === "output") prerequisite.output_manifests = [];
      if (kind === "missing-result") await rm(path.join(source, "received-result.json"));
      if (kind === "result") await writeFile(path.join(source, "received-result.json"), "{}");
      if (kind === "validation")
        await writeFile(path.join(inspectionDirectory, "validation-command.json"), "{}");
      if (kind === "review")
        await writeFile(path.join(inspectionDirectory, "inspection-result.json"), "{}");
      if (kind === "native") {
        const evidence = JSON.parse(
          await readFile(path.join(inspectionDirectory, "validation.json"), "utf8"),
        ) as { checks: { status: string } };
        evidence.checks.status = "failed";
        await writeFile(
          path.join(inspectionDirectory, "validation.json"),
          JSON.stringify(evidence),
        );
      }
      if (kind === "unknown") events[4]!.kind = "final_validation_recorded";
      if (kind === "retry")
        events[1]!.command_digest = k.kernelDigest({
          kind: "transition_work_item",
          action: "claim",
          task_id: record.aggregate.id,
          expected_task_revision: events[1]!.task_revision - 1,
          expected_state_fingerprint: order.canonical_binding!.repository_fingerprint,
          work_item_id: "kernel",
          claim_id:
            order.canonical_binding!.phase === "planning" ? "" : order.canonical_binding!.claim_id,
        });
      expect(
        await authenticatedAmendmentHistory(
          order,
          path.join(directory, order.work_order_id.slice(7)),
          record,
          amendment,
        ),
      ).toBe(false);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
