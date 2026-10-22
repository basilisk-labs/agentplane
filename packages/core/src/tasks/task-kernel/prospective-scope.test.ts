import { describe, expect, it } from "vitest";
import { authority, aggregate, runtime, input } from "./kernel.test-fixtures.js";
import { authorityDigest } from "./authority-lineage.js";
import { kernelDigest } from "./digest.js";
import {
  prospectiveScopeAdmissionIssues,
  prospectiveScopeApprovalEvidence,
  type ProspectiveScopeRequest,
} from "./prospective-scope.js";
import type { CanonicalAuthorityRecord, KernelInput } from "./model.js";

function fixture() {
  const parent = { ...authority, digest: authorityDigest(authority) };
  const order = kernelDigest("order");
  const stop = {
    mutation_id: `semantic-stop:${order}`,
    command_digest: kernelDigest("block"),
    before_revision: 2,
    after_revision: 3,
    aggregate_digest: kernelDigest("aggregate"),
    event_digests: [],
    effect_ids: [],
  };
  const state = aggregate({
    revision: 3,
    authority_lineage: [{ authority: parent, approval_mode: "manual_operator", observation: null }],
    work_items: {
      kernel: {
        ...runtime("BLOCKED"),
        definition: { ...runtime("BLOCKED").definition, contract_digest: kernelDigest("contract") },
      },
    },
    mutation_receipts: { [stop.mutation_id]: stop },
  });
  const request: ProspectiveScopeRequest = {
    task_id: state.id,
    record_digest: kernelDigest("record"),
    task_revision: 3,
    plan_revision: parent.plan_revision,
    plan_digest: parent.plan_digest,
    work_item_id: "kernel",
    attempt: 1,
    claim_id: "claim-1",
    contract_digest: kernelDigest("contract"),
    work_order_id: order,
    result_authentication: "native_stop_receipt",
    result_digest: kernelDigest("result"),
    stop_receipt_digest: kernelDigest(stop),
    parent_authority_digest: parent.digest,
    repository_fingerprint: parent.repository_fingerprint,
    intake_before_digest: kernelDigest("before"),
    intake_after_digest: kernelDigest("after"),
    scope_roots: ["fixture.test.ts"],
    repository_effects: [],
  };
  const contents = {
    ...parent,
    scope_roots: ["fixture.test.ts", ...parent.scope_roots],
    provenance: { ...parent.provenance, actor_id: "USER", parent_authority_digest: parent.digest },
  };
  const record: CanonicalAuthorityRecord = {
    authority: { ...contents, digest: authorityDigest(contents) },
    approval_mode: "manual_operator",
    observation: {
      kind: "prospective_scope_request",
      evidence_digest: prospectiveScopeApprovalEvidence(request, "USER"),
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: [],
      request_digest: kernelDigest(request),
      scope_request: request,
    },
  };
  const call: KernelInput = {
    ...input(state, {
      kind: "approve_scope_request",
      task_id: state.id,
      expected_task_revision: 3,
      expected_state_fingerprint: parent.repository_fingerprint,
      record,
    }),
    actor: { id: "USER", kind: "USER", transport: "manual" },
    authority: null,
  };
  return { call, record, request };
}

describe("prospective scope authority", () => {
  it("accepts exact USER intent without claiming changed paths", () => {
    const f = fixture();
    expect(prospectiveScopeAdmissionIssues(f.call, f.record)).toEqual([]);
  });
  it.each([
    "attempt",
    "claim_id",
    "contract_digest",
    "plan_digest",
    "repository_fingerprint",
    "stop_receipt_digest",
    "work_order_id",
    "task_revision",
  ] as const)("rejects changed %s even after resealing request", (field) => {
    const f = fixture();
    const request = {
      ...f.request,
      [field]: typeof f.request[field] === "number" ? 99 : kernelDigest("other"),
    };
    const record = {
      ...f.record,
      observation: {
        ...f.record.observation!,
        scope_request: request,
        request_digest: kernelDigest(request),
        evidence_digest: prospectiveScopeApprovalEvidence(request, "USER"),
      },
    };
    expect(prospectiveScopeAdmissionIssues(f.call, record).length).toBeGreaterThan(0);
  });
  it("rejects added capability and external effect despite a recomputed authority digest", () => {
    const f = fixture();
    const contents = {
      ...f.record.authority,
      capabilities: ["provider_write"],
      external_effects: ["publish"],
    };
    expect(
      prospectiveScopeAdmissionIssues(f.call, {
        ...f.record,
        authority: { ...contents, digest: authorityDigest(contents) },
      }),
    ).not.toEqual([]);
  });
  it("rejects a non-USER actor", () => {
    const f = fixture();
    expect(
      prospectiveScopeAdmissionIssues(
        { ...f.call, actor: { ...f.call.actor, kind: "SYSTEM" } },
        f.record,
      ),
    ).not.toEqual([]);
  });
});
