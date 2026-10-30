import {
  KernelTaskLifecycle,
  type KernelWorkBinding,
} from "../../runner/usecases/kernel-task-lifecycle.js";
import type { KernelCommandInput } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { afterEach, expect } from "vitest";
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
function nativeCommand() {
  return {
    backendId: "local",
    resolvedProject: { gitRoot: process.cwd() },
    config: { paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" } },
  } as never;
}
const roots: string[] = [];
afterEach(async () => {
  for (const root of roots.splice(0)) await rm(root, { recursive: true, force: true });
});
export async function createDirectory(prefix: string) {
  const dir = await mkdtemp(path.join(os.tmpdir(), prefix));
  roots.push(dir);
  return dir;
}
export async function write(dir: string, name: string, value: unknown) {
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), JSON.stringify(value));
}
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
    command: nativeCommand(),
    record,
    implementation,
    context: {
      repository_identity: record.repository_identity,
      repository_fingerprint: authority.repository_fingerprint,
      ceiling: authority,
    } as never,
  });
}

export async function fixture(
  directory: string,
  targetRetry = false,
  postBlockObservation = false,
  freshSeed = false,
  mixedScope = false,
  preparedWorktree = false,
) {
  const oldClaim = k.kernelDigest("old-claim");
  const contract = {
    role: "EXECUTOR" as const,
    objective: "Build source",
    acceptance_criteria: ["Source is correct"],
    verification_commands: [],
  };
  const nextContract = { ...contract, objective: "Build source with bounded network reads" };
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
      external_effects: ["network_read"],
    },
  };
  let source = {
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
    revision: 146,
    state: "AWAITING_PLAN_APPROVAL",
    current_plan: {
      ...source,
      state: "PROPOSED",
      approval_actor_id: null,
      approval_evidence_digest: null,
    },
    authority_lineage: [],
    work_items: {
      kernel: { ...runtime("EXECUTING"), definition: previous, attempt: 2, claim_id: oldClaim },
    },
  });
  const events: k.DomainEvent[] = [];
  const snapshot = () => makeKernelRecord(root.repository_identity, state, events, documents);
  const userActor = {
    id: "USER",
    kind: "USER",
    transport: "manual",
    capabilities: ["repository_write"],
  } as const;
  const systemActor = {
    id: "agentplane:kernel-controller",
    kind: "SYSTEM",
    transport: "host",
    capabilities: ["authority.observe"],
  } as const;
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
  type FixtureCommand = {
    [Kind in k.TaskCommand["kind"]]: Omit<
      Extract<k.TaskCommand, { kind: Kind }>,
      "task_id" | "expected_task_revision" | "expected_state_fingerprint"
    >;
  }[k.TaskCommand["kind"]];
  function commandInput(
    command: FixtureCommand,
    mutation: string,
    actor?: k.KernelInput["actor"],
    authority: k.ExecutionAuthority | null = root,
  ) {
    const bound = {
      ...command,
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: root.repository_fingerprint,
    };
    return { ...input(state, bound, mutation), authority, ...(actor ? { actor } : {}) };
  }
  function issue(...args: Parameters<typeof commandInput>) {
    apply(commandInput(...args));
  }
  function continueAuthority(
    mutation: string,
    observation: NonNullable<k.CanonicalAuthorityRecord["observation"]>,
    changes: Partial<k.ExecutionAuthority> = {},
  ) {
    const child = {
      ...root,
      ...changes,
      provenance: {
        ...root.provenance,
        kind: "SYSTEM" as const,
        actor_id: "agentplane:kernel-controller",
        parent_authority_digest: root.digest,
      },
    };
    const record: k.CanonicalAuthorityRecord = {
      authority: { ...child, digest: k.authorityDigest(child) },
      approval_mode: null,
      observation,
    };
    apply({
      ...input(
        state,
        {
          kind: "continue_authority",
          task_id: state.id,
          expected_task_revision: state.revision,
          expected_state_fingerprint: record.authority.repository_fingerprint,
          record,
        },
        mutation,
      ),
      authority: root,
      actor: systemActor,
    });
    root = record.authority;
  }
  function amend(items: k.WorkItemDefinition[], mutation: string) {
    const amendment = amendmentCommand(state, items);
    const approval = k.planScopeExpansionApprovalDigest({
      task_id: state.id,
      current_plan_digest: state.current_plan!.digest,
      amended_plan_digest: amendment.amended_plan.digest,
      actor_id: "USER",
    });
    issue(
      {
        ...amendment,
        authority_delta_digest: approval,
        work_contracts: { ...documents.contracts },
      },
      mutation,
      userActor,
    );
  }
  function approve(mutation: string) {
    issue(
      {
        kind: "approve_plan",
        plan_revision: source.revision,
        plan_digest: source.digest,
        approval_evidence_digest: root.provenance.evidence_digest,
        authority_mode: "manual_operator",
      },
      mutation,
      userActor,
    );
  }
  function grantScope(
    id: string,
    prior: typeof retainedOrder,
    resultDigest: k.Sha256Digest,
    boundaries = ["before", "after"],
  ) {
    const request: k.ProspectiveScopeRequest = {
      task_id: state.id,
      record_digest: k.kernelDigest(state),
      task_revision: state.revision,
      plan_revision: state.current_plan!.revision,
      plan_digest: state.current_plan!.digest,
      work_item_id: id,
      attempt: state.work_items[id]!.attempt,
      claim_id: state.work_items[id]!.claim_id!,
      contract_digest: state.work_items[id]!.definition.contract_digest!,
      work_order_id: prior.work_order_id,
      result_digest: resultDigest,
      result_authentication: "native_stop_receipt",
      stop_receipt_digest: k.kernelDigest(
        state.mutation_receipts[String(`semantic-stop:${prior.work_order_id}`)],
      ),
      parent_authority_digest: root.digest,
      repository_fingerprint: root.repository_fingerprint,
      intake_before_digest: k.kernelDigest(boundaries[0]),
      intake_after_digest: k.kernelDigest(boundaries[1]),
      scope_roots: ["tests"],
      repository_effects: [],
    };
    const evidence = k.prospectiveScopeApprovalEvidence(request, "USER");
    const contents = {
      ...root,
      scope_roots: [...new Set([...root.scope_roots, "tests"])].toSorted(),
      provenance: {
        kind: "USER" as const,
        actor_id: "USER",
        evidence_digest: root.provenance.evidence_digest,
        parent_authority_digest: root.digest,
      },
    };
    const grant = {
      authority: { ...contents, digest: k.authorityDigest(contents) },
      approval_mode: "manual_operator" as const,
      observation: {
        kind: "prospective_scope_request" as const,
        scope_request: request,
        request_digest: k.kernelDigest(request),
        evidence_digest: evidence,
        previous_fingerprint: root.repository_fingerprint,
        changed_paths: [],
      },
    };
    issue(
      { kind: "approve_scope_request", record: grant },
      `scope-request:${k.kernelDigest(request)}`,
      userActor,
      null,
    );
    root = grant.authority;
  }
  approve("initial-approval");
  if (freshSeed) {
    const prior = await nativeOrder(snapshot(), root);
    const stopId = `semantic-stop:${prior.work_order_id}`;
    issue(
      {
        ...transitionCommand(state, "block"),
        claim_id: oldClaim,
        semantic_result_digest: k.kernelDigest("prefix-stop"),
      },
      stopId,
    );
    const seed = root;
    grantScope("kernel", prior, k.kernelDigest("prefix-stop"), ["prefix-before", "prefix-after"]);
    root = seed;
    const revision = source.revision + 1;
    source = { ...source, revision, digest: k.kernelDigest({ revision, work_items: [previous] }) };
    issue(
      {
        kind: "propose_plan",
        plan: {
          ...source,
          state: "PROPOSED",
          approval_actor_id: null,
          approval_evidence_digest: null,
        },
      },
      `result:${source.digest}`,
      systemActor,
    );
    root = { ...root, plan_revision: source.revision, plan_digest: source.digest };
    root.digest = k.authorityDigest(root);
    approve("fresh-approval");
    for (const action of ["resume", "claim", "begin"] as const)
      issue(
        { ...transitionCommand(state, action), claim_id: action === "resume" ? null : oldClaim },
        `fresh-${action}`,
      );
  }
  const oldOrder = await nativeOrder(snapshot(), root);
  continueAuthority(
    "pre-stop-continuation",
    {
      kind: "repository_implementation",
      previous_fingerprint: root.repository_fingerprint,
      changed_paths: ["src/change.ts"],
      evidence_digest: k.kernelDigest("native edited source observation"),
    },
    { repository_fingerprint: k.kernelDigest("edited source") },
  );
  const stop = commandInput(
    { ...transitionCommand(state, "block"), claim_id: oldClaim },
    `semantic-stop:${oldOrder.work_order_id}`,
  );
  stop.command.expected_state_fingerprint = root.repository_fingerprint;
  apply(stop);
  amend([prerequisite, amended], "amend-fixture");
  continueAuthority(
    "continue-fixture",
    {
      kind: "plan_amendment",
      previous_fingerprint: root.repository_fingerprint,
      changed_paths: [],
      added_scope_roots: [],
      evidence_digest: k.kernelDigest("native amendment observation"),
    },
    { plan_revision: state.current_plan!.revision, plan_digest: state.current_plan!.digest },
  );
  let prerequisiteClaim = "prerequisite-claim";
  const transition = (
    action: "claim" | "begin" | "inspect" | "complete",
    mutation = `prerequisite-${action}`,
    workItem = "prerequisite",
    claim = prerequisiteClaim,
  ) =>
    issue(
      { ...transitionCommand(state, action), work_item_id: workItem, claim_id: claim },
      mutation,
    );
  transition("claim");
  transition("begin");
  let prerequisiteOrder = await nativeOrder(snapshot(), root, "prerequisite");
  let sourceDirectory = path.join(directory, prerequisiteOrder.work_order_id.slice(7));
  await write(sourceDirectory, "work-order.json", prerequisiteOrder);
  continueAuthority(
    "prerequisite-continuation",
    {
      kind: "repository_implementation",
      previous_fingerprint: root.repository_fingerprint,
      changed_paths: ["src/prerequisite.ts"],
      evidence_digest: k.kernelDigest("source observation"),
    },
    { repository_fingerprint: k.kernelDigest("prerequisite source") },
  );
  const blockedDirectory = sourceDirectory;
  const blockedOrder = prerequisiteOrder;
  const blocked = commandInput(
    {
      ...transitionCommand(state, "block"),
      work_item_id: "prerequisite",
      claim_id: prerequisiteClaim,
    },
    `semantic-stop:${blockedOrder.work_order_id}`,
  );
  blocked.command.expected_state_fingerprint = root.repository_fingerprint;
  apply(blocked);
  const { aggregate: _blockedAggregate, ...blockCommand } = blocked;
  await write(blockedDirectory, "semantic-stop-command.json", blockCommand);
  if (postBlockObservation) {
    const before = structuredClone(state.work_items.prerequisite);
    continueAuthority(
      "post-block-observation",
      {
        kind: "repository_implementation",
        previous_fingerprint: root.repository_fingerprint,
        changed_paths: ["shared/operator-observation.ts"],
        evidence_digest: k.kernelDigest("native post-block observation"),
      },
      { repository_fingerprint: k.kernelDigest("post-block repository observation") },
    );
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
  amend([prerequisite, amended], "amend-prerequisite");
  continueAuthority(
    "continue-prerequisite-amendment",
    {
      kind: "plan_amendment",
      previous_fingerprint: root.repository_fingerprint,
      changed_paths: [],
      added_scope_roots: [],
      evidence_digest: k.kernelDigest("native prerequisite amendment observation"),
    },
    { plan_revision: state.current_plan!.revision, plan_digest: state.current_plan!.digest },
  );
  prerequisiteClaim = "prerequisite-retry-claim";
  transition("claim", "prerequisite-retry-claim");
  transition("begin", "prerequisite-retry-begin");
  prerequisiteOrder = await nativeOrder(snapshot(), root, "prerequisite");
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
  const result = commandInput(
    {
      kind: "accept_work_item_result",
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
  );
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
        record: snapshot(),
      }),
    execute: (value: KernelCommandInput) => {
      apply({ ...value, aggregate: state });
      return Promise.resolve({
        kind: "committed",
        record: snapshot(),
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
    command: nativeCommand(),
    record: snapshot(),
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
  const validationInput = commandInput(
    { kind: "record_work_item_validation", work_item_id: "prerequisite", validation },
    `validation:${inspection.work_order_id}`,
  );
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
    issue({ ...transitionCommand(state, action), claim_id: "claim-2" }, action);
  if (targetRetry) {
    for (const action of ["block", "resume", "claim", "begin"] as const) {
      issue(
        {
          ...transitionCommand(state, action),
          claim_id:
            action === "block"
              ? "claim-2"
              : action === "resume"
                ? null
                : mixedScope
                  ? k.kernelDigest("retry-claim")
                  : "retry-claim",
        },
        `target-retry-${action}`,
      );
    }
  }
  let retainedOrder = oldOrder;
  let retainedStop = stop;
  if (mixedScope) {
    if (preparedWorktree)
      continueAuthority(
        "worktree-preparation",
        {
          kind: "worktree_preparation",
          previous_fingerprint: root.repository_fingerprint,
          changed_paths: [],
          evidence_digest: k.kernelDigest("native worktree preparation receipt"),
        },
        { repository_fingerprint: k.kernelDigest("prepared worktree") },
      );
    retainedOrder = await nativeOrder(snapshot(), root);
    const blockedResult = {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: retainedOrder.work_order_id,
      canonical_binding: retainedOrder.canonical_binding,
      status: "blocked",
      summary: "Need admitted source scope",
      findings: [],
      uncertainty: [],
      blocker: {
        summary: "Need admitted source scope",
        scope_extension_request: {
          schema_version: 1,
          rationale: "Keep the native target evidence",
          scope_roots: ["tests"],
          repository_effects: [],
        },
      },
    };
    retainedStop = {
      ...input(
        state,
        {
          ...transitionCommand(state, "block"),
          claim_id: state.work_items.kernel!.claim_id,
          semantic_result_digest: k.kernelDigest(blockedResult),
        },
        `semantic-stop:${retainedOrder.work_order_id}`,
      ),
      authority: root,
    };
    retainedStop.command.expected_state_fingerprint = root.repository_fingerprint;
    apply(retainedStop);
    const retainedDirectory = path.join(directory, retainedOrder.work_order_id.slice(7));
    await write(retainedDirectory, "work-order.json", retainedOrder);
    await write(retainedDirectory, "received-result.json", blockedResult);
    const { aggregate: _prior, ...retainedCommand } = retainedStop;
    await write(retainedDirectory, "semantic-stop-command.json", retainedCommand);
    function replacement(items: k.WorkItemDefinition[]) {
      const revision = state.current_plan!.revision + 1;
      const plan = {
        revision,
        digest: k.kernelDigest({ revision, work_items: items }),
        state: "PROPOSED" as const,
        work_items: items,
        approval_actor_id: null,
        approval_evidence_digest: null,
      };
      issue({ kind: "propose_plan", plan }, `plan:${plan.digest}`, systemActor);
      const contents = {
        ...root,
        plan_revision: revision,
        plan_digest: plan.digest,
        provenance: {
          kind: "USER" as const,
          actor_id: "USER",
          evidence_digest: k.kernelDigest(`approve:${revision}`),
          parent_authority_digest: null,
        },
      };
      root = { ...contents, digest: k.authorityDigest(contents) };
      source = { ...source, revision: plan.revision, digest: plan.digest };
      approve(`mixed-approval-${revision}`);
    }
    grantScope("kernel", retainedOrder, k.kernelDigest(blockedResult));
    const target = {
      ...amended,
      execution_requirements: { ...amended.execution_requirements, scope_roots: ["src", "tests"] },
    };
    let other = { ...prerequisite, id: "other", expected_outputs: ["other-source"] };
    replacement([prerequisite, target, other]);
    for (const action of ["claim", "begin"] as const)
      transition(action, `other-${action}`, "other", k.kernelDigest("other-claim"));
    const otherOrder = await nativeOrder(snapshot(), root, "other");
    const otherResult = k.kernelDigest("other scope stop");
    issue(
      {
        ...transitionCommand(state, "block"),
        work_item_id: "other",
        claim_id: k.kernelDigest("other-claim"),
        semantic_result_digest: otherResult,
      },
      `semantic-stop:${otherOrder.work_order_id}`,
    );
    grantScope("other", otherOrder, otherResult);
    replacement([prerequisite, target, other]);
    other = { ...other, contract_digest: k.kernelDigest(nextContract) };
    amend([prerequisite, target, other], "mixed-amendment");
    continueAuthority(
      "mixed-continuation",
      {
        kind: "plan_amendment",
        previous_fingerprint: root.repository_fingerprint,
        changed_paths: [],
        added_scope_roots: [],
        evidence_digest: k.kernelDigest("mixed observation"),
      },
      { plan_revision: state.current_plan!.revision, plan_digest: state.current_plan!.digest },
    );
    for (const action of ["claim", "begin"] as const)
      transition(action, `mixed-target-${action}`, "kernel", "mixed-target-claim");
  }
  const record = snapshot();
  const order = await nativeOrder(record, root);
  const { aggregate: _aggregate, ...stopCommand } = retainedStop;
  return {
    record,
    order,
    target: path.join(directory, order.work_order_id.slice(7)),
    oldOrder: retainedOrder,
    stopCommand,
    blockedDirectory,
  };
}
