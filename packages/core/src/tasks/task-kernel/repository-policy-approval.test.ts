import { describe, expect, it } from "vitest";

import { authorityDigest } from "./authority-lineage.js";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import type { TaskCommand } from "./model.js";
import { aggregate, authority, fingerprint, input, plan } from "./kernel.test-fixtures.js";

describe("canonical repository-policy approval", () => {
  it("records repository-policy approval only with exact SYSTEM provenance", () => {
    const state = aggregate({
      state: "AWAITING_PLAN_APPROVAL",
      current_plan: {
        ...plan,
        state: "PROPOSED",
        approval_actor_id: null,
        approval_evidence_digest: null,
      },
    });
    const evidence = kernelDigest("repository-policy");
    const contents = {
      ...authority,
      provenance: {
        kind: "SYSTEM" as const,
        actor_id: "agentplane:kernel-controller",
        evidence_digest: evidence,
        parent_authority_digest: null,
      },
    };
    const command: TaskCommand = {
      kind: "approve_plan",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      approval_evidence_digest: evidence,
      authority_mode: "repository_policy",
    };
    const policyInput = {
      ...input(state, command),
      actor: {
        ...input(state, command).actor,
        id: "agentplane:kernel-controller",
        kind: "SYSTEM" as const,
      },
      authority: { ...contents, digest: authorityDigest(contents) },
    };
    expect(reduceTaskCommand(policyInput)).toMatchObject({
      kind: "accepted",
      aggregate: {
        authority_lineage: [
          { approval_mode: "repository_policy", authority: { provenance: { kind: "SYSTEM" } } },
        ],
      },
    });
    expect(
      reduceTaskCommand({
        ...policyInput,
        actor: { ...policyInput.actor, kind: "USER" as const },
      }),
    ).toMatchObject({ kind: "rejected", code: "AUTHORITY_PROVENANCE_ESCALATION" });
  });
});
