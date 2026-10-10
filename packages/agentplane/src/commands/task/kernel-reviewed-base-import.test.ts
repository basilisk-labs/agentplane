import { describe, expect, it } from "vitest";
import { AGENT_WORK_ORDER_V2_VALID_FIXTURE } from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { assertCandidateAttempt } from "./candidate-publication-request.js";
import { authenticateReviewedBaseOrder } from "./kernel-reviewed-base-import.js";

function fixture() {
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
    expires_at: null,
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
  const root = "/repository";
  raw.state_fingerprint.task_revision = 7;
  raw.state_fingerprint.worktree = root;
  raw.state_fingerprint.git_head = "a".repeat(40);
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
    old_commit: "a".repeat(40),
    new_commit: "b".repeat(40),
    work_order_digest: k.kernelDigest(raw),
    checkpoint_digest: parent.repository_fingerprint,
  };
  return { raw, pins, record, parent, root };
}
describe("reviewed base retained evidence", () => {
  it("binds explicit evidence pins to the current native attempt and begin receipt", () => {
    expect(authenticateReviewedBaseOrder(fixture()).mutation_receipt_digest).toMatch(/^sha256:/u);
  });
  it("rejects substituted WorkOrder bytes even with a plausible directory", () => {
    const f = fixture();
    f.raw.task.objective = "substituted";
    expect(() => authenticateReviewedBaseOrder(f)).toThrow("pins changed");
  });
  it("rejects a caller-selected checkpoint", () => {
    const f = fixture();
    f.pins.checkpoint_digest = k.kernelDigest("other");
    expect(() => authenticateReviewedBaseOrder(f)).toThrow("pins changed");
  });
  it.each(["revision", "claim", "attempt", "record", "head", "receipt"])(
    "rejects stale or fabricated %s evidence",
    (field) => {
      const f = fixture();
      if (field === "revision") f.record.aggregate.revision++;
      if (field === "claim") f.record.aggregate.work_items.build!.claim_id = "other";
      if (field === "attempt") f.record.aggregate.work_items.build!.attempt++;
      if (field === "record") f.record.digest = k.kernelDigest("changed-record");
      if (field === "head") f.pins.old_commit = "c".repeat(40);
      if (field === "receipt") delete f.record.aggregate.mutation_receipts.begin;
      expect(() => authenticateReviewedBaseOrder(f)).toThrow();
    },
  );
});

describe("candidate current-attempt binding", () => {
  it("authenticates native issuance and rejects a rehashed stale candidate", () => {
    const f = fixture();
    const binding = f.raw.canonical_binding!;
    if (binding.phase !== "implementation") throw new Error("fixture binding");
    const files = [
      {
        path: "src/file.ts",
        mode: "100644" as const,
        blob: "b".repeat(40),
        content_digest: k.kernelDigest("bytes"),
      },
    ];
    const contents = {
      schema_version: 1 as const,
      kind: "candidate_publication_request" as const,
      task_id: f.record.aggregate.id,
      record_digest: f.record.digest,
      repository_identity: binding.repository_identity,
      plan_digest: binding.plan_digest,
      plan_revision: binding.plan_revision,
      work_item_id: binding.work_item_id,
      attempt: binding.attempt,
      claim_id: binding.claim_id,
      contract_digest: binding.contract_digest,
      work_order_digest: f.pins.work_order_digest,
      begin_receipt_digest: authenticateReviewedBaseOrder(f).mutation_receipt_digest,
      review_digest: k.kernelDigest("operator review"),
      commit: "b".repeat(40),
      tree: "c".repeat(40),
      base_commit: "a".repeat(40),
      files,
      files_digest: k.kernelDigest(files),
      remote_url: "https://github.com/example/project.git",
      candidate_ref: `refs/heads/agentplane-candidates/task/${"b".repeat(40)}`,
      expected_remote_head: null,
    };
    const request = { ...contents, digest: k.kernelDigest(contents) };
    expect(assertCandidateAttempt({ ...f, request }).order.work_order_id).toBe(f.raw.work_order_id);
    for (const changed of [
      { attempt: 9 },
      { record_digest: k.kernelDigest("stale") },
      { begin_receipt_digest: k.kernelDigest("other") },
      { claim_id: "stale" },
    ]) {
      const altered = { ...contents, ...changed };
      expect(() =>
        assertCandidateAttempt({ ...f, request: { ...altered, digest: k.kernelDigest(altered) } }),
      ).toThrow("binding changed");
    }
    f.record.events = [];
    expect(() => assertCandidateAttempt({ ...f, request })).toThrow("begin mutation receipt");
  });
});
