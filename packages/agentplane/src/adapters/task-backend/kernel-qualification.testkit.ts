import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  aggregate,
  authority,
  fingerprint,
  input,
  manifest,
  plan,
  resultDigest,
  runtime,
  transitionCommand,
  validation,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { readKernelNextAction } from "./kernel-next-action.js";
import { makeKernelRecord } from "./kernel-record.js";
import { observeKernelReplay, replayBytesDigest } from "./kernel-replay.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
} from "./kernel-replay-journey.test-fixtures.js";

export type KernelQualificationCase = {
  id: string;
  family: "plans" | "work-items" | "required-inputs";
  source_bytes: string;
  outcome: "accepted" | "rejected";
  next_reason: string;
};

/** Supplemental cases keep their oracle assertions explicit before the final independent capture. */
export function kernelQualificationCases(): KernelQualificationCase[] {
  const cases: KernelQualificationCase[] = [];
  function add(
    id: string,
    family: KernelQualificationCase["family"],
    value: k.KernelInput,
    outcome: KernelQualificationCase["outcome"],
    next_reason: string,
  ) {
    cases.push({ id, family, source_bytes: JSON.stringify(value), outcome, next_reason });
  }
  const proposed = {
    ...plan,
    state: "PROPOSED" as const,
    approval_actor_id: null,
    approval_evidence_digest: null,
  };
  const awaiting = aggregate({
    state: "AWAITING_PLAN_APPROVAL",
    current_plan: proposed,
    work_items: {},
  });
  const envelope = {
    task_id: awaiting.id,
    expected_task_revision: awaiting.revision,
    expected_state_fingerprint: fingerprint,
  };
  const userInput = (command: k.TaskCommand) => ({
    ...input(awaiting, command),
    actor: {
      ...input(awaiting, command).actor,
      kind: "USER" as const,
      id: authority.provenance.actor_id,
    },
  });
  const approve: k.TaskCommand = {
    ...envelope,
    kind: "approve_plan",
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    approval_evidence_digest: authority.provenance.evidence_digest,
  };
  const reject: k.TaskCommand = {
    ...envelope,
    kind: "reject_plan",
    plan_revision: plan.revision,
    plan_digest: plan.digest,
  };
  add(
    "plan-approved",
    "plans",
    userInput(approve),
    "accepted",
    "kernel_work_item_materialization_required",
  );
  add("plan-rejected", "plans", userInput(reject), "accepted", "kernel_plan_required");
  add(
    "plan-stale-approval",
    "plans",
    userInput({ ...approve, plan_digest: k.kernelDigest("stale") }),
    "rejected",
    "kernel_plan_approval_required",
  );
  add(
    "plan-agent-cannot-approve",
    "plans",
    input(awaiting, approve),
    "rejected",
    "kernel_plan_approval_required",
  );
  const planning = aggregate({ state: "PLANNING", current_plan: null, work_items: {} });
  add(
    "plan-pending",
    "plans",
    input(planning, { ...envelope, kind: "propose_plan", plan: proposed }),
    "accepted",
    "kernel_plan_approval_required",
  );

  const producerDefinition = {
    ...plan.work_items[0]!,
    id: "producer",
    expected_outputs: ["upstream"],
  };
  const consumerDefinition = {
    ...plan.work_items[0]!,
    required_inputs: ["upstream"],
    depends_on: ["producer"],
  };
  const completedProducer: k.WorkItemRuntime = {
    ...runtime("COMPLETED"),
    definition: producerDefinition,
    result_digest: resultDigest,
    validation: validation(resultDigest),
    output_manifests: [{ ...manifest(), id: "upstream", work_item_id: "producer" }],
  };
  for (const fanout of [false, true]) {
    const downstream = fanout
      ? [
          consumerDefinition,
          { ...consumerDefinition, id: "other", expected_outputs: ["other-output"] },
        ]
      : [consumerDefinition];
    const current_plan = { ...plan, work_items: [producerDefinition, ...downstream] };
    const state = aggregate({
      current_plan,
      work_items: {
        producer: { ...completedProducer, state: "VALIDATING" },
        ...Object.fromEntries(
          downstream.map((definition) => [
            definition.id,
            { ...runtime("PLANNED"), claim_id: null, definition },
          ]),
        ),
      },
    });
    add(
      fanout ? "work-item-fan-out" : "work-item-dependency-chain",
      "work-items",
      input(state, { ...transitionCommand(state, "complete"), work_item_id: "producer" }),
      "accepted",
      "kernel_work_item_claim_required",
    );
  }
  for (const missing of [false, true]) {
    const state = aggregate({
      current_plan: { ...plan, work_items: [consumerDefinition, producerDefinition] },
      work_items: {
        kernel: { ...runtime("READY"), claim_id: null, definition: consumerDefinition },
        producer: {
          ...completedProducer,
          output_manifests: missing ? [] : completedProducer.output_manifests,
        },
      },
    });
    add(
      missing ? "missing-upstream-output" : "resolved-upstream-output",
      "required-inputs",
      input(state, transitionCommand(state, "claim")),
      missing ? "rejected" : "accepted",
      missing ? "kernel_work_item_claim_required" : "kernel_work_item_execution_required",
    );
  }
  const failing = aggregate({
    work_items: {
      kernel: {
        ...runtime("VALIDATING"),
        result_digest: resultDigest,
        output_manifests: [manifest()],
        validation: { ...validation(resultDigest), status: "FAILED" },
      },
    },
  });
  add(
    "work-item-rework",
    "work-items",
    input(failing, transitionCommand(failing, "rework")),
    "accepted",
    "kernel_work_item_rework_claim_required",
  );
  const rework = k.reduceTaskCommand(input(failing, transitionCommand(failing, "rework")));
  if (rework.kind !== "accepted") throw new Error("Invalid rework fixture");
  add(
    "work-item-new-attempt",
    "work-items",
    input(rework.aggregate, transitionCommand(rework.aggregate, "claim"), "claim-again"),
    "accepted",
    "kernel_work_item_execution_required",
  );
  const executing = aggregate({ work_items: { kernel: runtime("EXECUTING") } });
  const result: k.TaskCommand = {
    ...envelope,
    kind: "accept_work_item_result",
    work_item_id: "kernel",
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    result_digest: resultDigest,
    output_manifests: [manifest()],
  };
  add(
    "work-item-result",
    "work-items",
    input(executing, result),
    "accepted",
    "kernel_work_item_inspection_required",
  );
  const accepted = k.reduceTaskCommand(input(executing, result));
  if (accepted.kind !== "accepted")
    throw new Error(`Invalid result fixture: ${JSON.stringify(accepted)}`);
  add(
    "work-item-duplicate-result",
    "work-items",
    input(accepted.aggregate, result),
    "accepted",
    "kernel_work_item_inspection_required",
  );
  add(
    "work-item-stale-result",
    "work-items",
    input(executing, { ...result, output_manifests: [{ ...manifest(), attempt: 0 }] }),
    "rejected",
    "kernel_work_item_result_required",
  );
  add(
    "work-item-conflicting-result-id",
    "work-items",
    input(accepted.aggregate, { ...result, result_digest: k.kernelDigest("changed-result") }),
    "rejected",
    "kernel_work_item_inspection_required",
  );
  const optional = {
    ...plan.work_items[0]!,
    id: "optional",
    optional: true,
    expected_outputs: ["optional-output"],
  };
  for (const claimed of [false, true]) {
    const state = aggregate({
      current_plan: { ...plan, work_items: [plan.work_items[0]!, optional] },
      work_items: {
        kernel: {
          ...runtime("COMPLETED"),
          result_digest: resultDigest,
          output_manifests: [manifest()],
          validation: validation(resultDigest),
        },
        optional: {
          ...runtime(claimed ? "CLAIMED" : "READY"),
          claim_id: claimed ? "optional-claim" : null,
          definition: optional,
        },
      },
    });
    add(
      claimed ? "optional-active-claim" : "optional-unclaimed",
      "work-items",
      input(state, {
        kind: "record_final_validation",
        task_id: state.id,
        expected_task_revision: state.revision,
        expected_state_fingerprint: fingerprint,
        validation: validation(fingerprint),
      }),
      claimed ? "rejected" : "accepted",
      claimed ? "kernel_work_item_execution_required" : "kernel_task_completion_required",
    );
  }
  const other = {
    ...plan.work_items[0]!,
    id: "other",
    expected_outputs: ["other-output"],
    execution_requirements: { ...plan.work_items[0]!.execution_requirements, resources: [] },
  };
  const blocked = aggregate({
    current_plan: { ...plan, work_items: [plan.work_items[0]!, other] },
    work_items: {
      kernel: runtime("BLOCKED"),
      other: { ...runtime("READY"), claim_id: null, definition: other },
    },
  });
  add(
    "independent-ready-while-blocked",
    "work-items",
    input(blocked, { ...transitionCommand(blocked, "claim"), work_item_id: "other" }),
    "accepted",
    "kernel_work_item_execution_required",
  );
  const competing = {
    ...plan.work_items[0]!,
    id: "competing",
    expected_outputs: ["competing-output"],
  };
  const contested = aggregate({
    current_plan: { ...plan, work_items: [plan.work_items[0]!, competing] },
    work_items: {
      kernel: runtime("CLAIMED"),
      competing: { ...runtime("READY"), claim_id: null, definition: competing },
    },
  });
  add(
    "conflicting-resource-claim",
    "work-items",
    input(contested, { ...transitionCommand(contested, "claim"), work_item_id: "competing" }),
    "rejected",
    "kernel_work_item_execution_required",
  );
  return cases;
}

/** Canonical reduction and read projection share an input; no provider or mutable legacy path is called. */
export function observeKernelQualification(sourceBytes: string) {
  const value = JSON.parse(sourceBytes) as k.KernelInput;
  const reduced = k.reduceTaskCommand(value);
  const aggregate = reduced.kind === "accepted" ? reduced.aggregate : value.aggregate;
  const record = makeKernelRecord(
    replayRepositoryIdentity,
    aggregate,
    reduced.kind === "accepted" ? reduced.events : [],
  );
  const task = { ...kernelReplayJourney("direct").task, id: aggregate.id };
  return {
    ...observeKernelReplay(value),
    next_action: readKernelNextAction(
      { kind: "canonical", task, record },
      value.repository_fingerprint ?? fingerprint,
    ),
  };
}

export function captureKernelQualification(anchor: string) {
  if (!/^[a-f0-9]{40}$/u.test(anchor)) throw new Error("Exact qualification anchor required");
  return kernelQualificationCases().map((fixture) => ({
    identity: {
      fixture_id: fixture.id,
      implementation_anchor: anchor,
      source_digest: replayBytesDigest(fixture.source_bytes),
      reproduction_command: `node scripts/bench/qualify-kernel-replay.mjs ${anchor}`,
    },
    family: fixture.family,
    command_sequence: [(JSON.parse(fixture.source_bytes) as k.KernelInput).command],
    source_bytes: fixture.source_bytes,
    expected: observeKernelQualification(fixture.source_bytes),
  }));
}
