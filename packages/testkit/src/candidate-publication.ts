import { AGENT_WORK_ORDER_V2_VALID_FIXTURE } from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "./agentplane-internal.js";

// Uses the same authenticated begin-receipt fixture as reviewed-base evidence tests.
export function nativeCandidateFixture(
  root: string,
  head: string,
  expiresAt: string | null = null,
) {
  const raw = structuredClone(AGENT_WORK_ORDER_V2_VALID_FIXTURE);
  const parent = {
    task_id: raw.task.id,
    repository_identity: k.kernelDigest("repository"),
    repository_fingerprint: k.kernelDigest("checkpoint"),
    plan_revision: 1,
    plan_digest: k.kernelDigest("plan"),
    work_item_id: null,
    scope_roots: ["src"],
    repository_effects: ["source_code"],
    external_effects: [],
    capabilities: [],
    resources: [],
    validation_requirements: [],
    policy_digests: [k.kernelDigest("policy")],
    completion_requirements: [],
    risk: { requirements: "bounded", implementation: "bounded", reversibility: "reversible" },
    expires_at: expiresAt,
    provenance: {
      kind: "USER",
      actor_id: "USER",
      evidence_digest: k.kernelDigest("approval"),
      parent_authority_digest: null,
    },
  } as unknown as k.ExecutionAuthority;
  Object.assign(parent, { digest: k.authorityDigest(parent) });
  const definition = {
    id: "build",
    contract_digest: k.kernelDigest("contract"),
    execution_requirements: {
      scope_roots: ["src"],
      repository_effects: ["source_code"],
      external_effects: [],
      capabilities: [],
      resources: [],
    },
  };
  const command = {
    kind: "transition_work_item",
    action: "begin",
    task_id: raw.task.id,
    expected_task_revision: 6,
    expected_state_fingerprint: parent.repository_fingerprint,
    work_item_id: "build",
    claim_id: "claim",
  };
  const event = {
    kind: "work_item_transitioned",
    task_id: raw.task.id,
    task_revision: 7,
    mutation_id: "begin",
    command_digest: k.kernelDigest(command),
  };
  const receipt = {
    before_revision: 6,
    after_revision: 7,
    command_digest: event.command_digest,
    event_digests: [k.kernelDigest(event)],
  };
  const record = {
    digest: k.kernelDigest("record"),
    aggregate: {
      id: raw.task.id,
      revision: 7,
      authority_lineage: [{ authority: parent }],
      mutation_receipts: { begin: receipt },
      work_items: {
        build: {
          definition,
          state: "EXECUTING",
          result_digest: null,
          claim_id: "claim",
          attempt: 2,
        },
      },
    },
    events: [event],
  } as unknown as KernelRecord;
  const delegated = {
    ...parent,
    ...definition.execution_requirements,
    work_item_id: "build",
    provenance: {
      ...parent.provenance,
      kind: "DELEGATED" as const,
      actor_id: "agentplane:kernel-controller",
      parent_authority_digest: parent.digest,
    },
  };
  raw.task.revision = 7;
  raw.task.work_item_id = "build";
  raw.canonical_binding = {
    phase: "implementation",
    task_id: raw.task.id,
    repository_identity: parent.repository_identity,
    repository_fingerprint: parent.repository_fingerprint,
    plan_revision: 1,
    plan_digest: parent.plan_digest,
    work_item_id: "build",
    contract_digest: definition.contract_digest,
    attempt: 2,
    claim_id: "claim",
    authority_digest: k.authorityDigest(delegated),
  };
  raw.state_fingerprint.task_revision = 7;
  raw.state_fingerprint.worktree = root;
  raw.state_fingerprint.git_head = head;
  raw.state_fingerprint.components.task = {
    state: "present",
    source: "canonical_task",
    digest: k.kernelDigest({ state: "present", source: "canonical_task", value: record.digest }),
    reason_code: null,
  };
  raw.state_fingerprint.components.git = {
    state: "present",
    source: "native_repository_content",
    digest: k.kernelDigest({
      state: "present",
      source: "native_repository_content",
      value: parent.repository_fingerprint,
    }),
    reason_code: null,
  };
  const { digest: _digest, ...fingerprint } = raw.state_fingerprint;
  raw.state_fingerprint.digest = k.kernelDigest(fingerprint);
  raw.work_order_id = k.kernelDigest({
    binding: raw.canonical_binding,
    revision: 7,
    record: record.digest,
    state_fingerprint: raw.state_fingerprint.digest,
  });
  const pins = {
    old_commit: head,
    new_commit: "b".repeat(40),
    work_order_digest: k.kernelDigest(raw),
    checkpoint_digest: parent.repository_fingerprint,
  };
  return { raw, pins, record, parent, root };
}
