import { describe, expect, it } from "vitest";
import { authorityDeltaApprovalEvidence } from "./authority-lineage.js";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import type { TaskCommand } from "./model.js";
import { authority, plan, aggregate, input } from "./kernel.test-fixtures.js";

describe("canonical authority delta", () => {
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
