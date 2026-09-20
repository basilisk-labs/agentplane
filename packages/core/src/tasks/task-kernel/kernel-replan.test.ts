import { describe, expect, it } from "vitest";

import { authorityDigest } from "./authority-lineage.js";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import type { TaskCommand } from "./model.js";
import { aggregate, authority, fingerprint, input, plan, runtime } from "./kernel.test-fixtures.js";

function rejection(state: ReturnType<typeof aggregate>, withEvidence: boolean): TaskCommand {
  return {
    kind: "reject_plan",
    task_id: state.id,
    expected_task_revision: state.revision,
    expected_state_fingerprint: fingerprint,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    ...(withEvidence ? { rejection_evidence_digest: kernelDigest("explicit-user-rejection") } : {}),
  };
}

describe("canonical blocked-plan replanning", () => {
  it("preserves blocked work and authority evidence when explicit rejection enters replanning", () => {
    const blocked = runtime("BLOCKED");
    const { digest: _fixtureDigest, ...authorityContents } = authority;
    const validAuthority = { ...authorityContents, digest: authorityDigest(authorityContents) };
    const lineage = [{ authority: validAuthority }] as const;
    const state = aggregate({
      work_items: { kernel: blocked },
      authority_lineage: lineage,
    });

    const result = reduceTaskCommand({
      ...input(state, rejection(state, true)),
      authority: validAuthority,
      actor: {
        id: "USER",
        kind: "USER",
        transport: "manual",
        capabilities: [],
      },
    });

    expect(result.kind).toBe("accepted");
    if (result.kind !== "accepted") return;
    expect(result.aggregate).toMatchObject({
      state: "PLANNING",
      current_plan: { state: "REJECTED", digest: plan.digest },
      work_items: { kernel: blocked },
      authority_lineage: lineage,
    });
    expect(result.events.map((event) => event.kind)).toEqual(["plan_rejected"]);
    expect(state.current_plan?.state).toBe("APPROVED");
    expect(state.work_items.kernel?.state).toBe("BLOCKED");
  });

  it("keeps approved plans fail-closed without blocked work or explicit rejection evidence", () => {
    const ready = aggregate();
    const blocked = aggregate({ work_items: { kernel: runtime("BLOCKED") } });

    expect(reduceTaskCommand(input(ready, rejection(ready, true)))).toMatchObject({
      kind: "rejected",
      code: "ILLEGAL_TASK_TRANSITION",
    });
    expect(reduceTaskCommand(input(blocked, rejection(blocked, false)))).toMatchObject({
      kind: "rejected",
      code: "ILLEGAL_TASK_TRANSITION",
    });
    expect(reduceTaskCommand(input(blocked, rejection(blocked, true)))).toMatchObject({
      kind: "rejected",
      code: "ILLEGAL_TASK_TRANSITION",
    });
  });

  it("accepts a replacement proposal under fresh planning authority after rejection", () => {
    const { digest: _fixtureDigest, ...authorityContents } = authority;
    const approvedAuthority = { ...authorityContents, digest: authorityDigest(authorityContents) };
    const rejectedPlan = { ...plan, state: "REJECTED" as const };
    const state = aggregate({
      state: "PLANNING",
      current_plan: rejectedPlan,
      work_items: { kernel: runtime("BLOCKED") },
      authority_lineage: [{ authority: approvedAuthority }],
    });
    const revision = plan.revision + 1;
    const work_items = plan.work_items;
    const proposal = {
      revision,
      work_items,
      digest: kernelDigest({ revision, work_items }),
      state: "PROPOSED" as const,
      approval_actor_id: null,
      approval_evidence_digest: null,
    };
    const { digest: _approvedDigest, ...planningContents } = {
      ...approvedAuthority,
      scope_roots: [],
      repository_effects: [],
      external_effects: [],
      capabilities: [],
      resources: [],
      plan_revision: rejectedPlan.revision,
      plan_digest: rejectedPlan.digest,
      provenance: {
        kind: "SYSTEM" as const,
        actor_id: "agentplane:kernel-controller",
        evidence_digest: kernelDigest("native-planning"),
        parent_authority_digest: null,
      },
    };
    const planningAuthority = {
      ...planningContents,
      digest: authorityDigest(planningContents),
    };
    const command: TaskCommand = {
      kind: "propose_plan",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      plan: proposal,
    };

    expect(
      reduceTaskCommand({
        ...input(state, command),
        actor: {
          id: "agentplane:kernel-controller",
          kind: "SYSTEM",
          transport: "managed",
          capabilities: [],
        },
        authority: planningAuthority,
      }),
    ).toMatchObject({
      kind: "accepted",
      aggregate: { state: "AWAITING_PLAN_APPROVAL", current_plan: proposal },
    });

    expect(
      reduceTaskCommand({
        ...input(state, command),
        actor: {
          id: "agentplane:kernel-controller",
          kind: "SYSTEM",
          transport: "managed",
          capabilities: [],
        },
        authority: { ...planningAuthority, digest: kernelDigest("tampered-authority") },
      }),
    ).toMatchObject({
      kind: "rejected",
      code: "AUTHORITY_SCOPE_EXCEEDED",
      facts: ["authority_digest"],
    });
  });
});
