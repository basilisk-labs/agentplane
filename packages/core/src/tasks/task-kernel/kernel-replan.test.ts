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
  });
});
