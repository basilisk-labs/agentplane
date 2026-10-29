import { describe, expect, it } from "vitest";
import { authority, aggregate, runtime, input } from "./kernel.test-fixtures.js";
import { authorityDigest } from "./authority-lineage.js";
import { kernelDigest } from "./digest.js";
import {
  completedReworkScopeAdmissionIssues,
  completedReworkScopeApprovalEvidence,
} from "./prospective-scope.js";
import { reduceTaskCommand } from "./kernel.js";
import type { CanonicalAuthorityRecord, KernelInput } from "./model.js";

function completedFixture() {
  const parent = { ...authority, digest: authorityDigest(authority) };
  const state = aggregate({
    state: "COMPLETED",
    work_items: { kernel: runtime("COMPLETED") },
    authority_lineage: [{ authority: parent, approval_mode: "manual_operator", observation: null }],
  });
  const request = {
    task_id: state.id,
    record_digest: kernelDigest("completed-record"),
    task_revision: state.revision,
    plan_revision: parent.plan_revision,
    plan_digest: parent.plan_digest,
    work_order_id: kernelDigest("rework-order"),
    result_digest: kernelDigest("blocked-result"),
    transition_id: "tr_0123456789abcdef0123456789abcdef",
    blocker_state_fingerprint: kernelDigest("blocker-state"),
    blocker_request_digest: kernelDigest("blocker-request"),
    baseline_head: "a".repeat(40),
    parent_authority_digest: parent.digest,
    repository_identity: parent.repository_identity,
    repository_fingerprint: parent.repository_fingerprint,
    policy_digests_digest: kernelDigest(parent.policy_digests),
    intake_before_digest: kernelDigest("before"),
    intake_after_digest: kernelDigest("after"),
    scope_roots: ["fixture.test.ts"],
    repository_effects: [],
  } as const;
  const contents = {
    ...parent,
    scope_roots: ["fixture.test.ts", ...parent.scope_roots].toSorted(),
    provenance: { ...parent.provenance, actor_id: "USER", parent_authority_digest: parent.digest },
  };
  const record: CanonicalAuthorityRecord = {
    authority: { ...contents, digest: authorityDigest(contents) },
    approval_mode: "manual_operator",
    observation: {
      kind: "completed_rework_scope_request",
      evidence_digest: completedReworkScopeApprovalEvidence(request, "USER"),
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: [],
      request_digest: kernelDigest(request),
      completed_rework_scope_request: request,
    },
  };
  const call: KernelInput = {
    ...input(
      state,
      {
        kind: "approve_completed_rework_scope",
        task_id: state.id,
        expected_task_revision: state.revision,
        expected_state_fingerprint: parent.repository_fingerprint,
        record,
      },
      `completed-rework-scope:${kernelDigest(request)}`,
    ),
    actor: { id: "USER", kind: "USER", transport: "manual", capabilities: [] },
    authority: null,
  };
  return { call, record, request };
}

describe("completed rework prospective scope", () => {
  it("reopens a completed task into planning with the old plan rejected", () => {
    const f = completedFixture();
    expect(completedReworkScopeAdmissionIssues(f.call, f.record)).toEqual([]);
    const result = reduceTaskCommand(f.call);
    expect(result.kind).toBe("accepted");
    if (result.kind === "accepted") {
      expect(result.aggregate.state).toBe("PLANNING");
      expect(result.aggregate.current_plan?.state).toBe("REJECTED");
      expect(result.aggregate.work_items.kernel?.state).toBe("COMPLETED");
    }
  });
  it("requires a new required WorkItem and preserves completed work on the fresh Plan", () => {
    const f = completedFixture();
    const reopened = reduceTaskCommand(f.call);
    expect(reopened.kind).toBe("accepted");
    if (reopened.kind !== "accepted") return;
    const old = reopened.aggregate.current_plan!.work_items[0]!;
    const proposed = {
      revision: 2,
      work_items: [
        old,
        {
          ...old,
          id: "rework",
          depends_on: [old.id],
          execution_requirements: {
            ...old.execution_requirements,
            scope_roots: [...old.execution_requirements.scope_roots, "fixture.test.ts"],
          },
        },
      ],
    };
    const plan = {
      ...proposed,
      digest: kernelDigest(proposed),
      state: "PROPOSED" as const,
      approval_actor_id: null,
      approval_evidence_digest: null,
    };
    const proposedCall = {
      ...input(
        reopened.aggregate,
        {
          kind: "propose_plan",
          task_id: reopened.aggregate.id,
          expected_task_revision: reopened.aggregate.revision,
          expected_state_fingerprint: f.request.repository_fingerprint,
          plan,
        },
        "plan:rework",
      ),
      authority: f.record.authority,
    };
    const accepted = reduceTaskCommand(proposedCall);
    expect(accepted.kind, JSON.stringify(accepted)).toBe("accepted");
    if (accepted.kind === "accepted") {
      expect(accepted.aggregate.current_plan?.state).toBe("PROPOSED");
      expect(accepted.aggregate.work_items.kernel?.state).toBe("COMPLETED");
      expect(accepted.aggregate.work_items.rework?.state).toBe("PLANNED");
    }
    const noNewWork = reduceTaskCommand({
      ...proposedCall,
      command: {
        ...proposedCall.command,
        plan: {
          ...plan,
          work_items: [old],
          digest: kernelDigest({ revision: 2, work_items: [old] }),
        },
      },
    });
    expect(noNewWork.kind).toBe("rejected");
  });
  it.each([
    "plan_digest",
    "repository_identity",
    "policy_digests_digest",
    "task_revision",
  ] as const)("rejects changed %s even with a resealed request", (field) => {
    const f = completedFixture();
    const request = {
      ...f.request,
      [field]: field === "task_revision" ? 99 : kernelDigest("other"),
    };
    const record: CanonicalAuthorityRecord = {
      ...f.record,
      observation: {
        ...f.record.observation!,
        request_digest: kernelDigest(request),
        evidence_digest: completedReworkScopeApprovalEvidence(request, "USER"),
        completed_rework_scope_request: request,
      },
    };
    expect(completedReworkScopeAdmissionIssues(f.call, record)).not.toEqual([]);
  });
  it("rejects pre-mutated repository state and non-USER attribution", () => {
    const f = completedFixture();
    expect(
      completedReworkScopeAdmissionIssues(
        { ...f.call, repository_fingerprint: kernelDigest("changed") },
        f.record,
      ),
    ).not.toEqual([]);
    expect(
      completedReworkScopeAdmissionIssues(
        { ...f.call, actor: { ...f.call.actor, kind: "SYSTEM" } },
        f.record,
      ),
    ).not.toEqual([]);
  });
});
