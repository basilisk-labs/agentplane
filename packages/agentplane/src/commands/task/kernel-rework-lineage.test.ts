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

async function fixture(directory: string, targetRetry = false, postBlockObservation = false) {
  const sourceChange = true;
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
  let prerequisite = {
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
    scope_roots: postBlockObservation ? ["shared", "src"] : ["src"],
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
    scope_roots: postBlockObservation ? root.scope_roots : material ? ["src"] : ["shared", "src"],
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
  let prerequisiteClaim = "prerequisite-claim";
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
          claim_id: prerequisiteClaim,
        },
        mutation,
      ),
      authority: root,
    });
  transition("claim");
  transition("begin");
  let prerequisiteOrder = await nativeOrder(
    makeKernelRecord(root.repository_identity, state, events, documents),
    root,
    "prerequisite",
  );
  let sourceDirectory = path.join(directory, prerequisiteOrder.work_order_id.slice(7));
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
  const blockedDirectory = sourceDirectory;
  const blockedOrder = prerequisiteOrder;
  const blocked = {
    ...input(
      state,
      {
        ...transitionCommand(state, "block"),
        work_item_id: "prerequisite",
        claim_id: prerequisiteClaim,
      },
      `semantic-stop:${blockedOrder.work_order_id}`,
    ),
    authority: root,
  };
  blocked.command.expected_state_fingerprint = root.repository_fingerprint;
  apply(blocked);
  const { aggregate: _blockedAggregate, ...blockCommand } = blocked;
  await write(blockedDirectory, "semantic-stop-command.json", blockCommand);
  if (postBlockObservation) {
    const before = structuredClone(state.work_items.prerequisite);
    const observed = {
      ...root,
      repository_fingerprint: k.kernelDigest("post-block repository observation"),
      provenance: {
        ...root.provenance,
        kind: "SYSTEM" as const,
        actor_id: "agentplane:kernel-controller",
        parent_authority_digest: root.digest,
      },
    };
    observed.digest = k.authorityDigest(observed);
    apply({
      ...input(
        state,
        {
          kind: "continue_authority",
          task_id: state.id,
          expected_task_revision: state.revision,
          expected_state_fingerprint: observed.repository_fingerprint,
          record: {
            authority: observed,
            approval_mode: null,
            observation: {
              kind: "repository_implementation",
              previous_fingerprint: root.repository_fingerprint,
              changed_paths: ["shared/operator-observation.ts"],
              evidence_digest: k.kernelDigest("native post-block observation"),
            },
          },
        },
        "post-block-observation",
      ),
      authority: root,
      actor: {
        id: "agentplane:kernel-controller",
        kind: "SYSTEM",
        transport: "host",
        capabilities: ["authority.observe"],
      },
    });
    root = observed;
    expect(state.work_items.prerequisite).toEqual(before);
    expect(before).toMatchObject({ state: "BLOCKED", claim_id: prerequisiteClaim, attempt: 1 });
    const premature = k.reduceTaskCommand({
      ...input(
        state,
        {
          ...transitionCommand(state, "claim"),
          work_item_id: "prerequisite",
          claim_id: "premature-retry",
          expected_state_fingerprint: root.repository_fingerprint,
        },
        "retry-without-amendment",
      ),
      authority: root,
      repository_fingerprint: root.repository_fingerprint,
    });
    expect(premature.kind).not.toBe("accepted");
  }
  const refinedContract = {
    ...contract,
    objective: "Build prerequisite with genuine runtime context",
  };
  documents.contracts[String(k.kernelDigest(refinedContract))] = refinedContract;
  prerequisite = { ...prerequisite, contract_digest: k.kernelDigest(refinedContract) };
  const planTwo = state.current_plan!;
  const secondAmendment = amendmentCommand(state, [prerequisite, amended]);
  const secondApproval = k.planScopeExpansionApprovalDigest({
    task_id: state.id,
    current_plan_digest: planTwo.digest,
    amended_plan_digest: secondAmendment.amended_plan.digest,
    actor_id: "USER",
  });
  apply({
    ...input(
      state,
      {
        ...secondAmendment,
        authority_delta_digest: secondApproval,
        work_contracts: { ...documents.contracts },
      },
      "amend-prerequisite",
    ),
    authority: root,
    actor: { id: "USER", kind: "USER", transport: "manual", capabilities: ["repository_write"] },
  });
  const renewed = {
    ...root,
    plan_revision: state.current_plan!.revision,
    plan_digest: state.current_plan!.digest,
    provenance: { ...root.provenance, parent_authority_digest: root.digest },
  };
  renewed.digest = k.authorityDigest(renewed);
  apply({
    ...input(
      state,
      {
        kind: "continue_authority",
        task_id: state.id,
        expected_task_revision: state.revision,
        expected_state_fingerprint: root.repository_fingerprint,
        record: {
          authority: renewed,
          approval_mode: null,
          observation: {
            kind: "plan_amendment",
            previous_fingerprint: root.repository_fingerprint,
            changed_paths: [],
            added_scope_roots: [],
            evidence_digest: k.kernelDigest("native prerequisite amendment observation"),
          },
        },
      },
      "continue-prerequisite-amendment",
    ),
    authority: root,
    actor: {
      id: "agentplane:kernel-controller",
      kind: "SYSTEM",
      transport: "host",
      capabilities: ["authority.observe"],
    },
  });
  root = renewed;
  prerequisiteClaim = "prerequisite-retry-claim";
  transition("claim", "prerequisite-retry-claim");
  transition("begin", "prerequisite-retry-begin");
  prerequisiteOrder = await nativeOrder(
    makeKernelRecord(root.repository_identity, state, events, documents),
    root,
    "prerequisite",
  );
  sourceDirectory = path.join(directory, prerequisiteOrder.work_order_id.slice(7));
  await write(sourceDirectory, "work-order.json", prerequisiteOrder);
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
            attempt: 2,
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
    attempt: 2,
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
    blockedDirectory,
    secondApproval,
  };
}

describe("authenticated multi-Plan prerequisite lineage", () => {
  it.each([
    "valid",
    "wrong-plan",
    "wrong-parent",
    "wrong-fingerprint",
    "wrong-receipt",
    "outside-scope",
    "retry-without-amendment",
  ])("authenticates post-BLOCKED canonical repository observation: %s", async (kind) => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "kernel-observation-"));
    try {
      const { record, order } = await fixture(directory, false, true);
      const event = record.events.find((e) => e.mutation_id === "post-block-observation")!;
      const entry = record.aggregate.authority_lineage.find(
        (e) =>
          e.authority.repository_fingerprint ===
          k.kernelDigest("post-block repository observation"),
      )!;
      if (kind === "wrong-plan") entry.authority.plan_digest = k.kernelDigest("wrong Plan");
      if (kind === "wrong-parent")
        entry.authority.provenance.parent_authority_digest = k.kernelDigest("wrong parent");
      if (kind === "wrong-fingerprint" && entry.observation)
        entry.observation.previous_fingerprint = k.kernelDigest("wrong fingerprint");
      if (kind === "wrong-receipt")
        record.aggregate.mutation_receipts[event.mutation_id]!.event_digests = [];
      if (kind === "outside-scope" && entry.observation)
        entry.observation.changed_paths = ["outside/unauthorized.ts"];
      if (kind === "retry-without-amendment") {
        record.events = record.events.filter((e) => e.mutation_id !== "amend-prerequisite");
      }
      const origin = record.events.find((e) => e.kind === "plan_amended")!;
      expect(
        await authenticatedAmendmentHistory(
          order,
          path.join(directory, order.work_order_id.slice(7)),
          record,
          origin,
        ),
      ).toBe(kind === "valid");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("retains the originating target stop through a prerequisite-only amendment and genuine retry", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "kernel-lineage-"));
    try {
      const { record, order, oldOrder, stopCommand } = await fixture(directory);
      const origin = record.events.find((event) => event.kind === "plan_amended")!;
      const target = path.join(directory, order.work_order_id.slice(7));
      expect(record.aggregate.current_plan!.revision).toBe(3);
      expect(record.aggregate.work_items.prerequisite).toMatchObject({
        state: "COMPLETED",
        attempt: 2,
      });
      expect(record.aggregate.work_items.kernel).toMatchObject({ state: "EXECUTING", attempt: 3 });
      expect(record.events.filter((event) => event.kind === "plan_amended")).toHaveLength(2);
      expect(await authenticatedAmendmentHistory(order, target, record, origin)).toBe(true);
      const prior = path.join(directory, oldOrder.work_order_id.slice(7));
      await mkdir(prior, { recursive: true });
      await writeFile(path.join(prior, "work-order.json"), JSON.stringify(oldOrder));
      await writeFile(path.join(prior, "semantic-stop-command.json"), JSON.stringify(stopCommand));
      const enriched = await withKernelReworkEvidence(order, target, record);
      expect(enriched.required_inputs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: `previous-definition:${oldOrder.work_order_id}`,
            required: true,
          }),
        ]),
      );
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it.each([
    "authority",
    "missing-stop-event",
    "stop-event",
    "continuation-event",
    "continuation-receipt",
  ])("rejects original target %s tampering at complete rework admission", async (kind) => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "kernel-lineage-origin-"));
    try {
      const { record, order, oldOrder, stopCommand } = await fixture(directory);
      const prior = path.join(directory, oldOrder.work_order_id.slice(7));
      await mkdir(prior, { recursive: true });
      const stop = record.events.find(
        (event) => event.mutation_id === `semantic-stop:${oldOrder.work_order_id}`,
      )!;
      const continuation = record.events.find(
        (event) => event.mutation_id === "pre-stop-continuation",
      )!;
      if (kind === "authority")
        oldOrder.canonical_binding!.authority_digest = k.kernelDigest("unissued");
      if (kind === "missing-stop-event") record.events.splice(record.events.indexOf(stop), 1);
      if (kind === "stop-event") stop.payload_digest = k.kernelDigest("tampered");
      if (kind === "continuation-event") continuation.payload_digest = k.kernelDigest("tampered");
      if (kind === "continuation-receipt")
        record.aggregate.mutation_receipts[continuation.mutation_id]!.event_digests = [];
      await writeFile(path.join(prior, "work-order.json"), JSON.stringify(oldOrder));
      await writeFile(path.join(prior, "semantic-stop-command.json"), JSON.stringify(stopCommand));
      await expect(
        withKernelReworkEvidence(order, path.join(directory, order.work_order_id.slice(7)), record),
      ).rejects.toThrow();
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it.each([
    "missing-contract",
    "tampered-contract",
    "unknown-contract",
    "missing-block",
    "tampered-block",
    "missing-block-order",
    "wrong-block-claim",
    "wrong-block-attempt",
    "wrong-block-plan",
    "wrong-block-authority",
    "amendment-receipt",
    "amendment-event",
    "missing-event",
    "unknown-event",
    "unrelated-event",
    "target-changing-suffix",
    "unauthorized-amendment",
    "cycle",
    "target-retry",
  ])("rejects %s without accepting historical evidence", async (kind) => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "kernel-lineage-"));
    try {
      const { record, order, blockedDirectory } = await fixture(directory, kind === "target-retry");
      const amendments = record.events.filter((event) => event.kind === "plan_amended");
      const origin = amendments[0]!;
      const latest = amendments[1]!;
      const oldContract = record.aggregate.plan_history[0]!.work_items[0]!.contract_digest;
      if (kind === "missing-contract") delete record.documents.contracts[String(oldContract)];
      if (kind === "tampered-contract")
        record.documents.contracts[String(oldContract)]!.objective = "tampered";
      if (kind === "unknown-contract")
        record.aggregate.plan_history[0]!.work_items[0]!.contract_digest =
          k.kernelDigest("unknown");
      if (kind === "missing-block")
        await rm(path.join(blockedDirectory, "semantic-stop-command.json"));
      if (kind === "tampered-block")
        await writeFile(path.join(blockedDirectory, "semantic-stop-command.json"), "{}");
      if (kind === "missing-block-order") await rm(path.join(blockedDirectory, "work-order.json"));
      if (kind.startsWith("wrong-block-")) {
        const retained = JSON.parse(
          await readFile(path.join(blockedDirectory, "work-order.json"), "utf8"),
        ) as { canonical_binding: Record<string, unknown> };
        const field = kind.slice("wrong-block-".length);
        const key =
          field === "plan"
            ? "plan_digest"
            : field === "authority"
              ? "authority_digest"
              : field === "claim"
                ? "claim_id"
                : "attempt";
        retained.canonical_binding[key] = field === "attempt" ? 99 : k.kernelDigest("wrong");
        await writeFile(path.join(blockedDirectory, "work-order.json"), JSON.stringify(retained));
      }
      if (kind === "amendment-receipt")
        record.aggregate.mutation_receipts[latest.mutation_id]!.command_digest =
          k.kernelDigest("wrong");
      if (kind === "amendment-event") latest.payload_digest = k.kernelDigest("wrong");
      if (kind === "missing-event") record.events.splice(record.events.indexOf(latest), 1);
      if (kind === "unknown-event") latest.kind = "final_validation_recorded";
      if (kind === "unrelated-event")
        record.events.find(
          (event) =>
            event.mutation_id.startsWith("semantic-stop:") &&
            event.task_revision > origin.task_revision,
        )!.task_id = "unrelated";
      if (kind === "target-changing-suffix")
        record.aggregate.current_plan!.work_items.find(
          (item) => item.id === "kernel",
        )!.expected_outputs = ["unapproved"];
      if (kind === "unauthorized-amendment")
        record.aggregate.current_plan!.approval_actor_id = "AGENT";
      if (kind === "cycle")
        record.aggregate.current_plan!.work_items.find(
          (item) => item.id === "prerequisite",
        )!.depends_on = ["kernel"];
      expect(
        await authenticatedAmendmentHistory(
          order,
          path.join(directory, order.work_order_id.slice(7)),
          record,
          origin,
        ),
      ).toBe(false);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
