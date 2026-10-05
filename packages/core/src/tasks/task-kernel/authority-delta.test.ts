import { describe, expect, it } from "vitest";
import {
  authorityDeltaApprovalEvidence,
  authorityDigest,
  canonicalAuthorityIssues,
  continuationAdmissionIssues,
  planScopeExpansionApprovalDigest,
} from "./authority-lineage.js";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import type {
  CanonicalAuthorityRecord,
  ExecutionRequirements,
  PlanRecord,
  TaskCommand,
} from "./model.js";
import { authority, plan, aggregate, input } from "./kernel.test-fixtures.js";

function materialAmendmentLineage(widened: Partial<ExecutionRequirements> = {}) {
  const original: PlanRecord = { ...plan, approval_actor_id: "USER" };
  const rootContents = {
    ...authority,
    provenance: { ...authority.provenance, actor_id: "USER" },
  };
  const root = { ...rootContents, digest: authorityDigest(rootContents) };
  const records: CanonicalAuthorityRecord[] = [
    { authority: root, approval_mode: "manual_operator", observation: null },
  ];
  const plans = [original];
  for (const revision of [2, 3]) {
    const previous = plans.at(-1)!;
    const parent = records.at(-1)!.authority;
    const workItems = [
      ...previous.work_items,
      {
        ...original.work_items[0]!,
        id: `repair-${revision}`,
        depends_on: [previous.work_items.at(-1)!.id],
        expected_outputs: [`repair-${revision}-evidence`],
        execution_requirements: {
          ...original.work_items[0]!.execution_requirements,
          ...(revision === 3 ? widened : {}),
        },
      },
    ];
    const amended = {
      ...original,
      revision,
      work_items: workItems,
      digest: kernelDigest({ revision, work_items: workItems }),
      approval_evidence_digest: kernelDigest("pending-approval"),
    };
    amended.approval_evidence_digest = planScopeExpansionApprovalDigest({
      task_id: root.task_id,
      current_plan_digest: previous.digest,
      amended_plan_digest: amended.digest,
      actor_id: "USER",
    });
    const contents = {
      ...parent,
      plan_revision: revision,
      plan_digest: amended.digest,
      provenance: {
        ...parent.provenance,
        kind: "SYSTEM" as const,
        actor_id: "kernel",
        parent_authority_digest: parent.digest,
      },
    };
    records.push({
      authority: { ...contents, digest: authorityDigest(contents) },
      approval_mode: null,
      observation: {
        kind: "plan_amendment",
        evidence_digest: kernelDigest(`amendment-${revision}`),
        previous_fingerprint: parent.repository_fingerprint,
        changed_paths: [],
        added_scope_roots: [],
      },
    });
    plans.push(amended);
  }
  const state = aggregate({
    current_plan: plans.at(-1)!,
    plan_history: plans.slice(0, -1).map((entry) => ({ ...entry, state: "SUPERSEDED" })),
    authority_lineage: records,
  });
  const record = records.at(-1)!;
  const parent = records.at(-2)!.authority;
  const pending = input(
    { ...state, authority_lineage: records.slice(0, -1) },
    {
      kind: "continue_authority",
      record,
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: parent.repository_fingerprint,
    },
  );
  return {
    state,
    record,
    pending: {
      ...pending,
      authority: parent,
      actor: {
        id: "kernel",
        kind: "SYSTEM" as const,
        transport: "managed" as const,
        capabilities: ["authority.observe"],
      },
    },
  };
}

describe("canonical authority delta", () => {
  it("accepts exact USER-approved 1-to-2-to-3 work-item lineage and its native continuation", () => {
    const { state, record, pending } = materialAmendmentLineage();
    const before = structuredClone(state);
    expect(canonicalAuthorityIssues(state)).toEqual([]);
    expect(continuationAdmissionIssues(pending, record)).toEqual([]);
    expect(state).toEqual(before);
    expect(state.plan_history.map((entry) => entry.work_items.length)).toEqual([1, 2]);
    expect(state.current_plan!.work_items).toHaveLength(3);
  });

  it.each(["digest", "task", "parent", "amended plan", "actor"] as const)(
    "rejects a material amendment with the wrong approval %s binding",
    (binding) => {
      const { state, record, pending } = materialAmendmentLineage();
      const current = state.current_plan!;
      const wrong = planScopeExpansionApprovalDigest({
        task_id: binding === "task" ? "other-task" : state.id,
        current_plan_digest:
          binding === "parent" ? kernelDigest("wrong-parent") : state.plan_history.at(-1)!.digest,
        amended_plan_digest:
          binding === "amended plan" ? kernelDigest("wrong-plan") : current.digest,
        actor_id: binding === "actor" ? "USER:other" : "USER",
      });
      const tampered = {
        ...current,
        approval_evidence_digest: binding === "digest" ? kernelDigest("wrong-approval") : wrong,
      };
      expect(canonicalAuthorityIssues({ ...state, current_plan: tampered })).toContain(
        "authority_plan",
      );
      expect(
        continuationAdmissionIssues(
          { ...pending, aggregate: { ...pending.aggregate, current_plan: tampered } },
          record,
        ),
      ).toContain("nonmaterial_plan_observation_required");
    },
  );

  it.each([
    { scope_roots: ["outside-approved-scope"] },
    { repository_effects: ["release_metadata"] },
    { external_effects: ["publish"] },
    { capabilities: ["provider_write"] },
    { resources: ["other-resource"] },
  ])("rejects added work that widens authority: %j", (requirements) => {
    const { state, record, pending } = materialAmendmentLineage(requirements);
    expect(canonicalAuthorityIssues(state)).toContain("authority_plan");
    expect(continuationAdmissionIssues(pending, record)).toContain(
      "nonmaterial_plan_observation_required",
    );
  });

  it("retains approved plan-amendment authority across repository continuations", () => {
    const amendedDefinition = {
      ...plan.work_items[0]!,
      execution_requirements: {
        ...plan.work_items[0]!.execution_requirements,
        scope_roots: [...plan.work_items[0]!.execution_requirements.scope_roots, "schemas"],
      },
    };
    const amendedPlan = {
      revision: plan.revision + 1,
      digest: kernelDigest({
        revision: plan.revision + 1,
        work_items: [amendedDefinition],
      }),
      state: "APPROVED" as const,
      approval_actor_id: "USER",
      approval_evidence_digest: "",
      work_items: [amendedDefinition],
    };
    amendedPlan.approval_evidence_digest = planScopeExpansionApprovalDigest({
      task_id: aggregate().id,
      current_plan_digest: plan.digest,
      amended_plan_digest: amendedPlan.digest,
      actor_id: "USER",
    });
    const parent = { ...authority, digest: authorityDigest(authority) };
    const amendedContents = {
      ...parent,
      plan_revision: amendedPlan.revision,
      plan_digest: amendedPlan.digest,
      scope_roots: [...parent.scope_roots, "schemas"].toSorted(),
      provenance: {
        ...parent.provenance,
        kind: "SYSTEM" as const,
        actor_id: "kernel",
        parent_authority_digest: parent.digest,
      },
    };
    const amendedAuthority = {
      ...amendedContents,
      digest: authorityDigest(amendedContents),
    };
    const nextFingerprint = kernelDigest("continued-implementation");
    const continuedContents = {
      ...amendedAuthority,
      repository_fingerprint: nextFingerprint,
      provenance: {
        ...amendedAuthority.provenance,
        parent_authority_digest: amendedAuthority.digest,
      },
    };
    const continuedAuthority = {
      ...continuedContents,
      digest: authorityDigest(continuedContents),
    };
    const state = aggregate({
      current_plan: amendedPlan,
      plan_history: [plan],
      authority_lineage: [
        { authority: parent, approval_mode: "manual_operator", observation: null },
        {
          authority: amendedAuthority,
          approval_mode: null,
          observation: {
            kind: "plan_amendment",
            evidence_digest: kernelDigest("plan-amendment"),
            previous_fingerprint: parent.repository_fingerprint,
            changed_paths: [],
            added_scope_roots: ["schemas"],
          },
        },
        {
          authority: continuedAuthority,
          approval_mode: null,
          observation: {
            kind: "repository_implementation",
            evidence_digest: kernelDigest("repository-implementation"),
            previous_fingerprint: amendedAuthority.repository_fingerprint,
            changed_paths: ["schemas/generated.json"],
          },
        },
      ],
    });

    expect(canonicalAuthorityIssues(state)).toEqual([]);
  });

  it("applies an exact USER authority delta without changing the approved plan", () => {
    const { digest: _fixtureDigest, ...parentContents } = authority;
    const parent = { ...parentContents, digest: kernelDigest(parentContents) };
    const nextFingerprint = kernelDigest("schema-sync");
    const request = {
      task_id: "task-1",
      task_revision: 7,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      parent_authority_digest: parent.digest,
      repository_identity: parent.repository_identity,
      previous_fingerprint: parent.repository_fingerprint,
      repository_fingerprint: nextFingerprint,
      repository_evidence_digest: kernelDigest("schema-observation"),
      changed_paths: ["packages/core/src/tasks/task-kernel/kernel.ts", "schemas/generated.json"],
      added_scope_roots: ["schemas/generated.json"],
      added_repository_effects: ["schema"],
    };
    const requestDigest = kernelDigest(request);
    const approvalEvidence = authorityDeltaApprovalEvidence({
      task_id: "task-1",
      request_digest: requestDigest,
      actor_id: "USER",
    });
    const childContents = {
      ...parent,
      repository_fingerprint: nextFingerprint,
      scope_roots: [...parent.scope_roots, "schemas/generated.json"].toSorted(),
      repository_effects: [...parent.repository_effects, "schema"].toSorted(),
      provenance: {
        kind: "USER" as const,
        actor_id: "USER",
        evidence_digest: parent.provenance.evidence_digest,
        parent_authority_digest: parent.digest,
      },
    };
    const { digest: _parentDigest, ...digestContents } = childContents;
    const record = {
      authority: { ...digestContents, digest: kernelDigest(digestContents) },
      approval_mode: "manual_operator" as const,
      observation: {
        kind: "authority_delta" as const,
        evidence_digest: approvalEvidence,
        previous_fingerprint: parent.repository_fingerprint,
        changed_paths: request.changed_paths,
        request_digest: requestDigest,
        added_scope_roots: request.added_scope_roots,
        added_repository_effects: request.added_repository_effects,
        request_task_revision: request.task_revision,
        repository_evidence_digest: request.repository_evidence_digest,
      },
    };
    const state = aggregate({
      authority_lineage: [
        { authority: parent, approval_mode: "manual_operator", observation: null },
      ],
    });
    const command: TaskCommand = {
      kind: "approve_authority_delta",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: nextFingerprint,
      parent_authority_digest: parent.digest,
      request_digest: requestDigest,
      record,
    };
    const approved = reduceTaskCommand({
      ...input(state, command),
      actor: {
        id: "USER",
        kind: "USER",
        transport: "manual",
        capabilities: [],
      },
      authority: null,
      repository_fingerprint: nextFingerprint,
    });
    expect(approved).toMatchObject({
      kind: "accepted",
      aggregate: {
        revision: 8,
        current_plan: plan,
        authority_lineage: [{ authority: parent }, record],
      },
      events: [{ kind: "authority_continued" }],
    });
    expect(
      reduceTaskCommand({
        ...input(state, command),
        actor: {
          id: "agent",
          kind: "AGENT",
          transport: "managed",
          capabilities: [],
        },
        authority: null,
        repository_fingerprint: nextFingerprint,
      }),
    ).toMatchObject({ kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED" });
  });
});
