import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import type { KernelCommandInput } from "./kernel-backend-adapter.js";

export const replayTaskClasses = ["direct", "branch_pr", "context", "release", "batch"] as const;
export type ReplayTaskClass = (typeof replayTaskClasses)[number];
export const replayRepositoryIdentity = k.kernelDigest("replay-repository");
const fingerprint = k.kernelDigest("replay-checkout");
const taskId = "202608300000-RPR001";
const digest = k.kernelDigest("replay-implementation");
const effects: Record<ReplayTaskClass, string[]> = {
  direct: [],
  context: [],
  batch: ["pr.open", "pr.merge", "hosted.close"],
  branch_pr: ["pr.open", "pr.merge", "hosted.close"],
  release: ["release.publish", "registry.publish"],
};

/** A model journey through real adapters. It does not claim a hosted release or self-hosting run. */
export function kernelReplayJourney(taskClass: ReplayTaskClass) {
  const task: TaskData = {
    id: taskId,
    title: `Replay ${taskClass}`,
    description: "Isolated persistence qualification",
    status: "TODO",
    priority: "high",
    owner: "CODER",
    depends_on: [],
    tags: [taskClass],
    verify: [],
  };
  const authority: k.ExecutionAuthority = {
    digest: k.kernelDigest("replay-authority"),
    task_id: taskId,
    plan_revision: 0,
    plan_digest: k.kernelDigest("no-plan"),
    work_item_id: null,
    repository_identity: replayRepositoryIdentity,
    repository_fingerprint: fingerprint,
    scope_roots: ["."],
    repository_effects: ["repository_write"],
    external_effects: effects[taskClass],
    capabilities: ["repository_write", "provider_write"],
    resources: [],
    validation_requirements: ["focused"],
    policy_digests: [],
    completion_requirements: ["validation"],
    risk: { requirements: "bounded", implementation: "bounded", reversibility: "reversible" },
    provenance: {
      kind: "USER",
      actor_id: "fixture-user",
      evidence_digest: k.kernelDigest("fixture-approval"),
      parent_authority_digest: null,
    },
    expires_at: null,
  };
  const definitions: k.WorkItemDefinition[] = [
    {
      id: "build",
      depends_on: [],
      required_inputs: [],
      expected_outputs: ["built"],
      optional: false,
      execution_requirements: {
        scope_roots: ["."],
        repository_effects: ["repository_write"],
        external_effects: [],
        capabilities: ["repository_write"],
        resources: [],
      },
    },
  ];
  const plan: k.PlanRecord = {
    revision: 1,
    digest: k.kernelDigest({ revision: 1, work_items: definitions }),
    state: "PROPOSED",
    approval_actor_id: null,
    approval_evidence_digest: null,
    work_items: definitions,
  };
  const steps: { label: string; input: KernelCommandInput }[] = [];
  type Payload = k.TaskCommand extends infer C
    ? C extends k.TaskCommand
      ? Omit<C, "task_id" | "expected_task_revision" | "expected_state_fingerprint">
      : never
    : never;
  function add(label: string, payload: Payload) {
    const planAuthority =
      steps.length > 1 ? { ...authority, plan_revision: 1, plan_digest: plan.digest } : authority;
    const command = {
      ...payload,
      task_id: taskId,
      expected_task_revision: steps.length,
      expected_state_fingerprint: fingerprint,
    } as k.TaskCommand;
    steps.push({
      label,
      input: {
        command,
        authority: {
          ...planAuthority,
          work_item_id: "work_item_id" in command ? command.work_item_id : null,
        },
        actor: {
          id: "fixture-user",
          kind: "USER",
          transport: "manual",
          capabilities: authority.capabilities,
        },
        repository_fingerprint: fingerprint,
        occurred_at: "2026-08-30T00:00:00.000Z",
        mutation_id: label,
      },
    });
  }
  function validation(identity: k.Sha256Digest): k.ValidationRecord {
    return {
      status: "PASSED",
      identity: {
        implementation_identity: identity,
        check_id: "focused",
        command_digest: k.kernelDigest("tests"),
        toolchain_digest: k.kernelDigest("toolchain"),
        environment_digest: k.kernelDigest("environment"),
      },
      evidence_digests: [k.kernelDigest("log")],
      observed_at: "2026-08-30T00:00:00.000Z",
    };
  }
  add("creation", { kind: "capture_intent", intent_digest: k.kernelDigest("replay-intent") });
  add("plan", { kind: "propose_plan", plan });
  add("approval", {
    kind: "approve_plan",
    plan_revision: 1,
    plan_digest: plan.digest,
    approval_evidence_digest: authority.provenance.evidence_digest,
  });
  add("materialize", {
    kind: "materialize_work_items",
    plan_revision: 1,
    plan_digest: plan.digest,
  });
  for (const action of ["claim", "begin"] as const)
    add(action, {
      kind: "transition_work_item",
      work_item_id: "build",
      action,
      claim_id: "fixture-claim",
    });
  add("result", {
    kind: "accept_work_item_result",
    plan_revision: 1,
    plan_digest: plan.digest,
    work_item_id: "build",
    result_digest: digest,
    output_manifests: [
      {
        id: "built",
        kind: "source",
        digest,
        task_id: taskId,
        plan_revision: 1,
        work_item_id: "build",
        attempt: 1,
        repository_fingerprint: fingerprint,
      },
    ],
  });
  add("inspection", {
    kind: "transition_work_item",
    work_item_id: "build",
    action: "inspect",
    claim_id: "fixture-claim",
  });
  add("validation", {
    kind: "record_work_item_validation",
    work_item_id: "build",
    validation: validation(digest),
  });
  add("work-item-completion", {
    kind: "transition_work_item",
    work_item_id: "build",
    action: "complete",
    claim_id: "fixture-claim",
  });
  for (const kind of effects[taskClass]) {
    add(`prepare-${kind}`, {
      kind: "prepare_effect",
      effect: {
        id: kind,
        kind,
        state: "PREPARED",
        idempotency_key: kind,
        request_digest: k.kernelDigest(kind),
        provider_receipt_digest: null,
        observed_state_digest: null,
        execution_requirements: {
          scope_roots: [],
          repository_effects: [],
          external_effects: [kind],
          capabilities: ["provider_write"],
          resources: [],
        },
      },
    });
    add(`observe-${kind}`, {
      kind: "observe_effect",
      effect_id: kind,
      observed_state: "APPLIED",
      observation_digest: k.kernelDigest(`receipt-${kind}`),
    });
  }
  add("final-validation", { kind: "record_final_validation", validation: validation(fingerprint) });
  add("completion", { kind: "complete_task" });
  return { task, steps };
}
