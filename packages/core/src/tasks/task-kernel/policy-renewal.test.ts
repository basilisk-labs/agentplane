import { describe, expect, it } from "vitest";
import {
  authorityDigest,
  canonicalAuthorityIssues,
  policyRenewalApprovalEvidence,
  policyRenewalRequestDigest,
} from "./authority-lineage.js";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import type { CanonicalAuthorityRecord, ExecutionAuthority, TaskCommand } from "./model.js";
import { authority, plan, aggregate, input } from "./kernel.test-fixtures.js";

function fixture() {
  const contents = {
    ...authority,
    expires_at: "2026-08-29T21:00:00.000Z",
    policy_digests: [kernelDigest("old-policy")],
    provenance: { ...authority.provenance, actor_id: "USER" },
  };
  const parent = { ...contents, digest: authorityDigest(contents) };
  const state = aggregate({
    current_plan: { ...plan, approval_actor_id: "USER" },
    authority_lineage: [{ authority: parent, approval_mode: "manual_operator", observation: null }],
  });
  const childContents = {
    ...parent,
    repository_fingerprint: kernelDigest("new-checkout"),
    policy_digests: [kernelDigest("new-policy")],
    provenance: { ...parent.provenance, parent_authority_digest: parent.digest },
  };
  const child = { ...childContents, digest: authorityDigest(childContents) };
  const requestDigest = policyRenewalRequestDigest({
    task_revision: state.revision,
    parent,
    repository_fingerprint: child.repository_fingerprint,
    policy_digests: child.policy_digests,
    changed_paths: [".agentplane/policy/local.md"],
    repository_evidence_digest: kernelDigest("native-policy-diff"),
  });
  const record: CanonicalAuthorityRecord = {
    authority: child,
    approval_mode: "manual_operator",
    observation: {
      kind: "policy_renewal",
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: [".agentplane/policy/local.md"],
      repository_evidence_digest: kernelDigest("native-policy-diff"),
      request_task_revision: state.revision,
      request_digest: requestDigest,
      evidence_digest: policyRenewalApprovalEvidence({
        request_digest: requestDigest,
        actor_id: "USER",
      }),
    },
  };
  const command: TaskCommand = {
    kind: "renew_policy_authority",
    task_id: state.id,
    expected_task_revision: state.revision,
    expected_state_fingerprint: child.repository_fingerprint,
    record,
  };
  return {
    state,
    record,
    invocation: {
      ...input(state, command),
      authority: null,
      repository_fingerprint: child.repository_fingerprint,
      actor: { id: "USER", kind: "USER" as const, transport: "manual" as const, capabilities: [] },
    },
  };
}

describe("policy authority renewal", () => {
  it("preserves execution state and appends valid renewal evidence", () => {
    const f = fixture();
    const result = reduceTaskCommand(f.invocation);
    expect(result.kind).toBe("accepted");
    if (result.kind !== "accepted") throw new Error(result.kind);
    expect(result.aggregate.work_items).toEqual(f.state.work_items);
    expect(result.aggregate.current_plan).toEqual(f.state.current_plan);
    expect(canonicalAuthorityIssues(result.aggregate)).toEqual([]);
  });

  it.each([
    { scope_roots: ["."] },
    { capabilities: ["repository_write", "provider_write", "extra"] },
    { external_effects: ["deploy"] },
    { resources: ["production"] },
    { validation_requirements: [] },
    { completion_requirements: [] },
    { expires_at: null },
  ] satisfies Partial<ExecutionAuthority>[])(
    "rejects authority dimension changes: %j",
    (changes) => {
      const f = fixture();
      const authorityContents = { ...f.record.authority, ...changes };
      const tampered = {
        ...f.record,
        authority: { ...authorityContents, digest: authorityDigest(authorityContents) },
      };
      const result = reduceTaskCommand({
        ...f.invocation,
        command: { ...f.invocation.command, kind: "renew_policy_authority", record: tampered },
      });
      expect(result).toMatchObject({ kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED" });
    },
  );
});
